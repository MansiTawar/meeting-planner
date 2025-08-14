// Filename: tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark-blue': '#1a2c42',
        'brand-teal': '#00a79d',
        'brand-teal-darker': '#008b82',
        'brand-bg-light': '#f0f2f5',
      },
      fontFamily: {
        sans: ['"Segoe UI"', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}