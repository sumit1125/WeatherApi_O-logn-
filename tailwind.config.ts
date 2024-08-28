// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'google-gray': '#f1f3f4',
        'google-blue': '#1a73e8',
        'google-yellow': '#fbbc05',
      },
      fontFamily: {
        'sans': ['Roboto', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        '4xl': '1200px',  // Extend the max width to make the search bar longer
      },
    },
  },
  plugins: [],
}
