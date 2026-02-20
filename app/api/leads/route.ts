import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { upsertLead } from '@/lib/leads'

const LEAD_SOURCES = ['spec_download', 'consultation', 'waitlist', 'investor', 'contact'] as const

const bodySchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().optional(),
  organization: z.string().optional(),
  organization_type: z.enum(['hotel', 'hospital', 'school', 'office', 'home', 'other']).optional(),
  lead_source: z.enum(LEAD_SOURCES),
  utm_source: z.string().optional(),
  phone: z.string().optional(),
  notes: z.string().optional(),
})

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour
const RATE_LIMIT_MAX = 5
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  return 'unknown'
}

function checkRateLimit(ip: string): { allowed: boolean } {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return { allowed: true }
  }
  if (now >= entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return { allowed: true }
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false }
  }
  entry.count += 1
  return { allowed: true }
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request)
    const { allowed } = checkRateLimit(ip)
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const parsed = bodySchema.safeParse(body)
    if (!parsed.success) {
      const msg = parsed.error.issues.map((e) => e.message).join('; ') || 'Validation failed'
      return NextResponse.json({ error: msg }, { status: 400 })
    }

    const { id } = await upsertLead(supabaseAdmin, {
      ...parsed.data,
      ip_address: ip,
    })

    return NextResponse.json({ success: true, id }, { status: 200 })
  } catch (e) {
    console.error('Leads API error:', e)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
