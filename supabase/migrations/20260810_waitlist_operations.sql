-- Run this once in Supabase SQL Editor for an existing project.
ALTER TABLE waitlist_entries
  ADD COLUMN IF NOT EXISTS unsubscribed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS marketing_consent BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS consented_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS email_status TEXT NOT NULL DEFAULT 'active',
  ADD COLUMN IF NOT EXISTS email_bounced_at TIMESTAMPTZ;

ALTER TABLE waitlist_entries
  DROP CONSTRAINT IF EXISTS waitlist_entries_email_status_check;
ALTER TABLE waitlist_entries
  ADD CONSTRAINT waitlist_entries_email_status_check
  CHECK (email_status IN ('active', 'bounced', 'complained'));

CREATE INDEX IF NOT EXISTS idx_waitlist_unsubscribed_at ON waitlist_entries(unsubscribed_at)
  WHERE unsubscribed = TRUE;
