/**
 * Job: Contact and legal only. No second nav column.
 */
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gold/10 py-16 sm:py-20 px-6 sm:px-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="font-display text-base sm:text-lg text-silver-cream/90 font-light tracking-[0.02em]">
          NOVAIRA
        </div>
        <div className="flex flex-col sm:items-end gap-4 text-sm font-sans font-normal text-cream/65">
          <a
            href="mailto:office@novairaworld.com"
            className="text-cream/85 hover:text-gold-light transition-colors w-fit"
          >
            office@novairaworld.com
          </a>
          <p>
            <span className="text-cream/50">© 2026 NOVAIRA.</span>{' '}
            <Link href="/privacy" className="hover:text-gold-light transition-colors">
              Privacy
            </Link>
            {', '}
            <Link href="/terms" className="hover:text-gold-light transition-colors">
              Terms
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
