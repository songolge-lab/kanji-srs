import { esc } from '../utils.js';

let app;
export function init(ctx) { app = ctx; }

export function render() {
  const el = document.getElementById('test-results-content');
  if (!el) return;

  const results = app.lastTestResults;
  if (!results) {
    el.innerHTML = `<div class="empty"><p>No results</p></div>`;
    return;
  }

  const { testTitle, score, total, answers } = results;
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const perfect = score === total;

  const answersHTML = answers.map((a, i) => {
    const statusCls = a.isCorrect ? 'tr-correct' : 'tr-wrong';
    const statusIcon = a.isCorrect ? app.icon('check') : app.icon('close');
    return `
    <div class="card tr-answer-item ${statusCls}">
      <div class="tr-answer-head">
        <span class="tr-answer-num">${i + 1}.</span>
        <span class="tr-answer-prompt">${esc(a.prompt)}</span>
        <span class="tr-answer-icon">${statusIcon}</span>
      </div>
      <div class="tr-answer-detail">
        <div><span class="tr-label">${app.t('test_your_answer')}:</span> ${esc(a.userAnswer)}</div>
        ${!a.isCorrect ? `<div><span class="tr-label">${app.t('correct_answer')}:</span> ${esc(a.correctValue)}</div>` : ''}
      </div>
    </div>`;
  }).join('');

  el.innerHTML = `
    <div class="card tr-score-card">
      <div class="tr-score-icon">${perfect ? app.icon('done', 'ic-lg') : app.icon('check', 'ic-lg')}</div>
      <div class="tr-score-title">${esc(testTitle)}</div>
      <div class="tr-score-text">${app.t('test_score', { score, total })}</div>
      <div class="tr-score-pct">${pct}%</div>
    </div>
    <div class="section-hd">${app.t('test_answers_section')}</div>
    ${answersHTML}
    <button class="btn btn-block btn-primary tap" style="margin-top:1rem" onclick="showView('tests')">
      ${app.icon('back')} ${app.t('test_return_manager')}
    </button>`;
}
