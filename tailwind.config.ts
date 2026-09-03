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
        // Agenient brand colors — emerald "Agen" + violet "ient" (locked 2026-09-02)
        primary: {
          DEFAULT: '#6D28D9', // Agenient violet — primary brand surfaces, headings, buttons
          dark: '#5B21B6',    // Darker violet for hover states
          light: '#8B6BF0',   // Lighter violet (dark-bg tint)
        },
        accent: {
          DEFAULT: '#10B981', // Agenient emerald — highlights, CTAs, checkmarks
          dark: '#059669',    // Darker emerald for hover
          light: '#34D399',   // Lighter emerald (dark-bg tint)
        },
        neutral: {
          DEFAULT: '#1f2937', // Dark text
          light: '#6b7280',   // Secondary text
          lighter: '#f9fafb', // Backgrounds
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
