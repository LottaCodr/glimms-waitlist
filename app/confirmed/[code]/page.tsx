import { notFound }       from 'next/navigation';
import { supabaseAdmin, effectivePosition, WaitlistEntry } from '@/lib/supabase';
import { ReferralShare }  from '@/components/ReferralShare';
import { Nav }            from '@/components/Nav';
import { Footer }         from '@/components/Footer';

interface Props { params: { code: string } }

export default async function ConfirmedPage({ params }: Props) {
  const { data: entry } = await supabaseAdmin()
    .from('waitlist_entries')
    .select('*')
    .eq('referral_code', params.code)
    .single();

  if (!entry) notFound();

  const position = effectivePosition(entry as WaitlistEntry);
  const firstName = entry.name?.split(' ')[0] ?? null;

  return (
    <>
      <Nav />

      <main className="min-h-screen flex flex-col items-center justify-center
                       px-6 py-32 text-center">
        {/* Corner accents */}
        <div className="fixed top-0 left-0 w-10 h-px  bg-gold" />
        <div className="fixed top-0 left-0 w-px  h-10 bg-gold" />
        <div className="fixed bottom-0 right-0 w-10 h-px  bg-gold/30" />
        <div className="fixed bottom-0 right-0 w-px  h-10 bg-gold/30" />

        {/* Success mark */}
        <div className="w-16 h-16 rounded-full border border-gold/40 bg-gold/10
                        flex items-center justify-center text-2xl mb-8 animate-fade-up">
          ✦
        </div>

        <h1 className="font-display text-5xl md:text-6xl font-light text-cream
                       tracking-tight mb-4 animate-fade-up"
            style={{ animationDelay: '0.1s' }}>
          {firstName ? `You're in, ${firstName}.` : "You're in."}
        </h1>

        <p className="font-sans text-warm text-base mb-2 animate-fade-up"
           style={{ animationDelay: '0.15s' }}>
          Check your inbox — we just sent your confirmation.
        </p>

        {/* Position badge */}
        <div className="my-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="inline-flex flex-col items-center border border-gold/30
                          bg-gold/5 rounded px-12 py-6">
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-gold mb-2">
              Your position
            </span>
            <span className="font-display text-7xl text-cream leading-none">
              #{position.toLocaleString()}
            </span>
            {entry.referral_count > 0 && (
              <span className="font-mono text-[10px] text-gold mt-2">
                ↑ moved up {entry.referral_count * 10} spots via referrals
              </span>
            )}
          </div>
        </div>

        {/* Referral CTA */}
        <div className="mb-3 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-gold mb-6">
            Move up faster — share your link
          </p>
          <ReferralShare
            referralCode={entry.referral_code}
            position={position}
            referralCount={entry.referral_count}
          />
        </div>

        {/* Explain mechanic */}
        <div className="mt-10 max-w-sm animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { n: '1', t: 'Share your link' },
              { n: '2', t: 'Friend signs up' },
              { n: '3', t: 'You jump 10 spots' },
            ].map((s, i) => (
              <div key={i} className="p-4 bg-ink2 border border-white/[0.06] rounded">
                <div className="w-7 h-7 rounded-full border border-gold/30 bg-gold/10
                                flex items-center justify-center text-gold text-xs
                                font-mono mx-auto mb-2">
                  {s.n}
                </div>
                <p className="font-sans text-[11px] text-muted">{s.t}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
