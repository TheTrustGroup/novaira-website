'use client'

/**
 * Job: Prove autonomous operation in four one-line steps — no essays.
 */
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'

const STEPS = [
  { title: 'Place', line: 'Waste goes in a sealed chamber — no further handling.' },
  { title: 'Activate', line: 'One touch starts a silent, autonomous processing cycle.' },
  { title: 'Process', line: 'The unit completes the cycle without supervision.' },
  { title: 'Complete', line: 'Ready for dignified, repeat use.' },
] as const

export default function HowItWorks() {
  const sectionRef = useRevealOnScroll<HTMLElement>()

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="reveal-on-scroll py-20 sm:py-28 lg:py-32 px-5 sm:px-8 border-t border-gold/10"
      aria-labelledby="how-heading"
    >
      <div className="max-w-5xl mx-auto">
        <h2 id="how-heading" className="font-display text-3xl sm:text-4xl md:text-5xl text-silver-cream text-center mb-14 sm:mb-16 font-light">
          How It Works
        </h2>
        <ol className="grid sm:grid-cols-2 gap-10 sm:gap-x-12 sm:gap-y-12 list-none">
          {STEPS.map((step, i) => (
            <li key={step.title} className="border-l border-gold/30 pl-6 sm:pl-8">
              <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-gold/80 block mb-2">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-xl sm:text-2xl text-silver-cream font-light mb-2">
                {step.title}
              </h3>
              <p className="font-sans font-extralight text-cream/85 text-sm sm:text-base leading-relaxed">
                {step.line}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
