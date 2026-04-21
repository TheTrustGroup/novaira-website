'use client'

/**
 * Job: Hero with resilient media (poster, reduced motion, save-data), light scroll depth.
 */
import { useEffect, useRef, useState } from 'react'
import { scrollToSectionId } from '@/lib/scrollToSection'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export default function Hero() {
  const reducedMotion = usePrefersReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const [saveData, setSaveData] = useState(false)
  const [heroDepth, setHeroDepth] = useState(0)

  useEffect(() => {
    const nav = typeof navigator !== 'undefined' ? navigator : undefined
    const conn = nav && 'connection' in nav ? (nav as Navigator & { connection?: { saveData?: boolean } }).connection : undefined
    if (conn?.saveData) setSaveData(true)
  }, [])

  const scrollToWaitlist = () => {
    scrollToSectionId('#first-release')
  }

  const showVideo = !videoFailed && !reducedMotion && !saveData

  useEffect(() => {
    if (reducedMotion) return
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const h = Math.max(rect.height, 1)
      const p = Math.min(1, Math.max(0, -rect.top / (h * 0.32)))
      setHeroDepth(p)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [reducedMotion])

  const overlayStrength = 0.88 + heroDepth * 0.08
  const contentFade = 1 - heroDepth * 0.12

  return (
    <section
      ref={sectionRef}
      data-hero
      className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 sm:px-12 pt-[5.75rem] pb-24 sm:pb-28"
      aria-label="Introduction"
    >
      <div className="absolute inset-0 z-0 bg-ink overflow-hidden">
        {showVideo ? (
          <>
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 gpu-layer ${
                videoReady ? 'opacity-100' : 'opacity-0'
              }`}
              style={
                reducedMotion
                  ? undefined
                  : { transform: `scale(${1 + heroDepth * 0.02})` }
              }
              onLoadedData={() => setVideoReady(true)}
              onError={() => setVideoFailed(true)}
            >
              <source src="/novaira-hero-video.mp4" type="video/mp4" />
            </video>
            {!videoReady && <div className="absolute inset-0 bg-ink" aria-hidden />}
          </>
        ) : (
          <div className="absolute inset-0 bg-ink" aria-hidden />
        )}
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-b from-ink via-ink/80 to-ink gpu-layer"
          style={{
            opacity: overlayStrength,
          }}
          aria-hidden
        />
      </div>

      <div
        className="relative z-10 w-full max-w-[34rem] sm:max-w-2xl lg:max-w-3xl mx-auto text-center px-2 gpu-layer"
        style={reducedMotion ? undefined : { opacity: contentFade }}
      >
        <h1 className="font-display font-light text-[1.875rem] leading-[1.18] sm:text-4xl sm:leading-[1.15] md:text-5xl md:leading-[1.12] lg:text-[3.25rem] lg:leading-[1.1] text-silver-cream text-balance mb-8 sm:mb-10 md:mb-12 text-legible-on-media">
          Menstrual hygiene disposal, made to belong in any space.
        </h1>
        <p className="font-sans font-normal text-[0.9375rem] sm:text-base text-cream/88 max-w-md mx-auto mb-12 sm:mb-14 leading-[1.75] text-legible-on-media">
          First release Q3 2026. For homes and institutions.
        </p>
        <button
          type="button"
          onClick={scrollToWaitlist}
          className="font-sans font-normal text-[0.8125rem] sm:text-sm tracking-[0.04em] uppercase px-9 py-3.5 sm:px-10 sm:py-4 rounded-sm bg-gold text-ink hover:bg-gold-light transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          Join the waitlist
        </button>
      </div>
    </section>
  )
}
