const fs = require('fs');
const path = require('path');

const shard_id = "n1-grammar-b-sentences-160";

// 90 grammar
const grammar_data = [
    {"front": "〜が早いか", "back": "as soon as; no sooner than", "exampleJp": "ベルが鳴るが早いか、生徒たちは教室を飛び出していった。", "exampleTranslation": "No sooner had the bell rung than the students rushed out of the classroom.", "tags": ["n1", "grammar"]},
    {"front": "〜や否や", "back": "the moment that; no sooner than", "exampleJp": "彼は帰宅するや否や、パソコンに向かって仕事を始めた。", "exampleTranslation": "The moment he returned home, he turned to his computer and started working.", "tags": ["n1", "grammar"]},
    {"front": "〜なり", "back": "as soon as (shows unexpected action)", "exampleJp": "犯人は警官の姿を見るなり、路地裏へ逃げ込んだ。", "exampleTranslation": "As soon as the culprit saw the police officer, he fled into the back alley.", "tags": ["n1", "grammar"]},
    {"front": "〜そばから", "back": "as soon as (often for repeating negative events)", "exampleJp": "毎日単語を覚えているが、覚えるそばから忘れてしまう。", "exampleTranslation": "I memorize words every day, but I forget them as soon as I learn them.", "tags": ["n1", "grammar"]},
    {"front": "〜てからというもの", "back": "ever since", "exampleJp": "娘が生まれてからというもの、彼の生活は子供中心になった。", "exampleTranslation": "Ever since his daughter was born, his life has revolved around his child.", "tags": ["n1", "grammar"]},
    {"front": "〜にあって", "back": "in the condition of; at the time of", "exampleJp": "深刻な不況下にあって、その企業はなお成長を続けている。", "exampleTranslation": "Even in the midst of a severe recession, that company continues to grow.", "tags": ["n1", "grammar"]},
    {"front": "〜に至るまで", "back": "even to; from A all the way down to B", "exampleJp": "履歴書の書き方から面接の作法に至るまで、丁寧に指導を受けた。", "exampleTranslation": "I received careful instruction on everything from how to write a resume to interview etiquette.", "tags": ["n1", "grammar"]},
    {"front": "〜を限りに", "back": "starting from (time); for the last time", "exampleJp": "本年度を限りに、この補助金制度は廃止されることとなった。", "exampleTranslation": "This subsidy system will be abolished at the end of this fiscal year.", "tags": ["n1", "grammar"]},
    {"front": "〜をもって", "back": "by means of; with; at (the time)", "exampleJp": "本日の営業は午後八時をもって終了させていただきます。", "exampleTranslation": "Today's business will conclude at 8:00 PM.", "tags": ["n1", "grammar"]},
    {"front": "〜といったところだ", "back": "at most; no more than", "exampleJp": "参加者は多くても数十人といったところだろう。", "exampleTranslation": "The number of participants will probably be a few dozen at most.", "tags": ["n1", "grammar"]},
    {"front": "〜をおいて", "back": "no one but; none other than", "exampleJp": "次期社長を任せられる人材は、彼をおいて他にはいない。", "exampleTranslation": "There is no one but him who can be entrusted with the position of the next president.", "tags": ["n1", "grammar"]},
    {"front": "〜ならでは", "back": "unique to; only possible with", "exampleJp": "地元の新鮮な食材を使った料理は、この旅館ならではの魅力だ。", "exampleTranslation": "Dishes using fresh local ingredients are an appeal unique to this inn.", "tags": ["n1", "grammar"]},
    {"front": "〜にとどまらず", "back": "not limited to; not stopping at", "exampleJp": "そのアニメは若者にとどまらず、幅広い世代から支持されている。", "exampleTranslation": "That anime is supported by a wide range of generations, not limited to just young people.", "tags": ["n1", "grammar"]},
    {"front": "〜はおろか", "back": "let alone; to say nothing of", "exampleJp": "彼は漢字はおろか、ひらがなさえ満足に書けない。", "exampleTranslation": "He cannot even write hiragana properly, let alone kanji.", "tags": ["n1", "grammar"]},
    {"front": "〜もさることながら", "back": "not only... but also", "exampleJp": "彼の提案はアイデアもさることながら、実現性の高さが評価された。", "exampleTranslation": "His proposal was praised not only for its ideas but also for its high feasibility.", "tags": ["n1", "grammar"]},
    {"front": "〜なり〜なり", "back": "either... or...", "exampleJp": "分からないことがあれば、先輩に聞くなり自分で調べるなりしてください。", "exampleTranslation": "If there is something you don't understand, either ask a senior colleague or look it up yourself.", "tags": ["n1", "grammar"]},
    {"front": "〜であれ〜であれ", "back": "whether A or B", "exampleJp": "晴天であれ雨天であれ、予定通り決行します。", "exampleTranslation": "Whether the weather is clear or rainy, we will carry it out as planned.", "tags": ["n1", "grammar"]},
    {"front": "〜といい〜といい", "back": "both... and...; speaking of", "exampleJp": "色といいデザインといい、この車は若者にぴったりだ。", "exampleTranslation": "Both in color and design, this car is perfect for young people.", "tags": ["n1", "grammar"]},
    {"front": "〜といわず〜といわず", "back": "not only A, but B; regardless of A or B", "exampleJp": "彼は平日といわず休日といわず、研究室にこもって実験を続けている。", "exampleTranslation": "He stays in the lab continuing his experiments regardless of whether it is a weekday or a holiday.", "tags": ["n1", "grammar"]},
    {"front": "〜いかんだ", "back": "depends on", "exampleJp": "今期の業績がいかんだによっては、ボーナスがカットされる可能性もある。", "exampleTranslation": "Depending on this term's performance, there is a possibility that bonuses will be cut.", "tags": ["n1", "grammar"]},
    {"front": "〜いかんによらず", "back": "regardless of", "exampleJp": "理由のいかんによらず、納入された商品の返品は受け付けません。", "exampleTranslation": "Regardless of the reason, we do not accept returns of delivered products.", "tags": ["n1", "grammar"]},
    {"front": "〜をものともせずに", "back": "ignoring; defying; in the face of", "exampleJp": "猛吹雪をものともせずに、救助隊は山へ向かった。", "exampleTranslation": "The rescue team headed toward the mountain, completely defying the severe blizzard.", "tags": ["n1", "grammar"]},
    {"front": "〜をよそに", "back": "despite; ignoring; paying no mind to", "exampleJp": "親の心配をよそに、彼女は一人で海外へ旅立った。", "exampleTranslation": "Ignoring her parents' worries, she departed alone for overseas.", "tags": ["n1", "grammar"]},
    {"front": "〜ならいざしらず", "back": "it might be different if; it's one thing if", "exampleJp": "新人ならいざしらず、ベテランの君がそんなミスをするとは信じられない。", "exampleTranslation": "It's one thing if a newcomer did it, but it is unbelievable that a veteran like you would make such a mistake.", "tags": ["n1", "grammar"]},
    {"front": "〜んばかりだ", "back": "looks as if; to the point of", "exampleJp": "彼女は今にも泣き出さんばかりの表情で私を見つめた。", "exampleTranslation": "She looked at me with an expression as if she were about to burst into tears at any moment.", "tags": ["n1", "grammar"]},
    {"front": "〜とばかりに", "back": "as if to say", "exampleJp": "彼は私の意見など聞く価値がないとばかりに、そっぽを向いた。", "exampleTranslation": "He turned away as if to say my opinion was not worth listening to.", "tags": ["n1", "grammar"]},
    {"front": "〜ともなく", "back": "without intending to; doing unconsciously", "exampleJp": "テレビを見るともなく見ていたら、故郷のニュースが流れてきた。", "exampleTranslation": "While I was idly watching television without really paying attention, news from my hometown came on.", "tags": ["n1", "grammar"]},
    {"front": "〜ながらに", "back": "while; in the same condition as", "exampleJp": "インターネットのおかげで、居ながらにして世界中の情報を得られるようになった。", "exampleTranslation": "Thanks to the internet, we can obtain information from all over the world while staying at home.", "tags": ["n1", "grammar"]},
    {"front": "〜きらいがある", "back": "to have a tendency to (negative)", "exampleJp": "彼は自分の意見に固執し、他人の意見を聞かないきらいがある。", "exampleTranslation": "He has a tendency to stick to his own opinions and not listen to the opinions of others.", "tags": ["n1", "grammar"]},
    {"front": "〜がてら", "back": "while; at the same time", "exampleJp": "散歩がてら、駅前のスーパーまで買い物に行ってくるよ。", "exampleTranslation": "I'm going shopping at the supermarket in front of the station while taking a walk.", "tags": ["n1", "grammar"]},
    {"front": "〜かたがた", "back": "while; for the purpose of (formal)", "exampleJp": "出張かたがた、以前お世話になった先生にご挨拶に伺った。", "exampleTranslation": "While on a business trip, I paid a courtesy visit to a teacher who had helped me in the past.", "tags": ["n1", "grammar"]},
    {"front": "〜かたわら", "back": "while; besides doing", "exampleJp": "彼は会社勤めのかたわら、週末はボランティア活動に参加している。", "exampleTranslation": "In addition to working at a company, he participates in volunteer activities on weekends.", "tags": ["n1", "grammar"]},
    {"front": "〜ところを", "back": "despite the situation; during a certain state", "exampleJp": "お忙しいところをお集まりいただき、誠にありがとうございます。", "exampleTranslation": "Thank you very much for gathering despite being busy.", "tags": ["n1", "grammar"]},
    {"front": "〜ものを", "back": "if only... then; but", "exampleJp": "一言相談してくれれば手伝ったものを、どうして一人で抱え込んだんだ。", "exampleTranslation": "I would have helped if you had just asked for advice; why did you take it all on yourself?", "tags": ["n1", "grammar"]},
    {"front": "〜とはいえ", "back": "although; nonetheless", "exampleJp": "予算が確保できたとはいえ、まだまだ課題は山積みだ。", "exampleTranslation": "Although the budget has been secured, there is still a mountain of issues.", "tags": ["n1", "grammar"]},
    {"front": "〜といえども", "back": "even if it is", "exampleJp": "未成年といえども、社会のルールは守らなければならない。", "exampleTranslation": "Even minors must follow the rules of society.", "tags": ["n1", "grammar"]},
    {"front": "〜と思いきや", "back": "I thought... but", "exampleJp": "やっと仕事が終わったと思いきや、新たなトラブルが発生した。", "exampleTranslation": "Just when I thought work was finally over, a new problem occurred.", "tags": ["n1", "grammar"]},
    {"front": "〜にひきかえ", "back": "in contrast to", "exampleJp": "姉が几帳面なのにひきかえ、妹はとても大雑把な性格だ。", "exampleTranslation": "In contrast to her methodical older sister, the younger sister has a very rough-and-ready personality.", "tags": ["n1", "grammar"]},
    {"front": "〜にもまして", "back": "even more than", "exampleJp": "今年の夏は猛暑だが、それにもまして湿度の高さがこたえる。", "exampleTranslation": "This summer is sweltering, but the high humidity is even more draining.", "tags": ["n1", "grammar"]},
    {"front": "〜ないまでも", "back": "even if one doesn't", "exampleJp": "満点は取れないまでも、合格ラインには達したい。", "exampleTranslation": "Even if I can't get a perfect score, I want to reach the passing line.", "tags": ["n1", "grammar"]},
    {"front": "〜に至って", "back": "when it comes to; finally reaching a stage", "exampleJp": "事ここに至っては、もはや計画を白紙に戻すしかない。", "exampleTranslation": "Now that things have come to this, we have no choice but to start the plan from scratch.", "tags": ["n1", "grammar"]},
    {"front": "〜に至っては", "back": "as for; in the extreme case of", "exampleJp": "彼の遅刻癖はひどく、昨日に至っては会議が終わる頃に現れた。", "exampleTranslation": "His habit of being late is terrible; yesterday, to top it off, he showed up around the time the meeting was ending.", "tags": ["n1", "grammar"]},
    {"front": "〜始末だ", "back": "end up with a bad result", "exampleJp": "彼は借金を重ね、ついには家まで手放す始末だ。", "exampleTranslation": "He piled up debt and ended up even letting go of his house.", "tags": ["n1", "grammar"]},
    {"front": "〜っぱなしだ", "back": "leaving something in an improper state", "exampleJp": "水を出っぱなしにしておくと、もったいないですよ。", "exampleTranslation": "It is a waste to leave the water running.", "tags": ["n1", "grammar"]},
    {"front": "〜たりとも", "back": "not even (a day/a moment/etc.)", "exampleJp": "試合本番では、一瞬たりとも気を抜いてはいけない。", "exampleTranslation": "During the actual match, you must not let your guard down for even a single moment.", "tags": ["n1", "grammar"]},
    {"front": "〜すら", "back": "even", "exampleJp": "喉が痛くて、水すら飲み込むのが辛い状態だ。", "exampleTranslation": "My throat hurts so much that it is painful to swallow even water.", "tags": ["n1", "grammar"]},
    {"front": "〜だに", "back": "even just (doing)", "exampleJp": "あの穏やかな彼が犯罪に手を染めるなんて、想像するだに恐ろしい。", "exampleTranslation": "It is terrifying even to imagine that such a gentle man would turn to crime.", "tags": ["n1", "grammar"]},
    {"front": "〜にして", "back": "only because it's (somebody/something); in (a time/place)", "exampleJp": "プロの職人にして初めてできる、非常に繊細な技術だ。", "exampleTranslation": "It is a highly delicate technique that is only possible because of a professional craftsman.", "tags": ["n1", "grammar"]},
    {"front": "〜あっての", "back": "which owes everything to", "exampleJp": "読者あっての雑誌なのだから、アンケートの意見は真摯に受け止めたい。", "exampleTranslation": "Since the magazine owes everything to its readers, we want to take the survey opinions seriously.", "tags": ["n1", "grammar"]},
    {"front": "〜からある", "back": "as much as; over (quantity)", "exampleJp": "彼は１００キロからあるバーベルを軽々と持ち上げた。", "exampleTranslation": "He easily lifted a barbell weighing over 100 kilograms.", "tags": ["n1", "grammar"]},
    {"front": "〜までもない", "back": "there is no need to", "exampleJp": "こんな簡単な計算、わざわざ電卓を使うまでもない。", "exampleTranslation": "There is no need to go out of your way to use a calculator for such a simple calculation.", "tags": ["n1", "grammar"]},
    {"front": "〜までだ", "back": "that's the end of it; all one can do is", "exampleJp": "もし不合格なら、来年また挑戦するまでだ。", "exampleTranslation": "If I fail, all I can do is try again next year.", "tags": ["n1", "grammar"]},
    {"front": "〜ばそれまでだ", "back": "if... happens, then that's the end of it", "exampleJp": "いくら高価な時計でも、壊れてしまえばそれまでだ。", "exampleTranslation": "No matter how expensive the watch is, if it breaks, that's the end of it.", "tags": ["n1", "grammar"]},
    {"front": "〜にはあたらない", "back": "it's not worth; no need to", "exampleJp": "彼の才能を考えれば、今回の優勝も驚くにはあたらない。", "exampleTranslation": "Considering his talent, there is no need to be surprised by his victory this time.", "tags": ["n1", "grammar"]},
    {"front": "〜でなくてなんだろう", "back": "what else could it be but", "exampleJp": "自分の命を犠牲にして他人を救う。これが愛でなくてなんだろう。", "exampleTranslation": "Sacrificing one's own life to save others. If this is not love, what else could it be?", "tags": ["n1", "grammar"]},
    {"front": "〜に足る", "back": "worthy of", "exampleJp": "インターネット上の情報は、必ずしも信頼に足るとは限らない。", "exampleTranslation": "Information on the internet is not necessarily worthy of trust.", "tags": ["n1", "grammar"]},
    {"front": "〜に堪える", "back": "worth doing; withstand", "exampleJp": "この映画は、大人たちの鑑賞にも十分堪える深いテーマを持っている。", "exampleTranslation": "This movie has a deep theme that is well worth viewing by adults.", "tags": ["n1", "grammar"]},
    {"front": "〜といったらない", "back": "extremely; beyond words", "exampleJp": "富士山頂から見たご来光の美しさといったらない。", "exampleTranslation": "The beauty of the sunrise seen from the summit of Mount Fuji is beyond words.", "tags": ["n1", "grammar"]},
    {"front": "〜かぎりだ", "back": "feel extremely", "exampleJp": "長年親しんだこの町を離れるのは、寂しいかぎりだ。", "exampleTranslation": "It makes me feel extremely lonely to leave this town I have grown fond of over the years.", "tags": ["n1", "grammar"]},
    {"front": "〜極まる", "back": "extremely", "exampleJp": "確認もせずにクレームをつけるとは、失礼極まる態度だ。", "exampleTranslation": "Complaining without even checking the facts is an extremely rude attitude.", "tags": ["n1", "grammar"]},
    {"front": "〜極まりない", "back": "extremely", "exampleJp": "このような危険極まりない行為は、絶対に許されるものではない。", "exampleTranslation": "Such an extremely dangerous act can never be forgiven.", "tags": ["n1", "grammar"]},
    {"front": "〜とは", "back": "I didn't expect that; to think that", "exampleJp": "あの真面目な彼が無断欠勤するとは、何か事情があるに違いない。", "exampleTranslation": "To think that such a serious guy would take an unexcused absence, there must be some circumstance behind it.", "tags": ["n1", "grammar"]},
    {"front": "〜てやまない", "back": "deeply; from the bottom of one's heart", "exampleJp": "卒業生たちの今後の活躍を願ってやまない。", "exampleTranslation": "I sincerely wish for the future success of the graduates.", "tags": ["n1", "grammar"]},
    {"front": "〜に堪えない", "back": "cannot bear to", "exampleJp": "多くの犠牲者が出た今回の事故は、誠に痛恨の念に堪えない。", "exampleTranslation": "I cannot bear the regret over this accident, which resulted in many victims.", "tags": ["n1", "grammar"]},
    {"front": "〜を禁じ得ない", "back": "cannot help but", "exampleJp": "彼のあまりに無責任な発言には、怒りを禁じ得ない。", "exampleTranslation": "I cannot help but feel anger at his overly irresponsible remarks.", "tags": ["n1", "grammar"]},
    {"front": "〜を余儀なくされる", "back": "be forced to", "exampleJp": "資金難のため、そのプロジェクトは中止を余儀なくされた。", "exampleTranslation": "Due to a lack of funds, the project was forced to be canceled.", "tags": ["n1", "grammar"]},
    {"front": "〜と相まって", "back": "coupled with; together with", "exampleJp": "彼女の美しい声がピアノの旋律と相まって、観客を魅了した。", "exampleTranslation": "Her beautiful voice, coupled with the piano melody, fascinated the audience.", "tags": ["n1", "grammar"]},
    {"front": "〜に即して", "back": "in accordance with; adapted to", "exampleJp": "現場の実情に即した安全対策を講じる必要がある。", "exampleTranslation": "It is necessary to take safety measures in accordance with the actual conditions on site.", "tags": ["n1", "grammar"]},
    {"front": "〜にかこつけて", "back": "using as an excuse", "exampleJp": "彼は視察にかこつけて、海外旅行を楽しんでいた。", "exampleTranslation": "He enjoyed an overseas trip, using the inspection as an excuse.", "tags": ["n1", "grammar"]},
    {"front": "〜にかまけて", "back": "being too busy with", "exampleJp": "忙しさにかまけて、親への連絡をつい怠ってしまった。", "exampleTranslation": "Being too busy, I inadvertently neglected to contact my parents.", "tags": ["n1", "grammar"]},
    {"front": "〜に照らして", "back": "in light of", "exampleJp": "法に照らして、この行為は明確な違法行為と言える。", "exampleTranslation": "In light of the law, this act can be clearly called an illegal act.", "tags": ["n1", "grammar"]},
    {"front": "〜に則って", "back": "in accordance with", "exampleJp": "スポーツマンシップに則り、正々堂々と戦うことを誓います。", "exampleTranslation": "I pledge to fight fairly and squarely in accordance with sportsmanship.", "tags": ["n1", "grammar"]},
    {"front": "〜をひかえて", "back": "in preparation for; with ... coming up", "exampleJp": "入社式を明日にひかえ、新入社員たちは緊張した面持ちだ。", "exampleTranslation": "With the joining ceremony coming up tomorrow, the new employees look nervous.", "tags": ["n1", "grammar"]},
    {"front": "〜を踏まえて", "back": "based on; taking into account", "exampleJp": "先行研究の課題を踏まえ、本論文では新たな分析手法を提案する。", "exampleTranslation": "Taking into account the issues from previous research, this paper proposes a new analytical method.", "tags": ["n1", "grammar"]},
    {"front": "〜を経て", "back": "through; after experiencing", "exampleJp": "三年間の厳しい修行を経て、彼はようやく一人前の寿司職人になった。", "exampleTranslation": "After three years of rigorous training, he finally became a fully-fledged sushi chef.", "tags": ["n1", "grammar"]},
    {"front": "〜ゆえに", "back": "therefore; because of", "exampleJp": "知識が豊富であるゆえに、かえって決断に迷うこともある。", "exampleTranslation": "Because of abundant knowledge, one may instead hesitate in making a decision.", "tags": ["n1", "grammar"]},
    {"front": "〜んがため", "back": "in order to", "exampleJp": "彼は金銭を得んがために、友人を裏切るような真似をした。", "exampleTranslation": "He acted in a way that betrayed his friend in order to gain money.", "tags": ["n1", "grammar"]},
    {"front": "〜てみせる", "back": "I will definitely; I'll show you that I can", "exampleJp": "今度の大会では絶対に優勝してみせると、彼は力強く語った。", "exampleTranslation": "He spoke forcefully, saying he will definitely win the championship in the next tournament.", "tags": ["n1", "grammar"]},
    {"front": "〜にもほどがある", "back": "there is a limit to; go too far", "exampleJp": "いくら親しい仲でも、そのような冗談は悪ふざけにもほどがある。", "exampleTranslation": "No matter how close you are, such a joke goes too far as a prank.", "tags": ["n1", "grammar"]},
    {"front": "〜ようがない", "back": "there is no way to", "exampleJp": "パスワードを忘れてしまい、システムにログインしようがない。", "exampleTranslation": "I forgot my password, so there is no way for me to log into the system.", "tags": ["n1", "grammar"]},
    {"front": "〜べく", "back": "in order to; for the purpose of", "exampleJp": "彼は少しでも早く借金を返済すべく、昼夜を問わず働いている。", "exampleTranslation": "He is working day and night in order to repay his debts even a little sooner.", "tags": ["n1", "grammar"]},
    {"front": "〜べくもない", "back": "can't possibly", "exampleJp": "素人の私には、プロの技がどうなっているのか知るべくもない。", "exampleTranslation": "As an amateur, there is no way I could possibly know how the professional's techniques work.", "tags": ["n1", "grammar"]},
    {"front": "〜べからず", "back": "must not; should not", "exampleJp": "工事現場の入り口には、「関係者以外入るべからず」と書かれていた。", "exampleTranslation": "At the entrance of the construction site, it was written, 'Unauthorized persons must not enter.'", "tags": ["n1", "grammar"]},
    {"front": "〜べからざる", "back": "should not; cannot be", "exampleJp": "彼は政治家として許すべからざる失言をしてしまった。", "exampleTranslation": "He made a gaffe that should not be forgiven as a politician.", "tags": ["n1", "grammar"]},
    {"front": "〜まじき", "back": "must not; unbecoming of", "exampleJp": "患者の個人情報を漏らすなど、医療従事者にあるまじき行為だ。", "exampleTranslation": "Leaking patients' personal information is an act unbecoming of a healthcare professional.", "tags": ["n1", "grammar"]},
    {"front": "〜としたところで", "back": "even if", "exampleJp": "今さら謝罪したとしたところで、失われた信頼は取り戻せない。", "exampleTranslation": "Even if he were to apologize now, the lost trust cannot be regained.", "tags": ["n1", "grammar"]},
    {"front": "〜ならまだしも", "back": "it would be better if; it's one thing if", "exampleJp": "一度だけならまだしも、三度も同じミスをするとは呆れてしまう。", "exampleTranslation": "It would be one thing if it was only once, but making the same mistake three times is astonishing.", "tags": ["n1", "grammar"]},
    {"front": "〜たら最後", "back": "once ... happens, then", "exampleJp": "彼は一度マイクを握ったら最後、何時間でも歌い続ける。", "exampleTranslation": "Once he grabs a microphone, he continues singing for hours.", "tags": ["n1", "grammar"]},
    {"front": "〜てはかなわない", "back": "I can't stand it if", "exampleJp": "毎日こんなに遅くまで残業させられてはかなわない。", "exampleTranslation": "I can't stand being made to work overtime this late every day.", "tags": ["n1", "grammar"]},
    {"front": "〜を皮切りに", "back": "starting with", "exampleJp": "東京での公演を皮切りに、全国ツアーがスタートする。", "exampleTranslation": "Starting with the performance in Tokyo, the nationwide tour will begin.", "tags": ["n1", "grammar"]}
];

// 70 sentences
const sentence_texts = [
    ["少子高齢化に伴う労働力不足は、もはや一企業の問題にとどまらず、日本社会全体が直面する深刻な課題となっている。", "The labor shortage accompanying the declining birthrate and aging population is no longer a problem for a single company, but has become a serious issue facing Japanese society as a whole."],
    ["温暖化対策を推し進めるためには、政府による法整備もさることながら、市民一人ひとりの意識改革が不可欠だ。", "In order to promote global warming countermeasures, legal frameworks by the government are certainly important, but a change in mindset of each individual citizen is indispensable."],
    ["最近のAI技術の進歩は目覚ましく、これまで人間にしかできないと思われていた創造的な仕事すら、機械に代替されかねない。", "The recent progress in AI technology is remarkable, and even creative jobs that were previously thought to be possible only for humans could potentially be replaced by machines."],
    ["その画期的な新薬は、長年難病に苦しんできた患者たちにとって、まさに一筋の光明にほかならない。", "That epoch-making new drug is nothing but a ray of hope for patients who have suffered from incurable diseases for many years."],
    ["大規模な自然災害が発生した際、SNS上の真偽不明な情報が人々の不安を煽り、パニックを引き起こすきらいがある。", "When a large-scale natural disaster occurs, information of unknown authenticity on social media tends to fan people's anxiety and cause panic."],
    ["予算削減のあおりを受け、地方の公共交通機関は路線の縮小や廃止を余儀なくされているのが現状だ。", "Under the influence of budget cuts, local public transportation is currently being forced to reduce or abolish routes."],
    ["グローバル化が進む現代にあって、異文化を理解し尊重する姿勢は、ビジネスパーソンに必須の資質と言えよう。", "In today's increasingly globalized world, the attitude to understand and respect different cultures can be said to be an essential quality for business professionals."],
    ["消費者のプライバシー保護に対する意識が高まる中、企業は個人情報の取り扱いに細心の注意を払わなければならない。", "As consumer awareness of privacy protection grows, companies must pay the utmost attention to the handling of personal information."],
    ["自動運転技術の実用化に向けて、技術的な課題をクリアするだけでなく、事故時の法的責任の所在を明確にする必要がある。", "Towards the practical application of autonomous driving technology, it is necessary not only to clear technical challenges but also to clarify where legal responsibility lies in the event of an accident."],
    ["一度失われた自然環境を元の状態に戻すのは、莫大な時間と費用を要する至難の業である。", "Restoring a natural environment to its original state once it has been lost is a tremendously difficult task requiring enormous amounts of time and money."],
    ["再生可能エネルギーへの転換は、持続可能な社会を実現する上で避けて通れない道だ。", "The transition to renewable energy is an unavoidable path for realizing a sustainable society."],
    ["インターネットの普及により、誰もが容易に情報を発信できるようになった反面、デマや誹謗中傷が瞬く間に拡散するリスクも抱えている。", "While the spread of the internet has made it easy for anyone to transmit information, it also carries the risk of rumors and defamation spreading in the blink of an eye."],
    ["働き方改革の一環としてテレワークを導入する企業が増えたが、コミュニケーション不足による業務への支障を懸念する声も少なくない。", "An increasing number of companies have introduced telework as part of work-style reforms, but there are quite a few voices concerned about hindrances to operations due to a lack of communication."],
    ["遺伝子治療は医療の飛躍的な進歩をもたらす可能性がある一方で、生命の尊厳に関わる倫理的な問題を孕んでいる。", "Gene therapy holds the potential to bring about dramatic progress in medicine, but on the other hand, it is fraught with ethical issues concerning the dignity of life."],
    ["資源の乏しい我が国が国際社会で生き残るためには、科学技術の振興と優秀な人材の育成に投資するよりほかない。", "In order for our resource-poor country to survive in the international community, we have no choice but to invest in the promotion of science and technology and the development of excellent human resources."],
    ["現代の消費者は、単に商品の機能や価格だけでなく、その背後にある企業の社会的責任や環境への配慮を重視する傾向にある。", "Modern consumers tend to place importance not only on the functionality and price of products but also on the corporate social responsibility and environmental consideration behind them."],
    ["高齢者の運転による交通事故が多発している事態を受け、免許の自主返納を促すための制度拡充が急務となっている。", "In response to the frequent occurrence of traffic accidents caused by elderly drivers, expanding systems to encourage the voluntary return of driver's licenses has become an urgent task."],
    ["観光客の急増によってもたらされる経済効果の裏で、地域住民の生活環境の悪化という深刻な弊害が生じている。", "Behind the economic effects brought about by the surge in tourists, serious adverse effects such as the deterioration of the living environment for local residents are occurring."],
    ["ネットショッピングの需要拡大に伴い、物流業界ではドライバーの長時間労働や人手不足が常態化しており、抜本的な対策が求められている。", "With the expansion of demand for online shopping, long working hours and labor shortages for drivers have become chronic in the logistics industry, requiring drastic measures."],
    ["感染症のパンデミックを経験した我々は、これまでの当たり前の日常がいかに脆い土台の上に成り立っていたかを痛感させられた。", "Having experienced the pandemic of an infectious disease, we were made to keenly realize how fragile a foundation our previously taken-for-granted daily lives were built upon."],
    ["その政治家は、国民の強い批判をよそに、自らの信念を貫き通すと宣言した。", "Ignoring strong criticism from the public, the politician declared that he would stick to his own beliefs to the end."],
    ["昨今の異常気象は、地球温暖化がもたらす影響の深刻さを如実に物語っている。", "The extreme weather in recent years vividly illustrates the severity of the impacts brought about by global warming."],
    ["経済格差の拡大は、社会の分断を招き、民主主義の根幹を揺るがしかねない重大な問題だ。", "The widening of economic disparity is a serious problem that could lead to social division and shake the very foundations of democracy."],
    ["都市部への人口集中が加速する一方で、地方では過疎化と高齢化が同時進行し、集落の存続すら危ぶまれている。", "While population concentration in urban areas accelerates, depopulation and aging are progressing simultaneously in rural areas, to the point where even the survival of villages is in danger."],
    ["膨大なデータを瞬時に解析するAIの登場は、医療現場における診断の精度と速度を飛躍的に向上させた。", "The advent of AI capable of instantaneously analyzing vast amounts of data has dramatically improved the accuracy and speed of diagnoses in medical settings."],
    ["キャッシュレス決済の普及は利便性をもたらす半面、システム障害が発生した際の社会的混乱のリスクを浮き彫りにした。", "The spread of cashless payments provides convenience, but on the flip side, it has highlighted the risk of social chaos in the event of a system failure."],
    ["多様な価値観が交錯する現代において、単一の正解を求める教育から、自ら問いを立てて解決する力を養う教育への転換が必要だ。", "In modern times where diverse values intersect, there is a need for a shift from education seeking a single correct answer to education that cultivates the ability to ask one's own questions and solve them."],
    ["食料自給率の低下に歯止めをかけるためには、農業の担い手不足を解消し、持続可能な農業経営を支援する政策が不可欠である。", "To put the brakes on the decline in the food self-sufficiency rate, policies that resolve the shortage of agricultural workers and support sustainable farm management are essential."],
    ["企業のコンプライアンス違反は、社会的信用の失墜にとどまらず、企業の存続そのものを危うくする。", "A company's compliance violations not only result in a loss of social credibility but also endanger the very survival of the company."],
    ["宇宙開発は、未知の世界への探求というロマンもさることながら、地球規模の課題解決につながる実用的な側面も持ち合わせている。", "Space exploration is certainly romantic as a quest into the unknown, but it also possesses a practical aspect that leads to the resolution of global issues."],
    ["現代人は情報過多の環境に置かれており、必要な情報と不必要な情報を取捨選択するリテラシーが求められている。", "People today are placed in an environment of information overload and are required to have the literacy to select necessary information and discard unnecessary information."],
    ["長引く不況の中で、企業は目先の利益を追求するあまり、将来を見据えた研究開発投資を怠るきらいがある。", "In the midst of a prolonged recession, companies tend to neglect forward-looking research and development investments due to pursuing short-term profits too much."],
    ["外国人労働者の受け入れ拡大は、労働力不足の緩和に寄与する反面、日本語教育や生活支援といった課題も突きつけている。", "While expanding the acceptance of foreign workers contributes to alleviating labor shortages, it also poses challenges such as Japanese language education and livelihood support."],
    ["過去の失敗から教訓を汲み取り、次なるイノベーションの糧とすることこそ、企業が成長し続けるための要諦である。", "Drawing lessons from past failures and making them the nourishment for the next innovation is precisely the key to a company continuing to grow."],
    ["児童虐待の悲惨な事件が後を絶たない現状にあって、地域社会全体で子どもを見守るネットワークの構築が急がれる。", "In the current situation where tragic incidents of child abuse are unending, the construction of a network to watch over children across the entire local community is urgently needed."],
    ["テクノロジーの進化が雇用のあり方を根本から変えようとしている今、生涯にわたって学び続ける姿勢が不可欠となっている。", "Now that the evolution of technology is fundamentally trying to change the nature of employment, a lifelong attitude of continuous learning has become indispensable."],
    ["文化財の保存と公開は、過去の歴史を後世に伝える重要な使命であると同時に、観光資源としての価値も高く評価されている。", "The preservation and public exhibition of cultural properties is an important mission to pass past history on to future generations, and at the same time, its value as a tourism resource is highly evaluated."],
    ["匿名性を盾にしたネット上の誹謗中傷は、被害者に回復困難な精神的苦痛を与えるものであり、決して許されるべきではない。", "Online slander using anonymity as a shield inflicts severely hard-to-recover psychological pain on victims and must never be forgiven."],
    ["国際社会が協調して気候変動問題に取り組まない限り、地球規模の環境破壊を食い止めることは不可能に近い。", "Unless the international community works together to tackle the issue of climate change, it is nearly impossible to halt global environmental destruction."],
    ["現代の医療は、単に病気を治すことにとどまらず、患者の生活の質（QOL）の向上を重視する方向へシフトしている。", "Modern medicine is shifting toward a direction that emphasizes improving the patient's quality of life (QOL), rather than stopping merely at curing diseases."],
    ["女性の社会進出を阻む見えない壁を打ち破るには、制度の充実だけでなく、職場における無意識の偏見を払拭する必要がある。", "To break down the invisible walls hindering women's social advancement, it is necessary not only to improve systems but also to wipe out unconscious biases in the workplace."],
    ["選挙の投票率低下は、国民の政治に対する無関心の表れであり、民主主義の機能不全を招きかねない。", "The decline in voter turnout in elections is a manifestation of public apathy toward politics and could invite a malfunction of democracy."],
    ["動物の権利を尊重する観点から、化粧品開発における動物実験を廃止する動きが世界的に広がりつつある。", "From the perspective of respecting animal rights, the movement to abolish animal testing in cosmetics development is spreading globally."],
    ["地方創生の鍵は、その土地ならではの魅力を再発掘し、外部からの多様な人材を呼び込むことにある。", "The key to regional revitalization lies in rediscovering the unique charms of the area and attracting diverse human resources from the outside."],
    ["サイバー攻撃の手口が巧妙化する中、企業は情報セキュリティ対策を経営の最重要課題の一つとして位置づけるべきだ。", "As methods of cyberattacks become more sophisticated, companies should position information security measures as one of their most important management issues."],
    ["貧困の連鎖を断ち切るためには、親の所得格差が子どもの教育格差につながらないよう、公的な支援を拡充することが求められる。", "In order to break the chain of poverty, it is required to expand public support so that parents' income disparity does not lead to educational disparity for children."],
    ["科学技術の恩恵を享受する一方で、私たちはそれがもたらす予期せぬ副作用にも常に目を向けておかなければならない。", "While enjoying the benefits of science and technology, we must also always keep our eyes on the unexpected side effects they bring about."],
    ["従業員のメンタルヘルス対策は、もはや個人の自己管理の問題ではなく、企業が果たすべき安全配慮義務の一環である。", "Mental health measures for employees are no longer a matter of individual self-management, but a part of the safety-care obligation that companies must fulfill."],
    ["表現の自由は民主主義の根幹をなす権利だが、他者の人権を侵害するような言説までもが保護されるわけではない。", "Freedom of expression is a right forming the foundation of democracy, but that does not mean even discourse that infringes on the human rights of others is protected."],
    ["過度な競争主義は、人々にストレスをもたらし、社会全体の活力を削ぐ要因となり得ることが指摘されている。", "It has been pointed out that excessive competitiveness can bring stress to people and become a factor that drains the vitality of society as a whole."],
    ["新興国の経済成長が世界経済の牽引力となる一方で、先進国との摩擦や環境問題の深刻化といった課題も生み出している。", "While the economic growth of emerging nations serves as a driving force for the global economy, it is also creating challenges such as friction with developed nations and the exacerbation of environmental problems."],
    ["臓器移植をめぐる倫理的ジレンマは、医学的知識だけで解決できるものではなく、社会全体で議論を深める必要がある。", "The ethical dilemmas surrounding organ transplants cannot be resolved solely with medical knowledge; there is a need to deepen discussion across society as a whole."],
    ["消費者が環境に配慮した製品を積極的に選ぶ「エシカル消費」が、企業の環境対策を後押しする大きな原動力となっている。", "'Ethical consumption,' in which consumers actively choose environmentally friendly products, has become a major driving force backing up corporate environmental measures."],
    ["伝統工芸の継承者を育成するためには、技術の伝承だけでなく、現代のニーズに合った新たな価値を創造する支援が欠かせない。", "To train successors for traditional crafts, not only the transmission of techniques but also support for creating new value that meets modern needs is indispensable."],
    ["災害からの復興過程においては、単にインフラを再建するだけでなく、住民のコミュニティをどう再生するかが最大の課題となる。", "In the recovery process from disasters, the biggest challenge is not simply rebuilding infrastructure, but how to regenerate residents' communities."],
    ["グローバル人材の育成を急ぐあまり、自国の歴史や文化に対する深い理解が疎かになることは避けなければならない。", "We must avoid a situation where a deep understanding of our own history and culture is neglected due to rushing to develop global human resources."],
    ["SNSの普及により、誰もがメディアとしての機能を持つようになった今、情報の真偽を見極めるメディアリテラシーの重要性が増している。", "Now that the spread of social media has given everyone the function of the media, the importance of media literacy to discern the authenticity of information is increasing."],
    ["終身雇用制度の崩壊に伴い、労働者は会社に依存するのではなく、自らのキャリアを主体的に構築していくことが求められている。", "With the collapse of the lifetime employment system, workers are required not to depend on the company, but to proactively build their own careers."],
    ["プラスチックごみによる海洋汚染は深刻なレベルに達しており、国際的な枠組みによる厳しい規制が待ったなしの状況だ。", "Marine pollution from plastic waste has reached a serious level, and it is a situation that cannot wait for strict regulations through international frameworks."],
    ["企業の不祥事を防ぐためには、内部通報制度を形骸化させず、通報者が不利益を被らないような実効性のある保護策が必要である。", "In order to prevent corporate scandals, the internal reporting system must not be reduced to a mere shell, and effective protection measures are necessary so that whistleblowers do not suffer disadvantages."],
    ["デジタル通貨の導入は、金融システムの効率化を促進する一方で、サイバーセキュリティ上の新たな脅威をもたらす懸念がある。", "The introduction of digital currencies promotes the efficiency of the financial system, but on the other hand, there are concerns that it will bring new threats regarding cybersecurity."],
    ["医療費の増大を抑制するためには、病気になってから治療するのではなく、病気を未然に防ぐ予防医学へのパラダイムシフトが必要だ。", "In order to curb the increase in medical expenses, a paradigm shift is necessary toward preventive medicine, which prevents illnesses before they happen, rather than treating them after one gets sick."],
    ["著作権法は、クリエイターの権利を保護し創作活動を奨励する目的がある一方で、情報の自由な流通を阻害しないようバランスをとる必要がある。", "While copyright law aims to protect creators' rights and encourage creative activities, there is a need to strike a balance so as not to hinder the free flow of information."],
    ["リモートワークの普及によって通勤の負担は軽減されたが、その反面、仕事とプライベートの境界が曖昧になり、メンタル不調を訴える人もいる。", "The spread of remote work has eased the burden of commuting, but on the flip side, the boundary between work and private life has become blurred, and some people complain of mental unwellness."],
    ["再生医療の実用化は、これまで治療法がなかった難病の患者に希望を与える画期的な出来事である。", "The practical application of regenerative medicine is an epoch-making event that gives hope to patients with incurable diseases for which there were previously no treatments."],
    ["現代社会において、多様性を認め合い、異なる背景を持つ人々が共生できるインクルーシブな環境の構築は、すべての組織の責務である。", "In modern society, building an inclusive environment where diversity is acknowledged and people from different backgrounds can coexist is the responsibility of all organizations."],
    ["フェイクニュースが選挙結果に影響を与える事態が相次ぎ、民主主義の根幹を揺るがす重大な脅威として認識されるようになった。", "Instances of fake news affecting election results have occurred one after another, and it has come to be recognized as a grave threat that shakes the very foundations of democracy."],
    ["過労死という痛ましい犠牲を繰り返さないためには、長時間労働を美徳とする従来の企業風土を根本から是正しなければならない。", "In order not to repeat the painful sacrifices of death from overwork, we must fundamentally correct the traditional corporate culture that regards long working hours as a virtue."],
    ["ゲノム編集技術の発展は、農作物の品種改良に革命をもたらす可能性がある一方、生態系への未知なる影響を危惧する声も根強い。", "While the development of genome editing technology holds the potential to revolutionize crop breeding, voices fearing its unknown impact on the ecosystem remain persistent."],
    ["芸術は、時に言葉以上に人々の心を打ち、社会問題に対する問題提起や、異なる文化間の相互理解を促進する力を持っている。", "Art sometimes strikes people's hearts more than words, possessing the power to raise questions about social issues and promote mutual understanding between different cultures."]
];

const sentence_data = [];
sentence_texts.forEach(([jp, en]) => {
    sentence_data.push({
        "front": jp,
        "back": en,
        "exampleJp": jp,
        "exampleTranslation": en,
        "tags": ["n1", "reading", "comprehension", "context"]
    });
});

const cards = [];
grammar_data.forEach((d, i) => {
    const idx = (i + 1).toString().padStart(3, '0');
    cards.push({
        "id": `n1-grammar-b-${idx}`,
        "category": "grammar",
        "front": d.front,
        "back": d.back,
        "exampleJp": d.exampleJp,
        "exampleTranslation": d.exampleTranslation,
        "tags": d.tags
    });
});

sentence_data.forEach((d, i) => {
    const idx = (i + 1).toString().padStart(3, '0');
    cards.push({
        "id": `n1-sentence-b-${idx}`,
        "category": "sentence",
        "front": d.front,
        "back": d.back,
        "exampleJp": d.exampleJp,
        "exampleTranslation": d.exampleTranslation,
        "tags": d.tags
    });
});

const output_data = {
    "shardId": shard_id,
    "level": "N1",
    "language": "en",
    "cards": cards
};

const out_path = "data/curated-packs/en/intake/n1/grammar_b_sentences_160.json";
const dir = path.dirname(out_path);
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(out_path, JSON.stringify(output_data, null, 2), "utf8");

console.log(`File saved to ${out_path}`);
console.log(`Total cards: ${cards.length}`);
console.log("Categories:");
const counts = {};
cards.forEach(c => {
    counts[c.category] = (counts[c.category] || 0) + 1;
});
Object.entries(counts).forEach(([k, v]) => {
    console.log(` - ${k}: ${v}`);
});

const forbidden_fields = ['furigana', 'reading', 'romaji', 'onyomi', 'kunyomi'];
let has_error = false;
const fronts = new Set();

cards.forEach(c => {
    forbidden_fields.forEach(f => {
        if (c.hasOwnProperty(f)) {
            console.log(`Error: Forbidden field ${f} in card ${c.id}`);
            has_error = true;
        }
    });
    if (fronts.has(c.front)) {
        console.log(`Error: Duplicate front: ${c.front}`);
        has_error = true;
    }
    fronts.add(c.front);
});

if (!has_error) {
    console.log("Validation passed.");
}
