-- ─── CUSTOM TESTS ────────────────────────────────────────────────────
-- Standalone test module: stores user-created tests with questions.
-- Questions are kept as JSONB array; each element follows:
--   { id, type, prompt, image: null|base64, options: [], correctValue }
CREATE TABLE IF NOT EXISTS custom_tests (
  id         TEXT PRIMARY KEY,
  sync_code  TEXT NOT NULL,
  title      TEXT NOT NULL,
  questions  JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_custom_tests_sync_code
  ON custom_tests (sync_code);
