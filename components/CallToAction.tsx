'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Mail } from 'lucide-react'
import ConsultationForm from './ConsultationForm'
import CalendlyEmbed from './CalendlyEmbed'
import SpecSheetModal from './SpecSheetModal'

export default function CallToAction() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [specSheetOpen, setSpecSheetOpen] = useState(false)
  const hasCalendly = typeof process.env.NEXT_PUBLIC_CALENDLY_URL === 'string' && process.env.NEXT_PUBLIC_CALENDLY_URL.length > 0

  return (
    <>
      <section id="contact" ref={ref} className="py-32 px-6 sm:px-8 lg:px-12 bg-charcoal/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-ivory mb-6">
              Let's Begin the Conversation
            </h2>
            <p className="text-lg sm:text-xl text-sand/90 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
              We understand this is a thoughtful decision. Our team is here to answer your questions, provide guidance, and help you determine if NOVAIRA is the right choice for your space.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.1 }}
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-serif text-ivory mb-8">Request Consultation</h3>
            <ConsultationForm />
          </motion.div>

          {hasCalendly && (
            <motion.div
              className="mt-20 text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className="text-sand/90 font-light mb-4">Or book directly:</p>
              <CalendlyEmbed />
            </motion.div>
          )}

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sand/85 mt-14"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href="mailto:office@novairaworld.com"
              className="flex items-center gap-3 hover:text-rose-gold transition-colors duration-300 font-light focus:outline-none focus:ring-2 focus:ring-rose-gold focus:ring-offset-2 focus:ring-offset-charcoal rounded px-2 py-1"
              aria-label="Email us at office@novairaworld.com"
            >
              <Mail className="w-5 h-5" aria-hidden="true" />
              <span>office@novairaworld.com</span>
            </a>
          </motion.div>

          <motion.p
            className="mt-12 text-sm text-sand/50 font-light"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Take your time. We're here when you're ready.
          </motion.p>
        </div>
      </section>

      <SpecSheetModal isOpen={specSheetOpen} onClose={() => setSpecSheetOpen(false)} />
    </>
  )
}

