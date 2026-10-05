// Unified ideographs (including supplementary planes), compatibility
// ideographs, and the Japanese ideographic iteration mark 々. Radicals, 〇,
// 〆 and kana repetition marks are not ideographs in this contract. Variation
// selectors stay literal source text; no normalization or coverage expansion.
export const IDEOGRAPH_SOURCE = '[\\p{Unified_Ideograph}\\uF900-\\uFAFF\\u{2F800}-\\u{2FA1F}々]';
const IDEOGRAPH = new RegExp(IDEOGRAPH_SOURCE, 'u');
export const KANJI_BLOCK_SOURCE = `${IDEOGRAPH_SOURCE}+[ぁ-んァ-ヶー]*`;

export function hasKanji(text) { return IDEOGRAPH.test(text || ''); }
export function isKanjiChar(character) { return hasKanji(character); }
export function codePointLength(text) { return Array.from(text || '').length; }
export function isCodePointBoundary(text, offset) {
  return !(offset > 0 && offset < text.length
    && /[\uD800-\uDBFF]/.test(text[offset - 1]) && /[\uDC00-\uDFFF]/.test(text[offset]));
}
