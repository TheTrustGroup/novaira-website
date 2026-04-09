'use client'

/**
 * Job: Short invitation, then the form.
 */
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import ConsultationForm from '@/components/ConsultationForm'

export default function ContactSection() {
  const ref = useRevealOnScroll<HTMLElement>()

  return (
    <section
      ref={ref}
      id="contact"
      className="reveal-on-scroll py-24 sm:py-32 lg:py-40 px-6 sm:px-10 border-t border-gold/10 bg-ink-muted/25"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-md mx-auto">
        <h2
          id="contact-heading"
          className="font-display text-[1.75rem] sm:text-3xl text-silver-cream font-light text-center mb-4 tracking-[-0.02em]"
        >
          Consultation
        </h2>
        <p className="font-sans text-sm text-cream/65 text-center mb-12 leading-relaxed">
          Leave your details. We reply within two business days.
        </p>
        <ConsultationForm />
      </div>
    </section>
  )
}
