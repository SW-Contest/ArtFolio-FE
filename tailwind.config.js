/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "af-darkGray": "#131313",
        "af-hotPink": "#FF008A",
        "af-lightGray": "#E6E6E6",
        "af-brightGray": "#F5F5F5",
      },
      fontFamily: {
        Pretendard: ["Pretendard", "sans"],
      },
    },
  },
  plugins: [],
};
