/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'ubuntu': ['ubuntu', 'sans-serif'],
      'courier': ['courier', 'ubuntu', 'sans-serif'],
      'roboto-mono': ['roboto-mono', 'ubuntu', 'sans-serif'],
      'pacifico': ['pacifico','ubuntu', 'sans-serif'],
      'cookie': ['cookie','ubuntu', 'sans-serif'],
      'josefin-sans': ['Josefin Sans', 'sans-serif'],
      'stalemate': "'Stalemate', cursive",
      'overpass': "'Overpass', sans-serif",
      'shadows-into-light': "'Shadows Into Light', cursive",
      'poppins': "'Poppins', sans-serif",
      'handlee' : "'handlee', sans-serif"

    },
    extend: {},
  },
  plugins: [],
}

