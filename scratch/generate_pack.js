const fs = require('fs');
const path = require('path');

// 1. Vocabulary (150 total: 15 per category * 10 categories)
const vocabCategories = [
    { name: "People & Family", items: [
        "人|person|あの人は誰ですか。|Who is that person?",
        "男|man|男の人がいます。|There is a man.",
        "女|woman|女の人が話しています。|A woman is talking.",
        "子供|child|子供が遊んでいます。|Children are playing.",
        "私|I, me|私は学生です。|I am a student.",
        "父|father (own)|父は会社員です。|My father is an office worker.",
        "母|mother (own)|母は先生です。|My mother is a teacher.",
        "お父さん|father (someone else's)|お父さんはお元気ですか。|How is your father?",
        "お母さん|mother (someone else's)|お母さんは家にいますか。|Is your mother at home?",
        "兄|older brother (own)|兄は東京に住んでいます。|My older brother lives in Tokyo.",
        "姉|older sister (own)|姉は大学生です。|My older sister is a university student.",
        "弟|younger brother|弟はテレビを見ています。|My younger brother is watching TV.",
        "妹|younger sister|妹は本を読んでいます。|My younger sister is reading a book.",
        "家族|family|家族は四人です。|There are four people in my family.",
        "友達|friend|友達と一緒に学校へ行きます。|I go to school with my friend."
    ]},
    { name: "Time & Dates", items: [
        "今日|today|今日は学校へ行きます。|I am going to school today.",
        "明日|tomorrow|明日は休みです。|Tomorrow is a day off.",
        "昨日|yesterday|昨日は雨でした。|It rained yesterday.",
        "今|now|今は何時ですか。|What time is it now?",
        "毎日|every day|毎日パンを食べます。|I eat bread every day.",
        "朝|morning|朝早く起きます。|I wake up early in the morning.",
        "昼|noon, daytime|昼ご飯を食べましたか。|Did you eat lunch?",
        "夜|night|夜は勉強します。|I study at night.",
        "今週|this week|今週は忙しいです。|I am busy this week.",
        "来週|next week|来週、テストがあります。|There is a test next week.",
        "先週|last week|先週、映画を見ました。|I saw a movie last week.",
        "今年|this year|今年は日本へ行きたいです。|I want to go to Japan this year.",
        "来年|next year|来年は大学生になります。|I will become a university student next year.",
        "去年|last year|去年、車を買いました。|I bought a car last year.",
        "時間|time|時間がありません。|I have no time."
    ]},
    { name: "Numbers & Counters", items: [
        "一|one|りんごを一つ買いました。|I bought one apple.",
        "二|two|猫が二匹います。|There are two cats.",
        "三|three|三時にお茶を飲みます。|I drink tea at three o'clock.",
        "四|four|四百円です。|It is four hundred yen.",
        "五|five|五人で来ました。|We came with five people.",
        "六|six|六時に起きます。|I wake up at six o'clock.",
        "七|seven|七月は暑いです。|July is hot.",
        "八|eight|八百屋で野菜を買います。|I buy vegetables at the greengrocer.",
        "九|nine|九時半に寝ます。|I sleep at nine thirty.",
        "十|ten|十日間旅行しました。|I traveled for ten days.",
        "百|hundred|これは三百円です。|This is three hundred yen.",
        "千|thousand|三千円払いました。|I paid three thousand yen.",
        "万|ten thousand|一万円札を持っています。|I have a ten thousand yen bill.",
        "半分|half|ケーキを半分食べました。|I ate half of the cake.",
        "少し|a little|少し疲れました。|I am a little tired."
    ]},
    { name: "Places & Directions", items: [
        "前|front, before|駅の前にいます。|I am in front of the station.",
        "後ろ|behind|家の後ろに山があります。|There is a mountain behind the house.",
        "右|right|右へ曲がってください。|Please turn right.",
        "左|left|左を見てください。|Please look to the left.",
        "上|up, above|机の上に本があります。|There is a book on the desk.",
        "下|down, below|猫が机の下にいます。|There is a cat under the desk.",
        "中|inside|かばんの中に財布があります。|There is a wallet inside the bag.",
        "外|outside|外は寒いです。|It is cold outside.",
        "隣|next to|隣の部屋に誰かいます。|Someone is in the next room.",
        "近く|near|近くにコンビニはありますか。|Is there a convenience store nearby?",
        "遠い|far|学校は遠いです。|The school is far.",
        "ここ|here|ここは私の部屋です。|This is my room.",
        "そこ|there|そこに座ってください。|Please sit there.",
        "あそこ|over there|あそこに犬がいます。|There is a dog over there.",
        "どこ|where|トイレはどこですか。|Where is the restroom?"
    ]},
    { name: "Food & Daily Life", items: [
        "ご飯|rice, meal|ご飯を食べましょう。|Let's eat a meal.",
        "水|water|水を飲みたいです。|I want to drink water.",
        "お茶|tea|お茶をどうぞ。|Please have some tea.",
        "肉|meat|肉と魚、どちらが好きですか。|Which do you like, meat or fish?",
        "魚|fish|この魚は美味しいです。|This fish is delicious.",
        "野菜|vegetable|野菜をたくさん食べます。|I eat a lot of vegetables.",
        "果物|fruit|果物を買いました。|I bought fruit.",
        "パン|bread|朝ご飯はパンです。|I have bread for breakfast.",
        "卵|egg|卵を二つください。|Please give me two eggs.",
        "牛乳|milk|牛乳を飲みますか。|Do you drink milk?",
        "料理|cooking, dish|母の料理は美味しいです。|My mother's cooking is delicious.",
        "店|shop|あの店に入りましょう。|Let's go into that shop.",
        "服|clothes|新しい服が欲しいです。|I want new clothes.",
        "靴|shoes|靴を脱いでください。|Please take off your shoes.",
        "お金|money|お金がありません。|I have no money."
    ]},
    { name: "School & Work", items: [
        "学校|school|明日学校を休みます。|I will be absent from school tomorrow.",
        "先生|teacher|先生に聞きましょう。|Let's ask the teacher.",
        "学生|student|私は学生ではありません。|I am not a student.",
        "会社|company|会社に行きます。|I am going to the company.",
        "仕事|work|仕事は忙しいですか。|Is your work busy?",
        "勉強|study|日本語の勉強が好きです。|I like studying Japanese.",
        "宿題|homework|宿題を忘れました。|I forgot my homework.",
        "本|book|この本は面白いです。|This book is interesting.",
        "辞書|dictionary|辞書を貸してください。|Please lend me a dictionary.",
        "鉛筆|pencil|鉛筆で書いてください。|Please write with a pencil.",
        "机|desk|机を拭きます。|I will wipe the desk.",
        "椅子|chair|椅子に座ってください。|Please sit on the chair.",
        "テスト|test|明日テストがあります。|There is a test tomorrow.",
        "問題|problem, question|この問題は難しいです。|This question is difficult.",
        "質問|question|質問はありますか。|Do you have any questions?"
    ]},
    { name: "Basic Verbs", items: [
        "行く|to go|デパートへ行きます。|I will go to the department store.",
        "来る|to come|友達がうちに来ました。|My friend came to my house.",
        "帰る|to return|早く帰りましょう。|Let's return early.",
        "食べる|to eat|りんごを食べます。|I eat an apple.",
        "飲む|to drink|コーヒーを飲みました。|I drank coffee.",
        "見る|to see, look|映画を見たいです。|I want to see a movie.",
        "聞く|to listen, ask|音楽を聞きます。|I listen to music.",
        "読む|to read|新聞を読んでいます。|I am reading a newspaper.",
        "書く|to write|手紙を書きました。|I wrote a letter.",
        "話す|to speak|日本語を話せます。|I can speak Japanese.",
        "買う|to buy|新しいカメラを買いました。|I bought a new camera.",
        "教える|to teach|英語を教えてください。|Please teach me English.",
        "寝る|to sleep|十時に寝ます。|I sleep at ten o'clock.",
        "起きる|to wake up|七時に起きました。|I woke up at seven.",
        "する|to do|スポーツをします。|I do sports."
    ]},
    { name: "Adjectives", items: [
        "大きい|big|大きい家が欲しいです。|I want a big house.",
        "小さい|small|小さい車を買いました。|I bought a small car.",
        "新しい|new|新しいパソコンです。|It is a new computer.",
        "古い|old|この時計は古いです。|This watch is old.",
        "良い|good|今日は良い天気ですね。|It is good weather today, isn't it?",
        "悪い|bad|気分が悪いです。|I feel bad.",
        "暑い|hot|今日はとても暑いです。|It is very hot today.",
        "寒い|cold|冬は寒いです。|Winter is cold.",
        "高い|expensive, high|この本は高いです。|This book is expensive.",
        "安い|cheap|あの店は安いです。|That shop is cheap.",
        "美味しい|delicious|このケーキは美味しいです。|This cake is delicious.",
        "面白い|interesting|面白い映画を見ました。|I saw an interesting movie.",
        "難しい|difficult|日本語は難しいですか。|Is Japanese difficult?",
        "簡単|easy|簡単なテストでした。|It was an easy test.",
        "きれい|beautiful, clean|きれいな花ですね。|It is a beautiful flower, isn't it?"
    ]},
    { name: "Adverbs & Expressions", items: [
        "とても|very|とても面白いです。|It is very interesting.",
        "たくさん|a lot|たくさん食べてください。|Please eat a lot.",
        "よく|often, well|よく映画を見ます。|I often watch movies.",
        "いつも|always|いつもバスで来ます。|I always come by bus.",
        "時々|sometimes|時々海へ行きます。|Sometimes I go to the sea.",
        "もう|already, more|もう昼ご飯を食べました。|I already ate lunch.",
        "まだ|not yet|まだ終わっていません。|It is not finished yet.",
        "すぐ|immediately|すぐ行きます。|I will go immediately.",
        "ゆっくり|slowly|ゆっくり話してください。|Please speak slowly.",
        "だんだん|gradually|だんだん寒くなります。|It gradually becomes cold.",
        "どうして|why|どうして昨日来ませんでしたか。|Why didn't you come yesterday?",
        "はい|yes|はい、そうです。|Yes, that is right.",
        "いいえ|no|いいえ、違います。|No, that is wrong.",
        "ありがとう|thank you|手伝ってくれてありがとう。|Thank you for helping me.",
        "すみません|excuse me, sorry|すみません、駅はどこですか。|Excuse me, where is the station?"
    ]},
    { name: "Particles & Function Words", items: [
        "が|subject marker|雨が降っています。|It is raining.",
        "を|object marker|水を飲みます。|I drink water.",
        "に|target, location|東京に行きます。|I am going to Tokyo.",
        "で|context, means|バスで来ました。|I came by bus.",
        "へ|direction|どこへ行きますか。|Where are you going?",
        "と|and, with|友達と話します。|I speak with a friend.",
        "や|and (incomplete list)|りんごやみかんを買いました。|I bought apples and mandarins (among other things).",
        "の|possession|これは私の本です。|This is my book.",
        "も|also|私も行きます。|I will also go.",
        "から|from, because|アメリカから来ました。|I came from America.",
        "まで|until|三時まで勉強します。|I will study until three o'clock.",
        "か|question marker|お元気ですか。|Are you well?",
        "ね|agreement seeker|いい天気ですね。|It is good weather, isn't it?",
        "よ|emphasis|美味しいですよ。|It's delicious, you know.",
        "だけ|only|百円だけあります。|I only have 100 yen."
    ]}
];

// 2. Kanji (50 total: 10 per category * 5 categories)
const kanjiCategories = [
    { name: "Numbers", items: [
        "一|One|一つください。|Please give me one.",
        "二|Two|二時間かかります。|It takes two hours.",
        "三|Three|三月は寒いです。|March is cold.",
        "四|Four|四人で食べました。|Four of us ate.",
        "五|Five|五時にお願いします。|At five o'clock, please.",
        "六|Six|六百円です。|It is six hundred yen.",
        "七|Seven|七日は休みです。|The 7th is a day off.",
        "八|Eight|八時に出発します。|We depart at eight o'clock.",
        "九|Nine|九月に行きます。|I will go in September.",
        "十|Ten|十回読みました。|I read it ten times."
    ]},
    { name: "Time", items: [
        "日|Day, Sun|日曜日に映画を見ます。|I watch movies on Sunday.",
        "月|Month, Moon|今月は忙しいです。|I am busy this month.",
        "年|Year|来年日本へ行きます。|I will go to Japan next year.",
        "時|Time, Hour|今は何時ですか。|What time is it now?",
        "分|Minute, To divide|十分待ってください。|Please wait for ten minutes.",
        "今|Now|今から行きます。|I am going now.",
        "毎|Every|毎日勉強します。|I study every day.",
        "半|Half|一時半に終わります。|It finishes at 1:30.",
        "週|Week|先週のテストは難しかったです。|Last week's test was difficult.",
        "間|Between, Interval|この間に少し休みましょう。|Let's rest a little during this time."
    ]},
    { name: "Nature", items: [
        "火|Fire|火曜日は休みです。|Tuesday is a day off.",
        "水|Water|冷たい水をください。|Please give me some cold water.",
        "木|Tree, Wood|大きい木があります。|There is a big tree.",
        "金|Gold, Money|お金が少しあります。|I have a little money.",
        "土|Earth, Soil|土曜日に友達と会います。|I will meet my friend on Saturday.",
        "山|Mountain|富士山はきれいです。|Mount Fuji is beautiful.",
        "川|River|川で泳ぎます。|I swim in the river.",
        "空|Sky|空が青いです。|The sky is blue.",
        "天|Heaven|今日はいい天気です。|The weather is good today.",
        "気|Spirit, Mind|気分がいいです。|I feel good."
    ]},
    { name: "People & Body", items: [
        "人|Person|あの人は日本人です。|That person is Japanese.",
        "男|Man|男の子が走っています。|The boy is running.",
        "女|Woman|彼女は女の人です。|She is a woman.",
        "子|Child|子供が三人います。|I have three children.",
        "目|Eye|右の目が痛いです。|My right eye hurts.",
        "耳|Ear|耳が遠いです。|I am hard of hearing.",
        "口|Mouth|口を開けてください。|Please open your mouth.",
        "手|Hand|手を洗いましたか。|Did you wash your hands?",
        "足|Foot, Leg|足が疲れました。|My legs are tired.",
        "父|Father|父は家にいます。|My father is at home."
    ]},
    { name: "Places & School", items: [
        "学|Study, Learning|学校はどこですか。|Where is the school?",
        "校|School|あの学校は大きいです。|That school is big.",
        "生|Life, Birth|私は学生です。|I am a student.",
        "先|Before, Ahead|先生に聞きます。|I will ask the teacher.",
        "行|To go|銀行へ行きます。|I will go to the bank.",
        "来|To come|友達が来ました。|A friend came.",
        "見|To see|映画を見ます。|I watch a movie.",
        "食|To eat|食堂で食べます。|I eat at the cafeteria.",
        "飲|To drink|お茶を飲みます。|I drink tea.",
        "買|To buy|本を買いました。|I bought a book."
    ]}
];

// 3. Grammar (40 total: 8 per category * 5 categories)
const grammarCategories = [
    { name: "Basic Sentence Structure", items: [
        "AはBです。|A is B.|私は学生です。|I am a student.",
        "AはBですか。|Is A B?|あなたは先生ですか。|Are you a teacher?",
        "AはBではありません。|A is not B.|これは私の本ではありません。|This is not my book.",
        "AのB|B of A (A's B)|私の車は古いです。|My car is old.",
        "Aも|A also|私も行きます。|I will also go.",
        "AとB|A and B|猫と犬が好きです。|I like cats and dogs.",
        "AやB|A and B (etc.)|本やノートを買いました。|I bought books and notebooks.",
        "Aがあります。|There is A (inanimate).|机の上に本があります。|There is a book on the desk."
    ]},
    { name: "Particles", items: [
        "〜が|Subject marker|雨が降っています。|It is raining.",
        "〜を|Object marker|水を飲みます。|I drink water.",
        "〜に (Time/Target)|At/To ~|三時に起きます。|I wake up at three.",
        "〜へ|Direction to ~|学校へ行きます。|I go to school.",
        "〜で (Location of action)|At/In ~|レストランで食べます。|I eat at the restaurant.",
        "〜で (Means)|By/With ~|バスで来ました。|I came by bus.",
        "〜から|From ~|九時から勉強します。|I will study from nine.",
        "〜まで|Until ~|五時まで働きます。|I work until five."
    ]},
    { name: "Verb Forms", items: [
        "〜ます|Verb (polite present)|毎朝コーヒーを飲みます。|I drink coffee every morning.",
        "〜ません|Verb (polite negative)|お酒は飲みません。|I don't drink alcohol.",
        "〜ました|Verb (polite past)|昨日映画を見ました。|I saw a movie yesterday.",
        "〜ませんでした|Verb (polite past negative)|昨日は勉強しませんでした。|I didn't study yesterday.",
        "〜ましょう|Let's ~|一緒に帰りましょう。|Let's go home together.",
        "〜ましょうか|Shall we ~?|手伝いましょうか。|Shall I help you?",
        "〜てください|Please ~|ここに書いてください。|Please write here.",
        "〜ています|Is ~ing (present progressive)|今テレビを見ています。|I am watching TV now."
    ]},
    { name: "Adjectives", items: [
        "〜い (i-adjective present)|Is ~|この本は面白いです。|This book is interesting.",
        "〜くない (i-adjective negative)|Is not ~|この部屋は広くないです。|This room is not wide.",
        "〜かった (i-adjective past)|Was ~|昨日は暑かったです。|It was hot yesterday.",
        "〜くなかった (i-adjective past negative)|Was not ~|映画は面白くなかったです。|The movie wasn't interesting.",
        "〜な (na-adjective modifier)|Is ~|静かな町です。|It is a quiet town.",
        "〜です (na-adjective present)|Is ~|この公園はきれいです。|This park is beautiful.",
        "〜ではありません (na-adjective negative)|Is not ~|彼は有名ではありません。|He is not famous.",
        "〜でした (na-adjective past)|Was ~|昨日のテストは簡単でした。|Yesterday's test was easy."
    ]},
    { name: "Questions & Requests", items: [
        "何|What|それは何ですか。|What is that?",
        "誰|Who|あの人は誰ですか。|Who is that person?",
        "どこ|Where|トイレはどこですか。|Where is the restroom?",
        "いつ|When|いつ日本へ来ましたか。|When did you come to Japan?",
        "どうして|Why|どうして昨日休みましたか。|Why were you absent yesterday?",
        "どう|How|日本の生活はどうですか。|How is life in Japan?",
        "どれ|Which (one of 3+)|あなたの傘はどれですか。|Which one is your umbrella?",
        "どの〜|Which ~|どの電車に乗りますか。|Which train will you get on?"
    ]}
];

// 4. Sentences (60 total: 10 per category * 6 categories)
const sentenceCategories = [
    { name: "Daily Conversation", items: [
        "おはようございます。|Good morning.",
        "こんにちは。|Hello / Good afternoon.",
        "こんばんは。|Good evening.",
        "おやすみなさい。|Good night.",
        "ありがとうございます。|Thank you very much.",
        "すみません。|Excuse me / I'm sorry.",
        "お元気ですか。|How are you?",
        "はい、元気です。|Yes, I am fine.",
        "はじめまして。|How do you do?",
        "よろしくお願いします。|Nice to meet you / Please take care of me."
    ]},
    { name: "Classroom & School", items: [
        "先生、質問があります。|Teacher, I have a question.",
        "分かりません。|I don't understand.",
        "もう一度言ってください。|Please say it one more time.",
        "ゆっくり話してください。|Please speak slowly.",
        "少し待ってください。|Please wait a little.",
        "これは日本語で何ですか。|What is this in Japanese?",
        "宿題を出してください。|Please submit your homework.",
        "本を開けてください。|Please open your books.",
        "テストを始めます。|We will begin the test.",
        "今日はこれで終わります。|We will finish here for today."
    ]},
    { name: "Shopping & Restaurant", items: [
        "いらっしゃいませ。|Welcome (to our store/restaurant).",
        "これをください。|Please give me this.",
        "いくらですか。|How much is it?",
        "それは五百円です。|That is 500 yen.",
        "メニューをお願いします。|The menu, please.",
        "水をください。|Please give me some water.",
        "とても美味しいです。|It is very delicious.",
        "カードで払えますか。|Can I pay by card?",
        "ごちそうさまでした。|Thank you for the meal.",
        "また来ます。|I will come again."
    ]},
    { name: "Directions & Travel", items: [
        "駅はどこですか。|Where is the station?",
        "まっすぐ行ってください。|Please go straight.",
        "右に曲がってください。|Please turn right.",
        "銀行の隣にあります。|It is next to the bank.",
        "歩いて五分かかります。|It takes five minutes on foot.",
        "バスで来ましたか。|Did you come by bus?",
        "いいえ、電車で来ました。|No, I came by train.",
        "切符を買います。|I will buy a ticket.",
        "京都までいくらですか。|How much is it to Kyoto?",
        "次の駅で降ります。|I will get off at the next station."
    ]},
    { name: "Family & People", items: [
        "私の家族は四人です。|There are four people in my family.",
        "父と母と妹と私です。|It's my father, mother, younger sister, and me.",
        "父は会社員です。|My father is an office worker.",
        "母は先生です。|My mother is a teacher.",
        "妹は中学生です。|My younger sister is a junior high school student.",
        "休みの日は家族と出かけます。|On days off, I go out with my family.",
        "あの人は山田さんです。|That person is Mr. Yamada.",
        "山田さんは日本人です。|Mr. Yamada is Japanese.",
        "彼は親切な人です。|He is a kind person.",
        "彼女は歌が上手です。|She is good at singing."
    ]},
    { name: "Mixed Reading Practice", items: [
        "日本の夏はとても暑いです。|Summer in Japan is very hot.",
        "毎日六時に起きて、朝ご飯を食べます。|I wake up at 6 every day and eat breakfast.",
        "週末は図書館で本を読みます。|I read books at the library on weekends.",
        "昨日は雨でしたから、どこも行きませんでした。|It rained yesterday, so I didn't go anywhere.",
        "日本料理の中で寿司が一番好きです。|Among Japanese dishes, I like sushi the best.",
        "来月、友達と一緒に京都へ行きます。|Next month, I will go to Kyoto with my friend.",
        "新しい靴を買いたいです。|I want to buy new shoes.",
        "あの高いビルの中に私の会社があります。|My company is inside that tall building.",
        "部屋が少し寒いですね。|The room is a little cold, isn't it?",
        "窓を閉めましょうか。|Shall I close the window?"
    ]}
];

// 5. Tests (100 questions total)
// We will auto-generate some predictable tests and add specific ones.

let questions = [];

// Quiz 1: Basic Words (MCQ - 20)
for (let i=0; i<20; i++) {
    let catIndex = i < 15 ? 0 : 1;
    let itemIndex = i < 15 ? i : i - 15;
    let cat = vocabCategories[catIndex];
    let item = cat.items[itemIndex];
    let parts = item.split('|');
    let qId = `n5-vocab-mcq-01-${String(i).padStart(3, '0')}`;
    let correct = parts[1];
    let distractorPool = cat.items.map(x => x.split('|')[1]).filter(x => x !== correct);
    let distractors = distractorPool.sort(() => 0.5 - Math.random()).slice(0,3);
    
    questions.push({
        id: qId,
        type: "MULTIPLE_CHOICE",
        category: "N5 Vocabulary Quiz 01 - Basic Words",
        prompt: `What does ${parts[0]} mean?`,
        image: null,
        options: [correct, ...distractors].sort(),
        correctValue: correct,
        explanation: `${parts[0]} means ${correct}.`,
        sourceCardIds: [`n5-vocab-${toSlug(cat.name)}-${String(itemIndex+1).padStart(3, '0')}`],
        tags: ["vocabulary", "mcq"]
    });
}

// Quiz 2: Verbs & Adjectives (MCQ - 20)
for (let i=0; i<20; i++) {
    let catIndex = i < 15 ? 6 : 7;
    let itemIndex = i < 15 ? i : i - 15;
    let cat = vocabCategories[catIndex];
    let item = cat.items[itemIndex];
    let parts = item.split('|');
    let qId = `n5-vocab-mcq-02-${String(i).padStart(3, '0')}`;
    let correct = parts[1];
    let distractorPool = cat.items.map(x => x.split('|')[1]).filter(x => x !== correct);
    let distractors = distractorPool.sort(() => 0.5 - Math.random()).slice(0,3);

    questions.push({
        id: qId,
        type: "MULTIPLE_CHOICE",
        category: "N5 Vocabulary Quiz 02 - Verbs & Adjectives",
        prompt: `What does ${parts[0]} mean?`,
        image: null,
        options: [correct, ...distractors].sort(),
        correctValue: correct,
        explanation: `${parts[0]} means ${correct}.`,
        sourceCardIds: [`n5-vocab-${toSlug(cat.name)}-${String(itemIndex+1).padStart(3, '0')}`],
        tags: ["vocabulary", "mcq"]
    });
}

// Quiz 3: Kanji Meaning (TRUE_FALSE - 30)
for (let i=0; i<30; i++) {
    let listIndex = Math.floor(i / 10);
    let itemIndex = i % 10;
    let cat = kanjiCategories[listIndex];
    let item = cat.items[itemIndex];
    let parts = item.split('|');
    let isTrue = i % 2 === 0;
    let promptMeaning = isTrue ? parts[1] : (kanjiCategories[(listIndex+1)%5].items[itemIndex].split('|')[1]);
    
    let qId = `n5-kanji-tf-01-${String(i).padStart(3, '0')}`;
    questions.push({
        id: qId,
        type: "TRUE_FALSE",
        category: "N5 Kanji Meaning Quiz 01",
        prompt: `Does the kanji ${parts[0]} mean "${promptMeaning}"?`,
        image: null,
        options: [],
        correctValue: isTrue,
        explanation: `The kanji ${parts[0]} means ${parts[1]}.`,
        sourceCardIds: [`n5-kanji-${toSlug(cat.name)}-${String(itemIndex+1).padStart(3, '0')}`],
        tags: ["kanji", "tf"]
    });
}

// Quiz 4: Grammar Particles (FILL_BLANK - 15)
const fbParticles = [
    { jp: "A: あの人は誰ですか。 B: あの人[ ]山田さんです。", ans: "は", source: "n5-grammar-basic-sentence-structure-001" },
    { jp: "明日、東京[ ]行きます。", ans: "へ", source: "n5-grammar-particles-004" },
    { jp: "毎日、水[ ]飲みます。", ans: "を", source: "n5-grammar-particles-002" },
    { jp: "バス[ ]学校へ来ました。", ans: "で", source: "n5-grammar-particles-006" },
    { jp: "私は犬[ ]好きです。", ans: "が", source: "n5-grammar-particles-001" },
    { jp: "朝、六時[ ]起きます。", ans: "に", source: "n5-grammar-particles-003" },
    { jp: "これ[ ]私の本です。", ans: "は", source: "n5-grammar-basic-sentence-structure-001" },
    { jp: "休みの日は、友達[ ]話します。", ans: "と", source: "n5-grammar-basic-sentence-structure-006" },
    { jp: "冬休みは、どこ[ ]行きたいですか。", ans: "へ", source: "n5-grammar-particles-004" },
    { jp: "アメリカ[ ]来ました。", ans: "から", source: "n5-grammar-particles-007" },
    { jp: "夜、十時[ ]働きます。", ans: "まで", source: "n5-grammar-particles-008" },
    { jp: "机の[ ]に本があります。", ans: "上", source: "n5-vocab-places-directions-005" },
    { jp: "山田さんは学生です。私[ ]学生です。", ans: "も", source: "n5-grammar-basic-sentence-structure-005" },
    { jp: "A: 誰[ ]来ましたか。 B: 山田さんが来ました。", ans: "が", source: "n5-grammar-questions-requests-002" },
    { jp: "ペン[ ]手紙を書きます。", ans: "で", source: "n5-grammar-particles-006" },
];

for (let i=0; i<15; i++) {
    questions.push({
        id: `n5-grammar-fb-01-${String(i).padStart(3, '0')}`,
        type: "FILL_BLANK",
        category: "N5 Grammar Quiz 01 - Particles",
        prompt: `Fill in the missing particle: ${fbParticles[i].jp}`,
        image: null,
        options: [],
        correctValue: fbParticles[i].ans,
        explanation: `The correct particle is ${fbParticles[i].ans}.`,
        sourceCardIds: [fbParticles[i].source],
        tags: ["grammar", "fb"]
    });
}

// Quiz 5: Mixed Practice (FILL_BLANK - 15)
const fbMixed = [
    { jp: "昨日、映画を[ ]。", ans: "見ました", source: "n5-grammar-verb-forms-003" },
    { jp: "明日は[ ]です。", ans: "休み", source: "n5-vocab-time-dates-002" },
    { jp: "コーヒーを[ ]ませんか。", ans: "飲み", source: "n5-vocab-basic-verbs-005" },
    { jp: "暑いですね。窓を[ ]ください。", ans: "開けて", source: "n5-grammar-verb-forms-007" },
    { jp: "日本の夏はとても[ ]です。", ans: "暑い", source: "n5-vocab-adjectives-007" },
    { jp: "あの[ ]は誰ですか。", ans: "人", source: "n5-vocab-people-family-001" },
    { jp: "すみません、銀行は[ ]ですか。", ans: "どこ", source: "n5-grammar-questions-requests-003" },
    { jp: "スーパーでりんごを[ ]買いました。", ans: "三つ", source: "n5-vocab-numbers-counters-003" },
    { jp: "私は日本[ ]です。", ans: "人", source: "n5-kanji-people-body-001" },
    { jp: "昨日、友達に手紙を[ ]。", ans: "書きました", source: "n5-vocab-basic-verbs-009" },
    { jp: "毎日、音楽を[ ]ます。", ans: "聞き", source: "n5-vocab-basic-verbs-007" },
    { jp: "週末は[ ]へ行きましたか。", ans: "どこ", source: "n5-grammar-questions-requests-003" },
    { jp: "このカメラは[ ]です。昨日買いました。", ans: "新しい", source: "n5-vocab-adjectives-003" },
    { jp: "時計は[ ]にあります。", ans: "机の上", source: "n5-vocab-places-directions-005" },
    { jp: "日本語のテストは[ ]ですか。", ans: "難しい", source: "n5-vocab-adjectives-013" },
];

for (let i=0; i<15; i++) {
    questions.push({
        id: `n5-grammar-fb-02-${String(i).padStart(3, '0')}`,
        type: "FILL_BLANK",
        category: "N5 Mixed Practice Test 01",
        prompt: `Fill in the blank: ${fbMixed[i].jp}`,
        image: null,
        options: [],
        correctValue: fbMixed[i].ans,
        explanation: `The correct answer is ${fbMixed[i].ans}.`,
        sourceCardIds: [fbMixed[i].source],
        tags: ["mixed", "fb"]
    });
}

// Builder functions
function toSlug(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const pack = {
    packId: "jlpt-n5-en-pilot-v1",
    schemaVersion: 1,
    version: "0.1.0",
    level: "N5",
    language: "en",
    title: "JLPT N5 English Pilot Pack",
    description: "A curated JLPT N5 starter pack for vocabulary, kanji, grammar, sentence reading, and tests.",
    decks: [],
    tests: []
};

// Compile Vocabulary
vocabCategories.forEach((cat, cIdx) => {
    let deck = {
        id: `n5-vocab-${toSlug(cat.name)}`,
        title: `N5 Vocabulary - ${cat.name}`,
        type: "vocabulary",
        level: "N5",
        category: cat.name,
        description: `Common N5 vocabulary for ${cat.name}.`,
        cards: []
    };
    cat.items.forEach((item, iIdx) => {
        let parts = item.split('|');
        deck.cards.push({
            id: `${deck.id}-${String(iIdx+1).padStart(3, '0')}`,
            type: "vocabulary",
            level: "N5",
            category: cat.name,
            front: parts[0],
            back: parts[1],
            exampleJp: parts[2],
            exampleTranslation: parts[3],
            tags: ["vocabulary", "n5", toSlug(cat.name)]
        });
    });
    pack.decks.push(deck);
});

// Compile Kanji
kanjiCategories.forEach((cat, cIdx) => {
    let deck = {
        id: `n5-kanji-${toSlug(cat.name)}`,
        title: `N5 Kanji - ${cat.name}`,
        type: "kanji",
        level: "N5",
        category: cat.name,
        description: `Common N5 kanji for ${cat.name}.`,
        cards: []
    };
    cat.items.forEach((item, iIdx) => {
        let parts = item.split('|');
        deck.cards.push({
            id: `${deck.id}-${String(iIdx+1).padStart(3, '0')}`,
            type: "kanji",
            level: "N5",
            category: cat.name,
            front: parts[0],
            back: parts[1],
            exampleJp: parts[2],
            exampleTranslation: parts[3],
            tags: ["kanji", "n5", toSlug(cat.name)]
        });
    });
    pack.decks.push(deck);
});

// Compile Grammar
grammarCategories.forEach((cat, cIdx) => {
    let deck = {
        id: `n5-grammar-${toSlug(cat.name)}`,
        title: `N5 Grammar - ${cat.name}`,
        type: "grammar",
        level: "N5",
        category: cat.name,
        description: `Common N5 grammar for ${cat.name}.`,
        cards: []
    };
    cat.items.forEach((item, iIdx) => {
        let parts = item.split('|');
        deck.cards.push({
            id: `${deck.id}-${String(iIdx+1).padStart(3, '0')}`,
            type: "grammar",
            level: "N5",
            category: cat.name,
            front: parts[0],
            back: parts[1],
            exampleJp: parts[2],
            exampleTranslation: parts[3],
            tags: ["grammar", "n5", toSlug(cat.name)]
        });
    });
    pack.decks.push(deck);
});

// Compile Sentences
sentenceCategories.forEach((cat, cIdx) => {
    let deck = {
        id: `n5-sentences-${toSlug(cat.name)}`,
        title: `N5 Sentences - ${cat.name}`,
        type: "sentence",
        level: "N5",
        category: cat.name,
        description: `Common N5 sentences for ${cat.name}.`,
        cards: []
    };
    cat.items.forEach((item, iIdx) => {
        let parts = item.split('|');
        deck.cards.push({
            id: `${deck.id}-${String(iIdx+1).padStart(3, '0')}`,
            type: "sentence",
            level: "N5",
            category: cat.name,
            front: parts[0],
            back: parts[1],
            // Omit example fields for pure sentence cards
            tags: ["sentence", "n5", toSlug(cat.name)]
        });
    });
    pack.decks.push(deck);
});

// Compile Tests into groups
const testMap = new Map();
questions.forEach(q => {
    if (!testMap.has(q.category)) {
        testMap.set(q.category, {
            id: `n5-test-${toSlug(q.category)}`,
            title: q.category,
            level: "N5",
            type: q.type, // primary type or MIXED
            category: "Quiz",
            questions: []
        });
    }
    testMap.get(q.category).questions.push(q);
});

pack.tests = Array.from(testMap.values());

fs.mkdirSync(path.join(__dirname, '..', 'src', 'data', 'study-packs', 'en'), { recursive: true });
const outPath = path.join(__dirname, '..', 'src', 'data', 'study-packs', 'en', 'jlpt_n5_pilot_pack.json');
fs.writeFileSync(outPath, JSON.stringify(pack, null, 2));

console.log("JSON generated successfully at: " + outPath);
