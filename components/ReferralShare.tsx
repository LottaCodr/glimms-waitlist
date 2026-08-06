'use client';
import { useState } from 'react';
import { getAppUrl } from '@/lib/utils';

interface Props {
  referralCode: string;
  position: number;
  referralCount: number;
}

export function ReferralShare({ referralCode, position, referralCount }: Props) {
  const [copied, setCopied] = useState(false);
  // NEXT_PUBLIC_APP_URL is intentionally public — safe for client bundle
  const appUrl = getAppUrl();
  const referralUrl = `${appUrl}/r/${referralCode}`;
  const shareText = `I just joined the Glimms waitlist — AI that styles what you already own. No more buying, just smarter styling. Join me:`;

  async function copy() {
    await navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  function shareTwitter() {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(referralUrl)}`,
      '_blank',
    );
  }

  function shareWhatsApp() {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${shareText} ${referralUrl}`)}`,
      '_blank',
    );
  }

  function shareNative() {
    if (navigator.share) {
      navigator.share({ title: 'Glimms — Style AI', text: shareText, url: referralUrl });
    }
  }

  return (
    <div className="w-full max-w-lg space-y-5">
      {/* Referral stat */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-ink4 border border-white/[0.06] rounded p-4">
          <p className="font-display text-3xl text-cream">{position}</p>
          <p className="font-sans text-xs text-muted mt-1">Your position</p>
          <p className="font-mono text-[10px] text-gold mt-0.5">
            {referralCount > 0 ? `↑ moved up ${referralCount * 10} spots` : 'Share to move up'}
          </p>
        </div>
        <div className="bg-ink4 border border-white/[0.06] rounded p-4">
          <p className="font-display text-3xl text-cream">{referralCount}</p>
          <p className="font-sans text-xs text-muted mt-1">Friends referred</p>
          <p className="font-mono text-[10px] text-gold/60 mt-0.5">+10 spots each</p>
        </div>
      </div>

      {/* Referral URL copy */}
      <div>
        <p className="font-mono text-[10px] text-gold tracking-[0.18em] uppercase mb-2">
          Your unique link
        </p>
        <div className="flex border border-white/10 rounded overflow-hidden bg-white/[0.02]">
          <p className="flex-1 min-w-0 px-4 py-3 font-mono text-xs text-muted truncate">
            {referralUrl}
          </p>
          <button
            onClick={copy}
            className="shrink-0 px-5 py-3 bg-gold/10 hover:bg-gold/20 text-gold
                       font-mono text-[11px] tracking-widest uppercase transition-colors border-l border-white/10"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Share buttons */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={shareTwitter}
          className="flex items-center justify-center gap-2 py-3 rounded
                     bg-ink4 border border-white/[0.06] hover:border-gold/30
                     font-sans text-sm text-warm transition-all hover:bg-ink3"
        >
          <TwitterIcon /> Twitter
        </button>
        <button
          onClick={shareWhatsApp}
          className="flex items-center justify-center gap-2 py-3 rounded
                     bg-ink4 border border-white/[0.06] hover:border-gold/30
                     font-sans text-sm text-warm transition-all hover:bg-ink3"
        >
          <WhatsAppIcon /> WhatsApp
        </button>
        <button
          onClick={shareNative}
          className="flex items-center justify-center gap-2 py-3 rounded
                     bg-ink4 border border-white/[0.06] hover:border-gold/30
                     font-sans text-sm text-warm transition-all hover:bg-ink3"
        >
          <ShareIcon /> Share
        </button>
      </div>

      <p className="font-sans text-xs text-muted text-center">
        Every friend who joins using your link moves you{' '}
        <span className="text-gold">10 spots higher</span> on the waitlist.
      </p>
    </div>
  );
}

function TwitterIcon() {
  return (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.12 1.521 5.854L0 24l6.336-1.49A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.005-1.371l-.36-.213-3.726.876.936-3.624-.234-.373A9.785 9.785 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg className="w-4 h-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
    </svg>
  );
}
