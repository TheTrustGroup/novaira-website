'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

// Place the real founder photo at: public/images/founder-josephine.jpg
const FOUNDER_IMAGE_PATH = '/images/founder-josephine.jpg'

export default function FoundersNote() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [imageError, setImageError] = useState(false)
  const showPlaceholder = imageError

  const paragraphs = [
    'NOVAIRA began with a quiet question:',
    'Why should something so essential feel so overlooked?',
    'In spaces meant for comfort — homes, workplaces, schools, hospitals — menstrual hygiene solutions often felt purely functional, cold, or hidden away. They solved a problem, but they never considered the person. I believed we could do better.',
    'NOVAIRA was created to bring dignity, thoughtfulness, and design into a space that has long been ignored. Not through loud statements or uncomfortable conversations, but through calm, beautiful, and intentional engineering.',
    'Every NOVAIRA unit is designed with empathy at its core. From the first interaction to the last, our goal is simple: to make people feel at ease. To replace hesitation with confidence. To ensure that privacy is respected and comfort is preserved.',
    'This isn\'t just about technology.',
    'It\'s about acknowledging real human experiences — and responding with care.',
    'NOVAIRA is our way of saying that thoughtful design belongs everywhere, especially where it matters most.',
    'Thank you for being part of this journey.',
  ]

  return (
    <section 
      id="founders-note" 
      ref={ref} 
      className="py-24 sm:py-32 lg:py-40 px-6 sm:px-8 lg:px-12 bg-charcoal/30"
      aria-labelledby="founders-note-heading"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="mb-10 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 
            id="founders-note-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-ivory mb-4 font-medium"
          >
            Founder's Note
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 mb-12 lg:mb-16">
          <motion.figure
            className="flex-shrink-0 lg:w-72"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {showPlaceholder ? (
              <div
                className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full bg-charcoal/70 border border-rose-gold/20 flex items-center justify-center mx-auto lg:mx-0"
                aria-hidden="true"
              >
                <span className="text-3xl sm:text-4xl lg:text-5xl font-serif text-rose-gold/80">JT</span>
              </div>
            ) : (
              <Image
                src={FOUNDER_IMAGE_PATH}
                alt="Josephine Turkson, Founder of NOVAIRA"
                width={288}
                height={288}
                className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full object-cover mx-auto lg:mx-0 border border-rose-gold/20"
                onError={() => setImageError(true)}
              />
            )}
          </motion.figure>

          <div className="flex-1 space-y-5 sm:space-y-6 lg:space-y-8">
          {paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              className={`text-base sm:text-lg lg:text-xl text-sand/95 font-light leading-relaxed ${
                index === paragraphs.length - 1 ? 'text-right sm:text-right' : ''
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              {paragraph}
            </motion.p>
          ))}
          </div>
        </div>

        <motion.div
          className="mt-10 sm:mt-12 lg:mt-16 text-right"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <p className="text-rose-gold font-serif text-lg sm:text-xl">
            — Josephine Turkson<br />
            <span className="text-base sm:text-lg">Founder, NOVAIRA</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

