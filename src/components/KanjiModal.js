import { lookup } from '../services/kanjiDictService.js';
import { esc } from '../utils.js';
import { generateMnemonic } from '../services/aiService.js';

let app;
export function init(ctx) { app = ctx; }

export function open(kanji) {
  const entry = lookup(kanji);

  if (!entry) {
    app.openModal(app.t('kanji_detail'), `
      <div style="text-align:center;padding:.5rem 0 0">
        <div class="fc-kanji" style="font-size:3.5rem;line-height:1">${esc(kanji)}</div>
        <p class="text-muted mt-2">${app.t('kanji_not_found')}</p>
      </div>
      <button class="btn btn-ghost btn-block tap mt-3" onclick="closeModal()">${app.t('close')}</button>
    `);
    return;
  }

  const meaningLabel = entry.hasNativeMeaning ? app.t('meaning_label') : app.t('kanji_meaning_en');

  app.openModal(app.t('kanji_detail'), `
    <div style="text-align:center;margin-bottom:1.2rem">
      <div class="fc-kanji" style="font-size:4rem;line-height:1">${esc(kanji)}</div>
    </div>
    <div class="kanji-detail-rows">
      <div class="kanji-detail-row">
        <span class="text-muted kanji-detail-label">${app.t('kanji_onyomi')}</span>
        <span class="kanji-detail-value">${esc(entry.onyomi) || '—'}</span>
      </div>
      <div class="kanji-detail-row">
        <span class="text-muted kanji-detail-label">${app.t('kanji_kunyomi')}</span>
        <span class="kanji-detail-value">${esc(entry.kunyomi) || '—'}</span>
      </div>
      <div class="kanji-detail-row">
        <span class="text-muted kanji-detail-label">${meaningLabel}</span>
        <span class="kanji-detail-value">${esc(entry.meaning)}</span>
      </div>
    </div>
    <div class="ai-tutor-section" style="margin-top: 15px; padding: 10px; border-radius: 8px; background: rgba(0,0,0,0.05);">
      <button id="ai-story-btn" class="btn btn-block tap" data-t="btn_ai_story">${app.t('btn_ai_story')}</button>
      <div id="ai-story-output" style="margin-top: 10px; font-style: italic;"></div>
    </div>
    <button class="btn btn-ghost btn-block tap mt-3" onclick="closeModal()">${app.t('close')}</button>
  `);

  wireAiTutor(kanji, entry);
}

// AI Tutor (Smart AI Tutor — Milestone 2): "Generate AI Story" akışı.
// Modal HTML innerHTML ile senkron basıldığından buton querySelector ile hemen
// bulunur ve dinleyici taze butona bağlanır (modal her açılışta yeniden kurulur).
function wireAiTutor(kanji, entry) {
  const btn = document.getElementById('ai-story-btn');
  const out = document.getElementById('ai-story-output');
  if (!btn || !out) return;

  const defaultLabel = btn.textContent;
  // Onyomi + kunyomi birlikte → AI'a daha zengin bağlam (biri boşsa atlanır).
  const reading = [entry.onyomi, entry.kunyomi].filter(Boolean).join(' / ');

  btn.addEventListener('click', async () => {
    // Settings runtime state'te yaşar (Settings.js ile aynı erişim); click anında
    // okunur → modal açıldıktan sonra anahtar girilse bile güncel değer alınır.
    const settings = (app.state && app.state.settings) || {};
    const apiKey = settings.geminiApiKey;

    if (!apiKey) {
      app.showToast(app.t('msg_ai_key_missing'), 4000);
      return;
    }

    btn.disabled = true;
    btn.textContent = app.t('msg_ai_loading');
    out.textContent = '';

    try {
      const story = await generateMnemonic(kanji, entry.meaning, reading, apiKey, settings.geminiModel, app.currentLang);
      out.textContent = story;
    } catch (e) {
      out.textContent = app.t('warn_error', { msg: e?.message || 'Unknown error' });
    } finally {
      btn.disabled = false;
      btn.textContent = defaultLabel;
    }
  });
}
