/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#01001f',
        'c-orange': '#fb7900',
        'c-blue': '#406aad',
        'c-grey': '#969996',
      },
    },
  },
  plugins: [],
};
