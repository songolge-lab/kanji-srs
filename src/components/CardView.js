import { esc, nowMs, highlightKanji, shuffle } from '../utils.js';
import { previewSRS, applySRS } from '../core/srsEngine.js';
import { wrapKanji, isJapaneseCard } from '../utils/kanjiUtils.js';

let app;
let kanjiListenerAdded = false;
export function init(ctx) {
  app = ctx;
  if (!kanjiListenerAdded) {
    kanjiListenerAdded = true;
    document.addEventListener('click', (e) => {
      if (e.target.closest('.fc-flip-front, .fc-preview-front')) return;
      const el = e.target.closest('.kanji-clickable');
      if (el) app.openKanjiModal(el.dataset.kanji);
    });
  }
}

function kanjiText(text) {
  const escaped = esc(text);
  return isJapaneseCard() ? wrapKanji(escaped) : escaped;
}

// Uzun cümlelerde dev font'un kartı taşırmaması için: metin uzadıkça
// daha küçük bir font-size sınıfı uygular (CSS .fc-kanji-sm / .fc-kanji-xs).
function kanjiSizeClass(text) {
  const len = (text || '').trim().length;
  if (len > 18) return ' fc-kanji-xs';
  if (len > 7) return ' fc-kanji-sm';
  return '';
}

const KANJI_RUN = /[一-龯㐀-䶿]/;

// Bağlama duyarlı ruby: yalnızca KANJI koşuları <rt> okuma alır; saf
// hiragana/katakana parçalar (を, します gibi) düz metin kalır — okuma
// yüzeyle aynıysa hiç ruby üretilmez. Japonca kartlarda kanji koşuları
// `.kanji-clickable` ile sarılır (tıklanabilir + arka yüzde vurgulanır).
function smartRuby(surface, reading) {
  surface = (surface || '').toString();
  reading = (reading || '').toString();
  const jp = isJapaneseCard();
  const renderKanji = (txt) => jp ? wrapKanji(esc(txt)) : esc(txt);

  // Okuma yok ya da yüzeyle birebir aynı → düz metin (redundant kana yok).
  if (!reading || surface === reading) return renderKanji(surface);

  // Yüzeyi kanji / kana koşularına böl.
  const segs = [];
  let buf = '', type = null;
  for (const ch of surface) {
    const t = KANJI_RUN.test(ch) ? 'k' : 'h';
    if (type === null) { buf = ch; type = t; }
    else if (t === type) { buf += ch; }
    else { segs.push({ type, text: buf }); buf = ch; type = t; }
  }
  if (buf) segs.push({ type, text: buf });

  // Hiç kanji yoksa → düz metin (rt yok).
  if (!segs.some((s) => s.type === 'k')) return renderKanji(surface);

  let r = reading, html = '';
  for (let i = 0; i < segs.length; i++) {
    const seg = segs[i];
    if (seg.type === 'h') {
      // Kana koşusu: düz metin, okumadan eşleşen kısmı tüket.
      const idx = r.indexOf(seg.text);
      r = idx >= 0 ? r.slice(idx + seg.text.length) : r;
      html += esc(seg.text);
      continue;
    }
    // Kanji koşusu: okumayı bir sonraki kana koşusuna kadar al.
    const next = segs[i + 1];
    let rd;
    if (next && next.type === 'h') {
      const ni = r.indexOf(next.text);
      rd = ni >= 0 ? r.slice(0, ni) : r;
      r = ni >= 0 ? r.slice(ni) : '';
    } else {
      rd = r; r = '';
    }
    html += rd
      ? `<ruby>${renderKanji(seg.text)}<rt>${esc(rd)}</rt></ruby>`
      : renderKanji(seg.text);
  }
  return html;
}

// ─── STUDY STATE ─────────────────────────────────────────────────────
let studyQueue = [];
let studyCardIndex = 0;
let studyDoneToday = 0;
let studyShowingBack = false;

// ─── REVIEW STATE ────────────────────────────────────────────────────
let reviewQueue = [];
let reviewIndex = 0;
let reviewShowingBack = false;

// ─── HELPERS ─────────────────────────────────────────────────────────
function stateBadgeCls(srs) {
  if (srs.mastered) return 'badge-jade';
  return {new:'badge-sky', learning:'badge-gold', review:'badge-hanko'}[srs.state] || 'badge-soft';
}
function stateLabel(srs) {
  if (srs.mastered) return app.icon('star');
  return {new:app.t('state_new'), learning:app.t('state_learning'), review:app.t('state_review')}[srs.state] || '';
}

// ─── STUDY ───────────────────────────────────────────────────────────
export function startStudy(deckId, masteredOnly) {
  app.currentDeckId = deckId;
  app.studyMastered = masteredOnly;
  const hasChildren = app.getChildDecks(deckId).length > 0;
  if (hasChildren) {
    studyQueue = shuffle(app._buildQueue(app.getAllCardsForDeck(deckId), masteredOnly));
  } else {
    studyQueue = app.buildQueue(app.findDeck(deckId), masteredOnly);
  }
  studyCardIndex = 0;
  studyDoneToday = 0;
  studyShowingBack = false;
  app.showView('study');
}

export function renderStudy() {
  const screen = document.getElementById('study-screen');

  if (!studyQueue.length || studyCardIndex >= studyQueue.length) {
    screen.innerHTML = `
      <div class="study-done">
        <div class="done-icon">${app.icon('done','ic-lg')}</div>
        <h2>${app.t('session_complete')}</h2>
        <p>${app.t('cards_studied', {count: studyDoneToday})}</p>
        <button class="btn btn-primary tap" onclick="showView('deck')">${app.t('back_to_deck')}</button>
      </div>`;
    return;
  }

  const card = studyQueue[studyCardIndex];
  const done = studyCardIndex;
  const remaining = studyQueue.length - studyCardIndex;
  const pct = (done / (done + remaining)) * 100;
  const previews = [0,1,2,3].map(g => previewSRS(card, g, app.cfg(), nowMs()).label);
  const exHighlight = highlightKanji(card.exampleJp, card.kanji, card.exampleFuriganaMap);

  if (!studyShowingBack) {
    screen.innerHTML = `
      <div class="study-header">
        <div class="study-progress"><div class="study-progress-fill" style="width:${pct}%"></div></div>
        <div class="study-count">${done}/${done + remaining}</div>
      </div>
      <div class="fc-flip-container" id="fc-flip">
        <div class="fc-flip-inner" id="fc-flip-inner">
          <div class="fc-flip-front">
            <span class="fc-state-badge badge ${stateBadgeCls(card.srs)}">${stateLabel(card.srs)}</span>
            <div class="fc-kanji${kanjiSizeClass(card.kanji)}">${kanjiText(card.kanji)}</div>
          </div>
          <div class="fc-flip-back">
            <span class="fc-state-badge badge ${stateBadgeCls(card.srs)}">${stateLabel(card.srs)}</span>
            <div class="fc-back">
              <div class="fc-ruby">${smartRuby(card.kanji, card.furigana)}</div>
              <div class="fc-meaning">${kanjiText(card.meaningTr)}</div>
              ${card.exampleJp ? `
              <hr class="fc-divider">
              <div class="fc-example">${exHighlight}</div>
              ${card.exampleTr ? `<div class="fc-exampletr">${esc(card.exampleTr)}</div>` : ''}` : ''}
            </div>
          </div>
        </div>
      </div>
      <div class="fc-flip-hint">← ${app.t('flip_hint')} →</div>
      <button id="btn-show" class="tap" onclick="showBack()">${app.icon('eye')}${app.t('show_answer')}</button>
    `;
    initFlipGesture();
  } else {
    screen.innerHTML = `
      <div class="study-header">
        <div class="study-progress"><div class="study-progress-fill" style="width:${pct}%"></div></div>
        <div class="study-count">${done}/${done + remaining}</div>
      </div>
      <div class="flashcard">
        <span class="fc-state-badge badge ${stateBadgeCls(card.srs)}">${stateLabel(card.srs)}</span>
        <div class="fc-back">
          <div class="fc-ruby">${smartRuby(card.kanji, card.furigana)}</div>
          <div class="fc-meaning">${kanjiText(card.meaningTr)}</div>
          ${card.exampleJp ? `
          <hr class="fc-divider">
          <div class="fc-example">${exHighlight}</div>
          ${card.exampleTr ? `<div class="fc-exampletr">${esc(card.exampleTr)}</div>` : ''}` : ''}
        </div>
      </div>
      <div class="answer-grid">
        <button class="ans-btn ans-again tap" onclick="gradeCard(0)">${app.t('grade_again')}<span class="next-time">${previews[0]}</span></button>
        <button class="ans-btn ans-hard tap" onclick="gradeCard(1)">${app.t('grade_hard')}<span class="next-time">${previews[1]}</span></button>
        <button class="ans-btn ans-good tap" onclick="gradeCard(2)">${app.t('grade_good')}<span class="next-time">${previews[2]}</span></button>
        <button class="ans-btn ans-easy tap" onclick="gradeCard(3)">${app.t('grade_easy')}<span class="next-time">${previews[3]}</span></button>
      </div>
    `;
  }
}

export function showBack() { studyShowingBack = true; renderStudy(); }

export function gradeCard(grade) {
  const card = studyQueue[studyCardIndex];
  const wasNew = card.srs.state === 'new';
  const wasMastered = card.srs.mastered;
  applySRS(card, grade, app.cfg(), nowMs());
  app.recordReview(wasNew);
  if (card.srs.mastered && !wasMastered) {
    app.showToast(app.t('toast_mastered', {kanji: card.kanji}), 2200);
  }
  studyDoneToday++;
  studyCardIndex++;
  studyShowingBack = false;
  app.save();
  renderStudy();
}

// ─── REVIEW (Browse) ─────────────────────────────────────────────────
export function showReviewPickModal(deckId) {
  const deck = app.findDeck(deckId);
  if (!deck) return;
  const allCards = app.getAllCardsForDeck(deckId);
  const masteredCount = allCards.filter(c => c.srs.mastered).length;
  const hasChildren = app.getChildDecks(deckId).length > 0;
  const suffix = hasChildren ? app.t('incl_subdecks') : '';
  app.openModal(app.t('review_title'), `
    <p class="text-muted" style="margin-bottom:1rem">${app.t('review_info')}</p>
    <div class="btn-row" style="flex-direction:column">
      <button class="btn btn-primary btn-block tap" onclick="startReview('${deckId}','normal')">${app.t('normal_cards', {count: allCards.length - masteredCount})}${suffix}</button>
      ${masteredCount ? `<button class="btn btn-ghost btn-block tap" onclick="startReview('${deckId}','mastered')">${app.t('mastered_cards', {count: masteredCount})}${suffix}</button>` : ''}
      <button class="btn btn-ghost btn-block tap" onclick="startReview('${deckId}','all')">${app.t('all_cards', {count: allCards.length})}${suffix}</button>
    </div>
    <button class="btn btn-ghost btn-block tap mt-2" onclick="closeModal()">${app.t('cancel')}</button>
  `);
}

export function startReview(deckId, scope) {
  const deck = app.findDeck(deckId);
  if (!deck) return;
  const allCards = app.getAllCardsForDeck(deckId);
  if (scope === 'normal') reviewQueue = allCards.filter(c => !c.srs.mastered);
  else if (scope === 'mastered') reviewQueue = allCards.filter(c => c.srs.mastered);
  else reviewQueue = allCards.slice();
  if (app.getChildDecks(deckId).length > 0) shuffle(reviewQueue);
  if (!reviewQueue.length) { app.showToast(app.t('no_cards_scope')); return; }
  app.currentDeckId = deckId;
  reviewIndex = 0;
  reviewShowingBack = false;
  app.closeModal();
  app.showView('review');
}

export function renderReview() {
  const screen = document.getElementById('review-screen');
  if (!reviewQueue.length) {
    screen.innerHTML = `<div class="empty"><div class="empty-icon">${app.icon('inbox','ic-lg')}</div><p>${app.t('no_cards_to_show')}</p></div>`;
    return;
  }
  const card = reviewQueue[reviewIndex];
  const pct = ((reviewIndex + 1) / reviewQueue.length) * 100;
  const exHighlight = highlightKanji(card.exampleJp, card.kanji, card.exampleFuriganaMap);
  screen.innerHTML = `
    <div class="study-header">
      <div class="study-progress"><div class="study-progress-fill" style="width:${pct}%"></div></div>
      <div class="study-count">${reviewIndex + 1}/${reviewQueue.length}</div>
    </div>
    <div class="fc-flip-container" id="review-flip">
      <div class="fc-flip-inner" id="review-flip-inner">
        <div class="fc-flip-front">
          <span class="fc-state-badge badge badge-soft">${app.icon('eye')}${app.t('browse_badge')}</span>
          <div class="fc-kanji${kanjiSizeClass(card.kanji)}">${kanjiText(card.kanji)}</div>
        </div>
        <div class="fc-flip-back">
          <span class="fc-state-badge badge badge-soft">${app.icon('eye')}${app.t('browse_badge')}</span>
          <div class="fc-back">
            <div class="fc-ruby">${smartRuby(card.kanji, card.furigana)}</div>
            <div class="fc-meaning">${kanjiText(card.meaningTr)}</div>
            ${card.exampleJp ? `
            <hr class="fc-divider">
            <div class="fc-example">${exHighlight}</div>
            ${card.exampleTr ? `<div class="fc-exampletr">${esc(card.exampleTr)}</div>` : ''}` : ''}
          </div>
        </div>
      </div>
    </div>
    <div class="fc-flip-hint">← ${app.t('flip_hint')} →</div>
    <button id="btn-show" class="tap" onclick="flipCardToggle('review-flip-inner')">${app.icon('eye')}${app.t('show_answer')}</button>
    <div class="btn-row mt-2">
      <button class="btn btn-ghost tap" onclick="reviewPrev()" ${reviewIndex===0?'disabled':''}>${app.icon('chevL')}${app.t('prev_card')}</button>
      <button class="btn btn-ghost tap" onclick="reviewNext()" ${reviewIndex>=reviewQueue.length-1?'disabled':''}>${app.t('next_card')}${app.icon('chevR')}</button>
    </div>
  `;
  initFlipGestureToggle('review-flip', 'review-flip-inner');
}

export function reviewNext() {
  if (reviewIndex < reviewQueue.length - 1) { reviewIndex++; reviewShowingBack = false; renderReview(); }
}
export function reviewPrev() {
  if (reviewIndex > 0) { reviewIndex--; reviewShowingBack = false; renderReview(); }
}

// ─── FLIP GESTURES ───────────────────────────────────────────────────
function initFlipGesture() {
  const container = document.getElementById('fc-flip');
  const inner = document.getElementById('fc-flip-inner');
  if (!container || !inner) return;
  let startX = 0, currentRotation = 0, dragging = false, flipped = false;
  const threshold = 90;
  function getX(e) { return e.touches ? e.touches[0].clientX : e.clientX; }
  function onStart(e) { if (flipped) return; dragging = true; startX = getX(e); inner.classList.add('no-transition'); }
  function onMove(e) {
    if (!dragging || flipped) return;
    const dx = getX(e) - startX;
    currentRotation = Math.max(-180, Math.min(180, (dx / (container.offsetWidth || 300)) * 200));
    inner.style.transform = `rotateY(${currentRotation}deg)`;
  }
  function onEnd() {
    if (!dragging || flipped) return;
    dragging = false; inner.classList.remove('no-transition');
    if (Math.abs(currentRotation) >= threshold) {
      flipped = true;
      inner.style.transform = `rotateY(${currentRotation > 0 ? 180 : -180}deg)`;
      setTimeout(() => showBack(), 350);
    } else { currentRotation = 0; inner.style.transform = 'rotateY(0deg)'; }
  }
  container.addEventListener('mousedown', onStart); container.addEventListener('mousemove', onMove);
  container.addEventListener('mouseup', onEnd); container.addEventListener('mouseleave', onEnd);
  container.addEventListener('touchstart', onStart, { passive: true });
  container.addEventListener('touchmove', onMove, { passive: true }); container.addEventListener('touchend', onEnd);
}

export function initFlipGestureToggle(containerId, innerId) {
  const container = document.getElementById(containerId);
  const inner = document.getElementById(innerId);
  if (!container || !inner) return;
  inner.dataset.angle = '0';
  let startX = 0, dragRotation = 0, dragging = false;
  const threshold = 90;
  function getX(e) { return e.touches ? e.touches[0].clientX : e.clientX; }
  function curAngle() { return parseFloat(inner.dataset.angle) || 0; }
  function onStart(e) { dragging = true; startX = getX(e); dragRotation = 0; inner.classList.add('no-transition'); }
  function onMove(e) {
    if (!dragging) return;
    const dx = getX(e) - startX;
    dragRotation = Math.max(-180, Math.min(180, (dx / (container.offsetWidth || 300)) * 200));
    inner.style.transform = `rotateY(${curAngle() + dragRotation}deg)`;
  }
  function onEnd() {
    if (!dragging) return;
    dragging = false; inner.classList.remove('no-transition');
    let angle = curAngle();
    if (Math.abs(dragRotation) >= threshold) angle += (dragRotation > 0 ? 180 : -180);
    inner.dataset.angle = String(angle);
    inner.style.transform = `rotateY(${angle}deg)`;
    dragRotation = 0;
  }
  container.addEventListener('mousedown', onStart); container.addEventListener('mousemove', onMove);
  container.addEventListener('mouseup', onEnd); container.addEventListener('mouseleave', onEnd);
  container.addEventListener('touchstart', onStart, { passive: true });
  container.addEventListener('touchmove', onMove, { passive: true }); container.addEventListener('touchend', onEnd);
}

export function flipCardToggle(innerId) {
  const inner = document.getElementById(innerId);
  if (!inner) return;
  const angle = (parseFloat(inner.dataset.angle) || 0) + 180;
  inner.dataset.angle = String(angle);
  inner.classList.remove('no-transition');
  inner.style.transform = `rotateY(${angle}deg)`;
}

// ─── FLASHCARD PREVIEW ───────────────────────────────────────────────
export function updatePreview(prefix, containerId) {
  const wrap = document.getElementById(containerId);
  if (!wrap) return;
  const kanji    = (document.getElementById(prefix + 'kanji')?.value || '').trim();
  const furigana = (document.getElementById(prefix + 'furigana')?.value || '').trim();
  const meaning  = (document.getElementById(prefix + 'meaning')?.value || '').trim();
  const exJp     = (document.getElementById(prefix + 'example-jp')?.value || '').trim();
  const exTr     = (document.getElementById(prefix + 'example-tr')?.value || '').trim();
  const hasAny = kanji || furigana || meaning || exJp || exTr;
  const hasBack = furigana || meaning || exJp || exTr;
  if (!hasAny) { wrap.classList.remove('has-content', 'show-back'); wrap.innerHTML = ''; return; }
  wrap.classList.add('has-content');
  wrap.classList.toggle('fc-preview-sparse', !exJp && !exTr);
  const flipId = containerId + '-flip';
  const flipInnerId = containerId + '-flip-inner';
  const frontHTML = `<div class="fc-kanji${kanjiSizeClass(kanji)}">${kanji ? esc(kanji) : '&nbsp;'}</div>`;
  let backHTML = '';
  if (kanji || furigana) backHTML += `<div class="fc-ruby">${smartRuby(kanji || '?', furigana || '...')}</div>`;
  if (meaning) backHTML += `<div class="fc-meaning">${esc(meaning)}</div>`;
  if (exJp) {
    backHTML += `<hr class="fc-divider"><div class="fc-example">${esc(exJp)}</div>`;
    if (exTr) backHTML += `<div class="fc-exampletr">${esc(exTr)}</div>`;
  }
  wrap.innerHTML = `
    <div class="fc-preview fc-flip-container" id="${flipId}" style="cursor:grab">
      <div class="fc-preview-inner fc-flip-inner" id="${flipInnerId}">
        <div class="fc-preview-front">${frontHTML}</div>
        <div class="fc-preview-back"><div class="fc-back" style="width:100%;text-align:center">${backHTML}</div></div>
      </div>
    </div>
    <div class="fc-flip-hint" style="font-size:.68rem">← ${app.t('flip_hint')} →</div>`;
  if (hasBack) initFlipGestureToggle(flipId, flipInnerId);
}

export function attachPreviewListeners(prefix, containerId) {
  [prefix + 'kanji', prefix + 'furigana', prefix + 'meaning', prefix + 'example-jp', prefix + 'example-tr'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', () => updatePreview(prefix, containerId));
  });
}

// ─── KEYBOARD (called from main.js) ─────────────────────────────────
export function handleStudyKey(e) {
  if (e.code === 'Space') { e.preventDefault(); if (!studyShowingBack) showBack(); }
  if (studyShowingBack) {
    if (e.key === '1') gradeCard(0);
    else if (e.key === '2') gradeCard(1);
    else if (e.key === '3') gradeCard(2);
    else if (e.key === '4') gradeCard(3);
  }
}
export function handleReviewKey(e) {
  if (e.code === 'Space') { e.preventDefault(); }
  else if (e.key === 'ArrowRight') reviewNext();
  else if (e.key === 'ArrowLeft') reviewPrev();
}
