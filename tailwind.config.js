/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // A modern, developer-friendly color palette
        'primary': '#0D1117',   // Dark background (like GitHub)
        'secondary': '#161B22', // Lighter panel background
        'border': '#30363D',   // Borders and dividers
        'accent': '#58A6FF',   // Main accent color for buttons and highlights (blue)
        'accent-hover': '#80B9F7',
        'text-primary': '#C9D1D9', // Primary text
        'text-secondary': '#8B949E', // Secondary, muted text
        'success': '#3FB950', // For success messages
        'error': '#F85149',   // For error messages
      },
      fontFamily: {
        // A clean, modern font stack
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};