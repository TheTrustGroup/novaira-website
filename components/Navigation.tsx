'use client'

/**
 * Job: Same-page anchors + primary pilot CTA — three links only.
 */
import { useEffect, useState } from 'react'
import { NovairaLogo } from '@/components/NovairaLogo'

const NAV_ITEMS = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pilot', href: '#pilot-program' },
  { label: 'Contact', href: '#contact' },
] as const

function scrollToHash(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled ? 'bg-ink/95 border-b border-gold/15 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav
          className="max-w-6xl mx-auto px-5 sm:px-8 h-[4.5rem] flex items-center justify-between gap-4"
          aria-label="Main navigation"
        >
          <a
            href="/"
            className="flex items-center gap-2.5 text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink rounded-sm"
            onClick={(e) => {
              if (typeof window !== 'undefined' && window.location.pathname === '/') {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
            aria-label="NOVAIRA home"
          >
            <NovairaLogo heightClass="h-8 sm:h-9" priority className="shrink-0" />
            <span className="font-display text-xl sm:text-2xl font-light tracking-tight text-silver-cream">
              NOVAIRA
            </span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToHash(item.href)
                }}
                className="text-sm font-sans font-extralight text-cream/85 hover:text-gold-light transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#pilot-program"
              onClick={(e) => {
                e.preventDefault()
                scrollToHash('#pilot-program')
              }}
              className="text-sm font-sans font-light px-5 py-2.5 rounded-sm bg-gold text-ink hover:bg-gold-light transition-colors duration-200"
            >
              Apply for Pilot Partnership
            </a>
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-gold rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-200 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          className="absolute inset-0 bg-ink/90"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute top-[4.5rem] right-0 bottom-0 w-[min(100%,20rem)] bg-ink-muted border-l border-gold/15 p-8 flex flex-col gap-6 transition-transform duration-200 ease-out ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-display text-xl text-silver-cream"
              onClick={(e) => {
                e.preventDefault()
                setMobileOpen(false)
                scrollToHash(item.href)
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#pilot-program"
            className="mt-4 text-center text-sm font-light px-5 py-3 rounded-sm bg-gold text-ink"
            onClick={(e) => {
              e.preventDefault()
              setMobileOpen(false)
              scrollToHash('#pilot-program')
            }}
          >
            Apply for Pilot Partnership
          </a>
        </div>
      </div>
    </>
  )
}
