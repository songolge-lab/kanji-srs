const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { root, createHarness, deferred } = require('./harness.cjs');

async function run() {
  const gates = new Map();
  const nodes = new Map();
  const modalBackground = { classList: { shown: false, contains() { return this.shown; } } };
  nodes.set('modal-bg', modalBackground);
  const document = { documentElement: { lang: 'tr' }, getElementById: id => nodes.get(id) || null };
  const harness = createHarness({ document }, {
    async dynamicImport(specifier, parent, load) {
      const lang = specifier.match(/kanji_(en|tr|ko|mn)\.json/)?.[1];
      const gate = gates.get(lang)?.shift();
      if (gate) await gate.promise;
      return load();
    },
  });
  const dictionary = await harness.load('src/services/kanjiDictService.js');
  const modal = await harness.load('src/components/KanjiModal.js');
  const ko = JSON.parse(fs.readFileSync(path.join(root, 'src/data/locales/kanji_ko.json'))).日;
  const mn = JSON.parse(fs.readFileSync(path.join(root, 'src/data/locales/kanji_mn.json'))).日;
  const tr = JSON.parse(fs.readFileSync(path.join(root, 'src/data/locales/kanji_tr.json'))).日;
  const en = JSON.parse(fs.readFileSync(path.join(root, 'src/data/locales/kanji_en.json'))).日;
  const mainSource = fs.readFileSync(path.join(root, 'src/main.js'), 'utf8');
  const start = mainSource.indexOf('let languageRequestGeneration = 0;');
  const end = mainSource.indexOf('\nfunction updateExampleDeck()', start);
  assert.ok(start >= 0 && end > start);
  let html = '', refreshes = 0;
  const errors = [], writes = [];
  const main = vm.createContext({ currentLang: 'tr', currentView: 'decks', document,
    LANG: { en: {}, tr: {}, ko: {}, mn: {} },
    localStorage: { setItem(...args) { writes.push(args); } },
    KanjiDict: dictionary, KanjiModal: modal, updateExampleDeck() {}, updateStaticTexts() {}, showView() {},
    Analytics: { renderGlobalStats() {} }, showToast(message) { errors.push(message); },
    t: key => `${main.currentLang}:${key}`,
  });
  vm.runInContext(mainSource.slice(start, end), main);
  modal.init({ t: key => `${main.currentLang}:${key}`, icon: () => '',
    openModal(title, content) {
      const previous = nodes.get('kanji-modal-content'); if (previous) previous.isConnected = false;
      nodes.set('kanji-modal-content', { isConnected: true });
      modalBackground.classList.shown = true; html = content; refreshes++;
    },
  });
  const hold = lang => { const gate = deferred(); if (!gates.has(lang)) gates.set(lang, []); gates.get(lang).push(gate); return gate; };
  await dictionary.init('tr'); assert.equal(dictionary.lookup('日').meaning, tr);
  modal.open('日');
  const delayedKo = hold('ko'); const delayed = main.setLang('ko');
  assert.equal(dictionary.lookup('日').meaning, en);
  assert.equal(dictionary.lookup('日').hasNativeMeaning, false);
  assert.equal(dictionary.getLanguageState().loading, true);
  assert.ok(html.includes('ko:kanji_meaning_en') && !html.includes(tr));
  delayedKo.resolve(); assert.equal(await delayed, true);
  assert.equal(dictionary.lookup('日').meaning, ko); assert.ok(html.includes('ko:meaning_label') && html.includes(ko));

  await main.setLang('tr');
  const older = hold('ko'), newer = hold('mn');
  const oldRequest = main.setLang('ko'), newRequest = main.setLang('mn');
  newer.resolve(); assert.equal(await newRequest, true);
  const newestHtml = html; const newestRefreshes = refreshes;
  older.resolve(); assert.equal(await oldRequest, false);
  assert.equal(dictionary.lookup('日').meaning, mn); assert.equal(html, newestHtml); assert.equal(refreshes, newestRefreshes);

  const staleError = hold('ko'); const failedOld = main.setLang('ko');
  assert.equal(await main.setLang('mn'), true);
  staleError.reject(new Error('stale failure')); assert.equal(await failedOld, false);
  assert.equal(dictionary.lookup('日').meaning, mn); assert.equal(errors.length, 0);
  assert.equal(dictionary.getLanguageState().loading, false);
  const latestFailure = hold('ko'); const failedLatest = main.setLang('ko');
  latestFailure.reject(new Error('latest failure')); assert.equal(await failedLatest, false);
  assert.equal(dictionary.lookup('日').meaning, en); assert.equal(errors.length, 1);
  assert.ok(html.includes('ko:kanji_meaning_en'));
  assert.equal(await main.setLang('ko'), true); assert.equal(dictionary.lookup('日').meaning, ko);

  const rapid = [];
  for (const lang of ['tr', 'ko', 'mn', 'ko', 'tr', 'mn']) {
    const gate = hold(lang); rapid.push({ gate, request: main.setLang(lang) });
  }
  for (const request of rapid.slice().reverse()) { request.gate.resolve(); await Promise.resolve(); }
  const results = await Promise.all(rapid.map(request => request.request));
  assert.deepEqual(results, [false, false, false, false, false, true]);
  assert.equal(dictionary.lookup('日').meaning, mn); assert.ok(html.includes('mn:meaning_label') && html.includes(mn));
  for (const [lang, meaning] of [['tr', tr], ['ko', ko], ['mn', mn], ['en', en]]) {
    assert.equal(await main.setLang(lang), true); assert.equal(dictionary.lookup('日').meaning, meaning);
  }
  const closedGate = hold('ko'), closed = main.setLang('ko');
  modalBackground.classList.shown = false; const closedCount = refreshes;
  closedGate.resolve(); await closed; assert.equal(refreshes, closedCount); assert.equal(modalBackground.classList.shown, false);
  modal.open('日');
  const replacedGate = hold('mn'), replaced = main.setLang('mn');
  nodes.get('kanji-modal-content').isConnected = false; nodes.delete('kanji-modal-content');
  const replacedCount = refreshes; replacedGate.resolve(); await replaced; assert.equal(refreshes, replacedCount);
  await dictionary.setLanguage('tr');
  const nativePack = JSON.parse(fs.readFileSync(path.join(root, 'src/data/locales/kanji_tr.json')));
  const english = JSON.parse(fs.readFileSync(path.join(root, 'src/data/locales/kanji_en.json')));
  const missing = Object.keys(english).find(key => !nativePack[key] && english[key]);
  assert.ok(missing); assert.equal(dictionary.lookup(missing).meaning, english[missing]); assert.equal(dictionary.lookup(missing).hasNativeMeaning, false);
  console.log('PASS language: awaited init, delayed immediate fallback, reversed completion, stale success/failure, latest failure/retry, visible modal refresh, closed/replaced modal guards, rapid and sequential switching, missing-native English fallback');
}
run().catch(error => { console.error(error); process.exitCode = 1; });
