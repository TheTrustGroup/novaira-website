import { Resend } from 'resend'
import { logNotification } from '@/lib/notifications'

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('Missing RESEND_API_KEY')
  return new Resend(key)
}

export type ConsultationNotificationData = {
  name: string
  email: string
  organization: string
  institution_type?: string
  facilities?: string
  timeline?: string
  message?: string
  phone?: string
  // Set by the caller after `upsertLead` so the audit row can be joined
  // back to the lead. Optional because email delivery doesn't depend on it.
  leadId?: string | null
}

const INSTITUTION_LABELS: Record<string, string> = {
  hotel: 'Hotel / Hospitality',
  hospital: 'Hospital / Healthcare',
  school: 'School / Education',
  office: 'Corporate Office',
  home: 'Home / Residence',
  other: 'Other',
}

const TIMELINE_LABELS: Record<string, string> = {
  within_1_month: 'Within 1 month',
  '1_3_months': '1 to 3 months',
  '3_6_months': '3 to 6 months',
  exploring: 'Exploring options',
}

const CONSULTATION_KIND = 'consultation_notification'

export async function sendConsultationNotification(
  data: ConsultationNotificationData
): Promise<{ success: boolean; error?: string }> {
  const to = process.env.NOTIFICATION_EMAIL
  const hasApiKey = Boolean(process.env.RESEND_API_KEY)

  if (!to || !hasApiKey) {
    const reason = !to ? 'NOTIFICATION_EMAIL not set' : 'RESEND_API_KEY not set'
    console.warn(`${reason}; skipping consultation email`)
    await logNotification({
      channel: 'email',
      kind: CONSULTATION_KIND,
      status: 'skipped',
      recipient: to ?? null,
      leadId: data.leadId,
      error: reason,
    })
    // Skipping is not an error from the caller's perspective — the form
    // still succeeded, we just have nowhere to send.
    return { success: true }
  }

  const institutionLabel = data.institution_type
    ? INSTITUTION_LABELS[data.institution_type] ?? data.institution_type
    : '-'
  const timelineLabel = data.timeline
    ? TIMELINE_LABELS[data.timeline] ?? data.timeline
    : '-'

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: system-ui, sans-serif; line-height: 1.6; color: #333; max-width: 560px; margin: 0 auto; padding: 24px;">
  <h2 style="color: #1a1a1a; margin-bottom: 24px;">New consultation request</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Name</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(data.name)}</td></tr>
    <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
    ${data.phone ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Phone</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></td></tr>` : ''}
    <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Organization</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(data.organization)}</td></tr>
    <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Type of institution</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(institutionLabel)}</td></tr>
    <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Bathrooms / facilities</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(data.facilities || '-')}</td></tr>
    <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Timeline</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(timelineLabel)}</td></tr>
  </table>
  ${data.message ? `<p style="margin-top: 20px;"><strong>Message:</strong></p><p style="white-space: pre-wrap; background: #f5f5f5; padding: 12px; border-radius: 8px;">${escapeHtml(data.message)}</p>` : ''}
  <p style="margin-top: 24px; font-size: 12px; color: #666;">Sent from NOVAIRA contact form.</p>
</body>
</html>
`.trim()

  try {
    const resend = getResend()
    const { data: result, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? 'NOVAIRA <onboarding@resend.dev>',
      to: [to],
      subject: `Consultation request: ${data.name} (${data.organization})`,
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      await logNotification({
        channel: 'email',
        kind: CONSULTATION_KIND,
        status: 'failed',
        recipient: to,
        leadId: data.leadId,
        error: error.message,
      })
      return { success: false, error: error.message }
    }

    await logNotification({
      channel: 'email',
      kind: CONSULTATION_KIND,
      status: 'sent',
      recipient: to,
      leadId: data.leadId,
      providerId: result?.id ?? null,
    })
    return { success: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('sendConsultationNotification error:', err)
    await logNotification({
      channel: 'email',
      kind: CONSULTATION_KIND,
      status: 'failed',
      recipient: to,
      leadId: data.leadId,
      error: message,
    })
    return { success: false, error: message }
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
