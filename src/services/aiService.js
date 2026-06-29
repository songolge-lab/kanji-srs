const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
const FALLBACK_MODEL = 'gemini-1.5-flash-8b';
const RETRY_DELAY_MS = 1500;

// ─── RETRY / FALLBACK INTERNALS ──────────────────────────────────────

/** Returns true when the error payload indicates a transient capacity issue. */
function isRetryableError(status, errorBody) {
  if (status === 503 || status === 429) return true;
  const msg = (errorBody?.error?.message || '').toLowerCase();
  return /high demand|quota|rate.?limit|overloaded|resource.?exhausted/.test(msg);
}

/**
 * Wrapper around fetch→Gemini that retries once on transient errors.
 *
 * Attempt 1 – uses the caller's `model`.
 * If that fails with a retryable error, waits RETRY_DELAY_MS, then
 * Attempt 2 – switches to FALLBACK_MODEL.
 * If both fail, throws a clean, user-friendly message.
 *
 * @param {string} model   – primary model id (e.g. 'gemini-2.5-flash')
 * @param {string} apiKey  – Gemini API key
 * @param {object} body    – JSON payload (system_instruction, contents, generationConfig)
 * @returns {Promise<object>} parsed JSON response from the API
 */
async function fetchWithRetry(model, apiKey, body) {
  const models = [model, FALLBACK_MODEL];

  for (let attempt = 0; attempt < models.length; attempt++) {
    const url = `${GEMINI_API_BASE}/${models[attempt]}:generateContent?key=${apiKey}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) return res.json();

    // Parse error body once
    const errBody = await res.json().catch(() => ({}));

    // Non-retryable error → throw immediately with the API message
    if (!isRetryableError(res.status, errBody)) {
      const msg = errBody?.error?.message || `HTTP ${res.status}`;
      throw new Error(msg);
    }

    // Last attempt already – fall through to the final throw below
    if (attempt === models.length - 1) break;

    // Wait before retrying with the fallback model
    await new Promise(r => setTimeout(r, RETRY_DELAY_MS));
  }

  // Both attempts exhausted with retryable errors
  throw new Error(
    'The AI servers are currently overloaded. Please try again in a few moments.'
  );
}

// Shared: UI language code → full language name. Used by both the contextual
// word definer and the thematic deck generator to force output in the learner's
// language regardless of which word/topic is requested.
const LANG_NAMES = { en: 'English', tr: 'Turkish', ko: 'Korean', mn: 'Mongolian' };

// ─── CONTEXTUAL WORD DEFINER (Jukugo Smart Word Modal) ───────────────
// Output MUST be a single line in the exact shape:
//   **<direct translation>** - <one short contextual sentence>
// The translation is wrapped in **double asterisks** so the Word Modal can
// render it bold; everything else (code fences, headings, lists) is forbidden.
const WORD_SYSTEM_PROMPT = `You are a precise bilingual Japanese dictionary for language learners. Given a Japanese word and the sentence it appears in, you reply on ONE line using EXACTLY this format:
**<direct translation>** - <one short sentence of context>
Do NOT just explain the word. You MUST provide the direct, most common translation first, wrapped in double asterisks, followed by a hyphen, then a brief contextual explanation. The text inside ** ** must be a translation (a word or short phrase), never a description. No code fences, no headings, no bullet points, no extra lines.`;

// Returns a concise, dictionary-style definition of `word` as it is used in
// `sentence`, written entirely in the learner's UI language (`targetLang`:
// en/tr/ko/mn). Used by the Word Modal opened from the back of a flashcard.
export async function defineWordContextually(word, sentence, targetLang, apiKey, model) {
  if (!apiKey) throw new Error('API key is required');
  if (!word) throw new Error('Word is required');

  const langName = LANG_NAMES[targetLang] || 'English';
  const userPrompt = `Japanese word: ${word}
Sentence it appears in: ${sentence || word}

Reply with EXACTLY this format and nothing else, written in ${langName} (language code: ${targetLang || 'en'}):
**[direct translation]** - [one short sentence explaining how it is used in this context]

Rules:
- The text inside ** ** must be the direct, most common ${langName} translation of "${word}" (a word or short phrase) — NOT a description of what it does.
- Follow it with " - " then ONE short sentence of context, also in ${langName}.
- Output nothing else: no code fences, no markdown headings, no lists, no extra lines.`;

  const body = {
    system_instruction: { parts: [{ text: WORD_SYSTEM_PROMPT }] },
    contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
    generationConfig: {
      temperature: 0.4,
      // Explicit ceiling so the API never falls back to a tiny default. Raised
      // to 500 because verbose languages (Turkish, Korean) were truncating the
      // contextual sentence mid-word at 200.
      maxOutputTokens: 500,
    },
  };

  const data = await fetchWithRetry(model || 'gemini-2.5-pro', apiKey, body);
  let text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  // Defensive fallback: empty or whitespace-only response → retryable error.
  if (!text || !text.trim()) throw new Error('Generation failed, try again');
  // Strip stray markdown fences if the model ignores instructions.
  return text.trim()
    .replace(/^```(?:\w+)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();
}

// ─── AI THEMATIC DECK GENERATOR ──────────────────────────────────────
const DECK_SYSTEM_PROMPT = `You are a Japanese language curriculum designer. You build focused study decks of Japanese vocabulary/kanji for learners. You ALWAYS reply with ONLY a raw JSON array — never markdown, never code fences, never commentary.

CRITICAL RULE for the "meaning" field: The "meaning" field MUST contain the direct translation of the specific vocabulary word ONLY (a word or short phrase). Do NOT put the translation of the example sentence into the "meaning" field. The sentence translation belongs STRICTLY in the "exampleTranslation" field. For example, if the word is "食べる", the meaning should be "to eat" — NOT "I eat sushi every day.".`;

// Returns a parsed array of card objects:
//   [{ word, furigana, meaning, exampleJp, exampleTranslation }]
// `targetLang` is the learner's UI language code (en/tr/ko/mn) — meanings &
// example translations are produced in that language.
export async function generateDeck(topic, targetLang, apiKey, model) {
  if (!apiKey) throw new Error('API key is required');
  if (!topic) throw new Error('Topic is required');

  const langName = LANG_NAMES[targetLang] || 'English';
  const userPrompt = `Generate exactly 10 Japanese study cards for the topic: "${topic}".

Reply with ONLY a raw JSON array (no markdown, no \`\`\`json fences, no extra prose) matching EXACTLY this schema:
[
  {
    "word": "the Japanese word or kanji",
    "furigana": "its reading in hiragana",
    "meaning": "the meaning written in ${langName}",
    "exampleJp": "a natural example sentence in Japanese using the word",
    "exampleTranslation": "the ${langName} translation of that example sentence"
  }
]

Rules:
- Exactly 10 objects.
- "meaning" and "exampleTranslation" MUST be written in ${langName}.
- All Japanese fields must use correct, natural Japanese.
- Output the JSON array and nothing else.`;

  const body = {
    system_instruction: { parts: [{ text: DECK_SYSTEM_PROMPT }] },
    contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2048,
      responseMimeType: 'application/json',
    },
  };

  const data = await fetchWithRetry(model || 'gemini-2.5-pro', apiKey, body);
  let text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Empty response from AI model');

  // Strip markdown code fences if the model wraps the JSON despite instructions.
  text = text.trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  let cards;
  try {
    cards = JSON.parse(text);
  } catch {
    // Last-resort salvage: grab the first [...] block in the text.
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) throw new Error('AI returned malformed JSON');
    cards = JSON.parse(match[0]);
  }

  if (!Array.isArray(cards) || !cards.length) throw new Error('AI returned no cards');
  return cards;
}
