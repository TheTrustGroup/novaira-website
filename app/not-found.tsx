import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ink text-cream px-6">
      <h1 className="text-4xl font-display text-silver-cream mb-3 font-light">404</h1>
      <p className="text-lg text-cream/70 font-extralight mb-8">Page not found</p>
      <Link href="/" className="text-gold hover:text-gold-light transition-colors text-sm font-light">
        Back to home
      </Link>
    </div>
  )
}
