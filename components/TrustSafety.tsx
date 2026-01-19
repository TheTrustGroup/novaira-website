'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Award, Shield, CheckCircle, Zap } from 'lucide-react'

export default function TrustSafety() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const certifications = [
    {
      icon: Award,
      title: 'CE Certified',
      description: 'Meets European safety and quality standards.',
    },
    {
      icon: Shield,
      title: 'ISO Certified',
      description: 'International quality management standards.',
    },
    {
      icon: CheckCircle,
      title: 'Medical Grade',
      description: 'Designed for healthcare environments.',
    },
    {
      icon: Zap,
      title: 'Energy Efficient',
      description: 'Optimized for minimal power consumption.',
    },
  ]

  const safetyFeatures = [
    'Automatic shut-off protection',
    'Overheat prevention system',
    'Child-safe operation',
    'Fire-resistant materials',
    'Emergency stop function',
  ]

  return (
    <section 
      ref={ref} 
      className="py-24 sm:py-32 lg:py-40 px-6 sm:px-8 lg:px-12 bg-charcoal/30"
      aria-labelledby="trust-safety-heading"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16 sm:mb-20 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 
            id="trust-safety-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-ivory mb-6 font-medium"
          >
            Trust & Safety
          </h2>
          <p className="text-lg sm:text-xl text-sand/85 max-w-3xl mx-auto font-light leading-relaxed">
            Your peace of mind is our highest priority. Every detail engineered for safety and reliability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {certifications.map((cert, index) => {
            const Icon = cert.icon
            return (
              <motion.div
                key={index}
                className="text-center p-6 border border-rose-gold/10 rounded-lg hover:border-rose-gold/30 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
                whileHover={{ y: -2 }}
              >
                <div className="mb-4 flex justify-center">
                  <Icon className="w-12 h-12 sm:w-14 sm:h-14 text-rose-gold" />
                </div>
                <h3 className="text-lg sm:text-xl font-serif text-ivory mb-2.5 font-medium">{cert.title}</h3>
                <p className="text-sm sm:text-base text-sand/85 font-light">{cert.description}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="max-w-5xl mx-auto p-8 sm:p-12 border border-rose-gold/20 bg-charcoal/50 backdrop-blur-sm rounded-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <h3 className="text-xl sm:text-2xl font-serif text-ivory mb-6 sm:mb-8 font-medium">Safety Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {safetyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1, ease: [0.4, 0, 0.2, 1] }}
              >
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-rose-gold flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-sand/90 font-light leading-relaxed">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}






