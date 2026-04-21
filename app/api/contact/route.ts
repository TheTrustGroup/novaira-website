import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { upsertLead } from '@/lib/leads'
import { sendConsultationNotification } from '@/lib/email'
import { rateLimit } from '@/lib/rate-limit'
import { verifyTurnstile } from '@/lib/turnstile'
import { captureServer } from '@/lib/posthog-server'

const spaceEnum = z.enum(['hotel', 'hospital', 'school', 'office', 'home', 'other'])

const bodySchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required').max(200),
  organization: z.string().min(1, 'Organization is required').max(200),
  organization_type: spaceEnum,
  facilities: z.string().max(500).optional(),
  timeline: z.string().max(120).optional(),
  message: z.string().max(5000).optional(),
  phone: z.string().max(40).optional(),
  // Honeypot: hidden field bots tend to fill. Humans leave it empty.
  website: z.string().max(0).optional(),
  // Timestamp (ms) set on form mount. Any submission faster than
  // MIN_SUBMIT_MS after mount is treated as a bot.
  started_at: z.number().int().positive().optional(),
  // Cloudflare Turnstile token. Verified server-side when TURNSTILE_SECRET_KEY
  // is set; ignored otherwise so the form works while the account is being
  // provisioned.
  turnstile_token: z.string().max(4096).optional(),
  // PostHog distinct_id echoed from the client so server-side events join
  // to the same person profile. Optional — falls back to an ip-based id.
  distinct_id: z.string().max(200).optional(),
})

/** Submissions faster than this are near-certainly automated. */
const MIN_SUBMIT_MS = 1500

export async function POST(request: NextRequest) {
  try {
    const rl = await rateLimit(request, { key: 'contact', max: 5, windowMs: 60 * 60 * 1000 })
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

    const {
      email,
      name,
      organization,
      organization_type,
      facilities,
      timeline,
      message,
      phone,
      started_at,
      turnstile_token,
      distinct_id,
    } = parsed.data

    if (started_at && Date.now() - started_at < MIN_SUBMIT_MS) {
      // Silently accept to deny bots information about our filter.
      return NextResponse.json({ success: true }, { status: 200 })
    }

    // No-op when TURNSTILE_SECRET_KEY isn't set. When it is set, a missing or
    // invalid token blocks the submission with a 400.
    const turnstile = await verifyTurnstile(turnstile_token, rl.ip)
    if (!turnstile.ok) {
      return NextResponse.json(
        { error: 'Verification failed. Please try again.' },
        { status: 400 }
      )
    }

    const notesParts: string[] = []
    if (facilities) notesParts.push(`Facilities: ${facilities}`)
    if (timeline) notesParts.push(`Timeline: ${timeline}`)
    if (message?.trim()) notesParts.push(`Message: ${message.trim()}`)
    const notes = notesParts.length ? notesParts.join('\n') : null

    const lead = await upsertLead(supabaseAdmin, {
      email,
      name,
      organization,
      organization_type,
      lead_source: 'contact',
      phone,
      notes,
      ip_address: rl.ip,
    })

    await sendConsultationNotification({
      name,
      email,
      organization,
      institution_type: organization_type,
      facilities,
      timeline,
      message,
      phone,
      leadId: lead.id,
    })

    // Fire-and-forget server event. `captureServer` never throws and is
    // capped at 1s — a slow/failing PostHog cannot stretch this request.
    await captureServer({
      event: 'consultation_server_accepted',
      distinctId: distinct_id,
      ip: rl.ip,
      properties: {
        space_type: organization_type,
        timeline: timeline,
        has_phone: Boolean(phone),
        has_message: Boolean(message?.trim()),
        has_facilities: Boolean(facilities),
        rate_limit_backend: rl.backend,
        turnstile_enforced: !turnstile.disabled,
        lead_id: lead.id,
      },
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (e) {
    console.error('Contact API error:', e)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
