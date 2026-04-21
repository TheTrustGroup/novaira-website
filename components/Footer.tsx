/**
 * Job: Contact, legal, and the two links that only belong here — press
 * contact and the downloadable brand kit. Structured, not decorative.
 */
import Link from 'next/link'
import Logo from '@/components/Logo'

export default function Footer() {
  return (
    <footer className="border-t border-gold/10 pt-16 sm:pt-20 pb-10 sm:pb-12 px-6 sm:px-10">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-10 pb-12 sm:pb-14 border-b border-gold/10">
          {/* Identity + tagline */}
          <div className="sm:col-span-1">
            <Logo variant="horizontal" title="NOVAIRA" />
            <p className="mt-5 font-sans text-sm text-cream/55 leading-[1.7] max-w-[22ch]">
              Quiet care, made for every space.
            </p>
          </div>

          {/* Contact column */}
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold-light/80 mb-4">
              Contact
            </p>
            <ul className="space-y-3 font-sans text-sm text-cream/75">
              <li>
                <a
                  href="mailto:office@novairaworld.com"
                  className="hover:text-gold-light transition-colors"
                >
                  office@novairaworld.com
                </a>
                <span className="block text-xs text-cream/45 mt-0.5">
                  General &amp; operator inquiries
                </span>
              </li>
              <li>
                <a
                  href="mailto:press@novairaworld.com"
                  className="hover:text-gold-light transition-colors"
                >
                  press@novairaworld.com
                </a>
                <span className="block text-xs text-cream/45 mt-0.5">
                  Press &amp; media
                </span>
              </li>
            </ul>
          </div>

          {/* Explore column */}
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold-light/80 mb-4">
              Explore
            </p>
            <ul className="space-y-3 font-sans text-sm text-cream/75">
              <li>
                <Link
                  href="/#how-it-works"
                  className="hover:text-gold-light transition-colors"
                >
                  How it works
                </Link>
              </li>
              <li>
                <Link
                  href="/#first-release"
                  className="hover:text-gold-light transition-colors"
                >
                  Waitlist
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="hover:text-gold-light transition-colors"
                >
                  Request a consultation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs font-sans text-cream/50">
          <p>&copy; 2026 NOVAIRA. All rights reserved.</p>
          <p className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-gold-light transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-gold-light transition-colors">
              Terms
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
