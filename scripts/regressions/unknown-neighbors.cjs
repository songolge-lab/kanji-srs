const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { gzipSync, gunzipSync } = require('fflate');
const { root, createHarness, dictionaryTransport, deferred } = require('./harness.cjs');

const plain = value => JSON.parse(JSON.stringify(value));
const readings = html => Array.from(html.matchAll(/<rt>(.*?)<\/rt>/gs), match => match[1]);
const settle = async () => { for (let index = 0; index < 3; index++) await new Promise(setImmediate); };

async function run() {
  const branch = process.argv[2] || 'web';
  const transport = dictionaryTransport(branch), storage = new Map(), nodes = new Map();
  const node = id => {
    if (!nodes.has(id)) nodes.set(id, { value: '', dataset: {}, innerHTML: '', style: {}, isConnected: true,
      classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
      querySelector() { return null; }, querySelectorAll() { return []; }, addEventListener() {} });
    return nodes.get(id);
  };
  const document = { addEventListener() {}, getElementById: id => nodes.get(id) || null,
    querySelector() { return null; }, querySelectorAll() { return []; }, body: {} };
  let loadGate = null;
  const globals = { ...transport.globals, document,
    localStorage: { getItem: key => storage.get(key) || null, setItem: (key, value) => storage.set(key, value) } };
  if (branch === 'ipc') {
    globals.window = { ...transport.globals.window, electronAPI: { readDict: async name => {
      if (loadGate) await loadGate.promise;
      return transport.globals.window.electronAPI.readDict(name);
    } } };
  } else {
    globals.fetch = async (...args) => {
      if (loadGate) await loadGate.promise;
      return transport.globals.fetch(...args);
    };
  }
  const harness = createHarness(globals, { append: {
    [path.join(root, 'src/components/DeckList.js')]: '\nexport { renderExampleEditor };',
    [path.join(root, 'src/components/CardView.js')]: '\nexport function setNeighborFixture(card, direction, back) { studyQueue=[card]; studyCardIndex=0; studyShowingBack=back; studyDirection=direction; reviewQueue=[card]; reviewIndex=0; }',
  } });
  const parser = await harness.load('src/utils/furiganaParser.js');
  const dataUtil = await harness.load('src/utils/exampleFurigana.js');
  const utils = await harness.load('src/utils.js');
  const view = await harness.load('src/components/CardView.js');
  const deckUI = await harness.load('src/components/DeckList.js');
  const store = await harness.load('src/store/appState.js');
  const srs = await harness.load('src/core/srsEngine.js');
  const makeLegacy = id => ({ id, kanji: 'かな', furigana: '', meaningTr: 'fixture',
    exampleJp: '𠮷野家', exampleTr: 'example', exampleFuriganaMap: { 野家: 'のや' },
    exampleFurigana: null, exampleFuriganaStatus: 'pending', unknownField: { keep: true },
    srs: srs.createSrsData(2.5), srsReverse: srs.createSrsData(2.5) });
  const state = store.createInitialState(), legacy = makeLegacy('legacy');
  state.decks = [{ id: 'deck', name: 'fixture', cards: [legacy] }];
  store.migrateDecks(state.decks, new Set());
  assert.equal(legacy.exampleFurigana, null);
  let saves = 0;
  const app = { state, currentDeckId: 'deck', currentView: 'study', cfg: () => state.settings,
    t: key => key, icon: () => '', findDeck: id => state.decks.find(deck => deck.id === id),
    save() { saves++; store.saveState(state); }, openModal(title, html) { app.modal = html; } };
  view.init(app); deckUI.init(app);

  // Execute the exact production backfill function, without booting the app.
  const mainSource = fs.readFileSync(path.join(root, 'src/main.js'), 'utf8');
  const start = mainSource.indexOf('async function backfillFuriganaMaps()');
  const end = mainSource.indexOf('\nasync function boot()', start);
  assert.ok(start >= 0 && end > start);
  let bootSaves = 0, generationGate = null, bootGenerations = 0;
  const bootCard = makeLegacy('boot');
  const bootState = { decks: [{ cards: [bootCard] }] };
  const boot = vm.createContext({ state: bootState, validExampleFurigana: dataUtil.validExampleFurigana,
    legacyFuriganaMap: dataUtil.legacyFuriganaMap, save() { bootSaves++; },
    generateExampleFurigana: async source => {
      bootGenerations++;
      if (generationGate) await generationGate.promise;
      return parser.generateExampleFurigana(source);
    },
  });
  vm.runInContext(mainSource.slice(start, end), boot);

  // Malformed initialization must never be mistaken for an unreadable source.
  transport.state.replacements['unk_map.dat.gz'] = gzipSync(gunzipSync(transport.assets['unk_map.dat.gz']).slice(0, 4));
  const failed = parser.getTokenizer();
  const failedCallers = Array.from({ length: 12 }, () => parser.getTokenizer());
  failedCallers.forEach(promise => assert.equal(promise, failed));
  view.ensureCardFurigana(legacy);
  const failedBoot = boot.backfillFuriganaMaps();
  const results = await Promise.allSettled(failedCallers);
  assert.ok(results.every(result => result.status === 'rejected'));
  await failedBoot; await settle();
  assert.equal(parser.getTokenizerSync(), null); assert.equal(transport.state.reads.length, 12);
  assert.equal(saves, 0); assert.equal(bootSaves, 0); assert.equal(storage.size, 0);
  for (const card of [legacy, bootCard]) {
    assert.equal(card.exampleFurigana, null); assert.equal(card.exampleFuriganaStatus, 'pending');
    assert.deepEqual(plain(card.exampleFuriganaMap), { 野家: 'のや' });
  }

  transport.state.replacements = {}; loadGate = deferred();
  const retry = parser.getTokenizer(); assert.notEqual(retry, failed);
  const retryCallers = Array.from({ length: 12 }, () => parser.getTokenizer());
  retryCallers.forEach(promise => assert.equal(promise, retry));
  const edited = makeLegacy('edited'), deleted = makeLegacy('deleted'), replaced = makeLegacy('replaced');
  state.decks[0].cards.push(edited, deleted, replaced);
  const lazyDone = deferred(); view.ensureCardFurigana(legacy, lazyDone.resolve);
  for (const card of [edited, deleted, replaced]) view.ensureCardFurigana(card);
  const retryBoot = boot.backfillFuriganaMaps();
  await settle(); // every transport call is held while the source/card changes
  edited.exampleJp = '日本語。';
  state.decks[0].cards.splice(state.decks[0].cards.indexOf(deleted), 1);
  const replacement = { ...replaced }; state.decks[0].cards[state.decks[0].cards.indexOf(replaced)] = replacement;
  assert.equal(parser.getTokenizerSync(), null); assert.equal(transport.state.reads.length, 12);
  loadGate.resolve(); loadGate = null;
  await Promise.all(retryCallers); await lazyDone.promise; await retryBoot; await settle();
  assert.equal(transport.state.reads.length, 24); assert.equal(saves, 1); assert.equal(bootSaves, 1);
  const expectedNeighbor = { version: 1, source: '𠮷野家',
    spans: [{ start: 2, end: 4, surface: '野家', reading: 'のや' }] };
  for (const card of [legacy, bootCard]) assert.deepEqual(plain(card.exampleFurigana), expectedNeighbor);
  for (const card of [edited, deleted, replaced, replacement]) assert.equal(card.exampleFurigana, null);
  assert.equal(legacy.exampleFuriganaStatus, 'ready');
  assert.deepEqual(plain(legacy.exampleFuriganaMap), { 野家: 'のや' });
  view.ensureCardFurigana(legacy); await boot.backfillFuriganaMaps(); await settle();
  assert.equal(saves, 1); assert.equal(bootSaves, 1); assert.equal(bootGenerations, 2);
  assert.equal(transport.state.reads.length, 24);
  const restored = store.loadState().decks[0].cards.find(card => card.id === legacy.id);
  assert.deepEqual(plain(restored.exampleFurigana), expectedNeighbor);
  assert.deepEqual(readings(utils.highlightKanji(restored.exampleJp, '', restored.exampleFuriganaMap, restored.exampleFurigana)), ['のや']);
  assert.equal(JSON.stringify(restored.srs), JSON.stringify(legacy.srs));
  assert.equal(restored.unknownField.keep, true);

  // Backfill's own delayed generation guards, independently of load/retry.
  for (const change of ['edit', 'delete', 'replace']) {
    const old = makeLegacy('guard-' + change); boot.state = { decks: [{ cards: [old] }] };
    generationGate = deferred(); const backfill = boot.backfillFuriganaMaps();
    let current = old;
    if (change === 'edit') old.exampleJp = '日𠮷日。';
    if (change === 'delete') boot.state.decks[0].cards = [];
    if (change === 'replace') { current = { ...old }; boot.state.decks[0].cards = [current]; }
    const count = bootSaves; generationGate.resolve(); generationGate = null;
    await backfill; assert.equal(bootSaves, count);
    assert.equal(old.exampleFurigana, null); assert.equal(current.exampleFurigana, null);
    if (change !== 'delete') {
      await boot.backfillFuriganaMaps(); assert.equal(bootSaves, count + 1);
      assert.equal(current.exampleFurigana.source, current.exampleJp);
      assert.ok(current.exampleFurigana.spans.length);
    }
  }

  // Literal expectations come from real installed dictionary output, not a
  // mocked reading provider or the generator's own segment-merging algorithm.
  const fixtures = [
    ['𠮷野家', [[2, 4, '野家', 'のや']]],
    ['日𠮷日。', [[0, 1, '日', 'にち'], [3, 4, '日', 'ひ']]],
    ['𠮷日、日。', [[2, 3, '日', 'にち'], [4, 5, '日', 'ひ']]],
    ['生𠮷食べる。', [[0, 1, '生', 'なま'], [3, 4, '食', 'た']]],
    ['𠮷、野家。', [[3, 5, '野家', 'のや']]],
    ['日、𠮷、日。', [[0, 1, '日', 'にち'], [5, 6, '日', 'ひ']]],
    [' \t𠮷野家 \n', [[4, 6, '野家', 'のや']]],
    ['𠮷', []],
  ];
  const tokenizer = parser.getTokenizerSync();
  assert.deepEqual(plain(tokenizer.tokenize('𠮷野家').map(token => [token.surface_form, token.reading || null, token.word_position])),
    [['𠮷', null, 1], ['野家', 'ノヤ', 2]]);
  node('study-screen'); node('review-screen'); node('form-preview');
  for (const [source, expected] of fixtures) {
    const data = await parser.generateExampleFurigana(source);
    assert.equal(dataUtil.validExampleFurigana(source, data), true);
    assert.deepEqual(plain(data.spans.map(span => [span.start, span.end, span.surface, span.reading])), expected);
    const expectedReadings = expected.map(span => span[3]);
    assert.ok(data.spans.every(span => !span.surface.includes('𠮷') && source.slice(span.start, span.end) === span.surface));
    const map = dataUtil.legacyFuriganaMap(data), html = utils.highlightKanji(source, '', map, data);
    assert.deepEqual(readings(html), expectedReadings); assert.ok(html.includes('𠮷'));
    assert.deepEqual(readings(deckUI.renderExampleEditor(source, map, data)), expectedReadings);
    const card = { ...makeLegacy('view-' + state.decks[0].cards.length), exampleJp: source,
      exampleFurigana: data, exampleFuriganaMap: map };
    state.decks[0].cards.push(card);
    for (const direction of ['normal', 'reverse']) for (const back of [false, true]) {
      const current = direction === 'reverse' ? Object.create(card, { srs: { value: card.srsReverse, enumerable: true } }) : card;
      view.setNeighborFixture(current, direction, back); view.renderStudy();
      assert.deepEqual(readings(node('study-screen').innerHTML), expectedReadings);
    }
    view.renderReview(); assert.deepEqual(readings(node('review-screen').innerHTML), expectedReadings);
    deckUI.showCardPreview('deck', card.id); assert.deepEqual(readings(app.modal), expectedReadings);
    node('add-kanji').value = 'かな'; node('add-meaning').value = 'fixture';
    const input = node('add-example-jp'); input.value = source;
    // Form assist and preview intentionally bind to trimmed form input.
    const formData = source === source.trim() ? data : await parser.generateExampleFurigana(source.trim());
    input.dataset = { furiganaMap: JSON.stringify(dataUtil.legacyFuriganaMap(formData)), exampleFurigana: JSON.stringify(formData) };
    view.updatePreview('add-', 'form-preview');
    assert.deepEqual(readings(node('form-preview').innerHTML), expectedReadings);
  }
  await settle(); assert.equal(transport.state.reads.length, 24);
  console.log(`PASS unknown neighbors ${branch}: real UTF-16 spans/readings, literal unknown/empty control, legacy persistence/no repeat generation, lazy+boot stale guards, all study faces/review/preview/editor, malformed rejection -> concurrent recovery -> occurrence regeneration`);
}
run().catch(error => { console.error(error); process.exitCode = 1; });
