'use client'

/**
 * Job: Scarcity, terms, one handoff to the form.
 */
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { scrollToSectionId } from '@/lib/scrollToSection'

const PILOT_FILLED = 3
const PILOT_TOTAL = 10
const REMAINING = PILOT_TOTAL - PILOT_FILLED

const BENEFITS = [
  'Installation on your timeline, with priority.',
  'Founder pricing at thirty percent below retail, fixed for you.',
  'A direct line to the team building the product.',
] as const

export default function PilotProgram() {
  const ref = useRevealOnScroll<HTMLElement>()

  const goContact = () => {
    scrollToSectionId('#contact')
  }

  return (
    <section
      ref={ref}
      id="pilot-program"
      className="reveal-on-scroll py-24 sm:py-32 lg:py-40 px-6 sm:px-10 bg-ink-muted/40 border-y border-gold/10"
      aria-labelledby="pilot-heading"
    >
      <div className="max-w-xl mx-auto text-center">
        <h2
          id="pilot-heading"
          className="font-display text-[1.75rem] sm:text-3xl md:text-4xl text-silver-cream font-light mb-10 sm:mb-12 text-balance tracking-[-0.02em]"
        >
          Founding partner
        </h2>
        <p className="font-sans font-normal text-base sm:text-lg text-cream/85 mb-6 leading-[1.75]">
          We are taking ten founding institutional partners for Q3 2026.
        </p>
        <p className="font-display text-xl sm:text-2xl text-gold-light font-light mb-14 sm:mb-16">
          {REMAINING} places left.
        </p>
        <div className="text-left mb-14 sm:mb-16">
          <p className="font-sans text-sm text-cream/60 mb-5">Partners receive</p>
          <ul className="space-y-4 font-sans font-normal text-cream/85 text-[0.9375rem] sm:text-base leading-relaxed">
            {BENEFITS.map((b) => (
              <li key={b} className="pl-4 border-l border-gold/25">
                {b}
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          onClick={goContact}
          className="font-sans font-normal text-[0.8125rem] sm:text-sm tracking-[0.04em] uppercase px-10 py-4 rounded-sm bg-gold text-ink hover:bg-gold-light transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink-muted"
        >
          Request consultation
        </button>
      </div>
    </section>
  )
}
