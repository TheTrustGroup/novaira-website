import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import EmotionalStory from '@/components/EmotionalStory'
import ProductShowcase from '@/components/ProductShowcase'
import HowItWorks from '@/components/HowItWorks'
import WhereItBelongs from '@/components/WhereItBelongs'
import TrustSafety from '@/components/TrustSafety'
import Testimonials from '@/components/Testimonials'
import FoundersNote from '@/components/FoundersNote'
import BrandPhilosophy from '@/components/BrandPhilosophy'
import CallToAction from '@/components/CallToAction'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <main id="main-content" className="min-h-screen">
        <Navigation />
        <Hero />
        <EmotionalStory />
        <ProductShowcase />
        <HowItWorks />
        <WhereItBelongs />
        <TrustSafety />
        <Testimonials />
        <FoundersNote />
        <BrandPhilosophy />
        <CallToAction />
        <Footer />
      </main>
    </>
  )
}

