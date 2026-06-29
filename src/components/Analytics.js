import { today, nowMs, addDaysToDateStr, dateStrToEpochDay, epochDayToDateStr, dateStrDiffDays, weekStartOf, esc } from '../utils.js';

let app;
export function init(ctx) { app = ctx; }

// ─── STATS HELPERS ────────────────────────────────────────────────────
export function recordReview(isNew, deckTitle) {
  const { state } = app;
  const td = today();
  const isFirstReviewToday = !state.stats.reviewsByDate[td];
  state.stats.reviewsByDate[td] = (state.stats.reviewsByDate[td] || 0) + 1;
  if (isNew) {
    const k = td + '_new';
    state.stats.reviewsByDate[k] = (state.stats.reviewsByDate[k] || 0) + 1;
  }
  if (!state.stats.dailyStats) state.stats.dailyStats = {};
  if (!state.stats.dailyStats[td]) state.stats.dailyStats[td] = { cardsStudied: 0, timeSpentMs: 0, decksStudied: [] };
  const day = state.stats.dailyStats[td];
  if (!Array.isArray(day.decksStudied)) day.decksStudied = []; // eski/migre edilmemiş gün koruması
  day.cardsStudied++;
  if (deckTitle && !day.decksStudied.includes(deckTitle)) day.decksStudied.push(deckTitle);
  if (isFirstReviewToday) applyShieldsForMissedDays();
  updateStreak();
  awardWeeklyShieldIfEarned();
}

function applyShieldsForMissedDays() {
  const { state } = app;
  if (!app.cfg().autoUseShield) return;
  const dates = Object.keys(state.stats.reviewsByDate).filter(k => !k.includes('_new')).sort();
  const td = today();
  const priorDates = dates.filter(d => d !== td);
  if (!priorDates.length) return;
  const lastActive = priorDates[priorDates.length - 1];
  const gap = dateStrDiffDays(td, lastActive) - 1;
  if (gap <= 0) return;
  let shieldsUsed = 0;
  for (let i = 0; i < gap && state.stats.shields > 0; i++) {
    const missedDate = addDaysToDateStr(lastActive, i + 1);
    state.stats.reviewsByDate[missedDate] = state.stats.reviewsByDate[missedDate] || 0;
    state.stats.reviewsByDate[missedDate + '_shielded'] = 1;
    state.stats.shields--;
    shieldsUsed++;
  }
  if (shieldsUsed > 0) app.showToast(app.t('toast_shield_used', {count: shieldsUsed}), 2600);
}

function hasActivityOn(dateStr) {
  const { state } = app;
  return !!(state.stats.reviewsByDate[dateStr] || state.stats.reviewsByDate[dateStr + '_shielded']);
}

function updateStreak() {
  const { state } = app;
  const td = today();
  if (!hasActivityOn(td)) {
    const yest = addDaysToDateStr(td, -1);
    if (!hasActivityOn(yest)) { state.stats.streak = 0; state.stats.currentStreak = 0; return; }
  }
  // Kaynak doğruluk: seriyi bugünden geriye yürüyerek YENİDEN HESAPLA.
  // Maliyet O(seri uzunluğu) ve oturum başına yalnızca bir kez (review kaydında)
  // çalışır → pratikte negligible. Kasıtlı olarak blueprint'in "O(1) artımlı sayaç"
  // yaklaşımı tercih EDİLMEDİ: bu motor, kalkanla korunan günleri (_shielded
  // işaretçileri) seri içinde sayar ve buluttan gelen / saati değişen state'lerde
  // KENDİ KENDİNİ ONARIR. Elle tutulan bir sayaç bu işaretçilerle senkron kalamaz.
  // Kalıcı alanlar (currentStreak/longestStreak/lastStudyDate) aynı kaynaktan türetilir.
  let streak = 0;
  let cursorEpoch = dateStrToEpochDay(td);
  while (hasActivityOn(epochDayToDateStr(cursorEpoch))) { streak++; cursorEpoch--; }
  state.stats.streak = streak;
  state.stats.currentStreak = streak;
  if (streak > (state.stats.longestStreak || 0)) state.stats.longestStreak = streak;
  if (state.stats.reviewsByDate[td] > 0) state.stats.lastStudyDate = td;
}

function awardWeeklyShieldIfEarned() {
  const { state } = app;
  const td = today();
  const curWeekStart = weekStartOf(td);
  const lastAwardedWeek = state.stats.lastShieldWeekStart;
  if (lastAwardedWeek === curWeekStart) return;
  if (lastAwardedWeek === null) { state.stats.lastShieldWeekStart = curWeekStart; return; }
  let weekCursor = lastAwardedWeek;
  while (dateStrDiffDays(curWeekStart, weekCursor) > 0) {
    const allSevenDays = Array.from({ length: 7 }, (_, i) => addDaysToDateStr(weekCursor, i));
    if (allSevenDays.every(d => hasActivityOn(d))) {
      state.stats.shields++;
      app.showToast(app.t('toast_shield_earned'), 2600);
    }
    weekCursor = addDaysToDateStr(weekCursor, 7);
  }
  state.stats.lastShieldWeekStart = curWeekStart;
}

// ─── SESSION TIMER ───────────────────────────────────────────────────
let _sessionTimerInterval = null;
let _sessionLastTick = 0;

export function startSessionTimer() {
  stopSessionTimer();
  _sessionLastTick = nowMs();
  _sessionTimerInterval = setInterval(() => {
    const now = nowMs();
    const elapsed = now - _sessionLastTick;
    _sessionLastTick = now;
    const { state } = app;
    const td = today();
    if (!state.stats.dailyStats) state.stats.dailyStats = {};
    if (!state.stats.dailyStats[td]) state.stats.dailyStats[td] = { cardsStudied: 0, timeSpentMs: 0, decksStudied: [] };
    state.stats.dailyStats[td].timeSpentMs += elapsed;
  }, 1000);
}

export function stopSessionTimer() {
  if (_sessionTimerInterval) {
    clearInterval(_sessionTimerInterval);
    _sessionTimerInterval = null;
  }
}

function getDailyStats() {
  const { state } = app;
  const td = today();
  const ds = state.stats.dailyStats && state.stats.dailyStats[td];
  return {
    cardsStudied: ds ? ds.cardsStudied : 0,
    timeSpentMs: ds ? ds.timeSpentMs : 0,
  };
}

// ─── GLOBAL STATS ────────────────────────────────────────────────────
export function globalStats() {
  const { state } = app;
  let total = 0, mastered = 0;
  const td = today();
  for (const deck of state.decks) {
    for (const card of deck.cards) { total++; if (card.srs.mastered) mastered++; }
  }
  return { total, mastered, todayCount: state.stats.reviewsByDate[td] || 0, streak: state.stats.streak || 0 };
}

export function deckStats(deck) {
  const now = nowMs();
  let newC = 0, learning = 0, due = 0, mastered = 0;
  for (const c of deck.cards) {
    if (c.srs.mastered) mastered++;
    else if (c.srs.state === 'new') newC++;
    else if (c.srs.state === 'learning') learning++;
    if (c.srs.state !== 'new' && c.srs.due <= now) due++;
  }
  return { newC, learning, due, mastered, total: deck.cards.length };
}

export function aggregateDeckStats(deckId) {
  const allCards = app.getAllCardsForDeck(deckId);
  const now = nowMs();
  let newC = 0, learning = 0, due = 0, mastered = 0;
  for (const c of allCards) {
    if (c.srs.mastered) mastered++;
    else if (c.srs.state === 'new') newC++;
    else if (c.srs.state === 'learning') learning++;
    if (c.srs.state !== 'new' && c.srs.due <= now) due++;
  }
  return { newC, learning, due, mastered, total: allCards.length };
}

function flameLevel(streak) {
  if (streak >= 100) return 'lvl-blaze';
  if (streak >= 30) return 'lvl-hot';
  if (streak >= 7) return 'lvl-warm';
  return 'lvl-cold';
}

// ─── RENDER ──────────────────────────────────────────────────────────
export function renderGlobalStats() {
  const s = globalStats();
  const ds = getDailyStats();
  document.getElementById('global-stats').innerHTML = `
    <div class="stat-box"><div class="stat-num">${s.total}</div><div class="stat-lbl">${app.t('total_cards')}</div></div>
    <div class="stat-box"><div class="stat-num" style="color:var(--jade)">${s.mastered}</div><div class="stat-lbl">${app.t('mastered_label')}</div></div>
    <div class="stat-box"><div class="stat-num" style="color:var(--hanko)">${s.todayCount}</div><div class="stat-lbl">${app.t('today_label')}</div></div>
    <div class="stat-box"><div class="stat-num" style="color:var(--sky)">${ds.cardsStudied}</div><div class="stat-lbl">${app.t('daily_cards_studied')}</div></div>
  `;
  renderStreakCard();
  renderForecastChart();
}

// ─── 7-DAY REVIEW FORECAST ───────────────────────────────────────────
// FSRS motorunun `srs.due` zaman damgalarını okuyup önümüzdeki `days` günde
// vadesi gelen kart sayısını gün gün gruplar. Tüm tarih sistemi (today/
// dateStrToEpochDay) UTC gün sınırını kullandığından, due ms'i de UTC epoch
// gününe çevrilir (Math.floor(due/86400000)) → tutarlı kovalama.
// - 'new' kartlar dışlanır: henüz programlanmadıklarından (due=0) hepsi bugüne
//   düşüp grafiği şişirirdi; deckStats'taki "due" tanımıyla (state !== 'new') uyumlu.
// - Gecikmiş kart (due bugünden önce) bugüne (index 0) sayılır.
// - Pencere dışına (>= days) düşen kartlar yok sayılır.
export function getForecastData(days = 7) {
  const { state } = app;
  const labels = app.t('weekdays_short').split(','); // Mon=0 .. Sun=6
  const todayEpoch = dateStrToEpochDay(today());
  const data = [];
  for (let i = 0; i < days; i++) {
    const epoch = todayEpoch + i;
    const dow = ((epoch % 7) + 10) % 7; // epoch-gün → Pzt=0 indeks
    data.push({ dateStr: epochDayToDateStr(epoch), count: 0, label: labels[dow] || '' });
  }
  for (const deck of state.decks) {
    for (const card of deck.cards) {
      const srs = card.srs;
      if (!srs || srs.state === 'new' || !srs.due) continue; // programlanmamış kartları atla
      let idx = Math.floor(srs.due / 86400000) - todayEpoch;
      if (idx < 0) idx = 0;          // gecikmiş → bugün
      if (idx >= days) continue;     // pencere dışı → yok say
      data[idx].count++;
    }
  }
  return data;
}

// #forecast-chart-container içine 7 dikey çubuk basar. Çubuk yüksekliği
// (count / maxCount) * 100% — maxCount === 0 iken güvenli (tüm yükseklikler 0).
export function renderForecastChart() {
  const container = document.getElementById('forecast-chart-container');
  if (!container) return;
  const td = today();
  const data = getForecastData(7);
  const maxCount = data.reduce((m, d) => Math.max(m, d.count), 0);
  const barsHTML = data.map(d => {
    const heightPct = maxCount > 0 ? (d.count / maxCount) * 100 : 0;
    const isToday = d.dateStr === td;
    return `<div class="forecast-col">
      <div class="forecast-bar-track">
        <div class="forecast-count">${d.count}</div>
        <div class="forecast-bar${d.count === 0 ? ' is-empty' : ''}" style="height:${heightPct}%" title="${esc(d.dateStr)}"></div>
      </div>
      <div class="forecast-label${isToday ? ' is-today' : ''}">${esc(d.label)}</div>
    </div>`;
  }).join('');
  container.innerHTML = `
    <div class="forecast-title">${app.t('forecast_title')}</div>
    <div class="forecast-chart">${barsHTML}</div>
  `;
}

export function renderStreakCard() {
  const { state } = app;
  const card = document.getElementById('streak-card');
  if (!card) return;
  const streak = state.stats.streak || 0;
  const shields = state.stats.shields || 0;
  const lvl = flameLevel(streak);
  const td = today();
  const days = Array.from({ length: 7 }, (_, i) => addDaysToDateStr(td, i - 6));
  const dayLabels = app.t('weekdays_short').split(',');
  const dotsHTML = days.map(d => {
    const dow = ((dateStrToEpochDay(d) % 7) + 10) % 7;
    const active = !!state.stats.reviewsByDate[d];
    const shielded = !active && !!state.stats.reviewsByDate[d + '_shielded'];
    const isToday = d === td;
    const dotCls = ['streak-day-dot'];
    if (active) dotCls.push('is-active');
    else if (shielded) dotCls.push('is-shielded');
    return `<span class="streak-day${isToday ? ' is-today' : ''}">
      <span class="streak-day-label">${dayLabels[dow]}</span>
      <span class="${dotCls.join(' ')}"></span>
    </span>`;
  }).join('');
  card.innerHTML = `
    <div class="streak-flame ${lvl}">${app.icon('flame')}</div>
    <div class="streak-info">
      <div class="streak-count">${streak}<span class="unit">${app.t('day_unit')}</span></div>
      <div class="streak-sub">${app.icon('shield')} ${app.t('shields_have', {count: shields})}</div>
    </div>
    <div class="streak-week-grid">${dotsHTML}</div>
  `;
}

// ─── STREAK SCREEN + CALENDAR ────────────────────────────────────────
let calendarViewMonth = null;
let selectedCalDay = null; // takvimde tıklanan gün (YYYY-MM-DD) → detay paneli

export function renderStreakScreen() {
  if (!calendarViewMonth) calendarViewMonth = today().slice(0, 7);
  const screen = document.getElementById('streak-screen');
  if (!screen) return;
  const { state } = app;
  const streak = state.stats.streak || 0;
  const shields = state.stats.shields || 0;
  const lvl = flameLevel(streak);
  const milestoneText = streak >= 100 ? app.t('streak_msg_blaze')
    : streak >= 30 ? app.t('streak_msg_hot')
    : streak >= 7 ? app.t('streak_msg_warm')
    : app.t('streak_msg_cold');
  screen.innerHTML = `
    <div class="card streak-detail-head">
      <div class="streak-detail-flame ${lvl}">${app.icon('flame')}</div>
      <div>
        <div class="streak-detail-count">${app.t('streak_days', {count: streak})}</div>
        <div class="streak-detail-label">${esc(milestoneText)}</div>
      </div>
    </div>
    <div class="card shield-row">
      <div class="shield-icon">${app.icon('shield')}</div>
      <div class="shield-text"><span class="shield-count">${shields}</span> ${app.t('shield_text')}</div>
    </div>
    <div class="card" id="cal-container"></div>
  `;
  renderCalendarGrid();
}

export function changeCalendarMonth(delta) {
  const [y, m] = calendarViewMonth.split('-').map(Number);
  const d = new Date(Date.UTC(y, m - 1 + delta, 1));
  calendarViewMonth = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
  selectedCalDay = null; // ay değişince seçili gün detayını kapat
  renderCalendarGrid();
}

// Tıklanan günü seç/seçimi kaldır (aynı güne tekrar tıklayınca toggle kapanır).
export function selectCalendarDay(dateStr) {
  selectedCalDay = (selectedCalDay === dateStr) ? null : dateStr;
  renderCalendarGrid();
}

// Seçili gün için "29 June 2026" biçiminde okunabilir tarih (çevrili ay adı).
function formatCalDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const monthNames = app.t('months').split(',');
  return `${d} ${monthNames[m - 1] || ''} ${y}`;
}

// Seçili güne ait kart/süre/deste özetini (#calendar-day-details içeriği) üretir.
// dailyStats yoksa (eski/senkron gün) reviewsByDate sayısına düşer; hiç veri yoksa
// "etkinlik yok" mesajı gösterir. Deste adları kullanıcı girdisi → esc edilir.
function renderDayDetails() {
  if (!selectedCalDay) return '';
  const { state } = app;
  const dateStr = selectedCalDay;
  const ds = state.stats.dailyStats && state.stats.dailyStats[dateStr];
  const reviewCount = state.stats.reviewsByDate[dateStr] || 0;
  const cards = ds ? ds.cardsStudied : reviewCount;
  const mins = ds ? Math.floor((ds.timeSpentMs || 0) / 60000) : 0;
  const decks = ds && Array.isArray(ds.decksStudied) ? ds.decksStudied : [];
  let body;
  if (!cards && !mins && !decks.length) {
    body = `<div class="cal-detail-empty">${app.t('cal_no_activity')}</div>`;
  } else {
    const decksStr = decks.length ? esc(decks.join(', ')) : '—';
    body = `
      <div class="cal-detail-row">${app.t('cal_cards_studied', { count: cards })}</div>
      <div class="cal-detail-row">${app.t('cal_time_spent', { count: mins })}</div>
      <div class="cal-detail-row">${app.t('cal_decks_studied', { decks: decksStr })}</div>
    `;
  }
  return `<div class="cal-day-details">
    <div class="cal-detail-date">${esc(formatCalDate(dateStr))}</div>
    ${body}
  </div>`;
}

function renderCalendarGrid() {
  const container = document.getElementById('cal-container');
  if (!container) return;
  const { state } = app;
  const [y, m] = calendarViewMonth.split('-').map(Number);
  const monthNames = app.t('months').split(',');
  const firstOfMonth = `${y}-${String(m).padStart(2,'0')}-01`;
  const firstDow = ((dateStrToEpochDay(firstOfMonth) % 7) + 10) % 7;
  const daysInMonth = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const td = today();
  let cellsHTML = '';
  for (let i = 0; i < firstDow; i++) cellsHTML += `<div class="cal-day is-empty"></div>`;
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${y}-${String(m).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    const active = !!state.stats.reviewsByDate[dateStr];
    const shielded = !active && !!state.stats.reviewsByDate[dateStr + '_shielded'];
    const isToday = dateStr === td;
    const hasData = active || shielded; // yalnızca veri olan günler tıklanabilir
    const cls = ['cal-day'];
    if (active) cls.push('is-active');
    else if (shielded) cls.push('is-shielded');
    if (isToday) cls.push('is-today');
    if (hasData) cls.push('is-clickable');
    if (dateStr === selectedCalDay) cls.push('is-selected');
    const attrs = hasData ? ` onclick="selectCalendarDay('${dateStr}')" role="button" tabindex="0"` : '';
    cellsHTML += `<div class="${cls.join(' ')}"${attrs}>${day}</div>`;
  }
  container.innerHTML = `
    <div class="cal-nav">
      <button class="icon-btn tap" onclick="changeCalendarMonth(-1)" aria-label="${app.t('prev_month')}">${app.icon('chevL')}</button>
      <span class="cal-nav-title">${monthNames[m-1]} ${y}</span>
      <button class="icon-btn tap" onclick="changeCalendarMonth(1)" aria-label="${app.t('next_month')}">${app.icon('chevR')}</button>
    </div>
    <div class="cal-grid">
      ${app.t('weekdays_cal').split(',').map(d => `<div class="cal-weekday">${d}</div>`).join('')}
      ${cellsHTML}
    </div>
    <div class="cal-legend">
      <span class="cal-legend-item"><span class="cal-legend-dot" style="background:var(--hanko)"></span>${app.t('legend_studied')}</span>
      <span class="cal-legend-item"><span class="cal-legend-dot" style="background:var(--sky)"></span>${app.t('legend_shielded')}</span>
    </div>
    <div id="calendar-day-details">${renderDayDetails()}</div>
  `;
}
