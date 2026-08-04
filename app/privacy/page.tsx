import Link   from 'next/link';
import { Nav }    from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy — Glimms',
  description: 'How Glimms collects, uses, and protects your personal data.',
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-24 px-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-px bg-gold" />
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-gold">
            Legal
          </span>
        </div>

        <h1 className="font-display text-5xl font-light text-cream mb-3">
          Privacy Policy
        </h1>
        <p className="font-mono text-xs text-muted mb-14">
          Last updated: July 2025
        </p>

        <div className="space-y-10 font-sans text-sm text-muted leading-loose">

          <section>
            <h2 className="font-display text-xl text-cream mb-3">1. Who we are</h2>
            <p>
              Glimms is operated by Top One Percent Ltd, registered in Nigeria.
              Our contact address is{' '}
              <a href="mailto:hello@glimms.ai" className="text-gold hover:underline">
                hello@glimms.ai
              </a>. We are the data controller for personal data collected via
              this website and the Glimms mobile application.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-cream mb-3">2. What we collect</h2>
            <p className="mb-3">When you join the waitlist we collect:</p>
            <ul className="list-none space-y-2 pl-4">
              {[
                'Your email address (required)',
                'Your first name (optional)',
                'Your referral source (which link you followed)',
                'The time and date of your signup',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-gold mt-1">→</span> {item}
                </li>
              ))}
            </ul>
            <p className="mt-4">
              We do <strong className="text-warm font-normal">not</strong> collect
              payment information, government IDs, or any sensitive personal data
              through the waitlist. When the app launches, additional data practices
              will be covered in a separate in-app privacy notice.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-cream mb-3">3. Why we collect it</h2>
            <p className="mb-3">We use your data to:</p>
            <ul className="list-none space-y-2 pl-4">
              {[
                'Send you a confirmation email when you join the waitlist',
                'Notify you when Glimms launches and when your early access is ready',
                'Send referral notifications when someone joins via your link',
                'Track aggregate waitlist growth (we never sell individual data)',
                'Comply with our legal obligations',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-gold mt-1">→</span> {item}
                </li>
              ))}
            </ul>
            <p className="mt-4">
              Our legal basis is <strong className="text-warm font-normal">legitimate
              interest</strong> (operating the waitlist) and your{' '}
              <strong className="text-warm font-normal">consent</strong> (by
              submitting the form you agree to receive the emails above).
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-cream mb-3">4. How long we keep it</h2>
            <p>
              We retain waitlist data until 90 days after the public launch of
              Glimms, or until you unsubscribe — whichever comes first. Unsubscribed
              records are deleted within 30 days.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-cream mb-3">5. Who we share it with</h2>
            <p className="mb-3">We share your data only with:</p>
            <ul className="list-none space-y-2 pl-4">
              {[
                'Supabase (database hosting, EU servers) — supabase.com',
                'Resend (transactional email delivery) — resend.com',
                'Vercel (website hosting) — vercel.com',
                'Plausible (privacy-first analytics, no cookies) — plausible.io',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-gold mt-1">→</span> {item}
                </li>
              ))}
            </ul>
            <p className="mt-4">
              We do <strong className="text-warm font-normal">not</strong> sell,
              rent, or trade your data with third parties. We do not use your data
              to train AI models.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-cream mb-3">6. Your rights</h2>
            <p className="mb-3">
              Under GDPR (if you are in the EU/UK) and NDPR (if you are in Nigeria)
              you have the right to:
            </p>
            <ul className="list-none space-y-2 pl-4">
              {[
                'Access the personal data we hold about you',
                'Correct inaccurate data',
                'Request deletion of your data',
                'Withdraw your consent at any time (by unsubscribing)',
                'Lodge a complaint with your national data protection authority',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-gold mt-1">→</span> {item}
                </li>
              ))}
            </ul>
            <p className="mt-4">
              To exercise any of these rights, email us at{' '}
              <a href="mailto:privacy@glimms.ai" className="text-gold hover:underline">
                privacy@glimms.ai
              </a>.
              We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-cream mb-3">7. Cookies</h2>
            <p>
              This website uses one functional cookie (<code className="text-gold">glimms_ref</code>)
              to remember your referral source for 30 days. It contains no personal
              data — only the referral code. We use Plausible Analytics which is
              cookieless and GDPR-compliant by design.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-cream mb-3">8. Changes to this policy</h2>
            <p>
              We may update this policy as the product evolves. We will notify
              waitlist members of material changes by email. The &ldquo;last
              updated&rdquo; date at the top of this page will always reflect the
              most recent version.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-cream mb-3">9. Contact</h2>
            <p>
              Questions about this policy? Email{' '}
              <a href="mailto:privacy@glimms.ai" className="text-gold hover:underline">
                privacy@glimms.ai
              </a>{' '}
              or write to: Top One Percent Ltd, Lagos, Nigeria.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-10 border-t border-white/[0.07]">
          <Link href="/"
                className="font-mono text-[10px] tracking-[0.18em] uppercase text-gold
                           border border-gold/30 px-5 py-2.5 rounded-full hover:bg-gold/10
                           transition-colors">
            ← Back to Glimms
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
