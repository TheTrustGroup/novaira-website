/**
 * The NOVAIRA mark.
 *
 * Geometry (per owner's spec): offset crescent. Outer arc R=100, inner arc
 * r=80, offset dx=28. Intersection points (78.286, ±62.220) solved, not
 * approximated. ViewBox `-105 -105 210 210` centres the form.
 *
 * Gradient story: cool silver-cream at the tips → warm gold at the body →
 * cooler cream at the bottom. *Nova to earth. New star, grounded.*
 *
 * This is the production mark — deliberately stripped of the reveal-page
 * decoration (no rotating orbits, no filter glow, no mouse parallax).
 * Those effects live on a future /brand page; in the product they'd read
 * as ornament.
 *
 * The three variants:
 *   - `mark`        SVG only, square. Favicon, profile picture, watermark.
 *   - `horizontal`  Mark + wordmark side-by-side. Navigation, email sig.
 *   - `stacked`     Mark above wordmark. Hero/splash moments, not nav.
 *
 * Colour mode:
 *   - `theme="dark"`   (default) Gold gradient for ink backgrounds.
 *   - `theme="light"`  Bronze gradient for cream/light backgrounds.
 */

import { useId } from 'react'

type LogoVariant = 'mark' | 'horizontal' | 'stacked'
type LogoTheme = 'dark' | 'light'

type LogoProps = {
  variant?: LogoVariant
  theme?: LogoTheme
  /** Accessible name. Defaults to "NOVAIRA". Pass `null` to hide from AT. */
  title?: string | null
  /** Extra classes applied to the outer wrapper (sizing, spacing). */
  className?: string
  /** Extra classes applied to the SVG mark only (override mark size). */
  markClassName?: string
  /** Extra classes applied to the wordmark text only. */
  wordmarkClassName?: string
}

export default function Logo({
  variant = 'horizontal',
  theme = 'dark',
  title = 'NOVAIRA',
  className,
  markClassName,
  wordmarkClassName,
}: LogoProps) {
  if (variant === 'mark') {
    return (
      <Mark
        theme={theme}
        title={title}
        className={cx('inline-block', markClassName ?? 'w-8 h-8', className)}
      />
    )
  }

  if (variant === 'stacked') {
    return (
      <span
        className={cx('inline-flex flex-col items-center gap-5', className)}
        role={title ? 'img' : undefined}
        aria-label={title ?? undefined}
      >
        <Mark
          theme={theme}
          title={null}
          className={cx(markClassName ?? 'w-20 h-20 sm:w-24 sm:h-24')}
        />
        <Wordmark
          theme={theme}
          className={cx(
            'font-display font-extralight tracking-[0.32em] uppercase text-[1.375rem] sm:text-2xl',
            wordmarkClassName
          )}
        />
      </span>
    )
  }

  return (
    <span
      className={cx('inline-flex items-center gap-2.5 sm:gap-3', className)}
      role={title ? 'img' : undefined}
      aria-label={title ?? undefined}
    >
      <Mark
        theme={theme}
        title={null}
        className={cx(markClassName ?? 'w-7 h-7 sm:w-8 sm:h-8')}
      />
      <Wordmark
        theme={theme}
        className={cx(
          'font-display font-light tracking-[0.18em] uppercase text-[1.0625rem] sm:text-lg',
          wordmarkClassName
        )}
      />
    </span>
  )
}

/* ───────────────────────── Mark ───────────────────────── */

function Mark({
  theme,
  title,
  className,
}: {
  theme: LogoTheme
  title: string | null
  className?: string
}) {
  const gradId = useId().replace(/:/g, '')
  const fillId = `novaira-fill-${gradId}`

  // Display-size gradient (5 stops) — captures the full cool → warm → cool
  // arc the owner spec'd. Reads well from 24px upward.
  const stops =
    theme === 'dark'
      ? [
          { offset: '0%', color: '#F2EEE8' },
          { offset: '28%', color: '#E8C99A' },
          { offset: '50%', color: '#C4956A' },
          { offset: '72%', color: '#D4A87A' },
          { offset: '100%', color: '#EDE4D4' },
        ]
      : [
          { offset: '0%', color: '#3C2810' },
          { offset: '28%', color: '#6B4620' },
          { offset: '50%', color: '#8B5E30' },
          { offset: '72%', color: '#5A3A1C' },
          { offset: '100%', color: '#4A3018' },
        ]

  const tipColorA = theme === 'dark' ? '#F2EEE8' : '#3C2810'
  const tipColorB = theme === 'dark' ? '#EDE4D4' : '#4A3018'

  return (
    <svg
      viewBox="-105 -105 210 210"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? 'img' : 'presentation'}
      aria-label={title ?? undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      className={className}
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id={fillId} x1="-1" y1="-1" x2="1" y2="1" gradientUnits="userSpaceOnUse">
          {stops.map((s) => (
            <stop key={s.offset} offset={s.offset} stopColor={s.color} />
          ))}
        </linearGradient>
      </defs>

      {/* Interior fill — barely there, adds weight at larger sizes */}
      <path
        d="M 78.286,-62.220 A 100,100 0 1 0 78.286,62.220 A 80,80 0 1 1 78.286,-62.220 Z"
        fill={theme === 'dark' ? 'rgba(196,149,106,0.07)' : 'rgba(139,94,48,0.06)'}
      />

      {/* Outer arc — the primary stroke */}
      <path
        d="M 78.286,-62.220 A 100,100 0 1 0 78.286,62.220"
        stroke={`url(#${fillId})`}
        strokeWidth="4.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Inner arc — softer, gives the crescent its body */}
      <path
        d="M 78.286,-62.220 A 80,80 0 1 1 78.286,62.220"
        stroke={`url(#${fillId})`}
        strokeWidth="3.2"
        fill="none"
        strokeLinecap="round"
        opacity="0.72"
      />

      {/* Tip accents — the brand's punctuation. These survive compression. */}
      <circle cx="78.286" cy="-62.220" r="5" fill={tipColorA} opacity="0.92" />
      <circle cx="78.286" cy="62.220" r="5" fill={tipColorB} opacity="0.86" />
    </svg>
  )
}

/* ─────────────────────── Wordmark ─────────────────────── */

function Wordmark({
  theme,
  className,
}: {
  theme: LogoTheme
  className?: string
}) {
  const color =
    theme === 'dark'
      ? 'text-silver-cream/95 text-legible-on-media'
      : 'text-ink'
  return <span className={cx(color, className)}>NOVAIRA</span>
}

/* ─────────────────────── util ─────────────────────── */

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

export type { LogoProps, LogoVariant, LogoTheme }
