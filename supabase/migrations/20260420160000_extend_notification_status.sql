-- Resend delivers deliverability signals (accepted, bounced, complained)
-- via webhooks. We log each event as a new row in `notifications` so the
-- full lifecycle of a single send is reconstructable by joining on
-- `provider_id`. Expand the status CHECK accordingly.
--
-- Not added: `opened`, `clicked`. Those are marketing-analytics signals,
-- not operational ones, and belong in PostHog if we ever need them.

ALTER TABLE notifications DROP CONSTRAINT IF EXISTS notifications_status_check;

ALTER TABLE notifications
  ADD CONSTRAINT notifications_status_check
  CHECK (status IN ('sent', 'failed', 'skipped', 'delivered', 'bounced', 'complained'));
