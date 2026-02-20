'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import { Mail, Building2, MessageSquare } from 'lucide-react'

const INSTITUTION_OPTIONS = [
  { value: 'hotel', label: 'Hotel / Hospitality' },
  { value: 'hospital', label: 'Hospital / Healthcare' },
  { value: 'school', label: 'School / Education' },
  { value: 'office', label: 'Corporate Office' },
  { value: 'home', label: 'Private Residence' },
  { value: 'other', label: 'Other' },
] as const

const FACILITIES_OPTIONS = [
  { value: '1-5', label: '1–5' },
  { value: '6-20', label: '6–20' },
  { value: '21-50', label: '21–50' },
  { value: '50+', label: '50+' },
] as const

const TIMELINE_OPTIONS = [
  { value: 'within_1_month', label: 'Within 1 month' },
  { value: '1_3_months', label: '1–3 months' },
  { value: '3_6_months', label: '3–6 months' },
  { value: 'exploring', label: 'Exploring options' },
] as const

const inputBase =
  'w-full px-4 py-3 bg-charcoal border border-rose-gold/20 text-sand focus:border-rose-gold focus:outline-none focus:ring-2 focus:ring-rose-gold/50 transition-all duration-300 rounded font-light'
const labelClass = 'block text-sm font-light text-sand/80 mb-2'
const requiredStar = <span className="text-rose-gold">*</span>

export default function ConsultationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    institutionType: '',
    facilities: '',
    timeline: '',
    message: '',
    website: '', // honeypot
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submittedName, setSubmittedName] = useState('')

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formData.website) return // honeypot
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
          institution_type: formData.institutionType || undefined,
          facilities: formData.facilities || undefined,
          timeline: formData.timeline || undefined,
          message: formData.message.trim() || undefined,
          website: formData.website || undefined, // honeypot
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
        institutionType: '',
        facilities: '',
        timeline: '',
        message: '',
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
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12 px-4"
      >
        <div className="w-16 h-16 bg-rose-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8 text-rose-gold" aria-hidden="true" />
        </div>
        <p className="text-lg sm:text-xl text-ivory font-light leading-relaxed max-w-md mx-auto">
          Thank you, {submittedName}. We&apos;ll be in touch within 2 business days.
          <br />
          <span className="text-sand/80 mt-2 block">— The NOVAIRA Team</span>
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto text-left space-y-5">
      {/* Honeypot - hidden from users */}
      <div className="absolute -left-[9999px] top-0" aria-hidden="true">
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
          Full Name {requiredStar}
        </label>
        <input
          type="text"
          id="consultation-name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className={inputBase}
          placeholder="Your full name"
          aria-required="true"
        />
      </div>

      <div>
        <label htmlFor="consultation-email" className={labelClass}>
          Work Email {requiredStar}
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sand/40 pointer-events-none" />
          <input
            type="email"
            id="consultation-email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={`${inputBase} pl-12`}
            placeholder="you@company.com"
            aria-required="true"
          />
        </div>
      </div>

      <div>
        <label htmlFor="consultation-organization" className={labelClass}>
          Organization Name {requiredStar}
        </label>
        <div className="relative">
          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sand/40 pointer-events-none" />
          <input
            type="text"
            id="consultation-organization"
            name="organization"
            required
            value={formData.organization}
            onChange={handleChange}
            className={`${inputBase} pl-12`}
            placeholder="Your organization"
            aria-required="true"
          />
        </div>
      </div>

      <div>
        <label htmlFor="consultation-institution" className={labelClass}>
          Type of Institution {requiredStar}
        </label>
        <select
          id="consultation-institution"
          name="institutionType"
          required
          value={formData.institutionType}
          onChange={handleChange}
          className={`${inputBase} appearance-none cursor-pointer bg-charcoal pr-10`}
          aria-required="true"
        >
          <option value="">Select type...</option>
          {INSTITUTION_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="consultation-facilities" className={labelClass}>
          Number of bathrooms / facilities
        </label>
        <select
          id="consultation-facilities"
          name="facilities"
          value={formData.facilities}
          onChange={handleChange}
          className={`${inputBase} appearance-none cursor-pointer bg-charcoal pr-10`}
        >
          <option value="">Select range...</option>
          {FACILITIES_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="consultation-timeline" className={labelClass}>
          Timeline
        </label>
        <select
          id="consultation-timeline"
          name="timeline"
          value={formData.timeline}
          onChange={handleChange}
          className={`${inputBase} appearance-none cursor-pointer bg-charcoal pr-10`}
        >
          <option value="">Select timeline...</option>
          {TIMELINE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="consultation-message" className={labelClass}>
          Message / Any questions
        </label>
        <div className="relative">
          <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-sand/40 pointer-events-none" />
          <textarea
            id="consultation-message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className={`${inputBase} pl-12 resize-none`}
            placeholder="Tell us about your needs or questions..."
          />
        </div>
      </div>

      {submitStatus === 'error' && (
        <p className="text-sm text-rose-gold" role="alert">
          Something went wrong. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto px-8 py-3 bg-rose-gold text-charcoal hover:bg-rose-blush transition-all duration-300 font-light rounded focus:outline-none focus:ring-2 focus:ring-rose-gold focus:ring-offset-2 focus:ring-offset-charcoal disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Request Consultation'}
      </button>
    </form>
  )
}
