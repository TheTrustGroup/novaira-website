import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import { PosthogProvider } from '@/components/PosthogProvider'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-cormorant',
  display: 'swap',
  preload: true,
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['200', '300', '400'],
  variable: '--font-jost',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: 'NOVAIRA — Menstrual hygiene disposal for institutional spaces',
    template: '%s | NOVAIRA',
  },
  description:
    'CE and ISO 9001 certified menstrual hygiene disposal. Silent, medical-grade materials. Founding pilot partners: Q3 2026.',
  keywords: [
    'menstrual hygiene disposal',
    'sanitary waste disposal',
    'CE certified disposal',
    'hotel hygiene',
    'hospital sanitary disposal',
  ],
  authors: [{ name: 'NOVAIRA' }],
  creator: 'NOVAIRA',
  publisher: 'NOVAIRA',
  metadataBase: new URL('https://www.novairaworld.com'),
  alternates: { canonical: 'https://www.novairaworld.com' },
  openGraph: {
    title: 'NOVAIRA — Institutional menstrual hygiene disposal',
    description:
      'CE and ISO 9001 certified. Silent operation. Medical-grade materials. Q3 2026 deployment.',
    type: 'website',
    url: 'https://www.novairaworld.com',
    locale: 'en_US',
    siteName: 'NOVAIRA',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'NOVAIRA' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOVAIRA',
    description: 'CE and ISO 9001 certified menstrual hygiene disposal for institutional spaces.',
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
    <html lang="en" className={`${cormorant.variable} ${jost.variable} scroll-smooth`}>
      <body className="antialiased font-sans">
        <PosthogProvider>{children}</PosthogProvider>
      </body>
    </html>
  )
}
