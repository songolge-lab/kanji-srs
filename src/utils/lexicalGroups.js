// Join a nominal derivational suffix to its immediately preceding noun.
// Keep all other Kuromoji boundaries, including adjacent independent nouns.
export function groupLexicalTokens(tokens) {
  const groups = [];
  for (const token of tokens || []) {
    const previous = groups.at(-1);
    const base = previous?.[0];
    const last = previous?.at(-1);
    const adjacent = Number.isFinite(last?.word_position) && Number.isFinite(token.word_position)
      && last.word_position + last.surface_form.length === token.word_position;
    const nounBase = base?.pos === '名詞'
      && ['一般', 'サ変接続', '固有名詞', '形容動詞語幹'].includes(base.pos_detail_1)
      && /[一-龯㐀-䶿]/.test(base.surface_form);
    const nominalSuffix = token.pos === '名詞' && token.pos_detail_1 === '接尾'
      && ['サ変接続', '一般', '形容動詞語幹'].includes(token.pos_detail_2)
      && /[一-龯㐀-䶿]/.test(token.surface_form);
    if (adjacent && nounBase && nominalSuffix) previous.push(token);
    else groups.push([token]);
  }
  return groups;
}
