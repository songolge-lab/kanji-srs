const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { root, createHarness, dictionaryTransport, deferred } = require('./harness.cjs');
const plain = value => JSON.parse(JSON.stringify(value));
const readings = html => Array.from(html.matchAll(/<rt>(.*?)<\/rt>/g), match => match[1]);

async function run() {
  const transport = dictionaryTransport();
  const nodes = new Map();
  const node = id => {
    if (!nodes.has(id)) nodes.set(id, { value: '', dataset: {}, innerHTML: '', style: {},
      classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
      querySelector() { return null; }, querySelectorAll() { return []; }, addEventListener() {} });
    return nodes.get(id);
  };
  const document = { addEventListener() {}, getElementById: id => nodes.get(id) || null,
    querySelector() { return null; }, querySelectorAll() { return []; },
    body: { appendChild() {}, removeChild() {} }, createElement: () => ({ click() {} }) };
  let exported, published, remote;
  const globals = { ...transport.globals, document,
    URL: { createObjectURL(blob) { exported = blob; return 'blob:fixture'; }, revokeObjectURL() {} },
    FileReader: class { readAsText(file) { this.onload({ target: { result: file.text } }); } },
    fetch: async (url, options) => {
      if (url.startsWith('/nested/dict/')) return transport.globals.fetch(url);
      if (url.includes('community_decks') && options?.method === 'POST') {
        published = JSON.parse(options.body); return { ok: true, json: async () => [published] };
      }
      if (url.includes('community_decks')) return { ok: true, json: async () => [remote] };
      if (url.includes('app_state')) {
        if (options?.method === 'POST') remote = JSON.parse(options.body);
        return { ok: true, json: async () => [remote] };
      }
      if (url.includes('increment_download_count')) return { ok: true, json: async () => [] };
      throw new Error('Unexpected external request');
    },
  };
  const harness = createHarness(globals, { append: {
    [path.join(root, 'src/components/DeckList.js')]: '\nexport { renderExampleEditor, exampleInputData };',
    [path.join(root, 'src/components/CardView.js')]: '\nexport function setFixture(card) { studyQueue = [card]; studyCardIndex = 0; studyShowingBack = false; reviewQueue = [card]; reviewIndex = 0; }',
    [path.join(root, 'src/services/studyPackService.js')]: '\nexport { makeImportedCard };',
  } });
  const parser = await harness.load('src/utils/furiganaParser.js');
  const dataUtil = await harness.load('src/utils/exampleFurigana.js');
  const utils = await harness.load('src/utils.js');
  const deckUI = await harness.load('src/components/DeckList.js');
  await parser.getTokenizer();
  const fixtures = [
    ['生、生きる。', ['なま', 'い']], ['生、生。', ['なま', 'なま']],
    ['生、生じる、生きる。', ['なま', 'しょう', 'い']],
    ['生。生きる。', ['なま', 'い']], ['一日、一日中。', ['いちにち', 'いちにちちゅう']],
    ['毎日、毎日。', ['まいにち', 'まいにち']],
  ];
  for (const [sentence, expected] of fixtures) {
    const data = await parser.generateExampleFurigana(sentence);
    assert.equal(dataUtil.validExampleFurigana(sentence, data), true);
    const map = dataUtil.legacyFuriganaMap(data);
    assert.deepEqual(readings(utils.highlightKanji(sentence, '', map, data)), expected);
    assert.deepEqual(readings(deckUI.renderExampleEditor(sentence, map, data)), expected);
  }
  const tokenizer = parser.getTokenizerSync();
  const tokenize = tokenizer.tokenize;
  tokenizer.tokenize = function (source) {
    const tokens = tokenize.call(this, source);
    if (source === '生物、生物、生物。') tokens.filter(token => token.surface_form === '生物')[1].reading = 'ナマモノ';
    return tokens;
  };
  const compound = await parser.generateExampleFurigana('生物、生物、生物。');
  assert.deepEqual(plain(compound.spans.map(span => span.reading)), ['せいぶつ', 'なまもの', 'せいぶつ']);
  assert.deepEqual(readings(utils.highlightKanji(compound.source, '', dataUtil.legacyFuriganaMap(compound), compound)), ['せいぶつ', 'なまもの', 'せいぶつ']);
  tokenizer.tokenize = tokenize;
  const source = '生、生きる。';
  const data = await parser.generateExampleFurigana(source);
  const map = { 生: 'い' };
  assert.deepEqual(readings(utils.highlightKanji(source, '', map)), ['い', 'い']); // legacy compatibility
  assert.deepEqual(readings(utils.highlightKanji('一日、一日中。', '', { 一日: 'いちにち', 一日中: 'いちにちちゅう' })), ['いちにち', 'いちにちちゅう']);
  assert.equal(dataUtil.validExampleFurigana(source + '！', data), false);
  assert.deepEqual(readings(utils.highlightKanji(source + '！', '', map, data)), []);
  for (const mutate of [copy => copy.spans[1].start = 0, copy => copy.spans[0].end = 999,
    copy => copy.spans[0].start = -1, copy => copy.spans[0].surface = '日',
    copy => copy.spans[0].reading = null, copy => copy.spans.reverse()]) {
    const invalid = plain(data); mutate(invalid); assert.equal(dataUtil.validExampleFurigana(source, invalid), false);
  }
  const escaped = { version: 1, source: '生<img>。', spans: [{ start: 0, end: 1, surface: '生', reading: '<x>"&' }] };
  const escapedHtml = utils.highlightKanji(escaped.source, '', {}, escaped);
  assert.ok(escapedHtml.includes('&lt;img&gt;') && escapedHtml.includes('&lt;x&gt;&quot;&amp;'));
  assert.ok(!escapedHtml.includes('<img>'));
  const whitespace = await parser.generateExampleFurigana('  生、生きる。 ');
  assert.equal(whitespace.spans[0].start, 2);
  assert.equal(dataUtil.validExampleFurigana(whitespace.source, whitespace), true);

  const store = await harness.load('src/store/appState.js');
  const srs = await harness.load('src/core/srsEngine.js');
  const makeCardSource = fs.readFileSync(path.join(root, 'src/main.js'), 'utf8').match(/^function makeCard\(.*$/m)[0];
  const factoryContext = vm.createContext({ uid: () => 'fixture', cfg: () => store.CONFIG,
    createSrsData: srs.createSrsData, copyExampleFurigana: dataUtil.copyExampleFurigana });
  const makeCard = vm.runInContext(makeCardSource + '; makeCard', factoryContext);
  const card = makeCard('生', 'なま', 'raw', source, 'example', map, data);
  const app = { state: { decks: [{ id: 'deck', cards: [card] }], stats: {}, settings: store.CONFIG },
    currentDeckId: 'deck', currentView: 'study', t: key => key, icon: () => '', cfg: () => store.CONFIG,
    findDeck: id => app.state.decks.find(deck => deck.id === id), save() {}, showToast() {},
    renderDeckList() {}, renderGlobalStats() {}, makeCard, closeModal() {},
    createDeck(title) { const deck = { id: 'download', name: title, cards: [] }; app.state.decks.push(deck); return deck; },
    openModal(title, html) { app.modal = html; },
    migrateAndSave() { store.migrateDecks(app.state.decks, new Set()); },
  };
  const originalSrs = card.srs;
  const legacy = { id: 'legacy', kanji: '生', furigana: 'なま', exampleJp: source, exampleFuriganaMap: map, srs: originalSrs };
  store.migrateDecks([{ cards: [legacy, card] }], new Set());
  assert.equal(legacy.exampleFurigana, null); assert.equal(legacy.srs, originalSrs);
  const migrated = JSON.stringify(card); store.migrateDecks([{ cards: [card] }], new Set()); assert.equal(JSON.stringify(card), migrated);
  deckUI.init(app); deckUI.showCardPreviewModal(card);
  assert.deepEqual(readings(app.modal).slice(-2), ['なま', 'い']);
  const view = await harness.load('src/components/CardView.js'); view.init(app); view.setFixture(card);
  node('study-screen'); node('review-screen'); view.renderStudy(); view.renderReview();
  for (const id of ['study-screen', 'review-screen']) assert.deepEqual(readings(node(id).innerHTML).slice(-2), ['なま', 'い']);
  node('preview'); node('add-kanji').value = '生'; node('add-meaning').value = 'raw';
  const exampleInput = node('add-example-jp'); exampleInput.value = source;
  exampleInput.dataset = { furiganaMap: JSON.stringify(map), exampleFurigana: JSON.stringify(data), furiganaSource: source };
  view.updatePreview('add-', 'preview'); assert.deepEqual(readings(node('preview').innerHTML).slice(-2), ['なま', 'い']);
  assert.deepEqual(plain((await deckUI.exampleInputData(exampleInput, source)).data), plain(data));
  const backfill = deferred(); app.state.decks[0].cards.push(legacy);
  view.ensureCardFurigana(legacy, backfill.resolve); await backfill.promise;
  assert.deepEqual(plain(legacy.exampleFurigana), plain(data)); assert.deepEqual(legacy.exampleFuriganaMap, map);

  const settings = await harness.load('src/components/Settings.js'); settings.init(app); settings.exportData();
  const backup = await exported.text(); settings.importData({ text: backup });
  assert.deepEqual(plain(app.state.decks[0].cards[0].exampleFurigana), plain(data));
  const db = await harness.load('src/services/dbService.js');
  await db.cloudPush('fixture', app.state); const pulled = await db.cloudPull('fixture');
  assert.deepEqual(plain(pulled.state.decks[0].cards[0].exampleFurigana), plain(data));
  await db.publishDeckToCommunity({ syncCode: 'fixture', cards: [card] }, 'fixture', '', []);
  assert.deepEqual(published.deck_data.cards[0].exampleFurigana, plain(data));
  assert.ok(!('srs' in published.deck_data.cards[0]));
  remote = published;
  const community = await harness.load('src/components/CommunityHub.js'); community.init(app); await community.downloadDeck('fixture');
  assert.deepEqual(plain(app.state.decks.at(-1).cards[0].exampleFurigana), plain(data));
  const pack = await harness.load('src/services/studyPackService.js');
  const imported = pack.makeImportedCard(app, { front: '生', back: 'raw', exampleJp: source, exampleFuriganaMap: map, exampleFurigana: data }, {});
  assert.deepEqual(plain(imported.exampleFurigana), plain(data));
  assert.equal(pack.makeImportedCard(app, { front: '生', back: 'raw', exampleJp: source }, {}).exampleFuriganaStatus, 'pending');
  console.log('PASS occurrences: natural repeats, compound fixture, overlap, stale/malformed, escaping, whitespace, legacy, migration, creation, editor, study/review/previews, lazy generation, backup/import, community, pack, full-state sync');
}
run().catch(error => { console.error(error); process.exitCode = 1; });
