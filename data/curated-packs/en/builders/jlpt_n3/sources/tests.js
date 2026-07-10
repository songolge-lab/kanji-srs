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
    return diff || a.localeCompare(b);
  });
}

function stripSentencePunctuation(value) {
  return String(value || '').trim().replace(/[.!????]+$/u, '');
}

function quotedMeaning(value) {
  return '"' + stripSentencePunctuation(value) + '"';
}

function takeSpread(cards, count, start = 0, step = 7) {
  if (cards.length < count) throw new Error('Could not take ' + count + ' unique cards from pool of ' + cards.length);
  return cards
    .map((card, index) => ({ card, key: stableHash(start + '|' + step + '|' + index + '|' + card.id) }))
    .sort((a, b) => a.key - b.key || a.card.id.localeCompare(b.card.id))
    .slice(0, count)
    .map(entry => entry.card);
}

function selectDistractors(sourceCard, pool, count, seed) {
  const seenValues = new Set([sourceCard.back]);
  const candidates = pool
    .filter(card => card.id !== sourceCard.id && card.back && card.back !== sourceCard.back)
    .map(card => ({ card, key: stableHash(seed + '|' + sourceCard.id + '|' + card.id + '|' + card.back) }))
    .sort((a, b) => a.key - b.key || a.card.id.localeCompare(b.card.id));
  const out = [];
  for (const { card } of candidates) {
    if (out.length >= count) break;
    if (seenValues.has(card.back)) continue;
    seenValues.add(card.back);
    out.push(card.back);
  }
  if (out.length !== count) throw new Error('Not enough distractors for ' + sourceCard.id);
  return out;
}

function promptForMcq(card) {
  if (card.type === 'grammar') return 'What does the grammar pattern "' + card.front + '" mean?';
  if (card.type === 'sentence') return 'Choose the best translation for "' + card.front + '".';
  return 'What does "' + card.front + '" mean?';
}

function makeMcq(card, pool, qid, tags) {
  const distractors = selectDistractors(card, pool, 3, qid);
  const options = sortedByHash([card.back, ...distractors], qid);
  return {
    id: qid,
    type: 'MULTIPLE_CHOICE',
    prompt: promptForMcq(card),
    image: null,
    options,
    correctValue: card.back,
    explanation: 'The correct answer is ' + quotedMeaning(card.back) + '.',
    sourceCardIds: [card.id],
    tags,
  };
}

function pickFalseCard(card, pool, seedStep) {
  const start = pool.findIndex(candidate => candidate.id === card.id);
  if (start < 0) throw new Error('Card not found in false-card pool: ' + card.id);
  for (let offset = seedStep; offset < pool.length + seedStep; offset++) {
    const candidate = pool[(start + offset) % pool.length];
    if (candidate.id !== card.id && candidate.back !== card.back) return candidate;
  }
  throw new Error('Could not find false card for ' + card.id);
}

function makeTf(card, falseCard, qid, isTrue, tags) {
  const claimed = isTrue ? card.back : falseCard.back;
  const subject = card.type === 'grammar' ? 'The grammar pattern "' + card.front + '"' : '"' + card.front + '"';
  return {
    id: qid,
    type: 'TRUE_FALSE',
    prompt: subject + ' means ' + quotedMeaning(claimed) + '.',
    image: null,
    correctValue: isTrue,
    explanation: 'The correct meaning is ' + quotedMeaning(card.back) + '.',
    sourceCardIds: [card.id],
    tags,
  };
}

const FILL_BLANK_SPECS = [
  {
    "sourceId": "n3-grammar-001",
    "prompt": "スープが冷めない[ ]、早く食べてください。",
    "answer": "うちに"
  },
  {
    "sourceId": "n3-grammar-002",
    "prompt": "子供が寝ている[ ]、部屋の掃除を終わらせた。",
    "answer": "間に"
  },
  {
    "sourceId": "n3-grammar-003",
    "prompt": "上司に確認し[ ]、この書類は提出できません。",
    "answer": "てからでないと"
  },
  {
    "sourceId": "n3-grammar-004",
    "prompt": "今、駅からバスに乗る[ ]です。",
    "answer": "ところ"
  },
  {
    "sourceId": "n3-grammar-005",
    "prompt": "先生が言った[ ]、発音の練習をしました。",
    "answer": "とおりに"
  },
  {
    "sourceId": "n3-grammar-006",
    "prompt": "文化[ ]、挨拶の仕方が異なります。",
    "answer": "によって"
  },
  {
    "sourceId": "n3-grammar-007",
    "prompt": "この曲を聞く[ ]、学生時代を思い出す。",
    "answer": "たびに"
  },
  {
    "sourceId": "n3-grammar-008",
    "prompt": "外国語は、話せ[ ]上達する。",
    "answer": "ば話すほど"
  },
  {
    "sourceId": "n3-grammar-009",
    "prompt": "郵便局へ行く[ ]、牛乳を買ってきてくれない？",
    "answer": "ついでに"
  },
  {
    "sourceId": "n3-grammar-010",
    "prompt": "忙しすぎて、泣きたい[ ]です。",
    "answer": "くらい"
  },
  {
    "sourceId": "n3-grammar-011",
    "prompt": "あんな店で食べる[ ]、自分で作ったほうがましだ。",
    "answer": "くらいなら"
  },
  {
    "sourceId": "n3-grammar-012",
    "prompt": "疲れたときは、熱いお風呂に入って寝る[ ]。",
    "answer": "に限る"
  },
  {
    "sourceId": "n3-grammar-013",
    "prompt": "兄が活発なの[ ]、弟はおとなしい性格だ。",
    "answer": "に対して"
  },
  {
    "sourceId": "n3-grammar-014",
    "prompt": "都会は便利な[ ]、物価が高いというデメリットもある。",
    "answer": "反面"
  },
  {
    "sourceId": "n3-grammar-015",
    "prompt": "彼は仕事が忙しい[ ]、趣味の時間も大切にしている。",
    "answer": "一方で"
  },
  {
    "sourceId": "n3-grammar-016",
    "prompt": "今日は涼しい[ ]、少し寒いくらいですね。",
    "answer": "というより"
  },
  {
    "sourceId": "n3-grammar-017",
    "prompt": "車で行く[ ]、健康のために自転車で通勤している。",
    "answer": "かわりに"
  },
  {
    "sourceId": "n3-grammar-018",
    "prompt": "事故があった[ ]、電車が大幅に遅れています。",
    "answer": "ために"
  },
  {
    "sourceId": "n3-grammar-020",
    "prompt": "先輩が手伝ってくれた[ ]、早く仕事が終わった。",
    "answer": "おかげで"
  },
  {
    "sourceId": "n3-grammar-021",
    "prompt": "昨日夜更かしした[ ]、今日は一日中頭が痛かった。",
    "answer": "せいで"
  },
  {
    "sourceId": "n3-grammar-022",
    "prompt": "こんな難しい問題、彼に解けるわけがない。間違える[ ]。",
    "answer": "にきまっている"
  },
  {
    "sourceId": "n3-grammar-023",
    "prompt": "それは私の個人的な意見[ ]ので、あまり気にしないでください。",
    "answer": "にすぎない"
  },
  {
    "sourceId": "n3-grammar-024",
    "prompt": "今回の成功は、チーム全員の努力の結果[ ]。",
    "answer": "にほかならない"
  },
  {
    "sourceId": "n3-grammar-025",
    "prompt": "冬の山登りは危険だから、装備はしっかりしている[ ]。",
    "answer": "に越したことはない"
  },
  {
    "sourceId": "n3-grammar-026",
    "prompt": "終電を逃してしまったので、タクシーで帰る[ ]。",
    "answer": "しかない"
  },
  {
    "sourceId": "n3-grammar-027",
    "prompt": "約束したことは、どんな理由があっても守る[ ]。",
    "answer": "べきだ"
  },
  {
    "sourceId": "n3-grammar-028",
    "prompt": "ドアを開け[ ]が、鍵がかかっていて開かなかった。",
    "answer": "ようとした"
  },
  {
    "sourceId": "n3-grammar-029",
    "prompt": "エアコンが壊れているのか。通りで部屋が暑い[ ]。",
    "answer": "わけだ"
  },
  {
    "sourceId": "n3-grammar-030",
    "prompt": "彼があんなひどいことを言う[ ]。信じられない。",
    "answer": "わけがない"
  },
  {
    "sourceId": "n3-grammar-031",
    "prompt": "お酒が飲めない[ ]が、あまり好きではない。",
    "answer": "わけではない"
  },
  {
    "sourceId": "n3-grammar-032",
    "prompt": "親友の結婚式だから、どんなに忙しくても出席し[ ]。",
    "answer": "ないわけにはいかない"
  },
  {
    "sourceId": "n3-grammar-033",
    "prompt": "納豆は食べられ[ ]ですが、できれば他のものがいいです。",
    "answer": "ないことはない"
  },
  {
    "sourceId": "n3-grammar-034",
    "prompt": "この本は読んだ[ ]、内容はほとんど覚えていない。",
    "answer": "ことは読んだが"
  },
  {
    "sourceId": "n3-grammar-035",
    "prompt": "今後のスケジュールについて、少し確認させ[ ]のですが。",
    "answer": "ていただきたい"
  },
  {
    "sourceId": "n3-grammar-036",
    "prompt": "気分が悪いので、今日は早く帰ら[ ]んですが。",
    "answer": "せてもらいたい"
  },
  {
    "sourceId": "n3-grammar-037",
    "prompt": "明日の試験、あまり難しくない[ ]ですね。",
    "answer": "といい"
  },
  {
    "sourceId": "n3-grammar-039",
    "prompt": "真面目な彼の[ ]、きっと約束の時間には遅れないだろう。",
    "answer": "ことだから"
  },
  {
    "sourceId": "n3-grammar-040",
    "prompt": "驚いた[ ]、その小さな村に有名な俳優が住んでいた。",
    "answer": "ことに"
  },
  {
    "sourceId": "n3-grammar-042",
    "prompt": "新しいパソコンを買った[ ]、使い方が全く分からない。",
    "answer": "ものの"
  },
  {
    "sourceId": "n3-grammar-043",
    "prompt": "子供の頃は、よくこの川で泳いだ[ ]。",
    "answer": "ものだ"
  },
  {
    "sourceId": "n3-grammar-044",
    "prompt": "毎日の通勤ラッシュ、どうにかなら[ ]。",
    "answer": "ないものだろうか"
  },
  {
    "sourceId": "n3-grammar-045",
    "prompt": "祖父の病気は、最近悪くなる[ ]心配だ。",
    "answer": "ばかりで"
  },
  {
    "sourceId": "n3-grammar-046",
    "prompt": "このレストランは料理がおいしい[ ]、サービスも非常に良い。",
    "answer": "ばかりか"
  },
  {
    "sourceId": "n3-grammar-048",
    "prompt": "休みの日は、家でゲームをし[ ]。",
    "answer": "てばかりいる"
  },
  {
    "sourceId": "n3-grammar-049",
    "prompt": "彼は医者[ ]だけでなく、作家としても有名だ。",
    "answer": "として"
  },
  {
    "sourceId": "n3-grammar-052",
    "prompt": "無人島に一つだけ持っていける[ ]、何を選びますか。",
    "answer": "としたら"
  },
  {
    "sourceId": "n3-grammar-053",
    "prompt": "あのコメディ映画は面白すぎて、笑わ[ ]。",
    "answer": "ずにはいられなかった"
  },
  {
    "sourceId": "n3-grammar-054",
    "prompt": "ずっと外で立っていたので、寒く[ ]。",
    "answer": "てたまらない"
  },
  {
    "sourceId": "n3-grammar-056",
    "prompt": "この動物園には、パンダ[ ]とする多くの珍しい動物がいる。",
    "answer": "をはじめ"
  },
  {
    "sourceId": "n3-grammar-057",
    "prompt": "彼は話し方[ ]、あまり誠実そうな人ではないね。",
    "answer": "からして"
  },
  {
    "sourceId": "n3-grammar-058",
    "prompt": "三日間[ ]会議が、ようやく終了した。",
    "answer": "にわたる"
  },
  {
    "sourceId": "n3-grammar-059",
    "prompt": "彼は一生[ ]、世界平和のために活動した。",
    "answer": "を通じて"
  },
  {
    "sourceId": "n3-grammar-060",
    "prompt": "私が知っている[ ]では、その情報は間違っています。",
    "answer": "限り"
  },
  {
    "sourceId": "n3-grammar-061",
    "prompt": "本日[ ]、全品半額セールを実施しております。",
    "answer": "に限り"
  },
  {
    "sourceId": "n3-grammar-062",
    "prompt": "台風で電車が止まっているので、明日の旅行は延期せ[ ]。",
    "answer": "ざるを得ない"
  },
  {
    "sourceId": "n3-grammar-063",
    "prompt": "そんなにスピードを出したら、大きな事故を起こし[ ]よ。",
    "answer": "かねない"
  },
  {
    "sourceId": "n3-grammar-064",
    "prompt": "最近は仕事が忙しくて、どうしても睡眠不足になり[ ]だ。",
    "answer": "がち"
  },
  {
    "sourceId": "n3-grammar-065",
    "prompt": "子供たちが泥[ ]になって、公園から帰ってきた。",
    "answer": "だらけ"
  },
  {
    "sourceId": "n3-grammar-066",
    "prompt": "少し風邪[ ]なので、今日は早く寝ることにします。",
    "answer": "気味"
  },
  {
    "sourceId": "n3-grammar-067",
    "prompt": "彼の服装はいつも子供[ ]、年相応に見えない。",
    "answer": "っぽくて"
  },
  {
    "sourceId": "n3-grammar-068",
    "prompt": "こんなたくさんの漢字、一週間で覚えられ[ ]よ。",
    "answer": "っこない"
  },
  {
    "sourceId": "n3-grammar-069",
    "prompt": "彼女は何か言いた[ ]な顔をして、私のほうを見ていた。",
    "answer": "げ"
  },
  {
    "sourceId": "n3-grammar-070",
    "prompt": "彼の突然の辞任は、私にとって信じ[ ]出来事だった。",
    "answer": "がたい"
  },
  {
    "sourceId": "n3-grammar-071",
    "prompt": "環境問題への人々の関心は、年々高まり[ ]。",
    "answer": "つつある"
  },
  {
    "sourceId": "n3-grammar-072",
    "prompt": "体に悪いと知り[ ]、つい甘いものを食べてしまう。",
    "answer": "つつ"
  },
  {
    "sourceId": "n3-grammar-073",
    "prompt": "集めたデータ[ ]、新しいマーケティング戦略を立てた。",
    "answer": "に基づいて"
  },
  {
    "sourceId": "n3-grammar-074",
    "prompt": "渡されたマニュアル[ ]、機械の操作を行ってください。",
    "answer": "に沿って"
  },
  {
    "sourceId": "n3-grammar-075",
    "prompt": "素晴らしい監督[ ]練習できたことは、良い経験になった。",
    "answer": "のもとで"
  },
  {
    "sourceId": "n3-grammar-076",
    "prompt": "このマンションは、一人暮らしの学生[ ]に設計されている。",
    "answer": "向け"
  },
  {
    "sourceId": "n3-grammar-077",
    "prompt": "人口の増加[ ]、様々な社会問題が発生している。",
    "answer": "に伴って"
  },
  {
    "sourceId": "n3-grammar-078",
    "prompt": "秋が深まる[ ]、木の葉が赤く色づいてきた。",
    "answer": "につれて"
  },
  {
    "sourceId": "n3-grammar-079",
    "prompt": "客の立場[ ]、もっと営業時間を長くしてほしい。",
    "answer": "からいうと"
  },
  {
    "sourceId": "n3-grammar-080",
    "prompt": "外国人[ ]、日本の満員電車は非常に奇妙な光景らしい。",
    "answer": "から見ると"
  },
  {
    "sourceId": "n3-grammar-081",
    "prompt": "あの空模様[ ]、午後には大雨が降るだろう。",
    "answer": "からすると"
  },
  {
    "sourceId": "n3-grammar-082",
    "prompt": "このレストランは、店員の態度[ ]なっていない。",
    "answer": "からして"
  },
  {
    "sourceId": "n3-grammar-083",
    "prompt": "プロとして契約した[ ]、結果を出さなければならない。",
    "answer": "からには"
  },
  {
    "sourceId": "n3-grammar-084",
    "prompt": "時間に厳しい彼[ ]、絶対に遅刻はしないはずだ。",
    "answer": "のことだから"
  },
  {
    "sourceId": "n3-grammar-085",
    "prompt": "期待が大きかった[ ]、失敗したときのショックも大きかった。",
    "answer": "だけに"
  },
  {
    "sourceId": "n3-grammar-086",
    "prompt": "お金がない[ ]、進学を諦めざるを得なかった。",
    "answer": "ばかりに"
  },
  {
    "sourceId": "n3-grammar-087",
    "prompt": "便利だ[ ]、毎日コンビニ弁当ばかり食べるのは良くない。",
    "answer": "からといって"
  },
  {
    "sourceId": "n3-grammar-088",
    "prompt": "初めて作った[ ]、とても美味しいケーキですね。",
    "answer": "にしては"
  },
  {
    "sourceId": "n3-grammar-089",
    "prompt": "いくら忙しい[ ]、連絡くらいはするべきだ。",
    "answer": "にしても"
  },
  {
    "sourceId": "n3-grammar-090",
    "prompt": "もし宝くじで一億円当たった[ ]、何に使いますか。",
    "answer": "としたら"
  },
  {
    "sourceId": "n3-grammar-091",
    "prompt": "車を買う[ ]、維持費もかなりかかるから慎重に考えよう。",
    "answer": "となると"
  },
  {
    "sourceId": "n3-grammar-092",
    "prompt": "たとえ親が反対した[ ]、私はこの仕事を辞めるつもりはない。",
    "answer": "としても"
  },
  {
    "sourceId": "n3-grammar-093",
    "prompt": "あんな美味しくない店には、二度と行く[ ]と心に誓った。",
    "answer": "まい"
  },
  {
    "sourceId": "n3-grammar-094",
    "prompt": "雨が降ってきたので、出かけ[ ]迷っている。",
    "answer": "ようか出かけまいか"
  },
  {
    "sourceId": "n3-grammar-095",
    "prompt": "勉強していないのだから、試験に落ちる[ ]。",
    "answer": "に決まっている"
  },
  {
    "sourceId": "n3-grammar-096",
    "prompt": "彼の机の上に鍵があるから、まだ会社にいる[ ]。",
    "answer": "に違いない"
  },
  {
    "sourceId": "n3-grammar-097",
    "prompt": "彼があの秘密を誰かに話す[ ]。彼は口が堅いから。",
    "answer": "はずがない"
  },
  {
    "sourceId": "n3-grammar-100",
    "prompt": "あなたの言いたいことが分から[ ]が、賛成はできない。",
    "answer": "ないわけではない"
  },
  {
    "sourceId": "n3-grammar-101",
    "prompt": "明日は大切な会議があるから、今日はお酒を飲む[ ]。",
    "answer": "わけにはいかない"
  },
  {
    "sourceId": "n3-grammar-103",
    "prompt": "新しいスマートフォンが欲しくて欲しく[ ]。",
    "answer": "てしょうがない"
  },
  {
    "sourceId": "n3-grammar-104",
    "prompt": "今日は朝から何も食べていないので、お腹が空い[ ]。",
    "answer": "てたまらない"
  },
  {
    "sourceId": "n3-grammar-105",
    "prompt": "故郷で一人暮らしをしている母のことが心配[ ]。",
    "answer": "でならない"
  },
  {
    "sourceId": "n3-grammar-106",
    "prompt": "彼の冗談がおかしすぎて、大声で笑わ[ ]。",
    "answer": "ないではいられなかった"
  },
  {
    "sourceId": "n3-grammar-107",
    "prompt": "こんな不公平な決定には、抗議せ[ ]。",
    "answer": "ずにはいられない"
  },
  {
    "sourceId": "n3-grammar-108",
    "prompt": "いつか自分の家を建てて、家族でのんびり暮らし[ ]。",
    "answer": "たいものだ"
  },
  {
    "sourceId": "n3-grammar-109",
    "prompt": "もう少し給料が上がら[ ]と、いつも思っている。",
    "answer": "ないものか"
  },
  {
    "sourceId": "n3-grammar-110",
    "prompt": "学生時代は、よく徹夜でテスト勉強をした[ ]。",
    "answer": "ものだ"
  },
  {
    "sourceId": "n3-grammar-111",
    "prompt": "目上の人に対して、そんな失礼な口の利き方をする[ ]。",
    "answer": "ものではない"
  },
  {
    "sourceId": "n3-grammar-112",
    "prompt": "困った時に助け合うのが、本当の友達[ ]。",
    "answer": "というものだ"
  },
  {
    "sourceId": "n3-grammar-113",
    "prompt": "あんな不親切な店、二度と行く[ ]。",
    "answer": "ものか"
  },
  {
    "sourceId": "n3-grammar-114",
    "prompt": "風邪を早く治したいなら、温かくしてしっかり寝る[ ]。",
    "answer": "ことだ"
  },
  {
    "sourceId": "n3-grammar-115",
    "prompt": "図書館では静かにする[ ]。飲食は禁止です。",
    "answer": "こと"
  },
  {
    "sourceId": "n3-grammar-116",
    "prompt": "時間はまだたっぷりあるから、そんなに急ぐ[ ]よ。",
    "answer": "ことはない"
  },
  {
    "sourceId": "n3-grammar-117",
    "prompt": "ニュースによると、明日の午後は大雪になる[ ]。",
    "answer": "ということだ"
  },
  {
    "sourceId": "n3-grammar-120",
    "prompt": "彼女は一度も諦める[ ]、最後まで夢を追い続けた。",
    "answer": "ことなく"
  },
  {
    "sourceId": "n3-grammar-121",
    "prompt": "あと少しで、トラックに轢かれる[ ]。危なかった。",
    "answer": "ところだった"
  },
  {
    "sourceId": "n3-grammar-122",
    "prompt": "日本に来[ ]、毎日納豆を食べています。",
    "answer": "て以来"
  },
  {
    "sourceId": "n3-grammar-125",
    "prompt": "狭い[ ]、庭のある一軒家に住むのが私の夢です。",
    "answer": "ながらも"
  },
  {
    "sourceId": "n3-grammar-126",
    "prompt": "ピアノを弾くこと[ ]、クラスの誰にも負けない自信がある。",
    "answer": "にかけては"
  },
  {
    "sourceId": "n3-grammar-127",
    "prompt": "この建物は、昔は学校[ ]使われていたそうだ。",
    "answer": "として"
  },
  {
    "sourceId": "n3-grammar-128",
    "prompt": "私[ ]、家族と過ごす時間が何よりも大切です。",
    "answer": "にとって"
  },
  {
    "sourceId": "n3-grammar-129",
    "prompt": "彼は目下の人[ ]、いつも厳しい態度をとる。",
    "answer": "に対して"
  },
  {
    "sourceId": "n3-grammar-130",
    "prompt": "日本の経済問題[ ]、クラスで討論を行った。",
    "answer": "について"
  },
  {
    "sourceId": "n3-grammar-131",
    "prompt": "この件[ ]は、現在担当部署で調査中です。",
    "answer": "に関しまして"
  },
  {
    "sourceId": "n3-grammar-132",
    "prompt": "遺産[ ]、兄弟間で激しい争いが起きているらしい。",
    "answer": "をめぐって"
  },
  {
    "sourceId": "n3-grammar-133",
    "prompt": "ファンの期待[ ]、彼は素晴らしい演技を見せた。",
    "answer": "にこたえて"
  },
  {
    "sourceId": "n3-grammar-134",
    "prompt": "この映画は、実際にあった事件[ ]作られている。",
    "answer": "をもとにして"
  },
  {
    "sourceId": "n3-grammar-136",
    "prompt": "川[ ]歩いていくと、大きな公園が見えてきます。",
    "answer": "に沿って"
  },
  {
    "sourceId": "n3-grammar-137",
    "prompt": "両親の温かい愛情[ ]、彼女は健やかに育った。",
    "answer": "のもとで"
  },
  {
    "sourceId": "n3-grammar-138",
    "prompt": "この料理は、辛いものが苦手な子供[ ]味付けしてあります。",
    "answer": "向けに"
  },
  {
    "sourceId": "n3-grammar-139",
    "prompt": "人[ ]、この薬の副作用が出ることがあります。",
    "answer": "によっては"
  },
  {
    "sourceId": "n3-grammar-140",
    "prompt": "経済の発展[ ]、人々の生活様式も大きく変化した。",
    "answer": "に伴って"
  },
  {
    "sourceId": "n3-grammar-141",
    "prompt": "試合の終了時間が近づく[ ]、観客の応援はさらに熱狂的になった。",
    "answer": "につれて"
  },
  {
    "sourceId": "n3-grammar-142",
    "prompt": "説明書の指示[ ]、家具を組み立ててください。",
    "answer": "にしたがって"
  },
  {
    "sourceId": "n3-grammar-143",
    "prompt": "年をとる[ ]、記憶力が少しずつ衰えていくのを感じる。",
    "answer": "とともに"
  },
  {
    "sourceId": "n3-grammar-144",
    "prompt": "明日の天気[ ]、ピクニックに行くかどうか決めましょう。",
    "answer": "次第で"
  },
  {
    "sourceId": "n3-grammar-145",
    "prompt": "お客様のご予算[ ]、最適なプランをご提案いたします。",
    "answer": "に応じて"
  },
  {
    "sourceId": "n3-grammar-146",
    "prompt": "大雨[ ]強風も吹いてきたので、外に出るのは危険だ。",
    "answer": "に加えて"
  },
  {
    "sourceId": "n3-grammar-147",
    "prompt": "このスポーツクラブは、年齢や性別[ ]誰でも参加できます。",
    "answer": "を問わず"
  },
  {
    "sourceId": "n3-grammar-148",
    "prompt": "天候[ ]、明日のスポーツ大会は予定通り実施します。",
    "answer": "にかかわらず"
  },
  {
    "sourceId": "n3-grammar-149",
    "prompt": "彼は人目[ ]、道端で大声で泣き出した。",
    "answer": "もかまわず"
  },
  {
    "sourceId": "n3-grammar-150",
    "prompt": "デザイン[ ]、この靴はとても軽くて歩きやすい。",
    "answer": "はともかく"
  },
  {
    "sourceId": "n3-grammar-151",
    "prompt": "冗談[ ]、今後の計画について真剣に話し合いましょう。",
    "answer": "は別として"
  },
  {
    "sourceId": "n3-grammar-153",
    "prompt": "喉が痛くて、水[ ]飲むことができない。",
    "answer": "さえ"
  },
  {
    "sourceId": "n3-grammar-154",
    "prompt": "あの日は誰一人[ ]、彼に話しかけようとしなかった。",
    "answer": "として"
  },
  {
    "sourceId": "n3-grammar-155",
    "prompt": "明日の朝[ ]、関東地方では強い雨が降る見込みです。",
    "answer": "から昼にかけて"
  },
  {
    "sourceId": "n3-grammar-156",
    "prompt": "校長先生[ ]、多くの先生方が私の卒業を祝ってくれた。",
    "answer": "をはじめ"
  }
];

function makeFillBlank(spec, grammarCards, testId, localIndex, tags) {
  const sourceCard = grammarCards.find(card => Array.isArray(card.sourceIds) && card.sourceIds.includes(spec.sourceId));
  if (!sourceCard) throw new Error('Missing grammar card for fill blank source ' + spec.sourceId);
  return {
    id: testId + '-q' + pad(localIndex, 3),
    type: 'FILL_BLANK',
    prompt: spec.prompt,
    image: null,
    correctValue: spec.answer,
    explanation: 'This completes "' + sourceCard.front + '".',
    sourceCardIds: [sourceCard.id],
    tags,
  };
}

function addTest(tests, id, title, category, tags, questions) {
  const type = questions.every(q => q.type === questions[0].type) ? questions[0].type : 'MIXED';
  tests.push({ id, title, level: 'N3', type, category, tags, questions });
}

function interleavePools(pools) {
  const out = [];
  while (pools.some(pool => pool.cards.length)) {
    for (const pool of pools) {
      const card = pool.cards.shift();
      if (card) out.push({ card, pool: pool.pool, tags: pool.tags });
    }
  }
  return out;
}

function generateTests(vocabCards, kanjiCards, grammarCards, sentenceCards, packId) {
  if (FILL_BLANK_SPECS.length !== 140) throw new Error('Expected 140 fill blank specs, found ' + FILL_BLANK_SPECS.length);
  const tests = [];

  const vocabMcqSources = takeSpread(vocabCards, 120, 3, 7);
  let vocabOffset = 0;
  for (let testNo = 1; testNo <= 10; testNo++) {
    const testId = 'n3-test-vocab-' + pad(testNo, 2);
    const questions = vocabMcqSources.slice(vocabOffset, vocabOffset + 12)
      .map((card, index) => makeMcq(card, vocabCards, testId + '-q' + pad(index + 1, 3), ['vocabulary']));
    vocabOffset += 12;
    addTest(tests, testId, 'N3 Vocabulary Quiz ' + pad(testNo, 2), 'Vocabulary', ['vocabulary'], questions);
  }

  const kanjiTfSources = takeSpread(kanjiCards, 40, 5, 11);
  let kanjiOffset = 0;
  for (let testNo = 1; testNo <= 4; testNo++) {
    const testId = 'n3-test-kanji-' + pad(testNo, 2);
    const questions = kanjiTfSources.slice(kanjiOffset, kanjiOffset + 10).map((card, index) => {
      const globalIndex = kanjiOffset + index;
      const isTrue = globalIndex % 2 === 0;
      return makeTf(card, pickFalseCard(card, kanjiCards, 17), testId + '-q' + pad(index + 1, 3), isTrue, ['kanji']);
    });
    kanjiOffset += 10;
    addTest(tests, testId, 'N3 Kanji Quiz ' + pad(testNo, 2), 'Kanji', ['kanji'], questions);
  }

  let fillOffset = 0;
  for (let testNo = 1; testNo <= 6; testNo++) {
    const testId = 'n3-test-grammar-' + pad(testNo, 2);
    const questions = FILL_BLANK_SPECS.slice(fillOffset, fillOffset + 15)
      .map((spec, index) => makeFillBlank(spec, grammarCards, testId, index + 1, ['grammar']));
    fillOffset += 15;
    addTest(tests, testId, 'N3 Grammar Quiz ' + pad(testNo, 2), 'Grammar', ['grammar'], questions);
  }

  const sentenceTfSources = takeSpread(sentenceCards, 40, 9, 13);
  let sentenceOffset = 0;
  for (let testNo = 1; testNo <= 5; testNo++) {
    const testId = 'n3-test-sentence-' + pad(testNo, 2);
    const questions = sentenceTfSources.slice(sentenceOffset, sentenceOffset + 8).map((card, index) => {
      const globalIndex = sentenceOffset + index;
      const isTrue = globalIndex % 2 === 0;
      return makeTf(card, pickFalseCard(card, sentenceCards, 23), testId + '-q' + pad(index + 1, 3), isTrue, ['sentence']);
    });
    sentenceOffset += 8;
    addTest(tests, testId, 'N3 Sentence Reading Quiz ' + pad(testNo, 2), 'Sentences', ['sentence'], questions);
  }

  const mixedMcqSources = interleavePools([
    { cards: takeSpread(vocabCards, 25, 181, 13), pool: vocabCards, tags: ['mixed', 'vocabulary'] },
    { cards: takeSpread(kanjiCards, 10, 19, 7), pool: kanjiCards, tags: ['mixed', 'kanji'] },
    { cards: takeSpread(grammarCards, 15, 29, 5), pool: grammarCards, tags: ['mixed', 'grammar'] },
    { cards: takeSpread(sentenceCards, 10, 41, 17), pool: sentenceCards, tags: ['mixed', 'sentence'] },
  ]);
  const mixedTfSources = takeSpread(kanjiCards.concat(sentenceCards), 20, 31, 19);
  let mixedMcqOffset = 0;
  let mixedTfOffset = 0;

  for (let testNo = 1; testNo <= 5; testNo++) {
    const testId = 'n3-test-mixed-' + pad(testNo, 2);
    const questions = [];
    for (let i = 0; i < 12; i++) {
      const source = mixedMcqSources[mixedMcqOffset++];
      questions.push(makeMcq(source.card, source.pool, testId + '-q' + pad(questions.length + 1, 3), source.tags));
    }
    for (let i = 0; i < 4; i++) {
      const card = mixedTfSources[mixedTfOffset++];
      const sourcePool = card.type === 'kanji' ? kanjiCards : sentenceCards;
      const isTrue = (mixedTfOffset - 1) % 2 === 0;
      questions.push(makeTf(card, pickFalseCard(card, sourcePool, 29), testId + '-q' + pad(questions.length + 1, 3), isTrue, ['mixed', card.type]));
    }
    for (let i = 0; i < 10; i++) {
      const spec = FILL_BLANK_SPECS[fillOffset++];
      questions.push(makeFillBlank(spec, grammarCards, testId, questions.length + 1, ['mixed', 'grammar']));
    }
    addTest(tests, testId, 'N3 Mixed Practice Test ' + pad(testNo, 2), 'Mixed', ['mixed'], questions);
  }

  return tests;
}

module.exports = { FILL_BLANK_SPECS, generateTests };
