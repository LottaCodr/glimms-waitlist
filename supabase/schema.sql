CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE waitlist_entries (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  email          TEXT        UNIQUE NOT NULL,
  name           TEXT,
  referral_code  TEXT        UNIQUE NOT NULL,
  referred_by    TEXT        REFERENCES waitlist_entries(referral_code) ON DELETE SET NULL,
  referral_count INTEGER     NOT NULL DEFAULT 0,
  position       INTEGER     NOT NULL,
  source         TEXT        DEFAULT 'direct',
  unsubscribed   BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE SEQUENCE waitlist_position_seq START 1;

CREATE OR REPLACE FUNCTION set_waitlist_position()
RETURNS TRIGGER AS $$
BEGIN
  NEW.position := nextval('waitlist_position_seq');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_waitlist_position
  BEFORE INSERT ON waitlist_entries
  FOR EACH ROW EXECUTE FUNCTION set_waitlist_position();

CREATE OR REPLACE FUNCTION increment_referral_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.referred_by IS NOT NULL THEN
    UPDATE waitlist_entries
    SET referral_count = referral_count + 1
    WHERE referral_code = NEW.referred_by;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_increment_referral
  AFTER INSERT ON waitlist_entries
  FOR EACH ROW EXECUTE FUNCTION increment_referral_count();

CREATE INDEX idx_waitlist_email         ON waitlist_entries(email);
CREATE INDEX idx_waitlist_referral_code ON waitlist_entries(referral_code);
CREATE INDEX idx_waitlist_referred_by   ON waitlist_entries(referred_by);
CREATE INDEX idx_waitlist_created_at    ON waitlist_entries(created_at);

ALTER TABLE waitlist_entries ENABLE ROW LEVEL SECURITY;
