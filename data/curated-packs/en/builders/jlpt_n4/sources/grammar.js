const lines = `
～そうです (appearance)|looks/seems like based on what you see|雨が降りそうです。|It looks like it will rain.|appearance
～そうです (hearsay)|I hear that; it is said that|明日は暑いそうです。|I hear that tomorrow will be hot.|hearsay
～ようです (inference)|seems; appears from evidence|田中さんは忙しいようです。|Mr. Tanaka seems busy.|inference
～ようです (similarity)|like; similar to|この雲は山のようです。|This cloud looks like a mountain.|similarity
～みたいです|looks like; seems like (casual)|この店は人気があるみたいです。|This shop seems popular.|similarity
～らしいです (reported information)|apparently; I hear that|駅前に新しい店ができたらしいです。|Apparently a new shop opened in front of the station.|hearsay
～らしい (typical quality)|typical of; just like|今日は春らしい天気です。|Today is weather typical of spring.|description
～なら|if it is; as for|日本語なら、少し分かります。|If it is Japanese, I understand a little.|condition
～ば|if; when a condition is met|時間があれば、手伝います。|If I have time, I will help.|condition
～たら|if; when after something happens|駅に着いたら、電話します。|When I arrive at the station, I will call.|condition
～ても|even if; even though|雨が降っても、行きます。|Even if it rains, I will go.|condition
～てもいいです|it is okay to do|ここに座ってもいいです。|You may sit here.|permission
～てはいけません|must not do|ここで写真を撮ってはいけません。|You must not take photos here.|prohibition
～てしまいます (completion)|do completely; finish doing|宿題を全部やってしまいます。|I will finish all my homework.|completion
～てしまいました (regret)|ended up doing; unfortunately did|財布を忘れてしまいました。|I unfortunately forgot my wallet.|completion
～ておきます|do in advance; leave prepared|旅行の前にホテルを予約しておきます。|I will reserve a hotel before the trip.|preparation
～てあります|something has been done and remains so|窓が開けてあります。|The window has been opened.|result-state
～てみます|try doing|新しい料理を作ってみます。|I will try making a new dish.|try
～てきます|go and do; come back after doing|切符を買ってきます。|I will go buy a ticket and come back.|movement
～ていきます|go on doing; do and go|これからも日本語を勉強していきます。|I will continue studying Japanese from now on.|movement
～ようにします|make an effort to do|毎日早く寝るようにします。|I will try to sleep early every day.|effort
～ことにします|decide to do|来月から自転車で通うことにします。|I have decided to commute by bicycle from next month.|decision
～ことになります|it has been decided that|来週会議を開くことになりました。|It has been decided that we will hold a meeting next week.|decision
～ために (purpose)|in order to; for the purpose of|試験に合格するために勉強します。|I study in order to pass the exam.|purpose
～ために (reason)|because of; due to|台風のために電車が止まりました。|The train stopped because of the typhoon.|reason
～ながら|while doing at the same time|音楽を聞きながら料理します。|I cook while listening to music.|simultaneous-action
～すぎます|too much; excessively|このかばんは重すぎます。|This bag is too heavy.|degree
～やすいです|easy to do|このペンは書きやすいです。|This pen is easy to write with.|ease
～にくいです|hard to do|この漢字は覚えにくいです。|This kanji is hard to memorize.|difficulty
～方|way of doing|駅への行き方を教えてください。|Please tell me how to get to the station.|method
～予定です|be scheduled to; plan to|来週旅行する予定です。|I am scheduled to travel next week.|plan
～つもりです|intend to; plan to|夏休みに国へ帰るつもりです。|I intend to return to my country during summer vacation.|intention
～つもりはありません|do not intend to|今日は出かけるつもりはありません。|I do not intend to go out today.|intention
～かもしれません|might; maybe|午後から雨が降るかもしれません。|It might rain from the afternoon.|possibility
～でしょう|probably; right?|明日は晴れるでしょう。|It will probably be sunny tomorrow.|probability
～はずです|should be; expected to be|田中さんはもう着いたはずです。|Mr. Tanaka should have arrived already.|expectation
～と思います (opinion)|I think that|この問題は難しいと思います。|I think this problem is difficult.|opinion
～と思っています|have been thinking that|将来、日本で働きたいと思っています。|I have been thinking that I want to work in Japan in the future.|opinion
～と言います|say that; be called|先生は明日試験があると言いました。|The teacher said there is an exam tomorrow.|quotation
～と言っていました|someone said that earlier|母は早く帰ると言っていました。|My mother said she would come home early.|quotation
～てもらいます|receive the favor of someone doing|友達に写真を撮ってもらいました。|I had my friend take a photo for me.|benefit
～てくれます|someone does something for me|兄が宿題を手伝ってくれました。|My older brother helped me with homework.|benefit
～てあげます|do something for someone|妹に本を読んであげました。|I read a book for my younger sister.|benefit
～ていただけませんか|could you please do|もう少しゆっくり話していただけませんか。|Could you please speak a little more slowly?|request
～てくれませんか|will you do for me|駅まで迎えに来てくれませんか。|Will you come pick me up at the station?|request
～てほしいです (desire for action)|want someone to do|先生にもう一度説明してほしいです。|I want the teacher to explain one more time.|request
～ないでください|please do not do|ここに車を止めないでください。|Please do not park your car here.|request
～なければなりません|must do|明日までに書類を出さなければなりません。|I must submit the documents by tomorrow.|obligation
～なくてもいいです|do not have to do|今日は残業しなくてもいいです。|You do not have to work overtime today.|permission
～ないといけません|must do; have to do|薬を飲まないといけません。|I have to take medicine.|obligation
～なくちゃいけません|must do (casual)|部屋を片付けなくちゃいけません。|I have to tidy my room.|obligation
～なきゃいけません|must do (casual contraction)|早く起きなきゃいけません。|I have to wake up early.|obligation
～ちゃいけません|must not do (casual)|ここで泳いじゃいけません。|You must not swim here.|prohibition
～てもかまいません|it is acceptable to do|名前はペンで書いてもかまいません。|It is fine to write your name in pen.|permission
～なくてもかまいません|it is acceptable not to do|全部食べなくてもかまいません。|It is fine not to eat everything.|permission
～ことができます|can do|この図書館で本を借りることができます。|You can borrow books at this library.|ability
～られます (potential)|can do|私は納豆を食べられます。|I can eat natto.|ability
～られます (passive)|be done by someone|弟にケーキを食べられました。|My cake was eaten by my younger brother.|passive
～させます|make or let someone do|母は子どもに部屋を掃除させました。|The mother made the child clean the room.|causative
～させてください|please let me do|少し休ませてください。|Please let me rest a little.|causative
～ようになります|come to be able to; become so that|漢字が読めるようになりました。|I became able to read kanji.|change
～ようにしています|make it a habit to|毎日野菜を食べるようにしています。|I make it a habit to eat vegetables every day.|habit
～ことにしています|make it a personal rule to|夜十時には寝ることにしています。|I make it a rule to sleep by ten at night.|habit
～ことになっています|be arranged; be the rule|この建物ではタバコを吸わないことになっています。|The rule is that people do not smoke in this building.|rule
～ことがあります (sometimes)|there are times when|週末に仕事をすることがあります。|There are times when I work on weekends.|frequency
～たことがあります|have done before|京都へ行ったことがあります。|I have been to Kyoto before.|experience
～たばかりです|just did|昼ご飯を食べたばかりです。|I just ate lunch.|time
～ところです (about to)|be just about to do|今から出かけるところです。|I am just about to go out.|time
～ているところです|be in the middle of doing|今、資料を読んでいるところです。|I am in the middle of reading the materials.|time
～たところです|just finished doing|会議が終わったところです。|The meeting just ended.|time
～間|during the whole time|夏休みの間、アルバイトをします。|I will work part-time during summer vacation.|time
～間に|while; during some point in time|子どもが寝ている間に、掃除します。|I clean while the child is sleeping.|time
～前に|before doing|食事の前に手を洗います。|I wash my hands before meals.|time
～後で|after doing|仕事の後で買い物します。|I will shop after work.|time
～時|when; at the time of|子どもの時、よく川で泳ぎました。|When I was a child, I often swam in the river.|time
～場合|in the case that|雨の場合、試合は中止です。|In case of rain, the match is canceled.|condition
～し、～し|and; listing reasons|この店は安いし、便利です。|This shop is cheap and convenient.|listing
～たり～たりします|do things such as|休みの日は掃除したり、洗濯したりします。|On days off, I do things like cleaning and laundry.|listing
～のに|although; even though|薬を飲んだのに、まだ痛いです。|Although I took medicine, it still hurts.|contrast
～ので|because; since|雨が降っているので、家にいます。|Since it is raining, I will stay home.|reason
～から (reason)|because|時間がないから、急ぎましょう。|Because there is no time, let's hurry.|reason
～けれども|but; although|この部屋は狭いけれども、静かです。|This room is narrow, but quiet.|contrast
～が (but)|but; soft contrast|高いですが、買いたいです。|It is expensive, but I want to buy it.|contrast
～のは|the thing of doing is|日本語を話すのは楽しいです。|Speaking Japanese is fun.|nominalizer
～のが|doing as subject/object|私は泳ぐのが好きです。|I like swimming.|nominalizer
～のを|doing as object|電気を消すのを忘れました。|I forgot to turn off the light.|nominalizer
～こと (nominalizer)|turn a verb phrase into a noun|本を読むことは大切です。|Reading books is important.|nominalizer
～という|called; named|「さくら」という歌を知っていますか。|Do you know a song called "Sakura"?|quotation
～という意味|the meaning called|「無料」はお金がいらないという意味です。|"Free" means that money is not needed.|meaning
～かどうか|whether or not|明日行くかどうか、まだ分かりません。|I still do not know whether I will go tomorrow.|embedded-question
疑問詞＋か|some question word; embedded unknown|誰が来るか教えてください。|Please tell me who is coming.|embedded-question
～について|about; concerning|日本の文化について勉強しています。|I am studying about Japanese culture.|topic
～にとって|for; from the viewpoint of|私にとって家族は大切です。|For me, family is important.|viewpoint
～によると|according to|天気予報によると、明日は雨です。|According to the weather forecast, it will rain tomorrow.|source
～によって (method)|by means of; depending on|インターネットによって情報を調べます。|I look up information by means of the internet.|method
～として|as; in the role of|兄は医者として働いています。|My older brother works as a doctor.|role
～までに|by; no later than|五時までに帰ってください。|Please return by five o'clock.|deadline
～まで|until; up to|駅まで歩きます。|I will walk to the station.|limit
～から～まで|from one point to another|会議は一時から三時までです。|The meeting is from one to three.|range
～だけ|only; just|水だけ飲みました。|I drank only water.|limitation
～しか～ない|only; nothing but|千円しかありません。|I only have one thousand yen.|limitation
～ほど|about; to the extent|三十分ほど待ちました。|I waited about thirty minutes.|degree
～くらい / ～ぐらい|about; approximately|駅まで十分ぐらいかかります。|It takes about ten minutes to the station.|degree
～より|than; compared with|今日は昨日より寒いです。|Today is colder than yesterday.|comparison
～の方が|is more; prefer one side|バスより電車の方が速いです。|The train is faster than the bus.|comparison
～で一番|the most among|季節の中で春が一番好きです。|Among the seasons, I like spring the most.|comparison
～ほど～ない|not as much as|この道はあの道ほど広くないです。|This road is not as wide as that road.|comparison
～ば～ほど|the more A, the more B|練習すればするほど上手になります。|The more you practice, the better you become.|comparison
～と (natural result)|when; if, a natural result follows|このボタンを押すと、電気がつきます。|When you push this button, the light turns on.|condition
～ないと|if not; must|急がないと、電車に遅れます。|If we do not hurry, we will be late for the train.|condition
～ように (in order to)|so that; in order to|忘れないように、メモします。|I make a note so that I will not forget.|purpose
～ないように|so as not to|風邪をひかないように、早く寝ます。|I sleep early so that I will not catch a cold.|purpose
～ための|for the purpose of|試験のための資料を作りました。|I made materials for the exam.|purpose
～ような|like; similar kind of|夢のような話ですね。|That is a story like a dream.|similarity
～みたいな|like; similar to (casual noun modifier)|子どもみたいな言い方です。|It is a way of speaking like a child.|similarity
～そうな|looks; seems (before noun)|おいしそうなケーキですね。|That is a delicious-looking cake.|appearance
～そうに|in a way that looks|子どもが楽しそうに遊んでいます。|The children are playing happily.|appearance
～がします|sense; smell/sound/taste is perceived|台所からいい匂いがします。|A good smell comes from the kitchen.|senses
～がります|seem to feel; show signs of feeling|子どもは犬を怖がっています。|The child is showing fear of the dog.|feelings
～たがります|someone else wants to do|弟は外で遊びたがっています。|My younger brother wants to play outside.|desire
～たいと思います|think one wants to do|将来、外国で働きたいと思います。|I think I want to work abroad in the future.|desire
～ようと思います|think one will do; intend to|明日先生に相談しようと思います。|I think I will consult the teacher tomorrow.|intention
～ようとします|try to do; be about to do|電車に乗ろうとした時、ドアが閉まりました。|When I tried to get on the train, the door closed.|attempt
～ほしいです|want something|新しい自転車がほしいです。|I want a new bicycle.|desire
～てほしいです (request)|want someone to do something|友達に手伝ってほしいです。|I want my friend to help.|request
～まま|as is; without changing state|電気をつけたまま寝てしまいました。|I fell asleep with the light left on.|state
～はもちろん|not to mention; of course|漢字はもちろん、文法も勉強します。|I study grammar as well, not to mention kanji.|addition
～だけでなく|not only, but also|この店は安いだけでなく、便利です。|This shop is not only cheap but also convenient.|addition
～ばかり|only; just|弟はゲームばかりしています。|My younger brother only plays games.|limitation
～ばかりでなく|not only|彼は英語ばかりでなく、日本語も話せます。|He can speak not only English but also Japanese.|addition
～ことはありません|there is no need to; never happens|そんなに心配することはありません。|There is no need to worry that much.|negation
～必要があります|need to; it is necessary to|予約する必要があります。|It is necessary to make a reservation.|necessity
～必要はありません|there is no need to|急ぐ必要はありません。|There is no need to hurry.|necessity
～ことが必要です|doing is necessary|毎日練習することが必要です。|Practicing every day is necessary.|necessity
～方がいいです (advice)|had better do|早く寝た方がいいです。|You had better sleep early.|advice
～た方がいいです|had better do|病院へ行った方がいいです。|You had better go to the hospital.|advice
～ない方がいいです|had better not do|夜遅く一人で歩かない方がいいです。|You had better not walk alone late at night.|advice
～てもらえませんか|could you do for me|この漢字を読んでもらえませんか。|Could you read this kanji for me?|request
お～ください|honorific request|こちらでお待ちください。|Please wait here.|honorific
お～になります|honorific verb form|先生はもうお帰りになりました。|The teacher has already gone home.|honorific
お～します|humble verb form|荷物をお持ちします。|I will carry your luggage.|honorific
～になります (noun/na-adjective change)|become; turn into|来年、大学生になります。|Next year I will become a university student.|change
～くなります|become (i-adjective)|だんだん暖かくなります。|It gradually becomes warm.|change
～にします (choice)|decide on; choose|私はコーヒーにします。|I will choose coffee.|choice
～くします|make something i-adjective|音を小さくしてください。|Please make the sound quieter.|change
～にします (make into)|make something into a noun/na-adjective state|部屋をきれいにしました。|I made the room clean.|change
～出します|suddenly start doing|赤ちゃんが泣き出しました。|The baby suddenly started crying.|beginning
～始めます|begin to do|日本語を勉強し始めました。|I began studying Japanese.|beginning
～終わります|finish doing|本を読み終わりました。|I finished reading the book.|completion
～続けます|continue doing|毎日走り続けています。|I continue running every day.|continuation
～直します|redo; do again|答えを書き直しました。|I rewrote the answer.|redo
～合います|do together; mutually|友達と助け合います。|Friends help each other.|mutual
～過ぎ|too; excessive as a noun/stem|食べ過ぎは体によくないです。|Eating too much is not good for the body.|degree
～中|in the middle of; during|会議中は電話を使わないでください。|Please do not use phones during the meeting.|time
～通りに|just as; according to|先生が言った通りに書きました。|I wrote it just as the teacher said.|manner
～やすい (tendency)|prone to; easily becomes|この道は雨の日に滑りやすいです。|This road is slippery on rainy days.|ease
～にくい (difficulty)|difficult to do; hard to happen|この説明は分かりにくいです。|This explanation is hard to understand.|difficulty
～そうもありません|does not look likely to|雨は止みそうもありません。|The rain does not look likely to stop.|appearance
～かな|I wonder; maybe|明日は晴れるかな。|I wonder if it will be sunny tomorrow.|uncertainty
～かなと思います|I wonder if; I am thinking maybe|少し休もうかなと思います。|I am thinking I might rest a little.|uncertainty
`;

module.exports = lines.trim().split('\n').map(line => {
  const [front, back, exampleJp, exampleTranslation, tags] = line.split('|').map(part => part.trim());
  return {
    front,
    back,
    exampleJp,
    exampleTranslation,
    tags: ['grammar', ...tags.split(',').map(tag => tag.trim()).filter(Boolean)],
  };
});
