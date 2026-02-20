import type { Metadata, Viewport } from 'next'
import { PosthogProvider } from '@/components/PosthogProvider'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'NOVAIRA — Luxury Sanitary Disposal for Hotels & Institutions',
    template: '%s | NOVAIRA',
  },
  description:
    'NOVAIRA series 1 is a CE & ISO certified premium sanitary disposal system for luxury hotels, hospitals, schools and offices. Request a product specification sheet.',
  keywords: [
    'sanitary pad disposal',
    'menstrual waste disposal',
    'luxury sanitary disposal unit',
    'pad incinerator hotels',
    'menstrual hygiene B2B',
    'institutional hygiene solutions',
  ],
  authors: [{ name: 'NOVAIRA' }],
  creator: 'NOVAIRA',
  publisher: 'NOVAIRA',
  metadataBase: new URL('https://novairaworld.com'),
  alternates: { canonical: 'https://novairaworld.com' },
  openGraph: {
    title: 'NOVAIRA — Hygiene, Redefined',
    description:
      'Premium sanitary disposal technology designed with empathy for luxury hotels, hospitals and institutions.',
    type: 'website',
    url: 'https://novairaworld.com',
    locale: 'en_US',
    siteName: 'NOVAIRA',
    images: [
      { url: '/og-image.jpg', width: 1200, height: 630, alt: 'NOVAIRA' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOVAIRA',
    description: 'Luxury sanitary disposal technology.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
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
      <body className="antialiased">
        <PosthogProvider>{children}</PosthogProvider>
      </body>
    </html>
  )
}

