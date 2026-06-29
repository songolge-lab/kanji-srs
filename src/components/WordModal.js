import { esc } from '../utils.js';
import { defineWordContextually } from '../services/aiService.js';

// Jukugo Smart Word Modal: opened when a whole word block on the back of a
// flashcard is clicked. Defines the ENTIRE compound word contextually via
// Gemini, and offers a per-kanji breakdown that drills into the Kanji Modal.

// Common-kanji range used to split the word into clickable breakdown chips.
const KANJI_CHAR = /[一-龯]/;

let app;
export function init(ctx) { app = ctx; }

export function open(word, sentence) {
  word = (word || '').toString();
  sentence = (sentence || '').toString();

  // One chip per kanji character in the word → opens the per-kanji detail modal.
  const chars = [...word].filter((ch) => KANJI_CHAR.test(ch));
  const chipsHtml = chars.length
    ? chars.map((ch) => `<button class="kanji-chip tap" data-char="${esc(ch)}">${esc(ch)}</button>`).join('')
    : `<span class="text-muted">—</span>`;

  app.openModal(app.t('word_detail_title'), `
    <div style="text-align:center;margin-bottom:1.1rem">
      <div class="word-detail-head">${esc(word)}</div>
    </div>
    <div class="word-ai-section">
      <div class="word-section-label">${app.t('word_ai_meaning')}</div>
      <div id="word-ai-output" class="word-ai-output">${app.t('msg_ai_loading')}</div>
    </div>
    <div class="word-breakdown-section">
      <div class="word-section-label">${app.t('word_kanji_breakdown')}</div>
      <div class="kanji-chip-row">${chipsHtml}</div>
    </div>
    <button class="btn btn-ghost btn-block tap mt-3" onclick="closeModal()">${app.t('close')}</button>
  `);

  wireChips();
  fetchMeaning(word, sentence);
}

// Modal HTML is injected synchronously by openModal, so chips can be wired
// immediately (fresh buttons each open → no listener leak).
function wireChips() {
  document.querySelectorAll('#modal .kanji-chip').forEach((chip) => {
    chip.addEventListener('click', () => app.openKanjiModal(chip.dataset.char));
  });
}

async function fetchMeaning(word, sentence) {
  const out = document.getElementById('word-ai-output');
  if (!out) return;

  // Settings live in runtime state (same access as Settings.js); read at call
  // time so a key entered after opening the modal is still picked up.
  const settings = (app.state && app.state.settings) || {};
  const apiKey = settings.geminiApiKey;

  if (!apiKey) {
    out.textContent = app.t('msg_ai_key_missing');
    return;
  }

  out.textContent = app.t('msg_ai_loading');
  try {
    const meaning = await defineWordContextually(word, sentence, app.currentLang, apiKey, settings.geminiModel);
    // The model returns `**translation** - context`; promote the **bold** part
    // to <strong> (escape first → XSS-safe). Falls back gracefully to plain
    // escaped text if the model ignores the format.
    out.innerHTML = esc(meaning).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  } catch (e) {
    out.textContent = app.t('warn_error', { msg: e?.message || 'Unknown error' });
  }
}
