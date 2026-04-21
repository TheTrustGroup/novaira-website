-- Lightweight audit log for outbound notifications (email today, SMS/
-- webhook later). Every attempt — success or failure — writes one row
-- so ops can answer "did the consultation lead on Monday actually email
-- us?" without having to dig through Resend's dashboard.
--
-- Intentionally narrow: no PII bodies, just channel, status, a short
-- error, optional references, and a jsonb `meta` for per-channel extras
-- (Resend message id, template name, etc.).
CREATE TABLE IF NOT EXISTS notifications (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel      TEXT NOT NULL CHECK (channel IN ('email')),
  kind         TEXT NOT NULL,
  status       TEXT NOT NULL CHECK (status IN ('sent', 'failed', 'skipped')),
  recipient    TEXT,
  lead_id      UUID REFERENCES leads(id) ON DELETE SET NULL,
  provider_id  TEXT,
  error        TEXT,
  meta         JSONB,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS notifications_kind_created_at_idx
  ON notifications (kind, created_at DESC);

CREATE INDEX IF NOT EXISTS notifications_status_created_at_idx
  ON notifications (status, created_at DESC);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role only" ON notifications
  FOR ALL USING (false) WITH CHECK (false);
