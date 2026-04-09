'use client'

/**
 * Job: Human proof without a manifesto — photo, name, one sentence.
 */
import { useState } from 'react'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'

const FOUNDER_IMAGE = '/images/founder-josephine.jpg'

export default function FounderSection() {
  const ref = useRevealOnScroll<HTMLElement>()
  const [imgError, setImgError] = useState(false)

  return (
    <section
      ref={ref}
      className="reveal-on-scroll py-20 sm:py-28 px-5 sm:px-8"
      aria-labelledby="founder-heading"
    >
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-10 sm:gap-14">
        <div className="shrink-0">
          {imgError ? (
            <div
              className="w-40 h-40 sm:w-44 sm:h-44 rounded-full border border-gold/25 bg-ink-muted flex items-center justify-center font-display text-3xl text-gold/60"
              aria-hidden
            >
              JT
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element -- optional local asset; 404 falls back to initials
            <img
              src={FOUNDER_IMAGE}
              alt="Josephine Turkson, Founder of NOVAIRA"
              width={176}
              height={176}
              className="w-40 h-40 sm:w-44 sm:h-44 rounded-full object-cover border border-gold/25"
              loading="lazy"
              decoding="async"
              onError={() => setImgError(true)}
            />
          )}
        </div>
        <div>
          <h2 id="founder-heading" className="sr-only">
            Founder
          </h2>
          <p className="font-display text-xl sm:text-2xl text-silver-cream font-light leading-snug">
            <span className="text-gold-light">Josephine Turkson, Founder</span>
            <span className="text-cream/80"> — </span>
            NOVAIRA was built on a single belief: dignity deserves design.
          </p>
        </div>
      </div>
    </section>
  )
}
