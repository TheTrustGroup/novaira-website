'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Shield, VolumeX, Sparkles, Heart, Leaf } from 'lucide-react'

export default function ProductShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const features = [
    {
      icon: Sparkles,
      title: 'Intuitive to Use',
      description: 'Every interaction is crafted to create a sense of calm. Nothing harsh. Nothing intimidating.',
    },
    {
      icon: VolumeX,
      title: 'Odorless and Discreet',
      description: 'Silence matters. Privacy matters. Our products are designed to be invisible when they should be.',
    },
    {
      icon: Shield,
      title: 'Safe and Reliable',
      description: 'Engineered to meet rigorous safety standards while remaining gentle in its presence.',
    },
    {
      icon: Heart,
      title: 'Visually Calming and Modern',
      description: 'Every curve, material choice, and interaction transforms necessity into an experience of comfort.',
    },
    {
      icon: Leaf,
      title: 'Sustainable Thinking',
      description: 'Advanced engineering with sustainable thinking, ensuring our solutions are effective and responsible.',
    },
  ]

  return (
    <section id="product" ref={ref} className="py-32 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-ivory mb-6">
            Design With Empathy
          </h2>
          <p className="text-lg text-sand/70 max-w-2xl mx-auto font-light">
            At Novaira, technology begins with empathy. We understand that hygiene is not just functional — it is emotional.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                className="group relative p-8 border border-rose-gold/20 hover:border-rose-gold/50 transition-all duration-500 bg-charcoal/50 backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="mb-6">
                  <Icon className="w-10 h-10 text-rose-gold group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-serif text-ivory mb-4">{feature.title}</h3>
                <p className="text-sand/70 font-light leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Product visualization placeholder */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="max-w-4xl mx-auto h-96 bg-gradient-to-br from-rose-gold/10 to-rose-blush/10 border border-rose-gold/20 flex items-center justify-center">
            <p className="text-sand/50 font-light text-sm">Product Visualization Placeholder</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

