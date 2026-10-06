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
import { legacyFuriganaMap } from './exampleFurigana.js';
import { hasKanji, isKanjiChar } from './japaneseText.js';

const DIC_PATH = (import.meta.env.BASE_URL || '/') + 'dict';

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

// Kuromoji stores two signed Int16 dimensions followed by their full matrix.
// Check decoded bytes before DictionaryLoader constructs its typed array.
function validateConnectionCosts(buffer) {
  if (buffer.byteLength < 4 || buffer.byteLength % 2 !== 0) {
    throw new Error('Invalid cc.dat: incomplete Int16 header or matrix');
  }
  const dimensions = new Int16Array(buffer, 0, 2);
  const forward = dimensions[0], backward = dimensions[1];
  if (forward <= 0 || backward <= 0) {
    throw new Error('Invalid cc.dat: non-positive matrix dimensions');
  }
  if (buffer.byteLength !== (forward * backward + 2) * 2) {
    throw new Error('Invalid cc.dat: matrix byte length does not match dimensions');
  }
}

// TokenInfoDictionary.targetMapToBuffer writes little-endian Int32 values:
// entry count, then [trie ID, target count, token record offsets...] per entry.
// loadTargetMap ignores the header and ByteBuffer reads past EOF as zero, so
// validate BEFORE that loader can turn a truncated prefix into a usable map.
function validateSerializedTokenMap(buffer, name = 'tid_map.dat') {
  const invalid = (reason) => { throw new Error('Invalid ' + name + ': ' + reason); };
  if (buffer.byteLength < 4) invalid('missing entry count');
  const view = new DataView(buffer);
  const entries = view.getInt32(0, true);
  if (entries <= 0 || entries > (buffer.byteLength - 4) / 12) invalid('incomplete advertised entries');
  const keys = new Set();
  let offset = 4;
  for (let index = 0; index < entries; index++) {
    if (offset + 8 > buffer.byteLength) invalid('truncated entry header');
    const key = view.getInt32(offset, true);
    const count = view.getInt32(offset + 4, true);
    offset += 8;
    if (key < 0 || keys.has(key)) invalid('invalid or duplicate mapping key');
    keys.add(key);
    if (count <= 0 || count > (buffer.byteLength - offset) / 4) invalid('truncated target list');
    for (let target = 0; target < count; target++, offset += 4) {
      const record = view.getInt32(offset, true);
      if (record < 0 || record % 10 !== 0) invalid('invalid token record offset');
    }
  }
  // The bundled real dictionary has zero-filled allocation padding after the
  // advertised entries. Accept only zeros there, never additional entry data.
  const bytes = new Uint8Array(buffer);
  for (; offset < bytes.length; offset++) if (bytes[offset] !== 0) invalid('nonzero trailing data');
}

function validateMappedTokenRecords(dictionary, name, validateSurface) {
  const records = dictionary.dictionary;
  const features = dictionary.pos_buffer.buffer;
  const seen = new Uint8Array(records.buffer.length / 10);
  let recordEnd = 0;
  for (const [key, targets] of Object.entries(dictionary.target_map)) {
    for (const offset of targets) {
      if (offset < 0 || offset % 10 !== 0 || offset + 10 > records.buffer.length || seen[offset / 10]) {
        throw new Error('Invalid ' + name + ': missing, duplicate or out-of-bounds token record');
      }
      seen[offset / 10] = 1;
      recordEnd = Math.max(recordEnd, offset + 10);
      const pos = records.getInt(offset + 6);
      if (pos < 0 || pos >= features.length || (pos > 0 && features[pos - 1] !== 0)
        || features.indexOf(0, pos) < 0) {
        throw new Error('Invalid ' + name + ': invalid token feature reference');
      }
      const surface = dictionary.getFeatures(offset).split(',')[0];
      if (!surface) throw new Error('Invalid ' + name + ': empty token surface');
      validateSurface(Number(key), surface);
    }
  }
  // The installed assets also retain zero-filled token-record capacity (10MB
  // allocation, not 10MB of live records). Every record through the last
  // referenced record must be mapped; only an all-zero suffix is padding.
  if (seen.subarray(0, recordEnd / 10).includes(0)) {
    throw new Error('Invalid ' + name + ': unreferenced token records');
  }
  for (let offset = recordEnd; offset < records.buffer.length; offset++) {
    if (records.buffer[offset] !== 0) throw new Error('Invalid ' + name + ': unmapped nonzero token record');
  }
}

// A CHECK parent alone is not reachability: unused allocation also contains
// links. Memoize parent chains through real non-NUL byte edges back to root.
// Both time and the bitmap are bounded by the supplied base/check arrays.
function validateTrieTerminals(trie, targetMap) {
  const base = trie.bc.getBaseBuffer(), check = trie.bc.getCheckBuffer();
  if (!base.length || base.length !== check.length || base[0] < 0) {
    throw new Error('Invalid trie: incomplete base/check storage or root');
  }
  const reachability = new Uint8Array(base.length); // 0 unseen, 1 visiting, 2 reachable, 3 unreachable
  reachability[0] = 2;
  const reachable = (node) => {
    const path = [];
    let cursor = node, valid = true;
    while (reachability[cursor] === 0) {
      reachability[cursor] = 1;
      path.push(cursor);
      const parent = check[cursor];
      const code = parent >= 0 && parent < base.length ? cursor - base[parent] : -1;
      if (parent < 0 || parent >= base.length || base[parent] < 0 || code < 1 || code > 255) {
        valid = false;
        break;
      }
      cursor = parent;
    }
    valid = valid && reachability[cursor] === 2;
    for (const entry of path) reachability[entry] = valid ? 2 : 3;
    return valid;
  };
  const terminalKeys = new Set();
  for (let node = 1; node < base.length; node++) {
    const parent = check[node];
    if (parent <= 0 || parent >= base.length || base[parent] !== node || !reachable(parent)) continue;
    // Installed doublearray encodes a NUL terminal's value as -BASE - 1.
    const key = -base[node] - 1;
    if (base[node] >= 0 || !Object.hasOwn(targetMap, key) || !targetMap[key].length || terminalKeys.has(key)) {
      throw new Error('Invalid tid_map.dat: reachable trie terminal lacks a unique token mapping');
    }
    terminalKeys.add(key);
  }
}

function validateTokenMappings(dic) {
  validateMappedTokenRecords(dic.token_info_dictionary, 'tid_map.dat', (key, surface) => {
    if (dic.trie.lookup(surface) !== key) throw new Error('Invalid tid_map.dat: trie ID does not match token surface');
  });
  validateTrieTerminals(dic.trie, dic.token_info_dictionary.target_map);
}

// InvokeDefinitionMap serializes [invoke:u8, grouping:u8, length:i32,
// name:UTF8+NUL] records without a count. Its real allocation has a zero
// suffix; trim that capacity before the installed loader invents empty classes.
function validatedInvokeBuffer(buffer) {
  const bytes = new Uint8Array(buffer), view = new DataView(buffer);
  let offset = 0, count = 0;
  const invalid = () => { throw new Error('Invalid unk_invoke.dat: incomplete category definition or padding'); };
  while (offset < bytes.length) {
    if (offset + 7 > bytes.length || bytes[offset + 6] === 0) {
      for (let index = offset; index < bytes.length; index++) if (bytes[index] !== 0) invalid();
      break;
    }
    if (++count > 256 || bytes[offset] > 1 || bytes[offset + 1] > 1 || view.getInt32(offset + 2, true) < 0) invalid();
    const end = bytes.indexOf(0, offset + 6);
    if (end < 0) invalid();
    offset = end + 1;
  }
  if (!count) invalid();
  return buffer.slice(0, offset);
}

function validateUnknownMappings(dic) {
  const dictionary = dic.unknown_dictionary;
  const definition = dictionary.character_definition;
  const invoke = definition.invoke_definition_map;
  const classes = invoke.map, names = new Set();
  for (let key = 0; key < classes.length; key++) {
    const category = classes[key];
    if (category.class_id !== key || !category.class_name || names.has(category.class_name)
      || !Object.hasOwn(dictionary.target_map, key) || !dictionary.target_map[key].length) {
      throw new Error('Invalid unk_map.dat: category lacks a unique definition or token mapping');
    }
    names.add(category.class_name);
  }
  const defaultId = invoke.lookup('DEFAULT');
  if (!Number.isInteger(defaultId) || defaultId < 0 || defaultId >= classes.length) {
    throw new Error('Invalid unk_map.dat: missing DEFAULT category');
  }
  const allowed = classes.length >= 32 ? 0xffffffff : (2 ** classes.length - 1) >>> 0;
  for (let code = 0; code < definition.character_category_map.length; code++) {
    if (definition.character_category_map[code] >= classes.length
      || (definition.compatible_category_map[code] & ~allowed) !== 0) {
      throw new Error('Invalid unk_map.dat: codepoint refers to an undefined category');
    }
  }
  validateMappedTokenRecords(dictionary, 'unk_map.dat', (key, surface) => {
    if (classes[key]?.class_name !== surface) throw new Error('Invalid unk_map.dat: category does not match token surface');
  });
}

// Both known and unknown token records are 10 bytes: left/right IDs, cost,
// then the feature offset. Viterbi indexes costs as [previous right][next left].
// A self-consistent 1x1 matrix is still invalid for the loaded token IDs.
function validateTokenConnections(dic) {
  const costs = dic.connection_costs;
  for (const [name, tokenDictionary] of [
    ['tid.dat', dic.token_info_dictionary], ['unk.dat', dic.unknown_dictionary],
  ]) {
    const records = tokenDictionary.dictionary;
    const length = records.buffer.length;
    if (length === 0 || length % 10 !== 0) {
      throw new Error('Invalid ' + name + ': incomplete token records');
    }
    for (let offset = 0; offset < length; offset += 10) {
      const left = records.getShort(offset), right = records.getShort(offset + 2);
      if (left < 0 || left >= costs.backward_dimension
        || right < 0 || right >= costs.forward_dimension) {
        throw new Error('Invalid cc.dat: matrix dimensions incompatible with ' + name);
      }
    }
  }
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
      : fetch(url).catch((err) => {
          throw new Error('Network error while loading dictionary: ' + err.message);
        }).then((res) => {
          if (!res.ok) throw new Error(res.statusText || ('HTTP ' + res.status));
          return res.arrayBuffer().then((ab) => new Uint8Array(ab));
        });

    source
      .then((raw) => {
        let buffer = exactBuffer(inflateIfGzip(raw));
        const name = url.split('/').pop();
        if (name === 'cc.dat.gz') validateConnectionCosts(buffer);
        if (name === 'tid_map.dat.gz' || name === 'unk_map.dat.gz') validateSerializedTokenMap(buffer, name.slice(0, -3));
        if ((name === 'unk_char.dat.gz' && buffer.byteLength !== 65536)
          || (name === 'unk_compat.dat.gz' && buffer.byteLength !== 65536 * 4)) {
          throw new Error('Invalid ' + name + ': incomplete codepoint category table');
        }
        if (name === 'unk_invoke.dat.gz') buffer = validatedInvokeBuffer(buffer);
        callback(null, buffer);
      })
      .catch((err) => callback(err, null));
  }
}

let _tokenizerPromise = null;
let _tokenizerInstance = null;

function resetTokenizer() {
  _tokenizerInstance = null;
  _tokenizerPromise = null;
}

export function getTokenizer() {
  if (_tokenizerPromise) return _tokenizerPromise;
  // Defer loading so even synchronous transport/loader failures clear the
  // shared promise after it has been assigned. Concurrent callers share it.
  _tokenizerPromise = Promise.resolve().then(() => new Promise((resolve, reject) => {
    new SmartDictionaryLoader(DIC_PATH).load((err, dic) => {
      if (err) { reject(err); return; }
      try {
        validateTokenConnections(dic);
        validateTokenMappings(dic);
        validateUnknownMappings(dic);
        const candidate = new Tokenizer(dic);
        const smoke = candidate.tokenize('日本語');
        if (smoke.map(token => token.surface_form).join('') !== '日本語') {
          throw new Error('Dictionary smoke tokenization failed');
        }

        const tokenize = candidate.tokenize;
        candidate.tokenize = function (...args) {
          try {
            return tokenize.apply(this, args);
          } catch (error) {
            // This exact string is thrown by Kuromoji's ConnectionCosts.get.
            // Ordinary input errors retain the cache; stale instances cannot
            // evict a newer healthy candidate. No automatic reload is started.
            if (error === 'ConnectionCosts buffer overflow'
              && this === candidate && _tokenizerInstance === candidate) resetTokenizer();
            throw error;
          }
        };
        resolve(candidate);
      } catch (error) {
        reject(error);
      }
    });
  })).then((candidate) => {
    _tokenizerInstance = candidate;
    return candidate;
  }).catch((error) => {
    resetTokenizer();
    throw error;
  });
  return _tokenizerPromise;
}

export function getTokenizerSync() {
  return _tokenizerInstance;
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
    const segmentType = isKanjiChar(ch) ? 'k' : 'h';
    if (type === null) { buf = ch; type = segmentType; start = idx; }
    else if (segmentType === type) { buf += ch; }
    else { segs.push({ type, text: buf, start }); buf = ch; type = segmentType; start = idx; }
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
export async function generateExampleFurigana(sentence) {
  // Offsets refer to the exact stored source, including leading whitespace.
  const input = String(sentence || '');
  const data = { version: 1, source: input, spans: [] };
  if (!input || !hasKanji(input)) return data;
  const tokenizer = await getTokenizer();
  const tokens = tokenizer.tokenize(input);

  let block = null; // { text, reading, end } — end = cümle içi UTF-16 ofseti
  const flush = () => {
    if (block && block.reading && hasKanji(block.text)) {
      data.spans.push({ start: block.start, end: block.end, surface: block.text, reading: block.reading });
    }
    block = null;
  };

  let cursor = 0; // token'lar cümleyi sırayla ve boşluksuz kaplar
  for (const tk of tokens) {
    const surface = tk.surface_form;
    const base = cursor;
    if (input.slice(base, base + surface.length) !== surface) throw new Error('Example token surfaces do not match source');
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
        block = { text: seg.text, reading: kr, start: absStart, end: absStart + seg.text.length };
      }
    }
  }
  flush();
  if (cursor !== input.length) throw new Error('Example tokens do not cover source');
  return data;
}

// Compatibility output only: identical surfaces may overwrite each other.
export async function generateFuriganaMap(sentence) {
  return legacyFuriganaMap(await generateExampleFurigana(sentence));
}
