import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './emails/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink:   '#0A0806',
        ink2:  '#111111',
        ink3:  '#1C1814',
        ink4:  '#252018',
        faint: '#2A251F',
        gold:  '#C9A96E',
        gold2: '#8A7148',
        gold3: '#E8D5A8',
        cream: '#F5F0E8',
        warm:  '#D4C4A8',
        muted: '#7A6E64',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-dm-mono)', 'Courier New', 'monospace'],
      },
      animation: {
        'fade-up':   'fadeUp 0.7s ease both',
        'pulse-dot': 'pulseDot 2.4s ease infinite',
        'float':     'float 6s ease-in-out infinite',
        marquee:     'marquee 30s linear infinite',
      },
      keyframes: {
        fadeUp:   { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        pulseDot: { '0%,100%': { opacity: '1', transform: 'scale(1)' }, '50%': { opacity: '.4', transform: 'scale(.7)' } },
        float:    { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        marquee:  { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
      },
    },
  },
  plugins: [],
};
export default config;
