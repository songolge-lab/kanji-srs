const fs = require('fs');
const path = require('path');

const vocabularySource = require('./sources/vocabulary.js');
const kanjiSource = require('./sources/kanji.js');
const grammarSource = require('./sources/grammar.js');
const sentenceSource = require('./sources/sentences.js');
const { generateTests } = require('./sources/tests.js');

const PACK_ID = 'jlpt-n4-en-full-v1';
const LEVEL = 'N4';
const LANGUAGE = 'en';
const VERSION = '1.0.0';

const builderDir = __dirname;
const outputDir = path.resolve(builderDir, '..', '..');
const releasePath = path.join(outputDir, 'jlpt_n4_en_full_v1.json');
const auditPath = path.join(outputDir, 'jlpt_n4_en_full_v1_audit.md');
const allowedWritePaths = new Set([releasePath, auditPath]);

const TARGETS = {
  vocabulary: 900,
  kanji: 180,
  grammar: 160,
  sentence: 300,
  totalCards: 1540,
  tests: 28,
  questions: 400,
  mcq: 170,
  tf: 100,
  fb: 130,
  tfTrue: 50,
  tfFalse: 50,
};

function pad(num, width) {
  return String(num).padStart(width, '0');
}

function writeAllowed(filePath, content) {
  const resolved = path.resolve(filePath);
  if (!allowedWritePaths.has(resolved)) {
    throw new Error(`Refusing to write outside approved N4 release outputs: ${resolved}`);
  }
  fs.writeFileSync(resolved, content, 'utf8');
}

function normalizeTags(tags, required) {
  const out = [];
  for (const tag of [required, ...(Array.isArray(tags) ? tags : [])]) {
    if (typeof tag !== 'string') continue;
    const clean = tag.trim();
    if (clean && !out.includes(clean)) out.push(clean);
  }
  return out;
}

function makeCards(source, type, idPrefix) {
  return source.map((item, index) => {
    const base = {
      id: `n4-${idPrefix}-${pad(index + 1, 4)}`,
      type,
      level: LEVEL,
      category: type,
      front: item.front,
      back: item.back,
      tags: normalizeTags(item.tags, type),
    };
    const examples = {
      exampleJp: item.exampleJp,
      exampleTranslation: item.exampleTranslation,
    };
    return { ...base, ...examples };
  });
}

function buildDeck(idSuffix, title, type, cards) {
  return {
    id: `${PACK_ID}-deck-${idSuffix}`,
    title,
    type,
    level: LEVEL,
    category: title.replace(/^N4\s+/, ''),
    description: `${title} cards for the JLPT N4 English Full Pack.`,
    cards,
  };
}

function flattenCards(pack) {
  return pack.decks.flatMap(deck => deck.cards);
}

function countQuestions(tests) {
  return tests.flatMap(test => test.questions).reduce((acc, q) => {
    acc.total++;
    acc[q.type] = (acc[q.type] || 0) + 1;
    if (q.type === 'TRUE_FALSE') {
      if (q.correctValue === true) acc.tfTrue++;
      if (q.correctValue === false) acc.tfFalse++;
    }
    return acc;
  }, { total: 0, MULTIPLE_CHOICE: 0, TRUE_FALSE: 0, FILL_BLANK: 0, tfTrue: 0, tfFalse: 0 });
}

function assertUnique(items, getKey, label) {
  const seen = new Set();
  for (const item of items) {
    const key = getKey(item);
    if (seen.has(key)) throw new Error(`Duplicate ${label}: ${key}`);
    seen.add(key);
  }
}

function assertCounts(pack) {
  const cards = flattenCards(pack);
  const byType = cards.reduce((acc, card) => {
    acc[card.type] = (acc[card.type] || 0) + 1;
    return acc;
  }, {});
  const q = countQuestions(pack.tests);
  const failures = [];
  if (byType.vocabulary !== TARGETS.vocabulary) failures.push(`vocabulary ${byType.vocabulary}`);
  if (byType.kanji !== TARGETS.kanji) failures.push(`kanji ${byType.kanji}`);
  if (byType.grammar !== TARGETS.grammar) failures.push(`grammar ${byType.grammar}`);
  if (byType.sentence !== TARGETS.sentence) failures.push(`sentence ${byType.sentence}`);
  if (cards.length !== TARGETS.totalCards) failures.push(`total cards ${cards.length}`);
  if (pack.tests.length !== TARGETS.tests) failures.push(`tests ${pack.tests.length}`);
  if (q.total !== TARGETS.questions) failures.push(`questions ${q.total}`);
  if (q.MULTIPLE_CHOICE !== TARGETS.mcq) failures.push(`MCQ ${q.MULTIPLE_CHOICE}`);
  if (q.TRUE_FALSE !== TARGETS.tf) failures.push(`TF ${q.TRUE_FALSE}`);
  if (q.FILL_BLANK !== TARGETS.fb) failures.push(`FB ${q.FILL_BLANK}`);
  if (q.tfTrue !== TARGETS.tfTrue || q.tfFalse !== TARGETS.tfFalse) failures.push(`TF balance ${q.tfTrue}/${q.tfFalse}`);
  if (failures.length) throw new Error(`N4 pack count mismatch: ${failures.join(', ')}`);
}

function generatePack() {
  assertUnique(vocabularySource, item => item.front, 'vocabulary source front');
  assertUnique(kanjiSource, item => item.front, 'kanji source front');
  assertUnique(grammarSource, item => item.front, 'grammar source front');
  assertUnique(sentenceSource, item => item.front, 'sentence source front');

  const vocabCards = makeCards(vocabularySource, 'vocabulary', 'vocab');
  const kanjiCards = makeCards(kanjiSource, 'kanji', 'kanji');
  const grammarCards = makeCards(grammarSource, 'grammar', 'grammar');
  const sentenceCards = sentenceSource.map((item, index) => ({
    id: `n4-sentence-${pad(index + 1, 4)}`,
    type: 'sentence',
    level: LEVEL,
    category: 'sentence',
    front: item.front,
    back: item.back,
    tags: normalizeTags(item.tags, 'sentence'),
  }));

  const tests = generateTests(vocabCards, kanjiCards, grammarCards, sentenceCards, PACK_ID);
  const pack = {
    packId: PACK_ID,
    schemaVersion: 1,
    version: VERSION,
    level: LEVEL,
    language: LANGUAGE,
    title: 'JLPT N4 English Full Pack',
    description: 'A full JLPT N4 study pack with vocabulary, kanji, grammar, sentences, and practice tests.',
    source: 'curated',
    license: 'Original educational content; no copied JLPT exam questions.',
    notes: 'Furigana, readings, romaji, onyomi/kunyomi, and kanji breakdowns are intentionally omitted for app-side generation.',
    decks: [
      buildDeck('vocabulary', 'N4 Vocabulary', 'vocabulary', vocabCards),
      buildDeck('kanji', 'N4 Kanji', 'kanji', kanjiCards),
      buildDeck('grammar', 'N4 Grammar', 'grammar', grammarCards),
      buildDeck('sentences', 'N4 Sentences', 'sentence', sentenceCards),
    ],
    tests,
  };
  assertCounts(pack);
  return pack;
}

function serializePack(pack) {
  return JSON.stringify(pack, null, 2) + '\n';
}

function summarize(pack) {
  const cards = flattenCards(pack);
  const cardCounts = cards.reduce((acc, card) => {
    acc[card.type] = (acc[card.type] || 0) + 1;
    return acc;
  }, {});
  const q = countQuestions(pack.tests);
  return { cards, cardCounts, q };
}

function renderAudit(pack, result = {}) {
  const { cardCounts, q } = summarize(pack);
  const validation = result.validation || 'Pending: run validate.js after building.';
  const sha = result.sha || 'Pending: run rebuild SHA stability check.';
  const vocabCleanup = result.vocabCleanup || 'Pending: rebuild and run validate.js.';
  const punctuation = result.punctuation || 'Pending: rebuild and run validate.js.';
  const weakExamples = result.weakExamples || 'Pending: final content validation.';
  const publishable = result.publishable === true ? 'Yes' : 'No';
  return `# JLPT N4 English Full Pack (v1) Audit

## Counts
- Vocabulary cards: ${cardCounts.vocabulary || 0} / ${TARGETS.vocabulary}
- Kanji cards: ${cardCounts.kanji || 0} / ${TARGETS.kanji}
- Grammar cards: ${cardCounts.grammar || 0} / ${TARGETS.grammar}
- Sentence cards: ${cardCounts.sentence || 0} / ${TARGETS.sentence}
- Total cards: ${Object.values(cardCounts).reduce((sum, value) => sum + value, 0)} / ${TARGETS.totalCards}
- Test objects: ${pack.tests.length} / ${TARGETS.tests}
- Test questions: ${q.total} / ${TARGETS.questions}
- MULTIPLE_CHOICE: ${q.MULTIPLE_CHOICE || 0} / ${TARGETS.mcq}
- TRUE_FALSE: ${q.TRUE_FALSE || 0} / ${TARGETS.tf}
- FILL_BLANK: ${q.FILL_BLANK || 0} / ${TARGETS.fb}
- TRUE_FALSE balance: ${q.tfTrue} true / ${q.tfFalse} false

## Validation
- Validator result: ${validation}
- Vocabulary example cleanup: ${vocabCleanup}
- Double punctuation check: ${punctuation}
- Remaining suspected weak examples: ${weakExamples}
- Rebuild SHA stability: ${sha}
- Publishable: ${publishable}

## Quality Notes
- Source content is deterministic and original educational material.
- Vocabulary examples use exact curated examples for verbs and awkward-prone nouns, with semantic templates retained only for lower-risk non-verbs; the old meta-study/example-note layer is not used.
- Cards intentionally omit furigana, reading, romaji, onyomi, kunyomi, and kanji breakdown fields.
- MCQ distractors are selected deterministically from real pack answers in the same card category.
- Fill-blank questions use explicit curated specs in \`sources/tests.js\`.
- No Supabase upload was performed.

## Suspected Too-Advanced / Boundary Items
- Passive, causative, and basic honorific cards are included as N4-boundary review items. They should receive human review before publication if the pack is held to a conservative N4-only grammar boundary.
- A small number of vocabulary items may overlap with N5 because they are useful support words in N4 examples; the pack is still primarily N4-oriented.

## Known Risks / Compromises
- Non-verb vocabulary examples still include deterministic semantic templates; they are original and validator-checked, but a human Japanese review is still recommended for broad public distribution.
- The release is not marked publishable unless validation passes and SHA stability is confirmed.
`;
}

function writePackAndAudit(result = {}) {
  const pack = generatePack();
  writeAllowed(releasePath, serializePack(pack));
  writeAllowed(auditPath, renderAudit(pack, result));
  return pack;
}

if (require.main === module) {
  const pack = writePackAndAudit();
  const { cardCounts, q } = summarize(pack);
  console.log(`Wrote ${releasePath}`);
  console.log(`Vocabulary: ${cardCounts.vocabulary}`);
  console.log(`Kanji: ${cardCounts.kanji}`);
  console.log(`Grammar: ${cardCounts.grammar}`);
  console.log(`Sentences: ${cardCounts.sentence}`);
  console.log(`Tests: ${pack.tests.length}`);
  console.log(`Questions: ${q.total} (${q.MULTIPLE_CHOICE} MCQ, ${q.TRUE_FALSE} TF, ${q.FILL_BLANK} FB)`);
  console.log(`TRUE_FALSE balance: ${q.tfTrue} true / ${q.tfFalse} false`);
}

module.exports = {
  PACK_ID,
  TARGETS,
  auditPath,
  countQuestions,
  flattenCards,
  generatePack,
  releasePath,
  renderAudit,
  serializePack,
  writePackAndAudit,
};
