'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between
                  px-6 md:px-12 py-6 transition-all duration-300
                  ${scrolled ? 'bg-ink/95 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}
    >
      <Link href="/" className="font-display text-xl tracking-widest text-cream">
        Glimm<span className="text-gold">s</span>
      </Link>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <a
          href="#waitlist"
          className="font-mono text-[10px] tracking-[0.18em] uppercase text-gold
                     border border-gold/30 px-4 py-2 rounded-full
                     bg-gold/5 hover:bg-gold/15 hover:border-gold/60
                     transition-all duration-200"
        >
          Join Waitlist
        </a>
      </div>
    </nav>
  );
}
