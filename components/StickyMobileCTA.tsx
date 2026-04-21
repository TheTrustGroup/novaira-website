'use client'

/**
 * Job: Keep the primary CTA one thumb-tap away on mobile.
 *
 * The primary CTA is now the waitlist (the "first release" section owns
 * the signup). We hide the bar when the hero, the first-release section,
 * or the contact form is already on-screen — visitors already have a
 * conversion surface in view, an extra bar would be noise.
 */
import { useEffect, useState } from 'react'
import { scrollToSectionId } from '@/lib/scrollToSection'

export default function StickyMobileCTA() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hero = document.querySelector('[data-hero]') as HTMLElement | null
    const firstRelease = document.getElementById('first-release')
    const contact = document.getElementById('contact')
    if (!hero || !firstRelease || !contact) return

    let heroVisible = true
    let firstReleaseVisible = false
    let contactVisible = false
    const sync = () =>
      setShow(!heroVisible && !firstReleaseVisible && !contactVisible)

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === hero) heroVisible = entry.isIntersecting
          if (entry.target === firstRelease)
            firstReleaseVisible = entry.isIntersecting
          if (entry.target === contact) contactVisible = entry.isIntersecting
        }
        sync()
      },
      { threshold: 0.05 }
    )

    io.observe(hero)
    io.observe(firstRelease)
    io.observe(contact)
    return () => io.disconnect()
  }, [])

  const handleClick = () => {
    scrollToSectionId('#first-release')
  }

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-30 md:hidden transition-transform duration-300 ease-out pb-[env(safe-area-inset-bottom)] ${
        show ? 'translate-y-0' : 'translate-y-full pointer-events-none'
      }`}
    >
      <div className="bg-ink/95 backdrop-blur-md border-t border-gold/15 px-5 py-3">
        <button
          type="button"
          onClick={handleClick}
          tabIndex={show ? 0 : -1}
          className="w-full font-sans font-normal text-[0.8125rem] tracking-[0.04em] uppercase py-3.5 rounded-sm bg-gold text-ink hover:bg-gold-light transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          Join the waitlist
        </button>
      </div>
    </div>
  )
}
