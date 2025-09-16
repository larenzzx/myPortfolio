/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    fontFamily: {
      Inter: ['Poppins', 'serif'],
    },
    extend: {
      animation: {
        'blink': 'blink 0.7s infinite'
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [
    require('daisyui'), 
    require('tailwindcss-motion'),
    require('tailwindcss-intersect') 
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", 
    "synthwave", "retro", "cyberpunk", "valentine", "halloween", 
    "garden", "forest", "aqua", "lofi", "pastel", "fantasy", 
    "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", 
    "business", "acid", "lemonade", "night", "coffee", "winter"],
  },
}

