function pad(num, width) {
  return String(num).padStart(width, '0');
}

function stableHash(value) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function sortedByHash(values, seed) {
  return values.slice().sort((a, b) => {
    const diff = stableHash(seed + '|' + a) - stableHash(seed + '|' + b);
    return diff || (a < b ? -1 : a > b ? 1 : 0);
  });
}

function stripSentencePunctuation(value) {
  return String(value || '').trim().replace(/[.!?。！？]+$/u, '');
}

function quotedMeaning(value) {
  return `“${stripSentencePunctuation(value)}”`;
}

function takeSpread(cards, count, start = 0, step = 7) {
  if (cards.length < count) throw new Error(`Could not take ${count} unique cards from pool of ${cards.length}`);
  return cards
    .map((card, index) => ({ card, key: stableHash(`${start}|${step}|${index}|${card.id}`) }))
    .sort((a, b) => a.key - b.key || (a.card.id < b.card.id ? -1 : 1))
    .slice(0, count)
    .map(entry => entry.card);
}

function selectDistractors(sourceCard, pool, count, seed) {
  const seenValues = new Set([sourceCard.back]);
  const candidates = pool
    .filter(card => card.id !== sourceCard.id && card.back && card.back !== sourceCard.back)
    .map(card => ({ card, key: stableHash(seed + '|' + sourceCard.id + '|' + card.id + '|' + card.back) }))
    .sort((a, b) => a.key - b.key || (a.card.id < b.card.id ? -1 : 1));
  const out = [];
  for (const { card } of candidates) {
    if (out.length >= count) break;
    if (seenValues.has(card.back)) continue;
    seenValues.add(card.back);
    out.push(card.back);
  }
  if (out.length !== count) throw new Error(`Not enough distractors for ${sourceCard.id}`);
  return out;
}

function makeMcq(card, pool, qid, tags) {
  const distractors = selectDistractors(card, pool, 3, qid);
  const options = sortedByHash([card.back, ...distractors], qid);
  return {
    id: qid,
    type: 'MULTIPLE_CHOICE',
    prompt: `What does 「${card.front}」 mean?`,
    image: null,
    options,
    correctValue: card.back,
    explanation: `「${card.front}」 means ${quotedMeaning(card.back)}.`,
    sourceCardIds: [card.id],
    tags,
  };
}

function makeTf(card, falseCard, qid, isTrue, tags) {
  const claimed = isTrue ? card.back : falseCard.back;
  return {
    id: qid,
    type: 'TRUE_FALSE',
    prompt: `「${card.front}」 means ${quotedMeaning(claimed)}.`,
    image: null,
    correctValue: isTrue,
    explanation: `The correct meaning is ${quotedMeaning(card.back)}.`,
    sourceCardIds: [card.id],
    tags,
  };
}

const fillBlankLines = `
1|空が暗いです。雨が[ ]。|降りそうです
2|ニュースでは、明日は暑い[ ]。|そうです
3|田中さんは忙しい[ ]。|ようです
4|この雲は山の[ ]。|ようです
5|この店は人気がある[ ]。|みたいです
6|駅前に新しい店ができた[ ]。|らしいです
7|今日は春[ ]天気です。|らしい
8|日本語[ ]、少し分かります。|なら
9|時間が[ ]、手伝います。|あれば
10|駅に[ ]、電話します。|着いたら
11|雨が[ ]、行きます。|降っても
12|ここに[ ]いいです。|座っても
13|ここで写真を[ ]いけません。|撮っては
14|宿題を全部[ ]しまいます。|やって
15|財布を[ ]しまいました。|忘れて
16|旅行の前にホテルを[ ]おきます。|予約して
17|窓が[ ]あります。|開けて
18|新しい料理を[ ]みます。|作って
19|切符を[ ]きます。|買って
20|これからも日本語を勉強[ ]。|していきます
21|毎日早く寝る[ ]します。|ように
22|来月から自転車で通う[ ]します。|ことに
23|来週会議を開く[ ]なりました。|ことに
24|試験に合格する[ ]勉強します。|ために
25|台風の[ ]電車が止まりました。|ために
26|音楽を聞き[ ]料理します。|ながら
27|このかばんは重[ ]。|すぎます
28|このペンは書き[ ]。|やすいです
29|この漢字は覚え[ ]。|にくいです
30|駅への行き[ ]教えてください。|方を
31|来週旅行する[ ]。|予定です
32|夏休みに国へ帰る[ ]。|つもりです
33|今日は出かける[ ]ありません。|つもりは
34|午後から雨が降る[ ]。|かもしれません
35|明日は晴れる[ ]。|でしょう
36|田中さんはもう着いた[ ]。|はずです
37|この問題は難しい[ ]。|と思います
38|将来、日本で働きたい[ ]。|と思っています
39|先生は明日試験がある[ ]。|と言いました
40|母は早く帰る[ ]。|と言っていました
41|友達に写真を撮って[ ]。|もらいました
42|兄が宿題を手伝って[ ]。|くれました
43|妹に本を読んで[ ]。|あげました
44|もう少しゆっくり話して[ ]。|いただけませんか
45|駅まで迎えに来て[ ]。|くれませんか
46|先生にもう一度説明して[ ]。|ほしいです
47|ここに車を止め[ ]。|ないでください
48|明日までに書類を出さ[ ]。|なければなりません
49|今日は残業し[ ]。|なくてもいいです
50|薬を飲ま[ ]。|ないといけません
51|部屋を片付け[ ]。|なくちゃいけません
52|早く起き[ ]。|なきゃいけません
53|ここで泳い[ ]。|じゃいけません
54|名前はペンで書いて[ ]。|もかまいません
55|全部食べ[ ]。|なくてもかまいません
56|この図書館で本を借りる[ ]。|ことができます
57|私は納豆を食べ[ ]。|られます
58|弟にケーキを食べ[ ]。|られました
59|母は子どもに部屋を掃除[ ]。|させました
60|少し休ま[ ]。|せてください
61|漢字が読める[ ]なりました。|ように
62|毎日野菜を食べる[ ]しています。|ように
63|夜十時には寝る[ ]しています。|ことに
64|この建物ではタバコを吸わない[ ]なっています。|ことに
65|週末に仕事をする[ ]。|ことがあります
66|京都へ行った[ ]。|ことがあります
67|昼ご飯を食べた[ ]。|ばかりです
68|今から出かける[ ]。|ところです
69|今、資料を読んでいる[ ]。|ところです
70|会議が終わった[ ]。|ところです
71|夏休みの[ ]、アルバイトをします。|間
72|子どもが寝ている[ ]、掃除します。|間に
73|食事の[ ]手を洗います。|前に
74|仕事の[ ]買い物します。|後で
75|子どもの[ ]、よく川で泳ぎました。|時
76|雨の[ ]、試合は中止です。|場合
77|この店は安い[ ]、便利です。|し
78|休みの日は掃除したり、洗濯したり[ ]。|します
79|薬を飲んだ[ ]、まだ痛いです。|のに
80|雨が降っている[ ]、家にいます。|ので
81|時間がない[ ]、急ぎましょう。|から
82|この部屋は狭い[ ]、静かです。|けれども
83|高いです[ ]、買いたいです。|が
84|日本語を話す[ ]楽しいです。|のは
85|私は泳ぐ[ ]好きです。|のが
86|電気を消す[ ]忘れました。|のを
87|本を読む[ ]大切です。|ことは
88|「さくら」[ ]歌を知っていますか。|という
89|「無料」はお金がいらない[ ]。|という意味です
90|明日行く[ ]、まだ分かりません。|かどうか
91|誰が来る[ ]教えてください。|か
92|日本の文化[ ]勉強しています。|について
93|私[ ]家族は大切です。|にとって
94|天気予報[ ]、明日は雨です。|によると
95|インターネット[ ]情報を調べます。|によって
96|兄は医者[ ]働いています。|として
97|五時[ ]帰ってください。|までに
98|駅[ ]歩きます。|まで
99|会議は一時[ ]三時までです。|から
100|水[ ]飲みました。|だけ
101|千円[ ]ありません。|しか
102|三十分[ ]待ちました。|ほど
103|駅まで十分[ ]かかります。|ぐらい
104|今日は昨日[ ]寒いです。|より
105|バスより電車[ ]速いです。|の方が
106|季節の中で春が[ ]好きです。|一番
107|この道はあの道ほど広く[ ]。|ないです
108|練習すればする[ ]上手になります。|ほど
109|このボタンを押す[ ]、電気がつきます。|と
110|急が[ ]、電車に遅れます。|ないと
111|忘れない[ ]、メモします。|ように
112|風邪をひかない[ ]、早く寝ます。|ように
113|試験の[ ]資料を作りました。|ための
114|夢の[ ]話ですね。|ような
115|子ども[ ]言い方です。|みたいな
116|おいし[ ]ケーキですね。|そうな
117|子どもが楽し[ ]遊んでいます。|そうに
118|台所からいい匂い[ ]。|がします
119|子どもは犬を怖[ ]います。|がって
120|弟は外で遊び[ ]います。|たがって
121|将来、外国で働きたい[ ]。|と思います
122|明日先生に相談しよう[ ]。|と思います
123|電車に乗ろう[ ]時、ドアが閉まりました。|とした
124|新しい自転車[ ]ほしいです。|が
125|友達に手伝って[ ]。|ほしいです
126|電気をつけた[ ]寝てしまいました。|まま
127|漢字[ ]、文法も勉強します。|はもちろん
128|この店は安い[ ]、駅から近いです。|だけでなく
129|弟はゲーム[ ]しています。|ばかり
130|彼は英語[ ]、日本語も話せます。|ばかりでなく
`;

const FILL_BLANK_SPECS = fillBlankLines.trim().split('\n').map((line, index) => {
  const [sourceNumber, prompt, answer] = line.split('|').map(part => part.trim());
  return { sourceNumber: Number(sourceNumber), prompt, answer, order: index + 1 };
});

function makeFillBlank(spec, grammarCards, testId, localIndex, tags) {
  const sourceCard = grammarCards[spec.sourceNumber - 1];
  if (!sourceCard) throw new Error(`Missing grammar card for fill blank source ${spec.sourceNumber}`);
  return {
    id: `${testId}-q${pad(localIndex, 3)}`,
    type: 'FILL_BLANK',
    prompt: spec.prompt,
    image: null,
    correctValue: spec.answer,
    explanation: `This completes the grammar point 「${sourceCard.front}」.`,
    sourceCardIds: [sourceCard.id],
    tags,
  };
}

function addTest(tests, id, title, category, tags, questions) {
  const type = questions.every(q => q.type === questions[0].type) ? questions[0].type : 'MIXED';
  tests.push({ id, title, level: 'N4', type, category, tags, questions });
}

function generateTests(vocabCards, kanjiCards, grammarCards, sentenceCards, packId) {
  if (FILL_BLANK_SPECS.length !== 130) throw new Error(`Expected 130 fill blank specs, found ${FILL_BLANK_SPECS.length}`);
  const tests = [];

  const vocabMcqSources = takeSpread(vocabCards, 120, 0, 7);
  let vocabOffset = 0;
  for (let testNo = 1; testNo <= 10; testNo++) {
    const testId = `n4-test-vocab-${pad(testNo, 2)}`;
    const questions = vocabMcqSources.slice(vocabOffset, vocabOffset + 12)
      .map((card, index) => makeMcq(card, vocabCards, `${testId}-q${pad(index + 1, 3)}`, ['vocabulary']));
    vocabOffset += 12;
    addTest(tests, testId, `N4 Vocabulary Quiz ${pad(testNo, 2)}`, 'Vocabulary', ['vocabulary'], questions);
  }

  const kanjiTfSources = takeSpread(kanjiCards, 40, 0, 5);
  let kanjiOffset = 0;
  for (let testNo = 1; testNo <= 4; testNo++) {
    const testId = `n4-test-kanji-${pad(testNo, 2)}`;
    const questions = kanjiTfSources.slice(kanjiOffset, kanjiOffset + 10).map((card, index) => {
      const globalIndex = kanjiOffset + index;
      const isTrue = globalIndex % 2 === 0;
      const falseCard = kanjiCards[(kanjiCards.findIndex(c => c.id === card.id) + 17) % kanjiCards.length];
      return makeTf(card, falseCard, `${testId}-q${pad(index + 1, 3)}`, isTrue, ['kanji']);
    });
    kanjiOffset += 10;
    addTest(tests, testId, `N4 Kanji Quiz ${pad(testNo, 2)}`, 'Kanji', ['kanji'], questions);
  }

  let fillOffset = 0;
  for (let testNo = 1; testNo <= 6; testNo++) {
    const testId = `n4-test-grammar-${pad(testNo, 2)}`;
    const questions = FILL_BLANK_SPECS.slice(fillOffset, fillOffset + 15)
      .map((spec, index) => makeFillBlank(spec, grammarCards, testId, index + 1, ['grammar']));
    fillOffset += 15;
    addTest(tests, testId, `N4 Grammar Quiz ${pad(testNo, 2)}`, 'Grammar', ['grammar'], questions);
  }

  const sentenceTfSources = takeSpread(sentenceCards, 40, 3, 11);
  let sentenceOffset = 0;
  for (let testNo = 1; testNo <= 4; testNo++) {
    const testId = `n4-test-sentence-${pad(testNo, 2)}`;
    const questions = sentenceTfSources.slice(sentenceOffset, sentenceOffset + 10).map((card, index) => {
      const globalIndex = sentenceOffset + index;
      const isTrue = globalIndex % 2 === 0;
      const falseCard = sentenceCards[(sentenceCards.findIndex(c => c.id === card.id) + 23) % sentenceCards.length];
      return makeTf(card, falseCard, `${testId}-q${pad(index + 1, 3)}`, isTrue, ['sentence']);
    });
    sentenceOffset += 10;
    addTest(tests, testId, `N4 Sentence Reading Quiz ${pad(testNo, 2)}`, 'Sentences', ['sentence'], questions);
  }

  const mixedMcqPools = [
    { cards: takeSpread(vocabCards, 18, 181, 13), pool: vocabCards, tags: ['mixed', 'vocabulary'] },
    { cards: takeSpread(kanjiCards, 12, 9, 7), pool: kanjiCards, tags: ['mixed', 'kanji'] },
    { cards: takeSpread(grammarCards, 12, 17, 5), pool: grammarCards, tags: ['mixed', 'grammar'] },
    { cards: takeSpread(sentenceCards, 8, 41, 17), pool: sentenceCards, tags: ['mixed', 'sentence'] },
  ];
  const mixedMcqSources = [];
  while (mixedMcqPools.some(pool => pool.cards.length)) {
    for (const pool of mixedMcqPools) {
      const card = pool.cards.shift();
      if (card) mixedMcqSources.push({ card, pool: pool.pool, tags: pool.tags });
    }
  }

  const mixedTfSources = takeSpread(kanjiCards.concat(sentenceCards), 20, 15, 19);
  const mixedConfigs = [
    { mcq: 13, tf: 5, fb: 10 },
    { mcq: 12, tf: 5, fb: 10 },
    { mcq: 13, tf: 5, fb: 10 },
    { mcq: 12, tf: 5, fb: 10 },
  ];
  let mixedMcqOffset = 0;
  let mixedTfOffset = 0;

  for (let testNo = 1; testNo <= 4; testNo++) {
    const testId = `n4-test-mixed-${pad(testNo, 2)}`;
    const questions = [];
    const config = mixedConfigs[testNo - 1];
    for (let i = 0; i < config.mcq; i++) {
      const source = mixedMcqSources[mixedMcqOffset++];
      questions.push(makeMcq(source.card, source.pool, `${testId}-q${pad(questions.length + 1, 3)}`, source.tags));
    }
    for (let i = 0; i < config.tf; i++) {
      const card = mixedTfSources[mixedTfOffset++];
      const sourcePool = card.type === 'kanji' ? kanjiCards : sentenceCards;
      const sourceIndex = sourcePool.findIndex(c => c.id === card.id);
      const isTrue = (mixedTfOffset - 1) % 2 === 0;
      const falseCard = sourcePool[(sourceIndex + 13) % sourcePool.length];
      questions.push(makeTf(card, falseCard, `${testId}-q${pad(questions.length + 1, 3)}`, isTrue, ['mixed', card.type]));
    }
    for (let i = 0; i < config.fb; i++) {
      const spec = FILL_BLANK_SPECS[fillOffset++];
      questions.push(makeFillBlank(spec, grammarCards, testId, questions.length + 1, ['mixed', 'grammar']));
    }
    addTest(tests, testId, `N4 Mixed Practice Test ${pad(testNo, 2)}`, 'Mixed', ['mixed'], questions);
  }

  return tests;
}

module.exports = { FILL_BLANK_SPECS, generateTests };
