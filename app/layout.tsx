import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import { PosthogProvider } from '@/components/PosthogProvider'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300'],
  variable: '--font-cormorant',
  display: 'swap',
  preload: true,
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-jost',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: 'NOVAIRA | Medical-grade menstrual hygiene disposal',
    template: '%s | NOVAIRA',
  },
  description:
    'Medical-grade menstrual hygiene disposal, made to belong in any space. CE and ISO 9001 certified. First release Q3 2026. Join the waitlist.',
  keywords: [
    'menstrual hygiene disposal',
    'sanitary waste disposal',
    'period product disposal',
    'home menstrual disposal',
    'residential sanitary bin',
    'CE certified disposal',
    'hotel hygiene',
    'hospital sanitary disposal',
    'office sanitary disposal',
    'school sanitary disposal',
  ],
  authors: [{ name: 'NOVAIRA' }],
  creator: 'NOVAIRA',
  publisher: 'NOVAIRA',
  metadataBase: new URL('https://www.novairaworld.com'),
  alternates: { canonical: 'https://www.novairaworld.com' },
  openGraph: {
    title: 'NOVAIRA | Medical-grade menstrual hygiene disposal',
    description:
      'Medical-grade menstrual hygiene disposal, made to belong in any space. CE and ISO 9001 certified. First release Q3 2026.',
    type: 'website',
    url: 'https://www.novairaworld.com',
    locale: 'en_US',
    siteName: 'NOVAIRA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOVAIRA',
    description:
      'Medical-grade menstrual hygiene disposal, made to belong in any space. CE and ISO 9001 certified.',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  // Brand ink — matches tailwind.config.js `ink` token and the favicon ground.
  themeColor: '#09070A',
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
