'use client'

/**
 * Job: Face, name, one line. No em dash stack.
 */
import { useState } from 'react'
import Image from 'next/image'
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
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-start gap-10 sm:gap-14">
        <div className="shrink-0 mx-auto sm:mx-0">
          {imgError ? (
            <div
              className="w-36 h-36 sm:w-40 sm:h-40 rounded-full border border-gold/20 bg-ink-muted flex items-center justify-center font-display text-2xl text-gold/50"
              aria-hidden
            >
              JT
            </div>
          ) : (
            <Image
              src={FOUNDER_IMAGE}
              alt="Josephine Turkson, founder of NOVAIRA"
              width={160}
              height={160}
              className="w-36 h-36 sm:w-40 sm:h-40 rounded-full object-cover border border-gold/20"
              sizes="(min-width: 640px) 160px, 144px"
              onError={() => setImgError(true)}
            />
          )}
        </div>
        <div className="text-center sm:text-left">
          <h2 id="founder-heading" className="sr-only">
            Founder
          </h2>
          <p className="font-sans text-xs uppercase tracking-[0.24em] text-gold-light/85 mb-4">
            {"Founder's note"}
          </p>
          <p className="font-display text-[1.0625rem] sm:text-lg text-silver-cream/95 font-light leading-[1.7] tracking-[-0.01em] max-w-prose">
            {"I started NOVAIRA because the places women spend the most time, homes, hotels, offices, hospitals, schools, still treat menstrual waste as an afterthought. The quiet expectation that you'll manage it yourself isn't dignity. It's the absence of care. I wanted NOVAIRA to be the product every one of those spaces should already have: quiet, medical-grade, and built to belong in any of them without fuss."}
          </p>
          <p className="font-sans text-sm text-cream/60 mt-5">
            Josephine Turkson, founder
          </p>
        </div>
      </div>
    </section>
  )
}
