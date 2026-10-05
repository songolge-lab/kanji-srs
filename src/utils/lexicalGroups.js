import { hasKanji, codePointLength } from './japaneseText.js';

// Join a nominal derivational suffix to its immediately preceding noun.
// Keep all other Kuromoji boundaries, including adjacent independent nouns.
export function groupLexicalTokens(tokens) {
  const groups = [];
  for (const token of tokens || []) {
    const previous = groups.at(-1);
    const base = previous?.[0];
    const last = previous?.at(-1);
    const adjacent = Number.isFinite(last?.word_position) && Number.isFinite(token.word_position)
      // Kuromoji word_position is one-based and counts code points, whereas
      // DOM/source-slice offsets elsewhere deliberately count UTF-16 units.
      && last.word_position + codePointLength(last.surface_form) === token.word_position;
    const nounBase = base?.pos === '名詞'
      && ['一般', 'サ変接続', '固有名詞', '形容動詞語幹'].includes(base.pos_detail_1)
      && hasKanji(base.surface_form);
    const nominalSuffix = token.pos === '名詞' && token.pos_detail_1 === '接尾'
      && ['サ変接続', '一般', '形容動詞語幹'].includes(token.pos_detail_2)
      && hasKanji(token.surface_form);
    if (adjacent && nounBase && nominalSuffix) previous.push(token);
    else groups.push([token]);
  }
  return groups;
}
