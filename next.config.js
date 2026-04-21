/** @type {import('next').NextConfig} */

// Tight-but-shippable CSP. Next.js requires 'unsafe-inline' for styles (Tailwind
// injects per-page <style> tags) and 'unsafe-eval' is only needed in dev. PostHog
// and Supabase are explicitly allow-listed; everything else is blocked.
const isProd = process.env.NODE_ENV === 'production'

// Cloudflare Turnstile is loaded from challenges.cloudflare.com and renders its
// widget in an iframe from that same origin. It's always in the allow-list so
// the CSP doesn't change depending on whether the site key is set yet.
const TURNSTILE_ORIGIN = 'https://challenges.cloudflare.com'

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob: https://*.posthog.com https://*.supabase.co",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline' ${isProd ? '' : "'unsafe-eval'"} https://*.posthog.com ${TURNSTILE_ORIGIN}`.trim(),
  `connect-src 'self' https://*.supabase.co https://*.posthog.com https://app.posthog.com https://eu.i.posthog.com https://us.i.posthog.com ${TURNSTILE_ORIGIN}`,
  `frame-src ${TURNSTILE_ORIGIN}`,
  "media-src 'self'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  isProd ? 'upgrade-insecure-requests' : '',
]
  .filter(Boolean)
  .join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
]

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

module.exports = nextConfig
