const CATEGORY_ORDER = {
  vocabulary: 1,
  kanji: 2,
  grammar: 3,
  sentence: 4,
};

const ALLOWED_CATEGORIES = new Set(Object.keys(CATEGORY_ORDER));
const FORBIDDEN_FIELDS = ['furigana', 'reading', 'romaji', 'onyomi', 'kunyomi'];

// Static cleaned source cards for the JLPT N3 English Full Pack.
// These are the builder-owned source records; release JSON is generated from this file plus sources/tests.js.
const CARD_SOURCES = [
  {
    "category": "vocabulary",
    "front": "習慣",
    "back": "custom; habit",
    "exampleJp": "毎朝、起きたらすぐにコップ一杯の水を飲むのが私の習慣です。",
    "exampleTranslation": "It's my habit to drink a glass of water right after waking up every morning.",
    "tags": [
      "n3",
      "vocabulary",
      "daily-life"
    ],
    "sourceIds": [
      "n3-vocab-0001"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1
  },
  {
    "category": "vocabulary",
    "front": "日常",
    "back": "daily routine; everyday life",
    "exampleJp": "旅行から帰り、また忙しい日常に戻りました。",
    "exampleTranslation": "I returned from my trip and went back to my busy everyday life.",
    "tags": [
      "n3",
      "vocabulary",
      "daily-life"
    ],
    "sourceIds": [
      "n3-vocab-0002"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 2
  },
  {
    "category": "vocabulary",
    "front": "普通",
    "back": "normal; ordinary",
    "exampleJp": "今日は特別なことは何もなくて、ごく普通の一日でした。",
    "exampleTranslation": "There was nothing special today; it was just a very ordinary day.",
    "tags": [
      "n3",
      "vocabulary",
      "daily-life"
    ],
    "sourceIds": [
      "n3-vocab-0003"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 3
  },
  {
    "category": "vocabulary",
    "front": "普段",
    "back": "usually; normally",
    "exampleJp": "普段は電車で通勤していますが、今日は天気がいいので自転車で来ました。",
    "exampleTranslation": "I normally commute by train, but the weather is nice today so I came by bicycle.",
    "tags": [
      "n3",
      "vocabulary",
      "daily-life"
    ],
    "sourceIds": [
      "n3-vocab-0004"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 4
  },
  {
    "category": "vocabulary",
    "front": "値段",
    "back": "price",
    "exampleJp": "このレストランは値段のわりに量が多くて美味しいです。",
    "exampleTranslation": "This restaurant serves large, delicious portions for the price.",
    "tags": [
      "n3",
      "vocabulary",
      "daily-life"
    ],
    "sourceIds": [
      "n3-vocab-0005"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 5
  },
  {
    "category": "vocabulary",
    "front": "両替",
    "back": "currency exchange",
    "exampleJp": "海外旅行に行く前に、空港で少しドルに両替しておきました。",
    "exampleTranslation": "Before going on my overseas trip, I exchanged a little money for dollars at the airport.",
    "tags": [
      "n3",
      "vocabulary",
      "daily-life",
      "travel"
    ],
    "sourceIds": [
      "n3-vocab-0006"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 6
  },
  {
    "category": "vocabulary",
    "front": "商品",
    "back": "product; goods",
    "exampleJp": "この商品は人気が高いため、現在品切れとなっております。",
    "exampleTranslation": "Because this product is highly popular, it is currently out of stock.",
    "tags": [
      "n3",
      "vocabulary",
      "daily-life",
      "shopping"
    ],
    "sourceIds": [
      "n3-vocab-0007"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 7
  },
  {
    "category": "vocabulary",
    "front": "社会",
    "back": "society",
    "exampleJp": "大学を卒業して社会に出ると、学生時代とは違う責任が生じます。",
    "exampleTranslation": "When you graduate from university and enter society, different responsibilities arise compared to your student days.",
    "tags": [
      "n3",
      "vocabulary",
      "society"
    ],
    "sourceIds": [
      "n3-vocab-0008"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 8
  },
  {
    "category": "vocabulary",
    "front": "制度",
    "back": "system; institution",
    "exampleJp": "育児休暇の制度がもっと使いやすくなればいいのにと思います。",
    "exampleTranslation": "I wish the parental leave system was easier to use.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "work"
    ],
    "sourceIds": [
      "n3-vocab-0009"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 9
  },
  {
    "category": "vocabulary",
    "front": "警察",
    "back": "police",
    "exampleJp": "夜道で怪しい人を見たので、すぐに警察に電話しました。",
    "exampleTranslation": "I saw a suspicious person on the street at night, so I immediately called the police.",
    "tags": [
      "n3",
      "vocabulary",
      "public-services",
      "society"
    ],
    "sourceIds": [
      "n3-vocab-0010"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 10
  },
  {
    "category": "vocabulary",
    "front": "道路",
    "back": "road",
    "exampleJp": "大雪の影響で、いくつかの道路が通行止めになっています。",
    "exampleTranslation": "Due to the heavy snow, several roads are closed to traffic.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "traffic"
    ],
    "sourceIds": [
      "n3-vocab-0011"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 11
  },
  {
    "category": "vocabulary",
    "front": "企業",
    "back": "enterprise; company",
    "exampleJp": "彼は大学を卒業後、有名なIT企業に就職した。",
    "exampleTranslation": "After graduating from university, he found employment at a famous IT company.",
    "tags": [
      "n3",
      "vocabulary",
      "work"
    ],
    "sourceIds": [
      "n3-vocab-0012"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 12
  },
  {
    "category": "vocabulary",
    "front": "企画",
    "back": "planning; project",
    "exampleJp": "新しい商品の企画を考えるために、みんなでアイデアを出し合った。",
    "exampleTranslation": "Everyone shared ideas to brainstorm a plan for a new product.",
    "tags": [
      "n3",
      "vocabulary",
      "work"
    ],
    "sourceIds": [
      "n3-vocab-0013"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 13
  },
  {
    "category": "vocabulary",
    "front": "職業",
    "back": "occupation",
    "exampleJp": "警察官は、市民の安全を守る大変立派な職業だと思います。",
    "exampleTranslation": "I think being a police officer is a very admirable occupation that protects the safety of citizens.",
    "tags": [
      "n3",
      "vocabulary",
      "work"
    ],
    "sourceIds": [
      "n3-vocab-0014"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 14
  },
  {
    "category": "vocabulary",
    "front": "収入",
    "back": "income",
    "exampleJp": "アルバイトを二つ掛け持ちして、少しでも収入を増やそうとしている。",
    "exampleTranslation": "I'm juggling two part-time jobs, trying to increase my income even a little.",
    "tags": [
      "n3",
      "vocabulary",
      "work",
      "daily-life"
    ],
    "sourceIds": [
      "n3-vocab-0015"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 15
  },
  {
    "category": "vocabulary",
    "front": "支出",
    "back": "expense",
    "exampleJp": "今月は飲み会が多かったので、予想以上に支出が増えてしまった。",
    "exampleTranslation": "I went to many drinking parties this month, so my expenses increased more than I expected.",
    "tags": [
      "n3",
      "vocabulary",
      "daily-life"
    ],
    "sourceIds": [
      "n3-vocab-0016"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 16
  },
  {
    "category": "vocabulary",
    "front": "利益",
    "back": "profit",
    "exampleJp": "今年の会社の利益は、去年と比べて大きく上がりました。",
    "exampleTranslation": "The company's profit this year went up significantly compared to last year.",
    "tags": [
      "n3",
      "vocabulary",
      "work"
    ],
    "sourceIds": [
      "n3-vocab-0017"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 17
  },
  {
    "category": "vocabulary",
    "front": "会議",
    "back": "meeting",
    "exampleJp": "明日の午後に営業部の会議があるので、資料を準備しておいてください。",
    "exampleTranslation": "There's a sales department meeting tomorrow afternoon, so please prepare the materials.",
    "tags": [
      "n3",
      "vocabulary",
      "work"
    ],
    "sourceIds": [
      "n3-vocab-0018"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 18
  },
  {
    "category": "vocabulary",
    "front": "成績",
    "back": "grades; results",
    "exampleJp": "一生懸命勉強したおかげで、今学期の成績はすごく良かったです。",
    "exampleTranslation": "Thanks to studying as hard as I could, my grades this semester were extremely good.",
    "tags": [
      "n3",
      "vocabulary",
      "school"
    ],
    "sourceIds": [
      "n3-vocab-0019"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 19
  },
  {
    "category": "vocabulary",
    "front": "奨学金",
    "back": "scholarship",
    "exampleJp": "大学の学費を払うために、奨学金を申し込むつもりです。",
    "exampleTranslation": "I plan to apply for a scholarship to pay for my university tuition.",
    "tags": [
      "n3",
      "vocabulary",
      "school"
    ],
    "sourceIds": [
      "n3-vocab-0020"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 20
  },
  {
    "category": "vocabulary",
    "front": "卒業",
    "back": "graduation",
    "exampleJp": "来年の春に大学を卒業したら、地元の会社で働く予定です。",
    "exampleTranslation": "When I graduate from university next spring, I plan to work at a local company.",
    "tags": [
      "n3",
      "vocabulary",
      "school",
      "work"
    ],
    "sourceIds": [
      "n3-vocab-0021"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 21
  },
  {
    "category": "vocabulary",
    "front": "講義",
    "back": "lecture",
    "exampleJp": "この教授の講義はいつも面白いので、学生にとても人気があります。",
    "exampleTranslation": "This professor's lectures are always interesting, so they are very popular among students.",
    "tags": [
      "n3",
      "vocabulary",
      "school"
    ],
    "sourceIds": [
      "n3-vocab-0022"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 22
  },
  {
    "category": "vocabulary",
    "front": "授業",
    "back": "class; lesson",
    "exampleJp": "急に気分が悪くなったので、午後の授業は休むことにしました。",
    "exampleTranslation": "I suddenly felt sick, so I decided to skip the afternoon classes.",
    "tags": [
      "n3",
      "vocabulary",
      "school"
    ],
    "sourceIds": [
      "n3-vocab-0023"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 23
  },
  {
    "category": "vocabulary",
    "front": "遅刻",
    "back": "tardiness",
    "exampleJp": "電車が遅れたせいで、大事な試験に遅刻してしまった。",
    "exampleTranslation": "Because the train was delayed, I was late for an important exam.",
    "tags": [
      "n3",
      "vocabulary",
      "school",
      "work"
    ],
    "sourceIds": [
      "n3-vocab-0024"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 24
  },
  {
    "category": "vocabulary",
    "front": "復習",
    "back": "review",
    "exampleJp": "授業で習った文法をその日のうちに復習すると、覚えやすいですよ。",
    "exampleTranslation": "If you review the grammar you learned in class on the same day, it's easier to remember.",
    "tags": [
      "n3",
      "vocabulary",
      "school"
    ],
    "sourceIds": [
      "n3-vocab-0025"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 25
  },
  {
    "category": "vocabulary",
    "front": "予習",
    "back": "preparation (for a lesson)",
    "exampleJp": "明日の授業で読む文章を、辞書を引きながら予習しておきました。",
    "exampleTranslation": "I prepared for the text we'll read in tomorrow's class by looking words up in the dictionary.",
    "tags": [
      "n3",
      "vocabulary",
      "school"
    ],
    "sourceIds": [
      "n3-vocab-0026"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 26
  },
  {
    "category": "vocabulary",
    "front": "宿題",
    "back": "homework",
    "exampleJp": "子供がなかなか宿題をやらないので、いつも叱ってばかりいます。",
    "exampleTranslation": "My child won't do their homework easily, so I'm always just scolding them.",
    "tags": [
      "n3",
      "vocabulary",
      "school",
      "family"
    ],
    "sourceIds": [
      "n3-vocab-0027"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 27
  },
  {
    "category": "vocabulary",
    "front": "試験",
    "back": "exam",
    "exampleJp": "来月、日本語能力試験のN3を受けるつもりで勉強しています。",
    "exampleTranslation": "I'm studying with the intention of taking the JLPT N3 next month.",
    "tags": [
      "n3",
      "vocabulary",
      "school"
    ],
    "sourceIds": [
      "n3-vocab-0028"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 28
  },
  {
    "category": "vocabulary",
    "front": "質問",
    "back": "question",
    "exampleJp": "説明で分からないところがあれば、遠慮なく質問してください。",
    "exampleTranslation": "If there is anything you don't understand in the explanation, please don't hesitate to ask questions.",
    "tags": [
      "n3",
      "vocabulary",
      "school",
      "work"
    ],
    "sourceIds": [
      "n3-vocab-0029"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 29
  },
  {
    "category": "vocabulary",
    "front": "答え",
    "back": "answer",
    "exampleJp": "いくら考えてもこの問題の答えが分からないので、先生に聞こう。",
    "exampleTranslation": "No matter how much I think, I don't know the answer to this problem, so I'll ask the teacher.",
    "tags": [
      "n3",
      "vocabulary",
      "school"
    ],
    "sourceIds": [
      "n3-vocab-0030"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 30
  },
  {
    "category": "vocabulary",
    "front": "正解",
    "back": "correct answer",
    "exampleJp": "三つの選択肢の中から、一つだけ正解を選びなさい。",
    "exampleTranslation": "Choose only one correct answer from among the three choices.",
    "tags": [
      "n3",
      "vocabulary",
      "school"
    ],
    "sourceIds": [
      "n3-vocab-0031"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 31
  },
  {
    "category": "vocabulary",
    "front": "知識",
    "back": "knowledge",
    "exampleJp": "本をたくさん読むことで、様々な分野の知識を得ることができます。",
    "exampleTranslation": "By reading many books, you can gain knowledge in various fields.",
    "tags": [
      "n3",
      "vocabulary",
      "school",
      "abstract"
    ],
    "sourceIds": [
      "n3-vocab-0032"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 32
  },
  {
    "category": "vocabulary",
    "front": "信じる",
    "back": "to believe",
    "exampleJp": "彼の言うことを最後まで信じて待っていましたが、結局嘘でした。",
    "exampleTranslation": "I believed what he said and waited until the end, but it turned out to be a lie.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "interpersonal"
    ],
    "sourceIds": [
      "n3-vocab-0033"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 33
  },
  {
    "category": "vocabulary",
    "front": "諦める",
    "back": "to give up",
    "exampleJp": "一度失敗したくらいで夢を諦めるのは、まだ早すぎますよ。",
    "exampleTranslation": "It's too early to give up on your dream just because you failed once.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "school"
    ],
    "sourceIds": [
      "n3-vocab-0034"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 34
  },
  {
    "category": "vocabulary",
    "front": "頑張る",
    "back": "to do one's best",
    "exampleJp": "明日はいよいよ決勝戦なので、チーム一丸となって頑張ります。",
    "exampleTranslation": "Tomorrow is finally the final match, so we will do our best together as a team.",
    "tags": [
      "n3",
      "vocabulary",
      "school",
      "sports"
    ],
    "sourceIds": [
      "n3-vocab-0035"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 35
  },
  {
    "category": "vocabulary",
    "front": "悩む",
    "back": "to worry; be troubled",
    "exampleJp": "A社とB社、どちらの会社に就職するかでずっと悩んでいます。",
    "exampleTranslation": "I've been worrying for a long time over whether to find employment at company A or company B.",
    "tags": [
      "n3",
      "vocabulary",
      "work",
      "abstract"
    ],
    "sourceIds": [
      "n3-vocab-0036"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 36
  },
  {
    "category": "vocabulary",
    "front": "探す",
    "back": "to search; look for",
    "exampleJp": "昨日からずっと探しているのに、家の鍵がどこにも見当たらないんです。",
    "exampleTranslation": "Even though I've been searching since yesterday, I can't find my house keys anywhere.",
    "tags": [
      "n3",
      "vocabulary",
      "daily-life"
    ],
    "sourceIds": [
      "n3-vocab-0037"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 37
  },
  {
    "category": "vocabulary",
    "front": "見つける",
    "back": "to find",
    "exampleJp": "古本屋で、ずっと読みたかった絶版の本を偶然見つけた。",
    "exampleTranslation": "I accidentally found an out-of-print book I had always wanted to read at a used bookstore.",
    "tags": [
      "n3",
      "vocabulary",
      "daily-life",
      "shopping"
    ],
    "sourceIds": [
      "n3-vocab-0038"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 38
  },
  {
    "category": "vocabulary",
    "front": "手に入れる",
    "back": "to obtain",
    "exampleJp": "苦労の末に、ようやくコンサートのチケットを手に入れることができました。",
    "exampleTranslation": "After much struggle, I was finally able to obtain tickets to the concert.",
    "tags": [
      "n3",
      "vocabulary",
      "daily-life",
      "entertainment"
    ],
    "sourceIds": [
      "n3-vocab-0039"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 39
  },
  {
    "category": "vocabulary",
    "front": "拾う",
    "back": "to pick up",
    "exampleJp": "公園で可愛らしい子猫を拾ったので、家で飼うことにしました。",
    "exampleTranslation": "I picked up a cute kitten at the park, so I decided to keep it at home.",
    "tags": [
      "n3",
      "vocabulary",
      "daily-life",
      "family"
    ],
    "sourceIds": [
      "n3-vocab-0040"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 40
  },
  {
    "category": "vocabulary",
    "front": "捨てる",
    "back": "to throw away",
    "exampleJp": "もう着なくなった古い服を思い切って全部捨てることにしました。",
    "exampleTranslation": "I decided to boldly throw away all the old clothes I don't wear anymore.",
    "tags": [
      "n3",
      "vocabulary",
      "daily-life"
    ],
    "sourceIds": [
      "n3-vocab-0041"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 41
  },
  {
    "category": "vocabulary",
    "front": "運ぶ",
    "back": "to carry; transport",
    "exampleJp": "この荷物は重すぎるので、一人で二階まで運ぶのは無理です。",
    "exampleTranslation": "This luggage is too heavy, so it's impossible to carry it up to the second floor by myself.",
    "tags": [
      "n3",
      "vocabulary",
      "daily-life"
    ],
    "sourceIds": [
      "n3-vocab-0042"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 42
  },
  {
    "category": "vocabulary",
    "front": "渡す",
    "back": "to hand over",
    "exampleJp": "先生にお渡しする書類は、こちらでよろしかったでしょうか。",
    "exampleTranslation": "Are these the documents to hand over to the teacher?",
    "tags": [
      "n3",
      "vocabulary",
      "school",
      "work"
    ],
    "sourceIds": [
      "n3-vocab-0043"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 43
  },
  {
    "category": "vocabulary",
    "front": "頼む",
    "back": "to request; ask a favor",
    "exampleJp": "忙しいところ申し訳ないんですが、ちょっと仕事を頼んでもいいですか。",
    "exampleTranslation": "I'm sorry to interrupt when you're busy, but could I ask you a favor with some work?",
    "tags": [
      "n3",
      "vocabulary",
      "work",
      "interpersonal"
    ],
    "sourceIds": [
      "n3-vocab-0044"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 44
  },
  {
    "category": "vocabulary",
    "front": "断る",
    "back": "to refuse; decline",
    "exampleJp": "せっかくの誘いだったが、今日はどうしても外せない用事があるので断った。",
    "exampleTranslation": "It was a kind invitation, but I refused it because I have an unavoidable errand today.",
    "tags": [
      "n3",
      "vocabulary",
      "daily-life",
      "interpersonal"
    ],
    "sourceIds": [
      "n3-vocab-0045"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 45
  },
  {
    "category": "vocabulary",
    "front": "許す",
    "back": "to forgive",
    "exampleJp": "彼が心から反省している様子だったので、今回のミスは許すことにした。",
    "exampleTranslation": "Since he seemed to be truly reflecting on it, I decided to forgive him for this mistake.",
    "tags": [
      "n3",
      "vocabulary",
      "interpersonal",
      "work"
    ],
    "sourceIds": [
      "n3-vocab-0046"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 46
  },
  {
    "category": "vocabulary",
    "front": "助ける",
    "back": "to help; save",
    "exampleJp": "駅の階段で転んだおばあさんを助けたら、とても感謝されました。",
    "exampleTranslation": "When I helped an old woman who fell on the station stairs, she was very grateful.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "public-services"
    ],
    "sourceIds": [
      "n3-vocab-0047"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 47
  },
  {
    "category": "vocabulary",
    "front": "育てる",
    "back": "to raise; rear",
    "exampleJp": "両親は私たち三人兄弟を一生懸命育ててくれました。",
    "exampleTranslation": "Our parents raised us three siblings with all their might.",
    "tags": [
      "n3",
      "vocabulary",
      "family",
      "daily-life"
    ],
    "sourceIds": [
      "n3-vocab-0048"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 48
  },
  {
    "category": "vocabulary",
    "front": "変わる",
    "back": "to change (intransitive)",
    "exampleJp": "久しぶりに故郷に帰ったら、駅前の景色がすっかり変わっていた。",
    "exampleTranslation": "When I returned to my hometown for the first time in a while, the scenery in front of the station had completely changed.",
    "tags": [
      "n3",
      "vocabulary",
      "daily-life",
      "society"
    ],
    "sourceIds": [
      "n3-vocab-0049"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 49
  },
  {
    "category": "vocabulary",
    "front": "変える",
    "back": "to change (transitive)",
    "exampleJp": "健康のために、明日から食事のメニューを変えることにしました。",
    "exampleTranslation": "For my health, I decided to change my meal menu starting tomorrow.",
    "tags": [
      "n3",
      "vocabulary",
      "health",
      "daily-life"
    ],
    "sourceIds": [
      "n3-vocab-0050"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 50
  },
  {
    "category": "vocabulary",
    "front": "続く",
    "back": "to continue (intransitive)",
    "exampleJp": "一週間前からずっと雨が続いていて、洗濯物が干せなくて困っています。",
    "exampleTranslation": "It's been raining continuously since a week ago, and I'm troubled because I can't hang my laundry to dry.",
    "tags": [
      "n3",
      "vocabulary",
      "daily-life",
      "weather"
    ],
    "sourceIds": [
      "n3-vocab-0051"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 51
  },
  {
    "category": "vocabulary",
    "front": "真面目",
    "back": "serious; earnest",
    "exampleJp": "彼はとても真面目な学生で、授業を一度も休んだことがありません。",
    "exampleTranslation": "He is a very serious student and has never missed a single class.",
    "tags": [
      "n3",
      "vocabulary",
      "school",
      "personality"
    ],
    "sourceIds": [
      "n3-vocab-0052"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 52
  },
  {
    "category": "vocabulary",
    "front": "正直",
    "back": "honest",
    "exampleJp": "嘘をつかずに、正直に自分の気持ちを話してくれてありがとう。",
    "exampleTranslation": "Thank you for honestly telling me your feelings without lying.",
    "tags": [
      "n3",
      "vocabulary",
      "personality",
      "interpersonal"
    ],
    "sourceIds": [
      "n3-vocab-0053"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 53
  },
  {
    "category": "vocabulary",
    "front": "簡単",
    "back": "simple; easy",
    "exampleJp": "この料理は材料を切って煮るだけなので、誰でも簡単に作れますよ。",
    "exampleTranslation": "This dish is just cutting and boiling ingredients, so anyone can make it simply.",
    "tags": [
      "n3",
      "vocabulary",
      "daily-life",
      "cooking"
    ],
    "sourceIds": [
      "n3-vocab-0054"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 54
  },
  {
    "category": "vocabulary",
    "front": "静か",
    "back": "quiet",
    "exampleJp": "田舎の夜はとても静かで、虫の鳴き声しか聞こえません。",
    "exampleTranslation": "Nights in the countryside are very quiet; you can only hear the sounds of insects.",
    "tags": [
      "n3",
      "vocabulary",
      "daily-life",
      "nature"
    ],
    "sourceIds": [
      "n3-vocab-0055"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 55
  },
  {
    "category": "vocabulary",
    "front": "賑やか",
    "back": "lively; bustling",
    "exampleJp": "お祭りの日は、町中が人で溢れてとても賑やかになります。",
    "exampleTranslation": "On festival days, the whole town overflows with people and becomes very lively.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "culture"
    ],
    "sourceIds": [
      "n3-vocab-0056"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 56
  },
  {
    "category": "vocabulary",
    "front": "便利",
    "back": "convenient",
    "exampleJp": "スマートフォンの地図アプリは、道に迷った時にとても便利です。",
    "exampleTranslation": "Smartphone map apps are very convenient when you get lost.",
    "tags": [
      "n3",
      "vocabulary",
      "daily-life",
      "technology"
    ],
    "sourceIds": [
      "n3-vocab-0057"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 57
  },
  {
    "category": "vocabulary",
    "front": "不便",
    "back": "inconvenient",
    "exampleJp": "この辺りはスーパーもコンビニもなくて、生活するには少し不便ですね。",
    "exampleTranslation": "There are neither supermarkets nor convenience stores around here, making it a bit inconvenient to live in.",
    "tags": [
      "n3",
      "vocabulary",
      "daily-life"
    ],
    "sourceIds": [
      "n3-vocab-0058"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 58
  },
  {
    "category": "vocabulary",
    "front": "確か",
    "back": "certain; sure",
    "exampleJp": "彼の誕生日は確か来週の金曜日だったと思いますが、自信がありません。",
    "exampleTranslation": "I'm fairly sure his birthday was next Friday, but I'm not confident.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract"
    ],
    "sourceIds": [
      "n3-vocab-0059"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 59
  },
  {
    "category": "vocabulary",
    "front": "絶対",
    "back": "absolutely; definitely",
    "exampleJp": "あのレストランのケーキはすごく美味しいから、絶対に食べたほうがいいよ。",
    "exampleTranslation": "That restaurant's cake is amazingly delicious, so you should absolutely eat it.",
    "tags": [
      "n3",
      "vocabulary",
      "daily-life",
      "food"
    ],
    "sourceIds": [
      "n3-vocab-0060"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 60
  },
  {
    "category": "vocabulary",
    "front": "突然",
    "back": "suddenly",
    "exampleJp": "会議の途中で、突然社長が部屋に入ってきたので皆驚いた。",
    "exampleTranslation": "Everyone was surprised when the company president suddenly entered the room in the middle of the meeting.",
    "tags": [
      "n3",
      "vocabulary",
      "work"
    ],
    "sourceIds": [
      "n3-vocab-0061"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 61
  },
  {
    "category": "vocabulary",
    "front": "当然",
    "back": "naturally; as a matter of course",
    "exampleJp": "たくさん練習したのだから、彼が優勝するのは当然の結果だと言える。",
    "exampleTranslation": "Since he practiced a lot, you could say it's a natural result that he won the championship.",
    "tags": [
      "n3",
      "vocabulary",
      "school",
      "sports"
    ],
    "sourceIds": [
      "n3-vocab-0062"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 62
  },
  {
    "category": "vocabulary",
    "front": "発展",
    "back": "development",
    "exampleJp": "交通機関の発展によって、人々の生活は劇的に変化しました。",
    "exampleTranslation": "With the development of transportation systems, people's lives changed dramatically.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "traffic"
    ],
    "sourceIds": [
      "n3-vocab-0063"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 63
  },
  {
    "category": "vocabulary",
    "front": "成長",
    "back": "growth",
    "exampleJp": "久しぶりに会った甥がすっかり大きくなっていて、子供の成長の早さに驚いた。",
    "exampleTranslation": "I was surprised by the speed of children's growth when I saw my nephew for the first time in a while and he had gotten completely big.",
    "tags": [
      "n3",
      "vocabulary",
      "family",
      "daily-life"
    ],
    "sourceIds": [
      "n3-vocab-0064"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 64
  },
  {
    "category": "vocabulary",
    "front": "減少",
    "back": "decrease",
    "exampleJp": "この村では少子化の影響で、子どもの数が年々減少しています。",
    "exampleTranslation": "In this village, the number of children is decreasing year by year due to the declining birthrate.",
    "tags": [
      "n3",
      "vocabulary",
      "society"
    ],
    "sourceIds": [
      "n3-vocab-0065"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 65
  },
  {
    "category": "vocabulary",
    "front": "増加",
    "back": "increase",
    "exampleJp": "外国人観光客の増加に伴い、ホテルが不足しているらしい。",
    "exampleTranslation": "Along with the increase in foreign tourists, it seems there is a shortage of hotels.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "travel"
    ],
    "sourceIds": [
      "n3-vocab-0066"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 66
  },
  {
    "category": "vocabulary",
    "front": "違い",
    "back": "difference",
    "exampleJp": "この二つのデザインは似ていますが、細かいところにいくつか違いがあります。",
    "exampleTranslation": "These two designs are similar, but there are some differences in the fine details.",
    "tags": [
      "n3",
      "vocabulary",
      "daily-life",
      "work"
    ],
    "sourceIds": [
      "n3-vocab-0067"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 67
  },
  {
    "category": "vocabulary",
    "front": "真実",
    "back": "truth",
    "exampleJp": "どんなに隠そうとしても、いつかは真実が明らかになるものです。",
    "exampleTranslation": "No matter how much you try to hide it, the truth will be revealed eventually.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract"
    ],
    "sourceIds": [
      "n3-vocab-0068"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 68
  },
  {
    "category": "vocabulary",
    "front": "本物",
    "back": "real thing; genuine",
    "exampleJp": "美術館でゴッホの絵の本物を見て、とても感動しました。",
    "exampleTranslation": "I was very moved seeing the genuine painting by Van Gogh at the art museum.",
    "tags": [
      "n3",
      "vocabulary",
      "art",
      "culture"
    ],
    "sourceIds": [
      "n3-vocab-0069"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 69
  },
  {
    "category": "vocabulary",
    "front": "偽物",
    "back": "fake",
    "exampleJp": "インターネットで買ったブランドのバッグは、どうやら偽物だったみたいだ。",
    "exampleTranslation": "It looks like the brand bag I bought on the internet was somehow a fake.",
    "tags": [
      "n3",
      "vocabulary",
      "shopping",
      "daily-life"
    ],
    "sourceIds": [
      "n3-vocab-0070"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 70
  },
  {
    "category": "vocabulary",
    "front": "怒る",
    "back": "to get angry",
    "exampleJp": "約束の時間を1時間も過ぎて現れた彼を見て、彼女は激しく怒った。",
    "exampleTranslation": "Seeing him show up an hour past the promised time, she got intensely angry.",
    "tags": [
      "n3",
      "vocabulary",
      "interpersonal",
      "emotion"
    ],
    "sourceIds": [
      "n3-vocab-0071"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 71
  },
  {
    "category": "vocabulary",
    "front": "泣く",
    "back": "to cry",
    "exampleJp": "感動的な映画を見て、映画館で思わず泣いてしまいました。",
    "exampleTranslation": "Watching a moving movie, I unintentionally cried at the movie theater.",
    "tags": [
      "n3",
      "vocabulary",
      "entertainment",
      "emotion"
    ],
    "sourceIds": [
      "n3-vocab-0072"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 72
  },
  {
    "category": "vocabulary",
    "front": "笑う",
    "back": "to laugh; smile",
    "exampleJp": "彼の話がとても面白かったので、お腹が痛くなるくらい笑いました。",
    "exampleTranslation": "His story was so funny that I laughed until my stomach hurt.",
    "tags": [
      "n3",
      "vocabulary",
      "interpersonal",
      "emotion"
    ],
    "sourceIds": [
      "n3-vocab-0073"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 73
  },
  {
    "category": "vocabulary",
    "front": "喜ぶ",
    "back": "to be glad; rejoice",
    "exampleJp": "娘に欲しがっていたおもちゃをプレゼントしたら、飛び上がって喜んだ。",
    "exampleTranslation": "When I gave my daughter the toy she wanted as a present, she jumped up and was glad.",
    "tags": [
      "n3",
      "vocabulary",
      "family",
      "emotion"
    ],
    "sourceIds": [
      "n3-vocab-0074"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 74
  },
  {
    "category": "vocabulary",
    "front": "悲しむ",
    "back": "to be sad; grieve",
    "exampleJp": "愛犬の死を深く悲しんでいて、今は何も手につかない状態です。",
    "exampleTranslation": "I am deeply grieving the death of my pet dog, and right now I can't concentrate on anything.",
    "tags": [
      "n3",
      "vocabulary",
      "family",
      "emotion"
    ],
    "sourceIds": [
      "n3-vocab-0075"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 75
  },
  {
    "category": "vocabulary",
    "front": "楽しむ",
    "back": "to enjoy",
    "exampleJp": "週末は家族と一緒にバーベキューをして、自然を思い切り楽しみました。",
    "exampleTranslation": "On the weekend, I had a barbecue with my family and enjoyed nature to the fullest.",
    "tags": [
      "n3",
      "vocabulary",
      "daily-life",
      "hobby"
    ],
    "sourceIds": [
      "n3-vocab-0076"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 76
  },
  {
    "category": "vocabulary",
    "front": "驚く",
    "back": "to be surprised",
    "exampleJp": "突然大きな音がしたので、びっくりして思わず飛び上がって驚いた。",
    "exampleTranslation": "A loud sound suddenly rang out, so I was startled and unintentionally jumped up in surprise.",
    "tags": [
      "n3",
      "vocabulary",
      "daily-life",
      "emotion"
    ],
    "sourceIds": [
      "n3-vocab-0077"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 77
  },
  {
    "category": "vocabulary",
    "front": "慌てる",
    "back": "to panic; be in a hurry",
    "exampleJp": "寝坊して慌てて家を出たせいで、携帯電話を忘れてきてしまった。",
    "exampleTranslation": "Because I overslept and left the house in a panic, I forgot my mobile phone.",
    "tags": [
      "n3",
      "vocabulary",
      "daily-life",
      "emotion"
    ],
    "sourceIds": [
      "n3-vocab-0078"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 78
  },
  {
    "category": "vocabulary",
    "front": "焦る",
    "back": "to be in a hurry; be impatient",
    "exampleJp": "試験の時間が残り少なくなってきて、急に焦り始めました。",
    "exampleTranslation": "With the exam time running short, I suddenly started to feel impatient.",
    "tags": [
      "n3",
      "vocabulary",
      "school",
      "emotion"
    ],
    "sourceIds": [
      "n3-vocab-0079"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 79
  },
  {
    "category": "vocabulary",
    "front": "恐れる",
    "back": "to fear; be afraid of",
    "exampleJp": "失敗を恐れずに、新しいことにどんどん挑戦していくことが大切だ。",
    "exampleTranslation": "It is important to keep challenging new things without being afraid of failure.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "work"
    ],
    "sourceIds": [
      "n3-vocab-0080"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 80
  },
  {
    "category": "vocabulary",
    "front": "考える",
    "back": "to think (logically)",
    "exampleJp": "今後のキャリアについて、もう少し真剣に考える必要があります。",
    "exampleTranslation": "I need to think a little more seriously about my future career.",
    "tags": [
      "n3",
      "vocabulary",
      "work",
      "abstract"
    ],
    "sourceIds": [
      "n3-vocab-0081"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 81
  },
  {
    "category": "vocabulary",
    "front": "思う",
    "back": "to think; feel",
    "exampleJp": "今日のテストは結構難しかったので、あまり点数が取れていないと思います。",
    "exampleTranslation": "Today's test was quite difficult, so I think I haven't gotten a very good score.",
    "tags": [
      "n3",
      "vocabulary",
      "school",
      "abstract"
    ],
    "sourceIds": [
      "n3-vocab-0082"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 82
  },
  {
    "category": "vocabulary",
    "front": "覚える",
    "back": "to remember; memorize",
    "exampleJp": "新しい職場で、まず最初に全員の顔と名前を覚えるのに苦労しました。",
    "exampleTranslation": "At my new workplace, I struggled at first to remember everyone's faces and names.",
    "tags": [
      "n3",
      "vocabulary",
      "work",
      "school"
    ],
    "sourceIds": [
      "n3-vocab-0083"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 83
  },
  {
    "category": "vocabulary",
    "front": "忘れる",
    "back": "to forget",
    "exampleJp": "大事な会議の資料を家に忘れてきてしまい、上司にひどく怒られた。",
    "exampleTranslation": "I forgot the materials for an important meeting at home and was terribly scolded by my boss.",
    "tags": [
      "n3",
      "vocabulary",
      "work",
      "school"
    ],
    "sourceIds": [
      "n3-vocab-0084"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 84
  },
  {
    "category": "vocabulary",
    "front": "表す",
    "back": "to express, to represent",
    "exampleJp": "この記号は非常口を表しています。",
    "exampleTranslation": "This symbol represents an emergency exit.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0085"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 85
  },
  {
    "category": "vocabulary",
    "front": "現れる",
    "back": "to appear, to emerge",
    "exampleJp": "森を抜けると、美しい湖が現れた。",
    "exampleTranslation": "As we passed through the forest, a beautiful lake appeared.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0086"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 86
  },
  {
    "category": "vocabulary",
    "front": "合わせる",
    "back": "to match, to combine, to join together",
    "exampleJp": "みんなで力を合わせて、このプロジェクトを成功させよう。",
    "exampleTranslation": "Let's combine our strength and make this project a success.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0087"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 87
  },
  {
    "category": "vocabulary",
    "front": "預ける",
    "back": "to entrust, to deposit",
    "exampleJp": "チェックインの前に、ホテルに荷物を預けました。",
    "exampleTranslation": "I left my luggage at the hotel before checking in.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0088"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 88
  },
  {
    "category": "vocabulary",
    "front": "与える",
    "back": "to give, to present, to award",
    "exampleJp": "そのニュースは社会に大きな衝撃を与えた。",
    "exampleTranslation": "The news delivered a major shock to society.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0089"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 89
  },
  {
    "category": "vocabulary",
    "front": "扱う",
    "back": "to handle, to deal with",
    "exampleJp": "この機械は壊れやすいので、丁寧に扱ってください。",
    "exampleTranslation": "This machine is fragile, so please handle it with care.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0090"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 90
  },
  {
    "category": "vocabulary",
    "front": "余る",
    "back": "to remain, to be left over",
    "exampleJp": "料理を作りすぎて、たくさん余ってしまった。",
    "exampleTranslation": "I made too much food and a lot of it was left over.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0091"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 91
  },
  {
    "category": "vocabulary",
    "front": "争う",
    "back": "to argue, to compete, to fight",
    "exampleJp": "兄弟で小さなことで争うのはやめなさい。",
    "exampleTranslation": "Stop fighting with your brother over trivial things.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0092"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 92
  },
  {
    "category": "vocabulary",
    "front": "改める",
    "back": "to change, to correct, to revise",
    "exampleJp": "今後の対応について、改めて連絡いたします。",
    "exampleTranslation": "I will contact you again regarding our future response.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0093"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 93
  },
  {
    "category": "vocabulary",
    "front": "抱く",
    "back": "to embrace, to harbor (a feeling)",
    "exampleJp": "彼は将来に対して大きな希望を抱いている。",
    "exampleTranslation": "He harbors great hopes for his future.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0094"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 94
  },
  {
    "category": "vocabulary",
    "front": "失う",
    "back": "to lose, to part with",
    "exampleJp": "自信を失わずに、もう一度挑戦してみて。",
    "exampleTranslation": "Don't lose your confidence; try challenging yourself one more time.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0095"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 95
  },
  {
    "category": "vocabulary",
    "front": "疑う",
    "back": "to doubt, to suspect",
    "exampleJp": "警察は彼が事件に関わっていると疑っている。",
    "exampleTranslation": "The police suspect he is involved in the incident.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0096"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 96
  },
  {
    "category": "vocabulary",
    "front": "奪う",
    "back": "to steal, to take by force",
    "exampleJp": "その美しい景色は、一瞬で私の心を奪った。",
    "exampleTranslation": "That beautiful scenery stole my heart in an instant.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0097"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 97
  },
  {
    "category": "vocabulary",
    "front": "埋める",
    "back": "to bury, to fill up",
    "exampleJp": "庭に穴を掘って、タイムカプセルを埋めました。",
    "exampleTranslation": "I dug a hole in the garden and buried a time capsule.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0098"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 98
  },
  {
    "category": "vocabulary",
    "front": "占う",
    "back": "to forecast, to tell fortunes",
    "exampleJp": "有名な占い師に、今年の運勢を占ってもらった。",
    "exampleTranslation": "I had a famous fortune teller read my fortune for this year.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0099"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 99
  },
  {
    "category": "vocabulary",
    "front": "得る",
    "back": "to gain, to acquire",
    "exampleJp": "海外での生活を通して、貴重な経験を得ることができた。",
    "exampleTranslation": "Through living abroad, I was able to gain valuable experience.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0100"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 100
  },
  {
    "category": "vocabulary",
    "front": "追う",
    "back": "to chase, to pursue",
    "exampleJp": "犯人を追って、警察の車が猛スピードで走り去った。",
    "exampleTranslation": "Police cars sped away in pursuit of the criminal.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0101"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 101
  },
  {
    "category": "vocabulary",
    "front": "終える",
    "back": "to finish, to end",
    "exampleJp": "無事にすべての試験を終えて、ほっとしています。",
    "exampleTranslation": "I am relieved to have safely finished all my exams.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0102"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 102
  },
  {
    "category": "vocabulary",
    "front": "及ぼす",
    "back": "to exert, to cause, to exercise",
    "exampleJp": "台風の影響は、農業に深刻な被害を及ぼした。",
    "exampleTranslation": "The impact of the typhoon caused severe damage to agriculture.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0103"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 103
  },
  {
    "category": "vocabulary",
    "front": "折る",
    "back": "to fold, to break",
    "exampleJp": "紙を半分に折って、封筒に入れてください。",
    "exampleTranslation": "Please fold the paper in half and put it in the envelope.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0104"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 104
  },
  {
    "category": "vocabulary",
    "front": "飼う",
    "back": "to keep (a pet)",
    "exampleJp": "子供の頃、庭で犬を飼っていました。",
    "exampleTranslation": "When I was a child, we kept a dog in the garden.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0105"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 105
  },
  {
    "category": "vocabulary",
    "front": "香る",
    "back": "to smell sweet, to be fragrant",
    "exampleJp": "窓を開けると、春の沈丁花が甘く香ってきた。",
    "exampleTranslation": "Opening the window, the sweet scent of spring daphne wafted in.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0106"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 106
  },
  {
    "category": "vocabulary",
    "front": "抱える",
    "back": "to hold under the arm, to have (problems)",
    "exampleJp": "彼女は誰にも言えない悩みを抱えているようだ。",
    "exampleTranslation": "It seems she is carrying worries that she can't share with anyone.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0107"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 107
  },
  {
    "category": "vocabulary",
    "front": "掛ける",
    "back": "to hang, to put on, to spend (time/money)",
    "exampleJp": "この料理は、手間と時間をかけて作られています。",
    "exampleTranslation": "This dish was made by spending a lot of time and effort.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0108"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 108
  },
  {
    "category": "vocabulary",
    "front": "飾る",
    "back": "to decorate",
    "exampleJp": "クリスマスが近づいたので、部屋にツリーを飾りました。",
    "exampleTranslation": "As Christmas is approaching, we decorated the room with a tree.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0109"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 109
  },
  {
    "category": "vocabulary",
    "front": "固まる",
    "back": "to harden, to solidify",
    "exampleJp": "ゼリーが冷蔵庫でしっかり固まるまで待ってください。",
    "exampleTranslation": "Please wait until the jelly firmly solidifies in the fridge.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0110"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 110
  },
  {
    "category": "vocabulary",
    "front": "構う",
    "back": "to mind, to care about",
    "exampleJp": "私のことは構わないで、先に進んでください。",
    "exampleTranslation": "Don't mind me; please go on ahead.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0111"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 111
  },
  {
    "category": "vocabulary",
    "front": "通う",
    "back": "to commute, to go to (regularly)",
    "exampleJp": "健康のために、毎週水泳教室に通っています。",
    "exampleTranslation": "For my health, I commute to swimming classes every week.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0112"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 112
  },
  {
    "category": "vocabulary",
    "front": "乾く",
    "back": "to get dry",
    "exampleJp": "天気がいいので、洗濯物がすぐに乾きました。",
    "exampleTranslation": "The weather is nice, so the laundry dried very quickly.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0113"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 113
  },
  {
    "category": "vocabulary",
    "front": "代わる",
    "back": "to take the place of, to replace",
    "exampleJp": "社長が病気で休んでいる間、副社長が代わって指揮をとる。",
    "exampleTranslation": "While the president is out sick, the vice president will take over and lead.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0114"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 114
  },
  {
    "category": "vocabulary",
    "front": "効く",
    "back": "to be effective, to work",
    "exampleJp": "この薬は頭痛にとてもよく効きます。",
    "exampleTranslation": "This medicine works very well for headaches.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0115"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 115
  },
  {
    "category": "vocabulary",
    "front": "刻む",
    "back": "to chop, to engrave",
    "exampleJp": "玉ねぎを細かく刻んで、スープに入れてください。",
    "exampleTranslation": "Please chop the onions finely and put them into the soup.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0116"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 116
  },
  {
    "category": "vocabulary",
    "front": "配る",
    "back": "to distribute, to hand out",
    "exampleJp": "駅前で新しいレストランのチラシを配っていた。",
    "exampleTranslation": "They were handing out flyers for a new restaurant in front of the station.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0117"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 117
  },
  {
    "category": "vocabulary",
    "front": "組む",
    "back": "to put together, to cross (legs/arms), to form (a team)",
    "exampleJp": "足を組んで座るのは、姿勢に良くないと言われている。",
    "exampleTranslation": "It is said that sitting with your legs crossed is bad for your posture.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0118"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 118
  },
  {
    "category": "vocabulary",
    "front": "加える",
    "back": "to add, to include",
    "exampleJp": "最後に塩とこしょうを加えて、味を調えます。",
    "exampleTranslation": "Finally, add salt and pepper to adjust the flavor.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0119"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 119
  },
  {
    "category": "vocabulary",
    "front": "崩れる",
    "back": "to collapse, to crumble",
    "exampleJp": "地震で古い建物が崩れてしまった。",
    "exampleTranslation": "An old building collapsed due to the earthquake.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0120"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 120
  },
  {
    "category": "vocabulary",
    "front": "狂う",
    "back": "to go mad, to go out of order, to be ruined (plans)",
    "exampleJp": "電車が遅れたせいで、今日の予定が完全に狂ってしまった。",
    "exampleTranslation": "Because the train was delayed, today's schedule was completely ruined.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0121"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 121
  },
  {
    "category": "vocabulary",
    "front": "苦しむ",
    "back": "to suffer, to struggle",
    "exampleJp": "多くの人が、長引く不況に苦しんでいる。",
    "exampleTranslation": "Many people are suffering from the prolonged economic recession.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0122"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 122
  },
  {
    "category": "vocabulary",
    "front": "暮らす",
    "back": "to live, to get along",
    "exampleJp": "将来は、海の近くの静かな町で暮らしたいです。",
    "exampleTranslation": "In the future, I want to live in a quiet town near the sea.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0123"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 123
  },
  {
    "category": "vocabulary",
    "front": "超える",
    "back": "to exceed, to cross over",
    "exampleJp": "参加者の数は予想を超えて、百人以上になった。",
    "exampleTranslation": "The number of participants exceeded our expectations and reached over a hundred.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0124"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 124
  },
  {
    "category": "vocabulary",
    "front": "焦げる",
    "back": "to burn, to be roasted",
    "exampleJp": "火が強すぎて、フライパンの肉が焦げてしまった。",
    "exampleTranslation": "The heat was too strong, and the meat in the frying pan got burned.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0125"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 125
  },
  {
    "category": "vocabulary",
    "front": "凍る",
    "back": "to freeze",
    "exampleJp": "冬の寒い朝、庭の池の水が凍っていた。",
    "exampleTranslation": "On a cold winter morning, the water in the garden pond had frozen.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0126"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 126
  },
  {
    "category": "vocabulary",
    "front": "越す",
    "back": "to cross, to go across, to pass time",
    "exampleJp": "この山を越すと、隣の県に入ります。",
    "exampleTranslation": "Once you cross this mountain, you will enter the neighboring prefecture.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0127"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 127
  },
  {
    "category": "vocabulary",
    "front": "転ぶ",
    "back": "to fall down, to trip",
    "exampleJp": "雪道で滑って転んでしまい、足を少し痛めた。",
    "exampleTranslation": "I slipped and fell on the snowy road and slightly hurt my leg.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0128"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 128
  },
  {
    "category": "vocabulary",
    "front": "殺す",
    "back": "to kill",
    "exampleJp": "推理小説では、誰が被害者を殺したのかを探るのが面白い。",
    "exampleTranslation": "In mystery novels, it is interesting to figure out who killed the victim.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0129"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 129
  },
  {
    "category": "vocabulary",
    "front": "逆らう",
    "back": "to go against, to oppose, to disobey",
    "exampleJp": "川の流れに逆らって泳ぐのは非常に疲れる。",
    "exampleTranslation": "Swimming against the flow of the river is extremely exhausting.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0130"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 130
  },
  {
    "category": "vocabulary",
    "front": "叫ぶ",
    "back": "to shout, to cry",
    "exampleJp": "コンサート会場で、ファンが大声で歌手の名前を叫んでいた。",
    "exampleTranslation": "At the concert venue, fans were shouting the singer's name loudly.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0131"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 131
  },
  {
    "category": "vocabulary",
    "front": "避ける",
    "back": "to avoid",
    "exampleJp": "ラッシュアワーを避けるために、早めに家を出ました。",
    "exampleTranslation": "I left the house early to avoid the rush hour.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0132"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 132
  },
  {
    "category": "vocabulary",
    "front": "覚める",
    "back": "to wake up, to become sober",
    "exampleJp": "大きな音に驚いて、すっかり目が覚めてしまった。",
    "exampleTranslation": "Startled by a loud noise, I woke up completely.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0133"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 133
  },
  {
    "category": "vocabulary",
    "front": "沈む",
    "back": "to sink, to set (sun)",
    "exampleJp": "夕日が海に沈む様子は、とても美しかった。",
    "exampleTranslation": "The sight of the evening sun setting into the sea was very beautiful.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0134"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 134
  },
  {
    "category": "vocabulary",
    "front": "従う",
    "back": "to follow, to obey",
    "exampleJp": "仕事中は、上司の指示に従わなければならない。",
    "exampleTranslation": "While working, you must follow your boss's instructions.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0135"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 135
  },
  {
    "category": "vocabulary",
    "front": "支払う",
    "back": "to pay",
    "exampleJp": "買い物代金はクレジットカードで支払いました。",
    "exampleTranslation": "I paid for my shopping with a credit card.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0136"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 136
  },
  {
    "category": "vocabulary",
    "front": "縛る",
    "back": "to tie, to bind",
    "exampleJp": "古新聞をひもで縛って、リサイクルの日に出した。",
    "exampleTranslation": "I tied the old newspapers with string and put them out on recycling day.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0137"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 137
  },
  {
    "category": "vocabulary",
    "front": "示す",
    "back": "to show, to point out",
    "exampleJp": "グラフは、昨年の売り上げが減少していることを示している。",
    "exampleTranslation": "The graph shows that sales decreased last year.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0138"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 138
  },
  {
    "category": "vocabulary",
    "front": "しゃがむ",
    "back": "to squat, to crouch",
    "exampleJp": "道に落ちていたコインを拾うためにしゃがんだ。",
    "exampleTranslation": "I squatted down to pick up a coin dropped on the road.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0139"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 139
  },
  {
    "category": "vocabulary",
    "front": "優れる",
    "back": "to excel, to surpass",
    "exampleJp": "彼女は語学の才能に優れており、三カ国語を話せる。",
    "exampleTranslation": "She excels in linguistic talent and can speak three languages.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0140"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 140
  },
  {
    "category": "vocabulary",
    "front": "過ごす",
    "back": "to spend (time)",
    "exampleJp": "週末は家族と一緒にのんびりと過ごすことが多い。",
    "exampleTranslation": "I often spend my weekends relaxing with my family.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0141"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 141
  },
  {
    "category": "vocabulary",
    "front": "救う",
    "back": "to rescue, to save",
    "exampleJp": "新しい治療法が、多くの患者の命を救うかもしれない。",
    "exampleTranslation": "The new treatment might save the lives of many patients.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0142"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 142
  },
  {
    "category": "vocabulary",
    "front": "防ぐ",
    "back": "to prevent, to defend against",
    "exampleJp": "風邪を防ぐために、外から帰ったらうがいをしてください。",
    "exampleTranslation": "To prevent catching a cold, please gargle when returning from outside.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0143"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 143
  },
  {
    "category": "vocabulary",
    "front": "含む",
    "back": "to contain, to include",
    "exampleJp": "この料金には、朝食代と消費税が含まれています。",
    "exampleTranslation": "This fee includes the cost of breakfast and consumption tax.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0144"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 144
  },
  {
    "category": "vocabulary",
    "front": "増やす",
    "back": "to increase, to add to",
    "exampleJp": "健康のために、野菜を食べる量を増やそうと思う。",
    "exampleTranslation": "For my health, I am thinking of increasing the amount of vegetables I eat.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0145"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 145
  },
  {
    "category": "vocabulary",
    "front": "震える",
    "back": "to shiver, to shake, to tremble",
    "exampleJp": "あまりの寒さに、全身がブルブルと震えた。",
    "exampleTranslation": "My whole body was shivering from the extreme cold.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0146"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 146
  },
  {
    "category": "vocabulary",
    "front": "触れる",
    "back": "to touch, to feel",
    "exampleJp": "美術館の作品には、絶対に手を触れないでください。",
    "exampleTranslation": "Please absolutely do not touch the artworks in the museum.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0147"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 147
  },
  {
    "category": "vocabulary",
    "front": "減る",
    "back": "to decrease",
    "exampleJp": "少子化の影響で、日本の人口は少しずつ減っている。",
    "exampleTranslation": "Due to the declining birthrate, Japan's population is gradually decreasing.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0148"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 148
  },
  {
    "category": "vocabulary",
    "front": "吠える",
    "back": "to bark, to howl",
    "exampleJp": "見知らぬ人が近づくと、飼い犬が激しく吠え始めた。",
    "exampleTranslation": "When a stranger approached, the pet dog began to bark fiercely.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0149"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 149
  },
  {
    "category": "vocabulary",
    "front": "干す",
    "back": "to dry, to air",
    "exampleJp": "晴れた日は、布団を外に干すと気持ちがいいです。",
    "exampleTranslation": "On sunny days, it feels great to dry the futon outside.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0150"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 150
  },
  {
    "category": "vocabulary",
    "front": "掘る",
    "back": "to dig, to excavate",
    "exampleJp": "遺跡から、古い時代の土器が掘り出された。",
    "exampleTranslation": "Earthenware from an ancient era was excavated from the ruins.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0151"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 151
  },
  {
    "category": "vocabulary",
    "front": "任せる",
    "back": "to entrust, to leave to",
    "exampleJp": "この仕事は君に任せるから、自由にやってみてくれ。",
    "exampleTranslation": "I am entrusting this work to you, so try doing it freely.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0152"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 152
  },
  {
    "category": "vocabulary",
    "front": "招く",
    "back": "to invite, to beckon, to cause",
    "exampleJp": "不用意な発言が、大きな誤解を招くこともある。",
    "exampleTranslation": "Careless remarks can sometimes cause major misunderstandings.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0153"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 153
  },
  {
    "category": "vocabulary",
    "front": "守る",
    "back": "to protect, to keep (rules)",
    "exampleJp": "交通ルールをしっかり守って、安全に運転しましょう。",
    "exampleTranslation": "Let's strictly follow the traffic rules and drive safely.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0154"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 154
  },
  {
    "category": "vocabulary",
    "front": "迷う",
    "back": "to get lost, to hesitate",
    "exampleJp": "二つの靴のどちらを買うか、ずっと迷っています。",
    "exampleTranslation": "I have been hesitating for a long time over which of the two shoes to buy.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0155"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 155
  },
  {
    "category": "vocabulary",
    "front": "認める",
    "back": "to recognize, to admit, to approve",
    "exampleJp": "彼は自分のミスを素直に認めて、謝罪した。",
    "exampleTranslation": "He honestly admitted his mistake and apologized.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0156"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 156
  },
  {
    "category": "vocabulary",
    "front": "向く",
    "back": "to face, to turn toward, to be suited for",
    "exampleJp": "この仕事は細かい作業が多いので、私には向いていない。",
    "exampleTranslation": "This job involves a lot of detailed work, so it's not suited for me.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0157"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 157
  },
  {
    "category": "vocabulary",
    "front": "結ぶ",
    "back": "to tie, to bind, to link",
    "exampleJp": "靴のひもがほどけないように、しっかり結んだ。",
    "exampleTranslation": "I tied my shoelaces tightly so they wouldn't come undone.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0158"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 158
  },
  {
    "category": "vocabulary",
    "front": "燃える",
    "back": "to burn, to get fired up",
    "exampleJp": "乾燥した空気のせいで、山火事が激しく燃え広がった。",
    "exampleTranslation": "Because of the dry air, the forest fire burned and spread fiercely.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0159"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 159
  },
  {
    "category": "vocabulary",
    "front": "用いる",
    "back": "to use, to make use of",
    "exampleJp": "このシステムでは、最新のAI技術が用いられている。",
    "exampleTranslation": "The latest AI technology is utilized in this system.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0160"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 160
  },
  {
    "category": "vocabulary",
    "front": "戻す",
    "back": "to return, to put back",
    "exampleJp": "読み終わった本は、元の場所に戻してください。",
    "exampleTranslation": "Please return the book to its original place when you finish reading it.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0161"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 161
  },
  {
    "category": "vocabulary",
    "front": "破る",
    "back": "to tear, to break (a promise/rule)",
    "exampleJp": "いらない書類をビリビリに破って捨てた。",
    "exampleTranslation": "I tore up the unneeded documents into pieces and threw them away.",
    "tags": [
      "n3",
      "vocabulary",
      "verb"
    ],
    "sourceIds": [
      "n3-vocab-0162"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 162
  },
  {
    "category": "vocabulary",
    "front": "思い出す",
    "back": "to remember, to recall",
    "exampleJp": "あの曲を聴くと、高校時代の楽しかった日々を思い出す。",
    "exampleTranslation": "Hearing that song reminds me of my fun high school days.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0163"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 163
  },
  {
    "category": "vocabulary",
    "front": "思いつく",
    "back": "to think of, to hit upon",
    "exampleJp": "散歩している時に、素晴らしい企画のアイデアを思いついた。",
    "exampleTranslation": "While taking a walk, I hit upon a wonderful idea for a project.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0164"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 164
  },
  {
    "category": "vocabulary",
    "front": "引き受ける",
    "back": "to take on, to undertake",
    "exampleJp": "忙しいのは分かっていたが、その重要な仕事を引き受けた。",
    "exampleTranslation": "I knew I would be busy, but I took on that important job.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0165"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 165
  },
  {
    "category": "vocabulary",
    "front": "引き返す",
    "back": "to turn back",
    "exampleJp": "忘れ物に気づいて、慌てて家まで引き返した。",
    "exampleTranslation": "Noticing I forgot something, I hurriedly turned back to the house.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0166"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 166
  },
  {
    "category": "vocabulary",
    "front": "受け取る",
    "back": "to receive, to accept",
    "exampleJp": "昨日、海外の友人から届いた小包を受け取りました。",
    "exampleTranslation": "Yesterday, I received a parcel that arrived from a friend overseas.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0167"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 167
  },
  {
    "category": "vocabulary",
    "front": "受け入れる",
    "back": "to accept, to receive (people/ideas)",
    "exampleJp": "新しい職場のルールを、少しずつ受け入れる努力をしている。",
    "exampleTranslation": "I am making an effort to gradually accept the rules of my new workplace.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0168"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 168
  },
  {
    "category": "vocabulary",
    "front": "言い返す",
    "back": "to talk back, to retort",
    "exampleJp": "上司の理不尽な命令に、思わず言い返してしまった。",
    "exampleTranslation": "I accidentally talked back to my boss's unreasonable orders.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0169"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 169
  },
  {
    "category": "vocabulary",
    "front": "言い直す",
    "back": "to correct oneself, to rephrase",
    "exampleJp": "自分の説明が分かりにくいと気づき、彼は言葉を言い直した。",
    "exampleTranslation": "Realizing his explanation was hard to understand, he rephrased his words.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0170"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 170
  },
  {
    "category": "vocabulary",
    "front": "見直す",
    "back": "to review, to reconsider",
    "exampleJp": "テストを提出する前に、もう一度間違いがないか見直してください。",
    "exampleTranslation": "Before submitting the test, please review it one more time for mistakes.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0171"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 171
  },
  {
    "category": "vocabulary",
    "front": "見送る",
    "back": "to see off, to let pass",
    "exampleJp": "空港まで行って、留学する友人を見送りました。",
    "exampleTranslation": "I went to the airport and saw off my friend who is going to study abroad.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0172"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 172
  },
  {
    "category": "vocabulary",
    "front": "見かける",
    "back": "to happen to see, to notice",
    "exampleJp": "昨日、駅前のカフェで偶然先生を見かけた。",
    "exampleTranslation": "Yesterday, I happened to see my teacher at the cafe in front of the station.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0173"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 173
  },
  {
    "category": "vocabulary",
    "front": "取り消す",
    "back": "to cancel",
    "exampleJp": "急用ができたので、明日のレストランの予約を取り消した。",
    "exampleTranslation": "Because urgent business came up, I canceled tomorrow's restaurant reservation.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0174"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 174
  },
  {
    "category": "vocabulary",
    "front": "取り上げる",
    "back": "to take up, to feature, to confiscate",
    "exampleJp": "ニュース番組で、その社会問題が大きく取り上げられた。",
    "exampleTranslation": "That social issue was featured heavily on the news program.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0175"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 175
  },
  {
    "category": "vocabulary",
    "front": "売り切れる",
    "back": "to be sold out",
    "exampleJp": "人気歌手のコンサートチケットは、発売後すぐに売り切れた。",
    "exampleTranslation": "The popular singer's concert tickets sold out immediately after release.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0176"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 176
  },
  {
    "category": "vocabulary",
    "front": "乗り遅れる",
    "back": "to miss (a train, bus, etc.)",
    "exampleJp": "寝坊してしまい、いつもの通勤電車に乗り遅れた。",
    "exampleTranslation": "I overslept and missed my usual commuter train.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0177"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 177
  },
  {
    "category": "vocabulary",
    "front": "乗り越える",
    "back": "to overcome, to get over",
    "exampleJp": "チーム全員で協力して、大きな困難を乗り越えることができた。",
    "exampleTranslation": "By cooperating together, the entire team was able to overcome the great difficulty.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0178"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 178
  },
  {
    "category": "vocabulary",
    "front": "追いかける",
    "back": "to chase, to run after",
    "exampleJp": "犬が猫を追いかけて、庭を走り回っている。",
    "exampleTranslation": "The dog is chasing the cat, running around the yard.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0179"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 179
  },
  {
    "category": "vocabulary",
    "front": "追いつく",
    "back": "to catch up",
    "exampleJp": "少し遅れたが、走って前のグループに追いついた。",
    "exampleTranslation": "I was a little behind, but I ran and caught up to the group in front.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0180"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 180
  },
  {
    "category": "vocabulary",
    "front": "落ち着く",
    "back": "to calm down, to settle down",
    "exampleJp": "緊張していたが、深呼吸をしたら少し落ち着いた。",
    "exampleTranslation": "I was nervous, but after taking a deep breath I calmed down a bit.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0181"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 181
  },
  {
    "category": "vocabulary",
    "front": "飛び出す",
    "back": "to jump out, to rush out",
    "exampleJp": "急に子供が道路に飛び出してきて、ヒヤッとした。",
    "exampleTranslation": "A child suddenly rushed out into the road, and it scared me.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0182"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 182
  },
  {
    "category": "vocabulary",
    "front": "立ち上がる",
    "back": "to stand up, to rise, to recover",
    "exampleJp": "議長が入室すると、参加者全員が一斉に立ち上がった。",
    "exampleTranslation": "When the chairperson entered the room, all attendees stood up at once.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0183"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 183
  },
  {
    "category": "vocabulary",
    "front": "立ち止まる",
    "back": "to stop (walking), to halt",
    "exampleJp": "ショーウィンドウの素敵な服に目を奪われ、思わず立ち止まった。",
    "exampleTranslation": "Captivated by the lovely clothes in the shop window, I unconsciously stopped walking.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0184"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 184
  },
  {
    "category": "vocabulary",
    "front": "作り出す",
    "back": "to produce, to create",
    "exampleJp": "この工場では、毎日何千個もの製品を作り出している。",
    "exampleTranslation": "This factory produces thousands of products every day.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0185"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 185
  },
  {
    "category": "vocabulary",
    "front": "話し合う",
    "back": "to discuss, to talk over",
    "exampleJp": "今後の経営戦略について、役員同士で夜遅くまで話し合った。",
    "exampleTranslation": "The executives discussed the future business strategy until late at night.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0186"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 186
  },
  {
    "category": "vocabulary",
    "front": "払い戻す",
    "back": "to refund, to pay back",
    "exampleJp": "イベントが中止になったため、チケット代が払い戻された。",
    "exampleTranslation": "Since the event was canceled, the ticket price was refunded.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0187"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 187
  },
  {
    "category": "vocabulary",
    "front": "引き出す",
    "back": "to withdraw, to pull out",
    "exampleJp": "家賃を払うために、銀行のATMで現金を引き出した。",
    "exampleTranslation": "I withdrew cash at the bank's ATM to pay rent.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0188"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 188
  },
  {
    "category": "vocabulary",
    "front": "冷やす",
    "back": "to cool, to chill",
    "exampleJp": "ビールを冷蔵庫でよく冷やしてから飲みましょう。",
    "exampleTranslation": "Let's chill the beer well in the fridge before drinking it.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0189"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 189
  },
  {
    "category": "vocabulary",
    "front": "呼び出す",
    "back": "to summon, to call out",
    "exampleJp": "社長に突然部屋に呼び出されて、とても緊張した。",
    "exampleTranslation": "I was suddenly summoned to the president's room, and I was very nervous.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0190"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 190
  },
  {
    "category": "vocabulary",
    "front": "通り過ぎる",
    "back": "to pass by, to go past",
    "exampleJp": "考え事をしていて、降りるはずの駅を通り過ぎてしまった。",
    "exampleTranslation": "I was lost in thought and passed by the station where I was supposed to get off.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0191"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 191
  },
  {
    "category": "vocabulary",
    "front": "通りかかる",
    "back": "to happen to pass by",
    "exampleJp": "たまたま通りかかった人が、倒れている人を助けた。",
    "exampleTranslation": "A person who happened to pass by helped the person who had collapsed.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0192"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 192
  },
  {
    "category": "vocabulary",
    "front": "やり直す",
    "back": "to do over, to start again",
    "exampleJp": "途中で計算を間違えたので、最初からやり直した。",
    "exampleTranslation": "I made a calculation mistake halfway through, so I started over from the beginning.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0193"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 193
  },
  {
    "category": "vocabulary",
    "front": "近づく",
    "back": "to approach, to get closer",
    "exampleJp": "試験の日が近づくにつれて、学生たちの顔が真剣になってきた。",
    "exampleTranslation": "As the exam day approached, the students' faces became more serious.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0194"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 194
  },
  {
    "category": "vocabulary",
    "front": "書き直す",
    "back": "to rewrite",
    "exampleJp": "先生の指摘を受けて、レポートの結論部分を書き直した。",
    "exampleTranslation": "Following the teacher's feedback, I rewrote the conclusion section of the report.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0195"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 195
  },
  {
    "category": "vocabulary",
    "front": "着替える",
    "back": "to change clothes",
    "exampleJp": "汗をかいたので、シャワーを浴びて綺麗な服に着替えた。",
    "exampleTranslation": "Because I sweated, I took a shower and changed into clean clothes.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0196"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 196
  },
  {
    "category": "vocabulary",
    "front": "仕上がる",
    "back": "to be completed, to be finished",
    "exampleJp": "徹夜の作業のおかげで、立派なプレゼン資料が仕上がった。",
    "exampleTranslation": "Thanks to working all night, an excellent presentation document was completed.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0197"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 197
  },
  {
    "category": "vocabulary",
    "front": "目立つ",
    "back": "to stand out, to be conspicuous",
    "exampleJp": "彼女は赤いコートを着ていたので、群衆の中でもよく目立っていた。",
    "exampleTranslation": "Because she was wearing a red coat, she stood out well even in the crowd.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0198"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 198
  },
  {
    "category": "vocabulary",
    "front": "申し込む",
    "back": "to apply for",
    "exampleJp": "インターネットで、来月の資格試験に申し込んだ。",
    "exampleTranslation": "I applied online for next month's certification exam.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0199"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 199
  },
  {
    "category": "vocabulary",
    "front": "盛り上がる",
    "back": "to get excited, to swell, to rise",
    "exampleJp": "昨日の飲み会は、昔話に花が咲いて大いに盛り上がった。",
    "exampleTranslation": "Yesterday's drinking party got really exciting as we enthusiastically talked about old times.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0200"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 200
  },
  {
    "category": "vocabulary",
    "front": "張り切る",
    "back": "to be eager, to be full of enthusiasm",
    "exampleJp": "新入社員たちは、初めてのプロジェクトに張り切って取り組んでいる。",
    "exampleTranslation": "The new employees are tackling their first project with great enthusiasm.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0201"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 201
  },
  {
    "category": "vocabulary",
    "front": "引っ越す",
    "back": "to move (house)",
    "exampleJp": "通勤時間を短くするために、会社の近くのマンションに引っ越した。",
    "exampleTranslation": "To shorten my commute time, I moved to an apartment near the company.",
    "tags": [
      "n3",
      "vocabulary",
      "verb",
      "compound-verb"
    ],
    "sourceIds": [
      "n3-vocab-0202"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 202
  },
  {
    "category": "vocabulary",
    "front": "厚い",
    "back": "thick (for flat objects), kind, cordial",
    "exampleJp": "寒い日は、もっと厚いコートを着たほうがいいですよ。",
    "exampleTranslation": "On cold days, it's better to wear a thicker coat.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "i-adj"
    ],
    "sourceIds": [
      "n3-vocab-0203"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 203
  },
  {
    "category": "vocabulary",
    "front": "浅い",
    "back": "shallow, superficial",
    "exampleJp": "この川は浅いので、子供が遊んでも安全です。",
    "exampleTranslation": "This river is shallow, so it's safe for children to play in.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "i-adj"
    ],
    "sourceIds": [
      "n3-vocab-0204"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 204
  },
  {
    "category": "vocabulary",
    "front": "惜しい",
    "back": "regrettable, precious, close (but not quite)",
    "exampleJp": "あと一点で合格だったのに、本当に惜しかったね。",
    "exampleTranslation": "You were only one point away from passing; it was really so close.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "i-adj"
    ],
    "sourceIds": [
      "n3-vocab-0205"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 205
  },
  {
    "category": "vocabulary",
    "front": "恐ろしい",
    "back": "terrifying, frightening",
    "exampleJp": "昨夜見たホラー映画は、今までで一番恐ろしかった。",
    "exampleTranslation": "The horror movie I watched last night was the most terrifying one yet.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "i-adj"
    ],
    "sourceIds": [
      "n3-vocab-0206"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 206
  },
  {
    "category": "vocabulary",
    "front": "大人しい",
    "back": "quiet, gentle, obedient",
    "exampleJp": "彼は普段とても大人しいが、怒ると怖いらしい。",
    "exampleTranslation": "He is usually very quiet, but I hear he is scary when angry.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "i-adj"
    ],
    "sourceIds": [
      "n3-vocab-0207"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 207
  },
  {
    "category": "vocabulary",
    "front": "賢い",
    "back": "wise, clever, smart",
    "exampleJp": "この犬はとても賢くて、いくつかのお手やおかわりができる。",
    "exampleTranslation": "This dog is very smart and can do several tricks like 'paw' and 'other paw'.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "i-adj"
    ],
    "sourceIds": [
      "n3-vocab-0208"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 208
  },
  {
    "category": "vocabulary",
    "front": "硬い・固い",
    "back": "hard, solid, stiff",
    "exampleJp": "このパンは古くなって、石のように硬くなってしまった。",
    "exampleTranslation": "This bread got old and has become as hard as a rock.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "i-adj"
    ],
    "sourceIds": [
      "n3-vocab-0209"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 209
  },
  {
    "category": "vocabulary",
    "front": "きつい",
    "back": "tight, tough, harsh",
    "exampleJp": "少し太ったせいで、ズボンのお腹のあたりがきつい。",
    "exampleTranslation": "Because I gained a little weight, my pants are tight around the stomach.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "i-adj"
    ],
    "sourceIds": [
      "n3-vocab-0210"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 210
  },
  {
    "category": "vocabulary",
    "front": "臭い",
    "back": "smelly, stinky",
    "exampleJp": "生ゴミを出し忘れたので、キッチンが少し臭い。",
    "exampleTranslation": "I forgot to take out the raw garbage, so the kitchen is a bit smelly.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "i-adj"
    ],
    "sourceIds": [
      "n3-vocab-0211"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 211
  },
  {
    "category": "vocabulary",
    "front": "詳しい",
    "back": "detailed, knowledgeable",
    "exampleJp": "彼女は日本の歴史について、とても詳しい知識を持っている。",
    "exampleTranslation": "She possesses very detailed knowledge about Japanese history.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "i-adj"
    ],
    "sourceIds": [
      "n3-vocab-0212"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 212
  },
  {
    "category": "vocabulary",
    "front": "悔しい",
    "back": "frustrating, regrettable",
    "exampleJp": "決勝戦で負けてしまい、悔しくて涙が出た。",
    "exampleTranslation": "I lost in the finals, and I cried out of sheer frustration.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "i-adj"
    ],
    "sourceIds": [
      "n3-vocab-0213"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 213
  },
  {
    "category": "vocabulary",
    "front": "険しい",
    "back": "steep, rugged, grim",
    "exampleJp": "頂上へ続く道は険しく、登るのに予想以上の時間がかかった。",
    "exampleTranslation": "The path to the summit was steep, and it took more time than expected to climb.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "i-adj"
    ],
    "sourceIds": [
      "n3-vocab-0214"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 214
  },
  {
    "category": "vocabulary",
    "front": "濃い",
    "back": "thick, dark, rich (flavor)",
    "exampleJp": "私はいつも、朝に濃いコーヒーを一杯飲むことにしている。",
    "exampleTranslation": "I always make it a rule to drink a cup of strong coffee in the morning.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "i-adj"
    ],
    "sourceIds": [
      "n3-vocab-0215"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 215
  },
  {
    "category": "vocabulary",
    "front": "親しい",
    "back": "close, intimate",
    "exampleJp": "彼とは大学時代から親しい友人の一人だ。",
    "exampleTranslation": "He has been one of my close friends since my university days.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "i-adj"
    ],
    "sourceIds": [
      "n3-vocab-0216"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 216
  },
  {
    "category": "vocabulary",
    "front": "鋭い",
    "back": "sharp, acute",
    "exampleJp": "彼は鋭い質問をして、会議の空気を一変させた。",
    "exampleTranslation": "He asked a sharp question and completely changed the atmosphere of the meeting.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "i-adj"
    ],
    "sourceIds": [
      "n3-vocab-0217"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 217
  },
  {
    "category": "vocabulary",
    "front": "ずるい",
    "back": "sly, unfair, dishonest",
    "exampleJp": "自分だけ楽をしようとするのはずるいと思う。",
    "exampleTranslation": "I think trying to take it easy all by yourself is unfair.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "i-adj"
    ],
    "sourceIds": [
      "n3-vocab-0218"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 218
  },
  {
    "category": "vocabulary",
    "front": "とんでもない",
    "back": "unthinkable, outrageous, not at all",
    "exampleJp": "一日でこの量を終わらせるなんて、とんでもない要求だ。",
    "exampleTranslation": "Demanding that we finish this amount in one day is an outrageous request.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "i-adj"
    ],
    "sourceIds": [
      "n3-vocab-0219"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 219
  },
  {
    "category": "vocabulary",
    "front": "憎らしい",
    "back": "hateful, odious, spiteful",
    "exampleJp": "あの態度は本当に憎らしいが、実力があるのは確かだ。",
    "exampleTranslation": "That attitude is truly hateful, but it is certain that he has talent.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "i-adj"
    ],
    "sourceIds": [
      "n3-vocab-0220"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 220
  },
  {
    "category": "vocabulary",
    "front": "鈍い",
    "back": "dull, sluggish",
    "exampleJp": "この包丁は刃が鈍くなっていて、トマトがうまく切れない。",
    "exampleTranslation": "The blade of this knife has become dull, so it doesn't cut tomatoes well.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "i-adj"
    ],
    "sourceIds": [
      "n3-vocab-0221"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 221
  },
  {
    "category": "vocabulary",
    "front": "激しい",
    "back": "violent, intense, fierce",
    "exampleJp": "午後から激しい雨が降り出し、イベントは中止になった。",
    "exampleTranslation": "Intense rain started falling from the afternoon, and the event was canceled.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "i-adj"
    ],
    "sourceIds": [
      "n3-vocab-0222"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 222
  },
  {
    "category": "vocabulary",
    "front": "深い",
    "back": "deep, profound",
    "exampleJp": "この池はとても深いので、泳ぐのは危険です。",
    "exampleTranslation": "This pond is very deep, so swimming in it is dangerous.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "i-adj"
    ],
    "sourceIds": [
      "n3-vocab-0223"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 223
  },
  {
    "category": "vocabulary",
    "front": "細い",
    "back": "thin, slender, fine",
    "exampleJp": "彼女の指は細くて長く、ピアノを弾くのに向いている。",
    "exampleTranslation": "Her fingers are thin and long, which are suited for playing the piano.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "i-adj"
    ],
    "sourceIds": [
      "n3-vocab-0224"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 224
  },
  {
    "category": "vocabulary",
    "front": "眩しい",
    "back": "dazzling, radiant",
    "exampleJp": "夏の太陽が眩しくて、サングラスなしでは歩けない。",
    "exampleTranslation": "The summer sun is so dazzling that I cannot walk without sunglasses.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "i-adj"
    ],
    "sourceIds": [
      "n3-vocab-0225"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 225
  },
  {
    "category": "vocabulary",
    "front": "もったいない",
    "back": "wasteful",
    "exampleJp": "食べ物をそんなに残すなんて、もったいないですよ。",
    "exampleTranslation": "Leaving that much food behind is so wasteful.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "i-adj"
    ],
    "sourceIds": [
      "n3-vocab-0226"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 226
  },
  {
    "category": "vocabulary",
    "front": "緩い",
    "back": "loose, lax",
    "exampleJp": "靴の紐が緩いと、転びやすくなるので気をつけてください。",
    "exampleTranslation": "If your shoelaces are loose, it becomes easy to trip, so please be careful.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "i-adj"
    ],
    "sourceIds": [
      "n3-vocab-0227"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 227
  },
  {
    "category": "vocabulary",
    "front": "若々しい",
    "back": "youthful",
    "exampleJp": "私の祖母はもう八十歳ですが、肌がつややかで若々しいです。",
    "exampleTranslation": "My grandmother is already 80, but her skin is glowing and she looks very youthful.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "i-adj"
    ],
    "sourceIds": [
      "n3-vocab-0228"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 228
  },
  {
    "category": "vocabulary",
    "front": "曖昧な",
    "back": "vague, ambiguous",
    "exampleJp": "彼の返事はいつも曖昧で、賛成なのか反対なのか分からない。",
    "exampleTranslation": "His replies are always vague, so I don't know if he agrees or disagrees.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "na-adj"
    ],
    "sourceIds": [
      "n3-vocab-0229"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 229
  },
  {
    "category": "vocabulary",
    "front": "明らかな",
    "back": "clear, obvious",
    "exampleJp": "二つのデータを見比べれば、その差は明らかだ。",
    "exampleTranslation": "If you compare the two sets of data, the difference is obvious.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "na-adj"
    ],
    "sourceIds": [
      "n3-vocab-0230"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 230
  },
  {
    "category": "vocabulary",
    "front": "新たな",
    "back": "new, fresh",
    "exampleJp": "社長が代わり、新たな経営方針が発表された。",
    "exampleTranslation": "The president was replaced, and a new management policy was announced.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "na-adj"
    ],
    "sourceIds": [
      "n3-vocab-0231"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 231
  },
  {
    "category": "vocabulary",
    "front": "意外な",
    "back": "unexpected, surprising",
    "exampleJp": "彼がピアノを上手に弾けるとは、意外な事実だった。",
    "exampleTranslation": "The fact that he can play the piano well was an unexpected truth.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "na-adj"
    ],
    "sourceIds": [
      "n3-vocab-0232"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 232
  },
  {
    "category": "vocabulary",
    "front": "偉大な",
    "back": "great, grand",
    "exampleJp": "アインシュタインは物理学において偉大な業績を残した。",
    "exampleTranslation": "Einstein left behind great achievements in the field of physics.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "na-adj"
    ],
    "sourceIds": [
      "n3-vocab-0233"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 233
  },
  {
    "category": "vocabulary",
    "front": "確かな",
    "back": "certain, reliable",
    "exampleJp": "彼の情報源は確かなので、信用しても大丈夫です。",
    "exampleTranslation": "His information source is reliable, so it is safe to trust him.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "na-adj"
    ],
    "sourceIds": [
      "n3-vocab-0234"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 234
  },
  {
    "category": "vocabulary",
    "front": "勝手な",
    "back": "selfish, arbitrary, one's own convenience",
    "exampleJp": "周りの意見を聞かずに勝手な行動をとってはいけない。",
    "exampleTranslation": "You must not take selfish actions without listening to the opinions of those around you.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "na-adj"
    ],
    "sourceIds": [
      "n3-vocab-0235"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 235
  },
  {
    "category": "vocabulary",
    "front": "可能な",
    "back": "possible",
    "exampleJp": "できるだけ早い時期でのご対応が可能な方はお知らせください。",
    "exampleTranslation": "Please let us know if you are able to respond at the earliest possible time.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "na-adj"
    ],
    "sourceIds": [
      "n3-vocab-0236"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 236
  },
  {
    "category": "vocabulary",
    "front": "かわいそうな",
    "back": "pitiful, pathetic, poor",
    "exampleJp": "雨の中で震えている子猫を見て、かわいそうに思った。",
    "exampleTranslation": "Seeing the kitten shivering in the rain, I felt pitiful for it.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "na-adj"
    ],
    "sourceIds": [
      "n3-vocab-0237"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 237
  },
  {
    "category": "vocabulary",
    "front": "完全な",
    "back": "perfect, complete",
    "exampleJp": "長期間の治療を経て、彼の怪我は完全に治った。",
    "exampleTranslation": "After long-term treatment, his injury has completely healed.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "na-adj"
    ],
    "sourceIds": [
      "n3-vocab-0238"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 238
  },
  {
    "category": "vocabulary",
    "front": "基本な・基本的な",
    "back": "basic, fundamental",
    "exampleJp": "プログラミングを学ぶ前に、基本的な概念を理解する必要がある。",
    "exampleTranslation": "Before learning programming, you need to understand the fundamental concepts.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "na-adj"
    ],
    "sourceIds": [
      "n3-vocab-0239"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 239
  },
  {
    "category": "vocabulary",
    "front": "急な",
    "back": "sudden, urgent, steep",
    "exampleJp": "急な階段を登ったので、少し息が切れてしまった。",
    "exampleTranslation": "Because I climbed a steep staircase, I was slightly out of breath.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "na-adj"
    ],
    "sourceIds": [
      "n3-vocab-0240"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 240
  },
  {
    "category": "vocabulary",
    "front": "器用な",
    "back": "skillful, handy",
    "exampleJp": "彼は手先が器用で、どんな壊れた時計でも直してしまう。",
    "exampleTranslation": "He is very handy and can fix any broken clock.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "na-adj"
    ],
    "sourceIds": [
      "n3-vocab-0241"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 241
  },
  {
    "category": "vocabulary",
    "front": "巨大な",
    "back": "huge, gigantic",
    "exampleJp": "砂漠の真ん中に、巨大なピラミッドがそびえ立っていた。",
    "exampleTranslation": "A gigantic pyramid towered in the middle of the desert.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "na-adj"
    ],
    "sourceIds": [
      "n3-vocab-0242"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 242
  },
  {
    "category": "vocabulary",
    "front": "下等な・くだらない",
    "back": "worthless, stupid (くだらない)",
    "exampleJp": "くだらない冗談ばかり言っていないで、真面目に仕事をして。",
    "exampleTranslation": "Stop telling worthless jokes and take your work seriously.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "i-adj"
    ],
    "sourceIds": [
      "n3-vocab-0243"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 243
  },
  {
    "category": "vocabulary",
    "front": "結構な",
    "back": "splendid, enough, sufficient",
    "exampleJp": "「お茶のおかわりはいかがですか」「いえ、もう結構です」",
    "exampleTranslation": "'Would you like a refill of tea?' 'No, I'm fine, thank you.'",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "na-adj"
    ],
    "sourceIds": [
      "n3-vocab-0244"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 244
  },
  {
    "category": "vocabulary",
    "front": "豪華な",
    "back": "luxurious, gorgeous",
    "exampleJp": "パーティーの会場には、豪華な食事が並べられていた。",
    "exampleTranslation": "Luxurious food was laid out at the party venue.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "na-adj"
    ],
    "sourceIds": [
      "n3-vocab-0245"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 245
  },
  {
    "category": "vocabulary",
    "front": "様々な",
    "back": "various, diverse",
    "exampleJp": "この図書館には、様々な分野の専門書が揃っている。",
    "exampleTranslation": "This library is stocked with specialized books in various fields.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "na-adj"
    ],
    "sourceIds": [
      "n3-vocab-0246"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 246
  },
  {
    "category": "vocabulary",
    "front": "自然な",
    "back": "natural",
    "exampleJp": "面接では緊張しすぎず、自然な笑顔を心がけてください。",
    "exampleTranslation": "During the interview, try not to be too nervous and aim for a natural smile.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "na-adj"
    ],
    "sourceIds": [
      "n3-vocab-0247"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 247
  },
  {
    "category": "vocabulary",
    "front": "邪魔な",
    "back": "in the way, hindering",
    "exampleJp": "廊下の真ん中に大きな段ボールがあって、とても邪魔だ。",
    "exampleTranslation": "There's a large cardboard box in the middle of the hallway, and it's very much in the way.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "na-adj"
    ],
    "sourceIds": [
      "n3-vocab-0248"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 248
  },
  {
    "category": "vocabulary",
    "front": "重要な",
    "back": "important, crucial",
    "exampleJp": "明日は重要な会議があるので、絶対に遅刻できません。",
    "exampleTranslation": "I have a crucial meeting tomorrow, so I absolutely cannot be late.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "na-adj"
    ],
    "sourceIds": [
      "n3-vocab-0249"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 249
  },
  {
    "category": "vocabulary",
    "front": "正直な",
    "back": "honest, frank",
    "exampleJp": "彼は正直な性格で、決して嘘をつくような人ではない。",
    "exampleTranslation": "He has an honest personality and is definitely not the type of person to lie.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "na-adj"
    ],
    "sourceIds": [
      "n3-vocab-0250"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 250
  },
  {
    "category": "vocabulary",
    "front": "慎重な",
    "back": "careful, cautious",
    "exampleJp": "大きな投資をする前には、慎重な判断が求められる。",
    "exampleTranslation": "Before making a large investment, careful judgment is required.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "na-adj"
    ],
    "sourceIds": [
      "n3-vocab-0251"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 251
  },
  {
    "category": "vocabulary",
    "front": "親切な",
    "back": "kind, helpful",
    "exampleJp": "道に迷っていたら、親切な人が駅まで案内してくれた。",
    "exampleTranslation": "When I was lost, a kind person guided me to the station.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "na-adj"
    ],
    "sourceIds": [
      "n3-vocab-0252"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 252
  },
  {
    "category": "vocabulary",
    "front": "清潔な",
    "back": "clean, hygienic",
    "exampleJp": "レストランのトイレは、常に清潔に保たれているべきだ。",
    "exampleTranslation": "A restaurant's restrooms should always be kept clean.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "na-adj"
    ],
    "sourceIds": [
      "n3-vocab-0253"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 253
  },
  {
    "category": "vocabulary",
    "front": "退屈な",
    "back": "boring, dull",
    "exampleJp": "昨日の講義はあまりにも退屈で、途中で眠ってしまった。",
    "exampleTranslation": "Yesterday's lecture was so boring that I fell asleep halfway through.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "na-adj"
    ],
    "sourceIds": [
      "n3-vocab-0254"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 254
  },
  {
    "category": "vocabulary",
    "front": "妥当な",
    "back": "proper, appropriate, reasonable",
    "exampleJp": "この商品の品質を考えれば、三千円という価格は妥当だろう。",
    "exampleTranslation": "Considering the quality of this product, the price of 3,000 yen is probably reasonable.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "na-adj"
    ],
    "sourceIds": [
      "n3-vocab-0255"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 255
  },
  {
    "category": "vocabulary",
    "front": "単純な",
    "back": "simple, straightforward",
    "exampleJp": "その機械の仕組みは意外と単純で、誰でも修理できる。",
    "exampleTranslation": "The mechanism of that machine is surprisingly simple, so anyone can repair it.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "na-adj"
    ],
    "sourceIds": [
      "n3-vocab-0256"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 256
  },
  {
    "category": "vocabulary",
    "front": "手軽な",
    "back": "easy, handy, convenient",
    "exampleJp": "コンビニでは、手軽に食べられるサンドイッチがよく売れる。",
    "exampleTranslation": "At convenience stores, easily edible sandwiches sell well.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "na-adj"
    ],
    "sourceIds": [
      "n3-vocab-0257"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 257
  },
  {
    "category": "vocabulary",
    "front": "独特な",
    "back": "unique, peculiar",
    "exampleJp": "この地方には、独特な文化や風習が今も残っている。",
    "exampleTranslation": "Unique culture and customs still remain in this region.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "na-adj"
    ],
    "sourceIds": [
      "n3-vocab-0258"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 258
  },
  {
    "category": "vocabulary",
    "front": "特別な",
    "back": "special, particular",
    "exampleJp": "明日は彼女の誕生日なので、特別なディナーを予約した。",
    "exampleTranslation": "Tomorrow is her birthday, so I booked a special dinner.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "na-adj"
    ],
    "sourceIds": [
      "n3-vocab-0259"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 259
  },
  {
    "category": "vocabulary",
    "front": "派手な",
    "back": "showy, flashy",
    "exampleJp": "面接の時は、派手な服装やメイクは避けたほうがいい。",
    "exampleTranslation": "It is better to avoid flashy clothes and makeup during an interview.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "na-adj"
    ],
    "sourceIds": [
      "n3-vocab-0260"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 260
  },
  {
    "category": "vocabulary",
    "front": "平気な",
    "back": "calm, indifferent, fine",
    "exampleJp": "彼はあれほどひどいことを言われたのに、平気な顔をしている。",
    "exampleTranslation": "Even though he was told such terrible things, he has a calm expression.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "na-adj"
    ],
    "sourceIds": [
      "n3-vocab-0261"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 261
  },
  {
    "category": "vocabulary",
    "front": "見事な",
    "back": "splendid, magnificent",
    "exampleJp": "桜の花が満開になり、公園は見事な景色に包まれた。",
    "exampleTranslation": "The cherry blossoms reached full bloom, and the park was enveloped in a splendid landscape.",
    "tags": [
      "n3",
      "vocabulary",
      "adjective",
      "na-adj"
    ],
    "sourceIds": [
      "n3-vocab-0262"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 262
  },
  {
    "category": "vocabulary",
    "front": "相変わらず",
    "back": "as usual",
    "exampleJp": "何年ぶりに会ったが、彼は相変わらず元気そうだった。",
    "exampleTranslation": "We met for the first time in years, but he looked as energetic as usual.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0263"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 263
  },
  {
    "category": "vocabulary",
    "front": "あいにく",
    "back": "unfortunately, regrettably",
    "exampleJp": "あいにくですが、その商品は現在在庫が切れております。",
    "exampleTranslation": "Unfortunately, that product is currently out of stock.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0264"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 264
  },
  {
    "category": "vocabulary",
    "front": "あくまで",
    "back": "to the end, persistently, strictly",
    "exampleJp": "これはあくまで私の個人的な意見であり、会社の公式見解ではありません。",
    "exampleTranslation": "This is strictly my personal opinion and not the official view of the company.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0265"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 265
  },
  {
    "category": "vocabulary",
    "front": "あっという間に",
    "back": "in an instant, in the blink of an eye",
    "exampleJp": "楽しい時間はあっという間に過ぎてしまう。",
    "exampleTranslation": "Fun times pass by in the blink of an eye.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0266"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 266
  },
  {
    "category": "vocabulary",
    "front": "思い切って",
    "back": "resolutely, boldly",
    "exampleJp": "ずっと迷っていたが、思い切って彼女に気持ちを伝えた。",
    "exampleTranslation": "I had been hesitating for a long time, but I boldly told her my feelings.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0267"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 267
  },
  {
    "category": "vocabulary",
    "front": "思わず",
    "back": "unintentionally, spontaneously",
    "exampleJp": "コメディ番組を見ていて、思わず声を出して笑ってしまった。",
    "exampleTranslation": "Watching the comedy show, I unintentionally laughed out loud.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0268"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 268
  },
  {
    "category": "vocabulary",
    "front": "必ずしも",
    "back": "(not) always, (not) necessarily",
    "exampleJp": "値段が高いものが、必ずしも質が良いとは限らない。",
    "exampleTranslation": "Things that are highly priced are not necessarily of good quality.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0269"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 269
  },
  {
    "category": "vocabulary",
    "front": "かえって",
    "back": "on the contrary, rather",
    "exampleJp": "薬を飲みすぎると、かえって体に悪い影響を与える。",
    "exampleTranslation": "If you take too much medicine, it will rather have a bad effect on your body.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0270"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 270
  },
  {
    "category": "vocabulary",
    "front": "かつて",
    "back": "once, formerly",
    "exampleJp": "この町はかつて、炭鉱の町として大きく栄えていた。",
    "exampleTranslation": "This town once greatly prospered as a coal mining town.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0271"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 271
  },
  {
    "category": "vocabulary",
    "front": "結局",
    "back": "after all, in the end",
    "exampleJp": "色々と悩んだが、結局最初のアイデアを採用することにした。",
    "exampleTranslation": "I worried over various things, but in the end we decided to adopt the initial idea.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0272"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 272
  },
  {
    "category": "vocabulary",
    "front": "決して",
    "back": "never, by no means",
    "exampleJp": "この秘密は、決して誰にも言わないと約束してください。",
    "exampleTranslation": "Please promise me that you will never tell this secret to anyone.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0273"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 273
  },
  {
    "category": "vocabulary",
    "front": "実は",
    "back": "actually, as a matter of fact",
    "exampleJp": "ずっと黙っていましたが、実は来月結婚することになりました。",
    "exampleTranslation": "I've kept quiet about it for a long time, but actually I'm getting married next month.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0274"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 274
  },
  {
    "category": "vocabulary",
    "front": "次第に",
    "back": "gradually",
    "exampleJp": "秋が深まるにつれて、木の葉が次第に赤く染まっていった。",
    "exampleTranslation": "As autumn deepened, the tree leaves gradually turned red.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0275"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 275
  },
  {
    "category": "vocabulary",
    "front": "少々",
    "back": "a little, slightly",
    "exampleJp": "お席の準備が整うまで、少々お待ちください。",
    "exampleTranslation": "Please wait a little while until we get your seat ready.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0276"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 276
  },
  {
    "category": "vocabulary",
    "front": "すぐに",
    "back": "immediately, soon",
    "exampleJp": "注文した商品は、明日の朝すぐにお届けします。",
    "exampleTranslation": "The product you ordered will be delivered to you immediately tomorrow morning.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0277"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 277
  },
  {
    "category": "vocabulary",
    "front": "すでに",
    "back": "already",
    "exampleJp": "私が駅に着いた時には、終電はすでに出発していた。",
    "exampleTranslation": "By the time I arrived at the station, the last train had already departed.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0278"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 278
  },
  {
    "category": "vocabulary",
    "front": "全て",
    "back": "all, entirely",
    "exampleJp": "準備は全て完了したので、いつでも始められます。",
    "exampleTranslation": "The preparations are entirely complete, so we can start anytime.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0279"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 279
  },
  {
    "category": "vocabulary",
    "front": "せっかく",
    "back": "with much trouble, specially",
    "exampleJp": "せっかく海に来たのに、雨が降って泳げなかった。",
    "exampleTranslation": "Even though we took the trouble to come to the sea, it rained and we couldn't swim.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0280"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 280
  },
  {
    "category": "vocabulary",
    "front": "絶対に",
    "back": "absolutely, unconditionally",
    "exampleJp": "今回の試験は、絶対に合格してみせます。",
    "exampleTranslation": "I will absolutely pass the exam this time to show you.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0281"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 281
  },
  {
    "category": "vocabulary",
    "front": "ぜひ",
    "back": "by all means, definitely",
    "exampleJp": "日本へ旅行に来た際には、ぜひ京都を訪れてみてください。",
    "exampleTranslation": "When you travel to Japan, by all means try visiting Kyoto.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0282"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 282
  },
  {
    "category": "vocabulary",
    "front": "そのうち",
    "back": "before long, one of these days",
    "exampleJp": "今は大変でも、そのうち慣れて上手くできるようになるよ。",
    "exampleTranslation": "Even if it's tough now, you'll get used to it and become able to do it well before long.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0283"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 283
  },
  {
    "category": "vocabulary",
    "front": "そろそろ",
    "back": "it's about time, gradually",
    "exampleJp": "終電の時間が近づいてきたので、そろそろ失礼します。",
    "exampleTranslation": "The time for the last train is approaching, so it's about time I excuse myself.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0284"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 284
  },
  {
    "category": "vocabulary",
    "front": "たいして",
    "back": "(not) very much, (not) particularly",
    "exampleJp": "あの映画は前評判が高かったが、たいして面白くなかった。",
    "exampleTranslation": "That movie had high advance reviews, but it wasn't particularly interesting.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0285"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 285
  },
  {
    "category": "vocabulary",
    "front": "互いに",
    "back": "mutually, each other",
    "exampleJp": "困った時は、互いに助け合うことが大切です。",
    "exampleTranslation": "In times of trouble, it is important to help each other.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0286"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 286
  },
  {
    "category": "vocabulary",
    "front": "たまたま",
    "back": "by chance, accidentally",
    "exampleJp": "昨日たまたま入った店で、探していた本を見つけた。",
    "exampleTranslation": "I found the book I was looking for at a shop I happened to enter yesterday.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0287"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 287
  },
  {
    "category": "vocabulary",
    "front": "だんだん",
    "back": "gradually, little by little",
    "exampleJp": "春が近づき、だんだん暖かくなってきましたね。",
    "exampleTranslation": "As spring approaches, it has gradually become warmer.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0288"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 288
  },
  {
    "category": "vocabulary",
    "front": "ちゃんと",
    "back": "properly, diligently",
    "exampleJp": "出かける前に、ちゃんと部屋の鍵をかけたか確認して。",
    "exampleTranslation": "Before going out, make sure you properly locked the room's door.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0289"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 289
  },
  {
    "category": "vocabulary",
    "front": "ついに",
    "back": "finally, at last",
    "exampleJp": "長年の努力が実り、ついに自分の店を持つことができた。",
    "exampleTranslation": "Years of effort bore fruit, and I was finally able to have my own shop.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0290"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 290
  },
  {
    "category": "vocabulary",
    "front": "常に",
    "back": "always, constantly",
    "exampleJp": "プロの選手として、常に最高のパフォーマンスを心がけている。",
    "exampleTranslation": "As a professional athlete, I constantly strive for the best performance.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0291"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 291
  },
  {
    "category": "vocabulary",
    "front": "どうせ",
    "back": "anyway, anyhow",
    "exampleJp": "どうせ遅刻するなら、慌てずに安全運転で行こう。",
    "exampleTranslation": "If we're going to be late anyway, let's drive safely without rushing.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0292"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 292
  },
  {
    "category": "vocabulary",
    "front": "どうしても",
    "back": "by any means, no matter what",
    "exampleJp": "明日の会議には、どうしても出席しなければならない。",
    "exampleTranslation": "I must attend tomorrow's meeting no matter what.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0293"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 293
  },
  {
    "category": "vocabulary",
    "front": "共に",
    "back": "together with, as well as",
    "exampleJp": "彼は長年、妻と共に小さな食堂を切り盛りしてきた。",
    "exampleTranslation": "For many years, he has managed a small diner together with his wife.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0294"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 294
  },
  {
    "category": "vocabulary",
    "front": "とにかく",
    "back": "anyway, at any rate",
    "exampleJp": "理由は後で聞くから、とにかくいま直ぐここに来てくれ。",
    "exampleTranslation": "I'll hear the reasons later, so at any rate just come here right now.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0295"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 295
  },
  {
    "category": "vocabulary",
    "front": "なるべく",
    "back": "as much as possible",
    "exampleJp": "環境のために、なるべくプラスチック製品を使わないようにしている。",
    "exampleTranslation": "For the environment, I am trying not to use plastic products as much as possible.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0296"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 296
  },
  {
    "category": "vocabulary",
    "front": "なんとなく",
    "back": "somehow, vaguely",
    "exampleJp": "なんとなく気分が乗らないので、今日の飲み会はパスします。",
    "exampleTranslation": "I somehow don't feel in the mood, so I'll pass on today's drinking party.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0297"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 297
  },
  {
    "category": "vocabulary",
    "front": "はるかに",
    "back": "far, much (more)",
    "exampleJp": "飛行機を使えば、新幹線よりもはるかに早く目的地に着く。",
    "exampleTranslation": "If you use an airplane, you'll arrive at the destination much faster than by bullet train.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0298"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 298
  },
  {
    "category": "vocabulary",
    "front": "ぴったり",
    "back": "perfectly, exactly",
    "exampleJp": "このシャツのサイズは、今の私にぴったり合っている。",
    "exampleTranslation": "The size of this shirt fits me perfectly right now.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0299"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 299
  },
  {
    "category": "vocabulary",
    "front": "再び",
    "back": "again, once more",
    "exampleJp": "十年ぶりに帰郷し、昔の友人と再び会うことができた。",
    "exampleTranslation": "I returned to my hometown after ten years and was able to meet my old friends once again.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0300"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 300
  },
  {
    "category": "vocabulary",
    "front": "ふと",
    "back": "suddenly, casually",
    "exampleJp": "電車の中でふと窓の外を見ると、雪が降り始めていた。",
    "exampleTranslation": "When I casually looked out the window on the train, it had started snowing.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0301"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 301
  },
  {
    "category": "vocabulary",
    "front": "ほぼ",
    "back": "almost, roughly",
    "exampleJp": "夏休みの宿題は、ほぼ終わりました。",
    "exampleTranslation": "My summer vacation homework is almost finished.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0302"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 302
  },
  {
    "category": "vocabulary",
    "front": "まさに",
    "back": "exactly, just, right then",
    "exampleJp": "彼が言ったことは、まさに私が考えていたことと同じだ。",
    "exampleTranslation": "What he said is exactly the same as what I was thinking.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0303"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 303
  },
  {
    "category": "vocabulary",
    "front": "ますます",
    "back": "increasingly, more and more",
    "exampleJp": "インターネットの普及により、世界はますます便利になっている。",
    "exampleTranslation": "With the spread of the internet, the world is becoming increasingly convenient.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0304"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 304
  },
  {
    "category": "vocabulary",
    "front": "全く",
    "back": "entirely, completely",
    "exampleJp": "彼の弁解は、全く理にかなっていないと思う。",
    "exampleTranslation": "I think his excuse does not make sense entirely.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0305"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 305
  },
  {
    "category": "vocabulary",
    "front": "まるで",
    "back": "as if, completely",
    "exampleJp": "まだ三月なのに、今日はまるで夏のような暑さだ。",
    "exampleTranslation": "Even though it's still March, today's heat is as if it were summer.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0306"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 306
  },
  {
    "category": "vocabulary",
    "front": "自ら",
    "back": "for one's self, personally",
    "exampleJp": "社長自らが先頭に立って、新しいプロジェクトを進めている。",
    "exampleTranslation": "The president personally stands at the forefront and is advancing the new project.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0307"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 307
  },
  {
    "category": "vocabulary",
    "front": "むしろ",
    "back": "rather, preferably",
    "exampleJp": "そんなひどい仕事をするくらいなら、むしろ辞めた方がいい。",
    "exampleTranslation": "If you are going to do such a terrible job, it would be better to just quit instead.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0308"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 308
  },
  {
    "category": "vocabulary",
    "front": "めったに",
    "back": "rarely, seldom",
    "exampleJp": "彼はめったに怒らないが、昨日は珍しく声を荒らげていた。",
    "exampleTranslation": "He rarely gets angry, but yesterday he unusually raised his voice.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0309"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 309
  },
  {
    "category": "vocabulary",
    "front": "最も",
    "back": "most, extremely",
    "exampleJp": "富士山は、日本で最も高い山として世界中に知られている。",
    "exampleTranslation": "Mt. Fuji is known worldwide as the most extremely high mountain in Japan.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0310"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 310
  },
  {
    "category": "vocabulary",
    "front": "やがて",
    "back": "before long, soon",
    "exampleJp": "冷たかった風もやがて止み、暖かい春の日差しが差し込んできた。",
    "exampleTranslation": "The cold wind soon stopped, and the warm spring sunlight shined in.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0311"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 311
  },
  {
    "category": "vocabulary",
    "front": "やはり",
    "back": "as expected, still, after all",
    "exampleJp": "色々な靴を試したが、やはりこのスニーカーが一番歩きやすい。",
    "exampleTranslation": "I tried on various shoes, but as expected, these sneakers are the easiest to walk in.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0312"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 312
  },
  {
    "category": "vocabulary",
    "front": "やや",
    "back": "a little, somewhat",
    "exampleJp": "今年の冬は、例年に比べてやや暖かい気がする。",
    "exampleTranslation": "I feel that this winter is somewhat warmer compared to an average year.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0313"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 313
  },
  {
    "category": "vocabulary",
    "front": "わざと",
    "back": "on purpose, intentionally",
    "exampleJp": "彼は私の気を引くために、わざと意地悪なことを言ったらしい。",
    "exampleTranslation": "It seems he intentionally said mean things to attract my attention.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0314"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 314
  },
  {
    "category": "vocabulary",
    "front": "割に",
    "back": "relatively, comparatively",
    "exampleJp": "あのレストランは、値段が安い割にとても美味しい。",
    "exampleTranslation": "That restaurant is relatively delicious considering its cheap price.",
    "tags": [
      "n3",
      "vocabulary",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0315"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 315
  },
  {
    "category": "vocabulary",
    "front": "アイデア",
    "back": "idea",
    "exampleJp": "会議で行き詰まっていた時、彼が素晴らしいアイデアを出してくれた。",
    "exampleTranslation": "When we were stuck in the meeting, he provided a wonderful idea.",
    "tags": [
      "n3",
      "vocabulary",
      "noun",
      "katakana"
    ],
    "sourceIds": [
      "n3-vocab-0316"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 316
  },
  {
    "category": "vocabulary",
    "front": "アンケート",
    "back": "questionnaire, survey",
    "exampleJp": "お客様の声をサービス向上に生かすため、アンケートを実施しています。",
    "exampleTranslation": "To utilize customer feedback to improve services, we are conducting a questionnaire.",
    "tags": [
      "n3",
      "vocabulary",
      "noun",
      "katakana"
    ],
    "sourceIds": [
      "n3-vocab-0317"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 317
  },
  {
    "category": "vocabulary",
    "front": "エネルギー",
    "back": "energy",
    "exampleJp": "地球温暖化を防ぐために、再生可能エネルギーの導入が進んでいる。",
    "exampleTranslation": "To prevent global warming, the introduction of renewable energy is advancing.",
    "tags": [
      "n3",
      "vocabulary",
      "noun",
      "katakana"
    ],
    "sourceIds": [
      "n3-vocab-0318"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 318
  },
  {
    "category": "vocabulary",
    "front": "オーバー",
    "back": "over, exaggeration",
    "exampleJp": "彼の話はいつも少しオーバーなので、半分だけ信じるようにしている。",
    "exampleTranslation": "His stories are always a little exaggerated, so I try to believe only half of them.",
    "tags": [
      "n3",
      "vocabulary",
      "noun",
      "katakana"
    ],
    "sourceIds": [
      "n3-vocab-0319"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 319
  },
  {
    "category": "vocabulary",
    "front": "スケジュール",
    "back": "schedule",
    "exampleJp": "来週は出張が入っており、スケジュールがぎっしり詰まっている。",
    "exampleTranslation": "I have a business trip next week, and my schedule is completely packed.",
    "tags": [
      "n3",
      "vocabulary",
      "noun",
      "katakana"
    ],
    "sourceIds": [
      "n3-vocab-0320"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 320
  },
  {
    "category": "vocabulary",
    "front": "スムーズ",
    "back": "smooth",
    "exampleJp": "事前の準備が完璧だったおかげで、引っ越し作業はスムーズに進んだ。",
    "exampleTranslation": "Thanks to perfect advance preparation, the moving work proceeded smoothly.",
    "tags": [
      "n3",
      "vocabulary",
      "na-adj",
      "katakana"
    ],
    "sourceIds": [
      "n3-vocab-0321"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 321
  },
  {
    "category": "vocabulary",
    "front": "プラス",
    "back": "plus, advantage",
    "exampleJp": "留学経験は、今後のキャリアにとって大きなプラスになるだろう。",
    "exampleTranslation": "The experience of studying abroad will surely be a big plus for your future career.",
    "tags": [
      "n3",
      "vocabulary",
      "noun",
      "katakana"
    ],
    "sourceIds": [
      "n3-vocab-0322"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 322
  },
  {
    "category": "vocabulary",
    "front": "マイナス",
    "back": "minus, disadvantage",
    "exampleJp": "気温がマイナス十度まで下がり、湖の表面が凍りついた。",
    "exampleTranslation": "The temperature dropped to minus ten degrees, and the surface of the lake froze.",
    "tags": [
      "n3",
      "vocabulary",
      "noun",
      "katakana"
    ],
    "sourceIds": [
      "n3-vocab-0323"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 323
  },
  {
    "category": "vocabulary",
    "front": "マナー",
    "back": "manners, etiquette",
    "exampleJp": "電車内で大声で電話をするのは、マナー違反だと言われている。",
    "exampleTranslation": "It is said that talking loudly on the phone on a train is a violation of manners.",
    "tags": [
      "n3",
      "vocabulary",
      "noun",
      "katakana"
    ],
    "sourceIds": [
      "n3-vocab-0324"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 324
  },
  {
    "category": "vocabulary",
    "front": "ミス",
    "back": "mistake, error",
    "exampleJp": "重要な書類に計算ミスが見つかり、急いで修正した。",
    "exampleTranslation": "A calculation mistake was found in an important document, and I hurried to fix it.",
    "tags": [
      "n3",
      "vocabulary",
      "noun",
      "katakana"
    ],
    "sourceIds": [
      "n3-vocab-0325"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 325
  },
  {
    "category": "vocabulary",
    "front": "リサイクル",
    "back": "recycling",
    "exampleJp": "空き缶やペットボトルは、洗ってからリサイクルに出してください。",
    "exampleTranslation": "Please wash empty cans and plastic bottles before putting them out for recycling.",
    "tags": [
      "n3",
      "vocabulary",
      "noun",
      "katakana"
    ],
    "sourceIds": [
      "n3-vocab-0326"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 326
  },
  {
    "category": "vocabulary",
    "front": "ルール",
    "back": "rule",
    "exampleJp": "スポーツを楽しむためには、全員がルールを守ることが前提だ。",
    "exampleTranslation": "To enjoy sports, everyone following the rules is a prerequisite.",
    "tags": [
      "n3",
      "vocabulary",
      "noun",
      "katakana"
    ],
    "sourceIds": [
      "n3-vocab-0327"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 327
  },
  {
    "category": "vocabulary",
    "front": "アルバイト",
    "back": "part-time job",
    "exampleJp": "大学生のころは、生活費を稼ぐために居酒屋でアルバイトをしていた。",
    "exampleTranslation": "When I was a university student, I worked part-time at an izakaya to earn living expenses.",
    "tags": [
      "n3",
      "vocabulary",
      "noun",
      "katakana"
    ],
    "sourceIds": [
      "n3-vocab-0328"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 328
  },
  {
    "category": "vocabulary",
    "front": "インタビュー",
    "back": "interview",
    "exampleJp": "有名な俳優へのインタビュー記事が、今月の雑誌に掲載されている。",
    "exampleTranslation": "An interview article with a famous actor is published in this month's magazine.",
    "tags": [
      "n3",
      "vocabulary",
      "noun",
      "katakana"
    ],
    "sourceIds": [
      "n3-vocab-0329"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 329
  },
  {
    "category": "vocabulary",
    "front": "トラブル",
    "back": "trouble, problem",
    "exampleJp": "システムの更新中にトラブルが発生し、一時的にサービスが停止した。",
    "exampleTranslation": "Trouble occurred during the service update, and the service was temporarily stopped.",
    "tags": [
      "n3",
      "vocabulary",
      "noun",
      "katakana"
    ],
    "sourceIds": [
      "n3-vocab-0330"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 330
  },
  {
    "category": "vocabulary",
    "front": "バランス",
    "back": "balance",
    "exampleJp": "健康を保つためには、食事と運動のバランスが何よりも重要です。",
    "exampleTranslation": "To maintain health, the balance of diet and exercise is more important than anything.",
    "tags": [
      "n3",
      "vocabulary",
      "noun",
      "katakana"
    ],
    "sourceIds": [
      "n3-vocab-0331"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 331
  },
  {
    "category": "vocabulary",
    "front": "ボランティア",
    "back": "volunteer",
    "exampleJp": "週末は地域のゴミ拾いボランティアに参加して、汗を流している。",
    "exampleTranslation": "On weekends, I participate in the local trash picking volunteer work and break a sweat.",
    "tags": [
      "n3",
      "vocabulary",
      "noun",
      "katakana"
    ],
    "sourceIds": [
      "n3-vocab-0332"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 332
  },
  {
    "category": "vocabulary",
    "front": "影響",
    "back": "influence, effect",
    "exampleJp": "子どもの頃に読んだ本から、大きな影響を受けました。",
    "exampleTranslation": "I was greatly influenced by the books I read as a child.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0333"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 333
  },
  {
    "category": "vocabulary",
    "front": "経験",
    "back": "experience",
    "exampleJp": "海外での生活は、彼にとって貴重な経験になったようだ。",
    "exampleTranslation": "Living abroad seems to have been a valuable experience for him.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0334"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 334
  },
  {
    "category": "vocabulary",
    "front": "責任",
    "back": "responsibility",
    "exampleJp": "プロジェクトのリーダーとして、結果に責任を持つ必要がある。",
    "exampleTranslation": "As the project leader, I need to take responsibility for the results.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0335"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 335
  },
  {
    "category": "vocabulary",
    "front": "成功",
    "back": "success",
    "exampleJp": "何度も実験を繰り返し、ようやく新しい薬の開発に成功した。",
    "exampleTranslation": "After repeating the experiment many times, they finally succeeded in developing the new drug.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0336"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 336
  },
  {
    "category": "vocabulary",
    "front": "失敗",
    "back": "failure, mistake",
    "exampleJp": "最初の面接で失敗してしまったが、諦めずに別の会社を受けた。",
    "exampleTranslation": "I messed up my first interview, but I didn't give up and applied to another company.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0337"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 337
  },
  {
    "category": "vocabulary",
    "front": "目的",
    "back": "purpose, aim",
    "exampleJp": "このアンケートの目的は、消費者の意見を集めることです。",
    "exampleTranslation": "The purpose of this survey is to gather consumer opinions.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0338"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 338
  },
  {
    "category": "vocabulary",
    "front": "目標",
    "back": "goal, target",
    "exampleJp": "今年の目標は、フルマラソンを完走することに決めた。",
    "exampleTranslation": "I've decided that my goal for this year is to finish a full marathon.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0339"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 339
  },
  {
    "category": "vocabulary",
    "front": "理由",
    "back": "reason",
    "exampleJp": "会議に遅れた理由を、後で上司に説明しなければならない。",
    "exampleTranslation": "I have to explain the reason I was late for the meeting to my boss later.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0340"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 340
  },
  {
    "category": "vocabulary",
    "front": "原因",
    "back": "cause, source",
    "exampleJp": "機械が急に止まった原因を調査しているところだ。",
    "exampleTranslation": "We are currently investigating the cause of the machine's sudden stoppage.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0341"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 341
  },
  {
    "category": "vocabulary",
    "front": "結果",
    "back": "result, outcome",
    "exampleJp": "検査の結果が出たら、すぐに電話でお知らせします。",
    "exampleTranslation": "I will call you to let you know as soon as the test results are out.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0342"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 342
  },
  {
    "category": "vocabulary",
    "front": "変化",
    "back": "change, variation",
    "exampleJp": "季節の変化に合わせて、店のメニューを少しずつ変えている。",
    "exampleTranslation": "We change the restaurant's menu little by little according to the change of seasons.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0343"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 343
  },
  {
    "category": "vocabulary",
    "front": "発見",
    "back": "discovery",
    "exampleJp": "古い手紙を整理していたら、祖父の書いた日記を発見した。",
    "exampleTranslation": "While organizing old letters, I discovered a diary written by my grandfather.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0344"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 344
  },
  {
    "category": "vocabulary",
    "front": "発明",
    "back": "invention",
    "exampleJp": "インターネットの発明は、世界中の人々の生活を大きく変えた。",
    "exampleTranslation": "The invention of the internet greatly changed the lives of people all over the world.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0345"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 345
  },
  {
    "category": "vocabulary",
    "front": "発表",
    "back": "announcement, presentation",
    "exampleJp": "明日のゼミで、自分の研究テーマについて発表する予定です。",
    "exampleTranslation": "I plan to give a presentation on my research topic at tomorrow's seminar.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0346"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 346
  },
  {
    "category": "vocabulary",
    "front": "表現",
    "back": "expression",
    "exampleJp": "感謝の気持ちを言葉で表現するのは、時々難しいと感じる。",
    "exampleTranslation": "I sometimes find it difficult to express my feelings of gratitude in words.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0347"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 347
  },
  {
    "category": "vocabulary",
    "front": "状態",
    "back": "condition, state",
    "exampleJp": "事故に遭った車は、修理が不可能なほどひどい状態だった。",
    "exampleTranslation": "The car that was in the accident was in such a bad condition that it couldn't be repaired.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0348"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 348
  },
  {
    "category": "vocabulary",
    "front": "状況",
    "back": "situation, circumstances",
    "exampleJp": "台風が近づいているので、今後の状況に注意してください。",
    "exampleTranslation": "A typhoon is approaching, so please pay attention to the situation moving forward.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0349"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 349
  },
  {
    "category": "vocabulary",
    "front": "事情",
    "back": "circumstances, reasons",
    "exampleJp": "家庭の事情により、来月末で会社を辞めることになりました。",
    "exampleTranslation": "Due to family circumstances, I will be leaving the company at the end of next month.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0350"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 350
  },
  {
    "category": "vocabulary",
    "front": "種類",
    "back": "variety, kind, type",
    "exampleJp": "この公園には、珍しい種類の鳥がたくさん生息しています。",
    "exampleTranslation": "Many rare types of birds inhabit this park.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0351"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 351
  },
  {
    "category": "vocabulary",
    "front": "方法",
    "back": "method, way",
    "exampleJp": "パスワードを忘れた場合の、新しいパスワードの設定方法を教えてください。",
    "exampleTranslation": "Please tell me the method for setting a new password in case I forget it.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0352"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 352
  },
  {
    "category": "vocabulary",
    "front": "方式",
    "back": "system, method",
    "exampleJp": "今年の試験から、面接ではなく筆記試験のみの方式に変わった。",
    "exampleTranslation": "Starting from this year's exam, the system has changed to a written exam only, instead of an interview.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0353"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 353
  },
  {
    "category": "vocabulary",
    "front": "意見",
    "back": "opinion",
    "exampleJp": "新しい企画について、メンバー全員から自由に意見を出してもらった。",
    "exampleTranslation": "We had all members freely share their opinions about the new project.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0354"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 354
  },
  {
    "category": "vocabulary",
    "front": "意味",
    "back": "meaning",
    "exampleJp": "知らない単語を見つけたら、すぐに辞書で意味を調べるようにしている。",
    "exampleTranslation": "When I encounter an unfamiliar term, I try to look up its meaning in the dictionary right away.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0355"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 355
  },
  {
    "category": "vocabulary",
    "front": "意識",
    "back": "consciousness, awareness",
    "exampleJp": "健康への意識が高まり、運動を始める人が増えている。",
    "exampleTranslation": "Awareness of health has increased, and more people are starting to exercise.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0356"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 356
  },
  {
    "category": "vocabulary",
    "front": "記憶",
    "back": "memory",
    "exampleJp": "子供の頃によく遊んだ公園の景色が、今でも鮮明に記憶に残っている。",
    "exampleTranslation": "The scenery of the park where I often played as a child still remains vividly in my memory.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0357"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 357
  },
  {
    "category": "vocabulary",
    "front": "記録",
    "back": "record",
    "exampleJp": "毎日の気温と天気を、ノートに細かく記録しています。",
    "exampleTranslation": "I'm recording the daily temperature and weather in detail in my notebook.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0358"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 358
  },
  {
    "category": "vocabulary",
    "front": "期待",
    "back": "expectation, hope",
    "exampleJp": "親の期待に応えるために、彼は必死に勉強を続けた。",
    "exampleTranslation": "He studied desperately to meet his parents' expectations.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0359"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 359
  },
  {
    "category": "vocabulary",
    "front": "希望",
    "back": "hope, wish",
    "exampleJp": "新しい部署では、どんな仕事をしたいか希望を聞かれます。",
    "exampleTranslation": "In the new department, you will be asked about your wishes regarding what kind of work you want to do.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0360"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 360
  },
  {
    "category": "vocabulary",
    "front": "夢中",
    "back": "absorbed in, crazy about",
    "exampleJp": "息子は最近、新しく買ったテレビゲームに夢中になっている。",
    "exampleTranslation": "My son has been completely absorbed in the new video game he just bought recently.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0361"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 361
  },
  {
    "category": "vocabulary",
    "front": "満足",
    "back": "satisfaction",
    "exampleJp": "お客様に満足していただけるよう、サービスの向上に努めます。",
    "exampleTranslation": "We will strive to improve our service so that our customers will be satisfied.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "suru-verb",
      "na-adjective"
    ],
    "sourceIds": [
      "n3-vocab-0362"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 362
  },
  {
    "category": "vocabulary",
    "front": "不満",
    "back": "dissatisfaction, discontent",
    "exampleJp": "給料や待遇について、会社に不満を持っている社員は少なくない。",
    "exampleTranslation": "There are quite a few employees who are dissatisfied with the company regarding their salary and benefits.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "na-adjective"
    ],
    "sourceIds": [
      "n3-vocab-0363"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 363
  },
  {
    "category": "vocabulary",
    "front": "共通",
    "back": "common, shared",
    "exampleJp": "彼とは音楽の趣味が共通しているので、話がよく合います。",
    "exampleTranslation": "He and I share a common taste in music, so we get along well when we talk.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0364"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 364
  },
  {
    "category": "vocabulary",
    "front": "協力",
    "back": "cooperation",
    "exampleJp": "地域の皆さんの協力を得て、お祭りを無事に開催できた。",
    "exampleTranslation": "With the cooperation of everyone in the community, we were able to successfully hold the festival.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0365"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 365
  },
  {
    "category": "vocabulary",
    "front": "競争",
    "back": "competition",
    "exampleJp": "この業界は企業間の競争が激しく、生き残るのが大変だ。",
    "exampleTranslation": "In this industry, competition between companies is fierce, and it's tough to survive.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0366"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 366
  },
  {
    "category": "vocabulary",
    "front": "賛成",
    "back": "approval, agreement",
    "exampleJp": "リーダーの提案に対して、チームのほとんどの人が賛成した。",
    "exampleTranslation": "Most of the team members agreed with the leader's proposal.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0367"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 367
  },
  {
    "category": "vocabulary",
    "front": "反対",
    "back": "opposition",
    "exampleJp": "予算が足りないという理由で、新しい計画には反対された。",
    "exampleTranslation": "The new plan was opposed on the grounds that there was not enough budget.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0368"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 368
  },
  {
    "category": "vocabulary",
    "front": "解決",
    "back": "solution, resolution",
    "exampleJp": "専門家に相談したおかげで、長年のトラブルがようやく解決した。",
    "exampleTranslation": "Thanks to consulting an expert, the long-standing trouble was finally resolved.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0369"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 369
  },
  {
    "category": "vocabulary",
    "front": "理解",
    "back": "understanding",
    "exampleJp": "お互いの文化の違いを理解することが、国際交流の第一歩だ。",
    "exampleTranslation": "Understanding each other's cultural differences is the first step in international exchange.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0370"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 370
  },
  {
    "category": "vocabulary",
    "front": "誤解",
    "back": "misunderstanding",
    "exampleJp": "私のちょっとした一言が、彼に大きな誤解を与えてしまった。",
    "exampleTranslation": "A casual remark of mine caused a big misunderstanding for him.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0371"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 371
  },
  {
    "category": "vocabulary",
    "front": "想像",
    "back": "imagination",
    "exampleJp": "宇宙の果てがどうなっているのか、想像するだけでワクワクする。",
    "exampleTranslation": "Just imagining what the edge of the universe is like makes me excited.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0372"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 372
  },
  {
    "category": "vocabulary",
    "front": "理想",
    "back": "ideal",
    "exampleJp": "誰にとっても働きやすい、理想の職場を作るのが私の目標です。",
    "exampleTranslation": "My goal is to create an ideal workplace that is easy for everyone to work in.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0373"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 373
  },
  {
    "category": "vocabulary",
    "front": "現実",
    "back": "reality",
    "exampleJp": "理想ばかり追いかけても、厳しい現実と向き合わなければならない。",
    "exampleTranslation": "Even if you only chase ideals, you still have to face harsh reality.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0374"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 374
  },
  {
    "category": "vocabulary",
    "front": "予想",
    "back": "expectation, forecast",
    "exampleJp": "今年の冬は暖かくなると予想されていたが、実際はかなり寒い。",
    "exampleTranslation": "It was expected that this winter would be warm, but in reality, it's quite cold.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0375"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 375
  },
  {
    "category": "vocabulary",
    "front": "予定",
    "back": "plan, schedule",
    "exampleJp": "週末の予定がまだ決まっていないなら、一緒に映画を見に行きませんか。",
    "exampleTranslation": "If your weekend plans aren't decided yet, would you like to go see a movie with me?",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0376"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 376
  },
  {
    "category": "vocabulary",
    "front": "計画",
    "back": "plan, project",
    "exampleJp": "資金不足のため、新しいビルの建設計画は中止になった。",
    "exampleTranslation": "Due to a lack of funds, the construction plan for the new building was canceled.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0377"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 377
  },
  {
    "category": "vocabulary",
    "front": "決定",
    "back": "decision",
    "exampleJp": "話し合いの結果、来年の社員旅行は北海道に行くことに決定した。",
    "exampleTranslation": "As a result of the discussion, it was decided that next year's company trip will be to Hokkaido.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0378"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 378
  },
  {
    "category": "vocabulary",
    "front": "判断",
    "back": "judgment, decision",
    "exampleJp": "情報が少なすぎて、どちらが正しいか判断するのは難しい。",
    "exampleTranslation": "With too little information, it's difficult to judge which one is correct.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0379"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 379
  },
  {
    "category": "vocabulary",
    "front": "評価",
    "back": "evaluation",
    "exampleJp": "彼のデザインした製品は、海外でも高く評価されている。",
    "exampleTranslation": "The products he designed are highly evaluated overseas as well.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0380"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 380
  },
  {
    "category": "vocabulary",
    "front": "比較",
    "back": "comparison",
    "exampleJp": "二つのスマートフォンの性能を比較してから、購入する方を決める。",
    "exampleTranslation": "I'll compare the performance of the two smartphones before deciding which one to buy.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0381"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 381
  },
  {
    "category": "vocabulary",
    "front": "感謝",
    "back": "gratitude, thanks",
    "exampleJp": "困難な時に助けてくれた友人には、深く感謝しています。",
    "exampleTranslation": "I am deeply grateful to my friend who helped me during difficult times.",
    "tags": [
      "n3",
      "vocabulary",
      "emotion",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0382"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 382
  },
  {
    "category": "vocabulary",
    "front": "尊敬",
    "back": "respect",
    "exampleJp": "私が最も尊敬する人物は、高校時代の恩師です。",
    "exampleTranslation": "The person I respect the most is my former high school teacher.",
    "tags": [
      "n3",
      "vocabulary",
      "emotion",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0383"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 383
  },
  {
    "category": "vocabulary",
    "front": "信頼",
    "back": "trust, reliance",
    "exampleJp": "仕事において、チームメンバー間の信頼関係は非常に重要だ。",
    "exampleTranslation": "In business, a relationship of trust between team members is extremely important.",
    "tags": [
      "n3",
      "vocabulary",
      "emotion",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0384"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 384
  },
  {
    "category": "vocabulary",
    "front": "信用",
    "back": "trust, confidence",
    "exampleJp": "一度嘘をつくと、人からの信用を失ってしまう。",
    "exampleTranslation": "If you tell a lie even once, you will lose people's trust.",
    "tags": [
      "n3",
      "vocabulary",
      "emotion",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0385"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 385
  },
  {
    "category": "vocabulary",
    "front": "疑い",
    "back": "doubt, suspicion",
    "exampleJp": "彼の話には矛盾が多く、少し疑いを持って聞いている。",
    "exampleTranslation": "There are many contradictions in his story, so I'm listening with a little suspicion.",
    "tags": [
      "n3",
      "vocabulary",
      "emotion",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0386"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 386
  },
  {
    "category": "vocabulary",
    "front": "不安",
    "back": "anxiety, uneasiness",
    "exampleJp": "初めての一人暮らしで、これからどうなるか不安でいっぱいだ。",
    "exampleTranslation": "Living alone for the first time, I'm full of anxiety about what will happen from now on.",
    "tags": [
      "n3",
      "vocabulary",
      "emotion",
      "noun",
      "na-adjective"
    ],
    "sourceIds": [
      "n3-vocab-0387"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 387
  },
  {
    "category": "vocabulary",
    "front": "恐怖",
    "back": "fear, terror",
    "exampleJp": "暗闇の中で突然大きな音が鳴り、恐怖を感じた。",
    "exampleTranslation": "A loud noise suddenly rang out in the darkness, and I felt fear.",
    "tags": [
      "n3",
      "vocabulary",
      "emotion",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0388"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 388
  },
  {
    "category": "vocabulary",
    "front": "緊張",
    "back": "tension, nervousness",
    "exampleJp": "大勢の観客の前でスピーチをするので、とても緊張しています。",
    "exampleTranslation": "I'm very nervous because I will be giving a speech in front of a large audience.",
    "tags": [
      "n3",
      "vocabulary",
      "emotion",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0389"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 389
  },
  {
    "category": "vocabulary",
    "front": "感動",
    "back": "being deeply moved",
    "exampleJp": "映画の最後のシーンが素晴らしくて、思わず感動して泣いてしまった。",
    "exampleTranslation": "The final scene of the movie was so wonderful that I was deeply moved and couldn't help but cry.",
    "tags": [
      "n3",
      "vocabulary",
      "emotion",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0390"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 390
  },
  {
    "category": "vocabulary",
    "front": "興奮",
    "back": "excitement",
    "exampleJp": "好きな歌手のコンサートに行き、会場の熱気に興奮した。",
    "exampleTranslation": "I went to my favorite singer's concert and was excited by the heat of the venue.",
    "tags": [
      "n3",
      "vocabulary",
      "emotion",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0391"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 391
  },
  {
    "category": "vocabulary",
    "front": "驚き",
    "back": "surprise",
    "exampleJp": "何の前触れもなく彼が辞表を出したので、社内に驚きが広がった。",
    "exampleTranslation": "He submitted his resignation without any warning, which spread surprise throughout the company.",
    "tags": [
      "n3",
      "vocabulary",
      "emotion",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0392"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 392
  },
  {
    "category": "vocabulary",
    "front": "喜び",
    "back": "joy, delight",
    "exampleJp": "長い間努力してきた試験に合格し、大きな喜びを感じている。",
    "exampleTranslation": "I passed the exam I had been working hard on for a long time, and I feel great joy.",
    "tags": [
      "n3",
      "vocabulary",
      "emotion",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0393"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 393
  },
  {
    "category": "vocabulary",
    "front": "悲しみ",
    "back": "sadness, sorrow",
    "exampleJp": "ペットが亡くなってしまい、家族全員が深い悲しみに包まれた。",
    "exampleTranslation": "Our pet passed away, and the whole family was enveloped in deep sadness.",
    "tags": [
      "n3",
      "vocabulary",
      "emotion",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0394"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 394
  },
  {
    "category": "vocabulary",
    "front": "苦しみ",
    "back": "suffering, pain",
    "exampleJp": "病気の苦しみを乗り越えて、彼は再びスポーツを始めた。",
    "exampleTranslation": "Overcoming the suffering of his illness, he started playing sports again.",
    "tags": [
      "n3",
      "vocabulary",
      "emotion",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0395"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 395
  },
  {
    "category": "vocabulary",
    "front": "怒り",
    "back": "anger",
    "exampleJp": "不当な扱いを受けたことに対して、彼は激しい怒りを覚えた。",
    "exampleTranslation": "He felt intense anger at having been treated unfairly.",
    "tags": [
      "n3",
      "vocabulary",
      "emotion",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0396"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 396
  },
  {
    "category": "vocabulary",
    "front": "悩み",
    "back": "worry, trouble",
    "exampleJp": "職場の人間関係についての悩みを、友人に相談した。",
    "exampleTranslation": "I consulted a friend about my worries regarding human relations at work.",
    "tags": [
      "n3",
      "vocabulary",
      "emotion",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0397"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 397
  },
  {
    "category": "vocabulary",
    "front": "後悔",
    "back": "regret",
    "exampleJp": "あの時もっと勉強しておけばよかったと、今になって後悔している。",
    "exampleTranslation": "I regret it now, thinking I should have studied more back then.",
    "tags": [
      "n3",
      "vocabulary",
      "emotion",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0398"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 398
  },
  {
    "category": "vocabulary",
    "front": "覚悟",
    "back": "resolution, readiness",
    "exampleJp": "起業するのは大変な道のりだが、彼にはやり遂げる覚悟がある。",
    "exampleTranslation": "Starting a business is a tough path, but he has the resolution to see it through.",
    "tags": [
      "n3",
      "vocabulary",
      "emotion",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0399"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 399
  },
  {
    "category": "vocabulary",
    "front": "決心",
    "back": "determination, resolve",
    "exampleJp": "医者になるという子供の頃からの夢を叶えるため、留学を決心した。",
    "exampleTranslation": "To fulfill my childhood dream of becoming a doctor, I made the determination to study abroad.",
    "tags": [
      "n3",
      "vocabulary",
      "emotion",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0400"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 400
  },
  {
    "category": "vocabulary",
    "front": "自信",
    "back": "self-confidence",
    "exampleJp": "毎日の練習のおかげで、大会に向けて少しずつ自信がついてきた。",
    "exampleTranslation": "Thanks to daily practice, I've gradually gained confidence for the tournament.",
    "tags": [
      "n3",
      "vocabulary",
      "emotion",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0401"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 401
  },
  {
    "category": "vocabulary",
    "front": "勇気",
    "back": "courage",
    "exampleJp": "間違っていることを指摘するには、大きな勇気が必要だ。",
    "exampleTranslation": "It takes a lot of courage to point out that something is wrong.",
    "tags": [
      "n3",
      "vocabulary",
      "emotion",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0402"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 402
  },
  {
    "category": "vocabulary",
    "front": "誇り",
    "back": "pride",
    "exampleJp": "彼女は自分の伝統的な職業に対して、強い誇りを持っている。",
    "exampleTranslation": "She takes strong pride in her traditional profession.",
    "tags": [
      "n3",
      "vocabulary",
      "emotion",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0403"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 403
  },
  {
    "category": "vocabulary",
    "front": "遠慮",
    "back": "hesitation, holding back",
    "exampleJp": "どうぞ遠慮せずに、たくさん召し上がってください。",
    "exampleTranslation": "Please don't hesitate and eat as much as you like.",
    "tags": [
      "n3",
      "vocabulary",
      "social",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0404"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 404
  },
  {
    "category": "vocabulary",
    "front": "我慢",
    "back": "patience, endurance",
    "exampleJp": "痛みを我慢できず、結局途中で病院へ行くことになった。",
    "exampleTranslation": "Unable to endure the pain, I ended up going to the hospital halfway through.",
    "tags": [
      "n3",
      "vocabulary",
      "emotion",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0405"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 405
  },
  {
    "category": "vocabulary",
    "front": "迷惑",
    "back": "annoyance, nuisance",
    "exampleJp": "夜遅くに大声で騒ぐのは、近所の迷惑になるのでやめましょう。",
    "exampleTranslation": "Making loud noises late at night is an annoyance to the neighbors, so let's stop.",
    "tags": [
      "n3",
      "vocabulary",
      "social",
      "noun",
      "na-adjective",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0406"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 406
  },
  {
    "category": "vocabulary",
    "front": "邪魔",
    "back": "hindrance, obstacle",
    "exampleJp": "仕事の邪魔になるので、机の上には余計なものを置かないでください。",
    "exampleTranslation": "Please don't put unnecessary things on the desk as they will get in the way of work.",
    "tags": [
      "n3",
      "vocabulary",
      "social",
      "noun",
      "na-adjective",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0407"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 407
  },
  {
    "category": "vocabulary",
    "front": "応援",
    "back": "support, cheering",
    "exampleJp": "スタジアムで地元のサッカーチームを全力で応援した。",
    "exampleTranslation": "We cheered for our local soccer team with all our might at the stadium.",
    "tags": [
      "n3",
      "vocabulary",
      "social",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0408"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 408
  },
  {
    "category": "vocabulary",
    "front": "励まし",
    "back": "encouragement",
    "exampleJp": "落ち込んでいる時に先生からもらった励ましの言葉を、今でも忘れない。",
    "exampleTranslation": "I still don't forget the words of encouragement I received from my teacher when I was feeling down.",
    "tags": [
      "n3",
      "vocabulary",
      "emotion",
      "social",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0409"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 409
  },
  {
    "category": "vocabulary",
    "front": "慰め",
    "back": "comfort, consolation",
    "exampleJp": "悲しい出来事があった時は、音楽を聴くことが唯一の慰めになる。",
    "exampleTranslation": "When a sad event occurs, listening to music becomes my only comfort.",
    "tags": [
      "n3",
      "vocabulary",
      "emotion",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0410"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 410
  },
  {
    "category": "vocabulary",
    "front": "冗談",
    "back": "joke",
    "exampleJp": "彼はよく冗談を言って、職場の雰囲気を明るくしてくれる。",
    "exampleTranslation": "He often tells jokes and brightens up the atmosphere in the workplace.",
    "tags": [
      "n3",
      "vocabulary",
      "social",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0411"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 411
  },
  {
    "category": "vocabulary",
    "front": "嘘",
    "back": "lie",
    "exampleJp": "小さな嘘でも、積み重なれば大きなトラブルの原因になる。",
    "exampleTranslation": "Even a small lie can be the cause of big trouble if they pile up.",
    "tags": [
      "n3",
      "vocabulary",
      "social",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0412"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 412
  },
  {
    "category": "vocabulary",
    "front": "本当",
    "back": "truth, reality",
    "exampleJp": "ニュースで報道されていることが、必ずしも本当とは限らない。",
    "exampleTranslation": "What is reported in the news is not necessarily always the truth.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0413"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 413
  },
  {
    "category": "vocabulary",
    "front": "秘密",
    "back": "secret",
    "exampleJp": "このプロジェクトの内容は、他社には絶対に秘密にしてください。",
    "exampleTranslation": "Please keep the contents of this project an absolute secret from other companies.",
    "tags": [
      "n3",
      "vocabulary",
      "social",
      "noun",
      "na-adjective"
    ],
    "sourceIds": [
      "n3-vocab-0414"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 414
  },
  {
    "category": "vocabulary",
    "front": "約束",
    "back": "promise",
    "exampleJp": "週末に遊園地に行くという子供との約束を、どうしても守りたかった。",
    "exampleTranslation": "I really wanted to keep my promise to my child to go to the amusement park on the weekend.",
    "tags": [
      "n3",
      "vocabulary",
      "social",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0415"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 415
  },
  {
    "category": "vocabulary",
    "front": "文句",
    "back": "complaint",
    "exampleJp": "料理が冷めていたので、レストランの店長に文句を言った。",
    "exampleTranslation": "Because the food was cold, I complained to the restaurant manager.",
    "tags": [
      "n3",
      "vocabulary",
      "social",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0416"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 416
  },
  {
    "category": "vocabulary",
    "front": "悪口",
    "back": "badmouthing, speaking ill of",
    "exampleJp": "他人の悪口ばかり言っていると、誰も周りにいなくなってしまう。",
    "exampleTranslation": "If you only speak ill of others, eventually no one will stay around you.",
    "tags": [
      "n3",
      "vocabulary",
      "social",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0417"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 417
  },
  {
    "category": "vocabulary",
    "front": "興味",
    "back": "interest",
    "exampleJp": "最近、日本の伝統文化や歴史に強い興味を持っています。",
    "exampleTranslation": "Recently, I have a strong interest in Japanese traditional culture and history.",
    "tags": [
      "n3",
      "vocabulary",
      "emotion",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0418"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 418
  },
  {
    "category": "vocabulary",
    "front": "関心",
    "back": "concern, interest",
    "exampleJp": "環境問題に対する若者たちの関心が、年々高まっているようだ。",
    "exampleTranslation": "It seems that young people's concern for environmental issues is increasing year by year.",
    "tags": [
      "n3",
      "vocabulary",
      "emotion",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0419"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 419
  },
  {
    "category": "vocabulary",
    "front": "好奇心",
    "back": "curiosity",
    "exampleJp": "子供は好奇心が旺盛なので、何にでも触ってみたがる。",
    "exampleTranslation": "Children are full of curiosity, so they want to touch everything.",
    "tags": [
      "n3",
      "vocabulary",
      "emotion",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0420"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 420
  },
  {
    "category": "vocabulary",
    "front": "疑問",
    "back": "question, doubt",
    "exampleJp": "このルールの合理性について、多くの社員が疑問を抱いている。",
    "exampleTranslation": "Many employees harbor doubts about the rationality of this rule.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0421"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 421
  },
  {
    "category": "vocabulary",
    "front": "同意",
    "back": "agreement, consent",
    "exampleJp": "手術を受ける前に、患者の家族から書面で同意を得る必要がある。",
    "exampleTranslation": "Before undergoing surgery, it's necessary to obtain written consent from the patient's family.",
    "tags": [
      "n3",
      "vocabulary",
      "social",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0422"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 422
  },
  {
    "category": "vocabulary",
    "front": "納得",
    "back": "understanding, consent",
    "exampleJp": "何度も説明を聞いて、ようやくそのシステムの使い方に納得した。",
    "exampleTranslation": "After hearing the explanation many times, I finally understood how to use the system.",
    "tags": [
      "n3",
      "vocabulary",
      "emotion",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0423"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 423
  },
  {
    "category": "vocabulary",
    "front": "諦め",
    "back": "resignation, giving up",
    "exampleJp": "もう修理できないと言われ、古い時計を直すのは諦めがついた。",
    "exampleTranslation": "Being told it could no longer be repaired, I resigned myself to not fixing the old watch.",
    "tags": [
      "n3",
      "vocabulary",
      "emotion",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0424"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 424
  },
  {
    "category": "vocabulary",
    "front": "予想外",
    "back": "unexpected",
    "exampleJp": "予想外のトラブルが発生し、イベントの開始が遅れてしまった。",
    "exampleTranslation": "An unexpected trouble occurred, and the start of the event was delayed.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "no-adjective"
    ],
    "sourceIds": [
      "n3-vocab-0425"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 425
  },
  {
    "category": "vocabulary",
    "front": "偶然",
    "back": "coincidence, by chance",
    "exampleJp": "出張先のロビーで、偶然昔の同僚に出会って驚いた。",
    "exampleTranslation": "I was surprised to bump into an old colleague by chance in the lobby of my business trip destination.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "adverb"
    ],
    "sourceIds": [
      "n3-vocab-0426"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 426
  },
  {
    "category": "vocabulary",
    "front": "幸運",
    "back": "good luck, fortune",
    "exampleJp": "素晴らしい上司に恵まれたことは、私にとって本当に幸運でした。",
    "exampleTranslation": "Being blessed with a wonderful boss was truly good luck for me.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "na-adjective"
    ],
    "sourceIds": [
      "n3-vocab-0427"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 427
  },
  {
    "category": "vocabulary",
    "front": "不運",
    "back": "bad luck, misfortune",
    "exampleJp": "旅行中に財布を落としてしまうなんて、不運としか言いようがない。",
    "exampleTranslation": "Dropping my wallet during the trip is nothing but bad luck.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "na-adjective"
    ],
    "sourceIds": [
      "n3-vocab-0428"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 428
  },
  {
    "category": "vocabulary",
    "front": "幸福",
    "back": "happiness",
    "exampleJp": "家族全員が健康で笑顔でいられることが、一番の幸福だと思う。",
    "exampleTranslation": "I think that all my family members being healthy and smiling is the greatest happiness.",
    "tags": [
      "n3",
      "vocabulary",
      "emotion",
      "noun",
      "na-adjective"
    ],
    "sourceIds": [
      "n3-vocab-0429"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 429
  },
  {
    "category": "vocabulary",
    "front": "不幸",
    "back": "unhappiness, misfortune",
    "exampleJp": "世界中から、戦争や飢餓といった不幸をなくしたいと願っている。",
    "exampleTranslation": "I hope to eliminate misfortunes such as war and starvation from around the world.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "na-adjective"
    ],
    "sourceIds": [
      "n3-vocab-0430"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 430
  },
  {
    "category": "vocabulary",
    "front": "感情",
    "back": "emotion, feeling",
    "exampleJp": "人間は機械と違い、複雑な感情を持った生き物である。",
    "exampleTranslation": "Unlike machines, humans are creatures with complex emotions.",
    "tags": [
      "n3",
      "vocabulary",
      "emotion",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0431"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 431
  },
  {
    "category": "vocabulary",
    "front": "報道",
    "back": "news, reporting",
    "exampleJp": "昨日のテレビの報道によれば、その地域で大きな地震があったそうだ。",
    "exampleTranslation": "According to yesterday's television news, there was a major earthquake in that area.",
    "tags": [
      "n3",
      "vocabulary",
      "media",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0432"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 432
  },
  {
    "category": "vocabulary",
    "front": "放送",
    "back": "broadcast, broadcasting",
    "exampleJp": "オリンピックの開会式は、世界中に生放送される予定です。",
    "exampleTranslation": "The opening ceremony of the Olympics is scheduled to be broadcast live all over the world.",
    "tags": [
      "n3",
      "vocabulary",
      "media",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0433"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 433
  },
  {
    "category": "vocabulary",
    "front": "番組",
    "back": "program (e.g. TV)",
    "exampleJp": "私は毎週日曜日、動物のドキュメンタリー番組を楽しみにしています。",
    "exampleTranslation": "I look forward to the animal documentary program every Sunday.",
    "tags": [
      "n3",
      "vocabulary",
      "media",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0434"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 434
  },
  {
    "category": "vocabulary",
    "front": "記事",
    "back": "article (in a newspaper/magazine)",
    "exampleJp": "インターネットで、健康的な食事についての面白い記事を読んだ。",
    "exampleTranslation": "I read an interesting article about healthy eating on the internet.",
    "tags": [
      "n3",
      "vocabulary",
      "media",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0435"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 435
  },
  {
    "category": "vocabulary",
    "front": "週刊誌",
    "back": "weekly magazine",
    "exampleJp": "彼は通勤電車の中で、いつもスポーツ週刊誌を読んでいる。",
    "exampleTranslation": "He always reads a weekly sports magazine on the commuter train.",
    "tags": [
      "n3",
      "vocabulary",
      "media",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0436"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 436
  },
  {
    "category": "vocabulary",
    "front": "出版",
    "back": "publishing, publication",
    "exampleJp": "彼女が書いた小説が来月出版されることになり、とても喜んでいる。",
    "exampleTranslation": "The novel she wrote is going to be published next month, and she is very happy.",
    "tags": [
      "n3",
      "vocabulary",
      "media",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0437"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 437
  },
  {
    "category": "vocabulary",
    "front": "広告",
    "back": "advertisement",
    "exampleJp": "スマートフォンの画面に表示される広告を、消す方法が知りたい。",
    "exampleTranslation": "I want to know how to remove the advertisements displayed on my smartphone screen.",
    "tags": [
      "n3",
      "vocabulary",
      "media",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0438"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 438
  },
  {
    "category": "vocabulary",
    "front": "宣伝",
    "back": "publicity, advertisement",
    "exampleJp": "新しい商品の宣伝のために、有名な俳優がテレビに出ている。",
    "exampleTranslation": "A famous actor is appearing on TV for the publicity of the new product.",
    "tags": [
      "n3",
      "vocabulary",
      "media",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0439"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 439
  },
  {
    "category": "vocabulary",
    "front": "流行",
    "back": "trend, fashion",
    "exampleJp": "今年の冬は、この形のコートが若い女性の間で流行しているらしい。",
    "exampleTranslation": "It seems that this style of coat is trending among young women this winter.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0440"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 440
  },
  {
    "category": "vocabulary",
    "front": "噂",
    "back": "rumor",
    "exampleJp": "あの二人が来月結婚するという噂を聞いたけど、本当だろうか。",
    "exampleTranslation": "I heard a rumor that those two are getting married next month, but I wonder if it's true.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0441"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 441
  },
  {
    "category": "vocabulary",
    "front": "評判",
    "back": "reputation",
    "exampleJp": "あそこのケーキ屋はとても評判が良く、いつも行列ができている。",
    "exampleTranslation": "That cake shop has a very good reputation, and there's always a line.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0442"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 442
  },
  {
    "category": "vocabulary",
    "front": "情報",
    "back": "information",
    "exampleJp": "旅行に行く前に、現地の天気や交通の情報を集めておくべきだ。",
    "exampleTranslation": "Before going on a trip, you should gather information about the local weather and transportation.",
    "tags": [
      "n3",
      "vocabulary",
      "media",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0443"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 443
  },
  {
    "category": "vocabulary",
    "front": "調査",
    "back": "investigation, survey",
    "exampleJp": "消費者の好みを調べるため、全国で大規模なアンケート調査が行われた。",
    "exampleTranslation": "To find out consumer preferences, a large-scale questionnaire survey was conducted nationwide.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0444"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 444
  },
  {
    "category": "vocabulary",
    "front": "統計",
    "back": "statistics",
    "exampleJp": "政府の統計によると、日本の人口は少しずつ減少しているようだ。",
    "exampleTranslation": "According to government statistics, it seems Japan's population is gradually decreasing.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0445"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 445
  },
  {
    "category": "vocabulary",
    "front": "傾向",
    "back": "tendency, trend",
    "exampleJp": "最近の若者は、車を持たない傾向があると言われている。",
    "exampleTranslation": "It is said that young people these days have a tendency not to own cars.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0446"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 446
  },
  {
    "category": "vocabulary",
    "front": "事実",
    "back": "fact, truth",
    "exampleJp": "どんなに隠そうとしても、いつかは事実が明らかになるものだ。",
    "exampleTranslation": "No matter how much you try to hide it, the truth will eventually come to light.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0447"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 447
  },
  {
    "category": "vocabulary",
    "front": "事件",
    "back": "incident, case",
    "exampleJp": "昨日の夜、近所で強盗事件が発生し、警察が調べている。",
    "exampleTranslation": "Last night, a robbery incident occurred in the neighborhood, and the police are investigating.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0448"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 448
  },
  {
    "category": "vocabulary",
    "front": "事故",
    "back": "accident",
    "exampleJp": "高速道路で大きな交通事故があり、長時間渋滞に巻き込まれた。",
    "exampleTranslation": "There was a major traffic accident on the highway, and I was caught in a traffic jam for a long time.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0449"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 449
  },
  {
    "category": "vocabulary",
    "front": "犯罪",
    "back": "crime",
    "exampleJp": "インターネットを利用した新しいタイプの犯罪が増加している。",
    "exampleTranslation": "New types of crimes using the internet are increasing.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0450"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 450
  },
  {
    "category": "vocabulary",
    "front": "被害",
    "back": "damage, harm",
    "exampleJp": "今回の台風で、農作物に深刻な被害が出ているそうです。",
    "exampleTranslation": "I heard there is serious damage to crops due to this typhoon.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0451"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 451
  },
  {
    "category": "vocabulary",
    "front": "被害者",
    "back": "victim",
    "exampleJp": "弁護士は、詐欺の被害者を救うために全力を尽くした。",
    "exampleTranslation": "The lawyer did everything in his power to help the victims of the fraud.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0452"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 452
  },
  {
    "category": "vocabulary",
    "front": "犯人",
    "back": "criminal, culprit",
    "exampleJp": "防犯カメラの映像が手がかりになり、警察は犯人を捕まえた。",
    "exampleTranslation": "With the security camera footage as a clue, the police caught the criminal.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0453"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 453
  },
  {
    "category": "vocabulary",
    "front": "逮捕",
    "back": "arrest",
    "exampleJp": "ニュースで、有名な政治家が賄賂の疑いで逮捕されたと報じられた。",
    "exampleTranslation": "The news reported that a famous politician was arrested on suspicion of bribery.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0454"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 454
  },
  {
    "category": "vocabulary",
    "front": "殺人",
    "back": "murder",
    "exampleJp": "探偵小説を読んでいたら、恐ろしい殺人のシーンが出てきて眠れなくなった。",
    "exampleTranslation": "While reading a detective novel, a terrifying murder scene came up and I couldn't sleep.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0455"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 455
  },
  {
    "category": "vocabulary",
    "front": "盗難",
    "back": "theft, robbery",
    "exampleJp": "パスポートの盗難を防ぐため、常に身につけておくようにしてください。",
    "exampleTranslation": "To prevent the theft of your passport, please keep it on you at all times.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0456"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 456
  },
  {
    "category": "vocabulary",
    "front": "暴力",
    "back": "violence",
    "exampleJp": "話し合いで解決すべき問題に、暴力を使うのは絶対に間違っている。",
    "exampleTranslation": "It is absolutely wrong to use violence for problems that should be resolved through discussion.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0457"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 457
  },
  {
    "category": "vocabulary",
    "front": "法律",
    "back": "law",
    "exampleJp": "日本の法律では、二十歳未満の飲酒と喫煙は禁止されている。",
    "exampleTranslation": "Under Japanese law, drinking and smoking by those under twenty are prohibited.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0458"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 458
  },
  {
    "category": "vocabulary",
    "front": "規則",
    "back": "rule, regulation",
    "exampleJp": "寮の規則を破った学生は、退寮させられる可能性がある。",
    "exampleTranslation": "Students who break the dormitory rules may be forced to leave the dorm.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0459"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 459
  },
  {
    "category": "vocabulary",
    "front": "違反",
    "back": "violation, offense",
    "exampleJp": "スピード違反で警察に捕まり、高い罰金を払うことになった。",
    "exampleTranslation": "I was caught by the police for speeding and ended up paying a high fine.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0460"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 460
  },
  {
    "category": "vocabulary",
    "front": "罰金",
    "back": "fine, penalty",
    "exampleJp": "図書館の本の返却期限を過ぎると、罰金を取られることがあります。",
    "exampleTranslation": "If you exceed the return deadline for library books, you may be charged a fine.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0461"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 461
  },
  {
    "category": "vocabulary",
    "front": "裁判",
    "back": "trial, court",
    "exampleJp": "その複雑な事件の裁判は、結論が出るまでに何年もかかった。",
    "exampleTranslation": "The trial for that complex case took years before a conclusion was reached.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0462"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 462
  },
  {
    "category": "vocabulary",
    "front": "権利",
    "back": "right, privilege",
    "exampleJp": "すべての市民には、安全で平和な生活を送る権利がある。",
    "exampleTranslation": "All citizens have the right to lead a safe and peaceful life.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0463"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 463
  },
  {
    "category": "vocabulary",
    "front": "義務",
    "back": "duty, obligation",
    "exampleJp": "国民には税金を納める義務があり、それは社会を支えるためだ。",
    "exampleTranslation": "Citizens have a duty to pay taxes, which is to support society.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0464"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 464
  },
  {
    "category": "vocabulary",
    "front": "平等",
    "back": "equality",
    "exampleJp": "性別や年齢に関係なく、誰もが平等に教育を受けられるべきだ。",
    "exampleTranslation": "Everyone should be able to receive an education equally, regardless of gender or age.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun",
      "na-adjective"
    ],
    "sourceIds": [
      "n3-vocab-0465"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 465
  },
  {
    "category": "vocabulary",
    "front": "公平",
    "back": "fairness",
    "exampleJp": "試合のルールは、すべての参加者に対して公平でなければならない。",
    "exampleTranslation": "The rules of the game must be fair to all participants.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun",
      "na-adjective"
    ],
    "sourceIds": [
      "n3-vocab-0466"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 466
  },
  {
    "category": "vocabulary",
    "front": "差別",
    "back": "discrimination",
    "exampleJp": "人種や宗教による差別をなくすために、多くの人が活動している。",
    "exampleTranslation": "Many people are actively working to eliminate discrimination based on race and religion.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0467"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 467
  },
  {
    "category": "vocabulary",
    "front": "貧しい",
    "back": "poor, needy",
    "exampleJp": "彼は貧しい家庭に育ったが、努力して立派な医者になった。",
    "exampleTranslation": "He grew up in a poor family, but through hard work he became a fine doctor.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "i-adjective"
    ],
    "sourceIds": [
      "n3-vocab-0468"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 468
  },
  {
    "category": "vocabulary",
    "front": "豊か",
    "back": "wealthy, abundant, rich",
    "exampleJp": "この地域は自然が豊かで、美味しい果物がたくさんとれる。",
    "exampleTranslation": "This region is rich in nature, and lots of delicious fruits can be harvested.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "na-adjective"
    ],
    "sourceIds": [
      "n3-vocab-0469"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 469
  },
  {
    "category": "vocabulary",
    "front": "政治",
    "back": "politics",
    "exampleJp": "政治に無関心な若者が増えていることが、問題になっている。",
    "exampleTranslation": "The increasing number of young people indifferent to politics has become a problem.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0470"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 470
  },
  {
    "category": "vocabulary",
    "front": "選挙",
    "back": "election",
    "exampleJp": "来月行われる市長選挙には、３人の候補者が出馬する予定だ。",
    "exampleTranslation": "Three candidates are scheduled to run in the mayoral election being held next month.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0471"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 471
  },
  {
    "category": "vocabulary",
    "front": "投票",
    "back": "voting, poll",
    "exampleJp": "日曜日は選挙の投票に行った後、家族で食事に行く予定です。",
    "exampleTranslation": "On Sunday, after going to vote in the election, I plan to go out to eat with my family.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0472"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 472
  },
  {
    "category": "vocabulary",
    "front": "大統領",
    "back": "president",
    "exampleJp": "アメリカの大統領が来日し、両国の関係について話し合った。",
    "exampleTranslation": "The President of the United States visited Japan and discussed relations between the two countries.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0473"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 473
  },
  {
    "category": "vocabulary",
    "front": "首相",
    "back": "prime minister",
    "exampleJp": "日本の首相は、新しい経済政策についてのスピーチを行った。",
    "exampleTranslation": "The Prime Minister of Japan gave a speech about the new economic policy.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0474"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 474
  },
  {
    "category": "vocabulary",
    "front": "政府",
    "back": "government",
    "exampleJp": "政府は少子化対策として、子育て支援の予算を増やすと発表した。",
    "exampleTranslation": "The government announced that they will increase the budget for childcare support as a measure against the declining birthrate.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0475"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 475
  },
  {
    "category": "vocabulary",
    "front": "経済",
    "back": "economy",
    "exampleJp": "世界的な不況の影響で、国の経済がなかなか回復しない。",
    "exampleTranslation": "Due to the effects of the global recession, the country's economy is struggling to recover.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0476"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 476
  },
  {
    "category": "vocabulary",
    "front": "貿易",
    "back": "trade",
    "exampleJp": "日本は古くから、さまざまな国と貿易をして発展してきた。",
    "exampleTranslation": "Japan has developed through trading with various countries since ancient times.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0477"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 477
  },
  {
    "category": "vocabulary",
    "front": "輸出",
    "back": "export",
    "exampleJp": "この工場で作られた高品質な自動車は、主にヨーロッパへ輸出されている。",
    "exampleTranslation": "The high-quality cars made in this factory are mainly exported to Europe.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0478"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 478
  },
  {
    "category": "vocabulary",
    "front": "輸入",
    "back": "import",
    "exampleJp": "日本は石油や天然ガスなど、エネルギー資源の多くを輸入に頼っている。",
    "exampleTranslation": "Japan relies on imports for most of its energy resources, such as oil and natural gas.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0479"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 479
  },
  {
    "category": "vocabulary",
    "front": "産業",
    "back": "industry",
    "exampleJp": "この町は昔から農業が中心だったが、最近は観光産業に力を入れている。",
    "exampleTranslation": "This town used to be centered around agriculture, but lately they are putting effort into the tourism industry.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0480"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 480
  },
  {
    "category": "vocabulary",
    "front": "観光",
    "back": "sightseeing",
    "exampleJp": "京都は歴史的なお寺が多いので、外国人観光客にとても人気がある。",
    "exampleTranslation": "Kyoto has many historical temples, so it's very popular among foreign tourists.",
    "tags": [
      "n3",
      "vocabulary",
      "travel",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0481"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 481
  },
  {
    "category": "vocabulary",
    "front": "宿泊",
    "back": "lodging, accommodation",
    "exampleJp": "連休中はどこのホテルも満室で、宿泊先を見つけるのに苦労した。",
    "exampleTranslation": "During the consecutive holidays, all hotels were fully booked, and I had a hard time finding a place to stay.",
    "tags": [
      "n3",
      "vocabulary",
      "travel",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0482"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 482
  },
  {
    "category": "vocabulary",
    "front": "旅館",
    "back": "Japanese traditional inn",
    "exampleJp": "山の奥にある古い旅館に泊まって、ゆっくりと温泉を楽しみたい。",
    "exampleTranslation": "I want to stay at an old traditional inn deep in the mountains and enjoy the hot springs at a leisurely pace.",
    "tags": [
      "n3",
      "vocabulary",
      "travel",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0483"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 483
  },
  {
    "category": "vocabulary",
    "front": "民宿",
    "back": "guesthouse, bed and breakfast",
    "exampleJp": "学生時代の旅行では、ホテルよりも安い民宿によく泊まっていた。",
    "exampleTranslation": "When I traveled during my student days, I often stayed in guesthouses which were cheaper than hotels.",
    "tags": [
      "n3",
      "vocabulary",
      "travel",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0484"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 484
  },
  {
    "category": "vocabulary",
    "front": "温泉",
    "back": "hot spring",
    "exampleJp": "冬の寒い日に、雪景色を見ながら入る温泉は最高だ。",
    "exampleTranslation": "On a cold winter day, a hot spring that you enter while looking at the snowy scenery is the best.",
    "tags": [
      "n3",
      "vocabulary",
      "travel",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0485"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 485
  },
  {
    "category": "vocabulary",
    "front": "名所",
    "back": "famous place, famous sight",
    "exampleJp": "春になると、この公園は桜の名所として多くの人で賑わう。",
    "exampleTranslation": "When spring comes, this park bustles with many people as a famous cherry blossom viewing spot.",
    "tags": [
      "n3",
      "vocabulary",
      "travel",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0486"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 486
  },
  {
    "category": "vocabulary",
    "front": "遺跡",
    "back": "ruins, historic remains",
    "exampleJp": "古代の文明について学ぶため、エジプトのピラミッドなどの遺跡を訪れたい。",
    "exampleTranslation": "To learn about ancient civilizations, I want to visit ruins like the pyramids in Egypt.",
    "tags": [
      "n3",
      "vocabulary",
      "travel",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0487"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 487
  },
  {
    "category": "vocabulary",
    "front": "景色",
    "back": "scenery, landscape",
    "exampleJp": "展望台からの景色が美しすぎて、言葉が出なかった。",
    "exampleTranslation": "The scenery from the observatory was so beautiful that I was at a loss for words.",
    "tags": [
      "n3",
      "vocabulary",
      "travel",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0488"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 488
  },
  {
    "category": "vocabulary",
    "front": "風景",
    "back": "landscape, scenery",
    "exampleJp": "電車の中から見える田舎の風景は、私に故郷を思い出させる。",
    "exampleTranslation": "The countryside landscape seen from the train reminds me of my hometown.",
    "tags": [
      "n3",
      "vocabulary",
      "travel",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0489"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 489
  },
  {
    "category": "vocabulary",
    "front": "交通",
    "back": "traffic, transportation",
    "exampleJp": "この都市は地下鉄やバスなど、交通の便が非常に良くて住みやすい。",
    "exampleTranslation": "This city is very easy to live in because it has great transportation convenience, such as subways and buses.",
    "tags": [
      "n3",
      "vocabulary",
      "travel",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0490"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 490
  },
  {
    "category": "vocabulary",
    "front": "鉄道",
    "back": "railway, railroad",
    "exampleJp": "日本は鉄道網が発達しており、全国どこへでも電車で行くことができる。",
    "exampleTranslation": "Japan has a well-developed railway network, and you can go anywhere in the country by train.",
    "tags": [
      "n3",
      "vocabulary",
      "travel",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0491"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 491
  },
  {
    "category": "vocabulary",
    "front": "乗車",
    "back": "boarding (a train, bus, etc.)",
    "exampleJp": "危険ですので、ドアが閉まりかけてからのご乗車はおやめください。",
    "exampleTranslation": "It's dangerous, so please stop boarding after the doors have started to close.",
    "tags": [
      "n3",
      "vocabulary",
      "travel",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0492"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 492
  },
  {
    "category": "vocabulary",
    "front": "下車",
    "back": "alighting, getting off",
    "exampleJp": "途中の駅で下車して、名物のラーメンを食べてから目的地へ向かった。",
    "exampleTranslation": "I got off at a station along the way, ate the famous ramen, and then headed to my destination.",
    "tags": [
      "n3",
      "vocabulary",
      "travel",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0493"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 493
  },
  {
    "category": "vocabulary",
    "front": "運賃",
    "back": "fare",
    "exampleJp": "来月からバスの運賃が値上げされるとニュースで言っていた。",
    "exampleTranslation": "The news said that bus fares will be raised starting next month.",
    "tags": [
      "n3",
      "vocabulary",
      "travel",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0494"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 494
  },
  {
    "category": "vocabulary",
    "front": "時刻表",
    "back": "timetable",
    "exampleJp": "田舎の駅では電車の本数が少ないので、事前に時刻表をよく確認した。",
    "exampleTranslation": "Since there are few trains at rural stations, I carefully checked the timetable in advance.",
    "tags": [
      "n3",
      "vocabulary",
      "travel",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0495"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 495
  },
  {
    "category": "vocabulary",
    "front": "満員",
    "back": "full, crowded",
    "exampleJp": "朝の通勤電車はいつも満員で、立っているだけで疲れてしまう。",
    "exampleTranslation": "Morning commuter trains are always full, and just standing makes me tired.",
    "tags": [
      "n3",
      "vocabulary",
      "travel",
      "noun",
      "no-adjective"
    ],
    "sourceIds": [
      "n3-vocab-0496"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 496
  },
  {
    "category": "vocabulary",
    "front": "混雑",
    "back": "congestion, crowd",
    "exampleJp": "休日のショッピングモールはひどい混雑で、歩くのも大変だった。",
    "exampleTranslation": "The shopping mall on the holiday was terribly crowded, and even walking was difficult.",
    "tags": [
      "n3",
      "vocabulary",
      "travel",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0497"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 497
  },
  {
    "category": "vocabulary",
    "front": "渋滞",
    "back": "traffic jam",
    "exampleJp": "事故のせいで激しい渋滞が発生し、予定より２時間も遅れて到着した。",
    "exampleTranslation": "Due to an accident, a heavy traffic jam occurred, and we arrived two hours later than planned.",
    "tags": [
      "n3",
      "vocabulary",
      "travel",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0498"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 498
  },
  {
    "category": "vocabulary",
    "front": "通過",
    "back": "passing through, transit",
    "exampleJp": "この特急列車は次の駅を通過するので、降りる人は各駅停車に乗り換えてください。",
    "exampleTranslation": "This limited express train will pass through the next station, so if you are getting off, please transfer to a local train.",
    "tags": [
      "n3",
      "vocabulary",
      "travel",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0499"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 499
  },
  {
    "category": "vocabulary",
    "front": "到着",
    "back": "arrival",
    "exampleJp": "飛行機は無事に空港に到着し、私はすぐに家族に電話をかけた。",
    "exampleTranslation": "The airplane arrived safely at the airport, and I immediately called my family.",
    "tags": [
      "n3",
      "vocabulary",
      "travel",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0500"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 500
  },
  {
    "category": "vocabulary",
    "front": "帰国",
    "back": "return to one's country",
    "exampleJp": "彼は３年間の海外留学を終えて、来月ついに日本へ帰国する。",
    "exampleTranslation": "After completing his three years of study abroad, he will finally return to Japan next month.",
    "tags": [
      "n3",
      "vocabulary",
      "travel",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0501"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 501
  },
  {
    "category": "vocabulary",
    "front": "出張",
    "back": "business trip",
    "exampleJp": "来週は大阪へ出張に行くので、水曜日の会議には参加できません。",
    "exampleTranslation": "I'll be going on a business trip to Osaka next week, so I cannot attend Wednesday's meeting.",
    "tags": [
      "n3",
      "vocabulary",
      "travel",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0502"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 502
  },
  {
    "category": "vocabulary",
    "front": "日帰り",
    "back": "day trip",
    "exampleJp": "仕事が忙しいので、週末は近場へ日帰り旅行に行くことにした。",
    "exampleTranslation": "Because I'm busy with work, I decided to go on a day trip nearby for the weekend.",
    "tags": [
      "n3",
      "vocabulary",
      "travel",
      "noun",
      "no-adjective"
    ],
    "sourceIds": [
      "n3-vocab-0503"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 503
  },
  {
    "category": "vocabulary",
    "front": "迷子",
    "back": "lost child, getting lost",
    "exampleJp": "デパートで迷子になった子供が、サービスカウンターで泣いている。",
    "exampleTranslation": "A child who got lost in the department store is crying at the service counter.",
    "tags": [
      "n3",
      "vocabulary",
      "travel",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0504"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 504
  },
  {
    "category": "vocabulary",
    "front": "自然",
    "back": "nature",
    "exampleJp": "都会の騒音から離れて、豊かな自然の中でリラックスしたい。",
    "exampleTranslation": "I want to get away from the noise of the city and relax in rich nature.",
    "tags": [
      "n3",
      "vocabulary",
      "environment",
      "noun",
      "na-adjective"
    ],
    "sourceIds": [
      "n3-vocab-0505"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 505
  },
  {
    "category": "vocabulary",
    "front": "環境",
    "back": "environment",
    "exampleJp": "プラスチックごみを減らすことは、地球の環境を守ることに繋がる。",
    "exampleTranslation": "Reducing plastic waste leads to protecting the earth's environment.",
    "tags": [
      "n3",
      "vocabulary",
      "environment",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0506"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 506
  },
  {
    "category": "vocabulary",
    "front": "資源",
    "back": "resources",
    "exampleJp": "限りある天然資源を大切に使い、無駄遣いをなくさなければならない。",
    "exampleTranslation": "We must carefully use our limited natural resources and eliminate waste.",
    "tags": [
      "n3",
      "vocabulary",
      "environment",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0507"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 507
  },
  {
    "category": "vocabulary",
    "front": "地球",
    "back": "the earth",
    "exampleJp": "宇宙から見た地球は、青くて非常に美しい星だと言われている。",
    "exampleTranslation": "It is said that the Earth seen from space is a blue and exceedingly beautiful planet.",
    "tags": [
      "n3",
      "vocabulary",
      "environment",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0508"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 508
  },
  {
    "category": "vocabulary",
    "front": "太陽",
    "back": "sun",
    "exampleJp": "朝早く起きて、山の上から太陽が昇るのを見た。",
    "exampleTranslation": "I woke up early in the morning and watched the sun rise from the top of the mountain.",
    "tags": [
      "n3",
      "vocabulary",
      "environment",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0509"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 509
  },
  {
    "category": "vocabulary",
    "front": "気候",
    "back": "climate",
    "exampleJp": "この国は一年中温暖な気候で、とても住みやすいです。",
    "exampleTranslation": "This country has a warm climate all year round and is very easy to live in.",
    "tags": [
      "n3",
      "vocabulary",
      "environment",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0510"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 510
  },
  {
    "category": "vocabulary",
    "front": "温暖化",
    "back": "global warming",
    "exampleJp": "地球温暖化の影響で、北極の氷が少しずつ溶けているらしい。",
    "exampleTranslation": "It seems that the ice in the Arctic is melting little by little due to the effects of global warming.",
    "tags": [
      "n3",
      "vocabulary",
      "environment",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0511"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 511
  },
  {
    "category": "vocabulary",
    "front": "汚染",
    "back": "pollution, contamination",
    "exampleJp": "工場の排水によって川の水が汚染され、多くの魚が死んでしまった。",
    "exampleTranslation": "The river water was polluted by factory drainage, and many fish died.",
    "tags": [
      "n3",
      "vocabulary",
      "environment",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0512"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 512
  },
  {
    "category": "vocabulary",
    "front": "公害",
    "back": "pollution, public nuisance",
    "exampleJp": "高度経済成長の時代には、激しい公害が大きな社会問題となった。",
    "exampleTranslation": "During the period of high economic growth, severe pollution became a major social problem.",
    "tags": [
      "n3",
      "vocabulary",
      "environment",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0513"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 513
  },
  {
    "category": "vocabulary",
    "front": "森林",
    "back": "forest",
    "exampleJp": "森林が破壊されると、多くの動物たちが住む場所を失ってしまう。",
    "exampleTranslation": "When forests are destroyed, many animals lose their habitats.",
    "tags": [
      "n3",
      "vocabulary",
      "environment",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0514"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 514
  },
  {
    "category": "vocabulary",
    "front": "砂漠",
    "back": "desert",
    "exampleJp": "雨がほとんど降らない地域では、緑が失われて砂漠になっていく。",
    "exampleTranslation": "In regions where it hardly rains, the greenery is lost and they turn into deserts.",
    "tags": [
      "n3",
      "vocabulary",
      "environment",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0515"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 515
  },
  {
    "category": "vocabulary",
    "front": "災害",
    "back": "disaster",
    "exampleJp": "日本は地震や台風などの自然災害が多いので、日頃の準備が必要だ。",
    "exampleTranslation": "Since Japan has many natural disasters like earthquakes and typhoons, daily preparation is necessary.",
    "tags": [
      "n3",
      "vocabulary",
      "environment",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0516"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 516
  },
  {
    "category": "vocabulary",
    "front": "地震",
    "back": "earthquake",
    "exampleJp": "突然大きな地震が起きたら、まず机の下に隠れて頭を守ってください。",
    "exampleTranslation": "If a major earthquake suddenly occurs, please first hide under a desk and protect your head.",
    "tags": [
      "n3",
      "vocabulary",
      "environment",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0517"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 517
  },
  {
    "category": "vocabulary",
    "front": "津波",
    "back": "tsunami, tidal wave",
    "exampleJp": "強い地震の直後は、津波が来る恐れがあるので海に近づかないでください。",
    "exampleTranslation": "Right after a strong earthquake, there is a risk of a tsunami, so please do not approach the sea.",
    "tags": [
      "n3",
      "vocabulary",
      "environment",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0518"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 518
  },
  {
    "category": "vocabulary",
    "front": "洪水",
    "back": "flood",
    "exampleJp": "何日も大雨が降り続いたせいで、川があふれて洪水になった。",
    "exampleTranslation": "Because heavy rain continued for days, the river overflowed and caused a flood.",
    "tags": [
      "n3",
      "vocabulary",
      "environment",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0519"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 519
  },
  {
    "category": "vocabulary",
    "front": "停電",
    "back": "power outage, blackout",
    "exampleJp": "雷が落ちて突然停電になり、部屋の中が真っ暗になってしまった。",
    "exampleTranslation": "Lightning struck and caused a sudden power outage, and the inside of the room went pitch black.",
    "tags": [
      "n3",
      "vocabulary",
      "environment",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0520"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 520
  },
  {
    "category": "vocabulary",
    "front": "避難",
    "back": "evacuation",
    "exampleJp": "火事のベルが鳴ったら、落ち着いて近くの階段から避難してください。",
    "exampleTranslation": "If the fire alarm rings, please stay calm and evacuate using the nearby stairs.",
    "tags": [
      "n3",
      "vocabulary",
      "environment",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0521"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 521
  },
  {
    "category": "vocabulary",
    "front": "救助",
    "back": "rescue",
    "exampleJp": "雪山で遭難した登山者を助けるため、ヘリコプターが救助に向かった。",
    "exampleTranslation": "A helicopter headed out for rescue to save the climbers who were stranded in the snowy mountains.",
    "tags": [
      "n3",
      "vocabulary",
      "environment",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0522"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 522
  },
  {
    "category": "vocabulary",
    "front": "安全",
    "back": "safety",
    "exampleJp": "工場では、作業員の安全を第一に考えて機械の点検を行っている。",
    "exampleTranslation": "In the factory, they inspect the machines putting the safety of the workers first.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun",
      "na-adjective"
    ],
    "sourceIds": [
      "n3-vocab-0523"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 523
  },
  {
    "category": "vocabulary",
    "front": "危険",
    "back": "danger",
    "exampleJp": "夜道は暗くて危険なので、なるべく明るい広い道を通って帰りなさい。",
    "exampleTranslation": "Walking at night is dark and dangerous, so take a wide, bright road home as much as possible.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun",
      "na-adjective"
    ],
    "sourceIds": [
      "n3-vocab-0524"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 524
  },
  {
    "category": "vocabulary",
    "front": "防止",
    "back": "prevention",
    "exampleJp": "交通事故を防止するために、警察がドライバーに注意を呼びかけている。",
    "exampleTranslation": "To prevent traffic accidents, the police are calling on drivers to be careful.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0525"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 525
  },
  {
    "category": "vocabulary",
    "front": "保護",
    "back": "protection, conservation",
    "exampleJp": "自然保護のボランティアに参加して、海岸のゴミ拾いをした。",
    "exampleTranslation": "I participated in a nature conservation volunteer group and picked up trash on the beach.",
    "tags": [
      "n3",
      "vocabulary",
      "environment",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0526"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 526
  },
  {
    "category": "vocabulary",
    "front": "衛生",
    "back": "hygiene, sanitation",
    "exampleJp": "飲食店では、食中毒を防ぐために衛生管理が徹底されている。",
    "exampleTranslation": "In restaurants, hygiene management is thoroughly enforced to prevent food poisoning.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0527"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 527
  },
  {
    "category": "vocabulary",
    "front": "清潔",
    "back": "clean, sanitary",
    "exampleJp": "トイレはいつも清潔にして、次に使う人が気持ちよく使えるようにしよう。",
    "exampleTranslation": "Let's always keep the toilet clean so the next person can use it comfortably.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun",
      "na-adjective"
    ],
    "sourceIds": [
      "n3-vocab-0528"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 528
  },
  {
    "category": "vocabulary",
    "front": "予防",
    "back": "prevention (e.g. of disease)",
    "exampleJp": "風邪の予防には、家に帰った時に手洗いとうがいをすることが一番だ。",
    "exampleTranslation": "For the prevention of a cold, washing your hands and gargling when you get home is the best.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0529"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 529
  },
  {
    "category": "vocabulary",
    "front": "回復",
    "back": "recovery",
    "exampleJp": "数日間ゆっくり休んだおかげで、熱も下がり体力が回復してきた。",
    "exampleTranslation": "Thanks to taking a good rest for a few days, my fever went down and my strength is recovering.",
    "tags": [
      "n3",
      "vocabulary",
      "society",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0530"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 530
  },
  {
    "category": "vocabulary",
    "front": "診察",
    "back": "medical examination",
    "exampleJp": "お腹が痛いので、午後から病院へ行って医者の診察を受けるつもりだ。",
    "exampleTranslation": "My stomach hurts, so I plan to go to the hospital in the afternoon to get a medical examination from a doctor.",
    "tags": [
      "n3",
      "vocabulary",
      "health",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0531"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 531
  },
  {
    "category": "vocabulary",
    "front": "検査",
    "back": "inspection, medical examination",
    "exampleJp": "血液検査の結果が出るまでには、だいたい１週間くらいかかります。",
    "exampleTranslation": "It takes about a week for the results of the blood test to come out.",
    "tags": [
      "n3",
      "vocabulary",
      "health",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0532"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 532
  },
  {
    "category": "vocabulary",
    "front": "手術",
    "back": "surgery, operation",
    "exampleJp": "複雑な骨折だったため、治すには大掛かりな手術が必要だった。",
    "exampleTranslation": "Because it was a complex fracture, major surgery was required to fix it.",
    "tags": [
      "n3",
      "vocabulary",
      "health",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0533"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 533
  },
  {
    "category": "vocabulary",
    "front": "治療",
    "back": "medical treatment",
    "exampleJp": "この病気は早期に発見して適切な治療を受ければ、必ず治ります。",
    "exampleTranslation": "If this disease is discovered early and receives appropriate treatment, it will definitely be cured.",
    "tags": [
      "n3",
      "vocabulary",
      "health",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0534"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 534
  },
  {
    "category": "vocabulary",
    "front": "症状",
    "back": "symptom",
    "exampleJp": "熱や咳といった風邪の症状が出た場合は、無理をせずに休んでください。",
    "exampleTranslation": "If you develop cold symptoms such as a fever or cough, please do not push yourself and get some rest.",
    "tags": [
      "n3",
      "vocabulary",
      "health",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0535"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 535
  },
  {
    "category": "vocabulary",
    "front": "体温",
    "back": "body temperature",
    "exampleJp": "体温を測ってみたら３８度もあったので、今日は学校を休むことにした。",
    "exampleTranslation": "When I took my body temperature, it was 38 degrees, so I decided to take the day off from school.",
    "tags": [
      "n3",
      "vocabulary",
      "health",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0536"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 536
  },
  {
    "category": "vocabulary",
    "front": "栄養",
    "back": "nutrition",
    "exampleJp": "育ち盛りの子供には、栄養のバランスが良い食事を作ることが大切だ。",
    "exampleTranslation": "For growing children, it is important to make meals with a good balance of nutrition.",
    "tags": [
      "n3",
      "vocabulary",
      "health",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0537"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 537
  },
  {
    "category": "vocabulary",
    "front": "睡眠",
    "back": "sleep",
    "exampleJp": "最近忙しくて睡眠が十分に取れておらず、仕事中に眠くなってしまう。",
    "exampleTranslation": "I've been busy lately and haven't been getting enough sleep, so I get sleepy during work.",
    "tags": [
      "n3",
      "vocabulary",
      "health",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0538"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 538
  },
  {
    "category": "vocabulary",
    "front": "休憩",
    "back": "break, rest",
    "exampleJp": "長時間の運転は危険なので、２時間ごとにサービスエリアで休憩をとろう。",
    "exampleTranslation": "Driving for a long time is dangerous, so let's take a break at a service area every two hours.",
    "tags": [
      "n3",
      "vocabulary",
      "health",
      "work",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0539"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 539
  },
  {
    "category": "vocabulary",
    "front": "呼吸",
    "back": "breathing",
    "exampleJp": "深く深呼吸をしてからスピーチを始めたら、少し緊張が和らいだ。",
    "exampleTranslation": "When I started my speech after taking a deep breath, my nervousness eased a little.",
    "tags": [
      "n3",
      "vocabulary",
      "health",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0540"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 540
  },
  {
    "category": "vocabulary",
    "front": "血液",
    "back": "blood",
    "exampleJp": "病院で血液の型を調べてもらったところ、私はＡ型だと分かった。",
    "exampleTranslation": "When I had my blood type checked at the hospital, I found out I am type A.",
    "tags": [
      "n3",
      "vocabulary",
      "health",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0541"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 541
  },
  {
    "category": "vocabulary",
    "front": "骨折",
    "back": "bone fracture",
    "exampleJp": "スキーで転んで足の骨を骨折してしまい、松葉杖の生活になった。",
    "exampleTranslation": "I fell while skiing and fractured my leg bone, ending up living on crutches.",
    "tags": [
      "n3",
      "vocabulary",
      "health",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0542"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 542
  },
  {
    "category": "vocabulary",
    "front": "招待",
    "back": "invitation",
    "exampleJp": "来月行われる友人の結婚式に招待されたので、ドレスを買わなければならない。",
    "exampleTranslation": "I was invited to a friend's wedding next month, so I have to buy a dress.",
    "tags": [
      "n3",
      "vocabulary",
      "social",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0543"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 543
  },
  {
    "category": "vocabulary",
    "front": "案内",
    "back": "guidance, showing around",
    "exampleJp": "外国から来た友達に、東京の有名な観光地を案内してあげた。",
    "exampleTranslation": "I showed my friend from abroad around famous sightseeing spots in Tokyo.",
    "tags": [
      "n3",
      "vocabulary",
      "social",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0544"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 544
  },
  {
    "category": "vocabulary",
    "front": "連絡",
    "back": "contact, communication",
    "exampleJp": "電車の遅れで待ち合わせの時間に遅れそうだったので、急いで友達に連絡した。",
    "exampleTranslation": "Because the train was delayed and I was going to be late for the meetup time, I hurried and contacted my friend.",
    "tags": [
      "n3",
      "vocabulary",
      "social",
      "work",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0545"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 545
  },
  {
    "category": "vocabulary",
    "front": "報告",
    "back": "report",
    "exampleJp": "出張から戻ったら、なるべく早く課長に結果を報告してください。",
    "exampleTranslation": "When you return from your business trip, please report the results to the section chief as soon as possible.",
    "tags": [
      "n3",
      "vocabulary",
      "work",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0546"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 546
  },
  {
    "category": "vocabulary",
    "front": "相談",
    "back": "consultation",
    "exampleJp": "一人で悩まずに、まずは家族や信頼できる友人に相談してみるといい。",
    "exampleTranslation": "Instead of worrying alone, you should first try consulting your family or a trusted friend.",
    "tags": [
      "n3",
      "vocabulary",
      "social",
      "work",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0547"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 547
  },
  {
    "category": "vocabulary",
    "front": "提案",
    "back": "proposal, suggestion",
    "exampleJp": "売上を伸ばすための新しいアイデアを会議で提案したが、採用されなかった。",
    "exampleTranslation": "I proposed a new idea to increase sales at the meeting, but it was not adopted.",
    "tags": [
      "n3",
      "vocabulary",
      "work",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0548"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 548
  },
  {
    "category": "vocabulary",
    "front": "注文",
    "back": "order (for an item)",
    "exampleJp": "インターネットで本を注文したら、翌日の朝にはもう家に届いた。",
    "exampleTranslation": "When I ordered a book online, it arrived at my house by the very next morning.",
    "tags": [
      "n3",
      "vocabulary",
      "daily",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0549"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 549
  },
  {
    "category": "vocabulary",
    "front": "配達",
    "back": "delivery",
    "exampleJp": "私が留守の間に荷物の配達が来ていたようで、不在連絡票が入っていた。",
    "exampleTranslation": "It seems a package delivery came while I was not home, and there was a missed delivery notice left inside.",
    "tags": [
      "n3",
      "vocabulary",
      "daily",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0550"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 550
  },
  {
    "category": "vocabulary",
    "front": "請求",
    "back": "request, billing",
    "exampleJp": "今月のクレジットカードの請求金額が思ったより高くて驚いた。",
    "exampleTranslation": "I was surprised that this month's credit card billing amount was higher than I thought.",
    "tags": [
      "n3",
      "vocabulary",
      "finance",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0551"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 551
  },
  {
    "category": "vocabulary",
    "front": "支払",
    "back": "payment",
    "exampleJp": "オンラインショッピングの支払は、コンビニでも済ませることができる。",
    "exampleTranslation": "You can also complete the payment for online shopping at a convenience store.",
    "tags": [
      "n3",
      "vocabulary",
      "finance",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0552"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 552
  },
  {
    "category": "vocabulary",
    "front": "領収書",
    "back": "receipt",
    "exampleJp": "会社に交通費を申請するために必要なので、タクシーの領収書をください。",
    "exampleTranslation": "I need it to apply for transportation expenses at the company, so please give me a taxi receipt.",
    "tags": [
      "n3",
      "vocabulary",
      "finance",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0553"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 553
  },
  {
    "category": "vocabulary",
    "front": "会計",
    "back": "bill, accounting",
    "exampleJp": "レストランでの食事が終わったら、レジでお会計をお願いします。",
    "exampleTranslation": "When you finish your meal at the restaurant, please ask for the bill at the register.",
    "tags": [
      "n3",
      "vocabulary",
      "finance",
      "daily",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0554"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 554
  },
  {
    "category": "vocabulary",
    "front": "計算",
    "back": "calculation",
    "exampleJp": "複雑な計算は頭の中だけでやろうとせず、電卓を使った方が早い。",
    "exampleTranslation": "For complex calculations, it's faster to use a calculator rather than trying to do them just in your head.",
    "tags": [
      "n3",
      "vocabulary",
      "abstract",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0555"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 555
  },
  {
    "category": "vocabulary",
    "front": "金額",
    "back": "amount of money",
    "exampleJp": "見積もりの金額が高すぎたので、別の会社にも依頼してみることにした。",
    "exampleTranslation": "Because the estimated amount of money was too high, I decided to try requesting it from another company.",
    "tags": [
      "n3",
      "vocabulary",
      "finance",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0556"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 556
  },
  {
    "category": "vocabulary",
    "front": "現金",
    "back": "cash",
    "exampleJp": "この小さな店ではクレジットカードが使えず、現金でしか払えなかった。",
    "exampleTranslation": "I couldn't use a credit card at this small shop and could only pay with cash.",
    "tags": [
      "n3",
      "vocabulary",
      "finance",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0557"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 557
  },
  {
    "category": "vocabulary",
    "front": "貯金",
    "back": "savings",
    "exampleJp": "将来マイホームを買うために、毎月少しずつ貯金をしている。",
    "exampleTranslation": "To buy my own home in the future, I am putting aside a little savings every month.",
    "tags": [
      "n3",
      "vocabulary",
      "finance",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0558"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 558
  },
  {
    "category": "vocabulary",
    "front": "借金",
    "back": "debt",
    "exampleJp": "彼はギャンブルで大きな借金を作り、家族に大変な迷惑をかけた。",
    "exampleTranslation": "He accumulated a massive debt from gambling and caused terrible trouble for his family.",
    "tags": [
      "n3",
      "vocabulary",
      "finance",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0559"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 559
  },
  {
    "category": "vocabulary",
    "front": "料金",
    "back": "fee, charge",
    "exampleJp": "スマートフォンの通信料金を下げるために、別のプランに変更した。",
    "exampleTranslation": "To lower my smartphone communication fee, I changed to a different plan.",
    "tags": [
      "n3",
      "vocabulary",
      "finance",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0560"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 560
  },
  {
    "category": "vocabulary",
    "front": "無料",
    "back": "free of charge",
    "exampleJp": "この美術館は、毎週水曜日には誰でも無料で入館することができます。",
    "exampleTranslation": "Anyone can enter this art museum for free every Wednesday.",
    "tags": [
      "n3",
      "vocabulary",
      "finance",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0561"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 561
  },
  {
    "category": "vocabulary",
    "front": "有料",
    "back": "paid, not free",
    "exampleJp": "この先は有料の高速道路になるので、料金所でお金を払う必要がある。",
    "exampleTranslation": "From here on it becomes a paid expressway, so you need to pay money at the tollbooth.",
    "tags": [
      "n3",
      "vocabulary",
      "finance",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0562"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 562
  },
  {
    "category": "vocabulary",
    "front": "営業",
    "back": "business, sales",
    "exampleJp": "新しい顧客を見つけるため、毎日いろいろな会社を回って営業している。",
    "exampleTranslation": "To find new clients, I am doing sales by going around to various companies every day.",
    "tags": [
      "n3",
      "vocabulary",
      "work",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0563"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 563
  },
  {
    "category": "vocabulary",
    "front": "経営",
    "back": "management",
    "exampleJp": "父が経営しているレストランは、地元の人たちに長く愛されている。",
    "exampleTranslation": "The restaurant my father manages has been loved by locals for a long time.",
    "tags": [
      "n3",
      "vocabulary",
      "work",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0564"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 564
  },
  {
    "category": "vocabulary",
    "front": "就職",
    "back": "finding employment",
    "exampleJp": "大学を卒業した後は、有名なIT企業に就職することが決まった。",
    "exampleTranslation": "After graduating from university, it was decided that I would find employment at a famous IT company.",
    "tags": [
      "n3",
      "vocabulary",
      "work",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0565"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 565
  },
  {
    "category": "vocabulary",
    "front": "退職",
    "back": "retirement, resignation",
    "exampleJp": "長年勤めた会社を定年で退職した後は、夫婦で世界旅行をしたい。",
    "exampleTranslation": "After retiring from the company I've worked at for many years at retirement age, I want to travel the world with my spouse.",
    "tags": [
      "n3",
      "vocabulary",
      "work",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0566"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 566
  },
  {
    "category": "vocabulary",
    "front": "面接",
    "back": "interview",
    "exampleJp": "就職活動の面接では、自分の強みをしっかりとアピールすることが大切だ。",
    "exampleTranslation": "In job hunting interviews, it's important to firmly appeal your strengths.",
    "tags": [
      "n3",
      "vocabulary",
      "work",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0567"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 567
  },
  {
    "category": "vocabulary",
    "front": "給料",
    "back": "salary",
    "exampleJp": "仕事は大変だが、毎月安定した給料をもらえるので安心している。",
    "exampleTranslation": "The work is hard, but I feel secure because I receive a stable salary every month.",
    "tags": [
      "n3",
      "vocabulary",
      "work",
      "finance",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0568"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 568
  },
  {
    "category": "vocabulary",
    "front": "労働",
    "back": "labor",
    "exampleJp": "長時間の過酷な労働が続いたことで、彼はついに体を壊してしまった。",
    "exampleTranslation": "Due to continued long hours of harsh labor, he finally ruined his health.",
    "tags": [
      "n3",
      "vocabulary",
      "work",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0569"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 569
  },
  {
    "category": "vocabulary",
    "front": "出勤",
    "back": "going to work",
    "exampleJp": "毎朝７時に家を出て、満員電車に揺られながら会社へ出勤しています。",
    "exampleTranslation": "Every morning I leave the house at 7 o'clock and go to work being jolted on a crowded train.",
    "tags": [
      "n3",
      "vocabulary",
      "work",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0570"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 570
  },
  {
    "category": "vocabulary",
    "front": "残業",
    "back": "overtime work",
    "exampleJp": "今日中に終わらせなければならない仕事があり、遅くまで残業した。",
    "exampleTranslation": "I had work that I had to finish by the end of today, so I worked overtime until late.",
    "tags": [
      "n3",
      "vocabulary",
      "work",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0571"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 571
  },
  {
    "category": "vocabulary",
    "front": "欠席",
    "back": "absence",
    "exampleJp": "熱が高くてどうしても起きられないので、本日のゼミは欠席します。",
    "exampleTranslation": "I have a high fever and simply cannot get up, so I will be absent from today's seminar.",
    "tags": [
      "n3",
      "vocabulary",
      "work",
      "school",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0572"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 572
  },
  {
    "category": "vocabulary",
    "front": "出席",
    "back": "attendance",
    "exampleJp": "来週の会議に出席できるかどうか、スケジュールを確認して返事します。",
    "exampleTranslation": "I will check my schedule and reply on whether I can attend next week's meeting.",
    "tags": [
      "n3",
      "vocabulary",
      "work",
      "school",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0573"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 573
  },
  {
    "category": "vocabulary",
    "front": "参加",
    "back": "participation",
    "exampleJp": "地域のゴミ拾いボランティアに、家族全員で参加することにした。",
    "exampleTranslation": "We decided to participate as a whole family in the community trash-pickup volunteering.",
    "tags": [
      "n3",
      "vocabulary",
      "social",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0574"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 574
  },
  {
    "category": "vocabulary",
    "front": "申込",
    "back": "application",
    "exampleJp": "スポーツクラブの入会申込は、インターネットからでも可能です。",
    "exampleTranslation": "Membership applications for the sports club are also possible via the internet.",
    "tags": [
      "n3",
      "vocabulary",
      "social",
      "work",
      "noun"
    ],
    "sourceIds": [
      "n3-vocab-0575"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 575
  },
  {
    "category": "vocabulary",
    "front": "準備",
    "back": "preparation",
    "exampleJp": "明日のパーティーのために、料理や飲み物の準備を急いで進めている。",
    "exampleTranslation": "I am hurriedly proceeding with the preparation of food and drinks for tomorrow's party.",
    "tags": [
      "n3",
      "vocabulary",
      "daily",
      "work",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0576"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 576
  },
  {
    "category": "vocabulary",
    "front": "整理",
    "back": "organization, putting in order",
    "exampleJp": "引っ越しの前に、もう着なくなった古い服を整理して捨てた。",
    "exampleTranslation": "Before moving, I organized and threw away old clothes that I no longer wear.",
    "tags": [
      "n3",
      "vocabulary",
      "daily",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0577"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 577
  },
  {
    "category": "vocabulary",
    "front": "修理",
    "back": "repair",
    "exampleJp": "壊れたパソコンを修理に出したが、直るまでに１週間かかるそうだ。",
    "exampleTranslation": "I sent my broken computer in for repair, but they say it will take a week to be fixed.",
    "tags": [
      "n3",
      "vocabulary",
      "daily",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0578"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 578
  },
  {
    "category": "vocabulary",
    "front": "変更",
    "back": "change, modification",
    "exampleJp": "予約していたホテルの日程を変更したい場合は、早めに連絡してください。",
    "exampleTranslation": "If you want to change the dates for the hotel you booked, please contact them early.",
    "tags": [
      "n3",
      "vocabulary",
      "work",
      "daily",
      "noun",
      "suru-verb"
    ],
    "sourceIds": [
      "n3-vocab-0579"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 579
  },
  {
    "category": "vocabulary",
    "front": "謝る",
    "back": "to apologize",
    "exampleJp": "自分が間違っていたことに気づき、すぐに彼に謝った。",
    "exampleTranslation": "I realized I was wrong and immediately apologized to him.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0580"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 580
  },
  {
    "category": "vocabulary",
    "front": "譲る",
    "back": "to yield, to hand over",
    "exampleJp": "満員のバスの中で、お年寄りに席を譲った。",
    "exampleTranslation": "I gave up my seat to an elderly person on the crowded bus.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0581"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 581
  },
  {
    "category": "vocabulary",
    "front": "確かめる",
    "back": "to confirm, to verify",
    "exampleJp": "提出する前に、もう一度書類の数字を確かめてください。",
    "exampleTranslation": "Please verify the numbers on the document once more before submitting.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0582"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 582
  },
  {
    "category": "vocabulary",
    "front": "失望",
    "back": "disappointment",
    "exampleJp": "彼が約束を破ったことに、ただ失望するしかなかった。",
    "exampleTranslation": "I could do nothing but be disappointed that he broke his promise.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0583"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 583
  },
  {
    "category": "vocabulary",
    "front": "苦労",
    "back": "hardship, trouble",
    "exampleJp": "若い頃に苦労した経験が、今の仕事に生きている。",
    "exampleTranslation": "The hardships I experienced in my youth are useful in my current job.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0584"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 584
  },
  {
    "category": "vocabulary",
    "front": "効果",
    "back": "effect, effectiveness",
    "exampleJp": "この薬を飲んだら、すぐに効果が表れて熱が下がった。",
    "exampleTranslation": "When I took this medicine, it took effect immediately and my fever went down.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0585"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 585
  },
  {
    "category": "vocabulary",
    "front": "深刻",
    "back": "serious, severe",
    "exampleJp": "地球温暖化は、私たちが直面している深刻な問題だ。",
    "exampleTranslation": "Global warming is a serious problem we are facing.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0586"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 586
  },
  {
    "category": "vocabulary",
    "front": "複雑",
    "back": "complicated",
    "exampleJp": "機械の構造が複雑すぎて、修理するのに時間がかかった。",
    "exampleTranslation": "The structure of the machine was so complicated that it took a long time to repair.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0587"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 587
  },
  {
    "category": "vocabulary",
    "front": "契約",
    "back": "contract",
    "exampleJp": "アパートの契約を更新するために、不動産屋へ行った。",
    "exampleTranslation": "I went to the real estate agency to renew my apartment contract.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0588"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 588
  },
  {
    "category": "vocabulary",
    "front": "採用",
    "back": "recruitment, employment",
    "exampleJp": "厳しい審査の結果、彼が新しいデザイナーとして採用された。",
    "exampleTranslation": "As a result of strict screening, he was hired as the new designer.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0589"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 589
  },
  {
    "category": "vocabulary",
    "front": "辞める",
    "back": "to quit, to resign",
    "exampleJp": "自分の会社を立ち上げるために、10年働いた会社を辞めた。",
    "exampleTranslation": "I quit the company I had worked at for 10 years to start my own business.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0590"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 590
  },
  {
    "category": "vocabulary",
    "front": "通勤",
    "back": "commuting",
    "exampleJp": "毎朝、満員電車で1時間かけて通勤するのは疲れる。",
    "exampleTranslation": "It's tiring to commute for an hour every morning on a crowded train.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0591"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 591
  },
  {
    "category": "vocabulary",
    "front": "確認",
    "back": "confirmation",
    "exampleJp": "飛行機の出発時間を間違えないように、チケットを確認した。",
    "exampleTranslation": "I checked my ticket so as not to mistake the airplane's departure time.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0592"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 592
  },
  {
    "category": "vocabulary",
    "front": "締め切り",
    "back": "deadline",
    "exampleJp": "レポートの締め切りは明日の午後5時なので、急いで書いている。",
    "exampleTranslation": "The deadline for the report is 5 PM tomorrow, so I am writing it in a hurry.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0593"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 593
  },
  {
    "category": "vocabulary",
    "front": "延期",
    "back": "postponement",
    "exampleJp": "悪天候のため、野外イベントは来週に延期されました。",
    "exampleTranslation": "Due to bad weather, the outdoor event was postponed to next week.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0594"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 594
  },
  {
    "category": "vocabulary",
    "front": "調整",
    "back": "adjustment, coordination",
    "exampleJp": "全員が参加できるように、会議のスケジュールを調整している。",
    "exampleTranslation": "I am coordinating the meeting schedule so that everyone can participate.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0595"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 595
  },
  {
    "category": "vocabulary",
    "front": "努力",
    "back": "effort",
    "exampleJp": "彼は毎日努力を続け、プロのサッカー選手になる夢を叶えた。",
    "exampleTranslation": "He continued to make an effort every day and realized his dream of becoming a professional soccer player.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0596"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 596
  },
  {
    "category": "vocabulary",
    "front": "故障",
    "back": "breakdown, failure",
    "exampleJp": "エアコンが故障してしまい、部屋の中がとても暑い。",
    "exampleTranslation": "The air conditioner has broken down, and it's very hot inside the room.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0597"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 597
  },
  {
    "category": "vocabulary",
    "front": "点検",
    "back": "inspection",
    "exampleJp": "安全のために、エレベーターの定期的な点検が行われている。",
    "exampleTranslation": "For safety, regular inspections of the elevators are being carried out.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0598"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 598
  },
  {
    "category": "vocabulary",
    "front": "保険",
    "back": "insurance",
    "exampleJp": "万が一の病気やケガに備えて、医療保険に入っておくべきだ。",
    "exampleTranslation": "You should get medical insurance in case of an unexpected illness or injury.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0599"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 599
  },
  {
    "category": "vocabulary",
    "front": "税金",
    "back": "tax",
    "exampleJp": "毎年、決められた期限までに正しく税金を納めなければならない。",
    "exampleTranslation": "Every year, you must properly pay your taxes by the set deadline.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0600"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 600
  },
  {
    "category": "vocabulary",
    "front": "節約",
    "back": "saving (money), economy",
    "exampleJp": "将来のために、無駄な出費を減らして少しでも節約している。",
    "exampleTranslation": "For the future, I am reducing wasteful spending and saving even a little.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0601"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 601
  },
  {
    "category": "vocabulary",
    "front": "無駄",
    "back": "waste",
    "exampleJp": "誰もいない部屋の電気をつけておくのは、電気代の無駄だ。",
    "exampleTranslation": "Leaving the lights on in an empty room is a waste of electricity bills.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0602"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 602
  },
  {
    "category": "vocabulary",
    "front": "費用",
    "back": "cost, expense",
    "exampleJp": "海外留学には、授業料や生活費など多くの費用がかかる。",
    "exampleTranslation": "Studying abroad requires a lot of expenses such as tuition and living costs.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0603"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 603
  },
  {
    "category": "vocabulary",
    "front": "価格",
    "back": "price",
    "exampleJp": "最近、スーパーで売られている野菜の価格が急に上がった。",
    "exampleTranslation": "Recently, the price of vegetables sold at the supermarket has suddenly risen.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0604"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 604
  },
  {
    "category": "vocabulary",
    "front": "価値",
    "back": "value",
    "exampleJp": "この古い時計は、見た目はボロボロだが歴史的な価値がある。",
    "exampleTranslation": "This old watch looks worn out but has historical value.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0605"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 605
  },
  {
    "category": "vocabulary",
    "front": "割引",
    "back": "discount",
    "exampleJp": "学生証を見せると、映画館のチケットが20％割引になる。",
    "exampleTranslation": "If you show your student ID, movie theater tickets get a 20% discount.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0606"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 606
  },
  {
    "category": "vocabulary",
    "front": "物価",
    "back": "cost of living, prices",
    "exampleJp": "都会は便利で楽しい場所だが、地方に比べて物価が高い。",
    "exampleTranslation": "The city is a convenient and fun place, but the cost of living is higher compared to rural areas.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0607"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 607
  },
  {
    "category": "vocabulary",
    "front": "景気",
    "back": "economic conditions",
    "exampleJp": "国の経済対策のおかげで、少しずつ景気が回復してきた。",
    "exampleTranslation": "Thanks to the country's economic measures, the economy has gradually recovered.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0608"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 608
  },
  {
    "category": "vocabulary",
    "front": "農業",
    "back": "agriculture",
    "exampleJp": "私の祖父は田舎でずっと農業を続けていて、美味しい野菜を作っている。",
    "exampleTranslation": "My grandfather has been continuing agriculture in the countryside and grows delicious vegetables.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0609"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 609
  },
  {
    "category": "vocabulary",
    "front": "工業",
    "back": "manufacturing industry",
    "exampleJp": "この地域は昔から工業が盛んで、多くの工場が建ち並んでいる。",
    "exampleTranslation": "This region has prospered in manufacturing since old times, and many factories are lined up.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0610"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 610
  },
  {
    "category": "vocabulary",
    "front": "商業",
    "back": "commerce",
    "exampleJp": "駅前を中心に商業施設が集まり、いつも人で賑わっている。",
    "exampleTranslation": "Commercial facilities are gathered around the station, and it is always crowded with people.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0611"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 611
  },
  {
    "category": "vocabulary",
    "front": "滞在",
    "back": "stay",
    "exampleJp": "パリでの一週間の滞在中に、様々な美術館を訪れた。",
    "exampleTranslation": "During my one-week stay in Paris, I visited various art museums.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0612"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 612
  },
  {
    "category": "vocabulary",
    "front": "予約",
    "back": "reservation",
    "exampleJp": "人気のレストランなので、事前に予約しておかないと入れない。",
    "exampleTranslation": "Because it's a popular restaurant, you can't get in unless you make a reservation in advance.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0613"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 613
  },
  {
    "category": "vocabulary",
    "front": "手続き",
    "back": "procedure",
    "exampleJp": "市役所で引っ越しの手続きをするのに、かなり時間がかかった。",
    "exampleTranslation": "It took quite a bit of time to do the moving procedures at the city hall.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0614"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 614
  },
  {
    "category": "vocabulary",
    "front": "宅配便",
    "back": "home delivery service",
    "exampleJp": "親から送られてきた宅配便の中に、地元のお菓子が入っていた。",
    "exampleTranslation": "There were local sweets in the home delivery package sent from my parents.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0615"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 615
  },
  {
    "category": "vocabulary",
    "front": "忘れ物",
    "back": "lost property, something forgotten",
    "exampleJp": "電車の中に傘を忘れたので、駅の忘れ物センターに問い合わせた。",
    "exampleTranslation": "I left my umbrella on the train, so I inquired at the station's lost property center.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0616"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 616
  },
  {
    "category": "vocabulary",
    "front": "泥棒",
    "back": "thief",
    "exampleJp": "昨夜、留守の間に泥棒に入られ、現金と時計が盗まれた。",
    "exampleTranslation": "Last night, while I was away, a thief broke in and my cash and watch were stolen.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0617"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 617
  },
  {
    "category": "vocabulary",
    "front": "消防署",
    "back": "fire station",
    "exampleJp": "火事の知らせを受けると、消防署からすぐに消防車が出動した。",
    "exampleTranslation": "Upon receiving the fire alarm, fire engines were immediately dispatched from the fire station.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0618"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 618
  },
  {
    "category": "vocabulary",
    "front": "看病",
    "back": "nursing (a patient)",
    "exampleJp": "風邪で寝込んでいる子供を、夜通し看病してすっかり疲れた。",
    "exampleTranslation": "I am completely exhausted from nursing my child, who is in bed with a cold, all through the night.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0619"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 619
  },
  {
    "category": "vocabulary",
    "front": "薬局",
    "back": "pharmacy",
    "exampleJp": "病院でもらった処方箋を持って、近くの薬局へ薬をもらいに行った。",
    "exampleTranslation": "I took the prescription I got at the hospital and went to a nearby pharmacy to get my medicine.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0620"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 620
  },
  {
    "category": "vocabulary",
    "front": "注射",
    "back": "injection",
    "exampleJp": "インフルエンザを防ぐために、毎年冬の初めに予防注射を受けている。",
    "exampleTranslation": "To prevent the flu, I get a preventive injection at the beginning of winter every year.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0621"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 621
  },
  {
    "category": "vocabulary",
    "front": "健康",
    "back": "health",
    "exampleJp": "健康を維持するために、バランスの取れた食事と適度な運動を心がけている。",
    "exampleTranslation": "To maintain my health, I keep in mind to have a balanced diet and moderate exercise.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0622"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 622
  },
  {
    "category": "vocabulary",
    "front": "疲労",
    "back": "fatigue",
    "exampleJp": "長時間の運転で目が疲労していたため、サービスエリアで少し休んだ。",
    "exampleTranslation": "My eyes were experiencing fatigue from driving for a long time, so I rested a little at a service area.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0623"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 623
  },
  {
    "category": "vocabulary",
    "front": "運動",
    "back": "exercise",
    "exampleJp": "医者に運動不足を指摘されたので、毎朝ジョギングを始めることにした。",
    "exampleTranslation": "The doctor pointed out my lack of exercise, so I decided to start jogging every morning.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0624"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 624
  },
  {
    "category": "vocabulary",
    "front": "具合",
    "back": "condition (health)",
    "exampleJp": "朝からお腹の具合が悪くて、今日の会議には集中できそうにない。",
    "exampleTranslation": "My stomach has felt off since morning, so I don't think I can concentrate on today's meeting.",
    "tags": [
      "n3",
      "vocabulary",
      "vocabulary-top-up"
    ],
    "sourceIds": [
      "n3-vocab-0625"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 625
  },
  {
    "category": "kanji",
    "front": "政",
    "back": "politics, government",
    "exampleJp": "政府の方針が大きく変わるかもしれない。",
    "exampleTranslation": "The government's policy might change significantly.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0001"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 626
  },
  {
    "category": "kanji",
    "front": "議",
    "back": "debate, parliament",
    "exampleJp": "次回の会議は明日の午後に予定されている。",
    "exampleTranslation": "The next meeting is scheduled for tomorrow afternoon.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0002"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 627
  },
  {
    "category": "kanji",
    "front": "民",
    "back": "people, nation",
    "exampleJp": "多くの市民がそのイベントに参加しました。",
    "exampleTranslation": "Many citizens participated in the event.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0003"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 628
  },
  {
    "category": "kanji",
    "front": "連",
    "back": "take along, join",
    "exampleJp": "週末は連休なので、少し遠くまで出かけたい。",
    "exampleTranslation": "Since it's a long weekend, I want to travel a little far.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0004"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 629
  },
  {
    "category": "kanji",
    "front": "対",
    "back": "opposite, even",
    "exampleJp": "両親は私の留学に強く反対した。",
    "exampleTranslation": "My parents strongly opposed my studying abroad.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0005"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 630
  },
  {
    "category": "kanji",
    "front": "部",
    "back": "section, department",
    "exampleJp": "彼女は営業部の新しい部長として紹介された。",
    "exampleTranslation": "She was introduced as the new manager of the sales department.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0006"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 631
  },
  {
    "category": "kanji",
    "front": "合",
    "back": "fit, suit, join",
    "exampleJp": "都合が悪くて、明日の約束はキャンセルさせてください。",
    "exampleTranslation": "It's inconvenient for me, so please let me cancel tomorrow's appointment.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0007"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 632
  },
  {
    "category": "kanji",
    "front": "市",
    "back": "market, city",
    "exampleJp": "新しい市長は若い人たちの意見を大切にしている。",
    "exampleTranslation": "The new mayor values the opinions of young people.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0008"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 633
  },
  {
    "category": "kanji",
    "front": "内",
    "back": "inside, within",
    "exampleJp": "時間内にレポートを提出しなければならない。",
    "exampleTranslation": "You must submit the report within the time limit.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0009"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 634
  },
  {
    "category": "kanji",
    "front": "相",
    "back": "mutual, together",
    "exampleJp": "困ったことがあれば、いつでも私に相談してください。",
    "exampleTranslation": "If you have any trouble, please consult with me anytime.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0010"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 635
  },
  {
    "category": "kanji",
    "front": "定",
    "back": "fix, decide",
    "exampleJp": "休日は特に予定がなく、家でのんびり過ごした。",
    "exampleTranslation": "I had no particular plans for the holiday and spent it relaxing at home.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0011"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 636
  },
  {
    "category": "kanji",
    "front": "回",
    "back": "times, revolve",
    "exampleJp": "このアンケートは今回で3回目になります。",
    "exampleTranslation": "This is the third time we are doing this survey.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0012"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 637
  },
  {
    "category": "kanji",
    "front": "選",
    "back": "choose, elect",
    "exampleJp": "選挙に行くことは、私たちの重要な権利だ。",
    "exampleTranslation": "Voting in elections is our important right.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0013"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 638
  },
  {
    "category": "kanji",
    "front": "米",
    "back": "rice, America",
    "exampleJp": "日本人は昔から米を主食としてきた。",
    "exampleTranslation": "Japanese people have used rice as their staple food since ancient times.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0014"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 639
  },
  {
    "category": "kanji",
    "front": "実",
    "back": "fruit, reality",
    "exampleJp": "その計画はまだ実現するには早すぎる。",
    "exampleTranslation": "It is still too early to realize that plan.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0015"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 640
  },
  {
    "category": "kanji",
    "front": "関",
    "back": "connection, barrier",
    "exampleJp": "人間関係の悩みを抱えている人は多い。",
    "exampleTranslation": "Many people have worries about human relations.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0016"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 641
  },
  {
    "category": "kanji",
    "front": "決",
    "back": "decide, agree",
    "exampleJp": "どちらのパソコンを買うか、まだ決心がつかない。",
    "exampleTranslation": "I haven't made up my mind yet about which computer to buy.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0017"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 642
  },
  {
    "category": "kanji",
    "front": "全",
    "back": "whole, all",
    "exampleJp": "事故のせいで、電車が完全にストップしてしまった。",
    "exampleTranslation": "Because of the accident, the train completely stopped.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0018"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 643
  },
  {
    "category": "kanji",
    "front": "表",
    "back": "surface, express",
    "exampleJp": "彼の表情から、怒っていることがすぐにわかった。",
    "exampleTranslation": "I could tell right away from his expression that he was angry.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0019"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 644
  },
  {
    "category": "kanji",
    "front": "戦",
    "back": "war, fight",
    "exampleJp": "チームは最後の試合で激しく戦った。",
    "exampleTranslation": "The team fought fiercely in the final match.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0020"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 645
  },
  {
    "category": "kanji",
    "front": "経",
    "back": "pass through",
    "exampleJp": "経済の状況が少しずつ改善しているようだ。",
    "exampleTranslation": "The economic situation seems to be improving little by little.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0021"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 646
  },
  {
    "category": "kanji",
    "front": "最",
    "back": "most",
    "exampleJp": "最近、この辺りには新しい店が増えた。",
    "exampleTranslation": "Recently, the number of new stores in this area has increased.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0022"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 647
  },
  {
    "category": "kanji",
    "front": "現",
    "back": "present, existing",
    "exampleJp": "現在の状況では、目標を達成するのは難しい。",
    "exampleTranslation": "In the current situation, it is difficult to achieve the goal.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0023"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 648
  },
  {
    "category": "kanji",
    "front": "調",
    "back": "investigate",
    "exampleJp": "原因を詳しく調査する必要があります。",
    "exampleTranslation": "We need to investigate the cause in detail.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0024"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 649
  },
  {
    "category": "kanji",
    "front": "化",
    "back": "change, -ization",
    "exampleJp": "社会の高齢化は深刻な問題となっている。",
    "exampleTranslation": "The aging of society has become a serious problem.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0025"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 650
  },
  {
    "category": "kanji",
    "front": "当",
    "back": "hit, appropriate",
    "exampleJp": "本当に私が宝くじに当たったなんて信じられない。",
    "exampleTranslation": "I can't believe I actually won the lottery.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0026"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 651
  },
  {
    "category": "kanji",
    "front": "約",
    "back": "promise, approximately",
    "exampleJp": "約束の時間に10分遅れてしまった。",
    "exampleTranslation": "I was 10 minutes late for the promised time.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0027"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 652
  },
  {
    "category": "kanji",
    "front": "首",
    "back": "neck, head",
    "exampleJp": "彼女は首にきれいなスカーフを巻いている。",
    "exampleTranslation": "She is wearing a pretty scarf around her neck.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0028"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 653
  },
  {
    "category": "kanji",
    "front": "法",
    "back": "law, method",
    "exampleJp": "この機械の正しい使用法を教えてください。",
    "exampleTranslation": "Please tell me the correct way to use this machine.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0029"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 654
  },
  {
    "category": "kanji",
    "front": "性",
    "back": "sex, nature",
    "exampleJp": "男女の性格の違いについて面白い記事を読んだ。",
    "exampleTranslation": "I read an interesting article about the personality differences between men and women.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0030"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 655
  },
  {
    "category": "kanji",
    "front": "要",
    "back": "need, important",
    "exampleJp": "この書類を提出する前に、重要な点を確認して。",
    "exampleTranslation": "Before submitting this document, check the important points.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0031"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 656
  },
  {
    "category": "kanji",
    "front": "制",
    "back": "system, control",
    "exampleJp": "新しい制服のデザインは学生に人気がある。",
    "exampleTranslation": "The design of the new school uniform is popular among students.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0032"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 657
  },
  {
    "category": "kanji",
    "front": "治",
    "back": "govern, cure",
    "exampleJp": "風邪を早く治すために、薬を飲んで寝ます。",
    "exampleTranslation": "To cure my cold quickly, I will take medicine and sleep.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0033"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 658
  },
  {
    "category": "kanji",
    "front": "務",
    "back": "task, duties",
    "exampleJp": "私の事務所は駅から歩いて5分のところにあります。",
    "exampleTranslation": "My office is a five-minute walk from the station.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0034"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 659
  },
  {
    "category": "kanji",
    "front": "成",
    "back": "turn into, grow",
    "exampleJp": "努力が実り、彼はついに夢を成功させた。",
    "exampleTranslation": "His efforts paid off, and he finally made his dream a success.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0035"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 660
  },
  {
    "category": "kanji",
    "front": "期",
    "back": "period, time",
    "exampleJp": "期待していた映画は、思ったよりも面白くなかった。",
    "exampleTranslation": "The movie I was expecting was not as interesting as I thought.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0036"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 661
  },
  {
    "category": "kanji",
    "front": "取",
    "back": "take, fetch",
    "exampleJp": "休日はしっかりと睡眠を取るようにしている。",
    "exampleTranslation": "I make sure to get plenty of sleep on my days off.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0037"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 662
  },
  {
    "category": "kanji",
    "front": "都",
    "back": "metropolis, capital",
    "exampleJp": "都会での生活は便利だが、物価が高い。",
    "exampleTranslation": "Life in the city is convenient, but prices are high.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0038"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 663
  },
  {
    "category": "kanji",
    "front": "和",
    "back": "peace, harmony",
    "exampleJp": "休日は和室でお茶を飲みながらくつろぐのが好きだ。",
    "exampleTranslation": "On my days off, I like to relax in the Japanese-style room while drinking tea.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0039"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 664
  },
  {
    "category": "kanji",
    "front": "機",
    "back": "machine, opportunity",
    "exampleJp": "飛行機に乗る前にパスポートを用意してください。",
    "exampleTranslation": "Please prepare your passport before boarding the airplane.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0040"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 665
  },
  {
    "category": "kanji",
    "front": "平",
    "back": "flat, ordinary",
    "exampleJp": "平日はいそがしいので、週末に掃除をします。",
    "exampleTranslation": "I am busy on weekdays, so I clean on weekends.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0041"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 666
  },
  {
    "category": "kanji",
    "front": "加",
    "back": "add, join",
    "exampleJp": "コーヒーに砂糖とミルクを加えます。",
    "exampleTranslation": "I add sugar and milk to my coffee.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0042"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 667
  },
  {
    "category": "kanji",
    "front": "受",
    "back": "receive, catch",
    "exampleJp": "昨日、大学の入学試験を受けました。",
    "exampleTranslation": "I took the university entrance exam yesterday.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0043"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 668
  },
  {
    "category": "kanji",
    "front": "続",
    "back": "continue",
    "exampleJp": "雨が3日間も続いていて、外に出られない。",
    "exampleTranslation": "It has been raining continuously for three days, and I can't go outside.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0044"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 669
  },
  {
    "category": "kanji",
    "front": "進",
    "back": "advance, progress",
    "exampleJp": "プロジェクトは計画通りに進んでいる。",
    "exampleTranslation": "The project is progressing according to plan.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0045"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 670
  },
  {
    "category": "kanji",
    "front": "数",
    "back": "number, count",
    "exampleJp": "会場に来たお客さんの数を数えてください。",
    "exampleTranslation": "Please count the number of guests who came to the venue.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0046"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 671
  },
  {
    "category": "kanji",
    "front": "記",
    "back": "write down, record",
    "exampleJp": "毎日の出来事を日記に書いて残している。",
    "exampleTranslation": "I write down daily events in a diary and keep them.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0047"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 672
  },
  {
    "category": "kanji",
    "front": "初",
    "back": "first, beginning",
    "exampleJp": "初めての海外旅行で、少し緊張しています。",
    "exampleTranslation": "I am a little nervous because it is my first trip abroad.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0048"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 673
  },
  {
    "category": "kanji",
    "front": "指",
    "back": "finger, point",
    "exampleJp": "彼女は薬指にきれいな指輪をしていた。",
    "exampleTranslation": "She was wearing a beautiful ring on her ring finger.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0049"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 674
  },
  {
    "category": "kanji",
    "front": "権",
    "back": "authority, right",
    "exampleJp": "誰もが自由に意見を言う権利を持っている。",
    "exampleTranslation": "Everyone has the right to express their opinions freely.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0050"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 675
  },
  {
    "category": "kanji",
    "front": "支",
    "back": "support, branch",
    "exampleJp": "大きな木が屋根の重さを支えている。",
    "exampleTranslation": "A large tree is supporting the weight of the roof.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0051"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 676
  },
  {
    "category": "kanji",
    "front": "産",
    "back": "produce, birth",
    "exampleJp": "この地域では、おいしいお米がたくさん生産されている。",
    "exampleTranslation": "A lot of delicious rice is produced in this area.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0052"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 677
  },
  {
    "category": "kanji",
    "front": "点",
    "back": "point, mark",
    "exampleJp": "テストで100点満点を取ることができた。",
    "exampleTranslation": "I was able to get a perfect score of 100 on the test.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0053"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 678
  },
  {
    "category": "kanji",
    "front": "報",
    "back": "report, news",
    "exampleJp": "毎朝、天気予報をチェックしてから家を出る。",
    "exampleTranslation": "I check the weather forecast every morning before leaving the house.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0054"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 679
  },
  {
    "category": "kanji",
    "front": "済",
    "back": "finish, settle",
    "exampleJp": "支払いはすでに済ませてあります。",
    "exampleTranslation": "The payment has already been settled.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0055"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 680
  },
  {
    "category": "kanji",
    "front": "活",
    "back": "active, lively",
    "exampleJp": "新しい職場でも活発に働きたいと思う。",
    "exampleTranslation": "I want to work actively at my new workplace as well.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0056"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 681
  },
  {
    "category": "kanji",
    "front": "原",
    "back": "original, plain",
    "exampleJp": "火事の原因はまだはっきり分かっていない。",
    "exampleTranslation": "The cause of the fire is not yet clearly known.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0057"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 682
  },
  {
    "category": "kanji",
    "front": "共",
    "back": "together",
    "exampleJp": "休日は家族と共に過ごす時間が多い。",
    "exampleTranslation": "I often spend time together with my family on holidays.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0058"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 683
  },
  {
    "category": "kanji",
    "front": "得",
    "back": "acquire, gain",
    "exampleJp": "この仕事から多くの知識を得ることができた。",
    "exampleTranslation": "I was able to acquire a lot of knowledge from this job.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0059"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 684
  },
  {
    "category": "kanji",
    "front": "解",
    "back": "solve, untie",
    "exampleJp": "数学の問題を解くのに時間がかかった。",
    "exampleTranslation": "It took me a long time to solve the math problem.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0060"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 685
  },
  {
    "category": "kanji",
    "front": "交",
    "back": "mix, interact",
    "exampleJp": "交差点で信号が変わるのを待っています。",
    "exampleTranslation": "I am waiting for the traffic light to change at the intersection.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0061"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 686
  },
  {
    "category": "kanji",
    "front": "資",
    "back": "resources, capital",
    "exampleJp": "この研究には多くの資料が必要です。",
    "exampleTranslation": "A lot of reference materials are necessary for this research.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0062"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 687
  },
  {
    "category": "kanji",
    "front": "予",
    "back": "beforehand",
    "exampleJp": "来週の金曜日にホテルの予約を入れた。",
    "exampleTranslation": "I made a hotel reservation for next Friday.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0063"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 688
  },
  {
    "category": "kanji",
    "front": "向",
    "back": "face, beyond",
    "exampleJp": "駅に向かって急いで歩き始めた。",
    "exampleTranslation": "I hurried and started walking toward the station.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0064"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 689
  },
  {
    "category": "kanji",
    "front": "際",
    "back": "occasion, time",
    "exampleJp": "国際会議で様々な国の代表と話をした。",
    "exampleTranslation": "I spoke with representatives of various countries at an international conference.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0065"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 690
  },
  {
    "category": "kanji",
    "front": "勝",
    "back": "win",
    "exampleJp": "今日の試合は私たちが絶対に勝つ。",
    "exampleTranslation": "We will definitely win today's match.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0066"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 691
  },
  {
    "category": "kanji",
    "front": "面",
    "back": "face, surface",
    "exampleJp": "この問題には面白い側面があると思う。",
    "exampleTranslation": "I think this issue has an interesting aspect.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0067"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 692
  },
  {
    "category": "kanji",
    "front": "告",
    "back": "tell, inform",
    "exampleJp": "駅の広告を見て、新しいスマホを買いたくなった。",
    "exampleTranslation": "After seeing the advertisement at the station, I wanted to buy a new smartphone.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0068"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 693
  },
  {
    "category": "kanji",
    "front": "反",
    "back": "anti-, opposite",
    "exampleJp": "彼の行動は社会のルールに違反している。",
    "exampleTranslation": "His behavior violates the rules of society.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0069"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 694
  },
  {
    "category": "kanji",
    "front": "判",
    "back": "judge",
    "exampleJp": "その情報が正しいかどうかを判断するのは難しい。",
    "exampleTranslation": "It is difficult to judge whether that information is correct or not.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0070"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 695
  },
  {
    "category": "kanji",
    "front": "認",
    "back": "recognize",
    "exampleJp": "彼はついに自分の失敗を認めた。",
    "exampleTranslation": "He finally admitted his mistake.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0071"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 696
  },
  {
    "category": "kanji",
    "front": "参",
    "back": "participate",
    "exampleJp": "ボランティア活動に参加して、多くのことを学んだ。",
    "exampleTranslation": "I participated in volunteer activities and learned a lot.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0072"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 697
  },
  {
    "category": "kanji",
    "front": "利",
    "back": "profit, advantage",
    "exampleJp": "このカードを利用すると、ポイントが貯まります。",
    "exampleTranslation": "If you use this card, you will accumulate points.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0073"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 698
  },
  {
    "category": "kanji",
    "front": "組",
    "back": "assemble",
    "exampleJp": "新しい家具を組み立てるのに半日かかった。",
    "exampleTranslation": "It took half a day to assemble the new furniture.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0074"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 699
  },
  {
    "category": "kanji",
    "front": "信",
    "back": "believe, trust",
    "exampleJp": "自分自身を信じて最後までやり抜きたい。",
    "exampleTranslation": "I want to believe in myself and carry it through to the end.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0075"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 700
  },
  {
    "category": "kanji",
    "front": "在",
    "back": "exist, locate",
    "exampleJp": "現在、彼はロンドンに留学中です。",
    "exampleTranslation": "Currently, he is studying abroad in London.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0076"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 701
  },
  {
    "category": "kanji",
    "front": "件",
    "back": "affair, case",
    "exampleJp": "その事件についての詳しい報道を見た。",
    "exampleTranslation": "I saw detailed reports about that incident.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0077"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 702
  },
  {
    "category": "kanji",
    "front": "側",
    "back": "side",
    "exampleJp": "道の反対側に新しいコンビニができた。",
    "exampleTranslation": "A new convenience store was built on the opposite side of the street.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0078"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 703
  },
  {
    "category": "kanji",
    "front": "任",
    "back": "responsibility, entrust",
    "exampleJp": "リーダーとしての責任をしっかりと果たしたい。",
    "exampleTranslation": "I want to firmly fulfill my responsibilities as a leader.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0079"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 704
  },
  {
    "category": "kanji",
    "front": "引",
    "back": "pull",
    "exampleJp": "ドアを強く引いて開けてください。",
    "exampleTranslation": "Please pull the door strongly to open it.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0080"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 705
  },
  {
    "category": "kanji",
    "front": "求",
    "back": "request, demand",
    "exampleJp": "会社は新しい人材を求めている。",
    "exampleTranslation": "The company is looking for new talent.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0081"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 706
  },
  {
    "category": "kanji",
    "front": "所",
    "back": "place",
    "exampleJp": "静かで落ち着ける場所を探しています。",
    "exampleTranslation": "I am looking for a quiet and relaxing place.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0082"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 707
  },
  {
    "category": "kanji",
    "front": "次",
    "back": "next",
    "exampleJp": "次の電車は何時に出発しますか。",
    "exampleTranslation": "What time does the next train depart?",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0083"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 708
  },
  {
    "category": "kanji",
    "front": "昨",
    "back": "yesterday",
    "exampleJp": "昨日は一日中雨が降っていました。",
    "exampleTranslation": "It rained all day yesterday.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0084"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 709
  },
  {
    "category": "kanji",
    "front": "論",
    "back": "theory, discuss",
    "exampleJp": "大学で日本の歴史について論文を書いている。",
    "exampleTranslation": "I am writing a thesis about Japanese history at the university.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0085"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 710
  },
  {
    "category": "kanji",
    "front": "官",
    "back": "official",
    "exampleJp": "警察官が道を丁寧に教えてくれた。",
    "exampleTranslation": "The police officer kindly told me the way.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0086"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 711
  },
  {
    "category": "kanji",
    "front": "増",
    "back": "increase",
    "exampleJp": "最近、体重が増えてしまったので運動を始めた。",
    "exampleTranslation": "Recently, I've gained weight, so I started exercising.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0087"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 712
  },
  {
    "category": "kanji",
    "front": "係",
    "back": "person in charge",
    "exampleJp": "その件については、担当の係にご連絡ください。",
    "exampleTranslation": "Regarding that matter, please contact the person in charge.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0088"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 713
  },
  {
    "category": "kanji",
    "front": "感",
    "back": "feeling, sense",
    "exampleJp": "彼の歌を聴いて、深く感動しました。",
    "exampleTranslation": "I was deeply moved listening to his song.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0089"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 714
  },
  {
    "category": "kanji",
    "front": "情",
    "back": "emotion, condition",
    "exampleJp": "日本の文化についての情報をもっと集めたい。",
    "exampleTranslation": "I want to gather more information about Japanese culture.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0090"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 715
  },
  {
    "category": "kanji",
    "front": "投",
    "back": "throw",
    "exampleJp": "ボールを遠くまで投げる練習をしている。",
    "exampleTranslation": "I am practicing throwing the ball far.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0091"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 716
  },
  {
    "category": "kanji",
    "front": "示",
    "back": "show, indicate",
    "exampleJp": "先生が黒板に問題の答えを示した。",
    "exampleTranslation": "The teacher showed the answer to the problem on the blackboard.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0092"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 717
  },
  {
    "category": "kanji",
    "front": "変",
    "back": "change, strange",
    "exampleJp": "髪型を変えたら、友達に驚かれた。",
    "exampleTranslation": "When I changed my hairstyle, my friends were surprised.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0093"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 718
  },
  {
    "category": "kanji",
    "front": "打",
    "back": "hit, strike",
    "exampleJp": "パソコンで文章を打つのに慣れてきた。",
    "exampleTranslation": "I have gotten used to typing text on a computer.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0094"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 719
  },
  {
    "category": "kanji",
    "front": "直",
    "back": "straight, fix",
    "exampleJp": "壊れた自転車を自分で直してみた。",
    "exampleTranslation": "I tried to fix the broken bicycle myself.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0095"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 720
  },
  {
    "category": "kanji",
    "front": "両",
    "back": "both",
    "exampleJp": "両親の結婚記念日にプレゼントを贈った。",
    "exampleTranslation": "I gave my parents a present on their wedding anniversary.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0096"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 721
  },
  {
    "category": "kanji",
    "front": "式",
    "back": "ceremony, style",
    "exampleJp": "明日は大学の卒業式に参加します。",
    "exampleTranslation": "I will participate in the university graduation ceremony tomorrow.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0097"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 722
  },
  {
    "category": "kanji",
    "front": "確",
    "back": "certain, sure",
    "exampleJp": "出発の時間をもう一度確認してください。",
    "exampleTranslation": "Please confirm the departure time once more.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0098"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 723
  },
  {
    "category": "kanji",
    "front": "果",
    "back": "fruit, result",
    "exampleJp": "毎日の練習の結果、大会で優勝できた。",
    "exampleTranslation": "As a result of daily practice, I was able to win the tournament.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0099"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 724
  },
  {
    "category": "kanji",
    "front": "容",
    "back": "contain, form",
    "exampleJp": "このカバンは容量が大きくて便利だ。",
    "exampleTranslation": "This bag has a large capacity and is convenient.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0100"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 725
  },
  {
    "category": "kanji",
    "front": "必",
    "back": "certain, necessary",
    "exampleJp": "外国に行くときはパスポートが必ず必要だ。",
    "exampleTranslation": "A passport is absolutely necessary when going abroad.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0101"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 726
  },
  {
    "category": "kanji",
    "front": "演",
    "back": "perform, play",
    "exampleJp": "有名な俳優が舞台で素晴らしい演技をした。",
    "exampleTranslation": "A famous actor gave a wonderful performance on stage.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0102"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 727
  },
  {
    "category": "kanji",
    "front": "歳",
    "back": "year-end, age",
    "exampleJp": "今年で二十歳になり、お酒が飲めるようになった。",
    "exampleTranslation": "I turned twenty this year and can now drink alcohol.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0103"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 728
  },
  {
    "category": "kanji",
    "front": "争",
    "back": "contend, dispute",
    "exampleJp": "兄弟でテレビのチャンネルを争うのはやめなさい。",
    "exampleTranslation": "Stop fighting over the TV channel with your brother.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0104"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 729
  },
  {
    "category": "kanji",
    "front": "談",
    "back": "discuss, talk",
    "exampleJp": "先生と進路について面談をした。",
    "exampleTranslation": "I had an interview with the teacher about my future path.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0105"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 730
  },
  {
    "category": "kanji",
    "front": "能",
    "back": "ability",
    "exampleJp": "彼女は語学の才能があり、3か国語を話せる。",
    "exampleTranslation": "She has a talent for languages and can speak three languages.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0106"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 731
  },
  {
    "category": "kanji",
    "front": "位",
    "back": "rank, position",
    "exampleJp": "テストの成績でクラスの1位になった。",
    "exampleTranslation": "I became first in the class in the test results.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0107"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 732
  },
  {
    "category": "kanji",
    "front": "置",
    "back": "put, place",
    "exampleJp": "机の上に辞書が置いてあります。",
    "exampleTranslation": "There is a dictionary placed on the desk.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0108"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 733
  },
  {
    "category": "kanji",
    "front": "流",
    "back": "stream, flow",
    "exampleJp": "川の水が静かに流れている。",
    "exampleTranslation": "The river water is flowing quietly.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0109"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 734
  },
  {
    "category": "kanji",
    "front": "格",
    "back": "status, capacity",
    "exampleJp": "そのホテルは格式が高く、とても高級だ。",
    "exampleTranslation": "That hotel has a high status and is very luxurious.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0110"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 735
  },
  {
    "category": "kanji",
    "front": "疑",
    "back": "doubt",
    "exampleJp": "彼の言っていることが本当かどうか疑わしい。",
    "exampleTranslation": "It is doubtful whether what he is saying is true or not.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0111"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 736
  },
  {
    "category": "kanji",
    "front": "過",
    "back": "overdo, pass",
    "exampleJp": "楽しい時間はあっという間に過ぎてしまう。",
    "exampleTranslation": "Fun times pass by in the blink of an eye.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0112"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 737
  },
  {
    "category": "kanji",
    "front": "局",
    "back": "bureau, board",
    "exampleJp": "荷物を送るために郵便局へ行った。",
    "exampleTranslation": "I went to the post office to send a package.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0113"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 738
  },
  {
    "category": "kanji",
    "front": "放",
    "back": "set free, release",
    "exampleJp": "テレビで面白い番組が放送されている。",
    "exampleTranslation": "An interesting program is being broadcasted on TV.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0114"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 739
  },
  {
    "category": "kanji",
    "front": "常",
    "back": "usual, normal",
    "exampleJp": "日常生活の中で、運動する時間を作りたい。",
    "exampleTranslation": "I want to make time to exercise in my daily life.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0115"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 740
  },
  {
    "category": "kanji",
    "front": "状",
    "back": "conditions, form",
    "exampleJp": "今の健康状態は非常に良いです。",
    "exampleTranslation": "My current state of health is very good.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0116"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 741
  },
  {
    "category": "kanji",
    "front": "球",
    "back": "ball, sphere",
    "exampleJp": "休日は公園で野球をして遊んでいる。",
    "exampleTranslation": "I play baseball at a nearby park on my days off.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0117"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 742
  },
  {
    "category": "kanji",
    "front": "職",
    "back": "post, employment",
    "exampleJp": "新しい職場の人たちはみんな親切だ。",
    "exampleTranslation": "Everyone at the new workplace is kind.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0118"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 743
  },
  {
    "category": "kanji",
    "front": "与",
    "back": "give",
    "exampleJp": "子供たちに夢を与えるような仕事がしたい。",
    "exampleTranslation": "I want to do a job that gives dreams to children.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0119"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 744
  },
  {
    "category": "kanji",
    "front": "供",
    "back": "offer, provide",
    "exampleJp": "このレストランは美味しい料理を提供している。",
    "exampleTranslation": "This restaurant provides delicious food.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0120"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 745
  },
  {
    "category": "kanji",
    "front": "役",
    "back": "duty, role",
    "exampleJp": "彼女は映画で重要な役を演じた。",
    "exampleTranslation": "She played an important role in the movie.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0121"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 746
  },
  {
    "category": "kanji",
    "front": "構",
    "back": "posture, build",
    "exampleJp": "この建物の構造はとても複雑だ。",
    "exampleTranslation": "The structure of this building is very complex.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0122"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 747
  },
  {
    "category": "kanji",
    "front": "割",
    "back": "proportion, divide",
    "exampleJp": "ケーキを3つに割って、みんなで食べましょう。",
    "exampleTranslation": "Let's divide the cake into three and eat it together.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0123"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 748
  },
  {
    "category": "kanji",
    "front": "費",
    "back": "expense",
    "exampleJp": "今月は生活費を節約しなければならない。",
    "exampleTranslation": "I have to save on living expenses this month.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0124"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 749
  },
  {
    "category": "kanji",
    "front": "付",
    "back": "adhere, attach",
    "exampleJp": "書類に写真と履歴書を付けて送った。",
    "exampleTranslation": "I sent the documents with a photo and a resume attached.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0125"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 750
  },
  {
    "category": "kanji",
    "front": "由",
    "back": "wherefore, reason",
    "exampleJp": "彼が遅刻した理由を聞いて驚いた。",
    "exampleTranslation": "I was surprised to hear the reason why he was late.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0126"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 751
  },
  {
    "category": "kanji",
    "front": "説",
    "back": "theory, explain",
    "exampleJp": "社長が新しいプロジェクトについて説明した。",
    "exampleTranslation": "The company president explained the new project.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0127"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 752
  },
  {
    "category": "kanji",
    "front": "難",
    "back": "difficult",
    "exampleJp": "この本は内容が難しくて、なかなか進まない。",
    "exampleTranslation": "The contents of this book are difficult, so I am not making much progress.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0128"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 753
  },
  {
    "category": "kanji",
    "front": "優",
    "back": "superior, gentle",
    "exampleJp": "彼女はとても優しくて、みんなから好かれている。",
    "exampleTranslation": "She is very gentle and liked by everyone.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0129"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 754
  },
  {
    "category": "kanji",
    "front": "夫",
    "back": "husband",
    "exampleJp": "私の夫は料理を作るのが上手です。",
    "exampleTranslation": "My husband is good at cooking.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0130"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 755
  },
  {
    "category": "kanji",
    "front": "収",
    "back": "income, obtain",
    "exampleJp": "今年の会社の収入は去年よりも増えた。",
    "exampleTranslation": "The company's income this year increased compared to last year.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0131"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 756
  },
  {
    "category": "kanji",
    "front": "断",
    "back": "sever, decide",
    "exampleJp": "忙しいので、パーティーの誘いを断った。",
    "exampleTranslation": "I refused the invitation to the party because I am busy.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0132"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 757
  },
  {
    "category": "kanji",
    "front": "石",
    "back": "stone",
    "exampleJp": "道に落ちている石につまずいて転んだ。",
    "exampleTranslation": "I tripped over a stone on the road and fell.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0133"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 758
  },
  {
    "category": "kanji",
    "front": "違",
    "back": "difference, differ",
    "exampleJp": "私の意見は彼の意見と少し違います。",
    "exampleTranslation": "My opinion differs a little from his.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0134"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 759
  },
  {
    "category": "kanji",
    "front": "消",
    "back": "extinguish, erase",
    "exampleJp": "部屋を出る時は、必ず電気を消してください。",
    "exampleTranslation": "When you leave the room, please be sure to turn off the lights.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0135"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 760
  },
  {
    "category": "kanji",
    "front": "神",
    "back": "gods, mind",
    "exampleJp": "試験に合格するように、神社で神様にお願いした。",
    "exampleTranslation": "I prayed to the gods at the shrine so that I would pass the exam.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0136"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 761
  },
  {
    "category": "kanji",
    "front": "番",
    "back": "turn, number",
    "exampleJp": "テレビのチャンネルを8番に変えてください。",
    "exampleTranslation": "Please change the TV channel to number 8.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0137"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 762
  },
  {
    "category": "kanji",
    "front": "規",
    "back": "standard, measure",
    "exampleJp": "会社の規則を守ることは社会人として当然だ。",
    "exampleTranslation": "Following company rules is natural as a working adult.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0138"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 763
  },
  {
    "category": "kanji",
    "front": "術",
    "back": "art, technique",
    "exampleJp": "最新の技術を使って、新しい製品を開発した。",
    "exampleTranslation": "We developed a new product using the latest technology.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0139"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 764
  },
  {
    "category": "kanji",
    "front": "備",
    "back": "equip, prepare",
    "exampleJp": "地震に備えて、水や食料を準備しておく。",
    "exampleTranslation": "I prepare water and food in preparation for an earthquake.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0140"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 765
  },
  {
    "category": "kanji",
    "front": "宅",
    "back": "home, house",
    "exampleJp": "昨日の夜は自宅でのんびり映画を見ていた。",
    "exampleTranslation": "I was relaxing and watching a movie at home last night.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0141"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 766
  },
  {
    "category": "kanji",
    "front": "害",
    "back": "harm, injury",
    "exampleJp": "台風で農作物に大きな被害が出た。",
    "exampleTranslation": "The typhoon caused great damage to the crops.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0142"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 767
  },
  {
    "category": "kanji",
    "front": "配",
    "back": "distribute",
    "exampleJp": "朝、新聞を配達するアルバイトをしている。",
    "exampleTranslation": "I have a part-time job delivering newspapers in the morning.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0143"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 768
  },
  {
    "category": "kanji",
    "front": "警",
    "back": "admonish, warn",
    "exampleJp": "交差点に立って、警察官が交通整理をしている。",
    "exampleTranslation": "A police officer is standing at the intersection directing traffic.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0144"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 769
  },
  {
    "category": "kanji",
    "front": "育",
    "back": "bring up, raise",
    "exampleJp": "田舎で野菜を育てながら静かに暮らしたい。",
    "exampleTranslation": "I want to live quietly in the countryside while growing vegetables.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0145"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 770
  },
  {
    "category": "kanji",
    "front": "席",
    "back": "seat",
    "exampleJp": "電車の中で、お年寄りに席を譲った。",
    "exampleTranslation": "I gave up my seat to an elderly person on the train.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0146"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 771
  },
  {
    "category": "kanji",
    "front": "訪",
    "back": "call on, visit",
    "exampleJp": "夏休みに京都の古いお寺を訪問する予定だ。",
    "exampleTranslation": "I plan to visit an old temple in Kyoto during the summer vacation.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0147"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 772
  },
  {
    "category": "kanji",
    "front": "乗",
    "back": "ride, board",
    "exampleJp": "毎朝、満員の通勤電車に乗るのは大変だ。",
    "exampleTranslation": "Riding a crowded commuter train every morning is tough.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0148"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 773
  },
  {
    "category": "kanji",
    "front": "残",
    "back": "remainder, left over",
    "exampleJp": "冷蔵庫に残っている野菜でスープを作った。",
    "exampleTranslation": "I made soup with the vegetables left in the refrigerator.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0149"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 774
  },
  {
    "category": "kanji",
    "front": "想",
    "back": "concept, think",
    "exampleJp": "将来の自分の姿を想像してみる。",
    "exampleTranslation": "I try to imagine myself in the future.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0150"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 775
  },
  {
    "category": "kanji",
    "front": "声",
    "back": "voice",
    "exampleJp": "彼の声はとてもきれいで、歌が上手だ。",
    "exampleTranslation": "His voice is very beautiful and he is good at singing.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0151"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 776
  },
  {
    "category": "kanji",
    "front": "念",
    "back": "thought, desire",
    "exampleJp": "残念ながら、明日の試合は雨で中止になった。",
    "exampleTranslation": "Unfortunately, tomorrow's match was canceled due to rain.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0152"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 777
  },
  {
    "category": "kanji",
    "front": "助",
    "back": "help",
    "exampleJp": "困っているおばあさんを助けてあげた。",
    "exampleTranslation": "I helped an elderly woman who was in trouble.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0153"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 778
  },
  {
    "category": "kanji",
    "front": "労",
    "back": "labor, toil",
    "exampleJp": "長時間労働が問題になっている。",
    "exampleTranslation": "Long working hours have become a problem.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0154"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 779
  },
  {
    "category": "kanji",
    "front": "例",
    "back": "example",
    "exampleJp": "例えば、どんな音楽が好きですか。",
    "exampleTranslation": "For example, what kind of music do you like?",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0155"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 780
  },
  {
    "category": "kanji",
    "front": "然",
    "back": "sort of thing, so",
    "exampleJp": "自然の豊かな場所でキャンプをするのが好きだ。",
    "exampleTranslation": "I like camping in places rich in nature.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0156"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 781
  },
  {
    "category": "kanji",
    "front": "限",
    "back": "limit, restrict",
    "exampleJp": "チケットの数には限りがあります。",
    "exampleTranslation": "There is a limit to the number of tickets.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0157"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 782
  },
  {
    "category": "kanji",
    "front": "追",
    "back": "chase",
    "exampleJp": "犬がボールを追いかけて走っていった。",
    "exampleTranslation": "The dog ran chasing after the ball.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0158"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 783
  },
  {
    "category": "kanji",
    "front": "商",
    "back": "make a deal",
    "exampleJp": "商店街で新鮮な魚を買って帰った。",
    "exampleTranslation": "I bought fresh fish at the shopping street and went home.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0159"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 784
  },
  {
    "category": "kanji",
    "front": "葉",
    "back": "leaf",
    "exampleJp": "秋になると、木々の葉が赤や黄色に変わる。",
    "exampleTranslation": "In autumn, the leaves of trees turn red and yellow.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0160"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 785
  },
  {
    "category": "kanji",
    "front": "伝",
    "back": "transmit, tell",
    "exampleJp": "このメッセージを彼に伝えてもらえませんか。",
    "exampleTranslation": "Could you pass this message on to him?",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0161"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 786
  },
  {
    "category": "kanji",
    "front": "働",
    "back": "work",
    "exampleJp": "彼は毎日夜遅くまで一生懸命働いている。",
    "exampleTranslation": "He works hard until late every night.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0162"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 787
  },
  {
    "category": "kanji",
    "front": "形",
    "back": "shape",
    "exampleJp": "このケーキは星の形をしていて可愛い。",
    "exampleTranslation": "This cake is cute, shaped like a star.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0163"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 788
  },
  {
    "category": "kanji",
    "front": "景",
    "back": "scenery",
    "exampleJp": "ホテルの窓から見える景色がすばらしい。",
    "exampleTranslation": "The scenery visible from the hotel window is wonderful.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0164"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 789
  },
  {
    "category": "kanji",
    "front": "落",
    "back": "fall, drop",
    "exampleJp": "ポケットから財布を落としてしまった。",
    "exampleTranslation": "I dropped my wallet from my pocket.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0165"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 790
  },
  {
    "category": "kanji",
    "front": "好",
    "back": "fond, pleasing",
    "exampleJp": "休日は好きな本を読んでリラックスする。",
    "exampleTranslation": "I relax by reading my favorite books on holidays.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0166"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 791
  },
  {
    "category": "kanji",
    "front": "退",
    "back": "retreat",
    "exampleJp": "病気のために、大学を退学することになった。",
    "exampleTranslation": "Due to illness, I had to drop out of the university.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0167"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 792
  },
  {
    "category": "kanji",
    "front": "頭",
    "back": "head",
    "exampleJp": "考えすぎて頭が痛くなってしまった。",
    "exampleTranslation": "My head started hurting from thinking too much.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0168"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 793
  },
  {
    "category": "kanji",
    "front": "負",
    "back": "defeat, negative",
    "exampleJp": "今日の試合は強豪チームに負けてしまった。",
    "exampleTranslation": "We lost today's match to a strong team.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0169"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 794
  },
  {
    "category": "kanji",
    "front": "渡",
    "back": "transit, cross",
    "exampleJp": "この道をまっすぐ行って、橋を渡ってください。",
    "exampleTranslation": "Go straight down this road and cross the bridge.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0170"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 795
  },
  {
    "category": "kanji",
    "front": "建",
    "back": "build",
    "exampleJp": "新しいマンションが駅の近くに建設されている。",
    "exampleTranslation": "A new apartment building is being constructed near the station.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0171"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 796
  },
  {
    "category": "kanji",
    "front": "終",
    "back": "end, finish",
    "exampleJp": "夏休みも明日で終わりだ。",
    "exampleTranslation": "Summer vacation ends tomorrow as well.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0172"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 797
  },
  {
    "category": "kanji",
    "front": "客",
    "back": "guest, customer",
    "exampleJp": "このレストランはいつもお客さんでいっぱいだ。",
    "exampleTranslation": "This restaurant is always full of customers.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0173"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 798
  },
  {
    "category": "kanji",
    "front": "識",
    "back": "discriminating, know",
    "exampleJp": "日本社会についての知識をもっと深めたい。",
    "exampleTranslation": "I want to deepen my knowledge of Japanese society.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0174"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 799
  },
  {
    "category": "kanji",
    "front": "呼",
    "back": "call",
    "exampleJp": "タクシーを呼んで、急いで駅に向かった。",
    "exampleTranslation": "I called a taxi and hurried to the station.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0175"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 800
  },
  {
    "category": "kanji",
    "front": "飛",
    "back": "fly",
    "exampleJp": "空を鳥が気持ちよさそうに飛んでいる。",
    "exampleTranslation": "Birds are flying in the sky looking comfortable.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0176"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 801
  },
  {
    "category": "kanji",
    "front": "越",
    "back": "surpass, cross",
    "exampleJp": "山を越えると、美しい湖が見えてきた。",
    "exampleTranslation": "After crossing the mountain, a beautiful lake came into view.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0177"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 802
  },
  {
    "category": "kanji",
    "front": "守",
    "back": "protect",
    "exampleJp": "家族の笑顔を守るために一生懸命働く。",
    "exampleTranslation": "I work hard to protect my family's smiles.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0178"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 803
  },
  {
    "category": "kanji",
    "front": "庭",
    "back": "courtyard, garden",
    "exampleJp": "休日は庭で花を育てて楽しんでいる。",
    "exampleTranslation": "I enjoy growing flowers in the garden on holidays.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0179"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 804
  },
  {
    "category": "kanji",
    "front": "息",
    "back": "breath, son",
    "exampleJp": "深呼吸をして、息を整えてから走る。",
    "exampleTranslation": "I take a deep breath and steady my breathing before running.",
    "tags": [
      "n3",
      "kanji"
    ],
    "sourceIds": [
      "n3-kanji-0180"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 805
  },
  {
    "category": "grammar",
    "front": "〜うちに",
    "back": "while; before (the situation changes)",
    "exampleJp": "スープが冷めないうちに、早く食べてください。",
    "exampleTranslation": "Please eat quickly before the soup gets cold.",
    "tags": [
      "n3",
      "grammar",
      "time",
      "action"
    ],
    "sourceIds": [
      "n3-grammar-0001",
      "n3-grammar-001"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 806
  },
  {
    "category": "grammar",
    "front": "〜間に",
    "back": "while; during the time when",
    "exampleJp": "子供が寝ている間に、部屋の掃除を終わらせた。",
    "exampleTranslation": "I finished cleaning the room while the child was sleeping.",
    "tags": [
      "n3",
      "grammar",
      "time",
      "duration"
    ],
    "sourceIds": [
      "n3-grammar-0002",
      "n3-grammar-002"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 807
  },
  {
    "category": "grammar",
    "front": "〜てからでないと",
    "back": "unless; until; not until",
    "exampleJp": "上司に確認してからでないと、この書類は提出できません。",
    "exampleTranslation": "I cannot submit this document unless I check with my boss first.",
    "tags": [
      "n3",
      "grammar",
      "condition",
      "prerequisite"
    ],
    "sourceIds": [
      "n3-grammar-0003",
      "n3-grammar-003"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 808
  },
  {
    "category": "grammar",
    "front": "〜ところだ",
    "back": "about to; just doing; just finished",
    "exampleJp": "今、駅からバスに乗るところです。",
    "exampleTranslation": "I am just about to get on the bus from the station now.",
    "tags": [
      "n3",
      "grammar",
      "time",
      "state"
    ],
    "sourceIds": [
      "n3-grammar-0004",
      "n3-grammar-004"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 809
  },
  {
    "category": "grammar",
    "front": "〜とおりに",
    "back": "just as; exactly like; according to",
    "exampleJp": "先生が言ったとおりに、発音の練習をしました。",
    "exampleTranslation": "I practiced pronunciation exactly as the teacher said.",
    "tags": [
      "n3",
      "grammar",
      "manner",
      "imitation"
    ],
    "sourceIds": [
      "n3-grammar-0005",
      "n3-grammar-005"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 810
  },
  {
    "category": "grammar",
    "front": "〜によって",
    "back": "by; depending on; due to",
    "exampleJp": "文化によって、挨拶の仕方が異なります。",
    "exampleTranslation": "The way of greeting differs depending on the culture.",
    "tags": [
      "n3",
      "grammar",
      "condition",
      "means",
      "cause"
    ],
    "sourceIds": [
      "n3-grammar-0006",
      "n3-grammar-006"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 811
  },
  {
    "category": "grammar",
    "front": "〜たびに",
    "back": "every time; whenever",
    "exampleJp": "この曲を聞くたびに、学生時代を思い出す。",
    "exampleTranslation": "Every time I hear this song, I remember my school days.",
    "tags": [
      "n3",
      "grammar",
      "time",
      "repetition"
    ],
    "sourceIds": [
      "n3-grammar-0007",
      "n3-grammar-007"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 812
  },
  {
    "category": "grammar",
    "front": "〜ば〜ほど",
    "back": "the more A, the more B",
    "exampleJp": "外国語は、話せば話すほど上達する。",
    "exampleTranslation": "The more you speak a foreign language, the more you improve.",
    "tags": [
      "n3",
      "grammar",
      "condition",
      "degree"
    ],
    "sourceIds": [
      "n3-grammar-0008",
      "n3-grammar-008"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 813
  },
  {
    "category": "grammar",
    "front": "〜ついでに",
    "back": "while doing A, do B; taking the opportunity",
    "exampleJp": "郵便局へ行くついでに、牛乳を買ってきてくれない？",
    "exampleTranslation": "While you're going to the post office, could you buy some milk?",
    "tags": [
      "n3",
      "grammar",
      "time",
      "opportunity"
    ],
    "sourceIds": [
      "n3-grammar-0009",
      "n3-grammar-009"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 814
  },
  {
    "category": "grammar",
    "front": "〜くらい / 〜ぐらい",
    "back": "about; at least; to the extent that",
    "exampleJp": "忙しすぎて、泣きたいくらいです。",
    "exampleTranslation": "I'm so busy that I feel like crying.",
    "tags": [
      "n3",
      "grammar",
      "degree",
      "approximation"
    ],
    "sourceIds": [
      "n3-grammar-0010",
      "n3-grammar-010"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 815
  },
  {
    "category": "grammar",
    "front": "〜くらいなら",
    "back": "rather than (doing that, doing this is better)",
    "exampleJp": "あんな店で食べるくらいなら、自分で作ったほうがましだ。",
    "exampleTranslation": "Rather than eating at a restaurant like that, it's better to cook myself.",
    "tags": [
      "n3",
      "grammar",
      "comparison",
      "preference"
    ],
    "sourceIds": [
      "n3-grammar-0011",
      "n3-grammar-011"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 816
  },
  {
    "category": "grammar",
    "front": "〜に限る",
    "back": "is the best; there is nothing like",
    "exampleJp": "疲れたときは、熱いお風呂に入って寝るに限る。",
    "exampleTranslation": "When you're tired, there's nothing like taking a hot bath and going to sleep.",
    "tags": [
      "n3",
      "grammar",
      "preference",
      "absolute"
    ],
    "sourceIds": [
      "n3-grammar-0012",
      "n3-grammar-012"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 817
  },
  {
    "category": "grammar",
    "front": "〜に対して (in contrast to)",
    "back": "in contrast to; towards; against",
    "exampleJp": "兄が活発なのに対して、弟はおとなしい性格だ。",
    "exampleTranslation": "In contrast to the active older brother, the younger brother has a quiet personality.",
    "tags": [
      "n3",
      "grammar",
      "contrast",
      "direction"
    ],
    "sourceIds": [
      "n3-grammar-0013",
      "n3-grammar-013"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 818
  },
  {
    "category": "grammar",
    "front": "〜反面",
    "back": "on the other hand",
    "exampleJp": "都会は便利な反面、物価が高いというデメリットもある。",
    "exampleTranslation": "While the city is convenient, it has the disadvantage of high living costs on the other hand.",
    "tags": [
      "n3",
      "grammar",
      "contrast",
      "aspect"
    ],
    "sourceIds": [
      "n3-grammar-0014",
      "n3-grammar-014"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 819
  },
  {
    "category": "grammar",
    "front": "〜一方（で）",
    "back": "on the other hand; while",
    "exampleJp": "彼は仕事が忙しい一方で、趣味の時間も大切にしている。",
    "exampleTranslation": "While he is busy with work, he also values time for his hobbies on the other hand.",
    "tags": [
      "n3",
      "grammar",
      "contrast",
      "simultaneous"
    ],
    "sourceIds": [
      "n3-grammar-0015",
      "n3-grammar-015"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 820
  },
  {
    "category": "grammar",
    "front": "〜というより",
    "back": "rather than saying; more like",
    "exampleJp": "今日は涼しいというより、少し寒いくらいですね。",
    "exampleTranslation": "Rather than saying it's cool today, it's almost a bit cold.",
    "tags": [
      "n3",
      "grammar",
      "comparison",
      "rephrasing"
    ],
    "sourceIds": [
      "n3-grammar-0016",
      "n3-grammar-016"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 821
  },
  {
    "category": "grammar",
    "front": "〜かわりに",
    "back": "instead of; in exchange for",
    "exampleJp": "車で行くかわりに、健康のために自転車で通勤している。",
    "exampleTranslation": "Instead of going by car, I commute by bicycle for my health.",
    "tags": [
      "n3",
      "grammar",
      "substitution",
      "compensation"
    ],
    "sourceIds": [
      "n3-grammar-0017",
      "n3-grammar-017"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 822
  },
  {
    "category": "grammar",
    "front": "〜ためだ / 〜ため（に）",
    "back": "because of; for the sake of",
    "exampleJp": "事故があったために、電車が大幅に遅れています。",
    "exampleTranslation": "Due to an accident, the trains are significantly delayed.",
    "tags": [
      "n3",
      "grammar",
      "cause",
      "purpose"
    ],
    "sourceIds": [
      "n3-grammar-0018",
      "n3-grammar-018"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 823
  },
  {
    "category": "grammar",
    "front": "〜おかげで",
    "back": "thanks to (positive outcome)",
    "exampleJp": "先輩が手伝ってくれたおかげで、早く仕事が終わった。",
    "exampleTranslation": "Thanks to my senior helping me, the work finished early.",
    "tags": [
      "n3",
      "grammar",
      "cause",
      "positive"
    ],
    "sourceIds": [
      "n3-grammar-0019",
      "n3-grammar-020"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 824
  },
  {
    "category": "grammar",
    "front": "〜せいで",
    "back": "because of (negative outcome)",
    "exampleJp": "昨日夜更かししたせいで、今日は一日中頭が痛かった。",
    "exampleTranslation": "Because I stayed up late yesterday, my head hurt all day today.",
    "tags": [
      "n3",
      "grammar",
      "cause",
      "negative"
    ],
    "sourceIds": [
      "n3-grammar-0020",
      "n3-grammar-021"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 825
  },
  {
    "category": "grammar",
    "front": "〜にきまっている",
    "back": "bound to; definitely; certainly",
    "exampleJp": "こんな難しい問題、彼に解けるわけがない。間違えるにきまっている。",
    "exampleTranslation": "There's no way he can solve such a difficult problem. He is definitely going to make a mistake.",
    "tags": [
      "n3",
      "grammar",
      "conjecture",
      "certainty"
    ],
    "sourceIds": [
      "n3-grammar-0021",
      "n3-grammar-022"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 826
  },
  {
    "category": "grammar",
    "front": "〜にすぎない",
    "back": "nothing more than; merely",
    "exampleJp": "それは私の個人的な意見にすぎないので、あまり気にしないでください。",
    "exampleTranslation": "That is nothing more than my personal opinion, so please don't worry too much about it.",
    "tags": [
      "n3",
      "grammar",
      "limitation",
      "degree"
    ],
    "sourceIds": [
      "n3-grammar-0022",
      "n3-grammar-023"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 827
  },
  {
    "category": "grammar",
    "front": "〜にほかならない",
    "back": "nothing but; simply",
    "exampleJp": "今回の成功は、チーム全員の努力の結果にほかならない。",
    "exampleTranslation": "This success is nothing but the result of the entire team's effort.",
    "tags": [
      "n3",
      "grammar",
      "emphasis",
      "reason"
    ],
    "sourceIds": [
      "n3-grammar-0023",
      "n3-grammar-024"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 828
  },
  {
    "category": "grammar",
    "front": "〜に越したことはない",
    "back": "it's best to; there's nothing better than",
    "exampleJp": "冬の山登りは危険だから、装備はしっかりしているに越したことはない。",
    "exampleTranslation": "Winter mountain climbing is dangerous, so it's best to have solid equipment.",
    "tags": [
      "n3",
      "grammar",
      "advice",
      "preference"
    ],
    "sourceIds": [
      "n3-grammar-0024",
      "n3-grammar-025"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 829
  },
  {
    "category": "grammar",
    "front": "〜しかない",
    "back": "have no choice but to",
    "exampleJp": "終電を逃してしまったので、タクシーで帰るしかない。",
    "exampleTranslation": "I missed the last train, so I have no choice but to go home by taxi.",
    "tags": [
      "n3",
      "grammar",
      "limitation",
      "decision"
    ],
    "sourceIds": [
      "n3-grammar-0025",
      "n3-grammar-026"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 830
  },
  {
    "category": "grammar",
    "front": "〜べきだ / 〜べきではない",
    "back": "should; should not",
    "exampleJp": "約束したことは、どんな理由があっても守るべきだ。",
    "exampleTranslation": "You should keep your promises no matter what the reason is.",
    "tags": [
      "n3",
      "grammar",
      "obligation",
      "advice"
    ],
    "sourceIds": [
      "n3-grammar-0026",
      "n3-grammar-027"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 831
  },
  {
    "category": "grammar",
    "front": "〜ようとする / 〜ようとしない",
    "back": "try to; not try to",
    "exampleJp": "ドアを開けようとしたが、鍵がかかっていて開かなかった。",
    "exampleTranslation": "I tried to open the door, but it was locked and wouldn't open.",
    "tags": [
      "n3",
      "grammar",
      "volition",
      "attempt"
    ],
    "sourceIds": [
      "n3-grammar-0027",
      "n3-grammar-028"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 832
  },
  {
    "category": "grammar",
    "front": "〜わけだ",
    "back": "that's why; no wonder; naturally",
    "exampleJp": "エアコンが壊れているのか。通りで部屋が暑いわけだ。",
    "exampleTranslation": "The air conditioner is broken? No wonder the room is hot.",
    "tags": [
      "n3",
      "grammar",
      "reason",
      "conclusion"
    ],
    "sourceIds": [
      "n3-grammar-0028",
      "n3-grammar-029"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 833
  },
  {
    "category": "grammar",
    "front": "〜わけがない",
    "back": "there is no way that; it's impossible",
    "exampleJp": "彼があんなひどいことを言うわけがない。信じられない。",
    "exampleTranslation": "There is no way he would say such terrible things. I can't believe it.",
    "tags": [
      "n3",
      "grammar",
      "impossibility",
      "strong-denial"
    ],
    "sourceIds": [
      "n3-grammar-0029",
      "n3-grammar-030"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 834
  },
  {
    "category": "grammar",
    "front": "〜わけではない",
    "back": "it doesn't mean that; it's not that",
    "exampleJp": "お酒が飲めないわけではないが、あまり好きではない。",
    "exampleTranslation": "It's not that I can't drink alcohol, but I don't really like it.",
    "tags": [
      "n3",
      "grammar",
      "partial-denial",
      "nuance"
    ],
    "sourceIds": [
      "n3-grammar-0030",
      "n3-grammar-031"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 835
  },
  {
    "category": "grammar",
    "front": "〜ないわけにはいかない",
    "back": "must do; cannot help but do",
    "exampleJp": "親友の結婚式だから、どんなに忙しくても出席しないわけにはいかない。",
    "exampleTranslation": "Since it's my best friend's wedding, I can't help but attend no matter how busy I am.",
    "tags": [
      "n3",
      "grammar",
      "obligation",
      "social"
    ],
    "sourceIds": [
      "n3-grammar-0031",
      "n3-grammar-032"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 836
  },
  {
    "category": "grammar",
    "front": "〜ないことはない",
    "back": "it's not impossible to; it's not that I don't",
    "exampleJp": "納豆は食べられないことはないですが、できれば他のものがいいです。",
    "exampleTranslation": "It's not that I can't eat natto, but I'd prefer something else if possible.",
    "tags": [
      "n3",
      "grammar",
      "partial-affirmation",
      "concession"
    ],
    "sourceIds": [
      "n3-grammar-0032",
      "n3-grammar-033"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 837
  },
  {
    "category": "grammar",
    "front": "〜ことは〜が",
    "back": "although it is true that",
    "exampleJp": "この本は読んだことは読んだが、内容はほとんど覚えていない。",
    "exampleTranslation": "I did read this book, although I hardly remember the contents.",
    "tags": [
      "n3",
      "grammar",
      "concession",
      "limitation"
    ],
    "sourceIds": [
      "n3-grammar-0033",
      "n3-grammar-034"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 838
  },
  {
    "category": "grammar",
    "front": "〜てもらいたい / 〜ていただきたい",
    "back": "want someone to do",
    "exampleJp": "今後のスケジュールについて、少し確認させていただきたいのですが。",
    "exampleTranslation": "I would like to have you let me check a bit regarding the future schedule.",
    "tags": [
      "n3",
      "grammar",
      "desire",
      "request"
    ],
    "sourceIds": [
      "n3-grammar-0034",
      "n3-grammar-035"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 839
  },
  {
    "category": "grammar",
    "front": "〜させてもらいたい / 〜させていただきたい",
    "back": "want to be allowed to do",
    "exampleJp": "気分が悪いので、今日は早く帰らせてもらいたいんですが。",
    "exampleTranslation": "I'm feeling unwell, so I would like to be allowed to go home early today.",
    "tags": [
      "n3",
      "grammar",
      "permission",
      "polite-request"
    ],
    "sourceIds": [
      "n3-grammar-0035",
      "n3-grammar-036"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 840
  },
  {
    "category": "grammar",
    "front": "〜といい / 〜ばいい / 〜たらいい",
    "back": "it would be good if; I hope",
    "exampleJp": "明日の試験、あまり難しくないといいですね。",
    "exampleTranslation": "I hope tomorrow's exam isn't too difficult.",
    "tags": [
      "n3",
      "grammar",
      "wish",
      "hope"
    ],
    "sourceIds": [
      "n3-grammar-0036",
      "n3-grammar-037"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 841
  },
  {
    "category": "grammar",
    "front": "〜ことだから",
    "back": "because it is (someone) - expecting typical behavior",
    "exampleJp": "真面目な彼のことだから、きっと約束の時間には遅れないだろう。",
    "exampleTranslation": "Knowing how serious he is, he probably won't be late for the appointment.",
    "tags": [
      "n3",
      "grammar",
      "reason",
      "expectation"
    ],
    "sourceIds": [
      "n3-grammar-0037",
      "n3-grammar-039"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 842
  },
  {
    "category": "grammar",
    "front": "〜ことに",
    "back": "to my surprise, joy, or sadness",
    "exampleJp": "驚いたことに、その小さな村に有名な俳優が住んでいた。",
    "exampleTranslation": "To my surprise, a famous actor was living in that small village.",
    "tags": [
      "n3",
      "grammar",
      "emotion",
      "emphasis"
    ],
    "sourceIds": [
      "n3-grammar-0038",
      "n3-grammar-040"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 843
  },
  {
    "category": "grammar",
    "front": "〜ものの",
    "back": "although; even though",
    "exampleJp": "新しいパソコンを買ったものの、使い方が全く分からない。",
    "exampleTranslation": "Although I bought a new computer, I have absolutely no idea how to use it.",
    "tags": [
      "n3",
      "grammar",
      "concession",
      "contrast"
    ],
    "sourceIds": [
      "n3-grammar-0039",
      "n3-grammar-042"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 844
  },
  {
    "category": "grammar",
    "front": "〜ものだ / 〜ものではない",
    "back": "used to do; it is natural that; should not",
    "exampleJp": "子供の頃は、よくこの川で泳いだものだ。",
    "exampleTranslation": "When I was a child, I used to swim in this river often.",
    "tags": [
      "n3",
      "grammar",
      "reminiscence",
      "general-truth"
    ],
    "sourceIds": [
      "n3-grammar-0040",
      "n3-grammar-043"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 845
  },
  {
    "category": "grammar",
    "front": "〜ないものか / 〜ないだろうか",
    "back": "isn't there a way to; I wish",
    "exampleJp": "毎日の通勤ラッシュ、どうにかならないものだろうか。",
    "exampleTranslation": "I wish there was some way to do something about the daily rush hour commute.",
    "tags": [
      "n3",
      "grammar",
      "wish",
      "desire"
    ],
    "sourceIds": [
      "n3-grammar-0041",
      "n3-grammar-044"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 846
  },
  {
    "category": "grammar",
    "front": "〜ばかりだ / 〜一方だ",
    "back": "continue to (usually in a negative direction)",
    "exampleJp": "祖父の病気は、最近悪くなるばかりで心配だ。",
    "exampleTranslation": "My grandfather's illness has only been getting worse lately, and I'm worried.",
    "tags": [
      "n3",
      "grammar",
      "trend",
      "negative"
    ],
    "sourceIds": [
      "n3-grammar-0042",
      "n3-grammar-045"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 847
  },
  {
    "category": "grammar",
    "front": "〜ばかりか / 〜ばかりでなく",
    "back": "not only, but also",
    "exampleJp": "このレストランは料理がおいしいばかりか、サービスも非常に良い。",
    "exampleTranslation": "This restaurant not only has delicious food, but also offers excellent service.",
    "tags": [
      "n3",
      "grammar",
      "addition",
      "emphasis"
    ],
    "sourceIds": [
      "n3-grammar-0043",
      "n3-grammar-046"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 848
  },
  {
    "category": "grammar",
    "front": "〜てばかりいる",
    "back": "doing nothing but; always doing",
    "exampleJp": "休みの日は、家でゲームをしてばかりいる。",
    "exampleTranslation": "On my days off, I do nothing but play games at home.",
    "tags": [
      "n3",
      "grammar",
      "repetition",
      "habit"
    ],
    "sourceIds": [
      "n3-grammar-0044",
      "n3-grammar-048"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 849
  },
  {
    "category": "grammar",
    "front": "〜として（は）",
    "back": "as; in the capacity of",
    "exampleJp": "彼は医者としてだけでなく、作家としても有名だ。",
    "exampleTranslation": "He is famous not only as a doctor but also as a writer.",
    "tags": [
      "n3",
      "grammar",
      "role",
      "capacity"
    ],
    "sourceIds": [
      "n3-grammar-0045",
      "n3-grammar-049"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 850
  },
  {
    "category": "grammar",
    "front": "〜としたら / 〜とすれば / 〜とすると",
    "back": "if it were the case that; assuming",
    "exampleJp": "無人島に一つだけ持っていけるとしたら、何を選びますか。",
    "exampleTranslation": "If you could bring just one thing to a deserted island, what would you choose?",
    "tags": [
      "n3",
      "grammar",
      "hypothesis",
      "condition"
    ],
    "sourceIds": [
      "n3-grammar-0046",
      "n3-grammar-052"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 851
  },
  {
    "category": "grammar",
    "front": "〜ずにはいられない / 〜ないではいられない",
    "back": "can't help but do",
    "exampleJp": "あのコメディ映画は面白すぎて、笑わずにはいられなかった。",
    "exampleTranslation": "That comedy movie was so funny I couldn't help but laugh.",
    "tags": [
      "n3",
      "grammar",
      "emotion",
      "uncontrollable"
    ],
    "sourceIds": [
      "n3-grammar-0047",
      "n3-grammar-053"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 852
  },
  {
    "category": "grammar",
    "front": "〜てたまらない / 〜てしようがない",
    "back": "can't help but feeling; unbearably",
    "exampleJp": "ずっと外で立っていたので、寒くてたまらない。",
    "exampleTranslation": "Because I was standing outside for a long time, I am unbearably cold.",
    "tags": [
      "n3",
      "grammar",
      "emotion",
      "physical-sensation"
    ],
    "sourceIds": [
      "n3-grammar-0048",
      "n3-grammar-054"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 853
  },
  {
    "category": "grammar",
    "front": "〜をはじめ（として）",
    "back": "starting with; including",
    "exampleJp": "この動物園には、パンダをはじめとする多くの珍しい動物がいる。",
    "exampleTranslation": "In this zoo, there are many rare animals, starting with pandas.",
    "tags": [
      "n3",
      "grammar",
      "example",
      "representative"
    ],
    "sourceIds": [
      "n3-grammar-0049",
      "n3-grammar-056"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 854
  },
  {
    "category": "grammar",
    "front": "〜からして (judging from evidence)",
    "back": "judging from; starting with (usually negative)",
    "exampleJp": "彼は話し方からして、あまり誠実そうな人ではないね。",
    "exampleTranslation": "Judging from his way of speaking alone, he doesn't seem like a very sincere person.",
    "tags": [
      "n3",
      "grammar",
      "judgment",
      "basis"
    ],
    "sourceIds": [
      "n3-grammar-0050",
      "n3-grammar-057"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 855
  },
  {
    "category": "grammar",
    "front": "〜にわたって / 〜にわたり",
    "back": "throughout; over a period of",
    "exampleJp": "三日間にわたる会議が、ようやく終了した。",
    "exampleTranslation": "The conference spanning three days has finally concluded.",
    "tags": [
      "n3",
      "grammar",
      "time",
      "space",
      "span"
    ],
    "sourceIds": [
      "n3-grammar-0051",
      "n3-grammar-058"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 856
  },
  {
    "category": "grammar",
    "front": "〜を通じて / 〜を通して",
    "back": "through; via; throughout",
    "exampleJp": "彼は一生を通じて、世界平和のために活動した。",
    "exampleTranslation": "Throughout his entire life, he campaigned for world peace.",
    "tags": [
      "n3",
      "grammar",
      "medium",
      "duration"
    ],
    "sourceIds": [
      "n3-grammar-0052",
      "n3-grammar-059"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 857
  },
  {
    "category": "grammar",
    "front": "〜限り",
    "back": "as long as; to the extent that",
    "exampleJp": "私が知っている限りでは、その情報は間違っています。",
    "exampleTranslation": "As far as I know, that information is incorrect.",
    "tags": [
      "n3",
      "grammar",
      "limit",
      "condition"
    ],
    "sourceIds": [
      "n3-grammar-0053",
      "n3-grammar-060"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 858
  },
  {
    "category": "grammar",
    "front": "〜に限り",
    "back": "limited to; exclusively for",
    "exampleJp": "本日に限り、全品半額セールを実施しております。",
    "exampleTranslation": "Limited to today only, we are holding a half-price sale on all items.",
    "tags": [
      "n3",
      "grammar",
      "limitation",
      "exception"
    ],
    "sourceIds": [
      "n3-grammar-0054",
      "n3-grammar-061"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 859
  },
  {
    "category": "grammar",
    "front": "〜ざるを得ない",
    "back": "cannot help but; have no choice but to",
    "exampleJp": "台風で電車が止まっているので、明日の旅行は延期せざるを得ない。",
    "exampleTranslation": "Because the trains are stopped due to the typhoon, we have no choice but to postpone tomorrow's trip.",
    "tags": [
      "n3",
      "grammar",
      "obligation",
      "unwillingness"
    ],
    "sourceIds": [
      "n3-grammar-0055",
      "n3-grammar-062"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 860
  },
  {
    "category": "grammar",
    "front": "〜かねない",
    "back": "might happen; there is a fear that (bad result)",
    "exampleJp": "そんなにスピードを出したら、大きな事故を起こしかねないよ。",
    "exampleTranslation": "If you speed that much, you might cause a major accident.",
    "tags": [
      "n3",
      "grammar",
      "possibility",
      "danger"
    ],
    "sourceIds": [
      "n3-grammar-0056",
      "n3-grammar-063"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 861
  },
  {
    "category": "grammar",
    "front": "〜がち",
    "back": "tend to; apt to",
    "exampleJp": "最近は仕事が忙しくて、どうしても睡眠不足になりがちだ。",
    "exampleTranslation": "Lately I've been busy with work, so I tend to lack sleep no matter what.",
    "tags": [
      "n3",
      "grammar",
      "tendency",
      "frequency"
    ],
    "sourceIds": [
      "n3-grammar-0057",
      "n3-grammar-064"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 862
  },
  {
    "category": "grammar",
    "front": "〜だらけ",
    "back": "full of; covered with (usually bad things)",
    "exampleJp": "子供たちが泥だらけになって、公園から帰ってきた。",
    "exampleTranslation": "The children came back from the park covered in mud.",
    "tags": [
      "n3",
      "grammar",
      "state",
      "negative-abundance"
    ],
    "sourceIds": [
      "n3-grammar-0058",
      "n3-grammar-065"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 863
  },
  {
    "category": "grammar",
    "front": "〜気味",
    "back": "feeling a bit; a touch of",
    "exampleJp": "少し風邪気味なので、今日は早く寝ることにします。",
    "exampleTranslation": "Since I feel a slight cold coming on, I've decided to sleep early today.",
    "tags": [
      "n3",
      "grammar",
      "sensation",
      "tendency"
    ],
    "sourceIds": [
      "n3-grammar-0059",
      "n3-grammar-066"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 864
  },
  {
    "category": "grammar",
    "front": "〜っぽい",
    "back": "seems like; -ish",
    "exampleJp": "彼の服装はいつも子供っぽくて、年相応に見えない。",
    "exampleTranslation": "His clothing is always childish, and he doesn't look his age.",
    "tags": [
      "n3",
      "grammar",
      "appearance",
      "tendency"
    ],
    "sourceIds": [
      "n3-grammar-0060",
      "n3-grammar-067"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 865
  },
  {
    "category": "grammar",
    "front": "〜っこない",
    "back": "no way that; absolutely impossible",
    "exampleJp": "こんなたくさんの漢字、一週間で覚えられっこないよ。",
    "exampleTranslation": "There's no way I can memorize this many kanji in a week.",
    "tags": [
      "n3",
      "grammar",
      "strong-denial",
      "impossibility"
    ],
    "sourceIds": [
      "n3-grammar-0061",
      "n3-grammar-068"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 866
  },
  {
    "category": "grammar",
    "front": "〜げ",
    "back": "seems like; giving the appearance of",
    "exampleJp": "彼女は何か言いたげな顔をして、私のほうを見ていた。",
    "exampleTranslation": "She was looking at me with an expression that seemed like she wanted to say something.",
    "tags": [
      "n3",
      "grammar",
      "appearance",
      "emotion"
    ],
    "sourceIds": [
      "n3-grammar-0062",
      "n3-grammar-069"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 867
  },
  {
    "category": "grammar",
    "front": "〜がたい",
    "back": "hard to; difficult to",
    "exampleJp": "彼の突然の辞任は、私にとって信じがたい出来事だった。",
    "exampleTranslation": "His sudden resignation was an event hard for me to believe.",
    "tags": [
      "n3",
      "grammar",
      "difficulty",
      "psychological"
    ],
    "sourceIds": [
      "n3-grammar-0063",
      "n3-grammar-070"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 868
  },
  {
    "category": "grammar",
    "front": "〜つつある",
    "back": "in the process of; is currently",
    "exampleJp": "環境問題への人々の関心は、年々高まりつつある。",
    "exampleTranslation": "People's interest in environmental issues is currently increasing year by year.",
    "tags": [
      "n3",
      "grammar",
      "progress",
      "change"
    ],
    "sourceIds": [
      "n3-grammar-0064",
      "n3-grammar-071"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 869
  },
  {
    "category": "grammar",
    "front": "〜つつ",
    "back": "while; even though",
    "exampleJp": "体に悪いと知りつつ、つい甘いものを食べてしまう。",
    "exampleTranslation": "Even though I know it's bad for my body, I end up eating sweet things.",
    "tags": [
      "n3",
      "grammar",
      "simultaneous",
      "concession"
    ],
    "sourceIds": [
      "n3-grammar-0065",
      "n3-grammar-072"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 870
  },
  {
    "category": "grammar",
    "front": "〜に基づいて",
    "back": "based on",
    "exampleJp": "集めたデータに基づいて、新しいマーケティング戦略を立てた。",
    "exampleTranslation": "Based on the collected data, we established a new marketing strategy.",
    "tags": [
      "n3",
      "grammar",
      "basis",
      "foundation"
    ],
    "sourceIds": [
      "n3-grammar-0066",
      "n3-grammar-073"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 871
  },
  {
    "category": "grammar",
    "front": "〜に沿って (in accordance with)",
    "back": "along with; in accordance with",
    "exampleJp": "渡されたマニュアルに沿って、機械の操作を行ってください。",
    "exampleTranslation": "Please operate the machine in accordance with the manual you were given.",
    "tags": [
      "n3",
      "grammar",
      "parallel",
      "compliance"
    ],
    "sourceIds": [
      "n3-grammar-0067",
      "n3-grammar-074"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 872
  },
  {
    "category": "grammar",
    "front": "〜のもとで / 〜のもとに",
    "back": "under (the influence/guidance of)",
    "exampleJp": "素晴らしい監督のもとで練習できたことは、良い経験になった。",
    "exampleTranslation": "Being able to practice under an excellent coach was a good experience.",
    "tags": [
      "n3",
      "grammar",
      "influence",
      "condition"
    ],
    "sourceIds": [
      "n3-grammar-0068",
      "n3-grammar-075"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 873
  },
  {
    "category": "grammar",
    "front": "〜向け",
    "back": "aimed at; intended for",
    "exampleJp": "このマンションは、一人暮らしの学生向けに設計されている。",
    "exampleTranslation": "This apartment building is designed for students living alone.",
    "tags": [
      "n3",
      "grammar",
      "target",
      "audience"
    ],
    "sourceIds": [
      "n3-grammar-0069",
      "n3-grammar-076"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 874
  },
  {
    "category": "grammar",
    "front": "〜に伴って / 〜に伴い",
    "back": "along with; as something changes",
    "exampleJp": "人口の増加に伴って、様々な社会問題が発生している。",
    "exampleTranslation": "Along with the increase in population, various social problems are occurring.",
    "tags": [
      "n3",
      "grammar",
      "co-occurrence",
      "change"
    ],
    "sourceIds": [
      "n3-grammar-0070",
      "n3-grammar-077"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 875
  },
  {
    "category": "grammar",
    "front": "〜につれて / 〜にしたがって",
    "back": "as something changes",
    "exampleJp": "秋が深まるにつれて、木の葉が赤く色づいてきた。",
    "exampleTranslation": "As autumn deepens, the tree leaves have started turning red.",
    "tags": [
      "n3",
      "grammar",
      "proportional-change",
      "time"
    ],
    "sourceIds": [
      "n3-grammar-0071",
      "n3-grammar-078"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 876
  },
  {
    "category": "grammar",
    "front": "〜からいうと / 〜からいえば",
    "back": "from the perspective of",
    "exampleJp": "客の立場からいうと、もっと営業時間を長くしてほしい。",
    "exampleTranslation": "From the perspective of a customer, I want the business hours to be longer.",
    "tags": [
      "n3",
      "grammar",
      "perspective",
      "judgment"
    ],
    "sourceIds": [
      "n3-grammar-0072",
      "n3-grammar-079"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 877
  },
  {
    "category": "grammar",
    "front": "〜から見ると / 〜から見れば",
    "back": "looking from (someone's point of view)",
    "exampleJp": "外国人から見ると、日本の満員電車は非常に奇妙な光景らしい。",
    "exampleTranslation": "Looking from a foreigner's point of view, Japan's crowded trains seem to be a very strange sight.",
    "tags": [
      "n3",
      "grammar",
      "perspective",
      "judgment"
    ],
    "sourceIds": [
      "n3-grammar-0073",
      "n3-grammar-080"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 878
  },
  {
    "category": "grammar",
    "front": "〜からすると / 〜からすれば",
    "back": "judging from (evidence)",
    "exampleJp": "あの空模様からすると、午後には大雨が降るだろう。",
    "exampleTranslation": "Judging from the look of that sky, it will probably rain heavily in the afternoon.",
    "tags": [
      "n3",
      "grammar",
      "judgment",
      "basis"
    ],
    "sourceIds": [
      "n3-grammar-0074",
      "n3-grammar-081"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 879
  },
  {
    "category": "grammar",
    "front": "〜からして (starting with an example)",
    "back": "starting with (often negative tone)",
    "exampleJp": "このレストランは、店員の態度からしてなっていない。",
    "exampleTranslation": "Starting with the attitude of the staff, this restaurant is just no good.",
    "tags": [
      "n3",
      "grammar",
      "evaluation",
      "basis"
    ],
    "sourceIds": [
      "n3-grammar-0075",
      "n3-grammar-082"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 880
  },
  {
    "category": "grammar",
    "front": "〜からには",
    "back": "now that; since",
    "exampleJp": "プロとして契約したからには、結果を出さなければならない。",
    "exampleTranslation": "Now that I have signed as a professional, I must produce results.",
    "tags": [
      "n3",
      "grammar",
      "determination",
      "reason"
    ],
    "sourceIds": [
      "n3-grammar-0076",
      "n3-grammar-083"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 881
  },
  {
    "category": "grammar",
    "front": "〜のことだから",
    "back": "because it is typical of someone",
    "exampleJp": "時間に厳しい彼のことだから、絶対に遅刻はしないはずだ。",
    "exampleTranslation": "Since it's him, who is strict about time, he definitely shouldn't be late.",
    "tags": [
      "n3",
      "grammar",
      "reason",
      "expectation"
    ],
    "sourceIds": [
      "n3-grammar-0077",
      "n3-grammar-084"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 882
  },
  {
    "category": "grammar",
    "front": "〜だけに",
    "back": "precisely because",
    "exampleJp": "期待が大きかっただけに、失敗したときのショックも大きかった。",
    "exampleTranslation": "Precisely because the expectations were high, the shock when it failed was also great.",
    "tags": [
      "n3",
      "grammar",
      "cause",
      "emphasis"
    ],
    "sourceIds": [
      "n3-grammar-0078",
      "n3-grammar-085"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 883
  },
  {
    "category": "grammar",
    "front": "〜ばかりに",
    "back": "simply because (negative consequence)",
    "exampleJp": "お金がないばかりに、進学を諦めざるを得なかった。",
    "exampleTranslation": "Simply because I had no money, I had no choice but to give up on continuing my education.",
    "tags": [
      "n3",
      "grammar",
      "cause",
      "regret"
    ],
    "sourceIds": [
      "n3-grammar-0079",
      "n3-grammar-086"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 884
  },
  {
    "category": "grammar",
    "front": "〜からといって",
    "back": "just because",
    "exampleJp": "便利だからといって、毎日コンビニ弁当ばかり食べるのは良くない。",
    "exampleTranslation": "Just because it's convenient, it's not good to only eat convenience store bentos every day.",
    "tags": [
      "n3",
      "grammar",
      "reason",
      "denial"
    ],
    "sourceIds": [
      "n3-grammar-0080",
      "n3-grammar-087"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 885
  },
  {
    "category": "grammar",
    "front": "〜にしては",
    "back": "for; considering that",
    "exampleJp": "初めて作ったにしては、とても美味しいケーキですね。",
    "exampleTranslation": "For having made it for the first time, this is a very delicious cake.",
    "tags": [
      "n3",
      "grammar",
      "expectation",
      "contrast"
    ],
    "sourceIds": [
      "n3-grammar-0081",
      "n3-grammar-088"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 886
  },
  {
    "category": "grammar",
    "front": "〜にしても",
    "back": "even if; even so",
    "exampleJp": "いくら忙しいにしても、連絡くらいはするべきだ。",
    "exampleTranslation": "No matter how busy you are, you should at least contact me.",
    "tags": [
      "n3",
      "grammar",
      "concession",
      "criticism"
    ],
    "sourceIds": [
      "n3-grammar-0082",
      "n3-grammar-089"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 887
  },
  {
    "category": "grammar",
    "front": "〜としたら / 〜とすれば",
    "back": "if",
    "exampleJp": "もし宝くじで一億円当たったとしたら、何に使いますか。",
    "exampleTranslation": "If you were to win 100 million yen in the lottery, what would you spend it on?",
    "tags": [
      "n3",
      "grammar",
      "hypothesis",
      "condition"
    ],
    "sourceIds": [
      "n3-grammar-0083",
      "n3-grammar-090"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 888
  },
  {
    "category": "grammar",
    "front": "〜となると",
    "back": "when it comes to; if it comes to",
    "exampleJp": "車を買うとなると、維持費もかなりかかるから慎重に考えよう。",
    "exampleTranslation": "When it comes to buying a car, the maintenance costs are quite high, so let's think carefully.",
    "tags": [
      "n3",
      "grammar",
      "hypothesis",
      "topic"
    ],
    "sourceIds": [
      "n3-grammar-0084",
      "n3-grammar-091"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 889
  },
  {
    "category": "grammar",
    "front": "〜としても",
    "back": "even if",
    "exampleJp": "たとえ親が反対したとしても、私はこの仕事を辞めるつもりはない。",
    "exampleTranslation": "Even if my parents oppose it, I have no intention of quitting this job.",
    "tags": [
      "n3",
      "grammar",
      "concession",
      "determination"
    ],
    "sourceIds": [
      "n3-grammar-0085",
      "n3-grammar-092"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 890
  },
  {
    "category": "grammar",
    "front": "〜まい / 〜まいか",
    "back": "will not; probably will not",
    "exampleJp": "あんな美味しくない店には、二度と行くまいと心に誓った。",
    "exampleTranslation": "I swore in my heart that I would never go to such an untasty restaurant again.",
    "tags": [
      "n3",
      "grammar",
      "negative-volition",
      "conjecture"
    ],
    "sourceIds": [
      "n3-grammar-0086",
      "n3-grammar-093"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 891
  },
  {
    "category": "grammar",
    "front": "〜ようか〜まいか",
    "back": "whether to or not",
    "exampleJp": "雨が降ってきたので、出かけようか出かけまいか迷っている。",
    "exampleTranslation": "Since it started raining, I am hesitating whether to go out or not.",
    "tags": [
      "n3",
      "grammar",
      "hesitation",
      "choice"
    ],
    "sourceIds": [
      "n3-grammar-0087",
      "n3-grammar-094"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 892
  },
  {
    "category": "grammar",
    "front": "〜に決まっている",
    "back": "definitely; bound to",
    "exampleJp": "勉強していないのだから、試験に落ちるに決まっている。",
    "exampleTranslation": "Since you haven't been studying, you are definitely going to fail the exam.",
    "tags": [
      "n3",
      "grammar",
      "conjecture",
      "certainty"
    ],
    "sourceIds": [
      "n3-grammar-0088",
      "n3-grammar-095"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 893
  },
  {
    "category": "grammar",
    "front": "〜に違いない",
    "back": "must be; definitely",
    "exampleJp": "彼の机の上に鍵があるから、まだ会社にいるに違いない。",
    "exampleTranslation": "Since his keys are on his desk, he must still be at the office.",
    "tags": [
      "n3",
      "grammar",
      "conjecture",
      "conviction"
    ],
    "sourceIds": [
      "n3-grammar-0089",
      "n3-grammar-096"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 894
  },
  {
    "category": "grammar",
    "front": "〜はずがない",
    "back": "no way; impossible",
    "exampleJp": "彼があの秘密を誰かに話すはずがない。彼は口が堅いから。",
    "exampleTranslation": "There is no way he would tell that secret to anyone. Because he is tight-lipped.",
    "tags": [
      "n3",
      "grammar",
      "impossibility",
      "strong-denial"
    ],
    "sourceIds": [
      "n3-grammar-0090",
      "n3-grammar-097"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 895
  },
  {
    "category": "grammar",
    "front": "〜ないわけではない",
    "back": "it is not that; it doesn't mean that",
    "exampleJp": "あなたの言いたいことが分からないわけではないが、賛成はできない。",
    "exampleTranslation": "It's not that I don't understand what you want to say, but I cannot agree.",
    "tags": [
      "n3",
      "grammar",
      "partial-affirmation",
      "concession"
    ],
    "sourceIds": [
      "n3-grammar-0091",
      "n3-grammar-100"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 896
  },
  {
    "category": "grammar",
    "front": "〜わけにはいかない",
    "back": "cannot afford to; must not (for social/moral reasons)",
    "exampleJp": "明日は大切な会議があるから、今日はお酒を飲むわけにはいかない。",
    "exampleTranslation": "Because there is an important meeting tomorrow, I cannot afford to drink alcohol today.",
    "tags": [
      "n3",
      "grammar",
      "prohibition",
      "social-obligation"
    ],
    "sourceIds": [
      "n3-grammar-0092",
      "n3-grammar-101"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 897
  },
  {
    "category": "grammar",
    "front": "〜てしょうがない / 〜てしかたがない",
    "back": "can't help but; extremely",
    "exampleJp": "新しいスマートフォンが欲しくて欲しくてしょうがない。",
    "exampleTranslation": "I want a new smartphone so badly I can't stand it.",
    "tags": [
      "n3",
      "grammar",
      "emotion",
      "extreme"
    ],
    "sourceIds": [
      "n3-grammar-0093",
      "n3-grammar-103"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 898
  },
  {
    "category": "grammar",
    "front": "〜てたまらない",
    "back": "unbearably; dying to",
    "exampleJp": "今日は朝から何も食べていないので、お腹が空いてたまらない。",
    "exampleTranslation": "Because I haven't eaten anything since morning today, I am unbearably hungry.",
    "tags": [
      "n3",
      "grammar",
      "physical-sensation",
      "uncontrollable"
    ],
    "sourceIds": [
      "n3-grammar-0094",
      "n3-grammar-104"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 899
  },
  {
    "category": "grammar",
    "front": "〜てならない",
    "back": "can't help but feel",
    "exampleJp": "故郷で一人暮らしをしている母のことが心配でならない。",
    "exampleTranslation": "I can't help but worry about my mother who is living alone in my hometown.",
    "tags": [
      "n3",
      "grammar",
      "emotion",
      "natural-feeling"
    ],
    "sourceIds": [
      "n3-grammar-0095",
      "n3-grammar-105"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 900
  },
  {
    "category": "grammar",
    "front": "〜ないではいられない",
    "back": "can't help but (do)",
    "exampleJp": "彼の冗談がおかしすぎて、大声で笑わないではいられなかった。",
    "exampleTranslation": "His joke was so funny that I couldn't help but laugh out loud.",
    "tags": [
      "n3",
      "grammar",
      "action",
      "uncontrollable"
    ],
    "sourceIds": [
      "n3-grammar-0096",
      "n3-grammar-106"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 901
  },
  {
    "category": "grammar",
    "front": "〜ずにはいられない",
    "back": "can't help but (do) - formal",
    "exampleJp": "こんな不公平な決定には、抗議せずにはいられない。",
    "exampleTranslation": "I can't help but protest against such an unfair decision.",
    "tags": [
      "n3",
      "grammar",
      "action",
      "formal"
    ],
    "sourceIds": [
      "n3-grammar-0097",
      "n3-grammar-107"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 902
  },
  {
    "category": "grammar",
    "front": "〜たいものだ / 〜てほしいものだ",
    "back": "really want to; strongly wish",
    "exampleJp": "いつか自分の家を建てて、家族でのんびり暮らしたいものだ。",
    "exampleTranslation": "Someday I really want to build my own house and live relaxedly with my family.",
    "tags": [
      "n3",
      "grammar",
      "wish",
      "strong-desire"
    ],
    "sourceIds": [
      "n3-grammar-0098",
      "n3-grammar-108"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 903
  },
  {
    "category": "grammar",
    "front": "〜ないものか",
    "back": "wishing for a way to make something happen",
    "exampleJp": "もう少し給料が上がらないものかと、いつも思っている。",
    "exampleTranslation": "I'm always thinking, isn't there some way my salary could go up a bit more.",
    "tags": [
      "n3",
      "grammar",
      "wish",
      "desire"
    ],
    "sourceIds": [
      "n3-grammar-0099",
      "n3-grammar-109"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 904
  },
  {
    "category": "grammar",
    "front": "〜ものだ",
    "back": "used to; generally is",
    "exampleJp": "学生時代は、よく徹夜でテスト勉強をしたものだ。",
    "exampleTranslation": "In my student days, I used to often pull all-nighters to study for tests.",
    "tags": [
      "n3",
      "grammar",
      "reminiscence",
      "general-truth"
    ],
    "sourceIds": [
      "n3-grammar-0100",
      "n3-grammar-110"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 905
  },
  {
    "category": "grammar",
    "front": "〜ものではない",
    "back": "should not",
    "exampleJp": "目上の人に対して、そんな失礼な口の利き方をするものではない。",
    "exampleTranslation": "You should not speak to your superiors in such a rude manner.",
    "tags": [
      "n3",
      "grammar",
      "advice",
      "prohibition",
      "general"
    ],
    "sourceIds": [
      "n3-grammar-0101",
      "n3-grammar-111"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 906
  },
  {
    "category": "grammar",
    "front": "〜というものだ",
    "back": "is exactly; truly is",
    "exampleJp": "困った時に助け合うのが、本当の友達というものだ。",
    "exampleTranslation": "Helping each other in times of trouble is exactly what true friends are.",
    "tags": [
      "n3",
      "grammar",
      "definition",
      "emphasis"
    ],
    "sourceIds": [
      "n3-grammar-0102",
      "n3-grammar-112"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 907
  },
  {
    "category": "grammar",
    "front": "〜ものか",
    "back": "absolutely not; no way",
    "exampleJp": "あんな不親切な店、二度と行くものか。",
    "exampleTranslation": "There is absolutely no way I'm going to such an unfriendly store again.",
    "tags": [
      "n3",
      "grammar",
      "strong-denial",
      "emotion"
    ],
    "sourceIds": [
      "n3-grammar-0103",
      "n3-grammar-113"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 908
  },
  {
    "category": "grammar",
    "front": "〜ことだ",
    "back": "should (advice)",
    "exampleJp": "風邪を早く治したいなら、温かくしてしっかり寝ることだ。",
    "exampleTranslation": "If you want to cure your cold quickly, you should stay warm and sleep well.",
    "tags": [
      "n3",
      "grammar",
      "advice",
      "suggestion"
    ],
    "sourceIds": [
      "n3-grammar-0104",
      "n3-grammar-114"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 909
  },
  {
    "category": "grammar",
    "front": "〜こと",
    "back": "must; rule",
    "exampleJp": "図書館では静かにすること。飲食は禁止です。",
    "exampleTranslation": "You must be quiet in the library. Eating and drinking are prohibited.",
    "tags": [
      "n3",
      "grammar",
      "rule",
      "instruction"
    ],
    "sourceIds": [
      "n3-grammar-0105",
      "n3-grammar-115"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 910
  },
  {
    "category": "grammar",
    "front": "〜ことはない",
    "back": "no need to",
    "exampleJp": "時間はまだたっぷりあるから、そんなに急ぐことはないよ。",
    "exampleTranslation": "We still have plenty of time, so there's no need to rush so much.",
    "tags": [
      "n3",
      "grammar",
      "absence",
      "necessity"
    ],
    "sourceIds": [
      "n3-grammar-0106",
      "n3-grammar-116"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 911
  },
  {
    "category": "grammar",
    "front": "〜ということだ",
    "back": "it means that; I heard that",
    "exampleJp": "ニュースによると、明日の午後は大雪になるということだ。",
    "exampleTranslation": "According to the news, I heard that there will be heavy snow tomorrow afternoon.",
    "tags": [
      "n3",
      "grammar",
      "hearsay",
      "meaning"
    ],
    "sourceIds": [
      "n3-grammar-0107",
      "n3-grammar-117"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 912
  },
  {
    "category": "grammar",
    "front": "〜ことなく",
    "back": "without",
    "exampleJp": "彼女は一度も諦めることなく、最後まで夢を追い続けた。",
    "exampleTranslation": "She continued to chase her dream until the very end without giving up even once.",
    "tags": [
      "n3",
      "grammar",
      "absence",
      "action"
    ],
    "sourceIds": [
      "n3-grammar-0108",
      "n3-grammar-120"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 913
  },
  {
    "category": "grammar",
    "front": "〜ところだった",
    "back": "was about to; almost did",
    "exampleJp": "あと少しで、トラックに轢かれるところだった。危なかった。",
    "exampleTranslation": "I was almost run over by a truck just a little more. It was dangerous.",
    "tags": [
      "n3",
      "grammar",
      "near-miss",
      "past"
    ],
    "sourceIds": [
      "n3-grammar-0109",
      "n3-grammar-121"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 914
  },
  {
    "category": "grammar",
    "front": "〜て以来",
    "back": "since",
    "exampleJp": "日本に来て以来、毎日納豆を食べています。",
    "exampleTranslation": "Ever since I came to Japan, I have been eating natto every day.",
    "tags": [
      "n3",
      "grammar",
      "time",
      "continuation"
    ],
    "sourceIds": [
      "n3-grammar-0110",
      "n3-grammar-122"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 915
  },
  {
    "category": "grammar",
    "front": "〜ながら（も）",
    "back": "while; although",
    "exampleJp": "狭いながらも、庭のある一軒家に住むのが私の夢です。",
    "exampleTranslation": "Although it's small, living in a detached house with a garden is my dream.",
    "tags": [
      "n3",
      "grammar",
      "concession",
      "contrast"
    ],
    "sourceIds": [
      "n3-grammar-0111",
      "n3-grammar-125"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 916
  },
  {
    "category": "grammar",
    "front": "〜にかけては",
    "back": "when it comes to",
    "exampleJp": "ピアノを弾くことにかけては、クラスの誰にも負けない自信がある。",
    "exampleTranslation": "When it comes to playing the piano, I have the confidence not to lose to anyone in the class.",
    "tags": [
      "n3",
      "grammar",
      "evaluation",
      "confidence"
    ],
    "sourceIds": [
      "n3-grammar-0112",
      "n3-grammar-126"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 917
  },
  {
    "category": "grammar",
    "front": "〜として",
    "back": "as",
    "exampleJp": "この建物は、昔は学校として使われていたそうだ。",
    "exampleTranslation": "I heard that this building was used as a school in the past.",
    "tags": [
      "n3",
      "grammar",
      "role",
      "function"
    ],
    "sourceIds": [
      "n3-grammar-0113",
      "n3-grammar-127"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 918
  },
  {
    "category": "grammar",
    "front": "〜にとって",
    "back": "for",
    "exampleJp": "私にとって、家族と過ごす時間が何よりも大切です。",
    "exampleTranslation": "For me, the time spent with my family is more important than anything else.",
    "tags": [
      "n3",
      "grammar",
      "perspective",
      "evaluation"
    ],
    "sourceIds": [
      "n3-grammar-0114",
      "n3-grammar-128"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 919
  },
  {
    "category": "grammar",
    "front": "〜に対して (towards/against)",
    "back": "against; towards",
    "exampleJp": "彼は目下の人に対して、いつも厳しい態度をとる。",
    "exampleTranslation": "He always takes a strict attitude towards his subordinates.",
    "tags": [
      "n3",
      "grammar",
      "direction",
      "attitude"
    ],
    "sourceIds": [
      "n3-grammar-0115",
      "n3-grammar-129"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 920
  },
  {
    "category": "grammar",
    "front": "〜について",
    "back": "about",
    "exampleJp": "日本の経済問題について、クラスで討論を行った。",
    "exampleTranslation": "We held a discussion in class about Japan's economic problems.",
    "tags": [
      "n3",
      "grammar",
      "topic",
      "subject"
    ],
    "sourceIds": [
      "n3-grammar-0116",
      "n3-grammar-130"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 921
  },
  {
    "category": "grammar",
    "front": "〜に関して",
    "back": "regarding; concerning",
    "exampleJp": "この件に関しましては、現在担当部署で調査中です。",
    "exampleTranslation": "Regarding this matter, it is currently under investigation by the relevant department.",
    "tags": [
      "n3",
      "grammar",
      "topic",
      "formal"
    ],
    "sourceIds": [
      "n3-grammar-0117",
      "n3-grammar-131"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 922
  },
  {
    "category": "grammar",
    "front": "〜をめぐって",
    "back": "concerning; over (usually involving a dispute/discussion)",
    "exampleJp": "遺産をめぐって、兄弟間で激しい争いが起きているらしい。",
    "exampleTranslation": "It seems a fierce dispute is occurring among the siblings concerning the inheritance.",
    "tags": [
      "n3",
      "grammar",
      "topic",
      "conflict"
    ],
    "sourceIds": [
      "n3-grammar-0118",
      "n3-grammar-132"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 923
  },
  {
    "category": "grammar",
    "front": "〜にこたえて",
    "back": "in response to",
    "exampleJp": "ファンの期待にこたえて、彼は素晴らしい演技を見せた。",
    "exampleTranslation": "In response to the fans' expectations, he showed a wonderful performance.",
    "tags": [
      "n3",
      "grammar",
      "response",
      "expectation"
    ],
    "sourceIds": [
      "n3-grammar-0119",
      "n3-grammar-133"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 924
  },
  {
    "category": "grammar",
    "front": "〜をもとに（して）",
    "back": "based on",
    "exampleJp": "この映画は、実際にあった事件をもとにして作られている。",
    "exampleTranslation": "This movie is made based on an incident that actually happened.",
    "tags": [
      "n3",
      "grammar",
      "basis",
      "source"
    ],
    "sourceIds": [
      "n3-grammar-0120",
      "n3-grammar-134"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 925
  },
  {
    "category": "grammar",
    "front": "〜に沿って (along)",
    "back": "along with; in accordance with",
    "exampleJp": "川に沿って歩いていくと、大きな公園が見えてきます。",
    "exampleTranslation": "If you walk along the river, a big park will come into view.",
    "tags": [
      "n3",
      "grammar",
      "parallel",
      "accordance"
    ],
    "sourceIds": [
      "n3-grammar-0121",
      "n3-grammar-136"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 926
  },
  {
    "category": "grammar",
    "front": "〜のもとで",
    "back": "under",
    "exampleJp": "両親の温かい愛情のもとで、彼女は健やかに育った。",
    "exampleTranslation": "She grew up healthily under the warm love of her parents.",
    "tags": [
      "n3",
      "grammar",
      "influence",
      "protection"
    ],
    "sourceIds": [
      "n3-grammar-0122",
      "n3-grammar-137"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 927
  },
  {
    "category": "grammar",
    "front": "〜向けに",
    "back": "for (a specific target)",
    "exampleJp": "この料理は、辛いものが苦手な子供向けに味付けしてあります。",
    "exampleTranslation": "This dish is seasoned for children who are not good with spicy food.",
    "tags": [
      "n3",
      "grammar",
      "target",
      "audience"
    ],
    "sourceIds": [
      "n3-grammar-0123",
      "n3-grammar-138"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 928
  },
  {
    "category": "grammar",
    "front": "〜によっては",
    "back": "depending on",
    "exampleJp": "人によっては、この薬の副作用が出ることがあります。",
    "exampleTranslation": "Depending on the person, there are cases where the side effects of this medicine appear.",
    "tags": [
      "n3",
      "grammar",
      "condition",
      "variation"
    ],
    "sourceIds": [
      "n3-grammar-0124",
      "n3-grammar-139"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 929
  },
  {
    "category": "grammar",
    "front": "〜に伴って",
    "back": "along with",
    "exampleJp": "経済の発展に伴って、人々の生活様式も大きく変化した。",
    "exampleTranslation": "Along with the economic development, people's lifestyles have also changed significantly.",
    "tags": [
      "n3",
      "grammar",
      "co-occurrence",
      "change"
    ],
    "sourceIds": [
      "n3-grammar-0125",
      "n3-grammar-140"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 930
  },
  {
    "category": "grammar",
    "front": "〜につれて",
    "back": "as",
    "exampleJp": "試合の終了時間が近づくにつれて、観客の応援はさらに熱狂的になった。",
    "exampleTranslation": "As the end time of the match approached, the spectators' cheering became even more enthusiastic.",
    "tags": [
      "n3",
      "grammar",
      "proportional-change",
      "time"
    ],
    "sourceIds": [
      "n3-grammar-0126",
      "n3-grammar-141"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 931
  },
  {
    "category": "grammar",
    "front": "〜にしたがって",
    "back": "in accordance with; as",
    "exampleJp": "説明書の指示にしたがって、家具を組み立ててください。",
    "exampleTranslation": "Please assemble the furniture in accordance with the instructions in the manual.",
    "tags": [
      "n3",
      "grammar",
      "compliance",
      "change"
    ],
    "sourceIds": [
      "n3-grammar-0127",
      "n3-grammar-142"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 932
  },
  {
    "category": "grammar",
    "front": "〜とともに",
    "back": "together with; as",
    "exampleJp": "年をとるとともに、記憶力が少しずつ衰えていくのを感じる。",
    "exampleTranslation": "As I grow older, I feel my memory declining little by little.",
    "tags": [
      "n3",
      "grammar",
      "simultaneous",
      "change"
    ],
    "sourceIds": [
      "n3-grammar-0128",
      "n3-grammar-143"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 933
  },
  {
    "category": "grammar",
    "front": "〜次第で / 〜次第では",
    "back": "depending on",
    "exampleJp": "明日の天気次第で、ピクニックに行くかどうか決めましょう。",
    "exampleTranslation": "Let's decide whether to go on a picnic depending on tomorrow's weather.",
    "tags": [
      "n3",
      "grammar",
      "condition",
      "dependence"
    ],
    "sourceIds": [
      "n3-grammar-0129",
      "n3-grammar-144"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 934
  },
  {
    "category": "grammar",
    "front": "〜に応じて",
    "back": "in accordance with; depending on",
    "exampleJp": "お客様のご予算に応じて、最適なプランをご提案いたします。",
    "exampleTranslation": "We will propose the most suitable plan in accordance with your budget.",
    "tags": [
      "n3",
      "grammar",
      "adaptation",
      "condition"
    ],
    "sourceIds": [
      "n3-grammar-0130",
      "n3-grammar-145"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 935
  },
  {
    "category": "grammar",
    "front": "〜に加えて",
    "back": "in addition to",
    "exampleJp": "大雨に加えて強風も吹いてきたので、外に出るのは危険だ。",
    "exampleTranslation": "In addition to the heavy rain, strong winds have started blowing, so it's dangerous to go outside.",
    "tags": [
      "n3",
      "grammar",
      "addition"
    ],
    "sourceIds": [
      "n3-grammar-0131",
      "n3-grammar-146"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 936
  },
  {
    "category": "grammar",
    "front": "〜を問わず",
    "back": "regardless of",
    "exampleJp": "このスポーツクラブは、年齢や性別を問わず誰でも参加できます。",
    "exampleTranslation": "Anyone can participate in this sports club regardless of age or gender.",
    "tags": [
      "n3",
      "grammar",
      "regardless",
      "condition"
    ],
    "sourceIds": [
      "n3-grammar-0132",
      "n3-grammar-147"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 937
  },
  {
    "category": "grammar",
    "front": "〜にかかわらず",
    "back": "regardless of; whether or not",
    "exampleJp": "天候にかかわらず、明日のスポーツ大会は予定通り実施します。",
    "exampleTranslation": "Regardless of the weather, tomorrow's sports tournament will be held as scheduled.",
    "tags": [
      "n3",
      "grammar",
      "regardless",
      "condition"
    ],
    "sourceIds": [
      "n3-grammar-0133",
      "n3-grammar-148"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 938
  },
  {
    "category": "grammar",
    "front": "〜もかまわず",
    "back": "without caring about",
    "exampleJp": "彼は人目もかまわず、道端で大声で泣き出した。",
    "exampleTranslation": "Without caring about public eyes, he started crying loudly on the side of the road.",
    "tags": [
      "n3",
      "grammar",
      "disregard",
      "action"
    ],
    "sourceIds": [
      "n3-grammar-0134",
      "n3-grammar-149"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 939
  },
  {
    "category": "grammar",
    "front": "〜はともかく（として）",
    "back": "leaving aside; never mind",
    "exampleJp": "デザインはともかく、この靴はとても軽くて歩きやすい。",
    "exampleTranslation": "Leaving the design aside, these shoes are very light and easy to walk in.",
    "tags": [
      "n3",
      "grammar",
      "exception",
      "priority"
    ],
    "sourceIds": [
      "n3-grammar-0135",
      "n3-grammar-150"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 940
  },
  {
    "category": "grammar",
    "front": "〜は別として",
    "back": "aside from",
    "exampleJp": "冗談は別として、今後の計画について真剣に話し合いましょう。",
    "exampleTranslation": "Jokes aside, let's discuss the future plan seriously.",
    "tags": [
      "n3",
      "grammar",
      "exception",
      "topic"
    ],
    "sourceIds": [
      "n3-grammar-0136",
      "n3-grammar-151"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 941
  },
  {
    "category": "grammar",
    "front": "〜さえ",
    "back": "even; only",
    "exampleJp": "喉が痛くて、水さえ飲むことができない。",
    "exampleTranslation": "My throat hurts so much that I can't even drink water.",
    "tags": [
      "n3",
      "grammar",
      "extreme-example",
      "condition"
    ],
    "sourceIds": [
      "n3-grammar-0137",
      "n3-grammar-153"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 942
  },
  {
    "category": "grammar",
    "front": "〜として〜ない",
    "back": "not even one (with counters)",
    "exampleJp": "あの日は誰一人として、彼に話しかけようとしなかった。",
    "exampleTranslation": "On that day, not even a single person tried to speak to him.",
    "tags": [
      "n3",
      "grammar",
      "total-negation",
      "emphasis"
    ],
    "sourceIds": [
      "n3-grammar-0138",
      "n3-grammar-154"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 943
  },
  {
    "category": "grammar",
    "front": "〜から〜にかけて",
    "back": "from one point through another with a vague boundary",
    "exampleJp": "明日の朝から昼にかけて、関東地方では強い雨が降る見込みです。",
    "exampleTranslation": "From tomorrow morning through noon, strong rain is expected in the Kanto region.",
    "tags": [
      "n3",
      "grammar",
      "time",
      "space",
      "span"
    ],
    "sourceIds": [
      "n3-grammar-0139",
      "n3-grammar-155"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 944
  },
  {
    "category": "grammar",
    "front": "〜をはじめ",
    "back": "starting with",
    "exampleJp": "校長先生をはじめ、多くの先生方が私の卒業を祝ってくれた。",
    "exampleTranslation": "Starting with the principal, many teachers congratulated me on my graduation.",
    "tags": [
      "n3",
      "grammar",
      "example",
      "representative"
    ],
    "sourceIds": [
      "n3-grammar-0140",
      "n3-grammar-156"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 945
  },
  {
    "category": "grammar",
    "front": "〜からいうと",
    "back": "from the perspective of",
    "exampleJp": "栄養面からいうと、もっと野菜を食べた方がいいですよ。",
    "exampleTranslation": "From a nutritional perspective, it's better to eat more vegetables.",
    "tags": [
      "n3",
      "grammar",
      "perspective",
      "judgment"
    ],
    "sourceIds": [
      "n3-grammar-0141"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 946
  },
  {
    "category": "grammar",
    "front": "〜からすると",
    "back": "judging from",
    "exampleJp": "あの症状からすると、ただの風邪ではないかもしれない。",
    "exampleTranslation": "Judging from those symptoms, it might not be just a cold.",
    "tags": [
      "n3",
      "grammar",
      "judgment",
      "basis"
    ],
    "sourceIds": [
      "n3-grammar-0142"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 947
  },
  {
    "category": "grammar",
    "front": "〜から見ると",
    "back": "looking from",
    "exampleJp": "親から見ると、子供はいくつになっても心配なものだ。",
    "exampleTranslation": "Looking from a parent's perspective, children are always a source of worry no matter how old they get.",
    "tags": [
      "n3",
      "grammar",
      "perspective",
      "evaluation"
    ],
    "sourceIds": [
      "n3-grammar-0143"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 948
  },
  {
    "category": "grammar",
    "front": "〜上（は）",
    "back": "now that; since",
    "exampleJp": "契約を結んだ上は、責任を持って仕事を最後までやり遂げるべきだ。",
    "exampleTranslation": "Now that we have signed the contract, we should responsibly complete the work to the end.",
    "tags": [
      "n3",
      "grammar",
      "determination",
      "reason"
    ],
    "sourceIds": [
      "n3-grammar-0144"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 949
  },
  {
    "category": "sentence",
    "front": "残業続きで疲れが溜まっている。",
    "back": "I have accumulated fatigue from continuous overtime work.",
    "exampleJp": "最近は残業続きで疲れが溜まっているので、週末はゆっくり休みたいです。",
    "exampleTranslation": "Lately, I've accumulated fatigue from continuous overtime work, so I want to rest properly this weekend.",
    "tags": [
      "n3",
      "sentence",
      "work",
      "health"
    ],
    "sourceIds": [
      "n3-sentence-0001"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 950
  },
  {
    "category": "sentence",
    "front": "環境問題について話し合う。",
    "back": "To discuss environmental issues.",
    "exampleJp": "明日の会議では、地域の環境問題について話し合う予定だ。",
    "exampleTranslation": "In tomorrow's meeting, we plan to discuss local environmental issues.",
    "tags": [
      "n3",
      "sentence",
      "society",
      "discussion"
    ],
    "sourceIds": [
      "n3-sentence-0002"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 951
  },
  {
    "category": "sentence",
    "front": "インターネットで検索すれば分かる。",
    "back": "If you search on the internet, you can quickly find the meaning of an unfamiliar term.",
    "exampleJp": "分からない単語があっても、インターネットで検索すればすぐに意味が分かる。",
    "exampleTranslation": "If you search on the internet, you can quickly find the meaning of an unfamiliar term.",
    "tags": [
      "n3",
      "sentence",
      "technology",
      "daily-life"
    ],
    "sourceIds": [
      "n3-sentence-0003"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 952
  },
  {
    "category": "sentence",
    "front": "電車の中に傘を置き忘れる。",
    "back": "To leave an umbrella behind in the train.",
    "exampleJp": "慌てて電車を降りたので、網棚の上に傘を置き忘れてしまった。",
    "exampleTranslation": "Because I got off the train in a hurry, I ended up leaving my umbrella on the luggage rack.",
    "tags": [
      "n3",
      "sentence",
      "trouble",
      "transportation"
    ],
    "sourceIds": [
      "n3-sentence-0004"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 953
  },
  {
    "category": "sentence",
    "front": "健康のために野菜を多めに摂る。",
    "back": "To take in extra vegetables for health.",
    "exampleJp": "健康のために、毎日の食事で野菜を多めに摂るように心がけています。",
    "exampleTranslation": "For my health, I try to keep in mind taking extra vegetables in my daily meals.",
    "tags": [
      "n3",
      "sentence",
      "health",
      "diet"
    ],
    "sourceIds": [
      "n3-sentence-0005"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 954
  },
  {
    "category": "sentence",
    "front": "予定が変更になるかもしれない。",
    "back": "The schedule might change.",
    "exampleJp": "台風が接近しているため、明日のフライト予定が変更になるかもしれない。",
    "exampleTranslation": "Because a typhoon is approaching, tomorrow's flight schedule might change.",
    "tags": [
      "n3",
      "sentence",
      "schedule",
      "weather"
    ],
    "sourceIds": [
      "n3-sentence-0006"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 955
  },
  {
    "category": "sentence",
    "front": "人前で話すのは緊張する。",
    "back": "I get nervous speaking in front of people.",
    "exampleJp": "私は人前で話すのが苦手で、いつも心臓がドキドキして緊張してしまう。",
    "exampleTranslation": "I'm bad at speaking in front of people, and my heart always pounds and I get nervous.",
    "tags": [
      "n3",
      "sentence",
      "emotion",
      "public-speaking"
    ],
    "sourceIds": [
      "n3-sentence-0007"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 956
  },
  {
    "category": "sentence",
    "front": "道に迷ったら地図アプリを使う。",
    "back": "If you get lost, use a map app.",
    "exampleJp": "初めて行く場所で道に迷ったら、スマートフォンの地図アプリを使うと便利です。",
    "exampleTranslation": "If you get lost in a place you're going to for the first time, it's convenient to use a smartphone map app.",
    "tags": [
      "n3",
      "sentence",
      "navigation",
      "technology"
    ],
    "sourceIds": [
      "n3-sentence-0008"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 957
  },
  {
    "category": "sentence",
    "front": "ストレスを解消する方法を見つける。",
    "back": "To find a way to relieve stress.",
    "exampleJp": "仕事のストレスを解消するために、休日はスポーツをして汗を流すのが一番だ。",
    "exampleTranslation": "To relieve work stress, it's best to do sports and break a sweat on your days off.",
    "tags": [
      "n3",
      "sentence",
      "health",
      "stress"
    ],
    "sourceIds": [
      "n3-sentence-0009"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 958
  },
  {
    "category": "sentence",
    "front": "ごみの分別にご協力ください。",
    "back": "Please cooperate with the sorting of garbage.",
    "exampleJp": "地域のルールに従って、燃えるごみと燃えないごみの分別にご協力ください。",
    "exampleTranslation": "Please follow local rules and cooperate with sorting burnable and non-burnable garbage.",
    "tags": [
      "n3",
      "sentence",
      "rules",
      "society"
    ],
    "sourceIds": [
      "n3-sentence-0010"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 959
  },
  {
    "category": "sentence",
    "front": "相手の立場になって考える。",
    "back": "To put oneself in the other person's shoes.",
    "exampleJp": "円滑なコミュニケーションのためには、常に相手の立場になって考えることが重要だ。",
    "exampleTranslation": "For smooth communication, it is important to always think by putting oneself in the other person's shoes.",
    "tags": [
      "n3",
      "sentence",
      "communication",
      "empathy"
    ],
    "sourceIds": [
      "n3-sentence-0011"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 960
  },
  {
    "category": "sentence",
    "front": "新しいプロジェクトを立ち上げる。",
    "back": "To launch a new project.",
    "exampleJp": "来月から、若手社員を中心とした新しいプロジェクトを立ち上げることになった。",
    "exampleTranslation": "It has been decided that starting next month, we will launch a new project centered around young employees.",
    "tags": [
      "n3",
      "sentence",
      "work",
      "business"
    ],
    "sourceIds": [
      "n3-sentence-0012"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 961
  },
  {
    "category": "sentence",
    "front": "予想以上の結果が出て驚いた。",
    "back": "I was surprised that the results exceeded expectations.",
    "exampleJp": "今回のテストでは、予想以上の良い結果が出て自分でも驚いた。",
    "exampleTranslation": "I was surprised myself that the results of this test were better than expected.",
    "tags": [
      "n3",
      "sentence",
      "school",
      "emotion"
    ],
    "sourceIds": [
      "n3-sentence-0013"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 962
  },
  {
    "category": "sentence",
    "front": "趣味にお金と時間をかける。",
    "back": "To spend money and time on a hobby.",
    "exampleJp": "彼はカメラが趣味で、レンズや旅行の費用にかなりのお金と時間をかけている。",
    "exampleTranslation": "His hobby is photography, and he spends a considerable amount of money and time on lenses and travel expenses.",
    "tags": [
      "n3",
      "sentence",
      "hobby",
      "lifestyle"
    ],
    "sourceIds": [
      "n3-sentence-0014"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 963
  },
  {
    "category": "sentence",
    "front": "災害に備えて非常食を用意する。",
    "back": "To prepare emergency food in case of a disaster.",
    "exampleJp": "大きな地震などの災害に備えて、水や非常食を自宅に用意しておくべきだ。",
    "exampleTranslation": "You should prepare water and emergency food at home in case of a disaster like a large earthquake.",
    "tags": [
      "n3",
      "sentence",
      "disaster-prevention",
      "safety"
    ],
    "sourceIds": [
      "n3-sentence-0015"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 964
  },
  {
    "category": "sentence",
    "front": "将来の夢に向かって努力する。",
    "back": "To make an effort toward one's future dream.",
    "exampleJp": "プロのミュージシャンになるという将来の夢に向かって、毎日練習を重ねて努力している。",
    "exampleTranslation": "I am making an effort by practicing every day toward my future dream of becoming a professional musician.",
    "tags": [
      "n3",
      "sentence",
      "dream",
      "effort"
    ],
    "sourceIds": [
      "n3-sentence-0016"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 965
  },
  {
    "category": "sentence",
    "front": "意見が対立して結論が出ない。",
    "back": "Opinions clash and no conclusion is reached.",
    "exampleJp": "会議では両者の意見が真っ向から対立してしまい、結局結論が出なかった。",
    "exampleTranslation": "At the meeting, the opinions of both sides clashed head-on, and ultimately no conclusion was reached.",
    "tags": [
      "n3",
      "sentence",
      "work",
      "meeting"
    ],
    "sourceIds": [
      "n3-sentence-0017"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 966
  },
  {
    "category": "sentence",
    "front": "急に予定がキャンセルになった。",
    "back": "My plans were suddenly canceled.",
    "exampleJp": "友達が風邪を引いたため、楽しみにしていた週末の予定が急にキャンセルになった。",
    "exampleTranslation": "Because my friend caught a cold, the weekend plans I was looking forward to were suddenly canceled.",
    "tags": [
      "n3",
      "sentence",
      "schedule",
      "change"
    ],
    "sourceIds": [
      "n3-sentence-0018"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 967
  },
  {
    "category": "sentence",
    "front": "環境に優しい製品を選ぶ。",
    "back": "To choose eco-friendly products.",
    "exampleJp": "買い物をする時は、できるだけ環境に優しいリサイクル素材の製品を選ぶようにしている。",
    "exampleTranslation": "When shopping, I try to choose products made of eco-friendly recycled materials as much as possible.",
    "tags": [
      "n3",
      "sentence",
      "environment",
      "shopping"
    ],
    "sourceIds": [
      "n3-sentence-0019"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 968
  },
  {
    "category": "sentence",
    "front": "説明書をよく読んでから使う。",
    "back": "Read the manual carefully before using.",
    "exampleJp": "新しい家電を買ったら、適当にいじるのではなく説明書をよく読んでから使うべきだ。",
    "exampleTranslation": "When you buy a new home appliance, you should read the manual carefully before using it, rather than messing with it randomly.",
    "tags": [
      "n3",
      "sentence",
      "instruction",
      "daily-life"
    ],
    "sourceIds": [
      "n3-sentence-0020"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 969
  },
  {
    "category": "sentence",
    "front": "締め切りに間に合うように急ぐ。",
    "back": "To hurry so as to meet the deadline.",
    "exampleJp": "レポートの提出締め切りに間に合うように、昨夜からずっとパソコンに向かって急いでいる。",
    "exampleTranslation": "I have been rushing at my computer since last night to make it in time for the report submission deadline.",
    "tags": [
      "n3",
      "sentence",
      "school",
      "deadline"
    ],
    "sourceIds": [
      "n3-sentence-0021"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 970
  },
  {
    "category": "sentence",
    "front": "マナーを守って利用する。",
    "back": "To use while observing good manners.",
    "exampleJp": "図書館などの公共の施設では、周囲の人に迷惑をかけないようマナーを守って利用しよう。",
    "exampleTranslation": "At public facilities like libraries, let's observe good manners when using them so as not to bother people around us.",
    "tags": [
      "n3",
      "sentence",
      "public",
      "manners"
    ],
    "sourceIds": [
      "n3-sentence-0022"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 971
  },
  {
    "category": "sentence",
    "front": "原因を徹底的に調査する。",
    "back": "To thoroughly investigate the cause.",
    "exampleJp": "システム障害が起きた原因を徹底的に調査し、再発防止策をまとめた。",
    "exampleTranslation": "We thoroughly investigated the cause of the system failure and put together measures to prevent a recurrence.",
    "tags": [
      "n3",
      "sentence",
      "work",
      "investigation"
    ],
    "sourceIds": [
      "n3-sentence-0023"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 972
  },
  {
    "category": "sentence",
    "front": "条件に合うアパートを探す。",
    "back": "To look for an apartment that meets the conditions.",
    "exampleJp": "駅から近くて家賃が安いという、自分の条件に合うアパートをネットで探している。",
    "exampleTranslation": "I'm looking online for an apartment that meets my conditions of being close to the station and having cheap rent.",
    "tags": [
      "n3",
      "sentence",
      "housing",
      "moving"
    ],
    "sourceIds": [
      "n3-sentence-0024"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 973
  },
  {
    "category": "sentence",
    "front": "責任重大な仕事を任される。",
    "back": "To be entrusted with highly responsible work.",
    "exampleJp": "入社３年目にして、大きなプロジェクトのリーダーという責任重大な仕事を任された。",
    "exampleTranslation": "In my third year at the company, I was entrusted with the highly responsible work of being the leader of a large project.",
    "tags": [
      "n3",
      "sentence",
      "work",
      "responsibility"
    ],
    "sourceIds": [
      "n3-sentence-0025"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 974
  },
  {
    "category": "sentence",
    "front": "栄養のバランスを考えて料理する。",
    "back": "To cook considering nutritional balance.",
    "exampleJp": "子供の成長のために、肉と野菜の栄養のバランスを考えて毎日の食事を料理している。",
    "exampleTranslation": "For my children's growth, I cook daily meals considering the nutritional balance of meat and vegetables.",
    "tags": [
      "n3",
      "sentence",
      "diet",
      "cooking"
    ],
    "sourceIds": [
      "n3-sentence-0026"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 975
  },
  {
    "category": "sentence",
    "front": "交通渋滞に巻き込まれて遅刻した。",
    "back": "I was caught in a traffic jam and was late.",
    "exampleJp": "通勤中に高速道路で事故があり、交通渋滞に巻き込まれて会社に遅刻してしまった。",
    "exampleTranslation": "There was an accident on the highway during my commute, and I was caught in a traffic jam and ended up late for work.",
    "tags": [
      "n3",
      "sentence",
      "trouble",
      "commute"
    ],
    "sourceIds": [
      "n3-sentence-0027"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 976
  },
  {
    "category": "sentence",
    "front": "外国語を習得するのは時間がかかる。",
    "back": "It takes time to acquire a foreign language.",
    "exampleJp": "外国語をネイティブレベルに習得するのは、想像以上に時間がかかるものだ。",
    "exampleTranslation": "Acquiring a foreign language to a native level takes more time than imagined.",
    "tags": [
      "n3",
      "sentence",
      "learning",
      "language"
    ],
    "sourceIds": [
      "n3-sentence-0028"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 977
  },
  {
    "category": "sentence",
    "front": "予想外のトラブルが発生した。",
    "back": "An unexpected trouble occurred.",
    "exampleJp": "旅行の最終日にパスポートを紛失するという、予想外のトラブルが発生して慌てた。",
    "exampleTranslation": "I panicked when an unexpected trouble occurred: losing my passport on the last day of the trip.",
    "tags": [
      "n3",
      "sentence",
      "trouble",
      "travel"
    ],
    "sourceIds": [
      "n3-sentence-0029"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 978
  },
  {
    "category": "sentence",
    "front": "予算内でプレゼントを選ぶ。",
    "back": "To choose a present within the budget.",
    "exampleJp": "友達の誕生日祝いに、５千円という予算内で喜んでもらえそうなプレゼントを選ぶつもりだ。",
    "exampleTranslation": "For my friend's birthday celebration, I plan to choose a present they'd be happy with within a budget of 5,000 yen.",
    "tags": [
      "n3",
      "sentence",
      "shopping",
      "gift"
    ],
    "sourceIds": [
      "n3-sentence-0030"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 979
  },
  {
    "category": "sentence",
    "front": "規則正しい生活を送る。",
    "back": "To lead a regular lifestyle.",
    "exampleJp": "健康を維持するためには、十分な睡眠をとり、規則正しい生活を送ることが基本です。",
    "exampleTranslation": "To maintain health, getting enough sleep and leading a regular lifestyle are fundamental.",
    "tags": [
      "n3",
      "sentence",
      "health",
      "lifestyle"
    ],
    "sourceIds": [
      "n3-sentence-0031"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 980
  },
  {
    "category": "sentence",
    "front": "目標に向かって一歩ずつ進む。",
    "back": "To advance step by step toward a goal.",
    "exampleJp": "フルマラソン完走という大きな目標に向かって、今は一歩ずつ日々の練習を進めている。",
    "exampleTranslation": "I am currently advancing my daily practice step by step toward the big goal of completing a full marathon.",
    "tags": [
      "n3",
      "sentence",
      "goal",
      "progress"
    ],
    "sourceIds": [
      "n3-sentence-0032"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 981
  },
  {
    "category": "sentence",
    "front": "時代の変化に対応する。",
    "back": "To adapt to changes in the times.",
    "exampleJp": "企業が生き残るためには、消費者のニーズや時代の変化に柔軟に対応する必要がある。",
    "exampleTranslation": "In order to survive, companies need to flexibly adapt to consumer needs and changes in the times.",
    "tags": [
      "n3",
      "sentence",
      "business",
      "society"
    ],
    "sourceIds": [
      "n3-sentence-0033"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 982
  },
  {
    "category": "sentence",
    "front": "契約の内容を細かく確認する。",
    "back": "To confirm the details of the contract meticulously.",
    "exampleJp": "後でトラブルにならないように、署名する前に契約の内容を細かく確認しておいた。",
    "exampleTranslation": "To avoid trouble later, I confirmed the details of the contract meticulously before signing.",
    "tags": [
      "n3",
      "sentence",
      "work",
      "contract"
    ],
    "sourceIds": [
      "n3-sentence-0034"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 983
  },
  {
    "category": "sentence",
    "front": "自然の美しさに感動した。",
    "back": "I was moved by the beauty of nature.",
    "exampleJp": "山頂から見た朝日の輝きと自然の美しさに、言葉が出ないほど感動した。",
    "exampleTranslation": "I was so moved by the brilliance of the morning sun and the beauty of nature seen from the summit that I was speechless.",
    "tags": [
      "n3",
      "sentence",
      "emotion",
      "nature"
    ],
    "sourceIds": [
      "n3-sentence-0035"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 984
  },
  {
    "category": "sentence",
    "front": "遠慮せずに意見を言ってほしい。",
    "back": "I want you to state your opinion without holding back.",
    "exampleJp": "チームをより良くするためなので、遠慮せずに自分の意見を言ってほしい。",
    "exampleTranslation": "Because it's to make the team better, I want you to state your own opinion without holding back.",
    "tags": [
      "n3",
      "sentence",
      "communication",
      "work"
    ],
    "sourceIds": [
      "n3-sentence-0036"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 985
  },
  {
    "category": "sentence",
    "front": "急な雨でずぶ濡れになった。",
    "back": "I got soaked by sudden rain.",
    "exampleJp": "天気予報は晴れだったのに、夕方の急な雨で全身ずぶ濡れになってしまった。",
    "exampleTranslation": "Even though the weather forecast was sunny, I got completely soaked all over my body by a sudden rain in the evening.",
    "tags": [
      "n3",
      "sentence",
      "weather",
      "trouble"
    ],
    "sourceIds": [
      "n3-sentence-0037"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 986
  },
  {
    "category": "sentence",
    "front": "伝統的な文化を後世に伝える。",
    "back": "To pass down traditional culture to future generations.",
    "exampleJp": "地域の祭りは、私たちの重要な伝統的な文化を後世に伝えるための大切な行事です。",
    "exampleTranslation": "Local festivals are precious events for passing down our important traditional culture to future generations.",
    "tags": [
      "n3",
      "sentence",
      "culture",
      "tradition"
    ],
    "sourceIds": [
      "n3-sentence-0038"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 987
  },
  {
    "category": "sentence",
    "front": "深刻な人手不足に悩んでいる。",
    "back": "Struggling with a severe labor shortage.",
    "exampleJp": "飲食業界では、アルバイトが集まらず深刻な人手不足に悩んでいる店が多い。",
    "exampleTranslation": "In the restaurant industry, there are many stores struggling with a severe labor shortage because they cannot gather part-time workers.",
    "tags": [
      "n3",
      "sentence",
      "business",
      "society"
    ],
    "sourceIds": [
      "n3-sentence-0039"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 988
  },
  {
    "category": "sentence",
    "front": "最新のテクノロジーを活用する。",
    "back": "To utilize the latest technology.",
    "exampleJp": "この新しい工場では、生産効率を上げるために最新のAIテクノロジーを活用している。",
    "exampleTranslation": "In this new factory, they are utilizing the latest AI technology to increase production efficiency.",
    "tags": [
      "n3",
      "sentence",
      "technology",
      "industry"
    ],
    "sourceIds": [
      "n3-sentence-0040"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 989
  },
  {
    "category": "sentence",
    "front": "気分転換に散歩へ出かける。",
    "back": "To go for a walk for a change of pace.",
    "exampleJp": "一日中部屋にいて息が詰まったので、気分転換に近くの公園へ散歩に出かけた。",
    "exampleTranslation": "Because I felt suffocated staying in my room all day, I went out for a walk to a nearby park for a change of pace.",
    "tags": [
      "n3",
      "sentence",
      "leisure",
      "health"
    ],
    "sourceIds": [
      "n3-sentence-0041"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 990
  },
  {
    "category": "sentence",
    "front": "期待に応えられるよう頑張る。",
    "back": "I will do my best to meet expectations.",
    "exampleJp": "新しいリーダーに選ばれたからには、皆さんの期待に応えられるよう精一杯頑張ります。",
    "exampleTranslation": "Now that I have been chosen as the new leader, I will do my absolute best to meet everyone's expectations.",
    "tags": [
      "n3",
      "sentence",
      "work",
      "motivation"
    ],
    "sourceIds": [
      "n3-sentence-0042"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 991
  },
  {
    "category": "sentence",
    "front": "手続きが複雑で面倒だ。",
    "back": "The procedure is complicated and troublesome.",
    "exampleJp": "役所で引っ越しの手続きをしようとしたが、書類が多くて複雑で面倒だった。",
    "exampleTranslation": "I tried to do the moving procedures at the city hall, but there were many documents and it was complicated and troublesome.",
    "tags": [
      "n3",
      "sentence",
      "bureaucracy",
      "daily-life"
    ],
    "sourceIds": [
      "n3-sentence-0043"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 992
  },
  {
    "category": "sentence",
    "front": "共通の趣味を通じて仲良くなる。",
    "back": "To become good friends through a common hobby.",
    "exampleJp": "彼とは、好きなバンドのコンサートという共通の趣味を通じてすぐに仲良くなった。",
    "exampleTranslation": "I quickly became good friends with him through our common hobby of attending the concerts of our favorite band.",
    "tags": [
      "n3",
      "sentence",
      "relationships",
      "hobby"
    ],
    "sourceIds": [
      "n3-sentence-0044"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 993
  },
  {
    "category": "sentence",
    "front": "被害の状況を正確に把握する。",
    "back": "To accurately grasp the extent of the damage.",
    "exampleJp": "台風の通過後、市長は直ちに被害の状況を正確に把握するよう職員に指示した。",
    "exampleTranslation": "After the typhoon passed, the mayor immediately instructed the staff to accurately grasp the extent of the damage.",
    "tags": [
      "n3",
      "sentence",
      "disaster",
      "news"
    ],
    "sourceIds": [
      "n3-sentence-0045"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 994
  },
  {
    "category": "sentence",
    "front": "睡眠不足は仕事の能率を下げる。",
    "back": "Lack of sleep lowers work efficiency.",
    "exampleJp": "いくら頑張っても、睡眠不足のままでは集中力が切れ、仕事の能率を下げるだけだ。",
    "exampleTranslation": "No matter how hard you try, being sleep-deprived only breaks your concentration and lowers work efficiency.",
    "tags": [
      "n3",
      "sentence",
      "health",
      "work"
    ],
    "sourceIds": [
      "n3-sentence-0046"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 995
  },
  {
    "category": "sentence",
    "front": "条件を満たせば応募できる。",
    "back": "You can apply if you meet the conditions.",
    "exampleJp": "年齢や経験などの条件を満たせば、誰でもこのオーディションに応募できる。",
    "exampleTranslation": "Anyone can apply for this audition if they meet conditions such as age and experience.",
    "tags": [
      "n3",
      "sentence",
      "job-hunting",
      "rules"
    ],
    "sourceIds": [
      "n3-sentence-0047"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 996
  },
  {
    "category": "sentence",
    "front": "専門家の意見を参考にする。",
    "back": "To refer to an expert's opinion.",
    "exampleJp": "大きな決断をする前に、ネットの情報だけでなく専門家の意見を参考にするべきだ。",
    "exampleTranslation": "Before making a big decision, you should refer not only to online information but also to an expert's opinion.",
    "tags": [
      "n3",
      "sentence",
      "decision",
      "advice"
    ],
    "sourceIds": [
      "n3-sentence-0048"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 997
  },
  {
    "category": "sentence",
    "front": "相手に不快感を与えない服装。",
    "back": "Clothing that doesn't make others uncomfortable.",
    "exampleJp": "面接では、派手すぎず相手に不快感を与えない清潔な服装を選ぶことが大切です。",
    "exampleTranslation": "For an interview, it is important to choose clean clothing that is not too flashy and doesn't make the other person uncomfortable.",
    "tags": [
      "n3",
      "sentence",
      "manners",
      "job-hunting"
    ],
    "sourceIds": [
      "n3-sentence-0049"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 998
  },
  {
    "category": "sentence",
    "front": "自分の行動に責任を持つ。",
    "back": "To take responsibility for one's own actions.",
    "exampleJp": "大人になったら、誰のせいにもせず自分の行動に責任を持つのは当然のことだ。",
    "exampleTranslation": "Once you become an adult, it is a matter of course to take responsibility for your own actions without blaming anyone else.",
    "tags": [
      "n3",
      "sentence",
      "maturity",
      "society"
    ],
    "sourceIds": [
      "n3-sentence-0050"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 999
  },
  {
    "category": "sentence",
    "front": "言葉の壁を乗り越える。",
    "back": "To overcome the language barrier.",
    "exampleJp": "異文化交流において最も大切なのは、恐れずに言葉の壁を乗り越えて対話することだ。",
    "exampleTranslation": "The most important thing in cross-cultural exchange is to overcome the language barrier without fear and have a dialogue.",
    "tags": [
      "n3",
      "sentence",
      "communication",
      "culture"
    ],
    "sourceIds": [
      "n3-sentence-0051"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1000
  },
  {
    "category": "sentence",
    "front": "一時的な感情で判断しない。",
    "back": "Do not judge based on temporary emotions.",
    "exampleJp": "怒っている時は、一時的な感情で判断せずに、少し時間をおいて冷静になるべきだ。",
    "exampleTranslation": "When you are angry, you should take some time and calm down, without judging based on temporary emotions.",
    "tags": [
      "n3",
      "sentence",
      "emotion",
      "decision"
    ],
    "sourceIds": [
      "n3-sentence-0052"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1001
  },
  {
    "category": "sentence",
    "front": "日々の積み重ねが結果につながる。",
    "back": "Daily accumulation leads to results.",
    "exampleJp": "語学学習は魔法ではありません。日々の小さな積み重ねが、やがて大きな結果につながるのです。",
    "exampleTranslation": "Language learning is not magic. Small daily accumulations will eventually lead to big results.",
    "tags": [
      "n3",
      "sentence",
      "learning",
      "effort"
    ],
    "sourceIds": [
      "n3-sentence-0053"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1002
  },
  {
    "category": "sentence",
    "front": "個人情報を適切に管理する。",
    "back": "To manage personal information appropriately.",
    "exampleJp": "今の時代、企業はお客様の個人情報を適切に管理し、情報漏洩を防ぐ義務がある。",
    "exampleTranslation": "In this era, companies have a duty to appropriately manage customers' personal information and prevent information leaks.",
    "tags": [
      "n3",
      "sentence",
      "security",
      "business"
    ],
    "sourceIds": [
      "n3-sentence-0054"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1003
  },
  {
    "category": "sentence",
    "front": "無駄な出費を抑えて貯金する。",
    "back": "To cut back on wasteful spending and save money.",
    "exampleJp": "将来のマイホーム購入のために、夫婦で無駄な出費を抑えて毎月しっかり貯金している。",
    "exampleTranslation": "For purchasing our own home in the future, my spouse and I are cutting back on wasteful spending and saving money steadily every month.",
    "tags": [
      "n3",
      "sentence",
      "money",
      "lifestyle"
    ],
    "sourceIds": [
      "n3-sentence-0055"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1004
  },
  {
    "category": "sentence",
    "front": "経験豊富な先輩に相談する。",
    "back": "To consult with an experienced senior.",
    "exampleJp": "仕事で大きな壁にぶつかった時は、一人で抱え込まずに経験豊富な先輩に相談するのが一番だ。",
    "exampleTranslation": "When you hit a major wall at work, the best thing is to consult with an experienced senior rather than keeping it to yourself.",
    "tags": [
      "n3",
      "sentence",
      "work",
      "advice"
    ],
    "sourceIds": [
      "n3-sentence-0056"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1005
  },
  {
    "category": "sentence",
    "front": "客観的な視点から分析する。",
    "back": "To analyze from an objective viewpoint.",
    "exampleJp": "この問題は主観を交えず、データに基づいた客観的な視点から分析する必要がある。",
    "exampleTranslation": "This problem needs to be analyzed from an objective viewpoint based on data, without letting subjectivity get mixed in.",
    "tags": [
      "n3",
      "sentence",
      "analysis",
      "business"
    ],
    "sourceIds": [
      "n3-sentence-0057"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1006
  },
  {
    "category": "sentence",
    "front": "予想通りの展開になって安心した。",
    "back": "I was relieved that it developed exactly as expected.",
    "exampleJp": "トラブルを心配していたが、プロジェクトが予想通りの展開になって関係者一同安心した。",
    "exampleTranslation": "We were worried about trouble, but the project developed exactly as expected and all related parties were relieved.",
    "tags": [
      "n3",
      "sentence",
      "work",
      "emotion"
    ],
    "sourceIds": [
      "n3-sentence-0058"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1007
  },
  {
    "category": "sentence",
    "front": "周囲の環境に影響されやすい。",
    "back": "Easily influenced by the surrounding environment.",
    "exampleJp": "子供は良くも悪くも、家庭や学校といった周囲の環境に影響されやすい。",
    "exampleTranslation": "For better or worse, children are easily influenced by their surrounding environment such as home and school.",
    "tags": [
      "n3",
      "sentence",
      "psychology",
      "education"
    ],
    "sourceIds": [
      "n3-sentence-0059"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1008
  },
  {
    "category": "sentence",
    "front": "根本的な解決にはならない。",
    "back": "It won't be a fundamental solution.",
    "exampleJp": "その場しのぎの対応では、問題の根本的な解決にはならないので意味がない。",
    "exampleTranslation": "A stopgap measure won't be a fundamental solution to the problem, so it's meaningless.",
    "tags": [
      "n3",
      "sentence",
      "problem-solving",
      "society"
    ],
    "sourceIds": [
      "n3-sentence-0060"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1009
  },
  {
    "category": "sentence",
    "front": "常識にとらわれない発想。",
    "back": "Ideas that aren't bound by common sense.",
    "exampleJp": "新しい商品を開発するには、今までの常識にとらわれない自由な発想が求められる。",
    "exampleTranslation": "To develop new products, free ideas that are not bound by conventional common sense are required.",
    "tags": [
      "n3",
      "sentence",
      "creativity",
      "business"
    ],
    "sourceIds": [
      "n3-sentence-0061"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1010
  },
  {
    "category": "sentence",
    "front": "具体的な数字を挙げて説明する。",
    "back": "To explain by bringing up specific numbers.",
    "exampleJp": "企画を提案する時は、効果を具体的な数字を挙げて説明すると説得力が増す。",
    "exampleTranslation": "When proposing a plan, explaining the effects by bringing up specific numbers increases its persuasiveness.",
    "tags": [
      "n3",
      "sentence",
      "presentation",
      "business"
    ],
    "sourceIds": [
      "n3-sentence-0062"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1011
  },
  {
    "category": "sentence",
    "front": "多様な価値観を尊重する。",
    "back": "To respect diverse values.",
    "exampleJp": "国際社会では、自分とは異なる多様な価値観を互いに尊重することが不可欠だ。",
    "exampleTranslation": "In international society, it is essential to mutually respect diverse values that are different from your own.",
    "tags": [
      "n3",
      "sentence",
      "society",
      "culture"
    ],
    "sourceIds": [
      "n3-sentence-0063"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1012
  },
  {
    "category": "sentence",
    "front": "深刻なダメージを受ける。",
    "back": "To receive serious damage.",
    "exampleJp": "サイバー攻撃により、その企業のシステムは復旧が困難なほど深刻なダメージを受けた。",
    "exampleTranslation": "Due to a cyber attack, the company's system received serious damage to the point that recovery is difficult.",
    "tags": [
      "n3",
      "sentence",
      "technology",
      "news"
    ],
    "sourceIds": [
      "n3-sentence-0064"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1013
  },
  {
    "category": "sentence",
    "front": "長期的な視野で計画を立てる。",
    "back": "To make a plan from a long-term perspective.",
    "exampleJp": "目先の利益だけでなく、１０年後を見据えた長期的な視野で事業計画を立てるべきだ。",
    "exampleTranslation": "We should make a business plan from a long-term perspective looking 10 years ahead, not just immediate profits.",
    "tags": [
      "n3",
      "sentence",
      "business",
      "planning"
    ],
    "sourceIds": [
      "n3-sentence-0065"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1014
  },
  {
    "category": "sentence",
    "front": "不満を溜め込まずに話し合う。",
    "back": "To discuss without bottling up dissatisfaction.",
    "exampleJp": "夫婦円満の秘訣は、お互いに不満を溜め込まずに、その都度話し合うことです。",
    "exampleTranslation": "The secret to a harmonious marriage is for both not to bottle up dissatisfaction, but to discuss it each time.",
    "tags": [
      "n3",
      "sentence",
      "relationships",
      "communication"
    ],
    "sourceIds": [
      "n3-sentence-0066"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1015
  },
  {
    "category": "sentence",
    "front": "安全性を最優先に考慮する。",
    "back": "To consider safety as the top priority.",
    "exampleJp": "この車の開発において、メーカーはコストよりも乗客の安全性を最優先に考慮した。",
    "exampleTranslation": "In developing this car, the manufacturer considered the passengers' safety as the top priority over cost.",
    "tags": [
      "n3",
      "sentence",
      "safety",
      "industry"
    ],
    "sourceIds": [
      "n3-sentence-0067"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1016
  },
  {
    "category": "sentence",
    "front": "自分の限界に挑戦する。",
    "back": "To challenge one's own limits.",
    "exampleJp": "スポーツ選手にとって、毎日の厳しい訓練は自分の限界に挑戦する孤独な戦いだ。",
    "exampleTranslation": "For an athlete, tough daily training is a lonely battle challenging their own limits.",
    "tags": [
      "n3",
      "sentence",
      "sports",
      "effort"
    ],
    "sourceIds": [
      "n3-sentence-0068"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1017
  },
  {
    "category": "sentence",
    "front": "柔軟な対応が求められる。",
    "back": "Flexible responses are required.",
    "exampleJp": "変化の激しい現代では、予期せぬ事態に対しても柔軟な対応が求められる。",
    "exampleTranslation": "In today's rapidly changing era, flexible responses are required even for unexpected situations.",
    "tags": [
      "n3",
      "sentence",
      "society",
      "business"
    ],
    "sourceIds": [
      "n3-sentence-0069"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1018
  },
  {
    "category": "sentence",
    "front": "妥協点を見つけ出す。",
    "back": "To find a point of compromise.",
    "exampleJp": "交渉が難航したが、何度も話し合いを重ねた結果、両者が納得する妥協点を見つけ出した。",
    "exampleTranslation": "The negotiations ran into difficulties, but as a result of repeated discussions, they found a point of compromise that both sides could accept.",
    "tags": [
      "n3",
      "sentence",
      "negotiation",
      "work"
    ],
    "sourceIds": [
      "n3-sentence-0070"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1019
  },
  {
    "category": "sentence",
    "front": "規則を破ったら罰則がある。",
    "back": "There is a penalty if you break the rules.",
    "exampleJp": "会社の機密情報を持ち出すなどの規則を破ったら、重い罰則が科せられる。",
    "exampleTranslation": "If you break rules such as taking out the company's confidential information, heavy penalties will be imposed.",
    "tags": [
      "n3",
      "sentence",
      "rules",
      "work"
    ],
    "sourceIds": [
      "n3-sentence-0071"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1020
  },
  {
    "category": "sentence",
    "front": "周囲の期待がプレッシャーになる。",
    "back": "The expectations of those around become pressure.",
    "exampleJp": "次期社長の候補として選ばれたが、周囲の大きすぎる期待がプレッシャーになっている。",
    "exampleTranslation": "I was chosen as a candidate for the next president, but the overly large expectations of those around me are becoming pressure.",
    "tags": [
      "n3",
      "sentence",
      "psychology",
      "work"
    ],
    "sourceIds": [
      "n3-sentence-0072"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1021
  },
  {
    "category": "sentence",
    "front": "需要と供給のバランスが崩れる。",
    "back": "The balance between supply and demand breaks down.",
    "exampleJp": "天候不順で野菜が不作となり、需要と供給のバランスが崩れて価格が高騰した。",
    "exampleTranslation": "Vegetables had a poor harvest due to unseasonable weather, and the balance between supply and demand broke down, causing prices to soar.",
    "tags": [
      "n3",
      "sentence",
      "economy",
      "society"
    ],
    "sourceIds": [
      "n3-sentence-0073"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1022
  },
  {
    "category": "sentence",
    "front": "お互いの信頼関係を築く。",
    "back": "To build a relationship of mutual trust.",
    "exampleJp": "ビジネスの基本は、利益を追求する前に顧客とお互いの信頼関係を築くことだ。",
    "exampleTranslation": "The foundation of business is to build a relationship of mutual trust with customers before pursuing profit.",
    "tags": [
      "n3",
      "sentence",
      "business",
      "relationships"
    ],
    "sourceIds": [
      "n3-sentence-0074"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1023
  },
  {
    "category": "sentence",
    "front": "危機感を持って事にあたる。",
    "back": "To deal with the matter with a sense of crisis.",
    "exampleJp": "このままでは会社が倒産しかねない。社員全員が強い危機感を持って事にあたるべきだ。",
    "exampleTranslation": "At this rate, the company might go bankrupt. All employees should deal with the matter with a strong sense of crisis.",
    "tags": [
      "n3",
      "sentence",
      "work",
      "problem-solving"
    ],
    "sourceIds": [
      "n3-sentence-0075"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1024
  },
  {
    "category": "sentence",
    "front": "効率よく作業を進める。",
    "back": "To advance work efficiently.",
    "exampleJp": "限られた時間で多くの仕事を終わらせるために、ツールの使い方を工夫して効率よく作業を進める。",
    "exampleTranslation": "To finish a lot of work in a limited time, I devise ways to use tools and advance the work efficiently.",
    "tags": [
      "n3",
      "sentence",
      "work",
      "efficiency"
    ],
    "sourceIds": [
      "n3-sentence-0076"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1025
  },
  {
    "category": "sentence",
    "front": "感情をコントロールするのは難しい。",
    "back": "It's difficult to control one's emotions.",
    "exampleJp": "理不尽なことを言われた時、怒りの感情をコントロールするのは非常に難しいものだ。",
    "exampleTranslation": "When unreasonable things are said, it is an extremely difficult thing to control the emotion of anger.",
    "tags": [
      "n3",
      "sentence",
      "emotion",
      "psychology"
    ],
    "sourceIds": [
      "n3-sentence-0077"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1026
  },
  {
    "category": "sentence",
    "front": "社会のルールに従って生きる。",
    "back": "To live according to the rules of society.",
    "exampleJp": "私たちは一人で生きているわけではないので、社会のルールに従って生きる必要がある。",
    "exampleTranslation": "Since we are not living alone, we have a necessity to live according to the rules of society.",
    "tags": [
      "n3",
      "sentence",
      "society",
      "ethics"
    ],
    "sourceIds": [
      "n3-sentence-0078"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1027
  },
  {
    "category": "sentence",
    "front": "情報が飛び交う現代社会。",
    "back": "Modern society where information flies about.",
    "exampleJp": "フェイクニュースも含めて様々な情報が飛び交う現代社会では、何が真実かを見極める力が必要だ。",
    "exampleTranslation": "In modern society where various information including fake news flies about, the ability to discern what is true is necessary.",
    "tags": [
      "n3",
      "sentence",
      "society",
      "information"
    ],
    "sourceIds": [
      "n3-sentence-0079"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1028
  },
  {
    "category": "sentence",
    "front": "現状に満足せず上を目指す。",
    "back": "Not being satisfied with the current situation and aiming higher.",
    "exampleJp": "彼は優勝したにもかかわらず、現状に満足せずさらなる高みを目指して練習を再開した。",
    "exampleTranslation": "Despite winning the championship, he wasn't satisfied with his current situation and resumed practicing aiming for even greater heights.",
    "tags": [
      "n3",
      "sentence",
      "ambition",
      "sports"
    ],
    "sourceIds": [
      "n3-sentence-0080"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1029
  },
  {
    "category": "sentence",
    "front": "たとえ雨が降っても、明日の試合は行われます。",
    "back": "Even if it rains, tomorrow's match will be held.",
    "exampleJp": "たとえ雨が降っても、明日の試合は行われます。",
    "exampleTranslation": "Even if it rains, tomorrow's match will be held.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0081"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1030
  },
  {
    "category": "sentence",
    "front": "日本語の勉強を続ければ続けるほど、面白くなってきます。",
    "back": "The more I continue studying Japanese, the more interesting it becomes.",
    "exampleJp": "日本語の勉強を続ければ続けるほど、面白くなってきます。",
    "exampleTranslation": "The more I continue studying Japanese, the more interesting it becomes.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0082"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1031
  },
  {
    "category": "sentence",
    "front": "彼は疲れているのか、さっきから何も言わずに座っている。",
    "back": "Perhaps he is tired; he has been sitting without saying anything for a while.",
    "exampleJp": "彼は疲れているのか、さっきから何も言わずに座っている。",
    "exampleTranslation": "Perhaps he is tired; he has been sitting without saying anything for a while.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0083"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1032
  },
  {
    "category": "sentence",
    "front": "このアパートは駅から近いわりに、家賃が安くて便利だ。",
    "back": "Considering this apartment is close to the station, the rent is cheap and it's convenient.",
    "exampleJp": "このアパートは駅から近いわりに、家賃が安くて便利だ。",
    "exampleTranslation": "Considering this apartment is close to the station, the rent is cheap and it's convenient.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0084"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1033
  },
  {
    "category": "sentence",
    "front": "風邪をひかないように、毎朝うがいをしています。",
    "back": "I gargle every morning so that I won't catch a cold.",
    "exampleJp": "風邪をひかないように、毎朝うがいをしています。",
    "exampleTranslation": "I gargle every morning so that I won't catch a cold.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0085"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1034
  },
  {
    "category": "sentence",
    "front": "あの人は親切なだけでなく、仕事もできるので尊敬されている。",
    "back": "That person is respected not only because they are kind, but also because they do their job well.",
    "exampleJp": "あの人は親切なだけでなく、仕事もできるので尊敬されている。",
    "exampleTranslation": "That person is respected not only because they are kind, but also because they do their job well.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0086"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1035
  },
  {
    "category": "sentence",
    "front": "新しいスマートフォンは、以前のものに比べて画面が大きくて見やすい。",
    "back": "The new smartphone's screen is bigger and easier to see compared to the previous one.",
    "exampleJp": "新しいスマートフォンは、以前のものに比べて画面が大きくて見やすい。",
    "exampleTranslation": "The new smartphone's screen is bigger and easier to see compared to the previous one.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0087"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1036
  },
  {
    "category": "sentence",
    "front": "もう少しで電車に乗り遅れるところでした。",
    "back": "I was just about to miss the train.",
    "exampleJp": "もう少しで電車に乗り遅れるところでした。",
    "exampleTranslation": "I was just about to miss the train.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0088"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1037
  },
  {
    "category": "sentence",
    "front": "休日は掃除したり、洗濯したりして過ごすことが多い。",
    "back": "On my days off, I often spend time doing things like cleaning and laundry.",
    "exampleJp": "休日は掃除したり、洗濯したりして過ごすことが多い。",
    "exampleTranslation": "On my days off, I often spend time doing things like cleaning and laundry.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0089"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1038
  },
  {
    "category": "sentence",
    "front": "先生の説明が難しくて、私には全く理解できなかった。",
    "back": "The teacher's explanation was so difficult that I couldn't understand it at all.",
    "exampleJp": "先生の説明が難しくて、私には全く理解できなかった。",
    "exampleTranslation": "The teacher's explanation was so difficult that I couldn't understand it at all.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0090"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1039
  },
  {
    "category": "sentence",
    "front": "このレストランのカレーは辛すぎて、全部食べられません。",
    "back": "The curry at this restaurant is so spicy that I can't eat all of it.",
    "exampleJp": "このレストランのカレーは辛すぎて、全部食べられません。",
    "exampleTranslation": "The curry at this restaurant is so spicy that I can't eat all of it.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0091"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1040
  },
  {
    "category": "sentence",
    "front": "明日は早く起きなければならないので、もう寝ます。",
    "back": "I have to wake up early tomorrow, so I'm going to sleep now.",
    "exampleJp": "明日は早く起きなければならないので、もう寝ます。",
    "exampleTranslation": "I have to wake up early tomorrow, so I'm going to sleep now.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0092"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1041
  },
  {
    "category": "sentence",
    "front": "彼は約束の時間に間に合うように、急いで駅に向かった。",
    "back": "He hurried to the station so that he would be in time for the appointment.",
    "exampleJp": "彼は約束の時間に間に合うように、急いで駅に向かった。",
    "exampleTranslation": "He hurried to the station so that he would be in time for the appointment.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0093"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1042
  },
  {
    "category": "sentence",
    "front": "どんなに大変でも、最後まで諦めずに頑張りたいです。",
    "back": "No matter how tough it is, I want to do my best without giving up until the end.",
    "exampleJp": "どんなに大変でも、最後まで諦めずに頑張りたいです。",
    "exampleTranslation": "No matter how tough it is, I want to do my best without giving up until the end.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0094"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1043
  },
  {
    "category": "sentence",
    "front": "新しいパソコンを買うなら、あの店が一番安いらしいよ。",
    "back": "If you're buying a new computer, it seems that store is the cheapest.",
    "exampleJp": "新しいパソコンを買うなら、あの店が一番安いらしいよ。",
    "exampleTranslation": "If you're buying a new computer, it seems that store is the cheapest.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0095"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1044
  },
  {
    "category": "sentence",
    "front": "子供の頃、よくこの公園で友達と遊んだものだ。",
    "back": "When I was a child, I used to play a lot with my friends in this park.",
    "exampleJp": "子供の頃、よくこの公園で友達と遊んだものだ。",
    "exampleTranslation": "When I was a child, I used to play a lot with my friends in this park.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0096"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1045
  },
  {
    "category": "sentence",
    "front": "この映画は子供向けにしては、内容が少し難しすぎる。",
    "back": "For a movie aimed at children, the content is a bit too difficult.",
    "exampleJp": "この映画は子供向けにしては、内容が少し難しすぎる。",
    "exampleTranslation": "For a movie aimed at children, the content is a bit too difficult.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0097"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1046
  },
  {
    "category": "sentence",
    "front": "会議中なので、携帯電話の電源は切っておいてください。",
    "back": "Since we are in a meeting, please keep your mobile phone turned off.",
    "exampleJp": "会議中なので、携帯電話の電源は切っておいてください。",
    "exampleTranslation": "Since we are in a meeting, please keep your mobile phone turned off.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0098"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1047
  },
  {
    "category": "sentence",
    "front": "私は甘いものが好きなので、毎日ケーキを食べずにはいられない。",
    "back": "Because I love sweets, I can't help but eat cake every day.",
    "exampleJp": "私は甘いものが好きなので、毎日ケーキを食べずにはいられない。",
    "exampleTranslation": "Because I love sweets, I can't help but eat cake every day.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0099"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1048
  },
  {
    "category": "sentence",
    "front": "この薬を飲めば、すぐに熱が下がるはずです。",
    "back": "If you take this medicine, your fever should go down right away.",
    "exampleJp": "この薬を飲めば、すぐに熱が下がるはずです。",
    "exampleTranslation": "If you take this medicine, your fever should go down right away.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0100"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1049
  },
  {
    "category": "sentence",
    "front": "私の代わりに、会議に出席してもらえませんか。",
    "back": "Could you attend the meeting in my place?",
    "exampleJp": "私の代わりに、会議に出席してもらえませんか。",
    "exampleTranslation": "Could you attend the meeting in my place?",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0101"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1050
  },
  {
    "category": "sentence",
    "front": "山田さんは今日は休むと言っていたから、来ないだろう。",
    "back": "Yamada said he was taking the day off today, so he probably won't come.",
    "exampleJp": "山田さんは今日は休むと言っていたから、来ないだろう。",
    "exampleTranslation": "Yamada said he was taking the day off today, so he probably won't come.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0102"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1051
  },
  {
    "category": "sentence",
    "front": "窓を開けたとたん、冷たい風が部屋に入ってきた。",
    "back": "As soon as I opened the window, a cold wind came into the room.",
    "exampleJp": "窓を開けたとたん、冷たい風が部屋に入ってきた。",
    "exampleTranslation": "As soon as I opened the window, a cold wind came into the room.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0103"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1052
  },
  {
    "category": "sentence",
    "front": "あのホテルは景色が良い代わりに、値段が少し高い。",
    "back": "That hotel has a good view, but in exchange, the price is a little high.",
    "exampleJp": "あのホテルは景色が良い代わりに、値段が少し高い。",
    "exampleTranslation": "That hotel has a good view, but in exchange, the price is a little high.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0104"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1053
  },
  {
    "category": "sentence",
    "front": "これ以上無理をすると、病気になりかねないから休んだ方がいい。",
    "back": "If you push yourself any harder, you might get sick, so you should rest.",
    "exampleJp": "これ以上無理をすると、病気になりかねないから休んだ方がいい。",
    "exampleTranslation": "If you push yourself any harder, you might get sick, so you should rest.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0105"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1054
  },
  {
    "category": "sentence",
    "front": "彼はとても忙しいらしく、最近あまり連絡がこない。",
    "back": "He seems very busy and hasn't contacted me much recently.",
    "exampleJp": "彼はとても忙しいらしく、最近あまり連絡がこない。",
    "exampleTranslation": "He seems very busy and hasn't contacted me much recently.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0106"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1055
  },
  {
    "category": "sentence",
    "front": "新しいプロジェクトを成功させるために、みんなで協力しましょう。",
    "back": "Let's all cooperate in order to make the new project a success.",
    "exampleJp": "新しいプロジェクトを成功させるために、みんなで協力しましょう。",
    "exampleTranslation": "Let's all cooperate in order to make the new project a success.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0107"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1056
  },
  {
    "category": "sentence",
    "front": "この辞書は小さくて軽いから、持ち歩くのにとても便利だ。",
    "back": "This dictionary is small and light, so it is very convenient for carrying around.",
    "exampleJp": "この辞書は小さくて軽いから、持ち歩くのにとても便利だ。",
    "exampleTranslation": "This dictionary is small and light, so it is very convenient for carrying around.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0108"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1057
  },
  {
    "category": "sentence",
    "front": "明日の天気は晴れだということなので、ピクニックに行ける。",
    "back": "I heard tomorrow's weather will be sunny, so we can go for a picnic.",
    "exampleJp": "明日の天気は晴れだということなので、ピクニックに行ける。",
    "exampleTranslation": "I heard tomorrow's weather will be sunny, so we can go for a picnic.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0109"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1058
  },
  {
    "category": "sentence",
    "front": "一生懸命勉強したおかげで、希望の大学に合格することができた。",
    "back": "Thanks to studying hard, I was able to pass the university of my choice.",
    "exampleJp": "一生懸命勉強したおかげで、希望の大学に合格することができた。",
    "exampleTranslation": "Thanks to studying hard, I was able to pass the university of my choice.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0110"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1059
  },
  {
    "category": "sentence",
    "front": "今朝は寝坊してしまったせいで、朝ごはんを食べる時間がなかった。",
    "back": "Because I overslept this morning, I didn't have time to eat breakfast.",
    "exampleJp": "今朝は寝坊してしまったせいで、朝ごはんを食べる時間がなかった。",
    "exampleTranslation": "Because I overslept this morning, I didn't have time to eat breakfast.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0111"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1060
  },
  {
    "category": "sentence",
    "front": "彼は本当に日本人かと思うくらい、上手に英語を話す。",
    "back": "He speaks English so well that I wonder if he's really Japanese.",
    "exampleJp": "彼は本当に日本人かと思うくらい、上手に英語を話す。",
    "exampleTranslation": "He speaks English so well that I wonder if he's really Japanese.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0112"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1061
  },
  {
    "category": "sentence",
    "front": "この料理は誰が食べても美味しいと言うに違いない。",
    "back": "I'm sure anyone who eats this dish will say it's delicious.",
    "exampleJp": "この料理は誰が食べても美味しいと言うに違いない。",
    "exampleTranslation": "I'm sure anyone who eats this dish will say it's delicious.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0113"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1062
  },
  {
    "category": "sentence",
    "front": "急に雨が降り出したので、傘を買わざるを得なかった。",
    "back": "It suddenly started raining, so I had no choice but to buy an umbrella.",
    "exampleJp": "急に雨が降り出したので、傘を買わざるを得なかった。",
    "exampleTranslation": "It suddenly started raining, so I had no choice but to buy an umbrella.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0114"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1063
  },
  {
    "category": "sentence",
    "front": "彼は経験が浅いものの、仕事への情熱は誰にも負けない。",
    "back": "Although he has little experience, his passion for work is second to none.",
    "exampleJp": "彼は経験が浅いものの、仕事への情熱は誰にも負けない。",
    "exampleTranslation": "Although he has little experience, his passion for work is second to none.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0115"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1064
  },
  {
    "category": "sentence",
    "front": "あの人はお金持ちだからといって、必ずしも幸せだとは限らない。",
    "back": "Just because that person is rich doesn't necessarily mean they are happy.",
    "exampleJp": "あの人はお金持ちだからといって、必ずしも幸せだとは限らない。",
    "exampleTranslation": "Just because that person is rich doesn't necessarily mean they are happy.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0116"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1065
  },
  {
    "category": "sentence",
    "front": "いくら説明しても、彼女には私の気持ちが分かってもらえなかった。",
    "back": "No matter how much I explained, she didn't understand my feelings.",
    "exampleJp": "いくら説明しても、彼女には私の気持ちが分かってもらえなかった。",
    "exampleTranslation": "No matter how much I explained, she didn't understand my feelings.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0117"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1066
  },
  {
    "category": "sentence",
    "front": "駅前には大きなスーパーがあるから、買い物には困らない。",
    "back": "There is a large supermarket in front of the station, so I don't have trouble shopping.",
    "exampleJp": "駅前には大きなスーパーがあるから、買い物には困らない。",
    "exampleTranslation": "There is a large supermarket in front of the station, so I don't have trouble shopping.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0118"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1067
  },
  {
    "category": "sentence",
    "front": "来週のテストに向けて、毎日図書館で勉強しているところだ。",
    "back": "I am currently studying at the library every day for next week's test.",
    "exampleJp": "来週のテストに向けて、毎日図書館で勉強しているところだ。",
    "exampleTranslation": "I am currently studying at the library every day for next week's test.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0119"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1068
  },
  {
    "category": "sentence",
    "front": "彼はスポーツマンらしく、いつも元気で爽やかだ。",
    "back": "He is always energetic and refreshing, just like an athlete.",
    "exampleJp": "彼はスポーツマンらしく、いつも元気で爽やかだ。",
    "exampleTranslation": "He is always energetic and refreshing, just like an athlete.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0120"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1069
  },
  {
    "category": "sentence",
    "front": "この街は夜になると急に静かになって、少し寂しいくらいだ。",
    "back": "This town suddenly gets so quiet at night that it's almost a little lonely.",
    "exampleJp": "この街は夜になると急に静かになって、少し寂しいくらいだ。",
    "exampleTranslation": "This town suddenly gets so quiet at night that it's almost a little lonely.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0121"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1070
  },
  {
    "category": "sentence",
    "front": "このパソコンの使い方が分からないので、教えてもらえませんか。",
    "back": "I don't know how to use this computer, so could you teach me?",
    "exampleJp": "このパソコンの使い方が分からないので、教えてもらえませんか。",
    "exampleTranslation": "I don't know how to use this computer, so could you teach me?",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0122"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1071
  },
  {
    "category": "sentence",
    "front": "こんなに高い時計、私にはとても買えそうにない。",
    "back": "I don't think I could possibly buy such an expensive watch.",
    "exampleJp": "こんなに高い時計、私にはとても買えそうにない。",
    "exampleTranslation": "I don't think I could possibly buy such an expensive watch.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0123"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1072
  },
  {
    "category": "sentence",
    "front": "明日は大切な会議があるから、絶対に遅刻するわけにはいかない。",
    "back": "Since there is an important meeting tomorrow, I absolutely cannot afford to be late.",
    "exampleJp": "明日は大切な会議があるから、絶対に遅刻するわけにはいかない。",
    "exampleTranslation": "Since there is an important meeting tomorrow, I absolutely cannot afford to be late.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0124"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1073
  },
  {
    "category": "sentence",
    "front": "彼女の料理は、プロのシェフが作ったかのように美味しい。",
    "back": "Her cooking is so delicious it's as if a professional chef made it.",
    "exampleJp": "彼女の料理は、プロのシェフが作ったかのように美味しい。",
    "exampleTranslation": "Her cooking is so delicious it's as if a professional chef made it.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0125"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1074
  },
  {
    "category": "sentence",
    "front": "彼は何も知らないふりをしているが、本当はすべて知っているはずだ。",
    "back": "He is pretending to know nothing, but he must actually know everything.",
    "exampleJp": "彼は何も知らないふりをしているが、本当はすべて知っているはずだ。",
    "exampleTranslation": "He is pretending to know nothing, but he must actually know everything.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0126"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1075
  },
  {
    "category": "sentence",
    "front": "最近太ってきたから、毎朝ジョギングすることにしている。",
    "back": "Since I've been gaining weight recently, I make it a rule to jog every morning.",
    "exampleJp": "最近太ってきたから、毎朝ジョギングすることにしている。",
    "exampleTranslation": "Since I've been gaining weight recently, I make it a rule to jog every morning.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0127"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1076
  },
  {
    "category": "sentence",
    "front": "どんな困難があっても、自分の夢に向かって進み続けたい。",
    "back": "No matter what difficulties there are, I want to keep moving towards my dream.",
    "exampleJp": "どんな困難があっても、自分の夢に向かって進み続けたい。",
    "exampleTranslation": "No matter what difficulties there are, I want to keep moving towards my dream.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0128"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1077
  },
  {
    "category": "sentence",
    "front": "この本は漢字ばかりで、外国人には少し読みにくいかもしれない。",
    "back": "This book is full of kanji, so it might be a bit hard for foreigners to read.",
    "exampleJp": "この本は漢字ばかりで、外国人には少し読みにくいかもしれない。",
    "exampleTranslation": "This book is full of kanji, so it might be a bit hard for foreigners to read.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0129"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1078
  },
  {
    "category": "sentence",
    "front": "友達に勧められた映画を見たが、期待していたほど面白くなかった。",
    "back": "I watched the movie recommended by my friend, but it wasn't as interesting as I had expected.",
    "exampleJp": "友達に勧められた映画を見たが、期待していたほど面白くなかった。",
    "exampleTranslation": "I watched the movie recommended by my friend, but it wasn't as interesting as I had expected.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0130"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1079
  },
  {
    "category": "sentence",
    "front": "あの人は英語だけでなく、フランス語も少し話せるそうだ。",
    "back": "I hear that person can speak not only English but also a little French.",
    "exampleJp": "あの人は英語だけでなく、フランス語も少し話せるそうだ。",
    "exampleTranslation": "I hear that person can speak not only English but also a little French.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0131"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1080
  },
  {
    "category": "sentence",
    "front": "休みの日は、家で本を読んだり音楽を聴いたりして過ごすのが好きだ。",
    "back": "On days off, I like to spend my time at home doing things like reading books and listening to music.",
    "exampleJp": "休みの日は、家で本を読んだり音楽を聴いたりして過ごすのが好きだ。",
    "exampleTranslation": "On days off, I like to spend my time at home doing things like reading books and listening to music.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0132"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1081
  },
  {
    "category": "sentence",
    "front": "彼はいつも遅刻してくるから、今日も遅れるに違いない。",
    "back": "He is always late, so he must be late today too.",
    "exampleJp": "彼はいつも遅刻してくるから、今日も遅れるに違いない。",
    "exampleTranslation": "He is always late, so he must be late today too.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0133"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1082
  },
  {
    "category": "sentence",
    "front": "新しいスマートフォンが欲しいけれど、高すぎて買えそうもない。",
    "back": "I want a new smartphone, but it's so expensive I don't think I can buy it.",
    "exampleJp": "新しいスマートフォンが欲しいけれど、高すぎて買えそうもない。",
    "exampleTranslation": "I want a new smartphone, but it's so expensive I don't think I can buy it.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0134"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1083
  },
  {
    "category": "sentence",
    "front": "電車の中で寝過ごしてしまって、危うく終点まで行くところだった。",
    "back": "I overslept on the train and was about to go all the way to the last stop.",
    "exampleJp": "電車の中で寝過ごしてしまって、危うく終点まで行くところだった。",
    "exampleTranslation": "I overslept on the train and was about to go all the way to the last stop.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0135"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1084
  },
  {
    "category": "sentence",
    "front": "来週の月曜日は祝日なので、学校はお休みということだ。",
    "back": "Next Monday is a public holiday, so I heard there is no school.",
    "exampleJp": "来週の月曜日は祝日なので、学校はお休みということだ。",
    "exampleTranslation": "Next Monday is a public holiday, so I heard there is no school.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0136"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1085
  },
  {
    "category": "sentence",
    "front": "彼女の部屋はいつもきれいに片付いていて、モデルルームのようだ。",
    "back": "Her room is always neatly tidied up, like a model room.",
    "exampleJp": "彼女の部屋はいつもきれいに片付いていて、モデルルームのようだ。",
    "exampleTranslation": "Her room is always neatly tidied up, like a model room.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0137"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1086
  },
  {
    "category": "sentence",
    "front": "このカレーは私には辛すぎるので、もう少し甘いのがいいです。",
    "back": "This curry is too spicy for me, so I prefer something a little sweeter.",
    "exampleJp": "このカレーは私には辛すぎるので、もう少し甘いのがいいです。",
    "exampleTranslation": "This curry is too spicy for me, so I prefer something a little sweeter.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0138"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1087
  },
  {
    "category": "sentence",
    "front": "どんなに疲れていても、お風呂に入らずに寝るわけにはいかない。",
    "back": "No matter how tired I am, I can't possibly go to sleep without taking a bath.",
    "exampleJp": "どんなに疲れていても、お風呂に入らずに寝るわけにはいかない。",
    "exampleTranslation": "No matter how tired I am, I can't possibly go to sleep without taking a bath.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0139"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1088
  },
  {
    "category": "sentence",
    "front": "あのホテルは料金が高いわりに、サービスがあまり良くないらしい。",
    "back": "I heard that hotel doesn't have very good service, considering its high price.",
    "exampleJp": "あのホテルは料金が高いわりに、サービスがあまり良くないらしい。",
    "exampleTranslation": "I heard that hotel doesn't have very good service, considering its high price.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0140"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1089
  },
  {
    "category": "sentence",
    "front": "私が困っていると、いつも親切な友達が助けてくれる。",
    "back": "Whenever I'm in trouble, a kind friend always helps me.",
    "exampleJp": "私が困っていると、いつも親切な友達が助けてくれる。",
    "exampleTranslation": "Whenever I'm in trouble, a kind friend always helps me.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0141"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1090
  },
  {
    "category": "sentence",
    "front": "新しいレストランができたらしいから、今度一緒に行ってみよう。",
    "back": "I heard a new restaurant opened, so let's go check it out together next time.",
    "exampleJp": "新しいレストランができたらしいから、今度一緒に行ってみよう。",
    "exampleTranslation": "I heard a new restaurant opened, so let's go check it out together next time.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0142"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1091
  },
  {
    "category": "sentence",
    "front": "一生懸命練習したからには、絶対に優勝したいと思っている。",
    "back": "Since I practiced so hard, I absolutely want to win the championship.",
    "exampleJp": "一生懸命練習したからには、絶対に優勝したいと思っている。",
    "exampleTranslation": "Since I practiced so hard, I absolutely want to win the championship.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0143"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1092
  },
  {
    "category": "sentence",
    "front": "急に雨が降り出したせいで、せっかくのバーベキューが台無しになった。",
    "back": "Because it suddenly started raining, our precious barbecue was ruined.",
    "exampleJp": "急に雨が降り出したせいで、せっかくのバーベキューが台無しになった。",
    "exampleTranslation": "Because it suddenly started raining, our precious barbecue was ruined.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0144"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1093
  },
  {
    "category": "sentence",
    "front": "毎日少しずつでも勉強を続けることが大切だと言われている。",
    "back": "It is said that continuing to study even a little bit every day is important.",
    "exampleJp": "毎日少しずつでも勉強を続けることが大切だと言われている。",
    "exampleTranslation": "It is said that continuing to study even a little bit every day is important.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0145"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1094
  },
  {
    "category": "sentence",
    "front": "彼は風邪を引いているのにもかかわらず、無理して仕事に来た。",
    "back": "Even though he had a cold, he pushed himself and came to work.",
    "exampleJp": "彼は風邪を引いているのにもかかわらず、無理して仕事に来た。",
    "exampleTranslation": "Even though he had a cold, he pushed himself and came to work.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0146"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1095
  },
  {
    "category": "sentence",
    "front": "このカメラは初心者でも簡単に綺麗な写真が撮れるようになっている。",
    "back": "This camera is designed so that even beginners can easily take beautiful photos.",
    "exampleJp": "このカメラは初心者でも簡単に綺麗な写真が撮れるようになっている。",
    "exampleTranslation": "This camera is designed so that even beginners can easily take beautiful photos.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0147"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1096
  },
  {
    "category": "sentence",
    "front": "駅までの道が分からないので、誰かに教えてもらおうと思う。",
    "back": "I don't know the way to the station, so I think I'll ask someone to tell me.",
    "exampleJp": "駅までの道が分からないので、誰かに教えてもらおうと思う。",
    "exampleTranslation": "I don't know the way to the station, so I think I'll ask someone to tell me.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0148"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1097
  },
  {
    "category": "sentence",
    "front": "今日は疲れたから、夕ご飯は外食にしようかと思っているところだ。",
    "back": "I'm tired today, so I'm thinking about eating out for dinner.",
    "exampleJp": "今日は疲れたから、夕ご飯は外食にしようかと思っているところだ。",
    "exampleTranslation": "I'm tired today, so I'm thinking about eating out for dinner.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0149"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1098
  },
  {
    "category": "sentence",
    "front": "彼は嘘をついているに違いないと、私は最初から疑っていた。",
    "back": "I suspected from the beginning that he must be lying.",
    "exampleJp": "彼は嘘をついているに違いないと、私は最初から疑っていた。",
    "exampleTranslation": "I suspected from the beginning that he must be lying.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0150"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1099
  },
  {
    "category": "sentence",
    "front": "私の代わりに荷物を受け取ってくれる人がいなくて困っている。",
    "back": "I'm in trouble because there is no one to receive the package in my place.",
    "exampleJp": "私の代わりに荷物を受け取ってくれる人がいなくて困っている。",
    "exampleTranslation": "I'm in trouble because there is no one to receive the package in my place.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0151"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1100
  },
  {
    "category": "sentence",
    "front": "この小説は感動的で、涙なしには最後まで読めなかった。",
    "back": "This novel was so moving that I couldn't read it to the end without tears.",
    "exampleJp": "この小説は感動的で、涙なしには最後まで読めなかった。",
    "exampleTranslation": "This novel was so moving that I couldn't read it to the end without tears.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0152"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1101
  },
  {
    "category": "sentence",
    "front": "新しい服を買ったものの、着ていく場所がなくて少し残念だ。",
    "back": "Although I bought new clothes, it's a bit disappointing that I have nowhere to wear them.",
    "exampleJp": "新しい服を買ったものの、着ていく場所がなくて少し残念だ。",
    "exampleTranslation": "Although I bought new clothes, it's a bit disappointing that I have nowhere to wear them.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0153"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1102
  },
  {
    "category": "sentence",
    "front": "山田さんは日本人らしくない考え方をするので、話していて面白い。",
    "back": "Yamada-san has an un-Japanese way of thinking, so it's interesting to talk to him.",
    "exampleJp": "山田さんは日本人らしくない考え方をするので、話していて面白い。",
    "exampleTranslation": "Yamada-san has an un-Japanese way of thinking, so it's interesting to talk to him.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0154"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1103
  },
  {
    "category": "sentence",
    "front": "もっと早く出発すればよかったと、今さら後悔しても仕方がない。",
    "back": "It's no use regretting now that I should have left earlier.",
    "exampleJp": "もっと早く出発すればよかったと、今さら後悔しても仕方がない。",
    "exampleTranslation": "It's no use regretting now that I should have left earlier.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0155"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1104
  },
  {
    "category": "sentence",
    "front": "いくら説明書を読んでも、この機械の使い方がさっぱり分からない。",
    "back": "No matter how much I read the manual, I don't understand how to use this machine at all.",
    "exampleJp": "いくら説明書を読んでも、この機械の使い方がさっぱり分からない。",
    "exampleTranslation": "No matter how much I read the manual, I don't understand how to use this machine at all.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0156"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1105
  },
  {
    "category": "sentence",
    "front": "子供が道路に飛び出しそうになって、ひやっとしたよ。",
    "back": "The child was about to jump out into the road, and it gave me a chill.",
    "exampleJp": "子供が道路に飛び出しそうになって、ひやっとしたよ。",
    "exampleTranslation": "The child was about to jump out into the road, and it gave me a chill.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0157"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1106
  },
  {
    "category": "sentence",
    "front": "明日は早く起きるつもりだったのに、結局夜更かししてしまった。",
    "back": "Even though I intended to wake up early tomorrow, I ended up staying up late after all.",
    "exampleJp": "明日は早く起きるつもりだったのに、結局夜更かししてしまった。",
    "exampleTranslation": "Even though I intended to wake up early tomorrow, I ended up staying up late after all.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0158"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1107
  },
  {
    "category": "sentence",
    "front": "彼はスポーツが得意なばかりか、成績もいつもトップクラスだ。",
    "back": "Not only is he good at sports, but his grades are also always top class.",
    "exampleJp": "彼はスポーツが得意なばかりか、成績もいつもトップクラスだ。",
    "exampleTranslation": "Not only is he good at sports, but his grades are also always top class.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0159"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1108
  },
  {
    "category": "sentence",
    "front": "コーヒーを飲んだおかげで、ようやく目が覚めてきた気がする。",
    "back": "Thanks to drinking coffee, I feel like I've finally woken up.",
    "exampleJp": "コーヒーを飲んだおかげで、ようやく目が覚めてきた気がする。",
    "exampleTranslation": "Thanks to drinking coffee, I feel like I've finally woken up.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0160"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1109
  },
  {
    "category": "sentence",
    "front": "あの映画はつまらないらしいから、見に行かないほうがいいよ。",
    "back": "I heard that movie is boring, so you'd better not go see it.",
    "exampleJp": "あの映画はつまらないらしいから、見に行かないほうがいいよ。",
    "exampleTranslation": "I heard that movie is boring, so you'd better not go see it.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0161"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1110
  },
  {
    "category": "sentence",
    "front": "日本語のニュースが少しずつ聞き取れるようになってきて嬉しい。",
    "back": "I'm glad that I'm becoming able to understand Japanese news a little by little.",
    "exampleJp": "日本語のニュースが少しずつ聞き取れるようになってきて嬉しい。",
    "exampleTranslation": "I'm glad that I'm becoming able to understand Japanese news a little by little.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0162"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1111
  },
  {
    "category": "sentence",
    "front": "この問題は難しすぎて、先生でさえ解けないかもしれない。",
    "back": "This problem is so difficult that even the teacher might not be able to solve it.",
    "exampleJp": "この問題は難しすぎて、先生でさえ解けないかもしれない。",
    "exampleTranslation": "This problem is so difficult that even the teacher might not be able to solve it.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0163"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1112
  },
  {
    "category": "sentence",
    "front": "来月京都へ行くことになったので、美味しいお店を調べている。",
    "back": "It's been decided that I'm going to Kyoto next month, so I'm looking up delicious restaurants.",
    "exampleJp": "来月京都へ行くことになったので、美味しいお店を調べている。",
    "exampleTranslation": "It's been decided that I'm going to Kyoto next month, so I'm looking up delicious restaurants.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0164"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1113
  },
  {
    "category": "sentence",
    "front": "彼はとても疲れているようで、今にも倒れそうな顔をしている。",
    "back": "He looks very tired and has a face like he's going to collapse at any moment.",
    "exampleJp": "彼はとても疲れているようで、今にも倒れそうな顔をしている。",
    "exampleTranslation": "He looks very tired and has a face like he's going to collapse at any moment.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0165"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1114
  },
  {
    "category": "sentence",
    "front": "雨が降ろうが降るまいが、明日のピクニックは決行するつもりだ。",
    "back": "Whether it rains or not, we intend to go ahead with tomorrow's picnic.",
    "exampleJp": "雨が降ろうが降るまいが、明日のピクニックは決行するつもりだ。",
    "exampleTranslation": "Whether it rains or not, we intend to go ahead with tomorrow's picnic.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0166"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1115
  },
  {
    "category": "sentence",
    "front": "こんなにたくさんのお土産、一人では持ちきれないよ。",
    "back": "I can't possibly carry this many souvenirs by myself.",
    "exampleJp": "こんなにたくさんのお土産、一人では持ちきれないよ。",
    "exampleTranslation": "I can't possibly carry this many souvenirs by myself.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0167"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1116
  },
  {
    "category": "sentence",
    "front": "あの人は親切なふりをして、実は自分の利益しか考えていない。",
    "back": "That person pretends to be kind, but actually only thinks about their own profit.",
    "exampleJp": "あの人は親切なふりをして、実は自分の利益しか考えていない。",
    "exampleTranslation": "That person pretends to be kind, but actually only thinks about their own profit.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0168"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1117
  },
  {
    "category": "sentence",
    "front": "もっと勉強しておけばよかったと、試験の結果を見て後悔した。",
    "back": "I regretted that I should have studied more after seeing the test results.",
    "exampleJp": "もっと勉強しておけばよかったと、試験の結果を見て後悔した。",
    "exampleTranslation": "I regretted that I should have studied more after seeing the test results.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0169"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1118
  },
  {
    "category": "sentence",
    "front": "彼はまるで何もなかったかのように、いつも通り挨拶してきた。",
    "back": "He greeted me as usual, exactly as if nothing had happened.",
    "exampleJp": "彼はまるで何もなかったかのように、いつも通り挨拶してきた。",
    "exampleTranslation": "He greeted me as usual, exactly as if nothing had happened.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0170"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1119
  },
  {
    "category": "sentence",
    "front": "この店のラーメンは美味しいが、少し塩辛すぎるきらいがある。",
    "back": "This shop's ramen is delicious, but it has a tendency to be a bit too salty.",
    "exampleJp": "この店のラーメンは美味しいが、少し塩辛すぎるきらいがある。",
    "exampleTranslation": "This shop's ramen is delicious, but it has a tendency to be a bit too salty.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0171"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1120
  },
  {
    "category": "sentence",
    "front": "早く家に帰って、温かいお風呂に入りたくてたまらない。",
    "back": "I want to go home early and take a warm bath so badly.",
    "exampleJp": "早く家に帰って、温かいお風呂に入りたくてたまらない。",
    "exampleTranslation": "I want to go home early and take a warm bath so badly.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0172"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1121
  },
  {
    "category": "sentence",
    "front": "新しいゲームを始めたら面白くて、やめられなくなってしまった。",
    "back": "When I started a new game, it was so interesting that I couldn't stop.",
    "exampleJp": "新しいゲームを始めたら面白くて、やめられなくなってしまった。",
    "exampleTranslation": "When I started a new game, it was so interesting that I couldn't stop.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0173"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1122
  },
  {
    "category": "sentence",
    "front": "山田さんは休むと言っていたから、今日はもう来ないはずだ。",
    "back": "Yamada-san said he would take the day off, so he shouldn't be coming today.",
    "exampleJp": "山田さんは休むと言っていたから、今日はもう来ないはずだ。",
    "exampleTranslation": "Yamada-san said he would take the day off, so he shouldn't be coming today.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0174"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1123
  },
  {
    "category": "sentence",
    "front": "私がもっとしっかりしていれば、こんな失敗は防げたのに。",
    "back": "If I had been more reliable, I could have prevented such a failure.",
    "exampleJp": "私がもっとしっかりしていれば、こんな失敗は防げたのに。",
    "exampleTranslation": "If I had been more reliable, I could have prevented such a failure.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0175"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1124
  },
  {
    "category": "sentence",
    "front": "彼は毎日遅くまで残業しているせいで、最近体調を崩しがちだ。",
    "back": "Because he works overtime until late every day, he tends to get sick recently.",
    "exampleJp": "彼は毎日遅くまで残業しているせいで、最近体調を崩しがちだ。",
    "exampleTranslation": "Because he works overtime until late every day, he tends to get sick recently.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0176"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1125
  },
  {
    "category": "sentence",
    "front": "このパソコンは古いわりに、まだ十分早く動いてくれる。",
    "back": "Considering this computer is old, it still runs fast enough.",
    "exampleJp": "このパソコンは古いわりに、まだ十分早く動いてくれる。",
    "exampleTranslation": "Considering this computer is old, it still runs fast enough.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0177"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1126
  },
  {
    "category": "sentence",
    "front": "明日の会議には、遅れてもいいから必ず出席するようにしてください。",
    "back": "Please make sure to attend tomorrow's meeting, even if you are late.",
    "exampleJp": "明日の会議には、遅れてもいいから必ず出席するようにしてください。",
    "exampleTranslation": "Please make sure to attend tomorrow's meeting, even if you are late.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0178"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1127
  },
  {
    "category": "sentence",
    "front": "彼は誰にでも優しいから、みんなから好かれているのも当然だ。",
    "back": "Since he is kind to everyone, it's natural that he is liked by everyone.",
    "exampleJp": "彼は誰にでも優しいから、みんなから好かれているのも当然だ。",
    "exampleTranslation": "Since he is kind to everyone, it's natural that he is liked by everyone.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0179"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1128
  },
  {
    "category": "sentence",
    "front": "もう少しで完成するところだったのに、パソコンがフリーズしてしまった。",
    "back": "It was just about to be completed, but the computer froze.",
    "exampleJp": "もう少しで完成するところだったのに、パソコンがフリーズしてしまった。",
    "exampleTranslation": "It was just about to be completed, but the computer froze.",
    "tags": [
      "n3",
      "sentence",
      "reading-practice"
    ],
    "sourceIds": [
      "n3-sentence-0180"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1129
  },
  {
    "category": "sentence",
    "front": "新しい企画について、会議でもっと具体的に話し合う必要がある。",
    "back": "We need to discuss the new project more specifically in the meeting.",
    "exampleJp": "新しい企画について、会議でもっと具体的に話し合う必要がある。",
    "exampleTranslation": "We need to discuss the new project more specifically in the meeting.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0181"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1130
  },
  {
    "category": "sentence",
    "front": "彼からの返事が遅いので、本当に手紙が届いたのか心配になってきた。",
    "back": "His reply is slow, so I've become worried whether the letter really arrived.",
    "exampleJp": "彼からの返事が遅いので、本当に手紙が届いたのか心配になってきた。",
    "exampleTranslation": "His reply is slow, so I've become worried whether the letter really arrived.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0182"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1131
  },
  {
    "category": "sentence",
    "front": "せっかく映画館まで来たのに、チケットが売り切れていて見られなかった。",
    "back": "Even though I came all the way to the movie theater, I couldn't watch it because tickets were sold out.",
    "exampleJp": "せっかく映画館まで来たのに、チケットが売り切れていて見られなかった。",
    "exampleTranslation": "Even though I came all the way to the movie theater, I couldn't watch it because tickets were sold out.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0183"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1132
  },
  {
    "category": "sentence",
    "front": "スマートフォンの画面を見ながら歩くのは、非常に危険なのでやめましょう。",
    "back": "Walking while looking at a smartphone screen is extremely dangerous, so let's stop doing it.",
    "exampleJp": "スマートフォンの画面を見ながら歩くのは、非常に危険なのでやめましょう。",
    "exampleTranslation": "Walking while looking at a smartphone screen is extremely dangerous, so let's stop doing it.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0184"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1133
  },
  {
    "category": "sentence",
    "front": "いくら急いでいるからといって、赤信号を無視して道路を渡ってはいけない。",
    "back": "No matter how much you are in a hurry, you must not ignore the red light and cross the road.",
    "exampleJp": "いくら急いでいるからといって、赤信号を無視して道路を渡ってはいけない。",
    "exampleTranslation": "No matter how much you are in a hurry, you must not ignore the red light and cross the road.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0185"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1134
  },
  {
    "category": "sentence",
    "front": "最近は忙しすぎて、ゆっくり休む時間さえ取れない状態が続いている。",
    "back": "Recently I've been so busy that the situation of not even being able to take time to rest properly continues.",
    "exampleJp": "最近は忙しすぎて、ゆっくり休む時間さえ取れない状態が続いている。",
    "exampleTranslation": "Recently I've been so busy that the situation of not even being able to take time to rest properly continues.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0186"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1135
  },
  {
    "category": "sentence",
    "front": "もし彼が約束を破るようなことがあれば、もう二度と信用しないつもりだ。",
    "back": "If he were to break his promise, I would never trust him again.",
    "exampleJp": "もし彼が約束を破るようなことがあれば、もう二度と信用しないつもりだ。",
    "exampleTranslation": "If he were to break his promise, I would never trust him again.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0187"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1136
  },
  {
    "category": "sentence",
    "front": "この仕事は、専門的な知識を持った人でなければ担当するのは難しいだろう。",
    "back": "This job would probably be difficult to take charge of unless it's a person with specialized knowledge.",
    "exampleJp": "この仕事は、専門的な知識を持った人でなければ担当するのは難しいだろう。",
    "exampleTranslation": "This job would probably be difficult to take charge of unless it's a person with specialized knowledge.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0188"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1137
  },
  {
    "category": "sentence",
    "front": "昨日から降り続いた雪のおかげで、町全体が真っ白で美しい景色になった。",
    "back": "Thanks to the snow that continued falling since yesterday, the whole town became a pure white and beautiful scenery.",
    "exampleJp": "昨日から降り続いた雪のおかげで、町全体が真っ白で美しい景色になった。",
    "exampleTranslation": "Thanks to the snow that continued falling since yesterday, the whole town became a pure white and beautiful scenery.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0189"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1138
  },
  {
    "category": "sentence",
    "front": "少し熱があるが、大事な会議があるので会社を休むわけにはいかない。",
    "back": "I have a slight fever, but since there is an important meeting, I cannot possibly take the day off from work.",
    "exampleJp": "少し熱があるが、大事な会議があるので会社を休むわけにはいかない。",
    "exampleTranslation": "I have a slight fever, but since there is an important meeting, I cannot possibly take the day off from work.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0190"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1139
  },
  {
    "category": "sentence",
    "front": "彼女のピアノの腕前は、プロの音楽家が驚くほど素晴らしいものだった。",
    "back": "Her piano skills were something so wonderful that even professional musicians would be surprised.",
    "exampleJp": "彼女のピアノの腕前は、プロの音楽家が驚くほど素晴らしいものだった。",
    "exampleTranslation": "Her piano skills were something so wonderful that even professional musicians would be surprised.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0191"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1140
  },
  {
    "category": "sentence",
    "front": "この薬は食後に飲まないと胃を痛める恐れがあるので注意してください。",
    "back": "Please be careful because if you don't take this medicine after meals, there is a risk of hurting your stomach.",
    "exampleJp": "この薬は食後に飲まないと胃を痛める恐れがあるので注意してください。",
    "exampleTranslation": "Please be careful because if you don't take this medicine after meals, there is a risk of hurting your stomach.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0192"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1141
  },
  {
    "category": "sentence",
    "front": "彼は何も言わずに部屋を出て行ったが、きっと怒っているに違いない。",
    "back": "He left the room without saying anything, but he must surely be angry.",
    "exampleJp": "彼は何も言わずに部屋を出て行ったが、きっと怒っているに違いない。",
    "exampleTranslation": "He left the room without saying anything, but he must surely be angry.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0193"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1142
  },
  {
    "category": "sentence",
    "front": "インターネットを使えば、世界中のあらゆる情報を一瞬で手に入れることができる。",
    "back": "If you use the internet, you can obtain all sorts of information from all over the world in an instant.",
    "exampleJp": "インターネットを使えば、世界中のあらゆる情報を一瞬で手に入れることができる。",
    "exampleTranslation": "If you use the internet, you can obtain all sorts of information from all over the world in an instant.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0194"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1143
  },
  {
    "category": "sentence",
    "front": "たとえ親に反対されたとしても、私はこの仕事を続ける決心をしている。",
    "back": "Even if I am opposed by my parents, I am determined to continue this job.",
    "exampleJp": "たとえ親に反対されたとしても、私はこの仕事を続ける決心をしている。",
    "exampleTranslation": "Even if I am opposed by my parents, I am determined to continue this job.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0195"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1144
  },
  {
    "category": "sentence",
    "front": "新しいパソコンの設定が複雑すぎて、説明書を読んでもさっぱり分からない。",
    "back": "The settings of the new computer are so complicated that even if I read the manual, I don't understand it at all.",
    "exampleJp": "新しいパソコンの設定が複雑すぎて、説明書を読んでもさっぱり分からない。",
    "exampleTranslation": "The settings of the new computer are so complicated that even if I read the manual, I don't understand it at all.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0196"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1145
  },
  {
    "category": "sentence",
    "front": "彼はただ頭が良いだけでなく、困っている人を助ける優しさも持っている。",
    "back": "Not only is he just smart, but he also has the kindness to help people in trouble.",
    "exampleJp": "彼はただ頭が良いだけでなく、困っている人を助ける優しさも持っている。",
    "exampleTranslation": "Not only is he just smart, but he also has the kindness to help people in trouble.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0197"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1146
  },
  {
    "category": "sentence",
    "front": "子供の頃に夢見ていたことが、ついに現実のものとなって本当に嬉しい。",
    "back": "What I dreamed of when I was a child has finally become a reality, and I am truly happy.",
    "exampleJp": "子供の頃に夢見ていたことが、ついに現実のものとなって本当に嬉しい。",
    "exampleTranslation": "What I dreamed of when I was a child has finally become a reality, and I am truly happy.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0198"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1147
  },
  {
    "category": "sentence",
    "front": "この料理は見た目が悪いわりに、食べてみると驚くほど美味しい味がする。",
    "back": "Considering this dish looks bad, when you try eating it, it has a surprisingly delicious taste.",
    "exampleJp": "この料理は見た目が悪いわりに、食べてみると驚くほど美味しい味がする。",
    "exampleTranslation": "Considering this dish looks bad, when you try eating it, it has a surprisingly delicious taste.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0199"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1148
  },
  {
    "category": "sentence",
    "front": "いくら健康に良いからといって、同じものばかり食べるのは良くない。",
    "back": "No matter how good it is for your health, eating only the same thing all the time is not good.",
    "exampleJp": "いくら健康に良いからといって、同じものばかり食べるのは良くない。",
    "exampleTranslation": "No matter how good it is for your health, eating only the same thing all the time is not good.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0200"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1149
  },
  {
    "category": "sentence",
    "front": "明日テストがあるにもかかわらず、彼は全く勉強せずにゲームばかりしている。",
    "back": "Despite having a test tomorrow, he isn't studying at all and is just playing games.",
    "exampleJp": "明日テストがあるにもかかわらず、彼は全く勉強せずにゲームばかりしている。",
    "exampleTranslation": "Despite having a test tomorrow, he isn't studying at all and is just playing games.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0201"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1150
  },
  {
    "category": "sentence",
    "front": "道に迷ってしまったら、近くの人に駅への行き方を尋ねた方が早い。",
    "back": "If you get lost, it's faster to ask someone nearby for directions to the station.",
    "exampleJp": "道に迷ってしまったら、近くの人に駅への行き方を尋ねた方が早い。",
    "exampleTranslation": "If you get lost, it's faster to ask someone nearby for directions to the station.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0202"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1151
  },
  {
    "category": "sentence",
    "front": "彼女の努力が実を結び、ついに念願のレストランをオープンすることができた。",
    "back": "Her efforts bore fruit, and she was finally able to open the restaurant of her heart's desire.",
    "exampleJp": "彼女の努力が実を結び、ついに念願のレストランをオープンすることができた。",
    "exampleTranslation": "Her efforts bore fruit, and she was finally able to open the restaurant of her heart's desire.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0203"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1152
  },
  {
    "category": "sentence",
    "front": "あの有名な歌手のコンサートチケットは、発売と同時に売り切れてしまったらしい。",
    "back": "It seems the concert tickets for that famous singer sold out at the same time they went on sale.",
    "exampleJp": "あの有名な歌手のコンサートチケットは、発売と同時に売り切れてしまったらしい。",
    "exampleTranslation": "It seems the concert tickets for that famous singer sold out at the same time they went on sale.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0204"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1153
  },
  {
    "category": "sentence",
    "front": "最近少し太ってきたので、エレベーターを使わずに階段を上るようにしている。",
    "back": "Since I've gained a little weight recently, I'm making a point to climb the stairs without using the elevator.",
    "exampleJp": "最近少し太ってきたので、エレベーターを使わずに階段を上るようにしている。",
    "exampleTranslation": "Since I've gained a little weight recently, I'm making a point to climb the stairs without using the elevator.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0205"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1154
  },
  {
    "category": "sentence",
    "front": "彼は風邪を引いているふりをしているが、本当は仕事に行きたくないだけだ。",
    "back": "He is pretending to have a cold, but the truth is he just doesn't want to go to work.",
    "exampleJp": "彼は風邪を引いているふりをしているが、本当は仕事に行きたくないだけだ。",
    "exampleTranslation": "He is pretending to have a cold, but the truth is he just doesn't want to go to work.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0206"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1155
  },
  {
    "category": "sentence",
    "front": "このまま環境破壊が進めば、美しい自然が完全に失われかねない。",
    "back": "If environmental destruction continues like this, beautiful nature might be completely lost.",
    "exampleJp": "このまま環境破壊が進めば、美しい自然が完全に失われかねない。",
    "exampleTranslation": "If environmental destruction continues like this, beautiful nature might be completely lost.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0207"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1156
  },
  {
    "category": "sentence",
    "front": "友達とケンカをしてしまったが、どうやって謝ればいいのか分からない。",
    "back": "I ended up having a fight with my friend, but I don't know how I should apologize.",
    "exampleJp": "友達とケンカをしてしまったが、どうやって謝ればいいのか分からない。",
    "exampleTranslation": "I ended up having a fight with my friend, but I don't know how I should apologize.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0208"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1157
  },
  {
    "category": "sentence",
    "front": "彼の説明は分かりやすくて、まるで専門家が話しているかのようだった。",
    "back": "His explanation was easy to understand, exactly as if an expert were talking.",
    "exampleJp": "彼の説明は分かりやすくて、まるで専門家が話しているかのようだった。",
    "exampleTranslation": "His explanation was easy to understand, exactly as if an expert were talking.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0209"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1158
  },
  {
    "category": "sentence",
    "front": "明日から旅行に行くのだから、今夜のうちに荷物の準備をしておこう。",
    "back": "Since I'm going on a trip starting tomorrow, I'll get my luggage prepared during tonight.",
    "exampleJp": "明日から旅行に行くのだから、今夜のうちに荷物の準備をしておこう。",
    "exampleTranslation": "Since I'm going on a trip starting tomorrow, I'll get my luggage prepared during tonight.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0210"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1159
  },
  {
    "category": "sentence",
    "front": "この町の治安はとても良くて、夜遅くに女性が一人で歩いても安全だ。",
    "back": "The public safety in this town is very good, and it is safe even for a woman to walk alone late at night.",
    "exampleJp": "この町の治安はとても良くて、夜遅くに女性が一人で歩いても安全だ。",
    "exampleTranslation": "The public safety in this town is very good, and it is safe even for a woman to walk alone late at night.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0211"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1160
  },
  {
    "category": "sentence",
    "front": "彼が遅刻してきたせいで、せっかく予定していた映画が見られなくなった。",
    "back": "Because he came late, we couldn't watch the movie we had taken the trouble to plan for.",
    "exampleJp": "彼が遅刻してきたせいで、せっかく予定していた映画が見られなくなった。",
    "exampleTranslation": "Because he came late, we couldn't watch the movie we had taken the trouble to plan for.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0212"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1161
  },
  {
    "category": "sentence",
    "front": "この古い建物は、あと数ヶ月で取り壊されることになっているそうだ。",
    "back": "I hear this old building is scheduled to be torn down in a few more months.",
    "exampleJp": "この古い建物は、あと数ヶ月で取り壊されることになっているそうだ。",
    "exampleTranslation": "I hear this old building is scheduled to be torn down in a few more months.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0213"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1162
  },
  {
    "category": "sentence",
    "front": "彼女の意見はいつも鋭く、会議のたびに新しい視点を与えてくれる。",
    "back": "Her opinions are always sharp and give us a new perspective every time there is a meeting.",
    "exampleJp": "彼女の意見はいつも鋭く、会議のたびに新しい視点を与えてくれる。",
    "exampleTranslation": "Her opinions are always sharp and give us a new perspective every time there is a meeting.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0214"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1163
  },
  {
    "category": "sentence",
    "front": "急用ができたので、申し訳ありませんが今日の約束はキャンセルさせてください。",
    "back": "An urgent matter came up, so I am very sorry, but please let me cancel today's appointment.",
    "exampleJp": "急用ができたので、申し訳ありませんが今日の約束はキャンセルさせてください。",
    "exampleTranslation": "An urgent matter came up, so I am very sorry, but please let me cancel today's appointment.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0215"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1164
  },
  {
    "category": "sentence",
    "front": "あのレストランは値段が高い割には、料理の味もサービスも大したことがない。",
    "back": "Considering that restaurant's high prices, neither the taste of the food nor the service is anything special.",
    "exampleJp": "あのレストランは値段が高い割には、料理の味もサービスも大したことがない。",
    "exampleTranslation": "Considering that restaurant's high prices, neither the taste of the food nor the service is anything special.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0216"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1165
  },
  {
    "category": "sentence",
    "front": "一生懸命探したものの、なくした指輪は結局どこからも見つからなかった。",
    "back": "Although I searched as hard as I could, the lost ring was eventually found nowhere.",
    "exampleJp": "一生懸命探したものの、なくした指輪は結局どこからも見つからなかった。",
    "exampleTranslation": "Although I searched as hard as I could, the lost ring was eventually found nowhere.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0217"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1166
  },
  {
    "category": "sentence",
    "front": "日本の夏は蒸し暑いので、エアコンなしで過ごすのはかなり厳しい。",
    "back": "Summers in Japan are humid and hot, so spending them without an air conditioner is quite tough.",
    "exampleJp": "日本の夏は蒸し暑いので、エアコンなしで過ごすのはかなり厳しい。",
    "exampleTranslation": "Summers in Japan are humid and hot, so spending them without an air conditioner is quite tough.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0218"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1167
  },
  {
    "category": "sentence",
    "front": "この小説は最後がとても感動的で、涙を流さずにはいられなかった。",
    "back": "The end of this novel was so moving that I couldn't help but shed tears.",
    "exampleJp": "この小説は最後がとても感動的で、涙を流さずにはいられなかった。",
    "exampleTranslation": "The end of this novel was so moving that I couldn't help but shed tears.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0219"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1168
  },
  {
    "category": "sentence",
    "front": "彼に何回も電話をかけたが、一向に電話に出る気配がない。",
    "back": "I called him many times, but there is no sign at all that he is going to answer the phone.",
    "exampleJp": "彼に何回も電話をかけたが、一向に電話に出る気配がない。",
    "exampleTranslation": "I called him many times, but there is no sign at all that he is going to answer the phone.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0220"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1169
  },
  {
    "category": "sentence",
    "front": "週末は家でごろごろしているよりも、外に出てスポーツをする方が好きだ。",
    "back": "Rather than lounging around at home on the weekend, I prefer going outside and playing sports.",
    "exampleJp": "週末は家でごろごろしているよりも、外に出てスポーツをする方が好きだ。",
    "exampleTranslation": "Rather than lounging around at home on the weekend, I prefer going outside and playing sports.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0221"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1170
  },
  {
    "category": "sentence",
    "front": "あのチームは練習量が足りないから、明日の試合には勝てないだろう。",
    "back": "That team lacks the amount of practice, so they probably won't be able to win tomorrow's match.",
    "exampleJp": "あのチームは練習量が足りないから、明日の試合には勝てないだろう。",
    "exampleTranslation": "That team lacks the amount of practice, so they probably won't be able to win tomorrow's match.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0222"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1171
  },
  {
    "category": "sentence",
    "front": "新しい家を建てる場所を探しているが、なかなか条件に合う土地が見つからない。",
    "back": "I am looking for a place to build a new house, but I can't quite find land that meets my conditions.",
    "exampleJp": "新しい家を建てる場所を探しているが、なかなか条件に合う土地が見つからない。",
    "exampleTranslation": "I am looking for a place to build a new house, but I can't quite find land that meets my conditions.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0223"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1172
  },
  {
    "category": "sentence",
    "front": "彼の仕事のスピードは誰よりも速く、周りの人たちも驚くくらいだ。",
    "back": "His working speed is faster than anyone else, to the extent that the people around him are also surprised.",
    "exampleJp": "彼の仕事のスピードは誰よりも速く、周りの人たちも驚くくらいだ。",
    "exampleTranslation": "His working speed is faster than anyone else, to the extent that the people around him are also surprised.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0224"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1173
  },
  {
    "category": "sentence",
    "front": "明日は早く起きなければならないから、今夜はもうテレビを消して寝よう。",
    "back": "Since I have to wake up early tomorrow, I'll turn off the TV now and go to sleep tonight.",
    "exampleJp": "明日は早く起きなければならないから、今夜はもうテレビを消して寝よう。",
    "exampleTranslation": "Since I have to wake up early tomorrow, I'll turn off the TV now and go to sleep tonight.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0225"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1174
  },
  {
    "category": "sentence",
    "front": "あの映画の結末は、私が予想していたものとは全く違って驚いた。",
    "back": "The ending of that movie was completely different from what I had expected, and I was surprised.",
    "exampleJp": "あの映画の結末は、私が予想していたものとは全く違って驚いた。",
    "exampleTranslation": "The ending of that movie was completely different from what I had expected, and I was surprised.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0226"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1175
  },
  {
    "category": "sentence",
    "front": "こんなに難しい問題、私に解けるわけがないので先生に聞いてみます。",
    "back": "There is no way I can solve such a difficult problem, so I'll try asking the teacher.",
    "exampleJp": "こんなに難しい問題、私に解けるわけがないので先生に聞いてみます。",
    "exampleTranslation": "There is no way I can solve such a difficult problem, so I'll try asking the teacher.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0227"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1176
  },
  {
    "category": "sentence",
    "front": "彼女はとても優しくて、困っている人がいたら必ず声をかけて助けてあげる。",
    "back": "She is very kind, and if there is someone in trouble, she will without fail call out and help them.",
    "exampleJp": "彼女はとても優しくて、困っている人がいたら必ず声をかけて助けてあげる。",
    "exampleTranslation": "She is very kind, and if there is someone in trouble, she will without fail call out and help them.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0228"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1177
  },
  {
    "category": "sentence",
    "front": "彼があの大学に合格できたのは、毎日寝る間も惜しんで勉強したおかげだ。",
    "back": "The reason he was able to pass that university's entrance exam is thanks to studying every day, sparing even the time to sleep.",
    "exampleJp": "彼があの大学に合格できたのは、毎日寝る間も惜しんで勉強したおかげだ。",
    "exampleTranslation": "The reason he was able to pass that university's entrance exam is thanks to studying every day, sparing even the time to sleep.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0229"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1178
  },
  {
    "category": "sentence",
    "front": "急に強い風が吹いてきたので、傘をさすのを諦めて走って帰った。",
    "back": "Because a strong wind suddenly started blowing, I gave up holding my umbrella and ran home.",
    "exampleJp": "急に強い風が吹いてきたので、傘をさすのを諦めて走って帰った。",
    "exampleTranslation": "Because a strong wind suddenly started blowing, I gave up holding my umbrella and ran home.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0230"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1179
  },
  {
    "category": "sentence",
    "front": "私が一生懸命作ったケーキを、美味しいと言って全部食べてくれて嬉しかった。",
    "back": "I was happy that you said the cake I made with all my might was delicious and ate all of it.",
    "exampleJp": "私が一生懸命作ったケーキを、美味しいと言って全部食べてくれて嬉しかった。",
    "exampleTranslation": "I was happy that you said the cake I made with all my might was delicious and ate all of it.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0231"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1180
  },
  {
    "category": "sentence",
    "front": "この電車は特急なので、途中の小さな駅には停車しないことになっている。",
    "back": "Since this train is a limited express, it is scheduled not to stop at small stations along the way.",
    "exampleJp": "この電車は特急なので、途中の小さな駅には停車しないことになっている。",
    "exampleTranslation": "Since this train is a limited express, it is scheduled not to stop at small stations along the way.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0232"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1181
  },
  {
    "category": "sentence",
    "front": "少し休んだら体調が良くなってきたので、もう少し仕事を続けようと思う。",
    "back": "Since my physical condition got better after resting a little, I think I'll continue working a little more.",
    "exampleJp": "少し休んだら体調が良くなってきたので、もう少し仕事を続けようと思う。",
    "exampleTranslation": "Since my physical condition got better after resting a little, I think I'll continue working a little more.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0233"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1182
  },
  {
    "category": "sentence",
    "front": "外国語を上達させるためには、毎日少しずつでも声に出して読むことが大切だ。",
    "back": "In order to improve at a foreign language, it is important to read out loud even a little bit every day.",
    "exampleJp": "外国語を上達させるためには、毎日少しずつでも声に出して読むことが大切だ。",
    "exampleTranslation": "In order to improve at a foreign language, it is important to read out loud even a little bit every day.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0234"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1183
  },
  {
    "category": "sentence",
    "front": "彼は自分の失敗を他人のせいにばかりしていて、全く反省している様子がない。",
    "back": "He only ever blames his own failures on other people and shows no sign of reflecting on it at all.",
    "exampleJp": "彼は自分の失敗を他人のせいにばかりしていて、全く反省している様子がない。",
    "exampleTranslation": "He only ever blames his own failures on other people and shows no sign of reflecting on it at all.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0235"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1184
  },
  {
    "category": "sentence",
    "front": "もし本当に宝くじが当たったら、世界中を旅行して回りたいものだ。",
    "back": "If I were to really win the lottery, I would love to travel all around the world.",
    "exampleJp": "もし本当に宝くじが当たったら、世界中を旅行して回りたいものだ。",
    "exampleTranslation": "If I were to really win the lottery, I would love to travel all around the world.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0236"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1185
  },
  {
    "category": "sentence",
    "front": "あの人はいつも文句ばかり言っているので、周りの人から嫌われているらしい。",
    "back": "I hear that person is disliked by people around him because he is always doing nothing but complaining.",
    "exampleJp": "あの人はいつも文句ばかり言っているので、周りの人から嫌われているらしい。",
    "exampleTranslation": "I hear that person is disliked by people around him because he is always doing nothing but complaining.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0237"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1186
  },
  {
    "category": "sentence",
    "front": "いくら好きだからといって、毎日ラーメンばかり食べていたら体を壊しますよ。",
    "back": "No matter how much you like it, if you eat nothing but ramen every day, you will ruin your health.",
    "exampleJp": "いくら好きだからといって、毎日ラーメンばかり食べていたら体を壊しますよ。",
    "exampleTranslation": "No matter how much you like it, if you eat nothing but ramen every day, you will ruin your health.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0238"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1187
  },
  {
    "category": "sentence",
    "front": "彼とは何年も会っていないが、昔のように気軽に話せる気がする。",
    "back": "I haven't met with him for years, but I feel like we can talk casually just like the old days.",
    "exampleJp": "彼とは何年も会っていないが、昔のように気軽に話せる気がする。",
    "exampleTranslation": "I haven't met with him for years, but I feel like we can talk casually just like the old days.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0239"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1188
  },
  {
    "category": "sentence",
    "front": "この問題については、皆でもう少し時間をかけて話し合うべきだと思います。",
    "back": "Regarding this issue, I think everyone should take a little more time and discuss it.",
    "exampleJp": "この問題については、皆でもう少し時間をかけて話し合うべきだと思います。",
    "exampleTranslation": "Regarding this issue, I think everyone should take a little more time and discuss it.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0240"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1189
  },
  {
    "category": "sentence",
    "front": "子供の頃はあんなに苦手だったピーマンが、大人になったら好きになった。",
    "back": "Green peppers, which I disliked so much when I was a child, became something I like once I became an adult.",
    "exampleJp": "子供の頃はあんなに苦手だったピーマンが、大人になったら好きになった。",
    "exampleTranslation": "Green peppers, which I disliked so much when I was a child, became something I like once I became an adult.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0241"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1190
  },
  {
    "category": "sentence",
    "front": "新しいパソコンの使い方がどうしても分からないので、友達に教えてもらうことにした。",
    "back": "Since I absolutely can't figure out how to use the new computer, I decided to have my friend teach me.",
    "exampleJp": "新しいパソコンの使い方がどうしても分からないので、友達に教えてもらうことにした。",
    "exampleTranslation": "Since I absolutely can't figure out how to use the new computer, I decided to have my friend teach me.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0242"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1191
  },
  {
    "category": "sentence",
    "front": "明日は朝早く出発するので、今日のうちに荷物の準備を済ませておきたい。",
    "back": "Because I will depart early tomorrow morning, I want to finish preparing my luggage today.",
    "exampleJp": "明日は朝早く出発するので、今日のうちに荷物の準備を済ませておきたい。",
    "exampleTranslation": "Because I will depart early tomorrow morning, I want to finish preparing my luggage today.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0243"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1192
  },
  {
    "category": "sentence",
    "front": "あの店はいつも行列ができているから、きっと美味しい料理を出すに違いない。",
    "back": "Since that shop always has a line, they must surely serve delicious food.",
    "exampleJp": "あの店はいつも行列ができているから、きっと美味しい料理を出すに違いない。",
    "exampleTranslation": "Since that shop always has a line, they must surely serve delicious food.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0244"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1193
  },
  {
    "category": "sentence",
    "front": "彼女は本当に日本のアニメに詳しくて、どんな質問にもすぐに答えられる。",
    "back": "She is truly knowledgeable about Japanese anime and can answer any question immediately.",
    "exampleJp": "彼女は本当に日本のアニメに詳しくて、どんな質問にもすぐに答えられる。",
    "exampleTranslation": "She is truly knowledgeable about Japanese anime and can answer any question immediately.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0245"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1194
  },
  {
    "category": "sentence",
    "front": "この辺りは街灯が少なくて暗いので、夜歩くときは十分に注意してください。",
    "back": "This area has few streetlights and is dark, so please be fully careful when walking at night.",
    "exampleJp": "この辺りは街灯が少なくて暗いので、夜歩くときは十分に注意してください。",
    "exampleTranslation": "This area has few streetlights and is dark, so please be fully careful when walking at night.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0246"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1195
  },
  {
    "category": "sentence",
    "front": "一生懸命勉強したからには、なんとしても今回のテストで満点を取りたい。",
    "back": "Since I studied as hard as I could, I want to get a perfect score on this test no matter what.",
    "exampleJp": "一生懸命勉強したからには、なんとしても今回のテストで満点を取りたい。",
    "exampleTranslation": "Since I studied as hard as I could, I want to get a perfect score on this test no matter what.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0247"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1196
  },
  {
    "category": "sentence",
    "front": "彼は風邪を引いているのにもかかわらず、無理して残業を続けているようだ。",
    "back": "It seems he continues to push himself and work overtime despite having a cold.",
    "exampleJp": "彼は風邪を引いているのにもかかわらず、無理して残業を続けているようだ。",
    "exampleTranslation": "It seems he continues to push himself and work overtime despite having a cold.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0248"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1197
  },
  {
    "category": "sentence",
    "front": "明日の会議には、社長をはじめとする会社の重要なメンバー全員が出席する。",
    "back": "All the important members of the company, starting with the president, will attend tomorrow's meeting.",
    "exampleJp": "明日の会議には、社長をはじめとする会社の重要なメンバー全員が出席する。",
    "exampleTranslation": "All the important members of the company, starting with the president, will attend tomorrow's meeting.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0249"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1198
  },
  {
    "category": "sentence",
    "front": "こんなに美味しいお寿司を食べたのは、日本に来てから初めてのことだ。",
    "back": "Eating such delicious sushi is a first for me since coming to Japan.",
    "exampleJp": "こんなに美味しいお寿司を食べたのは、日本に来てから初めてのことだ。",
    "exampleTranslation": "Eating such delicious sushi is a first for me since coming to Japan.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0250"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1199
  },
  {
    "category": "sentence",
    "front": "彼の説明はまるで専門家が話しているかのように分かりやすく、説得力があった。",
    "back": "His explanation was easy to understand and persuasive, exactly as if an expert were talking.",
    "exampleJp": "彼の説明はまるで専門家が話しているかのように分かりやすく、説得力があった。",
    "exampleTranslation": "His explanation was easy to understand and persuasive, exactly as if an expert were talking.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0251"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1200
  },
  {
    "category": "sentence",
    "front": "急に大雨が降ってきたせいで、せっかくのバーベキューが台無しになってしまった。",
    "back": "Because heavy rain suddenly started falling, our precious barbecue ended up completely ruined.",
    "exampleJp": "急に大雨が降ってきたせいで、せっかくのバーベキューが台無しになってしまった。",
    "exampleTranslation": "Because heavy rain suddenly started falling, our precious barbecue ended up completely ruined.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0252"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1201
  },
  {
    "category": "sentence",
    "front": "あの俳優は演技が上手いだけでなく、歌も素晴らしいのでファンが多い。",
    "back": "That actor is not only good at acting but also wonderful at singing, so he has many fans.",
    "exampleJp": "あの俳優は演技が上手いだけでなく、歌も素晴らしいのでファンが多い。",
    "exampleTranslation": "That actor is not only good at acting but also wonderful at singing, so he has many fans.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0253"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1202
  },
  {
    "category": "sentence",
    "front": "この本は専門的な用語が多くて、普通の人が理解するには少し難しすぎる。",
    "back": "This book has many specialized terms, and it's a bit too difficult for an ordinary person to understand.",
    "exampleJp": "この本は専門的な用語が多くて、普通の人が理解するには少し難しすぎる。",
    "exampleTranslation": "This book has many specialized terms, and it's a bit too difficult for an ordinary person to understand.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0254"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1203
  },
  {
    "category": "sentence",
    "front": "私が何度注意しても、彼は全く態度を改めようとしないので困っている。",
    "back": "No matter how many times I warn him, he doesn't try to improve his attitude at all, which is troubling.",
    "exampleJp": "私が何度注意しても、彼は全く態度を改めようとしないので困っている。",
    "exampleTranslation": "No matter how many times I warn him, he doesn't try to improve his attitude at all, which is troubling.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0255"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1204
  },
  {
    "category": "sentence",
    "front": "来週は重要な試験があるから、友達からの遊びの誘いも断らざるを得ない。",
    "back": "Since there is an important exam next week, I have no choice but to refuse even my friends' invitations to play.",
    "exampleJp": "来週は重要な試験があるから、友達からの遊びの誘いも断らざるを得ない。",
    "exampleTranslation": "Since there is an important exam next week, I have no choice but to refuse even my friends' invitations to play.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0256"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1205
  },
  {
    "category": "sentence",
    "front": "彼はいつも約束の時間を守らないので、もう誰も彼を信用しなくなってしまった。",
    "back": "Because he never keeps the promised time, nobody trusts him anymore.",
    "exampleJp": "彼はいつも約束の時間を守らないので、もう誰も彼を信用しなくなってしまった。",
    "exampleTranslation": "Because he never keeps the promised time, nobody trusts him anymore.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0257"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1206
  },
  {
    "category": "sentence",
    "front": "この店は値段が安いわりに、量がとても多くて学生にはありがたい存在だ。",
    "back": "Considering this shop's low prices, the portions are very large, making it a thankful existence for students.",
    "exampleJp": "この店は値段が安いわりに、量がとても多くて学生にはありがたい存在だ。",
    "exampleTranslation": "Considering this shop's low prices, the portions are very large, making it a thankful existence for students.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0258"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1207
  },
  {
    "category": "sentence",
    "front": "少し休んだら痛みが治まったので、なんとか最後まで歩き切ることができた。",
    "back": "Since the pain subsided after resting a little, I managed to walk all the way to the end somehow.",
    "exampleJp": "少し休んだら痛みが治まったので、なんとか最後まで歩き切ることができた。",
    "exampleTranslation": "Since the pain subsided after resting a little, I managed to walk all the way to the end somehow.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0259"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1208
  },
  {
    "category": "sentence",
    "front": "彼女はとても頭が良い反面、少し人の気持ちを理解するのが苦手なところがある。",
    "back": "While she is very smart on one hand, she has a side that is a bit bad at understanding people's feelings.",
    "exampleJp": "彼女はとても頭が良い反面、少し人の気持ちを理解するのが苦手なところがある。",
    "exampleTranslation": "While she is very smart on one hand, she has a side that is a bit bad at understanding people's feelings.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0260"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1209
  },
  {
    "category": "sentence",
    "front": "子供の頃に住んでいた町を久しぶりに訪れてみたが、すっかり変わっていて驚いた。",
    "back": "I tried visiting the town I lived in as a child for the first time in a while, but I was surprised that it had completely changed.",
    "exampleJp": "子供の頃に住んでいた町を久しぶりに訪れてみたが、すっかり変わっていて驚いた。",
    "exampleTranslation": "I tried visiting the town I lived in as a child for the first time in a while, but I was surprised that it had completely changed.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0261"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1210
  },
  {
    "category": "sentence",
    "front": "この薬は効果が強い代わりに、眠くなるなどの副作用が出ることもあるそうです。",
    "back": "I hear this medicine has strong effects, but in exchange, side effects such as getting sleepy may also appear.",
    "exampleJp": "この薬は効果が強い代わりに、眠くなるなどの副作用が出ることもあるそうです。",
    "exampleTranslation": "I hear this medicine has strong effects, but in exchange, side effects such as getting sleepy may also appear.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0262"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1211
  },
  {
    "category": "sentence",
    "front": "彼があの難しい試験に一回で合格できたのは、日々の努力のたまものだ。",
    "back": "The fact that he was able to pass that difficult exam on the first try is the fruit of his daily efforts.",
    "exampleJp": "彼があの難しい試験に一回で合格できたのは、日々の努力のたまものだ。",
    "exampleTranslation": "The fact that he was able to pass that difficult exam on the first try is the fruit of his daily efforts.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0263"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1212
  },
  {
    "category": "sentence",
    "front": "もし明日雨が降ったとしたら、ピクニックは中止にして家で映画を見よう。",
    "back": "Assuming it rains tomorrow, let's cancel the picnic and watch a movie at home.",
    "exampleJp": "もし明日雨が降ったとしたら、ピクニックは中止にして家で映画を見よう。",
    "exampleTranslation": "Assuming it rains tomorrow, let's cancel the picnic and watch a movie at home.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0264"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1213
  },
  {
    "category": "sentence",
    "front": "いくら彼が才能を持っているとはいえ、全く練習しなければ試合に勝てないだろう。",
    "back": "No matter how much talent he has, if he doesn't practice at all he probably won't be able to win the match.",
    "exampleJp": "いくら彼が才能を持っているとはいえ、全く練習しなければ試合に勝てないだろう。",
    "exampleTranslation": "No matter how much talent he has, if he doesn't practice at all he probably won't be able to win the match.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0265"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1214
  },
  {
    "category": "sentence",
    "front": "このプロジェクトは、皆が協力してくれなければ決して成功することはないだろう。",
    "back": "This project will probably never succeed unless everyone cooperates.",
    "exampleJp": "このプロジェクトは、皆が協力してくれなければ決して成功することはないだろう。",
    "exampleTranslation": "This project will probably never succeed unless everyone cooperates.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0266"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1215
  },
  {
    "category": "sentence",
    "front": "昨日見た映画のラストシーンがとても衝撃的で、今でも頭から離れない。",
    "back": "The last scene of the movie I watched yesterday was so shocking that it still won't leave my head.",
    "exampleJp": "昨日見た映画のラストシーンがとても衝撃的で、今でも頭から離れない。",
    "exampleTranslation": "The last scene of the movie I watched yesterday was so shocking that it still won't leave my head.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0267"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1216
  },
  {
    "category": "sentence",
    "front": "彼は何か言いたげな顔をしていたが、結局何も言わずに帰ってしまった。",
    "back": "He had a look like he wanted to say something, but he ended up going home without saying anything.",
    "exampleJp": "彼は何か言いたげな顔をしていたが、結局何も言わずに帰ってしまった。",
    "exampleTranslation": "He had a look like he wanted to say something, but he ended up going home without saying anything.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0268"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1217
  },
  {
    "category": "sentence",
    "front": "この辞書は小さくて軽いから、かばんに入れて持ち歩くのにとても便利だ。",
    "back": "Since this dictionary is small and light, it is very convenient for putting in a bag and carrying around.",
    "exampleJp": "この辞書は小さくて軽いから、かばんに入れて持ち歩くのにとても便利だ。",
    "exampleTranslation": "Since this dictionary is small and light, it is very convenient for putting in a bag and carrying around.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0269"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1218
  },
  {
    "category": "sentence",
    "front": "彼がわざと嘘をついたとは考えにくいので、何か理由があるに違いない。",
    "back": "It's hard to think that he told a lie on purpose, so there must surely be some reason.",
    "exampleJp": "彼がわざと嘘をついたとは考えにくいので、何か理由があるに違いない。",
    "exampleTranslation": "It's hard to think that he told a lie on purpose, so there must surely be some reason.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0270"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1219
  },
  {
    "category": "sentence",
    "front": "今日は朝から頭が痛くて、薬を飲んでもなかなか治らなくて困っている。",
    "back": "My head has been hurting since morning today, and even though I took medicine it won't easily cure, which is troubling.",
    "exampleJp": "今日は朝から頭が痛くて、薬を飲んでもなかなか治らなくて困っている。",
    "exampleTranslation": "My head has been hurting since morning today, and even though I took medicine it won't easily cure, which is troubling.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0271"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1220
  },
  {
    "category": "sentence",
    "front": "あの店はいつも混雑しているので、予約をしないで行くのはやめた方がいい。",
    "back": "That shop is always crowded, so you'd better stop going without making a reservation.",
    "exampleJp": "あの店はいつも混雑しているので、予約をしないで行くのはやめた方がいい。",
    "exampleTranslation": "That shop is always crowded, so you'd better stop going without making a reservation.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0272"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1221
  },
  {
    "category": "sentence",
    "front": "日本語の勉強を続ければ続けるほど、言葉の奥深さに気づかされる気がする。",
    "back": "The more I continue studying Japanese, the more I feel I am made to realize the depth of the language.",
    "exampleJp": "日本語の勉強を続ければ続けるほど、言葉の奥深さに気づかされる気がする。",
    "exampleTranslation": "The more I continue studying Japanese, the more I feel I am made to realize the depth of the language.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0273"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1222
  },
  {
    "category": "sentence",
    "front": "彼女は私の話を全く聞いていないかのごとく、自分のことばかり話し続けた。",
    "back": "She continued to talk only about herself, exactly as if she hadn't been listening to my story at all.",
    "exampleJp": "彼女は私の話を全く聞いていないかのごとく、自分のことばかり話し続けた。",
    "exampleTranslation": "She continued to talk only about herself, exactly as if she hadn't been listening to my story at all.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0274"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1223
  },
  {
    "category": "sentence",
    "front": "このマンションは駅から近いという利点があるものの、家賃が高すぎるのが欠点だ。",
    "back": "Although this apartment has the advantage of being close to the station, the drawback is that the rent is too high.",
    "exampleJp": "このマンションは駅から近いという利点があるものの、家賃が高すぎるのが欠点だ。",
    "exampleTranslation": "Although this apartment has the advantage of being close to the station, the drawback is that the rent is too high.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0275"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1224
  },
  {
    "category": "sentence",
    "front": "彼があんなに急いで部屋を出て行ったのには、何か深い訳があるのだろう。",
    "back": "There must be some deep reason for why he left the room in such a hurry.",
    "exampleJp": "彼があんなに急いで部屋を出て行ったのには、何か深い訳があるのだろう。",
    "exampleTranslation": "There must be some deep reason for why he left the room in such a hurry.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0276"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1225
  },
  {
    "category": "sentence",
    "front": "いくら体に良いからといって、サプリメントばかりに頼るのは危険だと思う。",
    "back": "No matter how good it is for the body, I think relying solely on supplements is dangerous.",
    "exampleJp": "いくら体に良いからといって、サプリメントばかりに頼るのは危険だと思う。",
    "exampleTranslation": "No matter how good it is for the body, I think relying solely on supplements is dangerous.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0277"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1226
  },
  {
    "category": "sentence",
    "front": "彼は本当に反省しているのだろうか、全く謝る気配が見られないのだけれど。",
    "back": "Is he truly reflecting on it, I wonder? I can't see any sign of him apologizing at all, though.",
    "exampleJp": "彼は本当に反省しているのだろうか、全く謝る気配が見られないのだけれど。",
    "exampleTranslation": "Is he truly reflecting on it, I wonder? I can't see any sign of him apologizing at all, though.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0278"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1227
  },
  {
    "category": "sentence",
    "front": "この料理の味付けは少し甘すぎるきらいがあるので、もう少し塩を足した方がいい。",
    "back": "The seasoning of this dish tends to be a bit too sweet, so it's better to add a little more salt.",
    "exampleJp": "この料理の味付けは少し甘すぎるきらいがあるので、もう少し塩を足した方がいい。",
    "exampleTranslation": "The seasoning of this dish tends to be a bit too sweet, so it's better to add a little more salt.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0279"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1228
  },
  {
    "category": "sentence",
    "front": "新しい環境に慣れるまでは誰でも不安なものだから、あまり心配しなくても大丈夫だ。",
    "back": "It's normal for anyone to be anxious until they get used to a new environment, so it's okay not to worry too much.",
    "exampleJp": "新しい環境に慣れるまでは誰でも不安なものだから、あまり心配しなくても大丈夫だ。",
    "exampleTranslation": "It's normal for anyone to be anxious until they get used to a new environment, so it's okay not to worry too much.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0280"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1229
  },
  {
    "category": "sentence",
    "front": "明日のハイキングは、山の天気が変わりやすいので必ず雨具を持ってくるように。",
    "back": "For tomorrow's hiking, the mountain weather changes easily, so make sure to bring rain gear without fail.",
    "exampleJp": "明日のハイキングは、山の天気が変わりやすいので必ず雨具を持ってくるように。",
    "exampleTranslation": "For tomorrow's hiking, the mountain weather changes easily, so make sure to bring rain gear without fail.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0281"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1230
  },
  {
    "category": "sentence",
    "front": "彼がそんな大きな間違いをするなんて、彼らしくない出来事だとみんなが驚いた。",
    "back": "Everyone was surprised that he made such a big mistake, saying it was an incident unlike him.",
    "exampleJp": "彼がそんな大きな間違いをするなんて、彼らしくない出来事だとみんなが驚いた。",
    "exampleTranslation": "Everyone was surprised that he made such a big mistake, saying it was an incident unlike him.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0282"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1231
  },
  {
    "category": "sentence",
    "front": "この車は古いわりには燃費が良くて、長距離のドライブにも十分使えるレベルだ。",
    "back": "Considering this car is old, it has good fuel efficiency and is at a level where it can be fully used for long-distance driving.",
    "exampleJp": "この車は古いわりには燃費が良くて、長距離のドライブにも十分使えるレベルだ。",
    "exampleTranslation": "Considering this car is old, it has good fuel efficiency and is at a level where it can be fully used for long-distance driving.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0283"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1232
  },
  {
    "category": "sentence",
    "front": "彼とはケンカばかりしているが、なんだかんだ言って一番の親友であることに変わりはない。",
    "back": "I'm always fighting with him, but at the end of the day, it doesn't change the fact that he's my best friend.",
    "exampleJp": "彼とはケンカばかりしているが、なんだかんだ言って一番の親友であることに変わりはない。",
    "exampleTranslation": "I'm always fighting with him, but at the end of the day, it doesn't change the fact that he's my best friend.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0284"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1233
  },
  {
    "category": "sentence",
    "front": "いくら説明書を読んでも機械の使い方が分からないので、ついにメーカーに問い合わせた。",
    "back": "No matter how much I read the manual, I didn't understand how to use the machine, so I finally inquired with the manufacturer.",
    "exampleJp": "いくら説明書を読んでも機械の使い方が分からないので、ついにメーカーに問い合わせた。",
    "exampleTranslation": "No matter how much I read the manual, I didn't understand how to use the machine, so I finally inquired with the manufacturer.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0285"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1234
  },
  {
    "category": "sentence",
    "front": "彼女はいつも笑顔で挨拶してくれるので、朝からとても気持ちよく仕事が始められる。",
    "back": "Because she always greets me with a smile, I can start work feeling very pleasant from the morning.",
    "exampleJp": "彼女はいつも笑顔で挨拶してくれるので、朝からとても気持ちよく仕事が始められる。",
    "exampleTranslation": "Because she always greets me with a smile, I can start work feeling very pleasant from the morning.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0286"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1235
  },
  {
    "category": "sentence",
    "front": "このレストランは雰囲気が良くて料理も美味しいから、デートには最適な場所だと思う。",
    "back": "Because this restaurant has a good atmosphere and the food is also delicious, I think it's the optimal place for a date.",
    "exampleJp": "このレストランは雰囲気が良くて料理も美味しいから、デートには最適な場所だと思う。",
    "exampleTranslation": "Because this restaurant has a good atmosphere and the food is also delicious, I think it's the optimal place for a date.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0287"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1236
  },
  {
    "category": "sentence",
    "front": "彼がそんなひどい嘘をつくような人だとは、実際に話を聞くまで信じられなかった。",
    "back": "Until I actually heard the story, I couldn't believe that he was the kind of person to tell such a terrible lie.",
    "exampleJp": "彼がそんなひどい嘘をつくような人だとは、実際に話を聞くまで信じられなかった。",
    "exampleTranslation": "Until I actually heard the story, I couldn't believe that he was the kind of person to tell such a terrible lie.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0288"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1237
  },
  {
    "category": "sentence",
    "front": "明日は朝早く起きなければならないから、夜更かしせずに早く寝ようと心に決めた。",
    "back": "Since I have to wake up early tomorrow morning, I resolved in my heart to go to bed early without staying up late.",
    "exampleJp": "明日は朝早く起きなければならないから、夜更かしせずに早く寝ようと心に決めた。",
    "exampleTranslation": "Since I have to wake up early tomorrow morning, I resolved in my heart to go to bed early without staying up late.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0289"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1238
  },
  {
    "category": "sentence",
    "front": "いくら値段が安くても、デザインが気に入らなければその服を買うつもりは全くない。",
    "back": "No matter how cheap the price is, if I don't like the design, I have no intention of buying those clothes at all.",
    "exampleJp": "いくら値段が安くても、デザインが気に入らなければその服を買うつもりは全くない。",
    "exampleTranslation": "No matter how cheap the price is, if I don't like the design, I have no intention of buying those clothes at all.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0290"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1239
  },
  {
    "category": "sentence",
    "front": "この本は日本の歴史について非常に詳しく書かれており、専門家でも読み応えがある。",
    "back": "This book is written in extreme detail about Japanese history, and even experts find it worth reading.",
    "exampleJp": "この本は日本の歴史について非常に詳しく書かれており、専門家でも読み応えがある。",
    "exampleTranslation": "This book is written in extreme detail about Japanese history, and even experts find it worth reading.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0291"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1240
  },
  {
    "category": "sentence",
    "front": "彼は自分が悪いと分かっているくせに、絶対に謝ろうとしないから本当に困ったものだ。",
    "back": "Even though he knows he's in the wrong, he absolutely won't try to apologize, so he's truly a troublesome person.",
    "exampleJp": "彼は自分が悪いと分かっているくせに、絶対に謝ろうとしないから本当に困ったものだ。",
    "exampleTranslation": "Even though he knows he's in the wrong, he absolutely won't try to apologize, so he's truly a troublesome person.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0292"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1241
  },
  {
    "category": "sentence",
    "front": "急な用事が入ってしまったせいで、楽しみにしていた週末の旅行に行けなくなってしまった。",
    "back": "Because an urgent errand came up, I ended up unable to go on the weekend trip I was looking forward to.",
    "exampleJp": "急な用事が入ってしまったせいで、楽しみにしていた週末の旅行に行けなくなってしまった。",
    "exampleTranslation": "Because an urgent errand came up, I ended up unable to go on the weekend trip I was looking forward to.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0293"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1242
  },
  {
    "category": "sentence",
    "front": "あの人はいつも人の悪口ばかり言っているので、周りから信頼されていないのも無理はない。",
    "back": "That person is always saying nothing but bad things about others, so it's no wonder they aren't trusted by those around them.",
    "exampleJp": "あの人はいつも人の悪口ばかり言っているので、周りから信頼されていないのも無理はない。",
    "exampleTranslation": "That person is always saying nothing but bad things about others, so it's no wonder they aren't trusted by those around them.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0294"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1243
  },
  {
    "category": "sentence",
    "front": "もしタイムマシンがあったとしたら、自分が子供の頃に戻って当時の自分に会ってみたい。",
    "back": "Assuming there was a time machine, I would like to return to when I was a child and meet my past self.",
    "exampleJp": "もしタイムマシンがあったとしたら、自分が子供の頃に戻って当時の自分に会ってみたい。",
    "exampleTranslation": "Assuming there was a time machine, I would like to return to when I was a child and meet my past self.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0295"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1244
  },
  {
    "category": "sentence",
    "front": "彼は本当に風邪を引いているのだろうか、昨日元気に遊んでいる姿を見たのだけれど。",
    "back": "I wonder if he really has a cold; I saw him playing energetically yesterday, though.",
    "exampleJp": "彼は本当に風邪を引いているのだろうか、昨日元気に遊んでいる姿を見たのだけれど。",
    "exampleTranslation": "I wonder if he really has a cold; I saw him playing energetically yesterday, though.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0296"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1245
  },
  {
    "category": "sentence",
    "front": "このソフトウェアは便利である反面、使いこなすまでにかなり時間がかかるのが少し面倒だ。",
    "back": "While this software is convenient on one hand, it is a bit troublesome that it takes quite a bit of time to master.",
    "exampleJp": "このソフトウェアは便利である反面、使いこなすまでにかなり時間がかかるのが少し面倒だ。",
    "exampleTranslation": "While this software is convenient on one hand, it is a bit troublesome that it takes quite a bit of time to master.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0297"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1246
  },
  {
    "category": "sentence",
    "front": "いくら失敗したからといって、そこで諦めてしまったら今までの努力がすべて無駄になる。",
    "back": "No matter how much you failed, if you end up giving up there, all your efforts up to now will become a waste.",
    "exampleJp": "いくら失敗したからといって、そこで諦めてしまったら今までの努力がすべて無駄になる。",
    "exampleTranslation": "No matter how much you failed, if you end up giving up there, all your efforts up to now will become a waste.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0298"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1247
  },
  {
    "category": "sentence",
    "front": "彼があの難しい仕事を一人でやり遂げたなんて、本当に信じられないくらい素晴らしいことだ。",
    "back": "The fact that he accomplished that difficult job all by himself is something wonderful to the point of being truly unbelievable.",
    "exampleJp": "彼があの難しい仕事を一人でやり遂げたなんて、本当に信じられないくらい素晴らしいことだ。",
    "exampleTranslation": "The fact that he accomplished that difficult job all by himself is something wonderful to the point of being truly unbelievable.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0299"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1248
  },
  {
    "category": "sentence",
    "front": "明日の試合は絶対に勝たなければならないから、最後まで気を抜かずに全力で戦おう。",
    "back": "Because we absolutely must win tomorrow's match, let's fight with all our power without losing focus until the end.",
    "exampleJp": "明日の試合は絶対に勝たなければならないから、最後まで気を抜かずに全力で戦おう。",
    "exampleTranslation": "Because we absolutely must win tomorrow's match, let's fight with all our power without losing focus until the end.",
    "tags": [
      "n3",
      "sentence",
      "reading-comprehension-top-up"
    ],
    "sourceIds": [
      "n3-sentence-0300"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1249
  }
];

const SOURCE_COUNTS = {
  "vocabulary": 625,
  "kanji": 180,
  "grammar": 144,
  "sentence": 300
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function getCleanedCardSources() {
  return clone(CARD_SOURCES);
}

function getCleanupReport() {
  return {
    inputCounts: { 'sources/cards.js': clone(SOURCE_COUNTS) },
    inputTotals: clone(SOURCE_COUNTS),
    fixedCards: [],
    removedCards: [],
    finalCounts: clone(SOURCE_COUNTS),
    removedCounts: {},
    fixedCount: 0
  };
}

module.exports = {
  ALLOWED_CATEGORIES,
  CATEGORY_ORDER,
  FORBIDDEN_FIELDS,
  getCleanedCardSources,
  getCleanupReport,
};
