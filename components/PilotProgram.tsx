'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Wrench, Tag, MessageSquare } from 'lucide-react'

const benefits = [
  {
    icon: Wrench,
    title: 'Priority Installation',
    description: 'Our team handles everything, on your schedule.',
  },
  {
    icon: Tag,
    title: 'Founder Pricing',
    description: '30% below retail, locked in permanently.',
  },
  {
    icon: MessageSquare,
    title: 'Engineering Access',
    description: 'Direct line to our product team. Your feedback shapes the product.',
  },
]

const PILOT_SLOTS_FILLED = 3
const PILOT_SLOTS_TOTAL = 10

export default function PilotProgram() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <section
        ref={ref}
        id="pilot-program"
        className="py-24 sm:py-32 lg:py-40 px-6 sm:px-8 lg:px-12 bg-charcoal/30"
        aria-labelledby="pilot-program-heading"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16 sm:mb-20 lg:mb-24"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2
              id="pilot-program-heading"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-ivory mb-6 font-medium"
            >
              Become a Founding Partner
            </h2>
            <p className="text-lg sm:text-xl text-sand/85 max-w-3xl mx-auto font-light leading-relaxed">
              We are onboarding our first cohort of 10 institutional pilot partners for Q3 2026 deployment. Each founding partner receives white-glove installation support, direct engineering access, Founder pricing, and the opportunity to shape NOVAIRA&apos;s roadmap.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={index}
                  className="text-center p-6 sm:p-8 bg-charcoal/50 backdrop-blur-sm border border-rose-gold/10 hover:border-rose-gold/30 rounded-lg transition-all duration-500 hover:shadow-xl hover:shadow-rose-gold/5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  whileHover={{ y: -3 }}
                >
                  <div className="mb-4 flex justify-center">
                    <Icon className="w-12 h-12 sm:w-14 sm:h-14 text-rose-gold" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif text-ivory mb-2.5 font-medium">
                    {benefit.title}
                  </h3>
                  <p className="text-sm sm:text-base text-sand/85 font-light">
                    {benefit.description}
                  </p>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              onClick={scrollToContact}
              className="px-10 py-4 bg-rose-gold text-charcoal hover:bg-rose-blush transition-all duration-300 font-light text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-rose-gold focus:ring-offset-2 focus:ring-offset-charcoal rounded"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              Apply for Pilot Partnership
            </motion.button>
            <p className="mt-6 text-sm sm:text-base text-sand/80 font-light">
              Only {PILOT_SLOTS_TOTAL} pilot slots available. {PILOT_SLOTS_FILLED} have been filled.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
