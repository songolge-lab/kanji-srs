import { esc } from '../utils.js';
import { IDEOGRAPH_SOURCE } from './japaneseText.js';

export function isJapaneseCard(cardLanguage) {
  return !cardLanguage || cardLanguage === 'ja' || cardLanguage === 'jp';
}

export function wrapKanji(text) {
  if (!text) return '';
  return text.replace(new RegExp(IDEOGRAPH_SOURCE, 'gu'), k => `<span class="kanji-clickable" data-kanji="${k}">${k}</span>`);
}

// Wraps an already-rendered word block (`contentHtml`, e.g. ruby markup) in a
// single clickable span that opens the contextual Word Modal. `word` and
// `sentence` ride along as data attributes for the AI lookup. Used on the back
// of flashcards (see CardView.smartRuby) so the WHOLE compound word — not each
// kanji — is the click target.
export function wrapWord(contentHtml, word, sentence) {
  return `<span class="word-clickable" data-word="${esc(word)}" data-sentence="${esc(sentence || '')}">${contentHtml}</span>`;
}
