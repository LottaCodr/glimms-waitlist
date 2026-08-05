'use client';
import { useState } from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface Props { params: { code: string } }

export default function UnsubscribePage({ params }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  async function handleUnsubscribe() {
    setStatus('loading');
    try {
      const res = await fetch('/api/unsubscribe', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ code: params.code }),
      });
      setStatus(res.ok ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      {/* Corner accents */}
      <div className="fixed top-0 left-0 w-10 h-px bg-gold" />
      <div className="fixed top-0 left-0 w-px h-10 bg-gold" />

      <Link href="/" className="font-display text-xl tracking-widest text-cream mb-16 block">
        Glimm<span className="text-gold">s</span>
      </Link>

      {status === 'done' ? (
        <>
          <div className="w-14 h-14 rounded-full border border-white/10 flex items-center
                          justify-center text-2xl mb-6">
            ✓
          </div>
          <h1 className="font-display text-4xl font-light text-cream mb-4">
            You&apos;ve been removed.
          </h1>
          <p className="font-sans text-sm text-muted max-w-xs mb-8">
            You won&apos;t receive any more emails from Glimms. We&apos;re sorry to see you go.
          </p>
          <Link href="/"
                className="font-mono text-[10px] tracking-[0.18em] uppercase text-gold
                           border border-gold/30 px-5 py-2.5 rounded-full hover:bg-gold/10
                           transition-colors">
            Back to home
          </Link>
        </>
      ) : (
        <>
          <h1 className="font-display text-4xl font-light text-cream mb-4">
            Unsubscribe
          </h1>
          <p className="font-sans text-sm text-muted max-w-sm mb-10">
            You&apos;ll be removed from all Glimms waitlist emails. You can always
            re-join at <span className="text-gold">glimms.ai</span>.
          </p>

          {status === 'error' && (
            <p className="text-red-400 text-sm mb-6">
              Something went wrong. Please try again.
            </p>
          )}

          <button
            onClick={handleUnsubscribe}
            disabled={status === 'loading'}
            className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink
                       bg-cream hover:bg-warm px-8 py-3 rounded transition-colors
                       disabled:opacity-50"
          >
            {status === 'loading' ? 'Removing…' : 'Yes, unsubscribe me'}
          </button>

          <Link href="/"
                className="mt-6 block font-mono text-[10px] tracking-widest uppercase
                           text-muted hover:text-cream transition-colors">
            Cancel — keep my spot
          </Link>
        </>
      )}
    </main>
  );
}
