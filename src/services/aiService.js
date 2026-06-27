const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

const SYSTEM_PROMPT = `Act as a creative memory coach for Japanese language learners. When given a Kanji character with its meaning and reading, return a short, memorable mnemonic story (max 3 sentences) that links the Kanji's visual elements or radicals, its reading (pronunciation), and its meaning. Be vivid and imaginative — the stranger the image, the better it sticks.`;

export async function generateMnemonic(kanji, meaning, reading, apiKey, model) {
  if (!apiKey) throw new Error('API key is required');

  const userPrompt = `Kanji: ${kanji}\nMeaning: ${meaning}\nReading: ${reading}\n\nCreate a mnemonic story for this kanji.`;

  const url = `${GEMINI_API_BASE}/${model}:generateContent?key=${apiKey}`;

  const body = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
    generationConfig: {
      temperature: 0.9,
      maxOutputTokens: 256,
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
  if (!text) throw new Error('Empty response from AI model');
  return text.trim();
}
