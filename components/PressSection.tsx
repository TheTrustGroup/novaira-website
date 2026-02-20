'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Mail } from 'lucide-react'

export default function PressSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      id="press"
      className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 bg-charcoal/30"
      aria-labelledby="press-heading"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2
            id="press-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-serif text-ivory mb-6 font-medium"
          >
            Press & Media
          </h2>
          <p className="text-lg sm:text-xl text-sand/90 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
            For press inquiries, product images, founder interviews, and brand assets, please contact our press team.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a
            href="mailto:press@novairaworld.com"
            className="flex items-center gap-3 text-sand/90 hover:text-rose-gold transition-colors duration-300 font-light focus:outline-none focus:ring-2 focus:ring-rose-gold focus:ring-offset-2 focus:ring-offset-charcoal rounded px-4 py-2"
            aria-label="Email press team at press@novairaworld.com"
          >
            <Mail className="w-5 h-5" aria-hidden="true" />
            <span>press@novairaworld.com</span>
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            className="px-8 py-4 border-2 border-rose-gold/50 text-rose-gold hover:bg-rose-gold/10 transition-all duration-300 font-light text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-rose-gold focus:ring-offset-2 focus:ring-offset-charcoal rounded inline-flex items-center gap-2"
          >
            Download Press Kit
          </a>
        </motion.div>
        <motion.p
          className="mt-4 text-sm text-sand/60 font-light"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Press kit coming soon. Request access via contact and we&apos;ll notify you when it&apos;s available.
        </motion.p>
      </div>
    </section>
  )
}
