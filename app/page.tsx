import SkipLink from '@/components/SkipLink'
import HomeHashScroll from '@/components/HomeHashScroll'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import CredentialsBar from '@/components/CredentialsBar'
import HowItWorks from '@/components/HowItWorks'
import PilotProgram from '@/components/PilotProgram'
import FounderSection from '@/components/FounderSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'NOVAIRA series 1',
  brand: { '@type': 'Brand', name: 'NOVAIRA' },
  description:
    'CE and ISO 9001 certified menstrual hygiene disposal unit. Silent operation. Medical-grade materials for hotels, hospitals, schools, and offices.',
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
        <PilotProgram />
        <FounderSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
