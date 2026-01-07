'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Home, Building2, Hotel, Heart, GraduationCap } from 'lucide-react'

export default function WhereItBelongs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const environments = [
    {
      icon: Home,
      title: 'Homes',
      subtitle: 'Homes that value refinement',
      description: 'A thoughtful addition to any home, creating spaces where dignity and privacy are never compromised.',
    },
    {
      icon: Building2,
      title: 'Offices',
      subtitle: 'Offices that care about well-being',
      description: 'Supporting professional environments where every individual deserves respect and comfort.',
    },
    {
      icon: Hotel,
      title: 'Hotels',
      subtitle: 'Hotels that prioritize guest experience',
      description: 'Elevate the guest experience with thoughtful amenities that speak to true luxury and care.',
    },
    {
      icon: Heart,
      title: 'Hospitals',
      subtitle: 'Hospitals that require trust and safety',
      description: 'Where medical precision meets human dignity, ensuring comfort in sensitive moments.',
    },
    {
      icon: GraduationCap,
      title: 'Schools',
      subtitle: 'Schools that require trust and safety',
      description: 'Creating supportive environments where young people feel respected and cared for.',
    },
  ]

  return (
    <section ref={ref} className="py-32 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-ivory mb-6">
            Engineered for Modern Spaces
          </h2>
          <p className="text-lg text-sand/70 max-w-2xl mx-auto font-light">
            Novaira products are built for the environments where comfort matters most. Our designs blend seamlessly into contemporary interiors, reflecting a new standard of hygiene.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {environments.map((env, index) => {
            const Icon = env.icon
            return (
              <motion.div
                key={index}
                className="group p-8 border border-rose-gold/20 hover:border-rose-gold/50 transition-all duration-500 bg-charcoal/50 backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="mb-6">
                  <Icon className="w-10 h-10 text-rose-gold group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-2xl font-serif text-ivory mb-2">{env.title}</h3>
                <p className="text-rose-gold mb-4 font-light">{env.subtitle}</p>
                <p className="text-sand/70 font-light leading-relaxed">{env.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

