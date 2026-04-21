'use client'

/**
 * Job: Quiet wayfinding only. No second CTA (hero and first release carry conversion).
 */
import { useEffect, useState, type MouseEvent } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { scrollToSectionId, scrollToSectionIdAfterLayout } from '@/lib/scrollToSection'
import Logo from '@/components/Logo'

const NAV_ITEMS = [
  { label: 'How it works', hash: '#how-it-works' as const },
  { label: 'First release', hash: '#first-release' as const },
  { label: 'Contact', hash: '#contact' as const },
] as const

export default function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  function goToHash(e: MouseEvent<HTMLAnchorElement>, hash: string, defer: boolean) {
    e.preventDefault()
    if (!isHome) {
      // Client-side nav back to home; HomeHashScroll handles the scroll once mounted.
      router.push(`/${hash}`)
      return
    }
    if (defer) {
      document.body.style.overflow = ''
      scrollToSectionIdAfterLayout(hash)
    } else {
      scrollToSectionId(hash)
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled ? 'bg-ink/92 border-b border-gold/10 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav
          className="max-w-5xl mx-auto px-6 sm:px-10 min-h-[5.25rem] flex items-center justify-between gap-8"
          aria-label="Main navigation"
        >
          <a
            href="/"
            className="isolate flex items-center min-w-0 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink rounded-sm"
            onClick={(e) => {
              if (typeof window !== 'undefined' && window.location.pathname === '/') {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
            aria-label="NOVAIRA home"
          >
            <Logo variant="horizontal" title={null} />
          </a>

          <div className="hidden md:flex items-center gap-10 lg:gap-12">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.hash}
                href={isHome ? item.hash : `/${item.hash}`}
                onClick={(e) => goToHash(e, item.hash, false)}
                className="text-[0.9375rem] font-sans font-normal text-cream/75 hover:text-cream transition-colors duration-200 text-legible-on-media"
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            className="md:hidden p-2.5 -mr-2 text-cream/80 hover:text-cream rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
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
          className="absolute inset-0 bg-ink/80"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute top-[5.25rem] right-0 bottom-0 w-[min(100%,18rem)] bg-ink border-l border-gold/10 pl-10 pr-8 py-12 flex flex-col gap-10 transition-transform duration-200 ease-out ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.hash}
              href={isHome ? item.hash : `/${item.hash}`}
              className="font-display text-2xl font-light text-silver-cream/95"
              onClick={(e) => {
                setMobileOpen(false)
                goToHash(e, item.hash, true)
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
