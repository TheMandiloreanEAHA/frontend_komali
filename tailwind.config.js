/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'uv-blue':'#18529D',
        'uv-green':'#28AD56'
      }
    },
  },
  plugins: [],
}