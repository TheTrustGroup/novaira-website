'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { initPostHog, getPostHog } from '@/lib/posthog'

export function PosthogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    initPostHog()
  }, [])

  useEffect(() => {
    if (pathname && getPostHog()) {
      getPostHog()?.capture('$pageview')
    }
  }, [pathname])

  return <>{children}</>
}
