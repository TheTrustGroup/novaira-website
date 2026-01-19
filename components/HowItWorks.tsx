'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Inbox, Power, Sparkles, CheckCircle } from 'lucide-react'

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const containerRef = useRef<HTMLDivElement>(null)

  const steps = [
    {
      icon: Inbox,
      title: 'Place',
      description: 'Simply place the item in the chamber.',
    },
    {
      icon: Power,
      title: 'Activate',
      description: 'One touch begins the process silently.',
    },
    {
      icon: Sparkles,
      title: 'Process',
      description: 'Advanced technology works discreetly.',
    },
    {
      icon: CheckCircle,
      title: 'Complete',
      description: 'Clean, dignified, and utterly discreet.',
    },
  ]

  // Icon animation variants
  const iconVariants = {
    hidden: { 
      scale: 0,
      opacity: 0,
      pathLength: 0,
    },
    visible: (index: number) => ({
      scale: 1,
      opacity: 1,
      pathLength: 1,
      transition: {
        delay: index * 0.15,
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
        scale: {
          type: 'spring',
          stiffness: 200,
          damping: 15,
        },
      },
    }),
  }

  // Step card animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 40,
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1 + 0.2,
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
  }

  return (
    <section 
      id="how-it-works" 
      ref={ref} 
      className="py-24 sm:py-32 lg:py-40 px-6 sm:px-8 lg:px-12 bg-charcoal/30"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 sm:mb-20 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 
            id="how-it-works-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-ivory mb-6 font-medium"
          >
            How It Works
          </h2>
          <p className="text-lg sm:text-xl text-sand/85 max-w-3xl mx-auto font-light leading-relaxed">
            Simplicity meets sophistication. Four simple steps to complete peace of mind.
          </p>
        </motion.div>

        {/* Steps Container */}
        <div ref={containerRef} className="relative">
          {/* Timeline Line - Desktop Horizontal */}
          <div className="hidden lg:block absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-rose-gold/20 via-rose-gold/30 to-rose-gold/20 transform -translate-y-1/2" />
          
          {/* Timeline Line - Mobile Vertical */}
          <div className="lg:hidden absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-rose-gold/20 via-rose-gold/30 to-rose-gold/20" />
          
          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon
              
              return (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  className="relative lg:pl-0 pl-12"
                >
                  {/* Timeline Connector - Desktop Horizontal */}
                  <div className="hidden lg:block absolute left-1/2 top-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 z-10">
                    <motion.div
                      className="w-full h-full rounded-full bg-charcoal border-2 border-rose-gold/30"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                      transition={{
                        delay: index * 0.15 + 0.3,
                        duration: 0.4,
                        type: 'spring',
                        stiffness: 200,
                        damping: 15,
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-rose-gold/20"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1.5, opacity: 0 } : { scale: 0 }}
                      transition={{
                        delay: index * 0.15 + 0.3,
                        duration: 0.6,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    />
                  </div>

                  {/* Timeline Connector - Mobile Vertical */}
                  <div className="lg:hidden absolute left-8 top-6 w-3 h-3 -translate-x-1/2 z-10">
                    <motion.div
                      className="w-full h-full rounded-full bg-charcoal border-2 border-rose-gold/30"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                      transition={{
                        delay: index * 0.15 + 0.3,
                        duration: 0.4,
                        type: 'spring',
                        stiffness: 200,
                        damping: 15,
                      }}
                    />
                  </div>

                  {/* Step Card */}
                  <motion.article
                    className="relative h-full bg-charcoal/50 backdrop-blur-sm border border-rose-gold/10 rounded-lg p-6 sm:p-8 hover:border-rose-gold/30 transition-all duration-500 group"
                    whileHover={{ y: -4 }}
                  >
                    {/* Icon Container */}
                    <div className="flex justify-center mb-6 sm:mb-8">
                      <div className="relative">
                        {/* Icon Background Circle */}
                        <motion.div
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-rose-gold/10 to-rose-blush/10 border border-rose-gold/20 flex items-center justify-center"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                          transition={{
                            delay: index * 0.15 + 0.2,
                            duration: 0.6,
                            type: 'spring',
                            stiffness: 200,
                            damping: 20,
                          }}
                        >
                          {/* Icon */}
                          <motion.div
                            custom={index}
                            variants={iconVariants}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                          >
                            <Icon 
                              className="w-8 h-8 sm:w-10 sm:h-10 text-rose-gold" 
                              strokeWidth={1.5}
                            />
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Step Number */}
                    <div className="text-center mb-4">
                      <span className="text-xs sm:text-sm text-rose-gold/60 font-light tracking-wider uppercase">
                        Step {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-serif text-ivory mb-3 text-center font-medium">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-sand/85 font-light leading-relaxed text-center">
                      {step.description}
                    </p>

                    {/* Subtle hover glow */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-rose-gold/0 to-rose-blush/0 group-hover:from-rose-gold/5 group-hover:to-rose-blush/5 transition-all duration-500 pointer-events-none" />
                  </motion.article>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}






