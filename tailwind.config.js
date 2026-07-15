/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Elegant stone palette — cool-warm balance
        cream:     '#F5F3F0',   // cooler, cleaner ivory
        'cream-2': '#EDEAE5',   // refined stone
        'cream-3': '#E4E0DA',   // subtle warm-grey
        brown:     '#2C2825',   // near-charcoal, very elegant
        'brown-2': '#6B6460',   // medium stone
        'brown-3': '#9A9390',   // muted stone
        border:    '#D8D3CE',   // cool-grey border
        'border-2': '#A8A09C',  // medium border
        accent:    '#C9A96E',   // refined gold (not yellow)
        'btn-bg':  '#DDD5CC',   // elegant stone button
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans:  ['Lato', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '8xl':  ['6rem',   { lineHeight: '1' }],
        '9xl':  ['8rem',   { lineHeight: '1' }],
        '10xl': ['10rem',  { lineHeight: '1' }],
      },
      animation: {
        'fade-up':    'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in':    'fadeIn 0.6s ease forwards',
        'loader-bar': 'loaderBar 1.4s cubic-bezier(0.16,1,0.3,1) forwards',
        marquee:      'marquee 30s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(28px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to:   { opacity: 1 },
        },
        loaderBar: {
          from: { width: '0%' },
          to:   { width: '100%' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16,1,0.3,1)',
      },
    },
  },
  plugins: [],
};
