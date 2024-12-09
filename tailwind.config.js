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
      },
      screens : {
        xxsm : '1px',
        xsm : '500px',
        xmd : '850px',
        xlg : '1150px',
        xl : '1250px'
      }
    },
  },
  plugins: [],
}

