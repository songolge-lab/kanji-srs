import { today, nowMs, addDaysToDateStr, dateStrToEpochDay, epochDayToDateStr, dateStrDiffDays, weekStartOf, esc } from '../utils.js';

let app;
export function init(ctx) { app = ctx; }

// ─── STATS HELPERS ────────────────────────────────────────────────────
export function recordReview(isNew) {
  const { state } = app;
  const td = today();
  const isFirstReviewToday = !state.stats.reviewsByDate[td];
  state.stats.reviewsByDate[td] = (state.stats.reviewsByDate[td] || 0) + 1;
  if (isNew) {
    const k = td + '_new';
    state.stats.reviewsByDate[k] = (state.stats.reviewsByDate[k] || 0) + 1;
  }
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
  document.getElementById('global-stats').innerHTML = `
    <div class="stat-box"><div class="stat-num">${s.total}</div><div class="stat-lbl">${app.t('total_cards')}</div></div>
    <div class="stat-box"><div class="stat-num" style="color:var(--jade)">${s.mastered}</div><div class="stat-lbl">${app.t('mastered_label')}</div></div>
    <div class="stat-box"><div class="stat-num" style="color:var(--hanko)">${s.todayCount}</div><div class="stat-lbl">${app.t('today_label')}</div></div>
  `;
  renderStreakCard();
  renderHeatmap();
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

// ─── GITHUB-STYLE CONTRIBUTION HEATMAP ───────────────────────────────
// Saf Vanilla JS + CSS Grid (harici kütüphane yok). 53 hafta × 7 gün penceresi.
// grid-auto-flow:column ile hücreler üstten-alta, sonra sola-sağa akar.
function heatLevel(count) {
  if (count <= 0) return 0;
  if (count <= 10) return 1;
  if (count <= 20) return 2;
  if (count <= 40) return 3;
  return 4;
}

export function renderHeatmap() {
  const host = document.getElementById('heatmap-card');
  if (!host) return; // sadece deck dashboard'unda var
  const { state } = app;
  const rbd = state.stats.reviewsByDate || {};
  const td = today();
  const thisWeekMonday = weekStartOf(td);
  const startMonday = addDaysToDateStr(thisWeekMonday, -7 * 52); // 53 sütunluk pencere
  const monthAbbr = app.t('months_short').split(',');
  const wkLabels = app.t('weekdays_short').split(',');

  let yearTotal = 0;
  let cellsHTML = '';
  let monthsHTML = '';
  let lastMonthShown = -1;

  for (let w = 0; w < 53; w++) {
    const weekMonday = addDaysToDateStr(startMonday, w * 7);
    const mNum = Number(weekMonday.slice(5, 7));
    // Ay etiketi: ayın değiştiği ilk haftada göster (son sütunlar taşmasın diye w<50).
    if (mNum !== lastMonthShown && w < 50) {
      monthsHTML += `<span class="heatmap-month">${esc(monthAbbr[mNum - 1] || '')}</span>`;
      lastMonthShown = mNum;
    } else {
      monthsHTML += `<span class="heatmap-month"></span>`;
    }
    for (let d = 0; d < 7; d++) {
      const date = addDaysToDateStr(weekMonday, d);
      if (dateStrDiffDays(date, td) > 0) { cellsHTML += `<span class="heat-cell heat-empty"></span>`; continue; }
      const count = rbd[date] || 0;
      const shielded = count === 0 && !!rbd[date + '_shielded'];
      if (count > 0) yearTotal += count;
      const cls = ['heat-cell', `heat-${heatLevel(count)}`];
      if (shielded) cls.push('heat-shielded');
      if (date === td) cls.push('is-today');
      const title = count > 0 ? app.t('heatmap_tooltip', { count, date }) : app.t('heatmap_none', { date });
      cellsHTML += `<span class="${cls.join(' ')}" title="${esc(title)}"></span>`;
    }
  }

  const longest = state.stats.longestStreak || 0;
  const legendSwatches = [0, 1, 2, 3, 4].map(l => `<span class="heat-cell heat-${l}"></span>`).join('');
  const weekdayColHTML = wkLabels.map((lbl, i) => `<span class="heatmap-wd">${i % 2 === 0 ? esc(lbl) : ''}</span>`).join('');

  host.innerHTML = `
    <div class="heatmap-head">
      <span class="heatmap-title">${app.t('heatmap_title')}</span>
      <span class="heatmap-sub">${esc(app.t('heatmap_longest', { count: longest }))}</span>
    </div>
    <div class="heatmap-scroll">
      <div class="heatmap-inner">
        <div class="heatmap-months">${monthsHTML}</div>
        <div class="heatmap-body">
          <div class="heatmap-weekdays">${weekdayColHTML}</div>
          <div class="heatmap-grid">${cellsHTML}</div>
        </div>
      </div>
    </div>
    <div class="heatmap-foot">
      <span class="heatmap-year-total">${esc(app.t('heatmap_year_total', { count: yearTotal }))}</span>
      <span class="heatmap-legend">
        <span class="heatmap-legend-lbl">${app.t('heatmap_less')}</span>
        ${legendSwatches}
        <span class="heatmap-legend-lbl">${app.t('heatmap_more')}</span>
      </span>
    </div>
  `;
}

// ─── STREAK SCREEN + CALENDAR ────────────────────────────────────────
let calendarViewMonth = null;

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
  renderCalendarGrid();
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
    const cls = ['cal-day'];
    if (active) cls.push('is-active');
    else if (shielded) cls.push('is-shielded');
    if (isToday) cls.push('is-today');
    cellsHTML += `<div class="${cls.join(' ')}">${day}</div>`;
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
  `;
}
