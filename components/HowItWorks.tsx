'use client'

/**
 * Job: Four steps; strongest in-view step gets accent (border + index colour).
 */
import { useEffect, useRef, useState } from 'react'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'

const STEPS = [
  { title: 'Place', line: 'Waste goes into a sealed chamber. Nothing to handle after that.' },
  { title: 'Activate', line: 'One touch starts a quiet cycle. The unit does the rest.' },
  { title: 'Process', line: 'The cycle completes without someone standing over it.' },
  { title: 'Complete', line: 'The chamber is ready again, cleanly.' },
] as const

export default function HowItWorks() {
  const sectionRef = useRevealOnScroll<HTMLElement>()
  const stepRefs = useRef<(HTMLLIElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean) as HTMLLIElement[]
    if (nodes.length === 0) return

    const pickActive = (entries: IntersectionObserverEntry[]) => {
      const visible = entries.filter((e) => e.isIntersecting)
      if (visible.length === 0) return
      const best = visible.reduce((a, b) =>
        a.intersectionRatio >= b.intersectionRatio ? a : b
      )
      const idx = Number((best.target as HTMLLIElement).dataset.stepIndex)
      if (!Number.isNaN(idx)) setActiveIndex(idx)
    }

    const io = new IntersectionObserver(pickActive, {
      threshold: [0.15, 0.35, 0.55],
      rootMargin: '-14% 0px -14% 0px',
    })
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])

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
          {STEPS.map((step, i) => {
            const active = activeIndex === i
            return (
              <li
                key={step.title}
                ref={(el) => {
                  stepRefs.current[i] = el
                }}
                data-step-index={i}
                className={`border-l-2 pl-7 sm:pl-9 transition-[border-color] duration-300 ${
                  active ? 'border-gold' : 'border-gold/20'
                }`}
              >
                <span
                  className={`font-sans text-xs block mb-3 tabular-nums transition-colors duration-300 ${
                    active ? 'text-gold-light' : 'text-gold/55'
                  }`}
                >
                  {i + 1 < 10 ? `0${i + 1}` : i + 1}
                </span>
                <h3
                  className={`font-display text-xl sm:text-2xl font-light mb-3 tracking-[-0.02em] transition-colors duration-300 ${
                    active ? 'text-silver-cream' : 'text-silver-cream/75'
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`font-sans font-normal text-[0.9375rem] sm:text-base leading-[1.75] transition-colors duration-300 ${
                    active ? 'text-cream/88' : 'text-cream/68'
                  }`}
                >
                  {step.line}
                </p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
