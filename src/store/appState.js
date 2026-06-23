export const CONFIG = {
  learnSteps: [1, 10],
  graduateInterval: 1,
  easyInterval: 4,
  defaultEase: 2.5,
  minEase: 1.3,
  easyBonus: 1.3,
  masteryDays: 21,
  fuzz: true,
  dailyNewLimit: 0,
  autoUseShield: true,
};

// ─── STORAGE LAYER ────────────────────────────────────────────────────
let _inMemory = false;
let _memStore = null;

function _tryLS(fn) {
  try { return fn(); }
  catch(e) { _inMemory = true; return null; }
}

export function saveState(state) {
  const json = JSON.stringify(state);
  if (_inMemory) { _memStore = json; return; }
  _tryLS(() => localStorage.setItem('kanji_srs_v1', json));
}

export function loadState() {
  if (_inMemory) return _memStore ? JSON.parse(_memStore) : null;
  const raw = _tryLS(() => localStorage.getItem('kanji_srs_v1'));
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function testStorage() {
  try {
    localStorage.setItem('__test__', '1');
    localStorage.removeItem('__test__');
    return true;
  } catch { _inMemory = true; return false; }
}

// ─── SYNC CODE PERSISTENCE ───────────────────────────────────────────
const SYNC_CODE_KEY = 'kanji_srs_sync_code';

export function getPersistedSyncCode() {
  return _tryLS(() => localStorage.getItem(SYNC_CODE_KEY));
}

export function persistSyncCode(code) {
  _tryLS(() => localStorage.setItem(SYNC_CODE_KEY, code));
}

export function removePersistedSyncCode() {
  _tryLS(() => localStorage.removeItem(SYNC_CODE_KEY));
}

// ─── INITIAL STATE ───────────────────────────────────────────────────
export function createInitialState() {
  return {
    version: 1,
    settings: { ...CONFIG },
    stats: { reviewsByDate: {}, streak: 0, shields: 1, lastShieldWeekStart: null },
    decks: [],
    customTests: [],
  };
}

// ─── CUSTOM TEST ACTIONS ─────────────────────────────────────────────
export function addCustomTest(state, testObj) {
  state.customTests.push(testObj);
}

export function updateCustomTest(state, id, data) {
  const idx = state.customTests.findIndex(ct => ct.id === id);
  if (idx !== -1) Object.assign(state.customTests[idx], data);
}

export function deleteCustomTest(state, id) {
  state.customTests = state.customTests.filter(ct => ct.id !== id);
}

// ─── MIGRATIONS ──────────────────────────────────────────────────────
export function migrateSettings(settings) {
  const OLD_DEFAULT = JSON.stringify([10, 60]);
  if (JSON.stringify(settings.learnSteps) === OLD_DEFAULT) {
    settings.learnSteps = [...CONFIG.learnSteps];
  }
  if (typeof settings.autoUseShield !== 'boolean') settings.autoUseShield = true;
  return settings;
}

export function migrateCustomTests(state) {
  if (!Array.isArray(state.customTests)) state.customTests = [];
  return state.customTests;
}

export function migrateStats(stats) {
  const s = stats || {};
  if (typeof s.shields !== 'number') s.shields = 1;
  if (typeof s.lastShieldWeekStart === 'undefined') s.lastShieldWeekStart = null;
  if (typeof s.reviewsByDate !== 'object' || !s.reviewsByDate) s.reviewsByDate = {};
  if (typeof s.streak !== 'number') s.streak = 0;
  return s;
}

export function migrateDecks(decks, exampleDeckNames) {
  for (const d of decks) {
    if (!('parentId' in d)) d.parentId = null;
    if (!('isExample' in d) && exampleDeckNames.has(d.name)) d.isExample = true;
  }
  return decks;
}
