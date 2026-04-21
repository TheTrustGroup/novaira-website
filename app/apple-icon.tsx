import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

/**
 * The mark rendered as a standalone SVG string, inlined as a data URI
 * so Satori (the ImageResponse engine) can lay it out as an <img>. This
 * is the most reliable path for gradients + strokes in ImageResponse.
 */
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
  <path d="M 78.286,-62.220 A 100,100 0 1 0 78.286,62.220" stroke="url(#g)" stroke-width="13" fill="none" stroke-linecap="round"/>
  <path d="M 78.286,-62.220 A 80,80 0 1 1 78.286,62.220" stroke="url(#g)" stroke-width="9" fill="none" stroke-linecap="round" opacity="0.72"/>
  <circle cx="78.286" cy="-62.220" r="14" fill="#F2EEE8" opacity="0.95"/>
  <circle cx="78.286" cy="62.220" r="14" fill="#EDE4D4" opacity="0.88"/>
</svg>`

const markDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(MARK_SVG)}`

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // Deep-space radial, same vocabulary as the reveal page.
          background:
            'radial-gradient(ellipse 70% 60% at 50% 45%, #13100E 0%, #09070A 75%)',
          // iOS masks the corners automatically, but we pre-round so macOS
          // Launchpad / third-party launchers get a correct look too.
          borderRadius: 36,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={markDataUri}
          alt=""
          width={128}
          height={128}
          style={{ display: 'block' }}
        />
      </div>
    ),
    size
  )
}
