import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f2f8ff',
          100: '#e6f1ff',
          200: '#cde3ff',
          300: '#9cc7ff',
          400: '#66a8ff',
          500: '#2e86ff',
          600: '#1e6be6',
          700: '#1753b4',
          800: '#143f88',
          900: '#0f2c5e',
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        medical: {
          primary: '#2e86ff',
          'primary-content': '#ffffff',
          secondary: '#0ea5e9',
          accent: '#22c55e',
          neutral: '#1f2937',
          'base-100': '#ffffff',
          info: '#38bdf8',
          success: '#22c55e',
          warning: '#f59e0b',
          error: '#ef4444',
        },
      },
      'light',
    ],
  },
}