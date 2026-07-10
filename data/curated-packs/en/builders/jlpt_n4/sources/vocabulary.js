const groups = [
  ['people', `
相手|other person; partner|noun|people
受付係|reception clerk|noun|people,work
客|customer; guest|noun|people,services
先輩|senior colleague|noun|people,school-work
後輩|junior colleague|noun|people,school-work
上司|boss; superior|noun|people,work
部下|subordinate|noun|people,work
同僚|coworker|noun|people,work
社長|company president|noun|people,work
部長|department manager|noun|people,work
課長|section manager|noun|people,work
係|person in charge|noun|people,services
係員|staff member|noun|people,services
研究者|researcher|noun|people,work
看護師|nurse|noun|people,health
運転手|driver|noun|people,transport
警官|police officer|noun|people,public
歯医者|dentist|noun|people,health
美容師|hairdresser|noun|people,services
農家|farmer|noun|people,work
作家|writer|noun|people,work
歌手|singer|noun|people,arts
俳優|actor|noun|people,arts
選手|athlete; player|noun|people,sports
大学生|university student|noun|people,school
高校生|high school student|noun|people,school
中学生|junior high school student|noun|people,school
小学生|elementary school student|noun|people,school
近所の人|neighbor|noun|people,home
親子|parent and child|noun|people,family
両親|parents|noun|people,family
祖父|grandfather|noun|people,family
祖母|grandmother|noun|people,family
孫|grandchild|noun|people,family
夫婦|married couple|noun|people,family
妻|wife|noun|people,family
夫|husband|noun|people,family
息子|son|noun|people,family
娘|daughter|noun|people,family
兄弟|siblings; brothers|noun|people,family
姉妹|sisters|noun|people,family
親戚|relative|noun|people,family
いとこ|cousin|noun|people,family
赤ちゃん|baby|noun|people,family
大人|adult|noun|people
若者|young person|noun|people
お年寄り|elderly person|noun|people
外国人|foreigner|noun|people
日本人|Japanese person|noun|people
留学生|international student|noun|people,school
`],
  ['home-daily-life', `
生活|daily life; living|noun|daily-life
暮らし|livelihood; way of life|noun|daily-life
家事|housework|noun|daily-life,home
掃除|cleaning|noun|daily-life,home
洗濯|laundry|noun|daily-life,home
料理|cooking; dish|noun|daily-life,food
片付け|tidying up|noun|daily-life,home
引っ越し|moving house|noun|daily-life,home
住所|address|noun|home,services
部屋|room|noun|home
台所|kitchen|noun|home,food
玄関|entrance hall|noun|home
廊下|hallway|noun|home
階段|stairs|noun|home
壁|wall|noun|home
窓|window|noun|home
ドア|door|noun|home
鍵|key; lock|noun|home
電気|electric light; electricity|noun|home
電池|battery|noun|home,object
冷蔵庫|refrigerator|noun|home,food
洗濯機|washing machine|noun|home
電子レンジ|microwave oven|noun|home,food
エアコン|air conditioner|noun|home
暖房|heating|noun|home
冷房|air conditioning|noun|home
机|desk|noun|home,school
本棚|bookshelf|noun|home
押し入れ|closet|noun|home
布団|futon|noun|home
毛布|blanket|noun|home
枕|pillow|noun|home
鏡|mirror|noun|home
タオル|towel|noun|home
石けん|soap|noun|home
歯ブラシ|toothbrush|noun|home,health
皿|plate|noun|home,food
茶碗|rice bowl; teacup|noun|home,food
箸|chopsticks|noun|home,food
スプーン|spoon|noun|home,food
コップ|cup; glass|noun|home,food
袋|bag|noun|object,shopping
箱|box|noun|object
財布|wallet|noun|object,shopping
荷物|luggage; baggage|noun|object,travel
ゴミ|trash|noun|home
ごみ箱|trash can|noun|home
庭|garden; yard|noun|home,nature
屋根|roof|noun|home
ベランダ|balcony|noun|home
`],
  ['school-work', `
授業|class; lesson|noun|school
講義|lecture|noun|school
教室|classroom|noun|school
校長|principal|noun|school
事務所|office|noun|work
会社|company|noun|work
工場|factory|noun|work
職場|workplace|noun|work
仕事|work; job|noun|work
残業|overtime work|noun|work
出張|business trip|noun|work,travel
休憩|break; rest|noun|work,daily-life
会議|meeting|noun|work
予定|schedule; plan|noun|time,work
計画|plan|noun|work
連絡|contact; communication|noun|work,communication
報告|report|noun|work,communication
相談|consultation|noun|work,communication
説明|explanation|noun|school-work,communication
案内|guidance; information|noun|services,travel
受付|reception desk|noun|services,work
書類|documents|noun|work
資料|materials; data|noun|work,school
レポート|report; paper|noun|school
宿題|homework|noun|school
試験|exam|noun|school
合格|passing an exam|noun|school
不合格|failing an exam|noun|school
成績|grades; results|noun|school
出席|attendance|noun|school
欠席|absence|noun|school
遅刻|lateness|noun|school-work
早退|leaving early|noun|school-work
練習|practice|noun|school,sports
復習|review; revision|noun|school
予習|lesson preview; preparation for class|noun|school
研究|research|noun|school-work
科目|school subject|noun|school
数学|mathematics|noun|school
科学|science|noun|school
歴史|history|noun|school
地理|geography|noun|school
文学|literature|noun|school
英語|English language|noun|school
教育|education|noun|school
経験|experience|noun|work
技術|skill; technology|noun|work
道具|tool|noun|work,object
運動|exercise; sports|noun|health,sports
`],
  ['travel-transport', `
旅行|travel; trip|noun|travel
旅館|Japanese inn|noun|travel
ホテル|hotel|noun|travel
予約|reservation|noun|travel,services
切符|ticket|noun|travel
乗車券|passenger ticket|noun|travel
定期券|commuter pass|noun|travel
電車|train|noun|travel
地下鉄|subway|noun|travel
新幹線|bullet train|noun|travel
飛行機|airplane|noun|travel
船|ship; boat|noun|travel
タクシー|taxi|noun|travel
バス停|bus stop|noun|travel
空港|airport|noun|travel
港|harbor; port|noun|travel
駅前|in front of the station|noun|travel
線|line; route|noun|travel
番線|platform number|noun|travel
出口|exit|noun|travel
入り口|entrance|noun|travel
交差点|intersection|noun|travel
信号|traffic light|noun|travel
道路|road|noun|travel
歩道|sidewalk|noun|travel
橋|bridge|noun|travel
坂|slope; hill road|noun|travel
角|corner|noun|travel
地図|map|noun|travel
目的地|destination|noun|travel
案内所|information center|noun|travel
観光|sightseeing|noun|travel
観光客|tourist|noun|travel,people
お土産|souvenir|noun|travel,shopping
景色|scenery|noun|travel,nature
海岸|seashore|noun|travel,nature
温泉|hot spring|noun|travel
神社|shrine|noun|travel,culture
お寺|temple|noun|travel,culture
博物館|museum|noun|travel,culture
美術館|art museum|noun|travel,culture
動物園|zoo|noun|travel
公園|park|noun|travel,nature
駐車場|parking lot|noun|travel
自転車|bicycle|noun|travel
自動車|automobile|noun|travel
運転|driving|noun|travel
事故|accident|noun|travel
乗り換え|transfer|noun|travel
往復|round trip|noun|travel
`],
  ['shopping-services', `
買い物|shopping|noun|shopping
売り場|sales floor; department|noun|shopping
売店|stand; kiosk|noun|shopping
スーパー|supermarket|noun|shopping
コンビニ|convenience store|noun|shopping
デパート|department store|noun|shopping
市場|market|noun|shopping
商店|small store|noun|shopping
値段|price|noun|shopping
料金|fee; charge|noun|shopping,services
代金|payment; price|noun|shopping
お釣り|change (money)|noun|shopping
現金|cash|noun|shopping
カード|card|noun|shopping
レシート|receipt|noun|shopping
領収書|receipt|noun|shopping
割引|discount|noun|shopping
セール|sale|noun|shopping
注文|order|noun|shopping,food
配達|delivery|noun|services
郵便|mail|noun|services
郵便局|post office|noun|services
手紙|letter|noun|services,communication
はがき|postcard|noun|services
切手|stamp|noun|services
宅配便|parcel delivery|noun|services
銀行|bank|noun|services
振り込み|bank transfer|noun|services
口座|bank account|noun|services
番号|number|noun|services
用紙|form; paper|noun|services
申込|application|noun|services
修理|repair|noun|services
交換|exchange; replacement|noun|services
返品|returning goods|noun|services
サイズ|size|noun|shopping
色|color|noun|shopping
形|shape|noun|shopping
品物|goods; item|noun|shopping
商品|product|noun|shopping
レジ|cash register|noun|shopping
薬局|pharmacy|noun|services,health
クリーニング|dry cleaning|noun|services
美容院|beauty salon|noun|services
理髪店|barber shop|noun|services
営業時間|business hours|noun|services,time
支払い|payment|noun|shopping
包装|wrapping; packaging|noun|shopping
試着|trying on clothes|noun|shopping
会計|bill; checkout|noun|shopping
`],
  ['food-cooking', `
食事|meal|noun|food
朝食|breakfast|noun|food,time
昼食|lunch|noun|food,time
夕食|dinner|noun|food,time
弁当|boxed lunch|noun|food
米|rice (uncooked)|noun|food
ご飯|rice; meal|noun|food
味噌汁|miso soup|noun|food
肉|meat|noun|food
牛肉|beef|noun|food
豚肉|pork|noun|food
鶏肉|chicken meat|noun|food
魚|fish|noun|food
卵|egg|noun|food
野菜|vegetables|noun|food
果物|fruit|noun|food
りんご|apple|noun|food
みかん|mandarin orange|noun|food
バナナ|banana|noun|food
いちご|strawberry|noun|food
じゃがいも|potato|noun|food
にんじん|carrot|noun|food
玉ねぎ|onion|noun|food
きゅうり|cucumber|noun|food
トマト|tomato|noun|food
キャベツ|cabbage|noun|food
パン|bread|noun|food
麺|noodles|noun|food
そば|soba noodles|noun|food
うどん|udon noodles|noun|food
ラーメン|ramen|noun|food
カレー|curry|noun|food
サラダ|salad|noun|food
砂糖|sugar|noun|food
塩|salt|noun|food
醤油|soy sauce|noun|food
油|oil|noun|food
飲み水|drinking water|noun|food
お茶|tea|noun|food
コーヒー|coffee|noun|food
牛乳|milk|noun|food
ジュース|juice|noun|food
酒|alcohol; sake|noun|food
味|taste; flavor|noun|food
甘さ|sweetness|noun|food
辛さ|spiciness|noun|food
苦さ|bitterness|noun|food
材料|ingredient; material|noun|food
献立|menu; meal plan|noun|food
包丁|kitchen knife|noun|food
`],
  ['health-body', `
体調|physical condition|noun|health
頭の中|inside one's head; mind|noun|health
顔色|complexion|noun|health
目薬|eye drops|noun|health
耳元|near the ear|noun|health
鼻|nose|noun|health
口元|around the mouth|noun|health
歯|tooth|noun|health
喉|throat|noun|health
首筋|side or back of the neck|noun|health
肩|shoulder|noun|health
腕|arm|noun|health
手のひら|palm of the hand|noun|health
指|finger|noun|health
背中|back|noun|health
腰|lower back; waist|noun|health
お腹|stomach; belly|noun|health
足首|ankle|noun|health
膝|knee|noun|health
皮膚|skin|noun|health
熱|fever; heat|noun|health
咳|cough|noun|health
風邪|cold; flu|noun|health
病気|illness|noun|health
病院|hospital|noun|health
医院|clinic|noun|health
飲み薬|oral medicine|noun|health
けが|injury|noun|health
傷|wound; scratch|noun|health
痛み|pain|noun|health
頭痛|headache|noun|health
腹痛|stomachache|noun|health
具合|condition; state|noun|health
気分|feeling; mood|noun|health
健康|health|noun|health
元気|healthy; energetic|na-adj|health
疲れ|tiredness|noun|health
眠気|sleepiness|noun|health
食欲|appetite|noun|health
体温|body temperature|noun|health
診察|medical examination|noun|health
注射|injection|noun|health
入院|hospitalization|noun|health
退院|leaving the hospital|noun|health
保険証|health insurance card|noun|health
救急車|ambulance|noun|health
医学|medical science|noun|health
運動不足|lack of exercise|noun|health
睡眠|sleep|noun|health
息|breath|noun|health
`],
  ['feelings-opinions', `
気持ち|feeling|noun|feelings
意見|opinion|noun|feelings,communication
考え|thought; idea|noun|feelings
希望|hope; wish|noun|feelings
夢|dream|noun|feelings
心配|worry|na-adj|feelings
安心|relief; peace of mind|na-adj|feelings
不安|anxiety|na-adj|feelings
満足|satisfaction|na-adj|feelings
不満|dissatisfaction|noun|feelings
興味|interest|noun|feelings
関心|interest; concern|noun|feelings
感動|being moved emotionally|noun|feelings
驚き|surprise|noun|feelings
失敗|failure|noun|feelings
成功|success|noun|feelings
喜び|joy|noun|feelings
悲しみ|sadness|noun|feelings
怒り|anger|noun|feelings
笑顔|smiling face|noun|feelings
涙|tears|noun|feelings
好み|preference|noun|feelings
反対|opposition|noun|feelings
賛成|agreement; approval|noun|feelings
理由|reason|noun|feelings
原因|cause|noun|feelings
結果|result|noun|feelings
問題|problem|noun|feelings
答え|answer|noun|feelings,school
返事|reply|noun|feelings,communication
約束|promise; appointment|noun|feelings
目的|purpose|noun|feelings
必要性|necessity|noun|feelings
不要品|unneeded item|noun|daily-life
自由さ|freedom|noun|feelings
不自由|inconvenience; disability|na-adj|feelings
無理|impossible; unreasonable|na-adj|feelings
無駄|wasteful|na-adj|feelings
大切さ|importance|noun|feelings
重要性|importance|noun|feelings
普通さ|ordinariness|noun|feelings
特別感|special feeling|noun|feelings
変化|change|noun|feelings
違い|difference|noun|feelings
間違い|mistake|noun|feelings
本当|truth; reality|noun|feelings
嘘|lie|noun|feelings
冗談|joke|noun|feelings
感じ|feeling; impression|noun|feelings
覚悟|resolve; readiness|noun|feelings
`],
  ['verbs-movement-action', `
動く|to move|verb|movement
歩く|to walk|verb|movement
走る|to run|verb|movement
泳ぐ|to swim|verb|movement
飛ぶ|to fly; jump|verb|movement
渡る|to cross|verb|movement
曲がる|to turn; bend|verb|movement
戻る|to return|verb|movement
進む|to advance|verb|movement
止まる|to stop|verb|movement
止める|to stop something|verb|movement
出発する|to depart|verb|movement,travel
到着する|to arrive|verb|movement,travel
乗る|to ride; get on|verb|movement,travel
降りる|to get off|verb|movement,travel
乗り換える|to transfer|verb|movement,travel
通る|to pass through|verb|movement
通う|to commute; attend|verb|movement
運ぶ|to carry|verb|movement
送る|to send; see off|verb|movement,communication
届く|to arrive; be delivered|verb|movement
届ける|to deliver|verb|movement
入る|to enter|verb|movement
出る|to go out; leave|verb|movement
出かける|to go out|verb|movement
帰る|to go home|verb|movement
連れて行く|to take someone along|verb|movement
連れて来る|to bring someone along|verb|movement
持って行く|to take something|verb|movement
持って来る|to bring something|verb|movement
迎える|to welcome; pick up|verb|movement
逃げる|to run away|verb|movement
追う|to chase|verb|movement
探す|to search for|verb|action
見つかる|to be found|verb|action
見つける|to find|verb|action
集まる|to gather|verb|action
集める|to collect|verb|action
並ぶ|to line up|verb|action
並べる|to arrange in a line|verb|action
開く|to open|verb|action
開ける|to open something|verb|action
閉まる|to close|verb|action
閉める|to close something|verb|action
押す|to push|verb|action
引く|to pull|verb|action
置く|to put; place|verb|action
片付ける|to tidy up|verb|action
捨てる|to throw away|verb|action
拾う|to pick up|verb|action
`],
  ['verbs-communication-thinking', `
言う|to say|verb|communication
話す|to speak|verb|communication
聞く|to listen; ask|verb|communication
尋ねる|to ask|verb|communication
答える|to answer|verb|communication
返事する|to reply|verb|communication
伝える|to tell; convey|verb|communication
知らせる|to notify|verb|communication
連絡する|to contact|verb|communication
説明する|to explain|verb|communication
相談する|to consult|verb|communication
頼む|to ask; request|verb|communication
断る|to refuse|verb|communication
誘う|to invite|verb|communication
約束する|to promise|verb|communication
紹介する|to introduce|verb|communication
案内する|to guide|verb|communication
教える|to teach; tell|verb|communication
習う|to learn|verb|school
覚える|to memorize|verb|school
忘れる|to forget|verb|thinking
思う|to think|verb|thinking
考える|to think about|verb|thinking
決める|to decide|verb|thinking
決まる|to be decided|verb|thinking
選ぶ|to choose|verb|thinking
比べる|to compare|verb|thinking
調べる|to look up; investigate|verb|thinking
分かる|to understand|verb|thinking
気づく|to notice|verb|thinking
気をつける|to be careful|verb|thinking
信じる|to believe|verb|thinking
疑う|to doubt|verb|thinking
期待する|to expect; hope for|verb|feelings
心配する|to worry|verb|feelings
安心する|to feel relieved|verb|feelings
感じる|to feel|verb|feelings
驚く|to be surprised|verb|feelings
怒る|to get angry|verb|feelings
笑う|to laugh|verb|feelings
泣く|to cry|verb|feelings
喜ぶ|to be pleased|verb|feelings
楽しむ|to enjoy|verb|feelings
反対する|to oppose|verb|feelings
賛成する|to agree|verb|feelings
失敗する|to fail|verb|school-work
成功する|to succeed|verb|school-work
受ける|to take; receive|verb|school-work
受かる|to pass an exam|verb|school
落ちる|to fall; fail|verb|school
`],
  ['verbs-daily-handling', `
食べる|to eat|verb|food
飲む|to drink|verb|food
作る|to make|verb|daily-life
料理する|to cook|verb|food
洗う|to wash|verb|daily-life
磨く|to polish; brush|verb|daily-life
浴びる|to bathe; shower|verb|daily-life
着る|to wear|verb|daily-life
脱ぐ|to take off clothes|verb|daily-life
履く|to put on shoes|verb|daily-life
かぶる|to wear on the head|verb|daily-life
かける|to hang; put on|verb|daily-life
使う|to use|verb|daily-life
直す|to fix; correct|verb|daily-life
壊す|to break something|verb|daily-life
壊れる|to break|verb|daily-life
消す|to turn off; erase|verb|daily-life
消える|to go out; disappear|verb|daily-life
つける|to turn on; attach|verb|daily-life
つく|to be on; be attached|verb|daily-life
切る|to cut|verb|daily-life
切れる|to be cut; run out|verb|daily-life
入れる|to put in|verb|daily-life
出す|to take out; submit|verb|daily-life
しまう|to put away; finish|verb|daily-life
混ぜる|to mix|verb|food
借りる|to borrow|verb|services
貸す|to lend|verb|services
返す|to return something|verb|services
払う|to pay|verb|shopping
買う|to buy|verb|shopping
売る|to sell|verb|shopping
注文する|to order|verb|food,shopping
予約する|to reserve|verb|services
申し込む|to apply|verb|services
休む|to rest; be absent|verb|daily-life
働く|to work|verb|work
始める|to start something|verb|daily-life
始まる|to start|verb|daily-life
終える|to finish something|verb|daily-life
終わる|to end|verb|daily-life
続ける|to continue something|verb|daily-life
続く|to continue|verb|daily-life
練習する|to practice|verb|school
復習する|to review; study again|verb|school
予習する|to preview lessons; prepare for class|verb|school
用意する|to prepare|verb|daily-life
準備する|to prepare|verb|daily-life
手伝う|to help|verb|daily-life
招待する|to invite|verb|services
`],
  ['i-adjectives', `
明るい|bright; cheerful|i-adj|adjective
暗い|dark; gloomy|i-adj|adjective
温かい|warm (to touch)|i-adj|adjective
暖かい|warm (weather)|i-adj|adjective
涼しい|cool; refreshing|i-adj|adjective
冷たい|cold (to touch)|i-adj|adjective
熱い|hot (to touch)|i-adj|adjective
暑い|hot (weather)|i-adj|adjective
寒い|cold (weather)|i-adj|adjective
ぬるい|lukewarm|i-adj|adjective
厚い|thick|i-adj|adjective
薄い|thin; weak|i-adj|adjective
太い|thick; fat|i-adj|adjective
細い|thin; narrow|i-adj|adjective
広い|wide; spacious|i-adj|adjective
狭い|narrow|i-adj|adjective
深い|deep|i-adj|adjective
浅い|shallow|i-adj|adjective
重い|heavy|i-adj|adjective
軽い|light|i-adj|adjective
強い|strong|i-adj|adjective
弱い|weak|i-adj|adjective
固い|hard; firm|i-adj|adjective
柔らかい|soft|i-adj|adjective
正しい|correct|i-adj|adjective
珍しい|rare; unusual|i-adj|adjective
うるさい|noisy|i-adj|adjective
細かい|small; detailed|i-adj|adjective
詳しい|detailed; knowledgeable|i-adj|adjective
苦い|bitter|i-adj|adjective,food
甘い|sweet|i-adj|adjective,food
辛い|spicy; painful|i-adj|adjective,food
酸っぱい|sour|i-adj|adjective,food
眠い|sleepy|i-adj|adjective,health
恥ずかしい|embarrassing; shy|i-adj|adjective,feelings
寂しい|lonely|i-adj|adjective,feelings
悲しい|sad|i-adj|adjective,feelings
嬉しい|happy; glad|i-adj|adjective,feelings
厳しい|strict; severe|i-adj|adjective
優しい|kind; gentle|i-adj|adjective
美しい|beautiful|i-adj|adjective
素晴らしい|wonderful|i-adj|adjective
恐ろしい|frightening|i-adj|adjective
つまらない|boring|i-adj|adjective
面白い|interesting|i-adj|adjective
ありがたい|thankful; welcome|i-adj|adjective
もったいない|wasteful; too good to waste|i-adj|adjective
危ない|dangerous|i-adj|adjective
ひどい|terrible|i-adj|adjective
すごい|amazing; terrible|i-adj|adjective
`],
  ['na-adjectives', `
安全|safe|na-adj|adjective
危険|dangerous|na-adj|adjective
静か|quiet|na-adj|adjective
にぎやか|lively|na-adj|adjective
便利|convenient|na-adj|adjective
不便|inconvenient|na-adj|adjective
簡単|simple; easy|na-adj|adjective
複雑|complicated|na-adj|adjective
親切|kind|na-adj|adjective
丁寧|polite; careful|na-adj|adjective
失礼|rude; impolite|na-adj|adjective
残念|regrettable; disappointing|na-adj|adjective,feelings
十分|enough; sufficient|na-adj|adjective
不十分|insufficient|na-adj|adjective
大事|required; important|na-adj|adjective
真面目|serious; earnest|na-adj|adjective
熱心|enthusiastic|na-adj|adjective
適当|suitable; careless|na-adj|adjective
急|sudden; urgent|na-adj|adjective
有名|famous|na-adj|adjective
立派|splendid; fine|na-adj|adjective
平和|peaceful|na-adj|adjective
新鮮|fresh|na-adj|adjective,food
正直|honest|na-adj|adjective
正確|accurate|na-adj|adjective
明確|clear; definite|na-adj|adjective
確実|certain; reliable|na-adj|adjective
可能|possible|na-adj|adjective
不可能|impossible|na-adj|adjective
自然|natural|na-adj|adjective,nature
不思議|strange; mysterious|na-adj|adjective
盛ん|thriving; active|na-adj|adjective
苦手|weak at; poor at|na-adj|adjective
得意|good at; proud|na-adj|adjective
上手|skillful|na-adj|adjective
下手|unskillful|na-adj|adjective
好き|liked; favorite|na-adj|adjective
嫌い|disliked|na-adj|adjective
気楽|carefree; at ease|na-adj|adjective
幸せ|happy; fortunate|na-adj|adjective
かわいそう|pitiful|na-adj|adjective
必死|desperate|na-adj|adjective
いろいろ|various|na-adj|adjective
さまざま|various|na-adj|adjective
すてき|nice; lovely|na-adj|adjective
変|strange|na-adj|adjective
大丈夫|all right; okay|na-adj|adjective
けっこう|quite; fine|na-adj|adjective
大変|tough; serious|na-adj|adjective
だめ|no good; not allowed|na-adj|adjective
`],
  ['adverbs-connectors', `
必ず|without fail|adverb|adverb
きっと|surely; certainly|adverb|adverb
たぶん|probably|adverb|adverb
もし|if|adverb|adverb,condition
例えば|for example|adverb|adverb
特に|especially|adverb|adverb
実は|actually|adverb|adverb
確かに|certainly|adverb|adverb
やはり|as expected|adverb|adverb
やっぱり|as expected; after all|adverb|adverb
やっと|finally|adverb|adverb
とうとう|at last|adverb|adverb
さっき|a little while ago|adverb|adverb,time
さっそく|right away|adverb|adverb
すぐに|immediately|adverb|adverb
もうすぐ|very soon|adverb|adverb,time
しばらく|for a while|adverb|adverb,time
しっかり|firmly; properly|adverb|adverb
はっきり|clearly|adverb|adverb
ゆっくり|slowly; leisurely|adverb|adverb
そろそろ|soon; gradually|adverb|adverb,time
どんどん|rapidly; steadily|adverb|adverb
だんだん|gradually|adverb|adverb
どこか|somewhere|adverb|adverb
どこにも|nowhere; not anywhere|adverb|adverb
何か|something|adverb|adverb
何も|nothing; not anything|adverb|adverb
誰か|someone|adverb|adverb
誰も|no one; everyone|adverb|adverb
いつか|someday|adverb|adverb,time
いつでも|anytime|adverb|adverb,time
いつも|always|adverb|adverb,time
たいてい|usually|adverb|adverb,time
たまに|occasionally|adverb|adverb,time
ほとんど|almost; hardly|adverb|adverb
だいたい|mostly; roughly|adverb|adverb
ずっと|all the time; much more|adverb|adverb
ずいぶん|quite; very|adverb|adverb
かなり|fairly; considerably|adverb|adverb
なるべく|as much as possible|adverb|adverb
できるだけ|as much as possible|adverb|adverb
もちろん|of course|adverb|adverb
それに|besides; moreover|connector|connector
それで|and then; therefore|connector|connector
それでは|well then|connector|connector
それでも|even so|connector|connector
ところで|by the way|connector|connector
しかし|however|connector|connector
だから|therefore; so|connector|connector
それとも|or; otherwise|connector|connector
`],
  ['time-frequency', `
時代|era; age|noun|time
時期|period; season|noun|time
期間|period of time|noun|time
期限|deadline|noun|time
予定日|scheduled date|noun|time
毎朝|every morning|noun|time
毎晩|every evening|noun|time
毎週|every week|noun|time
毎月|every month|noun|time
毎年|every year|noun|time
週末|weekend|noun|time
平日|weekday|noun|time
休日|holiday; day off|noun|time
祝日|national holiday|noun|time
昔|long ago|noun|time
将来|future|noun|time
未来|future|noun|time
過去|past|noun|time
現在|present; now|noun|time
今度|next time; this time|noun|time
今回|this time|noun|time
前回|previous time|noun|time
次回|next time|noun|time
最近|recently|noun|time
この間|the other day|noun|time
そのうち|before long; someday|adverb|time
先ほど|a little earlier|noun|time
後ほど|later|noun|time
先に|before; ahead|adverb|time
後で|later; afterward|adverb|time
途中|on the way; in the middle|noun|time
最初|beginning; first|noun|time
最後|end; last|noun|time
始め|beginning|noun|time
終わり|end|noun|time
昼間|daytime|noun|time
夜中|middle of the night|noun|time
夕方|evening|noun|time
今夜|tonight|noun|time
明け方|dawn|noun|time
春|spring|noun|time,nature
夏|summer|noun|time,nature
秋|autumn|noun|time,nature
冬|winter|noun|time,nature
季節|season|noun|time,nature
正月|New Year|noun|time,culture
誕生日|birthday|noun|time
記念日|anniversary|noun|time
午前|morning; a.m.|noun|time
午後|afternoon; p.m.|noun|time
`],
  ['nature-weather', `
天気|weather|noun|nature
青空|blue sky|noun|nature
雲|cloud|noun|nature
雨雲|rain cloud|noun|nature
雪|snow|noun|nature
風|wind|noun|nature
台風|typhoon|noun|nature
地震|earthquake|noun|nature
火事|fire; blaze|noun|nature,public
波|wave|noun|nature
海|sea|noun|nature
湖|lake|noun|nature
川岸|riverbank|noun|nature
池|pond|noun|nature
山道|mountain path|noun|nature
島|island|noun|nature
森|forest|noun|nature
林|woods|noun|nature
樹木|trees and shrubs|noun|nature
草|grass|noun|nature
花束|bouquet|noun|nature
桜|cherry blossom|noun|nature
葉|leaf|noun|nature
枝|branch|noun|nature
石|stone|noun|nature
砂|sand|noun|nature
地面|ground|noun|nature
太陽|sun|noun|nature
月明かり|moonlight|noun|nature
星|star|noun|nature
光|light|noun|nature
影|shadow|noun|nature
音|sound|noun|nature
声|voice|noun|nature
匂い|smell|noun|nature
気温|air temperature|noun|nature
湿度|humidity|noun|nature
暑さ|heat|noun|nature
寒さ|coldness|noun|nature
暖かさ|warmth|noun|nature
涼しさ|coolness|noun|nature
晴れ|clear weather|noun|nature
曇り|cloudy weather|noun|nature
大雨|heavy rain|noun|nature
小雨|light rain|noun|nature
大雪|heavy snow|noun|nature
雷|thunder|noun|nature
風景|landscape|noun|nature
地球|earth; globe|noun|nature
環境|environment|noun|nature
`],
  ['society-public-life', `
社会|society|noun|society
文化|culture|noun|society
習慣|custom; habit|noun|society
規則|rule|noun|society
法律|law|noun|society
交通|traffic; transportation|noun|society
経済|economy|noun|society
政治|politics|noun|society
市役所|city hall|noun|society
役所|government office|noun|society
警察|police|noun|society
交番|police box|noun|society
消防署|fire station|noun|society
図書館|library|noun|society
学校|school|noun|society,school
公民館|community center|noun|society
町中|in town; throughout town|noun|society
市内|inside the city|noun|society
村人|villager|noun|society
都会|city; urban area|noun|society
田舎|countryside|noun|society
地域|region; area|noun|society
近所|neighborhood|noun|society
祭り|festival|noun|society,culture
行事|event|noun|society,culture
参加|participation|noun|society
協力|cooperation|noun|society
募集|recruitment|noun|society
お知らせ|notice; announcement|noun|society
情報|information|noun|society
放送|broadcast|noun|society
新聞|newspaper|noun|society
ニュース|news|noun|society
番組|TV/radio program|noun|society
映画|movie|noun|society
音楽|music|noun|society
スポーツ|sports|noun|society
試合|match; game|noun|society,sports
大会|tournament|noun|society,sports
会場|venue|noun|society
入場|entry; admission|noun|society
禁止|prohibition|noun|society
許可|permission|noun|society
注意|caution; attention|noun|society
安全性|safety|noun|society
危険性|danger; risk|noun|society
事件|incident; case|noun|society
災害|disaster|noun|society,nature
ボランティア|volunteer|noun|society
国際|international|noun|society
`],
  ['quantities-counters-expressions', `
一個|one small item|counter|quantity
二個|two small items|counter|quantity
三個|three small items|counter|quantity
一つ|one thing|counter|quantity
二つ|two things|counter|quantity
三つ|three things|counter|quantity
一人|one person|counter|quantity
二人|two people|counter|quantity
三人|three people|counter|quantity
一枚|one flat item|counter|quantity
二枚|two flat items|counter|quantity
三枚|three flat items|counter|quantity
一冊|one book|counter|quantity
二冊|two books|counter|quantity
三冊|three books|counter|quantity
一本|one long item|counter|quantity
二本|two long items|counter|quantity
三本|three long items|counter|quantity
一台|one machine or vehicle|counter|quantity
二台|two machines or vehicles|counter|quantity
三台|three machines or vehicles|counter|quantity
一匹|one small animal|counter|quantity
二匹|two small animals|counter|quantity
三匹|three small animals|counter|quantity
一杯|one cup; one bowl|counter|quantity
二杯|two cups; two bowls|counter|quantity
三杯|three cups; three bowls|counter|quantity
一回|one time|counter|quantity
二回|two times|counter|quantity
三回|three times|counter|quantity
一階|first floor|counter|quantity
二階|second floor|counter|quantity
三階|third floor|counter|quantity
一番|number one; best|counter|quantity
二番|number two|counter|quantity
三番|number three|counter|quantity
半分|half|noun|quantity
全部|all; everything|noun|quantity
一部|one part|noun|quantity
両方|both|noun|quantity
片方|one side; one of a pair|noun|quantity
以上|at least; more than|noun|quantity
以下|at most; less than|noun|quantity
以内|within|noun|quantity
以外|except; other than|noun|quantity
ほど|about; extent|noun|quantity
くらい|about; approximately|noun|quantity
ぐらい|about; approximately|noun|quantity
約|approximately|noun|quantity
倍|times; double|noun|quantity
割合|ratio; percentage|noun|quantity
`],
];

function firstMeaning(back) {
  return back.replace(/;.*$/, '').trim();
}

function verbBase(back) {
  return firstMeaning(back).replace(/^to\s+/, '').trim();
}

function nounPhrase(back) {
  const value = firstMeaning(back);
  if (/^(all|both|cash|homework|housework|laundry|mail|music|news|rice|science|sleep|work|water|weather|shopping|sightseeing|travel)$/i.test(value)) {
    return value;
  }
  if (/^(one|two|three|at least|at most|within|except|about|approximately|more than|less than|inside|outside|in front)/i.test(value)) {
    return value;
  }
  if (/s$/.test(value) && !/ss$/.test(value)) return `the ${value}`;
  if (/^[aeiou]/i.test(value)) return `an ${value}`;
  return `a ${value}`;
}

function simpleNoun(back) {
  return firstMeaning(back).replace(/^(a|an|the)\s+/i, '').trim();
}

function pick(list, index) {
  return list[index % list.length];
}

const ADVERB_EXAMPLES = {
  '必ず': ['出かける前に必ず鍵をかけます。', 'I always lock the door before going out.'],
  'きっと': ['田中さんはきっと来るでしょう。', 'Mr. Tanaka will surely come.'],
  'たぶん': ['明日はたぶん雨です。', 'Tomorrow will probably be rainy.'],
  'もし': ['もし時間があれば、手伝ってください。', 'If you have time, please help me.'],
  '例えば': ['例えば、駅までバスで行けます。', 'For example, you can go to the station by bus.'],
  '特に': ['この店の魚料理が特に好きです。', 'I especially like this shop’s fish dishes.'],
  '実は': ['実は、まだ宿題が終わっていません。', 'Actually, I have not finished my homework yet.'],
  '確かに': ['確かにこの道の方が近いです。', 'This road is certainly closer.'],
  'やはり': ['やはり今日は家で休みます。', 'As expected, I will rest at home today.'],
  'やっぱり': ['やっぱり電車で行くことにしました。', 'After all, I decided to go by train.'],
  'やっと': ['やっとレポートを書き終わりました。', 'I finally finished writing the report.'],
  'とうとう': ['とうとう新しい自転車を買いました。', 'At last, I bought a new bicycle.'],
  'さっき': ['さっき母から電話がありました。', 'My mother called a little while ago.'],
  'さっそく': ['さっそく新しい靴を履いてみました。', 'I tried on the new shoes right away.'],
  'すぐに': ['具合が悪い時はすぐに休んでください。', 'Please rest immediately when you feel sick.'],
  'もうすぐ': ['もうすぐ授業が始まります。', 'Class will start very soon.'],
  'しばらく': ['ここでしばらく待ちましょう。', 'Let’s wait here for a while.'],
  'しっかり': ['試験の前にしっかり復習します。', 'I review thoroughly before the exam.'],
  'はっきり': ['名前をはっきり書いてください。', 'Please write your name clearly.'],
  'ゆっくり': ['週末は家でゆっくり休みます。', 'I rest leisurely at home on weekends.'],
  'そろそろ': ['そろそろ駅へ行きましょう。', 'Let’s head to the station soon.'],
  'どんどん': ['日本語の本がどんどん読めるようになりました。', 'I became able to read Japanese books more and more.'],
  'だんだん': ['だんだん涼しくなってきました。', 'It has gradually become cooler.'],
  'どこか': ['休みにどこか静かな所へ行きたいです。', 'I want to go somewhere quiet on my day off.'],
  'どこにも': ['探しましたが、鍵はどこにもありませんでした。', 'I looked, but the key was not anywhere.'],
  '何か': ['昼ご飯に何か温かい物を食べたいです。', 'I want to eat something warm for lunch.'],
  '何も': ['今朝は何も食べませんでした。', 'I did not eat anything this morning.'],
  '誰か': ['道が分からないので、誰かに聞きましょう。', 'Since we do not know the way, let’s ask someone.'],
  '誰も': ['夜の教室には誰もいません。', 'There is no one in the classroom at night.'],
  'いつか': ['いつか北海道を旅行したいです。', 'I want to travel to Hokkaido someday.'],
  'いつでも': ['質問があれば、いつでも聞いてください。', 'If you have questions, please ask anytime.'],
  'いつも': ['父はいつも朝早く起きます。', 'My father always wakes up early.'],
  'たいてい': ['週末はたいてい家で料理します。', 'I usually cook at home on weekends.'],
  'たまに': ['たまに友達と映画を見に行きます。', 'I occasionally go see movies with friends.'],
  'ほとんど': ['この問題はほとんど分かりました。', 'I understood almost all of this problem.'],
  'だいたい': ['宿題はだいたい終わりました。', 'My homework is mostly finished.'],
  'ずっと': ['兄は私よりずっと背が高いです。', 'My older brother is much taller than I am.'],
  'ずいぶん': ['今日はずいぶん暖かいですね。', 'It is quite warm today.'],
  'かなり': ['この坂はかなり急です。', 'This slope is fairly steep.'],
  'なるべく': ['なるべく早く返事します。', 'I will reply as soon as possible.'],
  'できるだけ': ['できるだけ毎日練習します。', 'I practice every day as much as possible.'],
  'もちろん': ['もちろん、手伝いますよ。', 'Of course, I will help.'],
  'それに': ['この部屋は明るいです。それに、静かです。', 'This room is bright. Besides, it is quiet.'],
  'それで': ['電車が止まりました。それで、バスで行きました。', 'The train stopped. Therefore, I went by bus.'],
  'それでは': ['それでは、会議を始めましょう。', 'Well then, let’s start the meeting.'],
  'それでも': ['雨でした。それでも、試合はありました。', 'It was rainy. Even so, the match was held.'],
  'ところで': ['ところで、週末の予定はありますか。', 'By the way, do you have plans for the weekend?'],
  'しかし': ['この道は近いです。しかし、少し危ないです。', 'This road is close. However, it is a little dangerous.'],
  'だから': ['明日は試験です。だから、早く寝ます。', 'Tomorrow is an exam. So, I will sleep early.'],
  'それとも': ['電車で行きますか。それとも、バスで行きますか。', 'Will you go by train, or will you go by bus?'],
};

function hasTag(item, tag) {
  return Array.isArray(item.tags) && item.tags.includes(tag);
}

function cleanMeaning(back) {
  return firstMeaning(back)
    .replace(/\s*\([^)]*\)/g, '')
    .replace(/^to\s+/, '')
    .trim();
}

function topicTerm(back) {
  return `the ${cleanMeaning(back)}`;
}

function capFirst(value) {
  return value ? value[0].toUpperCase() + value.slice(1) : value;
}

function adjectiveTerm(back) {
  return cleanMeaning(back).replace(/;.*$/, '').trim();
}

const EXACT_EXAMPLES = {
  '生活': ['新しい生活に少しずつ慣れてきました。', 'I have gradually gotten used to my new daily life.'],
  '暮らし': ['田舎の暮らしは静かで好きです。', 'I like the quiet way of life in the countryside.'],
  '家事': ['週末は家事をまとめてします。', 'I do the housework all together on the weekend.'],
  '掃除': ['朝、部屋の掃除をしました。', 'I cleaned my room in the morning.'],
  '洗濯': ['雨の日は洗濯がなかなか乾きません。', 'Laundry does not dry easily on rainy days.'],
  '料理': ['父は野菜を使って料理を作りました。', 'My father made a dish with vegetables.'],
  '片付け': ['寝る前に机の片付けをしました。', 'I tidied my desk before going to bed.'],
  '引っ越し': ['来月、駅の近くへ引っ越しをします。', 'I will move house near the station next month.'],
  '住所': ['申込用紙に新しい住所を書きました。', 'I wrote my new address on the application form.'],
  '復習': ['試験の前に文法の復習をしました。', 'I reviewed grammar before the exam.'],
  '予習': ['明日の授業のために予習をしました。', 'I previewed the lesson for tomorrow’s class.'],
  '売り場': ['靴の売り場は二階にあります。', 'The shoe department is on the second floor.'],
  '売店': ['駅の売店で水を買いました。', 'I bought water at the station kiosk.'],
  'スーパー': ['仕事の後でスーパーに寄りました。', 'I stopped by the supermarket after work.'],
  'コンビニ': ['夜、コンビニでお弁当を買いました。', 'At night, I bought a boxed lunch at the convenience store.'],
  'デパート': ['週末にデパートで靴を見ました。', 'I looked at shoes at the department store on the weekend.'],
  '市場': ['朝の市場で新鮮な魚を買いました。', 'I bought fresh fish at the morning market.'],
  '商店': ['駅前の小さな商店で切手を買いました。', 'I bought stamps at a small store in front of the station.'],
  '現金': ['この店では現金で払いました。', 'I paid in cash at this shop.'],
  'カード': ['ホテルの料金をカードで払いました。', 'I paid the hotel fee by card.'],
  '代金': ['本の代金をレジで払いました。', 'I paid for the book at the register.'],
  'お釣り': ['レジでお釣りを受け取りました。', 'I received my change at the register.'],
  'レシート': ['買い物の後でレシートを確認しました。', 'I checked the receipt after shopping.'],
  '領収書': ['会社に出すために領収書をもらいました。', 'I got a receipt to submit to my company.'],
  '郵便': ['郵便は午後に届く予定です。', 'The mail is scheduled to arrive in the afternoon.'],
  '郵便局': ['昼休みに郵便局へ行きました。', 'I went to the post office during lunch break.'],
  '銀行': ['銀行で口座を作りました。', 'I opened a bank account at the bank.'],
  '口座': ['銀行で新しい口座を作りました。', 'I opened a new bank account at the bank.'],
  '薬局': ['薬局で目薬を買いました。', 'I bought eye drops at the pharmacy.'],
  'クリーニング': ['コートをクリーニングに出しました。', 'I sent my coat to the dry cleaner.'],
  '美容院': ['土曜日に美容院を予約しました。', 'I booked the beauty salon for Saturday.'],
  '理髪店': ['父は駅前の理髪店へ行きました。', 'My father went to the barber shop in front of the station.'],
  'レジ': ['レジの前に長い列ができました。', 'A long line formed in front of the cash register.'],
  '味': ['このスープは味が少し濃いです。', 'This soup tastes a little strong.'],
  '甘さ': ['このケーキは甘さがちょうどいいです。', 'This cake has just the right sweetness.'],
  '辛さ': ['カレーの辛さを少し弱くしました。', 'I made the curry a little less spicy.'],
  '苦さ': ['この薬の苦さにまだ慣れません。', 'I am still not used to the bitterness of this medicine.'],
  '材料': ['夕食の材料をスーパーで買いました。', 'I bought the ingredients for dinner at the supermarket.'],
  '献立': ['母と一緒に今週の献立を考えました。', 'I planned this week’s menu with my mother.'],
  '包丁': ['包丁を使う時は気をつけてください。', 'Please be careful when using a kitchen knife.'],
  '頭の中': ['頭の中で予定を整理しました。', 'I organized the plan in my mind.'],
  '目薬': ['目が赤いので目薬をさしました。', 'My eyes were red, so I used eye drops.'],
  '耳元': ['耳元で小さな声が聞こえました。', 'I heard a quiet voice near my ear.'],
  '鼻': ['風邪で鼻の調子がよくありません。', 'My nose has not felt right because of a cold.'],
  '口元': ['口元にご飯がついています。', 'There is rice around your mouth.'],
  '歯': ['歯が痛いので歯医者に行きます。', 'My tooth hurts, so I will go to the dentist.'],
  '首筋': ['首筋が痛いので早く休みます。', 'The back of my neck hurts, so I will rest early.'],
  '飲み薬': ['食後に飲み薬を飲みます。', 'I take oral medicine after meals.'],
  '病院': ['熱が高いので病院へ行きました。', 'I went to the hospital because I had a high fever.'],
  '医院': ['近所の医院で診察を受けました。', 'I had a medical examination at a nearby clinic.'],
  '保険証': ['受付で保険証を見せました。', 'I showed my health insurance card at reception.'],
  '救急車': ['事故の後で救急車が来ました。', 'An ambulance came after the accident.'],
  '指': ['ドアで指を少しけがしました。', 'I hurt my finger a little in the door.'],
  '咳': ['咳が出るので、今日は早く休みます。', 'I have a cough, so I will rest early today.'],
  '痛み': ['薬を飲んだら痛みが少し弱くなりました。', 'After I took medicine, the pain became a little weaker.'],
  '具合': ['今日は具合が悪いので、家で休みます。', 'I feel unwell today, so I will rest at home.'],
  '気分': ['散歩をしたら気分がよくなりました。', 'After taking a walk, I felt better.'],
  '眠気': ['昼食の後で強い眠気を感じました。', 'I felt very sleepy after lunch.'],
  '食欲': ['風邪で食欲があまりありません。', 'I do not have much appetite because of a cold.'],
  '意見': ['会議で自分の意見を言いました。', 'I gave my opinion at the meeting.'],
  '考え': ['友達の考えをよく聞きました。', 'I listened carefully to my friend’s idea.'],
  '希望': ['将来の希望を先生に話しました。', 'I told the teacher about my hope for the future.'],
  '夢': ['子どものころからの夢を大切にしています。', 'I value the dream I have had since childhood.'],
  '心配': ['母は弟のけがを心配しています。', 'My mother is worried about my younger brother’s injury.'],
  '安心': ['友達の元気な声を聞いて安心しました。', 'I felt relieved when I heard my friend’s cheerful voice.'],
  '不安': ['初めての試験で少し不安でした。', 'I felt a little anxious about my first exam.'],
  '満足': ['試験の結果に満足しています。', 'I am satisfied with the exam result.'],
  '興味': ['日本の歴史に興味があります。', 'I am interested in Japanese history.'],
  '関心': ['環境問題に関心を持っています。', 'I am interested in environmental problems.'],
  '感動': ['その映画を見て大きな感動を受けました。', 'I was deeply moved by that movie.'],
  '気持ち': ['正直な気持ちを友達に話しました。', 'I told my friend how I honestly felt.'],
  '感じ': ['この部屋は明るい感じがします。', 'This room has a bright feeling.'],
  '涙': ['うれしくて涙が出ました。', 'I cried tears of joy.'],
  '答え': ['答えが分かった時、安心しました。', 'I felt relieved when I understood the answer.'],
  '間違い': ['間違いに気づいてすぐ直しました。', 'I noticed the mistake and corrected it right away.'],
  '不自由': ['けがをして、しばらく歩くのが不自由でした。', 'After the injury, walking was difficult for a while.'],
  '無理': ['今日は疲れているので無理をしないでください。', 'Please do not push yourself today because you are tired.'],
  '無駄': ['水を無駄にしないように気をつけています。', 'I am careful not to waste water.'],
  '途中': ['学校へ行く途中で友達に会いました。', 'I met a friend on the way to school.'],
  '最初': ['最初に名前を書いてください。', 'Please write your name first.'],
  '最後': ['最後にもう一度確認しました。', 'At the end, I checked once more.'],
  '始め': ['授業の始めに宿題を出しました。', 'At the beginning of class, I submitted my homework.'],
  '終わり': ['映画の終わりで少し泣きました。', 'I cried a little at the end of the movie.'],
  '火事': ['ニュースで大きな火事を見ました。', 'I saw a big fire on the news.'],
  '雪': ['朝から雪が静かに降っています。', 'Snow has been falling quietly since morning.'],
  '台風': ['台風が近づいているので、電車が止まるかもしれません。', 'A typhoon is approaching, so the trains may stop.'],
  '地震': ['地震の時は机の下に入ってください。', 'During an earthquake, please get under a desk.'],
  '川岸': ['川岸をゆっくり歩きました。', 'I walked slowly along the riverbank.'],
  '花束': ['母の誕生日に花束を渡しました。', 'I gave my mother a bouquet for her birthday.'],
  '月明かり': ['月明かりで道が少し見えました。', 'I could see the road a little by moonlight.'],
  '小雨': ['小雨が降っていたので、傘を持って行きました。', 'It was drizzling, so I took an umbrella.'],
  '音': ['夜中に変な音が聞こえました。', 'I heard a strange sound in the middle of the night.'],
  '声': ['廊下から先生の声が聞こえました。', 'I heard the teacher’s voice from the hallway.'],
  '匂い': ['台所からいい匂いがします。', 'A good smell is coming from the kitchen.'],
  '気温': ['今日の気温は昨日より高いです。', 'Today’s air temperature is higher than yesterday’s.'],
  '湿度': ['雨の日は湿度が高くなります。', 'Humidity gets high on rainy days.'],
  '交通': ['朝は駅前の交通が多いです。', 'There is a lot of traffic in front of the station in the morning.'],
  '経済': ['新聞で日本の経済について読みました。', 'I read about Japan’s economy in the newspaper.'],
  '政治': ['父はニュースで政治の話を聞きます。', 'My father listens to political news.'],
  '市役所': ['市役所で住所の変更をしました。', 'I changed my address at city hall.'],
  '役所': ['役所で必要な書類をもらいました。', 'I got the necessary documents at the government office.'],
  '警察': ['道に迷ったので警察に聞きました。', 'I asked the police because I was lost.'],
  '交番': ['駅前の交番で道を聞きました。', 'I asked for directions at the police box in front of the station.'],
  '消防署': ['消防署の前を毎朝通ります。', 'I pass in front of the fire station every morning.'],
  '図書館': ['図書館で静かに本を読みました。', 'I read quietly at the library.'],
  '公民館': ['公民館で日本語の教室があります。', 'There is a Japanese class at the community center.'],
  '町中': ['祭りの日は町中がにぎやかでした。', 'The whole town was lively on the festival day.'],
  '市内': ['市内のバスはとても便利です。', 'The buses inside the city are very convenient.'],
  '厚い': ['冬は厚いコートを着ます。', 'I wear a thick coat in winter.'],
  '薄い': ['この紙はとても薄いです。', 'This paper is very thin.'],
  '太い': ['このペンは少し太いです。', 'This pen is a little thick.'],
  '細い': ['この道は細いので気をつけてください。', 'Please be careful because this road is narrow.'],
  '広い': ['新しい教室は広いです。', 'The new classroom is spacious.'],
  '狭い': ['この部屋は少し狭いです。', 'This room is a little narrow.'],
  '深い': ['この池は思ったより深いです。', 'This pond is deeper than I expected.'],
  '浅い': ['子どもは浅いプールで泳ぎました。', 'The child swam in the shallow pool.'],
  '重い': ['この荷物はとても重いです。', 'This luggage is very heavy.'],
  '軽い': ['このかばんは軽いです。', 'This bag is light.'],
  '強い': ['今日は風が強いです。', 'The wind is strong today.'],
  '弱い': ['この薬は少し弱いです。', 'This medicine is a little weak.'],
  '固い': ['このパンは少し固いです。', 'This bread is a little hard.'],
  '柔らかい': ['この布団は柔らかいです。', 'This futon is soft.'],
  '正しい': ['正しい答えを選んでください。', 'Please choose the correct answer.'],
  '珍しい': ['駅前で珍しい花を見ました。', 'I saw an unusual flower in front of the station.'],
  'うるさい': ['隣の部屋がうるさいです。', 'The room next door is noisy.'],
  '細かい': ['細かい字を読むのは大変です。', 'Reading small letters is hard.'],
  '詳しい': ['田中さんは歴史に詳しいです。', 'Mr. Tanaka is knowledgeable about history.'],
  '危険': ['この道は夜になると危険です。', 'This road is dangerous at night.'],
  '丁寧': ['受付係は丁寧に説明してくれました。', 'The receptionist explained it politely.'],
  'にぎやか': ['祭りの日、町はとてもにぎやかでした。', 'The town was very lively on the festival day.'],
  '簡単': ['この問題は思ったより簡単でした。', 'This problem was easier than I expected.'],
  '食事': ['家族と一緒に食事をしました。', 'I had a meal with my family.'],
  '朝食': ['朝食にパンと卵を食べました。', 'I ate bread and eggs for breakfast.'],
  '昼食': ['昼食は学校の近くで食べました。', 'I ate lunch near the school.'],
  '夕食': ['夕食に魚と野菜を食べました。', 'I ate fish and vegetables for dinner.'],
  '弁当': ['公園で弁当を食べました。', 'I ate a boxed lunch in the park.'],
  '米': ['米を洗ってから炊飯器に入れました。', 'I washed the uncooked rice and put it in the rice cooker.'],
  'ご飯': ['朝ご飯を家で食べました。', 'I ate breakfast at home.'],
  '味噌汁': ['朝食に温かい味噌汁を飲みました。', 'I had warm miso soup for breakfast.'],
  '予約': ['旅行の前にホテルの予約をしました。', 'I made a hotel reservation before the trip.'],
  '切符': ['駅で京都までの切符を買いました。', 'I bought a ticket to Kyoto at the station.'],
  '乗車券': ['乗車券を駅員に見せました。', 'I showed my passenger ticket to the station staff.'],
  '定期券': ['学校へ通うために定期券を使っています。', 'I use a commuter pass to go to school.'],
  '線': ['この線は空港まで行きます。', 'This line goes to the airport.'],
  '番線': ['電車は三番線から出ます。', 'The train leaves from platform three.'],
  '出口': ['駅の出口で友達を待ちました。', 'I waited for my friend at the station exit.'],
  '入り口': ['入り口の前でチケットを見せました。', 'I showed my ticket in front of the entrance.'],
  '交差点': ['次の交差点を右に曲がってください。', 'Please turn right at the next intersection.'],
  '信号': ['信号が青になるまで待ちました。', 'I waited until the traffic light turned green.'],
  '角': ['次の角を右に曲がってください。', 'Please turn right at the next corner.'],
  '買い物': ['母と駅前の店で買い物をしました。', 'I went shopping with my mother at a shop near the station.'],
  '色': ['このシャツの色が好きです。', 'I like the color of this shirt.'],
  '運転': ['雨の日の運転は少し怖いです。', 'Driving on rainy days is a little scary.'],
  '事故': ['駅前で小さな事故がありました。', 'There was a small accident in front of the station.'],
  '乗り換え': ['新宿で電車の乗り換えをしました。', 'I transferred trains at Shinjuku.'],
  '往復': ['京都までの往復切符を買いました。', 'I bought a round-trip ticket to Kyoto.'],
};

const VERB_EXACT_EXAMPLES = {
  '動く': ['古い時計はまだ動くので、捨てません。', 'The old clock still works, so I will not throw it away.'],
  '歩く': ['駅まで歩くと十五分かかります。', 'It takes fifteen minutes to walk to the station.'],
  '走る': ['バスに間に合うように駅まで走ることがあります。', 'I sometimes run to the station so I can catch the bus.'],
  '泳ぐ': ['夏休みにプールで泳ぐつもりです。', 'I plan to swim at the pool during summer vacation.'],
  '飛ぶ': ['鳥が空を飛ぶのを見ました。', 'I watched a bird fly through the sky.'],
  '渡る': ['道を渡る前に左右を見ます。', 'I look left and right before crossing the street.'],
  '曲がる': ['次の角を右に曲がると駅があります。', 'If you turn right at the next corner, there is a station.'],
  '戻る': ['忘れ物を取りに家へ戻ることにしました。', 'I decided to return home to get something I had forgotten.'],
  '進む': ['この道をまっすぐ進むと郵便局があります。', 'If you go straight along this road, there is a post office.'],
  '止まる': ['電車が急に止まると驚きます。', 'I am surprised when the train stops suddenly.'],
  '止める': ['駅の前でタクシーを止めることができます。', 'You can stop a taxi in front of the station.'],
  '出発する': ['朝八時にホテルを出発する予定です。', 'We are scheduled to leave the hotel at eight in the morning.'],
  '到着する': ['バスは駅に十時に到着する予定です。', 'The bus is scheduled to arrive at the station at ten.'],
  '乗る': ['毎朝七時の電車に乗ることにしています。', 'I make it a rule to take the seven o’clock train every morning.'],
  '降りる': ['次の駅で電車を降りる予定です。', 'I plan to get off the train at the next station.'],
  '乗り換える': ['新宿で地下鉄に乗り換える必要があります。', 'I need to transfer to the subway at Shinjuku.'],
  '通る': ['学校へ行く時、この橋を通ることがあります。', 'I sometimes pass over this bridge when I go to school.'],
  '通う': ['大学に通うために定期券を買いました。', 'I bought a commuter pass to go to university.'],
  '運ぶ': ['重い箱を二人で運ぶことにしました。', 'We decided to carry the heavy box together.'],
  '送る': ['母に荷物を送る予定です。', 'I plan to send a package to my mother.'],
  '届く': ['荷物が明日の午前中に届く予定です。', 'The package is scheduled to be delivered tomorrow morning.'],
  '届ける': ['受付に書類を届けるように頼まれました。', 'I was asked to deliver the documents to reception.'],
  '入る': ['部屋に入る前にノックしてください。', 'Please knock before entering the room.'],
  '出る': ['朝早く家を出るので、夜に準備します。', 'I prepare at night because I leave home early in the morning.'],
  '出かける': ['週末に友達と出かける予定です。', 'I plan to go out with a friend on the weekend.'],
  '帰る': ['今日は早く家に帰るつもりです。', 'I intend to go home early today.'],
  '連れて行く': ['妹を動物園へ連れて行く約束をしました。', 'I promised to take my younger sister to the zoo.'],
  '連れて来る': ['友達を家へ連れて来る前に部屋を片付けます。', 'I will tidy my room before bringing my friend home.'],
  '持って行く': ['雨が降りそうなので、傘を持って行くことにしました。', 'It looks like rain, so I decided to take an umbrella.'],
  '持って来る': ['明日、資料を持って来るのを忘れないでください。', 'Please do not forget to bring the materials tomorrow.'],
  '迎える': ['駅で友達を迎えるために早く出ました。', 'I left early to pick up my friend at the station.'],
  '逃げる': ['大きな音がすると犬が逃げることがあります。', 'The dog sometimes runs away when there is a loud sound.'],
  '追う': ['警察が泥棒を追う場面をニュースで見ました。', 'I saw a scene on the news where the police chased a thief.'],
  '探す': ['なくした鍵を探すために部屋を片付けました。', 'I tidied my room to look for the lost key.'],
  '見つかる': ['なくした鍵が見つかるまで探しました。', 'I searched until the lost key was found.'],
  '見つける': ['駅の近くで小さな店を見つけることができました。', 'I was able to find a small shop near the station.'],
  '集まる': ['会議のために三時に集まる予定です。', 'We plan to gather at three for the meeting.'],
  '集める': ['旅行の写真をアルバムに集めることにしました。', 'I decided to collect the trip photos in an album.'],
  '並ぶ': ['レジの前に並ぶ人が多かったです。', 'Many people lined up in front of the register.'],
  '並べる': ['机の上に本を並べるのを手伝いました。', 'I helped arrange the books on the desk.'],
  '開く': ['朝九時に店が開くので、少し待ちました。', 'The shop opens at nine, so I waited a little.'],
  '開ける': ['暑いので窓を開けることにしました。', 'It was hot, so I decided to open the window.'],
  '閉まる': ['この店は夜九時に閉まるそうです。', 'I hear this shop closes at nine at night.'],
  '閉める': ['寒いのでドアを閉めるようにしてください。', 'Please close the door because it is cold.'],
  '押す': ['このボタンを押すと電気がつきます。', 'The light turns on when you push this button.'],
  '引く': ['ドアを引くと中に入れます。', 'You can enter by pulling the door.'],
  '置く': ['かばんを机の下に置くことにしました。', 'I decided to put my bag under the desk.'],
  '片付ける': ['夕食の後で台所を片付ける必要があります。', 'I need to tidy the kitchen after dinner.'],
  '捨てる': ['古い雑誌を捨てる前に中を確認しました。', 'I checked inside the old magazine before throwing it away.'],
  '拾う': ['落ちている財布を拾う時は交番へ持って行きます。', 'When I pick up a dropped wallet, I take it to the police box.'],
  '言う': ['先生に遅れた理由を言う必要があります。', 'I need to tell the teacher why I was late.'],
  '話す': ['友達と旅行の予定を話す時間がありました。', 'I had time to talk with my friend about our travel plans.'],
  '聞く': ['分からない言葉を先生に聞くことがあります。', 'I sometimes ask the teacher the meaning of words I do not understand.'],
  '尋ねる': ['駅員に道を尋ねることにしました。', 'I decided to ask the station staff for directions.'],
  '答える': ['質問に日本語で答える練習をしています。', 'I practice answering questions in Japanese.'],
  '返事する': ['メールに返事するのを忘れました。', 'I forgot to reply to the email.'],
  '伝える': ['友達に集合時間を伝えるのを忘れました。', 'I forgot to tell my friend the meeting time.'],
  '知らせる': ['家族に試験の結果を知らせるつもりです。', 'I plan to tell my family the exam result.'],
  '連絡する': ['遅れる時は必ず連絡するようにしてください。', 'Please make sure to contact me when you will be late.'],
  '説明する': ['先生が文法を説明する時、例を使います。', 'The teacher uses examples when explaining grammar.'],
  '相談する': ['進路について先生に相談する予定です。', 'I plan to consult the teacher about my future path.'],
  '頼む': ['店員に水を頼むことにしました。', 'I decided to ask the clerk for water.'],
  '断る': ['忙しい時は誘いを断ることもあります。', 'I sometimes refuse invitations when I am busy.'],
  '誘う': ['友達を映画に誘うつもりです。', 'I plan to invite my friend to a movie.'],
  '約束する': ['友達と駅で会うことを約束するつもりです。', 'I plan to promise my friend that we will meet at the station.'],
  '紹介する': ['新しい友達を家族に紹介する予定です。', 'I plan to introduce my new friend to my family.'],
  '案内する': ['週末に友達を町の中で案内するつもりです。', 'I plan to show my friend around town on the weekend.'],
  '教える': ['弟に漢字を教えることがあります。', 'I sometimes teach kanji to my younger brother.'],
  '習う': ['週に二回ピアノを習うつもりです。', 'I plan to take piano lessons twice a week.'],
  '覚える': ['新しい単語を毎日覚えるようにしています。', 'I try to memorize new words every day.'],
  '忘れる': ['約束を忘れることがないようにメモします。', 'I make a note so I do not forget appointments.'],
  '思う': ['この答えは正しいと思う人が多いです。', 'Many people think this answer is correct.'],
  '考える': ['将来の仕事について考える時間が必要です。', 'I need time to think about my future job.'],
  '決める': ['旅行の日にちを今週中に決めるつもりです。', 'I intend to decide the date of the trip this week.'],
  '決まる': ['旅行の日にちが決まるまで待ちます。', 'I will wait until the date of the trip is decided.'],
  '選ぶ': ['メニューから好きな料理を選ぶことができます。', 'You can choose a dish you like from the menu.'],
  '比べる': ['二つの写真を比べると違いが分かります。', 'You can see the difference when you compare the two photos.'],
  '調べる': ['分からない言葉を辞書で調べるようにしています。', 'I try to look up words I do not know in a dictionary.'],
  '分かる': ['答えが分かるまで先生に聞きました。', 'I asked the teacher until I understood the answer.'],
  '気づく': ['間違いに気づくまで時間がかかりました。', 'It took time to notice the mistake.'],
  '気をつける': ['暗い道では車に気をつけることが大切です。', 'It is important to be careful of cars on dark roads.'],
  '信じる': ['友達の話を信じることにしました。', 'I decided to believe my friend’s story.'],
  '疑う': ['理由もなく人を疑うのはよくありません。', 'It is not good to doubt people without a reason.'],
  '期待する': ['明日の試合に期待する人が多いです。', 'Many people have high hopes for tomorrow’s game.'],
  '心配する': ['友達が来ないと心配することがあります。', 'I sometimes worry when my friend does not come.'],
  '安心する': ['母の声を聞くと安心することができます。', 'I can feel relieved when I hear my mother’s voice.'],
  '感じる': ['海の近くで涼しい風を感じることができます。', 'You can feel a cool breeze near the sea.'],
  '驚く': ['大きな音を聞くと驚くことがあります。', 'I sometimes get surprised when I hear a loud sound.'],
  '怒る': ['理由を聞く前に怒るのはよくありません。', 'It is not good to get angry before hearing the reason.'],
  '笑う': ['友達の冗談を聞くと笑うことがあります。', 'I sometimes laugh when I hear my friend’s jokes.'],
  '泣く': ['悲しい映画を見ると泣くことがあります。', 'I sometimes cry when I watch a sad movie.'],
  '喜ぶ': ['妹はプレゼントを見ると喜ぶでしょう。', 'My younger sister will be pleased when she sees the present.'],
  '楽しむ': ['週末の旅行を楽しむつもりです。', 'I plan to enjoy the weekend trip.'],
  '反対する': ['その計画に反対する人もいました。', 'Some people opposed that plan.'],
  '賛成する': ['私は友達の意見に賛成するつもりです。', 'I plan to agree with my friend’s opinion.'],
  '失敗する': ['急いで料理すると失敗することがあります。', 'I sometimes fail when I cook in a hurry.'],
  '成功する': ['毎日練習すれば成功すると思います。', 'I think I will succeed if I practice every day.'],
  '受ける': ['明日、日本語の試験を受ける予定です。', 'I am scheduled to take a Japanese exam tomorrow.'],
  '受かる': ['大学の試験に受かるために勉強しています。', 'I am studying to pass the university exam.'],
  '落ちる': ['試験に落ちると残念です。', 'It is disappointing to fail an exam.'],
  '食べる': ['朝ご飯を食べる前に薬を飲みます。', 'I take medicine before eating breakfast.'],
  '飲む': ['寝る前に温かいお茶を飲むことがあります。', 'I sometimes drink warm tea before bed.'],
  '作る': ['週末に家族と夕食を作るつもりです。', 'I plan to make dinner with my family on the weekend.'],
  '料理する': ['母と一緒に野菜を料理することがあります。', 'I sometimes cook vegetables with my mother.'],
  '洗う': ['食事の前に手を洗うようにしています。', 'I try to wash my hands before meals.'],
  '磨く': ['寝る前に歯を磨くことが大切です。', 'It is important to brush your teeth before sleeping.'],
  '浴びる': ['朝、シャワーを浴びると目が覚めます。', 'Taking a shower in the morning wakes me up.'],
  '着る': ['寒い日は厚いコートを着ることにしています。', 'I make it a rule to wear a thick coat on cold days.'],
  '脱ぐ': ['家に入る前に靴を脱ぐことになっています。', 'We are supposed to take off our shoes before entering the house.'],
  '履く': ['雨の日は黒い靴を履くことが多いです。', 'I often wear black shoes on rainy days.'],
  'かぶる': ['暑い日は帽子をかぶるようにしています。', 'I try to wear a hat on hot days.'],
  'かける': ['本を読む時、眼鏡をかけることがあります。', 'I sometimes put on glasses when I read a book.'],
  '使う': ['この辞書を使うと意味が分かります。', 'You can understand the meaning if you use this dictionary.'],
  '直す': ['間違いを直す時間が必要です。', 'I need time to correct the mistake.'],
  '壊す': ['古い箱を壊す時は気をつけてください。', 'Please be careful when breaking the old box.'],
  '壊れる': ['古い時計が壊れる前に修理したいです。', 'I want to repair the old clock before it breaks.'],
  '消す': ['部屋を出る前に電気を消すようにしています。', 'I try to turn off the light before leaving the room.'],
  '消える': ['電気が消えると部屋が暗くなります。', 'When the light goes out, the room becomes dark.'],
  'つける': ['寒いので暖房をつけることにしました。', 'It is cold, so I decided to turn on the heater.'],
  'つく': ['部屋の電気がつくと安心します。', 'I feel relieved when the room light comes on.'],
  '切る': ['野菜を小さく切ると食べやすいです。', 'Vegetables are easier to eat when you cut them small.'],
  '切れる': ['電話の電池が切れる前に充電します。', 'I charge my phone before the battery runs out.'],
  '入れる': ['かばんに教科書を入れるのを忘れました。', 'I forgot to put my textbook in my bag.'],
  '出す': ['授業の始めに宿題を出す必要があります。', 'I need to submit my homework at the beginning of class.'],
  'しまう': ['大切な書類を机にしまうことにしました。', 'I decided to put the important documents away in my desk.'],
  '混ぜる': ['卵と牛乳をよく混ぜるとおいしくなります。', 'It tastes good when you mix the eggs and milk well.'],
  '借りる': ['図書館で本を借りることができます。', 'You can borrow books at the library.'],
  '貸す': ['友達に傘を貸すことにしました。', 'I decided to lend my umbrella to my friend.'],
  '返す': ['借りた本を明日返す予定です。', 'I plan to return the book I borrowed tomorrow.'],
  '払う': ['レジで代金を払う時にカードを使いました。', 'I used a card when I paid at the register.'],
  '買う': ['駅前で切符を買う必要があります。', 'I need to buy a ticket in front of the station.'],
  '売る': ['この店では古い本を売ることができます。', 'You can sell old books at this shop.'],
  '注文する': ['昼食にカレーを注文するつもりです。', 'I plan to order curry for lunch.'],
  '予約する': ['旅行の前にホテルを予約する必要があります。', 'I need to reserve a hotel before the trip.'],
  '申し込む': ['日本語のクラスに申し込むつもりです。', 'I plan to apply for a Japanese class.'],
  '休む': ['熱があるので今日は休むことにしました。', 'I decided to rest today because I have a fever.'],
  '働く': ['将来、日本の会社で働くことが夢です。', 'My dream is to work at a Japanese company in the future.'],
  '始める': ['新しい仕事を来月始める予定です。', 'I plan to start a new job next month.'],
  '始まる': ['授業が始まる前に席に座ります。', 'I sit down before class starts.'],
  '終える': ['レポートを今日中に終えるつもりです。', 'I intend to finish the report today.'],
  '終わる': ['会議が終わるまで待ってください。', 'Please wait until the meeting ends.'],
  '続ける': ['日本語の勉強をこれからも続けるつもりです。', 'I plan to keep studying Japanese from now on.'],
  '続く': ['雨の日が続くと洗濯物が乾きません。', 'When rainy days continue, laundry does not dry.'],
  '練習する': ['毎日漢字を練習することにしています。', 'I make it a habit to practice kanji every day.'],
  '復習する': ['試験の前に文法を復習する予定です。', 'I plan to review grammar before the exam.'],
  '予習する': ['明日の授業のために新しい課を予習するつもりです。', 'I plan to preview the new lesson for tomorrow’s class.'],
  '用意する': ['旅行の前に必要な物を用意する必要があります。', 'I need to prepare the necessary things before the trip.'],
  '準備する': ['会議の資料を準備するのを手伝いました。', 'I helped prepare the meeting materials.'],
  '手伝う': ['週末に母の料理を手伝うことがあります。', 'I sometimes help my mother cook on the weekend.'],
  '招待する': ['誕生日に友達を招待するつもりです。', 'I plan to invite my friends to my birthday.'],
};

const TIME_EXAMPLES = {
  '時代': ['この時代の文化について勉強しました。', 'We studied the culture of this era.'],
  '時期': ['旅行にいい時期を授業で聞きました。', 'I asked in class about a good season for travel.'],
  '期間': ['申込の期間をカレンダーで確認しました。', 'I checked the application period on the calendar.'],
  '期限': ['レポートの期限は金曜日です。', 'The report deadline is Friday.'],
  '予定日': ['出発の予定日を友達に知らせました。', 'I told my friend the scheduled departure date.'],
  '毎朝': ['毎朝、駅まで歩きます。', 'I walk to the station every morning.'],
  '毎晩': ['毎晩、寝る前に本を読みます。', 'I read a book before bed every evening.'],
  '毎週': ['毎週、図書館で勉強しています。', 'I study at the library every week.'],
  '毎月': ['毎月、家計を確認します。', 'I check the household budget every month.'],
  '毎年': ['毎年、家族で旅行します。', 'My family travels every year.'],
  '週末': ['週末に友達と映画を見ます。', 'I watch a movie with friends on the weekend.'],
  '平日': ['平日は朝早く起きます。', 'I wake up early on weekdays.'],
  '休日': ['休日は家でゆっくり休みます。', 'I relax at home on my day off.'],
  '祝日': ['祝日は学校が休みです。', 'School is closed on national holidays.'],
  '昔': ['昔、この町には電車がありませんでした。', 'Long ago, this town did not have trains.'],
  '将来': ['将来、日本で働きたいです。', 'I want to work in Japan in the future.'],
  '未来': ['未来の生活について作文を書きました。', 'I wrote a composition about life in the future.'],
  '過去': ['過去の失敗から大切なことを学びました。', 'I learned something important from a past failure.'],
  '現在': ['現在、東京に住んでいます。', 'I currently live in Tokyo.'],
  '今度': ['今度、一緒に美術館へ行きましょう。', 'Next time, let’s go to the art museum together.'],
  '今回': ['今回の試験は前より簡単でした。', 'This exam was easier than the previous one.'],
  '前回': ['前回の会議でその問題を話しました。', 'We discussed that problem at the previous meeting.'],
  '次回': ['次回はもっと早く来てください。', 'Please come earlier next time.'],
  '最近': ['最近、朝が涼しくなりました。', 'Recently, the mornings have become cool.'],
  'この間': ['この間、駅前で先輩に会いました。', 'The other day, I met my senior near the station.'],
  '先ほど': ['先ほど、母から電話がありました。', 'My mother called a little earlier.'],
  '後ほど': ['後ほど、もう一度連絡します。', 'I will contact you again later.'],
  '昼間': ['昼間は公園がにぎやかです。', 'The park is lively during the daytime.'],
  '夜中': ['夜中に大きな音で目が覚めました。', 'I woke up to a loud sound in the middle of the night.'],
  '夕方': ['夕方にスーパーへ買い物に行きます。', 'I go shopping at the supermarket in the evening.'],
  '今夜': ['今夜は早く寝るつもりです。', 'I plan to go to bed early tonight.'],
  '明け方': ['明け方に雨が降り始めました。', 'It started raining at dawn.'],
  '春': ['春になると桜が咲きます。', 'Cherry blossoms bloom in spring.'],
  '夏': ['夏は海へ泳ぎに行きます。', 'In summer, I go to the sea to swim.'],
  '秋': ['秋は山の景色がきれいです。', 'Mountain scenery is beautiful in autumn.'],
  '冬': ['冬は暖かいコートを着ます。', 'In winter, I wear a warm coat.'],
  '季節': ['好きな季節は春です。', 'My favorite season is spring.'],
  '正月': ['正月に祖父母の家へ行きます。', 'I go to my grandparents’ house at New Year.'],
  '誕生日': ['妹の誕生日にケーキを作りました。', 'I made a cake for my younger sister’s birthday.'],
  '記念日': ['結婚記念日に両親へ花を送りました。', 'I sent flowers to my parents on their wedding anniversary.'],
  '午前': ['午前に病院へ行きました。', 'I went to the hospital in the morning.'],
  '午後': ['午後は会社で会議があります。', 'There is a meeting at the company in the afternoon.'],
};

const COUNTER_EXAMPLES = {
  '一個': ['りんごを一個買いました。', 'I bought one apple.'],
  '二個': ['おにぎりを二個作りました。', 'I made two rice balls.'],
  '三個': ['箱にみかんが三個入っています。', 'There are three mandarin oranges in the box.'],
  '一つ': ['質問を一つしてもいいですか。', 'May I ask one question?'],
  '二つ': ['かばんを二つ持っています。', 'I am carrying two bags.'],
  '三つ': ['机の上にコップが三つあります。', 'There are three cups on the desk.'],
  '一人': ['教室に学生が一人います。', 'There is one student in the classroom.'],
  '二人': ['友達が二人遊びに来ました。', 'Two friends came to visit.'],
  '三人': ['会議には三人が参加しました。', 'Three people joined the meeting.'],
  '一枚': ['紙を一枚ください。', 'Please give me one sheet of paper.'],
  '二枚': ['写真を二枚撮りました。', 'I took two photos.'],
  '三枚': ['切符を三枚買いました。', 'I bought three tickets.'],
  '一冊': ['新しい本を一冊読みました。', 'I read one new book.'],
  '二冊': ['図書館で本を二冊借りました。', 'I borrowed two books from the library.'],
  '三冊': ['机の上にノートが三冊あります。', 'There are three notebooks on the desk.'],
  '一本': ['水を一本買いました。', 'I bought one bottle of water.'],
  '二本': ['鉛筆を二本持っています。', 'I have two pencils.'],
  '三本': ['駅まで道が三本あります。', 'There are three roads to the station.'],
  '一台': ['新しい自転車を一台買いました。', 'I bought one new bicycle.'],
  '二台': ['家の前に車が二台あります。', 'There are two cars in front of the house.'],
  '三台': ['会社に新しいパソコンが三台来ました。', 'Three new computers arrived at the company.'],
  '一匹': ['公園に犬が一匹いました。', 'There was one dog in the park.'],
  '二匹': ['庭で猫が二匹遊んでいます。', 'Two cats are playing in the garden.'],
  '三匹': ['池に魚が三匹見えました。', 'I could see three fish in the pond.'],
  '一杯': ['朝、コーヒーを一杯飲みました。', 'I drank one cup of coffee in the morning.'],
  '二杯': ['暑いので水を二杯飲みました。', 'It was hot, so I drank two glasses of water.'],
  '三杯': ['夕食でお茶を三杯飲みました。', 'I drank three cups of tea at dinner.'],
  '一回': ['もう一回説明してください。', 'Please explain it one more time.'],
  '二回': ['この映画を二回見ました。', 'I watched this movie two times.'],
  '三回': ['漢字を三回書いて練習しました。', 'I practiced by writing the kanji three times.'],
  '一階': ['受付は一階にあります。', 'Reception is on the first floor.'],
  '二階': ['教室は二階です。', 'The classroom is on the second floor.'],
  '三階': ['三階の窓から海が見えます。', 'You can see the sea from the third-floor window.'],
  '一番': ['この店のカレーが一番好きです。', 'I like this shop’s curry best.'],
  '二番': ['二番のバスに乗ってください。', 'Please take bus number two.'],
  '三番': ['三番の答えを書き直しました。', 'I rewrote answer number three.'],
};

const QUANTITY_EXAMPLES = {
  '半分': ['ケーキを半分だけ食べました。', 'I ate only half of the cake.'],
  '全部': ['宿題を全部終わらせました。', 'I finished all of my homework.'],
  '一部': ['資料の一部をコピーしました。', 'I copied one part of the materials.'],
  '両方': ['赤い靴と黒い靴を両方試しました。', 'I tried both the red shoes and the black shoes.'],
  '片方': ['手袋の片方をなくしました。', 'I lost one of my gloves.'],
  '以上': ['十八歳以上の人が参加できます。', 'People aged eighteen or older can participate.'],
  '以下': ['荷物は十キロ以下にしてください。', 'Please keep the luggage at ten kilograms or less.'],
  '以内': ['三日以内に返事をください。', 'Please reply within three days.'],
  '以外': ['日曜日以外は毎日開いています。', 'It is open every day except Sunday.'],
  'ほど': ['駅まで十分ほど歩きます。', 'I walk about ten minutes to the station.'],
  'くらい': ['日本語を一時間くらい勉強しました。', 'I studied Japanese for about one hour.'],
  'ぐらい': ['ここから家まで二キロぐらいです。', 'It is about two kilometers from here to my house.'],
  '約': ['約三十人が会場に来ました。', 'About thirty people came to the venue.'],
  '倍': ['今年の参加者は去年の倍です。', 'This year’s participants are double last year’s.'],
  '割合': ['このクラスは留学生の割合が高いです。', 'This class has a high percentage of international students.'],
};

function makeNounExample(item, index) {
  const term = topicTerm(item.back);
  const pools = {
    people: [
      () => [`駅で${item.front}に会いました。`, `I met ${term} at the station.`],
      () => [`${item.front}に道を聞きました。`, `I asked ${term} for directions.`],
      () => [`昨日、${item.front}と少し話しました。`, `Yesterday I spoke briefly with ${term}.`],
      () => [`${item.front}が手伝ってくれました。`, `${capFirst(term)} helped me.`],
      () => [`会議に${item.front}も来ました。`, `${capFirst(term)} also came to the meeting.`],
      () => [`写真を${item.front}に撮ってもらいました。`, `I had ${term} take a photo for me.`],
      () => [`隣の席の${item.front}は親切でした。`, `${capFirst(term)} in the next seat was kind.`],
      () => [`明日、${item.front}を駅で待ちます。`, `Tomorrow I will wait for ${term} at the station.`],
    ],
    'home-daily-life': [
      () => [`朝、${item.front}を確認しました。`, `I checked ${term} in the morning.`],
      () => [`週末に${item.front}をきれいにしました。`, `I cleaned ${term} on the weekend.`],
      () => [`新しい${item.front}を部屋に置きました。`, `I put ${term} in my room.`],
      () => [`寝る前に${item.front}を準備しました。`, `I prepared ${term} before going to bed.`],
      () => [`引っ越しの時、${item.front}を箱に入れました。`, `When moving, I put ${term} into a box.`],
      () => [`この家の${item.front}は少し古いです。`, `${term} in this house is a little old.`],
      () => [`母は毎日${item.front}を使っています。`, `My mother uses ${term} every day.`],
      () => [`${item.front}が見つからなくて困りました。`, `I was troubled because I could not find ${term}.`],
    ],
    'school-work': [
      () => [`学校で${item.front}について話しました。`, `We talked about ${term} at school.`],
      () => [`授業で${item.front}について質問しました。`, `I asked in class about ${term}.`],
      () => [`会社で${item.front}について確認しました。`, `I checked on ${term} at the company.`],
      () => [`友達と${item.front}について相談しました。`, `I consulted a friend about ${term}.`],
      () => [`${item.front}の予定をカレンダーに書きました。`, `I wrote the schedule for ${term} on the calendar.`],
      () => [`${item.front}について短く報告しました。`, `I gave a short report about ${term}.`],
      () => [`${item.front}に関係する資料を読みました。`, `I read materials related to ${term}.`],
      () => [`明日、${item.front}についてもう一度確認します。`, `Tomorrow I will check ${term} once more.`],
    ],
    'travel-transport': [
      () => [`旅行の前に${item.front}を確認しました。`, `I checked ${term} before the trip.`],
      () => [`案内所で${item.front}について聞きました。`, `I asked about ${term} at the information center.`],
      () => [`地図で${item.front}を探しました。`, `I looked for ${term} on the map.`],
      () => [`${item.front}についてガイドブックで調べました。`, `I looked up ${term} in the guidebook.`],
      () => [`${item.front}を使う予定です。`, `I plan to use ${term}.`],
      () => [`旅行中に${item.front}について友達と話しました。`, `During the trip, I talked with my friend about ${term}.`],
      () => [`${item.front}の情報をメモしました。`, `I wrote down information about ${term}.`],
      () => [`${item.front}の場所を友達に伝えました。`, `I told my friend where ${term} was.`],
    ],
    'shopping-services': [
      () => [`店で${item.front}について聞きました。`, `I asked about ${term} at the shop.`],
      () => [`買い物の後で${item.front}を確認しました。`, `I checked ${term} after shopping.`],
      () => [`受付で${item.front}を見せました。`, `I showed ${term} at reception.`],
      () => [`必要な${item.front}をかばんに入れました。`, `I put the necessary ${cleanMeaning(item.back)} in my bag.`],
      () => [`店員に${item.front}について聞きました。`, `I asked the clerk about ${term}.`],
      () => [`新しい${item.front}を選びました。`, `I chose ${term}.`],
      () => [`${item.front}の場所を係員に聞きました。`, `I asked the staff where ${term} was.`],
      () => [`この${item.front}は少し高いです。`, `This ${cleanMeaning(item.back)} is a little expensive.`],
    ],
    'food-cooking': [
      () => [`夕食に${item.front}を食べました。`, `I ate ${term} for dinner.`],
      () => [`スーパーで${item.front}を買いました。`, `I bought ${term} at the supermarket.`],
      () => [`昼食に${item.front}を注文しました。`, `I ordered ${term} for lunch.`],
      () => [`冷蔵庫に${item.front}を入れました。`, `I put ${term} in the refrigerator.`],
      () => [`母は${item.front}を使って料理しました。`, `My mother cooked using ${term}.`],
      () => [`子どもは${item.front}が好きです。`, `The child likes ${term}.`],
      () => [`旅行先で有名な${item.front}を食べました。`, `I ate famous ${cleanMeaning(item.back)} at the travel destination.`],
      () => [`${item.front}を入れすぎないでください。`, `Please do not add too much ${cleanMeaning(item.back)}.`],
    ],
    'health-body': [
      () => [`医者に${item.front}について相談しました。`, `I consulted the doctor about ${term}.`],
      () => [`病院で${item.front}について聞きました。`, `I asked about ${term} at the hospital.`],
      () => [`朝から${item.front}が気になります。`, `I have been concerned about ${term} since this morning.`],
      () => [`${item.front}に気をつけてください。`, `Please take care of ${term}.`],
      () => [`受付で${item.front}について説明しました。`, `At reception, I explained about ${term}.`],
      () => [`昨日から${item.front}が気になっています。`, `I have been concerned about ${term} since yesterday.`],
      () => [`${item.front}について家族と話しました。`, `I talked with my family about ${term}.`],
      () => [`先生は${item.front}の話を聞いてくれました。`, `The teacher listened to me talk about ${term}.`],
    ],
    'feelings-opinions': [
      () => [`友達に${item.front}を伝えました。`, `I told my friend about ${term}.`],
      () => [`その${item.front}について家族と話し合いました。`, `I discussed ${term} with my family.`],
      () => [`会議で${item.front}について話しました。`, `I talked about ${term} at the meeting.`],
      () => [`${item.front}を忘れないようにメモしました。`, `I made a note so I would not forget ${term}.`],
      () => [`この経験で${item.front}について考えました。`, `This experience made me think about ${term}.`],
      () => [`先生の説明で${item.front}が分かりました。`, `The teacher’s explanation helped me understand ${term}.`],
      () => [`${item.front}があれば、もう一度やってみます。`, `If there is ${term}, I will try again.`],
      () => [`自分の${item.front}を大切にしたいです。`, `I want to value my own ${cleanMeaning(item.back)}.`],
    ],
    'time-frequency': [
      () => makeTimeExample(item, index),
    ],
    'nature-weather': [
      () => [`朝、${item.front}がとてもきれいでした。`, `In the morning, ${term} was very beautiful.`],
      () => [`旅行中に${item.front}を見ました。`, `During the trip, I saw ${term}.`],
      () => [`${item.front}についてニュースで聞きました。`, `I heard about ${term} on the news.`],
      () => [`${item.front}を写真に撮りました。`, `I took a photo of ${term}.`],
      () => [`今日は${item.front}について家族と話しました。`, `I talked with my family about ${term} today.`],
      () => [`この地域では${item.front}についてよく話します。`, `People in this region often talk about ${term}.`],
      () => [`${item.front}を見ると、季節を感じます。`, `When I see ${term}, I feel the season.`],
      () => [`学校で${item.front}について勉強しました。`, `We studied ${term} at school.`],
    ],
    'society-public-life': [
      () => [`学校で${item.front}について勉強しました。`, `We studied ${term} at school.`],
      () => [`ニュースで${item.front}について聞きました。`, `I heard about ${term} on the news.`],
      () => [`市役所で${item.front}について聞きました。`, `I asked about ${term} at city hall.`],
      () => [`この町では${item.front}が大切にされています。`, `In this town, ${term} is valued.`],
      () => [`新聞で${item.front}の記事を読みました。`, `I read a newspaper article about ${term}.`],
      () => [`${item.front}について家族で話し合いました。`, `My family discussed ${term}.`],
      () => [`近所で${item.front}に関係するお知らせを見ました。`, `I saw a neighborhood notice related to ${term}.`],
      () => [`${item.front}の情報を確認しました。`, `I checked information about ${term}.`],
    ],
  };
  const pool = pools[item.category] || pools['school-work'];
  return pick(pool, index)();
}

function makeCounterExample(item) {
  return COUNTER_EXAMPLES[item.front] || QUANTITY_EXAMPLES[item.front] || [`${item.front}で十分です。`, `${cleanMeaning(item.back)} is enough.`];
}

function makeTimeExample(item, index) {
  if (TIME_EXAMPLES[item.front]) return TIME_EXAMPLES[item.front];
  const term = cleanMeaning(item.back);
  const pool = [
    () => [`${item.front}について予定表で確認しました。`, `I checked ${term} on the schedule.`],
    () => [`${item.front}のことを家族と話しました。`, `I talked with my family about ${term}.`],
    () => [`${item.front}までに準備しておきます。`, `I will be ready by ${term}.`],
    () => [`${item.front}の天気を調べました。`, `I checked the weather for ${term}.`],
  ];
  return pick(pool, index)();
}

function makeAdjectiveExample(item, index) {
  const adj = adjectiveTerm(item.back);
  if (item.front === '好き') return ['私はこの町の静かな道が好きです。', 'I like the quiet streets in this town.'];
  if (item.front === '嫌い') return ['弟は苦い薬が嫌いです。', 'My younger brother dislikes bitter medicine.'];
  if (item.front === '苦手') return ['私は人の前で話すのが苦手です。', 'I am not good at speaking in front of people.'];
  if (item.front === '得意') return ['姉は料理が得意です。', 'My older sister is good at cooking.'];
  if (item.front === '上手') return ['友達は歌が上手です。', 'My friend is good at singing.'];
  if (item.front === '下手') return ['私はまだ漢字を書くのが下手です。', 'I am still bad at writing kanji.'];
  if (item.front === '十分') return ['時間は十分あります。', 'There is enough time.'];
  if (item.front === '不十分') return ['説明が不十分で、よく分かりませんでした。', 'The explanation was insufficient, so I did not understand well.'];
  if (item.front === 'だめ') return ['ここで写真を撮ってはだめです。', 'Taking photos here is not allowed.'];
  if (item.front === '失礼') return ['人の話を聞かないのは失礼です。', 'It is rude not to listen when someone is speaking.'];
  if (item.front === '残念') return ['雨で試合が中止になって残念です。', 'It is disappointing that the game was canceled because of rain.'];
  if (item.front === '親切') return ['駅員はとても親切でした。', 'The station staff was very kind.'];
  if (item.front === '便利') return ['このアプリは勉強に便利です。', 'This app is convenient for studying.'];
  if (item.front === '不便') return ['この駅はエレベーターがなくて不便です。', 'This station is inconvenient because it has no elevator.'];
  if (['温かい', '冷たい', '熱い', 'ぬるい'].includes(item.front)) return [`このお茶は少し${item.front}です。`, `This tea is a little ${adj}.`];
  if (['暖かい', '暑い', '寒い', '涼しい'].includes(item.front)) return [`今日は${item.front}です。`, `It is ${adj} today.`];
  if (hasTag(item, 'food')) return [`この料理は少し${item.front}です。`, `This dish is a little ${adj}.`];
  if (hasTag(item, 'health') || item.front === '眠い') return [`今日はとても${item.front}です。`, `I feel very ${adj} today.`];
  if (hasTag(item, 'feelings')) return [`その話を聞いて${item.front}気持ちになりました。`, `After hearing that story, I felt ${adj}.`];
  const iAdjPool = [
    () => [`これは少し${item.front}です。`, `This is a little ${adj}.`],
    () => [`見た時、${item.front}と思いました。`, `When I saw it, I thought it was ${adj}.`],
    () => [`もっと${item.front}方を選びました。`, `I chose the more ${adj} one.`],
    () => [`その説明は${item.front}と感じました。`, `I felt that explanation was ${adj}.`],
    () => [`${item.front}かどうか、もう一度確認します。`, `I will check once more whether it is ${adj}.`],
    () => [`この答えは${item.front}と思います。`, `I think this answer is ${adj}.`],
  ];
  const naAdjPool = [
    () => [`これは${item.front}だと思います。`, `I think this is ${adj}.`],
    () => [`その説明は${item.front}でした。`, `That explanation was ${adj}.`],
    () => [`${item.front}かどうか確認してください。`, `Please check whether it is ${adj}.`],
    () => [`今日の仕事は${item.front}でした。`, `Today’s work was ${adj}.`],
    () => [`その答えは${item.front}だと思います。`, `I think that answer is ${adj}.`],
    () => [`${item.front}な場合は、もう一度聞いてください。`, `If it is ${adj}, please ask again.`],
  ];
  return pick(item.kind === 'i-adj' ? iAdjPool : naAdjPool, index)();
}

function makeVerbExample(item) {
  const exact = VERB_EXACT_EXAMPLES[item.front];
  if (exact) return exact;
  throw new Error(`Missing exact vocabulary example for verb: ${item.front}`);
}

function makeStudyExample(item, index) {
  if (EXACT_EXAMPLES[item.front]) return EXACT_EXAMPLES[item.front];
  if (item.kind === 'counter') return makeCounterExample(item);
  if (item.kind === 'verb') return makeVerbExample(item, index);
  if (item.kind === 'i-adj' || item.kind === 'na-adj') return makeAdjectiveExample(item, index);
  return makeNounExample(item, index);
}

function makeExample(item, index) {
  if (item.kind === 'adverb' || item.kind === 'connector') {
    return ADVERB_EXAMPLES[item.front] || [`${item.front}、予定を確認します。`, `${firstMeaning(item.back)}, I will check the schedule.`];
  }
  return makeStudyExample(item, index);
}

function parseLine(line, category, index) {
  const [front, back, kind, tags] = line.split('|').map(part => part.trim());
  const [exampleJp, exampleTranslation] = makeExample({ front, back, kind, category, tags: tags.split(',').map(tag => tag.trim()).filter(Boolean) }, index);
  return {
    front,
    back,
    kind,
    category,
    exampleJp,
    exampleTranslation,
    tags: ['vocabulary', ...tags.split(',').map(tag => tag.trim()).filter(Boolean)],
  };
}

module.exports = groups.flatMap(([category, body]) =>
  body.trim().split('\n').map((line, index) => parseLine(line, category, index))
);
