'use client'

/**
 * Job: Capture consultation requests — minimal fields, no reload on submit.
 */
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import ConsultationForm from '@/components/ConsultationForm'

export default function ContactSection() {
  const ref = useRevealOnScroll<HTMLElement>()

  return (
    <section
      ref={ref}
      id="contact"
      className="reveal-on-scroll py-20 sm:py-28 lg:py-32 px-5 sm:px-8 border-t border-gold/15 bg-ink-muted/30"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-xl mx-auto">
        <h2
          id="contact-heading"
          className="font-display text-3xl sm:text-4xl text-silver-cream font-light text-center mb-10 sm:mb-12"
        >
          Request consultation
        </h2>
        <ConsultationForm />
      </div>
    </section>
  )
}
