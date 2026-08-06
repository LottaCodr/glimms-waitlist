'use client';
import { useState, useEffect } from 'react';

export function LiveCounter() {
  const base = parseInt(process.env.NEXT_PUBLIC_BASE_COUNT ?? '2847', 10);
  const [count, setCount] = useState<number>(base);

  useEffect(() => {
    let cancelled = false;
    // Fetch live count at runtime, not at build time — avoids Netlify build fetching external URL
    fetch('/api/stats', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data && typeof data.count === 'number') setCount(data.count);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [base]);

  return (
    <div className="flex items-center gap-5">
      <div>
        <p className="font-display text-4xl text-cream tracking-tight">
          {count.toLocaleString('en-US')}
        </p>
        <p className="font-sans text-xs text-muted mt-0.5">
          <span className="text-cream">people</span> on the waitlist
        </p>
      </div>
      <div className="flex -space-x-2.5">
        {['A', 'O', 'F', '+'].map((l, i) => (
          <div
            key={i}
            className="w-8 h-8 rounded-full bg-ink3 border-2 border-ink
                       flex items-center justify-center text-xs font-medium text-warm"
          >
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}
