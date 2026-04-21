'use client'

/**
 * Job: Lightweight waitlist entry. One field (email) is required; name and
 * space type are optional context for segmentation. Submits to
 * /api/waitlist which owns position/tier assignment server-side.
 *
 * This is the pre-launch top-of-funnel form. The ConsultationForm is the
 * qualified/operator path for institutional buyers who want a conversation.
 *
 * Anti-abuse: honeypot + time-to-submit (enforced by the API). No Turnstile
 * on the waitlist path — friction should be near-zero for the primary
 * conversion, and the rate limiter + honeypot are sufficient at this volume.
 */
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { getPostHog } from '@/lib/posthog'

const SPACE_OPTIONS = [
  { value: 'home', label: 'Home / residence' },
  { value: 'hotel', label: 'Hotel / hospitality' },
  { value: 'hospital', label: 'Hospital / healthcare' },
  { value: 'school', label: 'School / education' },
  { value: 'office', label: 'Corporate office' },
  { value: 'other', label: 'Other' },
] as const

type SpaceValue = '' | (typeof SPACE_OPTIONS)[number]['value']

type FormState = {
  email: string
  name: string
  spaceType: SpaceValue
  website: string // honeypot
}

type AnalyticsProps = Record<string, string | number | boolean | undefined>

const EV = {
  viewed: 'waitlist_form_viewed',
  started: 'waitlist_form_started',
  submitted: 'waitlist_form_submitted',
  error: 'waitlist_form_error',
} as const

function track(event: string, props: AnalyticsProps = {}) {
  const ph = getPostHog()
  if (!ph) return
  const clean: Record<string, string | number | boolean> = {}
  for (const [k, v] of Object.entries(props)) {
    if (v !== undefined) clean[k] = v
  }
  ph.capture(event, clean)
}

const EMPTY: FormState = { email: '', name: '', spaceType: '', website: '' }

const inputClass =
  'w-full px-4 py-3 bg-ink border border-gold/25 text-cream placeholder:text-cream/35 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/40 transition-colors duration-200 rounded-sm font-sans font-normal text-sm sm:text-base'
const labelClass = 'block text-sm text-cream/70 mb-2 font-sans font-normal'

type SuccessPayload = {
  position: number | null
  tier: 'founder' | 'early' | 'standard' | null
}

export default function WaitlistForm() {
  const [formData, setFormData] = useState<FormState>(EMPTY)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [success, setSuccess] = useState<SuccessPayload>({ position: null, tier: null })

  const viewedRef = useRef(false)
  const startedRef = useRef(false)
  const startedAtRef = useRef<number>(Date.now())

  useEffect(() => {
    if (viewedRef.current) return
    viewedRef.current = true
    track(EV.viewed)
  }, [])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!startedRef.current && e.target.name !== 'website') {
      startedRef.current = true
      track(EV.started, { first_field: e.target.name })
    }
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formData.website) return // honeypot

    setIsSubmitting(true)
    setStatus('idle')
    setErrorMsg(null)

    const ph = getPostHog()
    const distinctId = ph ? ph.get_distinct_id() : undefined
    const timeOnForm = Date.now() - startedAtRef.current

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email.trim(),
          name: formData.name.trim() || undefined,
          organization_type: formData.spaceType || undefined,
          distinct_id: distinctId,
        }),
      })

      const data = (await res.json().catch(() => ({}))) as {
        position?: number
        tier?: 'founder' | 'early' | 'standard'
        error?: string
      }

      if (!res.ok) {
        throw new Error(data.error || 'Request failed')
      }

      setSuccess({
        position: typeof data.position === 'number' ? data.position : null,
        tier: data.tier ?? null,
      })
      setStatus('success')
      track(EV.submitted, {
        has_name: Boolean(formData.name.trim()),
        space_type: formData.spaceType || undefined,
        tier: data.tier,
        position: data.position,
        time_on_form_ms: timeOnForm,
      })
      setFormData(EMPTY)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.')
      track(EV.error, { reason: 'submit_failed' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="text-center py-8 px-2 animate-[fadeIn_0.45s_ease-out_forwards]"
      >
        <p className="font-display text-xl sm:text-2xl text-silver-cream font-light leading-[1.4] max-w-md mx-auto">
          {"You're on the list."}
        </p>
        {success.position != null ? (
          <p className="font-sans text-sm text-cream/70 mt-4 leading-relaxed">
            Position{' '}
            <span className="text-gold-light tabular-nums">{success.position}</span>
            {success.tier ? (
              <>
                {' · '}
                <span className="text-cream/60">{tierLabel(success.tier)}</span>
              </>
            ) : null}
            {". We'll write when it's time."}
          </p>
        ) : (
          <p className="font-sans text-sm text-cream/70 mt-4">
            {"We'll write when it's time."}
          </p>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left" noValidate>
      {/* Honeypot: bots tend to fill every field. Humans never see this. */}
      <div className="absolute -left-[9999px] top-0 w-px h-px overflow-hidden" aria-hidden>
        <label htmlFor="waitlist-website">Website</label>
        <input
          type="text"
          id="waitlist-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="waitlist-email" className={labelClass}>
          Email
        </label>
        <input
          type="email"
          id="waitlist-email"
          name="email"
          required
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          className={inputClass}
          placeholder="you@domain.com"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="waitlist-name" className={labelClass}>
            Name <span className="text-cream/45 font-light">(optional)</span>
          </label>
          <input
            type="text"
            id="waitlist-name"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
            placeholder="Full name"
          />
        </div>

        <div>
          <label htmlFor="waitlist-space" className={labelClass}>
            For <span className="text-cream/45 font-light">(optional)</span>
          </label>
          <select
            id="waitlist-space"
            name="spaceType"
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

      {status === 'error' && (
        <p className="text-sm text-gold-light" role="alert">
          {errorMsg ?? 'Something went wrong. Please try again.'}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto font-sans font-normal text-[0.8125rem] sm:text-sm tracking-[0.04em] uppercase px-10 py-3.5 rounded-sm bg-gold text-ink hover:bg-gold-light transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
      >
        {isSubmitting ? 'Adding…' : 'Join the waitlist'}
      </button>

      <p className="text-xs text-cream/45 leading-relaxed">
        {"We'll use your email only to write you about the release. Unsubscribe at any time."}
      </p>
    </form>
  )
}

// Internal tier names ('founder', 'early', 'standard') are kept for ops
// segmentation. User-facing labels stay plain and avoid any "founding
// partner" framing, which the brand has stepped back from pre-launch.
function tierLabel(tier: 'founder' | 'early' | 'standard'): string {
  switch (tier) {
    case 'founder':
      return 'priority access'
    case 'early':
      return 'early access'
    case 'standard':
      return 'standard'
  }
}
