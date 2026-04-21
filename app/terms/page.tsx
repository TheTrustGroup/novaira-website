import type { Metadata } from 'next'
import Link from 'next/link'
import SkipLink from '@/components/SkipLink'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service | NOVAIRA',
  description: 'Terms of Service for using the NOVAIRA website and series 1 product services.',
}

const CONTACT_EMAIL = 'office@novairaworld.com'

export default function TermsPage() {
  return (
    <>
      <SkipLink />
      <main id="main-content" className="min-h-screen bg-ink text-cream">
        <Navigation />
        <article className="pt-28 pb-20 px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-display text-silver-cream mb-4 font-light text-legible-on-ink">
              Terms of Service
            </h1>
            <p className="text-cream/80 font-light text-sm mb-12">
              Last updated: February 2025
            </p>

            <div className="prose prose-invert max-w-none space-y-8 text-cream font-light leading-relaxed">
              <section>
                <h2 className="text-2xl font-display text-gold-light mb-3 font-light text-legible-on-ink">
                  Use of the website
                </h2>
                <p>
                  By using the NOVAIRA website (including information about series 1), you agree to use it only for lawful purposes and in a way that does not infringe the rights of others or restrict their use of the site. You must not use the site to transmit any harmful, offensive, or unlawful material.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display text-gold-light mb-3 font-light text-legible-on-ink">
                  Product availability
                </h2>
                <p>
                  We do not guarantee the availability of any product or service described on this website. Product offerings, pricing, and availability may change without notice. We reserve the right to limit quantities and to discontinue products or services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display text-gold-light mb-3 font-light text-legible-on-ink">
                  Contact information
                </h2>
                <p>
                  For questions about these terms or our services, please contact us at:{' '}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-gold hover:text-gold-light transition-colors underline focus:outline-none focus:ring-2 focus:ring-gold-light focus:ring-offset-2 focus:ring-offset-ink rounded-sm"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </section>

              <p className="pt-4 text-cream/60 text-sm">
                <Link href="/" className="text-gold hover:text-gold-light transition-colors">
                  ← Back to home
                </Link>
              </p>
            </div>
          </div>
        </article>
        <Footer />
      </main>
    </>
  )
}
