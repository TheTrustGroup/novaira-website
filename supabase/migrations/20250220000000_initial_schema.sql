-- Enable UUID extension (gen_random_uuid() is built-in in Postgres 13+, but pgcrypto is harmless)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Leads table (all form submissions)
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  organization TEXT,
  organization_type TEXT CHECK (organization_type IN ('hotel', 'hospital', 'school', 'office', 'home', 'other')),
  lead_source TEXT CHECK (lead_source IN ('spec_download', 'consultation', 'waitlist', 'investor', 'contact')),
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  ip_address TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'proposal_sent', 'closed_won', 'closed_lost')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(email)
);

-- Waitlist with tiering and referral
CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  tier TEXT DEFAULT 'standard' CHECK (tier IN ('founder', 'early', 'standard')),
  position INTEGER UNIQUE,
  referral_code TEXT UNIQUE DEFAULT encode(gen_random_bytes(6), 'hex'),
  referred_by_code TEXT,
  referral_count INTEGER DEFAULT 0,
  confirmed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pre-orders and deposits
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id),
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_session_id TEXT UNIQUE,
  amount_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'usd',
  order_type TEXT CHECK (order_type IN ('deposit', 'full_prepay', 'founder_edition')),
  quantity INTEGER DEFAULT 1,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'refunded', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Investor interest
CREATE TABLE investor_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  name TEXT,
  fund_or_organization TEXT,
  check_size_range TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Helper function to increment referral count
CREATE OR REPLACE FUNCTION increment_referral_count(waitlist_id UUID)
RETURNS void AS $$
  UPDATE waitlist SET referral_count = referral_count + 1 WHERE id = waitlist_id;
$$ LANGUAGE sql;

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

-- Trigger: use EXECUTE PROCEDURE for compatibility (Postgres 10 and earlier); EXECUTE FUNCTION works on 11+
CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

-- Row Level Security (service role bypasses RLS; anon/authenticated get no access)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE investor_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role only" ON leads
  FOR ALL USING (false) WITH CHECK (false);
CREATE POLICY "Service role only" ON waitlist
  FOR ALL USING (false) WITH CHECK (false);
CREATE POLICY "Service role only" ON orders
  FOR ALL USING (false) WITH CHECK (false);
CREATE POLICY "Service role only" ON investor_leads
  FOR ALL USING (false) WITH CHECK (false);
