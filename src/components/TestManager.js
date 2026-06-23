import { esc, exportTestToJson, importTestFromJson } from '../utils.js';
import { deleteCustomTest, addCustomTest } from '../store/appState.js';

let app;
export function init(ctx) { app = ctx; }

export function render() {
  const el = document.getElementById('test-manager-content');
  if (!el) return;
  const tests = app.state.customTests || [];

  if (!tests.length) {
    el.innerHTML = `
      <div style="display:flex;gap:.5rem;margin-bottom:1rem">
        <button class="btn btn-primary tap" style="flex:2" onclick="showTestEditor()">
          ${app.icon('plus')} ${app.t('create_test')}
        </button>
        <button class="btn btn-ghost tap" style="flex:1" onclick="triggerTestImport()">
          ${app.icon('download')} ${app.t('import_test')}
        </button>
      </div>
      <div class="empty">
        <div class="empty-icon">${app.icon('inbox', 'ic-lg')}</div>
        <p>${app.t('no_custom_tests')}</p>
      </div>
      <input type="file" id="test-import-file" accept=".json" style="display:none">`;
    attachImportListener();
    return;
  }

  let html = `
    <div style="display:flex;gap:.5rem;margin-bottom:1rem">
      <button class="btn btn-primary tap" style="flex:2" onclick="showTestEditor()">
        ${app.icon('plus')} ${app.t('create_test')}
      </button>
      <button class="btn btn-ghost tap" style="flex:1" onclick="triggerTestImport()">
        ${app.icon('download')} ${app.t('import_test')}
      </button>
    </div>`;

  for (const test of tests) {
    const qCount = (test.questions || []).length;
    html += `
    <div class="card test-item">
      <div class="card-row">
        <div class="card-title">${esc(test.title || app.t('untitled_test'))}</div>
      </div>
      <div class="deck-meta">${app.t('question_count', { count: qCount })}</div>
      <div class="btn-row">
        <button class="btn btn-ghost tap" onclick="playTest('${esc(test.id)}')">${app.icon('play')} ${app.t('play_test')}</button>
        <button class="btn btn-ghost tap" onclick="showTestEditor('${esc(test.id)}')">${app.icon('edit')} ${app.t('edit_label')}</button>
        <button class="btn btn-ghost tap" onclick="exportTest('${esc(test.id)}')">${app.icon('download')} ${app.t('export_test')}</button>
        <button class="btn btn-danger tap" onclick="deleteTest('${esc(test.id)}')">${app.icon('trash')} ${app.t('delete_btn')}</button>
      </div>
    </div>`;
  }
  html += `<input type="file" id="test-import-file" accept=".json" style="display:none">`;
  el.innerHTML = html;
  attachImportListener();
}

function attachImportListener() {
  const fileInput = document.getElementById('test-import-file');
  if (fileInput) {
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const test = await importTestFromJson(file);
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
}

export function handleDelete(id) {
  if (!confirm(app.t('confirm_delete_test'))) return;
  deleteCustomTest(app.state, id);
  app.save();
  render();
  app.showToast(app.t('toast_test_deleted'));
}

export function handlePlay(id) {
  app.showTestPlay(id);
}

export function handleExport(id) {
  const test = (app.state.customTests || []).find(ct => ct.id === id);
  if (!test) return;
  exportTestToJson(test);
  app.showToast(app.t('toast_test_exported'));
}

export function triggerImport() {
  const fileInput = document.getElementById('test-import-file');
  if (fileInput) fileInput.click();
}
