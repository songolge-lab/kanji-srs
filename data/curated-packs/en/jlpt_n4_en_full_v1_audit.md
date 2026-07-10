# JLPT N4 English Full Pack (v1) Audit

## Counts
- Vocabulary cards: 900 / 900
- Kanji cards: 180 / 180
- Grammar cards: 160 / 160
- Sentence cards: 300 / 300
- Total cards: 1540 / 1540
- Test objects: 28 / 28
- Test questions: 400 / 400
- MULTIPLE_CHOICE: 170 / 170
- TRUE_FALSE: 100 / 100
- FILL_BLANK: 130 / 130
- TRUE_FALSE balance: 50 true / 50 false

## Validation
- Validator result: Passed: validate.js completed with 0 errors.
- Vocabulary example cleanup: Passed: 900 vocabulary examples checked; verb cards require exact curated examples, and the known park-intent, dangling-verb, clerk/color, sleepiness, preparation-study, and meta-study patterns are blocked.
- Double punctuation check: Passed: prompts, explanations, answers, examples, and translations contain no blocked double-punctuation artifacts.
- Remaining suspected weak examples: No blocking weak examples detected by validator; optional human language review is still recommended before broad public distribution.
- Rebuild SHA stability: 5218d58a57e48195498662ab2701c3daffd2189fc5292e3f0eb4f9c19b6f851f (stable: yes)
- Publishable: Yes

## Quality Notes
- Source content is deterministic and original educational material.
- Vocabulary examples use exact curated examples for verbs and awkward-prone nouns, with semantic templates retained only for lower-risk non-verbs; the old meta-study/example-note layer is not used.
- Cards intentionally omit furigana, reading, romaji, onyomi, kunyomi, and kanji breakdown fields.
- MCQ distractors are selected deterministically from real pack answers in the same card category.
- Fill-blank questions use explicit curated specs in `sources/tests.js`.
- No Supabase upload was performed.

## Suspected Too-Advanced / Boundary Items
- Passive, causative, and basic honorific cards are included as N4-boundary review items. They should receive human review before publication if the pack is held to a conservative N4-only grammar boundary.
- A small number of vocabulary items may overlap with N5 because they are useful support words in N4 examples; the pack is still primarily N4-oriented.

## Known Risks / Compromises
- Non-verb vocabulary examples still include deterministic semantic templates; they are original and validator-checked, but a human Japanese review is still recommended for broad public distribution.
- The release is not marked publishable unless validation passes and SHA stability is confirmed.
