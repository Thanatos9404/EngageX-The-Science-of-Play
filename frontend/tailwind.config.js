/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#06f9f9",
        "background-light": "#f5f8f8",
        "background-dark": "#0f2323",
        "accent-green": "#39FF14",
      },
      fontFamily: {
        "display": ["Space Grotesk", "sans-serif"]
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(6, 249, 249, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 249, 249, 0.05) 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}
