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
        ink:   'rgb(var(--ink) / <alpha-value>)',
        ink2:  'rgb(var(--ink-2) / <alpha-value>)',
        ink3:  'rgb(var(--ink-3) / <alpha-value>)',
        ink4:  'rgb(var(--ink-4) / <alpha-value>)',
        faint: 'rgb(var(--faint) / <alpha-value>)',
        gold:  'rgb(var(--gold) / <alpha-value>)',
        gold2: 'rgb(var(--gold-2) / <alpha-value>)',
        gold3: 'rgb(var(--gold-3) / <alpha-value>)',
        cream: 'rgb(var(--cream) / <alpha-value>)',
        warm:  'rgb(var(--warm) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
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
