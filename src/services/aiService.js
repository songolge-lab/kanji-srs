const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

// Shared: UI language code → full language name. Used by both the mnemonic
// tutor and the thematic deck generator to force output in the learner's
// language regardless of which kanji/topic is requested.
const LANG_NAMES = { en: 'English', tr: 'Turkish', ko: 'Korean', mn: 'Mongolian' };

// Builds the mnemonic system prompt. `langName`/`targetLang` are injected so the
// model is hard-constrained to (1) answer in the learner's UI language, (2) focus
// on the WHOLE kanji rather than a stray radical, and (3) return a fully finished
// 2–3 sentence story (no cut-off / trailing thoughts).
function mnemonicSystemPrompt(langName, targetLang) {
  return `Act as a creative memory coach for Japanese language learners. You craft vivid, strange, memorable mnemonic stories that fuse a Kanji's visual shape, its reading (pronunciation), and its meaning so the learner never forgets it.

CRITICAL RULES — obey every one:
1. LANGUAGE: You MUST write the final mnemonic story entirely in ${langName} (language code: ${targetLang}). Narrate only in ${langName} — do not switch to English or any other language. (You may quote the Japanese reading/characters themselves, but every explanatory sentence must be in ${langName}.)
2. TARGET: Focus strictly on the EXACT Kanji character provided, treating it as a single whole. Do NOT build the story around just one isolated radical, and do NOT substitute a different or look-alike kanji.
3. LENGTH & COMPLETION: Write a complete, logically finished story in exactly 2 or 3 sentences. Do not leave trailing sentences or unfinished thoughts — end on a full stop.`;
}

// `targetLang` is the learner's UI language code (en/tr/ko/mn); the mnemonic
// story is written in that language.
export async function generateMnemonic(kanji, meaning, reading, apiKey, model, targetLang) {
  if (!apiKey) throw new Error('API key is required');

  const langName = LANG_NAMES[targetLang] || 'English';
  const systemPrompt = mnemonicSystemPrompt(langName, targetLang || 'en');
  const userPrompt = `Kanji: ${kanji}\nMeaning: ${meaning}\nReading: ${reading}\n\nWrite the mnemonic story for this exact kanji, entirely in ${langName}.`;

  const url = `${GEMINI_API_BASE}/${model}:generateContent?key=${apiKey}`;

  const body = {
    system_instruction: { parts: [{ text: systemPrompt }] },
    contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
    generationConfig: {
      temperature: 0.9,
      // Explicit safe ceiling so the API never falls back to a tiny default
      // that would truncate the story mid-sentence.
      maxOutputTokens: 250,
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
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  // Defensive fallback: empty or whitespace-only response → retryable error.
  if (!text || !text.trim()) throw new Error('Generation failed, try again');
  return text.trim();
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
