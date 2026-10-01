import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Agenient palette — "Navy & Gold" (matches the AAMS app login page)
        primary: {
          DEFAULT: '#0d2137', // Navy card — primary surfaces, buttons
          dark: '#001F33',    // Deepest navy — page background / hover
          light: '#1a3a52',   // Navy border / raised surface
        },
        accent: {
          DEFAULT: '#D4AF37', // Gold — CTAs and highlights (navy text on it)
          dark: '#C29D2B',    // Gold hover (darker)
          light: '#E5C158',   // Gold hover (lighter, as on the login page)
        },
        neutral: {
          DEFAULT: '#001F33', // Navy — primary text on light surfaces
          light: '#4A6478',   // Slate-blue (darkened) — secondary text on light inner pages
          lighter: '#F3F5F8', // Pale slate — light section background on inner pages
        },
        gold: {
          DEFAULT: '#D4AF37', // Login-page gold — on navy only
          light: '#E5C158',
          ink: '#856515',     // Dark gold for TEXT on white/pale surfaces (>=4.6:1, WCAG AA)
        },
        ivory: '#F2EAD9', // Warm ivory — all former white TEXT (Patrick 2026-10-01). Not for backgrounds.
        navy: {
          950: '#001F33',
          900: '#0a1a2e',
          850: '#0d2137',
          800: '#003B5C',
          700: '#1a3a52',
          600: '#2a4a62',
        },
        slateblue: {
          DEFAULT: '#8BA5B8',
          soft: '#A9BFCF',
          dim: '#6a9ab8',
          mute: '#5a7a94',
        },
        aqua: {
          deep: '#0E7490',
          bright: '#22d3ee',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Alata', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config
