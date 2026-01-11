/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        calm: "#A7C7E7",
        happy: "#FFD966",
        sad: "#AEC6CF",
        energetic: "#FF6961",
      },
    },
  },
  plugins: [],
}