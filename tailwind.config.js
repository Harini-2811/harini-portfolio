/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#07040E', // page background: near-black with a purple tint
          900: '#120B22', // cards
          800: '#1B1132',
          700: '#2A1A4A',
          600: '#3B2763',
        },
        accent: {
          primary: '#A855F7', // purple
          secondary: '#C084FC', // light purple
          tertiary: '#E879F9', // orchid / fuchsia, used sparingly
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Poppins', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        'ping-soft': {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '80%, 100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        shine: {
          '0%': { transform: 'translateX(-120%) skewX(-20deg)' },
          '100%': { transform: 'translateX(220%) skewX(-20deg)' },
        },
        caret: { '0%, 49%': { opacity: '1' }, '50%, 100%': { opacity: '0' } },
        spin: { to: { transform: 'rotate(360deg)' } },
        'spin-rev': { to: { transform: 'rotate(-360deg)' } },
      },
      animation: {
        'ping-soft': 'ping-soft 1.8s cubic-bezier(0,0,0.2,1) infinite',
        caret: 'caret 1s step-end infinite',
        orbit: 'spin 28s linear infinite',
        'orbit-rev': 'spin-rev 28s linear infinite',
        ring: 'spin 14s linear infinite',
      },
    },
  },
  plugins: [],
};
