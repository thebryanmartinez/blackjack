/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#24242c',
        table: {
          green: '#126c29',
          blue: '#105493',
          purple: '#493c75'
        }
      }
    }
  },
  plugins: []
}
