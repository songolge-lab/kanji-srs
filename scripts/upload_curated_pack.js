// ─── CURATED PACK UPLOAD (admin-only, service-role) ──────────────────
// Reads a local JLPT study-pack JSON file (see docs/jlpt_pack_schema.md),
// uploads it to the public `study-packs` Supabase Storage bucket, and
// upserts its metadata into the `curated_packs` table (see
// supabase-schema.sql).
//
// This script is NEVER run automatically (not wired into any npm script,
// build step, or CI job) and is NOT part of the client bundle. It uses the
// Supabase SERVICE ROLE key, which bypasses Row Level Security entirely —
// that key must never be committed, logged, or shipped to the browser.
//
// Usage (all via environment variables, nothing hardcoded):
//   SUPABASE_URL=https://xxxx.supabase.co \
//   SUPABASE_SERVICE_ROLE_KEY=eyJ... \
//   CURATED_PACK_FILE=src/data/study-packs/en/jlpt_n5_pilot_pack.json \
//   CURATED_PACK_STORAGE_PATH=study-packs/en/jlpt-n5-en-pilot-v1.json \
//   node scripts/upload_curated_pack.js
//
// CURATED_PACK_STORAGE_PATH is bucket-inclusive (first path segment is the
// bucket name, e.g. "study-packs/...") to match how the client resolves the
// public Storage URL in src/services/dbService.js (fetchCuratedPackFile).
//
// Optional: CURATED_PACK_ACTIVE=false to upload/upsert but leave the pack
// hidden from the client catalog (is_active=false) until you're ready to
// publish it.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing required environment variable: ${name}`);
    process.exit(1);
  }
  return value;
}

async function main() {
  const SUPABASE_URL = requireEnv('SUPABASE_URL').replace(/\/+$/, '');
  const SERVICE_ROLE_KEY = requireEnv('SUPABASE_SERVICE_ROLE_KEY');
  const packFilePath = requireEnv('CURATED_PACK_FILE');
  const storagePath = requireEnv('CURATED_PACK_STORAGE_PATH');
  const isActive = process.env.CURATED_PACK_ACTIVE !== 'false';

  const bucket = storagePath.split('/')[0];
  const objectPath = storagePath.slice(bucket.length + 1);
  if (!bucket || !objectPath) {
    console.error('CURATED_PACK_STORAGE_PATH must be "bucket/path/to/file.json", e.g. "study-packs/en/jlpt-n5-en-pilot-v1.json"');
    process.exit(1);
  }

  const absPath = path.resolve(process.cwd(), packFilePath);
  console.log(`Reading pack file: ${absPath}`);
  const raw = fs.readFileSync(absPath); // Buffer — used for both parsing and checksum/size
  const pack = JSON.parse(raw.toString('utf8'));

  if (!pack.packId || typeof pack.packId !== 'string') throw new Error('Pack JSON is missing packId');
  if (!Array.isArray(pack.decks)) throw new Error('Pack JSON is missing a decks array');
  if (!Array.isArray(pack.tests)) throw new Error('Pack JSON is missing a tests array');
  if (!pack.level || !pack.language || !pack.title || !pack.version) {
    throw new Error('Pack JSON is missing one of: level, language, title, version');
  }

  const cardCount = pack.decks.reduce((sum, d) => sum + (Array.isArray(d.cards) ? d.cards.length : 0), 0);
  // Matches the app's own convention (studyPackService.js): test_count is the
  // total number of QUESTIONS across all tests, not the number of test objects.
  const testCount = pack.tests.reduce((sum, t) => sum + (Array.isArray(t.questions) ? t.questions.length : 0), 0);
  const checksum = crypto.createHash('sha256').update(raw).digest('hex');
  const sizeBytes = raw.length;

  console.log(`packId=${pack.packId} level=${pack.level} language=${pack.language} version=${pack.version}`);
  console.log(`cardCount=${cardCount} testCount=${testCount} sizeBytes=${sizeBytes} checksum=${checksum}`);

  const authHeaders = {
    'apikey': SERVICE_ROLE_KEY,
    'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
  };

  // 1) Upload the pack JSON to Storage (x-upsert so re-running with a
  // changed file overwrites the existing object at the same path).
  console.log(`Uploading to Storage: bucket="${bucket}" path="${objectPath}"`);
  const uploadRes = await fetch(`${SUPABASE_URL}/storage/v1/object/${bucket}/${objectPath}`, {
    method: 'POST',
    headers: {
      ...authHeaders,
      'Content-Type': 'application/json',
      'x-upsert': 'true',
    },
    body: raw,
  });
  if (!uploadRes.ok) {
    const detail = await uploadRes.text().catch(() => '');
    throw new Error(`Storage upload failed: ${uploadRes.status} ${detail}`);
  }
  console.log('Storage upload OK.');

  // 2) Upsert catalog metadata (on_conflict=pack_id so re-running updates
  // the existing row instead of erroring on the UNIQUE constraint).
  console.log('Upserting curated_packs metadata row...');
  const row = {
    pack_id: pack.packId,
    level: pack.level,
    language: pack.language,
    title: pack.title,
    description: pack.description || '',
    version: pack.version,
    card_count: cardCount,
    test_count: testCount,
    storage_path: storagePath,
    checksum,
    size_bytes: sizeBytes,
    is_active: isActive,
  };
  const upsertRes = await fetch(`${SUPABASE_URL}/rest/v1/curated_packs?on_conflict=pack_id`, {
    method: 'POST',
    headers: {
      ...authHeaders,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates,return=representation',
    },
    body: JSON.stringify(row),
  });
  if (!upsertRes.ok) {
    const detail = await upsertRes.text().catch(() => '');
    throw new Error(`Metadata upsert failed: ${upsertRes.status} ${detail}`);
  }
  const result = await upsertRes.json();
  console.log('Metadata upsert OK:', JSON.stringify(result[0] || result, null, 2));
  console.log(`\nDone. Public URL: ${SUPABASE_URL}/storage/v1/object/public/${storagePath}`);
}

main().catch(err => {
  console.error('Upload failed:', err.message || err);
  process.exit(1);
});
