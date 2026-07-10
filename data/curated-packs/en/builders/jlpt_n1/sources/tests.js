function pad(num, width) {
  return String(num).padStart(width, '0');
}

function stableHash(value) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function sortedByHash(values, seed) {
  return values.slice().sort((a, b) => {
    const diff = stableHash(seed + '|' + a) - stableHash(seed + '|' + b);
    return diff || a.localeCompare(b);
  });
}

function stripSentencePunctuation(value) {
  return String(value || '').trim().replace(/[.!?\u3002\uff01\uff1f]+$/u, '');
}

function quotedMeaning(value) {
  return '"' + stripSentencePunctuation(value) + '"';
}

function takeSpread(cards, count, start = 0, step = 7) {
  if (cards.length < count) throw new Error('Could not take ' + count + ' unique cards from pool of ' + cards.length);
  return cards
    .map((card, index) => ({ card, key: stableHash(start + '|' + step + '|' + index + '|' + card.id) }))
    .sort((a, b) => a.key - b.key || a.card.id.localeCompare(b.card.id))
    .slice(0, count)
    .map(entry => entry.card);
}

function selectDistractors(sourceCard, pool, count, seed) {
  const seenValues = new Set([sourceCard.back]);
  const candidates = pool
    .filter(card => card.id !== sourceCard.id && card.back && card.back !== sourceCard.back)
    .map(card => ({ card, key: stableHash(seed + '|' + sourceCard.id + '|' + card.id + '|' + card.back) }))
    .sort((a, b) => a.key - b.key || a.card.id.localeCompare(b.card.id));
  const out = [];
  for (const { card } of candidates) {
    if (out.length >= count) break;
    if (seenValues.has(card.back)) continue;
    seenValues.add(card.back);
    out.push(card.back);
  }
  if (out.length !== count) throw new Error('Not enough distractors for ' + sourceCard.id);
  return out;
}

function promptForMcq(card) {
  if (card.type === 'grammar') return 'What does the grammar pattern "' + card.front + '" mean?';
  if (card.type === 'sentence') return 'Choose the best translation for "' + card.front + '".';
  if (card.type === 'kanji') return 'What does the kanji "' + card.front + '" mean?';
  return 'What does "' + card.front + '" mean?';
}

function makeMcq(card, pool, qid, tags) {
  const distractors = selectDistractors(card, pool, 3, qid);
  const options = sortedByHash([card.back, ...distractors], qid);
  return {
    id: qid,
    type: 'MULTIPLE_CHOICE',
    prompt: promptForMcq(card),
    image: null,
    options,
    correctValue: card.back,
    explanation: 'The correct answer is ' + quotedMeaning(card.back) + '.',
    sourceCardIds: [card.id],
    tags,
  };
}

function pickFalseCard(card, pool, seedStep) {
  const start = pool.findIndex(candidate => candidate.id === card.id);
  if (start < 0) throw new Error('Card not found in false-card pool: ' + card.id);
  for (let offset = seedStep; offset < pool.length + seedStep; offset++) {
    const candidate = pool[(start + offset) % pool.length];
    if (candidate.id !== card.id && candidate.back !== card.back) return candidate;
  }
  throw new Error('Could not find false card for ' + card.id);
}

function makeTf(card, falseCard, qid, isTrue, tags) {
  const claimed = isTrue ? card.back : falseCard.back;
  const subject = card.type === 'grammar'
    ? 'The grammar pattern "' + card.front + '"'
    : card.type === 'kanji'
      ? 'The kanji "' + card.front + '"'
      : '"' + card.front + '"';
  return {
    id: qid,
    type: 'TRUE_FALSE',
    prompt: subject + ' means ' + quotedMeaning(claimed) + '.',
    image: null,
    correctValue: isTrue,
    explanation: 'The correct meaning is ' + quotedMeaning(card.back) + '.',
    sourceCardIds: [card.id],
    tags,
  };
}

function hasLatin(value) {
  return /[A-Za-z]/.test(value || '');
}

function makeFillBlank(card, qid, tags) {
  const source = card.exampleJp || card.front;
  if (!source.includes(card.front)) throw new Error('Fill blank source does not include front for ' + card.id);
  const prompt = source.replace(card.front, '[ ]');
  if (hasLatin(prompt)) throw new Error('Latin text in fill blank prompt for ' + card.id);
  return {
    id: qid,
    type: 'FILL_BLANK',
    prompt,
    image: null,
    correctValue: card.front,
    explanation: 'The missing expression is "' + card.front + '".',
    sourceCardIds: [card.id],
    tags,
  };
}

function addTest(tests, id, title, category, tags, questions) {
  const type = questions.every(q => q.type === questions[0].type) ? questions[0].type : 'MIXED';
  tests.push({ id, title, level: 'N1', type, category, tags, questions });
}

function makeTfBatch(cards, pool, count, testId, qStart, tags, state, falseOffset) {
  const questions = [];
  for (let i = 0; i < count; i++) {
    const card = cards[i];
    const isTrue = state.index % 2 === 0;
    questions.push(makeTf(card, pickFalseCard(card, pool, falseOffset), testId + '-q' + pad(qStart + i, 3), isTrue, tags));
    state.index += 1;
  }
  return questions;
}

function interleavePools(pools) {
  const out = [];
  while (pools.some(pool => pool.cards.length)) {
    for (const pool of pools) {
      const card = pool.cards.shift();
      if (card) out.push({ card, pool: pool.pool, tags: pool.tags });
    }
  }
  return out;
}

function fillable(cards) {
  return cards.filter(card => card.exampleJp && card.exampleJp.includes(card.front) && !hasLatin(card.exampleJp));
}

function generateTests(vocabCards, kanjiCards, grammarCards, sentenceCards) {
  const tests = [];
  const tfState = { index: 0 };

  const vocabMcqSources = takeSpread(vocabCards, 96, 3, 7);
  const vocabTfSources = takeSpread(vocabCards, 24, 101, 11);
  const vocabFillSources = takeSpread(fillable(vocabCards), 160, 201, 13);
  let vocabMcqOffset = 0;
  let vocabTfOffset = 0;
  let vocabFillOffset = 0;

  for (let testNo = 1; testNo <= 12; testNo++) {
    const testId = 'n1-test-vocab-' + pad(testNo, 2);
    const questions = [];
    for (let i = 0; i < 8; i++) {
      const card = vocabMcqSources[vocabMcqOffset++];
      questions.push(makeMcq(card, vocabCards, testId + '-q' + pad(questions.length + 1, 3), ['vocabulary']));
    }
    for (let i = 0; i < 5; i++) {
      const card = vocabFillSources[vocabFillOffset++];
      questions.push(makeFillBlank(card, testId + '-q' + pad(questions.length + 1, 3), ['vocabulary']));
    }
    questions.push(...makeTfBatch(
      vocabTfSources.slice(vocabTfOffset, vocabTfOffset + 2),
      vocabCards,
      2,
      testId,
      questions.length + 1,
      ['vocabulary'],
      tfState,
      17,
    ));
    vocabTfOffset += 2;
    addTest(tests, testId, 'N1 Vocabulary Quiz ' + pad(testNo, 2), 'Vocabulary', ['vocabulary'], questions);
  }

  const kanjiMcqSources = takeSpread(kanjiCards, 20, 5, 7);
  const kanjiTfSources = takeSpread(kanjiCards, 10, 29, 11);
  const kanjiFillSources = takeSpread(fillable(kanjiCards), 20, 47, 13);
  let kanjiMcqOffset = 0;
  let kanjiTfOffset = 0;
  let kanjiFillOffset = 0;

  for (let testNo = 1; testNo <= 5; testNo++) {
    const testId = 'n1-test-kanji-' + pad(testNo, 2);
    const questions = [];
    for (let i = 0; i < 4; i++) {
      const card = kanjiMcqSources[kanjiMcqOffset++];
      questions.push(makeMcq(card, kanjiCards, testId + '-q' + pad(questions.length + 1, 3), ['kanji']));
    }
    for (let i = 0; i < 4; i++) {
      const card = kanjiFillSources[kanjiFillOffset++];
      questions.push(makeFillBlank(card, testId + '-q' + pad(questions.length + 1, 3), ['kanji']));
    }
    questions.push(...makeTfBatch(
      kanjiTfSources.slice(kanjiTfOffset, kanjiTfOffset + 2),
      kanjiCards,
      2,
      testId,
      questions.length + 1,
      ['kanji'],
      tfState,
      19,
    ));
    kanjiTfOffset += 2;
    addTest(tests, testId, 'N1 Kanji Quiz ' + pad(testNo, 2), 'Kanji', ['kanji'], questions);
  }

  const grammarMcqSources = takeSpread(grammarCards, 64, 11, 5);
  const grammarTfSources = takeSpread(grammarCards, 24, 73, 7);
  let grammarMcqOffset = 0;
  let grammarTfOffset = 0;

  for (let testNo = 1; testNo <= 8; testNo++) {
    const testId = 'n1-test-grammar-' + pad(testNo, 2);
    const questions = [];
    for (let i = 0; i < 8; i++) {
      const card = grammarMcqSources[grammarMcqOffset++];
      questions.push(makeMcq(card, grammarCards, testId + '-q' + pad(questions.length + 1, 3), ['grammar']));
    }
    questions.push(...makeTfBatch(
      grammarTfSources.slice(grammarTfOffset, grammarTfOffset + 3),
      grammarCards,
      3,
      testId,
      questions.length + 1,
      ['grammar'],
      tfState,
      23,
    ));
    grammarTfOffset += 3;
    addTest(tests, testId, 'N1 Grammar Quiz ' + pad(testNo, 2), 'Grammar', ['grammar'], questions);
  }

  const sentenceMcqSources = takeSpread(sentenceCards, 28, 17, 7);
  const sentenceTfSources = takeSpread(sentenceCards, 28, 89, 11);
  let sentenceMcqOffset = 0;
  let sentenceTfOffset = 0;

  for (let testNo = 1; testNo <= 7; testNo++) {
    const testId = 'n1-test-sentence-' + pad(testNo, 2);
    const questions = [];
    for (let i = 0; i < 4; i++) {
      const card = sentenceMcqSources[sentenceMcqOffset++];
      questions.push(makeMcq(card, sentenceCards, testId + '-q' + pad(questions.length + 1, 3), ['sentence']));
    }
    questions.push(...makeTfBatch(
      sentenceTfSources.slice(sentenceTfOffset, sentenceTfOffset + 4),
      sentenceCards,
      4,
      testId,
      questions.length + 1,
      ['sentence'],
      tfState,
      29,
    ));
    sentenceTfOffset += 4;
    addTest(tests, testId, 'N1 Sentence Reading Quiz ' + pad(testNo, 2), 'Sentences', ['sentence'], questions);
  }

  const mixedMcqSources = interleavePools([
    { cards: takeSpread(vocabCards, 4, 307, 5), pool: vocabCards, tags: ['mixed', 'vocabulary'] },
    { cards: takeSpread(kanjiCards, 2, 311, 5), pool: kanjiCards, tags: ['mixed', 'kanji'] },
    { cards: takeSpread(grammarCards, 4, 313, 5), pool: grammarCards, tags: ['mixed', 'grammar'] },
    { cards: takeSpread(sentenceCards, 2, 317, 5), pool: sentenceCards, tags: ['mixed', 'sentence'] },
  ]);
  const mixedTfSources = interleavePools([
    { cards: takeSpread(vocabCards, 12, 401, 5), pool: vocabCards, tags: ['mixed', 'vocabulary'] },
    { cards: takeSpread(kanjiCards, 6, 409, 5), pool: kanjiCards, tags: ['mixed', 'kanji'] },
    { cards: takeSpread(grammarCards, 8, 419, 5), pool: grammarCards, tags: ['mixed', 'grammar'] },
    { cards: takeSpread(sentenceCards, 8, 431, 5), pool: sentenceCards, tags: ['mixed', 'sentence'] },
  ]);
  const mixedFillSources = vocabFillSources.slice(vocabFillOffset, vocabFillOffset + 100);
  const mixedMcqCounts = [2, 2, 2, 2, 1, 1, 1, 1];
  const mixedFillCounts = [13, 13, 13, 13, 12, 12, 12, 12];
  const mixedTfCounts = [5, 5, 4, 4, 4, 4, 4, 4];
  let mixedMcqOffset = 0;
  let mixedFillOffset = 0;
  let mixedTfOffset = 0;

  for (let testNo = 1; testNo <= 8; testNo++) {
    const testId = 'n1-test-mixed-' + pad(testNo, 2);
    const questions = [];
    for (let i = 0; i < mixedMcqCounts[testNo - 1]; i++) {
      const source = mixedMcqSources[mixedMcqOffset++];
      questions.push(makeMcq(source.card, source.pool, testId + '-q' + pad(questions.length + 1, 3), source.tags));
    }
    for (let i = 0; i < mixedFillCounts[testNo - 1]; i++) {
      const card = mixedFillSources[mixedFillOffset++];
      questions.push(makeFillBlank(card, testId + '-q' + pad(questions.length + 1, 3), ['mixed', 'vocabulary']));
    }
    for (let i = 0; i < mixedTfCounts[testNo - 1]; i++) {
      const source = mixedTfSources[mixedTfOffset++];
      const isTrue = tfState.index % 2 === 0;
      questions.push(makeTf(
        source.card,
        pickFalseCard(source.card, source.pool, 31),
        testId + '-q' + pad(questions.length + 1, 3),
        isTrue,
        source.tags,
      ));
      tfState.index += 1;
    }
    addTest(tests, testId, 'N1 Mixed Practice Test ' + pad(testNo, 2), 'Mixed', ['mixed'], questions);
  }

  return tests;
}

module.exports = { generateTests };
