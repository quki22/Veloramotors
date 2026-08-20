/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        velora: {
          black: "#0f0f0f",
          graphite: "#171717",
          silver: "#b8bdc4",
          blue: "#8fc7ff",
        },
      },

      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
      },
    },
  },

  plugins: [],
};