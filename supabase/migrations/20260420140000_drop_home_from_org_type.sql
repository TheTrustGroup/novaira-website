-- The UI and API stopped accepting `organization_type = 'home'` in the
-- first operational tranche (the brand is strictly institutional). The DB
-- constraint still allowed it, leaving a quiet inconsistency. This
-- migration tightens the constraint to match.
--
-- Data safety: any stray `home` rows captured before the UI change are
-- remapped to `other` so the tightened CHECK doesn't reject them on apply.
-- There's no meaningful data loss — `other` was always the fallback bucket
-- and none of the downstream tooling reads the original value.

UPDATE leads SET organization_type = 'other' WHERE organization_type = 'home';

ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_organization_type_check;

ALTER TABLE leads
  ADD CONSTRAINT leads_organization_type_check
  CHECK (organization_type IN ('hotel', 'hospital', 'school', 'office', 'other'));
