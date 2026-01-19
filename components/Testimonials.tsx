'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star } from 'lucide-react'

interface Testimonial {
  quote: string
  name: string
  role: string
  organization?: string
}

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const testimonials: Testimonial[] = [
    {
      quote: 'Novaira has transformed how we approach hygiene in our facilities. The thoughtful design respects both privacy and dignity.',
      name: 'Dr. Sarah Chen',
      role: 'Chief Medical Officer',
      organization: 'Metropolitan Healthcare Group',
    },
    {
      quote: 'We chose Novaira for our hotels because it aligns with our commitment to thoughtful, elegant guest experiences.',
      name: 'James Mitchell',
      role: 'Director of Operations',
      organization: 'The Grand Collection Hotels',
    },
    {
      quote: 'In our schools, Novaira provides a solution that students and staff appreciate. It\'s discreet, reliable, and beautifully designed.',
      name: 'Patricia Williams',
      role: 'Facilities Manager',
      organization: 'Riverside School District',
    },
    {
      quote: 'The attention to detail in Novaira\'s design shows a deep understanding of what matters in sensitive environments.',
      name: 'Michael Rodriguez',
      role: 'Architectural Consultant',
      organization: 'Modern Spaces Design',
    },
    {
      quote: 'Novaira represents the kind of innovation we need—technology that serves people with empathy and respect.',
      name: 'Dr. Emily Thompson',
      role: 'Wellness Director',
      organization: 'Corporate Wellness Partners',
    },
  ]

  return (
    <section
      ref={ref}
      className="py-24 sm:py-32 lg:py-40 px-6 sm:px-8 lg:px-12 bg-charcoal/30"
      aria-labelledby="testimonials-heading"
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
            id="testimonials-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-ivory mb-6 font-medium"
          >
            Trusted by Institutions & Communities
          </h2>
          <p className="text-lg sm:text-xl text-sand/85 max-w-3xl mx-auto font-light leading-relaxed">
            Organizations and communities choose Novaira for its thoughtful design and unwavering commitment to dignity.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={index}
              className="group relative p-6 sm:p-8 bg-charcoal/50 backdrop-blur-sm border border-rose-gold/10 hover:border-rose-gold/30 rounded-lg transition-all duration-500 hover:shadow-xl hover:shadow-rose-gold/5"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.4, 0, 0.2, 1],
              }}
              whileHover={{ y: -3 }}
            >
              {/* Subtle Star Rating */}
              <div className="flex gap-1 mb-4 opacity-40" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-rose-gold/30 text-rose-gold/30"
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="mb-7">
                <p className="text-base sm:text-lg text-sand/95 font-light leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
              </blockquote>

              {/* Author Info */}
              <footer className="mt-7 pt-6 border-t border-rose-gold/10">
                <p className="text-sm sm:text-base font-serif text-ivory font-medium mb-1.5">
                  {testimonial.name}
                </p>
                <p className="text-xs sm:text-sm text-sand/75 font-light">
                  {testimonial.role}
                  {testimonial.organization && (
                    <>
                      <span className="mx-1.5">·</span>
                      <span>{testimonial.organization}</span>
                    </>
                  )}
                </p>
              </footer>

              {/* Subtle hover effect overlay */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-rose-gold/0 to-rose-blush/0 group-hover:from-rose-gold/5 group-hover:to-rose-blush/5 transition-all duration-500 pointer-events-none" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
