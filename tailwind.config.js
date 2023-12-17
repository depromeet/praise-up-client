/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        "3xl": "1920px",
      },
      colors: {
        primary: {
          100: "#F9F9FA",
          200: "#F2F3F4",
          300: "#E8E9EA",
          400: "#CBCDCF",
          500: "#A4A6AA",
          600: "#75777B",
          700: "#33353C",
          800: "#212121",
        },
      },
      borderRadius: {
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
      },
    },
  },
  plugins: [],
};
