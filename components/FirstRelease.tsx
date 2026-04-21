'use client'

/**
 * Job: Honest pre-launch moment. Name the release, set the date, offer the
 * waitlist. No "founding partner" language, no scarcity counter, no
 * discount framing. The consultation form (below) handles qualified
 * operator inquiries; this section handles everyone else.
 */
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import WaitlistForm from '@/components/WaitlistForm'

export default function FirstRelease() {
  const ref = useRevealOnScroll<HTMLElement>()

  return (
    <section
      ref={ref}
      id="first-release"
      className="reveal-on-scroll py-24 sm:py-32 lg:py-40 px-6 sm:px-10 bg-ink-muted/40 border-y border-gold/10"
      aria-labelledby="first-release-heading"
    >
      <div className="max-w-xl mx-auto text-center">
        <p className="font-sans text-xs uppercase tracking-[0.24em] text-gold-light/85 mb-5">
          The first release
        </p>
        <h2
          id="first-release-heading"
          className="font-display text-[1.75rem] sm:text-3xl md:text-4xl text-silver-cream font-light mb-8 sm:mb-10 text-balance tracking-[-0.02em]"
        >
          NOVAIRA 01 ships Q3 2026.
        </h2>
        <p className="font-sans font-normal text-[0.9375rem] sm:text-base text-cream/82 mb-4 leading-[1.8] max-w-md mx-auto text-balance">
          The first series is designed for homes, hotels, hospitals, schools,
          and offices. The same standard of care, regardless of space.
        </p>
        <p className="font-sans font-normal text-[0.9375rem] sm:text-base text-cream/70 mb-12 sm:mb-14 leading-[1.8] max-w-md mx-auto text-balance">
          Join the waitlist to hear first when units are available and to
          reserve priority in your region.
        </p>

        <div className="text-left">
          <WaitlistForm />
        </div>
      </div>
    </section>
  )
}
