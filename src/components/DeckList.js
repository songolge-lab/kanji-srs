import { esc, debounce, buildRuby } from '../utils.js';

let app;
export function init(ctx) { app = ctx; }

// ─── KANJI API (furigana assist) ─────────────────────────────────────
const KANJI_API_BASE = 'https://kanjiapi.dev/v1';

async function fetchKanjiReadings(kanji) {
  try {
    const res = await fetch(`${KANJI_API_BASE}/kanji/${encodeURIComponent(kanji)}`);
    if (!res.ok) return null;
    const data = await res.json();
    const readings = [...(data.kun_readings || []), ...(data.on_readings || [])];
    return readings.length ? readings : null;
  } catch { return null; }
}

async function fetchWordReadings(word) {
  try {
    const res = await fetch(`${KANJI_API_BASE}/words/${encodeURIComponent(word)}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data)) return null;
    const matches = new Set();
    for (const entry of data) {
      for (const variant of (entry.variants || [])) {
        if (variant.written === word && variant.pronounced) matches.add(variant.pronounced);
      }
    }
    return matches.size ? [...matches] : null;
  } catch { return null; }
}

async function fetchReadingSuggestions(text) {
  const trimmed = (text || '').trim();
  if (!trimmed) return null;
  if (!/[一-龯぀-ヿ]/.test(trimmed)) return null;
  if ([...trimmed].length === 1) return await fetchKanjiReadings(trimmed);
  return await fetchWordReadings(trimmed);
}

function setupFuriganaAssist(kanjiInputId, furiganaInputId, suggestBoxId) {
  let kanjiInput = document.getElementById(kanjiInputId);
  const furiganaInput = document.getElementById(furiganaInputId);
  const box = document.getElementById(suggestBoxId);
  if (!kanjiInput || !furiganaInput || !box) return;
  const fresh = kanjiInput.cloneNode(true);
  kanjiInput.parentNode.replaceChild(fresh, kanjiInput);
  kanjiInput = fresh;
  const runLookup = debounce(async () => {
    const text = kanjiInput.value.trim();
    if (!text) { box.innerHTML = ''; return; }
    box.innerHTML = `<span class="furigana-chip is-loading">${app.t('furigana_searching')}</span>`;
    const readings = await fetchReadingSuggestions(text);
    if (kanjiInput.value.trim() !== text) return;
    if (!readings || !readings.length) {
      box.innerHTML = furiganaInput.value.trim() ? '' : `<span class="furigana-chip is-empty">${app.t('furigana_not_found')}</span>`;
      return;
    }
    box.innerHTML = readings.map(r => `<button type="button" class="furigana-chip tap">${esc(r)}</button>`).join('');
    box.querySelectorAll('.furigana-chip').forEach((chip, i) => {
      chip.addEventListener('click', () => { furiganaInput.value = readings[i]; box.innerHTML = ''; });
    });
  }, 600);
  kanjiInput.addEventListener('input', runLookup);
}

// ─── FURIGANA MARKING (example sentences) ────────────────────────────
function tokenizeSentence(sentence) {
  const tokens = [];
  let buf = '', bufIsKanji = null;
  const isKanjiChar = (ch) => /[一-龯]/.test(ch);
  for (const ch of sentence) {
    const k = isKanjiChar(ch);
    if (bufIsKanji === null || k === bufIsKanji) { buf += ch; bufIsKanji = k; }
    else { tokens.push({ text: buf, isKanji: bufIsKanji }); buf = ch; bufIsKanji = k; }
  }
  if (buf) tokens.push({ text: buf, isKanji: bufIsKanji });
  return tokens;
}

function setupExampleFuriganaAssist(inputId, rowId, btnId, editorId) {
  let input = document.getElementById(inputId);
  const row = document.getElementById(rowId);
  let btn = document.getElementById(btnId);
  const editor = document.getElementById(editorId);
  if (!input || !row || !btn || !editor) return;
  const freshInput = input.cloneNode(true);
  input.parentNode.replaceChild(freshInput, input); input = freshInput;
  const freshBtn = btn.cloneNode(true);
  btn.parentNode.replaceChild(freshBtn, btn); btn = freshBtn;
  let furiganaMap = {};
  let splitBlocks = new Set();
  input.dataset.furiganaMap = '{}';
  input.addEventListener('input', () => {
    row.style.display = input.value.trim() ? 'flex' : 'none';
    if (!input.value.trim()) { editor.innerHTML = ''; furiganaMap = {}; input.dataset.furiganaMap = '{}'; }
  });
  btn.addEventListener('click', () => renderTokenEditor());

  function renderTokenEditor() {
    const sentence = input.value.trim();
    if (!sentence) return;
    const tokens = tokenizeSentence(sentence);
    function renderKanjiBlock(block) {
      if (furiganaMap[block]) return `<span class="fm-token fm-marked tap" data-token-text="${esc(block)}">${buildRuby(esc(block), esc(furiganaMap[block]))}</span>`;
      if (!splitBlocks.has(block)) return `<span class="fm-token fm-kanji tap" data-token-text="${esc(block)}">${esc(block)}</span>`;
      const markedKeys = Object.keys(furiganaMap).filter(k => block.includes(k)).sort((a, b) => b.length - a.length);
      let i = 0, html = '';
      while (i < block.length) {
        const matchKey = markedKeys.find(k => block.startsWith(k, i));
        if (matchKey) { html += `<span class="fm-token fm-marked tap" data-token-text="${esc(matchKey)}">${buildRuby(esc(matchKey), esc(furiganaMap[matchKey]))}</span>`; i += matchKey.length; }
        else { const ch = block[i]; html += `<span class="fm-token fm-kanji tap" data-token-text="${esc(ch)}">${esc(ch)}</span>`; i += 1; }
      }
      return html;
    }
    const tokensHTML = tokens.map(tok => tok.isKanji ? renderKanjiBlock(tok.text) : esc(tok.text)).join('');
    editor.innerHTML = `<div class="fm-editor"><div class="fm-editor-hint">${app.t('furigana_editor_hint')}</div><div class="fm-sentence">${tokensHTML}</div><div id="${editorId}-popover"></div></div>`;
    editor.querySelectorAll('.fm-token').forEach(el => el.addEventListener('click', () => onTokenClick(el.dataset.tokenText)));
  }

  async function onTokenClick(text) {
    const pop = document.getElementById(`${editorId}-popover`);
    if (!pop) return;
    pop.innerHTML = `<div class="fm-token-popover">${app.t('furigana_searching')}</div>`;
    const readings = await fetchReadingSuggestions(text);
    if (!readings || !readings.length) {
      if ([...text].length > 1) { splitBlocks.add(text); renderTokenEditor(); const pop2 = document.getElementById(`${editorId}-popover`); if (pop2) pop2.innerHTML = `<div class="fm-token-popover fm-editor-hint">${app.t('furigana_word_not_found', {word: esc(text)})}</div>`; return; }
      pop.innerHTML = `<div class="fm-token-popover"><div class="form-group" style="margin-bottom:.5rem"><label>"${esc(text)}" ${app.t('furigana_manual_label')}</label><input type="text" id="${editorId}-manual"></div><button type="button" class="btn btn-primary tap btn-sm" id="${editorId}-manual-save">${app.t('save')}</button></div>`;
      document.getElementById(`${editorId}-manual-save`).addEventListener('click', () => { const val = document.getElementById(`${editorId}-manual`).value.trim(); if (val) applyMark(text, val); });
      return;
    }
    pop.innerHTML = `<div class="fm-token-popover"><div class="furigana-suggest">${readings.map(r => `<button type="button" class="furigana-chip tap" data-r="${esc(r)}">${esc(r)}</button>`).join('')}</div></div>`;
    pop.querySelectorAll('.furigana-chip').forEach(chip => chip.addEventListener('click', () => applyMark(text, chip.dataset.r)));
  }

  function applyMark(text, reading) { furiganaMap[text] = reading; input.dataset.furiganaMap = JSON.stringify(furiganaMap); renderTokenEditor(); }
}

// ─── DECK LIST RENDER ────────────────────────────────────────────────
export function renderDeckList() {
  const { state } = app;
  const container = document.getElementById('deck-list');
  const empty = document.getElementById('deck-list-empty');
  if (!state.decks.length) { container.innerHTML = ''; empty.style.display = 'block'; return; }
  empty.style.display = 'none';
  const tree = app.getDecksInTreeOrder();
  container.innerHTML = tree.map(({ deck, depth }) => {
    const children = app.getChildDecks(deck.id);
    const hasChildren = children.length > 0;
    const s = hasChildren ? app.aggregateDeckStats(deck.id) : app.deckStats(deck);
    const qLen = hasChildren ? app._buildQueue(app.getAllCardsForDeck(deck.id)).length : app.buildQueue(deck).length;
    const indent = depth * 1.2;
    const subInfo = hasChildren ? ` · ${app.t('sub_decks_count', {count: children.length})}` : '';
    return `
    <div class="card" style="${depth ? 'margin-left:' + indent + 'rem;border-left:3px solid var(--line)' : ''}">
      <div class="card-row">
        <button class="tap" style="text-align:left;justify-content:flex-start;flex:1;min-width:0;padding:0" onclick="openDeck('${deck.id}')">
          <span>
            <span class="card-title" style="display:block">${hasChildren ? app.icon('folder') + ' ' : ''}${esc(deck.name)}</span>
            <span class="deck-meta">${app.t('deck_meta', {total: s.total, mastered: s.mastered})}${subInfo}</span>
          </span>
        </button>
      </div>
      <div class="btn-row" style="margin-top:.6rem">
        ${qLen > 0 ? `<button class="btn btn-primary tap" onclick="startStudy('${deck.id}',false)">${app.icon('play','ic-fill')}${app.t('study_btn', {count: qLen})}</button>` : `<span class="text-muted" style="display:flex;align-items:center;flex:1">${app.t('no_cards_to_study')}</span>`}
        <button class="btn btn-ghost tap" onclick="openDeck('${deck.id}')">${app.t('detail')}</button>
      </div>
      <div class="btn-row" style="margin-top:.5rem">
        ${s.newC ? `<span class="badge badge-sky">${app.t('badge_new', {count: s.newC})}</span>` : ''}
        ${s.learning ? `<span class="badge badge-gold">${app.t('badge_learning', {count: s.learning})}</span>` : ''}
        ${s.due ? `<span class="badge badge-hanko">${app.t('badge_review', {count: s.due})}</span>` : ''}
        ${s.mastered ? `<span class="badge badge-jade">${app.icon('star')}${s.mastered}</span>` : ''}
      </div>
    </div>`;
  }).join('');
}

export function renderDeckDetail() {
  const deck = app.findDeck(app.currentDeckId);
  if (!deck) { app.showView('decks'); return; }
  const path = app.getDeckPath(deck.id);
  const breadcrumb = path.length > 1
    ? `<div style="font-size:.82rem;color:var(--ink-soft);margin-bottom:.5rem">${path.map((p, i) => i < path.length - 1 ? `<a href="#" onclick="event.preventDefault();openDeck('${p.id}')" style="color:var(--ink-soft);text-decoration:underline">${esc(p.name)}</a>` : `<strong>${esc(p.name)}</strong>`).join(' › ')}</div>` : '';
  document.getElementById('topbar-title').innerHTML = `
    <span style="display:flex;align-items:center;gap:.4rem;min-width:0">
      <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(deck.name)}</span>
      <button class="icon-btn tap" style="width:30px;height:30px;font-size:.8rem;flex-shrink:0" onclick="showRenameModal('${deck.id}')" aria-label="${app.t('modal_rename')}">${app.icon('edit')}</button>
    </span>`;
  const children = app.getChildDecks(deck.id);
  const hasChildren = children.length > 0;
  const s = hasChildren ? app.aggregateDeckStats(deck.id) : app.deckStats(deck);
  const allCards = hasChildren ? app.getAllCardsForDeck(deck.id) : deck.cards;
  const qLen = hasChildren ? app._buildQueue(allCards).length : app.buildQueue(deck).length;
  const mLen = hasChildren ? app._buildQueue(allCards, true).length : app.buildQueue(deck, true).length;
  const masteredCards = deck.cards.filter(c => c.srs.mastered);
  const normalCards = deck.cards.filter(c => !c.srs.mastered);
  const subDecksHTML = children.length ? `
    <div class="section-hd">${app.t('sub_decks_section', {count: children.length})}</div>
    ${children.map(child => {
      const cs = app.aggregateDeckStats(child.id);
      const cq = app._buildQueue(app.getAllCardsForDeck(child.id)).length;
      return `
      <div class="card" style="border-left:3px solid var(--line)">
        <div class="card-row">
          <button class="tap" style="text-align:left;justify-content:flex-start;flex:1;min-width:0;padding:0" onclick="openDeck('${child.id}')">
            <span><span class="card-title" style="display:block">${esc(child.name)}</span><span class="deck-meta">${app.t('deck_meta', {total: cs.total, mastered: cs.mastered})}</span></span>
          </button>
        </div>
        <div class="btn-row" style="margin-top:.4rem">
          ${cq > 0 ? `<button class="btn btn-primary tap btn-sm" onclick="startStudy('${child.id}',false)">${app.icon('play','ic-fill')}${app.t('study_btn', {count: cq})}</button>` : `<span class="text-muted" style="font-size:.82rem">${app.t('no_cards_to_study')}</span>`}
          <button class="btn btn-ghost tap btn-sm" onclick="openDeck('${child.id}')">${app.t('detail')}</button>
        </div>
      </div>`;
    }).join('')}
    <button class="btn btn-ghost tap" style="margin-bottom:1rem" onclick="showAddSubDeckModal('${deck.id}')">${app.icon('plus')}${app.t('add_sub_deck')}</button>
  ` : '';
  document.getElementById('deck-detail-content').innerHTML = `
    ${breadcrumb}
    <div class="stats-grid" style="grid-template-columns:repeat(3,minmax(0,1fr));">
      <div class="stat-box"><div class="stat-num" style="color:var(--sky)">${s.newC}</div><div class="stat-lbl">${app.t('stat_new')}</div></div>
      <div class="stat-box"><div class="stat-num" style="color:var(--gold)">${s.learning}</div><div class="stat-lbl">${app.t('stat_learning')}</div></div>
      <div class="stat-box"><div class="stat-num" style="color:var(--hanko)">${s.due}</div><div class="stat-lbl">${app.t('stat_due')}</div></div>
      <div class="stat-box"><div class="stat-num">${s.total}</div><div class="stat-lbl">${hasChildren ? app.t('stat_total_all') : app.t('stat_total')}</div></div>
      <div class="stat-box"><div class="stat-num" style="color:var(--jade)">${s.mastered}</div><div class="stat-lbl">${app.t('stat_mastered')}</div></div>
      <div class="stat-box"><div class="stat-num">${qLen}</div><div class="stat-lbl">${app.t('stat_queue')}</div></div>
    </div>
    <div class="btn-row" style="margin-bottom:1rem">
      ${qLen > 0 ? `<button class="btn btn-primary tap" onclick="startStudy('${deck.id}',false)">${app.icon('play','ic-fill')}${hasChildren ? app.t('start_study_all', {count: qLen}) : app.t('start_study', {count: qLen})}</button>` : `<span class="text-muted" style="display:flex;align-items:center;flex:1">${app.t('no_cards_to_study')}</span>`}
      <button class="btn btn-ghost tap" onclick="showAddCardModal('${deck.id}')">${app.icon('plus')}${app.t('add_card')}</button>
      <button class="btn btn-danger tap" onclick="deleteDeck('${deck.id}')">${app.icon('trash')}${app.t('delete_btn')}</button>
    </div>
    <div class="btn-row" style="margin-bottom:1rem">
      <button class="btn btn-ghost tap btn-block" onclick="showReviewPickModal('${deck.id}')">${app.icon('eye')}${app.t('review_btn')}</button>
    </div>
    ${subDecksHTML}
    ${masteredCards.length ? `
    <div class="mastered-banner">
      <div class="mb-top"><span class="mb-icon">${app.icon('star')}</span><span style="flex:1"><span class="mb-title" style="display:block">${app.t('mastered_banner')}</span><span class="mb-sub">${app.t('cards_mastered', {count: masteredCards.length})}</span></span></div>
      <div class="btn-row">
        ${mLen > 0 ? `<button class="btn btn-ghost tap" onclick="startStudy('${deck.id}',true)">${app.icon('play','ic-fill')}${app.t('study_btn', {count: mLen})}</button>` : ''}
        <button class="btn btn-ghost tap" onclick="toggleMasteredList()">${app.icon('eye')}${app.t('list_btn')}</button>
      </div>
    </div>
    <div id="mastered-list" style="display:none">${masteredCards.map(c => cardListItemHTML(c, deck.id)).join('')}</div>` : ''}
    <div class="section-hd">${app.t('cards_section', {count: normalCards.length})}</div>
    ${normalCards.length ? normalCards.map(c => cardListItemHTML(c, deck.id)).join('') : `<div class="empty"><div class="empty-icon">${app.icon('inbox','ic-lg')}</div><p>${app.t('no_cards_in_deck')}</p></div>`}
  `;
}

function cardListItemHTML(c, deckId) {
  const sl = {new:app.t('state_new'), learning:app.t('state_learning'), review:app.t('state_review')}[c.srs.state] || '';
  const badgeCls = {new:'badge-sky', learning:'badge-gold', review:'badge-hanko'}[c.srs.state] || 'badge-soft';
  return `
  <div class="card-list-item">
    <div class="cli-kanji">${esc(c.kanji)}</div>
    <div class="cli-info"><div class="cli-furi">${esc(c.furigana)}</div><div class="cli-meaning">${esc(c.meaningTr)}</div></div>
    ${c.srs.mastered ? `<span class="badge badge-jade" style="padding:.28rem .5rem">${app.icon('star')}</span>` : `<span class="badge ${badgeCls}">${sl}</span>`}
    <div class="cli-actions">
      <button class="icon-btn tap" onclick="showEditModal('${deckId}','${c.id}')" aria-label="${app.t('edit_label')}">${app.icon('edit')}</button>
      <button class="icon-btn tap" onclick="deleteCard('${deckId}','${c.id}')" aria-label="${app.t('delete_btn')}">${app.icon('trash')}</button>
    </div>
  </div>`;
}

export function toggleMasteredList() {
  const el = document.getElementById('mastered-list');
  if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

export function openDeck(deckId) { app.currentDeckId = deckId; app.showView('deck'); }

// ─── ADD FORM ────────────────────────────────────────────────────────
export function renderAddForm() {
  populateDeckSelects();
  setupFuriganaAssist('add-kanji', 'add-furigana', 'add-furigana-suggest');
  setupExampleFuriganaAssist('add-example-jp', 'add-example-mark-row', 'add-example-mark-btn', 'add-example-furigana-editor');
  app.attachPreviewListeners('add-', 'add-preview-wrap');
  app.updatePreview('add-', 'add-preview-wrap');
  app.updateStaticTexts();
}

function populateDeckSelects() {
  const tree = app.getDecksInTreeOrder();
  const opts = tree.map(({ deck, depth }) => `<option value="${deck.id}">${'　'.repeat(depth)}${esc(deck.name)}</option>`).join('');
  const placeholder = app.state.decks.length ? '' : `<option disabled selected>${app.t('create_deck_first')}</option>`;
  document.getElementById('add-deck-select').innerHTML = placeholder + opts;
  document.getElementById('bulk-deck-select').innerHTML = placeholder + opts;
}

export function saveCard() {
  const deckId = document.getElementById('add-deck-select').value;
  const kanji = document.getElementById('add-kanji').value.trim();
  const furigana = document.getElementById('add-furigana').value.trim();
  const meaning = document.getElementById('add-meaning').value.trim();
  const exJpEl = document.getElementById('add-example-jp');
  const exJp = exJpEl.value.trim();
  const exTr = document.getElementById('add-example-tr').value.trim();
  let exFuriganaMap = {};
  try { exFuriganaMap = JSON.parse(exJpEl.dataset.furiganaMap || '{}'); } catch {}
  if (!kanji || !furigana || !meaning) { app.showToast(app.t('warn_required')); return; }
  const deck = app.findDeck(deckId);
  if (!deck) { app.showToast(app.t('warn_deck_not_found')); return; }
  deck.cards.push(app.makeCard(kanji, furigana, meaning, exJp, exTr, exFuriganaMap));
  app.save();
  app.showToast(app.t('toast_card_added', {kanji}));
  document.getElementById('add-kanji').value = '';
  document.getElementById('add-furigana').value = '';
  document.getElementById('add-meaning').value = '';
  document.getElementById('add-example-jp').value = '';
  document.getElementById('add-example-jp').dataset.furiganaMap = '{}';
  document.getElementById('add-example-tr').value = '';
  document.getElementById('add-example-furigana-editor').innerHTML = '';
  document.getElementById('add-example-mark-row').style.display = 'none';
  document.getElementById('add-furigana-suggest').innerHTML = '';
  app.updatePreview('add-', 'add-preview-wrap');
}

export function bulkImport() {
  const deckId = document.getElementById('bulk-deck-select').value;
  const raw = document.getElementById('bulk-input').value;
  const deck = app.findDeck(deckId);
  if (!deck) { app.showToast(app.t('warn_deck_not_found')); return; }
  const lines = raw.split('\n');
  let added = 0, skipped = 0;
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const parts = trimmed.split('|').map(p => p.trim());
    if (parts.length < 3) { skipped++; continue; }
    const [kanji, furigana, meaning, exJp='', exTr=''] = parts;
    if (!kanji || !furigana || !meaning) { skipped++; continue; }
    deck.cards.push(app.makeCard(kanji, furigana, meaning, exJp, exTr));
    added++;
  }
  app.save();
  document.getElementById('bulk-input').value = '';
  app.showToast(app.t('toast_cards_imported', {added, skipped: skipped ? app.t('toast_skipped', {count: skipped}) : ''}), 3000);
}

// ─── DECK / CARD MODALS ──────────────────────────────────────────────
export function showAddDeckModal() {
  const treeOpts = app.getDecksInTreeOrder().map(({ deck, depth }) => `<option value="${deck.id}">${'　'.repeat(depth)}${esc(deck.name)}</option>`).join('');
  app.openModal(app.t('modal_create_deck'), `
    <div class="form-group"><label>${app.t('modal_deck_name')}</label><input id="new-deck-name" placeholder="${app.t('modal_deck_placeholder')}"></div>
    <div class="form-group"><label>${app.t('modal_parent_deck')}</label><select id="new-deck-parent"><option value="">${app.t('modal_independent')}</option>${treeOpts}</select></div>
    <div class="btn-row"><button class="btn btn-primary tap" onclick="addDeck()">${app.t('create')}</button><button class="btn btn-ghost tap" onclick="closeModal()">${app.t('cancel')}</button></div>
  `);
  document.getElementById('new-deck-name').addEventListener('keydown', e => { if (e.key === 'Enter') addDeck(); });
}

export function showAddSubDeckModal(parentId) {
  const parent = app.findDeck(parentId);
  if (!parent) return;
  app.openModal(app.t('modal_add_subdeck', {name: esc(parent.name)}), `
    <div class="form-group"><label>${app.t('modal_subdeck_name')}</label><input id="new-deck-name" placeholder="${app.t('modal_subdeck_placeholder')}"></div>
    <div class="btn-row"><button class="btn btn-primary tap" onclick="addDeck('${parentId}')">${app.t('create')}</button><button class="btn btn-ghost tap" onclick="closeModal()">${app.t('cancel')}</button></div>
  `);
  document.getElementById('new-deck-name').addEventListener('keydown', e => { if (e.key === 'Enter') addDeck(parentId); });
}

export function addDeck(parentId) {
  const name = document.getElementById('new-deck-name').value.trim();
  if (!name) { app.showToast(app.t('warn_name_empty')); return; }
  const pId = parentId || (document.getElementById('new-deck-parent')?.value || null);
  app.createDeck(name, pId);
  app.closeModal();
  renderDeckList();
  app.renderGlobalStats();
  if (pId && app.currentView === 'deck') renderDeckDetail();
  app.showToast(app.t('toast_deck_created', {name}));
}

export function showRenameModal(deckId) {
  const deck = app.findDeck(deckId);
  app.openModal(app.t('modal_rename'), `
    <div class="form-group"><label>${app.t('modal_new_name')}</label><input id="rename-input" value="${esc(deck.name)}" placeholder="${app.t('modal_deck_name')}"></div>
    <div class="btn-row"><button class="btn btn-primary tap" onclick="renameDeck('${deckId}')">${app.t('save')}</button><button class="btn btn-ghost tap" onclick="closeModal()">${app.t('cancel')}</button></div>
  `);
}

export function renameDeck(deckId) {
  const deck = app.findDeck(deckId);
  const newName = document.getElementById('rename-input').value.trim();
  if (!newName) { app.showToast(app.t('warn_name_empty')); return; }
  deck.name = newName;
  app.save(); app.closeModal();
  if (app.currentView === 'deck') renderDeckDetail(); else renderDeckList();
  app.showToast(app.t('toast_deck_renamed'));
}

export function showAddCardModal(deckId) {
  const deck = app.findDeck(deckId);
  if (!deck) return;
  app.openModal(`${esc(deck.name)} — ${app.t('add_card')}`, `
    <div id="modal-add-preview-wrap" class="fc-preview-wrap"></div>
    <div class="form-group"><label>${app.t('kanji_label')} <span class="required">*</span></label><input type="text" id="modal-add-kanji" placeholder="${app.t('kanji_placeholder')}"></div>
    <div class="form-group"><label>${app.t('furigana_label')} <span class="required">*</span></label><input type="text" id="modal-add-furigana" placeholder="${app.t('furigana_placeholder')}"><div class="furigana-suggest" id="modal-add-furigana-suggest"></div></div>
    <div class="form-group"><label>${app.t('meaning_label')} <span class="required">*</span></label><input type="text" id="modal-add-meaning" placeholder="${app.t('meaning_placeholder')}"></div>
    <div class="form-group"><label>${app.t('example_jp_label')}</label><input type="text" id="modal-add-example-jp" placeholder="${app.t('example_jp_placeholder')}"><div class="furigana-mark-row" id="modal-add-example-mark-row" style="display:none"><button type="button" class="btn btn-ghost tap btn-sm" id="modal-add-example-mark-btn">${app.icon('spark')} ${app.t('mark_words_btn')}</button></div><div id="modal-add-example-furigana-editor"></div></div>
    <div class="form-group"><label>${app.t('example_tr_label')}</label><input type="text" id="modal-add-example-tr" placeholder="${app.t('example_tr_placeholder')}"></div>
    <div class="btn-row"><button class="btn btn-primary tap" onclick="saveCardFromModal('${deckId}')">${app.t('save')}</button><button class="btn btn-ghost tap" onclick="closeModal()">${app.t('cancel')}</button></div>
  `);
  setupFuriganaAssist('modal-add-kanji', 'modal-add-furigana', 'modal-add-furigana-suggest');
  setupExampleFuriganaAssist('modal-add-example-jp', 'modal-add-example-mark-row', 'modal-add-example-mark-btn', 'modal-add-example-furigana-editor');
  ['modal-add-kanji','modal-add-furigana','modal-add-meaning','modal-add-example-jp','modal-add-example-tr'].forEach(id => {
    document.getElementById(id)?.addEventListener('keydown', e => { if (e.key === 'Enter') saveCardFromModal(deckId); });
  });
  app.attachPreviewListeners('modal-add-', 'modal-add-preview-wrap');
}

export function saveCardFromModal(deckId) {
  const deck = app.findDeck(deckId);
  if (!deck) { app.showToast(app.t('warn_deck_not_found')); return; }
  const kanji = document.getElementById('modal-add-kanji').value.trim();
  const furigana = document.getElementById('modal-add-furigana').value.trim();
  const meaning = document.getElementById('modal-add-meaning').value.trim();
  const exJpEl = document.getElementById('modal-add-example-jp');
  const exJp = exJpEl.value.trim();
  const exTr = document.getElementById('modal-add-example-tr').value.trim();
  let exFuriganaMap = {};
  try { exFuriganaMap = JSON.parse(exJpEl.dataset.furiganaMap || '{}'); } catch {}
  if (!kanji || !furigana || !meaning) { app.showToast(app.t('warn_required')); return; }
  deck.cards.push(app.makeCard(kanji, furigana, meaning, exJp, exTr, exFuriganaMap));
  app.save();
  app.showToast(app.t('toast_card_added', {kanji}));
  renderDeckDetail();
  document.getElementById('modal-add-kanji').value = '';
  document.getElementById('modal-add-furigana').value = '';
  document.getElementById('modal-add-meaning').value = '';
  document.getElementById('modal-add-example-jp').value = '';
  document.getElementById('modal-add-example-jp').dataset.furiganaMap = '{}';
  document.getElementById('modal-add-example-tr').value = '';
  document.getElementById('modal-add-example-furigana-editor').innerHTML = '';
  document.getElementById('modal-add-example-mark-row').style.display = 'none';
  document.getElementById('modal-add-furigana-suggest').innerHTML = '';
  app.updatePreview('modal-add-', 'modal-add-preview-wrap');
  document.getElementById('modal-add-kanji').focus();
}

export function showEditModal(deckId, cardId) {
  const deck = app.findDeck(deckId);
  const card = deck?.cards.find(c => c.id === cardId);
  if (!card) return;
  app.openModal(app.t('modal_edit_card'), `
    <div class="form-group"><label>${app.t('kanji_label')}</label><input id="edit-kanji" value="${esc(card.kanji)}"></div>
    <div class="form-group"><label>${app.t('furigana_label')}</label><input id="edit-furigana" value="${esc(card.furigana)}"><div class="furigana-suggest" id="edit-furigana-suggest"></div></div>
    <div class="form-group"><label>${app.t('meaning_label')}</label><input id="edit-meaning" value="${esc(card.meaningTr)}"></div>
    <div class="form-group"><label>${app.t('example_jp_label')}</label><input id="edit-example-jp" value="${esc(card.exampleJp)}"><div class="furigana-mark-row" id="edit-example-mark-row" style="display:${card.exampleJp ? 'flex' : 'none'}"><button type="button" class="btn btn-ghost tap btn-sm" id="edit-example-mark-btn">${app.icon('spark')} ${app.t('mark_words_btn')}</button></div><div id="edit-example-furigana-editor"></div></div>
    <div class="form-group"><label>${app.t('example_tr_label')}</label><input id="edit-example-tr" value="${esc(card.exampleTr)}"></div>
    <div class="btn-row"><button class="btn btn-primary tap" onclick="saveEditCard('${deckId}','${cardId}')">${app.t('save')}</button><button class="btn btn-ghost tap" onclick="closeModal()">${app.t('cancel')}</button></div>
  `);
  document.getElementById('edit-example-jp').dataset.furiganaMap = JSON.stringify(card.exampleFuriganaMap || {});
  setupFuriganaAssist('edit-kanji', 'edit-furigana', 'edit-furigana-suggest');
  setupExampleFuriganaAssist('edit-example-jp', 'edit-example-mark-row', 'edit-example-mark-btn', 'edit-example-furigana-editor');
}

export function saveEditCard(deckId, cardId) {
  const deck = app.findDeck(deckId);
  const card = deck?.cards.find(c => c.id === cardId);
  if (!card) return;
  const exJpEl = document.getElementById('edit-example-jp');
  card.kanji = document.getElementById('edit-kanji').value.trim();
  card.furigana = document.getElementById('edit-furigana').value.trim();
  card.meaningTr = document.getElementById('edit-meaning').value.trim();
  card.exampleJp = exJpEl.value.trim();
  card.exampleTr = document.getElementById('edit-example-tr').value.trim();
  try { card.exampleFuriganaMap = JSON.parse(exJpEl.dataset.furiganaMap || '{}'); } catch { card.exampleFuriganaMap = {}; }
  app.save(); app.closeModal(); renderDeckDetail();
  app.showToast(app.t('toast_card_updated'));
}

export function deleteDeck(deckId) {
  const deck = app.findDeck(deckId);
  if (!deck) return;
  const descendants = app.getDescendantDecks(deckId);
  const totalCards = app.getAllCardsForDeck(deckId).length;
  const msg = descendants.length
    ? app.t('confirm_delete_deck_nested', {name: deck.name, sub: descendants.length, count: totalCards})
    : app.t('confirm_delete_deck', {name: deck.name, count: deck.cards.length});
  if (!confirm(msg)) return;
  const idsToDelete = new Set([deckId, ...descendants.map(d => d.id)]);
  app.state.decks = app.state.decks.filter(d => !idsToDelete.has(d.id));
  app.save();
  if (deck.parentId) { app.currentDeckId = deck.parentId; app.showView('deck'); }
  else app.showView('decks');
  app.showToast(app.t('toast_deck_deleted'));
}

export function deleteCard(deckId, cardId) {
  const deck = app.findDeck(deckId);
  if (!deck) return;
  if (!confirm(app.t('confirm_delete_card'))) return;
  deck.cards = deck.cards.filter(c => c.id !== cardId);
  app.save(); renderDeckDetail();
  app.showToast(app.t('toast_card_deleted'));
}
