const fs = require('fs');
const path = require('path');

const { vocab_topup } = require('./n3_topup_vocab.js');
const { sent_topup } = require('./n3_topup_sent.js');
const { sent_topup_2 } = require('./n3_topup_sent_2.js');

const cards = [];

const sents = [...sent_topup, ...sent_topup_2].slice(0, 120);

const vocab_fronts = new Set();
const sent_fronts = new Set();

let v_id = 1;
for (const [k, mean, ex_jp, ex_en] of vocab_topup) {
    if (vocab_fronts.has(k)) {
        console.log(`DUPLICATE VOCAB: ${k}`);
    }
    vocab_fronts.add(k);
    
    cards.push({
        id: `n3-vocab-d-${String(v_id).padStart(3, '0')}`,
        category: "vocabulary",
        front: k,
        back: mean,
        exampleJp: ex_jp,
        exampleTranslation: ex_en,
        tags: ["JLPT N3", "Vocabulary Top-up"]
    });
    v_id++;
}

let s_id = 1;
for (const [jp, en] of sents) {
    if (sent_fronts.has(jp)) {
        console.log(`DUPLICATE SENTENCE: ${jp}`);
    }
    sent_fronts.add(jp);
    
    cards.push({
        id: `n3-sentence-c-${String(s_id).padStart(3, '0')}`,
        category: "sentence",
        front: jp,
        back: en,
        exampleJp: jp,
        exampleTranslation: en,
        tags: ["JLPT N3", "Reading Comprehension Top-up"]
    });
    s_id++;
}

const out_dir = "data/curated-packs/en/intake/n3";
fs.mkdirSync(out_dir, { recursive: true });
const out_file = path.join(out_dir, "vocab_sentence_topup_220.json");

const output_data = {
    shardId: "n3-vocab-sentence-topup-220",
    level: "N3",
    language: "en",
    cards: cards
};

fs.writeFileSync(out_file, JSON.stringify(output_data, null, 2), "utf8");

console.log(`Wrote to ${out_file}`);
console.log(`Total cards: ${cards.length}`);
console.log(`Vocab count: ${vocab_topup.length}`);
console.log(`Sentence count: ${sents.length}`);

// Validation
console.log("\n--- VALIDATION ---");
const forbidden = ["furigana", "reading", "romaji", "onyomi", "kunyomi"];
let has_forbidden = false;
let missing_fields = false;

for (const c of cards) {
    for (const f of forbidden) {
        if (f in c) {
            console.log(`FORBIDDEN FIELD '${f}' in ${c.id}`);
            has_forbidden = true;
        }
    }
    const req = ["id", "category", "front", "back", "exampleJp", "exampleTranslation", "tags"];
    for (const r of req) {
        if (!(r in c)) {
            console.log(`MISSING FIELD '${r}' in ${c.id}`);
            missing_fields = true;
        }
    }
}

if (!has_forbidden && !missing_fields) {
    console.log("PASS: No forbidden or missing fields.");
}

const placeholders = ["example", "todo", "tbd", "placeholder", "dummy"];
for (const c of cards) {
    for (const p of placeholders) {
        if (c.front.toLowerCase().includes(p) || c.back.toLowerCase().includes(p) || c.exampleTranslation.toLowerCase().includes(p)) {
            console.log(`WARNING: Possible placeholder '${p}' in ${c.id}`);
        }
    }
}
