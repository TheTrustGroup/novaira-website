'use client'

import { useState, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Phone, Building2, MessageSquare } from 'lucide-react'

interface ConsultationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitStatus('success')
      setTimeout(() => {
        onClose()
        setFormData({ name: '', email: '', phone: '', organization: '', message: '' })
        setSubmitStatus('idle')
      }, 2000)
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-charcoal/95 backdrop-blur-sm z-[100]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
            role="dialog"
            aria-modal="true"
            aria-labelledby="consultation-modal-title"
            aria-describedby="consultation-modal-description"
          >
            <div
              className="bg-charcoal border border-rose-gold/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-charcoal/95 backdrop-blur-md border-b border-rose-gold/20 px-6 py-5 flex items-center justify-between">
                <div>
                  <h2
                    id="consultation-modal-title"
                    className="text-2xl font-serif text-ivory mb-1"
                  >
                    Request Consultation
                  </h2>
                  <p
                    id="consultation-modal-description"
                    className="text-sm text-sand/70 font-light"
                  >
                    We'll get back to you within 24 hours
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-sand/70 hover:text-rose-gold transition-colors duration-300 p-2 focus:outline-none focus:ring-2 focus:ring-rose-gold focus:ring-offset-2 focus:ring-offset-charcoal rounded"
                  aria-label="Close consultation form"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {submitStatus === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-rose-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-rose-gold" />
                    </div>
                    <h3 className="text-xl font-serif text-ivory mb-2">Thank You</h3>
                    <p className="text-sand/70 font-light">
                      We've received your request and will contact you soon.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-light text-sand/80 mb-2"
                      >
                        Full Name <span className="text-rose-gold">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-charcoal border border-rose-gold/20 text-sand focus:border-rose-gold focus:outline-none focus:ring-2 focus:ring-rose-gold/50 transition-all duration-300 rounded font-light"
                        placeholder="Your name"
                        aria-required="true"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-light text-sand/80 mb-2"
                      >
                        Email Address <span className="text-rose-gold">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sand/40" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3 bg-charcoal border border-rose-gold/20 text-sand focus:border-rose-gold focus:outline-none focus:ring-2 focus:ring-rose-gold/50 transition-all duration-300 rounded font-light"
                          placeholder="your.email@example.com"
                          aria-required="true"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-light text-sand/80 mb-2"
                      >
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sand/40" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3 bg-charcoal border border-rose-gold/20 text-sand focus:border-rose-gold focus:outline-none focus:ring-2 focus:ring-rose-gold/50 transition-all duration-300 rounded font-light"
                          placeholder="+1 (234) 567-890"
                        />
                      </div>
                    </div>

                    {/* Organization */}
                    <div>
                      <label
                        htmlFor="organization"
                        className="block text-sm font-light text-sand/80 mb-2"
                      >
                        Organization
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sand/40" />
                        <input
                          type="text"
                          id="organization"
                          name="organization"
                          value={formData.organization}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3 bg-charcoal border border-rose-gold/20 text-sand focus:border-rose-gold focus:outline-none focus:ring-2 focus:ring-rose-gold/50 transition-all duration-300 rounded font-light"
                          placeholder="Your organization (optional)"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-light text-sand/80 mb-2"
                      >
                        Message
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-sand/40" />
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3 bg-charcoal border border-rose-gold/20 text-sand focus:border-rose-gold focus:outline-none focus:ring-2 focus:ring-rose-gold/50 transition-all duration-300 rounded font-light resize-none"
                          placeholder="Tell us about your needs..."
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-6 py-3 border border-rose-gold/50 text-rose-gold hover:bg-rose-gold/10 transition-all duration-300 font-light rounded focus:outline-none focus:ring-2 focus:ring-rose-gold focus:ring-offset-2 focus:ring-offset-charcoal"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 px-6 py-3 bg-rose-gold text-charcoal hover:bg-rose-blush transition-all duration-300 font-light rounded focus:outline-none focus:ring-2 focus:ring-rose-gold focus:ring-offset-2 focus:ring-offset-charcoal disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Request'}
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
