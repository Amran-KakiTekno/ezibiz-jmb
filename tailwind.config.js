/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        canvas: '#000000',
        'surface-1': '#09090b',
        'surface-2': '#121215',
        'surface-hover': '#18181b',
        jmb: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        }
      },
      boxShadow: {
        rim: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.06)',
        'rim-subtle': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.03)',
        'card-elevated': '0 12px 32px -4px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
      }
    },
  },
  plugins: [],
}
