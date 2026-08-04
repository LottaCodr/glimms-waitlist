import { Suspense } from 'react';
import { Nav }           from '@/components/Nav';
import { WaitlistForm }  from '@/components/WaitlistForm';
import { FAQ }           from '@/components/FAQ';
import { Footer }        from '@/components/Footer';
import { LiveCounter }   from '@/components/LiveCounter';

const WORDS   = ['WARDROBE', 'ROOM', 'GARDEN'];
const MARQUEE = ['Wardrobe', 'Interiors', 'Garden', 'Style Intelligence',
                 'AI-Powered', 'Zero Waste', 'Context-Aware', 'Cultural AI'];

export default function HomePage() {
  return (
    <>
      <Nav />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen grid md:grid-cols-2 overflow-hidden">
        {/* Gold corner accents */}
        <div className="absolute top-0 left-0 w-10 h-px  bg-gold z-10" />
        <div className="absolute top-0 left-0 w-px  h-10 bg-gold z-10" />
        <div className="absolute bottom-0 right-0 w-10 h-px  bg-gold/30 z-10" />
        <div className="absolute bottom-0 right-0 w-px  h-10 bg-gold/30 z-10" />

        {/* Radial glow */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] pointer-events-none
                        bg-gold/5 rounded-full blur-[120px]" />

        {/* Left — content */}
        <div className="flex flex-col justify-center px-6 md:px-20 pt-32 pb-20 relative z-10">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8 animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-dot" />
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-gold">
              Early Access — Limited Spots
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-light leading-[1.03]
                         tracking-tight text-cream mb-7 animate-fade-up"
              style={{ animationDelay: '0.1s' }}>
            Style what<br />
            you <em className="text-gold italic">already</em><br />
            own.
          </h1>

          <p className="font-sans font-light text-warm text-base md:text-lg leading-relaxed
                        max-w-md mb-12 animate-fade-up"
             style={{ animationDelay: '0.2s' }}>
            Glimms uses computer vision and AI to generate endless outfit, room,
            and garden combinations from what&apos;s already in your home.
            No shopping required.
          </p>

          <div className="animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <WaitlistForm />
          </div>

          {/* Live counter */}
          <div className="mt-10 animate-fade-up" style={{ animationDelay: '0.45s' }}>
            <Suspense fallback={<CounterSkeleton />}>
              <LiveCounter />
            </Suspense>
          </div>
        </div>

        {/* Right — decorative phone */}
        <div className="hidden md:flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.04] to-transparent" />
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b
                          from-transparent via-gold/20 to-transparent" />

          {/* Floating context pills */}
          <div className="absolute left-8 top-[22%] font-sans text-xs text-warm
                          bg-ink2 border border-white/10 rounded-full px-4 py-2
                          animate-float" style={{ animationDelay: '0s' }}>
            📍 Lagos, Nigeria <span className="text-gold">· Casual Friday</span>
          </div>
          <div className="absolute left-4 top-[40%] font-sans text-xs text-warm
                          bg-ink2 border border-white/10 rounded-full px-4 py-2
                          animate-float" style={{ animationDelay: '1.2s' }}>
            🌤 29°C <span className="text-gold">· Breathable fabrics</span>
          </div>
          <div className="absolute left-6 bottom-[28%] font-sans text-xs text-warm
                          bg-ink2 border border-white/10 rounded-full px-4 py-2
                          animate-float" style={{ animationDelay: '0.6s' }}>
            ✦ <span className="text-gold">98% match</span> · Smart-Casual
          </div>

          {/* Phone mockup */}
          <div className="w-56 animate-float" style={{ animationDelay: '0s' }}>
            <PhoneMockup />
          </div>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────────────────── */}
      <div className="border-y border-white/[0.06] py-3 overflow-hidden bg-white/[0.02]">
        <div className="flex animate-marquee w-max">
          {[...MARQUEE, ...MARQUEE].map((w, i) => (
            <div key={i} className="flex items-center gap-10 px-10">
              <span className="font-display italic text-sm text-muted whitespace-nowrap">
                {w}
              </span>
              <span className="w-1 h-1 rounded-full bg-gold/40" />
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-28 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-px bg-gold" />
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-gold">
            How it works
          </span>
        </div>
        <h2 className="font-display text-4xl md:text-6xl font-light text-cream mb-16">
          Three steps to <em className="text-gold italic">endless</em> possibilities.
        </h2>

        <div className="grid md:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06]">
          {[
            { n: '01', icon: '📸', title: 'Scan your items',
              body: 'Point your camera at clothes, furniture, or garden. Glimms uses computer vision to detect and catalogue everything automatically.' },
            { n: '02', icon: '🧠', title: 'AI builds context',
              body: 'Reads your location, climate, occasion, and cultural context to filter recommendations that actually make sense for your life.' },
            { n: '03', icon: '✦',  title: 'Get styled instantly',
              body: 'Receive 20+ curated combinations with explanations, styling tips, and visual mockups — all from items you already own.' },
          ].map((step, i) => (
            <div key={i}
                 className="bg-ink p-10 hover:bg-ink2 transition-colors
                            relative group overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r
                              from-transparent via-gold to-transparent opacity-0
                              group-hover:opacity-100 transition-opacity" />
              <p className="font-display text-7xl text-gold/10 leading-none mb-5">
                {step.n}
              </p>
              <span className="text-3xl block mb-4">{step.icon}</span>
              <h3 className="font-display text-2xl text-cream mb-3">{step.title}</h3>
              <p className="font-sans text-sm text-muted leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-20 bg-ink2 border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-end mb-16">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-px bg-gold" />
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-gold">Features</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-light text-cream">
                Built for <em className="text-gold italic">real</em> people.
              </h2>
            </div>
            <p className="font-sans text-sm text-muted leading-loose">
              Most style apps tell you to buy more. Glimms does the opposite — it reveals the{' '}
              <strong className="text-warm font-normal">hidden potential in what you already own.</strong>
              {' '}From a founder who built for the world from Lagos, Nigeria.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06]">
            {[
              { icon: '👔', title: 'Wardrobe',         body: 'Outfits from your actual clothes, filtered by occasion and weather.' },
              { icon: '🛋️', title: 'Room Design',      body: 'Furniture layouts and themes for your actual space.' },
              { icon: '🌿', title: 'Garden',            body: 'Plant combinations calibrated to your climate and soil.' },
              { icon: '🌍', title: 'Cultural AI',       body: '10 regions. Modesty rules. Regional palettes. Style that understands you.' },
              { icon: '⚡', title: 'Real-time',         body: 'WebSocket pipeline delivers your designs in seconds.' },
              { icon: '🔒', title: 'Private',           body: 'Images deleted after 30 days. Never trains other models.' },
              { icon: '✦',  title: 'Pro Mode',          body: 'Stylists and designers can manage client profiles and export lookbooks.' },
              { icon: '📱', title: 'Offline-First',     body: 'Upload queue means bad signal never loses your scan.' },
            ].map((f, i) => (
              <div key={i}
                   className="bg-ink2 p-6 hover:bg-ink3 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-gold/[0.08] border border-gold/20
                                flex items-center justify-center text-lg mb-4">
                  {f.icon}
                </div>
                <h3 className="font-display text-base text-cream mb-2">{f.title}</h3>
                <p className="font-sans text-xs text-muted leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-px bg-gold" />
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-gold">
            Early Access Voices
          </span>
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-light text-cream mb-12">
          People who&apos;ve <em className="text-gold italic">seen</em> it.
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { q: "I've had the same wardrobe for three years and felt stuck. Glimms showed me 47 outfits I'd never thought of. I didn't buy a single new thing.", name: 'Adaeze N.', role: 'Beta Tester · Abuja' },
            { q: "As an interior designer I use it to rapid-prototype concepts for clients. It's like having a junior designer who never gets tired.", name: 'Fatima K.', role: 'Interior Designer · Dubai' },
            { q: 'The cultural context feature is something I\'ve wanted from every style app. It actually understands how I dress differently for church, work, and going out.', name: 'Olumide A.', role: 'Beta Tester · Lagos' },
          ].map((t, i) => (
            <div key={i}
                 className="p-8 border border-white/[0.07] rounded hover:border-gold/20
                            transition-colors bg-white/[0.02]">
              <p className="font-display text-5xl text-gold/20 leading-none mb-3">&ldquo;</p>
              <p className="font-display italic text-warm text-base leading-relaxed mb-6">
                {t.q}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-ink3 border border-white/10
                                flex items-center justify-center text-sm font-medium text-warm">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-sans text-sm text-cream">{t.name}</p>
                  <p className="font-mono text-[10px] text-muted tracking-wider">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06]">
          {[
            { n: '2,847+', l: 'People on the waitlist'        },
            { n: '47+',    l: 'Avg. new outfits discovered'   },
            { n: '10',     l: 'Cultural regions at launch'     },
            { n: '3',      l: 'Verticals: wardrobe, room, garden' },
          ].map((s, i) => (
            <div key={i} className="bg-ink2 p-8">
              <p className="font-display text-4xl text-cream mb-2">
                {s.n.includes('+') ? (
                  <>{s.n.replace('+', '')}<span className="text-gold">+</span></>
                ) : s.n}
              </p>
              <p className="font-sans text-xs text-muted">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOUNDER ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-20 bg-ink2 border-y border-white/[0.06]">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-px bg-gold" />
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-gold">
              From the founder
            </span>
          </div>
          <blockquote className="font-display text-3xl md:text-4xl font-light italic
                                  text-cream leading-tight mb-8">
            &ldquo;I built Glimms because{' '}
            <span className="text-gold not-italic">talent shouldn&apos;t be gated</span>
            {' '}behind a stylist&apos;s fee.&rdquo;
          </blockquote>
          <p className="font-sans text-sm text-muted leading-loose mb-6">
            Growing up in Nigeria, I watched people with incredible taste — but no budget
            for stylists — struggle to express it. At the same time, fast fashion was
            churning out waste at scale. I&apos;m a software engineer and designer. I built
            Glimms to be the always-available style expert that works with what you have,
            understands your culture, and unlocks the potential you already own.
          </p>
          <div className="flex items-center gap-4">
            <div>
              <p className="font-display italic text-xl text-cream">Lotanna</p>
              <p className="font-mono text-[10px] text-gold tracking-wider uppercase">
                Founder — Top One Percent · Lagos, Nigeria
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section
        id="waitlist"
        className="relative py-36 px-6 text-center overflow-hidden bg-ink2 border-y border-white/[0.06]"
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-display italic text-[22vw] font-light text-white/[0.03] leading-none">
            GLIMMS
          </span>
        </div>
        <div className="relative z-10 max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-px bg-gold" />
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-gold">
              Join the Waitlist
            </span>
            <div className="w-10 h-px bg-gold" />
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-light text-cream
                         leading-tight tracking-tight mb-5">
            Your style is<br />
            <em className="text-gold italic">already</em> there.
          </h2>
          <p className="font-sans text-sm text-muted leading-loose mb-10">
            Get early access when Glimms launches. We&apos;re onboarding the first
            5,000 users personally.
          </p>
          <div className="flex justify-center">
            <WaitlistForm size="large" />
          </div>
          <p className="font-mono text-[10px] text-muted tracking-wider mt-5">
            ✦ &nbsp; Spots are limited &nbsp;·&nbsp; No spam &nbsp;·&nbsp; Unsubscribe anytime
          </p>
        </div>
      </section>

      <FAQ />
      <Footer />
    </>
  );
}

function CounterSkeleton() {
  return (
    <div className="flex items-center gap-4">
      <div className="w-20 h-10 bg-white/[0.04] rounded animate-pulse" />
      <div className="space-y-1">
        <div className="w-28 h-3 bg-white/[0.04] rounded animate-pulse" />
        <div className="w-20 h-3 bg-white/[0.04] rounded animate-pulse" />
      </div>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="w-full bg-ink2 rounded-[36px] border border-white/[0.1] overflow-hidden
                    shadow-[0_60px_120px_rgba(0,0,0,0.6)]"
         style={{ aspectRatio: '9/19.5' }}>
      <div className="w-20 h-6 bg-ink rounded-b-2xl mx-auto" />
      <div className="px-4 py-3 space-y-2.5">
        <div className="flex items-center justify-between mb-1">
          <span className="font-display text-sm text-cream tracking-wider">Glimms</span>
          <span className="font-mono text-[8px] text-gold border border-gold/30 px-2 py-0.5 rounded-full">
            WARDROBE
          </span>
        </div>
        {[
          { color: 'from-cream/90 to-cream/60', label: 'White Linen Shirt',  sub: 'Top · Smart-Casual', score: '97%' },
          { color: 'from-blue-900 to-blue-950', label: 'Navy Slim Chinos',    sub: 'Bottom · Formal',    score: '94%' },
          { color: 'from-amber-700 to-amber-900',label: 'Tan Derby Shoes',   sub: 'Footwear · Classic',  score: '92%' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2.5 bg-white/[0.04] rounded-xl p-2.5
                                   border border-white/[0.06]">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} shrink-0`} />
            <div className="flex-1 min-w-0">
              <p className="font-sans text-[9px] text-cream truncate">{item.label}</p>
              <p className="font-mono text-[7px] text-muted">{item.sub}</p>
            </div>
            <span className="font-mono text-[8px] text-gold shrink-0">{item.score}</span>
          </div>
        ))}
        <div className="bg-gold rounded-lg py-2 text-center">
          <span className="font-mono text-[8px] font-medium text-ink tracking-widest">
            GENERATE 20 MORE →
          </span>
        </div>
      </div>
    </div>
  );
}
