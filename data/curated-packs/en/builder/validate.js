const fs = require('fs');
const path = require('path');

const builderDir = __dirname;
const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'jlpt_n5_en_full_v1.json'), 'utf8'));

let errors = [];

// 1. Required top-level fields
const requiredTop = ['packId', 'schemaVersion', 'version', 'level', 'language', 'title', 'description', 'source', 'decks', 'tests'];
requiredTop.forEach(f => {
    if (data[f] === undefined) errors.push('Missing top-level field: ' + f);
});

// 2. Card count
let cards = [];
data.decks.forEach(d => cards = cards.concat(d.cards));
if (cards.length !== 1110) errors.push('Total cards != 1110. Found: ' + cards.length);

const vCards = cards.filter(c => c.type === 'vocabulary');
const kCards = cards.filter(c => c.type === 'kanji');
const gCards = cards.filter(c => c.type === 'grammar');
const sCards = cards.filter(c => c.type === 'sentence');
if (vCards.length !== 650) errors.push('Vocab cards != 650. Found: ' + vCards.length);
if (kCards.length !== 120) errors.push('Kanji cards != 120. Found: ' + kCards.length);
if (gCards.length !== 120) errors.push('Grammar cards != 120. Found: ' + gCards.length);
if (sCards.length !== 220) errors.push('Sentence cards != 220. Found: ' + sCards.length);

// 3. Tests count & structure
if (data.tests.length !== 22) errors.push('Total tests != 22. Found: ' + data.tests.length);

let titleStructure = {
    "N5 Vocabulary Quiz": 8,
    "N5 Kanji Quiz": 3,
    "N5 Grammar Quiz": 5,
    "N5 Sentence Reading Quiz": 3,
    "N5 Mixed Practice Test": 3
};
let titleCounts = {
    "N5 Vocabulary Quiz": 0,
    "N5 Kanji Quiz": 0,
    "N5 Grammar Quiz": 0,
    "N5 Sentence Reading Quiz": 0,
    "N5 Mixed Practice Test": 0
};
data.tests.forEach(t => {
    let prefix = t.title.substring(0, t.title.length - 3);
    if (titleCounts[prefix] !== undefined) titleCounts[prefix]++;
});
Object.keys(titleStructure).forEach(k => {
    if (titleCounts[k] !== titleStructure[k]) errors.push(`Test structure mismatch for ${k}. Expected ${titleStructure[k]}, found ${titleCounts[k]}`);
});

let questions = [];
data.tests.forEach(t => questions = questions.concat(t.questions));
if (questions.length !== 300) errors.push('Total questions != 300. Found: ' + questions.length);

const mcq = questions.filter(q => q.type === 'MULTIPLE_CHOICE');
const tf = questions.filter(q => q.type === 'TRUE_FALSE');
const fb = questions.filter(q => q.type === 'FILL_BLANK');
if (mcq.length !== 130) errors.push('MCQ != 130. Found: ' + mcq.length);
if (tf.length !== 80) errors.push('TF != 80. Found: ' + tf.length);
if (fb.length !== 90) errors.push('FB != 90. Found: ' + fb.length);

// 4. IDs unique
const ids = new Set();
data.decks.forEach(d => {
    if (ids.has(d.id)) errors.push('Duplicate deck ID: ' + d.id);
    ids.add(d.id);
});
cards.forEach(c => {
    if (ids.has(c.id)) errors.push('Duplicate card ID: ' + c.id);
    ids.add(c.id);
});
data.tests.forEach(t => {
    if (ids.has(t.id)) errors.push('Duplicate test ID: ' + t.id);
    ids.add(t.id);
    t.questions.forEach(q => {
        if (ids.has(q.id)) errors.push('Duplicate question ID: ' + q.id);
        ids.add(q.id);
    });
});

// 5. SourceCardIds valid
questions.forEach(q => {
    if (q.sourceCardIds) {
        q.sourceCardIds.forEach(id => {
            if (!cards.find(c => c.id === id)) errors.push('Invalid sourceCardId: ' + id + ' in question ' + q.id);
        });
    }
});

// 6. No forbidden fields
const forbidden = ['furigana', 'reading', 'romaji', 'onyomi', 'kunyomi', 'kanaReading', 'kanjiMeaning', 'kanjiBreakdown'];
cards.forEach(c => {
    forbidden.forEach(f => {
        if (c[f] !== undefined) errors.push('Forbidden field found: ' + f + ' on card ' + c.id);
    });
    if (!c.front || !c.back) errors.push('Empty front/back on card ' + c.id);
    if (c.type !== 'sentence' && (!c.exampleJp || !c.exampleTranslation)) errors.push('Empty example on card ' + c.id);
});

// 7. Categories / Tags
data.tests.forEach(t => {
    if (!t.category) errors.push('Missing category on test ' + t.id);
    if (t.type === 'MIXED' && t.category !== 'Mixed') errors.push('Mixed test does not have category "Mixed". ID: ' + t.id);
});

// 8. Answer choices / fill blank / TF balance
mcq.forEach(q => {
    if (!q.options || q.options.length !== 4) errors.push('MCQ options != 4 on ' + q.id);
    if (q.options && new Set(q.options).size !== q.options.length) errors.push('Duplicate MCQ option found on ' + q.id);
    if (!q.options.includes(q.correctValue)) errors.push('MCQ correctValue not in options on ' + q.id);
    
    // Check for dummy distractors
    q.options.forEach(opt => {
        if (['A', 'B', 'C', 'D'].includes(opt) || opt.toLowerCase().includes('distractor')) {
            errors.push('Placeholder distractor found in MCQ ' + q.id + ': ' + opt);
        }
    });
});

fb.forEach(q => {
    if (!q.correctValue || q.correctValue.trim() === '') errors.push('Empty FB correctValue on ' + q.id);
    if (q.prompt && q.prompt.includes('Complete the sentence: [  ] です。')) {
        errors.push('Generic FB prompt found in ' + q.id);
    }
});

const fbPrompts = new Set();
const awkwardSuffixAnswers = new Set(['いです', 'くないです', 'かったです', 'くなかったです']);
fb.forEach(q => {
    if (fbPrompts.has(q.prompt)) errors.push('Duplicate FILL_BLANK prompt found on ' + q.id);
    fbPrompts.add(q.prompt);
    if (awkwardSuffixAnswers.has(q.correctValue)) {
        errors.push('Awkward suffix-only FILL_BLANK answer found on ' + q.id + ': ' + q.correctValue);
    }
});

let tfTrueCount = tf.filter(q => String(q.correctValue) === "true").length;
let tfFalseCount = tf.filter(q => String(q.correctValue) === "false").length;
if (tfTrueCount !== 40 || tfFalseCount !== 40) {
    errors.push('TRUE_FALSE questions are not perfectly balanced (True: ' + tfTrueCount + ', False: ' + tfFalseCount + ', Expected: 40/40)');
}

// 9. No obvious duplicate cards (front)
let fronts = new Set();
cards.forEach(c => {
    if (fronts.has(c.type + '_' + c.front)) errors.push('Duplicate front text: ' + c.front + ' (' + c.type + ')');
    fronts.add(c.type + '_' + c.front);
});

// 10. Placeholder string checks
const dummyRegex = /dummy|placeholder|sentence \d{3}|grammar pattern \d{3}|漢\d+/i;
cards.forEach(c => {
    if (dummyRegex.test(c.front) || dummyRegex.test(c.back) || dummyRegex.test(c.exampleJp)) {
        errors.push('Placeholder text found in card ' + c.id + ': ' + c.front);
    }
});
questions.forEach(q => {
    if (dummyRegex.test(q.prompt)) {
        errors.push('Placeholder text found in question ' + q.id + ': ' + q.prompt);
    }
});

// Guard release reproducibility: generated tests must be deterministic and match the checked-in JSON.
const testsSourcePath = path.join(builderDir, 'sources', 'tests.js');
const testsSource = fs.readFileSync(testsSourcePath, 'utf8');
if (/\bMath\.random\s*\(/.test(testsSource)) {
    errors.push('Math.random usage found in tests.js');
}

try {
    const packId = data.packId;
    const vocabCards = require(path.join(builderDir, 'sources', 'vocabulary.js'));
    const kanjiList = require(path.join(builderDir, 'sources', 'kanji.js'));
    const grammarList = require(path.join(builderDir, 'sources', 'grammar.js'));
    const sentenceList = require(path.join(builderDir, 'sources', 'sentences.js'));
    const { generateTests } = require(testsSourcePath);

    const kanjiCards = [];
    const kanjiFronts = new Set();
    kanjiList.forEach(kStr => {
        const parts = kStr.split('|');
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

    const grammarCards = [];
    const grammarFronts = new Set();
    grammarList.forEach(gStr => {
        const parts = gStr.split('|');
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

    const sentenceCards = [];
    sentenceList.forEach(sStr => {
        const parts = sStr.split('|');
        sentenceCards.push({
            id: packId + '-s-' + (sentenceCards.length + 1),
            type: 'sentence',
            level: 'N5',
            category: 'Sentences',
            front: parts[0],
            back: parts[1],
            exampleJp: '',
            exampleTranslation: '',
            tags: ['sentence']
        });
    });

    const generatedA = generateTests(vocabCards, kanjiCards, grammarCards, sentenceCards, packId);
    const generatedB = generateTests(vocabCards, kanjiCards, grammarCards, sentenceCards, packId);
    if (JSON.stringify(generatedA) !== JSON.stringify(generatedB)) {
        errors.push('generateTests output is not deterministic across two in-memory runs');
    }
    if (JSON.stringify(data.tests) !== JSON.stringify(generatedA)) {
        errors.push('Pack tests do not match the deterministic generator output; rebuild the release JSON');
    }
} catch (e) {
    errors.push('Determinism validation failed: ' + (e && e.message ? e.message : e));
}

let report = "";
if (errors.length === 0) {
    report = 'Validation passed perfectly!\n';
} else {
    report = 'Validation errors found:\n';
    errors.forEach(e => report += ' - ' + e + '\n');
}

console.log(report);
if (errors.length > 0) process.exit(1);
