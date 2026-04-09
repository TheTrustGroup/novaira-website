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
          DEFAULT: '#080509',
          muted: '#121014',
        },
        cream: {
          DEFAULT: '#F4ECD9',
          muted: 'rgba(244, 236, 217, 0.82)',
        },
        gold: {
          DEFAULT: '#C4956A',
          light: '#E8C99A',
        },
        'silver-cream': '#F5F0EC',
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
