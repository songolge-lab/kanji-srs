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
  try {
    const parsed = JSON.parse(raw);
    pruneOldData(parsed); // 400 günden eski geçmişi lifetimeReviews'a arşivle (yalın localStorage)
    return parsed;
  }
  catch {
    // VERİ KAYBI KORUMASI: Bozuk veriyi sessizce null'a düşürmeden önce ham
    // string'i yedekle. Aksi halde null dönünce bir sonraki save() boş state'i
    // yazar ve kullanıcının (kurtarılabilir olabilecek) verisi kalıcı silinir.
    _tryLS(() => localStorage.setItem('kanji_srs_v1_corrupt_backup', raw));
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
    version: 1,
    settings: { ...CONFIG },
    stats: {
      reviewsByDate: {},
      streak: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastStudyDate: null,
      lifetimeReviews: 0,
      shields: 1,
      lastShieldWeekStart: null,
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
  return state;
}

export function migrateDecks(decks, exampleDeckNames) {
  for (const d of decks) {
    if (!('parentId' in d)) d.parentId = null;
    if (!('isExample' in d) && exampleDeckNames.has(d.name)) d.isExample = true;
  }
  return decks;
}
