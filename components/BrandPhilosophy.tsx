'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Heart, Award, Wrench, Leaf, Shield } from 'lucide-react'

export default function BrandPhilosophy() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const values = [
    {
      icon: Heart,
      title: 'Empathy First',
      description: 'We design by listening. Every product begins with understanding real experiences and real emotions.',
    },
    {
      icon: Award,
      title: 'Dignity by Design',
      description: 'We believe hygiene solutions should feel respectful, private, and reassuring — never clinical or uncomfortable.',
    },
    {
      icon: Wrench,
      title: 'Thoughtful Innovation',
      description: 'Technology should serve people quietly and reliably. We focus on purposeful innovation that earns trust over time.',
    },
    {
      icon: Leaf,
      title: 'Responsibility',
      description: 'From safety standards to sustainability, we act with care — for people, spaces, and the environment.',
    },
    {
      icon: Shield,
      title: 'Quiet Confidence',
      description: 'We don\'t chase attention. We create products that speak through presence, performance, and refinement.',
    },
  ]

  return (
    <section 
      id="philosophy" 
      ref={ref} 
      className="py-24 sm:py-32 lg:py-40 px-6 sm:px-8 lg:px-12"
      aria-labelledby="philosophy-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Mission */}
        <motion.div
          className="mb-16 sm:mb-20 lg:mb-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 
            id="philosophy-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-ivory mb-6 sm:mb-8 font-medium"
          >
            Our Mission
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-sand/95 font-light leading-relaxed max-w-5xl mx-auto">
            To redefine menstrual hygiene solutions through elegant design, empathetic engineering, and uncompromising safety — creating products that offer comfort, dignity, and peace of mind in every space they serve.
          </p>
        </motion.div>

        {/* Vision */}
        <motion.div
          className="mb-16 sm:mb-20 lg:mb-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-ivory mb-6 sm:mb-8 font-medium">
            Our Vision
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-sand/90 font-light leading-relaxed mb-6 sm:mb-8 max-w-5xl mx-auto">
            We envision a world where menstrual care is:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto mt-8">
            {['Seamless', 'Respectful', 'Stigma-free', 'Beautifully integrated into everyday environments'].map((item, index) => (
              <motion.p
                key={index}
                className="text-base sm:text-lg lg:text-xl text-rose-gold font-light px-4 py-2"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1, ease: [0.4, 0, 0.2, 1] }}
              >
                {item}
              </motion.p>
            ))}
          </div>
          <motion.p
            className="text-base sm:text-lg lg:text-xl text-sand/80 font-light leading-relaxed max-w-4xl mx-auto mt-8 sm:mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            NOVAIRA aims to become the global benchmark for refined hygiene technology, where innovation is felt not through complexity, but through calm simplicity.
          </motion.p>
        </motion.div>

        {/* Values */}
        <motion.div
          className="mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-ivory mb-10 sm:mb-12 lg:mb-16 text-center font-medium">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  className="p-6 sm:p-8 border border-rose-gold/20 hover:border-rose-gold/50 transition-all duration-500 bg-charcoal/50 backdrop-blur-sm rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.08, ease: [0.4, 0, 0.2, 1] }}
                  whileHover={{ y: -4, scale: 1.01 }}
                >
                  <div className="mb-4 sm:mb-6">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-rose-gold" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif text-ivory mb-5 font-medium">{value.title}</h3>
                  <p className="text-sm sm:text-base text-sand/85 font-light leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Closing */}
        <motion.div
          className="mt-16 sm:mt-20 lg:mt-24 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <p className="text-2xl sm:text-3xl lg:text-4xl font-serif text-ivory mb-4 font-medium">
            This is hygiene, redefined.
          </p>
          <p className="text-xl sm:text-2xl lg:text-3xl font-serif text-rose-gold mb-4">
            This is dignity, designed.
          </p>
          <p className="text-base sm:text-lg text-sand/70 font-light mt-6 sm:mt-8">
            Welcome to NOVAIRA.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

