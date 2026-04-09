'use client'

/**
 * Job: Headline + deployment context + pilot CTA. Certifications live in CredentialsBar only.
 */
import { useState } from 'react'
import { NovairaLogo } from '@/components/NovairaLogo'
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
      className="relative min-h-[100svh] flex flex-col items-center justify-center px-5 sm:px-8 pt-[4.5rem] pb-16"
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
            {!videoReady && (
              <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
                <NovairaLogo heightClass="h-16 sm:h-20" className="opacity-30" />
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
            <NovairaLogo heightClass="h-24 sm:h-28" className="opacity-35" />
          </div>
        )}
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink/92 via-ink/82 to-ink/94 pointer-events-none"
          aria-hidden
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-1">
        <h1 className="font-display font-light text-display-sm sm:text-display-md md:text-display-lg lg:text-display-xl text-silver-cream text-balance mb-6 sm:mb-8 text-legible-on-media">
          Menstrual hygiene disposal.
          <br />
          Designed for the spaces that demand excellence.
        </h1>
        <p className="font-sans font-light text-base sm:text-lg text-cream max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed text-legible-on-media">
          Founding institutional partnerships · Q3 2026 deployment.
        </p>
        <button
          type="button"
          onClick={scrollToPilot}
          className="font-sans font-light text-sm tracking-wide px-8 py-3.5 sm:px-10 sm:py-4 rounded-sm bg-gold text-ink hover:bg-gold-light transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          Apply for Pilot Partnership
        </button>
      </div>
    </section>
  )
}
