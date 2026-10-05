import { esc } from '../utils.js';
import { fetchCommunityDecks, fetchCommunityDeck, incrementDownloadCount } from '../services/dbService.js';
import { isPackImported, loadRemotePackCatalog, importRemotePack } from '../services/studyPackService.js';

// ─── COMMUNITY HUB (Market) ──────────────────────────────────────────
// Browse + download decks shared by other learners. Pure Vanilla JS,
// follows the shared component pattern: init(app) injects context; render()
// is called by the router (showView('community')) and mounts into
// #community-content. All cloud calls go through dbService.js.

let app;
let _container = null;
let _state = 'idle';  // idle | loading | ready | error
let _decks = [];
let _remoteState = 'idle';  // idle | loading | ready | error
let _remotePacks = [];
const _importJobs = new Map();

export function init(ctx) { app = ctx; }

// Router entry point (mirrors TestManager.render() etc.)
export function render() {
  const c = document.getElementById('community-content');
  if (c) renderCommunityHub(c);
}

// Spec-named entry point: render the hub into an arbitrary container.
// Community decks and the remote curated-pack catalog are both fetched
// lazily and repaint independently — neither blocks the other, and a
// failure in one doesn't prevent the other from rendering.
export function renderCommunityHub(container) {
  _container = container;
  paint();
  load();
  loadRemote();
}

export async function refresh() { await load(); await loadRemote(); }

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

async function loadRemote() {
  _remoteState = 'loading';
  paint();
  const result = await loadRemotePackCatalog();
  if (result.status === 'ok') {
    _remotePacks = result.packs;
    _remoteState = 'ready';
  } else {
    console.error('[CommunityHub] loadRemote failed:', result.message);
    _remoteState = 'error';
  }
  paint();
}

function paint() {
  if (!_container) return;
  let body;
  if (_state === 'loading') {
    body = `<div class="empty"><div class="empty-icon"><span class="spin">${app.icon('sync', 'ic-lg')}</span></div><p>${app.t('community_loading')}</p></div>`;
  } else if (_state === 'error') {
    body = `<div class="empty"><div class="empty-icon">${app.icon('alert', 'ic-lg')}</div><p>${app.t('community_error')}</p>
      <button class="btn btn-ghost tap" onclick="communityRefresh()">${app.icon('sync')}${app.t('community_refresh')}</button></div>`;
  } else if (!_decks.length) {
    body = `<div class="empty"><div class="empty-icon">${app.icon('community', 'ic-lg')}</div><p>${app.t('community_empty')}</p></div>`;
  } else {
    body = `<div class="community-grid">${_decks.map(cardHTML).join('')}</div>`;
  }
  _container.innerHTML = curatedPacksHTML() + headerHTML() + body;
}

// ─── CURATED PACKS (Supabase remote catalog only) ─────────────────────
// Curated packs are remote-only — Supabase is the source of truth (see
// studyPackService.js). The catalog is fetched lazily; while it's
// loading/unavailable no pack cards render at all (no local fallback data
// exists to show), just a clean status note.
function curatedPacksHTML() {
  // Loading/error render in the shared .empty shape (compact variant) so async
  // section states read as intentional, not leftover placeholder text.
  let stateNote = '';
  if (_remoteState === 'loading' || _remoteState === 'idle') {
    stateNote = `<div class="empty empty-sm"><div class="empty-icon"><span class="spin">${app.icon('sync', 'ic-lg')}</span></div><p>${app.t('pack_loading')}</p></div>`;
  } else if (_remoteState === 'error') {
    stateNote = `<div class="empty empty-sm"><div class="empty-icon">${app.icon('alert', 'ic-lg')}</div><p>${app.t('pack_remote_unavailable')}</p>
      <button class="btn btn-ghost tap" onclick="communityRefresh()">${app.icon('sync')}${app.t('community_refresh')}</button></div>`;
  }

  const cards = _remoteState === 'ready' ? _remotePacks.map(remotePackCardHTML).join('') : '';
  if (!cards && !stateNote) return '';
  return `
  <div class="community-hub-head">
    <div class="section-hd">${app.t('curated_packs')}</div>
  </div>
  ${stateNote}
  <div class="community-grid pack-grid">${cards}</div>`;
}

function importProgressLabel(job) {
  if (!job) return app.t('pack_importing');
  if (job.cardCount > 0) {
    const done = Math.min(job.doneCards || 0, job.cardCount);
    return `${app.t('pack_importing')} ${done} / ${app.t('pack_cards_count', { count: job.cardCount })}`;
  }
  return app.t('pack_importing');
}

function remotePackCardHTML(pack) {
  const imported = isPackImported(app.state, pack.pack_id);
  const job = _importJobs.get(pack.pack_id);
  const importLocked = _importJobs.size > 0;
  const action = imported
    ? `<span class="badge badge-jade">${app.icon('check')}${app.t('imported_pack')}</span>`
    : job
      ? `<button class="btn btn-primary tap" disabled><span class="spin">${app.icon('sync')}</span>${esc(importProgressLabel(job))}</button>`
      : `<button class="btn btn-primary tap" onclick="communityImportRemotePack('${pack.pack_id}', this)" ${importLocked ? 'disabled' : ''}>${app.icon('download')}${app.t('import_pack')}</button>`;
  const metaLine = [
    app.t('pack_cards_count', { count: pack.card_count || 0 }),
    app.t('pack_tests_count', { count: pack.test_count || 0 }),
    app.t('pack_version', { version: pack.version }),
  ].map(part => esc(part)).join(' · ');
  return `
  <div class="card community-card pack-card">
    ${pack.level ? `<span class="nv-only nv-pack-emblem" aria-hidden="true">${esc(String(pack.level))}</span>` : ''}
    <div class="pack-card-head">
      <span class="badge badge-sky">${app.icon('star')}${app.t('pack_curated_badge')}</span>
      ${pack.level ? `<span class="badge badge-jade nv-hide">${esc(String(pack.level))}</span>` : ''}
      ${pack.language ? `<span class="badge badge-soft">${esc(String(pack.language).toUpperCase())}</span>` : ''}
    </div>
    <div class="card-title">${esc(pack.title || '')}</div>
    ${pack.description ? `<p class="community-desc">${esc(pack.description)}</p>` : ''}
    <div class="deck-meta pack-meta">${metaLine}</div>
    <div class="community-card-foot">${action}</div>
  </div>`;
}

// Imports a remote pack (downloads JSON from Supabase Storage, validates,
// then writes decks/cards/tests) then repaints — a full repaint after the
// await both restores the button (success/failure) and flips it to the
// "Imported" badge on success, so no manual state juggling on btnEl needed.
export async function importRemotePackAction(packId, btnEl) {
  const catalogEntry = _remotePacks.find(p => p.pack_id === packId);
  if (!catalogEntry) return;
  if (_importJobs.size > 0) return;
  let lastPaint = 0;
  _importJobs.set(packId, {
    phase: 'download',
    cardCount: catalogEntry.card_count || 0,
    testQuestionCount: catalogEntry.test_count || 0,
    doneCards: 0,
    doneTests: 0,
  });
  if (btnEl) { btnEl.disabled = true; btnEl.innerHTML = app.t('pack_importing'); }
  paint();
  try {
    const result = await importRemotePack(app, catalogEntry, {
      onProgress(progress) {
        const current = _importJobs.get(packId) || {};
        _importJobs.set(packId, { ...current, ...progress });
        const now = Date.now();
        if (now - lastPaint > 80 || progress.phase === 'done' || progress.phase === 'rollback') {
          lastPaint = now;
          paint();
        }
      }
    });
    if (result.status === 'already_imported') {
      app.showToast(app.t('pack_already_imported'), 3000);
    } else if (result.status === 'ok') {
      app.showToast(app.t('pack_import_success', { count: result.cardCount, tests: result.testCount }), 3500);
    } else if (result.reason === 'download') {
      app.showToast(app.t('pack_download_failed', { msg: result.message || '' }), 3500);
    } else if (result.reason === 'invalid') {
      app.showToast(app.t('pack_invalid', { msg: result.message || '' }), 3500);
    } else {
      const msg = result.rolledBack ? `${result.message || ''} ${app.t('pack_import_rollback_done')}` : (result.message || '');
      app.showToast(app.t('pack_import_failed', { msg }), 3500);
    }
  } catch (e) {
    app.showToast(app.t('pack_import_failed', { msg: e?.message || '' }), 3500);
  } finally {
    _importJobs.delete(packId);
    paint();
  }
}

function headerHTML() {
  // Header actions stay quiet (ghost): the primary of this view is the
  // per-card Download/Import action, not sharing or refreshing.
  return `
  <div class="community-hub-head">
    <div class="section-hd">${app.t('community_title')}</div>
    <div class="head-actions">
      <button class="btn btn-ghost tap btn-sm" onclick="communityPublishPicker()">${app.icon('publish')}${app.t('community_publish')}</button>
      <button class="btn btn-ghost tap btn-sm" onclick="communityRefresh()">${app.icon('sync')}${app.t('community_refresh')}</button>
    </div>
  </div>
  <div class="community-hub-sub">${app.t('community_subtitle')}</div>`;
}

export function showPublishPicker() {
  const decks = app.getDecksInTreeOrder();
  if (!decks.length) { app.showToast(app.t('no_decks').split('\n')[0]); return; }
  const rows = decks.map(({ deck, depth }) => {
    const indent = depth > 0 ? ` style="padding-left:${depth * 1.2}rem"` : '';
    const count = app.getAllCardsForDeck(deck.id).length;
    return `<button class="btn btn-ghost tap deck-pick-btn"${indent} onclick="publishDeckModal('${deck.id}')">
      <span>${esc(deck.name)}</span><span class="text-muted">${esc(app.t('pack_cards_count', { count }))}</span>
    </button>`;
  }).join('');
  app.openModal(app.t('community_publish'), `<div class="deck-pick-list">${rows}</div>`);
}

function cardHTML(d) {
  const tags = Array.isArray(d.tags) ? d.tags : [];
  const tagHTML = tags.length
    ? `<div class="community-tags">${tags.map(tg => `<span class="badge badge-soft">${esc(String(tg))}</span>`).join('')}</div>`
    : '';
  return `
  <div class="card community-card">
    <span class="nv-only nv-tile nv-tile-user" aria-hidden="true">${esc(([...String(d.author_name || '').trim()][0] || 'A').toUpperCase())}</span>
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
        cc.exampleJp || '', cc.exampleTr || '', cc.exampleFuriganaMap || {}, cc.exampleFurigana
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
