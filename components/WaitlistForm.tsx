'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  referredBy?: string;
  size?: 'default' | 'large';
}

export function WaitlistForm({ referredBy, size = 'default' }: Props) {
  const router  = useRouter();
  const [email,   setEmail]   = useState('');
  const [name,    setName]    = useState('');
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const isLarge = size === 'large';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError('');

    try {
      const res  = await fetch('/api/waitlist', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          name:  name.trim() || undefined,
          referredBy,
          source: referredBy ? 'referral' : 'direct',
        }),
      });

      const data = await res.json();

      if (res.status === 409 && data.referralCode) {
        // Already registered — send them to their dashboard
        router.push(`/confirmed/${data.referralCode}`);
        return;
      }

      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.');
        return;
      }

      // Success — redirect to confirmed page
      router.push(`/confirmed/${data.referralCode}`);

    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-3">
      {/* Name input (optional) */}
      <input
        type="text"
        placeholder="First name (optional)"
        value={name}
        onChange={e => setName(e.target.value)}
        className={`w-full bg-white/[0.03] border border-white/10 rounded
                    text-cream placeholder:text-muted font-sans font-light
                    focus:outline-none focus:border-gold/50 transition-colors
                    ${isLarge ? 'px-5 py-4 text-base' : 'px-4 py-3 text-sm'}`}
      />

      {/* Email + submit row */}
      <div className="flex border border-white/10 rounded overflow-hidden
                      focus-within:border-gold/50 transition-colors bg-white/[0.03]">
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={`flex-1 min-w-0 bg-transparent text-cream placeholder:text-muted
                      font-sans font-light focus:outline-none
                      ${isLarge ? 'px-5 py-4 text-base' : 'px-4 py-3 text-sm'}`}
        />
        <button
          type="submit"
          disabled={loading}
          className={`shrink-0 bg-gold hover:bg-gold3 text-ink font-mono font-medium
                      tracking-[0.15em] uppercase transition-colors disabled:opacity-60
                      ${isLarge ? 'px-7 py-4 text-sm' : 'px-5 py-3 text-[11px]'}`}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Spinner /> Joining…
            </span>
          ) : (
            'Join Waitlist'
          )}
        </button>
      </div>

      {error && (
        <p className="text-red-400 font-sans text-sm">{error}</p>
      )}

      <p className="font-mono text-[10px] text-muted tracking-wider">
        No spam. Unsubscribe anytime. Early access when we launch.
      </p>
    </form>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  );
}
