import { lookup } from '../services/kanjiDictService.js';
import { esc } from '../utils.js';

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
    <button class="btn btn-ghost btn-block tap mt-3" onclick="closeModal()">${app.t('close')}</button>
  `);
}
