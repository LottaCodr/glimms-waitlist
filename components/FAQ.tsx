'use client';
import { useState } from 'react';

const FAQS = [
  {
    q: 'When does Glimms launch?',
    a: 'We are targeting a public beta in Q4 2025. Waitlist members get access first — the earlier you join, the sooner you get in.',
  },
  {
    q: 'Is it free?',
    a: 'Yes. Glimms has a free tier with 10 scans per day covering your wardrobe. Premium ($9.99/mo) unlocks unlimited scans, all three verticals, and climate & cultural intelligence. Pro ($49.99/mo) adds client management and export tools for professionals.',
  },
  {
    q: 'Which phones does it work on?',
    a: 'iOS 15+ and Android 10+. We are building in React Native so both platforms launch simultaneously.',
  },
  {
    q: 'Is my wardrobe data private?',
    a: 'Yes. Your images are processed and deleted from our servers within 30 days. Your data never trains third-party models. We are GDPR and NDPR compliant.',
  },
  {
    q: 'How does the referral system work?',
    a: 'Every person on the waitlist gets a unique referral link. Each friend who signs up using your link moves you 10 spots higher. Share with 5 friends and you jump 50 positions.',
  },
  {
    q: 'Does it work for African fashion and cultural contexts?',
    a: 'Yes — this is one of our core differentiators. Glimms supports 10 cultural regions at launch including West Africa, East Africa, South Asia, and Middle East, with modesty preferences, regional colour palettes, and occasion norms built in.',
  },
  {
    q: 'Can I use it as a professional stylist or designer?',
    a: 'Absolutely. The Pro tier includes a client profile manager, lookbook PDF export, and commercial usage rights. Fashion stylists, interior designers, and landscape architects are a key target segment.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 md:px-20 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-px bg-gold" />
        <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-gold">
          FAQ
        </span>
      </div>
      <h2 className="font-display text-4xl md:text-5xl font-light text-cream mb-12">
        Questions, <em className="text-gold italic">answered.</em>
      </h2>

      <div className="space-y-px">
        {FAQS.map((faq, i) => (
          <div
            key={i}
            className="border border-white/[0.07] rounded overflow-hidden"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-6 py-5 text-left
                         hover:bg-white/[0.02] transition-colors"
            >
              <span className="font-sans text-sm font-medium text-cream pr-8">
                {faq.q}
              </span>
              <span
                className={`text-gold text-lg shrink-0 transition-transform duration-200
                            ${open === i ? 'rotate-45' : ''}`}
              >
                +
              </span>
            </button>

            {open === i && (
              <div className="px-6 pb-6 border-t border-white/[0.05]">
                <p className="font-sans text-sm text-muted leading-relaxed pt-4">
                  {faq.a}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
