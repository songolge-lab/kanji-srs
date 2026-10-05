import { isCodePointBoundary } from './japaneseText.js';

// Additive example metadata: the exact source binds UTF-16 spans to one
// sentence. The legacy surface-keyed map remains a separate, lossy field.
export function validExampleFurigana(sentence, data) {
  if (typeof sentence !== 'string' || !data || data.version !== 1
    || data.source !== sentence || !Array.isArray(data.spans)) return false;
  let end = 0;
  for (const span of data.spans) {
    if (!span || !Number.isInteger(span.start) || !Number.isInteger(span.end)
      || span.start < end || span.end <= span.start || span.end > sentence.length
      || !isCodePointBoundary(sentence, span.start) || !isCodePointBoundary(sentence, span.end)
      || typeof span.surface !== 'string' || sentence.slice(span.start, span.end) !== span.surface
      || typeof span.reading !== 'string' || !span.reading) return false;
    end = span.end;
  }
  return true;
}

export function copyExampleFurigana(sentence, data) {
  if (!validExampleFurigana(sentence, data)) return null;
  return { version: 1, source: sentence, spans: data.spans.map(({ start, end, surface, reading }) => ({ start, end, surface, reading })) };
}

export function legacyFuriganaMap(data) {
  const map = {};
  for (const span of data.spans) {
    // defineProperty also handles a surface named __proto__ as ordinary data.
    Object.defineProperty(map, span.surface, { value: span.reading, enumerable: true, writable: true, configurable: true });
  }
  return map;
}

// Segment the ORIGINAL sentence once. Valid occurrence data wins; old maps
// match longest surfaces at the cursor and never inspect generated markup.
export function exampleSegments(sentence, map, data) {
  const spans = validExampleFurigana(sentence, data) ? data.spans : null;
  const segments = [];
  const add = (start, end, reading = null) => {
    if (end > start) segments.push({ start, end, surface: sentence.slice(start, end), reading });
  };
  if (spans) {
    let cursor = 0;
    for (const span of spans) { add(cursor, span.start); add(span.start, span.end, span.reading); cursor = span.end; }
    add(cursor, sentence.length);
  } else {
    const keys = (!data || data.source === sentence) && map && typeof map === 'object' && !Array.isArray(map)
      ? Object.keys(map).filter(key => key && typeof map[key] === 'string' && map[key]).sort((left, right) => right.length - left.length) : [];
    let cursor = 0, plainStart = 0;
    while (cursor < sentence.length) {
      const key = keys.find(surface => sentence.startsWith(surface, cursor) && isCodePointBoundary(sentence, cursor + surface.length));
      if (key) { add(plainStart, cursor); add(cursor, cursor + key.length, map[key]); cursor += key.length; plainStart = cursor; }
      else cursor += String.fromCodePoint(sentence.codePointAt(cursor)).length;
    }
    add(plainStart, sentence.length);
  }
  return segments;
}
