// ─── STUDY PACK IMPORT (remote curated JLPT packs) ────────────────────
// Imports a pre-authored, pre-validated JLPT study pack (see
// docs/jlpt_pack_schema.md) as regular decks + custom tests. Packs never
// contain furigana/reading/onyomi/kunyomi. Large remote imports leave those
// fields pending and CardView generates/caches furigana lazily on display.
//
// Curated packs are Supabase-hosted (see supabase-schema.sql →
// curated_packs + the public `study-packs` Storage bucket) — there is no
// bundled/local pack data in the app anymore. Supabase is the source of
// truth; see docs/jlpt_pack_schema.md for the pack JSON schema and
// scripts/upload_curated_pack.js for publishing new packs.

import { uid } from '../utils.js';
import { validExampleFurigana } from '../utils/exampleFurigana.js';
import { addImportedPack, isPackImported } from '../store/appState.js';
import { fetchCuratedPackCatalog, fetchCuratedPackFile } from './dbService.js';

export { isPackImported };

// Pack deck `type` → parent grouping deck name. English, non-localized,
// matching the pack content itself (which is entirely in English).
const CATEGORY_LABELS = { vocabulary: 'Vocabulary', kanji: 'Kanji', grammar: 'Grammar', sentence: 'Sentences' };
const CATEGORY_ORDER = ['vocabulary', 'kanji', 'grammar', 'sentence'];

// Same idea as CATEGORY_LABELS but for the customTests folder tree, plus
// 'mixed' (a test.type value in the schema, e.g. a test drawing on more than
// one content category).
const TEST_CATEGORY_LABELS = { vocabulary: 'Vocabulary', kanji: 'Kanji', grammar: 'Grammar', sentence: 'Sentences', mixed: 'Mixed' };
const TEST_CATEGORY_ORDER = ['vocabulary', 'kanji', 'grammar', 'sentence', 'mixed'];

// Best-effort category detection from a pack test's metadata (category/tags/
// type — docs/jlpt_pack_schema.md's Test Object fields), used only to decide
// which subfolder to file the test into. Returns null when nothing matches,
// in which case the test is filed directly under the pack's root test folder.
function normalizeTestCategory(packTest) {
  const candidates = [];
  if (typeof packTest.category === 'string') candidates.push(packTest.category);
  if (Array.isArray(packTest.tags)) candidates.push(...packTest.tags.filter(tag => typeof tag === 'string'));
  if (typeof packTest.type === 'string') candidates.push(packTest.type);
  const lower = candidates.map(c => c.toLowerCase());
  for (const key of TEST_CATEGORY_ORDER) {
    if (lower.some(c => c.includes(key))) return key;
  }
  return null;
}

function yieldToBrowser() {
  return new Promise(resolve => setTimeout(resolve, 0));
}

function countPackTotals(pack) {
  const cardCount = (pack.decks || []).reduce((sum, deck) => sum + ((deck.cards || []).length), 0);
  const testQuestionCount = (pack.tests || []).reduce((sum, test) => sum + ((test.questions || []).length), 0);
  return { cardCount, testQuestionCount, testObjectCount: (pack.tests || []).length };
}

function emitProgress(onProgress, patch) {
  if (typeof onProgress === 'function') onProgress(patch);
}

function importMeta(pack, importSessionId, source) {
  return {
    sourcePackId: pack.packId,
    sourcePackVersion: pack.version || null,
    importSessionId,
    source: source || 'remote',
  };
}

function makeImportedDeck(title, parentId, meta) {
  return {
    id: uid(),
    name: title || '',
    parentId: parentId || null,
    createdAt: Date.now(),
    cards: [],
    ...meta,
  };
}

function makeTestFolder(title, parentId, meta) {
  const now = Date.now();
  return { id: uid(), kind: 'folder', title, parentId: parentId || null, createdAt: now, updatedAt: now, ...meta };
}

// Maps one pack card to an app card via app.makeCard — which already seeds
// fresh srs + srsReverse, so reverse-study "just works" for imported cards.
function makeImportedCard(app, packCard, meta) {
  const front = packCard.front || '';
  const exampleJp = packCard.exampleJp || '';
  const card = app.makeCard(
    front, '', packCard.back || '',
    exampleJp, packCard.exampleTranslation || '',
    packCard.exampleFuriganaMap || {}, packCard.exampleFurigana
  );
  return {
    ...card,
    ...meta,
    sourceCardId: packCard.id || null,
    sourceCardType: packCard.type || null,
    level: packCard.level || null,
    category: packCard.category || null,
    tags: Array.isArray(packCard.tags) ? [...packCard.tags] : [],
    furiganaStatus: front ? 'pending' : 'empty',
    exampleFuriganaStatus: validExampleFurigana(exampleJp, card.exampleFurigana) ? 'ready' : (exampleJp ? 'pending' : 'empty'),
  };
}

// id/type/prompt/image/options/correctValue are what TestEditor/TestView
// read today; explanation/sourceCardIds/tags are preserved as additional,
// currently-inert metadata — safe since those components only ever read the
// fields they know about.
function importQuestion(q, meta) {
  return {
    id: q.id || uid(),
    type: q.type,
    prompt: q.prompt || '',
    image: q.image || null,
    options: Array.isArray(q.options) ? q.options : [],
    correctValue: q.correctValue,
    explanation: q.explanation || '',
    sourceCardIds: Array.isArray(q.sourceCardIds) ? q.sourceCardIds : [],
    tags: Array.isArray(q.tags) ? q.tags : [],
    sourceQuestionId: q.id || null,
    ...meta,
  };
}

function mergeCounts(target, counts) {
  target.deckCount += counts.deckCount || 0;
  target.cardCount += counts.cardCount || 0;
  target.testCount += counts.testCount || 0;
  target.changed = target.changed || !!counts.changed;
  return target;
}

function descendantIds(items, rootIds) {
  const ids = new Set(rootIds);
  let grew = true;
  while (grew) {
    grew = false;
    for (const item of items || []) {
      if (!item || !item.id || ids.has(item.id)) continue;
      if (item.parentId && ids.has(item.parentId)) {
        ids.add(item.id);
        grew = true;
      }
    }
  }
  return ids;
}

function removeDeckTrees(state, rootIds) {
  if (!rootIds.size) return { changed: false, deckCount: 0, cardCount: 0 };
  const decks = state.decks || [];
  const ids = descendantIds(decks, rootIds);
  let cardCount = 0;
  for (const deck of decks) {
    if (ids.has(deck.id)) cardCount += (deck.cards || []).length;
  }
  state.decks = decks.filter(deck => !ids.has(deck.id));
  return { changed: ids.size > 0, deckCount: ids.size, cardCount };
}

function removeTestTrees(state, rootIds) {
  if (!rootIds.size) return { changed: false, testCount: 0 };
  const tests = state.customTests || [];
  const ids = descendantIds(tests, rootIds);
  state.customTests = tests.filter(test => !ids.has(test.id));
  return { changed: ids.size > 0, testCount: ids.size };
}

function removeTaggedCards(state, predicate) {
  let cardCount = 0;
  for (const deck of state.decks || []) {
    const cards = deck.cards || [];
    const kept = cards.filter(card => {
      const remove = predicate(card);
      if (remove) cardCount++;
      return !remove;
    });
    if (kept.length !== cards.length) deck.cards = kept;
  }
  return { changed: cardCount > 0, cardCount };
}

function cleanupTaggedImport(state, key, value) {
  const out = { changed: false, deckCount: 0, cardCount: 0, testCount: 0 };
  const deckRoots = new Set((state.decks || []).filter(deck => deck && deck[key] === value).map(deck => deck.id));
  mergeCounts(out, removeDeckTrees(state, deckRoots));
  mergeCounts(out, removeTaggedCards(state, card => card && card[key] === value));

  const testRoots = new Set((state.customTests || []).filter(test => test && test[key] === value).map(test => test.id));
  mergeCounts(out, removeTestTrees(state, testRoots));

  if (Array.isArray(state.importedPacks) && key === 'importSessionId') {
    const before = state.importedPacks.length;
    state.importedPacks = state.importedPacks.filter(entry => entry && entry.importSessionId !== value);
    out.changed = out.changed || state.importedPacks.length !== before;
  }
  return out;
}

function expectedDeckNames(pack) {
  const names = new Set((pack.decks || []).map(deck => deck.title).filter(Boolean));
  for (const catType of CATEGORY_ORDER) {
    if ((pack.decks || []).some(deck => deck.type === catType)) names.add(CATEGORY_LABELS[catType]);
  }
  return names;
}

function expectedTestNames(pack) {
  const names = new Set((pack.tests || []).map(test => test.title).filter(Boolean));
  for (const key of TEST_CATEGORY_ORDER) names.add(TEST_CATEGORY_LABELS[key]);
  return names;
}

function likelyLegacyRoot(item, children, expectedNames) {
  const ids = descendantIds(children, new Set([item.id]));
  ids.delete(item.id);
  if (!ids.size) return false;
  const names = new Set(children.filter(child => ids.has(child.id)).map(child => child.name || child.title));
  for (const name of expectedNames) {
    if (names.has(name)) return true;
  }
  return false;
}

function cleanupStalePartialImport(state, pack) {
  const out = { changed: false, deckCount: 0, cardCount: 0, testCount: 0, legacyDeckRoots: 0, legacyTestRoots: 0 };
  mergeCounts(out, cleanupTaggedImport(state, 'sourcePackId', pack.packId));

  const deckNames = expectedDeckNames(pack);
  const legacyDeckRoots = new Set((state.decks || [])
    .filter(deck => deck && !deck.sourcePackId && !deck.importSessionId && (deck.parentId || null) === null)
    .filter(deck => deck.name === pack.title && likelyLegacyRoot(deck, state.decks || [], deckNames))
    .map(deck => deck.id));
  out.legacyDeckRoots = legacyDeckRoots.size;
  mergeCounts(out, removeDeckTrees(state, legacyDeckRoots));

  const testNames = expectedTestNames(pack);
  const legacyTestRoots = new Set((state.customTests || [])
    .filter(test => test && !test.sourcePackId && !test.importSessionId && (test.parentId || null) === null)
    .filter(test => test.title === pack.title && likelyLegacyRoot(test, state.customTests || [], testNames))
    .map(test => test.id));
  out.legacyTestRoots = legacyTestRoots.size;
  mergeCounts(out, removeTestTrees(state, legacyTestRoots));
  return out;
}

function rollbackImportSession(state, importSessionId) {
  return cleanupTaggedImport(state, 'importSessionId', importSessionId);
}

// Fields the schema (docs/jlpt_pack_schema.md) explicitly forbids on cards —
// these are always generated locally by the offline kuromoji parser /
// kanji dictionary, never shipped in pack data.
const FORBIDDEN_CARD_FIELDS = [
  'furigana', 'reading', 'kanaReading', 'romaji',
  'onyomi', 'kunyomi', 'kanjiMeaning', 'kanjiBreakdown',
];

/**
 * Minimal structural validation for remote-fetched pack JSON.
 * Intentionally shallow — not a full schema validator, just enough to keep
 * a malformed/malicious remote file from corrupting app state.
 * Returns { ok: true } or { ok: false, message }.
 */
export function validatePackData(pack) {
  if (!pack || typeof pack !== 'object') return { ok: false, message: 'Pack is not a valid object' };
  if (!pack.packId || typeof pack.packId !== 'string') return { ok: false, message: 'Pack is missing packId' };
  if (!Array.isArray(pack.decks)) return { ok: false, message: 'Pack is missing a decks array' };
  if (!Array.isArray(pack.tests)) return { ok: false, message: 'Pack is missing a tests array' };

  for (const deck of pack.decks) {
    if (!Array.isArray(deck.cards)) return { ok: false, message: `Deck "${deck.id || '?'}" is missing a cards array` };
    for (const card of deck.cards) {
      if (!card.front || !card.back) return { ok: false, message: `Card "${card.id || '?'}" is missing front/back` };
      for (const field of FORBIDDEN_CARD_FIELDS) {
        if (field in card) return { ok: false, message: `Card "${card.id || '?'}" contains forbidden field "${field}"` };
      }
    }
  }
  for (const test of pack.tests) {
    if (!Array.isArray(test.questions)) return { ok: false, message: `Test "${test.id || '?'}" is missing a questions array` };
  }
  return { ok: true };
}

/**
 * Shared import core: validates a parsed pack object, then writes it into
 * app.state as decks + custom tests. Called by importRemotePack (pack
 * downloaded from Supabase Storage) once the pack JSON has been fetched.
 * Resolves to one of:
 *   { status: 'already_imported' }
 *   { status: 'error', message }
 *   { status: 'ok', cardCount, testCount, deckName }
 * Never throws.
 */
export async function importPackData(app, pack, sourceMeta = {}, options = {}) {
  const state = app.state;
  const validation = validatePackData(pack);
  if (!validation.ok) return { status: 'error', message: validation.message };
  if (isPackImported(state, pack.packId)) return { status: 'already_imported' };

  const importSessionId = `${pack.packId}-${Date.now().toString(36)}-${uid()}`;
  const source = sourceMeta.source || 'remote';
  const meta = importMeta(pack, importSessionId, source);
  const totals = countPackTotals(pack);
  let appended = false;
  let cleanup = { changed: false, deckCount: 0, cardCount: 0, testCount: 0, legacyDeckRoots: 0, legacyTestRoots: 0 };

  try {
    emitProgress(options.onProgress, { phase: 'cleanup', ...totals, doneCards: 0, doneTests: 0 });
    cleanup = cleanupStalePartialImport(state, pack);
    if (cleanup.changed) app.save();

    const newDecks = [];
    const newTests = [];
    // Parent pack deck, grouped by category (Vocabulary/Kanji/Grammar/
    // Sentences), with the pack's own decks preserved as leaves underneath —
    // satisfies both "group under Vocabulary/Kanji/.../Sentences" and
    // "preserve the pack's deck grouping".
    const rootDeck = makeImportedDeck(pack.title, null, meta);
    newDecks.push(rootDeck);

    const categoryDecks = {};
    for (const catType of CATEGORY_ORDER) {
      if (pack.decks.some(d => d.type === catType)) {
        const categoryDeck = makeImportedDeck(CATEGORY_LABELS[catType], rootDeck.id, meta);
        categoryDecks[catType] = categoryDeck;
        newDecks.push(categoryDeck);
      }
    }

    let cardCount = 0;
    emitProgress(options.onProgress, { phase: 'cards', cardCount: totals.cardCount, testQuestionCount: totals.testQuestionCount, doneCards: 0, doneTests: 0 });
    for (const packDeck of pack.decks) {
      const parent = categoryDecks[packDeck.type] || rootDeck;
      const leafDeck = makeImportedDeck(packDeck.title, parent.id, meta);
      leafDeck.sourceDeckId = packDeck.id || null;
      leafDeck.level = packDeck.level || null;
      leafDeck.category = packDeck.category || null;
      newDecks.push(leafDeck);
      for (const packCard of packDeck.cards) {
        leafDeck.cards.push(makeImportedCard(app, packCard, meta));
        cardCount++;
        if (cardCount % 50 === 0) {
          emitProgress(options.onProgress, { phase: 'cards', cardCount: totals.cardCount, testQuestionCount: totals.testQuestionCount, doneCards: cardCount, doneTests: 0 });
          await yieldToBrowser();
        }
      }
    }
    emitProgress(options.onProgress, { phase: 'cards', cardCount: totals.cardCount, testQuestionCount: totals.testQuestionCount, doneCards: cardCount, doneTests: 0 });

    // Tests go into their own folder tree (customTests), independent of the
    // deck tree above: one root folder named after the pack, with category
    // subfolders (Vocabulary/Kanji/Grammar/Sentences/Mixed) created lazily
    // only when at least one test actually matches that category. Tests whose
    // category can't be determined stay directly under the pack root folder.
    let testCount = 0;
    let testFolderId = null;
    const packTests = pack.tests || [];
    if (packTests.length) {
      const testsRoot = makeTestFolder(pack.title, null, meta);
      newTests.push(testsRoot);
      testFolderId = testsRoot.id;

      const categoryFolders = {};
      emitProgress(options.onProgress, { phase: 'tests', cardCount: totals.cardCount, testQuestionCount: totals.testQuestionCount, doneCards: cardCount, doneTests: 0 });
      for (const packTest of packTests) {
        const catKey = normalizeTestCategory(packTest);
        let parentId = testsRoot.id;
        if (catKey) {
          if (!categoryFolders[catKey]) {
            const folder = makeTestFolder(TEST_CATEGORY_LABELS[catKey], testsRoot.id, meta);
            newTests.push(folder);
            categoryFolders[catKey] = folder;
          }
          parentId = categoryFolders[catKey].id;
        }

        const questions = (packTest.questions || []).map(q => importQuestion(q, meta));
        const now = Date.now();
        newTests.push({
          id: packTest.id,
          kind: 'test',
          parentId,
          title: packTest.title,
          questions,
          sourceTestId: packTest.id || null,
          type: packTest.type || null,
          category: packTest.category || null,
          level: packTest.level || null,
          tags: Array.isArray(packTest.tags) ? [...packTest.tags] : [],
          createdAt: now,
          updatedAt: now,
          ...meta,
        });
        testCount += questions.length;
        emitProgress(options.onProgress, { phase: 'tests', cardCount: totals.cardCount, testQuestionCount: totals.testQuestionCount, doneCards: cardCount, doneTests: testCount });
        if (testCount % 50 === 0) await yieldToBrowser();
      }
    }

    emitProgress(options.onProgress, { phase: 'saving', cardCount: totals.cardCount, testQuestionCount: totals.testQuestionCount, doneCards: cardCount, doneTests: testCount });
    state.decks.push(...newDecks);
    if (!Array.isArray(state.customTests)) state.customTests = [];
    state.customTests.push(...newTests);
    appended = true;

    addImportedPack(state, {
      packId: pack.packId,
      title: pack.title,
      version: pack.version,
      importedAt: Date.now(),
      deckId: rootDeck.id,
      testFolderId,
      cardCount,
      testCount,
      testObjectCount: packTests.length,
      source,
      level: pack.level || null,
      language: pack.language || null,
      importSessionId,
      sourcePackVersion: pack.version || null,
    });

    app.save();
    emitProgress(options.onProgress, { phase: 'done', cardCount: totals.cardCount, testQuestionCount: totals.testQuestionCount, doneCards: cardCount, doneTests: testCount });
    return { status: 'ok', cardCount, testCount, testObjectCount: packTests.length, deckName: rootDeck.name, cleanup };
  } catch (e) {
    let rollback = { changed: false, deckCount: 0, cardCount: 0, testCount: 0 };
    if (appended) {
      emitProgress(options.onProgress, { phase: 'rollback', cardCount: totals.cardCount, testQuestionCount: totals.testQuestionCount });
      rollback = rollbackImportSession(state, importSessionId);
    }
    if (cleanup.changed || rollback.changed) {
      try { app.save(); } catch { /* best effort rollback persistence */ }
    }
    return { status: 'error', message: e?.message || 'Import failed', rolledBack: rollback.changed, rollback, cleanup };
  }
}

// ─── REMOTE CURATED PACKS (Supabase-backed catalog) ──────────────────
// All curated packs (N5 pilot included) live in Supabase (see
// supabase-schema.sql → curated_packs + the public `study-packs` Storage
// bucket) — none are bundled into the app. The catalog fetch never throws
// and never blocks app startup/CommunityHub rendering — it's called lazily
// by CommunityHub only once the Community view is opened, and any failure
// (offline, misconfigured Supabase, etc.) just means the remote section
// shows an unavailable note; user-shared community decks are unaffected.

/**
 * Fetches the remote curated-pack catalog (metadata only, no pack JSON).
 * Resolves to { status: 'ok', packs } or { status: 'error', message }.
 * Never throws.
 */
export async function loadRemotePackCatalog() {
  try {
    const rows = await fetchCuratedPackCatalog();
    return { status: 'ok', packs: Array.isArray(rows) ? rows : [] };
  } catch (e) {
    return { status: 'error', message: e?.message || 'Network error' };
  }
}

/**
 * Downloads + imports one remote pack given its curated_packs catalog row
 * (needs at least `pack_id` and `storage_path`). See importPackData for the
 * success/already_imported shape; on failure also returns `reason`
 * ('download' | 'invalid') so the UI can show a more specific message.
 * Never throws.
 */
export async function importRemotePack(app, catalogEntry, options = {}) {
  const state = app.state;
  if (isPackImported(state, catalogEntry.pack_id)) return { status: 'already_imported' };

  let pack;
  try {
    pack = await fetchCuratedPackFile(catalogEntry.storage_path);
  } catch (e) {
    return { status: 'error', reason: 'download', message: e?.message || 'Download failed' };
  }

  const validation = validatePackData(pack);
  if (!validation.ok) return { status: 'error', reason: 'invalid', message: validation.message };

  return await importPackData(app, pack, { source: 'remote' }, options);
}
