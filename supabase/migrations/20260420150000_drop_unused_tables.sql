-- `orders` and `investor_leads` were provisioned speculatively in the
-- initial schema but were never wired to any UI, API, or lib code. Keeping
-- unused tables around creates two risks:
--
--   1. They silently drift out of sync with the product over time, so a
--      future attempt to use them starts from a stale design.
--   2. They're additional public surface area (RLS policies, CHECKs) that
--      ops has to remember to audit.
--
-- If we need pre-orders or investor relations later, we'll re-design the
-- tables to fit the real flow rather than inheriting yesterday's guesses.
--
-- CASCADE drops any dependent objects (policies, triggers, indexes).
-- There is no data to migrate: both tables are empty in production.

DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS investor_leads CASCADE;
