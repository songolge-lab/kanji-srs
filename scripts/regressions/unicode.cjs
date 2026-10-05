const assert = require('node:assert/strict');
const path = require('node:path');
const { root, createHarness, dictionaryTransport } = require('./harness.cjs');
const plain = value => JSON.parse(JSON.stringify(value));
function noSplitSurrogates(text) {
  for (const character of text) assert.ok(character.length === 2 || !/[\uD800-\uDFFF]/.test(character));
}

async function run() {
  const transport = dictionaryTransport();
  const nodes = { 'search-results-global': { innerHTML: '' }, 'search-counter-global': { innerHTML: '' } };
  let modal = '', chips = [], clicked;
  const document = { addEventListener() {}, getElementById: id => nodes[id] || null,
    querySelectorAll: () => chips };
  const harness = createHarness({ ...transport.globals, document }, { append: {
    [path.join(root, 'src/components/Search.js')]: '\nexport { stateFor, executeSearch };',
    [path.join(root, 'src/components/DeckList.js')]: '\nexport { renderExampleEditor };',
  } });
  const japanese = await harness.load('src/utils/japaneseText.js');
  const kanji = await harness.load('src/utils/kanjiUtils.js');
  const view = await harness.load('src/components/CardView.js');
  const examples = await harness.load('src/utils/exampleFurigana.js');
  const utils = await harness.load('src/utils.js');
  for (const character of ['𠮷', '𠮷野家', '㐀', '日', '々', '﨑', '丽']) assert.equal(japanese.hasKanji(character), true);
  for (const literal of ['あア', '⼀', '〇', '〆', 'ゝ', '\uFE00', '\u{E0100}']) assert.equal(japanese.hasKanji(literal), false);
  const wrapped = kanji.wrapKanji('𠮷野家㐀日々');
  assert.equal(Array.from(wrapped.matchAll(/data-kanji="([^"]+)"/g)).length, 6);
  assert.ok(wrapped.includes('data-kanji="𠮷"')); noSplitSurrogates(wrapped);
  assert.ok(view.smartRuby('𠮷', 'よし').includes('<rt>よし</rt>'));
  assert.ok(view.smartRuby('𠮷', 'よし').includes('data-kanji="𠮷"'));
  assert.ok(view.smartRuby('𠮷野家', 'よしのや').includes('<rt>よしのや</rt>'));
  assert.ok(view.smartRuby('㐀', 'きゅう').includes('<rt>きゅう</rt>'));
  assert.equal(view.kanjiSizeClass('𠮷'.repeat(8)), '');
  const parser = await harness.load('src/utils/furiganaParser.js');
  await parser.getTokenizer();
  assert.notEqual(await parser.generateFurigana('𠮷'), ''); // unknown may keep literal
  assert.notEqual(await parser.generateFurigana('㐀'), '');
  assert.equal(await parser.generateFurigana('食べる'), 'たべる');
  for (const [surface, reading] of [['𠮷', 'よし'], ['𠮷野家', 'よしのや'], ['日', 'ひ'], ['時々', 'ときどき']]) {
    const html = view.smartRuby(surface, reading);
    assert.ok(html.includes(`<rt>${reading}</rt>`)); noSplitSurrogates(html);
  }
  const tokenizer = parser.getTokenizerSync();
  const tokenize = tokenizer.tokenize;
  tokenizer.tokenize = function (source) {
    if (source === '𠮷、𠮷野家。') return [
      { surface_form: '𠮷', reading: 'ヨシ' }, { surface_form: '、' },
      { surface_form: '𠮷野家', reading: 'ヨシノヤ' }, { surface_form: '。' },
    ];
    return tokenize.call(this, source);
  };
  const data = await parser.generateExampleFurigana('𠮷、𠮷野家。');
  assert.deepEqual(plain(data.spans.map(span => [span.start, span.end])), [[0, 2], [3, 7]]);
  const html = utils.highlightKanji(data.source, '', {}, data);
  assert.ok(html.includes('data-word="𠮷"') && html.includes('data-word="𠮷野家"')); noSplitSurrogates(html);
  const editor = await harness.load('src/components/DeckList.js');
  assert.ok(editor.renderExampleEditor(data.source, {}, data).includes('<rt>よし</rt>'));
  const invalid = plain(data); invalid.spans[0].end = 1; invalid.spans[0].surface = data.source.slice(0, 1);
  assert.equal(examples.validExampleFurigana(data.source, invalid), false);
  const legacySplit = examples.exampleSegments('𠮷', { '\uD842': 'wrong' }, null);
  assert.equal(legacySplit[0].surface, '𠮷'); assert.equal(legacySplit[0].reading, null);
  tokenizer.tokenize = tokenize;
  const lexical = await harness.load('src/utils/lexicalGroups.js');
  const tokens = [
    { surface_form: '𠮷', word_position: 1, pos: '名詞', pos_detail_1: '一般' },
    { surface_form: '化', word_position: 2, pos: '名詞', pos_detail_1: '接尾', pos_detail_2: 'サ変接続' },
  ];
  assert.equal(lexical.groupLexicalTokens(tokens).length, 1);
  tokens[1].word_position = 3; assert.equal(lexical.groupLexicalTokens(tokens).length, 2);
  assert.ok(kanji.wrapKanji('𠮷\u{E0100}').includes('\u{E0100}'));
  const app = { state: { settings: {}, decks: [{ id: 'deck', name: 'fixture', cards: [{ id: 'card', kanji: '𠮷野家', furigana: 'よしのや', meaningTr: 'store', exampleJp: '', srs: { state: 'new' } }] }] },
    t: key => key, icon: () => '', currentLang: 'en', openKanjiModal(character) { clicked = character; },
    getDecksInTreeOrder() { return app.state.decks.map(deck => ({ deck })); },
    openModal(title, content) {
      modal = content;
      chips = Array.from(content.matchAll(/data-char="([^"]+)"/g), match => ({ dataset: { char: match[1] }, addEventListener(event, callback) { this.click = callback; } }));
    },
  };
  const word = await harness.load('src/components/WordModal.js'); word.init(app); word.open('𠮷野家', '', 'cached');
  assert.deepEqual(chips.map(chip => chip.dataset.char), ['𠮷', '野', '家']); chips[0].click(); assert.equal(clicked, '𠮷'); noSplitSurrogates(modal);
  const dictionary = await harness.load('src/services/kanjiDictService.js'); assert.equal(dictionary.lookup('𠮷'), null);
  const search = await harness.load('src/components/Search.js'); search.init(app);
  search.stateFor('global').query = '𠮷'; search.stateFor('global').filter = 'kanji'; search.executeSearch('global', 'global', null);
  assert.ok(nodes['search-results-global'].innerHTML.includes('data-card-id="card"'));
  noSplitSurrogates(nodes['search-results-global'].innerHTML);
  console.log('PASS Unicode: supplementary/Extension A/BMP, iteration/compatibility policy, source offsets, surrogate safety, generation, ruby/click targets, editor, lexical adjacency, Word Modal chips, search');
}
run().catch(error => { console.error(error); process.exitCode = 1; });
