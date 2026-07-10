const fs = require('fs');
const path = require('path');

const {
  getCleanedCardSources,
  getCleanupReport,
} = require('./sources/cards.js');
const { generateTests } = require('./sources/tests.js');

const PACK_ID = 'jlpt-n1-en-full-v1';
const LEVEL = 'N1';
const LANGUAGE = 'en';
const VERSION = '1.0.0';

const builderDir = __dirname;
const outputDir = path.resolve(builderDir, '..', '..');
const releasePath = path.join(outputDir, 'jlpt_n1_en_full_v1.json');
const auditPath = path.join(outputDir, 'jlpt_n1_en_full_v1_audit.md');
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
  tests: 40,
  questions: 520,
  mcq: 220,
  tf: 120,
  fb: 180,
  tfTrue: 60,
  tfFalse: 60,
};

function writeAllowed(filePath, content) {
  const resolved = path.resolve(filePath);
  if (!allowedWritePaths.has(resolved)) {
    throw new Error(`Refusing to write outside approved N1 release outputs: ${resolved}`);
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
      id: `n1-${prefix}-${pad(counters[category], 4)}`,
      type: category,
      level: LEVEL,
      category,
    };
  });
}

function stripInternalCardFields(card) {
  return {
    id: card.id,
    type: card.type,
    level: card.level,
    category: card.category,
    front: card.front,
    back: card.back,
    exampleJp: card.exampleJp,
    exampleTranslation: card.exampleTranslation,
    tags: card.tags,
  };
}

function buildDeck(idSuffix, title, type, cards) {
  return {
    id: `${PACK_ID}-deck-${idSuffix}`,
    title,
    type,
    level: LEVEL,
    category: title.replace(/^N1\s+/, ''),
    description: `${title} cards for the JLPT N1 English Full Pack.`,
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
  if (failures.length) throw new Error(`N1 pack count mismatch: ${failures.join(', ')}`);
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
    title: 'JLPT N1 English Full Pack',
    description: 'A full JLPT N1 study pack with vocabulary, kanji, grammar, sentences, and practice tests.',
    source: 'curated',
    license: 'Original educational content; no copied JLPT exam questions.',
    notes: 'Furigana, readings, romaji, onyomi/kunyomi, and kanji breakdowns are intentionally omitted for app-side generation.',
    decks: [
      buildDeck('vocabulary', 'N1 Vocabulary', 'vocabulary', vocabCards),
      buildDeck('kanji', 'N1 Kanji', 'kanji', kanjiCards),
      buildDeck('grammar', 'N1 Grammar', 'grammar', grammarCards),
      buildDeck('sentences', 'N1 Sentences', 'sentence', sentenceCards),
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

function formatOverlapCounts(overlaps) {
  const counts = overlaps && overlaps.counts ? overlaps.counts : {};
  return `vocabulary: ${counts.vocabulary || 0}, kanji: ${counts.kanji || 0}, grammar: ${counts.grammar || 0}, sentence: ${counts.sentence || 0}`;
}

function formatRiskKanji(report) {
  return report.riskKanji
    .map(item => {
      const suffix = item.status === 'kept'
        ? `kept as ${item.keptSourceId}`
        : item.status === 'removed'
          ? `removed: ${item.removalReason}`
          : 'not present in intake';
      return `- ${item.char} (${item.label}): ${suffix}. ${item.note}`;
    })
    .join('\n');
}

function renderAudit(pack, result = {}) {
  const { cardCounts, q } = summarize(pack);
  const report = getCleanupReport();
  const validation = result.validation || 'Pending: run validate.js after building.';
  const sha = result.sha || 'Pending: run rebuild SHA stability check.';
  const publishable = result.publishable === true ? 'Yes' : 'No';
  const finalTotal = Object.values(cardCounts).reduce((sum, value) => sum + value, 0);
  const inputTotal = Object.values(report.inputTotals).reduce((sum, value) => sum + value, 0);
  const removedCounts = report.removedCounts || {};

  return `# JLPT N1 English Full Pack (v1) Audit

## Input Shard Counts
${formatInputCounts(report.inputCounts)}

## Cleanup Summary
- Input cards: ${inputTotal}
- Removed cards: ${report.removedCards.length} (vocabulary: ${removedCounts.vocabulary || 0}, kanji: ${removedCounts.kanji || 0}, grammar: ${removedCounts.grammar || 0}, sentence: ${removedCounts.sentence || 0})
- Fixed cards: ${report.fixedCount}
- Exact duplicate fronts were collapsed to the strongest card per category.
- Duplicate grammar fronts were removed unless they were meaningfully distinct; no disambiguated duplicates were needed after review.
- No filler cards were invented to restore the intake target.
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

## Candidate-Risk Kanji Review
${formatRiskKanji(report)}

## Quality Notes
- Final IDs are deterministic and use the requested N1 prefixes.
- Release cards intentionally omit furigana, reading, romaji, onyomi, and kunyomi fields.
- MCQ distractors are selected deterministically from real same-category pack answers.
- Fill-blank prompts use exact-front blanks from cleaned Japanese examples, limited to cards whose examples contain the final front verbatim.
- Known weak phrases from the intake request were fixed or removed before release generation.

## Suspected Too-Basic / Too-Obscure / Boundary Items
- Lower-level overlap retained after cleanup: ${formatOverlapCounts(report.lowerLevelOverlaps)}.
- Some N2-boundary vocabulary remains where it is common in N1 reading passages or appears in formal/media/policy contexts.
- Some advanced kanji remain literary, public-affairs, legal-adjacent, or health-adjacent; they were kept when the example used a recognizable compound rather than a rare isolated dictionary sense.
- The grammar deck is substantially below the intake target because exact duplicate fronts were removed instead of renamed without a meaningful distinction.

## Known Risks
- Validator checks deterministic structure and known weak patterns, but it cannot replace native-speaker review for every example sentence.
- A few retained kanji and formal nouns may still feel specialized depending on the learner's reading goals.
- The final card total is lower than the intake target because duplicate and weak cards were removed rather than padded.
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
