'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { initPostHog, getPostHog } from '@/lib/posthog'

export function PosthogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    const run = () => initPostHog()
    const w = typeof window !== 'undefined' ? window : null
    if (!w) return
    if (typeof w.requestIdleCallback === 'function') {
      const id = w.requestIdleCallback(run, { timeout: 3000 })
      return () => w.cancelIdleCallback(id)
    }
    const t = w.setTimeout(run, 1)
    return () => w.clearTimeout(t)
  }, [])

  useEffect(() => {
    if (pathname && getPostHog()) {
      getPostHog()?.capture('$pageview')
    }
  }, [pathname])

  return <>{children}</>
}
