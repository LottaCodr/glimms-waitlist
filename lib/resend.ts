import { Resend } from 'resend';
import { WelcomeEmail } from '@/emails/WelcomeEmail';
import { ReferralNotificationEmail } from '@/emails/ReferralNotificationEmail';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = `${process.env.RESEND_FROM_NAME ?? 'Glimms'} <${process.env.RESEND_FROM_EMAIL ?? 'hello@glimms.ai'}>`;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://glimms.ai';

export async function sendWelcomeEmail(opts: {
  email: string; name: string | null; position: number; referralCode: string;
}) {
  await resend.emails.send({
    from:    FROM,
    to:      opts.email,
    subject: `You're on the Glimms waitlist — position #${opts.position}`,
    react:   WelcomeEmail({
      name:         opts.name,
      position:     opts.position,
      referralUrl:  `${APP_URL}/r/${opts.referralCode}`,
      confirmUrl:   `${APP_URL}/confirmed/${opts.referralCode}`,
      referralCode: opts.referralCode,
    }),
  });
}

export async function sendReferralNotificationEmail(opts: {
  referrerEmail: string; referrerName: string | null;
  newPosition: number; referralCount: number; referralCode: string;
}) {
  await resend.emails.send({
    from:    FROM,
    to:      opts.referrerEmail,
    subject: `Someone joined Glimms using your link 🎉`,
    react:   ReferralNotificationEmail({
      name:          opts.referrerName,
      newPosition:   opts.newPosition,
      referralCount: opts.referralCount,
      referralUrl:   `${APP_URL}/r/${opts.referralCode}`,
      dashboardUrl:  `${APP_URL}/confirmed/${opts.referralCode}`,
    }),
  });
}
