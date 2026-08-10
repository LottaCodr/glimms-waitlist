import type { Metadata } from 'next';
import { DM_Sans, DM_Mono, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { Cursor } from '@/components/Cursor';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'], weight: ['300','400','500','600'],
  style: ['normal','italic'], variable: '--font-cormorant', display: 'swap',
});
const dmSans = DM_Sans({
  subsets: ['latin'], weight: ['300','400','500'],
  variable: '--font-dm-sans', display: 'swap',
});
const dmMono = DM_Mono({
  subsets: ['latin'], weight: ['300','400','500'],
  variable: '--font-dm-mono', display: 'swap',
});

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
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable} dark`} suppressHydrationWarning>
      <head>
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
