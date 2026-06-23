export function esc(s) {
  if (!s) return '';
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

export function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2,6); }
export function today() { return new Date().toISOString().slice(0,10); }
export function nowMs() { return Date.now(); }
export function daysToMs(d) { return d * 86400000; }

export function dateStrToEpochDay(dateStr) {
  return Math.floor(new Date(dateStr + 'T00:00:00Z').getTime() / 86400000);
}
export function epochDayToDateStr(epochDay) {
  return new Date(epochDay * 86400000).toISOString().slice(0, 10);
}
export function addDaysToDateStr(dateStr, n) {
  return epochDayToDateStr(dateStrToEpochDay(dateStr) + n);
}
export function dateStrDiffDays(a, b) {
  return dateStrToEpochDay(a) - dateStrToEpochDay(b);
}
export function weekStartOf(dateStr) {
  const epochDay = dateStrToEpochDay(dateStr);
  const dow = ((epochDay % 7) + 10) % 7;
  return epochDayToDateStr(epochDay - dow);
}

export function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function debounce(fn, wait) {
  let _dt = null;
  return (...args) => {
    clearTimeout(_dt);
    _dt = setTimeout(() => fn(...args), wait);
  };
}

export function highlightKanji(sentence, kanji, furiganaMap) {
  if (!sentence) return '';
  let result = esc(sentence);
  const map = furiganaMap || {};
  const keys = Object.keys(map).sort((a, b) => b.length - a.length);
  for (const word of keys) {
    if (!word) continue;
    const isMainKanji = kanji && word === kanji;
    const ruby = `<ruby${isMainKanji ? ' class="hl"' : ''}>${esc(word)}<rt>${esc(map[word])}</rt></ruby>`;
    result = result.split(esc(word)).join(ruby);
  }
  if (kanji && !map[kanji]) {
    const escapedKanji = esc(kanji).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const kanjiRe = new RegExp(escapedKanji, 'g');
    const parts = result.split(/(<ruby[^>]*>.*?<\/ruby>)/);
    result = parts.map(part => {
      if (part.startsWith('<ruby')) return part;
      return part.replace(kanjiRe, `<span class="hl">${esc(kanji)}</span>`);
    }).join('');
  }
  return result;
}

export function buildRuby(kanji, furigana) { return `<ruby>${kanji}<rt>${furigana}</rt></ruby>`; }

export function exportTestToJson(test) {
  const json = JSON.stringify(test, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = (test.title || 'test').replace(/[^a-zA-Z0-9_\-]/g, '_') + '.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function importTestFromJson(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!data.title || !Array.isArray(data.questions)) {
          reject(new Error('Invalid test format'));
          return;
        }
        data.id = Date.now().toString();
        resolve(data);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('File read failed'));
    reader.readAsText(file);
  });
}

export function processImageToBase64(file, maxWidth = 800) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let w = img.width, h = img.height;
        if (w > maxWidth) {
          h = Math.round(h * (maxWidth / w));
          w = maxWidth;
        }
        canvas.width = w;
        canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.onerror = () => reject(new Error('Image load failed'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('File read failed'));
    reader.readAsDataURL(file);
  });
}
