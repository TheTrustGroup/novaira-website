/**
 * Job: Make CE / ISO / medical / silent impossible to miss — one factual strip, not badges.
 */
const ITEMS = ['CE Certified', 'ISO 9001:2015', 'Medical Grade', 'Silent Operation'] as const

export default function CredentialsBar() {
  return (
    <div
      className="w-full border-y border-gold/20 bg-ink-muted/80"
      role="region"
      aria-label="Certifications and product facts"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 sm:py-5">
        <p className="font-sans font-extralight text-xs sm:text-sm text-cream text-center tracking-[0.12em] uppercase">
          {ITEMS.join('  ·  ')}
        </p>
      </div>
    </div>
  )
}
