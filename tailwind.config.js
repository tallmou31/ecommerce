/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/main/webapp/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'c-green': '#a0c4b6',
        'c-dark-green': '#00807f',
        tercary: '#6a6969',
      },
    },
  },
  plugins: [],
};
