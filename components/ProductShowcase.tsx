'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, VolumeX, Hand, Heart, Leaf, ZoomIn } from 'lucide-react'
import Lightbox from './Lightbox'

export default function ProductShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Product images gallery - replace with actual image URLs
  const productImages = [
    {
      src: '/images/product-1.jpg',
      alt: 'NOVAIRA sanitary disposal unit in a modern bathroom setting',
      title: 'Modern Bathroom Integration',
      thumbnail: '/images/product-1-thumb.jpg',
    },
    {
      src: '/images/product-2.jpg',
      alt: 'Close-up view of NOVAIRA showing elegant design details',
      title: 'Elegant Design Details',
      thumbnail: '/images/product-2-thumb.jpg',
    },
    {
      src: '/images/product-3.jpg',
      alt: 'NOVAIRA in a luxury hotel bathroom environment',
      title: 'Luxury Hotel Environment',
      thumbnail: '/images/product-3-thumb.jpg',
    },
    {
      src: '/images/product-4.jpg',
      alt: 'NOVAIRA showcasing minimalist aesthetic',
      title: 'Minimalist Aesthetic',
      thumbnail: '/images/product-4-thumb.jpg',
    },
  ]

  const handleImageClick = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const handleLightboxNavigate = (index: number) => {
    setLightboxIndex(index)
  }

  const features = [
    {
      icon: Hand,
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
    <section 
      id="product" 
      ref={ref} 
      className="py-24 sm:py-32 lg:py-40 px-6 sm:px-8 lg:px-12"
      aria-labelledby="product-heading"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16 sm:mb-20 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 
            id="product-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-ivory mb-6 font-medium"
          >
            Design With Empathy
          </h2>
          <p className="text-lg sm:text-xl text-sand/85 max-w-3xl mx-auto font-light leading-relaxed">
            NOVAIRA begins with empathy. We understand that hygiene is not just functional — it is emotional.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                className="group relative p-6 sm:p-8 border border-rose-gold/20 hover:border-rose-gold/50 transition-all duration-500 bg-charcoal/50 backdrop-blur-sm rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
                whileHover={{ y: -4, scale: 1.01 }}
              >
                <div className="mb-6">
                  <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-rose-gold group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-ivory mb-5 font-medium">{feature.title}</h3>
                <p className="text-sm sm:text-base text-sand/85 font-light leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Product Gallery */}
        <motion.div
          className="mt-16 sm:mt-20 lg:mt-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {productImages.map((image, index) => (
              <motion.button
                key={index}
                onClick={() => handleImageClick(index)}
                className="group relative aspect-square overflow-hidden rounded-lg border border-rose-gold/20 hover:border-rose-gold/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-gold focus:ring-offset-2 focus:ring-offset-charcoal bg-gradient-to-br from-rose-gold/10 via-rose-blush/10 to-rose-gold/10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label={`View ${image.title || image.alt}`}
              >
                {/* Placeholder or actual image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-4">
                    <ZoomIn className="w-8 h-8 sm:w-10 sm:h-10 text-rose-gold/40 group-hover:text-rose-gold transition-colors duration-300 mx-auto mb-2" />
                    <p className="text-xs sm:text-sm text-sand/50 font-light">{image.title}</p>
                  </div>
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300 pointer-events-none" aria-hidden />
              </motion.button>
            ))}
          </div>
          
          {/* Featured Product Image */}
          <motion.button
            onClick={() => handleImageClick(0)}
            className="mt-6 sm:mt-8 w-full relative aspect-video overflow-hidden rounded-lg border border-rose-gold/20 hover:border-rose-gold/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-gold focus:ring-offset-2 focus:ring-offset-charcoal bg-gradient-to-br from-rose-gold/10 via-rose-blush/10 to-rose-gold/10 group"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            aria-label={`View ${productImages[0]?.title || 'Product image'}`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-6">
                <ZoomIn className="w-12 h-12 sm:w-16 sm:h-16 text-rose-gold/40 group-hover:text-rose-gold transition-colors duration-300 mx-auto mb-4" />
                <p className="text-sm sm:text-base text-sand/60 font-light">{productImages[0]?.title}</p>
                <p className="text-xs text-sand/40 font-light mt-2">Click to view in full size</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300" />
          </motion.button>
        </motion.div>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={productImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={handleLightboxNavigate}
      />
    </section>
  )
}

