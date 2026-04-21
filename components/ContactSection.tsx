'use client'

/**
 * Job: The considered path. For visitors who want a real conversation —
 * facilities directors specifying for a hotel or hospital, homeowners
 * with questions about installation, anyone who needs more than a
 * waitlist confirmation. The form captures enough context for a useful
 * first reply within two business days.
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
      <div className="max-w-xl mx-auto">
        <p className="font-sans text-xs uppercase tracking-[0.24em] text-gold-light/85 text-center mb-5">
          Talk to us
        </p>
        <h2
          id="contact-heading"
          className="font-display text-[1.75rem] sm:text-3xl text-silver-cream font-light text-center mb-5 tracking-[-0.02em]"
        >
          Request a consultation
        </h2>
        <p className="font-sans text-[0.9375rem] text-cream/72 text-center mb-12 leading-[1.8] max-w-md mx-auto text-balance">
          {"Specifying for a hotel, hospital, school, office, or home? Share a little context and we'll reply within two business days."}
        </p>
        <ConsultationForm />
      </div>
    </section>
  )
}
