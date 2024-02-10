/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    "./pages/**/*.{html,js}",
    "./index.html",
    "node_modules/preline/dist/*.js"
  ],
  theme: {
    extend: {
      keyframes: {
        'move-to-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        'move-from-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' }
        }
      },
      animation: {
        'slideout': 'move-to-left .24s ease-in-out forwards',
        'slidein': 'move-from-right .24s ease-out .2s forwards'
      }
    },
  },
  plugins: [
    require('preline/plugin')
  ],
}