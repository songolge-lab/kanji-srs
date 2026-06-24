const KANJI_REGEX = /[一-鿿㐀-䶿]/g;

export function isJapaneseCard(cardLanguage) {
  return !cardLanguage || cardLanguage === 'ja' || cardLanguage === 'jp';
}

export function wrapKanji(text) {
  if (!text) return '';
  return text.replace(KANJI_REGEX, k => `<span class="kanji-clickable" data-kanji="${k}">${k}</span>`);
}
