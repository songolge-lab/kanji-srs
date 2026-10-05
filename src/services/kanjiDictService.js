import kanjiBase from '../data/locales/kanji_base.json';

let meaningEn = null;
let meaningLang = null;
let activeLang = 'en';
let requestedLang = 'en';
let requestGeneration = 0;
let englishPromise = null;
let loading = false;

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
  const generation = ++requestGeneration;
  const selected = ['en', 'tr', 'ko', 'mn'].includes(lang) ? lang : 'en';
  requestedLang = selected;
  loading = true;
  // Immediate lookups use a correctly labelled English fallback, never the
  // previous native pack with the newly selected UI language's label.
  meaningLang = null;
  activeLang = 'en';
  if (!englishPromise) {
    englishPromise = loadPack('en').catch(error => { englishPromise = null; throw error; });
  }
  try {
    const [english, native] = await Promise.all([
      englishPromise, selected === 'en' ? Promise.resolve(null) : loadPack(selected),
    ]);
    if (generation !== requestGeneration) return false;
    meaningEn = english;
    meaningLang = native;
    activeLang = selected;
    loading = false;
    return true;
  } catch (error) {
    // Stale failures cannot change readiness or surface an error for a newer
    // successful selection. Latest failures leave the English fallback active.
    if (generation !== requestGeneration) return false;
    loading = false;
    throw error;
  }
}

export function getLanguageState() {
  return { requestedLang, activeLang, loading };
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
