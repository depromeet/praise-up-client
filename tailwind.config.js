/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        "3xl": "1920px",
      },
      width: {
        /* Image */
        ixs: "152px",
        ism: "200px",
        imd: "240px",
        ilg: "284px",
      },
      height: {
        /* Image */
        ixs: "152px",
        ism: "200px",
        imd: "72px",
        ilg: "284px",
      },
      colors: {
        "blue-gray": {
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
        sm: "8px",
        md: "12px",
        lg: "16px",
      },
      fontSize: {
        hd1: "32px", // heading
        hd2: "20px",
        hd3: "18px",
        bd1: "16px", // body
        bd2: "14px",
        cap: "12px", // caption
      },
      lineHeight: {
        hd1: "38px", // heading
        hd2: "26px",
        hd3: "24px",
        bd1: "22px",
        "bd1-l": "24px", // body1 long
        bd2: "20px",
        "bd2-l": "22px", // body2 long
        cap: "18px",
        "cap-l": "20px", // caption long
      },
    },
  },
  plugins: [],
};
