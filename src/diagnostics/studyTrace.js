// TEMPORARY DIAGNOSTICS ONLY. Remove this module and TEMP STUDY TRACE hooks.
// No event interception, storage, network requests, or service-worker mutation.
const REVISION = 'study-trace-2026-09-30-r2';
const LIMIT = 5000;
const EVENTS = ['touchstart', 'touchmove', 'touchend', 'touchcancel',
  'pointerdown', 'pointermove', 'pointerup', 'pointercancel', 'gotpointercapture',
  'lostpointercapture', 'mousedown', 'mousemove', 'mouseup', 'mouseleave',
  'click', 'scroll', 'transitionstart', 'transitionend', 'transitioncancel',
  'animationstart', 'animationend', 'animationcancel'];
const LAYERS = '#fc-flip, #fc-flip-inner, .fc-flip-front, .fc-flip-back, #grade-card, '
  + '#swipe-stage, #swipe-glow, .glow-layer, .answer-grid, .ans-btn, #modal-bg, #modal';
const KNOWN_IDS = new Set(['study-screen', 'view-study', 'fc-flip', 'fc-flip-inner',
  'grade-card', 'swipe-stage', 'swipe-glow', 'btn-show', 'modal-bg', 'modal',
  'modal-body', 'modal-title', 'topbar', 'btn-back', 'bottom-nav', 'app']);
let app, readStudy, panel, output, status;
let enabled = false, rows = [], dropped = 0, serial = 0, revealPath = null;
let trial = {}, runtime = {}, lastFront = null, frontFlags = null, answerFlags = null;
let nodeIds = new WeakMap(), cardIds = new WeakMap(), eventIds = new WeakMap();
let nodeCount = 0, cardCount = 0, eventCount = 0, attempt = 0, lastHeavyHit = -Infinity;
let postAnswerPresses = 0, lastPointerPress = -Infinity;
const removers = [];
const observed = new WeakSet();
const round = value => Math.round(value * 1000) / 1000;
const guarded = (callback, fallback = null) => { try { return callback(); } catch { return fallback; } };

// Deliberately exclude text, values, dataset, arbitrary IDs, modal titles and URLs' queries.
function nodeRef(node) {
  if (!node) return null;
  if (node === window) return 'window';
  if (node === document) return 'document';
  if (!(node instanceof Element)) return node.nodeName || 'unknown';
  if (!nodeIds.has(node)) nodeIds.set(node, ++nodeCount);
  return { node: nodeIds.get(node), tag: node.tagName.toLowerCase(),
    id: KNOWN_IDS.has(node.id) ? node.id : null,
    classes: Array.from(node.classList).filter(name => /^[a-z][a-z0-9_-]{0,50}$/i.test(name)).slice(0, 12),
    connected: node.isConnected };
}
function context() {
  const study = readStudy();
  if (study.card && !cardIds.has(study.card)) cardIds.set(study.card, ++cardCount);
  return { card: study.card ? cardIds.get(study.card) : null, index: study.index,
    done: study.done, answerShown: study.answerShown, view: app.currentView,
    direction: study.direction, tokenizerReady: study.tokenizerReady,
    revealPath, front: nodeRef(document.querySelector('#fc-flip')),
    flipBack: nodeRef(document.querySelector('#fc-flip .fc-flip-back')),
    previousFront: nodeRef(lastFront), answer: nodeRef(document.querySelector('#grade-card')),
    frontGesture: frontFlags ? { ...frontFlags() } : null,
    answerGesture: answerFlags ? { ...answerFlags() } : null,
    stageClasses: document.querySelector('#swipe-stage')?.className || null,
    modalShown: document.getElementById('modal-bg')?.classList.contains('show') || false,
    bodyStudyClass: document.body.classList.contains('study-mode-active') };
}
function append(kind, detail = {}, studyContext = context()) {
  if (!enabled || app.currentView !== 'study') return;
  if (rows.length >= LIMIT) { rows.shift(); dropped++; }
  rows.push({ seq: ++serial, ms: round(performance.now()), kind,
    trial: { ...trial }, context: studyContext, ...detail });
}
export function mark(name, detail = {}) {
  if (!enabled) return;
  guarded(() => append('marker', { name, ...detail }));
}
export function gesture(side, getter) {
  if (side === 'front') frontFlags = getter;
  else answerFlags = getter;
}
export function beforeReplace(screen) {
  guarded(() => {
    mark('study-dom-about-to-replace', { oldNodes: Array.from(screen.children, nodeRef) });
    if (enabled) lastFront = screen.querySelector('#fc-flip') || lastFront;
    frontFlags = null; answerFlags = null;
  });
}
export function inserted(screen) {
  if (!enabled) return;
  guarded(() => {
    mark(readStudy().answerShown ? 'answer-dom-inserted' : 'front-dom-inserted');
    for (const node of screen.querySelectorAll('#fc-flip, #fc-flip-inner, #grade-card, .ans-btn, #btn-show, .study-translate-btn')) observe(node);
    if (readStudy().answerShown) mark('grading-handlers-available', {
      buttons: Array.from(screen.querySelectorAll('.ans-btn'), button => ({
        node: nodeRef(button), inlineHandler: typeof button.onclick === 'function' })) });
  });
}
function styleRef(node, pseudo = null) {
  if (!(node instanceof Element)) return null;
  const css = getComputedStyle(node, pseudo);
  const rect = node.getBoundingClientRect();
  return { node: nodeRef(node), pseudo,
    pointerEvents: css.pointerEvents, zIndex: css.zIndex, opacity: css.opacity,
    visibility: css.visibility, display: css.display, position: css.position,
    transform: css.transform, touchAction: css.touchAction,
    overflowX: css.overflowX, overflowY: css.overflowY, backfaceVisibility: css.backfaceVisibility,
    transition: css.transition, animationName: css.animationName,
    pseudoPresent: pseudo ? css.content !== 'none' && css.content !== 'normal' : null,
    // Pseudo content is intentionally not recorded (could contain user text).
    pseudoBox: pseudo ? { top: css.top, left: css.left, width: css.width, height: css.height } : null,
    rect: { x: round(rect.x), y: round(rect.y), width: round(rect.width), height: round(rect.height) } };
}
function hitDetails(x, y) {
  const top = document.elementFromPoint(x, y);
  const ancestors = [];
  for (let node = top; node && ancestors.length < 10; node = node.parentElement) ancestors.push(styleRef(node));
  const layers = Array.from(document.querySelectorAll(LAYERS));
  if (lastFront && !lastFront.isConnected) layers.push(lastFront);
  return { top: nodeRef(top), stack: document.elementsFromPoint(x, y).slice(0, 12).map(nodeRef),
    ancestors, layers: layers.map(node => ({ style: styleRef(node),
      before: styleRef(node, '::before'), after: styleRef(node, '::after') })) };
}
function coordinates(event) {
  const point = event.changedTouches?.[0] || event.touches?.[0] || event;
  return Number.isFinite(point.clientX) && Number.isFinite(point.clientY)
    ? { x: point.clientX, y: point.clientY } : null;
}
function traceEvent(event, observerPhase) {
  if (!enabled || app.currentView !== 'study' || event.target?.closest?.('#study-trace-panel')) return;
  guarded(() => {
    if (!eventIds.has(event)) eventIds.set(event, ++eventCount);
    const id = eventIds.get(event);
    if (event.currentTarget === document && observerPhase === 'capture' && readStudy().answerShown) {
      if (event.type === 'pointerdown') {
        lastPointerPress = performance.now();
        mark('post-answer-press', { press: ++postAnswerPresses, event: id });
      } else if ((event.type === 'touchstart' || event.type === 'mousedown') && performance.now() - lastPointerPress > 80) {
        lastPointerPress = performance.now();
        mark('post-answer-press', { press: ++postAnswerPresses, event: id });
      }
    }
    if (observerPhase === 'capture' && event.currentTarget === document
      && event.type === 'click' && event.target?.closest?.('#study-screen #btn-show')) {
      revealPath = 'A-button';
      mark('button-reveal-click', { event: id });
    }
    const point = coordinates(event);
    const studyContext = context();
    const captured = point && Number.isFinite(event.pointerId)
      ? Array.from(document.querySelectorAll('#fc-flip, #fc-flip-inner, #grade-card, .ans-btn'))
        .filter(node => guarded(() => node.hasPointerCapture(event.pointerId), false)).map(nodeRef) : [];
    const detail = { event: id, type: event.type, eventTimeStamp: event.timeStamp,
      observerPhase, eventPhase: event.eventPhase, target: nodeRef(event.target),
      currentTarget: nodeRef(event.currentTarget), path: event.composedPath().slice(0, 14).map(nodeRef),
      pointerId: event.pointerId ?? null, pointerType: event.pointerType ?? null,
      isPrimary: event.isPrimary ?? null, clientX: point?.x ?? null, clientY: point?.y ?? null,
      touches: event.touches?.length ?? null, changedTouches: event.changedTouches?.length ?? null,
      defaultPrevented: event.defaultPrevented, cancelable: event.cancelable,
      cancelBubble: event.cancelBubble, button: event.button ?? null, buttons: event.buttons ?? null,
      detail: event.detail ?? null, isTrusted: event.isTrusted,
      firesTouchEvents: event.sourceCapabilities?.firesTouchEvents ?? null,
      activeElement: nodeRef(document.activeElement), pointerCaptureOwners: captured,
      elementFromPoint: point ? nodeRef(document.elementFromPoint(point.x, point.y)) : null,
      scroll: { x: window.scrollX, y: window.scrollY,
        targetTop: event.target?.scrollTop ?? null, targetLeft: event.target?.scrollLeft ?? null },
      propertyName: event.propertyName || null, animationName: event.animationName || null };
    append('event', detail, studyContext);
    if (event.currentTarget === document && observerPhase === 'capture') {
      // The event may never reach a bubble observer; retain its final cancellation state.
      queueMicrotask(() => guarded(() => append('after-dispatch', { event: id, type: event.type,
        defaultPrevented: event.defaultPrevented, cancelBubble: event.cancelBubble,
        target: nodeRef(event.target) }, studyContext)));
      if (point && (event.type === 'click' ||
        (['pointerdown', 'touchstart', 'mousedown'].includes(event.type) && performance.now() - lastHeavyHit > 30))) {
        lastHeavyHit = performance.now();
        const start = performance.now();
        append('hit-test', { event: id, ...hitDetails(point.x, point.y),
          samplingMs: round(performance.now() - start) }, studyContext);
      }
    }
  });
}
function observe(node) {
  if (!node || observed.has(node)) return;
  observed.add(node);
  for (const type of EVENTS) for (const capture of [true, false]) {
    const handler = event => traceEvent(event, capture ? 'capture' : 'bubble');
    node.addEventListener(type, handler, { capture, passive: true });
    // Only long-lived listeners need explicit teardown; detached card nodes use GC.
    if (node === document || node === window) removers.push(() => node.removeEventListener(type, handler, capture));
  }
}
export function path(name) { if (enabled) revealPath = name; }
function safeUrl(raw) {
  if (!raw) return null;
  return guarded(() => { const url = new URL(raw, location.href);
    return url.protocol === 'file:' ? 'file:///[redacted]/' + url.pathname.split('/').pop()
      : url.origin + url.pathname; });
}
async function snapshotRuntime() {
  const worker = value => value ? { url: safeUrl(value.scriptURL), state: value.state } : null;
  const sameOrigin = raw => guarded(() => new URL(raw, location.href).origin === location.origin, false);
  const scriptUrls = Array.from(document.scripts).filter(script => script.src).map(script => script.src);
  const styleUrls = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(link => link.href);
  const scripts = scriptUrls.filter(sameOrigin).map(safeUrl);
  const styles = styleUrls.filter(sameOrigin).map(safeUrl);
  const resources = performance.getEntriesByType('resource').filter(entry => sameOrigin(entry.name) && /\.(js|css)(?:[?#]|$)/.test(entry.name));
  const snapshot = { revision: REVISION, capturedMs: round(performance.now()), appVersion: app.APP_VERSION,
    pageUrl: safeUrl(location.href), urlQueryAndHashRedacted: true,
    diagnosticModule: safeUrl(import.meta.url), scripts, styles,
    externalScriptCount: scriptUrls.filter(raw => !sameOrigin(raw)).length,
    externalStylesheetCount: styleUrls.filter(raw => !sameOrigin(raw)).length,
    loadedJsCss: [...new Set(resources.map(entry => safeUrl(entry.name)))],
    inlineStyleBlocks: document.querySelectorAll('style').length,
    userAgent: navigator.userAgent, language: navigator.language,
    displayModes: ['standalone', 'fullscreen', 'minimal-ui', 'browser'].filter(mode => matchMedia(`(display-mode: ${mode})`).matches),
    iosStandalone: navigator.standalone ?? null, controlled: !!navigator.serviceWorker?.controller,
    controller: worker(navigator.serviceWorker?.controller), secureContext: window.isSecureContext,
    tokenizerReady: readStudy().tokenizerReady, visibility: document.visibilityState,
    timeOrigin: performance.timeOrigin, viewport: { width: innerWidth, height: innerHeight,
      scale: window.visualViewport?.scale ?? null }, theme: document.documentElement.getAttribute('data-theme') || 'washi' };
  try {
    snapshot.registrations = navigator.serviceWorker ? (await navigator.serviceWorker.getRegistrations()).map(reg => ({
      scope: safeUrl(reg.scope), active: worker(reg.active), waiting: worker(reg.waiting), installing: worker(reg.installing) })) : [];
  } catch { snapshot.registrationReadFailed = true; }
  return snapshot;
}
function trace() {
  return JSON.stringify({ revision: REVISION, runtime, recording: enabled, dropped,
    maxEntries: LIMIT, privacy: 'No card content, credentials, datasets, URL query/hash, or storage included.', rows }, null, 2);
}
async function clear() {
  rows = []; dropped = 0; serial = 0; revealPath = null; lastHeavyHit = -Infinity;
  postAnswerPresses = 0; lastPointerPress = -Infinity;
  trial = { attempt: ++attempt, plannedPath: panel.querySelector('[name="path"]').value,
    plannedDelay: panel.querySelector('[name="delay"]').value,
    firstTarget: panel.querySelector('[name="target"]').value };
  runtime = { initial: null, latest: null };
  output.hidden = true; output.value = '';
  enabled = true;
  panel.open = false; // Configure before reproducing, never use the panel to "unlock" a tap.
  status.textContent = app.t('diag_recording');
  mark('trace-start');
  inserted(document.getElementById('study-screen'));
  runtime.initial = await snapshotRuntime();
}
async function copy() {
  enabled = false; // Freeze before interacting with the retrieval UI.
  runtime.latest = await snapshotRuntime();
  const value = trace();
  output.value = value; output.hidden = false;
  try { await navigator.clipboard.writeText(value); status.textContent = app.t('diag_copied'); }
  catch { status.textContent = app.t('diag_manual_copy'); output.focus(); output.select(); }
  return value;
}
export function init(ctx, reader) {
  if (app) return;
  app = ctx; readStudy = reader;
  panel = document.createElement('details'); panel.id = 'study-trace-panel';
  // Normal flow only: no fixed overlay, transforms, z-index or interception of study taps.
  panel.style.cssText = 'font:12px system-ui;margin:0 0 6px;color:var(--ink);';
  panel.innerHTML = `<summary data-label="diag_title"></summary><div>
    <label><span data-label="diag_path"></span> <select name="path"><option>A-button</option><option>B-gesture</option></select></label>
    <label><span data-label="diag_delay"></span> <select name="delay"><option>immediate</option><option>100ms</option><option>300ms</option><option>500ms</option><option>1000ms</option></select></label>
    <label><span data-label="diag_target"></span> <select name="target"><option>Again</option><option>Hard</option><option>Good</option><option>Easy</option><option>empty-card</option><option>word-kanji</option><option>translation</option><option>outside-card</option></select></label>
    <div><button type="button" data-action="clear" data-label="diag_clear"></button>
    <button type="button" data-action="copy" data-label="diag_copy"></button>
    <button type="button" data-action="stop" data-label="diag_stop"></button></div>
    <p data-status></p><textarea readonly hidden rows="5" style="width:100%;box-sizing:border-box" aria-label="Study trace JSON"></textarea>
    </div>`;
  document.getElementById('view-study').prepend(panel);
  output = panel.querySelector('textarea'); status = panel.querySelector('[data-status]');
  panel.querySelector('[data-action="clear"]').addEventListener('click', () => { void clear(); });
  panel.querySelector('[data-action="copy"]').addEventListener('click', () => { void copy(); });
  panel.querySelector('[data-action="stop"]').addEventListener('click', () => { enabled = false; status.textContent = app.t('diag_stopped'); });
  panel.addEventListener('toggle', () => {
    for (const node of panel.querySelectorAll('[data-label]')) node.textContent = app.t(node.dataset.label);
  });
  for (const node of panel.querySelectorAll('[data-label]')) node.textContent = app.t(node.dataset.label);
  observe(document); observe(window);
  const controllerChanged = () => mark('service-worker-controllerchange', {
    controllerUrl: safeUrl(navigator.serviceWorker.controller?.scriptURL),
    controllerState: navigator.serviceWorker.controller?.state || null });
  navigator.serviceWorker?.addEventListener('controllerchange', controllerChanged);
  // Temporary diagnostic globals; none are used by production inline handlers.
  window.stacksStudyTrace = { clear, copy, get: trace, stop: () => { enabled = false; },
    destroy: () => {
      enabled = false; removers.forEach(remove => remove());
      navigator.serviceWorker?.removeEventListener('controllerchange', controllerChanged);
      panel.remove(); delete window.stacksStudyTrace; rows = [];
      lastFront = null; frontFlags = null; answerFlags = null;
    } };
}
