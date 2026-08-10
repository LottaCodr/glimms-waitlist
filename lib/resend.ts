import { Resend } from 'resend';
import { WelcomeEmail } from '@/emails/WelcomeEmail';
import { ReferralNotificationEmail } from '@/emails/ReferralNotificationEmail';

let resendClient: Resend | undefined;

function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('RESEND_API_KEY is not configured.');
  resendClient ??= new Resend(apiKey);
  return resendClient;
}

function getMailConfig() {
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  if (!fromEmail) throw new Error('RESEND_FROM_EMAIL is not configured.');

  return {
    from: `${process.env.RESEND_FROM_NAME ?? 'Glimms'} <${fromEmail}>`,
    reply_to: process.env.RESEND_REPLY_TO || undefined,
    appUrl: (process.env.NEXT_PUBLIC_APP_URL ?? 'https://glimms-waitlist.vercel.app').replace(/\/$/, ''),
  };
}

async function deliver(message: Parameters<Resend['emails']['send']>[0]) {
  const { data, error } = await getResend().emails.send(message);
  if (error) throw new Error(`Resend rejected email: ${error.message}`);
  return data;
}

export async function sendWelcomeEmail(opts: {
  email: string; name: string | null; position: number; referralCode: string;
}) {
  const { from, reply_to, appUrl } = getMailConfig();
  return deliver({
    from,
    to: opts.email,
    reply_to,
    subject: `You're on the Glimms waitlist — position #${opts.position}`,
    react: WelcomeEmail({
      name: opts.name,
      position: opts.position,
      referralUrl: `${appUrl}/r/${opts.referralCode}`,
      confirmUrl: `${appUrl}/confirmed/${opts.referralCode}`,
      referralCode: opts.referralCode,
      unsubscribeUrl: `${appUrl}/unsubscribe/${opts.referralCode}`,
      privacyUrl: `${appUrl}/privacy`,
    }),
  });
}

export async function sendReferralNotificationEmail(opts: {
  referrerEmail: string; referrerName: string | null;
  newPosition: number; referralCount: number; referralCode: string;
}) {
  const { from, reply_to, appUrl } = getMailConfig();
  return deliver({
    from,
    to: opts.referrerEmail,
    reply_to,
    subject: 'Someone joined Glimms using your link 🎉',
    react: ReferralNotificationEmail({
      name: opts.referrerName,
      newPosition: opts.newPosition,
      referralCount: opts.referralCount,
      referralUrl: `${appUrl}/r/${opts.referralCode}`,
      dashboardUrl: `${appUrl}/confirmed/${opts.referralCode}`,
    }),
  });
}
