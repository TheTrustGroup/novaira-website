'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { Loader2, Copy, Check } from 'lucide-react'

const SPACE_TYPES = [
  { value: '', label: 'Select type of space (optional)' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'hospital', label: 'Hospital' },
  { value: 'school', label: 'School' },
  { value: 'office', label: 'Office' },
  { value: 'home', label: 'Home' },
  { value: 'other', label: 'Other' },
] as const

const REFERRAL_DOMAIN = 'novairaworld.com'

type Tier = 'founder' | 'early' | 'standard'

function tierLabel(tier: Tier): string {
  switch (tier) {
    case 'founder':
      return 'Founder Partner'
    case 'early':
      return 'Early Access'
    default:
      return 'Waitlist'
  }
}

type CountResponse = { total: number; founderSpotsRemaining: number }

export default function WaitlistSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const [referralCode, setReferralCode] = useState<string | null>(null)
  const [showReferralBanner, setShowReferralBanner] = useState(false)
  const [count, setCount] = useState<CountResponse | null>(null)
  const [countLoading, setCountLoading] = useState(true)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [organization, setOrganization] = useState('')
  const [organizationType, setOrganizationType] = useState('')
  const [hp, setHp] = useState('')

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [successData, setSuccessData] = useState<{
    position: number
    tier: Tier
    referralCode: string | null
  } | null>(null)
  const [copyFeedback, setCopyFeedback] = useState(false)

  // Read ?ref= from URL on mount and pre-fill referral + show banner
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const refParam = params.get('ref')?.trim()
    if (refParam) {
      setReferralCode(refParam)
      setShowReferralBanner(true)
    }
  }, [])

  // Fetch waitlist count on mount
  useEffect(() => {
    let cancelled = false
    async function fetchCount() {
      try {
        const res = await fetch('/api/waitlist/count')
        if (!res.ok) throw new Error('Count failed')
        const data = await res.json()
        if (!cancelled) {
          setCount(data)
        }
      } catch {
        if (!cancelled) {
          setCount({ total: 0, founderSpotsRemaining: 50 })
        }
      } finally {
        if (!cancelled) setCountLoading(false)
      }
    }
    fetchCount()
    return () => {
      cancelled = true
    }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'loading') return
    if (hp) return // honeypot
    setErrorMessage('')
    setStatus('loading')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || undefined,
          email: email.trim().toLowerCase(),
          organization: organization.trim() || undefined,
          organization_type: organizationType || undefined,
          referral_code: referralCode || undefined,
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        setErrorMessage(data?.error ?? 'Something went wrong.')
        setStatus('error')
        return
      }

      if (data.success) {
        setSuccessData({
          position: data.position,
          tier: data.tier,
          referralCode: data.referralCode ?? null,
        })
        setStatus('success')
        // Refresh count so "X spots remaining" updates
        const countRes = await fetch('/api/waitlist/count')
        if (countRes.ok) {
          const countData = await countRes.json()
          setCount(countData)
        }
      } else {
        setErrorMessage(data?.error ?? 'Something went wrong.')
        setStatus('error')
      }
    } catch {
      setErrorMessage('Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  function copyReferralLink() {
    if (!successData?.referralCode) return
    const url = `https://${REFERRAL_DOMAIN}/?ref=${successData.referralCode}`
    navigator.clipboard.writeText(url).then(() => {
      setCopyFeedback(true)
      setTimeout(() => setCopyFeedback(false), 2000)
    })
  }

  const founderSpotsText = countLoading
    ? null
    : count
      ? count.founderSpotsRemaining <= 0
        ? 'Founder spots filled'
        : `${count.founderSpotsRemaining} Founder spots remaining`
      : '12 Founder spots remaining'

  return (
    <section
      id="waitlist"
      ref={ref}
      className="py-24 sm:py-32 lg:py-40 px-6 sm:px-8 lg:px-12 bg-charcoal/50"
      aria-labelledby="waitlist-heading"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2
            id="waitlist-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-serif text-ivory mb-6 font-medium"
          >
            Join the Waitlist
          </h2>
          <p className="text-lg sm:text-xl text-sand/85 font-light leading-relaxed mb-8">
            First 50 members receive Founder Partner pricing — 30% below retail with direct access to our engineering team.
          </p>

          {showReferralBanner && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 py-3 px-4 rounded border border-rose-gold/30 bg-rose-gold/5 text-sand/90 text-sm font-light"
            >
              You were invited — you&apos;ll skip ahead of the standard queue.
            </motion.div>
          )}

          {founderSpotsText && status !== 'success' && (
            <p className="text-sand/80 font-light text-sm">
              🟡 {founderSpotsText}
            </p>
          )}
          {countLoading && status !== 'success' && (
            <div className="h-5 w-48 mx-auto mt-2 bg-charcoal/60 rounded animate-pulse" aria-hidden />
          )}
        </motion.div>

        {status === 'success' && successData ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-charcoal/70 border border-rose-gold/20 rounded-lg p-8 sm:p-10 text-center"
          >
            <div className="inline-block px-4 py-1.5 rounded border border-rose-gold/40 text-rose-gold text-sm font-light tracking-wide mb-6">
              {tierLabel(successData.tier)}
            </div>
            <p className="text-sand/70 text-sm font-light mb-2">Your position</p>
            <p className="text-5xl sm:text-6xl font-serif text-ivory font-medium mb-8">
              #{successData.position}
            </p>
            {successData.referralCode && (
              <>
                <p className="text-sand/70 text-sm font-light mb-2">Your referral link</p>
                <p className="text-ivory/95 font-mono text-sm break-all mb-4">
                  {REFERRAL_DOMAIN}/?ref={successData.referralCode}
                </p>
                <button
                  type="button"
                  onClick={copyReferralLink}
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-rose-gold/50 text-rose-gold hover:bg-rose-gold/10 transition-colors font-light text-sm rounded focus:outline-none focus:ring-2 focus:ring-rose-gold focus:ring-offset-2 focus:ring-offset-charcoal"
                >
                  {copyFeedback ? (
                    <>
                      <Check className="w-4 h-4" aria-hidden />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" aria-hidden />
                      Copy Link
                    </>
                  )}
                </button>
                <p className="mt-6 text-sand/70 text-sm font-light max-w-sm mx-auto">
                  Each person who joins through your link moves you up 3 positions.
                </p>
              </>
            )}
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <input
              type="text"
              name="_hp"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
            />
            {referralCode && (
              <input type="hidden" name="referral_code" value={referralCode} readOnly />
            )}

            <div>
              <label htmlFor="waitlist-name" className="block text-sm text-sand/80 font-light mb-1.5">
                Full Name <span className="text-rose-gold/80">*</span>
              </label>
              <input
                id="waitlist-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-charcoal/60 border border-rose-gold/20 rounded text-ivory placeholder-sand/40 font-light focus:outline-none focus:ring-1 focus:ring-rose-gold/50 focus:border-rose-gold/40"
                placeholder="Your full name"
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="waitlist-email" className="block text-sm text-sand/80 font-light mb-1.5">
                Work Email <span className="text-rose-gold/80">*</span>
              </label>
              <input
                id="waitlist-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-charcoal/60 border border-rose-gold/20 rounded text-ivory placeholder-sand/40 font-light focus:outline-none focus:ring-1 focus:ring-rose-gold/50 focus:border-rose-gold/40"
                placeholder="you@company.com"
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="waitlist-org" className="block text-sm text-sand/80 font-light mb-1.5">
                Organization <span className="text-sand/50">(optional)</span>
              </label>
              <input
                id="waitlist-org"
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full px-4 py-3 bg-charcoal/60 border border-rose-gold/20 rounded text-ivory placeholder-sand/40 font-light focus:outline-none focus:ring-1 focus:ring-rose-gold/50 focus:border-rose-gold/40"
                placeholder="Company or institution"
                autoComplete="organization"
              />
            </div>
            <div>
              <label htmlFor="waitlist-space" className="block text-sm text-sand/80 font-light mb-1.5">
                Type of Space <span className="text-sand/50">(optional)</span>
              </label>
              <select
                id="waitlist-space"
                value={organizationType}
                onChange={(e) => setOrganizationType(e.target.value)}
                className="w-full px-4 py-3 bg-charcoal/60 border border-rose-gold/20 rounded text-ivory font-light focus:outline-none focus:ring-1 focus:ring-rose-gold/50 focus:border-rose-gold/40 appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d4a5a5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.25rem', paddingRight: '2.5rem' }}
              >
                {SPACE_TYPES.map((opt) => (
                  <option key={opt.value || 'empty'} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {errorMessage && (
              <p className="text-red-400/90 text-sm font-light" role="alert">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-4 bg-rose-gold text-charcoal hover:bg-rose-blush disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 font-light text-sm tracking-wide rounded focus:outline-none focus:ring-2 focus:ring-rose-gold focus:ring-offset-2 focus:ring-offset-charcoal flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" aria-hidden />
                  Joining...
                </>
              ) : (
                'Join the Waitlist'
              )}
            </button>
          </motion.form>
        )}
      </div>
    </section>
  )
}
