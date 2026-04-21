-- Tiny key/value store for site-level configuration that ops can update
-- without a code deploy (e.g. the founding-partner pilot counter).
--
-- We deliberately keep this as a single table with a JSONB value so new
-- keys can be added without schema churn. RLS is service-role-only: only
-- server-side code with the service key can read or write.
CREATE TABLE IF NOT EXISTS site_config (
  key        TEXT PRIMARY KEY,
  value      JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER site_config_updated_at
  BEFORE UPDATE ON site_config
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role only" ON site_config
  FOR ALL USING (false) WITH CHECK (false);

-- Seed the pilot counter. `total` is the fixed cohort size, `filled` is the
-- number of founding partners confirmed. The UI derives `remaining` from
-- these two. Bump `filled` as partners sign on.
INSERT INTO site_config (key, value)
VALUES ('pilot', '{"total": 10, "filled": 3}'::jsonb)
ON CONFLICT (key) DO NOTHING;
