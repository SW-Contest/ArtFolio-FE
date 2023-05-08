/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "af-darkGray": "#131313",
        "af-hotPink": "#FF008A",
      },
      fontFamily: {
        Pretendard: ["Pretendard", "sans"],
      },
    },
  },
  plugins: [],
};
