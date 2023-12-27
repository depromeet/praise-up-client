const defaultTheme = require("tailwindcss/defaultTheme");
const rem2px = require("./src/utils/tailwindcss/rem2px.cjs");
const addUnit = require("./src/utils/tailwindcss/add-unit.cjs");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    ...rem2px(defaultTheme),
    extend: {
      width: addUnit(),
      screens: {
        xs: "480px",
        "3xl": "1920px",
      },
      colors: {
        gray: {
          DEFAULT: "#262C36",
          50: "#FFFFFF",
          100: "#F6F7F9",
          200: "#EFF1F4",
          300: "#E0E2E6",
          400: "#D3D6DA",
          500: "#A1A9B3",
          600: "#838B98",
          700: "#667080",
          800: "#333E4C",
          900: "#262C36",
        },
        red: {
          300: "FFB0B9",
          400: "#FD6A7E",
          500: "#EE324B",
        },
        blue: {
          300: "#C7EAFF",
          400: "#A5DDFF",
          500: "#0094FF",
        },
        yellow: {
          300: "#FFF3C8",
          400: "#FFEAA0",
          500: "#F5C547",
        },
      },
      borderRadius: {
        1: "0px",
        2: "4px",
        3: "8px",
        4: "12px",
      },
    },
  },
  plugins: [],
};
