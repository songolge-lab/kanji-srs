-- ─── APP STATE ────────────────────────────────────────────────────────
-- Core sync table: one row per sync_code, stores full client state as JSONB.
CREATE TABLE IF NOT EXISTS app_state (
  code        TEXT PRIMARY KEY,
  state       JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE app_state ENABLE ROW LEVEL SECURITY;

CREATE POLICY app_state_select
  ON app_state FOR SELECT
  USING (true);

CREATE POLICY app_state_insert
  ON app_state FOR INSERT
  WITH CHECK (code IS NOT NULL);

CREATE POLICY app_state_update
  ON app_state FOR UPDATE
  USING (true)
  WITH CHECK (code IS NOT NULL);

-- ─── AUTO-UPDATED_AT TRIGGER ─────────────────────────────────────────
-- Sets updated_at = now() on every UPDATE. Shared by all tables with updated_at.
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_app_state_updated_at
  BEFORE UPDATE ON app_state
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

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

CREATE TRIGGER trg_custom_tests_updated_at
  BEFORE UPDATE ON custom_tests
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─── COMMUNITY DECKS ─────────────────────────────────────────────────
-- Public deck sharing hub. Any user can browse; sync_code holders can publish.
-- Note: this app uses sync_code (not Supabase Auth) for identity, so
-- author_sync_code replaces the traditional author_id FK to auth.users.
CREATE TABLE IF NOT EXISTS community_decks (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_sync_code TEXT NOT NULL,
  author_name      TEXT NOT NULL DEFAULT 'Anonymous',
  title            TEXT NOT NULL,
  description      TEXT NOT NULL DEFAULT '',
  tags             TEXT[] NOT NULL DEFAULT '{}',
  deck_data        JSONB NOT NULL,
  downloads        INT NOT NULL DEFAULT 0,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_community_decks_created
  ON community_decks (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_community_decks_author
  ON community_decks (author_sync_code);

-- RLS: anyone can read, but only requests carrying a sync_code can insert.
-- Since the app uses anon-key auth (no JWTs), RLS here is a safety net;
-- the real authorization is at the application layer (sync_code required).
ALTER TABLE community_decks ENABLE ROW LEVEL SECURITY;

CREATE POLICY community_decks_select
  ON community_decks FOR SELECT
  USING (true);

CREATE POLICY community_decks_insert
  ON community_decks FOR INSERT
  WITH CHECK (author_sync_code IS NOT NULL AND author_sync_code <> '');

-- RPC: atomic download counter increment (avoids read-modify-write race).
-- SECURITY DEFINER is REQUIRED: RLS is enabled with no UPDATE policy (so callers
-- cannot arbitrarily mutate rows), but this narrow function must still bump the
-- counter. DEFINER runs it as the owner, bypassing RLS for this one operation.
-- `SET search_path` hardens the definer function against search_path hijacking.
CREATE OR REPLACE FUNCTION increment_download_count(deck_id UUID)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE community_decks
  SET downloads = downloads + 1
  WHERE id = deck_id;
$$;

-- ─── CURATED STUDY PACKS (remote pack catalog) ────────────────────────
-- Metadata catalog for pre-authored JLPT study packs (N5-N1, multilingual)
-- distributed via Supabase Storage instead of being bundled into the app.
-- This table holds ONLY catalog metadata — the actual pack JSON (decks,
-- cards, tests; see docs/jlpt_pack_schema.md) lives in Storage at
-- `storage_path`, fetched on-demand by the client only when a user chooses
-- to import that specific pack (see src/services/studyPackService.js).
--
-- Admin upload is intentionally NOT exposed through the client: there is no
-- INSERT/UPDATE/DELETE policy below, so the anon key can only ever SELECT.
-- Rows are written exclusively via the Supabase SQL console or the
-- service-role script at scripts/upload_curated_pack.js, which authenticates
-- with SUPABASE_SERVICE_ROLE_KEY (never shipped to the client) and therefore
-- bypasses RLS entirely — it does not rely on any policy below.
CREATE TABLE IF NOT EXISTS curated_packs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pack_id      TEXT NOT NULL UNIQUE,
  level        TEXT NOT NULL,
  language     TEXT NOT NULL,
  title        TEXT NOT NULL,
  description  TEXT,
  version      TEXT NOT NULL,
  card_count   INTEGER NOT NULL DEFAULT 0,
  test_count   INTEGER NOT NULL DEFAULT 0,
  storage_path TEXT NOT NULL,
  checksum     TEXT,
  size_bytes   BIGINT,
  is_active    BOOLEAN NOT NULL DEFAULT true,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_curated_packs_active
  ON curated_packs (is_active);

CREATE INDEX IF NOT EXISTS idx_curated_packs_level_lang
  ON curated_packs (level, language);

CREATE TRIGGER trg_curated_packs_updated_at
  BEFORE UPDATE ON curated_packs
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE curated_packs ENABLE ROW LEVEL SECURITY;

-- Public SELECT limited to active packs only; no write policy exists for
-- any client-facing role, so INSERT/UPDATE/DELETE are denied by default.
CREATE POLICY curated_packs_select
  ON curated_packs FOR SELECT
  USING (is_active = true);

-- ─── CURATED STUDY PACKS — STORAGE BUCKET ─────────────────────────────
-- Pack JSON files (e.g. study-packs/en/jlpt-n5-en-pilot-v1.json) are stored
-- in a PUBLIC bucket. Public buckets serve objects directly via the
-- `/storage/v1/object/public/<bucket>/<path>` URL without any RLS/policy
-- check, so no storage.objects SELECT policy is required for read access.
-- Writes are still service-role only (uploads happen via
-- scripts/upload_curated_pack.js, which authenticates with the service-role
-- key and bypasses storage RLS the same way it bypasses table RLS above).
INSERT INTO storage.buckets (id, name, public)
VALUES ('study-packs', 'study-packs', true)
ON CONFLICT (id) DO NOTHING;
