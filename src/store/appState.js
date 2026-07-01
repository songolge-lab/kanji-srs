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
  enableHaptics: true,
};

// ─── STORAGE LAYER ────────────────────────────────────────────────────
let _inMemory = false;
let _memStore = null;

function _tryLS(fn) {
  try { return fn(); }
  catch(e) { _inMemory = true; return null; }
}

export function saveState(state) {
  if (!state || typeof state !== 'object' || !Array.isArray(state.decks)) {
    console.error('saveState: Invalid state payload intercepted. Aborting save to prevent data loss.');
    return;
  }
  const json = JSON.stringify(state);
  if (_inMemory) { _memStore = json; return; }
  _tryLS(() => localStorage.setItem('kanji_srs_v1', json));
  if (_inMemory) { _memStore = json; }
}

export function loadState() {
  if (_inMemory) return _memStore ? JSON.parse(_memStore) : null;
  const raw = _tryLS(() => localStorage.getItem('kanji_srs_v1'));
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    pruneOldData(parsed); // 400 günden eski geçmişi lifetimeReviews'a arşivle (yalın localStorage)
    return parsed;
  }
  catch {
    // VERİ KAYBI KORUMASI: Bozuk veriyi sessizce null'a düşürmeden önce ham string'i yedekle.
    // Rolling backup mekanizması (önceki yedeklerin üzerine yazılmasını engeller).
    _tryLS(() => {
      const ts = Date.now();
      localStorage.setItem(`kanji_srs_v1_corrupt_backup_${ts}`, raw);
      if (!localStorage.getItem('kanji_srs_v1_corrupt_backup')) {
        localStorage.setItem('kanji_srs_v1_corrupt_backup', raw);
      }
    });
    return null;
  }
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
    version: 2,
    settings: { ...CONFIG, learnSteps: [...CONFIG.learnSteps] },
    stats: {
      reviewsByDate: {},
      streak: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastStudyDate: null,
      lifetimeReviews: 0,
      shields: 1,
      lastShieldWeekStart: null,
      dailyStats: {},
    },
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
  if (typeof settings.enableHaptics !== 'boolean') settings.enableHaptics = true;
  if (typeof settings.geminiApiKey !== 'string') settings.geminiApiKey = '';
  if (typeof settings.geminiModel !== 'string') settings.geminiModel = 'gemini-2.5-pro';
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
  // ── Gamification v2: kalıcı seri/yaşam-boyu izleme alanları ──
  // Eski state'lerde (sadece streak + reviewsByDate vardı) bu alanlar yoktu;
  // mevcut verilerden güvenle türetilir. currentStreak, streak ile aynı değeri
  // taşır (UI hâlâ streak okur; currentStreak blueprint uyumu için tutulur).
  if (typeof s.currentStreak !== 'number') s.currentStreak = s.streak;
  if (typeof s.longestStreak !== 'number') s.longestStreak = s.streak;
  if (typeof s.lifetimeReviews !== 'number') s.lifetimeReviews = 0;
  if (typeof s.dailyStats !== 'object' || !s.dailyStats) s.dailyStats = {};
  // Eski günlük kayıtlarda decksStudied dizisi yoktu — geriye dönük uyum için
  // eksik olan her güne boş dizi eklenir (render tarafı yine de defansif okur).
  for (const day in s.dailyStats) {
    const d = s.dailyStats[day];
    if (d && typeof d === 'object' && !Array.isArray(d.decksStudied)) d.decksStudied = [];
  }
  if (typeof s.lastStudyDate === 'undefined') {
    // En son GERÇEK çalışma gününü (count > 0, suffix'siz tarih) reviewsByDate'ten çıkar.
    // Kalkanla korunan günler count:0 ile düz anahtar oluşturduğundan onları eler.
    const realDates = Object.keys(s.reviewsByDate)
      .filter(k => /^\d{4}-\d{2}-\d{2}$/.test(k) && s.reviewsByDate[k] > 0)
      .sort();
    s.lastStudyDate = realDates.length ? realDates[realDates.length - 1] : null;
  }
  return s;
}

// ── SLIDING WINDOW PRUNE ──────────────────────────────────────────────
// reviewsByDate süresiz büyümesin diye PRUNE_AFTER_DAYS'ten eski günlerin
// inceleme sayılarını tek bir lifetimeReviews tamsayısında biriktirip eski
// anahtarları siler. Güvenli pencere (400 gün) hem 366 günlük heatmap
// penceresinin hem de gerçekçi kesintisiz serilerin ötesindedir → streak/shield
// mantığının geriye doğru okuyabileceği hiçbir güne dokunmaz. İdempotenttir:
// silinen günler bir daha sayılmaz. appState saf kalsın diye epoch hesabı inline.
const PRUNE_AFTER_DAYS = 400;
export function pruneOldData(state) {
  const s = state && state.stats;
  if (!s || typeof s.reviewsByDate !== 'object' || !s.reviewsByDate) return state;
  if (typeof s.lifetimeReviews !== 'number') s.lifetimeReviews = 0;
  const cutoffEpoch = Math.floor(Date.now() / 86400000) - PRUNE_AFTER_DAYS;
  for (const key of Object.keys(s.reviewsByDate)) {
    const datePart = key.slice(0, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(datePart)) continue;
    const epochDay = Math.floor(new Date(datePart + 'T00:00:00Z').getTime() / 86400000);
    if (Number.isNaN(epochDay) || epochDay >= cutoffEpoch) continue;
    // Sadece düz tarih anahtarındaki gerçek inceleme sayısı arşivlenir;
    // _new / _shielded yardımcı anahtarları yalnızca silinir.
    if (key.length === 10) s.lifetimeReviews += (s.reviewsByDate[key] || 0);
    delete s.reviewsByDate[key];
  }
  if (s.dailyStats && typeof s.dailyStats === 'object') {
    for (const key of Object.keys(s.dailyStats)) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(key)) continue;
      const epochDay = Math.floor(new Date(key + 'T00:00:00Z').getTime() / 86400000);
      if (!Number.isNaN(epochDay) && epochDay < cutoffEpoch) delete s.dailyStats[key];
    }
  }
  return state;
}

export function migrateDecks(decks, exampleDeckNames) {
  for (const d of decks) {
    if (!('parentId' in d)) d.parentId = null;
    if (!('isExample' in d) && exampleDeckNames.has(d.name)) d.isExample = true;
  }
  return decks;
}

// ─── SM-2 → FSRS MIGRATION ───────────────────────────────────────────
// Idempotent, additive, lossless. Approximates legacy `intervalDays` → FSRS
// Stability (S) and `ease` (E-Factor) → FSRS Difficulty (D), so no card resets.
//
// DELIBERATE DEVIATION FROM THE EXTERNAL BLUEPRINT: the blueprint set
// `ease`/`intervalDays` to undefined ("clean up legacy fields"). We do NOT
// delete them — the whole `state` (incl. card.srs) is synced to Supabase and
// `pickNewerState` does no schema-version check, so a still-on-v1.x client
// (e.g. a lazily-updated PWA) could pull FSRS cards; without the legacy fields
// its SM-2 engine computes `due = now + NaN` and silently corrupts. Keeping
// the fields is forward-compatible, rollback-safe, and costs a few bytes. The
// D/S math below is exactly as specified.
export function migrateToFSRS(cardSrs) {
  if (!cardSrs || typeof cardSrs !== 'object') return cardSrs;
  if ('S' in cardSrs) return cardSrs; // already migrated (or a fresh FSRS card)

  const now = Date.now();

  // 1. intervalDays → Stability (S). At 90% retention, FSRS interval === S,
  //    so the current interval maps directly onto stability.
  const oldInterval = Math.max(0.1, cardSrs.intervalDays || 0);
  const S = oldInterval;

  // 2. SM-2 ease → FSRS Difficulty (D). ease 2.5 (avg) → D 5; ease 1.3 (min,
  //    hardest) → D 10. Linear: D = 10 - ((ease - 1.3) / 1.2) * 5, clamped.
  const oldEase = cardSrs.ease || 2.5;
  let D = 10 - ((oldEase - 1.3) / 1.2) * 5;
  D = Math.max(1, Math.min(10, D));

  // 3. Deduce last_review from due/interval (SM-2 never stored it). Only
  //    meaningful for cards already in day-scale review.
  let lastReview = null;
  if (cardSrs.state === 'review') {
    const intervalMs = oldInterval * 86400000;
    lastReview = cardSrs.due - intervalMs;
    if (lastReview > now) lastReview = now; // sanity: never in the future
  }

  return {
    ...cardSrs, // preserves state, stepIndex, due, reps, lapses, mastered
    D: Number(D.toFixed(4)),
    S: Number(S.toFixed(4)),
    last_review: lastReview,
    // ease / intervalDays intentionally PRESERVED (see note above)
  };
}

// Apply migrateToFSRS to every card across every deck. Idempotent. Called on
// every state ingestion path (boot load + all cloud-pull merges) so a v2 client
// always normalizes whatever it loads, local or remote.
export function migrateCardsToFSRS(state) {
  if (!state || !Array.isArray(state.decks)) return state;
  for (const d of state.decks) {
    if (!d || !Array.isArray(d.cards)) continue;
    for (const c of d.cards) {
      if (c && c.srs) c.srs = migrateToFSRS(c.srs);
    }
  }
  if (!(state.version >= 2)) state.version = 2; // FSRS schema marker
  return state;
}
