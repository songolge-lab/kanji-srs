import { esc, uid, processImageToBase64 } from '../utils.js';
import { addCustomTest, updateCustomTest } from '../store/appState.js';

let app;
export function init(ctx) { app = ctx; }

let editingTestId = null;
let questions = [];

function emptyQuestion() {
  return { id: uid(), type: 'MULTIPLE_CHOICE', prompt: '', image: null, options: ['', ''], correctValue: '' };
}

export function render(testId) {
  editingTestId = testId || null;
  const el = document.getElementById('test-editor-content');
  if (!el) return;

  let title = '';
  questions = [];

  if (editingTestId) {
    const existing = (app.state.customTests || []).find(ct => ct.id === editingTestId);
    if (existing) {
      title = existing.title || '';
      questions = (existing.questions || []).map(q => ({ ...q, options: [...(q.options || [])] }));
    }
  }
  if (!questions.length) questions.push(emptyQuestion());

  el.innerHTML = `
    <div class="card">
      <div class="form-group">
        <label>${app.t('test_title_label')}</label>
        <input type="text" id="te-title" value="${esc(title)}" placeholder="${esc(app.t('test_title_placeholder'))}">
      </div>
    </div>
    <div class="section-hd">${app.t('questions_section')}</div>
    <div id="te-questions"></div>
    <button class="btn btn-ghost btn-block tap" style="margin:1rem 0" onclick="teAddQuestion()">
      ${app.icon('plus')} ${app.t('add_question')}
    </button>
    <div style="display:flex;gap:.5rem">
      <button class="btn btn-ghost tap" style="flex:1" onclick="teCancelEditor()">${app.t('cancel')}</button>
      <button class="btn btn-primary tap" style="flex:2" onclick="teSaveTest()">${app.t('save')}</button>
    </div>`;

  renderQuestions();
}

function renderQuestions() {
  const wrap = document.getElementById('te-questions');
  if (!wrap) return;
  wrap.innerHTML = questions.map((q, qi) => questionBlockHTML(q, qi)).join('');
  questions.forEach((q, qi) => attachQuestionListeners(qi));
}

function questionBlockHTML(q, qi) {
  const typeOptions = ['MULTIPLE_CHOICE', 'TRUE_FALSE', 'FILL_BLANK']
    .map(v => `<option value="${v}" ${q.type === v ? 'selected' : ''}>${app.t('qtype_' + v.toLowerCase())}</option>`)
    .join('');

  let optionsHTML = '';
  if (q.type === 'MULTIPLE_CHOICE') {
    optionsHTML = `<label>${app.t('options_label')}</label>` +
      (q.options || []).map((opt, oi) => `
        <div class="te-option-row">
          <input type="radio" name="correct-${qi}" value="${oi}" ${q.correctValue === opt && opt !== '' ? 'checked' : ''} data-qi="${qi}" data-oi="${oi}" class="te-correct-radio">
          <input type="text" class="te-option-input" value="${esc(opt)}" data-qi="${qi}" data-oi="${oi}" placeholder="${app.t('option_placeholder', { n: oi + 1 })}">
          ${(q.options || []).length > 2 ? `<button class="icon-btn tap te-remove-opt" data-qi="${qi}" data-oi="${oi}">${app.icon('close')}</button>` : ''}
        </div>`).join('') +
      `<button class="btn btn-ghost btn-sm tap" style="margin-top:.4rem" data-qi="${qi}" onclick="teAddOption(${qi})">
        ${app.icon('plus')} ${app.t('add_option')}
      </button>`;
  } else if (q.type === 'TRUE_FALSE') {
    optionsHTML = `<label>${app.t('correct_answer')}</label>
      <div class="te-option-row">
        <label style="display:inline-flex;align-items:center;gap:.4rem;margin-bottom:0">
          <input type="radio" name="tf-${qi}" value="true" ${q.correctValue === 'true' ? 'checked' : ''} class="te-tf-radio" data-qi="${qi}"> ${app.t('true_label')}
        </label>
        <label style="display:inline-flex;align-items:center;gap:.4rem;margin-bottom:0">
          <input type="radio" name="tf-${qi}" value="false" ${q.correctValue === 'false' ? 'checked' : ''} class="te-tf-radio" data-qi="${qi}"> ${app.t('false_label')}
        </label>
      </div>`;
  } else {
    optionsHTML = `<div class="form-group">
        <label>${app.t('correct_answer')}</label>
        <input type="text" class="te-fill-answer" value="${esc(q.correctValue || '')}" data-qi="${qi}" placeholder="${esc(app.t('fill_answer_placeholder'))}">
      </div>`;
  }

  const imgPreview = q.image
    ? `<div class="te-img-preview"><img src="${q.image}" alt=""><button class="btn btn-ghost btn-sm tap te-remove-img" data-qi="${qi}">${app.icon('close')} ${app.t('remove_image')}</button></div>`
    : '';

  return `
    <div class="card te-question-block" data-qi="${qi}">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.5rem">
        <span style="font-weight:700;font-size:.85rem">${app.t('question_n', { n: qi + 1 })}</span>
        ${questions.length > 1 ? `<button class="icon-btn tap" onclick="teRemoveQuestion(${qi})" style="width:36px;height:36px;box-shadow:none">${app.icon('trash')}</button>` : ''}
      </div>
      <div class="form-group">
        <label>${app.t('question_type')}</label>
        <select class="te-type-select" data-qi="${qi}">${typeOptions}</select>
      </div>
      <div class="form-group">
        <label>${app.t('question_prompt')}</label>
        <input type="text" class="te-prompt-input" value="${esc(q.prompt)}" data-qi="${qi}" placeholder="${esc(app.t('prompt_placeholder'))}">
      </div>
      <div class="form-group">
        <label>${app.t('question_image')}</label>
        <input type="file" accept="image/*" class="te-image-input" data-qi="${qi}">
        ${imgPreview}
      </div>
      <div class="te-options-area" data-qi="${qi}">${optionsHTML}</div>
    </div>`;
}

function attachQuestionListeners(qi) {
  const block = document.querySelector(`.te-question-block[data-qi="${qi}"]`);
  if (!block) return;

  block.querySelector('.te-type-select')?.addEventListener('change', (e) => {
    questions[qi].type = e.target.value;
    if (e.target.value === 'TRUE_FALSE') {
      questions[qi].options = ['true', 'false'];
      questions[qi].correctValue = 'true';
    } else if (e.target.value === 'FILL_BLANK') {
      questions[qi].options = [];
      questions[qi].correctValue = '';
    } else {
      questions[qi].options = ['', ''];
      questions[qi].correctValue = '';
    }
    renderQuestions();
  });

  block.querySelector('.te-prompt-input')?.addEventListener('input', (e) => {
    questions[qi].prompt = e.target.value;
  });

  block.querySelector('.te-image-input')?.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      questions[qi].image = await processImageToBase64(file, 800);
      renderQuestions();
    } catch { app.showToast(app.t('warn_error', { msg: 'Image processing failed' })); }
  });

  block.querySelector('.te-remove-img')?.addEventListener('click', () => {
    questions[qi].image = null;
    renderQuestions();
  });

  block.querySelectorAll('.te-option-input').forEach(inp => {
    inp.addEventListener('input', (e) => {
      const oi = parseInt(e.target.dataset.oi);
      questions[qi].options[oi] = e.target.value;
    });
  });

  block.querySelectorAll('.te-correct-radio').forEach(radio => {
    radio.addEventListener('change', (e) => {
      const oi = parseInt(e.target.dataset.oi);
      questions[qi].correctValue = questions[qi].options[oi];
    });
  });

  block.querySelectorAll('.te-tf-radio').forEach(radio => {
    radio.addEventListener('change', (e) => {
      questions[qi].correctValue = e.target.value;
    });
  });

  block.querySelector('.te-fill-answer')?.addEventListener('input', (e) => {
    questions[qi].correctValue = e.target.value;
  });

  block.querySelectorAll('.te-remove-opt').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const oi = parseInt(e.currentTarget.dataset.oi);
      questions[qi].options.splice(oi, 1);
      if (questions[qi].correctValue && !questions[qi].options.includes(questions[qi].correctValue)) {
        questions[qi].correctValue = '';
      }
      renderQuestions();
    });
  });
}

export function addOption(qi) {
  if (questions[qi]) {
    questions[qi].options.push('');
    renderQuestions();
  }
}

export function addQuestion() {
  questions.push(emptyQuestion());
  renderQuestions();
  const blocks = document.querySelectorAll('.te-question-block');
  if (blocks.length) blocks[blocks.length - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
}

export function removeQuestion(qi) {
  if (questions.length <= 1) return;
  questions.splice(qi, 1);
  renderQuestions();
}

export function saveTest() {
  const titleInput = document.getElementById('te-title');
  const title = (titleInput?.value || '').trim();
  if (!title) { app.showToast(app.t('warn_name_empty')); return; }

  const cleanedQuestions = questions.map(q => ({
    id: q.id,
    type: q.type,
    prompt: q.prompt.trim(),
    image: q.image || null,
    options: q.type === 'MULTIPLE_CHOICE' ? q.options.filter(o => o.trim()) : (q.type === 'TRUE_FALSE' ? ['true', 'false'] : []),
    correctValue: q.correctValue,
  }));

  if (editingTestId) {
    updateCustomTest(app.state, editingTestId, { title, questions: cleanedQuestions });
    app.showToast(app.t('toast_test_updated'));
  } else {
    addCustomTest(app.state, { id: uid(), title, questions: cleanedQuestions });
    app.showToast(app.t('toast_test_created'));
  }
  app.save();
  app.showView('tests');
}

export function cancelEditor() {
  app.showView('tests');
}
