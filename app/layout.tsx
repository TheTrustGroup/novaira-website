import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Novaira — Luxury Sanitary Pad Burner | Dignity Deserves Design',
  description: 'Dignity deserves design. Novaira creates ultra-modern sanitary pad burners that feel less like machines and more like a natural part of a refined, welcoming space.',
  keywords: 'luxury sanitary pad burner, discreet disposal, dignity, menstrual care, premium wellness technology, Novaira',
  authors: [{ name: 'Novaira' }],
  openGraph: {
    title: 'Novaira — Luxury Sanitary Pad Burner',
    description: 'Dignity deserves design. This is hygiene, redefined.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

