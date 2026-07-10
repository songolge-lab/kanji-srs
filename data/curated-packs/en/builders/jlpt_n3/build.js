const fs = require('fs');
const path = require('path');

const {
  getCleanedCardSources,
  getCleanupReport,
} = require('./sources/cards.js');
const { generateTests } = require('./sources/tests.js');

const PACK_ID = 'jlpt-n3-en-full-v1';
const LEVEL = 'N3';
const LANGUAGE = 'en';
const VERSION = '1.0.0';

const builderDir = __dirname;
const outputDir = path.resolve(builderDir, '..', '..');
const releasePath = path.join(outputDir, 'jlpt_n3_en_full_v1.json');
const auditPath = path.join(outputDir, 'jlpt_n3_en_full_v1_audit.md');
const allowedWritePaths = new Set([releasePath, auditPath]);

const CARD_ID_PREFIX = {
  vocabulary: 'vocab',
  kanji: 'kanji',
  grammar: 'grammar',
  sentence: 'sentence',
};

function pad(num, width) {
  return String(num).padStart(width, '0');
}

function countByCategory(items) {
  return items.reduce((acc, item) => {
    const category = item.category || item.type || 'unknown';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
}

const sourceCardsForTargets = getCleanedCardSources();
const cardTargets = countByCategory(sourceCardsForTargets);

const TARGETS = {
  vocabulary: cardTargets.vocabulary || 0,
  kanji: cardTargets.kanji || 0,
  grammar: cardTargets.grammar || 0,
  sentence: cardTargets.sentence || 0,
  totalCards: sourceCardsForTargets.length,
  tests: 30,
  questions: 420,
  mcq: 180,
  tf: 100,
  fb: 140,
  tfTrue: 50,
  tfFalse: 50,
};

function writeAllowed(filePath, content) {
  const resolved = path.resolve(filePath);
  if (!allowedWritePaths.has(resolved)) {
    throw new Error(`Refusing to write outside approved N3 release outputs: ${resolved}`);
  }
  fs.writeFileSync(resolved, content, 'utf8');
}

function cardSort(a, b) {
  const categoryOrder = { vocabulary: 1, kanji: 2, grammar: 3, sentence: 4 };
  const categoryDiff = categoryOrder[a.category] - categoryOrder[b.category];
  if (categoryDiff) return categoryDiff;
  return a.originalOrder - b.originalOrder;
}

function assignFinalCardIds(sourceCards) {
  const counters = { vocabulary: 0, kanji: 0, grammar: 0, sentence: 0 };
  return sourceCards.slice().sort(cardSort).map(source => {
    const category = source.category;
    counters[category] += 1;
    const prefix = CARD_ID_PREFIX[category];
    if (!prefix) throw new Error(`Unsupported card category: ${category}`);
    return {
      ...source,
      id: `n3-${prefix}-${pad(counters[category], 4)}`,
      type: category,
      level: LEVEL,
      category,
    };
  });
}

function stripInternalCardFields(card) {
  const out = {
    id: card.id,
    type: card.type,
    level: card.level,
    category: card.category,
    front: card.front,
    back: card.back,
    tags: card.tags,
  };
  if (card.exampleJp) out.exampleJp = card.exampleJp;
  if (card.exampleTranslation) out.exampleTranslation = card.exampleTranslation;
  return out;
}

function buildDeck(idSuffix, title, type, cards) {
  return {
    id: `${PACK_ID}-deck-${idSuffix}`,
    title,
    type,
    level: LEVEL,
    category: title.replace(/^N3\s+/, ''),
    description: `${title} cards for the JLPT N3 English Full Pack.`,
    cards: cards.map(stripInternalCardFields),
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

function assertCounts(pack) {
  const cards = flattenCards(pack);
  const byType = countByCategory(cards);
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
  if (q.tfTrue !== TARGETS.tfTrue || q.tfFalse !== TARGETS.tfFalse) {
    failures.push(`TF balance ${q.tfTrue}/${q.tfFalse}`);
  }
  if (failures.length) throw new Error(`N3 pack count mismatch: ${failures.join(', ')}`);
}

function generatePack() {
  const sourceCards = getCleanedCardSources();
  const cardsWithIds = assignFinalCardIds(sourceCards);
  const vocabCards = cardsWithIds.filter(card => card.category === 'vocabulary');
  const kanjiCards = cardsWithIds.filter(card => card.category === 'kanji');
  const grammarCards = cardsWithIds.filter(card => card.category === 'grammar');
  const sentenceCards = cardsWithIds.filter(card => card.category === 'sentence');
  const tests = generateTests(vocabCards, kanjiCards, grammarCards, sentenceCards, PACK_ID);

  const pack = {
    packId: PACK_ID,
    schemaVersion: 1,
    version: VERSION,
    level: LEVEL,
    language: LANGUAGE,
    title: 'JLPT N3 English Full Pack',
    description: 'A full JLPT N3 study pack with vocabulary, kanji, grammar, sentences, and practice tests.',
    source: 'curated',
    license: 'Original educational content; no copied JLPT exam questions.',
    notes: 'Furigana, readings, romaji, onyomi/kunyomi, and kanji breakdowns are intentionally omitted for app-side generation.',
    decks: [
      buildDeck('vocabulary', 'N3 Vocabulary', 'vocabulary', vocabCards),
      buildDeck('kanji', 'N3 Kanji', 'kanji', kanjiCards),
      buildDeck('grammar', 'N3 Grammar', 'grammar', grammarCards),
      buildDeck('sentences', 'N3 Sentences', 'sentence', sentenceCards),
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
  const cardCounts = countByCategory(cards);
  const q = countQuestions(pack.tests);
  return { cards, cardCounts, q };
}

function formatInputCounts(inputCounts) {
  return Object.entries(inputCounts)
    .map(([fileName, counts]) => {
      const total = Object.values(counts).reduce((sum, value) => sum + value, 0);
      const detail = Object.entries(counts).map(([key, value]) => `${key}: ${value}`).join(', ');
      return `- ${fileName}: ${total} (${detail})`;
    })
    .join('\n');
}

function formatRemovedCards(report) {
  if (!report.removedCards.length) return '- None.';
  return report.removedCards
    .map(card => `- ${card.id} [${card.category}] ${card.front}: ${card.reason}`)
    .join('\n');
}

function formatFixedCards(report) {
  if (!report.fixedCards.length) return '- None.';
  return report.fixedCards
    .map(card => `- ${card.id} [${card.category}] ${card.front}: ${card.reason}`)
    .join('\n');
}

function renderAudit(pack, result = {}) {
  const { cardCounts, q } = summarize(pack);
  const report = getCleanupReport();
  const validation = result.validation || 'Pending: run validate.js after building.';
  const sha = result.sha || 'Pending: run rebuild SHA stability check.';
  const publishable = result.publishable === true ? 'Yes' : 'No';
  const finalTotal = Object.values(cardCounts).reduce((sum, value) => sum + value, 0);
  const removedCounts = report.removedCounts || {};

  return `# JLPT N3 English Full Pack (v1) Audit

## Input Shard Counts
${formatInputCounts(report.inputCounts)}

## Cleanup Summary
- Input cards: ${Object.values(report.inputTotals).reduce((sum, value) => sum + value, 0)}
- Removed cards: ${report.removedCards.length} (vocabulary: ${removedCounts.vocabulary || 0}, grammar: ${removedCounts.grammar || 0}, kanji: ${removedCounts.kanji || 0}, sentence: ${removedCounts.sentence || 0})
- Fixed/disambiguated cards: ${report.fixedCount}
- Duplicate vocabulary fronts collapsed to one strongest card per front.
- Duplicate grammar fronts were either removed or renamed with a clear disambiguator when the meanings were distinct.
- No Supabase upload was performed.

## Removed Cards
${formatRemovedCards(report)}

## Fixed Cards
${formatFixedCards(report)}

## Final Counts
- Vocabulary cards: ${cardCounts.vocabulary || 0}
- Kanji cards: ${cardCounts.kanji || 0}
- Grammar cards: ${cardCounts.grammar || 0}
- Sentence cards: ${cardCounts.sentence || 0}
- Total cards: ${finalTotal}
- Test objects: ${pack.tests.length}
- Test questions: ${q.total}
- MULTIPLE_CHOICE: ${q.MULTIPLE_CHOICE || 0}
- TRUE_FALSE: ${q.TRUE_FALSE || 0}
- FILL_BLANK: ${q.FILL_BLANK || 0}
- TRUE_FALSE balance: ${q.tfTrue} true / ${q.tfFalse} false

## Validation
- Validator result: ${validation}
- Rebuild SHA stability: ${sha}
- Publishable: ${publishable}

## Quality Notes
- Final IDs are deterministic and use the requested N3 prefixes.
- Release cards intentionally omit furigana, reading, romaji, onyomi, and kunyomi fields.
- MCQ distractors are selected deterministically from real same-category pack answers.
- Fill-blank questions use explicit curated specs in \`sources/tests.js\`.
- Known weak phrases from the request were fixed or removed before release generation.

## Suspected Too-Basic / Too-Advanced / Boundary Items
- Some N4/N5 overlap remains where the card has N3 reading value or functions as lower-intermediate support vocabulary. Exact N3-internal duplicate fronts were removed, but cross-pack overlap was not used as an automatic deletion rule.
- A few grammar patterns sit near the N3/N2 boundary, including formal basis/compliance patterns such as に基づいて, に沿って, に関して, をめぐって, and に応じて. They are retained as useful lower-intermediate boundary material.
- Human Japanese review is still recommended before broad public distribution, especially for level-boundary vocabulary and sentence naturalness.

## Known Risks
- The final card total is lower than the intake target because duplicate fronts were removed instead of padded.
- Validator checks deterministic structure and known weak patterns, but it cannot replace native-speaker review for every example sentence.
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
  summarize,
  writePackAndAudit,
};
