'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function EmotionalStory() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const lines = [
    'NOVAIRA was born from a simple yet powerful belief:',
    'dignity deserves design.',
    'For generations, conversations around menstrual care',
    'have been hidden behind discomfort, silence, and compromise.',
    'NOVAIRA exists to change that —',
    'not loudly, not aggressively —',
    'but beautifully, thoughtfully, and respectfully.',
  ]

  return (
    <section 
      id="story" 
      ref={ref} 
      className="relative py-24 sm:py-32 lg:py-40 px-6 sm:px-8 lg:px-12 bg-charcoal/50"
      aria-labelledby="story-heading"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 sm:space-y-8 lg:space-y-10"
        >
          {lines.map((line, index) => (
            <motion.p
              key={index}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-sand/95 leading-[1.4] sm:leading-relaxed font-light"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1],
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

