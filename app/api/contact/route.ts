import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { upsertLead } from '@/lib/leads'
import { sendConsultationNotification } from '@/lib/email'

const bodySchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required'),
  organization: z.string().min(1, 'Organization is required'),
  organization_type: z.enum(['hotel', 'hospital', 'school', 'office', 'home', 'other']).optional(),
  institution_type: z.enum(['hotel', 'hospital', 'school', 'office', 'home', 'other']).optional(),
  facilities: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().optional(),
  website: z.string().max(0).optional(), // honeypot: must be empty
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
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
      institution_type,
      facilities,
      timeline,
      message,
    } = parsed.data

    const orgType = organization_type ?? institution_type
    const notesParts: string[] = []
    if (facilities) notesParts.push(`Facilities: ${facilities}`)
    if (timeline) notesParts.push(`Timeline: ${timeline}`)
    if (message?.trim()) notesParts.push(`Message: ${message.trim()}`)
    const notes = notesParts.length ? notesParts.join('\n') : null

    await upsertLead(supabaseAdmin, {
      email,
      name: name ?? undefined,
      organization: organization ?? undefined,
      organization_type: orgType ?? undefined,
      lead_source: 'contact',
      notes,
    })

    await sendConsultationNotification({
      name,
      email,
      organization,
      institution_type: orgType,
      facilities,
      timeline,
      message: message ?? undefined,
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
