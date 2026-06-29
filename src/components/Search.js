import { esc, debounce } from '../utils.js';
import { smartRuby } from './CardView.js';

let app;
export function init(ctx) { app = ctx; }

let currentQuery = '';
let currentFilter = 'all';

export function renderView() {
  const container = document.getElementById('search-content');
  if (!container) return;

  container.innerHTML = `
    <div id="search-header-bar">
      <div class="search-input-wrap">
        ${app.icon('search', 'ic-search')}
        <input type="text" id="search-input" placeholder="${app.t('search_placeholder')}" autocomplete="off">
        <button id="search-clear-btn" class="tap" aria-label="${app.t('cancel')}">${app.icon('close')}</button>
      </div>
      <select id="search-filter">
        <option value="all">${app.t('search_filter_all')}</option>
        <option value="kanji">${app.t('search_filter_kanji')}</option>
        <option value="meaning">${app.t('search_filter_meaning')}</option>
        <option value="example">${app.t('search_filter_example')}</option>
      </select>
    </div>
    <div class="search-badge-row" id="search-counter"></div>
    <div id="search-results-list"></div>
  `;

  const input = document.getElementById('search-input');
  const clearBtn = document.getElementById('search-clear-btn');
  const filter = document.getElementById('search-filter');

  input.value = currentQuery;
  filter.value = currentFilter;

  const onInput = debounce((e) => {
    currentQuery = e.target.value;
    updateClearBtn();
    executeSearch();
  }, 150);

  input.addEventListener('input', onInput);
  
  clearBtn.addEventListener('click', () => {
    currentQuery = '';
    input.value = '';
    updateClearBtn();
    input.focus();
    executeSearch();
  });

  filter.addEventListener('change', (e) => {
    currentFilter = e.target.value;
    executeSearch();
  });

  function updateClearBtn() {
    clearBtn.style.display = currentQuery.length > 0 ? 'flex' : 'none';
  }

  updateClearBtn();
  executeSearch();
}

export function refreshSearch() {
  executeSearch();
}

export function executeSearch() {
  const resultsContainer = document.getElementById('search-results-list');
  const counter = document.getElementById('search-counter');
  if (!resultsContainer || !counter) return;

  if (!currentQuery.trim()) {
    resultsContainer.innerHTML = `
      <div class="empty">
        <div class="empty-icon">${app.icon('search', 'ic-lg')}</div>
        <p>${app.t('search_empty_state')}</p>
      </div>
    `;
    counter.textContent = '';
    return;
  }

  const query = currentQuery.toLowerCase().trim();
  const filter = currentFilter;
  
  // Flatten all cards
  const allCards = [];
  for (const deck of app.state.decks) {
    for (const card of deck.cards) {
      allCards.push({ card, deckId: deck.id, deckName: deck.name });
    }
  }

  const results = allCards.filter(item => {
    const c = item.card;
    const kanjiMatch = c.kanji?.toLowerCase().includes(query) || c.furigana?.toLowerCase().includes(query);
    const meaningMatch = c.meaningTr?.toLowerCase().includes(query);
    const exampleMatch = c.exampleJp?.toLowerCase().includes(query) || c.exampleTr?.toLowerCase().includes(query);

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
    resultsContainer.innerHTML = results.map(item => searchResultHTML(item.card, item.deckId, item.deckName)).join('');
    counter.textContent = app.t('search_found', { count: results.length });
  }
}

function searchResultHTML(c, deckId, deckName) {
  return `
  <div class="card-list-item clickable-row" onclick="showCardPreview('${deckId}','${c.id}')" role="button" tabindex="0">
    <div class="cli-kanji" style="font-size: 1.2rem; display: flex; align-items: center; justify-content: center;">
      <div class="fc-ruby" style="font-size: 1rem; margin: 0;">${smartRuby(c.kanji, c.furigana, c.exampleJp)}</div>
    </div>
    <div class="cli-info">
      <div class="cli-meaning" style="font-size: 0.9rem; font-weight: 600; color: var(--ink);">${esc(c.meaningTr)}</div>
      ${c.exampleJp ? `<div class="cli-furi" style="font-weight: normal; color: var(--ink-soft); font-size: 0.8rem; margin-top: 0.15rem;">${esc(c.exampleJp)}</div>` : ''}
      <div class="search-deck-badge">📁 ${esc(deckName)}</div>
    </div>
    <div class="cli-actions">
      <button class="icon-btn tap" onclick="event.stopPropagation();showEditModal('${deckId}','${c.id}')" aria-label="${app.t('edit_label')}">${app.icon('edit')}</button>
      <button class="icon-btn tap" onclick="event.stopPropagation();deleteCard('${deckId}','${c.id}')" aria-label="${app.t('delete_btn')}">${app.icon('trash')}</button>
    </div>
  </div>`;
}
