'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ink text-cream px-6 text-center">
      <h1 className="text-4xl font-display text-silver-cream mb-3 font-light">Something went wrong</h1>
      <p className="text-cream/70 font-light mb-8 max-w-md">
        We ran into an unexpected problem. Try again, or email{' '}
        <a
          href="mailto:office@novairaworld.com"
          className="text-gold hover:text-gold-light underline transition-colors"
        >
          office@novairaworld.com
        </a>{' '}
        if it keeps happening.
      </p>
      <button
        type="button"
        onClick={reset}
        className="font-sans text-[0.8125rem] tracking-[0.04em] uppercase px-9 py-3.5 rounded-sm bg-gold text-ink hover:bg-gold-light transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
      >
        Try again
      </button>
    </div>
  )
}
