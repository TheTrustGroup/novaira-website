'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface LightboxImage {
  src: string
  alt: string
  title?: string
}

interface LightboxProps {
  images: LightboxImage[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNavigate?: (index: number) => void
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const minSwipeDistance = 50

  const currentImage = images[currentIndex]

  // Prevent body scroll and implement focus trap when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Focus trap: focus the close button when opened
      setTimeout(() => {
        const closeButton = document.getElementById('lightbox-close')
        closeButton?.focus()
      }, 100)

      // Focus trap: keep focus within lightbox
      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return

        const focusableElements = containerRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (!focusableElements || focusableElements.length === 0) return

        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }

      document.addEventListener('keydown', handleTabKey)
      return () => {
        document.removeEventListener('keydown', handleTabKey)
        document.body.style.overflow = 'unset'
      }
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])


  // Touch handlers for swipe navigation
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && currentIndex < images.length - 1) {
      handleNext()
    }
    if (isRightSwipe && currentIndex > 0) {
      handlePrevious()
    }
  }

  const handleNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      const nextIndex = currentIndex + 1
      onNavigate?.(nextIndex)
      setImageLoaded(false)
    }
  }, [currentIndex, images.length, onNavigate])

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1
      onNavigate?.(prevIndex)
      setImageLoaded(false)
    }
  }, [currentIndex, onNavigate])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        handlePrevious()
      } else if (e.key === 'ArrowRight' && currentIndex < images.length - 1) {
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex, images.length, handleNext, handlePrevious, onClose])

  const handleImageLoad = () => {
    setImageLoaded(true)
    setImageError(false)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(true)
  }

  // Reset image state when index changes
  useEffect(() => {
    setImageLoaded(false)
    setImageError(false)
  }, [currentIndex])

  if (!currentImage) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-charcoal/95 backdrop-blur-md z-[200]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Lightbox Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300,
              mass: 0.8,
            }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
            aria-describedby="lightbox-description"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              ref={containerRef}
              className="relative max-w-7xl w-full max-h-[90vh] flex items-center justify-center pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                id="lightbox-close"
                onClick={onClose}
                className="absolute top-4 right-4 z-10 text-sand/80 hover:text-rose-gold transition-colors duration-300 p-2 focus:outline-none focus:ring-2 focus:ring-rose-gold focus:ring-offset-2 focus:ring-offset-charcoal rounded-full bg-charcoal/50 backdrop-blur-sm"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" />
              </button>

              {/* Previous Button */}
              {currentIndex > 0 && (
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-sand/80 hover:text-rose-gold transition-colors duration-300 p-3 focus:outline-none focus:ring-2 focus:ring-rose-gold focus:ring-offset-2 focus:ring-offset-charcoal rounded-full bg-charcoal/50 backdrop-blur-sm hidden sm:flex items-center justify-center"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" aria-hidden="true" />
                </button>
              )}

              {/* Next Button */}
              {currentIndex < images.length - 1 && (
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-sand/80 hover:text-rose-gold transition-colors duration-300 p-3 focus:outline-none focus:ring-2 focus:ring-rose-gold focus:ring-offset-2 focus:ring-offset-charcoal rounded-full bg-charcoal/50 backdrop-blur-sm hidden sm:flex items-center justify-center"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" aria-hidden="true" />
                </button>
              )}

              {/* Image Container */}
              <div className="relative w-full h-full flex items-center justify-center">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: imageLoaded ? 1 : 0, scale: imageLoaded ? 1 : 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative max-w-full max-h-[90vh] rounded-lg overflow-hidden shadow-2xl"
                >
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-charcoal/50 animate-pulse flex items-center justify-center z-10">
                      <div className="w-12 h-12 border-2 border-rose-gold/30 border-t-rose-gold rounded-full animate-spin" />
                    </div>
                  )}
                  {imageError ? (
                    <div className="max-w-full max-h-[90vh] w-full h-[60vh] flex flex-col items-center justify-center bg-charcoal/30 rounded-lg p-8">
                      <div className="w-16 h-16 border-2 border-rose-gold/30 rounded-full flex items-center justify-center mb-4">
                        <X className="w-8 h-8 text-rose-gold/50" />
                      </div>
                      <p className="text-sand/60 font-light text-sm text-center">
                        Image not available
                      </p>
                      <p className="text-sand/40 font-light text-xs text-center mt-2">
                        {currentImage.alt}
                      </p>
                    </div>
                  ) : (
                    <div className="relative w-full h-[70vh] min-h-[300px] max-h-[90vh]">
                      <Image
                        ref={imageRef}
                        src={currentImage.src}
                        alt={currentImage.alt}
                        id="lightbox-image"
                        fill
                        sizes="100vw"
                        className="object-contain"
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        loading="lazy"
                        draggable={false}
                      />
                    </div>
                  )}
                </motion.div>

                {/* Image Title */}
                {currentImage.title && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: imageLoaded ? 1 : 0, y: imageLoaded ? 0 : 10 }}
                    transition={{ delay: 0.2 }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-charcoal/80 backdrop-blur-sm px-6 py-3 rounded-lg"
                  >
                    <h3
                      id="lightbox-title"
                      className="text-sm sm:text-base font-serif text-ivory text-center"
                    >
                      {currentImage.title}
                    </h3>
                  </motion.div>
                )}
              </div>

              {/* Image Counter */}
              {images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-charcoal/80 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <span className="text-xs sm:text-sm text-sand/70 font-light">
                    {currentIndex + 1} / {images.length}
                  </span>
                </div>
              )}

              {/* Hidden description for screen readers */}
              <div id="lightbox-description" className="sr-only">
                {currentImage.alt}
                {currentImage.title && ` - ${currentImage.title}`}
                {images.length > 1 && ` - Image ${currentIndex + 1} of ${images.length}`}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
