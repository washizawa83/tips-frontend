/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'tips-gray': "#41434D",
        'tips-dark-gray': '#38373D',
        'tips-black': '#2D2C31',
        'tips-gray-text': '#F1F0FA'
      }
    },
  },
  plugins: [],
}

