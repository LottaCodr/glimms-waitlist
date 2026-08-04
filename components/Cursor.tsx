'use client';
import { useEffect, useRef } from 'react';

export function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    let mx = 0, my = 0, rx = 0, ry = 0, raf: number;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener('mousemove', onMove);
    const tick = () => {
      rx += (mx - rx) * 0.13; ry += (my - ry) * 0.13;
      if (dotRef.current)  { dotRef.current.style.left  = `${mx}px`; dotRef.current.style.top  = `${my}px`; }
      if (ringRef.current) { ringRef.current.style.left = `${rx}px`; ringRef.current.style.top = `${ry}px`; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="pointer-events-none fixed z-[9999] w-2.5 h-2.5 rounded-full bg-gold -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block" />
      <div ref={ringRef} className="pointer-events-none fixed z-[9998] w-9 h-9 rounded-full border border-gold/30 -translate-x-1/2 -translate-y-1/2 hidden md:block" />
    </>
  );
}
