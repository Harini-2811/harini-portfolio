/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Black + deep navy. Flat colours only: no gradients anywhere.
        ink: {
          950: '#04060B', // page background: true black with a hint of navy
          900: '#0A1222', // cards / surfaces: deep navy
          800: '#0F1A30', // raised surfaces, inputs, menus
          700: '#16243F', // hairlines on navy
          600: '#22355A', // strong borders, inactive bars
        },
        accent: {
          primary: '#7FA6F0', // steel blue: links, buttons, active states
          secondary: '#A9C3F2', // pale blue: secondary labels (readable on navy)
          tertiary: '#6E93DA', // muted blue: rare tertiary marks
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
