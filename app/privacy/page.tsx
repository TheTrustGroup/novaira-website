import type { Metadata } from 'next'
import Link from 'next/link'
import SkipLink from '@/components/SkipLink'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | NOVAIRA',
  description: 'How NOVAIRA collects, uses, and protects the data you submit through this website.',
}

const CONTACT_EMAIL = 'office@novairaworld.com'

export default function PrivacyPage() {
  return (
    <>
      <SkipLink />
      <main id="main-content" className="min-h-screen bg-ink text-cream">
        <Navigation />
        <article className="pt-28 pb-20 px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-display text-silver-cream mb-4 font-light text-legible-on-ink">
              Privacy Policy
            </h1>
            <p className="text-cream/80 font-light text-sm mb-12">Last updated: April 2026</p>

            <div className="prose prose-invert max-w-none space-y-8 text-cream font-light leading-relaxed">
              <section>
                <h2 className="text-2xl font-display text-gold-light mb-3 font-light text-legible-on-ink">
                  What we collect
                </h2>
                <p>When you contact us or submit a form on this website we collect:</p>
                <ul className="list-disc pl-6 space-y-2 text-cream/85">
                  <li>Your name, email, organisation, and type of space.</li>
                  <li>
                    Anything you voluntarily include in the free-text fields (message, timeline, facilities count).
                  </li>
                  <li>
                    Your IP address, recorded briefly for abuse prevention and rate limiting.
                  </li>
                  <li>
                    Basic analytics (page views, referrer, device class) via PostHog. We do not collect identified
                    profiles for anonymous visitors.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display text-gold-light mb-3 font-light text-legible-on-ink">
                  How we use it
                </h2>
                <p>
                  We use your information to respond to your enquiry, to decide whether NOVAIRA is a fit for your
                  space, and to improve this website. We do not use it for any unrelated purpose without your
                  consent.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display text-gold-light mb-3 font-light text-legible-on-ink">
                  Who we share it with
                </h2>
                <p>We do not sell, rent, or trade your personal information. We share it only with:</p>
                <ul className="list-disc pl-6 space-y-2 text-cream/85">
                  <li>Supabase (EU region), which stores our lead database on our behalf.</li>
                  <li>Resend, which delivers the notification email to the NOVAIRA team.</li>
                  <li>PostHog, which processes aggregate product analytics.</li>
                </ul>
                <p className="mt-3">
                  Each of these processors is bound by their own data-processing terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display text-gold-light mb-3 font-light text-legible-on-ink">
                  Your rights
                </h2>
                <p>
                  You can ask us to confirm what we hold about you, correct it, export it, or delete it. Write to us
                  at{' '}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-gold hover:text-gold-light transition-colors underline focus:outline-none focus:ring-2 focus:ring-gold-light focus:ring-offset-2 focus:ring-offset-ink rounded-sm"
                  >
                    {CONTACT_EMAIL}
                  </a>{' '}
                  and we will reply within a reasonable time.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display text-gold-light mb-3 font-light text-legible-on-ink">
                  Retention
                </h2>
                <p>
                  We retain contact records for as long as we are in conversation with you and for a reasonable
                  period afterwards, unless you ask us to delete them sooner.
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
