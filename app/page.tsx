import SkipLink from '@/components/SkipLink'
import HomeHashScroll from '@/components/HomeHashScroll'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import CredentialsBar from '@/components/CredentialsBar'
import HowItWorks from '@/components/HowItWorks'
import ProofStrip from '@/components/ProofStrip'
import FirstRelease from '@/components/FirstRelease'
import FounderSection from '@/components/FounderSection'
import ContactSection from '@/components/ContactSection'
import StickyMobileCTA from '@/components/StickyMobileCTA'
import Footer from '@/components/Footer'

// Static at build with ISR. Nothing on the page is time-sensitive once
// the pilot counter was removed, but we keep a short revalidate so copy
// edits propagate quickly.
export const revalidate = 60

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'NOVAIRA 01',
  brand: { '@type': 'Brand', name: 'NOVAIRA' },
  description:
    'Medical-grade menstrual hygiene disposal, made to belong in any space. CE and ISO 9001 certified.',
  category: 'Sanitary equipment',
  manufacturer: {
    '@type': 'Organization',
    name: 'NOVAIRA',
    url: 'https://www.novairaworld.com',
  },
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <SkipLink />
      <main id="main-content" className="min-h-screen bg-ink text-cream">
        <HomeHashScroll />
        <Navigation />
        <Hero />
        <CredentialsBar />
        <HowItWorks />
        <ProofStrip />
        <FirstRelease />
        <FounderSection />
        <ContactSection />
        <Footer />
      </main>
      <StickyMobileCTA />
    </>
  )
}
