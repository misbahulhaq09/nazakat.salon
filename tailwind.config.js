/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'jet-black': '#000000',
        'luxe-black': '#080808',
        'luxe-card': '#101010',
        'luxe-card-hover': '#161616',
        'nude-beige': '#D4B59F',
        'nude-light': '#F4EAE2',
        'nude-dark': '#A37E65',
        'signature-pink': '#FF3B8D',
        'signature-pink-light': '#FF65A5',
        'signature-pink-dark': '#D61A6E',
        'pure-white': '#FFFFFF',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', '"Playfair Display"', 'serif'],
      },
      letterSpacing: {
        'luxury': '0.25em',
        'ultra': '0.35em',
      },
      boxShadow: {
        'luxe': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
        'luxe-glow': '0 0 35px -5px rgba(255, 59, 141, 0.15)',
        'beige-glow': '0 0 35px -5px rgba(212, 181, 159, 0.12)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
