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
RESEND_FROM_EMAIL=hello@glimms.ai
RESEND_FROM_NAME=Glimms

# App
NEXT_PUBLIC_APP_URL=https://glimms.ai
NEXT_PUBLIC_BASE_COUNT=2847

# Plausible (optional)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=glimms.ai
```

## Supabase Setup

1. Create a new Supabase project
2. Go to **SQL Editor**
3. Paste the contents of `supabase/schema.sql` and run it
4. Copy your project URL + anon key + service role key into `.env.local`

## Resend Setup

1. Sign up at [resend.com](https://resend.com)
2. Add and verify your sending domain (`glimms.ai`)
3. Create an API key
4. Add to `.env.local`

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
