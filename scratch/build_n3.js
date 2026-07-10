const fs = require('fs');
const path = require('path');

const kanji_1 = [
    ["政", "politics, government", "政府の方針が大きく変わるかもしれない。", "The government's policy might change significantly."],
    ["議", "debate, parliament", "次回の会議は明日の午後に予定されている。", "The next meeting is scheduled for tomorrow afternoon."],
    ["民", "people, nation", "多くの市民がそのイベントに参加しました。", "Many citizens participated in the event."],
    ["連", "take along, join", "週末は連休なので、少し遠くまで出かけたい。", "Since it's a long weekend, I want to travel a little far."],
    ["対", "opposite, even", "両親は私の留学に強く反対した。", "My parents strongly opposed my studying abroad."],
    ["部", "section, department", "彼女は営業部の新しい部長として紹介された。", "She was introduced as the new manager of the sales department."],
    ["合", "fit, suit, join", "都合が悪くて、明日の約束はキャンセルさせてください。", "It's inconvenient for me, so please let me cancel tomorrow's appointment."],
    ["市", "market, city", "新しい市長は若い人たちの意見を大切にしている。", "The new mayor values the opinions of young people."],
    ["内", "inside, within", "時間内にレポートを提出しなければならない。", "You must submit the report within the time limit."],
    ["相", "mutual, together", "困ったことがあれば、いつでも私に相談してください。", "If you have any trouble, please consult with me anytime."],
    ["定", "fix, decide", "休日は特に予定がなく、家でのんびり過ごした。", "I had no particular plans for the holiday and spent it relaxing at home."],
    ["回", "times, revolve", "このアンケートは今回で3回目になります。", "This is the third time we are doing this survey."],
    ["選", "choose, elect", "選挙に行くことは、私たちの重要な権利だ。", "Voting in elections is our important right."],
    ["米", "rice, America", "日本人は昔から米を主食としてきた。", "Japanese people have used rice as their staple food since ancient times."],
    ["実", "fruit, reality", "その計画はまだ実現するには早すぎる。", "It is still too early to realize that plan."],
    ["関", "connection, barrier", "人間関係の悩みを抱えている人は多い。", "Many people have worries about human relations."],
    ["決", "decide, agree", "どちらのパソコンを買うか、まだ決心がつかない。", "I haven't made up my mind yet about which computer to buy."],
    ["全", "whole, all", "事故のせいで、電車が完全にストップしてしまった。", "Because of the accident, the train completely stopped."],
    ["表", "surface, express", "彼の表情から、怒っていることがすぐにわかった。", "I could tell right away from his expression that he was angry."],
    ["戦", "war, fight", "チームは最後の試合で激しく戦った。", "The team fought fiercely in the final match."],
    ["経", "pass through", "経済の状況が少しずつ改善しているようだ。", "The economic situation seems to be improving little by little."],
    ["最", "most", "最近、この辺りには新しい店が増えた。", "Recently, the number of new stores in this area has increased."],
    ["現", "present, existing", "現在の状況では、目標を達成するのは難しい。", "In the current situation, it is difficult to achieve the goal."],
    ["調", "investigate", "原因を詳しく調査する必要があります。", "We need to investigate the cause in detail."],
    ["化", "change, -ization", "社会の高齢化は深刻な問題となっている。", "The aging of society has become a serious problem."],
    ["当", "hit, appropriate", "本当に私が宝くじに当たったなんて信じられない。", "I can't believe I actually won the lottery."],
    ["約", "promise, approximately", "約束の時間に10分遅れてしまった。", "I was 10 minutes late for the promised time."],
    ["首", "neck, head", "彼女は首にきれいなスカーフを巻いている。", "She is wearing a pretty scarf around her neck."],
    ["法", "law, method", "この機械の正しい使用法を教えてください。", "Please tell me the correct way to use this machine."],
    ["性", "sex, nature", "男女の性格の違いについて面白い記事を読んだ。", "I read an interesting article about the personality differences between men and women."],
    ["要", "need, important", "この書類を提出する前に、重要な点を確認して。", "Before submitting this document, check the important points."],
    ["制", "system, control", "新しい制服のデザインは学生に人気がある。", "The design of the new school uniform is popular among students."],
    ["治", "govern, cure", "風邪を早く治すために、薬を飲んで寝ます。", "To cure my cold quickly, I will take medicine and sleep."],
    ["務", "task, duties", "私の事務所は駅から歩いて5分のところにあります。", "My office is a five-minute walk from the station."],
    ["成", "turn into, grow", "努力が実り、彼はついに夢を成功させた。", "His efforts paid off, and he finally made his dream a success."],
    ["期", "period, time", "期待していた映画は、思ったよりも面白くなかった。", "The movie I was expecting was not as interesting as I thought."],
    ["取", "take, fetch", "休日はしっかりと睡眠を取るようにしている。", "I make sure to get plenty of sleep on my days off."],
    ["都", "metropolis, capital", "都会での生活は便利だが、物価が高い。", "Life in the city is convenient, but prices are high."],
    ["和", "peace, harmony", "休日は和室でお茶を飲みながらくつろぐのが好きだ。", "On my days off, I like to relax in the Japanese-style room while drinking tea."],
    ["機", "machine, opportunity", "飛行機に乗る前にパスポートを用意してください。", "Please prepare your passport before boarding the airplane."],
    ["平", "flat, ordinary", "平日はいそがしいので、週末に掃除をします。", "I am busy on weekdays, so I clean on weekends."],
    ["加", "add, join", "コーヒーに砂糖とミルクを加えます。", "I add sugar and milk to my coffee."],
    ["受", "receive, catch", "昨日、大学の入学試験を受けました。", "I took the university entrance exam yesterday."],
    ["続", "continue", "雨が3日間も続いていて、外に出られない。", "It has been raining continuously for three days, and I can't go outside."],
    ["進", "advance, progress", "プロジェクトは計画通りに進んでいる。", "The project is progressing according to plan."],
    ["数", "number, count", "会場に来たお客さんの数を数えてください。", "Please count the number of guests who came to the venue."],
    ["記", "write down, record", "毎日の出来事を日記に書いて残している。", "I write down daily events in a diary and keep them."],
    ["初", "first, beginning", "初めての海外旅行で、少し緊張しています。", "I am a little nervous because it is my first trip abroad."],
    ["指", "finger, point", "彼女は薬指にきれいな指輪をしていた。", "She was wearing a beautiful ring on her ring finger."],
    ["権", "authority, right", "誰もが自由に意見を言う権利を持っている。", "Everyone has the right to express their opinions freely."],
    ["支", "support, branch", "大きな木が屋根の重さを支えている。", "A large tree is supporting the weight of the roof."],
    ["産", "produce, birth", "この地域では、おいしいお米がたくさん生産されている。", "A lot of delicious rice is produced in this area."],
    ["点", "point, mark", "テストで100点満点を取ることができた。", "I was able to get a perfect score of 100 on the test."],
    ["報", "report, news", "毎朝、天気予報をチェックしてから家を出る。", "I check the weather forecast every morning before leaving the house."],
    ["済", "finish, settle", "支払いはすでに済ませてあります。", "The payment has already been settled."],
    ["活", "active, lively", "新しい職場でも活発に働きたいと思う。", "I want to work actively at my new workplace as well."],
    ["原", "original, plain", "火事の原因はまだはっきり分かっていない。", "The cause of the fire is not yet clearly known."],
    ["共", "together", "休日は家族と共に過ごす時間が多い。", "I often spend time together with my family on holidays."],
    ["得", "acquire, gain", "この仕事から多くの知識を得ることができた。", "I was able to acquire a lot of knowledge from this job."],
    ["解", "solve, untie", "数学の問題を解くのに時間がかかった。", "It took me a long time to solve the math problem."],
    ["交", "mix, interact", "交差点で信号が変わるのを待っています。", "I am waiting for the traffic light to change at the intersection."],
    ["資", "resources, capital", "この研究には多くの資料が必要です。", "A lot of reference materials are necessary for this research."],
    ["予", "beforehand", "来週の金曜日にホテルの予約を入れた。", "I made a hotel reservation for next Friday."],
    ["向", "face, beyond", "駅に向かって急いで歩き始めた。", "I hurried and started walking toward the station."],
    ["際", "occasion, time", "国際会議で様々な国の代表と話をした。", "I spoke with representatives of various countries at an international conference."],
    ["勝", "win", "今日の試合は私たちが絶対に勝つ。", "We will definitely win today's match."],
    ["面", "face, surface", "この問題には面白い側面があると思う。", "I think this issue has an interesting aspect."],
    ["告", "tell, inform", "駅の広告を見て、新しいスマホを買いたくなった。", "After seeing the advertisement at the station, I wanted to buy a new smartphone."],
    ["反", "anti-, opposite", "彼の行動は社会のルールに違反している。", "His behavior violates the rules of society."],
    ["判", "judge", "その情報が正しいかどうかを判断するのは難しい。", "It is difficult to judge whether that information is correct or not."],
    ["認", "recognize", "彼はついに自分の失敗を認めた。", "He finally admitted his mistake."],
    ["参", "participate", "ボランティア活動に参加して、多くのことを学んだ。", "I participated in volunteer activities and learned a lot."],
    ["利", "profit, advantage", "このカードを利用すると、ポイントが貯まります。", "If you use this card, you will accumulate points."],
    ["組", "assemble", "新しい家具を組み立てるのに半日かかった。", "It took half a day to assemble the new furniture."],
    ["信", "believe, trust", "自分自身を信じて最後までやり抜きたい。", "I want to believe in myself and carry it through to the end."],
    ["在", "exist, locate", "現在、彼はロンドンに留学中です。", "Currently, he is studying abroad in London."],
    ["件", "affair, case", "その事件についての詳しい報道を見た。", "I saw detailed reports about that incident."],
    ["側", "side", "道の反対側に新しいコンビニができた。", "A new convenience store was built on the opposite side of the street."],
    ["任", "responsibility, entrust", "リーダーとしての責任をしっかりと果たしたい。", "I want to firmly fulfill my responsibilities as a leader."],
    ["引", "pull", "ドアを強く引いて開けてください。", "Please pull the door strongly to open it."],
    ["求", "request, demand", "会社は新しい人材を求めている。", "The company is looking for new talent."],
    ["所", "place", "静かで落ち着ける場所を探しています。", "I am looking for a quiet and relaxing place."],
    ["次", "next", "次の電車は何時に出発しますか。", "What time does the next train depart?"],
    ["昨", "yesterday", "昨日は一日中雨が降っていました。", "It rained all day yesterday."],
    ["論", "theory, discuss", "大学で日本の歴史について論文を書いている。", "I am writing a thesis about Japanese history at the university."],
    ["官", "official", "警察官が道を丁寧に教えてくれた。", "The police officer kindly told me the way."],
    ["増", "increase", "最近、体重が増えてしまったので運動を始めた。", "Recently, I've gained weight, so I started exercising."],
    ["係", "person in charge", "その件については、担当の係にご連絡ください。", "Regarding that matter, please contact the person in charge."],
    ["感", "feeling, sense", "彼の歌を聴いて、深く感動しました。", "I was deeply moved listening to his song."],
    ["情", "emotion, condition", "日本の文化についての情報をもっと集めたい。", "I want to gather more information about Japanese culture."]
];

const kanji_2 = [
    ["投", "throw", "ボールを遠くまで投げる練習をしている。", "I am practicing throwing the ball far."],
    ["示", "show, indicate", "先生が黒板に問題の答えを示した。", "The teacher showed the answer to the problem on the blackboard."],
    ["変", "change, strange", "髪型を変えたら、友達に驚かれた。", "When I changed my hairstyle, my friends were surprised."],
    ["打", "hit, strike", "パソコンで文章を打つのに慣れてきた。", "I have gotten used to typing text on a computer."],
    ["直", "straight, fix", "壊れた自転車を自分で直してみた。", "I tried to fix the broken bicycle myself."],
    ["両", "both", "両親の結婚記念日にプレゼントを贈った。", "I gave my parents a present on their wedding anniversary."],
    ["式", "ceremony, style", "明日は大学の卒業式に参加します。", "I will participate in the university graduation ceremony tomorrow."],
    ["確", "certain, sure", "出発の時間をもう一度確認してください。", "Please confirm the departure time once more."],
    ["果", "fruit, result", "毎日の練習の結果、大会で優勝できた。", "As a result of daily practice, I was able to win the tournament."],
    ["容", "contain, form", "このカバンは容量が大きくて便利だ。", "This bag has a large capacity and is convenient."],
    ["必", "certain, necessary", "外国に行くときはパスポートが必ず必要だ。", "A passport is absolutely necessary when going abroad."],
    ["演", "perform, play", "有名な俳優が舞台で素晴らしい演技をした。", "A famous actor gave a wonderful performance on stage."],
    ["歳", "year-end, age", "今年で二十歳になり、お酒が飲めるようになった。", "I turned twenty this year and can now drink alcohol."],
    ["争", "contend, dispute", "兄弟でテレビのチャンネルを争うのはやめなさい。", "Stop fighting over the TV channel with your brother."],
    ["談", "discuss, talk", "先生と進路について面談をした。", "I had an interview with the teacher about my future path."],
    ["能", "ability", "彼女は語学の才能があり、3か国語を話せる。", "She has a talent for languages and can speak three languages."],
    ["位", "rank, position", "テストの成績でクラスの1位になった。", "I became first in the class in the test results."],
    ["置", "put, place", "机の上に辞書が置いてあります。", "There is a dictionary placed on the desk."],
    ["流", "stream, flow", "川の水が静かに流れている。", "The river water is flowing quietly."],
    ["格", "status, capacity", "そのホテルは格式が高く、とても高級だ。", "That hotel has a high status and is very luxurious."],
    ["疑", "doubt", "彼の言っていることが本当かどうか疑わしい。", "It is doubtful whether what he is saying is true or not."],
    ["過", "overdo, pass", "楽しい時間はあっという間に過ぎてしまう。", "Fun times pass by in the blink of an eye."],
    ["局", "bureau, board", "荷物を送るために郵便局へ行った。", "I went to the post office to send a package."],
    ["放", "set free, release", "テレビで面白い番組が放送されている。", "An interesting program is being broadcasted on TV."],
    ["常", "usual, normal", "日常生活の中で、運動する時間を作りたい。", "I want to make time to exercise in my daily life."],
    ["状", "conditions, form", "今の健康状態は非常に良いです。", "My current state of health is very good."],
    ["球", "ball, sphere", "休日は公園で野球をして遊んでいる。", "I play baseball in the park on my days off."],
    ["職", "post, employment", "新しい職場の人たちはみんな親切だ。", "Everyone at the new workplace is kind."],
    ["与", "give", "子供たちに夢を与えるような仕事がしたい。", "I want to do a job that gives dreams to children."],
    ["供", "offer, provide", "このレストランは美味しい料理を提供している。", "This restaurant provides delicious food."],
    ["役", "duty, role", "彼女は映画で重要な役を演じた。", "She played an important role in the movie."],
    ["構", "posture, build", "この建物の構造はとても複雑だ。", "The structure of this building is very complex."],
    ["割", "proportion, divide", "ケーキを3つに割って、みんなで食べましょう。", "Let's divide the cake into three and eat it together."],
    ["費", "expense", "今月は生活費を節約しなければならない。", "I have to save on living expenses this month."],
    ["付", "adhere, attach", "書類に写真と履歴書を付けて送った。", "I sent the documents with a photo and a resume attached."],
    ["由", "wherefore, reason", "彼が遅刻した理由を聞いて驚いた。", "I was surprised to hear the reason why he was late."],
    ["説", "theory, explain", "社長が新しいプロジェクトについて説明した。", "The company president explained the new project."],
    ["難", "difficult", "この本は内容が難しくて、なかなか進まない。", "The contents of this book are difficult, so I am not making much progress."],
    ["優", "superior, gentle", "彼女はとても優しくて、みんなから好かれている。", "She is very gentle and liked by everyone."],
    ["夫", "husband", "私の夫は料理を作るのが上手です。", "My husband is good at cooking."],
    ["収", "income, obtain", "今年の会社の収入は去年よりも増えた。", "The company's income this year increased compared to last year."],
    ["断", "sever, decide", "忙しいので、パーティーの誘いを断った。", "I refused the invitation to the party because I am busy."],
    ["石", "stone", "道に落ちている石につまずいて転んだ。", "I tripped over a stone on the road and fell."],
    ["違", "difference, differ", "私の意見は彼の意見と少し違います。", "My opinion differs a little from his."],
    ["消", "extinguish, erase", "部屋を出る時は、必ず電気を消してください。", "When you leave the room, please be sure to turn off the lights."],
    ["神", "gods, mind", "試験に合格するように、神社で神様にお願いした。", "I prayed to the gods at the shrine so that I would pass the exam."],
    ["番", "turn, number", "テレビのチャンネルを8番に変えてください。", "Please change the TV channel to number 8."],
    ["規", "standard, measure", "会社の規則を守ることは社会人として当然だ。", "Following company rules is natural as a working adult."],
    ["術", "art, technique", "最新の技術を使って、新しい製品を開発した。", "We developed a new product using the latest technology."],
    ["備", "equip, prepare", "地震に備えて、水や食料を準備しておく。", "I prepare water and food in preparation for an earthquake."],
    ["宅", "home, house", "昨日の夜は自宅でのんびり映画を見ていた。", "I was relaxing and watching a movie at home last night."],
    ["害", "harm, injury", "台風で農作物に大きな被害が出た。", "The typhoon caused great damage to the crops."],
    ["配", "distribute", "朝、新聞を配達するアルバイトをしている。", "I have a part-time job delivering newspapers in the morning."],
    ["警", "admonish, warn", "交差点に立って、警察官が交通整理をしている。", "A police officer is standing at the intersection directing traffic."],
    ["育", "bring up, raise", "田舎で野菜を育てながら静かに暮らしたい。", "I want to live quietly in the countryside while growing vegetables."],
    ["席", "seat", "電車の中で、お年寄りに席を譲った。", "I gave up my seat to an elderly person on the train."],
    ["訪", "call on, visit", "夏休みに京都の古いお寺を訪問する予定だ。", "I plan to visit an old temple in Kyoto during the summer vacation."],
    ["乗", "ride, board", "毎朝、満員の通勤電車に乗るのは大変だ。", "Riding a crowded commuter train every morning is tough."],
    ["残", "remainder, left over", "冷蔵庫に残っている野菜でスープを作った。", "I made soup with the vegetables left in the refrigerator."],
    ["想", "concept, think", "将来の自分の姿を想像してみる。", "I try to imagine myself in the future."],
    ["声", "voice", "彼の声はとてもきれいで、歌が上手だ。", "His voice is very beautiful and he is good at singing."],
    ["念", "thought, desire", "残念ながら、明日の試合は雨で中止になった。", "Unfortunately, tomorrow's match was canceled due to rain."],
    ["助", "help", "困っているおばあさんを助けてあげた。", "I helped an elderly woman who was in trouble."],
    ["労", "labor, toil", "長時間労働が問題になっている。", "Long working hours have become a problem."],
    ["例", "example", "例えば、どんな音楽が好きですか。", "For example, what kind of music do you like?"],
    ["然", "sort of thing, so", "自然の豊かな場所でキャンプをするのが好きだ。", "I like camping in places rich in nature."],
    ["限", "limit, restrict", "チケットの数には限りがあります。", "There is a limit to the number of tickets."],
    ["追", "chase", "犬がボールを追いかけて走っていった。", "The dog ran chasing after the ball."],
    ["商", "make a deal", "商店街で新鮮な魚を買って帰った。", "I bought fresh fish at the shopping street and went home."],
    ["葉", "leaf", "秋になると、木々の葉が赤や黄色に変わる。", "In autumn, the leaves of trees turn red and yellow."],
    ["伝", "transmit, tell", "このメッセージを彼に伝えてもらえませんか。", "Could you pass this message on to him?"],
    ["働", "work", "彼は毎日夜遅くまで一生懸命働いている。", "He works hard until late every night."],
    ["形", "shape", "このケーキは星の形をしていて可愛い。", "This cake is cute, shaped like a star."],
    ["景", "scenery", "ホテルの窓から見える景色がすばらしい。", "The scenery visible from the hotel window is wonderful."],
    ["落", "fall, drop", "ポケットから財布を落としてしまった。", "I dropped my wallet from my pocket."],
    ["好", "fond, pleasing", "休日は好きな本を読んでリラックスする。", "I relax by reading my favorite books on holidays."],
    ["退", "retreat", "病気のために、大学を退学することになった。", "Due to illness, I had to drop out of the university."],
    ["頭", "head", "考えすぎて頭が痛くなってしまった。", "My head started hurting from thinking too much."],
    ["負", "defeat, negative", "今日の試合は強豪チームに負けてしまった。", "We lost today's match to a strong team."],
    ["渡", "transit, cross", "この道をまっすぐ行って、橋を渡ってください。", "Go straight down this road and cross the bridge."],
    ["建", "build", "新しいマンションが駅の近くに建設されている。", "A new apartment building is being constructed near the station."],
    ["終", "end, finish", "夏休みも明日で終わりだ。", "Summer vacation ends tomorrow as well."],
    ["客", "guest, customer", "このレストランはいつもお客さんでいっぱいだ。", "This restaurant is always full of customers."],
    ["識", "discriminating, know", "日本社会についての知識をもっと深めたい。", "I want to deepen my knowledge of Japanese society."],
    ["呼", "call", "タクシーを呼んで、急いで駅に向かった。", "I called a taxi and hurried to the station."],
    ["飛", "fly", "空を鳥が気持ちよさそうに飛んでいる。", "Birds are flying in the sky looking comfortable."],
    ["越", "surpass, cross", "山を越えると、美しい湖が見えてきた。", "After crossing the mountain, a beautiful lake came into view."],
    ["守", "protect", "家族の笑顔を守るために一生懸命働く。", "I work hard to protect my family's smiles."],
    ["庭", "courtyard, garden", "休日は庭で花を育てて楽しんでいる。", "I enjoy growing flowers in the garden on holidays."],
    ["息", "breath, son", "深呼吸をして、息を整えてから走る。", "I take a deep breath and steady my breathing before running."]
];

const sentences_1 = [
    ["たとえ雨が降っても、明日の試合は行われます。", "Even if it rains, tomorrow's match will be held."],
    ["日本語の勉強を続ければ続けるほど、面白くなってきます。", "The more I continue studying Japanese, the more interesting it becomes."],
    ["彼は疲れているのか、さっきから何も言わずに座っている。", "Perhaps he is tired; he has been sitting without saying anything for a while."],
    ["このアパートは駅から近いわりに、家賃が安くて便利だ。", "Considering this apartment is close to the station, the rent is cheap and it's convenient."],
    ["風邪をひかないように、毎朝うがいをしています。", "I gargle every morning so that I won't catch a cold."],
    ["あの人は親切なだけでなく、仕事もできるので尊敬されている。", "That person is respected not only because they are kind, but also because they do their job well."],
    ["新しいスマートフォンは、以前のものに比べて画面が大きくて見やすい。", "The new smartphone's screen is bigger and easier to see compared to the previous one."],
    ["もう少しで電車に乗り遅れるところでした。", "I was just about to miss the train."],
    ["休日は掃除したり、洗濯したりして過ごすことが多い。", "On my days off, I often spend time doing things like cleaning and laundry."],
    ["先生の説明が難しくて、私には全く理解できなかった。", "The teacher's explanation was so difficult that I couldn't understand it at all."],
    ["このレストランのカレーは辛すぎて、全部食べられません。", "The curry at this restaurant is so spicy that I can't eat all of it."],
    ["明日は早く起きなければならないので、もう寝ます。", "I have to wake up early tomorrow, so I'm going to sleep now."],
    ["彼は約束の時間に間に合うように、急いで駅に向かった。", "He hurried to the station so that he would be in time for the appointment."],
    ["どんなに大変でも、最後まで諦めずに頑張りたいです。", "No matter how tough it is, I want to do my best without giving up until the end."],
    ["新しいパソコンを買うなら、あの店が一番安いらしいよ。", "If you're buying a new computer, it seems that store is the cheapest."],
    ["子供の頃、よくこの公園で友達と遊んだものだ。", "When I was a child, I used to play a lot with my friends in this park."],
    ["この映画は子供向けにしては、内容が少し難しすぎる。", "For a movie aimed at children, the content is a bit too difficult."],
    ["会議中なので、携帯電話の電源は切っておいてください。", "Since we are in a meeting, please keep your mobile phone turned off."],
    ["私は甘いものが好きなので、毎日ケーキを食べずにはいられない。", "Because I love sweets, I can't help but eat cake every day."],
    ["この薬を飲めば、すぐに熱が下がるはずです。", "If you take this medicine, your fever should go down right away."],
    ["私の代わりに、会議に出席してもらえませんか。", "Could you attend the meeting in my place?"],
    ["山田さんは今日は休むと言っていたから、来ないだろう。", "Yamada said he was taking the day off today, so he probably won't come."],
    ["窓を開けたとたん、冷たい風が部屋に入ってきた。", "As soon as I opened the window, a cold wind came into the room."],
    ["あのホテルは景色が良い代わりに、値段が少し高い。", "That hotel has a good view, but in exchange, the price is a little high."],
    ["これ以上無理をすると、病気になりかねないから休んだ方がいい。", "If you push yourself any harder, you might get sick, so you should rest."],
    ["彼はとても忙しいらしく、最近あまり連絡がこない。", "He seems very busy and hasn't contacted me much recently."],
    ["新しいプロジェクトを成功させるために、みんなで協力しましょう。", "Let's all cooperate in order to make the new project a success."],
    ["この辞書は小さくて軽いから、持ち歩くのにとても便利だ。", "This dictionary is small and light, so it is very convenient for carrying around."],
    ["明日の天気は晴れだということなので、ピクニックに行ける。", "I heard tomorrow's weather will be sunny, so we can go for a picnic."],
    ["一生懸命勉強したおかげで、希望の大学に合格することができた。", "Thanks to studying hard, I was able to pass the university of my choice."],
    ["今朝は寝坊してしまったせいで、朝ごはんを食べる時間がなかった。", "Because I overslept this morning, I didn't have time to eat breakfast."],
    ["彼は本当に日本人かと思うくらい、上手に英語を話す。", "He speaks English so well that I wonder if he's really Japanese."],
    ["この料理は誰が食べても美味しいと言うに違いない。", "I'm sure anyone who eats this dish will say it's delicious."],
    ["急に雨が降り出したので、傘を買わざるを得なかった。", "It suddenly started raining, so I had no choice but to buy an umbrella."],
    ["彼は経験が浅いものの、仕事への情熱は誰にも負けない。", "Although he has little experience, his passion for work is second to none."],
    ["あの人はお金持ちだからといって、必ずしも幸せだとは限らない。", "Just because that person is rich doesn't necessarily mean they are happy."],
    ["いくら説明しても、彼女には私の気持ちが分かってもらえなかった。", "No matter how much I explained, she didn't understand my feelings."],
    ["駅前には大きなスーパーがあるから、買い物には困らない。", "There is a large supermarket in front of the station, so I don't have trouble shopping."],
    ["来週のテストに向けて、毎日図書館で勉強しているところだ。", "I am currently studying at the library every day for next week's test."],
    ["彼はスポーツマンらしく、いつも元気で爽やかだ。", "He is always energetic and refreshing, just like an athlete."],
    ["この街は夜になると急に静かになって、少し寂しいくらいだ。", "This town suddenly gets so quiet at night that it's almost a little lonely."],
    ["このパソコンの使い方が分からないので、教えてもらえませんか。", "I don't know how to use this computer, so could you teach me?"],
    ["こんなに高い時計、私にはとても買えそうにない。", "I don't think I could possibly buy such an expensive watch."],
    ["明日は大切な会議があるから、絶対に遅刻するわけにはいかない。", "Since there is an important meeting tomorrow, I absolutely cannot afford to be late."],
    ["彼女の料理は、プロのシェフが作ったかのように美味しい。", "Her cooking is so delicious it's as if a professional chef made it."],
    ["彼は何も知らないふりをしているが、本当はすべて知っているはずだ。", "He is pretending to know nothing, but he must actually know everything."],
    ["最近太ってきたから、毎朝ジョギングすることにしている。", "Since I've been gaining weight recently, I make it a rule to jog every morning."],
    ["どんな困難があっても、自分の夢に向かって進み続けたい。", "No matter what difficulties there are, I want to keep moving towards my dream."],
    ["この本は漢字ばかりで、外国人には少し読みにくいかもしれない。", "This book is full of kanji, so it might be a bit hard for foreigners to read."],
    ["友達に勧められた映画を見たが、期待していたほど面白くなかった。", "I watched the movie recommended by my friend, but it wasn't as interesting as I had expected."]
];

const sentences_2 = [
    ["あの人は英語だけでなく、フランス語も少し話せるそうだ。", "I hear that person can speak not only English but also a little French."],
    ["休みの日は、家で本を読んだり音楽を聴いたりして過ごすのが好きだ。", "On days off, I like to spend my time at home doing things like reading books and listening to music."],
    ["彼はいつも遅刻してくるから、今日も遅れるに違いない。", "He is always late, so he must be late today too."],
    ["新しいスマートフォンが欲しいけれど、高すぎて買えそうもない。", "I want a new smartphone, but it's so expensive I don't think I can buy it."],
    ["電車の中で寝過ごしてしまって、危うく終点まで行くところだった。", "I overslept on the train and was about to go all the way to the last stop."],
    ["来週の月曜日は祝日なので、学校はお休みということだ。", "Next Monday is a public holiday, so I heard there is no school."],
    ["彼女の部屋はいつもきれいに片付いていて、モデルルームのようだ。", "Her room is always neatly tidied up, like a model room."],
    ["このカレーは私には辛すぎるので、もう少し甘いのがいいです。", "This curry is too spicy for me, so I prefer something a little sweeter."],
    ["どんなに疲れていても、お風呂に入らずに寝るわけにはいかない。", "No matter how tired I am, I can't possibly go to sleep without taking a bath."],
    ["あのホテルは料金が高いわりに、サービスがあまり良くないらしい。", "I heard that hotel doesn't have very good service, considering its high price."],
    ["私が困っていると、いつも親切な友達が助けてくれる。", "Whenever I'm in trouble, a kind friend always helps me."],
    ["新しいレストランができたらしいから、今度一緒に行ってみよう。", "I heard a new restaurant opened, so let's go check it out together next time."],
    ["一生懸命練習したからには、絶対に優勝したいと思っている。", "Since I practiced so hard, I absolutely want to win the championship."],
    ["急に雨が降り出したせいで、せっかくのバーベキューが台無しになった。", "Because it suddenly started raining, our precious barbecue was ruined."],
    ["毎日少しずつでも勉強を続けることが大切だと言われている。", "It is said that continuing to study even a little bit every day is important."],
    ["彼は風邪を引いているのにもかかわらず、無理して仕事に来た。", "Even though he had a cold, he pushed himself and came to work."],
    ["このカメラは初心者でも簡単に綺麗な写真が撮れるようになっている。", "This camera is designed so that even beginners can easily take beautiful photos."],
    ["駅までの道が分からないので、誰かに教えてもらおうと思う。", "I don't know the way to the station, so I think I'll ask someone to tell me."],
    ["今日は疲れたから、夕ご飯は外食にしようかと思っているところだ。", "I'm tired today, so I'm thinking about eating out for dinner."],
    ["彼は嘘をついているに違いないと、私は最初から疑っていた。", "I suspected from the beginning that he must be lying."],
    ["私の代わりに荷物を受け取ってくれる人がいなくて困っている。", "I'm in trouble because there is no one to receive the package in my place."],
    ["この小説は感動的で、涙なしには最後まで読めなかった。", "This novel was so moving that I couldn't read it to the end without tears."],
    ["新しい服を買ったものの、着ていく場所がなくて少し残念だ。", "Although I bought new clothes, it's a bit disappointing that I have nowhere to wear them."],
    ["山田さんは日本人らしくない考え方をするので、話していて面白い。", "Yamada-san has an un-Japanese way of thinking, so it's interesting to talk to him."],
    ["もっと早く出発すればよかったと、今さら後悔しても仕方がない。", "It's no use regretting now that I should have left earlier."],
    ["いくら説明書を読んでも、この機械の使い方がさっぱり分からない。", "No matter how much I read the manual, I don't understand how to use this machine at all."],
    ["子供が道路に飛び出しそうになって、ひやっとしたよ。", "The child was about to jump out into the road, and it gave me a chill."],
    ["明日は早く起きるつもりだったのに、結局夜更かししてしまった。", "Even though I intended to wake up early tomorrow, I ended up staying up late after all."],
    ["彼はスポーツが得意なばかりか、成績もいつもトップクラスだ。", "Not only is he good at sports, but his grades are also always top class."],
    ["コーヒーを飲んだおかげで、ようやく目が覚めてきた気がする。", "Thanks to drinking coffee, I feel like I've finally woken up."],
    ["あの映画はつまらないらしいから、見に行かないほうがいいよ。", "I heard that movie is boring, so you'd better not go see it."],
    ["日本語のニュースが少しずつ聞き取れるようになってきて嬉しい。", "I'm glad that I'm becoming able to understand Japanese news a little by little."],
    ["この問題は難しすぎて、先生でさえ解けないかもしれない。", "This problem is so difficult that even the teacher might not be able to solve it."],
    ["来月京都へ行くことになったので、美味しいお店を調べている。", "It's been decided that I'm going to Kyoto next month, so I'm looking up delicious restaurants."],
    ["彼はとても疲れているようで、今にも倒れそうな顔をしている。", "He looks very tired and has a face like he's going to collapse at any moment."],
    ["雨が降ろうが降るまいが、明日のピクニックは決行するつもりだ。", "Whether it rains or not, we intend to go ahead with tomorrow's picnic."],
    ["こんなにたくさんのお土産、一人では持ちきれないよ。", "I can't possibly carry this many souvenirs by myself."],
    ["あの人は親切なふりをして、実は自分の利益しか考えていない。", "That person pretends to be kind, but actually only thinks about their own profit."],
    ["もっと勉強しておけばよかったと、試験の結果を見て後悔した。", "I regretted that I should have studied more after seeing the test results."],
    ["彼はまるで何もなかったかのように、いつも通り挨拶してきた。", "He greeted me as usual, exactly as if nothing had happened."],
    ["この店のラーメンは美味しいが、少し塩辛すぎるきらいがある。", "This shop's ramen is delicious, but it has a tendency to be a bit too salty."],
    ["早く家に帰って、温かいお風呂に入りたくてたまらない。", "I want to go home early and take a warm bath so badly."],
    ["新しいゲームを始めたら面白くて、やめられなくなってしまった。", "When I started a new game, it was so interesting that I couldn't stop."],
    ["山田さんは休むと言っていたから、今日はもう来ないはずだ。", "Yamada-san said he would take the day off, so he shouldn't be coming today."],
    ["私がもっとしっかりしていれば、こんな失敗は防げたのに。", "If I had been more reliable, I could have prevented such a failure."],
    ["彼は毎日遅くまで残業しているせいで、最近体調を崩しがちだ。", "Because he works overtime until late every day, he tends to get sick recently."],
    ["このパソコンは古いわりに、まだ十分早く動いてくれる。", "Considering this computer is old, it still runs fast enough."],
    ["明日の会議には、遅れてもいいから必ず出席するようにしてください。", "Please make sure to attend tomorrow's meeting, even if you are late."],
    ["彼は誰にでも優しいから、みんなから好かれているのも当然だ。", "Since he is kind to everyone, it's natural that he is liked by everyone."],
    ["もう少しで完成するところだったのに、パソコンがフリーズしてしまった。", "It was just about to be completed, but the computer froze."]
];

const cards = [];
const kanjis = [...kanji_1, ...kanji_2];
const sents = [...sentences_1, ...sentences_2];

const kanji_fronts = new Set();
const sent_fronts = new Set();

let k_id = 1;
for (const [k, mean, ex_jp, ex_en] of kanjis) {
    if (kanji_fronts.has(k)) {
        console.log(`DUPLICATE KANJI: ${k}`);
    }
    kanji_fronts.add(k);
    
    cards.push({
        id: `n3-kanji-${String(k_id).padStart(3, '0')}`,
        category: "kanji",
        front: k,
        back: mean,
        exampleJp: ex_jp,
        exampleTranslation: ex_en,
        tags: ["JLPT N3", "Kanji"]
    });
    k_id++;
}

let s_id = 1;
for (const [jp, en] of sents) {
    if (sent_fronts.has(jp)) {
        console.log(`DUPLICATE SENTENCE: ${jp}`);
    }
    sent_fronts.add(jp);
    
    cards.push({
        id: `n3-sentence-b-${String(s_id).padStart(3, '0')}`,
        category: "sentence",
        front: jp,
        back: en,
        exampleJp: jp,
        exampleTranslation: en,
        tags: ["JLPT N3", "Reading Practice"]
    });
    s_id++;
}

const out_dir = "data/curated-packs/en/intake/n3";
fs.mkdirSync(out_dir, { recursive: true });
const out_file = path.join(out_dir, "kanji_sentences_280.json");

const output_data = {
    shardId: "n3-kanji-sentences-280",
    level: "N3",
    language: "en",
    cards: cards
};

fs.writeFileSync(out_file, JSON.stringify(output_data, null, 2), "utf8");

console.log(`Wrote to ${out_file}`);
console.log(`Total cards: ${cards.length}`);
console.log(`Kanji count: ${kanjis.length}`);
console.log(`Sentence count: ${sents.length}`);

// Validation
console.log("\n--- VALIDATION ---");
const forbidden = ["furigana", "reading", "romaji", "onyomi", "kunyomi"];
let has_forbidden = false;
let missing_fields = false;

for (const c of cards) {
    for (const f of forbidden) {
        if (f in c) {
            console.log(`FORBIDDEN FIELD '${f}' in ${c.id}`);
            has_forbidden = true;
        }
    }
    const req = ["id", "category", "front", "back", "exampleJp", "exampleTranslation", "tags"];
    for (const r of req) {
        if (!(r in c)) {
            console.log(`MISSING FIELD '${r}' in ${c.id}`);
            missing_fields = true;
        }
    }
}

if (!has_forbidden && !missing_fields) {
    console.log("PASS: No forbidden or missing fields.");
}

const placeholders = ["example", "todo", "tbd", "placeholder", "dummy"];
for (const c of cards) {
    for (const p of placeholders) {
        if (c.front.toLowerCase().includes(p) || c.back.toLowerCase().includes(p) || c.exampleTranslation.toLowerCase().includes(p)) {
            console.log(`WARNING: Possible placeholder '${p}' in ${c.id}`);
        }
    }
}
