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
        charcoal: {
          950: '#060607',
          900: '#0b0b0e',
          850: '#111116',
          800: '#17171e',
          700: '#22222b',
          600: '#32323f',
        },
        gold: {
          300: '#e5c99e',
          400: '#d8bfa0',
          500: '#c5a880', // Signature Metallic Champagne Gold
          600: '#a88960',
          700: '#8a6e48',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Montserrat', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        widest: '0.2em',
        ultra: '0.3em',
      },
      boxShadow: {
        'cinematic': '0 25px 60px -15px rgba(0, 0, 0, 0.9)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'gold-glow': '0 0 25px rgba(197, 168, 128, 0.25)',
      }
    },
  },
  plugins: [],
}
