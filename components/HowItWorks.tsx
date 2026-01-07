'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const steps = [
    {
      number: '01',
      title: 'Place',
      description: 'Simply place the item in the chamber. The design accommodates with gentle care.',
    },
    {
      number: '02',
      title: 'Activate',
      description: 'Press the button. One touch, and the process begins silently and discreetly.',
    },
    {
      number: '03',
      title: 'Complete',
      description: 'In moments, the process is complete. Clean, dignified, and utterly discreet.',
    },
  ]

  return (
    <section id="how-it-works" ref={ref} className="py-32 px-6 sm:px-8 lg:px-12 bg-charcoal/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-ivory mb-6">
            How It Works
          </h2>
          <p className="text-lg text-sand/70 max-w-2xl mx-auto font-light">
            Simplicity meets sophistication. Three steps to complete peace of mind.
          </p>
        </motion.div>

        <div className="space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center gap-12 md:gap-20`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="flex-1">
                <div className="mb-6">
                  <span className="text-8xl sm:text-9xl font-serif text-rose-gold/20 font-light">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-serif text-ivory mb-4">{step.title}</h3>
                <p className="text-lg text-sand/70 font-light leading-relaxed max-w-md">
                  {step.description}
                </p>
              </div>
              <div className="flex-1 w-full max-w-md">
                <div className="aspect-square bg-gradient-to-br from-rose-gold/10 to-rose-blush/10 border border-rose-gold/20 flex items-center justify-center">
                  <p className="text-sand/50 font-light text-sm">Step Illustration Placeholder</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}






