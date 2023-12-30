/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        BLUE_01: '#1972f5',

        BLACK_01: '#161b20',

        GRAY_01: '#5c6065',
        GRAY_02: '#ececee',

        RED_01: '#fe5d5c',
      },
    },
  },
  plugins: [],
};
