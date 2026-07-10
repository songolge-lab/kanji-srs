import { esc, importTestFromJson } from '../utils.js';
import {
  deleteCustomTest, addCustomTest, updateCustomTest, moveCustomTest,
  getTestChildren, getTestsInTreeOrder, getTestDescendants, countTreeQuestions,
} from '../store/appState.js';

let app;
// Session-only collapse state (mirrors DeckList.collapsedDecks — not persisted).
// Keyed by parent-item id; any item (test or legacy folder) can be a parent.
const collapsedItems = new Set();
let _menuListenerAdded = false;

export function init(ctx) {
  app = ctx;
  // Close any open card action menu when clicking outside of one. Menu buttons
  // stopPropagation, so this only fires for genuine outside clicks.
  if (!_menuListenerAdded) {
    _menuListenerAdded = true;
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.card-menu')) closeAllMenus();
    });
  }
}

// ─── ACCORDION COLLAPSE (mirrors DeckList) ────────────────────────────
// True if any ancestor is collapsed → this item (and its subtree) is skipped
// when rendering the flattened tree.
function hasCollapsedAncestor(item) {
  const all = app.state.customTests || [];
  let pid = item.parentId;
  while (pid) {
    if (collapsedItems.has(pid)) return true;
    const parent = all.find(ct => ct.id === pid);
    if (!parent) break;
    pid = parent.parentId;
  }
  return false;
}

export function toggleCollapse(id) {
  collapsedItems.has(id) ? collapsedItems.delete(id) : collapsedItems.add(id);
  render();
}

// ─── RENDER ───────────────────────────────────────────────────────────
export function render() {
  const el = document.getElementById('test-manager-content');
  if (!el) return;
  const all = app.state.customTests || [];

  // Toolbar stays ghost-only: the single primary per test card is Start (N),
  // mirroring the Decks screen where creation is a quiet topbar action.
  const actionsHTML = `
    <div class="test-actions-row">
      <button class="btn btn-ghost tap" onclick="showTestEditor()">${app.icon('plus')} ${app.t('create_test')}</button>
      <button class="btn btn-ghost tap" onclick="triggerTestImport()">${app.icon('download')} ${app.t('import_test')}</button>
    </div>`;

  let html = actionsHTML;

  if (!all.length) {
    html += `<div class="empty"><div class="empty-icon">${app.icon('inbox', 'ic-lg')}</div><p>${app.t('no_custom_tests')}</p></div>`;
  } else {
    const rows = [];
    for (const { item, depth } of getTestsInTreeOrder(app.state)) {
      if (hasCollapsedAncestor(item)) continue;
      rows.push(itemRowHTML(item, depth));
    }
    html += rows.join('') + `<div class="test-drop-top-level" id="test-drop-top-level">${app.icon('inbox')} ${app.t('move_top_level')}</div>`;
  }

  html += `<input type="file" id="test-import-file" accept=".json" style="display:none">`;
  el.innerHTML = html;
  attachImportListener();
  _attachDragAndDrop(el);
  _attachLongPress(el);
}

function indentStyle(depth) {
  return depth ? `margin-left:${depth * 1.2}rem` : '';
}

// Unified card for any item (mirrors a deck card). Any item may parent others,
// so folders and runnable tests share the same layout: a runnable test can act
// as an upper/parent test. Start runs the whole subtree (own + descendants).
function itemRowHTML(item, depth) {
  const isFolder = item.kind === 'folder';
  const children = getTestChildren(app.state, item.id);
  const hasChildren = children.length > 0;
  const isCollapsed = collapsedItems.has(item.id);
  const ownCount = (item.questions || []).length;
  const totalCount = countTreeQuestions(app.state, item.id); // own + descendants
  const collapseBtn = hasChildren
    ? `<button class="icon-btn tap deck-collapse-btn" onclick="event.stopPropagation();testToggleCollapse('${esc(item.id)}')" aria-label="${app.t(isCollapsed ? 'expand_tests' : 'collapse_tests')}" title="${app.t(isCollapsed ? 'expand_tests' : 'collapse_tests')}" aria-expanded="${!isCollapsed}">${app.icon(isCollapsed ? 'chevron_right' : 'chevron_down')}</button>`
    : '';
  const subBadge = hasChildren ? ` <span class="badge badge-soft deck-sub-badge">${app.t('sub_tests_count', { count: children.length })}</span>` : '';
  // Any parent gets the folder mark, mirroring deck rows where the icon means
  // "has a subtree" — not just legacy container items.
  const folderIcon = (isFolder || hasChildren) ? app.icon('folder') + ' ' : '';
  // Runnable tests open Details (the editor for their OWN questions); legacy
  // folders can't be edited, so their title just toggles the subtree.
  const titleOnclick = isFolder ? `testToggleCollapse('${esc(item.id)}')` : `showTestEditor('${esc(item.id)}')`;
  // Folders show the subtree total (matching their Start count) so every row
  // keeps the same two-line title block deck rows have.
  const metaLine = `<span class="deck-meta">${app.t('question_count', { count: isFolder ? totalCount : ownCount })}</span>`;
  const startBtn = totalCount > 0
    ? `<button class="btn btn-primary tap" onclick="playTest('${esc(item.id)}')">${app.icon('play', 'ic-fill')}${app.t('start_test', { count: totalCount })}</button>`
    : `<span class="text-muted action-note">${app.t('no_questions_to_start')}</span>`;
  const detailsBtn = isFolder ? '' : `<button class="btn btn-ghost tap nv-hide" onclick="showTestEditor('${esc(item.id)}')">${app.t('detail')}</button>`;
  const tileChar = esc([...String(item.title || '').trim()][0] || '?');
  return `
  <div class="card test-draggable${depth ? ' card-child' : ''}" draggable="true" data-test-id="${esc(item.id)}" data-kind="${isFolder ? 'folder' : 'test'}" style="${indentStyle(depth)}">
    <div class="card-row">
      ${collapseBtn}
      <button class="card-title-btn tap" onclick="${titleOnclick}">
        <span class="nv-only nv-tile" aria-hidden="true">${tileChar}</span>
        <span>
          <span class="card-title">${folderIcon}${esc(item.title || app.t('untitled_test'))}${subBadge}</span>
          ${metaLine}
        </span>
      </button>
      ${menuHTML(item.id, isFolder ? 'folder' : 'test')}
    </div>
    <div class="btn-row card-actions">
      ${startBtn}
      ${detailsBtn}
    </div>
  </div>`;
}

// Compact top-right action menu (mirrors the deck-card move button, expanded to
// a popover). Folders add Rename since they have no Details/editor; runnable
// tests rename via Details instead.
function menuHTML(id, kind) {
  const items = kind === 'folder'
    ? `<button onclick="event.stopPropagation();testRenameFolder('${esc(id)}')">${app.icon('edit')}${app.t('rename_folder')}</button>
       <button onclick="event.stopPropagation();testMoveModal('${esc(id)}')">${app.icon('move')}${app.t('move_label')}</button>
       <button class="danger" onclick="event.stopPropagation();deleteTest('${esc(id)}')">${app.icon('trash')}${app.t('delete_btn')}</button>`
    : `<button onclick="event.stopPropagation();testMoveModal('${esc(id)}')">${app.icon('move')}${app.t('move_label')}</button>
       <button class="danger" onclick="event.stopPropagation();deleteTest('${esc(id)}')">${app.icon('trash')}${app.t('delete_btn')}</button>`;
  return `
  <div class="card-menu">
    <button class="icon-btn tap card-menu-btn" onclick="event.stopPropagation();testToggleMenu('${esc(id)}')" aria-label="${app.t('card_actions')}" title="${app.t('card_actions')}" aria-haspopup="true" aria-expanded="false">${app.icon('more')}</button>
    <div class="card-menu-pop" id="test-menu-${esc(id)}" style="display:none">${items}</div>
  </div>`;
}

export function toggleMenu(id) {
  const pop = document.getElementById('test-menu-' + id);
  if (!pop) return;
  const willOpen = pop.style.display === 'none';
  closeAllMenus();
  if (willOpen) {
    pop.style.display = 'block';
    pop.parentElement.querySelector('.card-menu-btn')?.setAttribute('aria-expanded', 'true');
  }
}

function closeAllMenus() {
  document.querySelectorAll('.card-menu-pop').forEach(p => (p.style.display = 'none'));
  document.querySelectorAll('.card-menu-btn[aria-expanded="true"]').forEach(b => b.setAttribute('aria-expanded', 'false'));
}

function attachImportListener() {
  const fileInput = document.getElementById('test-import-file');
  if (!fileInput) return;
  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const test = await importTestFromJson(file);
      // A previously-exported test may carry stale kind/parentId/timestamps —
      // always re-home it as a fresh root-level test.
      test.kind = 'test';
      test.parentId = null;
      const now = Date.now();
      test.createdAt = now;
      test.updatedAt = now;
      addCustomTest(app.state, test);
      app.save();
      render();
      app.showToast(app.t('toast_test_imported', { title: test.title }));
    } catch {
      app.showToast(app.t('warn_invalid_test_file'));
    }
    e.target.value = '';
  });
}

// ─── FOLDER CRUD ──────────────────────────────────────────────────────
export function renameFolderModal(id) {
  closeAllMenus();
  const folder = (app.state.customTests || []).find(ct => ct.id === id && ct.kind === 'folder');
  if (!folder) return;
  app.openModal(app.t('rename_folder'), `
    <div class="form-group"><label>${app.t('folder_name_label')}</label><input id="tf-rename-input" value="${esc(folder.title)}"></div>
    <div class="btn-row"><button class="btn btn-primary tap" onclick="testSubmitRenameFolder('${esc(id)}')">${app.t('save')}</button><button class="btn btn-ghost tap" onclick="closeModal()">${app.t('cancel')}</button></div>
  `);
}

export function submitRenameFolder(id) {
  const folder = (app.state.customTests || []).find(ct => ct.id === id && ct.kind === 'folder');
  if (!folder) return;
  const title = (document.getElementById('tf-rename-input')?.value || '').trim();
  if (!title) { app.showToast(app.t('warn_name_empty')); return; }
  updateCustomTest(app.state, id, { title });
  app.save();
  app.closeModal();
  render();
  app.showToast(app.t('toast_folder_renamed'));
}

// Deletes any item; cascades to its whole subtree (deck-consistent). Confirm
// wording adapts to kind and whether it has descendants.
export function deleteItem(id) {
  closeAllMenus();
  const item = (app.state.customTests || []).find(ct => ct.id === id);
  if (!item) return;
  const isFolder = item.kind === 'folder';
  const descCount = getTestDescendants(app.state, id).length;
  const name = item.title || app.t('untitled_test');
  let msg;
  if (descCount > 0) msg = app.t(isFolder ? 'confirm_delete_folder_nested' : 'confirm_delete_test_nested', { name, count: descCount });
  else msg = isFolder ? app.t('confirm_delete_folder', { name }) : app.t('confirm_delete_test');
  if (!confirm(msg)) return;
  deleteCustomTest(app.state, id); // cascades to descendants
  collapsedItems.delete(id);
  app.save();
  render();
  app.showToast(app.t(isFolder ? 'toast_folder_deleted' : 'toast_test_deleted'));
}

// ─── MOVE (any item into any other item) ──────────────────────────────
export function moveItemModal(id) {
  closeAllMenus();
  const all = app.state.customTests || [];
  const item = all.find(ct => ct.id === id);
  if (!item) return;
  // Valid parents: any item except self and its own descendants (cycle guard).
  const invalid = new Set([id]);
  for (const d of getTestDescendants(app.state, id)) invalid.add(d.id);
  const opts = getTestsInTreeOrder(app.state)
    .filter(({ item: it }) => !invalid.has(it.id))
    .map(({ item: it, depth }) => {
      const label = (it.kind === 'folder' ? '📁 ' : '') + esc(it.title || app.t('untitled_test'));
      return `<option value="${esc(it.id)}"${(item.parentId || null) === it.id ? ' selected' : ''}>${'　'.repeat(depth)}${label}</option>`;
    }).join('');
  const rootSel = !item.parentId ? ' selected' : '';
  app.openModal(app.t('move_test'), `
    <div class="form-group"><label>${app.t('move_test_to_label')}</label>
    <select id="test-move-target"><option value=""${rootSel}>${app.t('move_top_level')}</option>${opts}</select></div>
    <div class="btn-row"><button class="btn btn-primary tap" onclick="testSubmitMove('${esc(id)}')">${app.icon('move')}${app.t('save')}</button><button class="btn btn-ghost tap" onclick="closeModal()">${app.t('cancel')}</button></div>
  `);
}

export function submitMoveTest(id) {
  const targetId = document.getElementById('test-move-target')?.value || null;
  if (!moveCustomTest(app.state, id, targetId)) { app.showToast(app.t('warn_move_cycle')); return; }
  app.save();
  app.closeModal();
  render();
  app.showToast(app.t('toast_test_moved'));
}

// Internal drag-drop move — same guards, no modal.
function _moveTestDirect(srcId, targetId) {
  const src = (app.state.customTests || []).find(ct => ct.id === srcId);
  if (!src) return false;
  if ((src.parentId || null) === (targetId || null)) return false; // no-op
  if (!moveCustomTest(app.state, srcId, targetId)) return false;   // cycle guard
  app.save();
  render();
  app.showToast(app.t('toast_test_moved'));
  return true;
}

// ─── HTML5 DRAG & DROP (any item is a drop target — mirrors DeckList) ──
// Dropping item B onto item A makes B a child of A, so A becomes a parent
// test. Cycle guard lives in moveCustomTest (no dropping into a descendant).
function _attachDragAndDrop(container) {
  const cards = container.querySelectorAll('.test-draggable');
  const dropZone = document.getElementById('test-drop-top-level');

  cards.forEach(card => {
    card.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', card.dataset.testId);
      e.dataTransfer.effectAllowed = 'move';
      requestAnimationFrame(() => card.classList.add('dragging'));
    });
    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
      container.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
      if (dropZone) dropZone.classList.remove('drag-over');
    });
  });

  if (!container._hasTestDnd) {
    container._hasTestDnd = true;
    container.addEventListener('dragover', e => {
      const target = e.target.closest('.test-draggable');
      if (!target) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      container.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
      target.classList.add('drag-over');
    });
    container.addEventListener('dragleave', e => {
      const target = e.target.closest('.test-draggable');
      if (target) target.classList.remove('drag-over');
    });
    container.addEventListener('drop', e => {
      const targetCard = e.target.closest('.test-draggable');
      container.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
      if (dropZone) dropZone.classList.remove('drag-over');
      if (!targetCard) return;
      e.preventDefault();
      const srcId = e.dataTransfer.getData('text/plain');
      const destId = targetCard.dataset.testId;
      if (!srcId || srcId === destId) return;
      if (!_moveTestDirect(srcId, destId)) app.showToast(app.t('warn_move_cycle'));
    });
  }

  // Recreated with each render → wire the fresh element directly.
  if (dropZone) {
    dropZone.addEventListener('dragover', e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; dropZone.classList.add('drag-over'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
    dropZone.addEventListener('drop', e => {
      e.preventDefault();
      dropZone.classList.remove('drag-over');
      const srcId = e.dataTransfer.getData('text/plain');
      if (srcId) _moveTestDirect(srcId, null);
    });
  }
}

// ─── MOBILE LONG-PRESS → move modal (mirrors DeckList) ────────────────
function _attachLongPress(container) {
  if (container._hasTestLongPress) return;
  container._hasTestLongPress = true;
  const HOLD_MS = 500, MOVE_THRESHOLD = 10;
  let holdTimer = null, startX = 0, startY = 0, activeId = null;
  const cancel = () => { if (holdTimer) { clearTimeout(holdTimer); holdTimer = null; } activeId = null; };

  container.addEventListener('pointerdown', e => {
    const card = e.target.closest('.test-draggable');
    if (!card) return;
    if (e.target.closest('button') || e.target.closest('a')) return;
    activeId = card.dataset.testId;
    startX = e.clientX; startY = e.clientY;
    holdTimer = setTimeout(() => { holdTimer = null; if (activeId) { moveItemModal(activeId); activeId = null; } }, HOLD_MS);
  });
  container.addEventListener('pointermove', e => {
    if (!holdTimer) return;
    if (Math.abs(e.clientX - startX) > MOVE_THRESHOLD || Math.abs(e.clientY - startY) > MOVE_THRESHOLD) cancel();
  });
  container.addEventListener('pointerup', cancel);
  container.addEventListener('pointercancel', cancel);
  container.addEventListener('contextmenu', e => { if (e.target.closest('.test-draggable')) e.preventDefault(); });
}

export function handlePlay(id) {
  app.showTestPlay(id);
}

export function triggerImport() {
  const fileInput = document.getElementById('test-import-file');
  if (fileInput) fileInput.click();
}
