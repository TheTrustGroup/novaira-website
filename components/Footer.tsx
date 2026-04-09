/**
 * Job: Identity, email, year — nothing else required on the landing page.
 */
import { NovairaLogo } from '@/components/NovairaLogo'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gold/15 py-12 sm:py-14 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
        <div className="flex items-center gap-3">
          <NovairaLogo heightClass="h-7 sm:h-8" className="shrink-0 opacity-95" />
          <span className="font-display text-xl text-silver-cream font-light tracking-tight">NOVAIRA</span>
        </div>
        <a
          href="mailto:office@novairaworld.com"
          className="font-sans font-extralight text-cream/90 hover:text-gold-light transition-colors duration-200"
        >
          office@novairaworld.com
        </a>
        <p className="font-sans font-extralight text-sm text-cream/60">
          © 2026 NOVAIRA
          <span className="mx-2 opacity-40" aria-hidden>
            ·
          </span>
          <Link href="/privacy" className="hover:text-gold-light transition-colors">
            Privacy
          </Link>
          <span className="mx-1.5 opacity-40" aria-hidden>
            ·
          </span>
          <Link href="/terms" className="hover:text-gold-light transition-colors">
            Terms
          </Link>
        </p>
      </div>
    </footer>
  )
}
