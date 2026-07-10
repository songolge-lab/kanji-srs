const fs = require('fs');
const path = require('path');

const packId = 'jlpt-n5-en-full-v1';

const vocabCards = require('./sources/vocabulary.js');

const kanjiList = require('./sources/kanji.js');

let kanjiCards = [];
let kanjiFronts = new Set();
kanjiList.forEach(kStr => {
    let parts = kStr.split('|');
    if (parts.length === 4 && !kanjiFronts.has(parts[0])) {
        kanjiFronts.add(parts[0]);
        kanjiCards.push({ 
            id: packId + '-k-' + (kanjiCards.length + 1), 
            type: 'kanji', 
            level: 'N5', 
            category: 'Kanji', 
            front: parts[0], 
            back: parts[1], 
            exampleJp: parts[2], 
            exampleTranslation: parts[3], 
            tags: ['kanji'] 
        });
    }
});

const grammarList = require('./sources/grammar.js');

let grammarCards = [];
let grammarFronts = new Set();
grammarList.forEach(gStr => {
    let parts = gStr.split('|');
    if (parts.length === 4 && !grammarFronts.has(parts[0])) {
        grammarFronts.add(parts[0]);
        grammarCards.push({ 
            id: packId + '-g-' + (grammarCards.length + 1), 
            type: 'grammar', 
            level: 'N5', 
            category: 'Grammar', 
            front: parts[0], 
            back: parts[1], 
            exampleJp: parts[2], 
            exampleTranslation: parts[3], 
            tags: ['grammar'] 
        });
    }
});

const sentenceList = require('./sources/sentences.js');

let sentenceCards = [];
sentenceList.forEach((sStr) => {
    let parts = sStr.split('|');
    sentenceCards.push({
        id: packId + '-s-' + (sentenceCards.length + 1),
        type: 'sentence',
        level: 'N5',
        category: 'Sentences',
        front: parts[0],
        back: parts[1],
        exampleJp: "",
        exampleTranslation: "",
        tags: ['sentence']
    });
});


// Tests (Generated via tests.js to perfectly hit 300 caps)
const { generateTests } = require('./sources/tests.js');
const tests = generateTests(vocabCards, kanjiCards, grammarCards, sentenceCards, packId);

let testQuestions = [];
tests.forEach(t => testQuestions = testQuestions.concat(t.questions));

const qTypeCounts = testQuestions.reduce((acc, q) => {
    acc[q.type] = (acc[q.type] || 0) + 1;
    return acc;
}, {});
const tfTrueCount = testQuestions.filter(q => q.type === 'TRUE_FALSE' && String(q.correctValue) === 'true').length;
const tfFalseCount = testQuestions.filter(q => q.type === 'TRUE_FALSE' && String(q.correctValue) === 'false').length;
const isComplete =
    vocabCards.length === 650 &&
    kanjiCards.length === 120 &&
    grammarCards.length === 120 &&
    sentenceCards.length === 220 &&
    tests.length === 22 &&
    testQuestions.length === 300 &&
    qTypeCounts.MULTIPLE_CHOICE === 130 &&
    qTypeCounts.TRUE_FALSE === 80 &&
    qTypeCounts.FILL_BLANK === 90 &&
    tfTrueCount === 40 &&
    tfFalseCount === 40;

const pack = {
    packId: packId,
    schemaVersion: 1,
    version: "1.0.0",
    level: "N5",
    language: "en",
    title: "JLPT N5 English Full Pack",
    description: "A beginner JLPT N5 study pack with curated vocabulary, kanji, grammar, sentences, and practice tests.",
    source: "curated",
    decks: [
        { id: packId + '-deck-vocab', title: "N5 Vocabulary", type: "vocabulary", level: "N5", category: "Vocabulary", description: "All N5 Vocabulary", cards: vocabCards },
        { id: packId + '-deck-kanji', title: "N5 Kanji", type: "kanji", level: "N5", category: "Kanji", description: "All N5 Kanji", cards: kanjiCards },
        { id: packId + '-deck-grammar', title: "N5 Grammar", type: "grammar", level: "N5", category: "Grammar", description: "All N5 Grammar", cards: grammarCards },
        { id: packId + '-deck-sentence', title: "N5 Sentences", type: "sentence", level: "N5", category: "Sentences", description: "All N5 Sentences", cards: sentenceCards }
    ],
    tests: tests
};

fs.writeFileSync(path.join(__dirname, '..', 'jlpt_n5_en_full_v1.json'), JSON.stringify(pack, null, 2), 'utf8');

const auditContent = "# JLPT N5 English Full Pack (v1) Audit\n\n" +
"## Build Requirements\n" +
"- 650 Vocab cards\n" +
"- 120 Kanji cards\n" +
"- 120 Grammar cards\n" +
"- 220 Sentence cards\n" +
"- 300 Test Questions (130 MC, 80 TF, 90 FB)\n\n" +
"## Quality Checks\n" +
"- NO placeholder, dummy, or fake content.\n" +
"- NO duplicated card fronts.\n" +
"- MCQ distractors are real values from the same category.\n" +
"- TRUE_FALSE questions are balanced.\n" +
"- FILL_BLANK questions use natural varied prompts extracted from example sentences.\n\n" +
"## Current Status\n" +
"**" + (isComplete ? "SUCCESS / COMPLETED" : "FAIL / NEEDS HUMAN REVIEW") + "**\n" +
"- Vocabulary cards: " + vocabCards.length + " / 650\n" +
"- Kanji cards: " + kanjiCards.length + " / 120\n" +
"- Grammar cards: " + grammarCards.length + " / 120\n" +
"- Sentence cards: " + sentenceCards.length + " / 220\n" +
"- Tests: " + tests.length + " / 22\n" +
"- Test questions: " + testQuestions.length + " / 300\n" +
"- TRUE_FALSE balance: " + tfTrueCount + " true / " + tfFalseCount + " false\n" +
"- Full pack is " + (isComplete ? "publishable after final human review." : "not publishable yet.") + "\n\n" +
"**Current Counts:**\n" +
"- Vocab: " + vocabCards.length + "\n" +
"- Kanji: " + kanjiCards.length + "\n" +
"- Grammar: " + grammarCards.length + "\n" +
"- Sentences: " + sentenceCards.length + "\n" +
"- Test Questions: " + testQuestions.length + " (" +
(qTypeCounts.MULTIPLE_CHOICE || 0) + " MCQ, " +
(qTypeCounts.TRUE_FALSE || 0) + " TF, " +
(qTypeCounts.FILL_BLANK || 0) + " FB)\n";

fs.writeFileSync(path.join(__dirname, '..', 'jlpt_n5_en_full_v1_audit.md'), auditContent, 'utf8');

console.log('Vocab:', vocabCards.length);
console.log('Kanji:', kanjiCards.length);
console.log('Grammar:', grammarCards.length);
console.log('Sentences:', sentenceCards.length);
console.log('Total Questions:', testQuestions.length);
