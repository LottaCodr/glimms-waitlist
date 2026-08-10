# glimms-waitlist

> Glimms waitlist website — Next.js 14 App Router, Supabase, Resend, React Email.

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Email | Resend + React Email |
| Analytics | Plausible (privacy-first) |
| Deploy | Vercel |

## Features

- **Waitlist signup** with name + email, Zod validation, duplicate detection
- **Referral system** — unique code per user, every referral = +10 spots
- **Live counter** — server component, revalidates every 60s
- **Confirmed page** — position badge + share buttons (Twitter, WhatsApp, native)
- **Referral redirect** (`/r/[code]`) — sets cookie, redirects to homepage
- **Welcome email** — beautiful dark HTML email via Resend + React Email
- **Referral notification email** — fires when someone uses your link
- **Privacy policy** — GDPR + NDPR compliant
- **Unsubscribe page** — one-click removal
- **Custom cursor** — gold dot + ring (desktop only)
- **Plausible analytics** — no cookies, GDPR safe

## Quick Start

```bash
# 1. Clone and install
npm install

# 2. Copy env
cp .env.example .env.local

# 3. Fill in your keys (see below)
# 4. Run the Supabase schema
#    → paste supabase/schema.sql into your Supabase SQL editor

# 5. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Resend
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=hello@your-domain.com
RESEND_FROM_NAME=Glimms
RESEND_REPLY_TO=hello@your-domain.com

# App — use this production URL until you attach a custom domain
NEXT_PUBLIC_APP_URL=https://glimms-waitlist.vercel.app
NEXT_PUBLIC_BASE_COUNT=2847

# Plausible (optional)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=glimms.ai
```

## Supabase Setup

1. Create a new Supabase project
2. Go to **SQL Editor**
3. Paste the contents of `supabase/schema.sql` and run it
4. Copy your project URL + anon key + service role key into `.env.local`

## Resend Setup (production checklist)

The site sends a welcome email after a successful signup and a referral notification to the referrer. It now **awaits the Resend handoff** before the serverless function completes, and logs a clear error if Resend rejects a message. A mail failure never removes a valid waitlist signup.

### In the Resend dashboard

1. **Use a domain you control.** Vercel's `glimms-waitlist.vercel.app` cannot be used as the sender domain. Use a custom domain/subdomain such as `glimms.ai` or `mail.glimms.ai`.
2. In Resend, go to **Domains → Add Domain**, enter the domain, and copy every DNS record Resend shows (usually SPF and DKIM records) into the DNS provider that manages that domain. Do not replace existing SPF records; merge them if your provider already has one.
3. Wait for Resend to show the domain as **Verified**. Only then set `RESEND_FROM_EMAIL` to an address on that exact verified domain, for example `hello@glimms.ai`. The display name is configured with `RESEND_FROM_NAME=Glimms`.
4. Go to **API Keys → Create API Key**. Give it a limited production name such as `glimms-waitlist-production`, select sending permission, copy it once, and set it as `RESEND_API_KEY`. Never expose it in browser code or commit it.
5. Set `RESEND_REPLY_TO` to a real inbox you monitor. Send a signup to yourself and check Resend's **Emails** activity log for a `Delivered` event.

### In Vercel

1. Open your project → **Settings → Environment Variables**.
2. Add `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_FROM_NAME`, and `RESEND_REPLY_TO` for **Production** (and Preview too, only if you want preview deployments to send real email).
3. Add `NEXT_PUBLIC_APP_URL=https://glimms-waitlist.vercel.app` for Production. Once a custom domain is connected in Vercel, change this to its canonical `https://` URL. This controls links in emails, sharing, and metadata.
4. Redeploy after changing variables. Test a signup in production, then inspect Vercel function logs and Resend's email activity.

> Resend's unverified/test sending is limited and is not a substitute for domain verification. Configure the sender domain first, then use that same domain in `RESEND_FROM_EMAIL`.

## Operational gaps to plan next

- **Spam/rate limiting:** the public signup endpoint has no durable rate limiter or CAPTCHA yet. Add Vercel WAF and/or Upstash Redis rate limiting plus Turnstile before promotion.
- **Email lifecycle:** there is no Resend webhook handler for bounces, complaints, or delivery events. Add one and suppress bounced/complained recipients.
- **Transactional resilience:** email is attempted inline. For higher volume, use a durable queue (for example QStash) with retries and idempotency rather than relying only on a request.
- **Consent and privacy operations:** the unsubscribe link works, but there is no admin export/delete workflow, consent timestamp, or automated deletion job.
- **Product claims:** FAQ launch timing says Q4 2025, which is now in the past; update it to a real current date before publishing.

## Email Preview

```bash
npm run email:dev
```

Opens React Email dev server at [http://localhost:3000](http://localhost:3000) — preview both email templates with live reload.

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add all env vars in Vercel dashboard → Settings → Environment Variables
```

Or connect your GitHub repo to Vercel for automatic deploys on push.

## Project Structure

```
app/
├── page.tsx                    ← Homepage (hero, features, FAQ, CTA)
├── layout.tsx                  ← Root layout (fonts, metadata, cursor)
├── globals.css                 ← Tailwind + custom utilities
├── api/
│   ├── waitlist/route.ts       ← POST signup, GET position by code
│   ├── stats/route.ts          ← GET live count (60s cache)
│   └── unsubscribe/route.ts    ← POST unsubscribe
├── confirmed/[code]/page.tsx   ← Post-signup page with referral share
├── r/[code]/page.tsx           ← Referral redirect (sets cookie)
├── privacy/page.tsx            ← Privacy policy (GDPR + NDPR)
└── unsubscribe/[code]/page.tsx ← Unsubscribe confirmation

components/
├── Cursor.tsx                  ← Custom gold cursor (desktop only)
├── Nav.tsx                     ← Fixed nav with scroll blur
├── WaitlistForm.tsx            ← Email form with loading + error states
├── ReferralShare.tsx           ← Position card + copy/share buttons
├── LiveCounter.tsx             ← Async server component (live count)
├── FAQ.tsx                     ← Accordion FAQ
└── Footer.tsx                  ← Links + legal

emails/
├── WelcomeEmail.tsx            ← Signup confirmation email
└── ReferralNotificationEmail.tsx ← Referral alert email

lib/
├── supabase.ts                 ← Public + admin Supabase clients
├── resend.ts                   ← Email send functions
└── utils.ts                    ← cn(), nanoid referral codes

supabase/
└── schema.sql                  ← Full DB schema with triggers
```

## How the Referral System Works

1. User signs up → gets unique 8-char referral code (e.g. `Ax7Bq2Kp`)
2. Their share link: `https://glimms.ai/r/Ax7Bq2Kp`
3. When someone visits `/r/Ax7Bq2Kp`, a cookie is set and they're redirected to homepage
4. When they sign up, `referred_by` is saved as `Ax7Bq2Kp`
5. DB trigger fires → `referral_count` on the referrer increments by 1
6. Effective position = `raw_position - (referral_count × 10)`
7. Referrer gets a notification email with their new position
