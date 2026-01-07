'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function EmotionalStory() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const lines = [
    'Novaira was born from a simple yet powerful belief:',
    'dignity deserves design.',
    'For generations, conversations around menstrual care',
    'have been hidden behind discomfort, silence, and compromise.',
    'Novaira exists to change that —',
    'not loudly, not aggressively —',
    'but beautifully, thoughtfully, and respectfully.',
  ]

  return (
    <section id="story" ref={ref} className="relative py-32 px-6 sm:px-8 lg:px-12 bg-charcoal/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {lines.map((line, index) => (
            <motion.p
              key={index}
              className="text-2xl sm:text-3xl md:text-4xl font-serif text-sand/90 leading-relaxed"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: 'easeOut',
              }}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

