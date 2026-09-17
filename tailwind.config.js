/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#09090b',         // true Zinc 950 obsidian dark base
          surface: '#0d0d11',    // sidebar / panel surface
          card: '#131316',       // card container
          elevated: '#19191e',   // elevated interactive surface
          hover: '#222228',      // hover highlight
          border: '#27272a',     // Zinc 800 crisp border divider
          borderSubtle: '#1d1d21', // subtle border
          text: '#fafafa',       // crisp white primary text
          muted: '#a1a1aa',      // Zinc 400 clean muted text
          faint: '#71717a',      // Zinc 500 faint text
        },
        proof: {
          DEFAULT: '#10b981',    // sleek emerald proof highlight
          light: '#34d399',      // bright emerald
          dark: '#059669',       // deep emerald
          subtle: 'rgba(16, 185, 129, 0.12)',
        },
        accent: {
          DEFAULT: '#3b82f6',    // modern crisp blue
          hover: '#2563eb',
          muted: 'rgba(59, 130, 246, 0.12)',
          sky: '#38bdf8',
          indigo: '#6366f1',
          teal: '#14b8a6',
        },
        status: {
          emerald: '#10b981',
          teal: '#14b8a6',
          amber: '#f59e0b',
          rose: '#f43f5e',
          sky: '#38bdf8',
          purple: '#a855f7',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'Consolas', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.035em',
        tighter: '-0.02em',
        tight: '-0.01em',
      },
    },
  },
  plugins: [],
}
