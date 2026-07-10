function stableHash(value) {
    let hash = 2166136261;
    for (let i = 0; i < value.length; i++) {
        hash ^= value.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
}

function sortStrings(values) {
    return values.slice().sort((a, b) => a < b ? -1 : (a > b ? 1 : 0));
}

function meaningGroup(value) {
    const v = value.toLowerCase();
    if (v.startsWith('to ')) return 'verb';
    if (/monday|tuesday|wednesday|thursday|friday|saturday|sunday|today|tomorrow|yesterday|morning|evening|night|week|month|year|o'clock|minute|hour|time/.test(v)) return 'time';
    if (/father|mother|brother|sister|person|student|teacher|employee|doctor|engineer|friend|child|man|woman|boy|girl|family|grand/.test(v)) return 'people';
    if (/one|two|three|four|five|six|seven|eight|nine|ten|hundred|thousand|many|few|little|lot|half/.test(v)) return 'quantity';
    if (/big|small|new|old|hot|cold|warm|cool|good|bad|expensive|cheap|easy|difficult|busy|free|quiet|beautiful|clean|dirty|fast|slow|long|short|wide|narrow/.test(v)) return 'adjective';
    return 'general';
}

function selectDistractors(sourceCard, cards, count) {
    const candidates = cards.filter(c => c.id !== sourceCard.id && c.back && c.back !== sourceCard.back);
    const sameGroup = candidates.filter(c => meaningGroup(c.back) === meaningGroup(sourceCard.back));
    const pool = sameGroup.length >= count ? sameGroup : candidates;
    const selected = [];
    const seen = new Set([sourceCard.back]);

    pool
        .map(c => ({ card: c, key: stableHash(sourceCard.id + '|' + c.id + '|' + c.back) }))
        .sort((a, b) => a.key - b.key || (a.card.id < b.card.id ? -1 : 1))
        .forEach(entry => {
            if (selected.length < count && !seen.has(entry.card.back)) {
                seen.add(entry.card.back);
                selected.push(entry.card.back);
            }
        });

    return selected;
}

const FILL_BLANK_SPECS = [
    [1, '私は学生[    ]。', 'です'],
    [2, '私は先生[    ]。', 'ではありません'],
    [3, '昨日はいい天気[    ]。', 'でした'],
    [4, '昨日は休み[    ]。', 'ではありませんでした'],
    [5, '毎日学校へ行き[    ]。', 'ます'],
    [6, '今日は肉を食べ[    ]。', 'ません'],
    [7, '昨日新しい本を買い[    ]。', 'ました'],
    [8, '昨日はテレビを見[    ]。', 'ませんでした'],
    [9, '今日[    ]天気がいいです。', 'は'],
    [10, '犬[    ]好きです。', 'が'],
    [11, '本[    ]読みます。', 'を'],
    [12, '三時[    ]行きます。', 'に'],
    [13, '東京[    ]着きました。', 'に'],
    [14, '友達[    ]会います。', 'に'],
    [15, 'あした学校[    ]行きます。', 'へ'],
    [16, 'バス[    ]行きます。', 'で'],
    [17, '公園[    ]遊びます。', 'で'],
    [18, 'パン[    ]卵を食べました。', 'と'],
    [19, '友達[    ]映画を見ます。', 'と'],
    [20, '私[    ]行きます。', 'も'],
    [21, 'それは私[    ]本です。', 'の'],
    [22, '大きい[    ]が欲しいです。', 'の'],
    [23, '会議は一時[    ]です。', 'から'],
    [24, '五時[    ]働きます。', 'まで'],
    [25, 'これは何です[    ]。', 'か'],
    [26, '[    ]はいくらですか。', 'これ'],
    [27, '[    ]を取ってください。', 'それ'],
    [28, '[    ]は私の車です。', 'あれ'],
    [29, 'あなたの傘は[    ]ですか。', 'どれ'],
    [30, '[    ]カメラは新しいです。', 'この'],
    [31, '[    ]本を見せてください。', 'その'],
    [32, '[    ]人はだれですか。', 'あの'],
    [33, '[    ]靴が好きですか。', 'どの'],
    [34, '[    ]は静かです。', 'ここ'],
    [35, '[    ]に座ってください。', 'そこ'],
    [36, '[    ]に犬がいます。', 'あそこ'],
    [37, 'トイレは[    ]ですか。', 'どこ'],
    [38, 'あの男の人は[    ]ですか。', 'だれ'],
    [39, '朝ご飯に[    ]を食べましたか。', '何'],
    [40, '誕生日は[    ]ですか。', 'いつ'],
    [41, 'この時計は[    ]ですか。', 'いくら'],
    [42, 'りんごを[    ]買いましたか。', 'いくつ'],
    [43, '日本の生活は[    ]ですか。', 'どう'],
    [44, '[    ]遅れましたか。', 'どうして'],
    [45, '机の上に本[    ]。', 'があります'],
    [46, '庭に猫[    ]。', 'がいます'],
    [47, '駅はあそこ[    ]。', 'にあります'],
    [48, '弟は部屋[    ]。', 'にいます'],
    [49, 'このお茶は[    ]。', '熱いです'],
    [50, 'このテストは[    ]。', '難しくないです'],
    [51, '昨日は[    ]。', '寒かったです'],
    [52, '昨日は仕事が[    ]。', '忙しくなかったです'],
    [53, 'この町は[    ]。', '静かです'],
    [54, '私は今日[    ]。', '暇ではありません'],
    [55, '昨日の映画は[    ]。', '有名でした'],
    [56, 'その本は[    ]。', '便利ではありませんでした'],
    [57, '新しいパソコン[    ]。', 'がほしいです'],
    [58, 'デパートへ服を買い[    ]。', 'に行きます'],
    [59, '友達が遊び[    ]。', 'に来ました'],
    [60, 'ここに名前を書いて[    ]。', 'ください'],
    [61, 'ここで写真を撮って[    ]。', 'もいいですか'],
    [62, 'このペンを使って[    ]よ。', 'もいいです'],
    [63, 'ここでタバコを吸って[    ]。', 'はいけません'],
    [64, '今、本を読んで[    ]。', 'います'],
    [65, '私は結婚して[    ]。', 'います'],
    [66, '日本へ行き[    ]。', 'たいです'],
    [67, '今日は働き[    ]。', 'たくないです'],
    [68, '一緒に帰り[    ]。', 'ましょう'],
    [69, '窓を開け[    ]。', 'ましょうか'],
    [70, '一緒にお茶を飲み[    ]。', 'ませんか'],
    [71, '忘れ[    ]。', 'ないでください'],
    [72, '明日早く起き[    ]。', 'なければなりません'],
    [73, '明日は学校に行か[    ]。', 'なくてもいいです'],
    [74, '日本へ行った[    ]。', 'ことがあります'],
    [75, '日曜日は映画を見たり、本を読んだり[    ]。', 'します'],
    [76, 'この漢字の読み[    ]がわかりません。', '方'],
    [77, '寝る[    ]、歯を磨きます。', '前に'],
    [78, '勉強の[    ]、遊びます。', '後で'],
    [79, '子供の[    ]、よく泣きました。', '時'],
    [80, '音楽を聞き[    ]勉強します。', 'ながら'],
    [81, '今日は昨日[    ]暑いです。', 'より'],
    [82, '肉[    ]魚より好きです。', 'の方が'],
    [83, '果物の中でりんごが[    ]好きです。', 'いちばん'],
    [84, '忙しいです[    ]、行きません。', 'から'],
    [85, '古いです[    ]きれいです。', 'が、'],
    [86, '薬を飲んだ[    ]、まだ痛いです。', 'けど'],
    [87, 'ご飯を食べました。[    ]、寝ました。', 'そして'],
    [88, '本を読みます。[    ]、手紙を書きます。', 'それから'],
    [89, '日本料理は好きです。[    ]、高いです。', 'でも'],
    [90, '明日はテストです。[    ]、勉強します。', 'ですから']
];

function makeFillBlankQuestions(grammarCards, packId) {
    const cardsByNumber = new Map(grammarCards.map(c => [Number(c.id.split('-g-')[1]), c]));
    return FILL_BLANK_SPECS.map((spec, index) => {
        const [cardNumber, promptJp, correctValue] = spec;
        const sourceCard = cardsByNumber.get(cardNumber);
        if (!sourceCard) throw new Error('Missing grammar card for fill blank: ' + cardNumber);
        return {
            id: packId + '-q-fb-' + (index + 1),
            type: 'FILL_BLANK',
            prompt: 'Complete the sentence: ' + promptJp,
            image: null,
            correctValue,
            explanation: 'This completes the pattern ' + sourceCard.front + '.',
            sourceCardIds: [sourceCard.id],
            tags: ['grammar']
        };
    });
}

function generateTests(vocabCards, kanjiCards, grammarCards, sentenceCards, packId) {
    let mcqQs = [];
    let vocabIndex = 0;
    while(mcqQs.length < 130 && vocabIndex < vocabCards.length) {
        let sourceCard = vocabCards[vocabIndex];
        let distractors = selectDistractors(sourceCard, vocabCards, 3);
        if (distractors.length === 3) {
            let optArr = sortStrings([sourceCard.back].concat(distractors));
            mcqQs.push({
                id: packId + '-q-mcq-' + (mcqQs.length + 1),
                type: 'MULTIPLE_CHOICE',
                prompt: "What is the meaning of " + sourceCard.front + "?",
                image: null,
                correctValue: sourceCard.back,
                options: optArr,
                explanation: sourceCard.front + " means " + sourceCard.back + ".",
                sourceCardIds: [sourceCard.id],
                tags: ['vocabulary']
            });
        }
        vocabIndex++;
    }

    let tfKanjiQs = [];
    for(let i=0; i<40; i++) {
        let isTrue = i % 2 === 0; 
        let sourceCard = kanjiCards[i];
        let promptMeaning = sourceCard.back;
        if (!isTrue) {
            promptMeaning = kanjiCards[(i + 1) % kanjiCards.length].back;
        }
        tfKanjiQs.push({
            id: packId + '-q-tf-k-' + (tfKanjiQs.length + 1),
            type: 'TRUE_FALSE',
            prompt: "Does " + sourceCard.front + " mean " + promptMeaning + "?",
            image: null,
            correctValue: isTrue ? "true" : "false",
            explanation: sourceCard.front + " actually means " + sourceCard.back + ".",
            sourceCardIds: [sourceCard.id],
            tags: ['kanji']
        });
    }

    let tfSentenceQs = [];
    for(let i=0; i<40; i++) {
        let isTrue = i % 2 === 0; 
        let sourceCard = sentenceCards[i];
        let promptMeaning = sourceCard.back;
        if (!isTrue) {
            promptMeaning = sentenceCards[(i + 1) % sentenceCards.length].back;
        }
        tfSentenceQs.push({
            id: packId + '-q-tf-s-' + (tfSentenceQs.length + 1),
            type: 'TRUE_FALSE',
            prompt: "Does " + sourceCard.front + " translate to: " + promptMeaning + "?",
            image: null,
            correctValue: isTrue ? "true" : "false",
            explanation: "The correct translation is: " + sourceCard.back + ".",
            sourceCardIds: [sourceCard.id],
            tags: ['sentence']
        });
    }

    let fbQs = makeFillBlankQuestions(grammarCards, packId);

    let tests = [];
    let tIdx = 1;
    function addTest(title, category, questions, tags) {
        let type = "MIXED";
        if (questions.length > 0 && questions.every(q => q.type === questions[0].type)) {
            type = questions[0].type;
        }
        tests.push({
            id: packId + '-test-' + (tIdx < 10 ? '0' + tIdx : tIdx),
            title: title,
            level: "N5",
            type: type,
            category: category,
            tags: tags,
            questions: questions
        });
        tIdx++;
    }

    let mcqOffset = 0;
    for(let i=1; i<=8; i++) {
        addTest("N5 Vocabulary Quiz 0" + i, "Vocabulary", mcqQs.slice(mcqOffset, mcqOffset+12), ["vocabulary"]);
        mcqOffset += 12; 
    }
    
    let tfkOffset = 0;
    for(let i=1; i<=3; i++) {
        addTest("N5 Kanji Quiz 0" + i, "Kanji", tfKanjiQs.slice(tfkOffset, tfkOffset+10), ["kanji"]);
        tfkOffset += 10; 
    }

    let fbOffset = 0;
    for(let i=1; i<=5; i++) {
        addTest("N5 Grammar Quiz 0" + i, "Grammar", fbQs.slice(fbOffset, fbOffset+18), ["grammar"]);
        fbOffset += 18; 
    }

    let tfsOffset = 0;
    for(let i=1; i<=3; i++) {
        addTest("N5 Sentence Reading Quiz 0" + i, "Sentences", tfSentenceQs.slice(tfsOffset, tfsOffset+10), ["sentence"]);
        tfsOffset += 10; 
    }

    let mixedConfigs = [
        { mcq: 11, kanji: 3, sentence: 4 },
        { mcq: 11, kanji: 4, sentence: 3 },
        { mcq: 12, kanji: 3, sentence: 3 }
    ];
    for(let i=0; i<3; i++) {
        let qs = [];
        qs = qs.concat(mcqQs.slice(mcqOffset, mcqOffset + mixedConfigs[i].mcq));
        mcqOffset += mixedConfigs[i].mcq;
        
        qs = qs.concat(tfKanjiQs.slice(tfkOffset, tfkOffset + mixedConfigs[i].kanji));
        tfkOffset += mixedConfigs[i].kanji;
        
        qs = qs.concat(tfSentenceQs.slice(tfsOffset, tfsOffset + mixedConfigs[i].sentence));
        tfsOffset += mixedConfigs[i].sentence;

        addTest("N5 Mixed Practice Test 0" + (i+1), "Mixed", qs, ["mixed"]);
    }

    return tests;
}

module.exports = { generateTests };
