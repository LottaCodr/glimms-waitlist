import {
  Html, Head, Preview, Body, Container,
  Section, Text, Link, Hr, Row, Column,
} from '@react-email/components';

interface Props {
  name: string | null;
  position: number;
  referralUrl: string;
  confirmUrl: string;
  referralCode: string;
  unsubscribeUrl: string;
  privacyUrl: string;
}

export function WelcomeEmail({
  name,
  position,
  referralUrl,
  referralCode,
  unsubscribeUrl,
  privacyUrl,
}: Props) {
  const firstName = name?.split(' ')[0] ?? null;
  const greeting = firstName ? `Hey ${firstName},` : 'Hey,';

  return (
    <Html>
      <Head />
      <Preview>
        You&apos;re #{position.toLocaleString()} on the Glimms waitlist — here&apos;s your referral link.
      </Preview>

      <Body style={body}>
        <Container style={container}>

          {/* Header */}
          <Section style={header}>
            <Text style={logo}>Glimms</Text>
            <Text style={tagline}>AI that styles what you already own.</Text>
          </Section>

          {/* Gold divider */}
          <Hr style={goldHr} />

          {/* Main content */}
          <Section style={content}>
            <Text style={headingText}>{greeting}</Text>
            <Text style={bodyText}>
              You&apos;re officially on the Glimms waitlist.
              We&apos;re onboarding the first 5,000 users personally —
              and you&apos;re one of them.
            </Text>

            {/* Position badge */}
            <Section style={positionBadge}>
              <Text style={positionLabel}>YOUR POSITION</Text>
              <Text style={positionNumber}>#{position.toLocaleString()}</Text>
              <Text style={positionSub}>
                Share your link to move up 10 spots per referral
              </Text>
            </Section>

            <Text style={bodyText}>
              Every friend you invite who joins moves you{' '}
              <span style={{ color: '#C9A96E', fontWeight: 600 }}>10 spots higher</span>{' '}
              on the waitlist. Share your unique link below:
            </Text>

            {/* Referral link */}
            <Section style={linkBox}>
              <Text style={linkLabel}>YOUR REFERRAL LINK</Text>
              <Text style={linkText}>{referralUrl}</Text>
            </Section>

            {/* Share buttons */}
            <Section>
              <Row>
                <Column style={{ paddingRight: '8px' }}>
                  <Link
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      `I just joined the Glimms waitlist — AI that styles what you already own. Join me: ${referralUrl}`,
                    )}`}
                    style={shareBtn}
                  >
                    Share on Twitter
                  </Link>
                </Column>
                <Column style={{ paddingLeft: '8px' }}>
                  <Link
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `Check out Glimms — AI that styles your wardrobe, room, and garden from what you already own: ${referralUrl}`,
                    )}`}
                    style={{ ...shareBtn, backgroundColor: '#25D366' }}
                  >
                    Share on WhatsApp
                  </Link>
                </Column>
              </Row>
            </Section>

            <Hr style={dimHr} />

            {/* What to expect */}
            <Text style={sectionHeading}>WHAT HAPPENS NEXT</Text>

            {[
              { icon: '📸', title: 'Scan', body: 'Point your camera at your wardrobe, room, or garden.' },
              { icon: '🧠', title: 'Analyse', body: 'AI reads your climate, occasion, and cultural context.' },
              { icon: '✦', title: 'Style', body: 'Get 20+ curated combinations from what you already own.' },
            ].map((step) => (
              <Row key={step.title} style={{ marginBottom: '12px' }}>
                <Column style={{ width: '36px', verticalAlign: 'top', paddingTop: '2px' }}>
                  <Text style={{ fontSize: '18px', margin: 0 }}>{step.icon}</Text>
                </Column>
                <Column style={{ verticalAlign: 'top' }}>
                  <Text style={stepTitle}>{step.title}</Text>
                  <Text style={stepBody}>{step.body}</Text>
                </Column>
              </Row>
            ))}

            <Hr style={dimHr} />

            <Text style={bodyText}>
              We&apos;ll email you again the moment your early access is ready.
              Until then — share your link and move up the list.
            </Text>

            <Text style={signature}>
              — Lotanna<br />
              <span style={{ color: '#7A6E64', fontSize: '11px' }}>
                Founder, Glimms · Lagos, Nigeria
              </span>
            </Text>
          </Section>

          {/* Footer */}
          <Hr style={dimHr} />
          <Section style={footer}>
            <Text style={footerText}>
              You&apos;re receiving this because you signed up at glimms.ai.
            </Text>
            <Text style={footerText}>
              <Link
                href={unsubscribeUrl}
                style={{ color: '#7A6E64' }}
              >
                Unsubscribe
              </Link>
              {' '}·{' '}
              <Link
                href={privacyUrl}
                style={{ color: '#7A6E64' }}
              >
                Privacy Policy
              </Link>
              {' '}·{' '}
              Top One Percent Ltd · Lagos, Nigeria
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const body: React.CSSProperties = {
  backgroundColor: '#111111',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  margin: 0,
  padding: '40px 0',
};

const container: React.CSSProperties = {
  backgroundColor: '#1C1814',
  maxWidth: '560px',
  margin: '0 auto',
  borderRadius: '4px',
  overflow: 'hidden',
  border: '1px solid rgba(245,240,232,0.08)',
};

const header: React.CSSProperties = {
  padding: '36px 40px 28px',
};

const logo: React.CSSProperties = {
  fontFamily: 'Georgia, serif',
  fontSize: '28px',
  fontStyle: 'italic',
  color: '#C9A96E',
  margin: '0 0 4px',
};

const tagline: React.CSSProperties = {
  fontSize: '12px',
  color: '#7A6E64',
  margin: 0,
  letterSpacing: '0.04em',
};

const goldHr: React.CSSProperties = {
  borderColor: '#C9A96E',
  margin: '0',
  borderWidth: '1px 0 0',
};

const dimHr: React.CSSProperties = {
  borderColor: 'rgba(245,240,232,0.08)',
  margin: '28px 0',
  borderWidth: '1px 0 0',
};

const content: React.CSSProperties = { padding: '32px 40px' };

const headingText: React.CSSProperties = {
  fontFamily: 'Georgia, serif',
  fontSize: '24px',
  color: '#F5F0E8',
  margin: '0 0 16px',
};

const bodyText: React.CSSProperties = {
  fontSize: '14px',
  color: '#D4C4A8',
  lineHeight: '1.75',
  margin: '0 0 20px',
};

const positionBadge: React.CSSProperties = {
  backgroundColor: 'rgba(201,169,110,0.08)',
  border: '1px solid rgba(201,169,110,0.25)',
  borderRadius: '4px',
  padding: '24px',
  textAlign: 'center',
  margin: '20px 0 28px',
};

const positionLabel: React.CSSProperties = {
  fontFamily: 'Courier New, monospace',
  fontSize: '9px',
  letterSpacing: '0.22em',
  color: '#C9A96E',
  margin: '0 0 6px',
};

const positionNumber: React.CSSProperties = {
  fontFamily: 'Georgia, serif',
  fontSize: '56px',
  color: '#F5F0E8',
  margin: '0',
  lineHeight: '1',
};

const positionSub: React.CSSProperties = {
  fontSize: '11px',
  color: '#7A6E64',
  margin: '8px 0 0',
};

const linkBox: React.CSSProperties = {
  backgroundColor: 'rgba(245,240,232,0.03)',
  border: '1px solid rgba(245,240,232,0.1)',
  borderRadius: '4px',
  padding: '16px 20px',
  margin: '0 0 20px',
};

const linkLabel: React.CSSProperties = {
  fontFamily: 'Courier New, monospace',
  fontSize: '8px',
  letterSpacing: '0.18em',
  color: '#C9A96E',
  margin: '0 0 6px',
};

const linkText: React.CSSProperties = {
  fontFamily: 'Courier New, monospace',
  fontSize: '12px',
  color: '#F5F0E8',
  margin: 0,
  wordBreak: 'break-all',
};

const shareBtn: React.CSSProperties = {
  display: 'block',
  backgroundColor: '#1DA1F2',
  color: '#ffffff',
  textDecoration: 'none',
  textAlign: 'center',
  padding: '10px 16px',
  borderRadius: '4px',
  fontSize: '12px',
  fontWeight: 600,
};

const sectionHeading: React.CSSProperties = {
  fontFamily: 'Courier New, monospace',
  fontSize: '9px',
  letterSpacing: '0.22em',
  color: '#C9A96E',
  margin: '0 0 16px',
};

const stepTitle: React.CSSProperties = {
  fontFamily: 'Georgia, serif',
  fontSize: '15px',
  color: '#F5F0E8',
  margin: '0 0 2px',
};

const stepBody: React.CSSProperties = {
  fontSize: '13px',
  color: '#7A6E64',
  margin: 0,
  lineHeight: '1.5',
};

const signature: React.CSSProperties = {
  fontFamily: 'Georgia, serif',
  fontSize: '15px',
  fontStyle: 'italic',
  color: '#F5F0E8',
  margin: '24px 0 0',
};

const footer: React.CSSProperties = { padding: '20px 40px 28px' };

const footerText: React.CSSProperties = {
  fontSize: '11px',
  color: '#7A6E64',
  lineHeight: '1.6',
  textAlign: 'center',
  margin: '0 0 6px',
};
