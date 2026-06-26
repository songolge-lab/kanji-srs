import { esc } from '../utils.js';
import { fetchCommunityDecks, fetchCommunityDeck, incrementDownloadCount } from '../services/dbService.js';

// ─── COMMUNITY HUB (Market) ──────────────────────────────────────────
// Browse + download decks shared by other learners. Pure Vanilla JS,
// follows the shared component pattern: init(app) injects context; render()
// is called by the router (showView('community')) and mounts into
// #community-content. All cloud calls go through dbService.js.

let app;
let _container = null;
let _state = 'idle';  // idle | loading | ready | error
let _decks = [];

export function init(ctx) { app = ctx; }

// Router entry point (mirrors TestManager.render() etc.)
export function render() {
  const c = document.getElementById('community-content');
  if (c) renderCommunityHub(c);
}

// Spec-named entry point: render the hub into an arbitrary container.
export function renderCommunityHub(container) {
  _container = container;
  paint();
  load();
}

export async function refresh() { await load(); }

async function load() {
  _state = 'loading';
  paint();
  try {
    _decks = await fetchCommunityDecks(50);
    _state = 'ready';
  } catch (e) {
    console.error('[CommunityHub] load failed:', e);
    _state = 'error';
  }
  paint();
}

function paint() {
  if (!_container) return;
  let body;
  if (_state === 'loading') {
    body = `<div class="community-state">${app.t('community_loading')}</div>`;
  } else if (_state === 'error') {
    body = `<div class="community-state"><p>${app.t('community_error')}</p>
      <button class="btn btn-ghost tap" style="margin-top:1rem" onclick="communityRefresh()">${app.icon('sync')}${app.t('community_refresh')}</button></div>`;
  } else if (!_decks.length) {
    body = `<div class="community-state">${app.t('community_empty')}</div>`;
  } else {
    body = `<div class="community-grid">${_decks.map(cardHTML).join('')}</div>`;
  }
  _container.innerHTML = headerHTML() + body;
}

function headerHTML() {
  return `
  <div class="community-hub-head">
    <div class="section-hd" style="margin:0">${app.t('community_title')}</div>
    <button class="btn btn-ghost tap btn-sm" onclick="communityRefresh()">${app.icon('sync')}${app.t('community_refresh')}</button>
  </div>
  <div class="community-hub-sub">${app.t('community_subtitle')}</div>`;
}

function cardHTML(d) {
  const tags = Array.isArray(d.tags) ? d.tags : [];
  const tagHTML = tags.length
    ? `<div class="community-tags">${tags.map(tg => `<span class="badge badge-soft">${esc(String(tg))}</span>`).join('')}</div>`
    : '';
  return `
  <div class="card community-card">
    <div class="card-title">${esc(d.title || '')}</div>
    <div class="deck-meta">${app.t('community_by', { author: esc(d.author_name || 'Anonymous') })}</div>
    ${d.description ? `<p class="community-desc">${esc(d.description)}</p>` : ''}
    ${tagHTML}
    <div class="community-card-foot">
      <span class="community-dl-count text-muted">${app.icon('download')} ${Number(d.downloads) || 0}</span>
      <button class="btn btn-primary tap" onclick="communityDownload('${d.id}', this)">${app.icon('download')}${app.t('community_download')}</button>
    </div>
  </div>`;
}

// ─── DOWNLOAD ────────────────────────────────────────────────────────
// Pull the full deck (incl. deck_data), inject as a fresh local deck, save,
// then best-effort bump the cloud download counter.
export async function downloadDeck(deckId, btnEl) {
  if (btnEl) { btnEl.disabled = true; btnEl.style.opacity = '.6'; }
  try {
    const full = await fetchCommunityDeck(deckId);
    if (!full || !full.deck_data) throw new Error('empty');
    const cards = Array.isArray(full.deck_data.cards) ? full.deck_data.cards : [];

    const deck = app.createDeck(full.title || 'Community Deck');
    for (const cc of cards) {
      deck.cards.push(app.makeCard(
        cc.kanji || '', cc.furigana || '', cc.meaningTr || '',
        cc.exampleJp || '', cc.exampleTr || '', cc.exampleFuriganaMap || {}
      ));
    }
    app.save();

    // Optimistically reflect the new count locally, then sync the server.
    const row = _decks.find(x => x.id === deckId);
    if (row) row.downloads = (Number(row.downloads) || 0) + 1;
    paint();
    incrementDownloadCount(deckId).catch(() => { /* counter is non-critical */ });

    app.showToast(app.t('toast_community_downloaded', { name: full.title || '' }));
  } catch (e) {
    console.error('[CommunityHub] download failed:', e);
    app.showToast(app.t('warn_community_fetch', { msg: e.message }), 3500);
    if (btnEl) { btnEl.disabled = false; btnEl.style.opacity = '1'; }
  }
}
