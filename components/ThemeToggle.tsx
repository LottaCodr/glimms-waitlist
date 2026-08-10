'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('glimms-theme') as Theme | null;
    const preferredTheme: Theme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    const nextTheme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : preferredTheme;
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    window.localStorage.setItem('glimms-theme', nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 bg-gold/5 text-gold transition-all hover:border-gold/60 hover:bg-gold/15 focus:outline-none focus:ring-2 focus:ring-gold/60 focus:ring-offset-2 focus:ring-offset-ink"
    >
      <span className="text-base leading-none" aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
    </button>
  );
}
