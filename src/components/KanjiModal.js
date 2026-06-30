import { lookup } from '../services/kanjiDictService.js';
import { esc } from '../utils.js';

let app;
export function init(ctx) { app = ctx; }

// `opts.onBack` (opsiyonel): sağlanırsa modal başlığının sol üstüne bir geri (←)
// butonu basılır. Word Modal'dan bir kanji çipine tıklayınca devreye girer →
// geri tuşu Word Modal'ı (AI'ı yeniden çağırmadan) eski hâline getirir.
export function open(kanji, opts = {}) {
  const onBack = opts && typeof opts.onBack === 'function' ? opts.onBack : null;
  const backBtn = onBack
    ? `<button class="modal-back-btn tap" id="kanji-modal-back" aria-label="${app.t('back')}">${app.icon('chevL')}</button>`
    : '';

  const entry = lookup(kanji);

  if (!entry) {
    app.openModal(app.t('kanji_detail'), `
      ${backBtn}
      <div style="text-align:center;padding:.5rem 0 0">
        <div class="fc-kanji" style="font-size:3.5rem;line-height:1">${esc(kanji)}</div>
        <p class="text-muted mt-2">${app.t('kanji_not_found')}</p>
      </div>
      <button class="btn btn-ghost btn-block tap mt-3" onclick="closeModal()">${app.t('close')}</button>
    `);
    wireBack(onBack);
    return;
  }

  const meaningLabel = entry.hasNativeMeaning ? app.t('meaning_label') : app.t('kanji_meaning_en');

  app.openModal(app.t('kanji_detail'), `
    ${backBtn}
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
  wireBack(onBack);
}

// openModal HTML'i senkron bastığından buton hemen bağlanabilir (taze → leak yok).
function wireBack(onBack) {
  if (!onBack) return;
  const btn = document.getElementById('kanji-modal-back');
  if (btn) btn.addEventListener('click', onBack);
}
