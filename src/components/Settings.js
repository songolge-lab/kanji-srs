import { esc, today } from '../utils.js';
import { CONFIG } from '../store/appState.js';

let app;
export function init(ctx) { app = ctx; }

// ─── THEME SYSTEM ────────────────────────────────────────────────────
const THEMES = [
  { id: 'washi',  label: 'Washi',  paper: '#f3eee2', accent: '#a8362a' },
  { id: 'sumi',   label: 'Sumi',   paper: '#1a1814', accent: '#d97362' },
  { id: 'matcha', label: 'Matcha', paper: '#eef0e1', accent: '#3c7048' },
  { id: 'sakura', label: 'Sakura', paper: '#f7eee8', accent: '#b5495f' },
  { id: 'indigo', label: 'Indigo', paper: '#e9edf3', accent: '#2456a3' },
];
const THEME_STORAGE_KEY = 'stacks-theme';
const THEME_FOLLOW_SYSTEM_KEY = 'stacks-theme-follow-system';

function getCurrentTheme() { return localStorage.getItem(THEME_STORAGE_KEY) || 'washi'; }
function getFollowSystemTheme() { return localStorage.getItem(THEME_FOLLOW_SYSTEM_KEY) !== '0'; }
function applyTheme(themeId) {
  if (themeId === 'washi') document.documentElement.removeAttribute('data-theme');
  else document.documentElement.setAttribute('data-theme', themeId);
}

export function setTheme(themeId) {
  localStorage.setItem(THEME_STORAGE_KEY, themeId);
  applyTheme(themeId);
  renderThemeSection();
}

export function setFollowSystemTheme(on) {
  localStorage.setItem(THEME_FOLLOW_SYSTEM_KEY, on ? '1' : '0');
  if (on) {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const themeId = prefersDark ? 'sumi' : 'washi';
    localStorage.setItem(THEME_STORAGE_KEY, themeId);
    applyTheme(themeId);
  }
  renderThemeSection();
}

function renderThemeSection() {
  const box = document.getElementById('theme-section');
  if (!box) return;
  const current = getCurrentTheme();
  const followSystem = getFollowSystemTheme();
  const swatchesHTML = THEMES.map(th => {
    const isActive = current === th.id;
    return `
      <button type="button" class="theme-option${isActive ? ' is-active' : ''} tap" onclick="setTheme('${th.id}')">
        <span class="theme-swatch" style="background:${th.paper}">
          ${isActive ? `<span class="theme-swatch-check" style="color:${th.accent}">${app.icon('check')}</span>` : `<span style="width:14px;height:14px;border-radius:50%;background:${th.accent}"></span>`}
        </span>
        <span class="theme-label">${esc(th.label)}</span>
      </button>
    `;
  }).join('');
  box.innerHTML = `
    <div class="theme-grid">${swatchesHTML}</div>
    <div class="settings-item" style="border-top:var(--bd) solid var(--line);padding-top:.8rem">
      <div class="si-label">${app.t('follow_system')}<small>${app.t('follow_system_desc')}</small></div>
      <select class="si-input" id="cfg-follow-system" style="text-align:left" onchange="setFollowSystemTheme(this.value === '1')">
        <option value="1" ${followSystem ? 'selected' : ''}>${app.t('on')}</option>
        <option value="0" ${!followSystem ? 'selected' : ''}>${app.t('off')}</option>
      </select>
    </div>
  `;
}

// ─── SYNC SECTION ────────────────────────────────────────────────────
function renderSyncSection() {
  const el = document.getElementById('sync-section');
  if (!el) return;
  if (!app.syncConfigured()) {
    el.innerHTML = `<p class="text-muted">${app.t('sync_not_configured')}</p><p class="form-hint mt-1">${app.t('sync_dev_note')}</p>`;
    return;
  }
  if (app.syncEnabled && app.syncCode) {
    el.innerHTML = `
      <p style="font-weight:700">${app.t('sync_connected')}</p>
      <p style="font-size:1.8rem;font-weight:800;letter-spacing:.1em;margin:.3rem 0;color:var(--hanko)">${esc(app.syncCode)}</p>
      <p class="text-muted">${app.t('sync_share_hint')}</p>
      <div class="btn-row">
        <button class="btn btn-ghost tap" onclick="manualSync()">${app.icon('sync')}${app.t('sync_now')}</button>
        <button class="btn btn-danger tap" onclick="confirmDisconnectSync()">${app.t('sync_disconnect')}</button>
      </div>
    `;
  } else {
    el.innerHTML = `
      <p class="text-muted" style="margin-bottom:.8rem">${app.t('sync_create_hint')}</p>
      <div class="btn-row"><button class="btn btn-primary tap" onclick="createAndConnectCode()">${app.icon('spark')}${app.t('sync_create')}</button></div>
      <div class="form-group mt-2"><label>${app.t('sync_or_enter')}</label><input id="sync-code-input" placeholder="${app.t('sync_code_placeholder')}" inputmode="numeric" maxlength="6"></div>
      <button class="btn btn-block btn-ghost tap" onclick="enterSyncCode()">${app.t('sync_connect')}</button>
    `;
  }
}

// ─── AI SETTINGS ─────────────────────────────────────────────────────
const AI_MODELS = [
  { id: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro' },
  { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash' },
];

function renderAiSection() {
  const el = document.getElementById('ai-section');
  if (!el) return;
  const s = app.state.settings;
  const key = s.geminiApiKey || '';
  const model = s.geminiModel || AI_MODELS[0].id;
  const modelOptions = AI_MODELS.map(m =>
    `<option value="${m.id}" ${model === m.id ? 'selected' : ''}>${m.label}</option>`
  ).join('');
  el.innerHTML = `
    <p class="text-muted" style="margin-bottom:.8rem">${app.t('ai_section_desc')}</p>
    <div class="form-group">
      <label>${app.t('ai_api_key')}</label>
      <input type="password" class="form-input" id="cfg-gemini-key" value="${key}" placeholder="${app.t('ai_api_key_placeholder')}" autocomplete="off">
    </div>
    <div class="form-group">
      <label>${app.t('ai_model')}</label>
      <select class="form-input" id="cfg-gemini-model">${modelOptions}</select>
    </div>
    <button class="btn btn-primary btn-block tap" onclick="saveAiSettings()">${app.t('save_settings')}</button>
  `;
}

export function saveAiSettings() {
  const key = document.getElementById('cfg-gemini-key')?.value.trim() || '';
  const model = document.getElementById('cfg-gemini-model')?.value || AI_MODELS[0].id;
  app.state.settings.geminiApiKey = key;
  app.state.settings.geminiModel = model;
  app.save();
  app.showToast(app.t('toast_settings_saved'));
}

// ─── SRS SETTINGS ────────────────────────────────────────────────────
function getSettingInfo() {
  return {
    'steps': app.t('info_steps'), 'grad': app.t('info_grad'), 'easy-iv': app.t('info_easy_iv'),
    'ease': app.t('info_ease'), 'easy-bonus': app.t('info_easy_bonus'), 'mastery': app.t('info_mastery'),
    'daily': app.t('info_daily'), 'fuzz': app.t('info_fuzz'), 'shield': app.t('info_shield'),
  };
}

export function toggleSettingInfo(key) {
  const panel = document.getElementById('info-' + key);
  if (!panel) return;
  const isShowing = panel.classList.contains('show');
  document.querySelectorAll('.si-info-panel.show').forEach(p => p.classList.remove('show'));
  if (!isShowing) panel.classList.add('show');
}

function settingItemHTML(key, label, smallText, inputHTML) {
  return `
    <div class="settings-item">
      <div class="si-row">
        <div class="si-label">${label}<small>${smallText}</small></div>
        <button class="si-info-btn tap" type="button" onclick="toggleSettingInfo('${key}')" aria-label="Bilgi">${app.icon('info')}</button>
        ${inputHTML}
      </div>
      <div class="si-info-panel" id="info-${key}">${getSettingInfo()[key]}</div>
    </div>
  `;
}

export function renderSettings() {
  renderThemeSection();
  renderSyncSection();
  renderAiSection();
  const s = app.state.settings;
  document.getElementById('settings-fields').innerHTML =
    settingItemHTML('steps', app.t('srs_steps'), app.t('srs_steps_hint'), `<input class="si-input" id="cfg-steps" value="${s.learnSteps.join(', ')}">`) +
    settingItemHTML('grad', app.t('srs_grad'), app.t('srs_grad_hint'), `<input class="si-input" id="cfg-grad" type="number" min="1" value="${s.graduateInterval}">`) +
    settingItemHTML('easy-iv', app.t('srs_easy_iv'), app.t('srs_easy_iv_hint'), `<input class="si-input" id="cfg-easy-iv" type="number" min="1" value="${s.easyInterval}">`) +
    settingItemHTML('ease', app.t('srs_ease'), app.t('srs_ease_hint'), `<input class="si-input" id="cfg-ease" type="number" min="1.3" max="5" step="0.05" value="${s.defaultEase}">`) +
    settingItemHTML('easy-bonus', app.t('srs_easy_bonus'), app.t('srs_easy_bonus_hint'), `<input class="si-input" id="cfg-easy-bonus" type="number" min="1" step="0.05" value="${s.easyBonus}">`) +
    settingItemHTML('mastery', app.t('srs_mastery'), app.t('srs_mastery_hint'), `<input class="si-input" id="cfg-mastery" type="number" min="7" value="${s.masteryDays}">`) +
    settingItemHTML('daily', app.t('srs_daily'), app.t('srs_daily_hint'), `<input class="si-input" id="cfg-daily" type="number" min="0" value="${s.dailyNewLimit}">`) +
    settingItemHTML('fuzz', app.t('srs_fuzz'), app.t('srs_fuzz_hint'),
      `<select class="si-input" id="cfg-fuzz" style="text-align:left"><option value="1" ${s.fuzz?'selected':''}>${app.t('on')}</option><option value="0" ${!s.fuzz?'selected':''}>${app.t('off')}</option></select>`) +
    settingItemHTML('shield', app.t('srs_shield'), app.t('srs_shield_hint'),
      `<select class="si-input" id="cfg-shield" style="text-align:left"><option value="1" ${s.autoUseShield?'selected':''}>${app.t('on')}</option><option value="0" ${!s.autoUseShield?'selected':''}>${app.t('off')}</option></select>`) +
    `<button class="btn btn-primary btn-block tap mt-2" onclick="saveSettings()">${app.t('save_settings')}</button>
    <div class="version-tag">${app.t('version_tag', {version: app.APP_VERSION})}<br><span class="version-motto">${app.t('keep_stacking')}</span></div>`;
  const langSection = document.getElementById('lang-section');
  if (langSection) {
    const langs = [{code:'en',label:'English'},{code:'tr',label:'Türkçe'},{code:'ko',label:'한국어'},{code:'mn',label:'Монгол'}];
    langSection.innerHTML = langs.map(l => `
      <button class="theme-btn tap${l.code === app.currentLang ? ' active' : ''}" onclick="setLang('${l.code}')">
        ${l.label}
      </button>
    `).join('');
  }
}

export function saveSettings() {
  const { state } = app;
  try {
    const steps = document.getElementById('cfg-steps').value.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n) && n > 0);
    if (!steps.length) { app.showToast(app.t('warn_invalid_steps')); return; }
    state.settings.learnSteps = steps;
    state.settings.graduateInterval = parseInt(document.getElementById('cfg-grad').value) || 1;
    state.settings.easyInterval = parseInt(document.getElementById('cfg-easy-iv').value) || 4;
    state.settings.defaultEase = parseFloat(document.getElementById('cfg-ease').value) || 2.5;
    state.settings.easyBonus = parseFloat(document.getElementById('cfg-easy-bonus').value) || 1.3;
    state.settings.masteryDays = parseInt(document.getElementById('cfg-mastery').value) || 21;
    state.settings.dailyNewLimit = parseInt(document.getElementById('cfg-daily').value) || 0;
    state.settings.fuzz = document.getElementById('cfg-fuzz').value === '1';
    state.settings.autoUseShield = document.getElementById('cfg-shield').value === '1';
    app.save();
    app.showToast(app.t('toast_settings_saved'));
  } catch (e) { app.showToast(app.t('warn_error', {msg: e.message})); }
}

// ─── EXPORT / IMPORT ─────────────────────────────────────────────────
export function exportData() {
  const json = JSON.stringify(app.state, null, 2);
  const blob = new Blob([json], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'kanji-srs-yedek-' + today() + '.json';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
  app.showToast(app.t('toast_exported'));
}

export function importData(file) {
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      if (!data.decks || !Array.isArray(data.decks)) throw new Error('Geçersiz format');
      app.state = { ...app.state, ...data };
      app.migrateAndSave();
      app.showToast(app.t('toast_imported', {count: app.state.decks.length}));
      app.renderDeckList();
      app.renderGlobalStats();
    } catch (err) { app.showToast(app.t('warn_import_error', {msg: err.message})); }
  };
  reader.readAsText(file);
}
