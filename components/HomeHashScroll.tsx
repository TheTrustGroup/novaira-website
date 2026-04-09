'use client'

/**
 * When landing on / with a hash (e.g. from /privacy via /#contact), scroll after paint.
 * hashchange covers in-app updates; pathname handles client navigations to /.
 */
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { scrollToSectionId } from '@/lib/scrollToSection'

export default function HomeHashScroll() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== '/') return

    const run = () => {
      const h = window.location.hash
      if (!h) return
      window.setTimeout(() => scrollToSectionId(h), 0)
    }

    run()
    window.addEventListener('hashchange', run)
    return () => window.removeEventListener('hashchange', run)
  }, [pathname])

  return null
}
