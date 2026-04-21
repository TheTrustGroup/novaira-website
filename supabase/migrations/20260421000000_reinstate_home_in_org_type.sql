-- The brand repositioning now explicitly includes homes alongside hotels,
-- hospitals, schools, and offices. The earlier migration
-- (20260420140000_drop_home_from_org_type.sql) tightened the CHECK
-- constraint to institutional-only; this reverses that, adding 'home'
-- back as an accepted organization_type.
--
-- Existing 'other' rows that were remapped from 'home' by the prior
-- migration are not re-labelled — we cannot distinguish them from
-- genuine 'other' entries now. Any future home submissions will be
-- captured as 'home' directly.

ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_organization_type_check;

ALTER TABLE leads
  ADD CONSTRAINT leads_organization_type_check
  CHECK (organization_type IN ('hotel', 'hospital', 'school', 'office', 'home', 'other'));
