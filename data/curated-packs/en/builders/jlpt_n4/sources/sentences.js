const grammarExamples = require('./grammar.js').map(entry => ({
  front: entry.exampleJp,
  back: entry.exampleTranslation,
  tags: ['sentence', 'grammar-example', ...entry.tags.filter(tag => tag !== 'grammar')],
}));

const extraLines = `
朝、駅まで急いで歩きました。|In the morning, I hurried and walked to the station.|daily-life,travel
電車が遅れたので、会社に少し遅刻しました。|Because the train was delayed, I was a little late for work.|work,travel,reason
会議の前に資料をコピーしておきました。|I copied the materials before the meeting.|work,preparation
昼休みに同僚と近くの店で食事しました。|During lunch break, I ate with a coworker at a nearby shop.|work,food
今日は残業しないで、早く帰るつもりです。|Today I intend to go home early without working overtime.|work,intention
上司に予定を確認してから、返事します。|I will reply after confirming the schedule with my boss.|work,communication
この書類は明日までに出さなければなりません。|This document must be submitted by tomorrow.|work,obligation
新しい仕事に少しずつ慣れてきました。|I have gradually gotten used to the new job.|work,change
会社の近くに便利なコンビニがあります。|There is a convenient convenience store near the company.|work,shopping
出張のためにホテルを予約しました。|I booked a hotel for a business trip.|work,travel
授業が始まる前に、宿題を出してください。|Please submit your homework before class starts.|school,request
この漢字の書き方をもう一度教えてください。|Please teach me how to write this kanji one more time.|school,method
試験に合格するために、毎日復習しています。|I review every day in order to pass the exam.|school,purpose
分からない言葉は辞書で調べるようにしています。|I make it a habit to look up words I do not understand in a dictionary.|school,habit
図書館では静かに勉強しなければなりません。|You must study quietly in the library.|school,obligation
レポートを書き終わったら、先生に出します。|When I finish writing the report, I will submit it to the teacher.|school,condition
友達にノートを見せてもらいました。|I had a friend show me their notes.|school,benefit
日本語の発音は思ったより難しいです。|Japanese pronunciation is harder than I thought.|school,comparison
漢字だけでなく、文法も練習しています。|I practice not only kanji but also grammar.|school,addition
来週の試験について先生に質問しました。|I asked the teacher about next week's exam.|school,topic
駅の出口を出ると、右に銀行があります。|When you leave the station exit, there is a bank on the right.|travel,directions
この道をまっすぐ行くと、郵便局に着きます。|If you go straight along this road, you will arrive at the post office.|travel,directions
切符を買ってから、二番線で待ってください。|After buying a ticket, please wait at platform two.|travel,request
新幹線に乗る前に、お弁当を買いました。|Before riding the bullet train, I bought a boxed lunch.|travel,food
ホテルの部屋は広くて、とても静かでした。|The hotel room was spacious and very quiet.|travel
道が分からなかったので、交番で聞きました。|Because I did not know the way, I asked at a police box.|travel,reason
空港までバスで一時間ぐらいかかります。|It takes about one hour by bus to the airport.|travel,time
旅行中にたくさん写真を撮りました。|I took many photos during the trip.|travel
お土産を買いすぎて、荷物が重くなりました。|I bought too many souvenirs, so my luggage became heavy.|travel,shopping,degree
次の駅で降りて、地下鉄に乗り換えます。|I will get off at the next station and transfer to the subway.|travel
このシャツは高すぎるので、買わないことにしました。|This shirt is too expensive, so I decided not to buy it.|shopping,decision
もう少し安いかばんを見せていただけませんか。|Could you please show me a slightly cheaper bag?|shopping,request
レジでお釣りをもらうのを忘れました。|I forgot to get my change at the register.|shopping,nominalizer
この商品はセール中なので、三割安いです。|This product is on sale, so it is thirty percent cheaper.|shopping
サイズが合わなかったら、交換できますか。|If the size does not fit, can I exchange it?|shopping,condition
領収書が必要なら、店員に言ってください。|If you need a receipt, please tell the clerk.|shopping,condition
注文した料理がまだ来ていません。|The food I ordered has not come yet.|shopping,food
支払いはカードでも現金でもかまいません。|Payment by either card or cash is acceptable.|shopping,permission
郵便局で荷物を送ってきました。|I went to the post office and sent a parcel.|services
銀行の窓口は三時まで開いています。|The bank counter is open until three o'clock.|services,time
このスープは少し辛いけれど、おいしいです。|This soup is a little spicy, but delicious.|food,contrast
野菜をたくさん食べるようにしています。|I make it a habit to eat lots of vegetables.|food,habit
母が作ってくれた弁当を学校で食べました。|I ate the boxed lunch my mother made for me at school.|food,benefit
料理を始める前に、材料を全部用意します。|Before starting to cook, I prepare all the ingredients.|food,preparation
この魚は新鮮そうなので、買ってみます。|This fish looks fresh, so I will try buying it.|food,appearance
甘い物ばかり食べない方がいいです。|You had better not eat only sweet things.|food,advice
水を飲みすぎて、お腹がいっぱいです。|I drank too much water, so my stomach is full.|food,degree
友達と話しながら、夕食を作りました。|I made dinner while talking with a friend.|food,simultaneous-action
この店では、安くておいしいカレーが食べられます。|At this shop, you can eat cheap and delicious curry.|food,ability
冷蔵庫に牛乳が入れてあります。|Milk has been put in the refrigerator.|food,result-state
昨日から熱があるので、病院へ行く予定です。|Because I have had a fever since yesterday, I plan to go to the hospital.|health,reason
薬を飲んだら、少し楽になりました。|After I took medicine, I felt a little better.|health,condition
頭が痛い時は、無理をしないでください。|When you have a headache, please do not push yourself.|health,request
毎日運動すれば、もっと元気になるでしょう。|If you exercise every day, you will probably become healthier.|health,condition
風邪をひかないように、外から帰ったら手を洗います。|I wash my hands after coming home so that I will not catch a cold.|health,purpose
歯医者に行くのは少し怖いです。|Going to the dentist is a little scary.|health,nominalizer
体温を測ってから、薬を飲んでください。|Please take medicine after measuring your temperature.|health,request
咳が続く場合は、医者に相談してください。|If your cough continues, please consult a doctor.|health,condition
睡眠が足りないと、仕事に集中できません。|If sleep is insufficient, I cannot concentrate on work.|health,condition
入院中、友達が何度も来てくれました。|While I was hospitalized, my friends came many times for me.|health,benefit
台風によって、午後の電車が止まりました。|Due to the typhoon, the afternoon trains stopped.|weather,reason
明日は雨かどうか、天気予報を見ました。|I checked the forecast to see whether it will rain tomorrow.|weather,embedded-question
風が強そうなので、窓を閉めておきます。|Because the wind looks strong, I will close the window in advance.|weather,preparation
春になると、桜の花が咲きます。|When spring comes, cherry blossoms bloom.|weather,nature
雪の日は道が滑りやすいです。|On snowy days, roads are slippery.|weather,ease
暑い日は冷たい水が飲みたくなります。|On hot days, I come to want cold water.|weather,desire
山の上は町より涼しいです。|The top of the mountain is cooler than the town.|weather,comparison
海の近くに住んでいる友達を訪ねました。|I visited a friend who lives near the sea.|nature,travel
雷が鳴り出したので、急いで家に帰りました。|Because thunder started, I hurried home.|weather,beginning
この公園は自然が多くて、散歩しやすいです。|This park has lots of nature and is easy to walk in.|nature,ease
祖母は昔の話をよく聞かせてくれます。|My grandmother often tells me stories from long ago.|family,benefit
家族に心配をかけないように、すぐ連絡しました。|I contacted my family right away so that I would not worry them.|family,purpose
弟は新しいゲームをほしがっています。|My younger brother wants a new game.|family,desire
姉に駅まで車で送ってもらいました。|I had my older sister drive me to the station.|family,benefit
父は仕事だけでなく、料理も上手です。|My father is good not only at work but also at cooking.|family,addition
母が忙しそうだったので、掃除を手伝いました。|My mother looked busy, so I helped clean.|family,appearance
親戚が来る前に、部屋を片付けておきます。|Before relatives come, I will tidy the room in advance.|family,preparation
赤ちゃんが寝ている間に、洗濯をしました。|I did laundry while the baby was sleeping.|family,time
娘は来年小学生になる予定です。|My daughter is scheduled to become an elementary school student next year.|family,plan
息子は毎日サッカーの練習を続けています。|My son continues practicing soccer every day.|family,continuation
この映画は有名ですが、まだ見たことがありません。|This movie is famous, but I have not seen it yet.|entertainment,experience
音楽を聞くと、気持ちが明るくなります。|When I listen to music, my mood becomes brighter.|entertainment,change
週末は本を読んだり、映画を見たりします。|On weekends, I do things like reading books and watching movies.|entertainment,listing
試合に勝ったら、みんなで食事に行きましょう。|If we win the match, let's go eat together.|sports,condition
この歌は子どもの時によく聞きました。|I often listened to this song when I was a child.|entertainment,time
大会に参加するために、毎日走っています。|I run every day in order to participate in the tournament.|sports,purpose
ニュースによると、明日は交通が混むそうです。|According to the news, traffic will be crowded tomorrow.|public,hearsay
図書館では飲み物を持ち込んではいけません。|You must not bring drinks into the library.|public,prohibition
会場に入る前に、チケットを見せてください。|Please show your ticket before entering the venue.|public,request
この番組は子どもにも分かりやすいです。|This program is easy for children to understand too.|public,ease
市役所で住所の変更をしなければなりません。|I must change my address at city hall.|public,obligation
祭りの日は町がとてもにぎやかになります。|On festival days, the town becomes very lively.|public,change
規則を守らないと、みんなが困ります。|If people do not follow the rules, everyone has trouble.|public,condition
交通事故を見たら、すぐ警察に知らせてください。|If you see a traffic accident, please notify the police immediately.|public,request
ボランティアとして、近所の掃除に参加しました。|As a volunteer, I joined neighborhood cleaning.|public,role
文化について調べるのは面白いです。|Researching culture is interesting.|public,topic
約束の時間に遅れないように、早めに家を出ました。|I left home early so that I would not be late for the appointment.|time,purpose
最近、朝早く起きられるようになりました。|Recently, I became able to wake up early.|time,change
休日なのに、会社から電話がありました。|Although it was a day off, there was a call from the company.|time,contrast
この間借りた本を、今日返すつもりです。|I intend to return the book I borrowed the other day today.|time,intention
来月までに旅行の計画を決めます。|I will decide the travel plan by next month.|time,deadline
昔住んでいた町をもう一度訪ねたいです。|I want to visit again the town where I lived long ago.|time,desire
将来のために、毎日少しずつ貯金しています。|For the future, I save a little money every day.|time,purpose
途中で雨が降り出したので、店に入りました。|Because it started raining on the way, I went into a shop.|time,beginning
最後まであきらめないで、練習を続けます。|I will not give up until the end and will continue practicing.|time,continuation
次回の会議は午前十時から始まります。|The next meeting starts at ten in the morning.|time
この問題は簡単そうですが、実は難しいです。|This problem looks easy, but it is actually difficult.|opinion,appearance
友達の意見を聞いてから、自分で決めます。|After listening to my friend's opinion, I will decide myself.|opinion,decision
彼は大丈夫だと言っていましたが、少し心配です。|He said he was okay, but I am a little worried.|opinion,quotation
失敗しても、もう一度やってみることが大切です。|Even if you fail, it is important to try again.|opinion,try
本当かどうか分からなかったので、先生に聞きました。|Because I did not know whether it was true, I asked the teacher.|opinion,embedded-question
無理だと思ったら、すぐ相談してください。|If you think it is impossible, please consult someone immediately.|opinion,condition
結果より、練習することの方が大事です。|Practicing is more important than the result.|opinion,comparison
冗談のつもりでしたが、友達を怒らせてしまいました。|I meant it as a joke, but I ended up making my friend angry.|opinion,completion
この説明は明確で、とても分かりやすいです。|This explanation is clear and very easy to understand.|opinion,ease
自分の考えを日本語で伝えられるようになりたいです。|I want to become able to express my thoughts in Japanese.|opinion,change
テーブルの上に皿が並べてあります。|Plates have been arranged on the table.|home,result-state
出かける前に、電気を消したか確認します。|Before going out, I check whether I turned off the lights.|home,embedded-question
洗濯機が壊れてしまったので、修理を頼みました。|Because the washing machine broke, I requested a repair.|home,completion
鍵をかけたまま、外に出てしまいました。|I accidentally went outside with the door left locked.|home,state
部屋を広く使うために、古い机を捨てました。|I threw away the old desk in order to use the room spaciously.|home,purpose
冷房をつけっぱなしにしないように注意してください。|Please be careful not to leave the air conditioner on.|home,request
玄関に荷物が置いてあるので、気をつけてください。|There is luggage placed in the entrance, so please be careful.|home,result-state
布団を干しておいたので、今夜は気持ちよく寝られます。|Because I aired out the futon, I can sleep comfortably tonight.|home,preparation
掃除をし始めたら、昔の写真が出てきました。|When I started cleaning, old photos came out.|home,beginning
このアパートは駅に近いだけでなく、家賃も安いです。|This apartment is not only near the station, but the rent is also cheap.|home,addition
友達が来るまでに、部屋を片付けておきます。|I will tidy the room before my friend comes.|home,deadline
新しい住所を忘れないように、ノートに書きました。|I wrote the new address in my notebook so that I would not forget it.|home,purpose
冷蔵庫の中に何があるか確認してください。|Please check what is inside the refrigerator.|home,embedded-question
洗濯物が乾きそうなので、外に出しておきます。|The laundry looks like it will dry, so I will put it outside.|home,appearance
隣の部屋から音がします。|I hear a sound from the next room.|home,senses
この道具は軽くて使いやすいです。|This tool is light and easy to use.|daily-life,ease
壊れた時計を直してもらいました。|I had the broken clock repaired.|daily-life,benefit
袋が破れそうなので、別の袋に入れます。|The bag looks like it will tear, so I will put it in another bag.|daily-life,appearance
約束を忘れないように、カレンダーに書いてあります。|The appointment is written on the calendar so I will not forget it.|daily-life,result-state
この説明を読めば、使い方が分かります。|If you read this explanation, you will understand how to use it.|daily-life,condition
自転車が倒れないように、壁のそばに置きました。|I placed the bicycle near the wall so that it would not fall over.|daily-life,purpose
今日は用事が多すぎて、ゆっくり休めません。|I have too many errands today, so I cannot rest leisurely.|daily-life,degree
新しい靴を履いてみたら、少し小さかったです。|When I tried wearing the new shoes, they were a little small.|daily-life,try
出かけようとした時、電話が鳴りました。|When I was about to go out, the phone rang.|daily-life,attempt
`;

const extras = extraLines.trim().split('\n').map(line => {
  const [front, back, tags] = line.split('|').map(part => part.trim());
  return { front, back, tags: ['sentence', ...tags.split(',').map(tag => tag.trim()).filter(Boolean)] };
});

module.exports = grammarExamples.concat(extras);
