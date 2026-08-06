import {
  Html, Head, Preview, Body, Container,
  Section, Text, Link, Hr,
} from '@react-email/components';

interface Props {
  name: string | null;
  newPosition: number;
  referralCount: number;
  referralUrl: string;
  dashboardUrl: string;
  unsubscribeUrl: string;
}

export function ReferralNotificationEmail({
  name, newPosition, referralCount, referralUrl, dashboardUrl, unsubscribeUrl,
}: Props) {
  const firstName = name?.split(' ')[0] ?? null;
  const greeting = firstName ? `Hey ${firstName}` : 'Hey';

  return (
    <Html>
      <Head />
      <Preview>
        {`Someone joined Glimms using your link — you're now #${newPosition} 🎉`}
      </Preview>

      <Body style={body}>
        <Container style={container}>

          <Section style={header}>
            <Text style={logo}>Glimms</Text>
          </Section>

          <Hr style={goldHr} />

          <Section style={content}>
            {/* Big celebration */}
            <Text style={celebration}>🎉</Text>

            <Text style={headingText}>
              {greeting} — someone just joined using your link.
            </Text>

            <Text style={bodyText}>
              You&apos;re doing great. Here&apos;s your updated position:
            </Text>

            {/* New position */}
            <Section style={positionBadge}>
              <Text style={posLabel}>NEW POSITION</Text>
              <Text style={posNumber}>#{newPosition.toLocaleString()}</Text>
              <Text style={posSub}>
                {referralCount} referral{referralCount !== 1 ? 's' : ''} so far
                · {referralCount * 10} spots moved up
              </Text>
            </Section>

            <Text style={bodyText}>
              Keep the momentum going — share your link again and move even higher.
              Every new signup = another{' '}
              <span style={{ color: '#C9A96E', fontWeight: 600 }}>10 spots up</span>.
            </Text>

            {/* Referral link */}
            <Section style={linkBox}>
              <Text style={linkLabel}>YOUR LINK</Text>
              <Text style={linkText}>{referralUrl}</Text>
            </Section>

            <Link href={dashboardUrl} style={dashboardBtn}>
              View your waitlist dashboard →
            </Link>

            <Hr style={dimHr} />

            <Text style={signatureText}>
              — The Glimms team<br />
              <span style={{ color: '#7A6E64', fontSize: '11px' }}>
                Lagos, Nigeria
              </span>
            </Text>
          </Section>

          <Hr style={dimHr} />
          <Section style={footer}>
            <Text style={footerText}>
              You&apos;re receiving this because you&apos;re on the Glimms waitlist.{' '}
              <Link href={unsubscribeUrl}
                    style={{ color: '#7A6E64' }}>
                Unsubscribe
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

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
  border: '1px solid rgba(245,240,232,0.08)',
  overflow: 'hidden',
};

const header: React.CSSProperties = { padding: '32px 40px 24px' };

const logo: React.CSSProperties = {
  fontFamily: 'Georgia, serif',
  fontSize: '26px',
  fontStyle: 'italic',
  color: '#C9A96E',
  margin: 0,
};

const goldHr: React.CSSProperties = {
  borderColor: '#C9A96E',
  margin: 0,
  borderWidth: '1px 0 0',
};

const dimHr: React.CSSProperties = {
  borderColor: 'rgba(245,240,232,0.08)',
  margin: '24px 0',
  borderWidth: '1px 0 0',
};

const content: React.CSSProperties = { padding: '32px 40px' };

const celebration: React.CSSProperties = {
  fontSize: '40px',
  margin: '0 0 16px',
};

const headingText: React.CSSProperties = {
  fontFamily: 'Georgia, serif',
  fontSize: '22px',
  color: '#F5F0E8',
  margin: '0 0 14px',
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
  margin: '0 0 24px',
};

const posLabel: React.CSSProperties = {
  fontFamily: 'Courier New, monospace',
  fontSize: '9px',
  letterSpacing: '0.22em',
  color: '#C9A96E',
  margin: '0 0 6px',
};

const posNumber: React.CSSProperties = {
  fontFamily: 'Georgia, serif',
  fontSize: '52px',
  color: '#F5F0E8',
  margin: 0,
  lineHeight: '1',
};

const posSub: React.CSSProperties = {
  fontSize: '11px',
  color: '#7A6E64',
  margin: '8px 0 0',
};

const linkBox: React.CSSProperties = {
  backgroundColor: 'rgba(245,240,232,0.03)',
  border: '1px solid rgba(245,240,232,0.1)',
  borderRadius: '4px',
  padding: '14px 18px',
  margin: '0 0 20px',
};

const linkLabel: React.CSSProperties = {
  fontFamily: 'Courier New, monospace',
  fontSize: '8px',
  letterSpacing: '0.18em',
  color: '#C9A96E',
  margin: '0 0 5px',
};

const linkText: React.CSSProperties = {
  fontFamily: 'Courier New, monospace',
  fontSize: '12px',
  color: '#F5F0E8',
  margin: 0,
  wordBreak: 'break-all',
};

const dashboardBtn: React.CSSProperties = {
  display: 'inline-block',
  backgroundColor: '#C9A96E',
  color: '#0A0806',
  textDecoration: 'none',
  padding: '12px 24px',
  borderRadius: '4px',
  fontSize: '12px',
  fontFamily: 'Courier New, monospace',
  fontWeight: 600,
  letterSpacing: '0.1em',
};

const signatureText: React.CSSProperties = {
  fontFamily: 'Georgia, serif',
  fontSize: '15px',
  fontStyle: 'italic',
  color: '#F5F0E8',
  margin: '20px 0 0',
};

const footer: React.CSSProperties = { padding: '16px 40px 24px' };

const footerText: React.CSSProperties = {
  fontSize: '11px',
  color: '#7A6E64',
  textAlign: 'center',
  margin: 0,
};
