'use client'

/**
 * Thin wrapper around Cloudflare Turnstile's explicit render mode.
 *
 * Only the component that needs verification (e.g. ConsultationForm) decides
 * whether to mount this — so when `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is unset,
 * the Turnstile script isn't loaded at all.
 *
 * Callbacks are routed through a ref so we can render the widget exactly
 * once per mount without re-rendering it on every parent state change.
 */
import { useEffect, useRef } from 'react'

type Props = {
  siteKey: string
  onToken: (token: string) => void
  onExpire?: () => void
  onError?: () => void
  theme?: 'light' | 'dark' | 'auto'
}

type TurnstileRenderOptions = {
  sitekey: string
  callback: (token: string) => void
  'error-callback'?: () => void
  'expired-callback'?: () => void
  'timeout-callback'?: () => void
  theme?: 'light' | 'dark' | 'auto'
  action?: string
}

type TurnstileApi = {
  render: (el: HTMLElement, options: TurnstileRenderOptions) => string
  remove: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

const SCRIPT_ID = 'cf-turnstile-script'
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

function loadScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.turnstile) return Promise.resolve()

  const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject(new Error('Turnstile script failed to load')))
    })
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = SCRIPT_SRC
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Turnstile script failed to load'))
    document.head.appendChild(script)
  })
}

export default function TurnstileWidget({
  siteKey,
  onToken,
  onExpire,
  onError,
  theme = 'dark',
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const callbacksRef = useRef({ onToken, onExpire, onError })
  callbacksRef.current = { onToken, onExpire, onError }

  useEffect(() => {
    let cancelled = false

    loadScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token) => callbacksRef.current.onToken(token),
          'error-callback': () => callbacksRef.current.onError?.(),
          'expired-callback': () => callbacksRef.current.onExpire?.(),
          theme,
          action: 'consultation',
        })
      })
      .catch(() => callbacksRef.current.onError?.())

    return () => {
      cancelled = true
      const id = widgetIdRef.current
      if (id && window.turnstile) {
        try {
          window.turnstile.remove(id)
        } catch {
          // Widget may already be gone (navigation, hot reload). Ignore.
        }
      }
    }
  }, [siteKey, theme])

  return <div ref={containerRef} className="min-h-[65px]" />
}
