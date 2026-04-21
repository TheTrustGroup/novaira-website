import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'NOVAIRA | Medical-grade menstrual hygiene disposal for homes and institutions'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Canonical brand tokens (same hexes as tailwind.config.js + the reveal HTML).
const INK = '#09070A'
const CREAM = '#F3EBD8'
const GOLD = '#C4956A'
const GOLD_LIGHT = '#E8C99A'

const MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-105 -105 210 210">
  <defs>
    <linearGradient id="g" x1="-1" y1="-1" x2="1" y2="1" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#F2EEE8"/>
      <stop offset="28%" stop-color="#E8C99A"/>
      <stop offset="50%" stop-color="#C4956A"/>
      <stop offset="72%" stop-color="#D4A87A"/>
      <stop offset="100%" stop-color="#EDE4D4"/>
    </linearGradient>
  </defs>
  <path d="M 78.286,-62.220 A 100,100 0 1 0 78.286,62.220 A 80,80 0 1 1 78.286,-62.220 Z" fill="rgba(196,149,106,0.08)"/>
  <path d="M 78.286,-62.220 A 100,100 0 1 0 78.286,62.220" stroke="url(#g)" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M 78.286,-62.220 A 80,80 0 1 1 78.286,62.220" stroke="url(#g)" stroke-width="3.5" fill="none" stroke-linecap="round" opacity="0.72"/>
  <circle cx="78.286" cy="-62.220" r="5.5" fill="#F2EEE8" opacity="0.95"/>
  <circle cx="78.286" cy="62.220" r="5.5" fill="#EDE4D4" opacity="0.88"/>
</svg>`

const markDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(MARK_SVG)}`

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          // Layered radials echoing the reveal-page deep-space treatment,
          // scaled to the OG canvas.
          background: `
            radial-gradient(ellipse 55% 45% at 30% 28%, rgba(196,149,106,0.10) 0%, transparent 65%),
            radial-gradient(ellipse 80% 40% at 50% 100%, rgba(139,112,80,0.07) 0%, transparent 55%),
            radial-gradient(ellipse 100% 100% at 50% 50%, #0D0A0E 0%, ${INK} 75%)
          `,
          padding: '72px 88px',
          color: CREAM,
          fontFamily: 'serif',
        }}
      >
        {/* ── Top strip: mark + wordmark ─────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markDataUri} alt="" width={80} height={80} style={{ display: 'block' }} />
          <div
            style={{
              fontSize: 30,
              letterSpacing: 8,
              textTransform: 'uppercase',
              color: CREAM,
              fontFamily: 'sans-serif',
              fontWeight: 400,
            }}
          >
            NOVAIRA
          </div>
        </div>

        {/* ── Headline ────────────────────────────────────────────── */}
        <div
          style={{
            marginTop: 'auto',
            fontSize: 68,
            lineHeight: 1.12,
            fontWeight: 300,
            letterSpacing: '-0.02em',
            maxWidth: 960,
          }}
        >
          Menstrual hygiene disposal, made to belong in any space.
        </div>

        {/* ── Rule + credentials ─────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 36,
            gap: 20,
          }}
        >
          <div
            style={{
              height: 1,
              width: 72,
              background: `linear-gradient(90deg, transparent, ${GOLD_LIGHT})`,
            }}
          />
          <div
            style={{
              fontSize: 20,
              color: 'rgba(243, 235, 216, 0.72)',
              fontFamily: 'sans-serif',
              letterSpacing: '0.08em',
            }}
          >
            CE certified · ISO 9001:2015 · Medical-grade · Q3 2026
          </div>
        </div>

        {/* ── Footer domain ──────────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            marginTop: 24,
            fontSize: 16,
            color: `${GOLD}`,
            fontFamily: 'sans-serif',
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
            opacity: 0.6,
          }}
        >
          novairaworld.com
        </div>
      </div>
    ),
    size
  )
}
