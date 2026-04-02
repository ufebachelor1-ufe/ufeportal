/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0132a6',
        secondary: '#0000ff',
        third : "gold",
      },
      fontFamily: {
        sans: [
          'Montserrat',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif'
        ],
      },
    },
  },
  plugins: [],
}