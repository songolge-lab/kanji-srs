import kanjiBase from '../data/locales/kanji_base.json';

let meaningEn = null;
let meaningLang = null;
let activeLang = 'en';

async function loadPack(lang) {
  switch (lang) {
    case 'en': return (await import('../data/locales/kanji_en.json')).default;
    case 'tr': return (await import('../data/locales/kanji_tr.json')).default;
    case 'ko': return (await import('../data/locales/kanji_ko.json')).default;
    case 'mn': return (await import('../data/locales/kanji_mn.json')).default;
    default:   return (await import('../data/locales/kanji_en.json')).default;
  }
}

export async function setLanguage(lang) {
  if (!meaningEn) meaningEn = await loadPack('en');
  if (lang === 'en') {
    meaningLang = null;
    activeLang = 'en';
    return;
  }
  meaningLang = await loadPack(lang);
  activeLang = lang;
}

export function lookup(kanji) {
  const base = kanjiBase[kanji];
  if (!base) return null;

  const nativeMeaning = (activeLang !== 'en' && meaningLang && meaningLang[kanji]) || '';
  const enMeaning = (meaningEn && meaningEn[kanji]) || '';
  const hasNative = !!nativeMeaning;

  return {
    onyomi: base.onyomi,
    kunyomi: base.kunyomi,
    meaning: nativeMeaning || enMeaning || '—',
    hasNativeMeaning: hasNative,
  };
}

export async function init(lang) {
  await setLanguage(lang || 'en');
}
