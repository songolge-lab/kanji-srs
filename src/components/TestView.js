import { esc } from '../utils.js';

let app;
let session = null;

export function init(ctx) { app = ctx; }

export function render(testId) {
  const el = document.getElementById('test-play-content');
  if (!el) return;

  const test = (app.state.customTests || []).find(ct => ct.id === testId);
  if (!test || !test.questions.length) {
    el.innerHTML = `<div class="empty"><p>${app.t('test_no_questions')}</p>
      <button class="btn btn-primary tap" onclick="showView('tests')">${app.icon('back')} ${app.t('back')}</button></div>`;
    return;
  }

  session = {
    test,
    currentIndex: 0,
    score: 0,
    userAnswers: [],
    answered: false,
  };

  renderQuestion();
}

function renderQuestion() {
  const el = document.getElementById('test-play-content');
  if (!el || !session) return;

  const { test, currentIndex } = session;
  const q = test.questions[currentIndex];
  const total = test.questions.length;
  const progress = ((currentIndex) / total) * 100;

  let inputHTML = '';
  if (q.type === 'MULTIPLE_CHOICE') {
    inputHTML = `<div class="tv-options">` +
      (q.options || []).map((opt, i) =>
        `<button class="btn tv-option tap" data-idx="${i}" onclick="tvSelectOption(${i})">${esc(opt)}</button>`
      ).join('') + `</div>`;
  } else if (q.type === 'TRUE_FALSE') {
    inputHTML = `<div class="tv-options tv-tf">
      <button class="btn tv-option tap" data-val="true" onclick="tvSelectTF('true')">${app.t('true_label')}</button>
      <button class="btn tv-option tap" data-val="false" onclick="tvSelectTF('false')">${app.t('false_label')}</button>
    </div>`;
  } else {
    inputHTML = `<div class="tv-fill-wrap">
      <input type="text" id="tv-fill-input" class="tv-fill-input" placeholder="${esc(app.t('fill_answer_placeholder'))}" autocomplete="off">
      <button class="btn btn-primary tap" onclick="tvSubmitFill()">${app.t('test_submit')}</button>
    </div>`;
  }

  const imageHTML = q.image ? `<img class="tv-image" src="${q.image}" alt="">` : '';

  el.innerHTML = `
    <div class="card tv-header">
      <div class="tv-title">${esc(test.title)}</div>
      <div class="tv-progress-text">${app.t('test_question_of', { current: currentIndex + 1, total })}</div>
      <div class="study-progress"><div class="study-progress-fill" style="width:${progress}%"></div></div>
    </div>
    <div class="card tv-question-card">
      ${imageHTML}
      <div class="tv-prompt">${esc(q.prompt)}</div>
      ${inputHTML}
    </div>`;

  session.answered = false;

  if (q.type === 'FILL_BLANK') {
    const inp = document.getElementById('tv-fill-input');
    if (inp) {
      inp.focus();
      inp.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') submitFill();
      });
    }
  }
}

function handleAnswer(userAnswer) {
  if (!session || session.answered) return;
  session.answered = true;

  const q = session.test.questions[session.currentIndex];
  const isCorrect = userAnswer.trim().toLowerCase() === (q.correctValue || '').trim().toLowerCase();

  if (isCorrect) session.score++;

  session.userAnswers.push({
    prompt: q.prompt,
    userAnswer,
    correctValue: q.correctValue,
    isCorrect,
    type: q.type,
  });

  showFeedback(userAnswer, isCorrect);

  setTimeout(() => {
    session.currentIndex++;
    if (session.currentIndex < session.test.questions.length) {
      renderQuestion();
    } else {
      finishTest();
    }
  }, 1000);
}

function showFeedback(userAnswer, isCorrect) {
  const q = session.test.questions[session.currentIndex];

  if (q.type === 'MULTIPLE_CHOICE') {
    document.querySelectorAll('.tv-option').forEach(btn => {
      const idx = parseInt(btn.dataset.idx);
      const opt = (q.options || [])[idx];
      btn.disabled = true;
      if (opt === q.correctValue) btn.classList.add('correct');
      if (opt === userAnswer && !isCorrect) btn.classList.add('wrong');
    });
  } else if (q.type === 'TRUE_FALSE') {
    document.querySelectorAll('.tv-option').forEach(btn => {
      btn.disabled = true;
      if (btn.dataset.val === q.correctValue) btn.classList.add('correct');
      if (btn.dataset.val === userAnswer && !isCorrect) btn.classList.add('wrong');
    });
  } else {
    const inp = document.getElementById('tv-fill-input');
    if (inp) {
      inp.disabled = true;
      inp.classList.add(isCorrect ? 'correct' : 'wrong');
    }
    if (!isCorrect) {
      const wrap = document.querySelector('.tv-fill-wrap');
      if (wrap) {
        wrap.insertAdjacentHTML('beforeend',
          `<div class="tv-correct-hint">${app.t('correct_answer')}: ${esc(q.correctValue)}</div>`);
      }
    }
  }
}

function finishTest() {
  app.lastTestResults = {
    testTitle: session.test.title,
    score: session.score,
    total: session.test.questions.length,
    answers: session.userAnswers,
  };
  app.showView('test-results');
}

export function selectOption(idx) {
  if (!session || session.answered) return;
  const q = session.test.questions[session.currentIndex];
  handleAnswer((q.options || [])[idx]);
}

export function selectTF(val) {
  if (!session || session.answered) return;
  handleAnswer(val);
}

export function submitFill() {
  if (!session || session.answered) return;
  const inp = document.getElementById('tv-fill-input');
  if (!inp) return;
  const val = inp.value.trim();
  if (!val) return;
  handleAnswer(val);
}
