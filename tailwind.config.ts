import type { Config } from 'tailwindcss'

export default {
  content: ['./src/app/(frontend)/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        tattoo: {
          black: '#141414',
          red: '#C0392B',
          light: '#E0E0E0',
          silver: '#9A9A9A',
          darker: '#0a0a0a',
        },
      },
      fontFamily: {
        heading: ['var(--font-oswald)', 'sans-serif'],
        body: ['var(--font-outfit)', 'sans-serif'],
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
    },
  },
  plugins: [],
} satisfies Config
