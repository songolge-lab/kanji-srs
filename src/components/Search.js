import { esc, debounce } from '../utils.js';
import { smartRuby } from './CardView.js';

let app;
export function init(ctx) { app = ctx; }

// Artık ayrı bir nav view'ı değil — Decks başlığındaki kompakt arama çubuğu
// (scope:'global') ve deste detayındaki "Search in this deck" çubuğu
// (scope:'deck') aynı motoru paylaşır. Sorgu/filtre scope başına saklanır ki
// ikisi aynı oturumda açılsa birbirini ezmesin.
const scopedState = {};
function stateFor(scope, deckId) {
  const key = scope === 'deck' ? `deck:${deckId}` : 'global';
  if (!scopedState[key]) scopedState[key] = { query: '', filter: 'all' };
  return scopedState[key];
}

// containerId'ye göre hangi scope/deckId ile bağlı olduğunu tutar → app.save()
// sonrası hangi arama çubuklarının tazelenmesi gerektiğini bilmek için.
const activeMounts = new Map();

// ─── MOUNT / UNMOUNT ──────────────────────────────────────────────────
// opts: { scope: 'global' | 'deck', deckId?: string }
export function renderInto(containerId, opts = {}) {
  const scope = opts.scope === 'deck' ? 'deck' : 'global';
  const deckId = opts.deckId || null;
  const container = document.getElementById(containerId);
  if (!container) return;
  const uid = scope === 'deck' ? `deck-${deckId}` : 'global';
  const st = stateFor(scope, deckId);

  container.innerHTML = `
    <div class="search-header-bar">
      <div class="search-input-wrap">
        ${app.icon('search', 'ic-search')}
        <input type="text" id="search-input-${uid}" class="search-input" placeholder="${esc(app.t(scope === 'deck' ? 'search_placeholder_deck' : 'search_placeholder'))}" autocomplete="off">
        <button id="search-clear-${uid}" class="search-clear-btn tap" aria-label="${app.t('cancel')}">${app.icon('close')}</button>
      </div>
      <select id="search-filter-${uid}" class="search-filter">
        <option value="all">${app.t('search_filter_all')}</option>
        <option value="kanji">${app.t('search_filter_kanji')}</option>
        <option value="meaning">${app.t('search_filter_meaning')}</option>
        <option value="example">${app.t('search_filter_example')}</option>
      </select>
    </div>
    <div class="search-badge-row" id="search-counter-${uid}"></div>
    <div id="search-results-${uid}"></div>
  `;

  const input = document.getElementById(`search-input-${uid}`);
  const clearBtn = document.getElementById(`search-clear-${uid}`);
  const filter = document.getElementById(`search-filter-${uid}`);

  input.value = st.query;
  filter.value = st.filter;

  const run = () => executeSearch(uid, scope, deckId);

  const onInput = debounce((e) => {
    st.query = e.target.value;
    updateClearBtn();
    run();
  }, 150);

  input.addEventListener('input', onInput);

  clearBtn.addEventListener('click', () => {
    st.query = '';
    input.value = '';
    updateClearBtn();
    input.focus();
    run();
  });

  filter.addEventListener('change', (e) => {
    st.filter = e.target.value;
    run();
  });

  function updateClearBtn() {
    clearBtn.style.display = st.query.length > 0 ? 'flex' : 'none';
  }

  updateClearBtn();
  run();
  activeMounts.set(containerId, { scope, deckId, uid });
  input.focus();
}

export function unmount(containerId) {
  activeMounts.delete(containerId);
  const container = document.getElementById(containerId);
  if (container) container.innerHTML = '';
}

// app.save() sonrası açık arama çubuklarını (varsa) tazeler.
export function refreshAll() {
  for (const [containerId, { uid, scope, deckId }] of activeMounts) {
    if (!document.getElementById(containerId)) { activeMounts.delete(containerId); continue; }
    executeSearch(uid, scope, deckId);
  }
}

// ─── SEARCH LOGIC ─────────────────────────────────────────────────────
function collectCards(scope, deckId) {
  const list = [];
  if (scope === 'deck' && deckId) {
    const deck = app.findDeck(deckId);
    if (!deck) return list;
    const decks = [deck, ...app.getDescendantDecks(deckId)];
    for (const d of decks) for (const card of d.cards) list.push({ card, deckId: d.id, deckName: d.name });
    return list;
  }
  for (const deck of app.state.decks) for (const card of deck.cards) list.push({ card, deckId: deck.id, deckName: deck.name });
  return list;
}

function executeSearch(uid, scope, deckId) {
  const resultsContainer = document.getElementById(`search-results-${uid}`);
  const counter = document.getElementById(`search-counter-${uid}`);
  if (!resultsContainer || !counter) return;

  const st = stateFor(scope, deckId);
  const query = st.query.trim();

  if (!query) {
    resultsContainer.innerHTML = `
      <div class="empty">
        <div class="empty-icon">${app.icon('search', 'ic-lg')}</div>
        <p>${app.t(scope === 'deck' ? 'search_empty_state_deck' : 'search_empty_state')}</p>
      </div>
    `;
    counter.textContent = '';
    return;
  }

  const q = query.toLowerCase();
  const filter = st.filter;
  const allCards = collectCards(scope, deckId);

  const results = allCards.filter(item => {
    const c = item.card;
    const kanjiMatch = c.kanji?.toLowerCase().includes(q) || c.furigana?.toLowerCase().includes(q);
    const meaningMatch = c.meaningTr?.toLowerCase().includes(q);
    const exampleMatch = c.exampleJp?.toLowerCase().includes(q) || c.exampleTr?.toLowerCase().includes(q);

    if (filter === 'kanji') return kanjiMatch;
    if (filter === 'meaning') return meaningMatch;
    if (filter === 'example') return exampleMatch;

    // 'all'
    return kanjiMatch || meaningMatch || exampleMatch;
  });

  if (results.length === 0) {
    resultsContainer.innerHTML = `
      <div class="empty">
        <div class="empty-icon">${app.icon('inbox', 'ic-lg')}</div>
        <p>${app.t('search_no_results')}</p>
      </div>
    `;
    counter.textContent = '';
  } else {
    // Deste-kapsamlı aramada, sonucun kök desteden mi yoksa bir alt desteden mi
    // geldiğini ancak alt desteyse göster (kök zaten bağlamdan belli).
    const rootDeckId = scope === 'deck' ? deckId : null;
    resultsContainer.innerHTML = results.map(item => searchResultHTML(item.card, item.deckId, item.deckName, rootDeckId)).join('');
    counter.textContent = app.t('search_found', { count: results.length });
  }
}

function searchResultHTML(c, deckId, deckName, rootDeckId) {
  const showBadge = deckId !== rootDeckId;
  return `
  <div class="card-list-item clickable-row" onclick="showCardPreview('${deckId}','${c.id}')" role="button" tabindex="0">
    <div class="cli-kanji" style="font-size: 1.2rem; display: flex; align-items: center; justify-content: center;">
      <div class="fc-ruby" style="font-size: 1rem; margin: 0;">${smartRuby(c.kanji, c.furigana, c.exampleJp)}</div>
    </div>
    <div class="cli-info">
      <div class="cli-meaning" style="font-size: 0.9rem; font-weight: 600; color: var(--ink);">${esc(c.meaningTr)}</div>
      ${c.exampleJp ? `<div class="cli-furi" style="font-weight: normal; color: var(--ink-soft); font-size: 0.8rem; margin-top: 0.15rem;">${esc(c.exampleJp)}</div>` : ''}
      ${showBadge ? `<div class="search-deck-badge">📁 ${esc(deckName)}</div>` : ''}
    </div>
    <div class="cli-actions">
      <button class="icon-btn tap" onclick="event.stopPropagation();showEditModal('${deckId}','${c.id}')" aria-label="${app.t('edit_label')}">${app.icon('edit')}</button>
      <button class="icon-btn tap" onclick="event.stopPropagation();deleteCard('${deckId}','${c.id}')" aria-label="${app.t('delete_btn')}">${app.icon('trash')}</button>
    </div>
  </div>`;
}
