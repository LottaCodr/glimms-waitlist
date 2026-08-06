import type { Metadata } from 'next';
import './globals.css';
import { Cursor } from '@/components/Cursor';

// Avoid `next/font/google` build-time fetch (fails in offline CI / Netlify without network)
// We keep the CSS variable names so Tailwind's fontFamily (var(--font-cormorant) etc) still works,
// falling back to system fonts. Fonts are loaded at runtime via <link> below.
const cormorant = { variable: '--font-cormorant' } as const;
const dmSans = { variable: '--font-dm-sans' } as const;
const dmMono = { variable: '--font-dm-mono' } as const;

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://glimms.ai';

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: 'Glimms — AI that styles what you already own',
  description: 'Glimms uses computer vision and AI to generate outfit, room, and garden combinations from what you already own. No shopping required.',
  openGraph: {
    type: 'website', url: APP_URL,
    title: 'Glimms — AI that styles what you already own',
    description: 'The AI stylist that works with what you already have. Wardrobe, room, garden.',
    siteName: 'Glimms',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Glimms' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Glimms — AI that styles what you already own',
    description: 'The AI stylist that works with what you already have.',
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <head>
        {/* Runtime Google Fonts — avoids build-time fetch, still loads fonts for users */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <script defer data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
                  src="https://plausible.io/js/script.js" />
        )}
      </head>
      <body className="noise">
        <Cursor />
        {children}
      </body>
    </html>
  );
}
