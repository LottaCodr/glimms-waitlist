import 'server-only';

import { Resend } from 'resend';
import { WelcomeEmail } from '@/emails/WelcomeEmail';
import { ReferralNotificationEmail } from '@/emails/ReferralNotificationEmail';
import { getAppUrl } from '@/lib/utils';

let resendClient: Resend | null = null;

function getResend(): Resend {
  if (typeof window !== 'undefined') {
    throw new Error('Resend client must only be used on the server');
  }
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('Missing env: RESEND_API_KEY (server-only)');
  }
  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

function getFrom(): string {
  const name = process.env.RESEND_FROM_NAME ?? 'Glimms';
  const email = process.env.RESEND_FROM_EMAIL ?? 'hello@glimms.ai';
  return `${name} <${email}>`;
}

export async function sendWelcomeEmail(opts: {
  email: string;
  name: string | null;
  position: number;
  referralCode: string;
}) {
  const appUrl = getAppUrl();
  const referralUrl = `${appUrl}/r/${opts.referralCode}`;
  const confirmUrl = `${appUrl}/confirmed/${opts.referralCode}`;
  const unsubscribeUrl = `${appUrl}/unsubscribe/${opts.referralCode}`;
  const privacyUrl = `${appUrl}/privacy`;

  await getResend().emails.send({
    from: getFrom(),
    to: opts.email,
    subject: `You're on the Glimms waitlist — position #${opts.position}`,
    react: WelcomeEmail({
      name: opts.name,
      position: opts.position,
      referralUrl,
      confirmUrl,
      referralCode: opts.referralCode,
      unsubscribeUrl,
      privacyUrl,
    }),
  });
}

export async function sendReferralNotificationEmail(opts: {
  referrerEmail: string;
  referrerName: string | null;
  newPosition: number;
  referralCount: number;
  referralCode: string;
}) {
  const appUrl = getAppUrl();
  const referralUrl = `${appUrl}/r/${opts.referralCode}`;
  const dashboardUrl = `${appUrl}/confirmed/${opts.referralCode}`;
  const unsubscribeUrl = `${appUrl}/unsubscribe/${opts.referralCode}`;

  await getResend().emails.send({
    from: getFrom(),
    to: opts.referrerEmail,
    subject: `Someone joined Glimms using your link 🎉`,
    react: ReferralNotificationEmail({
      name: opts.referrerName,
      newPosition: opts.newPosition,
      referralCount: opts.referralCount,
      referralUrl,
      dashboardUrl,
      unsubscribeUrl,
    }),
  });
}
