/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(0, 0, 0, 0.05)',
        'blue-glow': '0 10px 25px -5px rgba(37, 99, 235, 0.2)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // For professional article formatting
  ],
}