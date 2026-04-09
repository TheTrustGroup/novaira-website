import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy — NOVAIRA',
  description: 'Privacy Policy for NOVAIRA and series 1. How we collect, use, and protect your data.',
}

const CONTACT_EMAIL = 'office@novairaworld.com'
const JURISDICTION = '[Ghana / UK / US]' // Replace with your chosen jurisdiction

export default function PrivacyPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <main id="main-content" className="min-h-screen bg-ink text-cream">
        <Navigation />
        <article className="pt-28 pb-20 px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-display text-silver-cream mb-4 font-light">
              Privacy Policy
            </h1>
            <p className="text-cream/70 font-extralight text-sm mb-12">
              Last updated: February 2025
            </p>

            <div className="prose prose-invert max-w-none space-y-8 text-cream font-extralight leading-relaxed">
              <section>
                <h2 className="text-2xl font-display text-gold-light mb-3 font-light">
                  What data we collect
                </h2>
                <p>
                  When you use our website or request a consultation, we may collect:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-cream/85">
                  <li>Email address</li>
                  <li>Name</li>
                  <li>Organization (if you provide it)</li>
                  <li>Any other information you voluntarily submit through our forms</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display text-gold-light mb-3 font-light">
                  How we use your data
                </h2>
                <p>
                  We use the information you provide to contact you about NOVAIRA and our services, to respond to your enquiries, and to improve our offerings. We do not use your data for purposes unrelated to NOVAIRA without your consent.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display text-gold-light mb-3 font-light">
                  We do not sell your data
                </h2>
                <p>
                  We do not sell, rent, or trade your personal information to third parties. Your data is used only as described in this policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display text-gold-light mb-3 font-light">
                  Data requests and contact
                </h2>
                <p>
                  For requests about your data (access, correction, deletion, or other privacy concerns), please contact us at:{' '}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-gold hover:text-gold-light transition-colors underline focus:outline-none focus:ring-2 focus:ring-gold-light focus:ring-offset-2 focus:ring-offset-ink rounded-sm"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display text-gold-light mb-3 font-light">
                  Governing law
                </h2>
                <p>
                  This Privacy Policy is governed by the laws of {JURISDICTION}. By using our website, you agree to the application of these laws to the extent applicable.
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
