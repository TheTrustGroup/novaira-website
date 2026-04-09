'use client'

/**
 * Job: One clear promise, one line of context, one action. Certs sit in the bar below.
 */
import { useState } from 'react'
import { scrollToSectionId } from '@/lib/scrollToSection'

export default function Hero() {
  const [videoReady, setVideoReady] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)

  const scrollToPilot = () => {
    scrollToSectionId('#pilot-program')
  }

  const showVideo = !videoFailed

  return (
    <section
      className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 sm:px-12 pt-[5.75rem] pb-24 sm:pb-28"
      aria-label="Introduction"
    >
      <div className="absolute inset-0 z-0 bg-ink">
        {showVideo ? (
          <>
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                videoReady ? 'opacity-100' : 'opacity-0'
              }`}
              onLoadedData={() => setVideoReady(true)}
              onError={() => setVideoFailed(true)}
              aria-label="NOVAIRA product animation"
            >
              <source src="/novaira-hero-video.mp4" type="video/mp4" />
            </video>
            {!videoReady && <div className="absolute inset-0 bg-ink" aria-hidden />}
          </>
        ) : (
          <div className="absolute inset-0 bg-ink" aria-hidden />
        )}
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/78 to-ink/92 pointer-events-none"
          aria-hidden
        />
      </div>

      <div className="relative z-10 w-full max-w-[34rem] sm:max-w-2xl lg:max-w-3xl mx-auto text-center px-2">
        <h1 className="font-display font-light text-[1.875rem] leading-[1.18] sm:text-4xl sm:leading-[1.15] md:text-5xl md:leading-[1.12] lg:text-[3.25rem] lg:leading-[1.1] text-silver-cream text-balance mb-8 sm:mb-10 md:mb-12 text-legible-on-media">
          Menstrual hygiene disposal for spaces that refuse to compromise.
        </h1>
        <p className="font-sans font-normal text-[0.9375rem] sm:text-base text-cream/88 max-w-md mx-auto mb-12 sm:mb-14 leading-[1.75] text-legible-on-media">
          Founding partnerships open for deployment in Q3 2026.
        </p>
        <button
          type="button"
          onClick={scrollToPilot}
          className="font-sans font-normal text-[0.8125rem] sm:text-sm tracking-[0.04em] uppercase px-9 py-3.5 sm:px-10 sm:py-4 rounded-sm bg-gold text-ink hover:bg-gold-light transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          Apply for pilot
        </button>
      </div>
    </section>
  )
}
