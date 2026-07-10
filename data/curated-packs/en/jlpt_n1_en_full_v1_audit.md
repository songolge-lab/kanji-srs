# JLPT N1 English Full Pack (v1) Audit

## Input Shard Counts
- sources/cards.js: 1410 (vocabulary: 698, kanji: 216, grammar: 136, sentence: 360)

## Cleanup Summary
- Input cards: 1410
- Removed cards: 0 (vocabulary: 0, kanji: 0, grammar: 0, sentence: 0)
- Fixed cards: 0
- Exact duplicate fronts were collapsed to the strongest card per category.
- Duplicate grammar fronts were removed unless they were meaningfully distinct; no disambiguated duplicates were needed after review.
- No filler cards were invented to restore the intake target.
- No Supabase upload was performed.

## Removed Cards
- None.

## Fixed Cards
- None.

## Final Counts
- Vocabulary cards: 698
- Kanji cards: 216
- Grammar cards: 136
- Sentence cards: 360
- Total cards: 1410
- Test objects: 40
- Test questions: 520
- MULTIPLE_CHOICE: 220
- TRUE_FALSE: 120
- FILL_BLANK: 180
- TRUE_FALSE balance: 60 true / 60 false

## Validation
- Validator result: Passed: validate.js completed with 0 errors.
- Rebuild SHA stability: ea1ff16fb259e742b8b721ff3847540f49416eb56a1c06b3f1a134580a39f249 (stable: yes)
- Publishable: Yes

## Candidate-Risk Kanji Review


## Quality Notes
- Final IDs are deterministic and use the requested N1 prefixes.
- Release cards intentionally omit furigana, reading, romaji, onyomi, and kunyomi fields.
- MCQ distractors are selected deterministically from real same-category pack answers.
- Fill-blank prompts use exact-front blanks from cleaned Japanese examples, limited to cards whose examples contain the final front verbatim.
- Known weak phrases from the intake request were fixed or removed before release generation.

## Suspected Too-Basic / Too-Obscure / Boundary Items
- Lower-level overlap retained after cleanup: vocabulary: 0, kanji: 0, grammar: 0, sentence: 0.
- Some N2-boundary vocabulary remains where it is common in N1 reading passages or appears in formal/media/policy contexts.
- Some advanced kanji remain literary, public-affairs, legal-adjacent, or health-adjacent; they were kept when the example used a recognizable compound rather than a rare isolated dictionary sense.
- The grammar deck is substantially below the intake target because exact duplicate fronts were removed instead of renamed without a meaningful distinction.

## Known Risks
- Validator checks deterministic structure and known weak patterns, but it cannot replace native-speaker review for every example sentence.
- A few retained kanji and formal nouns may still feel specialized depending on the learner's reading goals.
- The final card total is lower than the intake target because duplicate and weak cards were removed rather than padded.
