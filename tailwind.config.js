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
      height: addUnit(),
      padding: addUnit(100, 1),
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
        primary: "#242B37",
        secondary: "#333E4C",
        teritary: "#667080",
        disabled: "#A1A9B3",
        oncolor: "#FFFFFF",
        negative: "#EE324B",
        active: "#338AFF",
      },
      borderRadius: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
