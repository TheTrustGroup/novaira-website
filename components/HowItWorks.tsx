'use client'

/**
 * Job: Four steps, plain language, room to breathe.
 */
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'

const STEPS = [
  { title: 'Place', line: 'Waste goes into a sealed chamber. Nothing to handle after that.' },
  { title: 'Activate', line: 'One touch starts a quiet cycle. The unit does the rest.' },
  { title: 'Process', line: 'The cycle completes without someone standing over it.' },
  { title: 'Complete', line: 'The chamber is ready again, cleanly.' },
] as const

export default function HowItWorks() {
  const sectionRef = useRevealOnScroll<HTMLElement>()

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="reveal-on-scroll py-24 sm:py-32 lg:py-40 px-6 sm:px-10 border-t border-gold/10"
      aria-labelledby="how-heading"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          id="how-heading"
          className="font-display text-[1.75rem] sm:text-3xl md:text-4xl text-silver-cream text-center mb-16 sm:mb-20 font-light tracking-[-0.02em]"
        >
          How it works
        </h2>
        <ol className="grid sm:grid-cols-2 gap-14 sm:gap-x-16 sm:gap-y-16 list-none">
          {STEPS.map((step, i) => (
            <li key={step.title} className="border-l border-gold/20 pl-7 sm:pl-9">
              <span className="font-sans text-xs text-gold/70 block mb-3 tabular-nums">
                {i + 1 < 10 ? `0${i + 1}` : i + 1}
              </span>
              <h3 className="font-display text-xl sm:text-2xl text-silver-cream font-light mb-3 tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="font-sans font-normal text-cream/82 text-[0.9375rem] sm:text-base leading-[1.75]">
                {step.line}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
