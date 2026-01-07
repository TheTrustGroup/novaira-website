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
    <section ref={ref} className="py-32 px-6 sm:px-8 lg:px-12 bg-charcoal/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-ivory mb-6">
            Trust & Safety
          </h2>
          <p className="text-lg text-sand/70 max-w-2xl mx-auto font-light">
            Your peace of mind is our highest priority. Every detail engineered for safety and reliability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {certifications.map((cert, index) => {
            const Icon = cert.icon
            return (
              <motion.div
                key={index}
                className="text-center p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="mb-4 flex justify-center">
                  <Icon className="w-12 h-12 text-rose-gold" />
                </div>
                <h3 className="text-lg font-serif text-ivory mb-2">{cert.title}</h3>
                <p className="text-sm text-sand/70 font-light">{cert.description}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="max-w-4xl mx-auto p-12 border border-rose-gold/20 bg-charcoal/50 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3 className="text-2xl font-serif text-ivory mb-6">Safety Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safetyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <CheckCircle className="w-5 h-5 text-rose-gold flex-shrink-0" />
                <span className="text-sand/80 font-light">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}






