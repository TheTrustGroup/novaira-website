'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function FoundersNote() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const paragraphs = [
    'Novaira began with a quiet question:',
    'Why should something so essential feel so overlooked?',
    'In spaces meant for comfort — homes, workplaces, schools, hospitals — menstrual hygiene solutions often felt purely functional, cold, or hidden away. They solved a problem, but they never considered the person. I believed we could do better.',
    'Novaira was created to bring dignity, thoughtfulness, and design into a space that has long been ignored. Not through loud statements or uncomfortable conversations, but through calm, beautiful, and intentional engineering.',
    'Every Novaira product is designed with empathy at its core. From the first interaction to the last, our goal is simple: to make people feel at ease. To replace hesitation with confidence. To ensure that privacy is respected and comfort is preserved.',
    'This isn\'t just about technology.',
    'It\'s about acknowledging real human experiences — and responding with care.',
    'Novaira is our way of saying that thoughtful design belongs everywhere, especially where it matters most.',
    'Thank you for being part of this journey.',
  ]

  return (
    <section id="founders-note" ref={ref} className="py-32 px-6 sm:px-8 lg:px-12 bg-charcoal/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-ivory mb-4">
            Founder's Note
          </h2>
        </motion.div>

        <div className="space-y-6">
          {paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              className={`text-lg sm:text-xl text-sand/90 font-light leading-relaxed ${
                index === paragraphs.length - 1 ? 'text-right' : ''
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        <motion.div
          className="mt-12 text-right"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <p className="text-rose-gold font-serif text-lg">
            — Josephine Turkson<br />
            Founder, Novaira
          </p>
        </motion.div>
      </div>
    </section>
  )
}

