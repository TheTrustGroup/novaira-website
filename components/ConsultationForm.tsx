'use client'

/**
 * Job: Send consultation lead — four fields, fetch POST, no navigation.
 */
import { useState, FormEvent, ChangeEvent } from 'react'

const SPACE_OPTIONS = [
  { value: 'hotel', label: 'Hotel / hospitality' },
  { value: 'hospital', label: 'Hospital / healthcare' },
  { value: 'school', label: 'School / education' },
  { value: 'office', label: 'Corporate office' },
  { value: 'home', label: 'Private residence' },
  { value: 'other', label: 'Other' },
] as const

const inputClass =
  'w-full px-4 py-3 bg-ink border border-gold/25 text-cream placeholder:text-cream/35 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/40 transition-colors duration-200 rounded-sm font-sans font-extralight text-sm sm:text-base'
const labelClass = 'block text-xs tracking-[0.12em] uppercase text-gold/85 mb-2 font-sans font-light'

export default function ConsultationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    spaceType: '' as '' | (typeof SPACE_OPTIONS)[number]['value'],
    website: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submittedName, setSubmittedName] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formData.website) return
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          organization: formData.organization.trim(),
          organization_type: formData.spaceType,
          website: formData.website || undefined,
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error((data as { error?: string }).error || 'Request failed')
      }
      setSubmittedName(formData.name.trim())
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        organization: '',
        spaceType: '',
        website: '',
      })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className="text-center py-10 px-4 animate-[fadeIn_0.45s_ease-out_forwards]">
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
          placeholder="you@organisation.com"
        />
      </div>

      <div>
        <label htmlFor="consultation-org" className={labelClass}>
          Organisation
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
          placeholder="Organisation name"
        />
      </div>

      <div>
        <label htmlFor="consultation-space" className={labelClass}>
          Type of Space
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

      {submitStatus === 'error' && (
        <p className="text-sm text-gold-light" role="alert">
          Something went wrong. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto font-sans font-light text-sm px-10 py-3.5 rounded-sm bg-gold text-ink hover:bg-gold-light transition-colors duration-200 disabled:opacity-45 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink-muted"
      >
        {isSubmitting ? 'Sending…' : 'Request Consultation'}
      </button>
    </form>
  )
}
