'use client';

import Script from 'next/script';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    turnstile?: { render: (element: HTMLElement, options: Record<string, unknown>) => string };
  }
}

export function Turnstile({ onVerify }: { onVerify: (token: string) => void }) {
  const container = useRef<HTMLDivElement>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey || !container.current || !window.turnstile || container.current.childElementCount) return;
    window.turnstile.render(container.current, {
      sitekey: siteKey,
      theme: 'auto',
      callback: onVerify,
      'expired-callback': () => onVerify(''),
      'error-callback': () => onVerify(''),
    });
  }, [siteKey, onVerify]);

  if (!siteKey) return null;
  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onLoad={() => {
        if (container.current && window.turnstile && !container.current.childElementCount) {
          window.turnstile.render(container.current, { sitekey: siteKey, theme: 'auto', callback: onVerify });
        }
      }} />
      <div ref={container} className="pt-1" />
    </>
  );
}
