/**
 * Audit trail for outbound notifications.
 *
 * Every send attempt — sent, failed, or intentionally skipped — writes
 * one row into `notifications`. This gives ops a single place to answer
 * "did we actually email them?" without trusting console logs or the
 * Resend dashboard, and lets us wire alerting off a single table later.
 *
 * The logger itself must never throw: a failure to write an audit row
 * shouldn't cascade into a failed request.
 */
import { supabaseAdmin } from '@/lib/supabase-admin'

export type NotificationChannel = 'email'
export type NotificationStatus =
  | 'sent'
  | 'failed'
  | 'skipped'
  | 'delivered'
  | 'bounced'
  | 'complained'

export type LogNotificationInput = {
  channel: NotificationChannel
  kind: string
  status: NotificationStatus
  recipient?: string | null
  leadId?: string | null
  providerId?: string | null
  error?: string | null
  meta?: Record<string, unknown> | null
}

export async function logNotification(input: LogNotificationInput): Promise<void> {
  try {
    const { error } = await supabaseAdmin.from('notifications').insert({
      channel: input.channel,
      kind: input.kind,
      status: input.status,
      recipient: input.recipient ?? null,
      lead_id: input.leadId ?? null,
      provider_id: input.providerId ?? null,
      error: input.error ? input.error.slice(0, 2000) : null,
      meta: input.meta ?? null,
    })
    if (error) throw error
  } catch (err) {
    // Audit writes are best-effort. Surface in console so the problem is
    // visible, but never propagate — the primary action already completed
    // (or failed) on its own terms.
    console.error(
      '[notifications] failed to log:',
      err instanceof Error ? err.message : err,
      { kind: input.kind, status: input.status }
    )
  }
}
