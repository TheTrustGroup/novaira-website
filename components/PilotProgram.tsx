'use client'

/**
 * Job: Pilot scarcity + what partners get + one apply CTA.
 */
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'

const PILOT_FILLED = 3
const PILOT_TOTAL = 10
const REMAINING = PILOT_TOTAL - PILOT_FILLED

const BENEFITS = [
  'Priority installation on your schedule.',
  'Founder pricing: 30% below retail, locked permanently.',
  'Direct product team access; your site informs the roadmap.',
] as const

export default function PilotProgram() {
  const ref = useRevealOnScroll<HTMLElement>()

  const goContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      ref={ref}
      id="pilot-program"
      className="reveal-on-scroll py-20 sm:py-28 lg:py-36 px-5 sm:px-8 bg-ink-muted/50 border-y border-gold/15"
      aria-labelledby="pilot-heading"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2
          id="pilot-heading"
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-silver-cream font-light mb-8 sm:mb-10 text-balance"
        >
          Founding partner
        </h2>
        <p className="font-sans font-extralight text-lg sm:text-xl text-cream/90 mb-4 leading-relaxed">
          We are onboarding {PILOT_TOTAL} founding institutional partners for Q3 2026 deployment.
        </p>
        <p className="font-display text-2xl sm:text-3xl text-gold-light font-light mb-12 sm:mb-14">
          {REMAINING} slots remaining.
        </p>
        <div className="text-left max-w-md mx-auto mb-12 sm:mb-14">
          <p className="font-sans text-xs tracking-[0.18em] uppercase text-gold/90 mb-4">What partners receive</p>
          <ul className="space-y-3 font-sans font-extralight text-cream/88 text-sm sm:text-base">
            {BENEFITS.map((b) => (
              <li key={b} className="flex gap-3">
                <span className="text-gold shrink-0" aria-hidden>
                  ·
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          onClick={goContact}
          className="font-sans font-light text-sm tracking-wide px-10 py-4 rounded-sm bg-gold text-ink hover:bg-gold-light transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink-muted"
        >
          Apply for Pilot Partnership
        </button>
      </div>
    </section>
  )
}
