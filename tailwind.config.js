/**
 * Brand colors match production (novairaworld.com): charcoal base, warm paper type,
 * dusty-rose accent. Tailwind keys stay `gold` / `gold-light` for stable class names.
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#1a1a1a',
          muted: '#242424',
        },
        cream: {
          DEFAULT: '#f5f1ed',
          muted: 'rgba(245, 241, 237, 0.82)',
        },
        gold: {
          DEFAULT: '#d4a5a5',
          light: '#e8c7c7',
        },
        'silver-cream': '#faf9f7',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-jost)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-sm': ['2.25rem', { lineHeight: '1.12' }],
        'display-md': ['2.75rem', { lineHeight: '1.08' }],
        'display-lg': ['3.5rem', { lineHeight: '1.05' }],
        'display-xl': ['4.25rem', { lineHeight: '1.02' }],
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
