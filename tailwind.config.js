/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        table: {
          green: '#126c29',
          blue: '#105493',
          purple: '#493c75'
        }
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
