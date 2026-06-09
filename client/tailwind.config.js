/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0a0a0a',
          card: '#141414',
          border: '#262626',
          text: '#ededed',
          muted: '#a1a1a1'
        },
        primary: {
          DEFAULT: '#3b82f6',
          hover: '#2563eb'
        }
      }
    },
  },
  plugins: [],
}
