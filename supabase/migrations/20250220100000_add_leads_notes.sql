-- Store contact form message (and other notes) on leads
ALTER TABLE leads ADD COLUMN IF NOT EXISTS notes TEXT;
