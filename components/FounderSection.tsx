'use client'

/**
 * Job: Face, name, one line. No em dash stack.
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
      className="reveal-on-scroll py-24 sm:py-32 px-6 sm:px-10"
      aria-labelledby="founder-heading"
    >
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-12 sm:gap-16">
        <div className="shrink-0 mx-auto sm:mx-0">
          {imgError ? (
            <div
              className="w-36 h-36 sm:w-40 sm:h-40 rounded-full border border-gold/20 bg-ink-muted flex items-center justify-center font-display text-2xl text-gold/50"
              aria-hidden
            >
              JT
            </div>
          ) : (
            <img
              src={FOUNDER_IMAGE}
              alt="Josephine Turkson, founder of NOVAIRA"
              width={160}
              height={160}
              className="w-36 h-36 sm:w-40 sm:h-40 rounded-full object-cover border border-gold/20"
              loading="lazy"
              decoding="async"
              onError={() => setImgError(true)}
            />
          )}
        </div>
        <div className="text-center sm:text-left">
          <h2 id="founder-heading" className="sr-only">
            Founder
          </h2>
          <p className="font-sans text-sm text-gold-light/90 mb-3">Josephine Turkson, founder</p>
          <p className="font-display text-lg sm:text-xl text-silver-cream/95 font-light leading-[1.55] tracking-[-0.02em]">
            NOVAIRA rests on one premise: dignity deserves design.
          </p>
        </div>
      </div>
    </section>
  )
}
