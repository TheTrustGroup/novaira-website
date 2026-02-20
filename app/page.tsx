import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import EmotionalStory from '@/components/EmotionalStory'
import ProductShowcase from '@/components/ProductShowcase'
import HowItWorks from '@/components/HowItWorks'
import WaitlistSection from '@/components/WaitlistSection'
import EnvironmentSelector from '@/components/EnvironmentSelector'
import TrustSafety from '@/components/TrustSafety'
import PilotProgram from '@/components/PilotProgram'
import FoundersNote from '@/components/FoundersNote'
import BrandPhilosophy from '@/components/BrandPhilosophy'
import CallToAction from '@/components/CallToAction'
import PressSection from '@/components/PressSection'
import Footer from '@/components/Footer'

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'NOVAIRA series 1',
  brand: { '@type': 'Brand', name: 'NOVAIRA' },
  description:
    'Premium CE & ISO certified sanitary disposal system for luxury hotels, hospitals, schools and offices',
  category: 'Sanitary Equipment',
  manufacturer: {
    '@type': 'Organization',
    name: 'NOVAIRA',
    url: 'https://novairaworld.com',
  },
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <main id="main-content" className="min-h-screen">
        <Navigation />
        <Hero />
        <EmotionalStory />
        <ProductShowcase />
        <HowItWorks />
        <WaitlistSection />
        <EnvironmentSelector />
        <TrustSafety />
        <PilotProgram />
        <FoundersNote />
        <BrandPhilosophy />
        <CallToAction />
        <PressSection />
        <Footer />
      </main>
    </>
  )
}

