/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dharmic: {
          red: '#901C25',
          redHover: '#73161d',
          gold: '#E48A2D',
          goldHover: '#c9751e',
          dark: '#1c1917',
          light: '#fbf9f5',
          cream: '#fffdfa',
          muted: '#6b7280'
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Georgia', 'serif'],
        sans: ['Inter', 'Outfit', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
