/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        roboto : ["RaleWay", 'sans-serif']
      },
      colors : {
        blog_blue : '#7c4ee4',
        blog_black : '#333333',
      }
    },
  },
  plugins: [],
}

