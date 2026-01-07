'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Heart, Sparkles, Wrench, Leaf, Shield } from 'lucide-react'

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
      icon: Sparkles,
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
    <section id="philosophy" ref={ref} className="py-32 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Mission */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-ivory mb-8">
            Our Mission
          </h2>
          <p className="text-xl sm:text-2xl text-sand/90 font-light leading-relaxed max-w-4xl mx-auto">
            To redefine menstrual hygiene solutions through elegant design, empathetic engineering, and uncompromising safety — creating products that offer comfort, dignity, and peace of mind in every space they serve.
          </p>
        </motion.div>

        {/* Vision */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-ivory mb-8">
            Our Vision
          </h2>
          <p className="text-xl sm:text-2xl text-sand/90 font-light leading-relaxed mb-6 max-w-4xl mx-auto">
            We envision a world where menstrual care is:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mt-8">
            {['Seamless', 'Respectful', 'Stigma-free', 'Beautifully integrated into everyday environments'].map((item, index) => (
              <motion.p
                key={index}
                className="text-lg text-rose-gold font-light"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                {item}
              </motion.p>
            ))}
          </div>
          <motion.p
            className="text-lg sm:text-xl text-sand/80 font-light leading-relaxed max-w-3xl mx-auto mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Novaira aims to become the global benchmark for refined hygiene technology, where innovation is felt not through complexity, but through calm simplicity.
          </motion.p>
        </motion.div>

        {/* Values */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-ivory mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  className="p-8 border border-rose-gold/20 hover:border-rose-gold/50 transition-all duration-500 bg-charcoal/50 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: 1.2 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="mb-4">
                    <Icon className="w-6 h-6 text-rose-gold" />
                  </div>
                  <h3 className="text-xl font-serif text-ivory mb-4">{value.title}</h3>
                  <p className="text-sand/70 font-light leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Closing */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <p className="text-2xl sm:text-3xl font-serif text-ivory mb-4">
            This is hygiene, redefined.
          </p>
          <p className="text-xl sm:text-2xl font-serif text-rose-gold">
            This is dignity, designed.
          </p>
          <p className="text-lg text-sand/70 font-light mt-8">
            Welcome to Novaira.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

