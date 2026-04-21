import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { upsertLead } from '@/lib/leads'
import { rateLimit } from '@/lib/rate-limit'
import { captureServer } from '@/lib/posthog-server'

const bodySchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().optional(),
  organization: z.string().optional(),
  organization_type: z
    .enum(['hotel', 'hospital', 'school', 'office', 'home', 'other'])
    .optional(),
  referral_code: z.string().optional(),
  // Echoed from the client (when one exists) to join server events to the
  // same PostHog person profile.
  distinct_id: z.string().max(200).optional(),
})

function tierForPosition(position: number): 'founder' | 'early' | 'standard' {
  if (position <= 50) return 'founder'
  if (position <= 200) return 'early'
  return 'standard'
}

export async function POST(request: NextRequest) {
  try {
    const rl = await rateLimit(request, { key: 'waitlist', max: 5, windowMs: 60 * 60 * 1000 })
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(rl.retryAfterSec) } }
      )
    }

    const body = await request.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }
    const parsed = bodySchema.safeParse(body)
    if (!parsed.success) {
      const msg = parsed.error.issues.map((e) => e.message).join('; ') || 'Validation failed'
      return NextResponse.json({ error: msg }, { status: 400 })
    }

    const { email, name, organization, organization_type, referral_code, distinct_id } =
      parsed.data

    // Create or update lead with source 'waitlist'
    const { id: leadId } = await upsertLead(supabaseAdmin, {
      email,
      name,
      organization,
      organization_type,
      lead_source: 'waitlist',
    })

    // Check if already on waitlist
    const { data: existing } = await supabaseAdmin
      .from('waitlist')
      .select('position, tier, referral_code')
      .eq('lead_id', leadId)
      .maybeSingle()

    if (existing) {
      await captureServer({
        event: 'waitlist_server_rejoin',
        distinctId: distinct_id,
        ip: rl.ip,
        properties: {
          tier: existing.tier,
          position: existing.position,
          rate_limit_backend: rl.backend,
          has_referral: Boolean(referral_code?.trim()),
        },
      })
      return NextResponse.json(
        {
          success: true,
          position: existing.position,
          tier: existing.tier,
          referralCode: existing.referral_code,
        },
        { status: 200 }
      )
    }

    // Next position = current count + 1
    const { count } = await supabaseAdmin
      .from('waitlist')
      .select('*', { count: 'exact', head: true })
    const position = (count ?? 0) + 1
    const tier = tierForPosition(position)

    // If referral_code provided, find referrer and increment their count
    if (referral_code?.trim()) {
      const { data: referrer } = await supabaseAdmin
        .from('waitlist')
        .select('id')
        .eq('referral_code', referral_code.trim().toLowerCase())
        .maybeSingle()
      if (referrer?.id) {
        await supabaseAdmin.rpc('increment_referral_count', { waitlist_id: referrer.id })
      }
    }

    const { data: inserted, error } = await supabaseAdmin
      .from('waitlist')
      .insert({
        lead_id: leadId,
        position,
        tier,
        referred_by_code: referral_code?.trim() || null,
      })
      .select('referral_code')
      .single()

    if (error) {
      console.error('Waitlist insert error:', error)
      return NextResponse.json(
        { error: 'Failed to join waitlist. Please try again.' },
        { status: 500 }
      )
    }

    await captureServer({
      event: 'waitlist_server_accepted',
      distinctId: distinct_id,
      ip: rl.ip,
      properties: {
        tier,
        position,
        organization_type,
        rate_limit_backend: rl.backend,
        has_referral: Boolean(referral_code?.trim()),
      },
    })

    return NextResponse.json(
      {
        success: true,
        position,
        tier,
        referralCode: inserted?.referral_code ?? null,
      },
      { status: 200 }
    )
  } catch (e) {
    console.error('Waitlist API error:', e)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
