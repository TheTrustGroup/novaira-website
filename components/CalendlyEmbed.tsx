'use client'

import dynamic from 'next/dynamic'

const InlineWidget = dynamic(
  () => import('react-calendly').then((mod) => mod.InlineWidget),
  { ssr: false }
)

export default function CalendlyEmbed() {
  const url = process.env.NEXT_PUBLIC_CALENDLY_URL
  if (!url) return null
  return (
    <div className="rounded-lg overflow-hidden border border-rose-gold/20 bg-charcoal/50" style={{ minHeight: 700 }}>
      <InlineWidget url={url} styles={{ height: '700px' }} />
    </div>
  )
}
