const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

// Shared: UI language code → full language name. Used by both the contextual
// word definer and the thematic deck generator to force output in the learner's
// language regardless of which word/topic is requested.
const LANG_NAMES = { en: 'English', tr: 'Turkish', ko: 'Korean', mn: 'Mongolian' };

// ─── CONTEXTUAL WORD DEFINER (Jukugo Smart Word Modal) ───────────────
const WORD_SYSTEM_PROMPT = `You are a precise bilingual Japanese dictionary. You explain how a Japanese word is used in a specific sentence, writing the explanation in the learner's language. Reply with PLAIN TEXT only — never markdown, code fences, headings, or bullet points.`;

// Returns a concise, dictionary-style definition of `word` as it is used in
// `sentence`, written entirely in the learner's UI language (`targetLang`:
// en/tr/ko/mn). Used by the Word Modal opened from the back of a flashcard.
export async function defineWordContextually(word, sentence, targetLang, apiKey, model) {
  if (!apiKey) throw new Error('API key is required');
  if (!word) throw new Error('Word is required');

  const langName = LANG_NAMES[targetLang] || 'English';
  const userPrompt = `Japanese word: ${word}
Sentence it appears in: ${sentence || word}

Give a concise, highly accurate dictionary-style translation/definition of "${word}" exactly as it is used in the sentence above. Write it entirely in ${langName} (language code: ${targetLang || 'en'}). Use at most 2 sentences. Output ONLY the definition text — no markdown, no code fences, no extra commentary.`;

  const url = `${GEMINI_API_BASE}/${model || 'gemini-2.5-pro'}:generateContent?key=${apiKey}`;

  const body = {
    system_instruction: { parts: [{ text: WORD_SYSTEM_PROMPT }] },
    contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
    generationConfig: {
      temperature: 0.4,
      // Explicit ceiling so the API never falls back to a tiny default that
      // would truncate the definition mid-sentence.
      maxOutputTokens: 200,
    },
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const msg = err?.error?.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  const data = await res.json();
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
const DECK_SYSTEM_PROMPT = `You are a Japanese language curriculum designer. You build focused study decks of Japanese vocabulary/kanji for learners. You ALWAYS reply with ONLY a raw JSON array — never markdown, never code fences, never commentary.`;

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

  const url = `${GEMINI_API_BASE}/${model || 'gemini-2.5-pro'}:generateContent?key=${apiKey}`;

  const body = {
    system_instruction: { parts: [{ text: DECK_SYSTEM_PROMPT }] },
    contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2048,
      responseMimeType: 'application/json',
    },
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const msg = err?.error?.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  const data = await res.json();
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
