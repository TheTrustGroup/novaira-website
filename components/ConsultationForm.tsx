'use client'

/**
 * Job: Qualified consultation lead — identity + context + timeline —
 * with a honeypot, a mount-time stamp, and an optional Cloudflare Turnstile
 * challenge for server-side bot gating.
 */
import { useEffect, useRef, useState, FormEvent, ChangeEvent } from 'react'
import TurnstileWidget from '@/components/TurnstileWidget'
import { getPostHog } from '@/lib/posthog'

/**
 * PostHog funnel. Fires regardless of Turnstile / Supabase state — these
 * events capture intent, not delivery. All events share a `prefix` so
 * they're easy to filter in PostHog as a single funnel:
 *   viewed → started → (submitted | error | turnstile_failed)
 */
const EV = {
  viewed: 'consultation_form_viewed',
  started: 'consultation_form_started',
  submitted: 'consultation_form_submitted',
  error: 'consultation_form_error',
  turnstileFailed: 'consultation_turnstile_failed',
} as const

type AnalyticsProps = Record<string, string | number | boolean | undefined>

function track(event: string, props: AnalyticsProps = {}) {
  const ph = getPostHog()
  if (!ph) return
  // Strip undefined so the PostHog UI doesn't render empty columns.
  const clean: Record<string, string | number | boolean> = {}
  for (const [k, v] of Object.entries(props)) {
    if (v !== undefined) clean[k] = v
  }
  ph.capture(event, clean)
}

// When set, render Turnstile and require a token before submit. When unset,
// the form behaves exactly as before — the honeypot + time-to-submit combo
// still protects it. The server-side verifier is similarly opt-in.
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

const SPACE_OPTIONS = [
  { value: 'home', label: 'Home / residence' },
  { value: 'hotel', label: 'Hotel / hospitality' },
  { value: 'hospital', label: 'Hospital / healthcare' },
  { value: 'school', label: 'School / education' },
  { value: 'office', label: 'Corporate office' },
  { value: 'other', label: 'Other' },
] as const

// Values must match TIMELINE_LABELS in lib/email.ts so the internal
// notification renders the human-friendly label.
const TIMELINE_OPTIONS = [
  { value: 'within_1_month', label: 'Within 1 month' },
  { value: '1_3_months', label: '1 to 3 months' },
  { value: '3_6_months', label: '3 to 6 months' },
  { value: 'exploring', label: 'Exploring options' },
] as const

const inputClass =
  'w-full px-4 py-3 bg-ink border border-gold/25 text-cream placeholder:text-cream/35 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/40 transition-colors duration-200 rounded-sm font-sans font-normal text-sm sm:text-base'
const labelClass = 'block text-sm text-cream/70 mb-2 font-sans font-normal'
const optionalHint = 'text-cream/45 ml-1 font-light'

type FormState = {
  name: string
  email: string
  organization: string
  spaceType: '' | (typeof SPACE_OPTIONS)[number]['value']
  phone: string
  facilities: string
  timeline: '' | (typeof TIMELINE_OPTIONS)[number]['value']
  message: string
  website: string
}

const EMPTY_FORM: FormState = {
  name: '',
  email: '',
  organization: '',
  spaceType: '',
  phone: '',
  facilities: '',
  timeline: '',
  message: '',
  website: '',
}

export default function ConsultationForm() {
  const [formData, setFormData] = useState<FormState>(EMPTY_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submittedName, setSubmittedName] = useState('')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  // Captured on mount so the server can detect instant bot submissions.
  const startedAtRef = useRef<number>(Date.now())
  // Fires form_viewed exactly once even under React 18 strict-mode double-mount.
  const viewedRef = useRef(false)
  // Fires form_started on the first real user input.
  const startedFiredRef = useRef(false)

  const turnstileRequired = Boolean(TURNSTILE_SITE_KEY)
  const canSubmit = !isSubmitting && (!turnstileRequired || Boolean(turnstileToken))

  useEffect(() => {
    if (viewedRef.current) return
    viewedRef.current = true
    track(EV.viewed, { turnstile_required: turnstileRequired })
  }, [turnstileRequired])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    if (!startedFiredRef.current && e.target.name !== 'website') {
      startedFiredRef.current = true
      track(EV.started, { first_field: e.target.name })
    }
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formData.website) return
    if (turnstileRequired && !turnstileToken) {
      setSubmitStatus('error')
      track(EV.error, { reason: 'turnstile_missing' })
      return
    }
    setIsSubmitting(true)
    setSubmitStatus('idle')
    const timeOnForm = Date.now() - startedAtRef.current
    // Echo PostHog's distinct_id so the server-side acceptance event joins
    // to the same person profile as the client-side funnel events.
    const ph = getPostHog()
    const distinctId = ph ? ph.get_distinct_id() : undefined

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          organization: formData.organization.trim(),
          organization_type: formData.spaceType,
          phone: formData.phone.trim() || undefined,
          facilities: formData.facilities.trim() || undefined,
          timeline: formData.timeline || undefined,
          message: formData.message.trim() || undefined,
          website: formData.website || undefined,
          started_at: startedAtRef.current,
          turnstile_token: turnstileToken ?? undefined,
          distinct_id: distinctId,
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error((data as { error?: string }).error || 'Request failed')
      }
      setSubmittedName(formData.name.trim())
      setSubmitStatus('success')
      track(EV.submitted, {
        space_type: formData.spaceType || undefined,
        timeline: formData.timeline || undefined,
        has_phone: Boolean(formData.phone.trim()),
        has_message: Boolean(formData.message.trim()),
        time_on_form_ms: timeOnForm,
      })
      setFormData(EMPTY_FORM)
      // Token is single-use once the server consumes it.
      setTurnstileToken(null)
    } catch (err) {
      setSubmitStatus('error')
      track(EV.error, {
        reason: 'submit_failed',
        status: typeof (err as { status?: number })?.status === 'number'
          ? (err as { status: number }).status
          : undefined,
      })
      // Force the user to re-solve so we never retry with a stale/consumed token.
      setTurnstileToken(null)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="text-center py-10 px-4 animate-[fadeIn_0.45s_ease-out_forwards]"
      >
        <p className="font-display text-xl sm:text-2xl text-silver-cream font-light leading-relaxed max-w-md mx-auto">
          Thank you, {submittedName}. We will respond within two business days.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left relative">
      <div className="absolute -left-[9999px] top-0 w-px h-px overflow-hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="consultation-name" className={labelClass}>
            Name
          </label>
          <input
            type="text"
            id="consultation-name"
            name="name"
            required
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
            placeholder="Full name"
          />
        </div>

        <div>
          <label htmlFor="consultation-email" className={labelClass}>
            Email
          </label>
          <input
            type="email"
            id="consultation-email"
            name="email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
            placeholder="you@domain.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="consultation-org" className={labelClass}>
            Organisation or household
          </label>
          <input
            type="text"
            id="consultation-org"
            name="organization"
            required
            autoComplete="organization"
            value={formData.organization}
            onChange={handleChange}
            className={inputClass}
            placeholder="e.g. Hotel Atelier, or your household name"
          />
        </div>

        <div>
          <label htmlFor="consultation-space" className={labelClass}>
            Type of space
          </label>
          <select
            id="consultation-space"
            name="spaceType"
            required
            value={formData.spaceType}
            onChange={handleChange}
            className={`${inputClass} cursor-pointer appearance-none bg-ink pr-10`}
          >
            <option value="">Select…</option>
            {SPACE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="consultation-phone" className={labelClass}>
            Phone <span className={optionalHint}>(optional)</span>
          </label>
          <input
            type="tel"
            id="consultation-phone"
            name="phone"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
            className={inputClass}
            placeholder="+44 20 0000 0000"
            inputMode="tel"
          />
        </div>

        <div>
          <label htmlFor="consultation-facilities" className={labelClass}>
            Facilities <span className={optionalHint}>(optional)</span>
          </label>
          <input
            type="text"
            id="consultation-facilities"
            name="facilities"
            value={formData.facilities}
            onChange={handleChange}
            className={inputClass}
            placeholder="e.g. 12 bathrooms across 3 floors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="consultation-timeline" className={labelClass}>
          Timeline <span className={optionalHint}>(optional)</span>
        </label>
        <select
          id="consultation-timeline"
          name="timeline"
          value={formData.timeline}
          onChange={handleChange}
          className={`${inputClass} cursor-pointer appearance-none bg-ink pr-10`}
        >
          <option value="">Select…</option>
          {TIMELINE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="consultation-message" className={labelClass}>
          Anything we should know <span className={optionalHint}>(optional)</span>
        </label>
        <textarea
          id="consultation-message"
          name="message"
          rows={4}
          maxLength={2000}
          value={formData.message}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
          placeholder="Context, constraints, what you're solving for."
        />
      </div>

      {TURNSTILE_SITE_KEY ? (
        <div aria-label="Human verification">
          <TurnstileWidget
            siteKey={TURNSTILE_SITE_KEY}
            onToken={setTurnstileToken}
            onExpire={() => {
              setTurnstileToken(null)
              track(EV.turnstileFailed, { reason: 'expired' })
            }}
            onError={() => {
              setTurnstileToken(null)
              track(EV.turnstileFailed, { reason: 'error' })
            }}
          />
        </div>
      ) : null}

      {submitStatus === 'error' && (
        <p className="text-sm text-gold-light" role="alert">
          Something went wrong. Please try again, or email{' '}
          <a href="mailto:office@novairaworld.com" className="underline hover:text-gold">
            office@novairaworld.com
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full sm:w-auto font-sans font-normal text-sm px-10 py-3.5 rounded-sm bg-gold text-ink hover:bg-gold-light transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-ink-muted"
      >
        {isSubmitting ? 'Sending…' : 'Send request'}
      </button>
    </form>
  )
}
