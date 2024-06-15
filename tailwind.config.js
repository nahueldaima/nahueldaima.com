module.exports = {
  darkMode: 'class',
  content: [],
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
      '6xl': ['3.815rem', {
        lineHeight: '4.5rem',
      }],
      '7xl': '4.768rem',
    },
    extend: {
      fontFamily: {
        heading: ['Oswald', 'sans'],
        content: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
