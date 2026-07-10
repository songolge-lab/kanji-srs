# JLPT Study Pack Schema

## Overview
This document defines the canonical schema for JLPT study packs in Kanji-SRS. The structure is designed to support multiple levels (N5-N1), multiple languages (en, tr, ko, mn), and content categories including Vocabulary, Kanji, Grammar, and Sentences.

## Core Principles
1. **No Generated Content in Packs**: Do NOT store `furigana`, `reading`, `kanaReading`, `romaji`, `onyomi`, `kunyomi`, `kanjiMeaning`, or `kanjiBreakdown`. The app generates furigana via the offline kuromoji parser and looks up kanji details using the offline dictionary service.
2. **Stable Deterministic IDs**: Every deck, card, and question must have a stable, uniquely identifying ID (e.g., `n5-vocab-time-001`). This ID must remain consistent across translation passes.
3. **Localization Separation**: The Japanese front (`front`, `exampleJp`) remains stable across translation passes. Only localized fields (`back`, `exampleTranslation`, `description`, `title`) change between `en`, `tr`, `ko`, `mn` packs.
4. **Natural Examples**: Every vocabulary, kanji, and grammar card should include at least one natural example sentence (`exampleJp`) and its translation (`exampleTranslation`). For N5/N4, keep sentences short and simple.
5. **Original Test Content**: All test questions must be original and pedagogically useful. Do not copy copyrighted JLPT materials.

## File Structure
A single pack is a JSON file conforming to the following root shape.

### Root Object
```json
{
  "packId": "jlpt-n5-en-pilot-v1",
  "schemaVersion": 1,
  "version": "0.1.0",
  "level": "N5",
  "language": "en",
  "title": "JLPT N5 English Pilot Pack",
  "description": "A curated JLPT N5 starter pack for vocabulary, kanji, grammar, sentence reading, and tests.",
  "decks": [],
  "tests": []
}
```

### Deck Object
```json
{
  "id": "n5-vocab-time",
  "title": "N5 Vocabulary - Time & Dates",
  "type": "vocabulary",
  "level": "N5",
  "category": "Time & Dates",
  "description": "Common N5 time and date expressions.",
  "cards": []
}
```
*Allowed deck `type`s:* `vocabulary`, `kanji`, `grammar`, `sentence`.

### Card Object
Cards must omit all phonetic or dictionary data.
```json
{
  "id": "n5-vocab-time-001",
  "type": "vocabulary",
  "level": "N5",
  "category": "Time & Dates",
  "front": "今日",
  "back": "today",
  "exampleJp": "今日は学校へ行きます。",
  "exampleTranslation": "I am going to school today.",
  "tags": ["time", "daily-life", "common"]
}
```
*Note: For `sentence` type cards, `exampleJp` and `exampleTranslation` may be omitted if `front` serves as the sentence and `back` as the translation.*

### Test Object
```json
{
  "id": "n5-vocab-mcq-01",
  "title": "N5 Vocabulary Quiz 01 - Basic Words",
  "level": "N5",
  "type": "MULTIPLE_CHOICE",
  "category": "Vocabulary",
  "questions": []
}
```
*Allowed test `type`s (informational/grouping):* `MULTIPLE_CHOICE`, `MIXED`, etc.

**Folder placement on import:** the app organizes every pack's tests into a folder tree in the Tests screen (see the "Curated Study Packs" section of `CLAUDE.md`) instead of dropping them flat. One root folder is created named after the pack's `title`; each test is then filed into a `Vocabulary`/`Kanji`/`Grammar`/`Sentences`/`Mixed` subfolder under that root, chosen from the test's `category` field (falling back to `tags`, then `type`, matched case-insensitively). Tests whose category can't be determined stay directly under the pack's root folder. Populate `category` explicitly (e.g. `"Vocabulary"`) to control subfoldering.

### Question Object
```json
{
  "id": "n5-vocab-mcq-001",
  "type": "MULTIPLE_CHOICE",
  "prompt": "What does 今日 mean?",
  "image": null,
  "options": ["today", "tomorrow", "yesterday", "morning"],
  "correctValue": "today",
  "explanation": "今日 means today.",
  "sourceCardIds": ["n5-vocab-time-001"],
  "tags": ["time", "vocabulary"]
}
```
*Allowed question `type`s:*
- `MULTIPLE_CHOICE` (requires exactly 4 `options`, `correctValue` must equal one option)
- `TRUE_FALSE` (no `options`, `correctValue` is boolean)
- `FILL_BLANK` (no `options`, `correctValue` is a string)

## Future Proofing
- **Community Packs**: The `packId` and `version` fields will help version control community-submitted study lists.
- **Translation Pipeline**: The `language` field specifies the locale. Tooling can extract English strings, provide them to translators, and rebuild the JSON with new locales while preserving structure.
- **Test-to-Deck**: By mapping `sourceCardIds` in test questions, the app can eventually flag weak cards based on missed test questions and promote them back into active study queues.
