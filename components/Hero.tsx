'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import SpecSheetModal from './SpecSheetModal'

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [specSheetOpen, setSpecSheetOpen] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 8,
        y: (e.clientY / window.innerHeight - 0.5) * 8,
      })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleScrollDown = () => {
    const storySection = document.querySelector('#story')
    if (storySection) {
      storySection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        aria-label="Hero section"
      >
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/hero-poster.jpg"
            className="absolute inset-0 w-full h-full object-cover"
            onLoadedData={() => setVideoLoaded(true)}
            aria-label="Background video showcasing NOVAIRA"
          >
            <source src="/novaira-hero-video.webm" type="video/webm" />
            <source src="/novaira-hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/60 to-charcoal/70" />
          {!videoLoaded && (
            <div className="absolute inset-0 bg-charcoal animate-pulse" />
          )}
        </div>

        {/* Subtle ambient gradient orbs */}
        <div className="absolute inset-0 overflow-hidden z-0" aria-hidden="true">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-gold/10 rounded-full blur-3xl"
            animate={{
              x: mousePosition.x,
              y: mousePosition.y,
              scale: [1, 1.1, 1],
            }}
            transition={{
              x: { duration: 0.5, ease: 'easeOut' },
              y: { duration: 0.5, ease: 'easeOut' },
              scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-blush/10 rounded-full blur-3xl"
            animate={{
              x: -mousePosition.x * 0.3,
              y: -mousePosition.y * 0.3,
              scale: [1, 1.15, 1],
            }}
            transition={{
              x: { duration: 0.5, ease: 'easeOut' },
              y: { duration: 0.5, ease: 'easeOut' },
              scale: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <motion.p
            className="text-xs sm:text-sm uppercase tracking-[0.2em] text-rose-gold/90 mb-4 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            Introducing NOVAIRA
          </motion.p>
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-ivory mb-6 leading-[1.15] font-medium tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.4, 0, 0.2, 1] }}
          >
            Menstrual hygiene disposal, finally designed for the spaces that matter.
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-sand/90 max-w-3xl mx-auto mb-12 sm:mb-14 font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            Premium sanitary disposal systems for luxury hotels, hospitals, schools, and offices. CE & ISO certified. Designed with empathy. Engineered for trust.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-5 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.button
              onClick={() => setSpecSheetOpen(true)}
              className="px-8 py-4 bg-rose-gold text-charcoal hover:bg-rose-blush transition-all duration-300 font-light text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-rose-gold focus:ring-offset-2 focus:ring-offset-charcoal rounded"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              Download Spec Sheet
            </motion.button>
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                scrollToContact()
              }}
              className="px-8 py-4 border-2 border-rose-gold/50 text-rose-gold hover:bg-rose-gold/10 transition-all duration-300 font-light text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-rose-gold focus:ring-offset-2 focus:ring-offset-charcoal rounded inline-block text-center"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              Book a Consultation
            </motion.a>
          </motion.div>
        </div>

        <motion.button
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 text-rose-gold/60 hover:text-rose-gold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-rose-gold focus:ring-offset-2 focus:ring-offset-charcoal rounded-full p-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          onClick={handleScrollDown}
          aria-label="Scroll to next section"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-6 h-6" aria-hidden="true" />
          </motion.div>
        </motion.button>
      </section>

      <SpecSheetModal isOpen={specSheetOpen} onClose={() => setSpecSheetOpen(false)} />
    </>
  )
}
