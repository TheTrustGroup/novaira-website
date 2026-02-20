'use client'

import { useState, FormEvent, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText } from 'lucide-react'

const SPACE_TYPES = ['Hotel', 'Hospital', 'School', 'Office', 'Home', 'Other'] as const

interface SpecSheetModalProps {
  isOpen: boolean
  onClose: () => void
  /** Pre-fill "Type of Space" when opening (e.g. from Environment Selector). */
  initialTypeOfSpace?: string
}

export default function SpecSheetModal({ isOpen, onClose, initialTypeOfSpace }: SpecSheetModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    organization: '',
    typeOfSpace: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveRef = useRef<HTMLElement | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.workEmail,
          name: formData.fullName,
          organization: formData.organization || undefined,
          organization_type: formData.typeOfSpace ? formData.typeOfSpace.toLowerCase() as 'hotel' | 'hospital' | 'school' | 'office' | 'home' | 'other' : undefined,
          lead_source: 'spec_download',
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error((data as { error?: string }).error || 'Request failed')
      }
      setSubmitStatus('success')
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  // Pre-fill type of space when opened with initialTypeOfSpace (e.g. from Environment Selector)
  useEffect(() => {
    if (isOpen && initialTypeOfSpace) {
      setFormData((prev) => ({ ...prev, typeOfSpace: initialTypeOfSpace }))
    }
  }, [isOpen, initialTypeOfSpace])

  // ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  // Focus trap: keep focus inside modal when open
  useEffect(() => {
    if (!isOpen) return
    previousActiveRef.current = document.activeElement as HTMLElement | null
    const el = modalRef.current
    if (!el) return
    const focusables = el.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    first?.focus()

    const handleTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }
    el.addEventListener('keydown', handleTrap)
    return () => {
      el.removeEventListener('keydown', handleTrap)
      previousActiveRef.current?.focus()
    }
  }, [isOpen])

  const handleClose = () => {
    if (submitStatus === 'success') {
      setFormData({ fullName: '', workEmail: '', organization: '', typeOfSpace: '' })
      setSubmitStatus('idle')
    }
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-charcoal/95 backdrop-blur-md z-[100]"
            onClick={handleClose}
            aria-hidden="true"
          />

          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
            role="dialog"
            aria-modal="true"
            aria-labelledby="spec-sheet-modal-title"
            aria-describedby="spec-sheet-modal-description"
          >
            <div
              className="bg-charcoal border border-rose-gold/30 max-w-lg w-full max-h-[90vh] overflow-y-auto pointer-events-auto rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-charcoal/95 backdrop-blur-md border-b border-rose-gold/20 px-6 py-5 flex items-center justify-between">
                <div>
                  <h2
                    id="spec-sheet-modal-title"
                    className="text-2xl font-serif text-ivory mb-1"
                  >
                    Download Spec Sheet
                  </h2>
                  <p
                    id="spec-sheet-modal-description"
                    className="text-sm text-sand/70 font-light"
                  >
                    NOVAIRA series 1 — product specifications
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-sand/70 hover:text-rose-gold transition-colors duration-300 p-2 focus:outline-none focus:ring-2 focus:ring-rose-gold focus:ring-offset-2 focus:ring-offset-charcoal rounded"
                  aria-label="Close spec sheet form"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {submitStatus === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="w-16 h-16 bg-rose-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-rose-gold" />
                    </div>
                    <h3 className="text-xl font-serif text-ivory mb-2">Check your inbox</h3>
                    <p className="text-sand/70 font-light">
                      Your spec sheet is on its way. Check your inbox within 5 minutes.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <div>
                      <label
                        htmlFor="spec-fullName"
                        className="block text-sm font-light text-sand/80 mb-2"
                      >
                        Full Name <span className="text-rose-gold">*</span>
                      </label>
                      <input
                        type="text"
                        id="spec-fullName"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-charcoal border border-rose-gold/20 text-sand focus:border-rose-gold focus:outline-none focus:ring-2 focus:ring-rose-gold/50 transition-all duration-300 rounded font-light"
                        placeholder="Your full name"
                        aria-required="true"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="spec-workEmail"
                        className="block text-sm font-light text-sand/80 mb-2"
                      >
                        Work Email <span className="text-rose-gold">*</span>
                      </label>
                      <input
                        type="email"
                        id="spec-workEmail"
                        name="workEmail"
                        required
                        value={formData.workEmail}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-charcoal border border-rose-gold/20 text-sand focus:border-rose-gold focus:outline-none focus:ring-2 focus:ring-rose-gold/50 transition-all duration-300 rounded font-light"
                        placeholder="you@company.com"
                        aria-required="true"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="spec-organization"
                        className="block text-sm font-light text-sand/80 mb-2"
                      >
                        Organization
                      </label>
                      <input
                        type="text"
                        id="spec-organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-charcoal border border-rose-gold/20 text-sand focus:border-rose-gold focus:outline-none focus:ring-2 focus:ring-rose-gold/50 transition-all duration-300 rounded font-light"
                        placeholder="Your organization"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="spec-typeOfSpace"
                        className="block text-sm font-light text-sand/80 mb-2"
                      >
                        Type of Space <span className="text-rose-gold">*</span>
                      </label>
                      <select
                        id="spec-typeOfSpace"
                        name="typeOfSpace"
                        required
                        value={formData.typeOfSpace}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-charcoal border border-rose-gold/20 text-sand focus:border-rose-gold focus:outline-none focus:ring-2 focus:ring-rose-gold/50 transition-all duration-300 rounded font-light appearance-none cursor-pointer"
                        aria-required="true"
                      >
                        <option value="">Select...</option>
                        {SPACE_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {submitStatus === 'error' && (
                      <p className="text-sm text-rose-gold" role="alert">
                        Something went wrong. Please try again.
                      </p>
                    )}

                    <div className="flex gap-4 pt-2">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="flex-1 px-6 py-3 border border-rose-gold/50 text-rose-gold hover:bg-rose-gold/10 transition-all duration-300 font-light rounded focus:outline-none focus:ring-2 focus:ring-rose-gold focus:ring-offset-2 focus:ring-offset-charcoal"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 px-6 py-3 bg-rose-gold text-charcoal hover:bg-rose-blush transition-all duration-300 font-light rounded focus:outline-none focus:ring-2 focus:ring-rose-gold focus:ring-offset-2 focus:ring-offset-charcoal disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Sending...' : 'Download Spec Sheet'}
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
