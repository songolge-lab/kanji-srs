# JLPT N2 English Full Pack (v1) Audit

## Input Shard Counts
- sources/cards.js: 1303 (vocabulary: 635, kanji: 219, grammar: 149, sentence: 300)

## Cleanup Summary
- Input cards: 1303
- Removed cards: 0 (vocabulary: 0, kanji: 0, grammar: 0, sentence: 0)
- Fixed cards: 0
- Exact duplicate fronts were collapsed to the strongest card per category.
- Duplicate grammar fronts were removed unless the remaining cards had distinct fronts.
- No filler cards were invented to restore the intake target.
- No Supabase upload was performed.

## Removed Cards
- None.

## Fixed Cards
- None.

## Final Counts
- Vocabulary cards: 635
- Kanji cards: 219
- Grammar cards: 149
- Sentence cards: 300
- Total cards: 1303
- Test objects: 36
- Test questions: 500
- MULTIPLE_CHOICE: 210
- TRUE_FALSE: 120
- FILL_BLANK: 170
- TRUE_FALSE balance: 60 true / 60 false

## Validation
- Validator result: Passed: validate.js completed with 0 errors.
- Rebuild SHA stability: d9116a47abeb55e0cd39ede333912f0669271e570e0367a9f71957f49a9cf229 (stable: yes)
- Publishable: Yes

## Quality Notes
- Final IDs are deterministic and use the requested N2 prefixes.
- Release cards intentionally omit furigana, reading, romaji, onyomi, and kunyomi fields.
- MCQ distractors are selected deterministically from real same-category pack answers.
- Fill-blank prompts use exact-front blanks from cleaned Japanese examples, limited to cards whose examples contain the final front verbatim.
- Known weak phrases from the intake request were fixed or removed before release generation.

## Suspected Too-Basic / Too-Advanced / Boundary Items
- Some N3 overlap remains where the card has N2 reading value or functions as upper-intermediate transition material. Cross-pack overlap was audited but not used as an automatic deletion rule.
- Some formal grammar overlaps with N3 boundary patterns, including basis, standpoint, contrast, and non-volitional emotion patterns. They are retained because the N2 intake uses more formal/business/public examples.
- A few kanji overlap with earlier packs in simple meaning, but the examples use N2-level compounds and contexts.

## Known Risks
- The final card total is lower than the intake target because duplicate fronts were removed instead of padded.
- Validator checks deterministic structure and known weak patterns, but it cannot replace native-speaker review for every example sentence.
