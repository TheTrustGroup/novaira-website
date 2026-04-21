import { NextRequest, NextResponse } from 'next/server'
import { logNotification, type NotificationStatus } from '@/lib/notifications'
import { verifySvixSignature } from '@/lib/webhook-signature'

// Must run on Node: we use `node:crypto` for HMAC verification and we
// need the raw request body exactly as Resend signed it.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Map Resend event type → our notifications.status vocabulary. Events we
// don't track (opens, clicks, delays) are ignored; they're marketing
// signals, not operational ones.
const EVENT_STATUS: Record<string, NotificationStatus> = {
  'email.sent': 'sent',
  'email.delivered': 'delivered',
  'email.bounced': 'bounced',
  'email.complained': 'complained',
}

type ResendEvent = {
  type?: string
  created_at?: string
  data?: {
    email_id?: string
    to?: string[] | string
    subject?: string
    from?: string
    [key: string]: unknown
  }
}

export async function POST(request: NextRequest) {
  const secret = process.env.RESEND_WEBHOOK_SECRET
  if (!secret) {
    // If the secret isn't configured we can't verify anything; reject
    // loudly so a misconfigured Resend dashboard surfaces immediately.
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 })
  }

  // Read the raw body first — signature verification is byte-exact.
  const payload = await request.text()

  const verification = verifySvixSignature({
    secret,
    id: request.headers.get('svix-id'),
    timestamp: request.headers.get('svix-timestamp'),
    signature: request.headers.get('svix-signature'),
    payload,
  })

  if (!verification.ok) {
    console.warn('[resend-webhook] rejected:', verification.reason)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  let event: ResendEvent
  try {
    event = JSON.parse(payload) as ResendEvent
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const status = event.type ? EVENT_STATUS[event.type] : undefined
  if (!status) {
    // Ack unhandled event types so Resend doesn't retry them forever.
    return NextResponse.json({ ok: true, ignored: event.type ?? 'unknown' })
  }

  const recipient = Array.isArray(event.data?.to)
    ? event.data?.to[0] ?? null
    : event.data?.to ?? null

  await logNotification({
    channel: 'email',
    kind: 'consultation_notification',
    status,
    recipient,
    providerId: event.data?.email_id ?? null,
    meta: {
      event_type: event.type,
      subject: event.data?.subject,
      from: event.data?.from,
      created_at: event.created_at,
    },
  })

  return NextResponse.json({ ok: true })
}
