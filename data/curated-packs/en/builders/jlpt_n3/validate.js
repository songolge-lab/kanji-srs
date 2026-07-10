const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const {
  PACK_ID,
  TARGETS,
  auditPath,
  countQuestions,
  flattenCards,
  generatePack,
  releasePath,
  renderAudit,
  serializePack,
} = require('./build.js');

const builderDir = __dirname;
const testsSourcePath = path.join(builderDir, 'sources', 'tests.js');

const REQUIRED_TOP = ['packId', 'schemaVersion', 'version', 'level', 'language', 'title', 'description', 'source', 'decks', 'tests'];
const FORBIDDEN_CARD_FIELDS = ['furigana', 'reading', 'romaji', 'onyomi', 'kunyomi', 'sourceIds', 'sourceFiles', 'sourceIndex', 'originalOrder'];
const VALID_CARD_TYPES = new Set(['vocabulary', 'kanji', 'grammar', 'sentence']);
const VALID_Q_TYPES = new Set(['MULTIPLE_CHOICE', 'TRUE_FALSE', 'FILL_BLANK']);
const TEST_STRUCTURE = [
  ['N3 Vocabulary Quiz ', 10, 'Vocabulary', 'vocabulary'],
  ['N3 Kanji Quiz ', 4, 'Kanji', 'kanji'],
  ['N3 Grammar Quiz ', 6, 'Grammar', 'grammar'],
  ['N3 Sentence Reading Quiz ', 5, 'Sentences', 'sentence'],
  ['N3 Mixed Practice Test ', 5, 'Mixed', 'mixed'],
];

const BAD_TEXT_PATTERNS = [
  [/\.\./, 'double period'],
  [/\?\?/, 'double question mark'],
  [/!!/, 'double exclamation mark'],
  [/\u3002\.|\.\u3002|\u3002\u3002/u, 'Japanese/English period artifact'],
  [/\uff1f\?|\?\uff1f|\uff1f\uff1f/u, 'Japanese/English question artifact'],
  [/\uff01!|!\uff01|\uff01\uff01/u, 'Japanese/English exclamation artifact'],
  [/\u00e3|\ufffd|ã|ï¼|ã€/, 'mojibake artifact'],
  [/\?[\u3040-\u30ff\u3400-\u9fff\u301c\uff5e]|[\u3040-\u30ff\u3400-\u9fff\u301c\uff5e]\?/u, 'ASCII question-mark quote artifact'],
  [/\b(?:search for|look for|pick up)\s*\./i, 'dangling phrasal verb'],
  [/\bcondition of\b/i, 'condition-of template'],
  [/\bpreparation study\b/i, 'preparation-study template'],
  [/asked the teacher about/i, 'teacher-about template'],
  [/asked the clerk for/i, 'clerk-for template'],
  [/I bought a little/i, 'bought-a-little template'],
  [/I sometimes .* on weekends/i, 'sometimes-weekends template'],
  [/I intend to .* in the park/i, 'park-intent template'],
  [/\bI intend to\b/i, 'stiff intend-to phrasing'],
  [/\bexample sentence\b/i, 'meta-study example-sentence phrasing'],
  [/\bEnglish meaning\b/i, 'meta-study English-meaning phrasing'],
  [/\bword\b/i, 'meta-study word phrasing'],
];

function sha256(value) {
  return crypto.createHash('sha256').update(value, 'utf8').digest('hex');
}

function readRelease(errors) {
  try {
    const raw = fs.readFileSync(releasePath, 'utf8');
    return { raw, data: JSON.parse(raw) };
  } catch (error) {
    errors.push(`Release JSON could not be read/parsed at ${releasePath}: ${error.message}`);
    return { raw: '', data: null };
  }
}

function pushIf(errors, condition, message) {
  if (condition) errors.push(message);
}

function hasJapanese(value) {
  return /[\u3040-\u30ff\u3400-\u9fff]/u.test(value || '');
}

function hasKanji(value) {
  return /[\u3400-\u9fff]/u.test(value || '');
}

function charLength(value) {
  return [...String(value || '')].length;
}

function visitStrings(value, pathParts, visitor) {
  if (typeof value === 'string') {
    visitor(value, pathParts.join('.'));
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((entry, index) => visitStrings(entry, pathParts.concat(index), visitor));
    return;
  }
  if (value && typeof value === 'object') {
    for (const [key, entry] of Object.entries(value)) {
      visitStrings(entry, pathParts.concat(key), visitor);
    }
  }
}

function validateTopLevel(data, errors) {
  for (const field of REQUIRED_TOP) pushIf(errors, data[field] === undefined, `Missing top-level field: ${field}`);
  pushIf(errors, data.packId !== PACK_ID, `packId mismatch: ${data.packId}`);
  pushIf(errors, data.schemaVersion !== 1, `schemaVersion mismatch: ${data.schemaVersion}`);
  pushIf(errors, data.version !== '1.0.0', `version mismatch: ${data.version}`);
  pushIf(errors, data.level !== 'N3', `level mismatch: ${data.level}`);
  pushIf(errors, data.language !== 'en', `language mismatch: ${data.language}`);
  pushIf(errors, data.title !== 'JLPT N3 English Full Pack', `title mismatch: ${data.title}`);
  pushIf(errors, data.source !== 'curated', `source mismatch: ${data.source}`);
  pushIf(errors, !Array.isArray(data.decks), 'decks is not an array');
  pushIf(errors, !Array.isArray(data.tests), 'tests is not an array');
}

function validateCards(data, errors) {
  const cards = flattenCards(data);
  const cardIds = new Set();
  const fronts = new Set();
  const grammarBaseFronts = new Map();
  const byType = {};

  for (const deck of data.decks || []) {
    pushIf(errors, !Array.isArray(deck.cards), `Deck ${deck.id || '?'} has no cards array`);
    pushIf(errors, !VALID_CARD_TYPES.has(deck.type), `Invalid deck type on ${deck.id}: ${deck.type}`);
  }

  for (const card of cards) {
    byType[card.type] = (byType[card.type] || 0) + 1;
    pushIf(errors, cardIds.has(card.id), `Duplicate card id: ${card.id}`);
    cardIds.add(card.id);
    pushIf(errors, !VALID_CARD_TYPES.has(card.type), `Invalid card type on ${card.id}: ${card.type}`);
    pushIf(errors, card.category !== card.type, `Invalid category on ${card.id}: ${card.category}`);
    pushIf(errors, !card.front || !card.back, `Missing front/back on card ${card.id}`);
    pushIf(errors, !card.exampleJp || !card.exampleTranslation, `Missing example fields on card ${card.id}`);
    pushIf(errors, !Array.isArray(card.tags) || !card.tags.includes('n3') || !card.tags.includes(card.type), `Missing required tags on card ${card.id}`);
    pushIf(errors, fronts.has(card.front), `Duplicate card front: ${card.front}`);
    fronts.add(card.front);
    for (const field of FORBIDDEN_CARD_FIELDS) {
      pushIf(errors, Object.prototype.hasOwnProperty.call(card, field), `Forbidden/internal field "${field}" on card ${card.id}`);
    }
    if (card.type === 'kanji') {
      pushIf(errors, charLength(card.front) !== 1 || !hasKanji(card.front), `Kanji card front is not exactly one kanji on ${card.id}: ${card.front}`);
      pushIf(errors, !card.exampleJp.includes(card.front), `Kanji example does not include front on ${card.id}: ${card.front}`);
    } else {
      pushIf(errors, !hasJapanese(card.front), `Japanese front appears English-only on ${card.id}: ${card.front}`);
    }
    if (card.type === 'grammar') {
      const baseFront = card.front.replace(/\s*\(.+?\)$/u, '');
      if (!grammarBaseFronts.has(baseFront)) grammarBaseFronts.set(baseFront, []);
      grammarBaseFronts.get(baseFront).push(card.front);
    }
    pushIf(errors, /\b[a-z]{4,}\b/i.test(card.exampleJp || ''), `Possible English/romaji in Japanese example on ${card.id}`);
  }

  for (const [baseFront, frontsForBase] of grammarBaseFronts) {
    if (frontsForBase.length > 1) {
      const allDisambiguated = frontsForBase.every(front => front !== baseFront && /\(.+?\)$/.test(front));
      pushIf(errors, !allDisambiguated, `Duplicate grammar base front without clear disambiguators: ${baseFront}`);
    }
  }

  pushIf(errors, cards.length !== TARGETS.totalCards, `Total cards expected ${TARGETS.totalCards}, found ${cards.length}`);
  pushIf(errors, byType.vocabulary !== TARGETS.vocabulary, `Vocabulary cards expected ${TARGETS.vocabulary}, found ${byType.vocabulary || 0}`);
  pushIf(errors, byType.kanji !== TARGETS.kanji, `Kanji cards expected ${TARGETS.kanji}, found ${byType.kanji || 0}`);
  pushIf(errors, byType.grammar !== TARGETS.grammar, `Grammar cards expected ${TARGETS.grammar}, found ${byType.grammar || 0}`);
  pushIf(errors, byType.sentence !== TARGETS.sentence, `Sentence cards expected ${TARGETS.sentence}, found ${byType.sentence || 0}`);

  return { cards, cardIds, cardsById: new Map(cards.map(card => [card.id, card])) };
}

function validateTests(data, cardContext, errors) {
  const testIds = new Set();
  const questionIds = new Set();
  const questions = [];
  const titleCounts = new Map(TEST_STRUCTURE.map(([prefix]) => [prefix, 0]));

  pushIf(errors, (data.tests || []).length !== TARGETS.tests, `Test object count expected ${TARGETS.tests}, found ${(data.tests || []).length}`);

  for (const test of data.tests || []) {
    pushIf(errors, testIds.has(test.id), `Duplicate test id: ${test.id}`);
    testIds.add(test.id);
    pushIf(errors, !Array.isArray(test.questions), `Test ${test.id} has no questions array`);
    const structure = TEST_STRUCTURE.find(([prefix]) => test.title && test.title.startsWith(prefix));
    if (structure) {
      titleCounts.set(structure[0], titleCounts.get(structure[0]) + 1);
      pushIf(errors, test.category !== structure[2], `Test ${test.id} category expected ${structure[2]}, found ${test.category}`);
      pushIf(errors, !Array.isArray(test.tags) || !test.tags.includes(structure[3]), `Test ${test.id} missing tag ${structure[3]}`);
    } else {
      errors.push(`Unexpected test title: ${test.title}`);
    }
    if (test.title && test.title.startsWith('N3 Mixed Practice Test ')) {
      pushIf(errors, test.category !== 'Mixed', `Mixed test category must be Mixed on ${test.id}`);
      pushIf(errors, !Array.isArray(test.tags) || !test.tags.includes('mixed'), `Mixed test missing mixed tag on ${test.id}`);
    }

    for (const q of test.questions || []) {
      questions.push(q);
      pushIf(errors, questionIds.has(q.id), `Duplicate question id: ${q.id}`);
      questionIds.add(q.id);
      pushIf(errors, !VALID_Q_TYPES.has(q.type), `Invalid question type on ${q.id}: ${q.type}`);
      pushIf(errors, !q.prompt, `Empty prompt on ${q.id}`);
      pushIf(errors, q.correctValue === undefined || q.correctValue === null || q.correctValue === '', `Missing correctValue on ${q.id}`);
      pushIf(errors, !Array.isArray(q.sourceCardIds) || q.sourceCardIds.length === 0, `Missing sourceCardIds on ${q.id}`);
      for (const sourceId of q.sourceCardIds || []) {
        pushIf(errors, !cardContext.cardIds.has(sourceId), `Invalid sourceCardId ${sourceId} on ${q.id}`);
      }
      pushIf(errors, !Array.isArray(q.tags) || q.tags.length === 0, `Missing tags on question ${q.id}`);
    }
  }

  for (const [prefix, expected] of TEST_STRUCTURE.map(([prefix, count]) => [prefix, count])) {
    pushIf(errors, titleCounts.get(prefix) !== expected, `Test title count mismatch for ${prefix}: expected ${expected}, found ${titleCounts.get(prefix)}`);
  }

  const qCounts = countQuestions(data.tests || []);
  pushIf(errors, qCounts.total !== TARGETS.questions, `Question count expected ${TARGETS.questions}, found ${qCounts.total}`);
  pushIf(errors, qCounts.MULTIPLE_CHOICE !== TARGETS.mcq, `MCQ count expected ${TARGETS.mcq}, found ${qCounts.MULTIPLE_CHOICE || 0}`);
  pushIf(errors, qCounts.TRUE_FALSE !== TARGETS.tf, `TRUE_FALSE count expected ${TARGETS.tf}, found ${qCounts.TRUE_FALSE || 0}`);
  pushIf(errors, qCounts.FILL_BLANK !== TARGETS.fb, `FILL_BLANK count expected ${TARGETS.fb}, found ${qCounts.FILL_BLANK || 0}`);
  pushIf(errors, qCounts.tfTrue !== TARGETS.tfTrue || qCounts.tfFalse !== TARGETS.tfFalse, `TRUE_FALSE balance expected 50/50, found ${qCounts.tfTrue}/${qCounts.tfFalse}`);

  validateQuestionDetails(questions, cardContext, errors);
  return { questions, qCounts };
}

function validateQuestionDetails(questions, cardContext, errors) {
  const allBacksByType = new Map();
  for (const card of cardContext.cards) {
    if (!allBacksByType.has(card.type)) allBacksByType.set(card.type, new Set());
    allBacksByType.get(card.type).add(card.back);
  }

  const fillPrompts = new Set();
  for (const q of questions) {
    const source = cardContext.cardsById.get(q.sourceCardIds && q.sourceCardIds[0]);
    if (q.type === 'MULTIPLE_CHOICE') {
      pushIf(errors, !Array.isArray(q.options) || q.options.length !== 4, `MCQ must have exactly 4 options on ${q.id}`);
      if (Array.isArray(q.options)) {
        pushIf(errors, new Set(q.options).size !== q.options.length, `Duplicate MCQ choices on ${q.id}`);
        pushIf(errors, !q.options.includes(q.correctValue), `MCQ correctValue is not an option on ${q.id}`);
        for (const option of q.options) {
          pushIf(errors, /^(?:[A-D]|Option\s*\d+|Distractor(?:\s*[A-D])?)$/i.test(option), `Fake distractor option on ${q.id}: ${option}`);
        }
        const sameTypeBacks = source && allBacksByType.get(source.type);
        for (const option of q.options) {
          pushIf(errors, !sameTypeBacks || !sameTypeBacks.has(option), `MCQ option is not a real same-category pack answer on ${q.id}: ${option}`);
        }
      }
    }
    if (q.type === 'TRUE_FALSE') {
      pushIf(errors, typeof q.correctValue !== 'boolean', `TRUE_FALSE correctValue must be boolean on ${q.id}`);
      pushIf(errors, Array.isArray(q.options) && q.options.length > 0, `TRUE_FALSE should not have options on ${q.id}`);
    }
    if (q.type === 'FILL_BLANK') {
      pushIf(errors, typeof q.correctValue !== 'string' || !q.correctValue.trim(), `FILL_BLANK correctValue must be a non-empty string on ${q.id}`);
      pushIf(errors, Array.isArray(q.options) && q.options.length > 0, `FILL_BLANK should not have options on ${q.id}`);
      pushIf(errors, fillPrompts.has(q.prompt), `Duplicate fill-blank prompt: ${q.prompt}`);
      fillPrompts.add(q.prompt);
      pushIf(errors, !q.prompt.includes('[ ]'), `FILL_BLANK prompt missing explicit blank on ${q.id}`);
      pushIf(errors, /[A-Za-z]/.test(q.prompt), `English hint inside Japanese fill-blank prompt on ${q.id}: ${q.prompt}`);
      pushIf(errors, /Complete the sentence|Fill in the blank/i.test(q.prompt), `Repeated generic fill-blank prompt wrapper on ${q.id}`);
    }
  }
}

function validatePlaceholders(data, errors) {
  const text = JSON.stringify(data);
  const patterns = [
    /dummy/i,
    /placeholder/i,
    /filler/i,
    /\bWord\s*\d{3}\b/i,
    /\bSentence\s*\d{3}\b/i,
    /\bGrammar\s*\d{3}\b/i,
    /Distractor\s*[A-D]/i,
    /Option\s*\d+/i,
  ];
  for (const pattern of patterns) pushIf(errors, pattern.test(text), `Placeholder/filler pattern matched: ${pattern}`);
}

function escapeRegex(value) {
  return String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function firstMeaning(back) {
  return String(back || '').replace(/;.*$/, '').trim();
}

function normalizeExampleFamily(text, card) {
  let out = String(text || '').toLowerCase();
  const replacements = [
    card.front,
    card.back,
    firstMeaning(card.back),
    firstMeaning(card.back).replace(/^to\s+/, ''),
  ].filter(Boolean).sort((a, b) => b.length - a.length);
  for (const value of replacements) {
    out = out.replace(new RegExp(escapeRegex(value.toLowerCase()), 'g'), '{term}');
  }
  return out
    .replace(/[一二三四五六七八九十百千万0-9]+/g, '#')
    .replace(/\b(a|an|the|my|your|this|that|these|those)\s+\{term\}/g, '{term}')
    .replace(/\s+/g, ' ')
    .trim();
}

function countBy(items, getKey) {
  const map = new Map();
  for (const item of items) {
    const key = getKey(item);
    map.set(key, (map.get(key) || 0) + 1);
  }
  return map;
}

function findRepeatedFamilies(cards, field, threshold) {
  const counts = countBy(cards, card => normalizeExampleFamily(card[field], card));
  return [...counts.entries()]
    .filter(([, count]) => count > threshold)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

function validateVocabularyExampleFamilies(cards, errors) {
  const vocab = cards.filter(card => card.type === 'vocabulary');
  const repeatedEn = findRepeatedFamilies(vocab, 'exampleTranslation', 12);
  const repeatedJp = findRepeatedFamilies(vocab, 'exampleJp', 12);
  for (const [family, count] of repeatedEn.slice(0, 10)) {
    errors.push(`Repeated vocabulary English example family (${count}): ${family}`);
  }
  for (const [family, count] of repeatedJp.slice(0, 10)) {
    errors.push(`Repeated vocabulary Japanese example family (${count}): ${family}`);
  }
}

function validateBadText(data, errors) {
  visitStrings(data, ['pack'], (value, pathName) => {
    for (const [pattern, label] of BAD_TEXT_PATTERNS) {
      if (pattern.test(value)) errors.push(`Blocked text pattern (${label}) at ${pathName}: ${value}`);
    }
  });
}

function validateDeterminism(raw, data, errors) {
  const testsSource = fs.readFileSync(testsSourcePath, 'utf8');
  pushIf(errors, /\bMath\.random\s*\(/.test(testsSource), 'Math.random usage found in sources/tests.js');

  const generatedA = generatePack();
  const generatedB = generatePack();
  const generatedRawA = serializePack(generatedA);
  const generatedRawB = serializePack(generatedB);
  pushIf(errors, generatedRawA !== generatedRawB, 'In-memory generator output differs across two runs');
  pushIf(errors, raw !== generatedRawA, 'Actual release JSON does not match deterministic generator output');
  pushIf(errors, JSON.stringify(data) !== JSON.stringify(generatedA), 'Actual release JSON is not logically identical to generated pack');
  return {
    generated: generatedA,
    hashA: sha256(generatedRawA),
    hashB: sha256(generatedRawB),
    releaseHash: sha256(raw),
  };
}

function run() {
  const errors = [];
  const { raw, data } = readRelease(errors);
  let generated = null;
  let hashes = { hashA: '', hashB: '', releaseHash: '' };

  if (data) {
    validateTopLevel(data, errors);
    const cardContext = validateCards(data, errors);
    validateTests(data, cardContext, errors);
    validatePlaceholders(data, errors);
    validateVocabularyExampleFamilies(cardContext.cards, errors);
    validateBadText(data, errors);
    hashes = validateDeterminism(raw, data, errors);
    generated = hashes.generated;
  }

  const packForAudit = generated || (data || generatePack());
  const stable = hashes.hashA === hashes.hashB && hashes.hashA === hashes.releaseHash;
  if (errors.length === 0) {
    const shaStatus = `${hashes.releaseHash} (stable: ${stable ? 'yes' : 'no'})`;
    fs.writeFileSync(auditPath, renderAudit(packForAudit, {
      validation: 'Passed: validate.js completed with 0 errors.',
      sha: shaStatus,
      publishable: stable,
    }), 'utf8');
    console.log('Validation passed perfectly.');
    console.log(`Release SHA-256: ${hashes.releaseHash}`);
    console.log(`Stable rebuild hash: ${stable ? 'yes' : 'no'}`);
    return;
  }

  fs.writeFileSync(auditPath, renderAudit(packForAudit, {
    validation: `Failed: ${errors.length} error(s).`,
    sha: hashes.releaseHash ? `${hashes.releaseHash} (stable: ${stable ? 'yes' : 'no'})` : 'Not available.',
    publishable: false,
  }), 'utf8');
  console.error('Validation errors found:');
  for (const error of errors) console.error(` - ${error}`);
  process.exit(1);
}

if (require.main === module) run();

module.exports = { run };
