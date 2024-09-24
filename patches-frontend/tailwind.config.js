/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        greenPalette: "#3d5460",
        lightPinkPalette: "f5efee",
        pinkPalette: "#d7b7b7",
      },
      fontFamily: {
        Satisfy: ["Satisfy", "sans-serif"],
      },
    },
  },
  plugins: [],
};
