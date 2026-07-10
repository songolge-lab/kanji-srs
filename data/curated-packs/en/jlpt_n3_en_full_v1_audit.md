# JLPT N3 English Full Pack (v1) Audit

## Input Shard Counts
- sources/cards.js: 1249 (vocabulary: 625, kanji: 180, grammar: 144, sentence: 300)

## Cleanup Summary
- Input cards: 1249
- Removed cards: 0 (vocabulary: 0, grammar: 0, kanji: 0, sentence: 0)
- Fixed/disambiguated cards: 0
- Duplicate vocabulary fronts collapsed to one strongest card per front.
- Duplicate grammar fronts were either removed or renamed with a clear disambiguator when the meanings were distinct.
- No Supabase upload was performed.

## Removed Cards
- None.

## Fixed Cards
- None.

## Final Counts
- Vocabulary cards: 625
- Kanji cards: 180
- Grammar cards: 144
- Sentence cards: 300
- Total cards: 1249
- Test objects: 30
- Test questions: 420
- MULTIPLE_CHOICE: 180
- TRUE_FALSE: 100
- FILL_BLANK: 140
- TRUE_FALSE balance: 50 true / 50 false

## Validation
- Validator result: Passed: validate.js completed with 0 errors.
- Rebuild SHA stability: 425b468e7b15eaec14640fa745d18d98f82dd42c9805899d9610863772df4f48 (stable: yes)
- Publishable: Yes

## Quality Notes
- Final IDs are deterministic and use the requested N3 prefixes.
- Release cards intentionally omit furigana, reading, romaji, onyomi, and kunyomi fields.
- MCQ distractors are selected deterministically from real same-category pack answers.
- Fill-blank questions use explicit curated specs in `sources/tests.js`.
- Known weak phrases from the request were fixed or removed before release generation.

## Suspected Too-Basic / Too-Advanced / Boundary Items
- Some N4/N5 overlap remains where the card has N3 reading value or functions as lower-intermediate support vocabulary. Exact N3-internal duplicate fronts were removed, but cross-pack overlap was not used as an automatic deletion rule.
- A few grammar patterns sit near the N3/N2 boundary, including formal basis/compliance patterns such as に基づいて, に沿って, に関して, をめぐって, and に応じて. They are retained as useful lower-intermediate boundary material.
- Human Japanese review is still recommended before broad public distribution, especially for level-boundary vocabulary and sentence naturalness.

## Known Risks
- The final card total is lower than the intake target because duplicate fronts were removed instead of padded.
- Validator checks deterministic structure and known weak patterns, but it cannot replace native-speaker review for every example sentence.
