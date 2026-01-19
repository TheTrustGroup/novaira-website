import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Novaira — Luxury Sanitary Pad Burner | Dignity Deserves Design',
  description: 'Dignity deserves design. Novaira creates ultra-modern sanitary pad burners that feel less like machines and more like a natural part of a refined, welcoming space.',
  keywords: 'luxury sanitary pad burner, discreet disposal, dignity, menstrual care, premium wellness technology, Novaira',
  authors: [{ name: 'Novaira' }],
  creator: 'Novaira',
  publisher: 'Novaira',
  metadataBase: new URL('https://novaira.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Novaira — Luxury Sanitary Pad Burner',
    description: 'Dignity deserves design. This is hygiene, redefined.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Novaira',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Novaira — Luxury Sanitary Pad Burner',
    description: 'Dignity deserves design. This is hygiene, redefined.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1a1a1a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  )
}

