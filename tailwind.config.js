// /** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    enabled: true, // SWITCH THIS IF IN DEV
    content: ["./src/**/*.js"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        celeste: {
          blue: "#00A9E0",
          green: "#A4D65E",
          darkgray: "#53565A",
          lightgray: "#D0D0CE",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

