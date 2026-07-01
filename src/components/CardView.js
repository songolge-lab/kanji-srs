import { esc, nowMs, highlightKanji, shuffle, vibrate } from '../utils.js';
import { previewSRS, applySRS } from '../core/srsEngine.js';
import { wrapKanji, wrapWord, isJapaneseCard } from '../utils/kanjiUtils.js';
import { startSessionTimer, stopSessionTimer } from './Analytics.js';
import { fireConfetti } from '../utils/confetti.js';

let app;

// ─── HAPTICS ─────────────────────────────────────────────────────────
// Grade → vibration pattern (ms). Fired once per grade in gradeCard() so the
// same feedback applies whether graded by swipe, button, or keyboard.
const HAPTIC_BY_GRADE = { 0: [50, 50, 50], 1: [30], 2: [20], 3: [10, 30, 10] };
// Safe wrapper: no-op unless the setting is on (undefined defaults to on to
// match the default config; only an explicit `false` disables).
function haptic(pattern) {
  if (pattern && app.cfg().enableHaptics !== false) vibrate(pattern);
}
let kanjiListenerAdded = false;
export function init(ctx) {
  app = ctx;
  if (!kanjiListenerAdded) {
    kanjiListenerAdded = true;
    document.addEventListener('click', (e) => {
      if (e.target.closest('.fc-flip-front, .fc-preview-front')) return;
      // Whole-word click (back of card) → contextual Word Modal.
      const wordEl = e.target.closest('.word-clickable');
      if (wordEl) {
        e.stopPropagation();
        app.openWordModal(wordEl.dataset.word, wordEl.dataset.sentence || '');
        return;
      }
      // Single-kanji click (e.g. example sentence) → per-kanji detail modal.
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
export function kanjiSizeClass(text) {
  const len = (text || '').trim().length;
  if (len > 15) return ' fc-kanji-xs';
  if (len > 8) return ' fc-kanji-sm';
  return '';
}

const KANJI_RUN = /[一-龯㐀-䶿]/;

// Bağlama duyarlı ruby: yalnızca KANJI koşuları <rt> okuma alır; saf
// hiragana/katakana parçalar (を, します gibi) düz metin kalır — okuma
// yüzeyle aynıysa hiç ruby üretilmez. Japonca kartlarda kanji İÇEREN tüm kelime
// bloğu tek bir `.word-clickable` ile sarılır → tıklayınca bağlamsal Word Modal
// açılır (eski tekil `.kanji-clickable` davranışının yerini alır). `sentence`
// AI'a bağlam olarak geçer (yoksa kelimenin kendisine düşer).
import { getTokenizerSync, kataToHira } from '../utils/furiganaParser.js';

function buildRubyInnerRaw(surface, reading) {
  if (!reading || surface === reading) {
    return [{ text: surface, html: esc(surface) }];
  }

  const segs = [];
  let buf = '', type = null;
  for (const ch of surface) {
    const t = KANJI_RUN.test(ch) ? 'k' : 'h';
    if (type === null) { buf = ch; type = t; }
    else if (t === type) { buf += ch; }
    else { segs.push({ type, text: buf }); buf = ch; type = t; }
  }
  if (buf) segs.push({ type, text: buf });

  if (!segs.some((s) => s.type === 'k')) {
    return [{ text: surface, html: esc(surface) }];
  }

  let r = reading;
  const out = [];
  for (let i = 0; i < segs.length; i++) {
    const seg = segs[i];
    if (seg.type === 'h') {
      const idx = r.indexOf(seg.text);
      r = idx >= 0 ? r.slice(idx + seg.text.length) : r;
      out.push({ text: seg.text, html: esc(seg.text) });
      continue;
    }
    const next = segs[i + 1];
    let rd;
    if (next && next.type === 'h') {
      const ni = r.indexOf(next.text);
      rd = ni >= 0 ? r.slice(0, ni) : r;
      r = ni >= 0 ? r.slice(ni) : '';
    } else {
      rd = r; r = '';
    }
    out.push({
      text: seg.text,
      html: rd ? `<ruby>${esc(seg.text)}<rt>${esc(rd)}</rt></ruby>` : esc(seg.text)
    });
  }
  return out;
}

// Bağlama duyarlı ruby: yalnızca KANJI koşuları <rt> okuma alır; saf
// hiragana/katakana parçalar (を, します gibi) düz metin kalır — okuma
// yüzeyle aynıysa hiç ruby üretilmez. Japonca kartlarda kanji İÇEREN kelime
// blokları ayrı ayrı `.word-clickable` ile sarılır → tıklayınca bağlamsal Word Modal
// açılır. Kuromoji token'larına göre ayırarak tüm cümleyi gruplamasını engelleriz.
export function smartRuby(surface, reading, sentence) {
  surface = (surface || '').toString();
  reading = (reading || '').toString();
  sentence = (sentence || surface).toString();

  const rawSegs = buildRubyInnerRaw(surface, reading);

  if (!isJapaneseCard() || !KANJI_RUN.test(surface)) {
    return rawSegs.map(s => s.html).join('');
  }

  const tokenizer = getTokenizerSync();

  // Tokenizer hazır değil → tüm yüzeyi tek blok olarak sar. Bu yolda `rawSegs`
  // çağıranın verdiği okumayı (kart furiganası) bütün hâlde taşır → furigana
  // doğru kalır (güvenli/eski davranış).
  if (!tokenizer) {
    return wrapWord(rawSegs.map(s => s.html).join(''), surface, sentence);
  }

  // Beklenmedik girdide tokenize patlarsa render'ı çökertme: tek bloğa düş.
  let tokens;
  try {
    tokens = tokenizer.tokenize(surface);
  } catch {
    return wrapWord(rawSegs.map(s => s.html).join(''), surface, sentence);
  }

  // Tek token → tüm yüzeyi tek tıklanabilir kelime yap; okumayı çağıranın
  // verdiği `reading`'ten (kart furiganası = doğruluk kaynağı) al. Tek-kelime
  // kartların çoğu bu yoldan geçer.
  if (!tokens || tokens.length <= 1) {
    return wrapWord(rawSegs.map(s => s.html).join(''), surface, sentence);
  }

  // Çok token → her kelimeyi AYRI bir `.word-clickable` yap ki Word Modal
  // gerçek bileşen kelimeleri (毎日 / 漢字) arasın, tüm öbeği değil. KRİTİK:
  // her kanji token'ı KENDİ okumasını doğrudan kuromoji'den (tok.reading,
  // katakana → hiragana) alır → eski rawSegs-dilimleme yolunun çok-token'lı
  // kanji koşularında furigana'yı düşürmesi (v2.3.1 regresyonu) giderilir.
  // Bilinmeyen kelime (reading '*') → okumasız düz metin (yine de tıklanabilir).
  let html = '';
  for (const tok of tokens) {
    const tokText = tok.surface_form;
    if (KANJI_RUN.test(tokText)) {
      const tokReading = (tok.reading && tok.reading !== '*') ? kataToHira(tok.reading) : '';
      const segs = buildRubyInnerRaw(tokText, tokReading);
      html += wrapWord(segs.map(s => s.html).join(''), tokText, sentence);
    } else {
      html += esc(tokText);
    }
  }
  return html;
}

// ─── STUDY STATE ─────────────────────────────────────────────────────
let studyQueue = [];
let studyCardIndex = 0;
let studyDoneToday = 0;
let studyShowingBack = false;
// Guards the completion celebration (confetti) so it fires exactly once per
// finished session, not on every re-render of the "done" screen. Reset when a
// fresh queue is built in startStudy().
let celebrated = false;
// Aktif çalışma oturumunun kimliği — { deckId, masteredOnly }. Modül-seviyesi
// olduğundan sekme değiştirip geri gelmek state'i KORUR. Yalnızca (a) kuyruk
// bitince veya (b) çalışma ekranındaki "Geri/Çık" tuşuna basılınca temizlenir;
// alt nav ile gezinme oturumu ASLA bozmaz.
let activeSession = null;

// Çalışma ekranından açıkça çıkıldığında (topbar geri tuşu) çağrılır → bir
// sonraki startStudy taze kuyruk kurar. Alt nav gezintisinden ÇAĞRILMAZ.
export function clearStudySession() { activeSession = null; }

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
  // RESUME: aynı deste + kapsam için yarım bir oturum varsa kuyruğu/konumu koru
  // (sekme değiştirip dönmek ilerlemeyi sıfırlamasın). Aksi halde taze kur.
  const resume = activeSession
    && activeSession.deckId === deckId
    && activeSession.masteredOnly === masteredOnly
    && studyQueue.length && studyCardIndex < studyQueue.length;
  if (!resume) {
    const hasChildren = app.getChildDecks(deckId).length > 0;
    if (hasChildren) {
      studyQueue = shuffle(app._buildQueue(app.getAllCardsForDeck(deckId), masteredOnly));
    } else {
      studyQueue = app.buildQueue(app.findDeck(deckId), masteredOnly);
    }
    studyCardIndex = 0;
    studyDoneToday = 0;
    studyShowingBack = false;
    celebrated = false;
    activeSession = { deckId, masteredOnly };
  }
  startSessionTimer();
  app.showView('study');
}

export function renderStudy() {
  const screen = document.getElementById('study-screen');

  if (!studyQueue.length || studyCardIndex >= studyQueue.length) {
    stopSessionTimer();
    activeSession = null; // kuyruk bitti → bir sonraki giriş taze oturum kursun
    const studied = studyDoneToday;
    const streak = app.state.stats.streak || 0;
    screen.innerHTML = `
      <div class="study-done">
        <div class="done-burst">🎉</div>
        <h2 class="done-title">${app.t('great_job')}</h2>
        <p class="done-sub">${app.t('session_complete')}</p>
        <div class="done-stats">
          <div class="done-stat">
            <div class="done-stat-num" id="done-cards">${studied}</div>
            <div class="done-stat-label">${app.t('done_cards_label')}</div>
          </div>
          <div class="done-stat">
            <div class="done-stat-num done-streak-num"><span class="done-fire">🔥</span><span id="done-streak">${streak}</span></div>
            <div class="done-stat-label">${app.t('done_streak_label')}</div>
          </div>
        </div>
        <button class="btn btn-primary tap done-btn" onclick="showView('deck')">${app.t('back_to_deck')}</button>
      </div>`;
    animateCountUp('done-cards', studied);
    animateCountUp('done-streak', streak);
    // Fire the confetti once, only if the user actually studied something.
    if (studied > 0 && !celebrated) { celebrated = true; fireConfetti(); }
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
              <div class="fc-ruby">${smartRuby(card.kanji, card.furigana, card.exampleJp)}</div>
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
      <div class="swipe-stage" id="swipe-stage">
        <div class="swipe-glow" id="swipe-glow" aria-hidden="true">
          <div class="glow-layer glow-left"></div>
          <div class="glow-layer glow-right"></div>
          <div class="glow-layer glow-up"></div>
          <div class="glow-layer glow-down"></div>
        </div>
        <div class="flashcard swipe-card" id="grade-card">
          <span class="fc-state-badge badge ${stateBadgeCls(card.srs)}">${stateLabel(card.srs)}</span>
          <div class="fc-back">
            <div class="fc-ruby">${smartRuby(card.kanji, card.furigana, card.exampleJp)}</div>
            <div class="fc-meaning">${kanjiText(card.meaningTr)}</div>
            ${card.exampleJp ? `
            <hr class="fc-divider">
            <div class="fc-example">${exHighlight}</div>
            ${card.exampleTr ? `<div class="fc-exampletr">${esc(card.exampleTr)}</div>` : ''}` : ''}
          </div>
        </div>
      </div>
      <div class="swipe-hint">${app.t('swipe_hint')}</div>
      <div class="answer-grid">
        <button class="ans-btn ans-again tap" onclick="gradeCard(0)">${app.t('grade_again')}<span class="next-time">${previews[0]}</span></button>
        <button class="ans-btn ans-hard tap" onclick="gradeCard(1)">${app.t('grade_hard')}<span class="next-time">${previews[1]}</span></button>
        <button class="ans-btn ans-good tap" onclick="gradeCard(2)">${app.t('grade_good')}<span class="next-time">${previews[2]}</span></button>
        <button class="ans-btn ans-easy tap" onclick="gradeCard(3)">${app.t('grade_easy')}<span class="next-time">${previews[3]}</span></button>
      </div>
    `;
    initSwipeGrade();
  }
}

// Count-up animation for the completion stats (cards studied, streak). Cubic
// ease-out; GPU-irrelevant (text only), cheap and short.
function animateCountUp(elId, target, dur = 900) {
  const el = document.getElementById(elId);
  if (!el) return;
  if (!(target > 0)) { el.textContent = '0'; return; }
  // rAF is paused on hidden tabs — keep the pre-rendered final value so the
  // count is never stuck at 0 if a session ends in the background.
  if (typeof document !== 'undefined' && document.hidden) { el.textContent = String(target); return; }
  el.textContent = '0'; // start from zero (before first paint) → clean count-up
  const start = performance.now();
  function step(now) {
    const p = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = String(Math.round(eased * target));
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

export function showBack() { haptic([10]); studyShowingBack = true; renderStudy(); }

export function gradeCard(grade) {
  haptic(HAPTIC_BY_GRADE[grade]);
  const card = studyQueue[studyCardIndex];
  const wasNew = card.srs.state === 'new';
  const wasMastered = card.srs.mastered;
  applySRS(card, grade, app.cfg(), nowMs());
  // Aktif çalışma destesinin adını da geçir → günlük istatistikte hangi destelerin
  // çalışıldığı izlenir. (Deste alanı `name`; blueprint'teki `title` bu projede yok.)
  const studyDeck = app.findDeck(app.currentDeckId);
  app.recordReview(wasNew, studyDeck ? studyDeck.name : '');
  if (card.srs.mastered && !wasMastered) {
    app.showToast(app.t('toast_mastered', {kanji: card.kanji}), 2200);
  }
  studyDoneToday++;
  if (grade === 0 || card.srs.state === 'learning' || card.srs.state === 'relearning') {
    studyQueue.splice(studyCardIndex, 1);
    studyQueue.push(card);
  } else {
    studyCardIndex++;
  }
  studyShowingBack = false;
  app.save();
  renderStudy();
}

// ─── 4-WAY SWIPE GRADING ─────────────────────────────────────────────
// Pointer-driven swipe on the answer card. Drag past the threshold in a
// direction → fly the card off-screen and grade. Below threshold → spring back.
// Direction → grade: LEFT=Again(0), DOWN=Hard(1), RIGHT=Good(2), UP=Easy(3).
// A soft directional edge-glow fades in with drag distance. Everything animated
// is transform/opacity only (GPU-accelerated).
const SWIPE_THRESHOLD = 100;
const DIR_TO_GRADE = { left: 0, down: 1, right: 2, up: 3 };

function initSwipeGrade() {
  const stage = document.getElementById('swipe-stage');
  const card = document.getElementById('grade-card');
  const glow = document.getElementById('swipe-glow');
  if (!stage || !card || !glow) return;
  const layers = {
    left: glow.querySelector('.glow-left'),
    right: glow.querySelector('.glow-right'),
    up: glow.querySelector('.glow-up'),
    down: glow.querySelector('.glow-down'),
  };
  const MOVE_START = 8; // px before a press becomes a drag (taps pass through)
  let startX = 0, startY = 0, dx = 0, dy = 0;
  let pointerDown = false, dragging = false, pid = null;

  function dominantDir() {
    if (Math.abs(dx) > Math.abs(dy)) return dx > 0 ? 'right' : 'left';
    return dy > 0 ? 'down' : 'up';
  }
  function setGlow(dir, strength) {
    for (const k in layers) layers[k].style.opacity = k === dir ? strength : 0;
  }
  function clearGlow() { for (const k in layers) layers[k].style.opacity = 0; }

  function onDown(e) {
    pointerDown = true; dragging = false; pid = e.pointerId;
    startX = e.clientX; startY = e.clientY; dx = 0; dy = 0;
    card.classList.remove('snapping', 'flying');
  }
  function onMove(e) {
    if (!pointerDown) return;
    dx = e.clientX - startX; dy = e.clientY - startY;
    if (!dragging) {
      if (Math.hypot(dx, dy) < MOVE_START) return;
      dragging = true;
      stage.classList.add('is-dragging');
      try { card.setPointerCapture(pid); } catch { /* capture optional */ }
    }
    e.preventDefault();
    const rot = (dx / (stage.offsetWidth || 320)) * 12;
    card.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg)`;
    const dir = dominantDir();
    const dist = dir === 'left' || dir === 'right' ? Math.abs(dx) : Math.abs(dy);
    // Elegant soft cap: reaches max 0.5 opacity around 1.2× the threshold.
    const strength = Math.min(1, dist / (SWIPE_THRESHOLD * 1.2)) * 0.5;
    setGlow(dir, strength);
  }
  function onUp() {
    if (!pointerDown) return;
    pointerDown = false;
    stage.classList.remove('is-dragging');
    try { card.releasePointerCapture(pid); } catch { /* ignore */ }
    if (!dragging) return; // was a tap → let the click through (Word Modal etc.)

    // Swallow the click that trails a real drag (prevents opening a word modal
    // on release). Self-cleaning so a lingering listener never eats a real tap.
    const swallow = (ev) => { ev.stopPropagation(); ev.preventDefault(); };
    card.addEventListener('click', swallow, true);
    setTimeout(() => card.removeEventListener('click', swallow, true), 350);

    const dir = dominantDir();
    const dist = dir === 'left' || dir === 'right' ? Math.abs(dx) : Math.abs(dy);
    if (dist < SWIPE_THRESHOLD) {
      card.classList.add('snapping');
      card.style.transform = '';
      clearGlow();
      return;
    }
    clearGlow();
    flyOff(card, dir);
    // Grade after the card has mostly flown off; gradeCard re-renders the screen.
    setTimeout(() => gradeCard(DIR_TO_GRADE[dir]), 230);
  }

  card.addEventListener('pointerdown', onDown);
  card.addEventListener('pointermove', onMove);
  card.addEventListener('pointerup', onUp);
  card.addEventListener('pointercancel', onUp);
}

function flyOff(card, dir) {
  const off = {
    left: 'translate(-140vw, 0) rotate(-24deg)',
    right: 'translate(140vw, 0) rotate(24deg)',
    up: 'translate(0, -140vh) rotate(0deg)',
    down: 'translate(0, 140vh) rotate(0deg)',
  }[dir];
  card.classList.add('flying');
  // Next frame so the .flying transition applies from the current transform.
  requestAnimationFrame(() => { card.style.transform = off; card.style.opacity = '0'; });
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
            <div class="fc-ruby">${smartRuby(card.kanji, card.furigana, card.exampleJp)}</div>
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
  if (kanji || furigana) backHTML += `<div class="fc-ruby">${smartRuby(kanji || '?', furigana || '...', exJp)}</div>`;
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
    const el = document.getElementById(id);
    if (!el) return;
    if (el._previewHandler) el.removeEventListener('input', el._previewHandler);
    el._previewHandler = () => updatePreview(prefix, containerId);
    el.addEventListener('input', el._previewHandler);
  });
}

// ─── KEYBOARD (called from main.js) ─────────────────────────────────
export function handleStudyKey(e) {
  if (e.code === 'Space') {
    e.preventDefault();
    if (!studyShowingBack) showBack();
    else gradeCard(2);
    return;
  }
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
