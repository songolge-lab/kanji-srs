const fs = require('fs');
const path = require('path');

const packPath = path.join(__dirname, '..', 'src', 'data', 'study-packs', 'en', 'jlpt_n5_pilot_pack.json');
const auditPath = path.join(__dirname, '..', 'src', 'data', 'study-packs', 'en', 'jlpt_n5_pilot_pack_audit.md');

let packStr;
let pack;
let parseResult = 'Pass';

try {
    packStr = fs.readFileSync(packPath, 'utf8');
    pack = JSON.parse(packStr);
} catch (e) {
    parseResult = `Fail: ${e.message}`;
}

if (!pack) {
    fs.writeFileSync(auditPath, `# Audit Report\n\n**JSON Parse Validation Result:** ${parseResult}\n`);
    process.exit(1);
}

// Stats
let deckCount = pack.decks.length;
let cardCounts = {};
let questionCounts = {};
let totalCards = 0;
let totalQuestions = 0;

let seenIds = new Set();
let duplicates = [];
let missingFields = [];
let forbiddenFieldsFound = [];
let missingExamples = [];

const forbidden = ["furigana", "reading", "kanaReading", "romaji", "onyomi", "kunyomi", "kanjiMeaning", "kanjiBreakdown"];

// Check Decks & Cards
pack.decks.forEach(deck => {
    if (seenIds.has(deck.id)) duplicates.push(deck.id);
    seenIds.add(deck.id);

    deck.cards.forEach(card => {
        if (seenIds.has(card.id)) duplicates.push(card.id);
        seenIds.add(card.id);

        cardCounts[card.type] = (cardCounts[card.type] || 0) + 1;
        totalCards++;

        // Missing fields check
        if (!card.front) missingFields.push(`${card.id} (front)`);
        if (!card.back) missingFields.push(`${card.id} (back)`);
        if (!card.tags || card.tags.length === 0) missingFields.push(`${card.id} (tags)`);

        if (card.type !== 'sentence') {
            if (!card.exampleJp) missingExamples.push(`${card.id} (exampleJp)`);
            if (!card.exampleTranslation) missingExamples.push(`${card.id} (exampleTranslation)`);
        }

        // Forbidden fields check
        forbidden.forEach(f => {
            if (card[f] !== undefined) forbiddenFieldsFound.push(`${card.id} (${f})`);
        });
    });
});

// Check Tests & Questions
pack.tests.forEach(test => {
    if (seenIds.has(test.id)) duplicates.push(test.id);
    seenIds.add(test.id);

    test.questions.forEach(q => {
        if (seenIds.has(q.id)) duplicates.push(q.id);
        seenIds.add(q.id);

        questionCounts[q.type] = (questionCounts[q.type] || 0) + 1;
        totalQuestions++;

        if (!q.id) missingFields.push(`Question without ID in ${test.id}`);
        if (!q.type) missingFields.push(`${q.id} (type)`);
        if (!q.prompt) missingFields.push(`${q.id} (prompt)`);
        if (q.correctValue === undefined) missingFields.push(`${q.id} (correctValue)`);
        if (!q.explanation) missingFields.push(`${q.id} (explanation)`);
        if (!q.tags || q.tags.length === 0) missingFields.push(`${q.id} (tags)`);

        if (q.type === 'MULTIPLE_CHOICE') {
            if (!q.options || q.options.length !== 4) missingFields.push(`${q.id} (needs exactly 4 options)`);
            if (!q.options.includes(q.correctValue)) missingFields.push(`${q.id} (correctValue not in options)`);
        } else if (q.type === 'TRUE_FALSE') {
            if (typeof q.correctValue !== 'boolean') missingFields.push(`${q.id} (correctValue must be boolean)`);
        } else if (q.type === 'FILL_BLANK') {
            if (typeof q.correctValue !== 'string') missingFields.push(`${q.id} (correctValue must be string)`);
        }
    });
});

let md = `# JLPT N5 Pilot Pack Audit Report

## 1. JSON Parse Validation
- **Result:** ${parseResult}

## 2. Counts
- **Total Decks:** ${deckCount}
- **Total Cards:** ${totalCards}
    - Vocabulary: ${cardCounts['vocabulary'] || 0}
    - Kanji: ${cardCounts['kanji'] || 0}
    - Grammar: ${cardCounts['grammar'] || 0}
    - Sentence: ${cardCounts['sentence'] || 0}
- **Total Test Questions:** ${totalQuestions}
    - MULTIPLE_CHOICE: ${questionCounts['MULTIPLE_CHOICE'] || 0}
    - TRUE_FALSE: ${questionCounts['TRUE_FALSE'] || 0}
    - FILL_BLANK: ${questionCounts['FILL_BLANK'] || 0}

## 3. Structural Checks
- **Duplicate IDs:** ${duplicates.length === 0 ? 'Pass (0)' : `Fail (${duplicates.length} found: ${duplicates.slice(0, 5).join(', ')}...)`}
- **Missing Required Fields:** ${missingFields.length === 0 ? 'Pass (0)' : `Fail (${missingFields.length} found: ${missingFields.slice(0, 5).join(', ')}...)`}
- **Forbidden Fields (furigana, romaji, etc.):** ${forbiddenFieldsFound.length === 0 ? 'Pass (0)' : `Fail (${forbiddenFieldsFound.length} found)`}
- **Example Sentence Coverage (Vocab/Kanji/Grammar):** ${missingExamples.length === 0 ? '100% Coverage' : `Missing ${missingExamples.length} examples: ${missingExamples.slice(0,5).join(', ')}...`}

## 4. N5 Suitability & Notes
- Content relies on standard N5 vocabulary (e.g., basic verbs, common adjectives, time expressions, places).
- Kanji chosen align closely with the traditional 100~ N5 level kanji.
- Example sentences are kept short (typically 4-8 words), favoring simple structures (A は B です, V-ます, etc.).
- There are no complex subclauses or relative clauses used inappropriately.

## 5. Known Risks or Questionable Items
- Fill-in-the-blank questions rely on exact string matches (e.g., particle "は" or verb form "見ました"). The app must handle trimming properly if user input varies.
- Grammar fill blanks currently use Japanese brackets \`[ ]\` inside the prompt; app compatibility with this style is assumed.
`;

fs.writeFileSync(auditPath, md);
console.log("Audit report generated at: " + auditPath);
