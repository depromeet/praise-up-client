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
        secondary: {
          blue: "#BBE5FF",
          yellow: "#FFF6D5",
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
