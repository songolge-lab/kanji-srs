// ─── OFFLINE FURIGANA PARSER ─────────────────────────────────────────
// Bağlama duyarlı (context-aware) okuma üretimi için offline morfolojik
// analiz. Online sözlük API'sinin (kanjiapi.dev) yerini alır.
//
// Kütüphane: @sglkc/kuromoji — kuromoji.js'in tarayıcı uyumlu fork'u.
//   • Sözlük dosyaları `public/dict/*.dat.gz` üzerinden statik servis edilir
//     (Vite `public/` → `dist/` kopyalar). `fetch` + `fflate` ile yüklenir;
//     Node `fs`/`zlib`/`Buffer` polyfill'i GEREKMEZ.
//   • dicPath, `import.meta.env.BASE_URL` ile çözülür → hem PWA hem Electron.
//
// NOT (Electron): Paketlenmiş Electron `file://` üzerinden yüklendiğinde
// Chromium `fetch('file://...')` desteklemez. Bu durumda dict yüklemesi
// için Electron tarafında özel bir protokol (ör. app://) gerekir.

import Tokenizer from '@sglkc/kuromoji/src/Tokenizer.js';
import DictionaryLoader from '@sglkc/kuromoji/src/loader/DictionaryLoader.js';
import { gunzipSync } from 'fflate';

const DIC_PATH = (import.meta.env.BASE_URL || '/') + 'dict';

// Kanji aralığı — DeckList.js'deki tokenizeSentence ile birebir aynı
// (furiganaMap anahtarlarının render bloklarıyla eşleşmesi için).
const KANJI_RE = /[一-龯]/;
const hasKanji = (s) => /[一-龯]/.test(s || '');
const isKanjiChar = (ch) => KANJI_RE.test(ch);

// Katakana → Hiragana (Unicode offset 0x60). kuromoji okumaları katakana
// döndürür; uygulama hiragana saklar.
export function kataToHira(str) {
  return (str || '').replace(/[ァ-ヶ]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0x60));
}

// ─── Tokenizer (lazy singleton) ──────────────────────────────────────
// İlk furigana isteğinde başlatılır (dict indirilir) — uygulama açılışını
// yavaşlatmaz. Sonraki çağrılar aynı promise'i paylaşır.
// Bir Uint8Array'i tam (offset'siz, fazla bayt içermeyen) bir ArrayBuffer'a
// çevirir — DictionaryLoader buffer'ın TAMAMINI typed array'e sarar, bu
// yüzden havuzlanmış Buffer view'larında fazla baytlar olmamalı.
function exactBuffer(u8) {
  return (u8.byteOffset === 0 && u8.byteLength === u8.buffer.byteLength)
    ? u8.buffer
    : u8.slice().buffer;
}

// Baytları yalnızca gerçekten gzip ise (sihirli sayı 0x1f 0x8b) açar.
function inflateIfGzip(u8) {
  return (u8[0] === 0x1f && u8[1] === 0x8b) ? gunzipSync(u8) : u8;
}

// Packaged Electron renderer'ı `file://` üzerinden yüklenir ve Chromium
// `fetch('file://…')` desteklemez. Bu durumda dict baytlarını main
// process'ten IPC ile okuruz (preload → window.electronAPI.readDict).
// Yalnızca file:// protokolünde devreye girer; dev (http) ve web fetch kullanır.
function dictBytesViaIpc(name) {
  return Promise.resolve(window.electronAPI.readDict(name))
    .then((bytes) => {
      const u8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
      if (!u8 || u8.byteLength === 0) {
        throw new Error('Empty dict data received for: ' + name);
      }
      return u8;
    });
}

// Özel sözlük yükleyici. kuromoji'nin yerleşik BrowserDictionaryLoader'ı her
// zaman gunzip yapar; ancak bazı sunucular `.dat.gz` dosyalarını
// `Content-Encoding: gzip` ile gönderir → tarayıcı içeriği zaten açar →
// çift açma hatası build'i sessizce askıya alır. Aşağıdaki yükleyici hem bu
// durumu hem de Electron file:// (IPC) durumunu ele alır.
class SmartDictionaryLoader extends DictionaryLoader {
  loadArrayBuffer(url, callback) {
    const useIpc = typeof window !== 'undefined'
      && window.location && window.location.protocol === 'file:'
      && window.electronAPI && typeof window.electronAPI.readDict === 'function';

    const source = useIpc
      ? dictBytesViaIpc(url.split('/').pop())
      : fetch(url).then((res) => {
          if (!res.ok) throw new Error(res.statusText || ('HTTP ' + res.status));
          return res.arrayBuffer().then((ab) => new Uint8Array(ab));
        });

    source
      .then((raw) => callback(null, exactBuffer(inflateIfGzip(raw))))
      .catch((err) => callback(err, null));
  }
}

let _tokenizerPromise = null;

export function getTokenizer() {
  if (_tokenizerPromise) return _tokenizerPromise;
  _tokenizerPromise = new Promise((resolve, reject) => {
    new SmartDictionaryLoader(DIC_PATH).load((err, dic) => {
      if (err) { _tokenizerPromise = null; reject(err); }
      else resolve(new Tokenizer(dic));
    });
  });
  return _tokenizerPromise;
}

// İsteğe bağlı: tokenizer'ı erkenden ısıtmak için (sonucu beklemeden çağır).
export function warmupFurigana() {
  getTokenizer().catch(() => {});
}

// ─── Yardımcılar ─────────────────────────────────────────────────────
// Bir token'ın yüzeyini (surface) ardışık kanji/kana koşularına böler.
// `start` = token içindeki UTF-16 ofseti.
function segmentKanjiKana(surface) {
  const segs = [];
  let buf = '', type = null, start = 0, idx = 0;
  for (const ch of surface) {
    const t = isKanjiChar(ch) ? 'k' : 'h';
    if (type === null) { buf = ch; type = t; start = idx; }
    else if (t === type) { buf += ch; }
    else { segs.push({ type, text: buf, start }); buf = ch; type = t; start = idx; }
    idx += ch.length;
  }
  if (buf) segs.push({ type, text: buf, start });
  return segs;
}

// Okurigana hizalama: bir token'ın kana koşularını okumaya dayanak alarak
// her kanji koşusuna düşen okuma parçasını çıkarır.
//   食べる + たべる → [{ seg:食, reading:た }]
//   持ち帰る + もちかえる → [{ seg:持, reading:も }, { seg:帰, reading:かえ }]
function fitKanjiReadings(segs, reading) {
  const out = [];
  let r = reading;
  for (let i = 0; i < segs.length; i++) {
    const seg = segs[i];
    if (seg.type === 'h') {
      const hira = kataToHira(seg.text);
      if (r.startsWith(hira)) r = r.slice(hira.length);
      else { const idx = r.indexOf(hira); r = idx >= 0 ? r.slice(idx + hira.length) : ''; }
      continue;
    }
    const next = segs[i + 1];
    if (next && next.type === 'h') {
      const nh = kataToHira(next.text);
      const idx = r.indexOf(nh);
      out.push({ seg, reading: idx >= 0 ? r.slice(0, idx) : r });
      r = idx >= 0 ? r.slice(idx) : '';
    } else {
      out.push({ seg, reading: r });
      r = '';
    }
  }
  return out;
}

const tokenReading = (tk) =>
  (tk.reading && tk.reading !== '*') ? kataToHira(tk.reading) : null;

// ─── Genel API ───────────────────────────────────────────────────────
// Tüm metnin düz hiragana okuması (ana "Furigana" alanı için).
//   "勉強" → "べんきょう"
//   "私は毎日日本語を勉強します" → "わたしはまいにちにほんごをべんきょうします"
export async function generateFurigana(text) {
  const input = (text || '').trim();
  if (!input || !hasKanji(input)) return '';
  const tokenizer = await getTokenizer();
  const tokens = tokenizer.tokenize(input);
  // YALNIZCA kanji içeren token'lar hiragana okumaya çevrilir. Katakana,
  // hiragana, latin harfler ve semboller (ör. "http→セキュリティ機能") olduğu
  // gibi korunur — aksi halde kuromoji okuması katakana'yı da hiragana'ya
  // çevirir (セキュリティ → せきゅりてぃ) ve smartRuby hizalaması bozulur.
  return tokens
    .map((tk) => hasKanji(tk.surface_form) ? (tokenReading(tk) || tk.surface_form) : tk.surface_form)
    .join('');
}

// Örnek cümle için { kanjiBloğu: okuma } haritası. Anahtarlar, render
// tarafındaki maksimal kanji koşularıyla eşleşir (毎日日本語 gibi, birden
// fazla token'a yayılsa bile birleştirilir).
//   "毎日日本語を勉強します"
//     → { "毎日日本語": "まいにちにほんご", "勉強": "べんきょう" }
export async function generateFuriganaMap(sentence) {
  const input = (sentence || '').trim();
  if (!input || !hasKanji(input)) return {};
  const tokenizer = await getTokenizer();
  const tokens = tokenizer.tokenize(input);

  const map = {};
  let block = null; // { text, reading, end } — end = cümle içi UTF-16 ofseti
  const flush = () => {
    if (block && block.reading != null && hasKanji(block.text)) map[block.text] = block.reading;
    block = null;
  };

  let cursor = 0; // token'lar cümleyi sırayla ve boşluksuz kaplar
  for (const tk of tokens) {
    const surface = tk.surface_form;
    const base = cursor;
    cursor += surface.length;

    const reading = tokenReading(tk);
    const segs = segmentKanjiKana(surface);
    const fitted = reading
      ? fitKanjiReadings(segs, reading)
      : segs.filter((s) => s.type === 'k').map((seg) => ({ seg, reading: null }));

    for (const { seg, reading: kr } of fitted) {
      const absStart = base + seg.start;
      if (block && block.end === absStart) {
        block.text += seg.text;
        block.reading = (block.reading != null && kr != null) ? block.reading + kr : null;
        block.end = absStart + seg.text.length;
      } else {
        flush();
        block = { text: seg.text, reading: kr, end: absStart + seg.text.length };
      }
    }
  }
  flush();
  return map;
}
