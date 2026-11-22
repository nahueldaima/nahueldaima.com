/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    fontSize: {
      'sm': '0.8rem',
      'base': '1rem',
      'lg': '1.10rem',
      'xl': '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
      '6xl': [
        '3.815rem',
        {
          lineHeight: '4.5rem',
        },
      ],
      '7xl': '4.768rem',
    },
    extend: {
      fontFamily: {
        heading: ['var(--font-oswald)', 'Oswald', 'sans'],
        content: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      keyframes: {
        'page-in': {
          from: { opacity: '0', filter: 'blur(1rem)' },
          to: { opacity: '1', filter: 'blur(0)' },
        },
      },
      animation: {
        'page-in': 'page-in 0.4s ease',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
