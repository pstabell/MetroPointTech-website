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
        // Agenient palette — coordinated with the AAMS app interior (teal + violet accents)
        primary: {
          DEFAULT: '#7C3AED', // Violet-600 — primary surfaces, headings, buttons (app violet family)
          dark: '#6D28D9',    // Deeper violet for hover states
          light: '#8B5CF6',   // App violet-500 tint
        },
        accent: {
          DEFAULT: '#14B8A6', // Teal-500 — highlights, CTAs (matches the app's primary accent)
          dark: '#0D9488',    // Teal-600 for hover
          light: '#2DD4BF',   // Teal-400 tint
        },
        neutral: {
          DEFAULT: '#0f172a', // slate-900 — primary text (matches app light mode)
          light: '#475569',   // slate-600 — secondary text
          lighter: '#f8fafc', // slate-50 — section backgrounds
        }
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
