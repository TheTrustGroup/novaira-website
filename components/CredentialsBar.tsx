/**
 * Job: One calm line of proof. No badge wall, no decorative separators.
 */
export default function CredentialsBar() {
  return (
    <div
      className="w-full border-y border-gold/10 bg-ink-muted/60"
      role="region"
      aria-label="Certifications and product facts"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-6 sm:py-8">
        <p className="font-sans font-normal text-sm sm:text-[0.9375rem] text-cream/80 text-center leading-relaxed text-legible-on-ink max-w-3xl mx-auto">
          CE certified. ISO 9001:2015. Medical-grade materials. Silent operation.
        </p>
      </div>
    </div>
  )
}
