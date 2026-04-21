'use client'

/**
 * Job: Defensible facts for buyers — no invented specs. Same claims as structured data.
 */
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'

const FACTS = [
  'CE marking where applicable for safety and EMC; certificates available on request.',
  'ISO 9001:2015 quality management at the organisation level.',
  'Medical-grade materials chosen for hygiene-critical environments.',
  'Designed for quiet operation in homes, guest-facing, and clinical spaces.',
  'First release ships Q3 2026. Waitlist is open.',
] as const

export default function ProofStrip() {
  const ref = useRevealOnScroll<HTMLElement>()

  return (
    <section
      ref={ref}
      className="reveal-on-scroll border-t border-gold/10 bg-ink-muted/30 py-20 sm:py-24 px-6 sm:px-10"
      aria-labelledby="proof-heading"
    >
      <div className="max-w-2xl mx-auto">
        <h2
          id="proof-heading"
          className="font-display text-lg sm:text-xl text-silver-cream/95 font-light text-center mb-10 sm:mb-12 tracking-[-0.02em]"
        >
          What we stand behind
        </h2>
        <ul className="space-y-4 sm:space-y-5 font-sans font-normal text-[0.9375rem] sm:text-base text-cream/82 leading-[1.7]">
          {FACTS.map((line) => (
            <li key={line} className="pl-4 sm:pl-5 border-l-2 border-gold/25">
              {line}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
