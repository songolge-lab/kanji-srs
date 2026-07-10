const CATEGORY_ORDER = {
  vocabulary: 1,
  kanji: 2,
  grammar: 3,
  sentence: 4,
};

const ALLOWED_CATEGORIES = new Set(Object.keys(CATEGORY_ORDER));
const FORBIDDEN_FIELDS = ['furigana', 'reading', 'romaji', 'onyomi', 'kunyomi'];

// Static cleaned source cards for the JLPT N1 English Full Pack.
// These are the builder-owned source records; release JSON is generated from this file plus sources/tests.js.
const CARD_SOURCES = [
  {
    "category": "vocabulary",
    "front": "免除",
    "back": "exemption, exoneration",
    "exampleJp": "一定の条件を満たせば、初年度の年会費が免除される仕組みになっている。",
    "exampleTranslation": "There is a system in place where the first year's annual fee is waived if certain conditions are met.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0001"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1
  },
  {
    "category": "vocabulary",
    "front": "枠組み",
    "back": "framework, structure",
    "exampleJp": "新しい環境保護政策の枠組みについて、専門家による議論が行われた。",
    "exampleTranslation": "Discussions were held by experts regarding the framework for the new environmental protection policy.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0002"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 2
  },
  {
    "category": "vocabulary",
    "front": "条例",
    "back": "ordinance, regulation",
    "exampleJp": "この自治体では、路上喫煙を禁止する厳しい条例が施行されている。",
    "exampleTranslation": "In this municipality, strict ordinances prohibiting smoking on the streets are in effect.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0003"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 3
  },
  {
    "category": "vocabulary",
    "front": "施行",
    "back": "enforcement, implementation",
    "exampleJp": "改正された労働法が来月の初めから施行される予定だ。",
    "exampleTranslation": "The revised labor law is scheduled to be enforced from the beginning of next month.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0004"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 4
  },
  {
    "category": "vocabulary",
    "front": "遵守",
    "back": "compliance, adherence",
    "exampleJp": "企業はコンプライアンスを重視し、法令の遵守を徹底しなければならない。",
    "exampleTranslation": "Companies must emphasize compliance and ensure strict adherence to laws and regulations.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0005"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 5
  },
  {
    "category": "vocabulary",
    "front": "罰則",
    "back": "penal provision, penalty",
    "exampleJp": "交通規則に違反した場合、厳しい罰則が適用されることがある。",
    "exampleTranslation": "If you violate traffic rules, strict penalties may be applied.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0006"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 6
  },
  {
    "category": "vocabulary",
    "front": "制裁",
    "back": "sanctions, punishment",
    "exampleJp": "国際社会は、度重なる協定違反に対して経済的な制裁を加えた。",
    "exampleTranslation": "The international community imposed economic sanctions in response to repeated violations of the agreement.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0007"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 7
  },
  {
    "category": "vocabulary",
    "front": "緩和",
    "back": "relaxation (of rules), mitigation",
    "exampleJp": "ビザの取得要件が緩和されたことで、外国人観光客が急増した。",
    "exampleTranslation": "The relaxation of visa requirements led to a rapid increase in foreign tourists.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0008"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 8
  },
  {
    "category": "vocabulary",
    "front": "規制",
    "back": "regulation, control",
    "exampleJp": "金融市場の安定を保つため、当局は新たな規制を導入することを検討している。",
    "exampleTranslation": "To maintain stability in the financial markets, authorities are considering introducing new regulations.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0009"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 9
  },
  {
    "category": "vocabulary",
    "front": "交付",
    "back": "issuance, granting",
    "exampleJp": "申請手続きが完了した後、窓口で身分証明書が交付された。",
    "exampleTranslation": "After the application procedure was completed, an identification card was issued at the counter.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0010"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 10
  },
  {
    "category": "vocabulary",
    "front": "受理",
    "back": "acceptance, receipt (of a document)",
    "exampleJp": "提出された婚姻届は、無事に役所の窓口で受理された。",
    "exampleTranslation": "The submitted marriage registration was successfully accepted at the municipal office counter.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0011"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 11
  },
  {
    "category": "vocabulary",
    "front": "申請",
    "back": "application, request",
    "exampleJp": "助成金を受け取るためには、期限内に所定の書類を揃えて申請する必要がある。",
    "exampleTranslation": "In order to receive the subsidy, it is necessary to prepare the required documents and apply before the deadline.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0012"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 12
  },
  {
    "category": "vocabulary",
    "front": "却下",
    "back": "rejection, dismissal",
    "exampleJp": "証拠不十分という理由で、原告の訴えは裁判長によって即座に却下された。",
    "exampleTranslation": "Due to insufficient evidence, the plaintiff's claim was immediately dismissed by the presiding judge.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0013"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 13
  },
  {
    "category": "vocabulary",
    "front": "棄却",
    "back": "dismissal (in court), rejection",
    "exampleJp": "最高裁判所は、上告人の主張を退け、請求を棄却する判決を下した。",
    "exampleTranslation": "The Supreme Court rejected the appellant's arguments and handed down a ruling dismissing the claim.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0014"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 14
  },
  {
    "category": "vocabulary",
    "front": "該当",
    "back": "corresponding to, falling under",
    "exampleJp": "採用条件に該当する応募者のみ、次の面接に進むことができる。",
    "exampleTranslation": "Only applicants who meet the hiring criteria can proceed to the next interview.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0015"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 15
  },
  {
    "category": "vocabulary",
    "front": "批准",
    "back": "ratification",
    "exampleJp": "その国際条約は、議会の承認を経て正式に批准された。",
    "exampleTranslation": "The international treaty was officially ratified after receiving parliamentary approval.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0016"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 16
  },
  {
    "category": "vocabulary",
    "front": "折衝",
    "back": "negotiation, diplomacy",
    "exampleJp": "水面下で行われた激しい折衝の結果、ようやく合意の糸口が見えてきた。",
    "exampleTranslation": "As a result of intense behind-the-scenes negotiations, a clue to an agreement has finally come into sight.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0017"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 17
  },
  {
    "category": "vocabulary",
    "front": "諮問",
    "back": "inquiry, consultation",
    "exampleJp": "首相は税制改革の具体的な方策について、専門委員会議に諮問した。",
    "exampleTranslation": "The prime minister consulted an expert committee regarding specific measures for tax reform.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0018"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 18
  },
  {
    "category": "vocabulary",
    "front": "裁定",
    "back": "ruling, arbitration",
    "exampleJp": "両社の主張が真っ向から対立したため、最終的な判断は第三者機関の裁定に委ねられた。",
    "exampleTranslation": "Because the claims of both companies were in direct opposition, the final decision was left to the arbitration of a third-party organization.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0019"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 19
  },
  {
    "category": "vocabulary",
    "front": "提訴",
    "back": "filing a lawsuit",
    "exampleJp": "特許を侵害されたとして、そのIT企業は競合他社を相手取って提訴に踏み切った。",
    "exampleTranslation": "Claiming patent infringement, the IT company took the step of filing a lawsuit against a competitor.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0020"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 20
  },
  {
    "category": "vocabulary",
    "front": "訴訟",
    "back": "litigation, lawsuit",
    "exampleJp": "消費者から集団で起こされた訴訟は、企業側に多大な経済的損失をもたらした。",
    "exampleTranslation": "The class-action lawsuit filed by consumers caused massive economic losses for the company.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0021"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 21
  },
  {
    "category": "vocabulary",
    "front": "罷免",
    "back": "dismissal (from office)",
    "exampleJp": "不適切な発言を繰り返した閣僚が、事実上罷免される形で辞任した。",
    "exampleTranslation": "A cabinet minister who repeatedly made inappropriate remarks resigned in what was effectively a dismissal.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0022"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 22
  },
  {
    "category": "vocabulary",
    "front": "更迭",
    "back": "replacement, reshuffle (of personnel)",
    "exampleJp": "業績悪化の責任を問われ、経営陣の大半が更迭される事態となった。",
    "exampleTranslation": "Held responsible for the worsening performance, the majority of the management team faced replacement.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0023"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 23
  },
  {
    "category": "vocabulary",
    "front": "派閥",
    "back": "faction, clique",
    "exampleJp": "党内の派閥争いが激化し、次期リーダーの選出に影響を与えている。",
    "exampleTranslation": "Factional infighting within the party has intensified, affecting the election of the next leader.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0024"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 24
  },
  {
    "category": "vocabulary",
    "front": "汚職",
    "back": "corruption, graft",
    "exampleJp": "大規模な公共事業を巡る汚職事件が発覚し、政界に激震が走った。",
    "exampleTranslation": "A corruption scandal surrounding a large-scale public works project was exposed, sending shockwaves through the political world.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0025"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 25
  },
  {
    "category": "vocabulary",
    "front": "癒着",
    "back": "collusion, close ties",
    "exampleJp": "政治家と特定企業の不透明な癒着が、メディアによって次々と報じられた。",
    "exampleTranslation": "Opaque collusion between politicians and specific companies was reported one after another by the media.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0026"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 26
  },
  {
    "category": "vocabulary",
    "front": "賄賂",
    "back": "bribe",
    "exampleJp": "便宜を図ってもらう見返りとして、役人に多額の賄賂が渡されていたことが判明した。",
    "exampleTranslation": "It was revealed that a large bribe had been given to an official in exchange for special favors.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0027"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 27
  },
  {
    "category": "vocabulary",
    "front": "査察",
    "back": "inspection",
    "exampleJp": "国際機関の調査団が、核施設の抜き打ち査察を実施した。",
    "exampleTranslation": "An investigative team from an international organization conducted a surprise inspection of the nuclear facility.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0028"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 28
  },
  {
    "category": "vocabulary",
    "front": "検閲",
    "back": "censorship",
    "exampleJp": "その国ではインターネット上の情報に対する厳しい検閲が行われている。",
    "exampleTranslation": "Strict censorship of information on the internet is carried out in that country.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0029"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 29
  },
  {
    "category": "vocabulary",
    "front": "糾弾",
    "back": "denunciation, censure",
    "exampleJp": "人権侵害の事実が明らかになり、その政権は国際社会から激しく糾弾された。",
    "exampleTranslation": "With the facts of human rights violations coming to light, the regime was fiercely denounced by the international community.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0030"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 30
  },
  {
    "category": "vocabulary",
    "front": "摘発",
    "back": "exposure, unmasking",
    "exampleJp": "警察による一斉捜査で、違法賭博の拠点が見事に摘発された。",
    "exampleTranslation": "An illegal gambling operation was successfully exposed in a sweep by the police.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0031"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 31
  },
  {
    "category": "vocabulary",
    "front": "管轄",
    "back": "jurisdiction, control",
    "exampleJp": "この地域の治安維持は、隣接する警察署の管轄に置かれている。",
    "exampleTranslation": "Maintaining public order in this area falls under the jurisdiction of the adjacent police station.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0032"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 32
  },
  {
    "category": "vocabulary",
    "front": "権限",
    "back": "authority, power",
    "exampleJp": "取締役会は、巨額の投資案件を承認する強大な権限を持っている。",
    "exampleTranslation": "The board of directors holds immense authority to approve massive investment projects.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0033"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 33
  },
  {
    "category": "vocabulary",
    "front": "委任",
    "back": "delegation, entrustment",
    "exampleJp": "株主総会に出席できないため、議決権の行使を代理人に委任した。",
    "exampleTranslation": "Unable to attend the general shareholders' meeting, I delegated the exercise of my voting rights to a proxy.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0034"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 34
  },
  {
    "category": "vocabulary",
    "front": "帰属",
    "back": "attribution, belonging to",
    "exampleJp": "領土の帰属を巡る問題は、長年にわたって両国間の懸案事項となっている。",
    "exampleTranslation": "The issue of territorial attribution has been a pending concern between the two countries for many years.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0035"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 35
  },
  {
    "category": "vocabulary",
    "front": "没収",
    "back": "confiscation",
    "exampleJp": "密輸を企てた疑いで、空港の税関にて不正な持ち込み品がすべて没収された。",
    "exampleTranslation": "On suspicion of attempting smuggling, all illegal goods were confiscated at airport customs.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0036"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 36
  },
  {
    "category": "vocabulary",
    "front": "剝奪",
    "back": "deprivation, stripping (of rights)",
    "exampleJp": "度重なるドーピング違反により、選手のメダルが剝奪される処分が下された。",
    "exampleTranslation": "Due to repeated doping violations, the athlete faced the penalty of being stripped of their medals.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0037"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 37
  },
  {
    "category": "vocabulary",
    "front": "徴収",
    "back": "collection (of fees, taxes)",
    "exampleJp": "新しい法律の施行に伴い、来月から環境保護を目的とした税が徴収される。",
    "exampleTranslation": "In conjunction with the enforcement of the new law, a tax aimed at environmental protection will be collected starting next month.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0038"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 38
  },
  {
    "category": "vocabulary",
    "front": "滞納",
    "back": "falling into arrears, non-payment",
    "exampleJp": "家賃を数ヶ月にわたって滞納したため、ついに退去勧告が送られてきた。",
    "exampleTranslation": "Having fallen into arrears on rent for several months, I finally received an eviction notice.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0039"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 39
  },
  {
    "category": "vocabulary",
    "front": "免税",
    "back": "tax exemption",
    "exampleJp": "指定された店舗で一定額以上の買い物をすると、消費税が免税される。",
    "exampleTranslation": "If you spend over a certain amount at designated stores, you will be exempted from the consumption tax.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0040"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 40
  },
  {
    "category": "vocabulary",
    "front": "補助金",
    "back": "subsidy",
    "exampleJp": "環境に配慮した設備の導入には、政府から高額な補助金が支給される。",
    "exampleTranslation": "The government provides substantial subsidies for the installation of environmentally friendly equipment.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0041"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 41
  },
  {
    "category": "vocabulary",
    "front": "交付金",
    "back": "grant, subsidy",
    "exampleJp": "地方自治体の財政を支えるため、国から地方交付金が割り当てられた。",
    "exampleTranslation": "Local allocation tax grants were assigned by the national government to support the finances of local municipalities.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0042"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 42
  },
  {
    "category": "vocabulary",
    "front": "融通",
    "back": "lending (money), accommodation, flexibility",
    "exampleJp": "資金繰りが悪化した際、取引先の銀行が運転資金を融通してくれた。",
    "exampleTranslation": "When cash flow worsened, our partner bank accommodated us with working capital.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0043"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 43
  },
  {
    "category": "vocabulary",
    "front": "債務",
    "back": "debt, liabilities",
    "exampleJp": "企業は莫大な債務を抱えきれず、事実上の経営破綻に追い込まれた。",
    "exampleTranslation": "Unable to carry its enormous debts, the company was driven into effective bankruptcy.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0044"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 44
  },
  {
    "category": "vocabulary",
    "front": "倒産",
    "back": "bankruptcy",
    "exampleJp": "不景気の波を乗り切れず、老舗のデパートが相次いで倒産した。",
    "exampleTranslation": "Unable to ride out the wave of economic recession, long-established department stores went bankrupt one after another.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0045"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 45
  },
  {
    "category": "vocabulary",
    "front": "債権",
    "back": "credit, claim",
    "exampleJp": "企業が倒産した場合、債権者は少しでも多くの資産を回収しようと奔走する。",
    "exampleTranslation": "When a company goes bankrupt, creditors scramble to recover as much of the assets as possible.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0046"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 46
  },
  {
    "category": "vocabulary",
    "front": "抵当",
    "back": "mortgage, collateral",
    "exampleJp": "事業資金を借り入れるため、所有している土地と建物を抵当に入れた。",
    "exampleTranslation": "In order to borrow business funds, I put my land and buildings up as a mortgage.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0047"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 47
  },
  {
    "category": "vocabulary",
    "front": "差し押さえ",
    "back": "seizure, attachment",
    "exampleJp": "税金の支払いが滞った結果、経営者の自宅が国税局によって差し押さえられた。",
    "exampleTranslation": "As a result of falling behind on tax payments, the executive's home was seized by the National Tax Agency.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0048"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 48
  },
  {
    "category": "vocabulary",
    "front": "清算",
    "back": "liquidation, settling up",
    "exampleJp": "会社の事業を停止し、残った資産を売却して負債を清算する手続きに入った。",
    "exampleTranslation": "Operations were halted, and procedures began to sell off remaining assets and liquidate debts.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0049"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 49
  },
  {
    "category": "vocabulary",
    "front": "精算",
    "back": "exact calculation, adjustment",
    "exampleJp": "出張から戻った後、立て替えていた交通費を直ちに精算した。",
    "exampleTranslation": "After returning from the business trip, I immediately settled the transportation expenses I had paid out of pocket.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0050"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 50
  },
  {
    "category": "vocabulary",
    "front": "決算",
    "back": "settlement of accounts",
    "exampleJp": "年度末の決算に向けて、経理部門は連日残業に追われている。",
    "exampleTranslation": "In preparation for the year-end settlement of accounts, the accounting department is bogged down with overtime every day.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0051"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 51
  },
  {
    "category": "vocabulary",
    "front": "監査",
    "back": "audit",
    "exampleJp": "外部の公認会計士による厳格な監査を経て、財務諸表の正確性が証明された。",
    "exampleTranslation": "Through a strict audit by external certified public accountants, the accuracy of the financial statements was proven.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0052"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 52
  },
  {
    "category": "vocabulary",
    "front": "決裁",
    "back": "approval, sanction",
    "exampleJp": "新規プロジェクトの予算案は、最終的に社長の決裁を仰ぐ必要がある。",
    "exampleTranslation": "The budget proposal for the new project ultimately requires the president's approval.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0053"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 53
  },
  {
    "category": "vocabulary",
    "front": "稟議",
    "back": "circulation of a draft proposal",
    "exampleJp": "備品の購入にあたり、社内のシステムを通じて稟議書を回した。",
    "exampleTranslation": "To purchase equipment, I circulated a draft proposal document through the internal company system.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0054"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 54
  },
  {
    "category": "vocabulary",
    "front": "認可",
    "back": "approval, authorization",
    "exampleJp": "新しい保育園を設立するには、自治体から正式な認可を受ける必要がある。",
    "exampleTranslation": "To establish a new nursery school, it is necessary to receive formal authorization from the local government.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0055"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 55
  },
  {
    "category": "vocabulary",
    "front": "許認可",
    "back": "licensing and approvals",
    "exampleJp": "建設業界では、事業を始めるにあたって複雑な許認可の手続きが求められる。",
    "exampleTranslation": "In the construction industry, complex licensing and approval procedures are required before starting a business.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0056"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 56
  },
  {
    "category": "vocabulary",
    "front": "奨励",
    "back": "encouragement",
    "exampleJp": "従業員の健康増進を目的として、会社は定期的なスポーツ活動を奨励している。",
    "exampleTranslation": "With the aim of promoting employee health, the company encourages regular sports activities.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0057"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 57
  },
  {
    "category": "vocabulary",
    "front": "推進",
    "back": "promotion, driving forward",
    "exampleJp": "デジタル化を推進する専門の部署が、今年の春に新設された。",
    "exampleTranslation": "A specialized department to drive forward digitalization was newly established this spring.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0058"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 58
  },
  {
    "category": "vocabulary",
    "front": "統制",
    "back": "regulation, control",
    "exampleJp": "戦時下の経済においては、物資の配給や価格の厳格な統制が行われていた。",
    "exampleTranslation": "In a wartime economy, strict controls on the distribution of goods and prices were enforced.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0059"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 59
  },
  {
    "category": "vocabulary",
    "front": "弾圧",
    "back": "oppression, suppression",
    "exampleJp": "政府に批判的なジャーナリストたちが、国家権力によって容赦なく弾圧された。",
    "exampleTranslation": "Journalists critical of the government were ruthlessly suppressed by state power.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0060"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 60
  },
  {
    "category": "vocabulary",
    "front": "抑圧",
    "back": "repression, oppression",
    "exampleJp": "長年にわたる軍事政権の抑圧から解放され、市民はついに自由を手にした。",
    "exampleTranslation": "Liberated from years of repression by the military regime, the citizens finally gained their freedom.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0061"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 61
  },
  {
    "category": "vocabulary",
    "front": "自治",
    "back": "self-government, autonomy",
    "exampleJp": "その地域は独立国家ではないが、高度な自治権が認められている。",
    "exampleTranslation": "Although the region is not an independent state, a high degree of autonomy is recognized.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0062"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 62
  },
  {
    "category": "vocabulary",
    "front": "主権",
    "back": "sovereignty",
    "exampleJp": "領空の侵犯は、国家の主権を脅かす極めて重大な問題だ。",
    "exampleTranslation": "The violation of airspace is an extremely serious issue that threatens national sovereignty.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0063"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 63
  },
  {
    "category": "vocabulary",
    "front": "領土",
    "back": "territory",
    "exampleJp": "両国は国境付近の領土を巡って、幾度となく武力衝突を繰り返してきた。",
    "exampleTranslation": "The two countries have repeatedly engaged in armed conflicts over territory near the border.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0064"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 64
  },
  {
    "category": "vocabulary",
    "front": "領海",
    "back": "territorial waters",
    "exampleJp": "海上保安庁の巡視船が、不審な船が領海に侵入しないよう警戒にあたっている。",
    "exampleTranslation": "Coast Guard patrol ships are on alert to prevent suspicious vessels from intruding into territorial waters.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0065"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 65
  },
  {
    "category": "vocabulary",
    "front": "侵害",
    "back": "infringement",
    "exampleJp": "個人のプライバシーを侵害するような報道は、厳密に慎むべきである。",
    "exampleTranslation": "Reporting that infringes upon personal privacy should be strictly refrained from.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0066"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 66
  },
  {
    "category": "vocabulary",
    "front": "侵犯",
    "back": "violation, invasion",
    "exampleJp": "国籍不明の軍用機が防空識別圏を越え、領空を侵犯する事態が発生した。",
    "exampleTranslation": "An incident occurred where an unidentified military aircraft crossed the air defense identification zone and violated airspace.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0067"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 67
  },
  {
    "category": "vocabulary",
    "front": "侵略",
    "back": "aggression, invasion",
    "exampleJp": "他国を武力で侵略する行為は、国際社会から強い非難を浴びることになる。",
    "exampleTranslation": "Acts of armed aggression against other countries will face strong condemnation from the international community.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0068"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 68
  },
  {
    "category": "vocabulary",
    "front": "紛争",
    "back": "dispute, conflict",
    "exampleJp": "民族間の対立が激化し、泥沼の武力紛争へと発展してしまった。",
    "exampleTranslation": "Ethnic tensions escalated and developed into a quagmire of armed conflict.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0069"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 69
  },
  {
    "category": "vocabulary",
    "front": "条約",
    "back": "treaty",
    "exampleJp": "気候変動に対処するため、多くの国々が参加する国際条約が結ばれた。",
    "exampleTranslation": "To address climate change, an international treaty was signed with the participation of many countries.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0070"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 70
  },
  {
    "category": "vocabulary",
    "front": "脱退",
    "back": "withdrawal, secession",
    "exampleJp": "その国は、自国の利益を優先するため国際組織からの脱退を宣言した。",
    "exampleTranslation": "Prioritizing its own interests, that country declared its withdrawal from the international organization.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0071"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 71
  },
  {
    "category": "vocabulary",
    "front": "加盟",
    "back": "joining, affiliation",
    "exampleJp": "アジア太平洋地域の経済連携網に、新たな国が加盟することが決まった。",
    "exampleTranslation": "It has been decided that a new country will join the economic cooperation network in the Asia-Pacific region.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0072"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 72
  },
  {
    "category": "vocabulary",
    "front": "提携",
    "back": "partnership, tie-up",
    "exampleJp": "大手スーパーと地元の農家が業務提携を結び、新鮮な野菜を直送することになった。",
    "exampleTranslation": "A major supermarket and local farmers have formed a business partnership to deliver fresh vegetables directly.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0073"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 73
  },
  {
    "category": "vocabulary",
    "front": "連携",
    "back": "cooperation, linkage",
    "exampleJp": "災害時には、警察と消防、そして医療機関の緊密な連携が不可欠である。",
    "exampleTranslation": "During disasters, close cooperation among the police, fire departments, and medical institutions is indispensable.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0074"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 74
  },
  {
    "category": "vocabulary",
    "front": "統廃合",
    "back": "reorganization and consolidation",
    "exampleJp": "少子化の影響を受け、全国各地で公立学校の統廃合が進められている。",
    "exampleTranslation": "Due to the impact of the declining birthrate, the consolidation and reorganization of public schools is progressing nationwide.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0075"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 75
  },
  {
    "category": "vocabulary",
    "front": "再編",
    "back": "restructuring, reorganization",
    "exampleJp": "業界全体の生き残りを賭けて、大手メーカー同士の事業再編が加速している。",
    "exampleTranslation": "With the survival of the entire industry at stake, corporate restructuring among major manufacturers is accelerating.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0076"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 76
  },
  {
    "category": "vocabulary",
    "front": "振興",
    "back": "promotion, encouragement",
    "exampleJp": "地方自治体は、特産品をアピールして地域産業の振興に力を入れている。",
    "exampleTranslation": "Local governments are putting effort into promoting regional industries by highlighting local specialty products.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0077"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 77
  },
  {
    "category": "vocabulary",
    "front": "開拓",
    "back": "pioneering, reclamation",
    "exampleJp": "国内市場が飽和状態にあるため、企業は海外における新規市場の開拓に注力している。",
    "exampleTranslation": "With the domestic market saturated, companies are focusing their efforts on pioneering new markets overseas.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0078"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 78
  },
  {
    "category": "vocabulary",
    "front": "拡充",
    "back": "expansion",
    "exampleJp": "奨学金制度を拡充することで、経済的に困難な学生をより多く支援できるようになる。",
    "exampleTranslation": "By expanding the scholarship system, it will be possible to support more students facing financial difficulties.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0079"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 79
  },
  {
    "category": "vocabulary",
    "front": "整備",
    "back": "maintenance, development",
    "exampleJp": "老朽化した水道管の整備が遅れており、早急な対策が求められている。",
    "exampleTranslation": "Maintenance of aging water pipes is falling behind, and immediate countermeasures are required.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0080"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 80
  },
  {
    "category": "vocabulary",
    "front": "縮小",
    "back": "reduction, curtailment",
    "exampleJp": "業績の悪化に伴い、会社は不採算部門の規模を段階的に縮小する方針を固めた。",
    "exampleTranslation": "Along with worsening business performance, the company solidified its policy of phasing out the scale of unprofitable divisions.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0081"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 81
  },
  {
    "category": "vocabulary",
    "front": "撤退",
    "back": "withdrawal, retreat",
    "exampleJp": "激しい価格競争に敗れ、その外食チェーンは海外市場からの完全撤退を余儀なくされた。",
    "exampleTranslation": "Defeated in fierce price competition, the restaurant chain was forced to completely withdraw from the overseas market.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0082"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 82
  },
  {
    "category": "vocabulary",
    "front": "免職",
    "back": "dismissal (from office)",
    "exampleJp": "飲酒運転という重大な不祥事を起こした公務員は、懲戒免職となった。",
    "exampleTranslation": "The civil servant who caused the serious scandal of drunk driving was subjected to disciplinary dismissal.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0083"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 83
  },
  {
    "category": "vocabulary",
    "front": "登用",
    "back": "appointment, promotion to a post",
    "exampleJp": "組織の活性化を図るため、若手社員を重要なポストに積極的に登用している。",
    "exampleTranslation": "To revitalize the organization, young employees are being actively appointed to important positions.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0084"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 84
  },
  {
    "category": "vocabulary",
    "front": "赴任",
    "back": "proceeding to new appointment",
    "exampleJp": "来月から海外の支社へ赴任することになり、引越しの準備で忙しい。",
    "exampleTranslation": "I'm busy preparing to move, as I will be proceeding to my new post at an overseas branch starting next month.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0085"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 85
  },
  {
    "category": "vocabulary",
    "front": "左遷",
    "back": "demotion, relegation",
    "exampleJp": "彼は派閥争いに敗れた結果、本社から地方の小さな営業所へ左遷された。",
    "exampleTranslation": "As a result of losing in a factional dispute, he was demoted from the headquarters to a small regional sales office.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0086"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 86
  },
  {
    "category": "vocabulary",
    "front": "栄転",
    "back": "promotion (and transfer)",
    "exampleJp": "優秀な成績が認められ、地方支店から本社の花形部署へと栄転した。",
    "exampleTranslation": "Recognized for excellent performance, she was promoted and transferred from a regional branch to a star department at headquarters.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0087"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 87
  },
  {
    "category": "vocabulary",
    "front": "昇進",
    "back": "promotion, advancement",
    "exampleJp": "長年の功績が評価され、課長から部長へと異例のスピードで昇進した。",
    "exampleTranslation": "Evaluated for his years of achievements, he was promoted from section manager to department head at an exceptionally rapid pace.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0088"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 88
  },
  {
    "category": "vocabulary",
    "front": "降格",
    "back": "demotion",
    "exampleJp": "度重なる業務上のミスが原因で、彼は役職を外され平社員に降格された。",
    "exampleTranslation": "Due to repeated operational errors, he was removed from his managerial position and demoted to a regular employee.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0089"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 89
  },
  {
    "category": "vocabulary",
    "front": "抜擢",
    "back": "selection, extraction",
    "exampleJp": "入社三年目の若手社員が、新規事業のリーダーに大抜擢され話題を呼んだ。",
    "exampleTranslation": "A young employee in his third year at the company made headlines when he was specially selected to lead a new project.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0090"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 90
  },
  {
    "category": "vocabulary",
    "front": "待遇",
    "back": "treatment, reception",
    "exampleJp": "外資系企業は実力主義であり、成果を上げればそれに相応しい待遇が用意される。",
    "exampleTranslation": "Foreign-affiliated companies operate on a meritocracy; if you produce results, you will receive corresponding treatment.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0091"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 91
  },
  {
    "category": "vocabulary",
    "front": "処遇",
    "back": "treatment (of personnel)",
    "exampleJp": "定年退職を迎える社員の再雇用における処遇について、労使間で協議が行われている。",
    "exampleTranslation": "Labor and management are holding discussions regarding the treatment of re-hired employees reaching retirement age.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0092"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 92
  },
  {
    "category": "vocabulary",
    "front": "賃金",
    "back": "wages",
    "exampleJp": "物価の上昇に見合った賃金の引き上げが実現しなければ、人々の生活は苦しくなる一方だ。",
    "exampleTranslation": "Unless wage increases commensurate with rising prices are realized, people's lives will only continue to become harder.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0093"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 93
  },
  {
    "category": "vocabulary",
    "front": "報酬",
    "back": "remuneration, reward",
    "exampleJp": "弁護士に依頼する際は、着手金や成功報酬の仕組みを事前に確認しておくべきだ。",
    "exampleTranslation": "When hiring a lawyer, you should confirm the structure of retainer fees and contingency remuneration in advance.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0094"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 94
  },
  {
    "category": "vocabulary",
    "front": "手当",
    "back": "allowance, medical care",
    "exampleJp": "給与には基本給の他に、通勤費や住宅補助などの各種手当が含まれている。",
    "exampleTranslation": "In addition to base pay, the salary includes various allowances such as commuting expenses and housing subsidies.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0095"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 95
  },
  {
    "category": "vocabulary",
    "front": "補償",
    "back": "compensation",
    "exampleJp": "工事の騒音で被害を受けた周辺住民に対し、施工業者が金銭的な補償を行った。",
    "exampleTranslation": "The construction contractor provided financial compensation to nearby residents who suffered from construction noise.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0096"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 96
  },
  {
    "category": "vocabulary",
    "front": "還付",
    "back": "return, refund",
    "exampleJp": "確定申告の手続きを済ませたことで、払い過ぎていた税金の一部が還付された。",
    "exampleTranslation": "By completing the tax return filing procedure, a portion of the overpaid taxes was refunded.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0097"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 97
  },
  {
    "category": "vocabulary",
    "front": "納付",
    "back": "payment (of taxes, fees)",
    "exampleJp": "送られてきた納付書を持って、期限までに銀行の窓口で税金を納付した。",
    "exampleTranslation": "With the sent payment slip in hand, I paid the taxes at the bank counter by the deadline.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0098"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 98
  },
  {
    "category": "vocabulary",
    "front": "課税",
    "back": "taxation",
    "exampleJp": "富裕層に対する課税を強化することで、社会の経済格差を是正すべきだという意見がある。",
    "exampleTranslation": "There is an opinion that the economic disparity in society should be corrected by strengthening taxation on the wealthy.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0099"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 99
  },
  {
    "category": "vocabulary",
    "front": "申告",
    "back": "declaration, filing",
    "exampleJp": "海外から高価な品物を持ち込む際は、税関で正確に申告しなければならない。",
    "exampleTranslation": "When bringing expensive items from overseas, you must declare them accurately at customs.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0100"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 100
  },
  {
    "category": "vocabulary",
    "front": "脱税",
    "back": "tax evasion",
    "exampleJp": "意図的に売上を隠蔽し、数億円に上る巨額の脱税を行っていた経営者が逮捕された。",
    "exampleTranslation": "A business manager who intentionally concealed sales and committed massive tax evasion amounting to hundreds of millions of yen was arrested.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0101"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 101
  },
  {
    "category": "vocabulary",
    "front": "捜索",
    "back": "search (by police), investigation",
    "exampleJp": "行方不明になった登山者を救助するため、警察と消防による大規模な捜索が行われた。",
    "exampleTranslation": "A large-scale search by police and firefighters was conducted to rescue the missing mountain climbers.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0102"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 102
  },
  {
    "category": "vocabulary",
    "front": "検挙",
    "back": "arrest, rounding up",
    "exampleJp": "繁華街における違法な客引き行為に対する取り締まりが強化され、多数の者が検挙された。",
    "exampleTranslation": "Crackdowns on illegal touting in downtown areas were strengthened, and numerous individuals were arrested.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0103"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 103
  },
  {
    "category": "vocabulary",
    "front": "拘置",
    "back": "detention",
    "exampleJp": "裁判が開かれるまでの間、被告人は警察署の拘置施設に留め置かれた。",
    "exampleTranslation": "Until the trial began, the defendant was held in the detention facility at the police station.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0104"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 104
  },
  {
    "category": "vocabulary",
    "front": "勾留",
    "back": "detention, custody",
    "exampleJp": "証拠隠滅の恐れがあるとして、検察側は容疑者の勾留延長を裁判所に求めた。",
    "exampleTranslation": "Citing a risk of evidence destruction, prosecutors asked the court for an extension of the suspect's detention.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0105"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 105
  },
  {
    "category": "vocabulary",
    "front": "起訴",
    "back": "indictment, prosecution",
    "exampleJp": "十分な証拠が揃ったと判断した検察官は、容疑者を正式に起訴した。",
    "exampleTranslation": "Determining that sufficient evidence had been gathered, the prosecutor formally indicted the suspect.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0106"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 106
  },
  {
    "category": "vocabulary",
    "front": "審理",
    "back": "trial, hearing",
    "exampleJp": "複雑な事情が絡み合っているため、この事件の審理には長期間を要すると見込まれる。",
    "exampleTranslation": "Because of the intertwined complex circumstances, the trial for this case is expected to require a long period of time.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0107"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 107
  },
  {
    "category": "vocabulary",
    "front": "判決",
    "back": "judgment, sentence",
    "exampleJp": "裁判長が厳しい表情で無期懲役の判決を言い渡すと、法廷内は静まり返った。",
    "exampleTranslation": "When the presiding judge handed down a sentence of life imprisonment with a stern expression, the courtroom fell completely silent.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0108"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 108
  },
  {
    "category": "vocabulary",
    "front": "宣告",
    "back": "sentence, verdict, pronouncement",
    "exampleJp": "医師から余命半年という残酷な宣告を受け、彼はしばらく言葉を失った。",
    "exampleTranslation": "Receiving a cruel pronouncement from the doctor that he had half a year to live, he was momentarily at a loss for words.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0109"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 109
  },
  {
    "category": "vocabulary",
    "front": "死刑",
    "back": "death penalty",
    "exampleJp": "凶悪な連続殺人事件の犯人に対し、第一審で死刑が求刑された。",
    "exampleTranslation": "The death penalty was sought in the first instance trial for the perpetrator of the heinous serial murders.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0110"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 110
  },
  {
    "category": "vocabulary",
    "front": "懲役",
    "back": "imprisonment with hard labor",
    "exampleJp": "詐欺グループの主犯格には、懲役十年の実刑判決が下される可能性が高い。",
    "exampleTranslation": "It is highly likely that the ringleader of the fraud group will receive a sentence of ten years' imprisonment without parole.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0111"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 111
  },
  {
    "category": "vocabulary",
    "front": "追徴",
    "back": "supplementary collection, penalty tax",
    "exampleJp": "申告漏れが税務調査で発覚し、多額の追徴課税を支払う羽目になった。",
    "exampleTranslation": "An omission in the tax declaration was discovered during a tax audit, leaving me to pay a massive supplementary penalty tax.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0112"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 112
  },
  {
    "category": "vocabulary",
    "front": "執行",
    "back": "execution, carrying out",
    "exampleJp": "新たな予算案が成立し、国は直ちに公共事業の執行手続きに入った。",
    "exampleTranslation": "With the new budget proposal passed, the state immediately entered into the execution procedures for public works projects.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0113"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 113
  },
  {
    "category": "vocabulary",
    "front": "釈放",
    "back": "release, discharge",
    "exampleJp": "アリバイを証明する新たな証拠が見つかり、誤認逮捕されていた男性はすぐに釈放された。",
    "exampleTranslation": "With the discovery of new evidence proving his alibi, the wrongfully arrested man was immediately released.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0114"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 114
  },
  {
    "category": "vocabulary",
    "front": "仮釈放",
    "back": "parole",
    "exampleJp": "刑務所内での態度が極めて良好だったため、刑期の満了を待たずに仮釈放が認められた。",
    "exampleTranslation": "Because his behavior in prison was extremely good, parole was granted without waiting for the expiration of his sentence.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0115"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 115
  },
  {
    "category": "vocabulary",
    "front": "服役",
    "back": "serving a prison term",
    "exampleJp": "彼は過去に犯した罪を償うため、すでに五年以上刑務所で服役している。",
    "exampleTranslation": "To atone for the crimes he committed in the past, he has already been serving time in prison for over five years.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0116"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 116
  },
  {
    "category": "vocabulary",
    "front": "恩赦",
    "back": "amnesty, pardon",
    "exampleJp": "新しい国王の即位を記念して、一部の囚人に恩赦が与えられることが発表された。",
    "exampleTranslation": "It was announced that amnesty would be granted to some prisoners to commemorate the enthronement of the new king.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0117"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 117
  },
  {
    "category": "vocabulary",
    "front": "告訴",
    "back": "criminal complaint",
    "exampleJp": "名誉を著しく傷つけられたとして、彼女は週刊誌の出版社を名誉毀損で告訴した。",
    "exampleTranslation": "Claiming her honor had been severely damaged, she filed a criminal complaint for defamation against the weekly magazine's publisher.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0118"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 118
  },
  {
    "category": "vocabulary",
    "front": "告発",
    "back": "accusation, whistleblowing",
    "exampleJp": "内部の従業員による勇気ある告発がきっかけとなり、企業の不正会計が明るみに出た。",
    "exampleTranslation": "Triggered by a courageous whistleblowing accusation from an internal employee, the company's fraudulent accounting came to light.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0119"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 119
  },
  {
    "category": "vocabulary",
    "front": "捜査",
    "back": "investigation",
    "exampleJp": "警察は現場に残された指紋や防犯カメラの映像をもとに、慎重に捜査を進めている。",
    "exampleTranslation": "The police are cautiously proceeding with the investigation based on fingerprints left at the scene and security camera footage.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0120"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 120
  },
  {
    "category": "vocabulary",
    "front": "立証",
    "back": "proof, substantiation",
    "exampleJp": "医療ミスの裁判において、医師の過失を科学的に立証するのは極めて困難である。",
    "exampleTranslation": "In a medical malpractice trial, it is extremely difficult to scientifically prove the doctor's negligence.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0121"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 121
  },
  {
    "category": "vocabulary",
    "front": "証人",
    "back": "witness",
    "exampleJp": "事件の決定的な瞬間を目撃した証人が、法廷で真実を語る予定だ。",
    "exampleTranslation": "A witness who saw the decisive moment of the incident is scheduled to speak the truth in court.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0122"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 122
  },
  {
    "category": "vocabulary",
    "front": "証言",
    "back": "testimony",
    "exampleJp": "目撃者の証言が二転三転しており、事件の真相を解明する上で大きな壁となっている。",
    "exampleTranslation": "The eyewitness testimony keeps changing back and forth, which poses a major hurdle in uncovering the truth of the incident.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0123"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 123
  },
  {
    "category": "vocabulary",
    "front": "偽証",
    "back": "perjury",
    "exampleJp": "法廷で嘘の供述をした場合、偽証罪に問われ厳しく処罰される可能性がある。",
    "exampleTranslation": "If you give false testimony in court, there is a possibility that you will be charged with perjury and severely punished.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0124"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 124
  },
  {
    "category": "vocabulary",
    "front": "供述",
    "back": "deposition, statement",
    "exampleJp": "取調室で容疑者が語った供述の内容には、いくつか矛盾する点がみられる。",
    "exampleTranslation": "There are several contradictory points seen in the contents of the statement the suspect gave in the interrogation room.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0125"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 125
  },
  {
    "category": "vocabulary",
    "front": "自白",
    "back": "confession",
    "exampleJp": "厳しい取り調べに耐えきれず、容疑者はついに自らの犯行を自白した。",
    "exampleTranslation": "Unable to endure the harsh interrogation, the suspect finally confessed to his crime.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0126"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 126
  },
  {
    "category": "vocabulary",
    "front": "黙秘",
    "back": "remaining silent",
    "exampleJp": "逮捕された男は弁護士が到着するまで、一切の質問に対して黙秘を貫いた。",
    "exampleTranslation": "The arrested man strictly remained silent in response to all questions until his lawyer arrived.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0127"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 127
  },
  {
    "category": "vocabulary",
    "front": "容疑",
    "back": "suspicion",
    "exampleJp": "強盗殺人事件の容疑が固まったとして、警察は指名手配していた男を逮捕した。",
    "exampleTranslation": "Determining that the suspicion of robbery and murder had been solidified, the police arrested the wanted man.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0128"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 128
  },
  {
    "category": "vocabulary",
    "front": "被疑",
    "back": "suspected (of a crime)",
    "exampleJp": "現場周辺の防犯カメラの映像から、被疑者の足取りが徐々に明らかになってきた。",
    "exampleTranslation": "From the security camera footage around the scene, the suspect's movements have gradually become clear.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0129"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 129
  },
  {
    "category": "vocabulary",
    "front": "犯行",
    "back": "crime, criminal act",
    "exampleJp": "犯行の手口があまりにも計画的で巧妙であることから、プロの仕業と推測されている。",
    "exampleTranslation": "Because the method of the crime was so deliberate and cunning, it is presumed to be the work of a professional.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0130"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 130
  },
  {
    "category": "vocabulary",
    "front": "被害者",
    "back": "victim",
    "exampleJp": "凄惨な事件の被害者とその家族を支援するための、新たな法案が議論されている。",
    "exampleTranslation": "A new bill to support the victims of gruesome crimes and their families is being discussed.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0131"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 131
  },
  {
    "category": "vocabulary",
    "front": "加害者",
    "back": "assailant, perpetrator",
    "exampleJp": "交通事故の加害者は、被害者に対して誠意をもって謝罪し、賠償する責任がある。",
    "exampleTranslation": "The perpetrator of a traffic accident has a responsibility to sincerely apologize and provide compensation to the victim.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0132"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 132
  },
  {
    "category": "vocabulary",
    "front": "遺族",
    "back": "bereaved family",
    "exampleJp": "航空機事故から一年が経ち、慰霊碑の前で遺族たちが静かに祈りを捧げた。",
    "exampleTranslation": "A year having passed since the airplane accident, bereaved families quietly offered prayers in front of the memorial monument.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0133"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 133
  },
  {
    "category": "vocabulary",
    "front": "賠償",
    "back": "reparations, compensation",
    "exampleJp": "製品の欠陥によって生じた損害について、メーカー側は全額を賠償する義務を負う。",
    "exampleTranslation": "The manufacturer bears an obligation to fully compensate for damages caused by defects in the product.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0134"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 134
  },
  {
    "category": "vocabulary",
    "front": "慰謝料",
    "back": "consolation money, settlement (for emotional distress)",
    "exampleJp": "浮気が原因で離婚することになり、元配偶者に対して多額の慰謝料を請求した。",
    "exampleTranslation": "Filing for divorce due to infidelity, a large amount of consolation money was demanded from the ex-spouse.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0135"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 135
  },
  {
    "category": "vocabulary",
    "front": "示談",
    "back": "out-of-court settlement",
    "exampleJp": "裁判が長引くのを避けるため、弁護士を介して相手方と示談交渉を進めることにした。",
    "exampleTranslation": "In order to avoid prolonging the trial, we decided to proceed with out-of-court settlement negotiations with the other party through a lawyer.",
    "tags": [
      "n1",
      "vocabulary",
      "society",
      "policy",
      "administration"
    ],
    "sourceIds": [
      "n1-vocab-0136"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 136
  },
  {
    "category": "vocabulary",
    "front": "促す",
    "back": "to prompt; to urge; to encourage",
    "exampleJp": "政府は各企業に対し、温室効果ガスの排出削減を強く促している。",
    "exampleTranslation": "The government is strongly urging companies to reduce their greenhouse gas emissions.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0137"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 137
  },
  {
    "category": "vocabulary",
    "front": "阻む",
    "back": "to hinder; to obstruct",
    "exampleJp": "野党はその法案の成立を阻もうと国会で抵抗を続けている。",
    "exampleTranslation": "The opposition party continues to resist in the Diet in an attempt to obstruct the passage of the bill.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0138"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 138
  },
  {
    "category": "vocabulary",
    "front": "企てる",
    "back": "to plan; to plot; to scheme",
    "exampleJp": "ハッカー集団が企業の機密情報を盗み出すことを企てていた。",
    "exampleTranslation": "A hacker group was plotting to steal the company's confidential information.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0139"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 139
  },
  {
    "category": "vocabulary",
    "front": "凌ぐ",
    "back": "to endure; to outdo; to stave off",
    "exampleJp": "真夏の厳しい暑さを凌ぐため、昔ながらの知恵が再び注目されている。",
    "exampleTranslation": "Traditional wisdom is once again attracting attention as a way to stave off the severe heat of midsummer.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0140"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 140
  },
  {
    "category": "vocabulary",
    "front": "葬り去る",
    "back": "to bury in oblivion; to consign to history",
    "exampleJp": "そのスキャンダルは、権力者たちの手によって完全に闇に葬り去られた。",
    "exampleTranslation": "The scandal was completely buried in darkness by those in power.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0141"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 141
  },
  {
    "category": "vocabulary",
    "front": "帯びる",
    "back": "to take on (a characteristic); to be entrusted with",
    "exampleJp": "交渉は次第に熱を帯び、深夜まで白熱した議論が続いた。",
    "exampleTranslation": "The negotiations gradually became heated, and intense discussions continued until late at night.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0142"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 142
  },
  {
    "category": "vocabulary",
    "front": "顧みる",
    "back": "to look back on; to reflect; to consider",
    "exampleJp": "経済発展ばかりを追求し、自然環境の保護を顧みなかった結果が今の惨状だ。",
    "exampleTranslation": "The current devastation is the result of pursuing only economic development without considering environmental protection.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0143"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 143
  },
  {
    "category": "vocabulary",
    "front": "怠る",
    "back": "to neglect; to fail to do",
    "exampleJp": "定期的な設備の保守点検を怠ったことが、今回の大事故を招いた。",
    "exampleTranslation": "Neglecting regular equipment maintenance inspections led to this major accident.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0144"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 144
  },
  {
    "category": "vocabulary",
    "front": "養う",
    "back": "to cultivate; to support (a family); to feed",
    "exampleJp": "海外の文献を広く読むことで、国際的な広い視野を養うことができる。",
    "exampleTranslation": "By reading a wide range of foreign literature, one can cultivate a broad international perspective.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0145"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 145
  },
  {
    "category": "vocabulary",
    "front": "伴う",
    "back": "to accompany; to entail",
    "exampleJp": "大規模な組織改革には、多大な痛みが伴うことは避けられない。",
    "exampleTranslation": "It is inevitable that large-scale organizational reform will be accompanied by significant pain.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0146"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 146
  },
  {
    "category": "vocabulary",
    "front": "狂う",
    "back": "to go out of order; to go mad; to be thwarted",
    "exampleJp": "一人の些細なミスから、プロジェクト全体の計画が大きく狂ってしまった。",
    "exampleTranslation": "A single minor mistake threw the entire project plan completely out of order.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0147"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 147
  },
  {
    "category": "vocabulary",
    "front": "誓う",
    "back": "to swear; to vow; to pledge",
    "exampleJp": "両国は平和条約に署名し、二度と武力行使をしないことを固く誓った。",
    "exampleTranslation": "The two countries signed a peace treaty and firmly swore never to resort to armed force again.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0148"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 148
  },
  {
    "category": "vocabulary",
    "front": "奪う",
    "back": "to snatch away; to steal; to captivate",
    "exampleJp": "山頂から見下ろすその美しい景色は、訪れる人々の心を一瞬にして奪う。",
    "exampleTranslation": "The beautiful scenery viewed from the summit instantly captivates the hearts of visitors.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0149"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 149
  },
  {
    "category": "vocabulary",
    "front": "遮る",
    "back": "to interrupt; to intercept; to obstruct",
    "exampleJp": "会議中、私の発言を遮ってまで彼が主張したかったことは何なのだろうか。",
    "exampleTranslation": "I wonder what he wanted to assert so badly that he would interrupt my speech during the meeting.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0150"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 150
  },
  {
    "category": "vocabulary",
    "front": "遡る",
    "back": "to go back in time; to trace back",
    "exampleJp": "この伝統的な祭りの起源は、今から約五百年前にまで遡ると言われている。",
    "exampleTranslation": "The origin of this traditional festival is said to trace back approximately 500 years.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0151"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 151
  },
  {
    "category": "vocabulary",
    "front": "免れる",
    "back": "to escape from; to avoid; to evade",
    "exampleJp": "早期に警戒システムが作動したおかげで、最悪の事態は免れることができた。",
    "exampleTranslation": "Thanks to the early activation of the warning system, the worst-case scenario could be avoided.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0152"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 152
  },
  {
    "category": "vocabulary",
    "front": "尽くす",
    "back": "to exhaust; to exert; to render (services)",
    "exampleJp": "医療チームは患者の命を救うために、現代医学であらゆる手を尽くした。",
    "exampleTranslation": "The medical team exhausted every possible measure in modern medicine to save the patient's life.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0153"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 153
  },
  {
    "category": "vocabulary",
    "front": "施す",
    "back": "to apply; to perform; to grant",
    "exampleJp": "古い建造物に適切な保存処理を施すことで、後世に長く残すことができる。",
    "exampleTranslation": "By applying appropriate preservation treatments to old buildings, they can be preserved for future generations.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0154"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 154
  },
  {
    "category": "vocabulary",
    "front": "催す",
    "back": "to hold (an event); to show signs of; to feel",
    "exampleJp": "春の訪れとともに、全国各地で桜の開花を祝う祭りが大々的に催される。",
    "exampleTranslation": "With the arrival of spring, festivals celebrating the blooming of cherry blossoms are held on a grand scale across the country.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0155"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 155
  },
  {
    "category": "vocabulary",
    "front": "案じる",
    "back": "to worry; to be anxious about",
    "exampleJp": "親は常に子供の将来を案じているものだが、過干渉にならないよう注意が必要だ。",
    "exampleTranslation": "Parents always worry about their children's future, but care must be taken not to become overly interfering.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0156"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 156
  },
  {
    "category": "vocabulary",
    "front": "講じる",
    "back": "to take (measures); to devise",
    "exampleJp": "感染症の拡大を防ぐために、政府は早急に抜本的な対策を講じるべきだ。",
    "exampleTranslation": "In order to prevent the spread of the infectious disease, the government should urgently take drastic measures.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0157"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 157
  },
  {
    "category": "vocabulary",
    "front": "投じる",
    "back": "to throw; to invest; to cast (a vote)",
    "exampleJp": "その企業は次世代技術の開発に莫大な資金を投じることを決定した。",
    "exampleTranslation": "The company decided to invest an enormous amount of funds into the development of next-generation technology.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0158"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 158
  },
  {
    "category": "vocabulary",
    "front": "転じる",
    "back": "to turn; to shift; to alter",
    "exampleJp": "長らく低迷していた業績が、新製品のヒットを機に黒字へと転じた。",
    "exampleTranslation": "The business performance, which had been sluggish for a long time, turned profitable triggered by the hit of a new product.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0159"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 159
  },
  {
    "category": "vocabulary",
    "front": "生じる",
    "back": "to produce; to result; to arise",
    "exampleJp": "両国間の貿易摩擦により、経済全体に深刻な悪影響が生じている。",
    "exampleTranslation": "Trade friction between the two countries is causing serious adverse effects on the overall economy.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0160"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 160
  },
  {
    "category": "vocabulary",
    "front": "報じる",
    "back": "to report; to inform",
    "exampleJp": "メディアはその汚職事件の真相を連日大きく報じている。",
    "exampleTranslation": "The media is reporting heavily on the truth behind the corruption scandal day after day.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0161"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 161
  },
  {
    "category": "vocabulary",
    "front": "乗じる",
    "back": "to take advantage of; to multiply",
    "exampleJp": "敵の隙に乗じて、我々の軍は一気に陣地を奪還した。",
    "exampleTranslation": "Taking advantage of the enemy's vulnerability, our army recaptured the position in one fell swoop.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0162"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 162
  },
  {
    "category": "vocabulary",
    "front": "準じる",
    "back": "to follow; to conform to; to apply proportionately",
    "exampleJp": "給与体系は、公務員の規定に準じて改定されることになった。",
    "exampleTranslation": "The salary system has been revised in accordance with the regulations for civil servants.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0163"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 163
  },
  {
    "category": "vocabulary",
    "front": "募る",
    "back": "to grow intense; to solicit; to invite",
    "exampleJp": "被災地への支援を求める声が、日を追うごとに強く募っている。",
    "exampleTranslation": "Calls appealing for support for the disaster-stricken areas are growing stronger by the day.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0164"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 164
  },
  {
    "category": "vocabulary",
    "front": "凝る",
    "back": "to be absorbed in; to become stiff; to elaborate",
    "exampleJp": "彼は最近写真撮影に凝っていて、休日のたびにカメラを持って出かける。",
    "exampleTranslation": "He has recently been absorbed in photography and goes out with his camera every day off.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0165"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 165
  },
  {
    "category": "vocabulary",
    "front": "擦る",
    "back": "to rub; to chafe",
    "exampleJp": "マッチを擦ってろうそくに火を灯すと、部屋が少し暖かくなった。",
    "exampleTranslation": "When I struck a match and lit the candle, the room became a little warmer.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0166"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 166
  },
  {
    "category": "vocabulary",
    "front": "悟る",
    "back": "to realize; to attain enlightenment; to perceive",
    "exampleJp": "自分が大きな過ちを犯していたことを悟り、彼は深く反省した。",
    "exampleTranslation": "Realizing that he had made a major mistake, he reflected deeply on his actions.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0167"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 167
  },
  {
    "category": "vocabulary",
    "front": "障る",
    "back": "to hinder; to be harmful to",
    "exampleJp": "夜更かしは体に障るから、早く寝るようにと医者に忠告された。",
    "exampleTranslation": "I was advised by the doctor to go to bed early because staying up late is harmful to my health.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0168"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 168
  },
  {
    "category": "vocabulary",
    "front": "鈍る",
    "back": "to become blunt; to weaken; to slow down",
    "exampleJp": "長期間練習を休んでいたため、試合での決断力が著しく鈍っていた。",
    "exampleTranslation": "Because I had taken a long break from practice, my decision-making ability during the match had significantly weakened.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0169"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 169
  },
  {
    "category": "vocabulary",
    "front": "練る",
    "back": "to refine; to knead; to polish (a plan)",
    "exampleJp": "新製品の販売戦略を練るため、企画チームは連日会議を重ねている。",
    "exampleTranslation": "The planning team has been holding meetings day after day to refine the sales strategy for the new product.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0170"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 170
  },
  {
    "category": "vocabulary",
    "front": "測る",
    "back": "to measure; to weigh; to estimate",
    "exampleJp": "アンケート調査を実施して、消費者のニーズを正確に測る必要がある。",
    "exampleTranslation": "It is necessary to conduct a questionnaire survey to accurately gauge consumer needs.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0171"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 171
  },
  {
    "category": "vocabulary",
    "front": "諮る",
    "back": "to consult; to discuss with; to refer to",
    "exampleJp": "この重要な案件については、次回の取締役会に諮って決定する予定だ。",
    "exampleTranslation": "We plan to refer this important matter to the next board of directors meeting for a decision.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0172"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 172
  },
  {
    "category": "vocabulary",
    "front": "謀る",
    "back": "to scheme; to plot; to contrive",
    "exampleJp": "彼はライバル企業を陥れるために、巧妙な罠を謀っていたことが発覚した。",
    "exampleTranslation": "It was discovered that he had been plotting an elaborate trap to undermine the rival company.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0173"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 173
  },
  {
    "category": "vocabulary",
    "front": "巡る",
    "back": "to go around; to concern; to tour",
    "exampleJp": "その遺産相続を巡って、親族間で泥沼の争いが繰り広げられている。",
    "exampleTranslation": "A bitter dispute is unfolding among the relatives concerning the inheritance of the estate.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0174"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 174
  },
  {
    "category": "vocabulary",
    "front": "蘇る",
    "back": "to be resurrected; to revive; to be recalled",
    "exampleJp": "古いアルバムを見ていると、楽しかった学生時代の記憶が鮮明に蘇ってきた。",
    "exampleTranslation": "While looking at the old album, memories of my fun school days vividly came back to life.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0175"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 175
  },
  {
    "category": "vocabulary",
    "front": "操る",
    "back": "to manipulate; to operate; to command",
    "exampleJp": "彼女は５か国語を流暢に操る優秀な通訳として国際会議で活躍している。",
    "exampleTranslation": "She is active at international conferences as an excellent interpreter who fluently commands five languages.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0176"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 176
  },
  {
    "category": "vocabulary",
    "front": "労わる",
    "back": "to care for; to sympathize with; to console",
    "exampleJp": "長年の過酷な労働で疲れた体を労わるために、温泉旅行に出かけた。",
    "exampleTranslation": "I went on a hot spring trip to care for my body, which was exhausted from years of harsh labor.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0177"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 177
  },
  {
    "category": "vocabulary",
    "front": "賜る",
    "back": "to be granted; to receive (humble)",
    "exampleJp": "本日はご多忙のところ、このような盛大な賞を賜り、誠に光栄に存じます。",
    "exampleTranslation": "I am truly honored to be granted such a grand award today despite your busy schedule.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0178"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 178
  },
  {
    "category": "vocabulary",
    "front": "携わる",
    "back": "to participate in; to be involved in",
    "exampleJp": "私は大学卒業以来、一貫して医療機器の設計開発に携わってきました。",
    "exampleTranslation": "Since graduating from university, I have been consistently involved in the design and development of medical equipment.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0179"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 179
  },
  {
    "category": "vocabulary",
    "front": "尽きる",
    "back": "to be exhausted; to run out; to come to an end",
    "exampleJp": "議論が堂々巡りになり、ついに解決策を見出すアイデアが尽きてしまった。",
    "exampleTranslation": "The discussion went around in circles, and we finally ran out of ideas for finding a solution.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0180"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 180
  },
  {
    "category": "vocabulary",
    "front": "朽ちる",
    "back": "to rot; to decay",
    "exampleJp": "森の奥深くに、何百年も放置されて完全に朽ち果てた寺院の跡があった。",
    "exampleTranslation": "Deep in the forest, there were the ruins of a temple that had been abandoned for hundreds of years and had completely decayed.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0181"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 181
  },
  {
    "category": "vocabulary",
    "front": "滅びる",
    "back": "to perish; to be ruined; to go to ruin",
    "exampleJp": "かつて栄華を極めたその巨大な帝国も、内部の腐敗によって滅びてしまった。",
    "exampleTranslation": "Even that massive empire, which once boasted supreme prosperity, perished due to internal corruption.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0182"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 182
  },
  {
    "category": "vocabulary",
    "front": "染みる",
    "back": "to pierce; to soak into; to be infected",
    "exampleJp": "彼の思いやりのある温かい言葉が、失意の底にいる私の胸に深く染みた。",
    "exampleTranslation": "His warm and considerate words deeply touched my heart when I was in the depths of despair.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0183"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 183
  },
  {
    "category": "vocabulary",
    "front": "省みる",
    "back": "to reflect on oneself; to reconsider",
    "exampleJp": "失敗を他人のせいにするのではなく、自らの行動を省みることが成長への第一歩だ。",
    "exampleTranslation": "Reflecting on one's own actions, rather than blaming others for failures, is the first step toward growth.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0184"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 184
  },
  {
    "category": "vocabulary",
    "front": "懲りる",
    "back": "to learn by experience; to learn one's lesson",
    "exampleJp": "先日の投資で大損をしたというのに、彼はまだ懲りずに新しい株を買っている。",
    "exampleTranslation": "Even though he suffered a huge loss in his recent investment, he hasn't learned his lesson and is buying new stocks again.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0185"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 185
  },
  {
    "category": "vocabulary",
    "front": "据える",
    "back": "to set; to lay; to install",
    "exampleJp": "監視カメラを玄関先に据えることで、防犯効果を高めることが期待できる。",
    "exampleTranslation": "Installing security cameras at the entrance is expected to enhance crime prevention.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0186"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 186
  },
  {
    "category": "vocabulary",
    "front": "添える",
    "back": "to add to; to attach; to accompany",
    "exampleJp": "感謝の気持ちを伝えるため、贈り物に手書きの短い手紙を添えた。",
    "exampleTranslation": "To convey my feelings of gratitude, I attached a short handwritten letter to the gift.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0187"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 187
  },
  {
    "category": "vocabulary",
    "front": "堪える",
    "back": "to bear; to endure; to stand",
    "exampleJp": "その木造の家屋は、長年の激しい風雨によく堪えて立っている。",
    "exampleTranslation": "That wooden house remains standing, having well endured many years of fierce wind and rain.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0188"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 188
  },
  {
    "category": "vocabulary",
    "front": "控える",
    "back": "to refrain; to wait; to be in preparation for",
    "exampleJp": "健康診断を明日に控えているため、今夜はアルコールの摂取を控えるつもりだ。",
    "exampleTranslation": "Because I have a health checkup tomorrow, I am refraining from alcohol tonight.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0189"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 189
  },
  {
    "category": "vocabulary",
    "front": "鍛える",
    "back": "to forge; to train; to discipline",
    "exampleJp": "厳しい環境の中で精神を鍛えることが、一流のプロアスリートには不可欠だ。",
    "exampleTranslation": "Discipline of the mind in harsh environments is essential for top-tier professional athletes.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0190"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 190
  },
  {
    "category": "vocabulary",
    "front": "唱える",
    "back": "to recite; to advocate; to advance (a theory)",
    "exampleJp": "一部の経済学者は、現在の金融緩和政策に対して強い異議を唱えている。",
    "exampleTranslation": "Some economists are strongly advocating objections to the current monetary easing policy.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0191"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 191
  },
  {
    "category": "vocabulary",
    "front": "衰える",
    "back": "to become weak; to decline; to decay",
    "exampleJp": "年齢とともに体力は衰えるが、知恵や経験はむしろ豊かになっていくものだ。",
    "exampleTranslation": "Physical strength declines with age, but wisdom and experience tend to become richer.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0192"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 192
  },
  {
    "category": "vocabulary",
    "front": "踏まえる",
    "back": "to be based on; to take into account",
    "exampleJp": "前回のプロジェクトでの失敗を踏まえて、今回はより慎重に計画を立てた。",
    "exampleTranslation": "Taking into account the failures of the previous project, we planned more carefully this time.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0193"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 193
  },
  {
    "category": "vocabulary",
    "front": "迫る",
    "back": "to approach; to press; to urge",
    "exampleJp": "提出の締め切りが明日に迫っており、担当者は徹夜で書類を作成している。",
    "exampleTranslation": "With the submission deadline approaching tomorrow, the person in charge is working all night to prepare the documents.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0194"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 194
  },
  {
    "category": "vocabulary",
    "front": "濁る",
    "back": "to become muddy; to get impure; to become cloudy",
    "exampleJp": "大雨の影響で、昨日まで透き通っていた川の水が茶色く濁ってしまった。",
    "exampleTranslation": "Due to the heavy rain, the river water, which had been clear until yesterday, has become a muddy brown.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0195"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 195
  },
  {
    "category": "vocabulary",
    "front": "潜る",
    "back": "to dive; to pass under; to evade",
    "exampleJp": "警察の厳しい監視の目を潜って、犯人は海外へ逃亡したとみられている。",
    "exampleTranslation": "It is believed that the suspect slipped through the strict surveillance of the police and fled overseas.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0196"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 196
  },
  {
    "category": "vocabulary",
    "front": "譲る",
    "back": "to hand over; to concede; to surrender",
    "exampleJp": "議論が平行線をたどったため、双方が少しずつ歩み寄り譲る必要があった。",
    "exampleTranslation": "Because the discussion was running parallel, it was necessary for both sides to compromise and make concessions bit by bit.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0197"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 197
  },
  {
    "category": "vocabulary",
    "front": "偏る",
    "back": "to be unbalanced; to lean; to be biased",
    "exampleJp": "現代人はどうしても食生活が偏りがちなので、サプリメントで栄養を補う人が多い。",
    "exampleTranslation": "Because modern people's diets tend to be unbalanced, many people supplement their nutrition with vitamins.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0198"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 198
  },
  {
    "category": "vocabulary",
    "front": "透き通る",
    "back": "to be transparent; to be clear",
    "exampleJp": "その島の海は、底の砂粒が見えるほど美しく透き通っていた。",
    "exampleTranslation": "The sea around that island was so beautifully transparent that you could see the grains of sand on the bottom.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0199"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 199
  },
  {
    "category": "vocabulary",
    "front": "煮詰まる",
    "back": "to come to a conclusion; to boil down; to reach a dead end",
    "exampleJp": "長時間の会議で議論が煮詰まり、ついに全員が納得する結論が出た。",
    "exampleTranslation": "After a long meeting, the discussion boiled down, and finally, a conclusion was reached that everyone agreed with.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0200"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 200
  },
  {
    "category": "vocabulary",
    "front": "絡む",
    "back": "to entangle; to be involved; to pick a quarrel",
    "exampleJp": "その複雑な事件には、複数の国の政治的利害が複雑に絡んでいる。",
    "exampleTranslation": "The political interests of multiple countries are complexly entangled in that complicated incident.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0201"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 201
  },
  {
    "category": "vocabulary",
    "front": "恨む",
    "back": "to resent; to hold a grudge",
    "exampleJp": "他人を恨むよりも、今の厳しい状況をどう打開するかを考えるべきだ。",
    "exampleTranslation": "Rather than holding a grudge against others, you should think about how to overcome this difficult situation.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0202"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 202
  },
  {
    "category": "vocabulary",
    "front": "酌む",
    "back": "to serve alcohol; to consider someone's feelings; to drink together",
    "exampleJp": "部下の不満や不安を酌んで、適切なフォローをするのが上司の重要な役目だ。",
    "exampleTranslation": "It is an important duty of a boss to consider the dissatisfactions and anxieties of subordinates and provide appropriate support.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0203"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 203
  },
  {
    "category": "vocabulary",
    "front": "澄む",
    "back": "to clear; to become transparent; to be unclouded",
    "exampleJp": "秋の夜空は空気が澄んでいて、星が普段よりもはっきりと美しく見える。",
    "exampleTranslation": "The air in the autumn night sky is clear, making the stars look more distinctly beautiful than usual.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0204"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 204
  },
  {
    "category": "vocabulary",
    "front": "霞む",
    "back": "to grow hazy; to be blurred; to be overshadowed",
    "exampleJp": "彼の圧倒的な才能の前では、他の参加者たちの努力すら霞んで見えた。",
    "exampleTranslation": "In the face of his overwhelming talent, even the efforts of the other participants seemed to pale in comparison.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0205"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 205
  },
  {
    "category": "vocabulary",
    "front": "弾む",
    "back": "to bounce; to be lively; to bound",
    "exampleJp": "久しぶりに昔の親友と再会し、思い出話で夜遅くまで会話が弾んだ。",
    "exampleTranslation": "Reuniting with an old friend after a long time, the conversation was lively with reminiscing until late at night.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0206"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 206
  },
  {
    "category": "vocabulary",
    "front": "悼む",
    "back": "to grieve; to mourn",
    "exampleJp": "世界中から多くの人々が集まり、その偉大な指導者の死を深く悼んだ。",
    "exampleTranslation": "Many people gathered from all over the world to deeply mourn the death of the great leader.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0207"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 207
  },
  {
    "category": "vocabulary",
    "front": "惜しむ",
    "back": "to be frugal; to regret; to value",
    "exampleJp": "成功を手にするためには、日々の地道な努力を惜しんではならない。",
    "exampleTranslation": "In order to achieve success, one must not spare any steady, daily effort.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0208"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 208
  },
  {
    "category": "vocabulary",
    "front": "悔やむ",
    "back": "to mourn; to regret; to repent",
    "exampleJp": "今さら過去の失敗を悔やんでも状況は変わらないのだから、前を向こう。",
    "exampleTranslation": "Regretting past failures now won't change the situation, so let's look forward.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0209"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 209
  },
  {
    "category": "vocabulary",
    "front": "和らぐ",
    "back": "to soften; to calm down; to be mitigated",
    "exampleJp": "丁寧で誠実な対応をしたことで、顧客の怒りも次第に和らいだようだ。",
    "exampleTranslation": "The customer's anger seemed to gradually soften due to the polite and sincere response.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0210"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 210
  },
  {
    "category": "vocabulary",
    "front": "揺らぐ",
    "back": "to swing; to waver; to be shaken",
    "exampleJp": "相次ぐ不祥事により、その大企業に対する消費者の信頼は大きく揺らいでいる。",
    "exampleTranslation": "Due to a series of scandals, consumer trust in that large corporation has been significantly shaken.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0211"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 211
  },
  {
    "category": "vocabulary",
    "front": "稼ぐ",
    "back": "to earn (income); to gain (time)",
    "exampleJp": "本隊が到着するまでの間、前線部隊はどうにかして時間を稼ぐ必要があった。",
    "exampleTranslation": "The frontline troops had to somehow buy time until the main force arrived.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0212"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 212
  },
  {
    "category": "vocabulary",
    "front": "防ぐ",
    "back": "to defend; to prevent; to protect against",
    "exampleJp": "サイバー攻撃を未然に防ぐため、システム全体のセキュリティ強化が急務だ。",
    "exampleTranslation": "In order to prevent cyberattacks before they happen, strengthening the security of the entire system is an urgent task.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0213"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 213
  },
  {
    "category": "vocabulary",
    "front": "継ぐ",
    "back": "to inherit; to take over; to succeed",
    "exampleJp": "彼は伝統ある陶芸の技術を継ぐために、師匠のもとで厳しい修行を重ねている。",
    "exampleTranslation": "He is undergoing strict training under his master in order to inherit the traditional techniques of pottery.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0214"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 214
  },
  {
    "category": "vocabulary",
    "front": "研ぐ",
    "back": "to sharpen; to polish; to wash (rice)",
    "exampleJp": "料理人は毎晩仕事が終わると、明日使う包丁を念入りに研いでいる。",
    "exampleTranslation": "Every night after work, the chef carefully sharpens the knives he will use tomorrow.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0215"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 215
  },
  {
    "category": "vocabulary",
    "front": "仰ぐ",
    "back": "to look up; to ask for; to seek",
    "exampleJp": "未知の分野の事業を展開するため、専門家の指導を仰ぐことにした。",
    "exampleTranslation": "In order to develop a business in an unknown field, we decided to seek the guidance of experts.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0216"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 216
  },
  {
    "category": "vocabulary",
    "front": "打ち明ける",
    "back": "to confide; to reveal; to disclose",
    "exampleJp": "彼女はずっと胸に秘めていた深い悩みを、親友にだけそっと打ち明けた。",
    "exampleTranslation": "She quietly confided the deep worries she had kept hidden in her heart only to her best friend.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0217"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 217
  },
  {
    "category": "vocabulary",
    "front": "割り込む",
    "back": "to cut in; to interrupt; to squeeze into",
    "exampleJp": "高速道路の渋滞中、強引に車列に割り込んできた車がありヒヤリとした。",
    "exampleTranslation": "During the traffic jam on the highway, I was startled by a car that forcefully cut into the line.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0218"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 218
  },
  {
    "category": "vocabulary",
    "front": "追い込む",
    "back": "to herd; to corner; to drive into",
    "exampleJp": "不況による売上の激減が、その中小企業を倒産の危機に追い込んだ。",
    "exampleTranslation": "The drastic decrease in sales due to the recession drove the small and medium-sized enterprise to the brink of bankruptcy.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0219"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 219
  },
  {
    "category": "vocabulary",
    "front": "落ち込む",
    "back": "to feel down; to decline; to fall into",
    "exampleJp": "試験に不合格だったからといって、そんなに深く落ち込む必要はない。",
    "exampleTranslation": "You don't need to feel so deeply depressed just because you failed the exam.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0220"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 220
  },
  {
    "category": "vocabulary",
    "front": "意気込む",
    "back": "to be enthusiastic; to be eager; to resolve",
    "exampleJp": "彼は今度こそ絶対に優勝してみせると、並々ならぬ決意で意気込んでいる。",
    "exampleTranslation": "He is enthusiastic with an extraordinary determination, saying he will definitely win the championship this time.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0221"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 221
  },
  {
    "category": "vocabulary",
    "front": "踏み込む",
    "back": "to step into; to delve into",
    "exampleJp": "警察はついに、違法カジノの拠点と見られる雑居ビルに強制的に踏み込んだ。",
    "exampleTranslation": "The police finally forcefully raided the multi-tenant building believed to be the base of an illegal casino.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0222"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 222
  },
  {
    "category": "vocabulary",
    "front": "立て替える",
    "back": "to pay on behalf of someone; to advance money",
    "exampleJp": "出張にかかった交通費は、一旦自分で立て替えておき、後日会社に請求する。",
    "exampleTranslation": "I will temporarily advance the transportation expenses for the business trip out of pocket and bill the company later.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0223"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 223
  },
  {
    "category": "vocabulary",
    "front": "切り替える",
    "back": "to switch; to change; to shift",
    "exampleJp": "失敗をいつまでも引きずらず、気持ちを切り替えて次の課題に取り組もう。",
    "exampleTranslation": "Don't let the failure drag on forever; switch your mindset and tackle the next task.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0224"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 224
  },
  {
    "category": "vocabulary",
    "front": "差し替える",
    "back": "to replace; to swap",
    "exampleJp": "印刷会社に連絡して、パンフレットの表紙の画像を新しいものに差し替えてもらった。",
    "exampleTranslation": "I contacted the printing company and had them replace the cover image of the brochure with a new one.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0225"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 225
  },
  {
    "category": "vocabulary",
    "front": "振り返る",
    "back": "to look back; to review; to reflect on",
    "exampleJp": "年末になり、今年一年の自分の行動や成果を静かに振り返る時間を設けた。",
    "exampleTranslation": "As the end of the year approached, I set aside time to quietly reflect on my actions and achievements over the past year.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0226"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 226
  },
  {
    "category": "vocabulary",
    "front": "引き返す",
    "back": "to turn back; to retrace one's steps",
    "exampleJp": "登山の途中で天候が急変したため、我々は山頂を諦めて引き返す決断を下した。",
    "exampleTranslation": "Because the weather changed suddenly during the climb, we made the decision to give up on the summit and turn back.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0227"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 227
  },
  {
    "category": "vocabulary",
    "front": "思い詰める",
    "back": "to brood over; to torment oneself; to think hard",
    "exampleJp": "彼は仕事のミスを一人で深く思い詰め、すっかり元気をなくしてしまった。",
    "exampleTranslation": "He brooded deeply over his mistake at work all by himself and completely lost his spirit.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0228"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 228
  },
  {
    "category": "vocabulary",
    "front": "結び付く",
    "back": "to be connected; to be linked; to lead to",
    "exampleJp": "日々の地道な努力が、最終的に大きな成果へと結び付くことはよくある。",
    "exampleTranslation": "It is common for steady daily effort to eventually lead to major achievements.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0229"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 229
  },
  {
    "category": "vocabulary",
    "front": "持ち込む",
    "back": "to bring in; to lodge (a complaint)",
    "exampleJp": "試験会場への携帯電話などの電子機器の持ち込みは、一切禁止されている。",
    "exampleTranslation": "Bringing electronic devices such as mobile phones into the examination room is strictly prohibited.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0230"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 230
  },
  {
    "category": "vocabulary",
    "front": "払い戻す",
    "back": "to refund; to reimburse",
    "exampleJp": "悪天候のためコンサートが中止となり、チケット代金はすべて払い戻された。",
    "exampleTranslation": "The concert was canceled due to bad weather, and all ticket prices were refunded.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0231"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 231
  },
  {
    "category": "vocabulary",
    "front": "取り戻す",
    "back": "to regain; to recover; to get back",
    "exampleJp": "長年のリハビリの末、彼はようやく事故前の身体機能を取り戻しつつある。",
    "exampleTranslation": "After years of rehabilitation, he is finally beginning to recover his pre-accident physical functions.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0232"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 232
  },
  {
    "category": "vocabulary",
    "front": "引き起こす",
    "back": "to cause; to induce; to bring about",
    "exampleJp": "ささいな誤解が、両国間に取り返しのつかない深刻な対立を引き起こした。",
    "exampleTranslation": "A trivial misunderstanding brought about a severe, irreparable conflict between the two countries.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0233"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 233
  },
  {
    "category": "vocabulary",
    "front": "指摘する",
    "back": "to point out; to indicate",
    "exampleJp": "専門家は、その都市計画案にはいくつかの致命的な欠陥があると指摘している。",
    "exampleTranslation": "Experts point out that there are several fatal flaws in the urban planning proposal.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0234"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 234
  },
  {
    "category": "vocabulary",
    "front": "見落とす",
    "back": "to overlook; to miss; to fail to notice",
    "exampleJp": "契約書にサインする前に、重要な条項を見落としていないか入念に確認した。",
    "exampleTranslation": "Before signing the contract, I carefully checked to make sure I hadn't overlooked any important clauses.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0235"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 235
  },
  {
    "category": "vocabulary",
    "front": "見逃す",
    "back": "to miss; to overlook; to let pass",
    "exampleJp": "絶好の得点チャンスを見逃してしまい、チームは惜しくも敗退することとなった。",
    "exampleTranslation": "Having missed a golden scoring opportunity, the team regrettably ended up being defeated.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0236"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 236
  },
  {
    "category": "vocabulary",
    "front": "見計らう",
    "back": "to choose at one's discretion; to estimate (the time)",
    "exampleJp": "上司の機嫌が良さそうなタイミングを見計らって、休暇の申請書を提出した。",
    "exampleTranslation": "I submitted my leave request at a carefully chosen time when my boss seemed to be in a good mood.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0237"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 237
  },
  {
    "category": "vocabulary",
    "front": "申し入れる",
    "back": "to propose; to suggest; to object",
    "exampleJp": "労働組合は経営陣に対し、大幅な賃上げと労働環境の改善を強く申し入れた。",
    "exampleTranslation": "The labor union strongly proposed a significant wage increase and improvement of the working environment to the management.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0238"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 238
  },
  {
    "category": "vocabulary",
    "front": "寄りかかる",
    "back": "to lean against; to rely on",
    "exampleJp": "疲労困憊した彼は、電車の中でドアに寄りかかったまま眠り込んでしまった。",
    "exampleTranslation": "Exhausted, he fell asleep leaning against the door on the train.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0239"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 239
  },
  {
    "category": "vocabulary",
    "front": "押し寄せる",
    "back": "to surge forward; to advance on; to throng",
    "exampleJp": "新製品の発売日には、開店前から店舗に大勢の客が波のように押し寄せた。",
    "exampleTranslation": "On the release date of the new product, a large number of customers surged into the store like a wave even before it opened.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0240"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 240
  },
  {
    "category": "vocabulary",
    "front": "立ち寄る",
    "back": "to drop in; to stop by",
    "exampleJp": "営業先から会社に戻る途中、少し時間があったので本屋に立ち寄った。",
    "exampleTranslation": "On the way back to the office from a client visit, I stopped by a bookstore because I had some time.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0241"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 241
  },
  {
    "category": "vocabulary",
    "front": "乗り切る",
    "back": "to overcome; to survive; to pull through",
    "exampleJp": "社員全員が一丸となって協力し、会社存続の危機をどうにか乗り切った。",
    "exampleTranslation": "All employees united and cooperated, somehow overcoming the crisis of the company's survival.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0242"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 242
  },
  {
    "category": "vocabulary",
    "front": "乗り越える",
    "back": "to overcome; to climb over; to surmount",
    "exampleJp": "人生には幾多の困難があるが、それを乗り越えることで人は強く成長する。",
    "exampleTranslation": "There are many difficulties in life, but by overcoming them, people grow stronger.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0243"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 243
  },
  {
    "category": "vocabulary",
    "front": "行き詰まる",
    "back": "to reach a dead end; to come to a standstill",
    "exampleJp": "プロジェクトの開発が行き詰まり、外部の専門家に意見を求めることになった。",
    "exampleTranslation": "The project's development reached a standstill, and we ended up seeking opinions from external experts.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0244"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 244
  },
  {
    "category": "vocabulary",
    "front": "受け止める",
    "back": "to catch; to accept; to take (to heart)",
    "exampleJp": "市民からの厳しい批判を真摯に受け止め、市政の改善に努めなければならない。",
    "exampleTranslation": "We must sincerely accept the harsh criticism from the citizens and strive to improve the city administration.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0245"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 245
  },
  {
    "category": "vocabulary",
    "front": "受け入れる",
    "back": "to accept; to receive; to agree to",
    "exampleJp": "異なる文化や価値観を持つ人々を互いに受け入れることが、真の国際化だ。",
    "exampleTranslation": "Accepting people with different cultures and values is true internationalization.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0246"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 246
  },
  {
    "category": "vocabulary",
    "front": "追い掛ける",
    "back": "to chase; to pursue; to track down",
    "exampleJp": "彼は子供の頃からの夢であった宇宙飛行士になるという目標を追い掛けている。",
    "exampleTranslation": "He is pursuing his childhood dream and goal of becoming an astronaut.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0247"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 247
  },
  {
    "category": "vocabulary",
    "front": "追い越す",
    "back": "to pass; to overtake",
    "exampleJp": "日本経済の規模は、数年後には隣国に追い越されると予測する専門家もいる。",
    "exampleTranslation": "Some experts predict that the scale of the Japanese economy will be overtaken by its neighbor in a few years.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0248"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 248
  },
  {
    "category": "vocabulary",
    "front": "追い付く",
    "back": "to catch up with; to draw level",
    "exampleJp": "技術革新のスピードが速すぎて、法整備がそれに追い付いていないのが現状だ。",
    "exampleTranslation": "The current situation is that the speed of technological innovation is so fast that legal frameworks cannot catch up with it.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0249"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 249
  },
  {
    "category": "vocabulary",
    "front": "追いやる",
    "back": "to drive away; to relegate; to force into",
    "exampleJp": "過度な競争主義は、弱者を社会の隅へと追いやってしまう危険性をはらんでいる。",
    "exampleTranslation": "Excessive competitive principles carry the risk of driving the vulnerable to the margins of society.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0250"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 250
  },
  {
    "category": "vocabulary",
    "front": "引き受ける",
    "back": "to undertake; to take charge of; to assume",
    "exampleJp": "誰もやりたがらない厄介な仕事を、彼は文句一つ言わずに快く引き受けた。",
    "exampleTranslation": "He willingly undertook the troublesome task that no one wanted to do without a single complaint.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0251"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 251
  },
  {
    "category": "vocabulary",
    "front": "引き止める",
    "back": "to detain; to hold back; to stop",
    "exampleJp": "辞意を表明した優秀な部下を、上司は必死になって引き止めようと説得した。",
    "exampleTranslation": "The boss desperately tried to persuade and hold back the outstanding subordinate who had expressed an intention to resign.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0252"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 252
  },
  {
    "category": "vocabulary",
    "front": "割り当てる",
    "back": "to assign; to allot; to allocate",
    "exampleJp": "予算が限られているため、各部門に適切に資金を割り当てることが課題となる。",
    "exampleTranslation": "Because the budget is limited, appropriately allocating funds to each department is a challenge.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0253"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 253
  },
  {
    "category": "vocabulary",
    "front": "思い浮かべる",
    "back": "to recall; to be reminded of; to conjure up",
    "exampleJp": "その懐かしいメロディーを聞くと、いつも故郷の美しい風景を思い浮かべる。",
    "exampleTranslation": "Whenever I hear that nostalgic melody, it always conjures up the beautiful scenery of my hometown.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0254"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 254
  },
  {
    "category": "vocabulary",
    "front": "飲み込む",
    "back": "to swallow; to understand; to digest",
    "exampleJp": "新しいシステムの複雑な操作手順を完全に飲み込むには、少し時間がかかった。",
    "exampleTranslation": "It took some time to completely grasp and digest the complex operating procedures of the new system.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0255"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 255
  },
  {
    "category": "vocabulary",
    "front": "踏み切る",
    "back": "to take off; to take the plunge; to embark on",
    "exampleJp": "熟慮を重ねた結果、同社はついに海外市場への本格的な進出に踏み切った。",
    "exampleTranslation": "After much deliberation, the company finally took the plunge into full-scale expansion into overseas markets.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0256"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 256
  },
  {
    "category": "vocabulary",
    "front": "案の定",
    "back": "just as one thought; as expected; sure enough",
    "exampleJp": "彼が無謀な計画を立てたときから失敗を危惧していたが、案の定うまくいかなかった。",
    "exampleTranslation": "I had feared failure since he made that reckless plan, and sure enough, it did not go well.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0257"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 257
  },
  {
    "category": "vocabulary",
    "front": "いかにも",
    "back": "truly; indeed; typical of",
    "exampleJp": "その古びた旅館は、いかにも日本の伝統を感じさせる落ち着いた佇まいだった。",
    "exampleTranslation": "That old inn had a calm appearance that truly evoked a sense of Japanese tradition.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0258"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 258
  },
  {
    "category": "vocabulary",
    "front": "かねて",
    "back": "previously; for some time",
    "exampleJp": "かねてから懸案となっていた税制改革について、ようやく議論が始まった。",
    "exampleTranslation": "Discussions have finally begun on the tax reform that has been a pending issue for some time.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0259"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 259
  },
  {
    "category": "vocabulary",
    "front": "かろうじて",
    "back": "barely; narrowly; by the skin of one's teeth",
    "exampleJp": "最終列車に乗り遅れそうになったが、走ってかろうじて間に合った。",
    "exampleTranslation": "I almost missed the last train, but I ran and barely made it in time.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0260"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 260
  },
  {
    "category": "vocabulary",
    "front": "さぞ",
    "back": "I am sure; certainly; no doubt",
    "exampleJp": "異国の地で一人暮らしを始めるなんて、ご両親はさぞ心配されていることでしょう。",
    "exampleTranslation": "Starting to live alone in a foreign country—your parents must certainly be very worried.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0261"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 261
  },
  {
    "category": "vocabulary",
    "front": "しいて",
    "back": "by force; if I must; if pressed",
    "exampleJp": "この二つの作品はどちらも素晴らしいが、しいて言えば前者のほうが好みだ。",
    "exampleTranslation": "Both of these works are wonderful, but if I had to choose, I prefer the former.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0262"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 262
  },
  {
    "category": "vocabulary",
    "front": "とかく",
    "back": "apt to; tending to; prone to",
    "exampleJp": "現代社会において、人間関係の悩みはとかくストレスの原因になりやすい。",
    "exampleTranslation": "In modern society, worries about human relationships are prone to becoming a cause of stress.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0263"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 263
  },
  {
    "category": "vocabulary",
    "front": "なかんずく",
    "back": "above all; especially; among other things",
    "exampleJp": "彼の数ある業績の中でも、なかんずくこの研究は世界的に高く評価されている。",
    "exampleTranslation": "Among his many achievements, this research, above all, is highly evaluated worldwide.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0264"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 264
  },
  {
    "category": "vocabulary",
    "front": "はなはだ",
    "back": "very; extremely",
    "exampleJp": "お客様には多大なご迷惑をおかけしましたこと、はなはだ遺憾に存じます。",
    "exampleTranslation": "I find it extremely regrettable that we have caused our customers such great inconvenience.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0265"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 265
  },
  {
    "category": "vocabulary",
    "front": "ひいては",
    "back": "and by extension; consequently; in turn",
    "exampleJp": "一人一人の環境への配慮が、ひいては地球全体の自然保護につながっていく。",
    "exampleTranslation": "Consideration for the environment by each individual will, by extension, lead to the conservation of nature for the entire earth.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0266"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 266
  },
  {
    "category": "vocabulary",
    "front": "まんざら",
    "back": "not altogether; not completely (with negative)",
    "exampleJp": "彼の提案は奇抜に聞こえるが、よく考えてみるとまんざら悪くない気もする。",
    "exampleTranslation": "His proposal sounds eccentric, but thinking about it carefully, I feel it's not altogether bad.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0267"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 267
  },
  {
    "category": "vocabulary",
    "front": "もっぱら",
    "back": "wholly; exclusively; entirely",
    "exampleJp": "休日は外出を控え、もっぱら自宅で読書や映画鑑賞をして過ごしている。",
    "exampleTranslation": "On my days off, I refrain from going out and spend my time exclusively at home reading and watching movies.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0268"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 268
  },
  {
    "category": "vocabulary",
    "front": "よほど",
    "back": "very much; greatly; to a large extent",
    "exampleJp": "彼が自分から謝るなんて、よほど自分の非を深く反省したのだろう。",
    "exampleTranslation": "For him to apologize on his own, he must have reflected on his faults to a very great extent.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0269"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 269
  },
  {
    "category": "vocabulary",
    "front": "おのずと",
    "back": "naturally; by itself; automatically",
    "exampleJp": "誠実に仕事に向き合っていれば、おのずと周囲からの信頼は得られるものだ。",
    "exampleTranslation": "If you approach your work sincerely, you will naturally gain the trust of those around you.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0270"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 270
  },
  {
    "category": "vocabulary",
    "front": "かつて",
    "back": "once; formerly; in the past",
    "exampleJp": "この静かな田舎町は、かつては金山として非常に栄えた歴史を持っている。",
    "exampleTranslation": "This quiet country town has a history of having once been highly prosperous as a gold mine.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0271"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 271
  },
  {
    "category": "vocabulary",
    "front": "ごく",
    "back": "quite; very; extremely",
    "exampleJp": "これはごく一部の専門家だけが知っている、非常に高度で複雑な技術である。",
    "exampleTranslation": "This is an extremely advanced and complex technology known only to a very small number of experts.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0272"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 272
  },
  {
    "category": "vocabulary",
    "front": "ことごとく",
    "back": "altogether; entirely; one and all",
    "exampleJp": "彼が提案した斬新なアイデアは、保守的な上司によってことごとく却下された。",
    "exampleTranslation": "The innovative ideas he proposed were altogether rejected by his conservative boss.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0273"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 273
  },
  {
    "category": "vocabulary",
    "front": "すかさず",
    "back": "without a moment's delay; immediately",
    "exampleJp": "相手の些細な言葉尻を捉え、彼はすかさず鋭い反論を展開した。",
    "exampleTranslation": "Catching a slight slip of the opponent's tongue, he immediately launched a sharp counterargument.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0274"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 274
  },
  {
    "category": "vocabulary",
    "front": "ただちに",
    "back": "at once; immediately; directly",
    "exampleJp": "システムに重大な障害が発生したため、ただちに復旧作業に取りかかった。",
    "exampleTranslation": "Because a major failure occurred in the system, we immediately set about the restoration work.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0275"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 275
  },
  {
    "category": "vocabulary",
    "front": "たちまち",
    "back": "in an instant; suddenly; in a flash",
    "exampleJp": "新しいアイドルのデビュー曲は、たちまち若者たちの間で大ヒットとなった。",
    "exampleTranslation": "The new idol's debut song became a huge hit among young people in an instant.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0276"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 276
  },
  {
    "category": "vocabulary",
    "front": "つくづく",
    "back": "deeply; keenly; severely",
    "exampleJp": "病気になって初めて、健康であることのありがたさをつくづく思い知らされた。",
    "exampleTranslation": "It wasn't until I got sick that I was deeply made to realize the blessing of being healthy.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0277"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 277
  },
  {
    "category": "vocabulary",
    "front": "てっきり",
    "back": "surely; certainly; without a doubt",
    "exampleJp": "てっきり彼が責任者だと思い込んでいたが、実はただのアシスタントだった。",
    "exampleTranslation": "I had completely assumed that he was the person in charge, but in reality, he was just an assistant.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0278"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 278
  },
  {
    "category": "vocabulary",
    "front": "とうてい",
    "back": "cannot possibly; absolutely not (with negative)",
    "exampleJp": "これほど膨大な作業を一人で明日までに終わらせるなど、とうてい無理な話だ。",
    "exampleTranslation": "It is absolutely impossible to finish such a massive amount of work by myself by tomorrow.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0279"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 279
  },
  {
    "category": "vocabulary",
    "front": "とっさに",
    "back": "at once; on the spur of the moment; instantly",
    "exampleJp": "目の前に子供が飛び出してきたので、とっさに車の急ブレーキを踏んだ。",
    "exampleTranslation": "Because a child darted out in front of me, I instinctively hit the car's brakes on the spur of the moment.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0280"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 280
  },
  {
    "category": "vocabulary",
    "front": "にわかに",
    "back": "suddenly; abruptly; unexpectedly",
    "exampleJp": "空がにわかに暗くなり、大粒の雨が激しく降り始めたので慌てて雨宿りした。",
    "exampleTranslation": "The sky suddenly darkened and large drops of rain began to fall heavily, so I hurried to take shelter.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0281"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 281
  },
  {
    "category": "vocabulary",
    "front": "ひたすら",
    "back": "earnestly; intently; single-mindedly",
    "exampleJp": "彼は他人の評価を気にすることなく、ひたすら自分の信じる芸術を追求し続けた。",
    "exampleTranslation": "He continued to single-mindedly pursue the art he believed in, without worrying about the evaluation of others.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0282"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 282
  },
  {
    "category": "vocabulary",
    "front": "ふんだんに",
    "back": "abundantly; plentifully; amply",
    "exampleJp": "地元の新鮮な野菜をふんだんに使った料理が、このレストランの最大の売りだ。",
    "exampleTranslation": "Dishes using plenty of fresh local vegetables are this restaurant's biggest selling point.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0283"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 283
  },
  {
    "category": "vocabulary",
    "front": "まして",
    "back": "still more; let alone; to say nothing of",
    "exampleJp": "大人でも解決が難しい問題なのだから、まして子供には理解できないだろう。",
    "exampleTranslation": "Since it is a problem that even adults find difficult to solve, let alone children won't be able to understand it.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0284"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 284
  },
  {
    "category": "vocabulary",
    "front": "むやみに",
    "back": "unreasonably; excessively; recklessly",
    "exampleJp": "正確な情報もないまま、むやみに不安を煽るような発言は控えるべきだ。",
    "exampleTranslation": "Without accurate information, you should refrain from statements that recklessly incite anxiety.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0285"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 285
  },
  {
    "category": "vocabulary",
    "front": "もってのほか",
    "back": "absurd; outrageous; out of the question",
    "exampleJp": "人の失敗をあざ笑うなど、教育者としてあるまじき行為であり、もってのほかだ。",
    "exampleTranslation": "Sneering at the mistakes of others is an act unbecoming of an educator and is absolutely outrageous.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0286"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 286
  },
  {
    "category": "vocabulary",
    "front": "余儀なくされる",
    "back": "to be forced to do; to be compelled to",
    "exampleJp": "記録的な不漁により、多くの水産加工業者が工場の閉鎖を余儀なくされた。",
    "exampleTranslation": "Due to the record-breaking poor catch, many seafood processing companies were forced to close their factories.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0287"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 287
  },
  {
    "category": "vocabulary",
    "front": "拍車をかける",
    "back": "to spur on; to expedite; to accelerate",
    "exampleJp": "近年の著しい技術革新が、グローバル化の進展にさらに拍車をかけている。",
    "exampleTranslation": "The remarkable technological innovations of recent years are further accelerating the progress of globalization.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0288"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 288
  },
  {
    "category": "vocabulary",
    "front": "肩を並べる",
    "back": "to be on a par with; to stand shoulder to shoulder",
    "exampleJp": "長年の努力の末、我が社の技術力はついに世界トップ企業と肩を並べるまでになった。",
    "exampleTranslation": "After years of effort, our company's technological capabilities have finally reached the point of being on par with the world's top companies.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0289"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 289
  },
  {
    "category": "vocabulary",
    "front": "軌道に乗る",
    "back": "to get on track; to be well under way",
    "exampleJp": "創業当初は資金繰りに苦労したが、三年目にしてようやく事業が軌道に乗ってきた。",
    "exampleTranslation": "We struggled with cash flow at the time of founding, but in our third year, the business is finally getting on track.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0290"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 290
  },
  {
    "category": "vocabulary",
    "front": "念を押す",
    "back": "to make sure; to emphasize; to remind",
    "exampleJp": "明日の重要な会議には絶対に遅れないようにと、上司から何度も念を押された。",
    "exampleTranslation": "My boss reminded me multiple times to make absolutely sure not to be late for tomorrow's important meeting.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0291"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 291
  },
  {
    "category": "vocabulary",
    "front": "足を引っ張る",
    "back": "to hold someone back; to stand in the way",
    "exampleJp": "チーム内で意見の対立が起こり、それが結果的に全体の進捗の足を引っ張る形となった。",
    "exampleTranslation": "A conflict of opinions occurred within the team, which ultimately ended up holding back the overall progress.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0292"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 292
  },
  {
    "category": "vocabulary",
    "front": "息を呑む",
    "back": "to catch one's breath; to be breathtaking; to gasp",
    "exampleJp": "展望台から見渡す夜景があまりにも美しく、私たちは思わず息を呑んだ。",
    "exampleTranslation": "The night view from the observation deck was so beautiful that we instinctively caught our breath.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0293"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 293
  },
  {
    "category": "vocabulary",
    "front": "首を突っ込む",
    "back": "to poke one's nose into; to get involved in",
    "exampleJp": "他人の複雑な家庭の事情に、あまり深く首を突っ込むべきではないと思う。",
    "exampleTranslation": "I don't think you should poke your nose too deeply into other people's complicated family circumstances.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0294"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 294
  },
  {
    "category": "vocabulary",
    "front": "手を焼く",
    "back": "to not know what to do with; to be troubled by",
    "exampleJp": "その新入社員は自己主張が強すぎて協調性がなく、指導担当者はひどく手を焼いている。",
    "exampleTranslation": "The new employee is too assertive and lacks cooperativeness, and the person in charge of training is extremely troubled by him.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0295"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 295
  },
  {
    "category": "vocabulary",
    "front": "腹を割る",
    "back": "to speak frankly; to open one's heart",
    "exampleJp": "お互いに腹を割って率直に話し合うことで、長年の誤解がようやく解けた。",
    "exampleTranslation": "By opening our hearts and speaking frankly with each other, our long-standing misunderstanding was finally resolved.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0296"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 296
  },
  {
    "category": "vocabulary",
    "front": "前提",
    "back": "premise, assumption",
    "exampleJp": "この理論は、すべての市場参加者が等しく情報を持っているという前提に立っている。",
    "exampleTranslation": "This theory rests on the premise that all market participants have equal access to information.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0297"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 297
  },
  {
    "category": "vocabulary",
    "front": "推測",
    "back": "guess, conjecture",
    "exampleJp": "現場に残されたわずかな証拠から、犯人の逃走経路を推測するのは容易ではない。",
    "exampleTranslation": "It is not easy to conjecture the culprit's escape route from the scarce evidence left at the scene.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0298"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 298
  },
  {
    "category": "vocabulary",
    "front": "推察",
    "back": "guess, inference",
    "exampleJp": "彼女の沈黙の裏にある複雑な心情を推察すると、軽々しく声をかけることはできなかった。",
    "exampleTranslation": "Inferring the complex emotions behind her silence, I couldn't bring myself to speak to her casually.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0299"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 299
  },
  {
    "category": "vocabulary",
    "front": "仮説",
    "back": "hypothesis",
    "exampleJp": "その研究チームは、気候変動が古代文明の崩壊を招いたという新たな仮説を立てた。",
    "exampleTranslation": "The research team formulated a new hypothesis that climate change led to the collapse of the ancient civilization.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0300"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 300
  },
  {
    "category": "vocabulary",
    "front": "根拠",
    "back": "basis, foundation",
    "exampleJp": "彼の主張には客観的な根拠が乏しく、委員会で賛同を得ることは難しかった。",
    "exampleTranslation": "His argument lacked objective basis, making it difficult to gain approval at the committee.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0301"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 301
  },
  {
    "category": "vocabulary",
    "front": "証拠",
    "back": "evidence",
    "exampleJp": "企業側の不当な扱いを立証するには、より決定的な証拠を提示する必要がある。",
    "exampleTranslation": "To prove unfair treatment by the company, more conclusive evidence must be presented.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0302"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 302
  },
  {
    "category": "vocabulary",
    "front": "吟味",
    "back": "close examination, scrutiny",
    "exampleJp": "採用された企画案は、予算や実現可能性の観点から慎重に吟味されたものだ。",
    "exampleTranslation": "The adopted proposal was carefully scrutinized in terms of budget and feasibility.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0303"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 303
  },
  {
    "category": "vocabulary",
    "front": "査定",
    "back": "assessment",
    "exampleJp": "人事部による年末の業績査定は、来年度の給与や昇進に直接的な影響を与える。",
    "exampleTranslation": "The year-end performance assessment by the HR department has a direct impact on next year's salary and promotions.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0304"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 304
  },
  {
    "category": "vocabulary",
    "front": "判定",
    "back": "judgment, decision",
    "exampleJp": "レフェリーの判定に対する抗議は一切認められず、試合はそのまま続行された。",
    "exampleTranslation": "No protests against the referee's decision were allowed, and the match continued as it was.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0305"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 305
  },
  {
    "category": "vocabulary",
    "front": "見解",
    "back": "view, opinion",
    "exampleJp": "新興市場の今後の動向について、専門家の間でも見解が大きく分かれている。",
    "exampleTranslation": "Even among experts, views are widely divided regarding the future trends of emerging markets.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0306"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 306
  },
  {
    "category": "vocabulary",
    "front": "異論",
    "back": "objection",
    "exampleJp": "その法案の骨子について異論を挟む者は誰もおらず、全会一致で可決された。",
    "exampleTranslation": "No one raised any objections to the core of the bill, and it was passed unanimously.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0307"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 307
  },
  {
    "category": "vocabulary",
    "front": "反論",
    "back": "refutation",
    "exampleJp": "野党の厳しい追及に対し、首相は具体的なデータを用いて理路整然と反論した。",
    "exampleTranslation": "In response to the opposition party's harsh questioning, the prime minister logically refuted using specific data.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0308"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 308
  },
  {
    "category": "vocabulary",
    "front": "矛盾",
    "back": "contradiction",
    "exampleJp": "経営陣の言う「社員第一」というスローガンと、度重なる人員削減の間には明らかな矛盾がある。",
    "exampleTranslation": "There is an obvious contradiction between the management's slogan of 'employees first' and the repeated downsizing.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0309"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 309
  },
  {
    "category": "vocabulary",
    "front": "葛藤",
    "back": "conflict, struggle",
    "exampleJp": "芸術家としての理想と、商業的な成功を求められる現実との間で激しい葛藤を抱えていた。",
    "exampleTranslation": "He harbored a severe internal conflict between his ideals as an artist and the reality of being expected to achieve commercial success.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0310"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 310
  },
  {
    "category": "vocabulary",
    "front": "ジレンマ",
    "back": "dilemma",
    "exampleJp": "環境保護と経済成長をどう両立させるかというジレンマに、多くの発展途上国が直面している。",
    "exampleTranslation": "Many developing nations face the dilemma of how to balance environmental protection with economic growth.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0311"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 311
  },
  {
    "category": "vocabulary",
    "front": "責務",
    "back": "duty, obligation",
    "exampleJp": "次世代に豊かな自然環境を引き継ぐことは、今を生きる私たちの重大な責務である。",
    "exampleTranslation": "Passing on a rich natural environment to the next generation is a grave duty for us living today.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0312"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 312
  },
  {
    "category": "vocabulary",
    "front": "結末",
    "back": "conclusion, end",
    "exampleJp": "あの壮大な物語がどのような結末を迎えるのか、多くのファンが息をのんで見守っている。",
    "exampleTranslation": "Many fans are holding their breath, waiting to see what conclusion that epic story will reach.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0313"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 313
  },
  {
    "category": "vocabulary",
    "front": "帰結",
    "back": "consequence, conclusion",
    "exampleJp": "長年にわたる放漫財政の必然的な帰結として、その国家は深刻な経済危機に陥った。",
    "exampleTranslation": "As an inevitable consequence of years of loose fiscal policy, the nation fell into a severe economic crisis.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0314"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 314
  },
  {
    "category": "vocabulary",
    "front": "結果論",
    "back": "hindsight-based opinion",
    "exampleJp": "今になって「あの投資は失敗だった」と批判するのは、単なる結果論に過ぎない。",
    "exampleTranslation": "Criticizing that investment as a failure now is nothing more than hindsight.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0315"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 315
  },
  {
    "category": "vocabulary",
    "front": "因果関係",
    "back": "causal relationship",
    "exampleJp": "喫煙と肺がんの発生率との間には、明確な因果関係があると医学的に証明されている。",
    "exampleTranslation": "It has been medically proven that there is a clear causal relationship between smoking and the incidence of lung cancer.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0316"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 316
  },
  {
    "category": "vocabulary",
    "front": "原則",
    "back": "principle",
    "exampleJp": "我が国は、他国の内政には干渉しないという大原則を貫いている。",
    "exampleTranslation": "Our country strictly adheres to the fundamental principle of non-interference in the domestic affairs of other nations.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0317"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 317
  },
  {
    "category": "vocabulary",
    "front": "原理",
    "back": "principle, theory",
    "exampleJp": "アインシュタインの相対性理論は、現代物理学の基礎となる重要な原理を提示した。",
    "exampleTranslation": "Einstein's theory of relativity presented crucial principles that form the foundation of modern physics.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0318"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 318
  },
  {
    "category": "vocabulary",
    "front": "理念",
    "back": "ideal, philosophy",
    "exampleJp": "その企業は「社会への貢献」という創業以来の理念を今も大切に守り続けている。",
    "exampleTranslation": "The company still cherishes its founding philosophy of 'contributing to society.'",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0319"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 319
  },
  {
    "category": "vocabulary",
    "front": "概念",
    "back": "concept",
    "exampleJp": "インターネットの普及により、「国境」という概念そのものが大きく変容しつつある。",
    "exampleTranslation": "With the widespread use of the internet, the very concept of 'borders' is undergoing a major transformation.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0320"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 320
  },
  {
    "category": "vocabulary",
    "front": "観念",
    "back": "idea, notion",
    "exampleJp": "古い固定観念にとらわれていては、この急速に変化する市場で生き残ることはできない。",
    "exampleTranslation": "You cannot survive in this rapidly changing market if you are bound by old, fixed notions.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0321"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 321
  },
  {
    "category": "vocabulary",
    "front": "通念",
    "back": "common idea, generally accepted view",
    "exampleJp": "男性が外で働き、女性が家事をするという社会通念は、もはや過去のものになりつつある。",
    "exampleTranslation": "The generally accepted social view that men work outside while women do housework is already becoming a thing of the past.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0322"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 322
  },
  {
    "category": "vocabulary",
    "front": "倫理",
    "back": "ethics",
    "exampleJp": "生命科学の急速な進歩は、我々に新たな生命倫理の課題を突きつけている。",
    "exampleTranslation": "The rapid advancement of life sciences confronts us with new challenges in bioethics.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0323"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 323
  },
  {
    "category": "vocabulary",
    "front": "道徳",
    "back": "morals",
    "exampleJp": "法的に罰せられないからといって、道徳的に許される行為であるとは限らない。",
    "exampleTranslation": "Just because it is not legally punishable does not necessarily mean it is an act that is morally permissible.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0324"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 324
  },
  {
    "category": "vocabulary",
    "front": "正当性",
    "back": "legitimacy, justification",
    "exampleJp": "その軍事介入の正当性を巡って、国際社会で激しい議論が交わされた。",
    "exampleTranslation": "Fierce debates took place within the international community regarding the legitimacy of the military intervention.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0325"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 325
  },
  {
    "category": "vocabulary",
    "front": "妥当性",
    "back": "validity",
    "exampleJp": "アンケート結果を分析する際は、その調査手法の妥当性をまず検証すべきだ。",
    "exampleTranslation": "When analyzing survey results, one should first verify the validity of the research methodology.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0326"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 326
  },
  {
    "category": "vocabulary",
    "front": "客観性",
    "back": "objectivity",
    "exampleJp": "報道機関には、事実を歪めることなく伝える高い客観性が求められる。",
    "exampleTranslation": "News organizations are required to have a high level of objectivity to report facts without distortion.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0327"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 327
  },
  {
    "category": "vocabulary",
    "front": "抽象的",
    "back": "abstract",
    "exampleJp": "社長の経営方針はあまりにも抽象的で、現場の社員には具体的な行動指針として伝わっていない。",
    "exampleTranslation": "The president's management policy is far too abstract, and does not translate into concrete guidelines for the employees on the ground.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0328"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 328
  },
  {
    "category": "vocabulary",
    "front": "普遍的",
    "back": "universal",
    "exampleJp": "シェイクスピアの作品は、時代や文化を超えて共感を呼ぶ普遍的なテーマを扱っている。",
    "exampleTranslation": "Shakespeare's works deal with universal themes that evoke sympathy across times and cultures.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0329"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 329
  },
  {
    "category": "vocabulary",
    "front": "絶対的",
    "back": "absolute",
    "exampleJp": "かつて君主が握っていた絶対的な権力は、民主主義の台頭とともに失われていった。",
    "exampleTranslation": "The absolute power once held by monarchs was lost with the rise of democracy.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0330"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 330
  },
  {
    "category": "vocabulary",
    "front": "相対的",
    "back": "relative",
    "exampleJp": "幸福感というものは相対的であり、他者との比較によって大きく左右されることが多い。",
    "exampleTranslation": "The feeling of happiness is relative and is often greatly influenced by comparisons with others.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0331"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 331
  },
  {
    "category": "vocabulary",
    "front": "究極的",
    "back": "ultimate",
    "exampleJp": "人類が目指すべき究極的な目標は、世界から貧困と戦争を完全に排除することだ。",
    "exampleTranslation": "The ultimate goal that humanity should strive for is the complete elimination of poverty and war from the world.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0332"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 332
  },
  {
    "category": "vocabulary",
    "front": "本質",
    "back": "essence",
    "exampleJp": "表面的な現象にとらわれず、問題の本質を見極める洞察力が必要だ。",
    "exampleTranslation": "You need the insight to see the essence of the problem, rather than being caught up in superficial phenomena.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0333"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 333
  },
  {
    "category": "vocabulary",
    "front": "実態",
    "back": "actual state",
    "exampleJp": "政府が発表した経済指標と、我々の日常生活の厳しい実態との間には大きな乖離がある。",
    "exampleTranslation": "There is a massive discrepancy between the economic indicators released by the government and the harsh actual state of our daily lives.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0334"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 334
  },
  {
    "category": "vocabulary",
    "front": "真相",
    "back": "truth, real situation",
    "exampleJp": "事件の背後に潜む黒幕の存在が明らかになり、ようやく真相が解明されつつある。",
    "exampleTranslation": "With the existence of a mastermind behind the incident revealed, the truth is finally coming to light.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0335"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 335
  },
  {
    "category": "vocabulary",
    "front": "真理",
    "back": "truth",
    "exampleJp": "科学者たちは、宇宙の成り立ちという普遍の真理を求めて長年探究を続けている。",
    "exampleTranslation": "Scientists have been continuing their research for years in search of the universal truth of how the universe was formed.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0336"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 336
  },
  {
    "category": "vocabulary",
    "front": "真偽",
    "back": "true or false",
    "exampleJp": "インターネット上に氾濫する情報の中から、真偽を正確に見極めるのは容易ではない。",
    "exampleTranslation": "It is not easy to accurately determine the truth or falsehood of the information flooding the internet.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0337"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 337
  },
  {
    "category": "vocabulary",
    "front": "虚偽",
    "back": "falsehood",
    "exampleJp": "彼は経歴に虚偽の記載をして就職したことが発覚し、即座に解雇された。",
    "exampleTranslation": "He was immediately dismissed after it was discovered that he had made false statements about his background to get the job.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0338"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 338
  },
  {
    "category": "vocabulary",
    "front": "偽造",
    "back": "forgery",
    "exampleJp": "巧妙に偽造されたパスポートを使った密入国事件が、最近空港で相次いでいる。",
    "exampleTranslation": "Incidents of illegal entry using skillfully forged passports have been occurring one after another at the airport recently.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0339"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 339
  },
  {
    "category": "vocabulary",
    "front": "錯覚",
    "back": "illusion",
    "exampleJp": "目の前にある水たまりは、砂漠の熱気が生み出した単なる視覚の錯覚だった。",
    "exampleTranslation": "The puddle in front of me was merely an optical illusion created by the heat of the desert.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0340"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 340
  },
  {
    "category": "vocabulary",
    "front": "幻想",
    "back": "illusion, fantasy",
    "exampleJp": "誰もが平等に豊かになれるという資本主義の幻想は、格差の拡大によって打ち砕かれた。",
    "exampleTranslation": "The illusion of capitalism that everyone could become equally wealthy was shattered by the widening disparity.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0341"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 341
  },
  {
    "category": "vocabulary",
    "front": "空想",
    "back": "daydream, imagination",
    "exampleJp": "少年は、宇宙船で未知の惑星を冒険するという空想の世界に浸るのが好きだった。",
    "exampleTranslation": "The boy loved immersing himself in a world of daydreaming where he explored unknown planets in a spaceship.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0342"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 342
  },
  {
    "category": "vocabulary",
    "front": "妄想",
    "back": "delusion",
    "exampleJp": "被害妄想が激しくなり、彼は「周囲の人間が自分を陥れようとしている」と思い込むようになった。",
    "exampleTranslation": "His persecution complex worsened, and he began to harbor the delusion that people around him were trying to frame him.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0343"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 343
  },
  {
    "category": "vocabulary",
    "front": "回想",
    "back": "recollection",
    "exampleJp": "老人は、活気に満ちていた若き日のパリでの生活を静かに回想した。",
    "exampleTranslation": "The old man quietly recollected his life in Paris during his vibrant youth.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0344"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 344
  },
  {
    "category": "vocabulary",
    "front": "追憶",
    "back": "reminiscence",
    "exampleJp": "アルバムを開くたびに、亡き友人と過ごした日々の追憶が鮮やかによみがえる。",
    "exampleTranslation": "Every time I open the album, vivid reminiscences of the days I spent with my late friend come back to me.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0345"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 345
  },
  {
    "category": "vocabulary",
    "front": "連想",
    "back": "association (of ideas)",
    "exampleJp": "「桜」という言葉から、多くの日本人は「出会いと別れ」の季節を連想する。",
    "exampleTranslation": "For many Japanese people, sakura evokes the season of meetings and farewells.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0346"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 346
  },
  {
    "category": "vocabulary",
    "front": "着想",
    "back": "conception, idea",
    "exampleJp": "この画期的な新製品の着想は、彼が日常生活の何気ない不便さに気づいたことから生まれた。",
    "exampleTranslation": "The conception for this epoch-making new product arose from his noticing a casual inconvenience in daily life.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0347"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 347
  },
  {
    "category": "vocabulary",
    "front": "発想",
    "back": "idea, conception",
    "exampleJp": "これまでの業界の常識を覆すような、斬新な発想を持つ人材が求められている。",
    "exampleTranslation": "We are looking for personnel with innovative ideas capable of overturning the conventional wisdom of the industry.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0348"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 348
  },
  {
    "category": "vocabulary",
    "front": "構想",
    "back": "plan, plot",
    "exampleJp": "長年温めてきた都市開発の構想が、ついに具体的なプロジェクトとして始動した。",
    "exampleTranslation": "The urban development plan he had been nurturing for years finally launched as a concrete project.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0349"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 349
  },
  {
    "category": "vocabulary",
    "front": "思考",
    "back": "thought",
    "exampleJp": "AIの進化により、人間の思考プロセスそのものが根底から問い直されようとしている。",
    "exampleTranslation": "Due to the evolution of AI, the very thought process of human beings is about to be questioned from the ground up.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0350"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 350
  },
  {
    "category": "vocabulary",
    "front": "考察",
    "back": "consideration, study",
    "exampleJp": "この論文は、中世ヨーロッパにおける宗教と政治の密接な関係について深く考察している。",
    "exampleTranslation": "This paper deeply examines the close relationship between religion and politics in medieval Europe.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0351"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 351
  },
  {
    "category": "vocabulary",
    "front": "洞察",
    "back": "insight",
    "exampleJp": "優れたリーダーには、表面的な事象の背後にある時代の流れを読み解く鋭い洞察力が不可欠だ。",
    "exampleTranslation": "An excellent leader must have the sharp insight to interpret the trends of the times behind superficial events.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0352"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 352
  },
  {
    "category": "vocabulary",
    "front": "直感",
    "back": "intuition",
    "exampleJp": "データ分析の結果も重要だが、長年の経験から培われた経営者の直感が危機を救うこともある。",
    "exampleTranslation": "While the results of data analysis are important, a manager's intuition, cultivated through years of experience, can sometimes save the day.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0353"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 353
  },
  {
    "category": "vocabulary",
    "front": "本能",
    "back": "instinct",
    "exampleJp": "野生動物は、危険を察知すると生き延びるための防衛本能を瞬時に働かせる。",
    "exampleTranslation": "When wild animals sense danger, they instantly activate their defensive instincts to survive.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0354"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 354
  },
  {
    "category": "vocabulary",
    "front": "理性",
    "back": "reason",
    "exampleJp": "怒りに任せて感情的に反論するのではなく、理性を保って冷静に対処することが大人の態度だ。",
    "exampleTranslation": "Rather than emotionally arguing back in anger, maintaining reason and dealing with it calmly is a mature attitude.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0355"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 355
  },
  {
    "category": "vocabulary",
    "front": "知性",
    "back": "intelligence, intellect",
    "exampleJp": "彼の語り口には、豊かな読書経験に裏打ちされた深い知性が感じられる。",
    "exampleTranslation": "In his way of speaking, one can feel a profound intellect backed by rich reading experience.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0356"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 356
  },
  {
    "category": "vocabulary",
    "front": "知能",
    "back": "intelligence",
    "exampleJp": "人工知能が人間の知能を超える「シンギュラリティ」の到来が、近年現実味を帯びて議論されている。",
    "exampleTranslation": "The arrival of 'Singularity,' where artificial intelligence surpasses human intelligence, has been discussed with increasing realism in recent years.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0357"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 357
  },
  {
    "category": "vocabulary",
    "front": "英知",
    "back": "wisdom",
    "exampleJp": "人類の英知を結集すれば、いずれ深刻な環境問題やエネルギー危機も克服できると信じたい。",
    "exampleTranslation": "I want to believe that by bringing together the wisdom of humanity, we can eventually overcome severe environmental issues and energy crises.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0358"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 358
  },
  {
    "category": "vocabulary",
    "front": "見識",
    "back": "discernment, insight",
    "exampleJp": "教育問題に関する彼の優れた見識は、有識者会議の場でも高く評価されている。",
    "exampleTranslation": "His excellent discernment regarding educational issues is highly regarded even at the expert panel meetings.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0359"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 359
  },
  {
    "category": "vocabulary",
    "front": "良識",
    "back": "good sense",
    "exampleJp": "フェイクニュースが蔓延する現代においてこそ、情報を批判的に読み解く市民の良識が問われている。",
    "exampleTranslation": "In an era where fake news is rampant, it is precisely the good sense of citizens to critically decipher information that is being tested.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0360"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 360
  },
  {
    "category": "vocabulary",
    "front": "常軌",
    "back": "normal course",
    "exampleJp": "その独裁者の常軌を逸した弾圧行為に、国際社会から激しい非難の声が上がった。",
    "exampleTranslation": "Fierce condemnation arose from the international community over the dictator's oppressive acts that deviated from the norm.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0361"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 361
  },
  {
    "category": "vocabulary",
    "front": "軌道",
    "back": "orbit, trajectory",
    "exampleJp": "度重なる試行錯誤の末、ようやく新規事業が軌道に乗り、安定した収益を生むようになった。",
    "exampleTranslation": "After repeated trial and error, the new business has finally gotten on track and started generating stable profits.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0362"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 362
  },
  {
    "category": "vocabulary",
    "front": "逸脱",
    "back": "deviation",
    "exampleJp": "社内の規定から大きく逸脱した彼の独断専行は、組織全体の規律を乱す結果となった。",
    "exampleTranslation": "His arbitrary actions, which significantly deviated from company regulations, resulted in disrupting the discipline of the entire organization.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0363"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 363
  },
  {
    "category": "vocabulary",
    "front": "脱線",
    "back": "digression, derailment",
    "exampleJp": "会議の議題とは無関係な話題に脱線してしまい、肝心の結論が出ないまま時間切れになった。",
    "exampleTranslation": "The discussion digressed to topics unrelated to the meeting's agenda, and time ran out before the crucial conclusion could be reached.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0364"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 364
  },
  {
    "category": "vocabulary",
    "front": "論理",
    "back": "logic",
    "exampleJp": "感情論に終始するのではなく、誰が聞いても納得できる客観的な論理を組み立てる必要がある。",
    "exampleTranslation": "Instead of resorting to emotional arguments, we need to construct an objective logic that anyone can accept.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0365"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 365
  },
  {
    "category": "vocabulary",
    "front": "論理的",
    "back": "logical",
    "exampleJp": "複雑なシステムの問題箇所を特定するには、論理的なアプローチで一つずつ可能性を潰していくしかない。",
    "exampleTranslation": "To pinpoint the problem areas in a complex system, the only way is to eliminate possibilities one by one using a logical approach.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0366"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 366
  },
  {
    "category": "vocabulary",
    "front": "論拠",
    "back": "grounds, argument",
    "exampleJp": "著者は膨大な歴史的資料を提示し、自らの新説を補強するための確固たる論拠とした。",
    "exampleTranslation": "The author presented a vast amount of historical documents as firm grounds to reinforce his new theory.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0367"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 367
  },
  {
    "category": "vocabulary",
    "front": "論点",
    "back": "point at issue",
    "exampleJp": "議論が白熱するあまり、本来の論点から徐々にずれていっていることに誰も気づかなかった。",
    "exampleTranslation": "The debate became so heated that no one noticed they were gradually drifting away from the original point at issue.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0368"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 368
  },
  {
    "category": "vocabulary",
    "front": "争点",
    "back": "point of dispute",
    "exampleJp": "次期市長選挙における最大の争点は、郊外の巨大なショッピングモール建設計画の賛否となるだろう。",
    "exampleTranslation": "The biggest point of dispute in the next mayoral election will be the pros and cons of the massive suburban shopping mall construction plan.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0369"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 369
  },
  {
    "category": "vocabulary",
    "front": "焦点",
    "back": "focus",
    "exampleJp": "その未解決事件の捜査は、被害者の交友関係の洗い出しに焦点が当てられている。",
    "exampleTranslation": "The investigation into the unsolved case is focused on scrutinizing the victim's social circle.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0370"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 370
  },
  {
    "category": "vocabulary",
    "front": "核心",
    "back": "core, heart (of the matter)",
    "exampleJp": "ジャーナリストの鋭い質問が、長年隠蔽されてきた政治腐敗の核心を突いた。",
    "exampleTranslation": "The journalist's sharp question pierced the core of the political corruption that had been covered up for years.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0371"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 371
  },
  {
    "category": "vocabulary",
    "front": "本筋",
    "back": "main thread",
    "exampleJp": "どうでもいい些末な話は後回しにして、まずは計画の本筋から話し合いましょう。",
    "exampleTranslation": "Let's put aside the trivial details for later and start by discussing the main thread of the plan.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0372"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 372
  },
  {
    "category": "vocabulary",
    "front": "枝葉",
    "back": "minor details",
    "exampleJp": "あの解説書は枝葉末節にこだわりすぎて、かえって初心者が理解しづらい構成になっている。",
    "exampleTranslation": "That manual is so obsessed with minor details that it ends up being difficult for beginners to understand.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0373"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 373
  },
  {
    "category": "vocabulary",
    "front": "経緯",
    "back": "details, how things came about",
    "exampleJp": "交渉が決裂するに至った詳しい経緯について、担当者から委員会に報告が行われた。",
    "exampleTranslation": "The person in charge reported to the committee on the detailed circumstances of how the negotiations broke down.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0374"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 374
  },
  {
    "category": "vocabulary",
    "front": "顛末",
    "back": "full particulars",
    "exampleJp": "その汚職事件が発覚し、関係者が一斉に逮捕されるまでの顛末は、後にドキュメンタリー番組で放送された。",
    "exampleTranslation": "The full particulars, from the discovery of the corruption scandal to the mass arrest of those involved, were later broadcast in a documentary program.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0375"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 375
  },
  {
    "category": "vocabulary",
    "front": "始末",
    "back": "management, dealing with",
    "exampleJp": "事業に失敗して莫大な借金を抱え、ついには家まで手放す始末となった。",
    "exampleTranslation": "He failed in his business, incurred massive debts, and ended up having to give up even his house.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0376"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 376
  },
  {
    "category": "vocabulary",
    "front": "結実",
    "back": "bearing fruit",
    "exampleJp": "長年にわたる地道な基礎研究が、新薬の開発という画期的な形でついに結実した。",
    "exampleTranslation": "Years of steady basic research finally bore fruit in the epoch-making form of new drug development.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0377"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 377
  },
  {
    "category": "vocabulary",
    "front": "成就",
    "back": "fulfillment",
    "exampleJp": "困難を極めた大事業が成就した瞬間、プロジェクトチームのメンバーは抱き合って喜んだ。",
    "exampleTranslation": "The moment the extremely difficult major enterprise was fulfilled, the project team members hugged each other in joy.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0378"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 378
  },
  {
    "category": "vocabulary",
    "front": "未遂",
    "back": "attempt",
    "exampleJp": "大統領暗殺計画は事前に情報が漏れ、幸いにも未遂に終わった。",
    "exampleTranslation": "The presidential assassination plot was leaked in advance and fortunately ended as a mere attempt.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0379"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 379
  },
  {
    "category": "vocabulary",
    "front": "頓挫",
    "back": "setback, deadlock",
    "exampleJp": "資金繰りの悪化により、鳴り物入りで始まった巨大リゾート開発計画はあえなく頓挫した。",
    "exampleTranslation": "Due to cash flow problems, the highly publicized massive resort development plan suffered an abrupt setback.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0380"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 380
  },
  {
    "category": "vocabulary",
    "front": "瓦解",
    "back": "collapse, ruin",
    "exampleJp": "カリスマ的な指導者の突然の死によって、強固だった反体制組織は一気に瓦解した。",
    "exampleTranslation": "With the sudden death of its charismatic leader, the robust anti-establishment organization collapsed at once.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0381"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 381
  },
  {
    "category": "vocabulary",
    "front": "没落",
    "back": "ruin, downfall",
    "exampleJp": "かつて栄華を極めた名門貴族も、時代の波に抗えず、徐々に没落の道をたどっていった。",
    "exampleTranslation": "Even the once prosperous distinguished aristocratic family could not resist the waves of the times and gradually went down the path of ruin.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0382"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 382
  },
  {
    "category": "vocabulary",
    "front": "衰退",
    "back": "decline",
    "exampleJp": "少子高齢化と若者の都市への流出により、地方の伝統産業は急速に衰退しつつある。",
    "exampleTranslation": "Due to the declining birthrate, aging population, and young people migrating to cities, regional traditional industries are rapidly declining.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0383"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 383
  },
  {
    "category": "vocabulary",
    "front": "隆盛",
    "back": "prosperity",
    "exampleJp": "平安時代の貴族文化は、宮廷を中心に華やかな隆盛を極めた。",
    "exampleTranslation": "The aristocratic culture of the Heian period reached brilliant prosperity centered around the royal court.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0384"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 384
  },
  {
    "category": "vocabulary",
    "front": "全盛期",
    "back": "golden age",
    "exampleJp": "あのバンドの全盛期には、世界中のスタジアムが熱狂的なファンで埋め尽くされていた。",
    "exampleTranslation": "During that band's golden age, stadiums around the world were packed with enthusiastic fans.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0385"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 385
  },
  {
    "category": "vocabulary",
    "front": "過渡期",
    "back": "transition period",
    "exampleJp": "現在のアナログからデジタルへの完全移行は、我々が歴史的な過渡期にいることを示している。",
    "exampleTranslation": "The current complete transition from analog to digital shows that we are in a historical transition period.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0386"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 386
  },
  {
    "category": "vocabulary",
    "front": "転換期",
    "back": "turning point",
    "exampleJp": "産業革命は、人類の生産様式と生活水準を根本から変える大きな転換期となった。",
    "exampleTranslation": "The Industrial Revolution was a major turning point that fundamentally changed humanity's modes of production and standards of living.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0387"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 387
  },
  {
    "category": "vocabulary",
    "front": "節目",
    "back": "turning point, milestone",
    "exampleJp": "創立五十周年という大きな節目を迎え、社長は今後のさらなる飛躍を社員に誓った。",
    "exampleTranslation": "Welcoming the major milestone of its 50th anniversary, the president pledged to the employees further leaps forward in the future.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0388"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 388
  },
  {
    "category": "vocabulary",
    "front": "変革",
    "back": "reform",
    "exampleJp": "教育現場に深刻な問題が山積している今、制度の抜本的な変革が強く求められている。",
    "exampleTranslation": "With serious problems piling up in the educational field right now, a drastic reform of the system is strongly demanded.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0389"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 389
  },
  {
    "category": "vocabulary",
    "front": "革新",
    "back": "innovation",
    "exampleJp": "停滞する自社に活気を取り戻すため、若手社員を中心とした技術革新のチームが結成された。",
    "exampleTranslation": "To restore vitality to the stagnating company, a team for technological innovation centered around young employees was formed.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0390"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 390
  },
  {
    "category": "vocabulary",
    "front": "保守",
    "back": "conservative",
    "exampleJp": "新しい価値観を恐れる保守的な組織風土が、企業のグローバル化を阻む要因となっている。",
    "exampleTranslation": "A conservative corporate culture that fears new values is a factor hindering the company's globalization.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0391"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 391
  },
  {
    "category": "vocabulary",
    "front": "退歩",
    "back": "retrogression",
    "exampleJp": "せっかく築き上げた人権擁護の取り組みが、今回の法改正によって大きく退歩してしまう恐れがある。",
    "exampleTranslation": "There is a fear that the human rights protection efforts built up with great pains will significantly retrogress due to this law revision.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0392"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 392
  },
  {
    "category": "vocabulary",
    "front": "停滞",
    "back": "stagnation",
    "exampleJp": "長引く景気の低迷により、設備投資が手控えられ、国内経済は完全に停滞している。",
    "exampleTranslation": "Due to the prolonged economic slump, capital investment is being withheld, and the domestic economy is completely stagnating.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0393"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 393
  },
  {
    "category": "vocabulary",
    "front": "遅滞",
    "back": "delay",
    "exampleJp": "この深刻な事態において、政府の対応にいささかの遅滞も許されるべきではない。",
    "exampleTranslation": "In this serious situation, not even the slightest delay should be permitted in the government's response.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0394"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 394
  },
  {
    "category": "vocabulary",
    "front": "遅延",
    "back": "delay",
    "exampleJp": "大雪の影響で交通機関に大規模な遅延が生じ、何万人もの通勤客が駅で足止めを食った。",
    "exampleTranslation": "Due to the heavy snow, large-scale delays occurred in the transportation system, leaving tens of thousands of commuters stranded at the stations.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0395"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 395
  },
  {
    "category": "vocabulary",
    "front": "猶予",
    "back": "postponement, grace period",
    "exampleJp": "借金の返済期限が迫っていたが、債権者の温情により一ヶ月の猶予を与えられた。",
    "exampleTranslation": "The deadline for repaying the debt was approaching, but thanks to the creditor's compassion, he was granted a one-month grace period.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0396"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 396
  },
  {
    "category": "vocabulary",
    "front": "短縮",
    "back": "shortening",
    "exampleJp": "労働環境の改善を目指し、全社を挙げて残業時間の短縮に取り組んでいる。",
    "exampleTranslation": "Aiming to improve the working environment, the entire company is working together on shortening overtime hours.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0397"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 397
  },
  {
    "category": "vocabulary",
    "front": "圧縮",
    "back": "compression",
    "exampleJp": "予算の無駄を徹底的に洗い出し、開発にかかるコストを前年比で三割圧縮することに成功した。",
    "exampleTranslation": "By thoroughly identifying wasted budget, we succeeded in compressing development costs by 30% compared to the previous year.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0398"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 398
  },
  {
    "category": "vocabulary",
    "front": "拡張",
    "back": "expansion",
    "exampleJp": "将来の旅客需要の増加を見込み、空港のターミナルビルを大幅に拡張する計画が持ち上がっている。",
    "exampleTranslation": "Anticipating an increase in passenger demand in the future, a plan to significantly expand the airport terminal building has been brought up.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0399"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 399
  },
  {
    "category": "vocabulary",
    "front": "膨張",
    "back": "expansion, swelling",
    "exampleJp": "国家予算が年々際限なく膨張し続ける現状に、多くの財政学者が警鐘を鳴らしている。",
    "exampleTranslation": "Many financial experts are sounding the alarm over the current situation where the national budget continues to swell endlessly year after year.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0400"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 400
  },
  {
    "category": "vocabulary",
    "front": "収縮",
    "back": "contraction",
    "exampleJp": "急激な人口減少に伴い、地方都市の経済規模が急速に収縮していくのは避けられない。",
    "exampleTranslation": "With the rapid population decline, it is inevitable that the economic scale of regional cities will contract rapidly.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0401"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 401
  },
  {
    "category": "vocabulary",
    "front": "凝縮",
    "back": "condensation",
    "exampleJp": "彼の最新作は、これまでの長い作家生活で得た深い哲学が、短い物語の中に凝縮されている。",
    "exampleTranslation": "In his latest work, the profound philosophy he gained through his long life as a writer is condensed into a short story.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0402"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 402
  },
  {
    "category": "vocabulary",
    "front": "濃縮",
    "back": "concentration",
    "exampleJp": "その果汁は独自の製法で濃縮されており、少量でも果実本来の豊かな風味が楽しめる。",
    "exampleTranslation": "The fruit juice is concentrated using a unique method, so even a small amount allows you to enjoy the rich original flavor of the fruit.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0403"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 403
  },
  {
    "category": "vocabulary",
    "front": "濃厚",
    "back": "dense, rich, strong possibility",
    "exampleJp": "現場に残された指紋が容疑者のものと一致したため、彼が犯人である疑いが一段と濃厚になった。",
    "exampleTranslation": "Because the fingerprints left at the scene matched those of the suspect, the suspicion that he is the culprit became even stronger.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0404"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 404
  },
  {
    "category": "vocabulary",
    "front": "露骨",
    "back": "frank, blunt",
    "exampleJp": "彼女は自分の企画が却下されたことに対し、周囲が引くほど露骨に不快感を示した。",
    "exampleTranslation": "She showed her displeasure so bluntly over her proposal being rejected that it made people around her step back.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0405"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 405
  },
  {
    "category": "vocabulary",
    "front": "婉曲",
    "back": "euphemistic",
    "exampleJp": "ストレートに断るのも角が立つと思い、「検討させていただきます」と婉曲な表現を使ってその場を濁した。",
    "exampleTranslation": "Thinking that a direct refusal would cause friction, I made the situation ambiguous by using the euphemistic expression, 'We will consider it.'",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0406"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 406
  },
  {
    "category": "vocabulary",
    "front": "暗黙",
    "back": "implicit",
    "exampleJp": "契約書には明記されていないが、両社の間には互いの顧客を奪わないという暗黙の了解が存在する。",
    "exampleTranslation": "Although not clearly written in the contract, there is an implicit understanding between the two companies not to steal each other's clients.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0407"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 407
  },
  {
    "category": "vocabulary",
    "front": "明示",
    "back": "explicit",
    "exampleJp": "利用規約には、サービス解約時の違約金について明示されておらず、トラブルの火種となっている。",
    "exampleTranslation": "The terms of service do not explicitly state the cancellation fee when terminating the service, which has become a source of trouble.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0408"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 408
  },
  {
    "category": "vocabulary",
    "front": "暗示",
    "back": "hint, suggestion",
    "exampleJp": "映画の冒頭で主人公が落とした時計は、後に起こる悲劇的な結末を不吉に暗示していた。",
    "exampleTranslation": "The watch dropped by the protagonist at the beginning of the movie ominously hinted at the tragic conclusion that would follow.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0409"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 409
  },
  {
    "category": "vocabulary",
    "front": "示唆",
    "back": "suggestion, implication",
    "exampleJp": "今回の株価暴落は、実体経済に深刻なダメージが及んでいることを強く示唆している。",
    "exampleTranslation": "The recent stock market crash strongly suggests that the real economy has suffered severe damage.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0410"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 410
  },
  {
    "category": "vocabulary",
    "front": "言及",
    "back": "reference, mention",
    "exampleJp": "市長は定例記者会見で、市内の再開発計画の遅れについて初めて公式に言及した。",
    "exampleTranslation": "At the regular press conference, the mayor officially made reference to the delay in the city's redevelopment plan for the first time.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0411"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 411
  },
  {
    "category": "vocabulary",
    "front": "言外",
    "back": "unexpressed, implied",
    "exampleJp": "「君のやり方で構わない」と言いつつも、上司の口調には言外に非難の意が込められていた。",
    "exampleTranslation": "Although he said 'Your way is fine,' the boss's tone carried an unexpressed sense of criticism.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0412"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 412
  },
  {
    "category": "vocabulary",
    "front": "行間",
    "back": "between the lines",
    "exampleJp": "優れた文学作品を深く味わうには、書かれている文字だけでなく、行間を読む想像力が必要だ。",
    "exampleTranslation": "To deeply appreciate an excellent literary work, you need the imagination to read between the lines, not just the written characters.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0413"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 413
  },
  {
    "category": "vocabulary",
    "front": "文脈",
    "back": "context",
    "exampleJp": "その発言だけを切り取ると批判されがちだが、文脈全体を理解すれば彼の真意が見えてくる。",
    "exampleTranslation": "If you only cut out that remark, it tends to be criticized, but if you understand the entire context, his true intention becomes clear.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0414"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 414
  },
  {
    "category": "vocabulary",
    "front": "背景",
    "back": "background",
    "exampleJp": "この少年犯罪の背景には、家庭環境の複雑さや貧困という根深い社会問題が横たわっている。",
    "exampleTranslation": "Behind this juvenile crime lie deep-rooted social problems such as complex family environments and poverty.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0415"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 415
  },
  {
    "category": "vocabulary",
    "front": "裏付け",
    "back": "backing, evidence",
    "exampleJp": "犯行時刻に彼が遠方にいたというアリバイは、監視カメラの映像という確かな裏付けによって証明された。",
    "exampleTranslation": "His alibi of being far away at the time of the crime was proven by the solid evidence of security camera footage.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0416"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 416
  },
  {
    "category": "vocabulary",
    "front": "裏目",
    "back": "backfire",
    "exampleJp": "良かれと思ってしたアドバイスが完全に裏目に出て、かえって彼女を深く傷つけてしまった。",
    "exampleTranslation": "The advice I gave with good intentions completely backfired and ended up hurting her deeply instead.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0417"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 417
  },
  {
    "category": "vocabulary",
    "front": "逆効果",
    "back": "opposite effect",
    "exampleJp": "子供を厳しく叱りすぎるのは、反発を招くだけで教育上は逆効果になることが多い。",
    "exampleTranslation": "Scolding children too strictly often has the opposite effect educationally, merely inviting rebellion.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0418"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 418
  },
  {
    "category": "vocabulary",
    "front": "副作用",
    "back": "side effect",
    "exampleJp": "この新薬は劇的な効果をもたらす一方で、強い眠気を引き起こすという厄介な副作用がある。",
    "exampleTranslation": "While this new drug brings dramatic effects, it has a troublesome side effect of causing severe drowsiness.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0419"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 419
  },
  {
    "category": "vocabulary",
    "front": "相乗効果",
    "back": "synergy",
    "exampleJp": "デザイン部門と技術部門が協力することで素晴らしい相乗効果が生まれ、革新的な製品が完成した。",
    "exampleTranslation": "By the design and technology departments cooperating, a wonderful synergy was created, completing an innovative product.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0420"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 420
  },
  {
    "category": "vocabulary",
    "front": "連鎖",
    "back": "chain, linkage",
    "exampleJp": "中東の一角で起きた紛争は、原油価格の高騰という形で世界的な経済の負の連鎖を引き起こした。",
    "exampleTranslation": "The conflict that occurred in a corner of the Middle East triggered a negative chain reaction in the global economy in the form of soaring crude oil prices.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0421"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 421
  },
  {
    "category": "vocabulary",
    "front": "波及",
    "back": "spread, ripple effect",
    "exampleJp": "アメリカの金融政策の変更は、新興国の通貨暴落など、多方面に深刻な影響を波及させた。",
    "exampleTranslation": "The change in US monetary policy spread severe effects in multiple directions, such as currency crashes in emerging countries.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0422"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 422
  },
  {
    "category": "vocabulary",
    "front": "余波",
    "back": "aftermath",
    "exampleJp": "大型台風が通り過ぎた後も、交通機関の混乱や物流の停滞といった余波が数日間続いた。",
    "exampleTranslation": "Even after the large typhoon passed, the aftermath, such as disruption of transportation and stagnation of logistics, continued for several days.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0423"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 423
  },
  {
    "category": "vocabulary",
    "front": "名残",
    "back": "remains, traces",
    "exampleJp": "歴史ある城下町を歩くと、石畳の道や古い商家に昔の栄華の名残を感じることができる。",
    "exampleTranslation": "Walking through the historic castle town, you can feel the remains of its past glory in the cobblestone streets and old merchant houses.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0424"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 424
  },
  {
    "category": "vocabulary",
    "front": "痕跡",
    "back": "trace, vestige",
    "exampleJp": "事件現場には争ったような痕跡が全くなく、警察は計画的な犯行の線で捜査を進めている。",
    "exampleTranslation": "There were no traces of a struggle at the crime scene, and the police are investigating along the lines of a premeditated crime.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0425"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 425
  },
  {
    "category": "vocabulary",
    "front": "残骸",
    "back": "ruins, wreckage",
    "exampleJp": "深海を探査していた潜水艦が、一世紀以上前に沈没した豪華客船の無惨な残骸を発見した。",
    "exampleTranslation": "The submarine exploring the deep sea discovered the pitiful wreckage of a luxury liner that sank over a century ago.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0426"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 426
  },
  {
    "category": "vocabulary",
    "front": "破片",
    "back": "fragment",
    "exampleJp": "事故の衝撃でフロントガラスが粉々に砕け散り、その鋭い破片が道路の広範囲に散乱していた。",
    "exampleTranslation": "The impact of the accident shattered the windshield, and its sharp fragments were scattered over a wide area of the road.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0427"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 427
  },
  {
    "category": "vocabulary",
    "front": "断片",
    "back": "fragment",
    "exampleJp": "古代遺跡から出土した土器の断片をつなぎ合わせることで、当時の生活様式が見えてくる。",
    "exampleTranslation": "By piecing together the fragments of earthenware excavated from ancient ruins, the lifestyle of that time becomes visible.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0428"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 428
  },
  {
    "category": "vocabulary",
    "front": "一端",
    "back": "one end, a part",
    "exampleJp": "彼が語った苦労話は、過酷な難民キャンプで起きている悲惨な現実のほんの一端に過ぎない。",
    "exampleTranslation": "The story of hardship he told is merely a small part of the tragic reality occurring in the harsh refugee camps.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0429"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 429
  },
  {
    "category": "vocabulary",
    "front": "一部始終",
    "back": "whole story",
    "exampleJp": "目撃者は、覆面をした男たちが銀行に押し入り現金を奪って逃走するまでの一部始終を警察に語った。",
    "exampleTranslation": "The witness told the police the whole story, from the masked men breaking into the bank and stealing cash to their escape.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0430"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 430
  },
  {
    "category": "vocabulary",
    "front": "全容",
    "back": "full picture",
    "exampleJp": "警察の粘り強い捜査により、巨大な詐欺グループの巧妙な手口とその全容がようやく明らかになった。",
    "exampleTranslation": "Through the police's persistent investigation, the clever tactics and the full picture of the massive fraud ring were finally revealed.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0431"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 431
  },
  {
    "category": "vocabulary",
    "front": "輪郭",
    "back": "outline",
    "exampleJp": "霧が少しずつ晴れていくと、遠くの山々の雄大な輪郭がはっきりと浮かび上がってきた。",
    "exampleTranslation": "As the fog gradually cleared, the majestic outlines of the distant mountains clearly emerged.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0432"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 432
  },
  {
    "category": "vocabulary",
    "front": "大枠",
    "back": "general framework",
    "exampleJp": "まずは細部にこだわる前に、プロジェクト全体の大枠をチーム内で合意しておく必要がある。",
    "exampleTranslation": "Before obsessing over details, we first need to agree on the general framework of the entire project within the team.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0433"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 433
  },
  {
    "category": "vocabulary",
    "front": "骨組み",
    "back": "skeleton, framework",
    "exampleJp": "この建築物は、強固な鉄骨の骨組みによって、巨大地震にも耐えうる構造になっている。",
    "exampleTranslation": "This building is structured to withstand massive earthquakes, thanks to its solid steel framework.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0434"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 434
  },
  {
    "category": "vocabulary",
    "front": "土台",
    "back": "foundation",
    "exampleJp": "子供の頃の豊かな読書体験が、彼の小説家としての確固たる土台を形成したと言えるだろう。",
    "exampleTranslation": "It can be said that his rich reading experiences during childhood formed a solid foundation for him as a novelist.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0435"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 435
  },
  {
    "category": "vocabulary",
    "front": "基盤",
    "back": "base, foundation",
    "exampleJp": "安定した税収は、国家が充実した社会保障制度を維持するための不可欠な財政基盤である。",
    "exampleTranslation": "Stable tax revenue is an indispensable financial base for the state to maintain a fulfilling social security system.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0436"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 436
  },
  {
    "category": "vocabulary",
    "front": "下地",
    "back": "groundwork",
    "exampleJp": "彼が異業種に転職してすぐに成功を収められたのは、前職で培った営業力という下地があったからだ。",
    "exampleTranslation": "The reason he was able to achieve success immediately after changing to a different industry was because of the groundwork of sales skills he cultivated in his previous job.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0437"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 437
  },
  {
    "category": "vocabulary",
    "front": "伏線",
    "back": "foreshadowing",
    "exampleJp": "物語の前半に何気なく散りばめられていた奇妙な出来事が、実は驚愕の結末に向けた見事な伏線だった。",
    "exampleTranslation": "The strange events casually scattered in the first half of the story were actually brilliant foreshadowing for the shocking ending.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0438"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 438
  },
  {
    "category": "vocabulary",
    "front": "布石",
    "back": "strategic move",
    "exampleJp": "彼が有力政治家の娘と結婚したのは、将来自分が政界に進出するための計算高い布石に過ぎなかった。",
    "exampleTranslation": "His marriage to the daughter of an influential politician was nothing more than a calculating strategic move for his future entry into the political world.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0439"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 439
  },
  {
    "category": "vocabulary",
    "front": "切り札",
    "back": "trump card",
    "exampleJp": "劣勢に立たされた交渉の終盤で、彼は相手の不正を示す決定的な証拠を切り札として提示した。",
    "exampleTranslation": "In the final stages of the disadvantageous negotiation, he presented conclusive evidence of the opponent's misconduct as a trump card.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0440"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 440
  },
  {
    "category": "vocabulary",
    "front": "奥の手",
    "back": "secret trick",
    "exampleJp": "どのサーバーを再起動してもシステムが復旧しないなら、もはやバックアップから復元するという奥の手を使うしかない。",
    "exampleTranslation": "If restarting any of the servers doesn't restore the system, we have no choice but to use the secret trick of restoring from a backup.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0441"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 441
  },
  {
    "category": "vocabulary",
    "front": "王道",
    "back": "royal road, best way",
    "exampleJp": "語学学習において魔法のような近道はなく、毎日コツコツと単語を覚えるのが結局は王道である。",
    "exampleTranslation": "There is no magical shortcut in language learning; steadily memorizing vocabulary every day is ultimately the best way.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0442"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 442
  },
  {
    "category": "vocabulary",
    "front": "本命",
    "back": "favorite",
    "exampleJp": "今年の文学賞は若手作家の激戦が予想されたが、最終的には大御所作家の歴史大作が本命通りに受賞した。",
    "exampleTranslation": "While a fierce battle among young writers was expected for this year's literary award, the veteran writer's historical epic ultimately won as the favorite.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0443"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 443
  },
  {
    "category": "vocabulary",
    "front": "拮抗",
    "back": "rivalry",
    "exampleJp": "両チームの実力は完全に拮抗しており、試合は延長戦にもつれ込む大熱戦となった。",
    "exampleTranslation": "The abilities of both teams were perfectly matched in rivalry, resulting in a fierce battle that dragged into overtime.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0444"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 444
  },
  {
    "category": "vocabulary",
    "front": "匹敵",
    "back": "rival, equal",
    "exampleJp": "その小国の軍事力は、周囲の大国に匹敵するほどの高度な兵器と訓練された兵士を擁している。",
    "exampleTranslation": "The small country's military strength possesses advanced weapons and trained soldiers that rival those of the surrounding major powers.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0445"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 445
  },
  {
    "category": "vocabulary",
    "front": "凌駕",
    "back": "surpass",
    "exampleJp": "彼の最新の人工知能アルゴリズムは、これまでのどのモデルをも圧倒的に凌駕する処理速度を叩き出した。",
    "exampleTranslation": "His latest artificial intelligence algorithm achieved processing speeds that overwhelmingly surpass any previous models.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0446"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 446
  },
  {
    "category": "vocabulary",
    "front": "圧倒",
    "back": "overwhelm",
    "exampleJp": "初陣の若き指揮官は、敵の何倍もの大軍を前にしても全く臆することなく、見事な戦術で敵を圧倒した。",
    "exampleTranslation": "The young commander in his first battle, entirely undaunted even when facing an enemy army many times larger, overwhelmed the enemy with splendid tactics.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0447"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 447
  },
  {
    "category": "vocabulary",
    "front": "淘汰",
    "back": "weeding out, selection",
    "exampleJp": "環境の変化に適応できなかった種は、厳しい自然の掟によって容赦なく淘汰されていく。",
    "exampleTranslation": "Species that could not adapt to environmental changes are mercilessly weeded out by the strict laws of nature.",
    "tags": [
      "n1",
      "vocabulary"
    ],
    "sourceIds": [
      "n1-vocab-0448"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 448
  },
  {
    "category": "vocabulary",
    "front": "暴露",
    "back": "exposure, disclosure",
    "exampleJp": "その週刊誌は、人気俳優の過去のスキャンダルを暴露して大きな話題を呼んだ。",
    "exampleTranslation": "The weekly magazine caused a huge sensation by exposing the popular actor's past scandals.",
    "tags": [
      "n1",
      "vocabulary",
      "media",
      "news"
    ],
    "sourceIds": [
      "n1-vocab-0449"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 449
  },
  {
    "category": "vocabulary",
    "front": "隠蔽",
    "back": "concealment, cover-up",
    "exampleJp": "企業によるデータ隠蔽が発覚し、消費者の信頼は大きく失墜した。",
    "exampleTranslation": "The company's data cover-up came to light, resulting in a massive loss of consumer trust.",
    "tags": [
      "n1",
      "vocabulary",
      "media",
      "news"
    ],
    "sourceIds": [
      "n1-vocab-0450"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 450
  },
  {
    "category": "vocabulary",
    "front": "釈明",
    "back": "explanation, vindication",
    "exampleJp": "不適切な発言について、大臣は急遽記者会見を開いて釈明に追われた。",
    "exampleTranslation": "The minister held a hastily arranged press conference to explain and vindicate his inappropriate remarks.",
    "tags": [
      "n1",
      "vocabulary",
      "media",
      "news"
    ],
    "sourceIds": [
      "n1-vocab-0451"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 451
  },
  {
    "category": "vocabulary",
    "front": "中傷",
    "back": "slander, defamation",
    "exampleJp": "インターネット上での根拠のない中傷が、個人の尊厳を深く傷つける社会問題となっている。",
    "exampleTranslation": "Baseless slander on the internet has become a social issue that deeply damages individual dignity.",
    "tags": [
      "n1",
      "vocabulary",
      "media",
      "news"
    ],
    "sourceIds": [
      "n1-vocab-0452"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 452
  },
  {
    "category": "vocabulary",
    "front": "弁明",
    "back": "excuse, explanation",
    "exampleJp": "彼は自身のミスについて長々と弁明したが、上司からの理解を得ることはできなかった。",
    "exampleTranslation": "He offered a lengthy explanation for his mistake, but failed to gain his boss's understanding.",
    "tags": [
      "n1",
      "vocabulary",
      "media",
      "news"
    ],
    "sourceIds": [
      "n1-vocab-0453"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 453
  },
  {
    "category": "vocabulary",
    "front": "漏洩",
    "back": "leakage",
    "exampleJp": "顧客の個人情報が外部に漏洩した件で、セキュリティ体制の抜本的な見直しが求められている。",
    "exampleTranslation": "Due to the leakage of customers' personal information, a fundamental review of the security system is required.",
    "tags": [
      "n1",
      "vocabulary",
      "media",
      "news"
    ],
    "sourceIds": [
      "n1-vocab-0454"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 454
  },
  {
    "category": "vocabulary",
    "front": "沈黙",
    "back": "silence",
    "exampleJp": "不祥事の発覚後、経営陣は数日間にわたって沈黙を守り続けた。",
    "exampleTranslation": "Following the revelation of the scandal, the management maintained their silence for several days.",
    "tags": [
      "n1",
      "vocabulary",
      "media",
      "news"
    ],
    "sourceIds": [
      "n1-vocab-0455"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 455
  },
  {
    "category": "vocabulary",
    "front": "波紋",
    "back": "ripple, repercussions",
    "exampleJp": "有名な映画監督の突然の引退宣言は、業界全体に大きな波紋を広げた。",
    "exampleTranslation": "The famous film director's sudden retirement announcement sent major ripples throughout the industry.",
    "tags": [
      "n1",
      "vocabulary",
      "media",
      "news"
    ],
    "sourceIds": [
      "n1-vocab-0456"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 456
  },
  {
    "category": "vocabulary",
    "front": "報道",
    "back": "reporting, news",
    "exampleJp": "災害発生直後の正確な報道は、住民の迅速な避難行動に直結する。",
    "exampleTranslation": "Accurate news reporting immediately after a disaster directly leads to rapid evacuation by residents.",
    "tags": [
      "n1",
      "vocabulary",
      "media",
      "news"
    ],
    "sourceIds": [
      "n1-vocab-0457"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 457
  },
  {
    "category": "vocabulary",
    "front": "取材",
    "back": "coverage, gathering information",
    "exampleJp": "数ヶ月に及ぶ綿密な取材の末、ついにそのドキュメンタリー番組は完成した。",
    "exampleTranslation": "After months of thorough information gathering, the documentary program was finally completed.",
    "tags": [
      "n1",
      "vocabulary",
      "media",
      "news"
    ],
    "sourceIds": [
      "n1-vocab-0458"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 458
  },
  {
    "category": "vocabulary",
    "front": "匿名",
    "back": "anonymity",
    "exampleJp": "このアンケートは匿名で行われるため、率直な意見を書いていただいて構いません。",
    "exampleTranslation": "Since this survey is conducted anonymously, please feel free to write your frank opinions.",
    "tags": [
      "n1",
      "vocabulary",
      "media",
      "news"
    ],
    "sourceIds": [
      "n1-vocab-0459"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 459
  },
  {
    "category": "vocabulary",
    "front": "批判",
    "back": "criticism",
    "exampleJp": "政府の新たな経済対策に対して、専門家からは効果を疑問視する批判の声が相次いだ。",
    "exampleTranslation": "Experts have successively voiced criticism questioning the effectiveness of the government's new economic measures.",
    "tags": [
      "n1",
      "vocabulary",
      "media",
      "news"
    ],
    "sourceIds": [
      "n1-vocab-0460"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 460
  },
  {
    "category": "vocabulary",
    "front": "議論",
    "back": "argument, debate",
    "exampleJp": "次世代のエネルギー政策に関する議論は、いまだに平行線をたどっている。",
    "exampleTranslation": "The debate regarding next-generation energy policies is still running along parallel lines without reaching a conclusion.",
    "tags": [
      "n1",
      "vocabulary",
      "media",
      "news"
    ],
    "sourceIds": [
      "n1-vocab-0461"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 461
  },
  {
    "category": "vocabulary",
    "front": "主張",
    "back": "assertion, claim",
    "exampleJp": "両国は互いに領有権の主張を譲らず、交渉は完全に暗礁に乗り上げた。",
    "exampleTranslation": "Neither country yielded on their claims of territorial sovereignty, and negotiations hit a complete deadlock.",
    "tags": [
      "n1",
      "vocabulary",
      "media",
      "news"
    ],
    "sourceIds": [
      "n1-vocab-0462"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 462
  },
  {
    "category": "vocabulary",
    "front": "論議",
    "back": "discussion",
    "exampleJp": "その法案は人権侵害の恐れがあるとして、国会で活発な論議が交わされている。",
    "exampleTranslation": "The bill is generating active discussion in the Diet due to concerns that it might infringe on human rights.",
    "tags": [
      "n1",
      "vocabulary",
      "media",
      "news"
    ],
    "sourceIds": [
      "n1-vocab-0463"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 463
  },
  {
    "category": "vocabulary",
    "front": "抗議",
    "back": "protest, objection",
    "exampleJp": "理不尽な労働条件の変更に対し、労働組合は会社側に強く抗議する文書を提出した。",
    "exampleTranslation": "The labor union submitted a document strongly protesting to the company against the unreasonable changes in working conditions.",
    "tags": [
      "n1",
      "vocabulary",
      "media",
      "news"
    ],
    "sourceIds": [
      "n1-vocab-0464"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 464
  },
  {
    "category": "vocabulary",
    "front": "融資",
    "back": "financing, loan",
    "exampleJp": "中小企業向けの特別融資制度が拡充され、多くの経営者が救われた。",
    "exampleTranslation": "The expansion of the special financing system for small and medium enterprises saved many business owners.",
    "tags": [
      "n1",
      "vocabulary",
      "economy",
      "business"
    ],
    "sourceIds": [
      "n1-vocab-0465"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 465
  },
  {
    "category": "vocabulary",
    "front": "負債",
    "back": "debt, liabilities",
    "exampleJp": "長引く不況で多額の負債を抱え、その老舗旅館はついに閉館を余儀なくされた。",
    "exampleTranslation": "Saddled with heavy debts due to the prolonged recession, the historic inn was finally forced to close down.",
    "tags": [
      "n1",
      "vocabulary",
      "economy",
      "business"
    ],
    "sourceIds": [
      "n1-vocab-0466"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 466
  },
  {
    "category": "vocabulary",
    "front": "高騰",
    "back": "sudden price jump, soaring",
    "exampleJp": "異常気象の影響で野菜の価格が高騰し、家計に大きな打撃を与えている。",
    "exampleTranslation": "Vegetable prices are soaring due to abnormal weather, dealing a heavy blow to household budgets.",
    "tags": [
      "n1",
      "vocabulary",
      "economy",
      "business"
    ],
    "sourceIds": [
      "n1-vocab-0467"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 467
  },
  {
    "category": "vocabulary",
    "front": "暴落",
    "back": "sudden drop, crash",
    "exampleJp": "国際的な紛争の勃発により、株式市場では主要銘柄が軒並み暴落した。",
    "exampleTranslation": "Due to the outbreak of international conflict, major stocks crashed across the board in the stock market.",
    "tags": [
      "n1",
      "vocabulary",
      "economy",
      "business"
    ],
    "sourceIds": [
      "n1-vocab-0468"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 468
  },
  {
    "category": "vocabulary",
    "front": "控除",
    "back": "deduction",
    "exampleJp": "年末調整では、生命保険料や医療費などの控除を受けるための書類を提出する必要がある。",
    "exampleTranslation": "During the year-end tax adjustment, it is necessary to submit documents to receive deductions for life insurance premiums and medical expenses.",
    "tags": [
      "n1",
      "vocabulary",
      "economy",
      "business"
    ],
    "sourceIds": [
      "n1-vocab-0469"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 469
  },
  {
    "category": "vocabulary",
    "front": "関税",
    "back": "tariff, customs duty",
    "exampleJp": "両国間の貿易協定が見直され、一部の輸入品に対する関税が撤廃される見通しだ。",
    "exampleTranslation": "The trade agreement between the two countries is being revised, and tariffs on some imported goods are expected to be abolished.",
    "tags": [
      "n1",
      "vocabulary",
      "economy",
      "business"
    ],
    "sourceIds": [
      "n1-vocab-0470"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 470
  },
  {
    "category": "vocabulary",
    "front": "協定",
    "back": "agreement, pact",
    "exampleJp": "環境保護に関する国際協定が締結され、参加国は排出量削減に向けた目標を共有した。",
    "exampleTranslation": "An international agreement on environmental protection was concluded, and participating countries shared targets for reducing emissions.",
    "tags": [
      "n1",
      "vocabulary",
      "economy",
      "business"
    ],
    "sourceIds": [
      "n1-vocab-0471"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 471
  },
  {
    "category": "vocabulary",
    "front": "独占",
    "back": "monopoly",
    "exampleJp": "その企業は革新的な技術によって市場を事実上独占し、圧倒的な優位性を築いた。",
    "exampleTranslation": "Through its innovative technology, the company practically monopolized the market and established an overwhelming advantage.",
    "tags": [
      "n1",
      "vocabulary",
      "economy",
      "business"
    ],
    "sourceIds": [
      "n1-vocab-0472"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 472
  },
  {
    "category": "vocabulary",
    "front": "合併",
    "back": "merger",
    "exampleJp": "業界再編の波に乗り、大手銀行二行が経営統合を目指して合併を発表した。",
    "exampleTranslation": "Riding the wave of industry reorganization, two major banks announced a merger aiming for business integration.",
    "tags": [
      "n1",
      "vocabulary",
      "economy",
      "business"
    ],
    "sourceIds": [
      "n1-vocab-0473"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 473
  },
  {
    "category": "vocabulary",
    "front": "買収",
    "back": "acquisition, buyout",
    "exampleJp": "海外展開を加速するため、わが社は現地の競合企業を友好的に買収した。",
    "exampleTranslation": "To accelerate overseas expansion, our company made a friendly acquisition of a local competitor.",
    "tags": [
      "n1",
      "vocabulary",
      "economy",
      "business"
    ],
    "sourceIds": [
      "n1-vocab-0474"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 474
  },
  {
    "category": "vocabulary",
    "front": "資金",
    "back": "funds, capital",
    "exampleJp": "新たな研究開発プロジェクトを立ち上げるためには、莫大な資金の調達が不可欠だ。",
    "exampleTranslation": "In order to launch the new research and development project, raising massive funds is essential.",
    "tags": [
      "n1",
      "vocabulary",
      "economy",
      "business"
    ],
    "sourceIds": [
      "n1-vocab-0475"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 475
  },
  {
    "category": "vocabulary",
    "front": "譲渡",
    "back": "transfer, assignment",
    "exampleJp": "親会社は採算の取れない事業部門を切り離し、外部の企業に譲渡する決定を下した。",
    "exampleTranslation": "The parent company made the decision to spin off the unprofitable business division and transfer it to an external firm.",
    "tags": [
      "n1",
      "vocabulary",
      "economy",
      "business"
    ],
    "sourceIds": [
      "n1-vocab-0476"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 476
  },
  {
    "category": "vocabulary",
    "front": "採算",
    "back": "profit, commercial viability",
    "exampleJp": "この新規事業は立ち上げに多額のコストがかかるため、当分は採算が取れないだろう。",
    "exampleTranslation": "Since this new business requires significant startup costs, it likely won't be commercially viable for the time being.",
    "tags": [
      "n1",
      "vocabulary",
      "economy",
      "business"
    ],
    "sourceIds": [
      "n1-vocab-0477"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 477
  },
  {
    "category": "vocabulary",
    "front": "業績",
    "back": "business performance",
    "exampleJp": "徹底したコスト削減と新製品のヒットにより、今期の業績は過去最高を記録した。",
    "exampleTranslation": "Thanks to drastic cost reductions and a hit new product, business performance this term reached a record high.",
    "tags": [
      "n1",
      "vocabulary",
      "economy",
      "business"
    ],
    "sourceIds": [
      "n1-vocab-0478"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 478
  },
  {
    "category": "vocabulary",
    "front": "投資",
    "back": "investment",
    "exampleJp": "将来の成長を見据え、企業は人材育成やインフラ整備へ積極的に投資すべきだ。",
    "exampleTranslation": "With an eye on future growth, companies should actively invest in human resource development and infrastructure.",
    "tags": [
      "n1",
      "vocabulary",
      "economy",
      "business"
    ],
    "sourceIds": [
      "n1-vocab-0479"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 479
  },
  {
    "category": "vocabulary",
    "front": "雇用",
    "back": "employment",
    "exampleJp": "AI技術の進歩は新たな雇用を生み出す一方で、既存の職業を奪う懸念もある。",
    "exampleTranslation": "While the advancement of AI technology creates new employment, there are concerns it will also take away existing jobs.",
    "tags": [
      "n1",
      "vocabulary",
      "economy",
      "business"
    ],
    "sourceIds": [
      "n1-vocab-0480"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 480
  },
  {
    "category": "vocabulary",
    "front": "解雇",
    "back": "dismissal",
    "exampleJp": "会社は経営悪化を理由に、一部の従業員に対して不当な解雇を通告した。",
    "exampleTranslation": "Citing deteriorating business conditions, the company gave notice of unfair dismissal to some of its employees.",
    "tags": [
      "n1",
      "vocabulary",
      "economy",
      "business"
    ],
    "sourceIds": [
      "n1-vocab-0481"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 481
  },
  {
    "category": "vocabulary",
    "front": "不況",
    "back": "recession",
    "exampleJp": "世界的な不況の波が押し寄せ、多くの製造業者が生産計画の縮小を余儀なくされた。",
    "exampleTranslation": "The wave of global recession hit hard, forcing many manufacturers to scale back their production plans.",
    "tags": [
      "n1",
      "vocabulary",
      "economy",
      "business"
    ],
    "sourceIds": [
      "n1-vocab-0482"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 482
  },
  {
    "category": "vocabulary",
    "front": "利益",
    "back": "profit",
    "exampleJp": "目先の利益ばかりを追求する経営手法は、長期的には組織の弱体化を招く。",
    "exampleTranslation": "A management approach that only pursues short-term profit will lead to the weakening of the organization in the long run.",
    "tags": [
      "n1",
      "vocabulary",
      "economy",
      "business"
    ],
    "sourceIds": [
      "n1-vocab-0483"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 483
  },
  {
    "category": "vocabulary",
    "front": "赤字",
    "back": "deficit",
    "exampleJp": "公共交通機関の利用者が減少し、地方の鉄道路線の大半が赤字に陥っている。",
    "exampleTranslation": "With the decline in public transport users, the majority of regional railway lines have fallen into a deficit.",
    "tags": [
      "n1",
      "vocabulary",
      "economy",
      "business"
    ],
    "sourceIds": [
      "n1-vocab-0484"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 484
  },
  {
    "category": "vocabulary",
    "front": "経費",
    "back": "expenses, cost",
    "exampleJp": "出張費や接待費などの経費を見直すことで、財務状況はわずかに改善した。",
    "exampleTranslation": "By reviewing expenses such as travel and entertainment costs, the financial situation slightly improved.",
    "tags": [
      "n1",
      "vocabulary",
      "economy",
      "business"
    ],
    "sourceIds": [
      "n1-vocab-0485"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 485
  },
  {
    "category": "vocabulary",
    "front": "需要",
    "back": "demand",
    "exampleJp": "夏季の記録的な猛暑により、エアコンなどの家電製品に対する需要が急増した。",
    "exampleTranslation": "Due to the record-breaking heatwave in summer, demand for home appliances like air conditioners surged.",
    "tags": [
      "n1",
      "vocabulary",
      "economy",
      "business"
    ],
    "sourceIds": [
      "n1-vocab-0486"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 486
  },
  {
    "category": "vocabulary",
    "front": "供給",
    "back": "supply",
    "exampleJp": "半導体の世界的な供給不足が影響し、自動車の生産ラインが一時停止する事態となった。",
    "exampleTranslation": "Affected by the global shortage of semiconductor supply, automobile production lines temporarily ground to a halt.",
    "tags": [
      "n1",
      "vocabulary",
      "economy",
      "business"
    ],
    "sourceIds": [
      "n1-vocab-0487"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 487
  },
  {
    "category": "vocabulary",
    "front": "輸出",
    "back": "export",
    "exampleJp": "円安の影響を背景に、国内の自動車メーカーは北米向けの輸出を大幅に増やした。",
    "exampleTranslation": "Backed by the weak yen, domestic automakers significantly increased their exports to North America.",
    "tags": [
      "n1",
      "vocabulary",
      "economy",
      "business"
    ],
    "sourceIds": [
      "n1-vocab-0488"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 488
  },
  {
    "category": "vocabulary",
    "front": "輸入",
    "back": "import",
    "exampleJp": "エネルギー資源の大半を輸入に頼っている日本にとって、国際価格の変動は死活問題だ。",
    "exampleTranslation": "For Japan, which relies on imports for most of its energy resources, fluctuations in international prices are a matter of life and death.",
    "tags": [
      "n1",
      "vocabulary",
      "economy",
      "business"
    ],
    "sourceIds": [
      "n1-vocab-0489"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 489
  },
  {
    "category": "vocabulary",
    "front": "起業",
    "back": "entrepreneurship, starting a business",
    "exampleJp": "大学卒業後、彼はIT分野で独自のアイデアを形にするために起業の道を選んだ。",
    "exampleTranslation": "After graduating from university, he chose the path of entrepreneurship to give shape to his unique ideas in the IT field.",
    "tags": [
      "n1",
      "vocabulary",
      "economy",
      "business"
    ],
    "sourceIds": [
      "n1-vocab-0490"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 490
  },
  {
    "category": "vocabulary",
    "front": "景気",
    "back": "economic conditions",
    "exampleJp": "各種の経済指標は、国内の景気が緩やかに回復基調にあることを示している。",
    "exampleTranslation": "Various economic indicators suggest that domestic economic conditions are on a gradual recovery trend.",
    "tags": [
      "n1",
      "vocabulary",
      "economy",
      "business"
    ],
    "sourceIds": [
      "n1-vocab-0491"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 491
  },
  {
    "category": "vocabulary",
    "front": "予算",
    "back": "budget",
    "exampleJp": "新年度の予算編成では、社会保障費の増大にどう対応するかが最大の焦点となった。",
    "exampleTranslation": "In compiling the budget for the new fiscal year, the biggest focal point was how to deal with increasing social security costs.",
    "tags": [
      "n1",
      "vocabulary",
      "economy",
      "business"
    ],
    "sourceIds": [
      "n1-vocab-0492"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 492
  },
  {
    "category": "vocabulary",
    "front": "税収",
    "back": "tax revenue",
    "exampleJp": "景気低迷により企業の法人税収が落ち込み、国債の発行額がさらに膨れ上がった。",
    "exampleTranslation": "Corporate tax revenue dropped due to the economic slump, causing the issuance of government bonds to swell further.",
    "tags": [
      "n1",
      "vocabulary",
      "economy",
      "business"
    ],
    "sourceIds": [
      "n1-vocab-0493"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 493
  },
  {
    "category": "vocabulary",
    "front": "汚染",
    "back": "pollution, contamination",
    "exampleJp": "工場から排出された有害物質による土壌汚染が、周辺住民の健康に影を落としている。",
    "exampleTranslation": "Soil pollution caused by toxic substances emitted from the factory is casting a shadow over the health of local residents.",
    "tags": [
      "n1",
      "vocabulary",
      "environment",
      "public-life"
    ],
    "sourceIds": [
      "n1-vocab-0494"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 494
  },
  {
    "category": "vocabulary",
    "front": "温暖化",
    "back": "global warming",
    "exampleJp": "地球温暖化の進行を食い止めるには、化石燃料への依存から脱却する必要がある。",
    "exampleTranslation": "To halt the progress of global warming, it is necessary to break away from our dependence on fossil fuels.",
    "tags": [
      "n1",
      "vocabulary",
      "environment",
      "public-life"
    ],
    "sourceIds": [
      "n1-vocab-0495"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 495
  },
  {
    "category": "vocabulary",
    "front": "廃棄物",
    "back": "waste, garbage",
    "exampleJp": "大量の産業廃棄物が不法に投棄され、美しい自然環境が取り返しのつかないダメージを受けた。",
    "exampleTranslation": "A large amount of industrial waste was illegally dumped, causing irreparable damage to the beautiful natural environment.",
    "tags": [
      "n1",
      "vocabulary",
      "environment",
      "public-life"
    ],
    "sourceIds": [
      "n1-vocab-0496"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 496
  },
  {
    "category": "vocabulary",
    "front": "排出",
    "back": "emission",
    "exampleJp": "自動車の排気ガスによる二酸化炭素の排出を抑えるため、電気自動車の導入が進んでいる。",
    "exampleTranslation": "The introduction of electric vehicles is progressing to suppress carbon dioxide emissions from automobile exhaust gas.",
    "tags": [
      "n1",
      "vocabulary",
      "environment",
      "public-life"
    ],
    "sourceIds": [
      "n1-vocab-0497"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 497
  },
  {
    "category": "vocabulary",
    "front": "削減",
    "back": "reduction",
    "exampleJp": "プラスチックごみの削減を目指し、小売店でのレジ袋有料化が義務付けられた。",
    "exampleTranslation": "With the aim of achieving a reduction in plastic waste, charging for shopping bags at retail stores has become mandatory.",
    "tags": [
      "n1",
      "vocabulary",
      "environment",
      "public-life"
    ],
    "sourceIds": [
      "n1-vocab-0498"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 498
  },
  {
    "category": "vocabulary",
    "front": "生態系",
    "back": "ecosystem",
    "exampleJp": "外来種の繁殖が本来の生態系を乱し、固有種の生存を脅かしている事態は深刻だ。",
    "exampleTranslation": "The proliferation of invasive species is disrupting the native ecosystem and threatening the survival of endemic species, which is a serious situation.",
    "tags": [
      "n1",
      "vocabulary",
      "environment",
      "public-life"
    ],
    "sourceIds": [
      "n1-vocab-0499"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 499
  },
  {
    "category": "vocabulary",
    "front": "絶滅",
    "back": "extinction",
    "exampleJp": "生息地の破壊や密猟により、その珍しい動物は絶滅の危機に瀕している。",
    "exampleTranslation": "Due to habitat destruction and poaching, that rare animal is on the verge of extinction.",
    "tags": [
      "n1",
      "vocabulary",
      "environment",
      "public-life"
    ],
    "sourceIds": [
      "n1-vocab-0500"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 500
  },
  {
    "category": "vocabulary",
    "front": "伐採",
    "back": "deforestation, felling",
    "exampleJp": "無計画な森林伐採は土砂崩れのリスクを高めるだけでなく、生態系にも悪影響を及ぼす。",
    "exampleTranslation": "Unplanned deforestation not only increases the risk of landslides but also has an adverse effect on the ecosystem.",
    "tags": [
      "n1",
      "vocabulary",
      "environment",
      "public-life"
    ],
    "sourceIds": [
      "n1-vocab-0501"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 501
  },
  {
    "category": "vocabulary",
    "front": "再生可能",
    "back": "renewable",
    "exampleJp": "太陽光や風力といった再生可能エネルギーの普及が、これからの環境対策の鍵を握る。",
    "exampleTranslation": "The widespread use of renewable energy such as solar and wind holds the key to future environmental measures.",
    "tags": [
      "n1",
      "vocabulary",
      "environment",
      "public-life"
    ],
    "sourceIds": [
      "n1-vocab-0502"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 502
  },
  {
    "category": "vocabulary",
    "front": "気候変動",
    "back": "climate change",
    "exampleJp": "異常な豪雨や干ばつといった気候変動の脅威は、もはや我々の日常生活に迫っている。",
    "exampleTranslation": "The threat of climate change, such as abnormal heavy rains and droughts, is already looming over our daily lives.",
    "tags": [
      "n1",
      "vocabulary",
      "environment",
      "public-life"
    ],
    "sourceIds": [
      "n1-vocab-0503"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 503
  },
  {
    "category": "vocabulary",
    "front": "放射能",
    "back": "radioactivity",
    "exampleJp": "原子力発電所の事故から何年も経過したが、放射能汚染への不安は完全に拭い去られていない。",
    "exampleTranslation": "Although years have passed since the nuclear power plant accident, anxiety about radioactive contamination has not been completely wiped away.",
    "tags": [
      "n1",
      "vocabulary",
      "environment",
      "public-life"
    ],
    "sourceIds": [
      "n1-vocab-0504"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 504
  },
  {
    "category": "vocabulary",
    "front": "資源",
    "back": "resources",
    "exampleJp": "限りある天然資源を次世代に残すため、私たちは持続可能な消費社会を構築しなければならない。",
    "exampleTranslation": "In order to leave limited natural resources for the next generation, we must build a sustainable consumer society.",
    "tags": [
      "n1",
      "vocabulary",
      "environment",
      "public-life"
    ],
    "sourceIds": [
      "n1-vocab-0505"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 505
  },
  {
    "category": "vocabulary",
    "front": "水質",
    "back": "water quality",
    "exampleJp": "工場排水の規制が強化されたことで、その河川の水質はかつての美しさを取り戻した。",
    "exampleTranslation": "With the strengthening of regulations on factory wastewater, the water quality of that river has regained its former beauty.",
    "tags": [
      "n1",
      "vocabulary",
      "environment",
      "public-life"
    ],
    "sourceIds": [
      "n1-vocab-0506"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 506
  },
  {
    "category": "vocabulary",
    "front": "砂漠化",
    "back": "desertification",
    "exampleJp": "過放牧や気候変動が原因で、アフリカの一部地域では深刻な砂漠化が進行している。",
    "exampleTranslation": "Due to overgrazing and climate change, severe desertification is progressing in parts of Africa.",
    "tags": [
      "n1",
      "vocabulary",
      "environment",
      "public-life"
    ],
    "sourceIds": [
      "n1-vocab-0507"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 507
  },
  {
    "category": "vocabulary",
    "front": "酸性雨",
    "back": "acid rain",
    "exampleJp": "大気汚染物質が雨に溶け込んだ酸性雨によって、歴史的な建造物が溶け出す被害が報告されている。",
    "exampleTranslation": "Damage to historic buildings dissolving due to acid rain, caused by air pollutants mixing with rain, has been reported.",
    "tags": [
      "n1",
      "vocabulary",
      "environment",
      "public-life"
    ],
    "sourceIds": [
      "n1-vocab-0508"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 508
  },
  {
    "category": "vocabulary",
    "front": "保全",
    "back": "preservation, conservation",
    "exampleJp": "豊かな自然環境の保全と地域経済の発展をどう両立させるかが、現在の大きな課題となっている。",
    "exampleTranslation": "How to balance the conservation of a rich natural environment with regional economic development is a major current challenge.",
    "tags": [
      "n1",
      "vocabulary",
      "environment",
      "public-life"
    ],
    "sourceIds": [
      "n1-vocab-0509"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 509
  },
  {
    "category": "vocabulary",
    "front": "浄化",
    "back": "purification, cleaning",
    "exampleJp": "長年の努力が実を結び、汚濁の激しかった湖の水質浄化作戦は一定の成果を収めた。",
    "exampleTranslation": "Years of effort bore fruit, and the water purification operation of the heavily polluted lake achieved certain results.",
    "tags": [
      "n1",
      "vocabulary",
      "environment",
      "public-life"
    ],
    "sourceIds": [
      "n1-vocab-0510"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 510
  },
  {
    "category": "vocabulary",
    "front": "保護",
    "back": "protection",
    "exampleJp": "渡り鳥の飛来地を保護区に指定することで、貴重な野鳥の命が守られることになった。",
    "exampleTranslation": "By designating the migratory birds' stopover site as a protected area, the lives of precious wild birds will be protected.",
    "tags": [
      "n1",
      "vocabulary",
      "environment",
      "public-life"
    ],
    "sourceIds": [
      "n1-vocab-0511"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 511
  },
  {
    "category": "vocabulary",
    "front": "環境破壊",
    "back": "environmental destruction",
    "exampleJp": "大規模なリゾート開発が取り返しのつかない環境破壊を招くとして、地元住民の反対運動が起きている。",
    "exampleTranslation": "Local residents are protesting, arguing that the large-scale resort development will invite irreversible environmental destruction.",
    "tags": [
      "n1",
      "vocabulary",
      "environment",
      "public-life"
    ],
    "sourceIds": [
      "n1-vocab-0512"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 512
  },
  {
    "category": "vocabulary",
    "front": "遺伝子",
    "back": "gene",
    "exampleJp": "近年の研究により、特定の遺伝子が特定の病気の発症に深く関与していることが明らかになった。",
    "exampleTranslation": "Recent research has revealed that certain genes are deeply involved in the onset of specific diseases.",
    "tags": [
      "n1",
      "vocabulary",
      "science",
      "tech"
    ],
    "sourceIds": [
      "n1-vocab-0513"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 513
  },
  {
    "category": "vocabulary",
    "front": "究明",
    "back": "scientific investigation",
    "exampleJp": "原因不明の感染症の発生源を突き止めるため、専門家チームが徹底的な究明に乗り出した。",
    "exampleTranslation": "An expert team embarked on a thorough scientific investigation to track down the source of the mysterious infectious disease.",
    "tags": [
      "n1",
      "vocabulary",
      "science",
      "tech"
    ],
    "sourceIds": [
      "n1-vocab-0514"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 514
  },
  {
    "category": "vocabulary",
    "front": "制御",
    "back": "control",
    "exampleJp": "複雑な機械を正確に制御するためのソフトウェア開発には、高度な数学的知識が要求される。",
    "exampleTranslation": "Developing software for accurately controlling complex machinery requires advanced mathematical knowledge.",
    "tags": [
      "n1",
      "vocabulary",
      "science",
      "tech"
    ],
    "sourceIds": [
      "n1-vocab-0515"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 515
  },
  {
    "category": "vocabulary",
    "front": "分析",
    "back": "analysis",
    "exampleJp": "消費者の購買データを詳細に分析することで、効果的なマーケティング戦略を立てることができる。",
    "exampleTranslation": "By analyzing consumer purchasing data in detail, effective marketing strategies can be formulated.",
    "tags": [
      "n1",
      "vocabulary",
      "science",
      "tech"
    ],
    "sourceIds": [
      "n1-vocab-0516"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 516
  },
  {
    "category": "vocabulary",
    "front": "飛躍",
    "back": "rapid progress, leap",
    "exampleJp": "AI技術の飛躍的な進歩により、人間には不可能と思われていたデータ処理が瞬時に行えるようになった。",
    "exampleTranslation": "Due to the rapid progress in AI technology, data processing that was thought impossible for humans can now be done instantly.",
    "tags": [
      "n1",
      "vocabulary",
      "science",
      "tech"
    ],
    "sourceIds": [
      "n1-vocab-0517"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 517
  },
  {
    "category": "vocabulary",
    "front": "実用化",
    "back": "practical application",
    "exampleJp": "長年の基礎研究が実を結び、ついにその画期的な新薬の実用化の目処が立った。",
    "exampleTranslation": "Years of basic research bore fruit, and there is finally a prospect for the practical application of the epoch-making new drug.",
    "tags": [
      "n1",
      "vocabulary",
      "science",
      "tech"
    ],
    "sourceIds": [
      "n1-vocab-0518"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 518
  },
  {
    "category": "vocabulary",
    "front": "解析",
    "back": "analysis, parsing",
    "exampleJp": "膨大なビッグデータを高速で解析するシステムが、新たなビジネスチャンスを生み出している。",
    "exampleTranslation": "Systems that analyze vast amounts of big data at high speed are creating new business opportunities.",
    "tags": [
      "n1",
      "vocabulary",
      "science",
      "tech"
    ],
    "sourceIds": [
      "n1-vocab-0519"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 519
  },
  {
    "category": "vocabulary",
    "front": "最先端",
    "back": "cutting-edge",
    "exampleJp": "この研究所では、世界の最先端をいく量子コンピューターの基礎技術が開発されている。",
    "exampleTranslation": "This research institute is developing the fundamental technology for quantum computers, leading the cutting edge of the world.",
    "tags": [
      "n1",
      "vocabulary",
      "science",
      "tech"
    ],
    "sourceIds": [
      "n1-vocab-0520"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 520
  },
  {
    "category": "vocabulary",
    "front": "仕組み",
    "back": "mechanism, structure",
    "exampleJp": "なぜこの薬が効くのか、体内での詳細な分子レベルの仕組みは未だ解明されていない。",
    "exampleTranslation": "The detailed mechanism at the molecular level of why this medicine works in the body has not yet been elucidated.",
    "tags": [
      "n1",
      "vocabulary",
      "science",
      "tech"
    ],
    "sourceIds": [
      "n1-vocab-0521"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 521
  },
  {
    "category": "vocabulary",
    "front": "欠陥",
    "back": "defect, flaw",
    "exampleJp": "発売直後の自動車に致命的なシステム欠陥が見つかり、メーカーは大規模なリコールを発表した。",
    "exampleTranslation": "A fatal system defect was found in cars right after launch, prompting the manufacturer to announce a massive recall.",
    "tags": [
      "n1",
      "vocabulary",
      "science",
      "tech"
    ],
    "sourceIds": [
      "n1-vocab-0522"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 522
  },
  {
    "category": "vocabulary",
    "front": "探査",
    "back": "exploration, probe",
    "exampleJp": "火星の地表を詳しく調べるため、新たな無人探査機が地球を飛び立った。",
    "exampleTranslation": "A new unmanned probe lifted off from Earth to explore the surface of Mars in detail.",
    "tags": [
      "n1",
      "vocabulary",
      "science",
      "tech"
    ],
    "sourceIds": [
      "n1-vocab-0523"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 523
  },
  {
    "category": "vocabulary",
    "front": "抽出",
    "back": "extraction",
    "exampleJp": "植物の葉から特定の有効成分だけを効率よく抽出する技術が、ついに確立された。",
    "exampleTranslation": "The technology to efficiently extract only specific active ingredients from plant leaves has finally been established.",
    "tags": [
      "n1",
      "vocabulary",
      "science",
      "tech"
    ],
    "sourceIds": [
      "n1-vocab-0524"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 524
  },
  {
    "category": "vocabulary",
    "front": "匿名性",
    "back": "anonymity",
    "exampleJp": "仮想通貨の取引は高い匿名性を持つ反面、犯罪組織の資金洗浄に悪用されるリスクも孕んでいる。",
    "exampleTranslation": "While cryptocurrency transactions possess high anonymity, they also carry the risk of being abused for money laundering by criminal organizations.",
    "tags": [
      "n1",
      "vocabulary",
      "science",
      "tech"
    ],
    "sourceIds": [
      "n1-vocab-0525"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 525
  },
  {
    "category": "vocabulary",
    "front": "発明",
    "back": "invention",
    "exampleJp": "人類の歴史上、文字の発明ほど文明の発展に大きく貢献したものはないだろう。",
    "exampleTranslation": "In the history of humanity, perhaps nothing has contributed more to the development of civilization than the invention of writing.",
    "tags": [
      "n1",
      "vocabulary",
      "science",
      "tech"
    ],
    "sourceIds": [
      "n1-vocab-0526"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 526
  },
  {
    "category": "vocabulary",
    "front": "仮想現実",
    "back": "virtual reality",
    "exampleJp": "仮想現実の技術を活用することで、医学生は手術のシミュレーションを安全に体験できるようになった。",
    "exampleTranslation": "By utilizing virtual reality technology, medical students can now safely experience surgical simulations.",
    "tags": [
      "n1",
      "vocabulary",
      "science",
      "tech"
    ],
    "sourceIds": [
      "n1-vocab-0527"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 527
  },
  {
    "category": "vocabulary",
    "front": "知的財産",
    "back": "intellectual property",
    "exampleJp": "企業の競争力を維持するためには、自社の知的財産を特許権によって適切に保護することが重要だ。",
    "exampleTranslation": "To maintain corporate competitiveness, it is important to properly protect the company's intellectual property through patent rights.",
    "tags": [
      "n1",
      "vocabulary",
      "science",
      "tech"
    ],
    "sourceIds": [
      "n1-vocab-0528"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 528
  },
  {
    "category": "vocabulary",
    "front": "特許",
    "back": "patent",
    "exampleJp": "その画期的な技術に関して国際的な特許を取得したことで、同社は巨額のライセンス収入を得た。",
    "exampleTranslation": "By acquiring an international patent for that revolutionary technology, the company earned massive licensing revenue.",
    "tags": [
      "n1",
      "vocabulary",
      "science",
      "tech"
    ],
    "sourceIds": [
      "n1-vocab-0529"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 529
  },
  {
    "category": "vocabulary",
    "front": "解読",
    "back": "deciphering",
    "exampleJp": "古代の石版に刻まれた未知の文字の解読作業は、数世代にわたる研究者の努力によって進められた。",
    "exampleTranslation": "The deciphering of unknown characters carved on ancient stone tablets progressed through the efforts of researchers over several generations.",
    "tags": [
      "n1",
      "vocabulary",
      "science",
      "tech"
    ],
    "sourceIds": [
      "n1-vocab-0530"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 530
  },
  {
    "category": "vocabulary",
    "front": "検証",
    "back": "verification",
    "exampleJp": "シミュレーションの結果が正しいかどうかを確かめるため、実際の環境での厳密な検証が求められている。",
    "exampleTranslation": "To confirm whether the simulation results are correct, rigorous verification in an actual environment is required.",
    "tags": [
      "n1",
      "vocabulary",
      "science",
      "tech"
    ],
    "sourceIds": [
      "n1-vocab-0531"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 531
  },
  {
    "category": "vocabulary",
    "front": "稼働",
    "back": "operation, functioning",
    "exampleJp": "老朽化したシステムを新しいサーバーに移行する作業が完了し、本日から本番稼働を開始した。",
    "exampleTranslation": "The process of migrating the aging system to a new server has been completed, and full-scale operation has begun as of today.",
    "tags": [
      "n1",
      "vocabulary",
      "science",
      "tech"
    ],
    "sourceIds": [
      "n1-vocab-0532"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 532
  },
  {
    "category": "vocabulary",
    "front": "精密",
    "back": "precision",
    "exampleJp": "宇宙船の部品には、ごくわずかな誤差も許されない極めて精密な加工技術が要求される。",
    "exampleTranslation": "Spacecraft components require extremely precise processing technology that allows for not even the slightest margin of error.",
    "tags": [
      "n1",
      "vocabulary",
      "science",
      "tech"
    ],
    "sourceIds": [
      "n1-vocab-0533"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 533
  },
  {
    "category": "vocabulary",
    "front": "開発",
    "back": "development",
    "exampleJp": "そのIT企業は、人工知能を活用した全く新しいタイプの音声認識ソフトを開発している。",
    "exampleTranslation": "The IT company is developing a completely new type of voice recognition software utilizing artificial intelligence.",
    "tags": [
      "n1",
      "vocabulary",
      "science",
      "tech"
    ],
    "sourceIds": [
      "n1-vocab-0534"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 534
  },
  {
    "category": "vocabulary",
    "front": "実験",
    "back": "experiment",
    "exampleJp": "理論上の仮説を証明するため、チームは長期間にわたる複雑な物理実験を繰り返した。",
    "exampleTranslation": "To prove their theoretical hypothesis, the team repeatedly conducted complex physical experiments over a long period.",
    "tags": [
      "n1",
      "vocabulary",
      "science",
      "tech"
    ],
    "sourceIds": [
      "n1-vocab-0535"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 535
  },
  {
    "category": "vocabulary",
    "front": "応用",
    "back": "application",
    "exampleJp": "軍事目的で開発された技術が、後に民間企業の製品に広く応用されるケースは珍しくない。",
    "exampleTranslation": "It is not uncommon for technologies developed for military purposes to be widely applied to private enterprise products later on.",
    "tags": [
      "n1",
      "vocabulary",
      "science",
      "tech"
    ],
    "sourceIds": [
      "n1-vocab-0536"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 536
  },
  {
    "category": "vocabulary",
    "front": "少子化",
    "back": "declining birthrate",
    "exampleJp": "少子化の進行により、労働力不足と社会保障費の負担増が国の将来を脅かしている。",
    "exampleTranslation": "The progression of the declining birthrate is threatening the country's future with labor shortages and increased social security burdens.",
    "tags": [
      "n1",
      "vocabulary",
      "demographics"
    ],
    "sourceIds": [
      "n1-vocab-0537"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 537
  },
  {
    "category": "vocabulary",
    "front": "高齢化",
    "back": "aging population",
    "exampleJp": "急速な高齢化が進む中、地域社会における高齢者の見守り支援システムの構築が急務となっている。",
    "exampleTranslation": "With rapid population aging underway, building support systems for watching over the elderly in local communities is an urgent task.",
    "tags": [
      "n1",
      "vocabulary",
      "demographics"
    ],
    "sourceIds": [
      "n1-vocab-0538"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 538
  },
  {
    "category": "vocabulary",
    "front": "寿命",
    "back": "lifespan",
    "exampleJp": "医療技術の飛躍的な進歩により、人間の平均寿命は過去一世紀で劇的に延びた。",
    "exampleTranslation": "Thanks to rapid progress in medical technology, the average human lifespan has extended dramatically over the past century.",
    "tags": [
      "n1",
      "vocabulary",
      "demographics"
    ],
    "sourceIds": [
      "n1-vocab-0539"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 539
  },
  {
    "category": "vocabulary",
    "front": "過疎化",
    "back": "depopulation",
    "exampleJp": "若者の都市部への流出により、地方の山間部では深刻な過疎化が進行し、集落の維持が困難になっている。",
    "exampleTranslation": "Due to the outflow of youth to urban areas, severe depopulation is progressing in rural mountainous regions, making it difficult to maintain settlements.",
    "tags": [
      "n1",
      "vocabulary",
      "demographics"
    ],
    "sourceIds": [
      "n1-vocab-0540"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 540
  },
  {
    "category": "vocabulary",
    "front": "人口動態",
    "back": "vital statistics",
    "exampleJp": "政府は最新の人口動態データを分析し、長期的なインフラ整備の計画を大幅に見直す方針を固めた。",
    "exampleTranslation": "The government analyzed the latest vital statistics and finalized a policy to significantly revise long-term infrastructure development plans.",
    "tags": [
      "n1",
      "vocabulary",
      "demographics"
    ],
    "sourceIds": [
      "n1-vocab-0541"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 541
  },
  {
    "category": "vocabulary",
    "front": "移住",
    "back": "migration",
    "exampleJp": "都会の喧騒を離れ、豊かな自然に囲まれた地方への移住を希望する若者が近年増加している。",
    "exampleTranslation": "The number of young people hoping to leave the hustle and bustle of the city and migrate to rural areas surrounded by abundant nature has been increasing in recent years.",
    "tags": [
      "n1",
      "vocabulary",
      "demographics"
    ],
    "sourceIds": [
      "n1-vocab-0542"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 542
  },
  {
    "category": "vocabulary",
    "front": "帰化",
    "back": "naturalization",
    "exampleJp": "長年日本で働き、生活基盤を築いてきた彼は、ついに日本国籍を取得して帰化した。",
    "exampleTranslation": "Having worked and built a foundation for his life in Japan for many years, he finally acquired Japanese citizenship and naturalized.",
    "tags": [
      "n1",
      "vocabulary",
      "demographics"
    ],
    "sourceIds": [
      "n1-vocab-0543"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 543
  },
  {
    "category": "vocabulary",
    "front": "密度",
    "back": "density",
    "exampleJp": "大都市の過度な人口密度は、通勤ラッシュや住宅環境の悪化といった様々な問題を引き起こしている。",
    "exampleTranslation": "The excessive population density of major cities causes various problems such as commuter rush hours and the deterioration of the housing environment.",
    "tags": [
      "n1",
      "vocabulary",
      "demographics"
    ],
    "sourceIds": [
      "n1-vocab-0544"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 544
  },
  {
    "category": "vocabulary",
    "front": "単身赴任",
    "back": "job transfer away from one's home",
    "exampleJp": "本社からの突然の辞令により、彼は家族を東京に残して大阪へ単身赴任することになった。",
    "exampleTranslation": "Due to a sudden order from headquarters, he ended up transferring to Osaka for work, leaving his family behind in Tokyo.",
    "tags": [
      "n1",
      "vocabulary",
      "demographics"
    ],
    "sourceIds": [
      "n1-vocab-0545"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 545
  },
  {
    "category": "vocabulary",
    "front": "共働き",
    "back": "dual income",
    "exampleJp": "共働きの世帯が増加する一方で、仕事と育児を両立させるための社会的支援は未だ十分とは言えない。",
    "exampleTranslation": "While dual-income households are increasing, social support to balance work and child-rearing cannot yet be considered sufficient.",
    "tags": [
      "n1",
      "vocabulary",
      "demographics"
    ],
    "sourceIds": [
      "n1-vocab-0546"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 546
  },
  {
    "category": "vocabulary",
    "front": "世帯",
    "back": "household",
    "exampleJp": "核家族化の進行に伴い、高齢者の一人暮らし世帯の数が過去最高を記録したことが調査で判明した。",
    "exampleTranslation": "A survey revealed that along with the trend toward nuclear families, the number of elderly single-person households has hit a record high.",
    "tags": [
      "n1",
      "vocabulary",
      "demographics"
    ],
    "sourceIds": [
      "n1-vocab-0547"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 547
  },
  {
    "category": "vocabulary",
    "front": "出生率",
    "back": "birth rate",
    "exampleJp": "政府が様々な子育て支援策を打ち出しているにもかかわらず、出生率の低下傾向に歯止めがかからない。",
    "exampleTranslation": "Despite the government rolling out various child-rearing support measures, the downward trend in the birth rate shows no signs of stopping.",
    "tags": [
      "n1",
      "vocabulary",
      "demographics"
    ],
    "sourceIds": [
      "n1-vocab-0548"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 548
  },
  {
    "category": "vocabulary",
    "front": "死亡率",
    "back": "mortality rate",
    "exampleJp": "衛生環境の改善と予防接種の普及により、乳幼児の死亡率は歴史的な低水準にまで改善された。",
    "exampleTranslation": "Through improved sanitation and widespread vaccination, the infant mortality rate has improved to a historically low level.",
    "tags": [
      "n1",
      "vocabulary",
      "demographics"
    ],
    "sourceIds": [
      "n1-vocab-0549"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 549
  },
  {
    "category": "vocabulary",
    "front": "未婚",
    "back": "unmarried",
    "exampleJp": "経済的な不安やライフスタイルの変化により、生涯未婚のまま過ごす人の割合が年々上昇している。",
    "exampleTranslation": "Due to economic anxiety and changing lifestyles, the percentage of people who remain unmarried throughout their lives is rising year by year.",
    "tags": [
      "n1",
      "vocabulary",
      "demographics"
    ],
    "sourceIds": [
      "n1-vocab-0550"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 550
  },
  {
    "category": "vocabulary",
    "front": "震災",
    "back": "earthquake disaster",
    "exampleJp": "未曾有の大震災から数年が経過したが、被災者の心の傷は完全に癒えたわけではない。",
    "exampleTranslation": "Although several years have passed since the unprecedented earthquake disaster, the emotional scars of the victims have not fully healed.",
    "tags": [
      "n1",
      "vocabulary",
      "disaster",
      "risk"
    ],
    "sourceIds": [
      "n1-vocab-0551"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 551
  },
  {
    "category": "vocabulary",
    "front": "復興",
    "back": "reconstruction, revival",
    "exampleJp": "被災地の本格的な復興には、政府の資金援助だけでなく民間企業の積極的な投資が欠かせない。",
    "exampleTranslation": "For full-scale reconstruction of the disaster-stricken areas, active investment by private enterprises is essential, not just government financial aid.",
    "tags": [
      "n1",
      "vocabulary",
      "disaster",
      "risk"
    ],
    "sourceIds": [
      "n1-vocab-0552"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 552
  },
  {
    "category": "vocabulary",
    "front": "避難",
    "back": "evacuation",
    "exampleJp": "河川の氾濫の危険性が高まったため、自治体は周辺住民に対して直ちに避難するよう勧告を出した。",
    "exampleTranslation": "Because the danger of the river overflowing had heightened, the municipality issued an advisory for local residents to evacuate immediately.",
    "tags": [
      "n1",
      "vocabulary",
      "disaster",
      "risk"
    ],
    "sourceIds": [
      "n1-vocab-0553"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 553
  },
  {
    "category": "vocabulary",
    "front": "救済",
    "back": "relief, aid",
    "exampleJp": "巨大台風による甚大な被害を受け、国際社会は被災国に対する緊急の救済措置を決定した。",
    "exampleTranslation": "Suffering immense damage from the massive typhoon, the international community decided on emergency relief measures for the affected country.",
    "tags": [
      "n1",
      "vocabulary",
      "disaster",
      "risk"
    ],
    "sourceIds": [
      "n1-vocab-0554"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 554
  },
  {
    "category": "vocabulary",
    "front": "崩壊",
    "back": "collapse, crumbling",
    "exampleJp": "長年の雨水による浸食が原因で、古いダムの一部が突然崩壊し、下流の村が濁流に飲み込まれた。",
    "exampleTranslation": "Caused by years of rainwater erosion, a section of the old dam suddenly collapsed, swallowing the downstream village in muddy waters.",
    "tags": [
      "n1",
      "vocabulary",
      "disaster",
      "risk"
    ],
    "sourceIds": [
      "n1-vocab-0555"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 555
  },
  {
    "category": "vocabulary",
    "front": "危機",
    "back": "crisis",
    "exampleJp": "想定外の感染症の流行により、国内の医療体制は崩壊の危機に直面していると専門家は警告した。",
    "exampleTranslation": "Experts warned that the domestic medical system is facing a crisis of collapse due to the unexpected epidemic of the infectious disease.",
    "tags": [
      "n1",
      "vocabulary",
      "disaster",
      "risk"
    ],
    "sourceIds": [
      "n1-vocab-0556"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 556
  },
  {
    "category": "vocabulary",
    "front": "対策",
    "back": "countermeasure",
    "exampleJp": "多発するサイバー攻撃から国家の機密情報を守るため、政府は新たなセキュリティ対策を打ち出した。",
    "exampleTranslation": "To protect national classified information from frequent cyberattacks, the government introduced new security countermeasures.",
    "tags": [
      "n1",
      "vocabulary",
      "disaster",
      "risk"
    ],
    "sourceIds": [
      "n1-vocab-0557"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 557
  },
  {
    "category": "vocabulary",
    "front": "防災",
    "back": "disaster prevention",
    "exampleJp": "いつ起こるか分からない自然災害に備え、各家庭で日常的な防災意識を高めることが重要である。",
    "exampleTranslation": "In preparation for natural disasters that could happen at any time, it is important to raise everyday disaster prevention awareness in each household.",
    "tags": [
      "n1",
      "vocabulary",
      "disaster",
      "risk"
    ],
    "sourceIds": [
      "n1-vocab-0558"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 558
  },
  {
    "category": "vocabulary",
    "front": "警報",
    "back": "warning, alarm",
    "exampleJp": "気象庁から特別警報が発表された場合、ただちに命を守るための行動をとらなければならない。",
    "exampleTranslation": "When an emergency warning is issued by the Meteorological Agency, one must immediately take action to protect one's life.",
    "tags": [
      "n1",
      "vocabulary",
      "disaster",
      "risk"
    ],
    "sourceIds": [
      "n1-vocab-0559"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 559
  },
  {
    "category": "vocabulary",
    "front": "避難所",
    "back": "shelter, evacuation center",
    "exampleJp": "被災から数週間が経過しても、多くの人々が体育館などの臨時避難所で不便な生活を強いられている。",
    "exampleTranslation": "Even weeks after the disaster, many people are forced to live inconvenient lives in temporary shelters such as gymnasiums.",
    "tags": [
      "n1",
      "vocabulary",
      "disaster",
      "risk"
    ],
    "sourceIds": [
      "n1-vocab-0560"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 560
  },
  {
    "category": "vocabulary",
    "front": "救援物資",
    "back": "relief supplies",
    "exampleJp": "被災地に続く主要な道路が寸断され、食料や毛布などの救援物資の到着が大幅に遅れている。",
    "exampleTranslation": "Major roads leading to the disaster area have been cut off, severely delaying the arrival of relief supplies such as food and blankets.",
    "tags": [
      "n1",
      "vocabulary",
      "disaster",
      "risk"
    ],
    "sourceIds": [
      "n1-vocab-0561"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 561
  },
  {
    "category": "vocabulary",
    "front": "復旧",
    "back": "restoration, recovery",
    "exampleJp": "大規模な停電が発生したが、電力会社の懸命な作業により翌朝には完全に復旧した。",
    "exampleTranslation": "A massive power outage occurred, but thanks to the power company's strenuous efforts, it was completely restored by the following morning.",
    "tags": [
      "n1",
      "vocabulary",
      "disaster",
      "risk"
    ],
    "sourceIds": [
      "n1-vocab-0562"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 562
  },
  {
    "category": "vocabulary",
    "front": "津波",
    "back": "tsunami",
    "exampleJp": "地震発生直後に津波の危険が予測されたため、沿岸部の住民は高台へと一斉に車を走らせた。",
    "exampleTranslation": "Because the danger of a tsunami was predicted immediately after the earthquake, coastal residents simultaneously drove their cars toward higher ground.",
    "tags": [
      "n1",
      "vocabulary",
      "disaster",
      "risk"
    ],
    "sourceIds": [
      "n1-vocab-0563"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 563
  },
  {
    "category": "vocabulary",
    "front": "余震",
    "back": "aftershock",
    "exampleJp": "本震から数日が経過しても強い余震が頻発しており、被災者は不安な夜を過ごしている。",
    "exampleTranslation": "Even days after the main shock, strong aftershocks occur frequently, leaving victims to spend anxious nights.",
    "tags": [
      "n1",
      "vocabulary",
      "disaster",
      "risk"
    ],
    "sourceIds": [
      "n1-vocab-0564"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 564
  },
  {
    "category": "vocabulary",
    "front": "土砂崩れ",
    "back": "landslide",
    "exampleJp": "連日の大雨で地盤が緩んでおり、山沿いの地域では土砂崩れに対する厳重な警戒が必要だ。",
    "exampleTranslation": "The ground has loosened from continuous heavy rain, necessitating strict vigilance against landslides in mountainous regions.",
    "tags": [
      "n1",
      "vocabulary",
      "disaster",
      "risk"
    ],
    "sourceIds": [
      "n1-vocab-0565"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 565
  },
  {
    "category": "vocabulary",
    "front": "備え",
    "back": "preparation",
    "exampleJp": "水や非常食の備蓄など、日頃のちょっとした備えが災害時の生死を分けることもある。",
    "exampleTranslation": "Small everyday preparations, such as stockpiling water and emergency food, can sometimes mean the difference between life and death during a disaster.",
    "tags": [
      "n1",
      "vocabulary",
      "disaster",
      "risk"
    ],
    "sourceIds": [
      "n1-vocab-0566"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 566
  },
  {
    "category": "vocabulary",
    "front": "警戒",
    "back": "vigilance, caution",
    "exampleJp": "猛烈な勢力を持つ台風の接近に伴い、気象庁は最大級の警戒を呼びかけている。",
    "exampleTranslation": "With the approach of a fiercely powerful typhoon, the Meteorological Agency is calling for maximum vigilance.",
    "tags": [
      "n1",
      "vocabulary",
      "disaster",
      "risk"
    ],
    "sourceIds": [
      "n1-vocab-0567"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 567
  },
  {
    "category": "vocabulary",
    "front": "予測",
    "back": "prediction, forecast",
    "exampleJp": "現在の科学技術をもってしても、大地震の発生時期を正確に予測することは極めて困難である。",
    "exampleTranslation": "Even with current science and technology, accurately predicting the timing of a major earthquake is extremely difficult.",
    "tags": [
      "n1",
      "vocabulary",
      "disaster",
      "risk"
    ],
    "sourceIds": [
      "n1-vocab-0568"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 568
  },
  {
    "category": "vocabulary",
    "front": "犠牲",
    "back": "sacrifice, victim",
    "exampleJp": "不幸にもその大規模な火災により、多くの尊い命が犠牲となってしまった。",
    "exampleTranslation": "Tragically, many precious lives fell victim to that large-scale fire.",
    "tags": [
      "n1",
      "vocabulary",
      "disaster",
      "risk"
    ],
    "sourceIds": [
      "n1-vocab-0569"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 569
  },
  {
    "category": "vocabulary",
    "front": "福祉",
    "back": "welfare",
    "exampleJp": "障害を持つ人々が社会で自立して生活できるよう、国は充実した福祉制度を整える義務がある。",
    "exampleTranslation": "The state has an obligation to prepare a substantial welfare system so that people with disabilities can live independently in society.",
    "tags": [
      "n1",
      "vocabulary",
      "healthcare",
      "social-issues"
    ],
    "sourceIds": [
      "n1-vocab-0570"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 570
  },
  {
    "category": "vocabulary",
    "front": "介護",
    "back": "nursing care",
    "exampleJp": "高齢の両親の介護に追われ、仕事との両立に悩む現役世代が増加していることが社会問題となっている。",
    "exampleTranslation": "The increasing number of working-age people who are busy with nursing care for elderly parents and struggling to balance it with work has become a social issue.",
    "tags": [
      "n1",
      "vocabulary",
      "healthcare",
      "social-issues"
    ],
    "sourceIds": [
      "n1-vocab-0571"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 571
  },
  {
    "category": "vocabulary",
    "front": "治安",
    "back": "public security",
    "exampleJp": "街灯の設置や防犯カメラの導入により、かつて犯罪の多かったその地域の治安は劇的に改善された。",
    "exampleTranslation": "Through the installation of streetlights and introduction of security cameras, the public security of the once crime-ridden area has improved dramatically.",
    "tags": [
      "n1",
      "vocabulary",
      "healthcare",
      "social-issues"
    ],
    "sourceIds": [
      "n1-vocab-0572"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 572
  },
  {
    "category": "vocabulary",
    "front": "措置",
    "back": "measure, step",
    "exampleJp": "感染症の急激な拡大を防ぐため、政府は海外からの入国を全面的に制限するという異例の措置に出た。",
    "exampleTranslation": "To prevent the rapid spread of the infectious disease, the government took the exceptional measure of completely restricting entry from overseas.",
    "tags": [
      "n1",
      "vocabulary",
      "healthcare",
      "social-issues"
    ],
    "sourceIds": [
      "n1-vocab-0573"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 573
  },
  {
    "category": "vocabulary",
    "front": "格差",
    "back": "disparity, gap",
    "exampleJp": "富裕層に富が集中する一方で貧困層は増加しており、経済的な格差の拡大が懸念されている。",
    "exampleTranslation": "While wealth concentrates among the rich, the poor are increasing, leading to concerns about the widening economic disparity.",
    "tags": [
      "n1",
      "vocabulary",
      "healthcare",
      "social-issues"
    ],
    "sourceIds": [
      "n1-vocab-0574"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 574
  },
  {
    "category": "vocabulary",
    "front": "偏見",
    "back": "prejudice, bias",
    "exampleJp": "特定の病気に対する根拠のない偏見が、患者の社会復帰を不当に妨げているケースは少なくない。",
    "exampleTranslation": "There are many cases where baseless prejudice against certain diseases unfairly hinders patients' return to society.",
    "tags": [
      "n1",
      "vocabulary",
      "healthcare",
      "social-issues"
    ],
    "sourceIds": [
      "n1-vocab-0575"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 575
  },
  {
    "category": "vocabulary",
    "front": "虐待",
    "back": "abuse, maltreatment",
    "exampleJp": "家庭内で日常的に児童虐待が行われている疑いがある場合、周囲の人間は迷わず通報するべきだ。",
    "exampleTranslation": "If there is suspicion that child abuse is taking place routinely within a family, people around them should report it without hesitation.",
    "tags": [
      "n1",
      "vocabulary",
      "healthcare",
      "social-issues"
    ],
    "sourceIds": [
      "n1-vocab-0576"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 576
  },
  {
    "category": "vocabulary",
    "front": "扶養",
    "back": "support (dependents)",
    "exampleJp": "高齢の親を経済的に扶養する責任は、少子化が進む現代において若者世代に重くのしかかっている。",
    "exampleTranslation": "The responsibility of economically supporting elderly parents weighs heavily on the younger generation in modern times with its declining birthrate.",
    "tags": [
      "n1",
      "vocabulary",
      "healthcare",
      "social-issues"
    ],
    "sourceIds": [
      "n1-vocab-0577"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 577
  },
  {
    "category": "vocabulary",
    "front": "孤独死",
    "back": "solitary death",
    "exampleJp": "近所づきあいが希薄になった現代社会では、誰にも看取られずにアパートで孤独死する高齢者が増えている。",
    "exampleTranslation": "In modern society where neighborhood relationships have thinned, an increasing number of elderly people die solitary deaths in their apartments without anyone at their bedside.",
    "tags": [
      "n1",
      "vocabulary",
      "healthcare",
      "social-issues"
    ],
    "sourceIds": [
      "n1-vocab-0578"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 578
  },
  {
    "category": "vocabulary",
    "front": "更生",
    "back": "rehabilitation",
    "exampleJp": "罪を犯した者が社会の中で再び立ち直るためには、刑罰だけでなく適切な更生プログラムが不可欠だ。",
    "exampleTranslation": "For those who have committed crimes to recover in society again, not only punishment but also appropriate rehabilitation programs are indispensable.",
    "tags": [
      "n1",
      "vocabulary",
      "healthcare",
      "social-issues"
    ],
    "sourceIds": [
      "n1-vocab-0579"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 579
  },
  {
    "category": "vocabulary",
    "front": "貧困",
    "back": "poverty",
    "exampleJp": "発展途上国においては、安全な飲み水すら確保できない絶対的な貧困の連鎖をいかに断ち切るかが課題だ。",
    "exampleTranslation": "In developing countries, the challenge is how to break the cycle of absolute poverty where even safe drinking water cannot be secured.",
    "tags": [
      "n1",
      "vocabulary",
      "healthcare",
      "social-issues"
    ],
    "sourceIds": [
      "n1-vocab-0580"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 580
  },
  {
    "category": "vocabulary",
    "front": "待機児童",
    "back": "children waiting for daycare",
    "exampleJp": "保育所の定員不足により、共働きを希望しても子供を預けられない待機児童の問題が都市部で深刻化している。",
    "exampleTranslation": "Due to a shortage of daycare capacity, the problem of waitlisted children—where parents wanting dual incomes cannot place their children—is worsening in urban areas.",
    "tags": [
      "n1",
      "vocabulary",
      "healthcare",
      "social-issues"
    ],
    "sourceIds": [
      "n1-vocab-0581"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 581
  },
  {
    "category": "vocabulary",
    "front": "差別",
    "back": "discrimination",
    "exampleJp": "人種や性別、宗教を理由としたあらゆる形態の差別は、国際社会において決して容認されるべきではない。",
    "exampleTranslation": "All forms of discrimination based on race, gender, or religion should absolutely never be tolerated in the international community.",
    "tags": [
      "n1",
      "vocabulary",
      "healthcare",
      "social-issues"
    ],
    "sourceIds": [
      "n1-vocab-0582"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 582
  },
  {
    "category": "vocabulary",
    "front": "年金",
    "back": "pension",
    "exampleJp": "少子高齢化の影響で、将来自分が受け取る年金だけで生活を維持できるか不安を抱く若者は多い。",
    "exampleTranslation": "Affected by the aging population and declining birthrate, many young people harbor anxiety about whether they can maintain their lives solely on the pension they will receive in the future.",
    "tags": [
      "n1",
      "vocabulary",
      "healthcare",
      "social-issues"
    ],
    "sourceIds": [
      "n1-vocab-0583"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 583
  },
  {
    "category": "vocabulary",
    "front": "保障",
    "back": "security, guarantee",
    "exampleJp": "憲法によって全ての国民に最低限度の健康で文化的な生活を営む権利が保障されている。",
    "exampleTranslation": "The constitution guarantees all citizens the right to maintain a minimum standard of wholesome and cultured living.",
    "tags": [
      "n1",
      "vocabulary",
      "healthcare",
      "social-issues"
    ],
    "sourceIds": [
      "n1-vocab-0584"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 584
  },
  {
    "category": "vocabulary",
    "front": "医療費",
    "back": "medical expenses",
    "exampleJp": "新薬の高額化や高齢者の増加に伴い、国家予算に占める国民医療費の割合は年々膨張し続けている。",
    "exampleTranslation": "With the high cost of new drugs and the increase in elderly people, the proportion of national medical expenses in the national budget continues to swell year by year.",
    "tags": [
      "n1",
      "vocabulary",
      "healthcare",
      "social-issues"
    ],
    "sourceIds": [
      "n1-vocab-0585"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 585
  },
  {
    "category": "vocabulary",
    "front": "処罰",
    "back": "punishment",
    "exampleJp": "企業の内部情報を不正に利用して株取引を行った者は、法律に基づいて厳しく処罰される。",
    "exampleTranslation": "Those who illegally use corporate insider information to conduct stock trading will be severely punished according to the law.",
    "tags": [
      "n1",
      "vocabulary",
      "healthcare",
      "social-issues"
    ],
    "sourceIds": [
      "n1-vocab-0586"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 586
  },
  {
    "category": "vocabulary",
    "front": "いじめ",
    "back": "bullying",
    "exampleJp": "学校内での陰湿ないじめが原因で、不登校になってしまう生徒の問題が教育現場で重く受け止められている。",
    "exampleTranslation": "The problem of students refusing to go to school due to malicious bullying within schools is being taken very seriously in the educational field.",
    "tags": [
      "n1",
      "vocabulary",
      "healthcare",
      "social-issues"
    ],
    "sourceIds": [
      "n1-vocab-0587"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 587
  },
  {
    "category": "vocabulary",
    "front": "雇用形態",
    "back": "employment form",
    "exampleJp": "正社員や派遣社員など、多様な雇用形態が存在する現代において、同一労働同一賃金の実現が求められている。",
    "exampleTranslation": "In modern times where diverse employment forms exist, such as regular employees and temp workers, the realization of equal pay for equal work is demanded.",
    "tags": [
      "n1",
      "vocabulary",
      "healthcare",
      "social-issues"
    ],
    "sourceIds": [
      "n1-vocab-0588"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 588
  },
  {
    "category": "vocabulary",
    "front": "予防接種",
    "back": "vaccination",
    "exampleJp": "感染症のパンデミックを収束させるためには、世界規模で迅速かつ公平に予防接種を進める必要がある。",
    "exampleTranslation": "To bring the infectious disease pandemic under control, it is necessary to proceed with vaccinations rapidly and equitably on a global scale.",
    "tags": [
      "n1",
      "vocabulary",
      "healthcare",
      "social-issues"
    ],
    "sourceIds": [
      "n1-vocab-0589"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 589
  },
  {
    "category": "vocabulary",
    "front": "著しい",
    "back": "remarkable, striking",
    "exampleJp": "近年、IT技術の著しい進歩により、私たちの生活は大きく変わった。",
    "exampleTranslation": "In recent years, our lives have changed significantly due to the remarkable progress of IT technology.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0590"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 590
  },
  {
    "category": "vocabulary",
    "front": "乏しい",
    "back": "scarce, lacking",
    "exampleJp": "天然資源に乏しいこの国は、加工貿易によって経済を支えてきた。",
    "exampleTranslation": "This country, which is scarce in natural resources, has supported its economy through processing trade.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0591"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 591
  },
  {
    "category": "vocabulary",
    "front": "膨大",
    "back": "enormous, vast",
    "exampleJp": "インターネット上には膨大な量の情報が溢れており、その真偽を見極める力が必要だ。",
    "exampleTranslation": "An enormous amount of information overflows on the internet, and the ability to discern its authenticity is necessary.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0592"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 592
  },
  {
    "category": "vocabulary",
    "front": "莫大",
    "back": "massive, enormous",
    "exampleJp": "その新規プロジェクトには莫大な資金が投じられる予定である。",
    "exampleTranslation": "Massive funds are scheduled to be invested in the new project.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0593"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 593
  },
  {
    "category": "vocabulary",
    "front": "微か",
    "back": "faint, slight",
    "exampleJp": "遠くから微かに聞こえてくる波の音が、心を穏やかにしてくれる。",
    "exampleTranslation": "The faint sound of waves heard from afar calms the mind.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0594"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 594
  },
  {
    "category": "vocabulary",
    "front": "顕著",
    "back": "striking, obvious",
    "exampleJp": "少子高齢化の影響は、地方都市において特に顕著に表れている。",
    "exampleTranslation": "The impact of the declining birthrate and aging population is particularly obvious in regional cities.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0595"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 595
  },
  {
    "category": "vocabulary",
    "front": "漠然",
    "back": "vague, obscure",
    "exampleJp": "将来に対して漠然とした不安を抱いている若者は少なくない。",
    "exampleTranslation": "Not a few young people harbor vague anxieties about the future.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0596"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 596
  },
  {
    "category": "vocabulary",
    "front": "曖昧",
    "back": "ambiguous, unclear",
    "exampleJp": "責任の所在が曖昧なままでは、同じような問題が再び起きるだろう。",
    "exampleTranslation": "As long as the locus of responsibility remains ambiguous, similar problems will likely occur again.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0597"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 597
  },
  {
    "category": "vocabulary",
    "front": "円滑",
    "back": "smooth, uninterrupted",
    "exampleJp": "業務の円滑な進行を図るため、各部署間の連携を強化すべきだ。",
    "exampleTranslation": "To ensure the smooth progression of operations, cooperation between departments should be strengthened.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0598"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 598
  },
  {
    "category": "vocabulary",
    "front": "迅速",
    "back": "swift, quick",
    "exampleJp": "クレームに対しては、迅速かつ誠実な対応が求められる。",
    "exampleTranslation": "Swift and sincere responses are required for complaints.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0599"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 599
  },
  {
    "category": "vocabulary",
    "front": "致命的",
    "back": "fatal, lethal",
    "exampleJp": "システムの設計段階での見落としは、後に致命的な欠陥をもたらすことがある。",
    "exampleTranslation": "Oversights during the system design stage can sometimes lead to fatal flaws later on.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0600"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 600
  },
  {
    "category": "vocabulary",
    "front": "劇的",
    "back": "dramatic",
    "exampleJp": "新薬の開発により、その病気の治療の成功率は劇的に向上した。",
    "exampleTranslation": "Thanks to the development of new drugs, the success rate for treating the disease has improved dramatically.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0601"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 601
  },
  {
    "category": "vocabulary",
    "front": "画期的",
    "back": "epoch-making, groundbreaking",
    "exampleJp": "電気自動車の普及は、環境問題の解決に向けた画期的な第一歩となる。",
    "exampleTranslation": "The widespread use of electric vehicles marks an epoch-making first step toward solving environmental problems.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0602"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 602
  },
  {
    "category": "vocabulary",
    "front": "圧倒的",
    "back": "overwhelming",
    "exampleJp": "その候補者は圧倒的な支持を集め、見事に当選を果たした。",
    "exampleTranslation": "The candidate gathered overwhelming support and won the election impressively.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0603"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 603
  },
  {
    "category": "vocabulary",
    "front": "必然的",
    "back": "inevitable, necessary",
    "exampleJp": "資本主義社会において、企業間の競争が激化するのは必然的なことである。",
    "exampleTranslation": "In a capitalist society, the intensification of competition between companies is inevitable.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0604"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 604
  },
  {
    "category": "vocabulary",
    "front": "潜在的",
    "back": "potential, latent",
    "exampleJp": "消費者の潜在的なニーズを掘り起こすことが、新製品開発の鍵を握っている。",
    "exampleTranslation": "Unearthing the potential needs of consumers holds the key to new product development.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0605"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 605
  },
  {
    "category": "vocabulary",
    "front": "根本的",
    "back": "fundamental, basic",
    "exampleJp": "表面的な対策ではなく、制度の根本的な見直しが必要不可欠だ。",
    "exampleTranslation": "A fundamental review of the system, rather than superficial measures, is essential.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0606"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 606
  },
  {
    "category": "vocabulary",
    "front": "意図的",
    "back": "intentional, deliberate",
    "exampleJp": "記事の一部が意図的に切り取られ、事実と異なる印象を与えている。",
    "exampleTranslation": "A portion of the article was intentionally excerpted, giving an impression contrary to the facts.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0607"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 607
  },
  {
    "category": "vocabulary",
    "front": "伝統的",
    "back": "traditional",
    "exampleJp": "グローバル化が進む中で、伝統的な文化をいかに保護していくかが課題となっている。",
    "exampleTranslation": "As globalization advances, how to protect traditional culture has become a challenge.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0608"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 608
  },
  {
    "category": "vocabulary",
    "front": "革新的",
    "back": "innovative",
    "exampleJp": "彼の提案したビジネスモデルは非常に革新的で、業界全体に衝撃を与えた。",
    "exampleTranslation": "The business model he proposed was highly innovative and sent shockwaves throughout the industry.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0609"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 609
  },
  {
    "category": "vocabulary",
    "front": "具体的",
    "back": "concrete, specific",
    "exampleJp": "目標を達成するためには、より具体的な行動計画を立てる必要がある。",
    "exampleTranslation": "In order to achieve the goal, it is necessary to formulate a more concrete action plan.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0610"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 610
  },
  {
    "category": "vocabulary",
    "front": "主観的",
    "back": "subjective",
    "exampleJp": "評価が主観的な判断に偏らないよう、明確な基準を設けるべきだ。",
    "exampleTranslation": "Clear criteria should be established so that evaluations are not biased by subjective judgments.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0611"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 611
  },
  {
    "category": "vocabulary",
    "front": "客観的",
    "back": "objective",
    "exampleJp": "ジャーナリストには、事象を客観的な視点から分析する能力が求められる。",
    "exampleTranslation": "Journalists are required to have the ability to analyze events from an objective perspective.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0612"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 612
  },
  {
    "category": "vocabulary",
    "front": "象徴的",
    "back": "symbolic",
    "exampleJp": "その事件は、現代社会の闇を浮き彫りにする象徴的な出来事であった。",
    "exampleTranslation": "The incident was a symbolic event that highlighted the darkness of modern society.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0613"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 613
  },
  {
    "category": "vocabulary",
    "front": "閉鎖的",
    "back": "closed, exclusive",
    "exampleJp": "その村は長らく閉鎖的な環境にあったため、独自の風習が色濃く残っている。",
    "exampleTranslation": "Because the village had long been in a closed environment, its unique customs remain deeply ingrained.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0614"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 614
  },
  {
    "category": "vocabulary",
    "front": "保守的",
    "back": "conservative",
    "exampleJp": "経営陣が保守的な姿勢を崩さない限り、企業の成長は見込めない。",
    "exampleTranslation": "As long as the management team maintains a conservative stance, corporate growth cannot be expected.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0615"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 615
  },
  {
    "category": "vocabulary",
    "front": "楽観的",
    "back": "optimistic",
    "exampleJp": "経済の回復について楽観的な見通しを示す専門家もいるが、まだ油断はできない。",
    "exampleTranslation": "Although some experts show an optimistic outlook for economic recovery, we cannot let our guard down yet.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0616"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 616
  },
  {
    "category": "vocabulary",
    "front": "悲観的",
    "back": "pessimistic",
    "exampleJp": "現状をあまりに悲観的に捉えるのは、事態の改善にはつながらない。",
    "exampleTranslation": "Taking too pessimistic a view of the current situation will not lead to an improvement of affairs.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0617"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 617
  },
  {
    "category": "vocabulary",
    "front": "妥当",
    "back": "valid, appropriate",
    "exampleJp": "提示された条件は妥当なものだと判断し、契約に同意した。",
    "exampleTranslation": "Judging the proposed conditions to be valid, we agreed to the contract.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0618"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 618
  },
  {
    "category": "vocabulary",
    "front": "緻密",
    "back": "precise, minute",
    "exampleJp": "彼の小説は緻密な取材に基づいており、リアリティに富んでいる。",
    "exampleTranslation": "His novels are based on precise research and are rich in realism.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0619"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 619
  },
  {
    "category": "vocabulary",
    "front": "巧妙",
    "back": "ingenious, skillful",
    "exampleJp": "詐欺の手口は年々巧妙になっており、被害を防ぐのは容易ではない。",
    "exampleTranslation": "The methods of fraud are becoming more ingenious year by year, and preventing damage is not easy.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0620"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 620
  },
  {
    "category": "vocabulary",
    "front": "斬新",
    "back": "novel, original",
    "exampleJp": "そのデザイナーの斬新なアイデアは、多くの若者から支持を集めた。",
    "exampleTranslation": "The designer's novel ideas garnered support from many young people.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0621"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 621
  },
  {
    "category": "vocabulary",
    "front": "奇抜",
    "back": "eccentric, striking",
    "exampleJp": "彼女の奇抜なファッションは、常に周囲の目を引く。",
    "exampleTranslation": "Her eccentric fashion always catches the eyes of those around her.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0622"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 622
  },
  {
    "category": "vocabulary",
    "front": "堅実",
    "back": "steady, solid",
    "exampleJp": "彼はリスクを冒さず、堅実な資産運用を心掛けている。",
    "exampleTranslation": "He avoids taking risks and strives for steady asset management.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0623"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 623
  },
  {
    "category": "vocabulary",
    "front": "明白",
    "back": "obvious, clear",
    "exampleJp": "証拠を見れば、彼が無実であることは誰の目にも明白だ。",
    "exampleTranslation": "Looking at the evidence, it is obvious to anyone that he is innocent.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0624"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 624
  },
  {
    "category": "vocabulary",
    "front": "切実",
    "back": "compelling, serious",
    "exampleJp": "住民から寄せられた切実な声に、行政は真摯に耳を傾けるべきだ。",
    "exampleTranslation": "The administration should earnestly listen to the compelling voices submitted by the residents.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0625"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 625
  },
  {
    "category": "vocabulary",
    "front": "深刻",
    "back": "serious, severe",
    "exampleJp": "地球温暖化による環境破壊は、すでに深刻なレベルに達している。",
    "exampleTranslation": "Environmental destruction caused by global warming has already reached a severe level.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0626"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 626
  },
  {
    "category": "vocabulary",
    "front": "頻繁",
    "back": "frequent",
    "exampleJp": "この交差点では事故が頻繁に発生しているため、信号機の設置が急務だ。",
    "exampleTranslation": "Because accidents occur frequently at this intersection, the installation of a traffic light is an urgent task.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0627"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 627
  },
  {
    "category": "vocabulary",
    "front": "希薄",
    "back": "thin, sparse",
    "exampleJp": "都市部では近所づきあいが希薄になり、地域コミュニティの弱体化が懸念されている。",
    "exampleTranslation": "In urban areas, neighborly relations have become sparse, and the weakening of local communities is a concern.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0628"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 628
  },
  {
    "category": "vocabulary",
    "front": "脆弱",
    "back": "fragile, vulnerable",
    "exampleJp": "セキュリティ対策の脆弱性を突かれ、顧客データが外部に流出した。",
    "exampleTranslation": "Customer data was leaked externally due to vulnerabilities in the security measures being exploited.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0629"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 629
  },
  {
    "category": "vocabulary",
    "front": "強靭",
    "back": "tough, strong",
    "exampleJp": "マラソン選手には、長距離を走り抜くための強靭な体力と精神力が必要だ。",
    "exampleTranslation": "Marathon runners require tough physical stamina and mental fortitude to run long distances.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0630"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 630
  },
  {
    "category": "vocabulary",
    "front": "柔軟",
    "back": "flexible",
    "exampleJp": "変化の激しい現代においては、状況に応じた柔軟な対応が求められる。",
    "exampleTranslation": "In this modern era of rapid change, flexible responses tailored to the situation are required.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0631"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 631
  },
  {
    "category": "vocabulary",
    "front": "頑固",
    "back": "stubborn, obstinate",
    "exampleJp": "職人の頑固なこだわりが、その伝統工芸品の高い品質を支えている。",
    "exampleTranslation": "The craftsman's stubborn dedication supports the high quality of the traditional crafts.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0632"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 632
  },
  {
    "category": "vocabulary",
    "front": "寛容",
    "back": "tolerant, open-minded",
    "exampleJp": "異文化に対して寛容な態度を持つことが、国際社会を生き抜くためには重要だ。",
    "exampleTranslation": "Holding a tolerant attitude toward different cultures is important for surviving in the international community.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0633"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 633
  },
  {
    "category": "vocabulary",
    "front": "厳格",
    "back": "strict, stern",
    "exampleJp": "個人情報の取り扱いについては、厳格なルールが定められている。",
    "exampleTranslation": "Strict rules are established regarding the handling of personal information.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0634"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 634
  },
  {
    "category": "vocabulary",
    "front": "繊細",
    "back": "delicate, sensitive",
    "exampleJp": "彼女は繊細な感性の持ち主で、芸術的な才能に恵まれている。",
    "exampleTranslation": "She possesses a delicate sensibility and is blessed with artistic talent.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0635"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 635
  },
  {
    "category": "vocabulary",
    "front": "敏感",
    "back": "sensitive, susceptible",
    "exampleJp": "市場の動向に敏感でなければ、ビジネスの好機を逃してしまうだろう。",
    "exampleTranslation": "If you are not sensitive to market trends, you will likely miss business opportunities.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0636"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 636
  },
  {
    "category": "vocabulary",
    "front": "鈍感",
    "back": "insensitive, thick-skinned",
    "exampleJp": "他人の痛みに鈍感な人間は、無意識のうちに人を傷つけてしまうことがある。",
    "exampleTranslation": "People who are insensitive to the pain of others can sometimes hurt people unconsciously.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0637"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 637
  },
  {
    "category": "vocabulary",
    "front": "裕福",
    "back": "wealthy, affluent",
    "exampleJp": "彼は裕福な家庭に育ったが、決して驕ることなく努力を重ねてきた。",
    "exampleTranslation": "He grew up in a wealthy family, but he has always made efforts without ever becoming arrogant.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0638"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 638
  },
  {
    "category": "vocabulary",
    "front": "孤独",
    "back": "loneliness, solitude",
    "exampleJp": "都会の喧騒の中にいても、ふとした瞬間に深い孤独を感じることがある。",
    "exampleTranslation": "Even amidst the hustle and bustle of the city, there are times when one feels a deep loneliness in unexpected moments.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0639"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 639
  },
  {
    "category": "vocabulary",
    "front": "孤立",
    "back": "isolation",
    "exampleJp": "国際社会からの孤立を深めるその国の外交政策は、多くの批判を浴びている。",
    "exampleTranslation": "The country's foreign policy, which deepens its isolation from the international community, is drawing much criticism.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0640"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 640
  },
  {
    "category": "vocabulary",
    "front": "依存",
    "back": "dependence, reliance",
    "exampleJp": "特定の企業への過度な依存は、経営上の大きなリスクを伴う。",
    "exampleTranslation": "Excessive dependence on a specific company entails significant management risks.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0641"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 641
  },
  {
    "category": "vocabulary",
    "front": "自立",
    "back": "independence, self-reliance",
    "exampleJp": "若者が経済的にも精神的にも自立できるような社会制度を整える必要がある。",
    "exampleTranslation": "It is necessary to establish social systems that allow young people to become economically and mentally independent.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0642"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 642
  },
  {
    "category": "vocabulary",
    "front": "従属",
    "back": "subordination, dependency",
    "exampleJp": "両国の関係は対等ではなく、一方が他方に従属する形となっている。",
    "exampleTranslation": "The relationship between the two countries is not equal, taking a form where one is subordinate to the other.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0643"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 643
  },
  {
    "category": "vocabulary",
    "front": "摩擦",
    "back": "friction, discord",
    "exampleJp": "貿易不均衡を背景に、両国間の経済摩擦はさらに激しさを増している。",
    "exampleTranslation": "Against the backdrop of trade imbalances, economic friction between the two countries is intensifying further.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0644"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 644
  },
  {
    "category": "vocabulary",
    "front": "妥協",
    "back": "compromise",
    "exampleJp": "議論が平行線を辿る中、双方が互いに妥協点を見出す努力が求められる。",
    "exampleTranslation": "With the discussions running on parallel lines, efforts are required from both sides to find a point of compromise.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0645"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 645
  },
  {
    "category": "vocabulary",
    "front": "譲歩",
    "back": "concession, compromise",
    "exampleJp": "交渉を成立させるために、我が国としては一定の譲歩をせざるを得ないだろう。",
    "exampleTranslation": "In order to conclude the negotiations, our country will likely have no choice but to make certain concessions.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0646"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 646
  },
  {
    "category": "vocabulary",
    "front": "介入",
    "back": "intervention",
    "exampleJp": "他国の内政に対する過度な介入は、国際的な非難を招きかねない。",
    "exampleTranslation": "Excessive intervention in the internal affairs of other countries could invite international condemnation.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0647"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 647
  },
  {
    "category": "vocabulary",
    "front": "干渉",
    "back": "interference, meddling",
    "exampleJp": "親が子供のプライバシーに必要以上に干渉するのは避けるべきだ。",
    "exampleTranslation": "Parents should avoid interfering in their children's privacy more than necessary.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0648"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 648
  },
  {
    "category": "vocabulary",
    "front": "妨害",
    "back": "obstruction, disturbance",
    "exampleJp": "警察の捜査を不当に妨害する行為は、決して許されるものではない。",
    "exampleTranslation": "Acts that unfairly obstruct police investigations are entirely unacceptable.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0649"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 649
  },
  {
    "category": "vocabulary",
    "front": "阻止",
    "back": "prevention, stopping",
    "exampleJp": "テロの発生を未然に阻止するため、空港での警備が強化されている。",
    "exampleTranslation": "To prevent terrorism before it occurs, security at airports is being strengthened.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0650"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 650
  },
  {
    "category": "vocabulary",
    "front": "促進",
    "back": "promotion, acceleration",
    "exampleJp": "再生可能エネルギーの利用を促進するための新たな法案が可決された。",
    "exampleTranslation": "A new bill to promote the use of renewable energy was passed.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0651"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 651
  },
  {
    "category": "vocabulary",
    "front": "抑制",
    "back": "suppression, restraint",
    "exampleJp": "インフレーションの進行を抑制するため、中央銀行は金融引き締め策を発表した。",
    "exampleTranslation": "To suppress the progression of inflation, the central bank announced monetary tightening measures.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0652"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 652
  },
  {
    "category": "vocabulary",
    "front": "喚起",
    "back": "arousing, awakening",
    "exampleJp": "そのドキュメンタリー映画は、環境問題に対する人々の関心を喚起した。",
    "exampleTranslation": "The documentary film aroused people's interest in environmental issues.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0653"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 653
  },
  {
    "category": "vocabulary",
    "front": "誘発",
    "back": "inducing, triggering",
    "exampleJp": "不用意な発言が、不要な誤解や対立を誘発する恐れがある。",
    "exampleTranslation": "Careless remarks risk inducing unnecessary misunderstandings and conflicts.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0654"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 654
  },
  {
    "category": "vocabulary",
    "front": "誇張",
    "back": "exaggeration",
    "exampleJp": "広告の一部には商品の効能を誇張していると疑われる表現が含まれている。",
    "exampleTranslation": "Some parts of the advertisement contain expressions suspected of exaggerating the product's efficacy.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0655"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 655
  },
  {
    "category": "vocabulary",
    "front": "歪曲",
    "back": "distortion, falsification",
    "exampleJp": "歴史的事実を意図的に歪曲して伝えることは、深刻な問題を引き起こす。",
    "exampleTranslation": "Intentionally distorting and conveying historical facts causes serious problems.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0656"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 656
  },
  {
    "category": "vocabulary",
    "front": "捏造",
    "back": "fabrication, forgery",
    "exampleJp": "論文のデータが捏造されていたことが発覚し、その研究者は大学を解雇された。",
    "exampleTranslation": "It was discovered that the data in the paper had been fabricated, and the researcher was dismissed from the university.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0657"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 657
  },
  {
    "category": "vocabulary",
    "front": "模倣",
    "back": "imitation, copying",
    "exampleJp": "子供は周囲の大人の行動を模倣することで、社会のルールを学んでいく。",
    "exampleTranslation": "Children learn the rules of society by imitating the behavior of adults around them.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0658"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 658
  },
  {
    "category": "vocabulary",
    "front": "踏襲",
    "back": "following (a precedent)",
    "exampleJp": "新市長は前任者の政策をそのまま踏襲するのではなく、独自の改革を打ち出した。",
    "exampleTranslation": "Rather than simply following his predecessor's policies, the new mayor set forth his own original reforms.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0659"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 659
  },
  {
    "category": "vocabulary",
    "front": "継承",
    "back": "inheritance, succession",
    "exampleJp": "伝統芸能を次世代へ継承していくためには、若手育成が急務である。",
    "exampleTranslation": "In order to pass down traditional performing arts to the next generation, fostering young talent is an urgent task.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0660"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 660
  },
  {
    "category": "vocabulary",
    "front": "伝承",
    "back": "transmission, handing down",
    "exampleJp": "その地域には、古くから伝承されている独自の神話や言い伝えがある。",
    "exampleTranslation": "The region has its own myths and legends that have been handed down since ancient times.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0661"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 661
  },
  {
    "category": "vocabulary",
    "front": "変遷",
    "back": "transition, change",
    "exampleJp": "街の風景の変遷を記録した写真展が、地元の美術館で開催されている。",
    "exampleTranslation": "A photography exhibition documenting the transition of the city's landscape is being held at the local art museum.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0662"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 662
  },
  {
    "category": "vocabulary",
    "front": "移行",
    "back": "shift, transition",
    "exampleJp": "アナログ放送からデジタル放送への完全な移行が完了した。",
    "exampleTranslation": "The complete shift from analog to digital broadcasting has been completed.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0663"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 663
  },
  {
    "category": "vocabulary",
    "front": "転換",
    "back": "conversion, turnabout",
    "exampleJp": "深刻な不況を脱却するため、政府は大胆な政策の転換を余儀なくされた。",
    "exampleTranslation": "To escape the severe recession, the government was forced into a bold conversion of its policies.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0664"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 664
  },
  {
    "category": "vocabulary",
    "front": "撤廃",
    "back": "abolition, elimination",
    "exampleJp": "両国間の自由な貿易を阻害している関税の撤廃が求められている。",
    "exampleTranslation": "The abolition of tariffs hindering free trade between the two countries is being demanded.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0665"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 665
  },
  {
    "category": "vocabulary",
    "front": "廃棄",
    "back": "disposal, abandonment",
    "exampleJp": "機密情報が含まれた書類は、規定の手順に従って安全に廃棄しなければならない。",
    "exampleTranslation": "Documents containing confidential information must be safely disposed of according to prescribed procedures.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0666"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 666
  },
  {
    "category": "vocabulary",
    "front": "放棄",
    "back": "renunciation, giving up",
    "exampleJp": "責任を放棄して途中で投げ出すような態度は、プロとしてあるまじき行為だ。",
    "exampleTranslation": "An attitude of renouncing responsibility and giving up halfway through is behavior unbecoming of a professional.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0667"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 667
  },
  {
    "category": "vocabulary",
    "front": "棄権",
    "back": "abstention, giving up a right",
    "exampleJp": "今回の選挙では、若年層の棄権率が過去最高を記録した。",
    "exampleTranslation": "In this election, the abstention rate among the youth recorded an all-time high.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0668"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 668
  },
  {
    "category": "vocabulary",
    "front": "辞退",
    "back": "declining, turning down",
    "exampleJp": "個人的な事情により、委員長への就任を辞退させていただくことになりました。",
    "exampleTranslation": "Due to personal reasons, I have decided to decline the appointment to the chairmanship.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0669"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 669
  },
  {
    "category": "vocabulary",
    "front": "拒絶",
    "back": "rejection, refusal",
    "exampleJp": "その企業は外部からの買収提案を真っ向から拒絶した。",
    "exampleTranslation": "The company flatly rejected the buyout proposal from the outside.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0670"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 670
  },
  {
    "category": "vocabulary",
    "front": "承諾",
    "back": "consent, acceptance",
    "exampleJp": "利用者の事前の承諾なしに、個人情報を第三者に提供することは法律で禁じられている。",
    "exampleTranslation": "It is forbidden by law to provide personal information to third parties without the prior consent of the user.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0671"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 671
  },
  {
    "category": "vocabulary",
    "front": "承認",
    "back": "approval, recognition",
    "exampleJp": "新しい開発計画が取締役会で承認され、いよいよ本格的な作業が始まる。",
    "exampleTranslation": "The new development plan was approved at the board of directors meeting, and full-scale work will finally begin.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0672"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 672
  },
  {
    "category": "vocabulary",
    "front": "容認",
    "back": "admission, tolerance",
    "exampleJp": "暴力による問題解決は、いかなる理由があろうとも容認されるべきではない。",
    "exampleTranslation": "Solving problems through violence should never be tolerated, regardless of the reason.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0673"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 673
  },
  {
    "category": "vocabulary",
    "front": "黙認",
    "back": "tacit consent, overlooking",
    "exampleJp": "上司が部下の不正行為を黙認していたとすれば、企業ぐるみの不祥事と言わざるを得ない。",
    "exampleTranslation": "If the boss had tacitly consented to the subordinate's misconduct, it must be said that it is a company-wide scandal.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0674"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 674
  },
  {
    "category": "vocabulary",
    "front": "妥結",
    "back": "settlement, agreement",
    "exampleJp": "長期にわたる労使交渉の末、ようやく双方が納得する形で妥結に至った。",
    "exampleTranslation": "After prolonged labor-management negotiations, a settlement was finally reached in a manner satisfactory to both sides.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0675"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 675
  },
  {
    "category": "vocabulary",
    "front": "決裂",
    "back": "breakdown, rupture",
    "exampleJp": "互いの主張が対立したまま、和平交渉は決裂に終わった。",
    "exampleTranslation": "With their respective claims remaining in opposition, the peace negotiations ended in a breakdown.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0676"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 676
  },
  {
    "category": "vocabulary",
    "front": "締結",
    "back": "conclusion (of a treaty/contract)",
    "exampleJp": "両国間で新たな経済連携協定が締結され、貿易の拡大が期待されている。",
    "exampleTranslation": "A new economic partnership agreement was concluded between the two countries, and an expansion of trade is expected.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0677"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 677
  },
  {
    "category": "vocabulary",
    "front": "破棄",
    "back": "cancellation, annulment",
    "exampleJp": "契約条件に違反した場合、相手方は一方的に契約を破棄することができる。",
    "exampleTranslation": "If the contract conditions are violated, the other party can unilaterally cancel the contract.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0678"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 678
  },
  {
    "category": "vocabulary",
    "front": "履行",
    "back": "fulfillment, execution",
    "exampleJp": "国際的な約束は、当事国が誠実に履行する義務を負っている。",
    "exampleTranslation": "The countries involved bear an obligation to faithfully fulfill international promises.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0679"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 679
  },
  {
    "category": "vocabulary",
    "front": "怠慢",
    "back": "negligence",
    "exampleJp": "行政の怠慢により、本来防げたはずの被害が拡大してしまった。",
    "exampleTranslation": "Due to the negligence of the administration, damage that should have been preventable expanded.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0680"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 680
  },
  {
    "category": "vocabulary",
    "front": "遂行",
    "back": "execution, accomplishment",
    "exampleJp": "困難な任務を最後まで遂行した彼の功績は、高く評価されるべきだ。",
    "exampleTranslation": "His achievement of executing the difficult mission to the end should be highly praised.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0681"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 681
  },
  {
    "category": "vocabulary",
    "front": "繁栄",
    "back": "prosperity",
    "exampleJp": "古代ローマ帝国は、強力な軍事力と優れたインフラによって長期にわたる繁栄を築いた。",
    "exampleTranslation": "The ancient Roman Empire built long-lasting prosperity through its powerful military and excellent infrastructure.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0682"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 682
  },
  {
    "category": "vocabulary",
    "front": "破綻",
    "back": "bankruptcy, failure",
    "exampleJp": "無計画な投資を続けた結果、その企業はついに経営破綻に追い込まれた。",
    "exampleTranslation": "As a result of continuing unplanned investments, the company was finally driven into bankruptcy.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0683"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 683
  },
  {
    "category": "vocabulary",
    "front": "枯渇",
    "back": "depletion, drying up",
    "exampleJp": "世界的な人口増加に伴い、水資源の枯渇が深刻な課題として浮上している。",
    "exampleTranslation": "Along with the global population increase, the depletion of water resources is emerging as a serious issue.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0684"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 684
  },
  {
    "category": "vocabulary",
    "front": "充満",
    "back": "being filled with, permeation",
    "exampleJp": "火災現場は有毒な煙が充満しており、救助活動は困難を極めた。",
    "exampleTranslation": "The site of the fire was filled with toxic smoke, and rescue operations proved extremely difficult.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0685"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 685
  },
  {
    "category": "vocabulary",
    "front": "氾濫",
    "back": "flooding, overflow",
    "exampleJp": "記録的な大雨により、各地で河川の氾濫が相次いだ。",
    "exampleTranslation": "Record-breaking heavy rain caused successive flooding of rivers in various areas.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0686"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 686
  },
  {
    "category": "vocabulary",
    "front": "普及",
    "back": "diffusion, spread",
    "exampleJp": "スマートフォンの急速な普及は、人々のコミュニケーションの形を根底から変えた。",
    "exampleTranslation": "The rapid diffusion of smartphones has fundamentally changed the way people communicate.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0687"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 687
  },
  {
    "category": "vocabulary",
    "front": "浸透",
    "back": "permeation, penetration",
    "exampleJp": "新たな企業理念を社員の間に浸透させるには、かなりの時間が必要だ。",
    "exampleTranslation": "It requires a considerable amount of time for a new corporate philosophy to permeate among employees.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0688"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 688
  },
  {
    "category": "vocabulary",
    "front": "拡散",
    "back": "scattering, diffusion",
    "exampleJp": "SNS上でフェイクニュースがあっという間に拡散し、社会的な混乱を招いた。",
    "exampleTranslation": "Fake news diffused in an instant on social media, causing social confusion.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0689"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 689
  },
  {
    "category": "vocabulary",
    "front": "収束",
    "back": "convergence, settling down",
    "exampleJp": "未曾有の感染症拡大がいつ収束するのか、誰にも予測がつかない状況だ。",
    "exampleTranslation": "It is a situation where no one can predict when the unprecedented spread of the infectious disease will settle down.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0690"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 690
  },
  {
    "category": "vocabulary",
    "front": "蔓延",
    "back": "spread, prevalence",
    "exampleJp": "職場内に蔓延する事なかれ主義が、組織の活力を奪っている。",
    "exampleTranslation": "The 'play-it-safe' attitude spreading throughout the workplace is sapping the organization's vitality.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0691"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 691
  },
  {
    "category": "vocabulary",
    "front": "均衡",
    "back": "equilibrium, balance",
    "exampleJp": "エコシステムの均衡を保つためには、人間による過度な自然開発を制限しなければならない。",
    "exampleTranslation": "To maintain the equilibrium of the ecosystem, excessive natural development by humans must be restricted.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0692"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 692
  },
  {
    "category": "vocabulary",
    "front": "偏り",
    "back": "bias, leaning",
    "exampleJp": "特定の意見だけを取り上げる報道には、明らかな偏りがあると言わざるを得ない。",
    "exampleTranslation": "It must be said that there is a clear bias in reporting that only takes up specific opinions.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0693"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 693
  },
  {
    "category": "vocabulary",
    "front": "乖離",
    "back": "divergence, estrangement",
    "exampleJp": "政治家が掲げる理想と、国民が直面している現実との間には大きな乖離がある。",
    "exampleTranslation": "There is a significant divergence between the ideals championed by politicians and the realities faced by the citizens.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0694"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 694
  },
  {
    "category": "vocabulary",
    "front": "合致",
    "back": "agreement, matching",
    "exampleJp": "その提案は我が社の経営方針と合致しており、採用する価値が十分にある。",
    "exampleTranslation": "That proposal is in agreement with our company's management policies and is well worth adopting.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0695"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 695
  },
  {
    "category": "vocabulary",
    "front": "類似",
    "back": "similarity, resemblance",
    "exampleJp": "他社の人気製品と類似したデザインを販売することは、著作権の侵害にあたる可能性がある。",
    "exampleTranslation": "Selling a design similar to another company's popular product could constitute copyright infringement.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0696"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 696
  },
  {
    "category": "vocabulary",
    "front": "相違",
    "back": "difference, discrepancy",
    "exampleJp": "両者の主張には根本的な相違があり、話し合いによる解決は難しいと見られる。",
    "exampleTranslation": "There is a fundamental difference in the claims of both parties, and resolution through discussion is seen as difficult.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0697"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 697
  },
  {
    "category": "vocabulary",
    "front": "互換",
    "back": "compatibility, interchangeability",
    "exampleJp": "新しいソフトウェアは、古いバージョンのシステムとも互換性を持つように設計されている。",
    "exampleTranslation": "The new software is designed to have compatibility with older versions of the system.",
    "tags": [
      "n1",
      "vocabulary",
      "reading",
      "formal"
    ],
    "sourceIds": [
      "n1-vocab-0698"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 698
  },
  {
    "category": "kanji",
    "front": "窮",
    "back": "destitution; extreme difficulty",
    "exampleJp": "彼は窮地に立たされても決して諦めなかった。",
    "exampleTranslation": "Even when placed in a desperate situation, he never gave up.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0001"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 699
  },
  {
    "category": "kanji",
    "front": "凝",
    "back": "stiffen; coagulate",
    "exampleJp": "この彫刻は細部にまで職人の技巧が凝らされている。",
    "exampleTranslation": "This sculpture features the craftsman's skill concentrated in every detail.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0002"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 700
  },
  {
    "category": "kanji",
    "front": "暁",
    "back": "dawn; eventuality",
    "exampleJp": "プロジェクトが成功した暁には、皆で祝杯をあげよう。",
    "exampleTranslation": "In the event that the project succeeds, let's all raise a glass in celebration.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0003"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 701
  },
  {
    "category": "kanji",
    "front": "吟",
    "back": "recite; carefully examine",
    "exampleJp": "予算案については、もう少し吟味する必要がある。",
    "exampleTranslation": "We need to examine the proposed budget a little more carefully.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0004"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 702
  },
  {
    "category": "kanji",
    "front": "憩",
    "back": "recess; rest",
    "exampleJp": "公園には市民の憩いの場としてベンチが設置されている。",
    "exampleTranslation": "Benches are installed in the park as a place of rest for the citizens.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0005"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 703
  },
  {
    "category": "kanji",
    "front": "慶",
    "back": "jubilation; congratulate",
    "exampleJp": "両社の合併は、業界にとって慶賀すべき出来事である。",
    "exampleTranslation": "The merger of the two companies is a joyous event for the industry.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0006"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 704
  },
  {
    "category": "kanji",
    "front": "啓",
    "back": "disclose; enlighten",
    "exampleJp": "その本は、自己啓発を目的とした読者に広く支持されている。",
    "exampleTranslation": "The book is widely supported by readers aiming for self-enlightenment.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0007"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 705
  },
  {
    "category": "kanji",
    "front": "携",
    "back": "portable; carry",
    "exampleJp": "両国は経済分野で連携を深めることで合意した。",
    "exampleTranslation": "The two countries agreed to deepen cooperation in the economic sector.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0008"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 706
  },
  {
    "category": "kanji",
    "front": "渓",
    "back": "mountain stream",
    "exampleJp": "週末は都会の喧騒を離れ、美しい渓谷を散策した。",
    "exampleTranslation": "Over the weekend, I left the hustle and bustle of the city and strolled through a beautiful ravine.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0009"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 707
  },
  {
    "category": "kanji",
    "front": "契",
    "back": "pledge; promise",
    "exampleJp": "新しいシステムの導入を契機に、業務の効率化が進んだ。",
    "exampleTranslation": "Taking the introduction of the new system as an opportunity, operational efficiency improved.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0010"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 708
  },
  {
    "category": "kanji",
    "front": "蛍",
    "back": "firefly",
    "exampleJp": "夏の夜、川辺で無数の蛍が幻想的な光を放っていた。",
    "exampleTranslation": "On a summer night, countless fireflies emitted a magical light by the riverside.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0011"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 709
  },
  {
    "category": "kanji",
    "front": "鯨",
    "back": "whale",
    "exampleJp": "捕鯨問題については、国際的な議論が続いている。",
    "exampleTranslation": "International debate continues regarding the whaling issue.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0012"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 710
  },
  {
    "category": "kanji",
    "front": "傑",
    "back": "greatness; excellence",
    "exampleJp": "彼の最新作は、これまでの作品の中でも傑作と評価されている。",
    "exampleTranslation": "His latest work is evaluated as a masterpiece even among his past works.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0013"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 711
  },
  {
    "category": "kanji",
    "front": "潔",
    "back": "undefiled; pure",
    "exampleJp": "彼女の潔い態度は、多くの人から共感を呼んだ。",
    "exampleTranslation": "Her graceful attitude garnered sympathy from many people.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0014"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 712
  },
  {
    "category": "kanji",
    "front": "絹",
    "back": "silk",
    "exampleJp": "このドレスは最高級の絹で作られており、肌触りが非常に滑らかだ。",
    "exampleTranslation": "This dress is made of the finest silk and has a very smooth texture.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0015"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 713
  },
  {
    "category": "kanji",
    "front": "遣",
    "back": "dispatch; send",
    "exampleJp": "人員不足を補うため、他部署から応援が派遣された。",
    "exampleTranslation": "To compensate for the staff shortage, reinforcements were dispatched from another department.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0016"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 714
  },
  {
    "category": "kanji",
    "front": "幻",
    "back": "phantom; illusion",
    "exampleJp": "彼が見たという巨大な生物は、ただの幻覚だったのかもしれない。",
    "exampleTranslation": "The giant creature he claimed to have seen might have just been a hallucination.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0017"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 715
  },
  {
    "category": "kanji",
    "front": "弦",
    "back": "bowstring; chord",
    "exampleJp": "バイオリンの弦が切れてしまったので、新しいものに張り替えた。",
    "exampleTranslation": "The violin string broke, so I replaced it with a new one.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0018"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 716
  },
  {
    "category": "kanji",
    "front": "孤",
    "back": "orphan; alone",
    "exampleJp": "その老人は、親族もなく孤独な生活を送っていた。",
    "exampleTranslation": "The old man was living a solitary life with no relatives.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0019"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 717
  },
  {
    "category": "kanji",
    "front": "枯",
    "back": "wither; die",
    "exampleJp": "長引く日照りの影響で、畑の作物がすっかり枯れてしまった。",
    "exampleTranslation": "Due to the prolonged drought, the crops in the field completely withered.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0020"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 718
  },
  {
    "category": "kanji",
    "front": "誇",
    "back": "boast; pride",
    "exampleJp": "私たちのチームは、業界ナンバーワンの売上を誇っている。",
    "exampleTranslation": "Our team boasts the number one sales in the industry.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0021"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 719
  },
  {
    "category": "kanji",
    "front": "顧",
    "back": "look back; review",
    "exampleJp": "顧客のニーズを的確に把握することが、マーケティングの基本だ。",
    "exampleTranslation": "Accurately grasping customer needs is the foundation of marketing.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0022"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 720
  },
  {
    "category": "kanji",
    "front": "箇",
    "back": "item; counter",
    "exampleJp": "契約書の該当箇所を修正し、再度提出してください。",
    "exampleTranslation": "Please revise the relevant sections of the contract and resubmit it.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0023"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 721
  },
  {
    "category": "kanji",
    "front": "拓",
    "back": "clear; open",
    "exampleJp": "未開の地を開拓し、新しいビジネスの拠点を築く。",
    "exampleTranslation": "We will pioneer uncultivated lands and build a new business base.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0024"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 722
  },
  {
    "category": "kanji",
    "front": "鐘",
    "back": "bell; chime",
    "exampleJp": "大晦日の夜には、寺の鐘の音が遠くまで響き渡る。",
    "exampleTranslation": "On New Year's Eve, the sound of the temple bell echoes far into the distance.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0025"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 723
  },
  {
    "category": "kanji",
    "front": "錠",
    "back": "lock; pill",
    "exampleJp": "セキュリティを強化するため、ドアに二重の錠を設置した。",
    "exampleTranslation": "To enhance security, a double lock was installed on the door.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0026"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 724
  },
  {
    "category": "kanji",
    "front": "譲",
    "back": "defer; turnover",
    "exampleJp": "彼は後進に道を譲り、第一線から退く決意をした。",
    "exampleTranslation": "He decided to yield the path to his juniors and step back from the front lines.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0027"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 725
  },
  {
    "category": "kanji",
    "front": "醸",
    "back": "brew; cause",
    "exampleJp": "この地域では、豊かな自然環境を利用してワインが醸造されている。",
    "exampleTranslation": "In this region, wine is brewed utilizing the rich natural environment.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0028"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 726
  },
  {
    "category": "kanji",
    "front": "嘱",
    "back": "entrust; request",
    "exampleJp": "専門家に調査を委嘱し、客観的な意見を求めることにした。",
    "exampleTranslation": "We decided to commission an expert for the investigation to seek an objective opinion.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0029"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 727
  },
  {
    "category": "kanji",
    "front": "殖",
    "back": "multiply; increase",
    "exampleJp": "バクテリアの繁殖を抑えるため、衛生管理を徹底している。",
    "exampleTranslation": "To suppress the breeding of bacteria, sanitation management is strictly enforced.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0030"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 728
  },
  {
    "category": "kanji",
    "front": "辱",
    "back": "embarrass; humiliate",
    "exampleJp": "公衆の面前で侮辱された彼は、怒りを隠しきれなかった。",
    "exampleTranslation": "Insulted in front of the public, he could not hide his anger.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0031"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 729
  },
  {
    "category": "kanji",
    "front": "侵",
    "back": "invade; raid",
    "exampleJp": "他人のプライバシーを侵害するような行為は許されない。",
    "exampleTranslation": "Actions that infringe upon the privacy of others are unacceptable.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0032"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 730
  },
  {
    "category": "kanji",
    "front": "唇",
    "back": "lips",
    "exampleJp": "彼女の唇には、微かな笑みが浮かんでいた。",
    "exampleTranslation": "A faint smile played on her lips.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0033"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 731
  },
  {
    "category": "kanji",
    "front": "娠",
    "back": "pregnancy",
    "exampleJp": "妻の妊娠が分かり、家族全員が喜びに包まれた。",
    "exampleTranslation": "Upon learning of his wife's pregnancy, the whole family was enveloped in joy.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0034"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 732
  },
  {
    "category": "kanji",
    "front": "慎",
    "back": "humility; be careful",
    "exampleJp": "発言が誤解を招かないよう、慎重に言葉を選ぶ必要がある。",
    "exampleTranslation": "It is necessary to choose words carefully so that statements do not invite misunderstanding.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0035"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 733
  },
  {
    "category": "kanji",
    "front": "振",
    "back": "shake; wave",
    "exampleJp": "地域の活性化に向けて、観光産業の振興策が打ち出された。",
    "exampleTranslation": "To revitalize the region, promotion measures for the tourism industry were rolled out.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0036"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 734
  },
  {
    "category": "kanji",
    "front": "浸",
    "back": "immerse; soak",
    "exampleJp": "新しい文化に浸ることで、自身の視野が大きく広がった。",
    "exampleTranslation": "By immersing myself in a new culture, my own perspective broadened significantly.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0037"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 735
  },
  {
    "category": "kanji",
    "front": "紳",
    "back": "gentleman",
    "exampleJp": "彼の振る舞いは常に紳士的であり、誰からも好感を持たれている。",
    "exampleTranslation": "His behavior is always gentlemanly, and he is well-liked by everyone.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0038"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 736
  },
  {
    "category": "kanji",
    "front": "薪",
    "back": "firewood",
    "exampleJp": "冬に備えて、山で大量の薪を割って保管しておいた。",
    "exampleTranslation": "In preparation for winter, we chopped and stored a large amount of firewood in the mountains.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0039"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 737
  },
  {
    "category": "kanji",
    "front": "迅",
    "back": "swift; fast",
    "exampleJp": "災害発生時には、迅速な情報伝達が被害を最小限に抑える鍵となる。",
    "exampleTranslation": "In the event of a disaster, swift information transmission is the key to minimizing damage.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0040"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 738
  },
  {
    "category": "kanji",
    "front": "甚",
    "back": "tremendously; very",
    "exampleJp": "その政策が経済に与えた影響は甚大であった。",
    "exampleTranslation": "The impact that policy had on the economy was immense.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0041"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 739
  },
  {
    "category": "kanji",
    "front": "陣",
    "back": "camp; battle array",
    "exampleJp": "新製品の発表を控え、経営陣は最終的な戦略会議を開いた。",
    "exampleTranslation": "Ahead of the new product announcement, the management team held a final strategy meeting.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0042"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 740
  },
  {
    "category": "kanji",
    "front": "尋",
    "back": "inquire; fathom",
    "exampleJp": "不明な点があったため、担当者に詳細を尋ねてみた。",
    "exampleTranslation": "Since there were unclear points, I inquired with the person in charge for details.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0043"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 741
  },
  {
    "category": "kanji",
    "front": "腎",
    "back": "kidney",
    "exampleJp": "健康診断で腎臓の機能にわずかな低下が見られた。",
    "exampleTranslation": "A slight decline in kidney function was observed during the health checkup.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0044"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 742
  },
  {
    "category": "kanji",
    "front": "須",
    "back": "ought; must",
    "exampleJp": "このプロジェクトを成功させるには、全社員の協力が必須である。",
    "exampleTranslation": "The cooperation of all employees is essential for the success of this project.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0045"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 743
  },
  {
    "category": "kanji",
    "front": "炊",
    "back": "cook; boil",
    "exampleJp": "キャンプ場では、自分たちで火を起こしてご飯を炊いた。",
    "exampleTranslation": "At the campsite, we started a fire and cooked rice ourselves.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0046"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 744
  },
  {
    "category": "kanji",
    "front": "帥",
    "back": "commander; leading troops",
    "exampleJp": "彼は新設された軍隊の統帥権を握り、指揮を執ることになった。",
    "exampleTranslation": "He took supreme command of the newly established army and assumed leadership.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0047"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 745
  },
  {
    "category": "kanji",
    "front": "粋",
    "back": "chic; essence",
    "exampleJp": "日本の伝統美の粋を集めた建築が、そこにはあった。",
    "exampleTranslation": "There stood an architecture that gathered the essence of Japan's traditional beauty.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0048"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 746
  },
  {
    "category": "kanji",
    "front": "衰",
    "back": "decline; wane",
    "exampleJp": "年齢とともに体力が衰えるのは、自然な現象である。",
    "exampleTranslation": "It is a natural phenomenon that physical strength declines with age.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0049"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 747
  },
  {
    "category": "kanji",
    "front": "酔",
    "back": "drunk; feel sick",
    "exampleJp": "聴衆は彼女の美しい歌声にすっかり魅惑され、酔いしれていた。",
    "exampleTranslation": "The audience was completely captivated and intoxicated by her beautiful singing voice.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0050"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 748
  },
  {
    "category": "kanji",
    "front": "遂",
    "back": "consummate; accomplish",
    "exampleJp": "長年の研究がついに実を結び、彼は大きな目的を遂げた。",
    "exampleTranslation": "Years of research finally bore fruit, and he accomplished a great objective.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0051"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 749
  },
  {
    "category": "kanji",
    "front": "髄",
    "back": "marrow; pith",
    "exampleJp": "この本には、著者の人生経験の真髄が書かれている。",
    "exampleTranslation": "The true essence of the author's life experience is written in this book.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0052"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 750
  },
  {
    "category": "kanji",
    "front": "枢",
    "back": "hinge; pivot",
    "exampleJp": "彼は国家の枢要な地位に就き、重要な政策決定に関与している。",
    "exampleTranslation": "He took a pivotal position in the state and is involved in important policy decisions.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0053"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 751
  },
  {
    "category": "kanji",
    "front": "崇",
    "back": "adore; revere",
    "exampleJp": "古代の人々は、自然の脅威に対して畏敬と崇拝の念を抱いていた。",
    "exampleTranslation": "Ancient people held feelings of awe and worship toward the threats of nature.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0054"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 752
  },
  {
    "category": "kanji",
    "front": "据",
    "back": "set; fix",
    "exampleJp": "防犯カメラを入り口に据え付けることで、不審者の侵入を防ぐ。",
    "exampleTranslation": "By installing security cameras at the entrance, we prevent the intrusion of suspicious individuals.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0055"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 753
  },
  {
    "category": "kanji",
    "front": "杉",
    "back": "cedar",
    "exampleJp": "春になると、杉の花粉が飛散してアレルギー患者を悩ませる。",
    "exampleTranslation": "When spring comes, the scattering of cedar pollen troubles allergy sufferers.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0056"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 754
  },
  {
    "category": "kanji",
    "front": "澄",
    "back": "lucidity; be clear",
    "exampleJp": "山頂の湖は、底まで見えるほど水が澄み切っていた。",
    "exampleTranslation": "The lake at the summit was so perfectly clear that one could see to the bottom.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0057"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 755
  },
  {
    "category": "kanji",
    "front": "瀬",
    "back": "rapids; current",
    "exampleJp": "交渉は最終的な瀬戸際に立たされており、予断を許さない状況だ。",
    "exampleTranslation": "The negotiations stand on the final brink, presenting an unpredictable situation.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0058"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 756
  },
  {
    "category": "kanji",
    "front": "畝",
    "back": "furrow; ridge",
    "exampleJp": "農夫はトラクターを使って、畑に真っ直ぐな畝を作っていった。",
    "exampleTranslation": "The farmer used a tractor to make straight furrows in the field.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0059"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 757
  },
  {
    "category": "kanji",
    "front": "是",
    "back": "right; correct",
    "exampleJp": "その提案は是か非か、委員会で激しい議論が交わされた。",
    "exampleTranslation": "A fierce debate took place in the committee over whether the proposal was right or wrong.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0060"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 758
  },
  {
    "category": "kanji",
    "front": "姓",
    "back": "surname",
    "exampleJp": "結婚を機に彼女は夫の姓を名乗ることになった。",
    "exampleTranslation": "Taking the opportunity of her marriage, she decided to take her husband's surname.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0061"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 759
  },
  {
    "category": "kanji",
    "front": "征",
    "back": "subjugate; expedition",
    "exampleJp": "新たな市場を求めて、海外への遠征調査団が組織された。",
    "exampleTranslation": "An expeditionary survey team to overseas was organized in search of new markets.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0062"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 760
  },
  {
    "category": "kanji",
    "front": "牲",
    "back": "sacrifice",
    "exampleJp": "平和な社会を築くために、多くの犠牲が払われた。",
    "exampleTranslation": "Many sacrifices were made in order to build a peaceful society.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0063"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 761
  },
  {
    "category": "kanji",
    "front": "誓",
    "back": "vow; swear",
    "exampleJp": "新郎新婦は、永遠の愛を誓い合った。",
    "exampleTranslation": "The bride and groom pledged eternal love to each other.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0064"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 762
  },
  {
    "category": "kanji",
    "front": "請",
    "back": "solicit; request",
    "exampleJp": "市民からの強い要請を受け、行政は対策に乗り出した。",
    "exampleTranslation": "In response to strong requests from citizens, the administration took action on countermeasures.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0065"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 763
  },
  {
    "category": "kanji",
    "front": "逝",
    "back": "departed; die",
    "exampleJp": "長年音楽界を牽引してきた巨匠が急逝し、多くのファンが悲しんだ。",
    "exampleTranslation": "The sudden passing of the maestro who led the music world for many years saddened many fans.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0066"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 764
  },
  {
    "category": "kanji",
    "front": "斉",
    "back": "adjusted; alike",
    "exampleJp": "合図とともに、参加者全員が一斉に走り出した。",
    "exampleTranslation": "At the signal, all participants started running all at once.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0067"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 765
  },
  {
    "category": "kanji",
    "front": "凄",
    "back": "uncanny; fierce",
    "exampleJp": "昨夜の台風の凄まじい風で、多くの看板が吹き飛ばされた。",
    "exampleTranslation": "Due to the fierce winds of last night's typhoon, many signboards were blown away.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0068"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 766
  },
  {
    "category": "kanji",
    "front": "婿",
    "back": "bridegroom",
    "exampleJp": "彼の一人娘が結婚し、優秀な婿を迎えることになった。",
    "exampleTranslation": "His only daughter married, and they welcomed an excellent son-in-law.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0069"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 767
  },
  {
    "category": "kanji",
    "front": "繊",
    "back": "slender; fine",
    "exampleJp": "この布地は非常に繊維が細かく、肌触りが良い。",
    "exampleTranslation": "This fabric has very fine fibers and feels good to the touch.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0070"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 768
  },
  {
    "category": "kanji",
    "front": "旋",
    "back": "rotation; go around",
    "exampleJp": "プロペラが高速で旋回し、ヘリコプターが空へと舞い上がった。",
    "exampleTranslation": "The propellers rotated at high speed, and the helicopter soared into the sky.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0071"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 769
  },
  {
    "category": "kanji",
    "front": "泉",
    "back": "spring; fountain",
    "exampleJp": "山奥にひっそりと湧き出る温泉は、秘湯として知られている。",
    "exampleTranslation": "The hot spring quietly bubbling up deep in the mountains is known as a hidden bath.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0072"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 770
  },
  {
    "category": "kanji",
    "front": "潜",
    "back": "submerge; conceal",
    "exampleJp": "スパイは敵対組織の内部に長期間潜入していた。",
    "exampleTranslation": "The spy had infiltrated the hostile organization for a long period of time.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0073"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 771
  },
  {
    "category": "kanji",
    "front": "煎",
    "back": "roast; pan-fry",
    "exampleJp": "良質な茶葉を丁寧に焙煎することで、香ばしい風味が引き出される。",
    "exampleTranslation": "By carefully roasting high-quality tea leaves, a fragrant flavor is brought out.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0074"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 772
  },
  {
    "category": "kanji",
    "front": "挑",
    "back": "challenge; contend",
    "exampleJp": "彼は前人未到の世界記録に挑戦し、見事に成功を収めた。",
    "exampleTranslation": "He challenged the unprecedented world record and achieved a splendid success.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0075"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 773
  },
  {
    "category": "kanji",
    "front": "眺",
    "back": "stare; view",
    "exampleJp": "展望台から見下ろす夜景は、息をのむほど素晴らしい眺めだった。",
    "exampleTranslation": "The night view looking down from the observation deck was a breathtaking sight.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0076"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 774
  },
  {
    "category": "kanji",
    "front": "釣",
    "back": "angling; fish",
    "exampleJp": "休日には湖畔で釣りをして、静かな時間を楽しむのが私の趣味だ。",
    "exampleTranslation": "My hobby is enjoying quiet time fishing by the lake on my days off.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0077"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 775
  },
  {
    "category": "kanji",
    "front": "懲",
    "back": "penal; chastise",
    "exampleJp": "規則に違反した社員には、厳格な懲戒処分が下された。",
    "exampleTranslation": "Strict disciplinary action was taken against the employee who violated the rules.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0078"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 776
  },
  {
    "category": "kanji",
    "front": "勅",
    "back": "imperial order",
    "exampleJp": "天皇の勅命により、新たな歴史書の編纂が開始された。",
    "exampleTranslation": "By imperial decree of the Emperor, the compilation of a new historical record began.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0079"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 777
  },
  {
    "category": "kanji",
    "front": "捗",
    "back": "make progress",
    "exampleJp": "システムの開発作業は、予定通り順調に進捗している。",
    "exampleTranslation": "The system development work is making smooth progress as scheduled.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0080"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 778
  },
  {
    "category": "kanji",
    "front": "沈",
    "back": "sink; be submerged",
    "exampleJp": "夕日が地平線に沈む光景は、いつ見ても美しい。",
    "exampleTranslation": "The sight of the evening sun sinking below the horizon is always beautiful to see.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0081"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 779
  },
  {
    "category": "kanji",
    "front": "珍",
    "back": "rare; curious",
    "exampleJp": "この植物は特定の地域にしか生息しない、非常に珍しい品種だ。",
    "exampleTranslation": "This plant is a very rare variety that only inhabits specific regions.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0082"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 780
  },
  {
    "category": "kanji",
    "front": "賃",
    "back": "fare; wages",
    "exampleJp": "物価の上昇に伴い、最低賃金の引き上げが議論されている。",
    "exampleTranslation": "With the rise in prices, an increase in the minimum wage is being debated.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0083"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 781
  },
  {
    "category": "kanji",
    "front": "鎮",
    "back": "tranquilize; appease",
    "exampleJp": "政府は事態を重く受け止め、早急な鎮静化に向けて動いた。",
    "exampleTranslation": "Taking the situation seriously, the government moved toward a rapid tranquilization of the matter.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0084"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 782
  },
  {
    "category": "kanji",
    "front": "陳",
    "back": "exhibit; state",
    "exampleJp": "被告は法廷において、事件当日のアリバイを陳述した。",
    "exampleTranslation": "The defendant stated his alibi for the day of the incident in the courtroom.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0085"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 783
  },
  {
    "category": "kanji",
    "front": "津",
    "back": "haven; port",
    "exampleJp": "津波の被害を防ぐため、沿岸部に巨大な防潮堤が建設された。",
    "exampleTranslation": "To prevent tsunami damage, a massive seawall was constructed along the coast.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0086"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 784
  },
  {
    "category": "kanji",
    "front": "墜",
    "back": "crash; fall",
    "exampleJp": "飛行機が山中に墜落したというニュースが世界中を駆け巡った。",
    "exampleTranslation": "The news that an airplane crashed in the mountains spread all over the world.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0087"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 785
  },
  {
    "category": "kanji",
    "front": "椎",
    "back": "spine; mallet",
    "exampleJp": "交通事故で脊椎に損傷を負い、長期のリハビリが必要となった。",
    "exampleTranslation": "Sustaining damage to the spine in a traffic accident, long-term rehabilitation became necessary.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0088"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 786
  },
  {
    "category": "kanji",
    "front": "追",
    "back": "chase; drive away",
    "exampleJp": "警察は逃走中の容疑者を徹底的に追跡している。",
    "exampleTranslation": "The police are thoroughly tracking the suspect who is on the run.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0089"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 787
  },
  {
    "category": "kanji",
    "front": "痛",
    "back": "pain; hurt",
    "exampleJp": "急激な円高は、輸出産業にとって痛手となった。",
    "exampleTranslation": "The rapid appreciation of the yen dealt a severe blow to the export industry.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0090"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 788
  },
  {
    "category": "kanji",
    "front": "坪",
    "back": "two-mat area",
    "exampleJp": "新しいオフィスの広さは、およそ百坪ほどだ。",
    "exampleTranslation": "The area of the new office is approximately one hundred tsubo.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0091"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 789
  },
  {
    "category": "kanji",
    "front": "呈",
    "back": "display; offer",
    "exampleJp": "この問題は、複雑な様相を呈してきている。",
    "exampleTranslation": "This problem has begun to exhibit a complex aspect.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0092"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 790
  },
  {
    "category": "kanji",
    "front": "堤",
    "back": "dike; bank",
    "exampleJp": "大雨の影響で河川が氾濫し、堤防が決壊する恐れがある。",
    "exampleTranslation": "Due to heavy rain, the river flooded and there is a fear that the levee might collapse.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0093"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 791
  },
  {
    "category": "kanji",
    "front": "廷",
    "back": "courts; imperial court",
    "exampleJp": "証人は法廷の証言台に立ち、真実を語ることを誓った。",
    "exampleTranslation": "The witness stood at the stand in the courtroom and swore to tell the truth.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0094"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 792
  },
  {
    "category": "kanji",
    "front": "抵",
    "back": "resist; reach",
    "exampleJp": "政府の強引な法案成立に対し、野党は強く抵抗した。",
    "exampleTranslation": "The opposition party strongly resisted the government's forcible passage of the bill.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0095"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 793
  },
  {
    "category": "kanji",
    "front": "締",
    "back": "tighten; tie",
    "exampleJp": "両国間で新たな自由貿易協定が締結された。",
    "exampleTranslation": "A new free trade agreement was concluded between the two countries.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0096"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 794
  },
  {
    "category": "kanji",
    "front": "亭",
    "back": "pavilion; restaurant",
    "exampleJp": "老舗の料亭で、季節の食材をふんだんに使った会席料理を堪能した。",
    "exampleTranslation": "We fully enjoyed a traditional multi-course meal using plenty of seasonal ingredients at a well-established Japanese restaurant.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0097"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 795
  },
  {
    "category": "kanji",
    "front": "貞",
    "back": "upright; chastity",
    "exampleJp": "彼女の貞潔な人柄は、周囲の誰からも尊敬されていた。",
    "exampleTranslation": "Her chaste and upright character was respected by everyone around her.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0098"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 796
  },
  {
    "category": "kanji",
    "front": "帝",
    "back": "sovereign; emperor",
    "exampleJp": "かつてこの地域一帯を支配していた巨大な帝国は、滅亡した。",
    "exampleTranslation": "The massive empire that once ruled this entire region fell into ruin.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0099"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 797
  },
  {
    "category": "kanji",
    "front": "訂",
    "back": "revise; correct",
    "exampleJp": "マニュアルに誤記が見つかったため、すぐに改訂版が発行された。",
    "exampleTranslation": "Since typographical errors were found in the manual, a revised edition was immediately issued.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0100"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 798
  },
  {
    "category": "kanji",
    "front": "逓",
    "back": "relay; in turn",
    "exampleJp": "通信技術の発達により、古い逓信システムは姿を消した。",
    "exampleTranslation": "With the development of communication technology, the old relay communication system disappeared.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0101"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 799
  },
  {
    "category": "kanji",
    "front": "邸",
    "back": "residence; mansion",
    "exampleJp": "大通りから少し入ったところに、立派な邸宅が建ち並んでいる。",
    "exampleTranslation": "Just a bit off the main street, magnificent mansions stand in a row.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0102"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 800
  },
  {
    "category": "kanji",
    "front": "泥",
    "back": "mud; adhere",
    "exampleJp": "選挙戦は、互いのスキャンダルを暴露し合う泥沼の様相を呈した。",
    "exampleTranslation": "The election campaign took on the appearance of a quagmire, with each side exposing the other's scandals.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0103"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 801
  },
  {
    "category": "kanji",
    "front": "摘",
    "back": "pinch; expose",
    "exampleJp": "会計監査によって、経理部門の不正行為が摘発された。",
    "exampleTranslation": "Through the financial audit, fraudulent activities in the accounting department were exposed.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0104"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 802
  },
  {
    "category": "kanji",
    "front": "滴",
    "back": "drip; drop",
    "exampleJp": "葉の先から落ちる水滴が、静かな森に小さな音を響かせていた。",
    "exampleTranslation": "Water drops falling from the tips of the leaves echoed with a small sound in the quiet forest.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0105"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 803
  },
  {
    "category": "kanji",
    "front": "哲",
    "back": "philosophy; clear",
    "exampleJp": "彼は大学で東洋哲学を専攻し、古い思想を研究している。",
    "exampleTranslation": "He majors in Eastern philosophy at university and researches ancient thoughts.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0106"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 804
  },
  {
    "category": "kanji",
    "front": "典",
    "back": "code; ceremony",
    "exampleJp": "ノーベル賞の授賞式は、厳かな雰囲気の中で行われる典礼だ。",
    "exampleTranslation": "The Nobel Prize award ceremony is a ritual conducted in a solemn atmosphere.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0107"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 805
  },
  {
    "category": "kanji",
    "front": "展",
    "back": "unfold; expand",
    "exampleJp": "新技術の導入により、今後の事業展開が大きく期待されている。",
    "exampleTranslation": "With the introduction of new technology, future business expansion is highly anticipated.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0108"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 806
  },
  {
    "category": "kanji",
    "front": "添",
    "back": "annexed; accompany",
    "exampleJp": "申請書には、本人確認書類のコピーを添付してください。",
    "exampleTranslation": "Please attach a copy of your identity verification document to the application form.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0109"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 807
  },
  {
    "category": "kanji",
    "front": "殿",
    "back": "hall; palace",
    "exampleJp": "壮麗な宮殿の内部は、一般公開されており見学が可能だ。",
    "exampleTranslation": "The interior of the magnificent palace is open to the public and available for viewing.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0110"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 808
  },
  {
    "category": "kanji",
    "front": "哀",
    "back": "Sorrow; Grief",
    "exampleJp": "彼女の顔には深い哀しみの色が浮かんでいた。",
    "exampleTranslation": "A deep look of sorrow appeared on her face.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0111"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 809
  },
  {
    "category": "kanji",
    "front": "挨",
    "back": "Approach; Greet",
    "exampleJp": "新任の担当者として、取引先に挨拶回りをした。",
    "exampleTranslation": "As the newly appointed representative, I went around greeting our clients.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0112"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 810
  },
  {
    "category": "kanji",
    "front": "曖",
    "back": "Unclear; Dark",
    "exampleJp": "彼の曖昧な態度は、チーム全体に混乱を招いた。",
    "exampleTranslation": "His ambiguous attitude caused confusion among the entire team.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0113"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 811
  },
  {
    "category": "kanji",
    "front": "握",
    "back": "Grip; Grasp",
    "exampleJp": "経営陣は市場の動向を正確に把握する必要がある。",
    "exampleTranslation": "The management team needs to accurately grasp market trends.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0114"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 812
  },
  {
    "category": "kanji",
    "front": "宛",
    "back": "Address; Allocate",
    "exampleJp": "この書類を記載の宛先に転送してください。",
    "exampleTranslation": "Please forward this document to the listed address.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0115"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 813
  },
  {
    "category": "kanji",
    "front": "嵐",
    "back": "Storm",
    "exampleJp": "政治的なスキャンダルが報道され、嵐のような非難が巻き起こった。",
    "exampleTranslation": "A political scandal was reported, stirring up a storm of criticism.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0116"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 814
  },
  {
    "category": "kanji",
    "front": "畏",
    "back": "Fear; Awe",
    "exampleJp": "大自然の驚異を前にして、我々は畏敬の念を抱かざるを得ない。",
    "exampleTranslation": "Faced with the wonders of nature, we cannot help but feel a sense of awe.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0117"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 815
  },
  {
    "category": "kanji",
    "front": "尉",
    "back": "Military Officer",
    "exampleJp": "彼は退役するまで大尉として部隊を指揮した。",
    "exampleTranslation": "He commanded the unit as a captain until his retirement.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0118"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 816
  },
  {
    "category": "kanji",
    "front": "萎",
    "back": "Wither; Droop",
    "exampleJp": "厳しい批判を受け続け、彼の心はすっかり萎縮してしまった。",
    "exampleTranslation": "Enduring continuous harsh criticism, his spirit became completely withered.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0119"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 817
  },
  {
    "category": "kanji",
    "front": "椅",
    "back": "Chair",
    "exampleJp": "議長は静かに椅子から立ち上がり、最終決定を下した。",
    "exampleTranslation": "The chairman quietly rose from his chair and delivered the final decision.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0120"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 818
  },
  {
    "category": "kanji",
    "front": "彙",
    "back": "Vocabulary",
    "exampleJp": "外国語の習得において、豊富な語彙力は不可欠である。",
    "exampleTranslation": "An extensive vocabulary is essential for mastering a foreign language.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0121"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 819
  },
  {
    "category": "kanji",
    "front": "茨",
    "back": "Thorn",
    "exampleJp": "独立への道は決して平坦ではなく、茨の道であった。",
    "exampleTranslation": "The path to independence was by no means smooth; it was a thorny path.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0122"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 820
  },
  {
    "category": "kanji",
    "front": "咽",
    "back": "Throat; Choke",
    "exampleJp": "スモッグが街を覆い、多くの人が咽喉の痛みを訴えた。",
    "exampleTranslation": "Smog covered the city, and many people complained of sore throats.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0123"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 821
  },
  {
    "category": "kanji",
    "front": "淫",
    "back": "Lewdness; Indulge",
    "exampleJp": "彼は権力に溺れ、自堕落で淫らな生活を送るようになった。",
    "exampleTranslation": "He drowned in power and began living a depraved, dissolute life.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0124"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 822
  },
  {
    "category": "kanji",
    "front": "陰",
    "back": "Shadow; Hidden",
    "exampleJp": "その歴史的事件の陰には、巨大な陰謀が隠されていた。",
    "exampleTranslation": "Behind that historical incident lay a massive conspiracy.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0125"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 823
  },
  {
    "category": "kanji",
    "front": "隠",
    "back": "Hide; Conceal",
    "exampleJp": "企業は不祥事を隠蔽しようとしたが、内部告発によって露見した。",
    "exampleTranslation": "The company attempted to cover up the scandal, but it was exposed by a whistleblower.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0126"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 824
  },
  {
    "category": "kanji",
    "front": "韻",
    "back": "Rhyme; Tone",
    "exampleJp": "演説が終わった後も、彼の言葉は長く余韻を残した。",
    "exampleTranslation": "Even after the speech ended, his words left a lingering resonance.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0127"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 825
  },
  {
    "category": "kanji",
    "front": "鬱",
    "back": "Gloom; Depression",
    "exampleJp": "経済の停滞により、社会全体に憂鬱な空気が漂っている。",
    "exampleTranslation": "Due to economic stagnation, a gloomy atmosphere permeates the entire society.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0128"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 826
  },
  {
    "category": "kanji",
    "front": "浦",
    "back": "Bay; Inlet",
    "exampleJp": "その小さな漁村は、波の穏やかな浦に位置している。",
    "exampleTranslation": "That small fishing village is located in a bay with gentle waves.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0129"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 827
  },
  {
    "category": "kanji",
    "front": "詠",
    "back": "Recite; Compose",
    "exampleJp": "彼は故郷の美しい景色を伝統的な形式で詠んだ。",
    "exampleTranslation": "He composed a traditional poem about the beautiful scenery of his hometown.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0130"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 828
  },
  {
    "category": "kanji",
    "front": "影",
    "back": "Shadow; Influence",
    "exampleJp": "スクリーンに投影されたデータに基づき、活発な議論が行われた。",
    "exampleTranslation": "Based on the data projected onto the screen, an active discussion took place.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0131"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 829
  },
  {
    "category": "kanji",
    "front": "鋭",
    "back": "Sharp; Pointed",
    "exampleJp": "彼の鋭敏な感覚は、微細な市場の変化をすぐに察知した。",
    "exampleTranslation": "His sharp senses quickly detected minute changes in the market.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0132"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 830
  },
  {
    "category": "kanji",
    "front": "疫",
    "back": "Epidemic",
    "exampleJp": "専門家たちは新たなウイルスの疫学的調査を開始した。",
    "exampleTranslation": "Experts have initiated an epidemiological investigation of the new virus.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0133"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 831
  },
  {
    "category": "kanji",
    "front": "悦",
    "back": "Ecstasy; Joy",
    "exampleJp": "困難なプロジェクトを完遂し、彼は大きな喜悦を感じた。",
    "exampleTranslation": "Having completed the difficult project, he felt immense joy.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0134"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 832
  },
  {
    "category": "kanji",
    "front": "謁",
    "back": "Audience; Meeting",
    "exampleJp": "大使は国王との謁見を許され、親書を手渡した。",
    "exampleTranslation": "The ambassador was granted an audience with the king and handed over the official letter.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0135"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 833
  },
  {
    "category": "kanji",
    "front": "越",
    "back": "Cross; Exceed",
    "exampleJp": "他者を見下すことで得られる優越感は、真の自信とは言えない。",
    "exampleTranslation": "A sense of superiority gained by looking down on others cannot be called true confidence.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0136"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 834
  },
  {
    "category": "kanji",
    "front": "閲",
    "back": "Review; Inspection",
    "exampleJp": "図書館の貴重な資料は、特別な許可証がなければ閲覧できない。",
    "exampleTranslation": "The library's rare materials cannot be viewed without a special permit.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0137"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 835
  },
  {
    "category": "kanji",
    "front": "宴",
    "back": "Banquet; Feast",
    "exampleJp": "国際会議の最終日には、華やかな晩餐の宴が催された。",
    "exampleTranslation": "On the final day of the international conference, a glamorous banquet was held.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0138"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 836
  },
  {
    "category": "kanji",
    "front": "援",
    "back": "Aid; Help",
    "exampleJp": "政府は被災地への緊急援助物資の輸送を決定した。",
    "exampleTranslation": "The government decided to transport emergency relief supplies to the disaster area.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0139"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 837
  },
  {
    "category": "kanji",
    "front": "炎",
    "back": "Flame; Inflammation",
    "exampleJp": "検査の結果、関節に深刻な炎症が起きていることが判明した。",
    "exampleTranslation": "The examination results revealed severe inflammation in the joint.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0140"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 838
  },
  {
    "category": "kanji",
    "front": "鉛",
    "back": "Lead",
    "exampleJp": "その古い工場では、かつて大量の亜鉛が精製されていた。",
    "exampleTranslation": "In that old factory, large quantities of zinc used to be refined.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0141"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 839
  },
  {
    "category": "kanji",
    "front": "猿",
    "back": "Monkey; Ape",
    "exampleJp": "生物学者は類人猿の行動様式から人間の進化を研究している。",
    "exampleTranslation": "Biologists are studying human evolution through the behavioral patterns of anthropoid apes.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0142"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 840
  },
  {
    "category": "kanji",
    "front": "縁",
    "back": "Edge; Margin",
    "exampleJp": "両社は技術提携を機に、深い縁で結ばれることとなった。",
    "exampleTranslation": "Taking the technical tie-up as an opportunity, the two companies became deeply connected.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0143"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 841
  },
  {
    "category": "kanji",
    "front": "艶",
    "back": "Gloss; Charm",
    "exampleJp": "彼女の髪は手入れが行き届いており、艶やかな輝きを放っている。",
    "exampleTranslation": "Her hair is well cared for and emits a glossy shine.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0144"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 842
  },
  {
    "category": "kanji",
    "front": "汚",
    "back": "Dirty; Pollute",
    "exampleJp": "企業の癒着による汚職事件が次々と明るみに出た。",
    "exampleTranslation": "Corruption cases resulting from corporate collusion have repeatedly come to light.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0145"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 843
  },
  {
    "category": "kanji",
    "front": "凹",
    "back": "Concave",
    "exampleJp": "その道路は保守が不十分で、表面に激しい凹凸がある。",
    "exampleTranslation": "The road is poorly maintained and has severe irregularities on its surface.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0146"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 844
  },
  {
    "category": "kanji",
    "front": "旺",
    "back": "Flourishing",
    "exampleJp": "若い新入社員たちは、旺盛な好奇心を持って業務に取り組んでいる。",
    "exampleTranslation": "The young new employees are tackling their duties with robust curiosity.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0147"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 845
  },
  {
    "category": "kanji",
    "front": "翁",
    "back": "Old Man",
    "exampleJp": "村の長老である老翁は、静かに昔の伝説を語り始めた。",
    "exampleTranslation": "The village elder, a venerable old man, quietly began to recount an ancient legend.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0148"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 846
  },
  {
    "category": "kanji",
    "front": "奥",
    "back": "Inner; Depths",
    "exampleJp": "長年の修行の末、彼はついにその武術の奥義を極めた。",
    "exampleTranslation": "After years of rigorous training, he finally mastered the inner secrets of the martial art.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0149"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 847
  },
  {
    "category": "kanji",
    "front": "憶",
    "back": "Memory; Recollect",
    "exampleJp": "アルバムを開くと、幼い頃の幸せな追憶が蘇ってきた。",
    "exampleTranslation": "Opening the album, happy recollections of my childhood came flooding back.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0150"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 848
  },
  {
    "category": "kanji",
    "front": "臆",
    "back": "Cowardice",
    "exampleJp": "明確な根拠のない臆測で他人を批判するのは避けるべきだ。",
    "exampleTranslation": "We should avoid criticizing others based on baseless speculation.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0151"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 849
  },
  {
    "category": "kanji",
    "front": "虞",
    "back": "Fear; Uneasiness",
    "exampleJp": "この建設計画は、周囲の環境を破壊する虞がある。",
    "exampleTranslation": "There is a fear that this construction project will destroy the surrounding environment.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0152"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 850
  },
  {
    "category": "kanji",
    "front": "乙",
    "back": "Strange; Second",
    "exampleJp": "双方の提案は甲乙つけがたく、選考は難航した。",
    "exampleTranslation": "The proposals from both sides were hard to rank, making the selection process difficult.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0153"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 851
  },
  {
    "category": "kanji",
    "front": "卸",
    "back": "Wholesale",
    "exampleJp": "そのメーカーは、自社製品を全国の卸売業者に提供している。",
    "exampleTranslation": "The manufacturer provides its products to wholesalers nationwide.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0154"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 852
  },
  {
    "category": "kanji",
    "front": "穏",
    "back": "Calm; Gentle",
    "exampleJp": "事態をこれ以上悪化させないため、穏便な解決策を探るべきだ。",
    "exampleTranslation": "We should seek an amicable solution to prevent the situation from worsening further.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0155"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 853
  },
  {
    "category": "kanji",
    "front": "佳",
    "back": "Excellent",
    "exampleJp": "コンクールに応募した彼の作品は、見事に佳作として入賞した。",
    "exampleTranslation": "His submitted work for the competition impressively won an honorable mention.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0156"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 854
  },
  {
    "category": "kanji",
    "front": "寡",
    "back": "Widow; Minority",
    "exampleJp": "少数の大企業による市場の寡占状態は、価格競争を阻害する。",
    "exampleTranslation": "An oligopoly by a few large corporations hinders price competition.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0157"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 855
  },
  {
    "category": "kanji",
    "front": "架",
    "back": "Erect; Frame",
    "exampleJp": "詐欺師は架空の投資話を持ちかけ、多額の資金を騙し取った。",
    "exampleTranslation": "The scammer proposed a fictitious investment opportunity and swindled a large amount of funds.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0158"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 856
  },
  {
    "category": "kanji",
    "front": "禍",
    "back": "Calamity",
    "exampleJp": "パンデミックの禍根は、社会の様々な側面に深い傷を残した。",
    "exampleTranslation": "The root of the pandemic's calamity left deep scars on various aspects of society.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0159"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 857
  },
  {
    "category": "kanji",
    "front": "稼",
    "back": "Earnings",
    "exampleJp": "システムのメンテナンス中、サーバーは一時的に稼働を停止する。",
    "exampleTranslation": "During system maintenance, the server will temporarily cease operation.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0160"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 858
  },
  {
    "category": "kanji",
    "front": "餓",
    "back": "Starve",
    "exampleJp": "紛争地帯では、多くの子供たちが餓死の危機に瀕している。",
    "exampleTranslation": "In the conflict zone, many children are on the verge of starvation.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0161"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 859
  },
  {
    "category": "kanji",
    "front": "瓦",
    "back": "Tile",
    "exampleJp": "地震で建物が倒壊し、街全体が瓦礫の山と化した。",
    "exampleTranslation": "Buildings collapsed in the earthquake, turning the entire city into a mountain of rubble.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0162"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 860
  },
  {
    "category": "kanji",
    "front": "雅",
    "back": "Elegance",
    "exampleJp": "彼女の立ち振る舞いは優雅で、周囲の目を惹きつけた。",
    "exampleTranslation": "Her graceful demeanor attracted the attention of those around her.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0163"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 861
  },
  {
    "category": "kanji",
    "front": "塊",
    "back": "Lump; Clod",
    "exampleJp": "地下から巨大な金塊が発見され、考古学者たちを驚かせた。",
    "exampleTranslation": "A massive gold nugget was discovered underground, surprising the archaeologists.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0164"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 862
  },
  {
    "category": "kanji",
    "front": "壊",
    "back": "Break; Destroy",
    "exampleJp": "長年の酷使により、その精密機械はついに崩壊した。",
    "exampleTranslation": "Due to years of heavy use, the precision machine finally broke down completely.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0165"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 863
  },
  {
    "category": "kanji",
    "front": "懐",
    "back": "Pocket; Feelings",
    "exampleJp": "新しい技術の安全性に対して、専門家からも懐疑的な声が上がっている。",
    "exampleTranslation": "Skeptical voices regarding the safety of the new technology have been raised even by experts.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0166"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 864
  },
  {
    "category": "kanji",
    "front": "劾",
    "back": "Censure",
    "exampleJp": "議会は、大統領の違法行為に対する弾劾手続きを開始した。",
    "exampleTranslation": "The parliament initiated impeachment proceedings against the president for illegal acts.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0167"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 865
  },
  {
    "category": "kanji",
    "front": "崖",
    "back": "Cliff",
    "exampleJp": "車は操作を誤り、断崖絶壁から海へと転落した。",
    "exampleTranslation": "The car was mishandled and plunged from the steep cliff into the sea.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0168"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 866
  },
  {
    "category": "kanji",
    "front": "涯",
    "back": "Horizon; Shore",
    "exampleJp": "彼は生涯を懸けて、難病の治療法を研究し続けた。",
    "exampleTranslation": "He dedicated his entire life to researching a cure for the intractable disease.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0169"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 867
  },
  {
    "category": "kanji",
    "front": "蓋",
    "back": "Cover; Lid",
    "exampleJp": "真実を隠蔽しようとする行為は、臭い物に蓋をするようなものだ。",
    "exampleTranslation": "Attempting to cover up the truth is like trying to put a lid on something that smells.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0170"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 868
  },
  {
    "category": "kanji",
    "front": "街",
    "back": "Street",
    "exampleJp": "候補者は駅前で熱心な街頭演説を行い、支持を訴えた。",
    "exampleTranslation": "The candidate gave an impassioned street speech in front of the station, appealing for support.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0171"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 869
  },
  {
    "category": "kanji",
    "front": "該",
    "back": "Applicable",
    "exampleJp": "当該事件に関する詳細な報告書が、委員会に提出された。",
    "exampleTranslation": "A detailed report concerning the relevant incident was submitted to the committee.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0172"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 870
  },
  {
    "category": "kanji",
    "front": "概",
    "back": "Outline",
    "exampleJp": "新システムの概要については、次回の会議で説明します。",
    "exampleTranslation": "I will explain the outline of the new system at the next meeting.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0173"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 871
  },
  {
    "category": "kanji",
    "front": "郭",
    "back": "Enclosure",
    "exampleJp": "霧の中から、巨大な城の輪郭がぼんやりと浮かび上がった。",
    "exampleTranslation": "From the mist, the silhouette of a massive castle faintly emerged.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0174"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 872
  },
  {
    "category": "kanji",
    "front": "隔",
    "back": "Isolate",
    "exampleJp": "感染拡大を防ぐため、患者は特別な病棟に隔離された。",
    "exampleTranslation": "To prevent the spread of infection, the patient was isolated in a special ward.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0175"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 873
  },
  {
    "category": "kanji",
    "front": "獲",
    "back": "Seize",
    "exampleJp": "長い交渉の末、我々はついに有利な契約を獲得した。",
    "exampleTranslation": "After lengthy negotiations, we finally acquired an advantageous contract.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0176"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 874
  },
  {
    "category": "kanji",
    "front": "嚇",
    "back": "Menace; Threaten",
    "exampleJp": "相手国は軍事演習を通じて、あからさまな威嚇行動をとった。",
    "exampleTranslation": "The opposing country engaged in blatant acts of intimidation through military exercises.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0177"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 875
  },
  {
    "category": "kanji",
    "front": "岳",
    "back": "Peak; Mountain",
    "exampleJp": "険しい山岳地帯での救助活動は、極めて困難を極める。",
    "exampleTranslation": "Rescue operations in the rugged mountainous region are extremely difficult.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0178"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 876
  },
  {
    "category": "kanji",
    "front": "顎",
    "back": "Jaw; Chin",
    "exampleJp": "激しい運動の後、彼は息を切らして顎から汗を滴らせていた。",
    "exampleTranslation": "After intense exercise, he was out of breath, sweat dripping from his chin.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0179"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 877
  },
  {
    "category": "kanji",
    "front": "潟",
    "back": "Lagoon",
    "exampleJp": "その広大な干潟は、渡り鳥たちにとって重要な中継地となっている。",
    "exampleTranslation": "That vast tidal flat serves as an important stopover point for migratory birds.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0180"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 878
  },
  {
    "category": "kanji",
    "front": "括",
    "back": "Bundle; Fasten",
    "exampleJp": "各部門の意見を総括し、最終的な事業計画を策定する。",
    "exampleTranslation": "We will summarize the opinions of each department and formulate the final business plan.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0181"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 879
  },
  {
    "category": "kanji",
    "front": "喝",
    "back": "Scold; Shout",
    "exampleJp": "素晴らしい演奏が終わり、観客席から割れんばかりの喝采が起こった。",
    "exampleTranslation": "When the wonderful performance ended, thunderous applause erupted from the audience.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0182"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 880
  },
  {
    "category": "kanji",
    "front": "渇",
    "back": "Thirst",
    "exampleJp": "資源の枯渇問題は、次世代に重い課題を残している。",
    "exampleTranslation": "The problem of resource depletion leaves a heavy burden for the next generation.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0183"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 881
  },
  {
    "category": "kanji",
    "front": "褐",
    "back": "Brown",
    "exampleJp": "彼は太陽の下で働き、健康的な褐色の肌をしている。",
    "exampleTranslation": "Working under the sun, he has healthy brown skin.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0184"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 882
  },
  {
    "category": "kanji",
    "front": "轄",
    "back": "Control; Manage",
    "exampleJp": "この区域の治安維持は、地元の警察署が管轄している。",
    "exampleTranslation": "The local police station has jurisdiction over maintaining public order in this area.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0185"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 883
  },
  {
    "category": "kanji",
    "front": "且",
    "back": "Moreover",
    "exampleJp": "この製品は軽量であり、且つ耐久性にも優れている。",
    "exampleTranslation": "This product is lightweight, and moreover, it boasts excellent durability.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0186"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 884
  },
  {
    "category": "kanji",
    "front": "缶",
    "back": "Can",
    "exampleJp": "非常時に備えて、水と缶詰の食料を備蓄しておくべきだ。",
    "exampleTranslation": "We should stockpile water and canned food in preparation for emergencies.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0187"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 885
  },
  {
    "category": "kanji",
    "front": "陥",
    "back": "Fall into",
    "exampleJp": "不適切な会計処理が発覚し、企業は深刻な危機に陥った。",
    "exampleTranslation": "With the discovery of improper accounting, the company fell into a severe crisis.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0188"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 886
  },
  {
    "category": "kanji",
    "front": "患",
    "back": "Afflicted",
    "exampleJp": "病院は、慢性疾患を抱える患者のための新しい支援プログラムを導入した。",
    "exampleTranslation": "The hospital introduced a new support program for patients with chronic illnesses.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0189"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 887
  },
  {
    "category": "kanji",
    "front": "堪",
    "back": "Endure",
    "exampleJp": "事故の現場は、見るに堪えないほどの惨状であった。",
    "exampleTranslation": "The scene of the accident was a horrific sight that was unbearable to look at.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0190"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 888
  },
  {
    "category": "kanji",
    "front": "棺",
    "back": "Coffin",
    "exampleJp": "遺体は美しい花々とともに棺に納められ、静かに見送られた。",
    "exampleTranslation": "The body was placed in a coffin along with beautiful flowers and quietly sent off.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0191"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 889
  },
  {
    "category": "kanji",
    "front": "款",
    "back": "Article; Clause",
    "exampleJp": "法人の設立にあたり、目的や組織を定めた定款を作成した。",
    "exampleTranslation": "Upon establishing the corporation, we drafted the articles of incorporation outlining its purpose and structure.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0192"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 890
  },
  {
    "category": "kanji",
    "front": "憾",
    "back": "Remorse; Regret",
    "exampleJp": "今回の不祥事に対し、経営陣は深い遺憾の意を表明した。",
    "exampleTranslation": "The management expressed deep regret over the recent scandal.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0193"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 891
  },
  {
    "category": "kanji",
    "front": "還",
    "back": "Return; Restore",
    "exampleJp": "占領地は平和条約に基づき、本来の領土として返還された。",
    "exampleTranslation": "Based on the peace treaty, the occupied territory was returned as original land.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0194"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 892
  },
  {
    "category": "kanji",
    "front": "艦",
    "back": "Warship",
    "exampleJp": "海軍は最新鋭のレーダーを搭載した艦隊を配備した。",
    "exampleTranslation": "The navy deployed a fleet equipped with state-of-the-art radar.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0195"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 893
  },
  {
    "category": "kanji",
    "front": "頑",
    "back": "Stubborn",
    "exampleJp": "彼は頑固な職人であり、伝統的な製法を決して変えようとしない。",
    "exampleTranslation": "He is a stubborn artisan who refuses to change traditional manufacturing methods.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0196"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 894
  },
  {
    "category": "kanji",
    "front": "伎",
    "back": "Skill; Deed",
    "exampleJp": "歌舞伎は日本を代表する伝統芸能であり、世界中で評価されている。",
    "exampleTranslation": "Kabuki is a representative traditional performing art of Japan and is highly regarded worldwide.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0197"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 895
  },
  {
    "category": "kanji",
    "front": "忌",
    "back": "Mourning; Abhor",
    "exampleJp": "彼は責任を問われることを忌避し、曖昧な返答を繰り返した。",
    "exampleTranslation": "Evading accountability, he repeatedly gave ambiguous responses.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0198"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 896
  },
  {
    "category": "kanji",
    "front": "奇",
    "back": "Strange",
    "exampleJp": "彼の奇抜なアイデアは、最初は誰にも理解されなかった。",
    "exampleTranslation": "His eccentric ideas were not understood by anyone at first.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0199"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 897
  },
  {
    "category": "kanji",
    "front": "祈",
    "back": "Pray",
    "exampleJp": "新しい年の平穏と繁栄を祈願するため、多くの人が神社を訪れた。",
    "exampleTranslation": "Many people visited the shrine to pray for peace and prosperity in the new year.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0200"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 898
  },
  {
    "category": "kanji",
    "front": "軌",
    "back": "Track; Rut",
    "exampleJp": "計画は順調に進み、ついに事業は軌道に乗った。",
    "exampleTranslation": "The plan progressed smoothly, and the business finally got on track.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0201"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 899
  },
  {
    "category": "kanji",
    "front": "既",
    "back": "Previously",
    "exampleJp": "既得権益を守ろうとする勢力が、改革の大きな壁となっている。",
    "exampleTranslation": "The forces trying to protect vested interests have become a major barrier to reform.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0202"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 900
  },
  {
    "category": "kanji",
    "front": "飢",
    "back": "Hungry",
    "exampleJp": "異常気象による不作で、その地域は深刻な飢饉に見舞われた。",
    "exampleTranslation": "Due to crop failures caused by abnormal weather, the region was struck by a severe famine.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0203"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 901
  },
  {
    "category": "kanji",
    "front": "鬼",
    "back": "Ghost; Demon",
    "exampleJp": "彼は音楽界の鬼才として、次々と革新的な作品を発表した。",
    "exampleTranslation": "As a musical genius, he released innovative works one after another.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0204"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 902
  },
  {
    "category": "kanji",
    "front": "亀",
    "back": "Turtle",
    "exampleJp": "些細な意見の対立が、やがて両国間に修復不可能な亀裂を生んだ。",
    "exampleTranslation": "A trivial difference of opinion eventually caused an irreparable rift between the two countries.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0205"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 903
  },
  {
    "category": "kanji",
    "front": "幾",
    "back": "How many",
    "exampleJp": "この建物の設計には、複雑な幾何学模様が取り入れられている。",
    "exampleTranslation": "Complex geometric patterns are incorporated into the design of this building.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0206"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 904
  },
  {
    "category": "kanji",
    "front": "儀",
    "back": "Ceremony; Rule",
    "exampleJp": "国際的な儀典のルールに従って、各国の首脳が迎えられた。",
    "exampleTranslation": "The heads of state were welcomed in accordance with international protocol rules.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0207"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 905
  },
  {
    "category": "kanji",
    "front": "宜",
    "back": "Best regards; Good",
    "exampleJp": "お客様の便宜を図るため、営業時間を延長することにしました。",
    "exampleTranslation": "To accommodate the convenience of our customers, we have decided to extend our business hours.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0208"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 906
  },
  {
    "category": "kanji",
    "front": "戯",
    "back": "Play; Sport",
    "exampleJp": "子供たちは公園で日が暮れるまで無邪気に遊戯に興じていた。",
    "exampleTranslation": "The children were innocently engrossed in their play at the park until sunset.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0209"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 907
  },
  {
    "category": "kanji",
    "front": "擬",
    "back": "Mimic",
    "exampleJp": "最新のシミュレーターは、実際の飛行環境を高い精度で擬似体験できる。",
    "exampleTranslation": "The latest simulator allows for a highly accurate simulated experience of actual flight environments.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0210"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 908
  },
  {
    "category": "kanji",
    "front": "犠",
    "back": "Sacrifice",
    "exampleJp": "自由を獲得するためには、時として多大な犠牲を払う必要がある。",
    "exampleTranslation": "In order to attain freedom, it is sometimes necessary to make immense sacrifices.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0211"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 909
  },
  {
    "category": "kanji",
    "front": "菊",
    "back": "Chrysanthemum",
    "exampleJp": "皇室の紋章としても知られる菊花は、気高さの象徴である。",
    "exampleTranslation": "The chrysanthemum flower, also known as the crest of the Imperial Family, is a symbol of nobility.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0212"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 910
  },
  {
    "category": "kanji",
    "front": "吉",
    "back": "Good luck; Joy",
    "exampleJp": "試験に合格したという吉報が届き、家族全員が喜んだ。",
    "exampleTranslation": "The good news of passing the exam arrived, and the whole family rejoiced.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0213"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 911
  },
  {
    "category": "kanji",
    "front": "喫",
    "back": "Consume; Eat",
    "exampleJp": "少子高齢化への対策は、我が国にとって喫緊の課題である。",
    "exampleTranslation": "Countermeasures against the declining birthrate and aging population are a pressing issue for our country.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0214"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 912
  },
  {
    "category": "kanji",
    "front": "詰",
    "back": "Pack; Close",
    "exampleJp": "記者たちは、政治家の不適切な発言に対して厳しく詰問した。",
    "exampleTranslation": "The reporters strictly cross-examined the politician regarding his inappropriate remarks.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0215"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 913
  },
  {
    "category": "kanji",
    "front": "却",
    "back": "Reject",
    "exampleJp": "証拠が不十分であるとして、裁判所はその訴えを却下した。",
    "exampleTranslation": "The court dismissed the lawsuit on the grounds of insufficient evidence.",
    "tags": [
      "n1",
      "kanji"
    ],
    "sourceIds": [
      "n1-kanji-0216"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 914
  },
  {
    "category": "grammar",
    "front": "〜にあって",
    "back": "in the midst of; under circumstances of",
    "exampleJp": "未曾有の危機にあって、リーダーの真価が問われている。",
    "exampleTranslation": "In the midst of an unprecedented crisis, the true worth of a leader is being tested.",
    "tags": [
      "n1",
      "grammar",
      "condition",
      "formal"
    ],
    "sourceIds": [
      "n1-grammar-0001"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 915
  },
  {
    "category": "grammar",
    "front": "〜に至って",
    "back": "upon reaching a certain stage; finally",
    "exampleJp": "事ここに至っては、もはや全面的な計画の見直しを避けることはできない。",
    "exampleTranslation": "Now that things have reached this point, a comprehensive review of the plan can no longer be avoided.",
    "tags": [
      "n1",
      "grammar",
      "stage",
      "formal"
    ],
    "sourceIds": [
      "n1-grammar-0002"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 916
  },
  {
    "category": "grammar",
    "front": "〜ゆえに",
    "back": "because of; therefore",
    "exampleJp": "独自の技術を持つがゆえに、他社との提携が難航している。",
    "exampleTranslation": "Precisely because they possess unique technology, partnering with other companies has been difficult.",
    "tags": [
      "n1",
      "grammar",
      "reason",
      "formal"
    ],
    "sourceIds": [
      "n1-grammar-0003"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 917
  },
  {
    "category": "grammar",
    "front": "〜ばこそ",
    "back": "only because",
    "exampleJp": "社員の健康を考えればこそ、このような厳しい残業規制を導入したのです。",
    "exampleTranslation": "It is only because we care about the employees' health that we introduced such strict overtime regulations.",
    "tags": [
      "n1",
      "grammar",
      "reason",
      "emphasis"
    ],
    "sourceIds": [
      "n1-grammar-0004"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 918
  },
  {
    "category": "grammar",
    "front": "〜だに",
    "back": "even just; not even",
    "exampleJp": "まさか我が社が倒産するなど、想像するだに恐ろしい。",
    "exampleTranslation": "The very thought that our company might go bankrupt is terrifying even just to imagine.",
    "tags": [
      "n1",
      "grammar",
      "extreme",
      "formal"
    ],
    "sourceIds": [
      "n1-grammar-0005"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 919
  },
  {
    "category": "grammar",
    "front": "〜すら",
    "back": "even",
    "exampleJp": "重病に伏せ、今や自力で起き上がることすらできない状態だ。",
    "exampleTranslation": "Stricken by a serious illness, he is now in a state where he cannot even sit up by himself.",
    "tags": [
      "n1",
      "grammar",
      "extreme",
      "formal"
    ],
    "sourceIds": [
      "n1-grammar-0006"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 920
  },
  {
    "category": "grammar",
    "front": "〜にして",
    "back": "only someone like; even at the stage of",
    "exampleJp": "あの高名な教授にして解けない問題があるとは驚きだ。",
    "exampleTranslation": "It is surprising that there is a problem that even that renowned professor cannot solve.",
    "tags": [
      "n1",
      "grammar",
      "emphasis",
      "level"
    ],
    "sourceIds": [
      "n1-grammar-0007"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 921
  },
  {
    "category": "grammar",
    "front": "〜とあって",
    "back": "due to the special situation of",
    "exampleJp": "話題の新作映画の公開初日とあって、映画館は長蛇の列だった。",
    "exampleTranslation": "Being the opening day of the highly talked-about new movie, there were long lines at the theater.",
    "tags": [
      "n1",
      "grammar",
      "reason",
      "situation"
    ],
    "sourceIds": [
      "n1-grammar-0008"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 922
  },
  {
    "category": "grammar",
    "front": "〜とあれば",
    "back": "if it is the case that",
    "exampleJp": "愛する家族のためとあれば、どんな苦労もいとわない覚悟だ。",
    "exampleTranslation": "If it is for the sake of my beloved family, I am prepared to endure any hardship.",
    "tags": [
      "n1",
      "grammar",
      "condition",
      "formal"
    ],
    "sourceIds": [
      "n1-grammar-0009"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 923
  },
  {
    "category": "grammar",
    "front": "〜ともなると / 〜ともなれば",
    "back": "when it comes to a stage like; once it becomes",
    "exampleJp": "一国の首相ともなると、一言の失言が国際問題に発展しかねない。",
    "exampleTranslation": "Once you become the prime minister of a country, a single slip of the tongue could escalate into an international issue.",
    "tags": [
      "n1",
      "grammar",
      "level",
      "condition"
    ],
    "sourceIds": [
      "n1-grammar-0010"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 924
  },
  {
    "category": "grammar",
    "front": "〜ともあろうものが",
    "back": "for someone of such status to do",
    "exampleJp": "警察官ともあろうものが、飲酒運転で逮捕されるとは言語道断だ。",
    "exampleTranslation": "It is absolutely outrageous for someone in the position of a police officer to be arrested for drunk driving.",
    "tags": [
      "n1",
      "grammar",
      "criticism",
      "status"
    ],
    "sourceIds": [
      "n1-grammar-0011"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 925
  },
  {
    "category": "grammar",
    "front": "〜たるもの",
    "back": "those who are in the position of",
    "exampleJp": "教育者たるもの、常に自らの行動を律し、学生の模範とならなければならない。",
    "exampleTranslation": "Those in the position of educators must always discipline their own behavior and serve as role models for their students.",
    "tags": [
      "n1",
      "grammar",
      "duty",
      "status"
    ],
    "sourceIds": [
      "n1-grammar-0012"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 926
  },
  {
    "category": "grammar",
    "front": "〜なりに",
    "back": "in one's own way; to the best of one's ability",
    "exampleJp": "経験は浅いが、彼なりにプロジェクトの成功に向けて必死に努力している。",
    "exampleTranslation": "Although he lacks experience, he is trying desperately in his own way to ensure the project's success.",
    "tags": [
      "n1",
      "grammar",
      "manner"
    ],
    "sourceIds": [
      "n1-grammar-0013"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 927
  },
  {
    "category": "grammar",
    "front": "〜ごとき",
    "back": "like; such as (derogatory or humble)",
    "exampleJp": "私ごときがこのような大役を任されるとは、身に余る光栄でございます。",
    "exampleTranslation": "That someone like me would be entrusted with such a major role is an undeserved honor.",
    "tags": [
      "n1",
      "grammar",
      "humble",
      "formal"
    ],
    "sourceIds": [
      "n1-grammar-0014"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 928
  },
  {
    "category": "grammar",
    "front": "〜ごとく",
    "back": "as if; like",
    "exampleJp": "その新型ウイルスは、またたく間に世界中を怒涛のごとく席巻した。",
    "exampleTranslation": "The new virus swept across the world like a surging wave in the blink of an eye.",
    "tags": [
      "n1",
      "grammar",
      "simile",
      "formal"
    ],
    "sourceIds": [
      "n1-grammar-0015"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 929
  },
  {
    "category": "grammar",
    "front": "〜までだ / 〜までのことだ",
    "back": "only have to; it is just that",
    "exampleJp": "この提案が却下されたら、また新しい案を練り直すまでのことだ。",
    "exampleTranslation": "If this proposal is rejected, it just means I'll have to rework a new one.",
    "tags": [
      "n1",
      "grammar",
      "limitation",
      "resolution"
    ],
    "sourceIds": [
      "n1-grammar-0016"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 930
  },
  {
    "category": "grammar",
    "front": "〜ないまでも",
    "back": "even if not to the extent of",
    "exampleJp": "毎日とは言わないまでも、週に三回は定期的に運動をするよう心掛けている。",
    "exampleTranslation": "Even if not every day, I make it a point to exercise regularly at least three times a week.",
    "tags": [
      "n1",
      "grammar",
      "concession",
      "degree"
    ],
    "sourceIds": [
      "n1-grammar-0017"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 931
  },
  {
    "category": "grammar",
    "front": "〜に足る",
    "back": "worthy of; sufficient to",
    "exampleJp": "インターネット上の情報は玉石混交であり、信頼に足る情報源を見極める能力が求められる。",
    "exampleTranslation": "Information on the internet is a mix of gems and stones, requiring the ability to discern sources worthy of trust.",
    "tags": [
      "n1",
      "grammar",
      "worth",
      "formal"
    ],
    "sourceIds": [
      "n1-grammar-0018"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 932
  },
  {
    "category": "grammar",
    "front": "〜に堪える",
    "back": "worth doing; bearable",
    "exampleJp": "この古典文学は、時代を超えて現代の大人たちの鑑賞に堪える傑作だ。",
    "exampleTranslation": "This classical literature is a masterpiece that withstands the test of time and is well worth the appreciation of modern adults.",
    "tags": [
      "n1",
      "grammar",
      "worth",
      "endurance"
    ],
    "sourceIds": [
      "n1-grammar-0019"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 933
  },
  {
    "category": "grammar",
    "front": "〜にたえない",
    "back": "unbearable; couldn't bear to",
    "exampleJp": "幼い子供が巻き込まれた痛ましい事故のニュースは、全く見るにたえない。",
    "exampleTranslation": "The news of the tragic accident involving young children is absolutely unbearable to watch.",
    "tags": [
      "n1",
      "grammar",
      "emotion",
      "unbearable"
    ],
    "sourceIds": [
      "n1-grammar-0020"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 934
  },
  {
    "category": "grammar",
    "front": "〜を禁じ得ない",
    "back": "cannot help but",
    "exampleJp": "長年社会に尽くしてきた彼が不祥事で辞任するとは、同情を禁じ得ない。",
    "exampleTranslation": "I cannot help but feel sympathy that he, who has served society for many years, is resigning due to a scandal.",
    "tags": [
      "n1",
      "grammar",
      "emotion",
      "formal"
    ],
    "sourceIds": [
      "n1-grammar-0021"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 935
  },
  {
    "category": "grammar",
    "front": "〜を余儀なくされる",
    "back": "forced to",
    "exampleJp": "部品の供給網が寸断されたため、自動車メーカーは工場の稼働停止を余儀なくされた。",
    "exampleTranslation": "Because the parts supply chain was severed, the automaker was forced to halt factory operations.",
    "tags": [
      "n1",
      "grammar",
      "forced",
      "formal"
    ],
    "sourceIds": [
      "n1-grammar-0022"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 936
  },
  {
    "category": "grammar",
    "front": "〜を皮切りに",
    "back": "starting with",
    "exampleJp": "東京での初日公演を皮切りに、全国１５都市を巡る大規模なツアーがスタートした。",
    "exampleTranslation": "Starting with the opening performance in Tokyo, a large-scale tour spanning 15 cities nationwide has begun.",
    "tags": [
      "n1",
      "grammar",
      "start",
      "sequence"
    ],
    "sourceIds": [
      "n1-grammar-0023"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 937
  },
  {
    "category": "grammar",
    "front": "〜を限りに",
    "back": "starting from; ending with the limit of",
    "exampleJp": "本年度を限りに、長年親しまれてきたこの学力テストは廃止されることが決定した。",
    "exampleTranslation": "It has been decided that, concluding with this academic year, this long-familiar standardized test will be abolished.",
    "tags": [
      "n1",
      "grammar",
      "limit",
      "formal"
    ],
    "sourceIds": [
      "n1-grammar-0024"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 938
  },
  {
    "category": "grammar",
    "front": "〜からある / 〜からする",
    "back": "as much as; costing as much as",
    "exampleJp": "彼は身長が２メートルからある大男で、どこにいても非常に目立つ。",
    "exampleTranslation": "He is a giant of a man, standing as much as two meters tall, and stands out immensely wherever he goes.",
    "tags": [
      "n1",
      "grammar",
      "quantity",
      "emphasis"
    ],
    "sourceIds": [
      "n1-grammar-0025"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 939
  },
  {
    "category": "grammar",
    "front": "〜に至るまで",
    "back": "even down to; as far as",
    "exampleJp": "新しい制服の導入にあたっては、デザインから素材の選定に至るまで生徒の意見が反映された。",
    "exampleTranslation": "In introducing the new uniforms, students' opinions were reflected in everything from the design down to the selection of materials.",
    "tags": [
      "n1",
      "grammar",
      "extent",
      "detail"
    ],
    "sourceIds": [
      "n1-grammar-0026"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 940
  },
  {
    "category": "grammar",
    "front": "〜に至っては",
    "back": "when it comes to extreme cases like",
    "exampleJp": "最近の若者の活字離れは深刻で、一部の学生に至っては月に一冊も本を読まないという。",
    "exampleTranslation": "The recent trend of young people moving away from print is serious, and when it comes to some students, they reportedly do not read even a single book a month.",
    "tags": [
      "n1",
      "grammar",
      "extreme",
      "comparison"
    ],
    "sourceIds": [
      "n1-grammar-0027"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 941
  },
  {
    "category": "grammar",
    "front": "〜にかこつけて",
    "back": "under the pretext of",
    "exampleJp": "彼は業務上の視察にかこつけて、実は現地の観光名所を巡っていたらしい。",
    "exampleTranslation": "Under the pretext of a business inspection, it seems he was actually touring the local sightseeing spots.",
    "tags": [
      "n1",
      "grammar",
      "pretext",
      "excuse"
    ],
    "sourceIds": [
      "n1-grammar-0028"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 942
  },
  {
    "category": "grammar",
    "front": "〜にかまけて",
    "back": "too busy with X to do Y; engrossed in",
    "exampleJp": "日々の雑務にかまけて、本来やるべき研究がおろそかになってしまっている。",
    "exampleTranslation": "Being too engrossed in daily chores, the research I am supposed to be doing has been neglected.",
    "tags": [
      "n1",
      "grammar",
      "distraction",
      "neglect"
    ],
    "sourceIds": [
      "n1-grammar-0029"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 943
  },
  {
    "category": "grammar",
    "front": "〜に即して",
    "back": "in accordance with; in line with",
    "exampleJp": "時代の変化に即して、従来のビジネスモデルを柔軟に転換していく必要がある。",
    "exampleTranslation": "It is necessary to flexibly shift our traditional business model in line with the changing times.",
    "tags": [
      "n1",
      "grammar",
      "accordance",
      "formal"
    ],
    "sourceIds": [
      "n1-grammar-0030"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 944
  },
  {
    "category": "grammar",
    "front": "〜を踏まえて",
    "back": "based on; taking into account",
    "exampleJp": "前回の失敗を踏まえて、今回はリスク管理体制をより強固なものにした。",
    "exampleTranslation": "Based on the previous failure, we have made the risk management system more robust this time.",
    "tags": [
      "n1",
      "grammar",
      "basis",
      "consideration"
    ],
    "sourceIds": [
      "n1-grammar-0031"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 945
  },
  {
    "category": "grammar",
    "front": "〜を契機に / 〜を機に",
    "back": "with X as the turning point; using as an opportunity",
    "exampleJp": "世界的な金融危機を契機に、多くの企業がサプライチェーンの見直しを迫られた。",
    "exampleTranslation": "With the global financial crisis as a turning point, many companies were forced to review their supply chains.",
    "tags": [
      "n1",
      "grammar",
      "opportunity",
      "turning-point"
    ],
    "sourceIds": [
      "n1-grammar-0032"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 946
  },
  {
    "category": "grammar",
    "front": "〜んがため",
    "back": "in order to",
    "exampleJp": "自らの潔白を証明せんがため、彼は長年にわたり孤独な闘いを続けてきた。",
    "exampleTranslation": "In order to prove his innocence, he has continued a solitary struggle for many years.",
    "tags": [
      "n1",
      "grammar",
      "purpose",
      "literary"
    ],
    "sourceIds": [
      "n1-grammar-0033"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 947
  },
  {
    "category": "grammar",
    "front": "〜んばかりに",
    "back": "as if about to",
    "exampleJp": "土砂降りの雨の中、彼女は泣き出さんばかりの表情で立ち尽くしていた。",
    "exampleTranslation": "In the pouring rain, she stood frozen with an expression as if she were about to burst into tears.",
    "tags": [
      "n1",
      "grammar",
      "appearance",
      "imminent"
    ],
    "sourceIds": [
      "n1-grammar-0034"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 948
  },
  {
    "category": "grammar",
    "front": "〜とばかりに",
    "back": "as if to say",
    "exampleJp": "ここぞとばかりに、野党は政府の経済政策の矛盾を厳しく追及した。",
    "exampleTranslation": "As if to say 'now is the chance,' the opposition party harshly interrogated the contradictions in the government's economic policies.",
    "tags": [
      "n1",
      "grammar",
      "manner",
      "implication"
    ],
    "sourceIds": [
      "n1-grammar-0035"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 949
  },
  {
    "category": "grammar",
    "front": "〜なり",
    "back": "as soon as; right after",
    "exampleJp": "彼は帰宅するなりソファに倒れ込み、そのまま深い眠りに落ちてしまった。",
    "exampleTranslation": "As soon as he returned home, he collapsed onto the sofa and fell into a deep sleep just like that.",
    "tags": [
      "n1",
      "grammar",
      "time",
      "immediate"
    ],
    "sourceIds": [
      "n1-grammar-0036"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 950
  },
  {
    "category": "grammar",
    "front": "〜なり〜なり",
    "back": "A or B or something",
    "exampleJp": "分からないことがあれば、一人で悩まずに先輩に聞くなり専門書で調べるなりしてください。",
    "exampleTranslation": "If there is something you don't understand, don't worry alone; please ask a senior or look it up in a specialized book or something.",
    "tags": [
      "n1",
      "grammar",
      "options",
      "suggestion"
    ],
    "sourceIds": [
      "n1-grammar-0037"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 951
  },
  {
    "category": "grammar",
    "front": "〜であれ〜であれ",
    "back": "whether A or B",
    "exampleJp": "不況期であれ好況期であれ、企業は常に新しい価値を創造し続ける責任がある。",
    "exampleTranslation": "Whether in an economic downturn or a boom, a company always has the responsibility to continue creating new value.",
    "tags": [
      "n1",
      "grammar",
      "condition",
      "regardless"
    ],
    "sourceIds": [
      "n1-grammar-0038"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 952
  },
  {
    "category": "grammar",
    "front": "〜といい〜といい",
    "back": "looking at A and looking at B",
    "exampleJp": "デザインといい使い勝手といい、この新製品は非常に高い完成度を誇っている。",
    "exampleTranslation": "Looking at both the design and the usability, this new product boasts a very high level of perfection.",
    "tags": [
      "n1",
      "grammar",
      "evaluation",
      "examples"
    ],
    "sourceIds": [
      "n1-grammar-0039"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 953
  },
  {
    "category": "grammar",
    "front": "〜といわず〜といわず",
    "back": "not distinguishing between A and B",
    "exampleJp": "休日といわず平日といわず、彼は昼夜を問わず研究室にこもって実験を続けている。",
    "exampleTranslation": "Without distinguishing between holidays and weekdays, he stays locked in the lab continuing his experiments day and night.",
    "tags": [
      "n1",
      "grammar",
      "entirety",
      "time"
    ],
    "sourceIds": [
      "n1-grammar-0040"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 954
  },
  {
    "category": "grammar",
    "front": "〜いかんだ / 〜いかんにかかっている",
    "back": "depends on",
    "exampleJp": "今後の経営戦略の成否は、新興市場への進出が予定通りに進むかいかんにかかっている。",
    "exampleTranslation": "The success or failure of the future management strategy depends on whether the expansion into emerging markets proceeds as planned.",
    "tags": [
      "n1",
      "grammar",
      "dependence",
      "formal"
    ],
    "sourceIds": [
      "n1-grammar-0041"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 955
  },
  {
    "category": "grammar",
    "front": "〜いかんによらず / 〜いかんにかかわらず",
    "back": "regardless of",
    "exampleJp": "理由のいかんによらず、社内情報の外部への持ち出しは厳しく処罰される。",
    "exampleTranslation": "Regardless of the reason, taking company information outside will be strictly punished.",
    "tags": [
      "n1",
      "grammar",
      "regardless",
      "formal"
    ],
    "sourceIds": [
      "n1-grammar-0042"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 956
  },
  {
    "category": "grammar",
    "front": "〜を問わず",
    "back": "regardless of",
    "exampleJp": "この国際コンクールは、年齢や国籍を問わず、あらゆる才能ある若き音楽家に参加の門戸を開いている。",
    "exampleTranslation": "This international competition opens its doors to all talented young musicians, regardless of age or nationality.",
    "tags": [
      "n1",
      "grammar",
      "regardless",
      "inclusive"
    ],
    "sourceIds": [
      "n1-grammar-0043"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 957
  },
  {
    "category": "grammar",
    "front": "〜はおろか",
    "back": "let alone; to say nothing of",
    "exampleJp": "彼は重い借金を抱え、家を買うはおろか、日々の食費すら事欠く有様だった。",
    "exampleTranslation": "Burdened with heavy debt, he was in a state where he lacked even daily food expenses, let alone buying a house.",
    "tags": [
      "n1",
      "grammar",
      "negative",
      "extreme"
    ],
    "sourceIds": [
      "n1-grammar-0044"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 958
  },
  {
    "category": "grammar",
    "front": "〜ばかりか",
    "back": "not only",
    "exampleJp": "その不正会計の発覚は、企業の信頼を失墜させたばかりか、業界全体への不信感をも招いた。",
    "exampleTranslation": "The discovery of the accounting fraud not only caused the company to lose its credibility, but also invited distrust towards the entire industry.",
    "tags": [
      "n1",
      "grammar",
      "addition",
      "negative"
    ],
    "sourceIds": [
      "n1-grammar-0045"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 959
  },
  {
    "category": "grammar",
    "front": "〜のみならず",
    "back": "not only",
    "exampleJp": "地球温暖化の影響は、生態系のみならず、我々の経済活動にも深刻な打撃を与えつつある。",
    "exampleTranslation": "The impact of global warming is dealing a severe blow not only to ecosystems but also to our economic activities.",
    "tags": [
      "n1",
      "grammar",
      "addition",
      "formal"
    ],
    "sourceIds": [
      "n1-grammar-0046"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 960
  },
  {
    "category": "grammar",
    "front": "〜にとどまらず",
    "back": "not limited to",
    "exampleJp": "そのアニメ作品の人気は日本国内にとどまらず、海を越えて多くの海外ファンを獲得している。",
    "exampleTranslation": "The popularity of that anime series is not limited to within Japan; it has crossed the ocean and acquired many fans overseas.",
    "tags": [
      "n1",
      "grammar",
      "expansion",
      "formal"
    ],
    "sourceIds": [
      "n1-grammar-0047"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 961
  },
  {
    "category": "grammar",
    "front": "〜極まる / 〜極まりない",
    "back": "extremely",
    "exampleJp": "十分な安全確認を行わずに作業を進めるなど、危険極まりない行為だ。",
    "exampleTranslation": "Proceeding with the work without conducting sufficient safety checks is an extremely dangerous act.",
    "tags": [
      "n1",
      "grammar",
      "extreme",
      "criticism"
    ],
    "sourceIds": [
      "n1-grammar-0048"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 962
  },
  {
    "category": "grammar",
    "front": "〜の至り",
    "back": "the utmost; the height of",
    "exampleJp": "長年の研究が実を結び、このような名誉ある賞をいただけることは、まさに光栄の至りです。",
    "exampleTranslation": "That my many years of research have borne fruit and I can receive such an honorable award is truly the utmost honor.",
    "tags": [
      "n1",
      "grammar",
      "emotion",
      "formal"
    ],
    "sourceIds": [
      "n1-grammar-0049"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 963
  },
  {
    "category": "grammar",
    "front": "〜の極み",
    "back": "the height of; extreme",
    "exampleJp": "あの独裁者は、自らの権力を誇示するためだけに巨大な宮殿を建設したという、愚かの極みである。",
    "exampleTranslation": "That dictator built a massive palace solely to show off his power; it is the height of folly.",
    "tags": [
      "n1",
      "grammar",
      "extreme",
      "formal"
    ],
    "sourceIds": [
      "n1-grammar-0050"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 964
  },
  {
    "category": "grammar",
    "front": "〜に越したことはない",
    "back": "nothing is better than; it is best to",
    "exampleJp": "病気は早期発見・早期治療に越したことはないので、定期的な健康診断を推奨している。",
    "exampleTranslation": "Since nothing is better than early detection and early treatment for illnesses, we recommend regular health checkups.",
    "tags": [
      "n1",
      "grammar",
      "recommendation",
      "logic"
    ],
    "sourceIds": [
      "n1-grammar-0051"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 965
  },
  {
    "category": "grammar",
    "front": "〜ないものでもない",
    "back": "it's not entirely impossible that; might just",
    "exampleJp": "条件次第では、その困難なプロジェクトを引き受けないものでもないが、慎重な検討が必要だ。",
    "exampleTranslation": "Depending on the conditions, it's not entirely impossible that we might take on that difficult project, but careful consideration is required.",
    "tags": [
      "n1",
      "grammar",
      "possibility",
      "hesitation"
    ],
    "sourceIds": [
      "n1-grammar-0052"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 966
  },
  {
    "category": "grammar",
    "front": "〜ずにはすまない / 〜ないではすまない",
    "back": "cannot end without; must do",
    "exampleJp": "顧客の個人情報を流出させた以上、経営トップの謝罪だけではすまない事態となっている。",
    "exampleTranslation": "Now that customer personal information has been leaked, it has become a situation that cannot end with just an apology from top management.",
    "tags": [
      "n1",
      "grammar",
      "obligation",
      "inevitable"
    ],
    "sourceIds": [
      "n1-grammar-0053"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 967
  },
  {
    "category": "grammar",
    "front": "〜を置いて〜ない",
    "back": "no one/nothing but; only",
    "exampleJp": "この複雑な案件を円滑にまとめ上げられる人材は、経験豊富な彼を置いて他にはいない。",
    "exampleTranslation": "There is no one but the highly experienced him who can smoothly wrap up this complex project.",
    "tags": [
      "n1",
      "grammar",
      "exclusive",
      "evaluation"
    ],
    "sourceIds": [
      "n1-grammar-0054"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 968
  },
  {
    "category": "grammar",
    "front": "〜ならでは",
    "back": "only possible by/with; distinctive of",
    "exampleJp": "職人の精緻な手仕事ならではの温かみが、この伝統工芸品には宿っている。",
    "exampleTranslation": "A warmth that is only possible with the delicate handwork of a craftsman resides in this traditional handicraft.",
    "tags": [
      "n1",
      "grammar",
      "distinctive",
      "positive"
    ],
    "sourceIds": [
      "n1-grammar-0055"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 969
  },
  {
    "category": "grammar",
    "front": "〜にほかならない",
    "back": "nothing but; simply",
    "exampleJp": "今回の売上減少は、我々の市場調査の甘さが招いた結果にほかならない。",
    "exampleTranslation": "This decrease in sales is nothing but the result brought about by the leniency of our market research.",
    "tags": [
      "n1",
      "grammar",
      "assertion",
      "formal"
    ],
    "sourceIds": [
      "n1-grammar-0056"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 970
  },
  {
    "category": "grammar",
    "front": "〜にすぎない",
    "back": "merely; nothing more than",
    "exampleJp": "AIが生成したテキストはもっともらしく見えるが、現時点では過去のデータのつなぎ合わせにすぎない。",
    "exampleTranslation": "Text generated by AI may look plausible, but at present it is nothing more than a patchwork of past data.",
    "tags": [
      "n1",
      "grammar",
      "limitation",
      "assertion"
    ],
    "sourceIds": [
      "n1-grammar-0057"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 971
  },
  {
    "category": "grammar",
    "front": "〜にあたって",
    "back": "prior to; on the occasion of",
    "exampleJp": "新規事業の立ち上げにあたって、各部門から専門知識を持つ人材が招集された。",
    "exampleTranslation": "Prior to launching the new business, personnel with specialized knowledge were convened from various departments.",
    "tags": [
      "n1",
      "grammar",
      "time",
      "formal"
    ],
    "sourceIds": [
      "n1-grammar-0058"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 972
  },
  {
    "category": "grammar",
    "front": "〜に先立って",
    "back": "prior to; before",
    "exampleJp": "首脳会談に先立って、両国の外務大臣による実務レベルの折衝が行われた。",
    "exampleTranslation": "Prior to the summit meeting, working-level negotiations were conducted by the foreign ministers of both countries.",
    "tags": [
      "n1",
      "grammar",
      "time",
      "sequence"
    ],
    "sourceIds": [
      "n1-grammar-0059"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 973
  },
  {
    "category": "grammar",
    "front": "〜にひきかえ",
    "back": "in stark contrast to",
    "exampleJp": "前任者が非常に厳格だったのにひきかえ、新しい上司は部下の自主性を重んじるタイプだ。",
    "exampleTranslation": "In stark contrast to the predecessor who was extremely strict, the new boss is the type who values the autonomy of subordinates.",
    "tags": [
      "n1",
      "grammar",
      "contrast",
      "comparison"
    ],
    "sourceIds": [
      "n1-grammar-0060"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 974
  },
  {
    "category": "grammar",
    "front": "〜にもまして",
    "back": "even more than",
    "exampleJp": "今年の夏は猛暑が続いており、例年にもまして熱中症への警戒が必要とされている。",
    "exampleTranslation": "Fierce heat has been continuing this summer, making vigilance against heatstroke necessary even more than in a typical year.",
    "tags": [
      "n1",
      "grammar",
      "comparison",
      "degree"
    ],
    "sourceIds": [
      "n1-grammar-0061"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 975
  },
  {
    "category": "grammar",
    "front": "〜が早いか",
    "back": "as soon as; no sooner than",
    "exampleJp": "開始のベルが鳴るが早いか、受験生たちは一斉に問題用紙を開き始めた。",
    "exampleTranslation": "As soon as the starting bell rang, the examinees began opening their test papers in unison.",
    "tags": [
      "n1",
      "grammar",
      "time",
      "immediate"
    ],
    "sourceIds": [
      "n1-grammar-0062"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 976
  },
  {
    "category": "grammar",
    "front": "〜や否や",
    "back": "the moment that",
    "exampleJp": "彼は私の顔を見るや否や、血相を変えて部屋から飛び出していった。",
    "exampleTranslation": "The moment he saw my face, he changed color and dashed out of the room.",
    "tags": [
      "n1",
      "grammar",
      "time",
      "immediate"
    ],
    "sourceIds": [
      "n1-grammar-0063"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 977
  },
  {
    "category": "grammar",
    "front": "〜そばから",
    "back": "as soon as; immediately after (repeatedly)",
    "exampleJp": "子供が散らかしたおもちゃを片付けるそばから、また別のおもちゃを引っ張り出してくる。",
    "exampleTranslation": "As soon as I put away the toys the child has scattered, they pull out other toys all over again.",
    "tags": [
      "n1",
      "grammar",
      "time",
      "repetition"
    ],
    "sourceIds": [
      "n1-grammar-0064"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 978
  },
  {
    "category": "grammar",
    "front": "〜てからというもの",
    "back": "ever since",
    "exampleJp": "新しい経営陣が就任してからというもの、社内の風通しが見違えるほど良くなった。",
    "exampleTranslation": "Ever since the new management team took office, the open communication within the company has improved remarkably.",
    "tags": [
      "n1",
      "grammar",
      "time",
      "change"
    ],
    "sourceIds": [
      "n1-grammar-0065"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 979
  },
  {
    "category": "grammar",
    "front": "〜ながらに",
    "back": "while in the state of; born with",
    "exampleJp": "インターネットの普及により、我々は居ながらにして世界中の情報にアクセスできるようになった。",
    "exampleTranslation": "With the spread of the internet, we have become able to access information from around the world while staying at home.",
    "tags": [
      "n1",
      "grammar",
      "state",
      "condition"
    ],
    "sourceIds": [
      "n1-grammar-0066"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 980
  },
  {
    "category": "grammar",
    "front": "〜ことなしに",
    "back": "without doing",
    "exampleJp": "十分な議論を尽くすことなしに、これほど重要な方針を決定してはならない。",
    "exampleTranslation": "We must not decide on such an important policy without thoroughly exhausting all discussions.",
    "tags": [
      "n1",
      "grammar",
      "negative",
      "condition"
    ],
    "sourceIds": [
      "n1-grammar-0067"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 981
  },
  {
    "category": "grammar",
    "front": "〜なしに / 〜なしには",
    "back": "without",
    "exampleJp": "地域住民の深い理解と協力なしには、この都市開発プロジェクトの成功はあり得ない。",
    "exampleTranslation": "Without the deep understanding and cooperation of local residents, the success of this urban development project is impossible.",
    "tags": [
      "n1",
      "grammar",
      "negative",
      "condition"
    ],
    "sourceIds": [
      "n1-grammar-0068"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 982
  },
  {
    "category": "grammar",
    "front": "〜を抜きにしては",
    "back": "leaving aside; without",
    "exampleJp": "AI技術の飛躍的な進歩を抜きにしては、現代の産業構造の変革を語ることはできない。",
    "exampleTranslation": "One cannot speak of the transformation of modern industrial structures without the dramatic advancements in AI technology.",
    "tags": [
      "n1",
      "grammar",
      "condition",
      "essential"
    ],
    "sourceIds": [
      "n1-grammar-0069"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 983
  },
  {
    "category": "grammar",
    "front": "〜てやまない",
    "back": "always doing; deeply feeling",
    "exampleJp": "長年にわたり平和活動に尽力された氏の勇気ある行動に、敬意を表してやまない。",
    "exampleTranslation": "I cannot help but continuously express my profound respect for the courageous actions of the man who devoted himself to peace activism for many years.",
    "tags": [
      "n1",
      "grammar",
      "emotion",
      "continuous"
    ],
    "sourceIds": [
      "n1-grammar-0070"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 984
  },
  {
    "category": "grammar",
    "front": "〜てしかるべきだ",
    "back": "it is natural to; should",
    "exampleJp": "あの重大なミスを犯したのだから、責任者が公式な場で謝罪してしかるべきだ。",
    "exampleTranslation": "Having made such a grave mistake, it is only natural that the person in charge should apologize in a public setting.",
    "tags": [
      "n1",
      "grammar",
      "expectation",
      "logic"
    ],
    "sourceIds": [
      "n1-grammar-0071"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 985
  },
  {
    "category": "grammar",
    "front": "〜べく",
    "back": "in order to",
    "exampleJp": "二酸化炭素の排出量を大幅に削減すべく、政府は新しい環境基準を導入した。",
    "exampleTranslation": "In order to drastically reduce carbon dioxide emissions, the government introduced new environmental standards.",
    "tags": [
      "n1",
      "grammar",
      "purpose",
      "formal"
    ],
    "sourceIds": [
      "n1-grammar-0072"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 986
  },
  {
    "category": "grammar",
    "front": "〜べくもない",
    "back": "cannot possibly",
    "exampleJp": "当時の貧しい生活環境では、大学に進学するなど望むべくもなかった。",
    "exampleTranslation": "In the impoverished living conditions of that time, going on to university was something one could not possibly hope for.",
    "tags": [
      "n1",
      "grammar",
      "impossibility",
      "past"
    ],
    "sourceIds": [
      "n1-grammar-0073"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 987
  },
  {
    "category": "grammar",
    "front": "〜まじき",
    "back": "should not; must not",
    "exampleJp": "顧客の信頼を裏切るような行為は、プロフェッショナルにあるまじき振る舞いだ。",
    "exampleTranslation": "Actions that betray customer trust are behaviors completely unacceptable for a professional.",
    "tags": [
      "n1",
      "grammar",
      "prohibition",
      "ethics"
    ],
    "sourceIds": [
      "n1-grammar-0074"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 988
  },
  {
    "category": "grammar",
    "front": "〜ずにはおかない / 〜ないではおかない",
    "back": "will definitely; naturally cause to",
    "exampleJp": "彼の書く力強い文章は、読者の心を揺さぶらずにはおかない。",
    "exampleTranslation": "The powerful prose he writes is bound to stir the hearts of its readers.",
    "tags": [
      "n1",
      "grammar",
      "inevitable",
      "emotion"
    ],
    "sourceIds": [
      "n1-grammar-0075"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 989
  },
  {
    "category": "grammar",
    "front": "〜にかたくない",
    "back": "not hard to (imagine, guess)",
    "exampleJp": "異国の地で一人言葉の壁と戦う苦労は、想像にかたくない。",
    "exampleTranslation": "The hardship of battling the language barrier alone in a foreign land is not hard to imagine.",
    "tags": [
      "n1",
      "grammar",
      "imagination",
      "empathy"
    ],
    "sourceIds": [
      "n1-grammar-0076"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 990
  },
  {
    "category": "grammar",
    "front": "〜に〜を重ねて",
    "back": "after repeatedly doing",
    "exampleJp": "両社は協議に協議を重ねて、ようやく最終的な合意点に達した。",
    "exampleTranslation": "After holding discussion upon discussion, the two companies finally reached a definitive agreement.",
    "tags": [
      "n1",
      "grammar",
      "repetition",
      "effort"
    ],
    "sourceIds": [
      "n1-grammar-0077"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 991
  },
  {
    "category": "grammar",
    "front": "〜つ〜つ",
    "back": "doing A and B back and forth",
    "exampleJp": "マラソン大会では、先頭集団の二人が抜きつ抜かれつの激しいデッドヒートを繰り広げた。",
    "exampleTranslation": "In the marathon, the two runners in the lead pack engaged in a fierce back-and-forth dead heat, overtaking and being overtaken.",
    "tags": [
      "n1",
      "grammar",
      "alternating",
      "action"
    ],
    "sourceIds": [
      "n1-grammar-0078"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 992
  },
  {
    "category": "grammar",
    "front": "〜ては〜ては",
    "back": "repetitive actions (doing A and B repeatedly)",
    "exampleJp": "締め切りが迫る中、原稿を書いては消し、書いては消しを繰り返している。",
    "exampleTranslation": "With the deadline approaching, I am repeatedly writing and erasing, writing and erasing the manuscript.",
    "tags": [
      "n1",
      "grammar",
      "repetition",
      "frustration"
    ],
    "sourceIds": [
      "n1-grammar-0079"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 993
  },
  {
    "category": "grammar",
    "front": "〜ずくめ",
    "back": "entirely composed of; full of",
    "exampleJp": "今年は昇進が決まり、宝くじにも当たるなど、本当にいいことずくめの一年だった。",
    "exampleTranslation": "This year I got a promotion and even won the lottery; it was truly a year filled entirely with good things.",
    "tags": [
      "n1",
      "grammar",
      "entirety",
      "condition"
    ],
    "sourceIds": [
      "n1-grammar-0080"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 994
  },
  {
    "category": "grammar",
    "front": "〜まみれ",
    "back": "covered in (liquids, dirt, debt)",
    "exampleJp": "泥まみれになりながらも、選手たちは最後までボールを追い続けた。",
    "exampleTranslation": "Even while covered in mud, the players continued chasing the ball until the very end.",
    "tags": [
      "n1",
      "grammar",
      "covered",
      "negative-physical"
    ],
    "sourceIds": [
      "n1-grammar-0081"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 995
  },
  {
    "category": "grammar",
    "front": "〜ぐるみ",
    "back": "including the whole",
    "exampleJp": "その過疎の村では、地域ぐるみで伝統的な祭りを後世に残そうと活動している。",
    "exampleTranslation": "In that depopulated village, they are working as a whole community to pass down their traditional festivals to future generations.",
    "tags": [
      "n1",
      "grammar",
      "collective",
      "whole"
    ],
    "sourceIds": [
      "n1-grammar-0082"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 996
  },
  {
    "category": "grammar",
    "front": "〜並み",
    "back": "on par with; same level as",
    "exampleJp": "まだ入社三年目だが、彼の営業成績はすでにベテラン並みだ。",
    "exampleTranslation": "He is only in his third year at the company, but his sales performance is already on par with a veteran.",
    "tags": [
      "n1",
      "grammar",
      "comparison",
      "level"
    ],
    "sourceIds": [
      "n1-grammar-0083"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 997
  },
  {
    "category": "grammar",
    "front": "〜めく",
    "back": "having the air of; showing signs of",
    "exampleJp": "風の冷たさが和らぎ、日差しも少しずつ春めいてきた。",
    "exampleTranslation": "The chill of the wind has softened, and the sunlight has gradually taken on the air of spring.",
    "tags": [
      "n1",
      "grammar",
      "appearance",
      "nuance"
    ],
    "sourceIds": [
      "n1-grammar-0084"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 998
  },
  {
    "category": "grammar",
    "front": "〜びる",
    "back": "looking like; becoming",
    "exampleJp": "何年も空き家になっていたその洋館は、すっかり古びて幽霊屋敷のようだった。",
    "exampleTranslation": "That Western-style house, left vacant for years, had become completely aged and looked like a haunted mansion.",
    "tags": [
      "n1",
      "grammar",
      "appearance",
      "state"
    ],
    "sourceIds": [
      "n1-grammar-0085"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 999
  },
  {
    "category": "grammar",
    "front": "〜ぶる",
    "back": "acting like; pretending to be",
    "exampleJp": "彼は少し専門書を読んだだけで、すっかり学者ぶって偉そうなことを言う。",
    "exampleTranslation": "Having only read a few specialized books, he completely puts on the airs of a scholar and speaks condescendingly.",
    "tags": [
      "n1",
      "grammar",
      "pretense",
      "negative"
    ],
    "sourceIds": [
      "n1-grammar-0086"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1000
  },
  {
    "category": "grammar",
    "front": "〜がてら",
    "back": "while doing X, also doing Y",
    "exampleJp": "週末は運動がてら、隣町の大きな図書館まで自転車で出かけることが多い。",
    "exampleTranslation": "On weekends, combining it with exercise, I often go by bicycle to the large library in the neighboring town.",
    "tags": [
      "n1",
      "grammar",
      "simultaneous",
      "action"
    ],
    "sourceIds": [
      "n1-grammar-0087"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1001
  },
  {
    "category": "grammar",
    "front": "〜かたがた",
    "back": "while doing X as primary, doing Y",
    "exampleJp": "先日の出張の報告かたがた、お得意様に新年のご挨拶に伺った。",
    "exampleTranslation": "While primarily reporting on the recent business trip, I also paid a New Year's greeting visit to our loyal client.",
    "tags": [
      "n1",
      "grammar",
      "purpose",
      "formal"
    ],
    "sourceIds": [
      "n1-grammar-0088"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1002
  },
  {
    "category": "grammar",
    "front": "〜かたわら",
    "back": "while heavily engaged in X, doing Y",
    "exampleJp": "彼女は本業の医師としての職務をこなすかたわら、週末はボランティア活動に参加している。",
    "exampleTranslation": "While performing her main duties as a doctor, she participates in volunteer activities on the weekends.",
    "tags": [
      "n1",
      "grammar",
      "parallel",
      "lifestyle"
    ],
    "sourceIds": [
      "n1-grammar-0089"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1003
  },
  {
    "category": "grammar",
    "front": "〜をもって",
    "back": "by means of; with; at (the time)",
    "exampleJp": "本日の営業は午後八時をもって終了させていただきます。",
    "exampleTranslation": "Today's business will conclude at 8:00 PM.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0090"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1004
  },
  {
    "category": "grammar",
    "front": "〜といったところだ",
    "back": "at most; no more than",
    "exampleJp": "参加者は多くても数十人といったところだろう。",
    "exampleTranslation": "The number of participants will probably be a few dozen at most.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0091"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1005
  },
  {
    "category": "grammar",
    "front": "〜をおいて",
    "back": "no one but; none other than",
    "exampleJp": "次期社長を任せられる人材は、彼をおいて他にはいない。",
    "exampleTranslation": "There is no one but him who can be entrusted with the position of the next president.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0092"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1006
  },
  {
    "category": "grammar",
    "front": "〜もさることながら",
    "back": "not only but also",
    "exampleJp": "彼の提案はアイデアもさることながら、実現性の高さが評価された。",
    "exampleTranslation": "His proposal was praised not only for its ideas but also for its high feasibility.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0093"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1007
  },
  {
    "category": "grammar",
    "front": "〜いかんだ",
    "back": "depends on",
    "exampleJp": "今期の業績いかんによっては、ボーナスがカットされる可能性もある。",
    "exampleTranslation": "Depending on this term's performance, there is a possibility that bonuses will be cut.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0094"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1008
  },
  {
    "category": "grammar",
    "front": "〜いかんによらず",
    "back": "regardless of",
    "exampleJp": "理由のいかんによらず、納入された商品の返品は受け付けません。",
    "exampleTranslation": "Regardless of the reason, we do not accept returns of delivered products.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0095"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1009
  },
  {
    "category": "grammar",
    "front": "〜をものともせずに",
    "back": "ignoring; defying; in the face of",
    "exampleJp": "猛吹雪をものともせずに、救助隊は山へ向かった。",
    "exampleTranslation": "The rescue team headed toward the mountain, completely defying the severe blizzard.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0096"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1010
  },
  {
    "category": "grammar",
    "front": "〜をよそに",
    "back": "despite; ignoring; paying no mind to",
    "exampleJp": "親の心配をよそに、彼女は一人で海外へ旅立った。",
    "exampleTranslation": "Ignoring her parents' worries, she departed alone for overseas.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0097"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1011
  },
  {
    "category": "grammar",
    "front": "〜ならいざしらず",
    "back": "it might be different if; it's one thing if",
    "exampleJp": "新人ならいざしらず、ベテランの君がそんなミスをするとは信じられない。",
    "exampleTranslation": "It's one thing if a newcomer did it, but it is unbelievable that a veteran like you would make such a mistake.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0098"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1012
  },
  {
    "category": "grammar",
    "front": "〜んばかりだ",
    "back": "looks as if; to the point of",
    "exampleJp": "彼女は今にも泣き出さんばかりの表情で私を見つめた。",
    "exampleTranslation": "She looked at me with an expression as if she were about to burst into tears at any moment.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0099"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1013
  },
  {
    "category": "grammar",
    "front": "〜ともなく",
    "back": "without intending to; doing unconsciously",
    "exampleJp": "テレビを見るともなく見ていたら、故郷のニュースが流れてきた。",
    "exampleTranslation": "While I was idly watching television without really paying attention, news from my hometown came on.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0100"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1014
  },
  {
    "category": "grammar",
    "front": "〜きらいがある",
    "back": "to have a tendency to (negative)",
    "exampleJp": "彼は自分の意見に固執し、他人の意見を聞かないきらいがある。",
    "exampleTranslation": "He has a tendency to stick to his own opinions and not listen to the opinions of others.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0101"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1015
  },
  {
    "category": "grammar",
    "front": "〜ところを",
    "back": "despite the situation; during a certain state",
    "exampleJp": "お忙しいところをお集まりいただき、誠にありがとうございます。",
    "exampleTranslation": "Thank you very much for gathering despite being busy.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0102"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1016
  },
  {
    "category": "grammar",
    "front": "〜ものを",
    "back": "if only; even though",
    "exampleJp": "一言相談してくれれば手伝ったものを、どうして一人で抱え込んだんだ。",
    "exampleTranslation": "I would have helped if you had just asked for advice; why did you take it all on yourself?",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0103"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1017
  },
  {
    "category": "grammar",
    "front": "〜とはいえ",
    "back": "although; nonetheless",
    "exampleJp": "予算が確保できたとはいえ、まだまだ課題は山積みだ。",
    "exampleTranslation": "Although the budget has been secured, there is still a mountain of issues.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0104"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1018
  },
  {
    "category": "grammar",
    "front": "〜といえども",
    "back": "even if it is",
    "exampleJp": "未成年といえども、社会のルールは守らなければならない。",
    "exampleTranslation": "Even minors must follow the rules of society.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0105"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1019
  },
  {
    "category": "grammar",
    "front": "〜と思いきや",
    "back": "I thought it would be so, but",
    "exampleJp": "やっと仕事が終わったと思いきや、新たなトラブルが発生した。",
    "exampleTranslation": "Just when I thought work was finally over, a new problem occurred.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0106"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1020
  },
  {
    "category": "grammar",
    "front": "〜始末だ",
    "back": "end up with a bad result",
    "exampleJp": "彼は借金を重ね、ついには家まで手放す始末だ。",
    "exampleTranslation": "He piled up debt and ended up even letting go of his house.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0107"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1021
  },
  {
    "category": "grammar",
    "front": "〜っぱなしだ",
    "back": "leaving something in an improper state",
    "exampleJp": "水を出っぱなしにしておくと、もったいないですよ。",
    "exampleTranslation": "It is a waste to leave the water running.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0108"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1022
  },
  {
    "category": "grammar",
    "front": "〜たりとも",
    "back": "not even (a day/a moment/etc.)",
    "exampleJp": "試合本番では、一瞬たりとも気を抜いてはいけない。",
    "exampleTranslation": "During the actual match, you must not let your guard down for even a single moment.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0109"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1023
  },
  {
    "category": "grammar",
    "front": "〜あっての",
    "back": "which owes everything to",
    "exampleJp": "読者あっての雑誌なのだから、アンケートの意見は真摯に受け止めたい。",
    "exampleTranslation": "Since the magazine owes everything to its readers, we want to take the survey opinions seriously.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0110"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1024
  },
  {
    "category": "grammar",
    "front": "〜からある",
    "back": "as much as; over (quantity)",
    "exampleJp": "彼は１００キロからあるバーベルを軽々と持ち上げた。",
    "exampleTranslation": "He easily lifted a barbell weighing over 100 kilograms.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0111"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1025
  },
  {
    "category": "grammar",
    "front": "〜までもない",
    "back": "there is no need to",
    "exampleJp": "こんな簡単な計算、わざわざ電卓を使うまでもない。",
    "exampleTranslation": "There is no need to go out of your way to use a calculator for such a simple calculation.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0112"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1026
  },
  {
    "category": "grammar",
    "front": "〜までだ",
    "back": "that's the end of it; all one can do is",
    "exampleJp": "もし不合格なら、来年また挑戦するまでだ。",
    "exampleTranslation": "If I fail, all I can do is try again next year.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0113"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1027
  },
  {
    "category": "grammar",
    "front": "〜ばそれまでだ",
    "back": "if that happens, then that is the end of it",
    "exampleJp": "いくら高価な時計でも、壊れてしまえばそれまでだ。",
    "exampleTranslation": "No matter how expensive the watch is, if it breaks, that's the end of it.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0114"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1028
  },
  {
    "category": "grammar",
    "front": "〜にはあたらない",
    "back": "it's not worth; no need to",
    "exampleJp": "彼の才能を考えれば、今回の優勝も驚くにはあたらない。",
    "exampleTranslation": "Considering his talent, there is no need to be surprised by his victory this time.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0115"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1029
  },
  {
    "category": "grammar",
    "front": "〜でなくてなんだろう",
    "back": "what else could it be but",
    "exampleJp": "自分の命を犠牲にして他人を救う。これが愛でなくてなんだろう。",
    "exampleTranslation": "Sacrificing one's own life to save others. If this is not love, what else could it be?",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0116"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1030
  },
  {
    "category": "grammar",
    "front": "〜といったらない",
    "back": "extremely; beyond words",
    "exampleJp": "富士山頂から見たご来光の美しさといったらない。",
    "exampleTranslation": "The beauty of the sunrise seen from the summit of Mount Fuji is beyond words.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0117"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1031
  },
  {
    "category": "grammar",
    "front": "〜かぎりだ",
    "back": "feel extremely",
    "exampleJp": "長年親しんだこの町を離れるのは、寂しいかぎりだ。",
    "exampleTranslation": "It makes me feel extremely lonely to leave this town I have grown fond of over the years.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0118"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1032
  },
  {
    "category": "grammar",
    "front": "〜極まる",
    "back": "extremely",
    "exampleJp": "確認もせずにクレームをつけるとは、失礼極まる態度だ。",
    "exampleTranslation": "Complaining without even checking the facts is an extremely rude attitude.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0119"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1033
  },
  {
    "category": "grammar",
    "front": "〜極まりない",
    "back": "extremely",
    "exampleJp": "このような危険極まりない行為は、絶対に許されるものではない。",
    "exampleTranslation": "Such an extremely dangerous act can never be forgiven.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0120"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1034
  },
  {
    "category": "grammar",
    "front": "〜とは",
    "back": "I didn't expect that; to think that",
    "exampleJp": "あの真面目な彼が無断欠勤するとは、何か事情があるに違いない。",
    "exampleTranslation": "To think that such a serious guy would take an unexcused absence, there must be some circumstance behind it.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0121"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1035
  },
  {
    "category": "grammar",
    "front": "〜に堪えない",
    "back": "cannot bear to",
    "exampleJp": "多くの犠牲者が出た今回の事故は、誠に痛恨の念に堪えない。",
    "exampleTranslation": "I cannot bear the regret over this accident, which resulted in many victims.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0122"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1036
  },
  {
    "category": "grammar",
    "front": "〜と相まって",
    "back": "coupled with; together with",
    "exampleJp": "彼女の美しい声がピアノの旋律と相まって、観客を魅了した。",
    "exampleTranslation": "Her beautiful voice, coupled with the piano melody, fascinated the audience.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0123"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1037
  },
  {
    "category": "grammar",
    "front": "〜に照らして",
    "back": "in light of",
    "exampleJp": "法に照らして、この行為は明確な違法行為と言える。",
    "exampleTranslation": "In light of the law, this act can be clearly called an illegal act.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0124"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1038
  },
  {
    "category": "grammar",
    "front": "〜に則って",
    "back": "in accordance with",
    "exampleJp": "スポーツマンシップに則り、正々堂々と戦うことを誓います。",
    "exampleTranslation": "I pledge to fight fairly and squarely in accordance with sportsmanship.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0125"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1039
  },
  {
    "category": "grammar",
    "front": "〜をひかえて",
    "back": "with something coming up; in preparation for",
    "exampleJp": "入社式を明日にひかえ、新入社員たちは緊張した面持ちだ。",
    "exampleTranslation": "With the joining ceremony coming up tomorrow, the new employees look nervous.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0126"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1040
  },
  {
    "category": "grammar",
    "front": "〜を経て",
    "back": "through; after experiencing",
    "exampleJp": "三年間の厳しい修行を経て、彼はようやく一人前の寿司職人になった。",
    "exampleTranslation": "After three years of rigorous training, he finally became a fully-fledged sushi chef.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0127"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1041
  },
  {
    "category": "grammar",
    "front": "〜てみせる",
    "back": "I will definitely; I'll show you that I can",
    "exampleJp": "今度の大会では絶対に優勝してみせると、彼は力強く語った。",
    "exampleTranslation": "He spoke forcefully, saying he will definitely win the championship in the next tournament.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0128"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1042
  },
  {
    "category": "grammar",
    "front": "〜にもほどがある",
    "back": "there is a limit to; go too far",
    "exampleJp": "いくら親しい仲でも、そのような冗談は悪ふざけにもほどがある。",
    "exampleTranslation": "No matter how close you are, such a joke goes too far as a prank.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0129"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1043
  },
  {
    "category": "grammar",
    "front": "〜ようがない",
    "back": "there is no way to",
    "exampleJp": "パスワードを忘れてしまい、システムにログインしようがない。",
    "exampleTranslation": "I forgot my password, so there is no way for me to log into the system.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0130"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1044
  },
  {
    "category": "grammar",
    "front": "〜べからず",
    "back": "must not; should not",
    "exampleJp": "工事現場の入り口には、「関係者以外入るべからず」と書かれていた。",
    "exampleTranslation": "At the entrance of the construction site, it was written, 'Unauthorized persons must not enter.'",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0131"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1045
  },
  {
    "category": "grammar",
    "front": "〜べからざる",
    "back": "should not; cannot be",
    "exampleJp": "彼は政治家として許すべからざる失言をしてしまった。",
    "exampleTranslation": "He made a gaffe that should not be forgiven as a politician.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0132"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1046
  },
  {
    "category": "grammar",
    "front": "〜としたところで",
    "back": "even if",
    "exampleJp": "今さら謝罪したとしたところで、失われた信頼は取り戻せない。",
    "exampleTranslation": "Even if he were to apologize now, the lost trust cannot be regained.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0133"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1047
  },
  {
    "category": "grammar",
    "front": "〜ならまだしも",
    "back": "it would be better if; it's one thing if",
    "exampleJp": "一度だけならまだしも、三度も同じミスをするとは呆れてしまう。",
    "exampleTranslation": "It would be one thing if it was only once, but making the same mistake three times is astonishing.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0134"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1048
  },
  {
    "category": "grammar",
    "front": "〜たら最後",
    "back": "once that happens, then",
    "exampleJp": "彼は一度マイクを握ったら最後、何時間でも歌い続ける。",
    "exampleTranslation": "Once he grabs a microphone, he continues singing for hours.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0135"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1049
  },
  {
    "category": "grammar",
    "front": "〜てはかなわない",
    "back": "I can't stand it if",
    "exampleJp": "毎日こんなに遅くまで残業させられてはかなわない。",
    "exampleTranslation": "I can't stand being made to work overtime this late every day.",
    "tags": [
      "n1",
      "grammar"
    ],
    "sourceIds": [
      "n1-grammar-0136"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1050
  },
  {
    "category": "sentence",
    "front": "少子高齢化が急速に進む中、社会保障制度の抜本的な改革が急務となっている。",
    "back": "Amid the rapid progression of a declining birthrate and aging population, radical reform of the social security system has become an urgent task.",
    "exampleJp": "少子高齢化が急速に進む中、社会保障制度の抜本的な改革が急務となっている。",
    "exampleTranslation": "Amid the rapid progression of a declining birthrate and aging population, radical reform of the social security system has become an urgent task.",
    "tags": [
      "n1",
      "sentence",
      "social-issues",
      "policy"
    ],
    "sourceIds": [
      "n1-sentence-0001"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1051
  },
  {
    "category": "sentence",
    "front": "企業の社会的責任が問われる昨今、利益追求のみを目的とした経営姿勢は見直しを迫られている。",
    "back": "These days, when corporate social responsibility is scrutinized, management attitudes solely focused on profit pursuit are being forced to undergo a review.",
    "exampleJp": "企業の社会的責任が問われる昨今、利益追求のみを目的とした経営姿勢は見直しを迫られている。",
    "exampleTranslation": "These days, when corporate social responsibility is scrutinized, management attitudes solely focused on profit pursuit are being forced to undergo a review.",
    "tags": [
      "n1",
      "sentence",
      "corporate",
      "ethics"
    ],
    "sourceIds": [
      "n1-sentence-0002"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1052
  },
  {
    "category": "sentence",
    "front": "人工知能の進化は目覚ましいが、それに伴う倫理的な課題についても議論を深める必要がある。",
    "back": "The evolution of artificial intelligence is remarkable, but we also need to deepen discussions regarding the ethical challenges that accompany it.",
    "exampleJp": "人工知能の進化は目覚ましいが、それに伴う倫理的な課題についても議論を深める必要がある。",
    "exampleTranslation": "The evolution of artificial intelligence is remarkable, but we also need to deepen discussions regarding the ethical challenges that accompany it.",
    "tags": [
      "n1",
      "sentence",
      "technology",
      "ethics"
    ],
    "sourceIds": [
      "n1-sentence-0003"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1053
  },
  {
    "category": "sentence",
    "front": "都市部への人口集中が加速する一方で、地方の過疎化と地域経済の衰退に歯止めがかからない状況だ。",
    "back": "While the concentration of the population in urban areas accelerates, the depopulation of rural areas and the decline of local economies are in a situation where they cannot be halted.",
    "exampleJp": "都市部への人口集中が加速する一方で、地方の過疎化と地域経済の衰退に歯止めがかからない状況だ。",
    "exampleTranslation": "While the concentration of the population in urban areas accelerates, the depopulation of rural areas and the decline of local economies are in a situation where they cannot be halted.",
    "tags": [
      "n1",
      "sentence",
      "demographics",
      "economy"
    ],
    "sourceIds": [
      "n1-sentence-0004"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1054
  },
  {
    "category": "sentence",
    "front": "インターネットの普及により情報収集は容易になったが、情報の真偽を見極めるリテラシーがより一層求められる。",
    "back": "Gathering information has become easy with the spread of the internet, but the literacy to discern the authenticity of information is required more than ever.",
    "exampleJp": "インターネットの普及により情報収集は容易になったが、情報の真偽を見極めるリテラシーがより一層求められる。",
    "exampleTranslation": "Gathering information has become easy with the spread of the internet, but the literacy to discern the authenticity of information is required more than ever.",
    "tags": [
      "n1",
      "sentence",
      "media",
      "literacy"
    ],
    "sourceIds": [
      "n1-sentence-0005"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1055
  },
  {
    "category": "sentence",
    "front": "気候変動の影響とみられる異常気象が世界各地で頻発しており、早急な対策が国際社会全体に求められている。",
    "back": "Extreme weather events, believed to be the effects of climate change, are occurring frequently around the world, and urgent countermeasures are demanded from the entire international community.",
    "exampleJp": "気候変動の影響とみられる異常気象が世界各地で頻発しており、早急な対策が国際社会全体に求められている。",
    "exampleTranslation": "Extreme weather events, believed to be the effects of climate change, are occurring frequently around the world, and urgent countermeasures are demanded from the entire international community.",
    "tags": [
      "n1",
      "sentence",
      "environment",
      "global"
    ],
    "sourceIds": [
      "n1-sentence-0006"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1056
  },
  {
    "category": "sentence",
    "front": "文化の違いを互いに尊重し合うことが、真の異文化理解と共生社会の実現への第一歩となる。",
    "back": "Mutually respecting cultural differences is the first step toward true cross-cultural understanding and the realization of a harmonious society.",
    "exampleJp": "文化の違いを互いに尊重し合うことが、真の異文化理解と共生社会の実現への第一歩となる。",
    "exampleTranslation": "Mutually respecting cultural differences is the first step toward true cross-cultural understanding and the realization of a harmonious society.",
    "tags": [
      "n1",
      "sentence",
      "culture",
      "society"
    ],
    "sourceIds": [
      "n1-sentence-0007"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1057
  },
  {
    "category": "sentence",
    "front": "短期的な利益にとらわれず、将来を見据えた持続可能な開発目標の達成に向けて取り組む企業が増えつつある。",
    "back": "Without being caught up in short-term profits, an increasing number of companies are working toward achieving sustainable development goals with an eye to the future.",
    "exampleJp": "短期的な利益にとらわれず、将来を見据えた持続可能な開発目標の達成に向けて取り組む企業が増えつつある。",
    "exampleTranslation": "Without being caught up in short-term profits, an increasing number of companies are working toward achieving sustainable development goals with an eye to the future.",
    "tags": [
      "n1",
      "sentence",
      "business",
      "sustainability"
    ],
    "sourceIds": [
      "n1-sentence-0008"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1058
  },
  {
    "category": "sentence",
    "front": "労働力不足を補うための外国人材の受け入れは、単なる労働政策の枠を超え、社会統合の観点からの議論が不可欠だ。",
    "back": "The acceptance of foreign talent to make up for labor shortages goes beyond the framework of mere labor policy; discussion from the perspective of social integration is indispensable.",
    "exampleJp": "労働力不足を補うための外国人材の受け入れは、単なる労働政策の枠を超え、社会統合の観点からの議論が不可欠だ。",
    "exampleTranslation": "The acceptance of foreign talent to make up for labor shortages goes beyond the framework of mere labor policy; discussion from the perspective of social integration is indispensable.",
    "tags": [
      "n1",
      "sentence",
      "labor",
      "immigration"
    ],
    "sourceIds": [
      "n1-sentence-0009"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1059
  },
  {
    "category": "sentence",
    "front": "科学技術の発展は我々の生活を豊かにしたが、同時に新たな環境問題を引き起こすというジレンマを抱えている。",
    "back": "The development of science and technology has enriched our lives, but it simultaneously holds the dilemma of causing new environmental problems.",
    "exampleJp": "科学技術の発展は我々の生活を豊かにしたが、同時に新たな環境問題を引き起こすというジレンマを抱えている。",
    "exampleTranslation": "The development of science and technology has enriched our lives, but it simultaneously holds the dilemma of causing new environmental problems.",
    "tags": [
      "n1",
      "sentence",
      "science",
      "dilemma"
    ],
    "sourceIds": [
      "n1-sentence-0010"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1060
  },
  {
    "category": "sentence",
    "front": "現代の若者は物質的な豊かさよりも、精神的な充足やワークライフバランスを重視する傾向にある。",
    "back": "Modern youth tend to prioritize mental fulfillment and work-life balance over material wealth.",
    "exampleJp": "現代の若者は物質的な豊かさよりも、精神的な充足やワークライフバランスを重視する傾向にある。",
    "exampleTranslation": "Modern youth tend to prioritize mental fulfillment and work-life balance over material wealth.",
    "tags": [
      "n1",
      "sentence",
      "youth",
      "values"
    ],
    "sourceIds": [
      "n1-sentence-0011"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1061
  },
  {
    "category": "sentence",
    "front": "政府による規制緩和が市場の競争を促進し、結果的に消費者に利益をもたらすことが期待されている。",
    "back": "It is expected that deregulation by the government will promote market competition and ultimately bring benefits to consumers.",
    "exampleJp": "政府による規制緩和が市場の競争を促進し、結果的に消費者に利益をもたらすことが期待されている。",
    "exampleTranslation": "It is expected that deregulation by the government will promote market competition and ultimately bring benefits to consumers.",
    "tags": [
      "n1",
      "sentence",
      "economy",
      "policy"
    ],
    "sourceIds": [
      "n1-sentence-0012"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1062
  },
  {
    "category": "sentence",
    "front": "伝統芸術の継承には多大な時間と労力がかかるため、後継者不足が深刻な課題となっている。",
    "back": "Because inheriting traditional arts requires a tremendous amount of time and effort, the shortage of successors has become a severe issue.",
    "exampleJp": "伝統芸術の継承には多大な時間と労力がかかるため、後継者不足が深刻な課題となっている。",
    "exampleTranslation": "Because inheriting traditional arts requires a tremendous amount of time and effort, the shortage of successors has become a severe issue.",
    "tags": [
      "n1",
      "sentence",
      "culture",
      "tradition"
    ],
    "sourceIds": [
      "n1-sentence-0013"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1063
  },
  {
    "category": "sentence",
    "front": "グローバル化の進展に伴い、英語力だけでなく、多様な価値観を理解し受け入れる柔軟な思考が求められる。",
    "back": "With the advancement of globalization, what is required is not only English proficiency but also flexible thinking to understand and accept diverse values.",
    "exampleJp": "グローバル化の進展に伴い、英語力だけでなく、多様な価値観を理解し受け入れる柔軟な思考が求められる。",
    "exampleTranslation": "With the advancement of globalization, what is required is not only English proficiency but also flexible thinking to understand and accept diverse values.",
    "tags": [
      "n1",
      "sentence",
      "globalization",
      "education"
    ],
    "sourceIds": [
      "n1-sentence-0014"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1064
  },
  {
    "category": "sentence",
    "front": "この法律の解釈をめぐっては専門家の間でも意見が分かれており、一筋縄ではいかない問題である。",
    "back": "Regarding the interpretation of this law, opinions are divided even among experts, making it a problem that cannot be dealt with by ordinary means.",
    "exampleJp": "この法律の解釈をめぐっては専門家の間でも意見が分かれており、一筋縄ではいかない問題である。",
    "exampleTranslation": "Regarding the interpretation of this law, opinions are divided even among experts, making it a problem that cannot be dealt with by ordinary means.",
    "tags": [
      "n1",
      "sentence",
      "law",
      "debate"
    ],
    "sourceIds": [
      "n1-sentence-0015"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1065
  },
  {
    "category": "sentence",
    "front": "消費者の健康志向の高まりを受け、食品メーカー各社はこぞって無添加や低カロリーの商品開発に注力している。",
    "back": "In response to the rising health consciousness of consumers, food manufacturers are all uniformly focusing on developing additive-free and low-calorie products.",
    "exampleJp": "消費者の健康志向の高まりを受け、食品メーカー各社はこぞって無添加や低カロリーの商品開発に注力している。",
    "exampleTranslation": "In response to the rising health consciousness of consumers, food manufacturers are all uniformly focusing on developing additive-free and low-calorie products.",
    "tags": [
      "n1",
      "sentence",
      "consumer-trends",
      "business"
    ],
    "sourceIds": [
      "n1-sentence-0016"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1066
  },
  {
    "category": "sentence",
    "front": "長引く不況を背景に、安定した雇用を求めて公務員志望の学生が増加傾向にある。",
    "back": "Against the backdrop of a prolonged recession, there is an increasing trend of students aspiring to become civil servants in pursuit of stable employment.",
    "exampleJp": "長引く不況を背景に、安定した雇用を求めて公務員志望の学生が増加傾向にある。",
    "exampleTranslation": "Against the backdrop of a prolonged recession, there is an increasing trend of students aspiring to become civil servants in pursuit of stable employment.",
    "tags": [
      "n1",
      "sentence",
      "employment",
      "economy"
    ],
    "sourceIds": [
      "n1-sentence-0017"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1067
  },
  {
    "category": "sentence",
    "front": "画一的な教育制度からの脱却を図り、個々の生徒の才能や個性を伸ばす教育方針への転換が急がれる。",
    "back": "There is an urgent need to shift away from a standardized education system toward educational policies that develop the talents and individuality of each student.",
    "exampleJp": "画一的な教育制度からの脱却を図り、個々の生徒の才能や個性を伸ばす教育方針への転換が急がれる。",
    "exampleTranslation": "There is an urgent need to shift away from a standardized education system toward educational policies that develop the talents and individuality of each student.",
    "tags": [
      "n1",
      "sentence",
      "education",
      "reform"
    ],
    "sourceIds": [
      "n1-sentence-0018"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1068
  },
  {
    "category": "sentence",
    "front": "情報漏洩は企業の存続を揺るがす深刻な事態であり、セキュリティ対策の強化は最優先課題の一つである。",
    "back": "Information leaks are serious situations that threaten the survival of a company, and strengthening security measures is one of the top priority tasks.",
    "exampleJp": "情報漏洩は企業の存続を揺るがす深刻な事態であり、セキュリティ対策の強化は最優先課題の一つである。",
    "exampleTranslation": "Information leaks are serious situations that threaten the survival of a company, and strengthening security measures is one of the top priority tasks.",
    "tags": [
      "n1",
      "sentence",
      "corporate",
      "security"
    ],
    "sourceIds": [
      "n1-sentence-0019"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1069
  },
  {
    "category": "sentence",
    "front": "SNS上での匿名性を悪用した誹謗中傷が社会問題化しており、法的な規制を求める声が高まっている。",
    "back": "Slander and defamation abusing anonymity on social media have become a social issue, and voices demanding legal regulation are growing louder.",
    "exampleJp": "SNS上での匿名性を悪用した誹謗中傷が社会問題化しており、法的な規制を求める声が高まっている。",
    "exampleTranslation": "Slander and defamation abusing anonymity on social media have become a social issue, and voices demanding legal regulation are growing louder.",
    "tags": [
      "n1",
      "sentence",
      "social-media",
      "law"
    ],
    "sourceIds": [
      "n1-sentence-0020"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1070
  },
  {
    "category": "sentence",
    "front": "予算の制約がある中で、いかに効率的かつ効果的な行政サービスを提供できるかが地方自治体の腕の見せ所だ。",
    "back": "Under budget constraints, how efficiently and effectively administrative services can be provided is where local governments can show their skill.",
    "exampleJp": "予算の制約がある中で、いかに効率的かつ効果的な行政サービスを提供できるかが地方自治体の腕の見せ所だ。",
    "exampleTranslation": "Under budget constraints, how efficiently and effectively administrative services can be provided is where local governments can show their skill.",
    "tags": [
      "n1",
      "sentence",
      "government",
      "efficiency"
    ],
    "sourceIds": [
      "n1-sentence-0021"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1071
  },
  {
    "category": "sentence",
    "front": "この小説は単なる恋愛描写にとどまらず、人間の心の奥底に潜むエゴイズムを鋭くえぐり出している。",
    "back": "This novel is not limited to mere romantic depictions; it sharply exposes the egoism lurking in the depths of the human heart.",
    "exampleJp": "この小説は単なる恋愛描写にとどまらず、人間の心の奥底に潜むエゴイズムを鋭くえぐり出している。",
    "exampleTranslation": "This novel is not limited to mere romantic depictions; it sharply exposes the egoism lurking in the depths of the human heart.",
    "tags": [
      "n1",
      "sentence",
      "literature",
      "critique"
    ],
    "sourceIds": [
      "n1-sentence-0022"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1072
  },
  {
    "category": "sentence",
    "front": "国際協調体制が揺らぐ中、自国の利益のみを優先する保護主義的な政策が世界経済に暗い影を落としている。",
    "back": "As the framework of international cooperation wavers, protectionist policies that prioritize only a country's own interests are casting a dark shadow over the global economy.",
    "exampleJp": "国際協調体制が揺らぐ中、自国の利益のみを優先する保護主義的な政策が世界経済に暗い影を落としている。",
    "exampleTranslation": "As the framework of international cooperation wavers, protectionist policies that prioritize only a country's own interests are casting a dark shadow over the global economy.",
    "tags": [
      "n1",
      "sentence",
      "international-relations",
      "economy"
    ],
    "sourceIds": [
      "n1-sentence-0023"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1073
  },
  {
    "category": "sentence",
    "front": "技術革新のスピードが加速する現代において、生涯にわたって学び続ける姿勢が不可欠となる。",
    "back": "In the modern era where the speed of technological innovation is accelerating, an attitude of continuous learning throughout one's life becomes indispensable.",
    "exampleJp": "技術革新のスピードが加速する現代において、生涯にわたって学び続ける姿勢が不可欠となる。",
    "exampleTranslation": "In the modern era where the speed of technological innovation is accelerating, an attitude of continuous learning throughout one's life becomes indispensable.",
    "tags": [
      "n1",
      "sentence",
      "technology",
      "lifelong-learning"
    ],
    "sourceIds": [
      "n1-sentence-0024"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1074
  },
  {
    "category": "sentence",
    "front": "過酷な労働環境による従業員の疲弊は、長期的には企業の競争力低下を招くという事実を直視すべきだ。",
    "back": "We must squarely face the fact that the exhaustion of employees due to harsh working environments will lead to a decline in corporate competitiveness in the long run.",
    "exampleJp": "過酷な労働環境による従業員の疲弊は、長期的には企業の競争力低下を招くという事実を直視すべきだ。",
    "exampleTranslation": "We must squarely face the fact that the exhaustion of employees due to harsh working environments will lead to a decline in corporate competitiveness in the long run.",
    "tags": [
      "n1",
      "sentence",
      "labor",
      "corporate-strategy"
    ],
    "sourceIds": [
      "n1-sentence-0025"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1075
  },
  {
    "category": "sentence",
    "front": "歴史を振り返れば、些細な対立が発端となって大規模な戦争へと発展した事例は枚挙にいとまがない。",
    "back": "Looking back at history, instances where trivial conflicts triggered large-scale wars are too numerous to mention.",
    "exampleJp": "歴史を振り返れば、些細な対立が発端となって大規模な戦争へと発展した事例は枚挙にいとまがない。",
    "exampleTranslation": "Looking back at history, instances where trivial conflicts triggered large-scale wars are too numerous to mention.",
    "tags": [
      "n1",
      "sentence",
      "history",
      "conflict"
    ],
    "sourceIds": [
      "n1-sentence-0026"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1076
  },
  {
    "category": "sentence",
    "front": "都市計画の策定においては、利便性の追求だけでなく、景観の保全や環境への配慮も重要な要素である。",
    "back": "In formulating urban planning, not only the pursuit of convenience but also the preservation of landscapes and consideration for the environment are important factors.",
    "exampleJp": "都市計画の策定においては、利便性の追求だけでなく、景観の保全や環境への配慮も重要な要素である。",
    "exampleTranslation": "In formulating urban planning, not only the pursuit of convenience but also the preservation of landscapes and consideration for the environment are important factors.",
    "tags": [
      "n1",
      "sentence",
      "urban-planning",
      "environment"
    ],
    "sourceIds": [
      "n1-sentence-0027"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1077
  },
  {
    "category": "sentence",
    "front": "その画期的な発見は、従来の常識を根底から覆し、新たな学問分野の扉を開くものとして高く評価された。",
    "back": "That groundbreaking discovery was highly praised as something that fundamentally overturned conventional wisdom and opened the door to a new academic field.",
    "exampleJp": "その画期的な発見は、従来の常識を根底から覆し、新たな学問分野の扉を開くものとして高く評価された。",
    "exampleTranslation": "That groundbreaking discovery was highly praised as something that fundamentally overturned conventional wisdom and opened the door to a new academic field.",
    "tags": [
      "n1",
      "sentence",
      "science",
      "discovery"
    ],
    "sourceIds": [
      "n1-sentence-0028"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1078
  },
  {
    "category": "sentence",
    "front": "格差の固定化を防ぎ、誰もが平等な機会を得られる社会制度の構築は、政治の最重要課題であるべきだ。",
    "back": "Preventing the entrenchment of disparity and constructing a social system where everyone can obtain equal opportunities should be the most important task of politics.",
    "exampleJp": "格差の固定化を防ぎ、誰もが平等な機会を得られる社会制度の構築は、政治の最重要課題であるべきだ。",
    "exampleTranslation": "Preventing the entrenchment of disparity and constructing a social system where everyone can obtain equal opportunities should be the most important task of politics.",
    "tags": [
      "n1",
      "sentence",
      "politics",
      "equality"
    ],
    "sourceIds": [
      "n1-sentence-0029"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1079
  },
  {
    "category": "sentence",
    "front": "医療技術の進歩によって寿命が延びた一方で、高齢期の生活の質をどのように担保するかが新たな課題として浮上している。",
    "back": "While life expectancy has extended due to advancements in medical technology, how to ensure the quality of life in old age has emerged as a new challenge.",
    "exampleJp": "医療技術の進歩によって寿命が延びた一方で、高齢期の生活の質をどのように担保するかが新たな課題として浮上している。",
    "exampleTranslation": "While life expectancy has extended due to advancements in medical technology, how to ensure the quality of life in old age has emerged as a new challenge.",
    "tags": [
      "n1",
      "sentence",
      "healthcare",
      "aging"
    ],
    "sourceIds": [
      "n1-sentence-0030"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1080
  },
  {
    "category": "sentence",
    "front": "報道機関には、権力を監視し、国民に客観的かつ多角的な情報を提供するという重大な使命がある。",
    "back": "News organizations have a grave mission to monitor power and provide the public with objective and multifaceted information.",
    "exampleJp": "報道機関には、権力を監視し、国民に客観的かつ多角的な情報を提供するという重大な使命がある。",
    "exampleTranslation": "News organizations have a grave mission to monitor power and provide the public with objective and multifaceted information.",
    "tags": [
      "n1",
      "sentence",
      "journalism",
      "ethics"
    ],
    "sourceIds": [
      "n1-sentence-0031"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1081
  },
  {
    "category": "sentence",
    "front": "多様化する消費者のニーズに的確に応えるためには、従来のマーケティング手法にとらわれない柔軟な発想が必要だ。",
    "back": "In order to accurately respond to the diversifying needs of consumers, flexible ideas that are not bound by conventional marketing methods are necessary.",
    "exampleJp": "多様化する消費者のニーズに的確に応えるためには、従来のマーケティング手法にとらわれない柔軟な発想が必要だ。",
    "exampleTranslation": "In order to accurately respond to the diversifying needs of consumers, flexible ideas that are not bound by conventional marketing methods are necessary.",
    "tags": [
      "n1",
      "sentence",
      "marketing",
      "business"
    ],
    "sourceIds": [
      "n1-sentence-0032"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1082
  },
  {
    "category": "sentence",
    "front": "どんなに優れた制度であっても、それを運用する人々の倫理観が欠如していれば、期待される効果は得られない。",
    "back": "No matter how excellent a system is, if the people operating it lack ethical standards, the expected effects cannot be obtained.",
    "exampleJp": "どんなに優れた制度であっても、それを運用する人々の倫理観が欠如していれば、期待される効果は得られない。",
    "exampleTranslation": "No matter how excellent a system is, if the people operating it lack ethical standards, the expected effects cannot be obtained.",
    "tags": [
      "n1",
      "sentence",
      "ethics",
      "systems"
    ],
    "sourceIds": [
      "n1-sentence-0033"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1083
  },
  {
    "category": "sentence",
    "front": "地球環境の保護は、国境を越えて人類全体が協力して取り組むべき喫緊の課題である。",
    "back": "The protection of the global environment is an urgent issue that all of humanity must cooperate across borders to tackle.",
    "exampleJp": "地球環境の保護は、国境を越えて人類全体が協力して取り組むべき喫緊の課題である。",
    "exampleTranslation": "The protection of the global environment is an urgent issue that all of humanity must cooperate across borders to tackle.",
    "tags": [
      "n1",
      "sentence",
      "environment",
      "global-cooperation"
    ],
    "sourceIds": [
      "n1-sentence-0034"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1084
  },
  {
    "category": "sentence",
    "front": "過去の痛ましい戦争の記憶を風化させることなく、平和の尊さを次世代へと語り継いでいく義務が我々にはある。",
    "back": "We have an obligation to pass on the preciousness of peace to the next generation without letting the tragic memories of past wars fade away.",
    "exampleJp": "過去の痛ましい戦争の記憶を風化させることなく、平和の尊さを次世代へと語り継いでいく義務が我々にはある。",
    "exampleTranslation": "We have an obligation to pass on the preciousness of peace to the next generation without letting the tragic memories of past wars fade away.",
    "tags": [
      "n1",
      "sentence",
      "history",
      "peace"
    ],
    "sourceIds": [
      "n1-sentence-0035"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1085
  },
  {
    "category": "sentence",
    "front": "企業の不祥事が相次ぐ中、内部告発者を不利益な扱いから保護する制度の整備が急がれている。",
    "back": "Amid a succession of corporate scandals, the development of a system to protect whistleblowers from disadvantageous treatment is urgently needed.",
    "exampleJp": "企業の不祥事が相次ぐ中、内部告発者を不利益な扱いから保護する制度の整備が急がれている。",
    "exampleTranslation": "Amid a succession of corporate scandals, the development of a system to protect whistleblowers from disadvantageous treatment is urgently needed.",
    "tags": [
      "n1",
      "sentence",
      "corporate",
      "law"
    ],
    "sourceIds": [
      "n1-sentence-0036"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1086
  },
  {
    "category": "sentence",
    "front": "一見すると無駄に思える基礎研究の積み重ねが、後に思いもよらない技術革新を生み出す原動力となるのだ。",
    "back": "The accumulation of basic research, which may seem useless at first glance, becomes the driving force that later generates unexpected technological innovations.",
    "exampleJp": "一見すると無駄に思える基礎研究の積み重ねが、後に思いもよらない技術革新を生み出す原動力となるのだ。",
    "exampleTranslation": "The accumulation of basic research, which may seem useless at first glance, becomes the driving force that later generates unexpected technological innovations.",
    "tags": [
      "n1",
      "sentence",
      "science",
      "research"
    ],
    "sourceIds": [
      "n1-sentence-0037"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1087
  },
  {
    "category": "sentence",
    "front": "芸術家の生み出す作品は、当時の社会情勢や人々の精神構造を如実に映し出す鏡のような役割を果たしている。",
    "back": "The works produced by artists serve as a mirror that vividly reflects the social conditions and the psychological structure of the people of that era.",
    "exampleJp": "芸術家の生み出す作品は、当時の社会情勢や人々の精神構造を如実に映し出す鏡のような役割を果たしている。",
    "exampleTranslation": "The works produced by artists serve as a mirror that vividly reflects the social conditions and the psychological structure of the people of that era.",
    "tags": [
      "n1",
      "sentence",
      "art",
      "society"
    ],
    "sourceIds": [
      "n1-sentence-0038"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1088
  },
  {
    "category": "sentence",
    "front": "リーダーに求められるのは、強引に皆を牽引する力ではなく、多様な意見を調整し合意を形成する手腕である。",
    "back": "What is required of a leader is not the power to forcefully pull everyone along, but the skill to coordinate diverse opinions and form a consensus.",
    "exampleJp": "リーダーに求められるのは、強引に皆を牽引する力ではなく、多様な意見を調整し合意を形成する手腕である。",
    "exampleTranslation": "What is required of a leader is not the power to forcefully pull everyone along, but the skill to coordinate diverse opinions and form a consensus.",
    "tags": [
      "n1",
      "sentence",
      "leadership",
      "management"
    ],
    "sourceIds": [
      "n1-sentence-0039"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1089
  },
  {
    "category": "sentence",
    "front": "過度な競争原理の導入は、社会の活力を生む一方で、弱者切り捨ての風潮を助長する危険性をはらんでいる。",
    "back": "The introduction of excessive principles of competition, while generating societal vitality, entails the danger of fostering a trend of discarding the vulnerable.",
    "exampleJp": "過度な競争原理の導入は、社会の活力を生む一方で、弱者切り捨ての風潮を助長する危険性をはらんでいる。",
    "exampleTranslation": "The introduction of excessive principles of competition, while generating societal vitality, entails the danger of fostering a trend of discarding the vulnerable.",
    "tags": [
      "n1",
      "sentence",
      "society",
      "competition"
    ],
    "sourceIds": [
      "n1-sentence-0040"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1090
  },
  {
    "category": "sentence",
    "front": "法改正の趣旨を国民に広く周知徹底させない限り、新制度の円滑な運用は望めない。",
    "back": "Unless the intent of the legal revision is widely and thoroughly made known to the public, smooth operation of the new system cannot be expected.",
    "exampleJp": "法改正の趣旨を国民に広く周知徹底させない限り、新制度の円滑な運用は望めない。",
    "exampleTranslation": "Unless the intent of the legal revision is widely and thoroughly made known to the public, smooth operation of the new system cannot be expected.",
    "tags": [
      "n1",
      "sentence",
      "law",
      "government"
    ],
    "sourceIds": [
      "n1-sentence-0041"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1091
  },
  {
    "category": "sentence",
    "front": "資源に乏しい我が国が国際社会で生き残るためには、高度な技術力と人材の育成に投資し続けるしかない。",
    "back": "In order for our resource-poor country to survive in the international community, we have no choice but to continue investing in advanced technological capabilities and human resource development.",
    "exampleJp": "資源に乏しい我が国が国際社会で生き残るためには、高度な技術力と人材の育成に投資し続けるしかない。",
    "exampleTranslation": "In order for our resource-poor country to survive in the international community, we have no choice but to continue investing in advanced technological capabilities and human resource development.",
    "tags": [
      "n1",
      "sentence",
      "economy",
      "national-strategy"
    ],
    "sourceIds": [
      "n1-sentence-0042"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1092
  },
  {
    "category": "sentence",
    "front": "現代人はあふれる情報の中で、何が本当に重要なのかを見失い、慢性的な思考停止に陥っている節がある。",
    "back": "There is an indication that modern people, amidst an overflow of information, have lost sight of what is truly important and fallen into a chronic state of thought suspension.",
    "exampleJp": "現代人はあふれる情報の中で、何が本当に重要なのかを見失い、慢性的な思考停止に陥っている節がある。",
    "exampleTranslation": "There is an indication that modern people, amidst an overflow of information, have lost sight of what is truly important and fallen into a chronic state of thought suspension.",
    "tags": [
      "n1",
      "sentence",
      "psychology",
      "modern-life"
    ],
    "sourceIds": [
      "n1-sentence-0043"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1093
  },
  {
    "category": "sentence",
    "front": "その企業は、環境保護への取り組みをアピールすることで、ブランドイメージの大幅な向上を図っている。",
    "back": "That company is attempting a significant improvement in its brand image by promoting its initiatives for environmental protection.",
    "exampleJp": "その企業は、環境保護への取り組みをアピールすることで、ブランドイメージの大幅な向上を図っている。",
    "exampleTranslation": "That company is attempting a significant improvement in its brand image by promoting its initiatives for environmental protection.",
    "tags": [
      "n1",
      "sentence",
      "business",
      "environment"
    ],
    "sourceIds": [
      "n1-sentence-0044"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1094
  },
  {
    "category": "sentence",
    "front": "自由貿易の恩恵をすべての国民が享受できるよう、国内産業への適切な支援策を講じる必要がある。",
    "back": "It is necessary to implement appropriate support measures for domestic industries so that all citizens can enjoy the benefits of free trade.",
    "exampleJp": "自由貿易の恩恵をすべての国民が享受できるよう、国内産業への適切な支援策を講じる必要がある。",
    "exampleTranslation": "It is necessary to implement appropriate support measures for domestic industries so that all citizens can enjoy the benefits of free trade.",
    "tags": [
      "n1",
      "sentence",
      "trade",
      "policy"
    ],
    "sourceIds": [
      "n1-sentence-0045"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1095
  },
  {
    "category": "sentence",
    "front": "言語は単なるコミュニケーションの道具にとどまらず、その民族の歴史や文化、思考様式を形作る基盤である。",
    "back": "Language is not limited to being a mere tool for communication; it is the foundation that shapes a people's history, culture, and way of thinking.",
    "exampleJp": "言語は単なるコミュニケーションの道具にとどまらず、その民族の歴史や文化、思考様式を形作る基盤である。",
    "exampleTranslation": "Language is not limited to being a mere tool for communication; it is the foundation that shapes a people's history, culture, and way of thinking.",
    "tags": [
      "n1",
      "sentence",
      "language",
      "culture"
    ],
    "sourceIds": [
      "n1-sentence-0046"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1096
  },
  {
    "category": "sentence",
    "front": "この改革案は理想的ではあるものの、現場の実情を無視した机上の空論であるとの批判を免れない。",
    "back": "Although this reform proposal is ideal, it cannot escape the criticism that it is an armchair theory that ignores the realities on the ground.",
    "exampleJp": "この改革案は理想的ではあるものの、現場の実情を無視した机上の空論であるとの批判を免れない。",
    "exampleTranslation": "Although this reform proposal is ideal, it cannot escape the criticism that it is an armchair theory that ignores the realities on the ground.",
    "tags": [
      "n1",
      "sentence",
      "reform",
      "criticism"
    ],
    "sourceIds": [
      "n1-sentence-0047"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1097
  },
  {
    "category": "sentence",
    "front": "宇宙開発は人類のフロンティアを広げる壮大な挑戦だが、莫大なコストに見合うだけの成果が求められる。",
    "back": "Space exploration is a grand challenge that expands humanity's frontiers, but results commensurate with the enormous costs are demanded.",
    "exampleJp": "宇宙開発は人類のフロンティアを広げる壮大な挑戦だが、莫大なコストに見合うだけの成果が求められる。",
    "exampleTranslation": "Space exploration is a grand challenge that expands humanity's frontiers, but results commensurate with the enormous costs are demanded.",
    "tags": [
      "n1",
      "sentence",
      "space",
      "economics"
    ],
    "sourceIds": [
      "n1-sentence-0048"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1098
  },
  {
    "category": "sentence",
    "front": "地方分権を進めるには、国から地方へ権限を委譲するだけでなく、それに伴う財源の確保が不可欠だ。",
    "back": "To advance decentralization, it is indispensable not only to transfer authority from the national to local governments but also to secure the financial resources that accompany it.",
    "exampleJp": "地方分権を進めるには、国から地方へ権限を委譲するだけでなく、それに伴う財源の確保が不可欠だ。",
    "exampleTranslation": "To advance decentralization, it is indispensable not only to transfer authority from the national to local governments but also to secure the financial resources that accompany it.",
    "tags": [
      "n1",
      "sentence",
      "government",
      "finance"
    ],
    "sourceIds": [
      "n1-sentence-0049"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1099
  },
  {
    "category": "sentence",
    "front": "AIによる自動化がもたらす雇用の喪失という懸念に対し、新たな産業創出による雇用吸収が急務となっている。",
    "back": "In response to concerns about job losses brought about by AI automation, absorbing employment through the creation of new industries has become an urgent task.",
    "exampleJp": "AIによる自動化がもたらす雇用の喪失という懸念に対し、新たな産業創出による雇用吸収が急務となっている。",
    "exampleTranslation": "In response to concerns about job losses brought about by AI automation, absorbing employment through the creation of new industries has become an urgent task.",
    "tags": [
      "n1",
      "sentence",
      "technology",
      "employment"
    ],
    "sourceIds": [
      "n1-sentence-0050"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1100
  },
  {
    "category": "sentence",
    "front": "企業の不透明なガバナンス体制は、投資家の不信を招き、結果として株価の低迷を引き起こす一因となる。",
    "back": "An opaque corporate governance structure invites investor distrust and, as a result, becomes one of the causes of a slump in stock prices.",
    "exampleJp": "企業の不透明なガバナンス体制は、投資家の不信を招き、結果として株価の低迷を引き起こす一因となる。",
    "exampleTranslation": "An opaque corporate governance structure invites investor distrust and, as a result, becomes one of the causes of a slump in stock prices.",
    "tags": [
      "n1",
      "sentence",
      "corporate-governance",
      "finance"
    ],
    "sourceIds": [
      "n1-sentence-0051"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1101
  },
  {
    "category": "sentence",
    "front": "都市の再開発においては、経済的な合理性だけでなく、歴史的建造物の保存や文化的な景観との調和が求められる。",
    "back": "In urban redevelopment, not only economic rationality but also the preservation of historical buildings and harmony with the cultural landscape are required.",
    "exampleJp": "都市の再開発においては、経済的な合理性だけでなく、歴史的建造物の保存や文化的な景観との調和が求められる。",
    "exampleTranslation": "In urban redevelopment, not only economic rationality but also the preservation of historical buildings and harmony with the cultural landscape are required.",
    "tags": [
      "n1",
      "sentence",
      "urban-planning",
      "culture"
    ],
    "sourceIds": [
      "n1-sentence-0052"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1102
  },
  {
    "category": "sentence",
    "front": "貧困の連鎖を断ち切るためには、単なる金銭的な支援にとどまらず、教育機会の均等化による抜本的な解決策が必要だ。",
    "back": "In order to break the cycle of poverty, a radical solution through the equalization of educational opportunities is necessary, rather than being limited to mere financial support.",
    "exampleJp": "貧困の連鎖を断ち切るためには、単なる金銭的な支援にとどまらず、教育機会の均等化による抜本的な解決策が必要だ。",
    "exampleTranslation": "In order to break the cycle of poverty, a radical solution through the equalization of educational opportunities is necessary, rather than being limited to mere financial support.",
    "tags": [
      "n1",
      "sentence",
      "poverty",
      "education"
    ],
    "sourceIds": [
      "n1-sentence-0053"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1103
  },
  {
    "category": "sentence",
    "front": "他者の過ちを執拗に非難する風潮は、社会全体から寛容さを奪い、息苦しい世の中を作り出している。",
    "back": "The trend of relentlessly condemning the mistakes of others strips society as a whole of tolerance and is creating a suffocating world.",
    "exampleJp": "他者の過ちを執拗に非難する風潮は、社会全体から寛容さを奪い、息苦しい世の中を作り出している。",
    "exampleTranslation": "The trend of relentlessly condemning the mistakes of others strips society as a whole of tolerance and is creating a suffocating world.",
    "tags": [
      "n1",
      "sentence",
      "society",
      "psychology"
    ],
    "sourceIds": [
      "n1-sentence-0054"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1104
  },
  {
    "category": "sentence",
    "front": "気候変動への対策は、経済成長を阻害するものではなく、むしろ新たなグリーンビジネスを創出する契機と捉えるべきだ。",
    "back": "Measures against climate change should not be seen as something that hinders economic growth, but rather should be perceived as an opportunity to create new green businesses.",
    "exampleJp": "気候変動への対策は、経済成長を阻害するものではなく、むしろ新たなグリーンビジネスを創出する契機と捉えるべきだ。",
    "exampleTranslation": "Measures against climate change should not be seen as something that hinders economic growth, but rather should be perceived as an opportunity to create new green businesses.",
    "tags": [
      "n1",
      "sentence",
      "environment",
      "business"
    ],
    "sourceIds": [
      "n1-sentence-0055"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1105
  },
  {
    "category": "sentence",
    "front": "匿名を盾にしたネット上の誹謗中傷は、言論の自由の範疇を超え、他者の尊厳を著しく踏みにじる行為である。",
    "back": "Slander on the internet shielded by anonymity goes beyond the scope of freedom of speech and is an act that significantly tramples on the dignity of others.",
    "exampleJp": "匿名を盾にしたネット上の誹謗中傷は、言論の自由の範疇を超え、他者の尊厳を著しく踏みにじる行為である。",
    "exampleTranslation": "Slander on the internet shielded by anonymity goes beyond the scope of freedom of speech and is an act that significantly tramples on the dignity of others.",
    "tags": [
      "n1",
      "sentence",
      "internet",
      "ethics"
    ],
    "sourceIds": [
      "n1-sentence-0056"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1106
  },
  {
    "category": "sentence",
    "front": "企業のグローバル展開が加速する中、異文化コミュニケーションのスキルは、もはや一部のエリートのみに求められるものではない。",
    "back": "As the global expansion of companies accelerates, cross-cultural communication skills are no longer something required only of a select elite.",
    "exampleJp": "企業のグローバル展開が加速する中、異文化コミュニケーションのスキルは、もはや一部のエリートのみに求められるものではない。",
    "exampleTranslation": "As the global expansion of companies accelerates, cross-cultural communication skills are no longer something required only of a select elite.",
    "tags": [
      "n1",
      "sentence",
      "globalization",
      "skills"
    ],
    "sourceIds": [
      "n1-sentence-0057"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1107
  },
  {
    "category": "sentence",
    "front": "深刻な財政赤字を抱える我が国において、社会保障費の削減と税収増のバランスをどう取るかは、避けて通れない課題だ。",
    "back": "In our country, which bears a severe fiscal deficit, how to strike a balance between reducing social security expenses and increasing tax revenue is an unavoidable issue.",
    "exampleJp": "深刻な財政赤字を抱える我が国において、社会保障費の削減と税収増のバランスをどう取るかは、避けて通れない課題だ。",
    "exampleTranslation": "In our country, which bears a severe fiscal deficit, how to strike a balance between reducing social security expenses and increasing tax revenue is an unavoidable issue.",
    "tags": [
      "n1",
      "sentence",
      "economy",
      "government"
    ],
    "sourceIds": [
      "n1-sentence-0058"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1108
  },
  {
    "category": "sentence",
    "front": "芸術の真の価値は、その時代における市場価格によって測られるものではなく、後世の人々にどのようなインスピレーションを与えるかにある。",
    "back": "The true value of art is not measured by its market price in its own era, but lies in what kind of inspiration it gives to people in later generations.",
    "exampleJp": "芸術の真の価値は、その時代における市場価格によって測られるものではなく、後世の人々にどのようなインスピレーションを与えるかにある。",
    "exampleTranslation": "The true value of art is not measured by its market price in its own era, but lies in what kind of inspiration it gives to people in later generations.",
    "tags": [
      "n1",
      "sentence",
      "art",
      "philosophy"
    ],
    "sourceIds": [
      "n1-sentence-0059"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1109
  },
  {
    "category": "sentence",
    "front": "科学的根拠に基づかないデマがSNSを通じて瞬時に拡散する現代社会では、情報の冷静な分析力が不可欠である。",
    "back": "In modern society where hoaxes without scientific basis spread instantaneously through social media, the ability to calmly analyze information is indispensable.",
    "exampleJp": "科学的根拠に基づかないデマがSNSを通じて瞬時に拡散する現代社会では、情報の冷静な分析力が不可欠である。",
    "exampleTranslation": "In modern society where hoaxes without scientific basis spread instantaneously through social media, the ability to calmly analyze information is indispensable.",
    "tags": [
      "n1",
      "sentence",
      "information",
      "society"
    ],
    "sourceIds": [
      "n1-sentence-0060"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1110
  },
  {
    "category": "sentence",
    "front": "過度な同調圧力は、個人の自由な発想を奪い、組織の硬直化やイノベーションの阻害を招きかねない。",
    "back": "Excessive peer pressure deprives individuals of free thinking and can potentially lead to the rigidification of organizations and the obstruction of innovation.",
    "exampleJp": "過度な同調圧力は、個人の自由な発想を奪い、組織の硬直化やイノベーションの阻害を招きかねない。",
    "exampleTranslation": "Excessive peer pressure deprives individuals of free thinking and can potentially lead to the rigidification of organizations and the obstruction of innovation.",
    "tags": [
      "n1",
      "sentence",
      "psychology",
      "organization"
    ],
    "sourceIds": [
      "n1-sentence-0061"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1111
  },
  {
    "category": "sentence",
    "front": "高齢者の雇用促進は、労働力不足の解消だけでなく、高齢者自身の生きがい創出という観点からも有意義である。",
    "back": "Promoting the employment of the elderly is meaningful not only for resolving labor shortages but also from the perspective of creating a sense of purpose in life for the elderly themselves.",
    "exampleJp": "高齢者の雇用促進は、労働力不足の解消だけでなく、高齢者自身の生きがい創出という観点からも有意義である。",
    "exampleTranslation": "Promoting the employment of the elderly is meaningful not only for resolving labor shortages but also from the perspective of creating a sense of purpose in life for the elderly themselves.",
    "tags": [
      "n1",
      "sentence",
      "employment",
      "aging"
    ],
    "sourceIds": [
      "n1-sentence-0062"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1112
  },
  {
    "category": "sentence",
    "front": "歴史的建造物の修復においては、オリジナルの景観を損なうことなく、現代の耐震基準を満たすという高度な技術が要求される。",
    "back": "In the restoration of historical buildings, advanced technology is required to meet modern seismic standards without spoiling the original aesthetic.",
    "exampleJp": "歴史的建造物の修復においては、オリジナルの景観を損なうことなく、現代の耐震基準を満たすという高度な技術が要求される。",
    "exampleTranslation": "In the restoration of historical buildings, advanced technology is required to meet modern seismic standards without spoiling the original aesthetic.",
    "tags": [
      "n1",
      "sentence",
      "architecture",
      "technology"
    ],
    "sourceIds": [
      "n1-sentence-0063"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1113
  },
  {
    "category": "sentence",
    "front": "グローバルな競争が激化する中、企業が生き残るためには、他社には真似できない独自のコアコンピタンスを確立する必要がある。",
    "back": "As global competition intensifies, in order for a company to survive, it is necessary to establish unique core competencies that other companies cannot imitate.",
    "exampleJp": "グローバルな競争が激化する中、企業が生き残るためには、他社には真似できない独自のコアコンピタンスを確立する必要がある。",
    "exampleTranslation": "As global competition intensifies, in order for a company to survive, it is necessary to establish unique core competencies that other companies cannot imitate.",
    "tags": [
      "n1",
      "sentence",
      "business",
      "strategy"
    ],
    "sourceIds": [
      "n1-sentence-0064"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1114
  },
  {
    "category": "sentence",
    "front": "司法制度改革の本来の目的は、裁判を国民にとってより身近で、迅速かつ理解しやすいものにすることにあったはずだ。",
    "back": "The original purpose of judicial system reform was supposed to be making trials more accessible, prompt, and easy to understand for the public.",
    "exampleJp": "司法制度改革の本来の目的は、裁判を国民にとってより身近で、迅速かつ理解しやすいものにすることにあったはずだ。",
    "exampleTranslation": "The original purpose of judicial system reform was supposed to be making trials more accessible, prompt, and easy to understand for the public.",
    "tags": [
      "n1",
      "sentence",
      "law",
      "government"
    ],
    "sourceIds": [
      "n1-sentence-0065"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1115
  },
  {
    "category": "sentence",
    "front": "地域固有の文化財は、一度破壊されれば二度と復元できない不可逆的な性質を持つため、保護には細心の注意が必要だ。",
    "back": "Because region-specific cultural properties have an irreversible nature where they can never be restored once destroyed, meticulous care is required for their protection.",
    "exampleJp": "地域固有の文化財は、一度破壊されれば二度と復元できない不可逆的な性質を持つため、保護には細心の注意が必要だ。",
    "exampleTranslation": "Because region-specific cultural properties have an irreversible nature where they can never be restored once destroyed, meticulous care is required for their protection.",
    "tags": [
      "n1",
      "sentence",
      "culture",
      "preservation"
    ],
    "sourceIds": [
      "n1-sentence-0066"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1116
  },
  {
    "category": "sentence",
    "front": "消費者のプライバシー保護と、ビッグデータ活用によるサービスの利便性向上という、二つの相反する課題の両立が求められている。",
    "back": "A balance is required between two conflicting challenges: protecting consumer privacy and improving service convenience through the utilization of big data.",
    "exampleJp": "消費者のプライバシー保護と、ビッグデータ活用によるサービスの利便性向上という、二つの相反する課題の両立が求められている。",
    "exampleTranslation": "A balance is required between two conflicting challenges: protecting consumer privacy and improving service convenience through the utilization of big data.",
    "tags": [
      "n1",
      "sentence",
      "privacy",
      "technology"
    ],
    "sourceIds": [
      "n1-sentence-0067"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1117
  },
  {
    "category": "sentence",
    "front": "現代の民主主義社会においては、多数決が常に正しいとは限らず、少数派の意見にも真摯に耳を傾ける包摂性が不可欠だ。",
    "back": "In a modern democratic society, majority rule is not always correct, and inclusivity that sincerely listens to the opinions of the minority is indispensable.",
    "exampleJp": "現代の民主主義社会においては、多数決が常に正しいとは限らず、少数派の意見にも真摯に耳を傾ける包摂性が不可欠だ。",
    "exampleTranslation": "In a modern democratic society, majority rule is not always correct, and inclusivity that sincerely listens to the opinions of the minority is indispensable.",
    "tags": [
      "n1",
      "sentence",
      "politics",
      "democracy"
    ],
    "sourceIds": [
      "n1-sentence-0068"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1118
  },
  {
    "category": "sentence",
    "front": "地球温暖化がもたらす海面上昇は、遠い将来の懸念ではなく、島国にとってはすでに現実の脅威となっている。",
    "back": "The sea-level rise brought about by global warming is not a concern for the distant future; for island nations, it is already a real threat.",
    "exampleJp": "地球温暖化がもたらす海面上昇は、遠い将来の懸念ではなく、島国にとってはすでに現実の脅威となっている。",
    "exampleTranslation": "The sea-level rise brought about by global warming is not a concern for the distant future; for island nations, it is already a real threat.",
    "tags": [
      "n1",
      "sentence",
      "environment",
      "climate-change"
    ],
    "sourceIds": [
      "n1-sentence-0069"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1119
  },
  {
    "category": "sentence",
    "front": "リーダーシップとは、単に権力を行使することではなく、自らのビジョンを示し、人々の共感を呼び起こす影響力のことである。",
    "back": "Leadership is not simply the exercise of power, but the influence to demonstrate one's vision and evoke empathy from people.",
    "exampleJp": "リーダーシップとは、単に権力を行使することではなく、自らのビジョンを示し、人々の共感を呼び起こす影響力のことである。",
    "exampleTranslation": "Leadership is not simply the exercise of power, but the influence to demonstrate one's vision and evoke empathy from people.",
    "tags": [
      "n1",
      "sentence",
      "leadership",
      "philosophy"
    ],
    "sourceIds": [
      "n1-sentence-0070"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1120
  },
  {
    "category": "sentence",
    "front": "少子高齢化に伴う労働力不足は、もはや一企業の問題にとどまらず、日本社会全体が直面する深刻な課題となっている。",
    "back": "The labor shortage accompanying the declining birthrate and aging population is no longer a problem for a single company, but has become a serious issue facing Japanese society as a whole.",
    "exampleJp": "少子高齢化に伴う労働力不足は、もはや一企業の問題にとどまらず、日本社会全体が直面する深刻な課題となっている。",
    "exampleTranslation": "The labor shortage accompanying the declining birthrate and aging population is no longer a problem for a single company, but has become a serious issue facing Japanese society as a whole.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0071"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1121
  },
  {
    "category": "sentence",
    "front": "温暖化対策を推し進めるためには、政府による法整備もさることながら、市民一人ひとりの意識改革が不可欠だ。",
    "back": "In order to promote global warming countermeasures, legal frameworks by the government are certainly important, but a change in mindset of each individual citizen is indispensable.",
    "exampleJp": "温暖化対策を推し進めるためには、政府による法整備もさることながら、市民一人ひとりの意識改革が不可欠だ。",
    "exampleTranslation": "In order to promote global warming countermeasures, legal frameworks by the government are certainly important, but a change in mindset of each individual citizen is indispensable.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0072"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1122
  },
  {
    "category": "sentence",
    "front": "最近のAI技術の進歩は目覚ましく、これまで人間にしかできないと思われていた創造的な仕事すら、機械に代替されかねない。",
    "back": "The recent progress in AI technology is remarkable, and even creative jobs that were previously thought to be possible only for humans could potentially be replaced by machines.",
    "exampleJp": "最近のAI技術の進歩は目覚ましく、これまで人間にしかできないと思われていた創造的な仕事すら、機械に代替されかねない。",
    "exampleTranslation": "The recent progress in AI technology is remarkable, and even creative jobs that were previously thought to be possible only for humans could potentially be replaced by machines.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0073"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1123
  },
  {
    "category": "sentence",
    "front": "その画期的な新薬は、長年難病に苦しんできた患者たちにとって、まさに一筋の光明にほかならない。",
    "back": "That epoch-making new drug is nothing but a ray of hope for patients who have suffered from incurable diseases for many years.",
    "exampleJp": "その画期的な新薬は、長年難病に苦しんできた患者たちにとって、まさに一筋の光明にほかならない。",
    "exampleTranslation": "That epoch-making new drug is nothing but a ray of hope for patients who have suffered from incurable diseases for many years.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0074"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1124
  },
  {
    "category": "sentence",
    "front": "大規模な自然災害が発生した際、SNS上の真偽不明な情報が人々の不安を煽り、パニックを引き起こすきらいがある。",
    "back": "When a large-scale natural disaster occurs, information of unknown authenticity on social media tends to fan people's anxiety and cause panic.",
    "exampleJp": "大規模な自然災害が発生した際、SNS上の真偽不明な情報が人々の不安を煽り、パニックを引き起こすきらいがある。",
    "exampleTranslation": "When a large-scale natural disaster occurs, information of unknown authenticity on social media tends to fan people's anxiety and cause panic.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0075"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1125
  },
  {
    "category": "sentence",
    "front": "予算削減のあおりを受け、地方の公共交通機関は路線の縮小や廃止を余儀なくされているのが現状だ。",
    "back": "Under the influence of budget cuts, local public transportation is currently being forced to reduce or abolish routes.",
    "exampleJp": "予算削減のあおりを受け、地方の公共交通機関は路線の縮小や廃止を余儀なくされているのが現状だ。",
    "exampleTranslation": "Under the influence of budget cuts, local public transportation is currently being forced to reduce or abolish routes.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0076"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1126
  },
  {
    "category": "sentence",
    "front": "グローバル化が進む現代にあって、異文化を理解し尊重する姿勢は、ビジネスパーソンに必須の資質と言えよう。",
    "back": "In today's increasingly globalized world, the attitude to understand and respect different cultures can be said to be an essential quality for business professionals.",
    "exampleJp": "グローバル化が進む現代にあって、異文化を理解し尊重する姿勢は、ビジネスパーソンに必須の資質と言えよう。",
    "exampleTranslation": "In today's increasingly globalized world, the attitude to understand and respect different cultures can be said to be an essential quality for business professionals.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0077"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1127
  },
  {
    "category": "sentence",
    "front": "消費者のプライバシー保護に対する意識が高まる中、企業は個人情報の取り扱いに細心の注意を払わなければならない。",
    "back": "As consumer awareness of privacy protection grows, companies must pay the utmost attention to the handling of personal information.",
    "exampleJp": "消費者のプライバシー保護に対する意識が高まる中、企業は個人情報の取り扱いに細心の注意を払わなければならない。",
    "exampleTranslation": "As consumer awareness of privacy protection grows, companies must pay the utmost attention to the handling of personal information.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0078"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1128
  },
  {
    "category": "sentence",
    "front": "自動運転技術の実用化に向けて、技術的な課題をクリアするだけでなく、事故時の法的責任の所在を明確にする必要がある。",
    "back": "Towards the practical application of autonomous driving technology, it is necessary not only to clear technical challenges but also to clarify where legal responsibility lies in the event of an accident.",
    "exampleJp": "自動運転技術の実用化に向けて、技術的な課題をクリアするだけでなく、事故時の法的責任の所在を明確にする必要がある。",
    "exampleTranslation": "Towards the practical application of autonomous driving technology, it is necessary not only to clear technical challenges but also to clarify where legal responsibility lies in the event of an accident.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0079"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1129
  },
  {
    "category": "sentence",
    "front": "一度失われた自然環境を元の状態に戻すのは、莫大な時間と費用を要する至難の業である。",
    "back": "Restoring a natural environment to its original state once it has been lost is a tremendously difficult task requiring enormous amounts of time and money.",
    "exampleJp": "一度失われた自然環境を元の状態に戻すのは、莫大な時間と費用を要する至難の業である。",
    "exampleTranslation": "Restoring a natural environment to its original state once it has been lost is a tremendously difficult task requiring enormous amounts of time and money.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0080"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1130
  },
  {
    "category": "sentence",
    "front": "再生可能エネルギーへの転換は、持続可能な社会を実現する上で避けて通れない道だ。",
    "back": "The transition to renewable energy is an unavoidable path for realizing a sustainable society.",
    "exampleJp": "再生可能エネルギーへの転換は、持続可能な社会を実現する上で避けて通れない道だ。",
    "exampleTranslation": "The transition to renewable energy is an unavoidable path for realizing a sustainable society.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0081"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1131
  },
  {
    "category": "sentence",
    "front": "インターネットの普及により、誰もが容易に情報を発信できるようになった反面、デマや誹謗中傷が瞬く間に拡散するリスクも抱えている。",
    "back": "While the spread of the internet has made it easy for anyone to transmit information, it also carries the risk of rumors and defamation spreading in the blink of an eye.",
    "exampleJp": "インターネットの普及により、誰もが容易に情報を発信できるようになった反面、デマや誹謗中傷が瞬く間に拡散するリスクも抱えている。",
    "exampleTranslation": "While the spread of the internet has made it easy for anyone to transmit information, it also carries the risk of rumors and defamation spreading in the blink of an eye.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0082"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1132
  },
  {
    "category": "sentence",
    "front": "働き方改革の一環としてテレワークを導入する企業が増えたが、コミュニケーション不足による業務への支障を懸念する声も少なくない。",
    "back": "An increasing number of companies have introduced telework as part of work-style reforms, but there are quite a few voices concerned about hindrances to operations due to a lack of communication.",
    "exampleJp": "働き方改革の一環としてテレワークを導入する企業が増えたが、コミュニケーション不足による業務への支障を懸念する声も少なくない。",
    "exampleTranslation": "An increasing number of companies have introduced telework as part of work-style reforms, but there are quite a few voices concerned about hindrances to operations due to a lack of communication.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0083"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1133
  },
  {
    "category": "sentence",
    "front": "遺伝子治療は医療の飛躍的な進歩をもたらす可能性がある一方で、生命の尊厳に関わる倫理的な問題を孕んでいる。",
    "back": "Gene therapy holds the potential to bring about dramatic progress in medicine, but on the other hand, it is fraught with ethical issues concerning the dignity of life.",
    "exampleJp": "遺伝子治療は医療の飛躍的な進歩をもたらす可能性がある一方で、生命の尊厳に関わる倫理的な問題を孕んでいる。",
    "exampleTranslation": "Gene therapy holds the potential to bring about dramatic progress in medicine, but on the other hand, it is fraught with ethical issues concerning the dignity of life.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0084"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1134
  },
  {
    "category": "sentence",
    "front": "資源の乏しい我が国が国際社会で生き残るためには、科学技術の振興と優秀な人材の育成に投資するよりほかない。",
    "back": "In order for our resource-poor country to survive in the international community, we have no choice but to invest in the promotion of science and technology and the development of excellent human resources.",
    "exampleJp": "資源の乏しい我が国が国際社会で生き残るためには、科学技術の振興と優秀な人材の育成に投資するよりほかない。",
    "exampleTranslation": "In order for our resource-poor country to survive in the international community, we have no choice but to invest in the promotion of science and technology and the development of excellent human resources.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0085"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1135
  },
  {
    "category": "sentence",
    "front": "現代の消費者は、単に商品の機能や価格だけでなく、その背後にある企業の社会的責任や環境への配慮を重視する傾向にある。",
    "back": "Modern consumers tend to place importance not only on the functionality and price of products but also on the corporate social responsibility and environmental consideration behind them.",
    "exampleJp": "現代の消費者は、単に商品の機能や価格だけでなく、その背後にある企業の社会的責任や環境への配慮を重視する傾向にある。",
    "exampleTranslation": "Modern consumers tend to place importance not only on the functionality and price of products but also on the corporate social responsibility and environmental consideration behind them.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0086"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1136
  },
  {
    "category": "sentence",
    "front": "高齢者の運転による交通事故が多発している事態を受け、免許の自主返納を促すための制度拡充が急務となっている。",
    "back": "In response to the frequent occurrence of traffic accidents caused by elderly drivers, expanding systems to encourage the voluntary return of driver's licenses has become an urgent task.",
    "exampleJp": "高齢者の運転による交通事故が多発している事態を受け、免許の自主返納を促すための制度拡充が急務となっている。",
    "exampleTranslation": "In response to the frequent occurrence of traffic accidents caused by elderly drivers, expanding systems to encourage the voluntary return of driver's licenses has become an urgent task.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0087"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1137
  },
  {
    "category": "sentence",
    "front": "観光客の急増によってもたらされる経済効果の裏で、地域住民の生活環境の悪化という深刻な弊害が生じている。",
    "back": "Behind the economic effects brought about by the surge in tourists, serious adverse effects such as the deterioration of the living environment for local residents are occurring.",
    "exampleJp": "観光客の急増によってもたらされる経済効果の裏で、地域住民の生活環境の悪化という深刻な弊害が生じている。",
    "exampleTranslation": "Behind the economic effects brought about by the surge in tourists, serious adverse effects such as the deterioration of the living environment for local residents are occurring.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0088"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1138
  },
  {
    "category": "sentence",
    "front": "ネットショッピングの需要拡大に伴い、物流業界ではドライバーの長時間労働や人手不足が常態化しており、抜本的な対策が求められている。",
    "back": "With the expansion of demand for online shopping, long working hours and labor shortages for drivers have become chronic in the logistics industry, requiring drastic measures.",
    "exampleJp": "ネットショッピングの需要拡大に伴い、物流業界ではドライバーの長時間労働や人手不足が常態化しており、抜本的な対策が求められている。",
    "exampleTranslation": "With the expansion of demand for online shopping, long working hours and labor shortages for drivers have become chronic in the logistics industry, requiring drastic measures.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0089"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1139
  },
  {
    "category": "sentence",
    "front": "感染症のパンデミックを経験した我々は、これまでの当たり前の日常がいかに脆い土台の上に成り立っていたかを痛感させられた。",
    "back": "Having experienced the pandemic of an infectious disease, we were made to keenly realize how fragile a foundation our previously taken-for-granted daily lives were built upon.",
    "exampleJp": "感染症のパンデミックを経験した我々は、これまでの当たり前の日常がいかに脆い土台の上に成り立っていたかを痛感させられた。",
    "exampleTranslation": "Having experienced the pandemic of an infectious disease, we were made to keenly realize how fragile a foundation our previously taken-for-granted daily lives were built upon.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0090"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1140
  },
  {
    "category": "sentence",
    "front": "その政治家は、国民の強い批判をよそに、自らの信念を貫き通すと宣言した。",
    "back": "Ignoring strong criticism from the public, the politician declared that he would stick to his own beliefs to the end.",
    "exampleJp": "その政治家は、国民の強い批判をよそに、自らの信念を貫き通すと宣言した。",
    "exampleTranslation": "Ignoring strong criticism from the public, the politician declared that he would stick to his own beliefs to the end.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0091"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1141
  },
  {
    "category": "sentence",
    "front": "昨今の異常気象は、地球温暖化がもたらす影響の深刻さを如実に物語っている。",
    "back": "The extreme weather in recent years vividly illustrates the severity of the impacts brought about by global warming.",
    "exampleJp": "昨今の異常気象は、地球温暖化がもたらす影響の深刻さを如実に物語っている。",
    "exampleTranslation": "The extreme weather in recent years vividly illustrates the severity of the impacts brought about by global warming.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0092"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1142
  },
  {
    "category": "sentence",
    "front": "経済格差の拡大は、社会の分断を招き、民主主義の根幹を揺るがしかねない重大な問題だ。",
    "back": "The widening of economic disparity is a serious problem that could lead to social division and shake the very foundations of democracy.",
    "exampleJp": "経済格差の拡大は、社会の分断を招き、民主主義の根幹を揺るがしかねない重大な問題だ。",
    "exampleTranslation": "The widening of economic disparity is a serious problem that could lead to social division and shake the very foundations of democracy.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0093"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1143
  },
  {
    "category": "sentence",
    "front": "都市部への人口集中が加速する一方で、地方では過疎化と高齢化が同時進行し、集落の存続すら危ぶまれている。",
    "back": "While population concentration in urban areas accelerates, depopulation and aging are progressing simultaneously in rural areas, to the point where even the survival of villages is in danger.",
    "exampleJp": "都市部への人口集中が加速する一方で、地方では過疎化と高齢化が同時進行し、集落の存続すら危ぶまれている。",
    "exampleTranslation": "While population concentration in urban areas accelerates, depopulation and aging are progressing simultaneously in rural areas, to the point where even the survival of villages is in danger.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0094"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1144
  },
  {
    "category": "sentence",
    "front": "膨大なデータを瞬時に解析するAIの登場は、医療現場における診断の精度と速度を飛躍的に向上させた。",
    "back": "The advent of AI capable of instantaneously analyzing vast amounts of data has dramatically improved the accuracy and speed of diagnoses in medical settings.",
    "exampleJp": "膨大なデータを瞬時に解析するAIの登場は、医療現場における診断の精度と速度を飛躍的に向上させた。",
    "exampleTranslation": "The advent of AI capable of instantaneously analyzing vast amounts of data has dramatically improved the accuracy and speed of diagnoses in medical settings.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0095"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1145
  },
  {
    "category": "sentence",
    "front": "キャッシュレス決済の普及は利便性をもたらす半面、システム障害が発生した際の社会的混乱のリスクを浮き彫りにした。",
    "back": "The spread of cashless payments provides convenience, but on the flip side, it has highlighted the risk of social chaos in the event of a system failure.",
    "exampleJp": "キャッシュレス決済の普及は利便性をもたらす半面、システム障害が発生した際の社会的混乱のリスクを浮き彫りにした。",
    "exampleTranslation": "The spread of cashless payments provides convenience, but on the flip side, it has highlighted the risk of social chaos in the event of a system failure.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0096"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1146
  },
  {
    "category": "sentence",
    "front": "多様な価値観が交錯する現代において、単一の正解を求める教育から、自ら問いを立てて解決する力を養う教育への転換が必要だ。",
    "back": "In modern times where diverse values intersect, there is a need for a shift from education seeking a single correct answer to education that cultivates the ability to ask one's own questions and solve them.",
    "exampleJp": "多様な価値観が交錯する現代において、単一の正解を求める教育から、自ら問いを立てて解決する力を養う教育への転換が必要だ。",
    "exampleTranslation": "In modern times where diverse values intersect, there is a need for a shift from education seeking a single correct answer to education that cultivates the ability to ask one's own questions and solve them.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0097"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1147
  },
  {
    "category": "sentence",
    "front": "食料自給率の低下に歯止めをかけるためには、農業の担い手不足を解消し、持続可能な農業経営を支援する政策が不可欠である。",
    "back": "To put the brakes on the decline in the food self-sufficiency rate, policies that resolve the shortage of agricultural workers and support sustainable farm management are essential.",
    "exampleJp": "食料自給率の低下に歯止めをかけるためには、農業の担い手不足を解消し、持続可能な農業経営を支援する政策が不可欠である。",
    "exampleTranslation": "To put the brakes on the decline in the food self-sufficiency rate, policies that resolve the shortage of agricultural workers and support sustainable farm management are essential.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0098"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1148
  },
  {
    "category": "sentence",
    "front": "企業のコンプライアンス違反は、社会的信用の失墜にとどまらず、企業の存続そのものを危うくする。",
    "back": "A company's compliance violations not only result in a loss of social credibility but also endanger the very survival of the company.",
    "exampleJp": "企業のコンプライアンス違反は、社会的信用の失墜にとどまらず、企業の存続そのものを危うくする。",
    "exampleTranslation": "A company's compliance violations not only result in a loss of social credibility but also endanger the very survival of the company.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0099"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1149
  },
  {
    "category": "sentence",
    "front": "宇宙開発は、未知の世界への探求というロマンもさることながら、地球規模の課題解決につながる実用的な側面も持ち合わせている。",
    "back": "Space exploration is certainly romantic as a quest into the unknown, but it also possesses a practical aspect that leads to the resolution of global issues.",
    "exampleJp": "宇宙開発は、未知の世界への探求というロマンもさることながら、地球規模の課題解決につながる実用的な側面も持ち合わせている。",
    "exampleTranslation": "Space exploration is certainly romantic as a quest into the unknown, but it also possesses a practical aspect that leads to the resolution of global issues.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0100"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1150
  },
  {
    "category": "sentence",
    "front": "現代人は情報過多の環境に置かれており、必要な情報と不必要な情報を取捨選択するリテラシーが求められている。",
    "back": "People today are placed in an environment of information overload and are required to have the literacy to select necessary information and discard unnecessary information.",
    "exampleJp": "現代人は情報過多の環境に置かれており、必要な情報と不必要な情報を取捨選択するリテラシーが求められている。",
    "exampleTranslation": "People today are placed in an environment of information overload and are required to have the literacy to select necessary information and discard unnecessary information.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0101"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1151
  },
  {
    "category": "sentence",
    "front": "長引く不況の中で、企業は目先の利益を追求するあまり、将来を見据えた研究開発投資を怠るきらいがある。",
    "back": "In the midst of a prolonged recession, companies tend to neglect forward-looking research and development investments due to pursuing short-term profits too much.",
    "exampleJp": "長引く不況の中で、企業は目先の利益を追求するあまり、将来を見据えた研究開発投資を怠るきらいがある。",
    "exampleTranslation": "In the midst of a prolonged recession, companies tend to neglect forward-looking research and development investments due to pursuing short-term profits too much.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0102"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1152
  },
  {
    "category": "sentence",
    "front": "外国人労働者の受け入れ拡大は、労働力不足の緩和に寄与する反面、日本語教育や生活支援といった課題も突きつけている。",
    "back": "While expanding the acceptance of foreign workers contributes to alleviating labor shortages, it also poses challenges such as Japanese language education and livelihood support.",
    "exampleJp": "外国人労働者の受け入れ拡大は、労働力不足の緩和に寄与する反面、日本語教育や生活支援といった課題も突きつけている。",
    "exampleTranslation": "While expanding the acceptance of foreign workers contributes to alleviating labor shortages, it also poses challenges such as Japanese language education and livelihood support.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0103"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1153
  },
  {
    "category": "sentence",
    "front": "過去の失敗から教訓を汲み取り、次なるイノベーションの糧とすることこそ、企業が成長し続けるための要諦である。",
    "back": "Drawing lessons from past failures and making them the nourishment for the next innovation is precisely the key to a company continuing to grow.",
    "exampleJp": "過去の失敗から教訓を汲み取り、次なるイノベーションの糧とすることこそ、企業が成長し続けるための要諦である。",
    "exampleTranslation": "Drawing lessons from past failures and making them the nourishment for the next innovation is precisely the key to a company continuing to grow.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0104"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1154
  },
  {
    "category": "sentence",
    "front": "児童虐待の悲惨な事件が後を絶たない現状にあって、地域社会全体で子どもを見守るネットワークの構築が急がれる。",
    "back": "In the current situation where tragic incidents of child abuse are unending, the construction of a network to watch over children across the entire local community is urgently needed.",
    "exampleJp": "児童虐待の悲惨な事件が後を絶たない現状にあって、地域社会全体で子どもを見守るネットワークの構築が急がれる。",
    "exampleTranslation": "In the current situation where tragic incidents of child abuse are unending, the construction of a network to watch over children across the entire local community is urgently needed.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0105"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1155
  },
  {
    "category": "sentence",
    "front": "テクノロジーの進化が雇用のあり方を根本から変えようとしている今、生涯にわたって学び続ける姿勢が不可欠となっている。",
    "back": "Now that the evolution of technology is fundamentally trying to change the nature of employment, a lifelong attitude of continuous learning has become indispensable.",
    "exampleJp": "テクノロジーの進化が雇用のあり方を根本から変えようとしている今、生涯にわたって学び続ける姿勢が不可欠となっている。",
    "exampleTranslation": "Now that the evolution of technology is fundamentally trying to change the nature of employment, a lifelong attitude of continuous learning has become indispensable.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0106"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1156
  },
  {
    "category": "sentence",
    "front": "文化財の保存と公開は、過去の歴史を後世に伝える重要な使命であると同時に、観光資源としての価値も高く評価されている。",
    "back": "The preservation and public exhibition of cultural properties is an important mission to pass past history on to future generations, and at the same time, its value as a tourism resource is highly evaluated.",
    "exampleJp": "文化財の保存と公開は、過去の歴史を後世に伝える重要な使命であると同時に、観光資源としての価値も高く評価されている。",
    "exampleTranslation": "The preservation and public exhibition of cultural properties is an important mission to pass past history on to future generations, and at the same time, its value as a tourism resource is highly evaluated.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0107"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1157
  },
  {
    "category": "sentence",
    "front": "匿名性を盾にしたネット上の誹謗中傷は、被害者に回復困難な精神的苦痛を与えるものであり、決して許されるべきではない。",
    "back": "Online slander using anonymity as a shield inflicts severely hard-to-recover psychological pain on victims and must never be forgiven.",
    "exampleJp": "匿名性を盾にしたネット上の誹謗中傷は、被害者に回復困難な精神的苦痛を与えるものであり、決して許されるべきではない。",
    "exampleTranslation": "Online slander using anonymity as a shield inflicts severely hard-to-recover psychological pain on victims and must never be forgiven.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0108"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1158
  },
  {
    "category": "sentence",
    "front": "国際社会が協調して気候変動問題に取り組まない限り、地球規模の環境破壊を食い止めることは不可能に近い。",
    "back": "Unless the international community works together to tackle the issue of climate change, it is nearly impossible to halt global environmental destruction.",
    "exampleJp": "国際社会が協調して気候変動問題に取り組まない限り、地球規模の環境破壊を食い止めることは不可能に近い。",
    "exampleTranslation": "Unless the international community works together to tackle the issue of climate change, it is nearly impossible to halt global environmental destruction.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0109"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1159
  },
  {
    "category": "sentence",
    "front": "現代の医療は、単に病気を治すことにとどまらず、患者の生活の質（QOL）の向上を重視する方向へシフトしている。",
    "back": "Modern medicine is shifting toward a direction that emphasizes improving the patient's quality of life (QOL), rather than stopping merely at curing diseases.",
    "exampleJp": "現代の医療は、単に病気を治すことにとどまらず、患者の生活の質（QOL）の向上を重視する方向へシフトしている。",
    "exampleTranslation": "Modern medicine is shifting toward a direction that emphasizes improving the patient's quality of life (QOL), rather than stopping merely at curing diseases.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0110"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1160
  },
  {
    "category": "sentence",
    "front": "女性の社会進出を阻む見えない壁を打ち破るには、制度の充実だけでなく、職場における無意識の偏見を払拭する必要がある。",
    "back": "To break down the invisible walls hindering women's social advancement, it is necessary not only to improve systems but also to wipe out unconscious biases in the workplace.",
    "exampleJp": "女性の社会進出を阻む見えない壁を打ち破るには、制度の充実だけでなく、職場における無意識の偏見を払拭する必要がある。",
    "exampleTranslation": "To break down the invisible walls hindering women's social advancement, it is necessary not only to improve systems but also to wipe out unconscious biases in the workplace.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0111"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1161
  },
  {
    "category": "sentence",
    "front": "選挙の投票率低下は、国民の政治に対する無関心の表れであり、民主主義の機能不全を招きかねない。",
    "back": "The decline in voter turnout in elections is a manifestation of public apathy toward politics and could invite a malfunction of democracy.",
    "exampleJp": "選挙の投票率低下は、国民の政治に対する無関心の表れであり、民主主義の機能不全を招きかねない。",
    "exampleTranslation": "The decline in voter turnout in elections is a manifestation of public apathy toward politics and could invite a malfunction of democracy.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0112"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1162
  },
  {
    "category": "sentence",
    "front": "動物の権利を尊重する観点から、化粧品開発における動物実験を廃止する動きが世界的に広がりつつある。",
    "back": "From the perspective of respecting animal rights, the movement to abolish animal testing in cosmetics development is spreading globally.",
    "exampleJp": "動物の権利を尊重する観点から、化粧品開発における動物実験を廃止する動きが世界的に広がりつつある。",
    "exampleTranslation": "From the perspective of respecting animal rights, the movement to abolish animal testing in cosmetics development is spreading globally.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0113"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1163
  },
  {
    "category": "sentence",
    "front": "地方創生の鍵は、その土地ならではの魅力を再発掘し、外部からの多様な人材を呼び込むことにある。",
    "back": "The key to regional revitalization lies in rediscovering the unique charms of the area and attracting diverse human resources from the outside.",
    "exampleJp": "地方創生の鍵は、その土地ならではの魅力を再発掘し、外部からの多様な人材を呼び込むことにある。",
    "exampleTranslation": "The key to regional revitalization lies in rediscovering the unique charms of the area and attracting diverse human resources from the outside.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0114"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1164
  },
  {
    "category": "sentence",
    "front": "サイバー攻撃の手口が巧妙化する中、企業は情報セキュリティ対策を経営の最重要課題の一つとして位置づけるべきだ。",
    "back": "As methods of cyberattacks become more sophisticated, companies should position information security measures as one of their most important management issues.",
    "exampleJp": "サイバー攻撃の手口が巧妙化する中、企業は情報セキュリティ対策を経営の最重要課題の一つとして位置づけるべきだ。",
    "exampleTranslation": "As methods of cyberattacks become more sophisticated, companies should position information security measures as one of their most important management issues.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0115"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1165
  },
  {
    "category": "sentence",
    "front": "貧困の連鎖を断ち切るためには、親の所得格差が子どもの教育格差につながらないよう、公的な支援を拡充することが求められる。",
    "back": "In order to break the chain of poverty, it is required to expand public support so that parents' income disparity does not lead to educational disparity for children.",
    "exampleJp": "貧困の連鎖を断ち切るためには、親の所得格差が子どもの教育格差につながらないよう、公的な支援を拡充することが求められる。",
    "exampleTranslation": "In order to break the chain of poverty, it is required to expand public support so that parents' income disparity does not lead to educational disparity for children.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0116"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1166
  },
  {
    "category": "sentence",
    "front": "科学技術の恩恵を享受する一方で、私たちはそれがもたらす予期せぬ副作用にも常に目を向けておかなければならない。",
    "back": "While enjoying the benefits of science and technology, we must also always keep our eyes on the unexpected side effects they bring about.",
    "exampleJp": "科学技術の恩恵を享受する一方で、私たちはそれがもたらす予期せぬ副作用にも常に目を向けておかなければならない。",
    "exampleTranslation": "While enjoying the benefits of science and technology, we must also always keep our eyes on the unexpected side effects they bring about.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0117"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1167
  },
  {
    "category": "sentence",
    "front": "従業員のメンタルヘルス対策は、もはや個人の自己管理の問題ではなく、企業が果たすべき安全配慮義務の一環である。",
    "back": "Mental health measures for employees are no longer a matter of individual self-management, but a part of the safety-care obligation that companies must fulfill.",
    "exampleJp": "従業員のメンタルヘルス対策は、もはや個人の自己管理の問題ではなく、企業が果たすべき安全配慮義務の一環である。",
    "exampleTranslation": "Mental health measures for employees are no longer a matter of individual self-management, but a part of the safety-care obligation that companies must fulfill.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0118"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1168
  },
  {
    "category": "sentence",
    "front": "表現の自由は民主主義の根幹をなす権利だが、他者の人権を侵害するような言説までもが保護されるわけではない。",
    "back": "Freedom of expression is a right forming the foundation of democracy, but that does not mean even discourse that infringes on the human rights of others is protected.",
    "exampleJp": "表現の自由は民主主義の根幹をなす権利だが、他者の人権を侵害するような言説までもが保護されるわけではない。",
    "exampleTranslation": "Freedom of expression is a right forming the foundation of democracy, but that does not mean even discourse that infringes on the human rights of others is protected.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0119"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1169
  },
  {
    "category": "sentence",
    "front": "過度な競争主義は、人々にストレスをもたらし、社会全体の活力を削ぐ要因となり得ることが指摘されている。",
    "back": "It has been pointed out that excessive competitiveness can bring stress to people and become a factor that drains the vitality of society as a whole.",
    "exampleJp": "過度な競争主義は、人々にストレスをもたらし、社会全体の活力を削ぐ要因となり得ることが指摘されている。",
    "exampleTranslation": "It has been pointed out that excessive competitiveness can bring stress to people and become a factor that drains the vitality of society as a whole.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0120"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1170
  },
  {
    "category": "sentence",
    "front": "新興国の経済成長が世界経済の牽引力となる一方で、先進国との摩擦や環境問題の深刻化といった課題も生み出している。",
    "back": "While the economic growth of emerging nations serves as a driving force for the global economy, it is also creating challenges such as friction with developed nations and the exacerbation of environmental problems.",
    "exampleJp": "新興国の経済成長が世界経済の牽引力となる一方で、先進国との摩擦や環境問題の深刻化といった課題も生み出している。",
    "exampleTranslation": "While the economic growth of emerging nations serves as a driving force for the global economy, it is also creating challenges such as friction with developed nations and the exacerbation of environmental problems.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0121"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1171
  },
  {
    "category": "sentence",
    "front": "臓器移植をめぐる倫理的ジレンマは、医学的知識だけで解決できるものではなく、社会全体で議論を深める必要がある。",
    "back": "The ethical dilemmas surrounding organ transplants cannot be resolved solely with medical knowledge; there is a need to deepen discussion across society as a whole.",
    "exampleJp": "臓器移植をめぐる倫理的ジレンマは、医学的知識だけで解決できるものではなく、社会全体で議論を深める必要がある。",
    "exampleTranslation": "The ethical dilemmas surrounding organ transplants cannot be resolved solely with medical knowledge; there is a need to deepen discussion across society as a whole.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0122"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1172
  },
  {
    "category": "sentence",
    "front": "消費者が環境に配慮した製品を積極的に選ぶ「エシカル消費」が、企業の環境対策を後押しする大きな原動力となっている。",
    "back": "'Ethical consumption,' in which consumers actively choose environmentally friendly products, has become a major driving force backing up corporate environmental measures.",
    "exampleJp": "消費者が環境に配慮した製品を積極的に選ぶ「エシカル消費」が、企業の環境対策を後押しする大きな原動力となっている。",
    "exampleTranslation": "'Ethical consumption,' in which consumers actively choose environmentally friendly products, has become a major driving force backing up corporate environmental measures.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0123"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1173
  },
  {
    "category": "sentence",
    "front": "伝統工芸の継承者を育成するためには、技術の伝承だけでなく、現代のニーズに合った新たな価値を創造する支援が欠かせない。",
    "back": "To train successors for traditional crafts, not only the transmission of techniques but also support for creating new value that meets modern needs is indispensable.",
    "exampleJp": "伝統工芸の継承者を育成するためには、技術の伝承だけでなく、現代のニーズに合った新たな価値を創造する支援が欠かせない。",
    "exampleTranslation": "To train successors for traditional crafts, not only the transmission of techniques but also support for creating new value that meets modern needs is indispensable.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0124"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1174
  },
  {
    "category": "sentence",
    "front": "災害からの復興過程においては、単にインフラを再建するだけでなく、住民のコミュニティをどう再生するかが最大の課題となる。",
    "back": "In the recovery process from disasters, the biggest challenge is not simply rebuilding infrastructure, but how to regenerate residents' communities.",
    "exampleJp": "災害からの復興過程においては、単にインフラを再建するだけでなく、住民のコミュニティをどう再生するかが最大の課題となる。",
    "exampleTranslation": "In the recovery process from disasters, the biggest challenge is not simply rebuilding infrastructure, but how to regenerate residents' communities.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0125"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1175
  },
  {
    "category": "sentence",
    "front": "グローバル人材の育成を急ぐあまり、自国の歴史や文化に対する深い理解が疎かになることは避けなければならない。",
    "back": "We must avoid a situation where a deep understanding of our own history and culture is neglected due to rushing to develop global human resources.",
    "exampleJp": "グローバル人材の育成を急ぐあまり、自国の歴史や文化に対する深い理解が疎かになることは避けなければならない。",
    "exampleTranslation": "We must avoid a situation where a deep understanding of our own history and culture is neglected due to rushing to develop global human resources.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0126"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1176
  },
  {
    "category": "sentence",
    "front": "SNSの普及により、誰もがメディアとしての機能を持つようになった今、情報の真偽を見極めるメディアリテラシーの重要性が増している。",
    "back": "Now that the spread of social media has given everyone the function of the media, the importance of media literacy to discern the authenticity of information is increasing.",
    "exampleJp": "SNSの普及により、誰もがメディアとしての機能を持つようになった今、情報の真偽を見極めるメディアリテラシーの重要性が増している。",
    "exampleTranslation": "Now that the spread of social media has given everyone the function of the media, the importance of media literacy to discern the authenticity of information is increasing.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0127"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1177
  },
  {
    "category": "sentence",
    "front": "終身雇用制度の崩壊に伴い、労働者は会社に依存するのではなく、自らのキャリアを主体的に構築していくことが求められている。",
    "back": "With the collapse of the lifetime employment system, workers are required not to depend on the company, but to proactively build their own careers.",
    "exampleJp": "終身雇用制度の崩壊に伴い、労働者は会社に依存するのではなく、自らのキャリアを主体的に構築していくことが求められている。",
    "exampleTranslation": "With the collapse of the lifetime employment system, workers are required not to depend on the company, but to proactively build their own careers.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0128"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1178
  },
  {
    "category": "sentence",
    "front": "プラスチックごみによる海洋汚染は深刻なレベルに達しており、国際的な枠組みによる厳しい規制が待ったなしの状況だ。",
    "back": "Marine pollution from plastic waste has reached a serious level, and it is a situation that cannot wait for strict regulations through international frameworks.",
    "exampleJp": "プラスチックごみによる海洋汚染は深刻なレベルに達しており、国際的な枠組みによる厳しい規制が待ったなしの状況だ。",
    "exampleTranslation": "Marine pollution from plastic waste has reached a serious level, and it is a situation that cannot wait for strict regulations through international frameworks.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0129"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1179
  },
  {
    "category": "sentence",
    "front": "企業の不祥事を防ぐためには、内部通報制度を形骸化させず、通報者が不利益を被らないような実効性のある保護策が必要である。",
    "back": "In order to prevent corporate scandals, the internal reporting system must not be reduced to a mere shell, and effective protection measures are necessary so that whistleblowers do not suffer disadvantages.",
    "exampleJp": "企業の不祥事を防ぐためには、内部通報制度を形骸化させず、通報者が不利益を被らないような実効性のある保護策が必要である。",
    "exampleTranslation": "In order to prevent corporate scandals, the internal reporting system must not be reduced to a mere shell, and effective protection measures are necessary so that whistleblowers do not suffer disadvantages.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0130"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1180
  },
  {
    "category": "sentence",
    "front": "デジタル通貨の導入は、金融システムの効率化を促進する一方で、サイバーセキュリティ上の新たな脅威をもたらす懸念がある。",
    "back": "The introduction of digital currencies promotes the efficiency of the financial system, but on the other hand, there are concerns that it will bring new threats regarding cybersecurity.",
    "exampleJp": "デジタル通貨の導入は、金融システムの効率化を促進する一方で、サイバーセキュリティ上の新たな脅威をもたらす懸念がある。",
    "exampleTranslation": "The introduction of digital currencies promotes the efficiency of the financial system, but on the other hand, there are concerns that it will bring new threats regarding cybersecurity.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0131"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1181
  },
  {
    "category": "sentence",
    "front": "医療費の増大を抑制するためには、病気になってから治療するのではなく、病気を未然に防ぐ予防医学へのパラダイムシフトが必要だ。",
    "back": "In order to curb the increase in medical expenses, a paradigm shift is necessary toward preventive medicine, which prevents illnesses before they happen, rather than treating them after one gets sick.",
    "exampleJp": "医療費の増大を抑制するためには、病気になってから治療するのではなく、病気を未然に防ぐ予防医学へのパラダイムシフトが必要だ。",
    "exampleTranslation": "In order to curb the increase in medical expenses, a paradigm shift is necessary toward preventive medicine, which prevents illnesses before they happen, rather than treating them after one gets sick.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0132"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1182
  },
  {
    "category": "sentence",
    "front": "著作権法は、クリエイターの権利を保護し創作活動を奨励する目的がある一方で、情報の自由な流通を阻害しないようバランスをとる必要がある。",
    "back": "While copyright law aims to protect creators' rights and encourage creative activities, there is a need to strike a balance so as not to hinder the free flow of information.",
    "exampleJp": "著作権法は、クリエイターの権利を保護し創作活動を奨励する目的がある一方で、情報の自由な流通を阻害しないようバランスをとる必要がある。",
    "exampleTranslation": "While copyright law aims to protect creators' rights and encourage creative activities, there is a need to strike a balance so as not to hinder the free flow of information.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0133"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1183
  },
  {
    "category": "sentence",
    "front": "リモートワークの普及によって通勤の負担は軽減されたが、その反面、仕事とプライベートの境界が曖昧になり、メンタル不調を訴える人もいる。",
    "back": "The spread of remote work has eased the burden of commuting, but on the flip side, the boundary between work and private life has become blurred, and some people complain of mental unwellness.",
    "exampleJp": "リモートワークの普及によって通勤の負担は軽減されたが、その反面、仕事とプライベートの境界が曖昧になり、メンタル不調を訴える人もいる。",
    "exampleTranslation": "The spread of remote work has eased the burden of commuting, but on the flip side, the boundary between work and private life has become blurred, and some people complain of mental unwellness.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0134"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1184
  },
  {
    "category": "sentence",
    "front": "再生医療の実用化は、これまで治療法がなかった難病の患者に希望を与える画期的な出来事である。",
    "back": "The practical application of regenerative medicine is an epoch-making event that gives hope to patients with incurable diseases for which there were previously no treatments.",
    "exampleJp": "再生医療の実用化は、これまで治療法がなかった難病の患者に希望を与える画期的な出来事である。",
    "exampleTranslation": "The practical application of regenerative medicine is an epoch-making event that gives hope to patients with incurable diseases for which there were previously no treatments.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0135"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1185
  },
  {
    "category": "sentence",
    "front": "現代社会において、多様性を認め合い、異なる背景を持つ人々が共生できるインクルーシブな環境の構築は、すべての組織の責務である。",
    "back": "In modern society, building an inclusive environment where diversity is acknowledged and people from different backgrounds can coexist is the responsibility of all organizations.",
    "exampleJp": "現代社会において、多様性を認め合い、異なる背景を持つ人々が共生できるインクルーシブな環境の構築は、すべての組織の責務である。",
    "exampleTranslation": "In modern society, building an inclusive environment where diversity is acknowledged and people from different backgrounds can coexist is the responsibility of all organizations.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0136"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1186
  },
  {
    "category": "sentence",
    "front": "フェイクニュースが選挙結果に影響を与える事態が相次ぎ、民主主義の根幹を揺るがす重大な脅威として認識されるようになった。",
    "back": "Instances of fake news affecting election results have occurred one after another, and it has come to be recognized as a grave threat that shakes the very foundations of democracy.",
    "exampleJp": "フェイクニュースが選挙結果に影響を与える事態が相次ぎ、民主主義の根幹を揺るがす重大な脅威として認識されるようになった。",
    "exampleTranslation": "Instances of fake news affecting election results have occurred one after another, and it has come to be recognized as a grave threat that shakes the very foundations of democracy.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0137"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1187
  },
  {
    "category": "sentence",
    "front": "過労死という痛ましい犠牲を繰り返さないためには、長時間労働を美徳とする従来の企業風土を根本から是正しなければならない。",
    "back": "In order not to repeat the painful sacrifices of death from overwork, we must fundamentally correct the traditional corporate culture that regards long working hours as a virtue.",
    "exampleJp": "過労死という痛ましい犠牲を繰り返さないためには、長時間労働を美徳とする従来の企業風土を根本から是正しなければならない。",
    "exampleTranslation": "In order not to repeat the painful sacrifices of death from overwork, we must fundamentally correct the traditional corporate culture that regards long working hours as a virtue.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0138"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1188
  },
  {
    "category": "sentence",
    "front": "ゲノム編集技術の発展は、農作物の品種改良に革命をもたらす可能性がある一方、生態系への未知なる影響を危惧する声も根強い。",
    "back": "While the development of genome editing technology holds the potential to revolutionize crop breeding, voices fearing its unknown impact on the ecosystem remain persistent.",
    "exampleJp": "ゲノム編集技術の発展は、農作物の品種改良に革命をもたらす可能性がある一方、生態系への未知なる影響を危惧する声も根強い。",
    "exampleTranslation": "While the development of genome editing technology holds the potential to revolutionize crop breeding, voices fearing its unknown impact on the ecosystem remain persistent.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0139"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1189
  },
  {
    "category": "sentence",
    "front": "芸術は、時に言葉以上に人々の心を打ち、社会問題に対する問題提起や、異なる文化間の相互理解を促進する力を持っている。",
    "back": "Art sometimes strikes people's hearts more than words, possessing the power to raise questions about social issues and promote mutual understanding between different cultures.",
    "exampleJp": "芸術は、時に言葉以上に人々の心を打ち、社会問題に対する問題提起や、異なる文化間の相互理解を促進する力を持っている。",
    "exampleTranslation": "Art sometimes strikes people's hearts more than words, possessing the power to raise questions about social issues and promote mutual understanding between different cultures.",
    "tags": [
      "n1",
      "sentence",
      "reading",
      "comprehension",
      "context"
    ],
    "sourceIds": [
      "n1-sentence-0140"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1190
  },
  {
    "category": "sentence",
    "front": "現在の複雑な国際情勢を踏まえると、単一の国家による覇権主義はもはや通用しないだろう。",
    "back": "Given the current complex international situation, the hegemonism of a single nation will likely no longer pass muster.",
    "exampleJp": "現在の複雑な国際情勢を踏まえると、単一の国家による覇権主義はもはや通用しないだろう。",
    "exampleTranslation": "Given the current complex international situation, the hegemonism of a single nation will likely no longer pass muster.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0141"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1191
  },
  {
    "category": "sentence",
    "front": "政府は、少子高齢化という未曾有の危機に対し、抜本的な制度改革を断行する構えだ。",
    "back": "The government is poised to carry out drastic institutional reforms in response to the unprecedented crisis of a declining birthrate and aging population.",
    "exampleJp": "政府は、少子高齢化という未曾有の危機に対し、抜本的な制度改革を断行する構えだ。",
    "exampleTranslation": "The government is poised to carry out drastic institutional reforms in response to the unprecedented crisis of a declining birthrate and aging population.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0142"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1192
  },
  {
    "category": "sentence",
    "front": "環境保護と経済成長を両立させることは、現代社会に課せられた最大の難題と言える。",
    "back": "Balancing environmental protection and economic growth can be said to be the greatest challenge imposed on modern society.",
    "exampleJp": "環境保護と経済成長を両立させることは、現代社会に課せられた最大の難題と言える。",
    "exampleTranslation": "Balancing environmental protection and economic growth can be said to be the greatest challenge imposed on modern society.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0143"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1193
  },
  {
    "category": "sentence",
    "front": "科学技術の進歩が必ずしも人類の幸福に直結するとは限らないという見解には、一理ある。",
    "back": "There is some truth to the view that the advancement of science and technology does not necessarily directly lead to human happiness.",
    "exampleJp": "科学技術の進歩が必ずしも人類の幸福に直結するとは限らないという見解には、一理ある。",
    "exampleTranslation": "There is some truth to the view that the advancement of science and technology does not necessarily directly lead to human happiness.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0144"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1194
  },
  {
    "category": "sentence",
    "front": "企業の不祥事が相次ぐ中、コンプライアンスの徹底と企業統治の強化が急務となっている。",
    "back": "Amid a series of corporate scandals, the strict observance of compliance and the strengthening of corporate governance have become urgent tasks.",
    "exampleJp": "企業の不祥事が相次ぐ中、コンプライアンスの徹底と企業統治の強化が急務となっている。",
    "exampleTranslation": "Amid a series of corporate scandals, the strict observance of compliance and the strengthening of corporate governance have become urgent tasks.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0145"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1195
  },
  {
    "category": "sentence",
    "front": "都市への人口集中が加速する一方で、地方の過疎化と高齢化は深刻な限界集落問題を引き起こしている。",
    "back": "While the concentration of the population in cities is accelerating, depopulation and aging in rural areas are causing serious issues with marginalized communities.",
    "exampleJp": "都市への人口集中が加速する一方で、地方の過疎化と高齢化は深刻な限界集落問題を引き起こしている。",
    "exampleTranslation": "While the concentration of the population in cities is accelerating, depopulation and aging in rural areas are causing serious issues with marginalized communities.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0146"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1196
  },
  {
    "category": "sentence",
    "front": "AI技術の導入により業務の効率化が進む反面、雇用機会の喪失を危惧する声も根強い。",
    "back": "While operational efficiency improves due to the introduction of AI technology, there are deeply rooted voices expressing concern over the loss of employment opportunities.",
    "exampleJp": "AI技術の導入により業務の効率化が進む反面、雇用機会の喪失を危惧する声も根強い。",
    "exampleTranslation": "While operational efficiency improves due to the introduction of AI technology, there are deeply rooted voices expressing concern over the loss of employment opportunities.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0147"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1197
  },
  {
    "category": "sentence",
    "front": "情報の真偽を見極めるリテラシーが、デジタル社会を生き抜く上で不可欠な能力となっている。",
    "back": "The literacy to discern the authenticity of information has become an essential ability for surviving in digital society.",
    "exampleJp": "情報の真偽を見極めるリテラシーが、デジタル社会を生き抜く上で不可欠な能力となっている。",
    "exampleTranslation": "The literacy to discern the authenticity of information has become an essential ability for surviving in digital society.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0148"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1198
  },
  {
    "category": "sentence",
    "front": "気候変動の影響とみられる異常気象が世界各地で頻発しており、地球規模での対策が急がれる。",
    "back": "Extreme weather events, believed to be the effects of climate change, are frequently occurring worldwide, making global-scale countermeasures an urgent matter.",
    "exampleJp": "気候変動の影響とみられる異常気象が世界各地で頻発しており、地球規模での対策が急がれる。",
    "exampleTranslation": "Extreme weather events, believed to be the effects of climate change, are frequently occurring worldwide, making global-scale countermeasures an urgent matter.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0149"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1199
  },
  {
    "category": "sentence",
    "front": "芸術の価値は、時代や社会の変遷とともに常に再評価され続ける運命にある。",
    "back": "The value of art is destined to be constantly re-evaluated along with the transitions of eras and societies.",
    "exampleJp": "芸術の価値は、時代や社会の変遷とともに常に再評価され続ける運命にある。",
    "exampleTranslation": "The value of art is destined to be constantly re-evaluated along with the transitions of eras and societies.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0150"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1200
  },
  {
    "category": "sentence",
    "front": "個人のプライバシー保護と国家による治安維持のための監視体制とのバランスをどう取るべきか、議論が絶えない。",
    "back": "There is endless debate on how to strike a balance between the protection of individual privacy and the surveillance systems for maintaining public order by the state.",
    "exampleJp": "個人のプライバシー保護と国家による治安維持のための監視体制とのバランスをどう取るべきか、議論が絶えない。",
    "exampleTranslation": "There is endless debate on how to strike a balance between the protection of individual privacy and the surveillance systems for maintaining public order by the state.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0151"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1201
  },
  {
    "category": "sentence",
    "front": "グローバル化が進展する現代において、自国の文化的アイデンティティを保つことの意義が改めて問われている。",
    "back": "In modern times when globalization is advancing, the significance of preserving one's own cultural identity is once again being questioned.",
    "exampleJp": "グローバル化が進展する現代において、自国の文化的アイデンティティを保つことの意義が改めて問われている。",
    "exampleTranslation": "In modern times when globalization is advancing, the significance of preserving one's own cultural identity is once again being questioned.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0152"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1202
  },
  {
    "category": "sentence",
    "front": "市場の規制緩和は競争を促進し経済を活性化させる側面があるが、同時に格差の拡大を助長する危険性も孕んでいる。",
    "back": "Deregulation of the market has the aspect of promoting competition and revitalizing the economy, but it also harbors the danger of fostering the widening of disparity.",
    "exampleJp": "市場の規制緩和は競争を促進し経済を活性化させる側面があるが、同時に格差の拡大を助長する危険性も孕んでいる。",
    "exampleTranslation": "Deregulation of the market has the aspect of promoting competition and revitalizing the economy, but it also harbors the danger of fostering the widening of disparity.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0153"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1203
  },
  {
    "category": "sentence",
    "front": "伝統的な働き方が見直される中、多様な価値観を尊重し柔軟な雇用形態を導入する企業が増加している。",
    "back": "As traditional working styles are re-examined, an increasing number of companies are respecting diverse values and introducing flexible employment formats.",
    "exampleJp": "伝統的な働き方が見直される中、多様な価値観を尊重し柔軟な雇用形態を導入する企業が増加している。",
    "exampleTranslation": "As traditional working styles are re-examined, an increasing number of companies are respecting diverse values and introducing flexible employment formats.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0154"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1204
  },
  {
    "category": "sentence",
    "front": "教育の本来の目的は、単なる知識の詰め込みではなく、自ら課題を見つけ解決する能力を養うことにあるはずだ。",
    "back": "The true purpose of education should not be the mere cramming of knowledge, but rather cultivating the ability to find and solve problems independently.",
    "exampleJp": "教育の本来の目的は、単なる知識の詰め込みではなく、自ら課題を見つけ解決する能力を養うことにあるはずだ。",
    "exampleTranslation": "The true purpose of education should not be the mere cramming of knowledge, but rather cultivating the ability to find and solve problems independently.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0155"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1205
  },
  {
    "category": "sentence",
    "front": "医療技術の高度化により寿命が延びたことは喜ばしいが、それに伴う医療費の膨張は国家財政を圧迫している。",
    "back": "While it is joyous that lifespans have extended due to the sophistication of medical technology, the accompanying ballooning of medical expenses is putting pressure on national finances.",
    "exampleJp": "医療技術の高度化により寿命が延びたことは喜ばしいが、それに伴う医療費の膨張は国家財政を圧迫している。",
    "exampleTranslation": "While it is joyous that lifespans have extended due to the sophistication of medical technology, the accompanying ballooning of medical expenses is putting pressure on national finances.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0156"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1206
  },
  {
    "category": "sentence",
    "front": "ジャーナリズムの使命は、権力を監視し、隠蔽されがちな真実を社会に提示することである。",
    "back": "The mission of journalism is to monitor power and present to society truths that tend to be concealed.",
    "exampleJp": "ジャーナリズムの使命は、権力を監視し、隠蔽されがちな真実を社会に提示することである。",
    "exampleTranslation": "The mission of journalism is to monitor power and present to society truths that tend to be concealed.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0157"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1207
  },
  {
    "category": "sentence",
    "front": "消費者心理の冷え込みが長期化すれば、デフレスパイラルからの脱却はさらに困難になるだろう。",
    "back": "If the cooling of consumer psychology becomes prolonged, breaking out of the deflationary spiral will become even more difficult.",
    "exampleJp": "消費者心理の冷え込みが長期化すれば、デフレスパイラルからの脱却はさらに困難になるだろう。",
    "exampleTranslation": "If the cooling of consumer psychology becomes prolonged, breaking out of the deflationary spiral will become even more difficult.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0158"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1208
  },
  {
    "category": "sentence",
    "front": "多国籍企業による租税回避行動に対し、国際的な枠組みによる新たな課税ルールの整備が求められている。",
    "back": "In response to tax avoidance behaviors by multinational corporations, the establishment of new taxation rules through an international framework is being demanded.",
    "exampleJp": "多国籍企業による租税回避行動に対し、国際的な枠組みによる新たな課税ルールの整備が求められている。",
    "exampleTranslation": "In response to tax avoidance behaviors by multinational corporations, the establishment of new taxation rules through an international framework is being demanded.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0159"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1209
  },
  {
    "category": "sentence",
    "front": "文学作品の解釈において、著者の意図を超えた多様な読解の可能性を認めるのが現代批評の主流である。",
    "back": "In the interpretation of literary works, acknowledging the possibility of diverse readings that transcend the author's intent is the mainstream of modern criticism.",
    "exampleJp": "文学作品の解釈において、著者の意図を超えた多様な読解の可能性を認めるのが現代批評の主流である。",
    "exampleTranslation": "In the interpretation of literary works, acknowledging the possibility of diverse readings that transcend the author's intent is the mainstream of modern criticism.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0160"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1210
  },
  {
    "category": "sentence",
    "front": "再生可能エネルギーへの転換は、化石燃料への依存度を下げるだけでなく、新たな産業創出の契機ともなり得る。",
    "back": "The transition to renewable energy not only lowers the degree of dependence on fossil fuels but can also serve as an opportunity for the creation of new industries.",
    "exampleJp": "再生可能エネルギーへの転換は、化石燃料への依存度を下げるだけでなく、新たな産業創出の契機ともなり得る。",
    "exampleTranslation": "The transition to renewable energy not only lowers the degree of dependence on fossil fuels but can also serve as an opportunity for the creation of new industries.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0161"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1211
  },
  {
    "category": "sentence",
    "front": "SNS上での誹謗中傷が深刻な社会問題化しており、表現の自由と人権侵害の境界線が問われている。",
    "back": "Slander and defamation on social networking sites have become a serious social issue, bringing the boundary between freedom of expression and human rights violations into question.",
    "exampleJp": "SNS上での誹謗中傷が深刻な社会問題化しており、表現の自由と人権侵害の境界線が問われている。",
    "exampleTranslation": "Slander and defamation on social networking sites have become a serious social issue, bringing the boundary between freedom of expression and human rights violations into question.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0162"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1212
  },
  {
    "category": "sentence",
    "front": "歴史の授業では、単に過去の事実を暗記するのではなく、それらが現代にどう繋がっているかを考察する視点が不可欠だ。",
    "back": "In history classes, rather than simply memorizing past facts, a perspective that examines how they connect to the present is essential.",
    "exampleJp": "歴史の授業では、単に過去の事実を暗記するのではなく、それらが現代にどう繋がっているかを考察する視点が不可欠だ。",
    "exampleTranslation": "In history classes, rather than simply memorizing past facts, a perspective that examines how they connect to the present is essential.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0163"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1213
  },
  {
    "category": "sentence",
    "front": "企業の社会的責任（CSR）は、もはや単なる慈善事業ではなく、持続可能な経営戦略の中核として位置づけられている。",
    "back": "Corporate Social Responsibility (CSR) is no longer merely philanthropic work, but is positioned as the core of sustainable management strategy.",
    "exampleJp": "企業の社会的責任（CSR）は、もはや単なる慈善事業ではなく、持続可能な経営戦略の中核として位置づけられている。",
    "exampleTranslation": "Corporate Social Responsibility (CSR) is no longer merely philanthropic work, but is positioned as the core of sustainable management strategy.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0164"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1214
  },
  {
    "category": "sentence",
    "front": "都市計画においては、経済合理性だけでなく、景観の保全や地域コミュニティの維持にも配慮する必要がある。",
    "back": "In urban planning, it is necessary to consider not only economic rationality but also the preservation of landscapes and the maintenance of local communities.",
    "exampleJp": "都市計画においては、経済合理性だけでなく、景観の保全や地域コミュニティの維持にも配慮する必要がある。",
    "exampleTranslation": "In urban planning, it is necessary to consider not only economic rationality but also the preservation of landscapes and the maintenance of local communities.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0165"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1215
  },
  {
    "category": "sentence",
    "front": "遺伝子操作技術の発展は医療に革命をもたらす可能性を秘めているが、同時に深刻な倫理的問題を突きつけている。",
    "back": "The development of genetic manipulation technology holds the potential to revolutionize medicine, but at the same time, it poses serious ethical problems.",
    "exampleJp": "遺伝子操作技術の発展は医療に革命をもたらす可能性を秘めているが、同時に深刻な倫理的問題を突きつけている。",
    "exampleTranslation": "The development of genetic manipulation technology holds the potential to revolutionize medicine, but at the same time, it poses serious ethical problems.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0166"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1216
  },
  {
    "category": "sentence",
    "front": "資本主義社会の枠組みの中で、貧困問題を根本的に解決することは果たして可能なのだろうか。",
    "back": "Is it truly possible to fundamentally solve the problem of poverty within the framework of a capitalist society?",
    "exampleJp": "資本主義社会の枠組みの中で、貧困問題を根本的に解決することは果たして可能なのだろうか。",
    "exampleTranslation": "Is it truly possible to fundamentally solve the problem of poverty within the framework of a capitalist society?",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0167"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1217
  },
  {
    "category": "sentence",
    "front": "リーダーに求められる資質とは、状況の変化を的確に読み取り、迅速かつ果断に決断を下す能力に他ならない。",
    "back": "The qualities required of a leader are nothing other than the ability to accurately read changes in the situation and make decisions swiftly and resolutely.",
    "exampleJp": "リーダーに求められる資質とは、状況の変化を的確に読み取り、迅速かつ果断に決断を下す能力に他ならない。",
    "exampleTranslation": "The qualities required of a leader are nothing other than the ability to accurately read changes in the situation and make decisions swiftly and resolutely.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0168"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1218
  },
  {
    "category": "sentence",
    "front": "多文化共生社会の実現には、異文化に対する寛容さだけでなく、自らの偏見や固定観念を自覚し克服する努力が求められる。",
    "back": "The realization of a multicultural symbiotic society requires not only tolerance toward different cultures but also the effort to become aware of and overcome one's own prejudices and stereotypes.",
    "exampleJp": "多文化共生社会の実現には、異文化に対する寛容さだけでなく、自らの偏見や固定観念を自覚し克服する努力が求められる。",
    "exampleTranslation": "The realization of a multicultural symbiotic society requires not only tolerance toward different cultures but also the effort to become aware of and overcome one's own prejudices and stereotypes.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0169"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1219
  },
  {
    "category": "sentence",
    "front": "著作権法の保護期間延長は、クリエイターの権利を守る一方で、新たな創作活動を阻害する要因にもなりかねない。",
    "back": "The extension of the protection period of copyright law, while protecting the rights of creators, could also become a factor hindering new creative activities.",
    "exampleJp": "著作権法の保護期間延長は、クリエイターの権利を守る一方で、新たな創作活動を阻害する要因にもなりかねない。",
    "exampleTranslation": "The extension of the protection period of copyright law, while protecting the rights of creators, could also become a factor hindering new creative activities.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0170"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1220
  },
  {
    "category": "sentence",
    "front": "災害復興における最大の課題は、破壊されたインフラの再建ではなく、被災者の心のケアと生活再建への支援である。",
    "back": "The greatest challenge in disaster recovery is not the reconstruction of destroyed infrastructure, but rather mental care for the victims and support for rebuilding their lives.",
    "exampleJp": "災害復興における最大の課題は、破壊されたインフラの再建ではなく、被災者の心のケアと生活再建への支援である。",
    "exampleTranslation": "The greatest challenge in disaster recovery is not the reconstruction of destroyed infrastructure, but rather mental care for the victims and support for rebuilding their lives.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0171"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1221
  },
  {
    "category": "sentence",
    "front": "民主主義の根幹を成す選挙制度が、資金力のある一部の有力者によって歪められているとの批判は免れない。",
    "back": "The criticism cannot be avoided that the electoral system, which forms the foundation of democracy, is being distorted by a few influential figures with financial power.",
    "exampleJp": "民主主義の根幹を成す選挙制度が、資金力のある一部の有力者によって歪められているとの批判は免れない。",
    "exampleTranslation": "The criticism cannot be avoided that the electoral system, which forms the foundation of democracy, is being distorted by a few influential figures with financial power.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0172"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1222
  },
  {
    "category": "sentence",
    "front": "若者の活字離れが指摘されて久しいが、電子書籍の普及が新たな読書習慣を生み出す起爆剤となるか注目される。",
    "back": "It has been a long time since the youth's shift away from print was pointed out, but attention is being paid to whether the spread of e-books will act as a catalyst to generate new reading habits.",
    "exampleJp": "若者の活字離れが指摘されて久しいが、電子書籍の普及が新たな読書習慣を生み出す起爆剤となるか注目される。",
    "exampleTranslation": "It has been a long time since the youth's shift away from print was pointed out, but attention is being paid to whether the spread of e-books will act as a catalyst to generate new reading habits.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0173"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1223
  },
  {
    "category": "sentence",
    "front": "食料自給率の低迷は、国家の安全保障上の重大な懸念材料であり、抜本的な農業政策の見直しが急がれる。",
    "back": "The slump in the food self-sufficiency rate is a critical matter of concern for national security, and a drastic review of agricultural policies is urgently needed.",
    "exampleJp": "食料自給率の低迷は、国家の安全保障上の重大な懸念材料であり、抜本的な農業政策の見直しが急がれる。",
    "exampleTranslation": "The slump in the food self-sufficiency rate is a critical matter of concern for national security, and a drastic review of agricultural policies is urgently needed.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0174"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1224
  },
  {
    "category": "sentence",
    "front": "宇宙開発における国際競争が激化する中、巨額の予算を投じることに対する国民の理解を得る努力が不可欠だ。",
    "back": "As international competition in space exploration intensifies, efforts to gain the public's understanding of investing massive budgets are essential.",
    "exampleJp": "宇宙開発における国際競争が激化する中、巨額の予算を投じることに対する国民の理解を得る努力が不可欠だ。",
    "exampleTranslation": "As international competition in space exploration intensifies, efforts to gain the public's understanding of investing massive budgets are essential.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0175"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1225
  },
  {
    "category": "sentence",
    "front": "哲学とは、答えのない問いに対し、論理的な思考を駆使して粘り強く思索を深めていく営みであると言えよう。",
    "back": "Philosophy can be described as the endeavor of utilizing logical thinking to tenaciously deepen contemplation on questions that have no answers.",
    "exampleJp": "哲学とは、答えのない問いに対し、論理的な思考を駆使して粘り強く思索を深めていく営みであると言えよう。",
    "exampleTranslation": "Philosophy can be described as the endeavor of utilizing logical thinking to tenaciously deepen contemplation on questions that have no answers.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0176"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1226
  },
  {
    "category": "sentence",
    "front": "少子化対策としては、単に手当を拡充するだけでなく、働きながら子育てがしやすい社会環境の整備が急務である。",
    "back": "As a countermeasure against the declining birthrate, rather than simply expanding allowances, the development of a social environment where it is easy to raise children while working is an urgent task.",
    "exampleJp": "少子化対策としては、単に手当を拡充するだけでなく、働きながら子育てがしやすい社会環境の整備が急務である。",
    "exampleTranslation": "As a countermeasure against the declining birthrate, rather than simply expanding allowances, the development of a social environment where it is easy to raise children while working is an urgent task.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0177"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1227
  },
  {
    "category": "sentence",
    "front": "インサイダー取引のような金融犯罪は、市場の公正性と透明性を著しく損なう行為であり、厳罰に処すべきである。",
    "back": "Financial crimes such as insider trading are acts that significantly impair the fairness and transparency of the market, and should be strictly punished.",
    "exampleJp": "インサイダー取引のような金融犯罪は、市場の公正性と透明性を著しく損なう行為であり、厳罰に処すべきである。",
    "exampleTranslation": "Financial crimes such as insider trading are acts that significantly impair the fairness and transparency of the market, and should be strictly punished.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0178"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1228
  },
  {
    "category": "sentence",
    "front": "古代文明の遺跡が発掘されるたびに、当時の人々の高度な技術と豊かな精神世界に驚嘆させられる。",
    "back": "Every time ruins of an ancient civilization are excavated, one is made to marvel at the advanced technology and rich spiritual world of the people of that time.",
    "exampleJp": "古代文明の遺跡が発掘されるたびに、当時の人々の高度な技術と豊かな精神世界に驚嘆させられる。",
    "exampleTranslation": "Every time ruins of an ancient civilization are excavated, one is made to marvel at the advanced technology and rich spiritual world of the people of that time.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0179"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1229
  },
  {
    "category": "sentence",
    "front": "格差社会を是正するためには、富の再分配機能としての税制をより累進的なものに改める必要があるとの声が強い。",
    "back": "In order to rectify a disparate society, there are strong voices stating the need to revise the tax system, as a wealth redistribution function, into a more progressive one.",
    "exampleJp": "格差社会を是正するためには、富の再分配機能としての税制をより累進的なものに改める必要があるとの声が強い。",
    "exampleTranslation": "In order to rectify a disparate society, there are strong voices stating the need to revise the tax system, as a wealth redistribution function, into a more progressive one.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0180"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1230
  },
  {
    "category": "sentence",
    "front": "ネット上の匿名性が悪意ある行動を助長しているという指摘はもっともだが、告発者の保護という観点から完全な実名制への移行には慎重になるべきだ。",
    "back": "The point that anonymity on the internet encourages malicious behavior is well-founded, but from the perspective of protecting whistleblowers, the transition to a completely real-name system should be approached cautiously.",
    "exampleJp": "ネット上の匿名性が悪意ある行動を助長しているという指摘はもっともだが、告発者の保護という観点から完全な実名制への移行には慎重になるべきだ。",
    "exampleTranslation": "The point that anonymity on the internet encourages malicious behavior is well-founded, but from the perspective of protecting whistleblowers, the transition to a completely real-name system should be approached cautiously.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0181"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1231
  },
  {
    "category": "sentence",
    "front": "AIが作曲や絵画などの創作活動を行う時代において、「芸術性」や「オリジナリティ」の定義そのものが揺らいでいる。",
    "back": "In an era where AI engages in creative activities such as music composition and painting, the very definitions of \"artistry\" and \"originality\" are wavering.",
    "exampleJp": "AIが作曲や絵画などの創作活動を行う時代において、「芸術性」や「オリジナリティ」の定義そのものが揺らいでいる。",
    "exampleTranslation": "In an era where AI engages in creative activities such as music composition and painting, the very definitions of \"artistry\" and \"originality\" are wavering.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0182"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1232
  },
  {
    "category": "sentence",
    "front": "終身雇用制度の崩壊に伴い、労働者は会社に依存するのではなく、自らのキャリアを主体的に構築していく自律性が求められるようになった。",
    "back": "With the collapse of the lifetime employment system, workers are now required to have the autonomy to proactively build their own careers, rather than depending on the company.",
    "exampleJp": "終身雇用制度の崩壊に伴い、労働者は会社に依存するのではなく、自らのキャリアを主体的に構築していく自律性が求められるようになった。",
    "exampleTranslation": "With the collapse of the lifetime employment system, workers are now required to have the autonomy to proactively build their own careers, rather than depending on the company.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0183"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1233
  },
  {
    "category": "sentence",
    "front": "動物実験の倫理的是非については、医学の進歩という大義名分と生命の尊厳という観点の間で、激しい意見の対立がある。",
    "back": "Regarding the ethical propriety of animal testing, there is a fierce conflict of opinions between the just cause of medical advancement and the perspective of the dignity of life.",
    "exampleJp": "動物実験の倫理的是非については、医学の進歩という大義名分と生命の尊厳という観点の間で、激しい意見の対立がある。",
    "exampleTranslation": "Regarding the ethical propriety of animal testing, there is a fierce conflict of opinions between the just cause of medical advancement and the perspective of the dignity of life.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0184"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1234
  },
  {
    "category": "sentence",
    "front": "マスメディアによる報道被害を防ぐためには、取材対象者の人権に配慮した報道倫理の確立と、誤報に対する迅速な訂正・謝罪の仕組みが不可欠だ。",
    "back": "To prevent reporting damage by the mass media, the establishment of reporting ethics that consider the human rights of interview subjects and a mechanism for prompt correction and apology for misinformation are essential.",
    "exampleJp": "マスメディアによる報道被害を防ぐためには、取材対象者の人権に配慮した報道倫理の確立と、誤報に対する迅速な訂正・謝罪の仕組みが不可欠だ。",
    "exampleTranslation": "To prevent reporting damage by the mass media, the establishment of reporting ethics that consider the human rights of interview subjects and a mechanism for prompt correction and apology for misinformation are essential.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0185"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1235
  },
  {
    "category": "sentence",
    "front": "仮想通貨を基盤とする新たな金融システムは、既存の中央銀行の権威を脅かす可能性を秘めており、各国の規制当局は対応に苦慮している。",
    "back": "The new financial system based on virtual currencies harbors the potential to threaten the authority of existing central banks, and regulatory authorities in various countries are struggling to respond.",
    "exampleJp": "仮想通貨を基盤とする新たな金融システムは、既存の中央銀行の権威を脅かす可能性を秘めており、各国の規制当局は対応に苦慮している。",
    "exampleTranslation": "The new financial system based on virtual currencies harbors the potential to threaten the authority of existing central banks, and regulatory authorities in various countries are struggling to respond.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0186"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1236
  },
  {
    "category": "sentence",
    "front": "労働人口の減少を補うため、外国人労働者の受け入れ拡大が進められているが、言語や習慣の違いから生じる摩擦をいかに軽減するかが課題となっている。",
    "back": "To compensate for the decline in the working population, the expansion of accepting foreign workers is proceeding, but how to mitigate the friction arising from differences in language and customs has become a challenge.",
    "exampleJp": "労働人口の減少を補うため、外国人労働者の受け入れ拡大が進められているが、言語や習慣の違いから生じる摩擦をいかに軽減するかが課題となっている。",
    "exampleTranslation": "To compensate for the decline in the working population, the expansion of accepting foreign workers is proceeding, but how to mitigate the friction arising from differences in language and customs has become a challenge.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0187"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1237
  },
  {
    "category": "sentence",
    "front": "環境アセスメントの制度は、大規模な開発事業が自然環境に与える影響を事前に予測・評価し、最悪の事態を回避するための重要な防波堤である。",
    "back": "The environmental assessment system is an important breakwater for predicting and evaluating the impact of large-scale development projects on the natural environment in advance, aiming to avoid worst-case scenarios.",
    "exampleJp": "環境アセスメントの制度は、大規模な開発事業が自然環境に与える影響を事前に予測・評価し、最悪の事態を回避するための重要な防波堤である。",
    "exampleTranslation": "The environmental assessment system is an important breakwater for predicting and evaluating the impact of large-scale development projects on the natural environment in advance, aiming to avoid worst-case scenarios.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0188"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1238
  },
  {
    "category": "sentence",
    "front": "文学賞の受賞が、必ずしも後世に残る普遍的な価値を保証するものではなく、時の試練を経て初めてその真価が定まるのだ。",
    "back": "Winning a literary award does not necessarily guarantee a universal value that will survive to posterity; its true worth is only established after enduring the test of time.",
    "exampleJp": "文学賞の受賞が、必ずしも後世に残る普遍的な価値を保証するものではなく、時の試練を経て初めてその真価が定まるのだ。",
    "exampleTranslation": "Winning a literary award does not necessarily guarantee a universal value that will survive to posterity; its true worth is only established after enduring the test of time.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0189"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1239
  },
  {
    "category": "sentence",
    "front": "憲法改正を巡る議論は、国家のあり方の根幹に関わる問題であり、国民一人ひとりが当事者意識を持って深く考察すべきテーマである。",
    "back": "The debate surrounding constitutional revision is an issue related to the very foundation of the state, and is a theme that every citizen should consider deeply with a sense of personal involvement.",
    "exampleJp": "憲法改正を巡る議論は、国家のあり方の根幹に関わる問題であり、国民一人ひとりが当事者意識を持って深く考察すべきテーマである。",
    "exampleTranslation": "The debate surrounding constitutional revision is an issue related to the very foundation of the state, and is a theme that every citizen should consider deeply with a sense of personal involvement.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0190"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1240
  },
  {
    "category": "sentence",
    "front": "昨今の急激な円安は、輸入に頼る多くの中小企業に大幅な値上げを余儀なくさせた。",
    "back": "The recent rapid depreciation of the yen has forced many small and medium-sized enterprises reliant on imports to significantly raise their prices.",
    "exampleJp": "昨今の急激な円安は、輸入に頼る多くの中小企業に大幅な値上げを余儀なくさせた。",
    "exampleTranslation": "The recent rapid depreciation of the yen has forced many small and medium-sized enterprises reliant on imports to significantly raise their prices.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0191"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1241
  },
  {
    "category": "sentence",
    "front": "長年連れ添った愛犬の死は、彼にとって筆舌に尽くしがたい悲しみにたえない出来事だった。",
    "back": "The death of his beloved dog, who had been his companion for many years, was an event that caused him an unbearable sorrow beyond description.",
    "exampleJp": "長年連れ添った愛犬の死は、彼にとって筆舌に尽くしがたい悲しみにたえない出来事だった。",
    "exampleTranslation": "The death of his beloved dog, who had been his companion for many years, was an event that caused him an unbearable sorrow beyond description.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0192"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1242
  },
  {
    "category": "sentence",
    "front": "今回のプロジェクトの成功は、チームメンバー全員の弛まぬ努力あってのものです。",
    "back": "The success of this project exists solely because of the untiring efforts of all the team members.",
    "exampleJp": "今回のプロジェクトの成功は、チームメンバー全員の弛まぬ努力あってのものです。",
    "exampleTranslation": "The success of this project exists solely because of the untiring efforts of all the team members.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0193"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1243
  },
  {
    "category": "sentence",
    "front": "彼女は怒りのあまり、今にも泣き出さんばかりの顔で部屋を飛び出していった。",
    "back": "Overcome with anger, she dashed out of the room with a face that looked as if she were about to burst into tears at any moment.",
    "exampleJp": "彼女は怒りのあまり、今にも泣き出さんばかりの顔で部屋を飛び出していった。",
    "exampleTranslation": "Overcome with anger, she dashed out of the room with a face that looked as if she were about to burst into tears at any moment.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0194"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1244
  },
  {
    "category": "sentence",
    "front": "彼の態度はあまりにも無礼で、顧客の信頼を損なうこと甚だしい。",
    "back": "His attitude was so exceptionally rude that it thoroughly undermined the customer's trust.",
    "exampleJp": "彼の態度はあまりにも無礼で、顧客の信頼を損なうこと甚だしい。",
    "exampleTranslation": "His attitude was so exceptionally rude that it thoroughly undermined the customer's trust.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0195"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1245
  },
  {
    "category": "sentence",
    "front": "専門家でさえ予測できなかったのだから、素人の私が失敗したのも無理からぬことだ。",
    "back": "Given that even the experts could not predict it, it is only natural that an amateur like me would fail.",
    "exampleJp": "専門家でさえ予測できなかったのだから、素人の私が失敗したのも無理からぬことだ。",
    "exampleTranslation": "Given that even the experts could not predict it, it is only natural that an amateur like me would fail.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0196"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1246
  },
  {
    "category": "sentence",
    "front": "環境保護の重要性が叫ばれる中、企業は利益のみを追求する姿勢を改めざるを得ない。",
    "back": "Amidst the growing emphasis on environmental protection, companies have no choice but to reform their stance of solely pursuing profit.",
    "exampleJp": "環境保護の重要性が叫ばれる中、企業は利益のみを追求する姿勢を改めざるを得ない。",
    "exampleTranslation": "Amidst the growing emphasis on environmental protection, companies have no choice but to reform their stance of solely pursuing profit.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0197"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1247
  },
  {
    "category": "sentence",
    "front": "情報漏洩という重大な不祥事を起こした以上、社長の辞任は免れないだろう。",
    "back": "Having caused such a severe scandal as an information leak, the president's resignation is likely inevitable.",
    "exampleJp": "情報漏洩という重大な不祥事を起こした以上、社長の辞任は免れないだろう。",
    "exampleTranslation": "Having caused such a severe scandal as an information leak, the president's resignation is likely inevitable.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0198"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1248
  },
  {
    "category": "sentence",
    "front": "彼は周囲の忠告をよそに、無謀とも言える投資計画を強行した。",
    "back": "Disregarding the advice of those around him, he forced through what could be called a reckless investment plan.",
    "exampleJp": "彼は周囲の忠告をよそに、無謀とも言える投資計画を強行した。",
    "exampleTranslation": "Disregarding the advice of those around him, he forced through what could be called a reckless investment plan.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0199"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1249
  },
  {
    "category": "sentence",
    "front": "その映画のラストシーンは、観る者の心を揺さぶってやまない感動的なものであった。",
    "back": "The final scene of that movie was so moving that it never ceases to stir the hearts of those who watch it.",
    "exampleJp": "その映画のラストシーンは、観る者の心を揺さぶってやまない感動的なものであった。",
    "exampleTranslation": "The final scene of that movie was so moving that it never ceases to stir the hearts of those who watch it.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0200"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1250
  },
  {
    "category": "sentence",
    "front": "我が社は創業以来、品質第一をモットーとして顧客の期待に応えてきた。",
    "back": "Since our founding, our company has met customer expectations with 'quality first' as our motto.",
    "exampleJp": "我が社は創業以来、品質第一をモットーとして顧客の期待に応えてきた。",
    "exampleTranslation": "Since our founding, our company has met customer expectations with 'quality first' as our motto.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0201"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1251
  },
  {
    "category": "sentence",
    "front": "現代社会において、インターネットは電気や水道と並んで生活に不可欠なインフラとなっている。",
    "back": "In modern society, the internet has become an essential piece of infrastructure for daily life, alongside electricity and water.",
    "exampleJp": "現代社会において、インターネットは電気や水道と並んで生活に不可欠なインフラとなっている。",
    "exampleTranslation": "In modern society, the internet has become an essential piece of infrastructure for daily life, alongside electricity and water.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0202"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1252
  },
  {
    "category": "sentence",
    "front": "予算の制約があるにせよ、安全対策を軽視することは決して許されない。",
    "back": "Even granting there are budget constraints, neglecting safety measures can never be excused.",
    "exampleJp": "予算の制約があるにせよ、安全対策を軽視することは決して許されない。",
    "exampleTranslation": "Even granting there are budget constraints, neglecting safety measures can never be excused.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0203"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1253
  },
  {
    "category": "sentence",
    "front": "彼は病気で倒れて以来、健康のありがたさを痛感しているようだ。",
    "back": "Ever since collapsing from illness, he seems to keenly realize the blessing of good health.",
    "exampleJp": "彼は病気で倒れて以来、健康のありがたさを痛感しているようだ。",
    "exampleTranslation": "Ever since collapsing from illness, he seems to keenly realize the blessing of good health.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0204"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1254
  },
  {
    "category": "sentence",
    "front": "国際社会は、武力による現状変更の試みを断固として非難すべきである。",
    "back": "The international community must resolutely condemn any attempts to change the status quo by force.",
    "exampleJp": "国際社会は、武力による現状変更の試みを断固として非難すべきである。",
    "exampleTranslation": "The international community must resolutely condemn any attempts to change the status quo by force.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0205"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1255
  },
  {
    "category": "sentence",
    "front": "この小説は、単なる恋愛物語にとどまらず、人間の生と死の深いテーマを探求している。",
    "back": "This novel is not limited to being a mere romance story; it explores the deep themes of human life and death.",
    "exampleJp": "この小説は、単なる恋愛物語にとどまらず、人間の生と死の深いテーマを探求している。",
    "exampleTranslation": "This novel is not limited to being a mere romance story; it explores the deep themes of human life and death.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0206"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1256
  },
  {
    "category": "sentence",
    "front": "あの政治家の発言は、到底理解しがたく、国民の反発を招く結果となった。",
    "back": "That politician's remarks were utterly incomprehensible and resulted in provoking a public backlash.",
    "exampleJp": "あの政治家の発言は、到底理解しがたく、国民の反発を招く結果となった。",
    "exampleTranslation": "That politician's remarks were utterly incomprehensible and resulted in provoking a public backlash.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0207"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1257
  },
  {
    "category": "sentence",
    "front": "新しい技術が社会に定着するまでには、一定の移行期間を要するのが常である。",
    "back": "It is customary that a certain transition period is required before a new technology becomes firmly established in society.",
    "exampleJp": "新しい技術が社会に定着するまでには、一定の移行期間を要するのが常である。",
    "exampleTranslation": "It is customary that a certain transition period is required before a new technology becomes firmly established in society.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0208"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1258
  },
  {
    "category": "sentence",
    "front": "彼の実力からすれば、今度の大会で優勝するのも決して夢ではない。",
    "back": "Judging from his true abilities, winning the upcoming tournament is by no means just a dream.",
    "exampleJp": "彼の実力からすれば、今度の大会で優勝するのも決して夢ではない。",
    "exampleTranslation": "Judging from his true abilities, winning the upcoming tournament is by no means just a dream.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0209"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1259
  },
  {
    "category": "sentence",
    "front": "温暖化対策は一国のみで解決できる問題ではなく、地球規模での協力が不可欠である。",
    "back": "Global warming is not an issue that can be solved by one country alone; cooperation on a global scale is indispensable.",
    "exampleJp": "温暖化対策は一国のみで解決できる問題ではなく、地球規模での協力が不可欠である。",
    "exampleTranslation": "Global warming is not an issue that can be solved by one country alone; cooperation on a global scale is indispensable.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0210"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1260
  },
  {
    "category": "sentence",
    "front": "経験の浅い彼にこのような重要な任務を任せるのは、いささか不安が残る。",
    "back": "Entrusting such an important mission to him, who has little experience, leaves me somewhat anxious.",
    "exampleJp": "経験の浅い彼にこのような重要な任務を任せるのは、いささか不安が残る。",
    "exampleTranslation": "Entrusting such an important mission to him, who has little experience, leaves me somewhat anxious.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0211"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1261
  },
  {
    "category": "sentence",
    "front": "厳しい財政状況を踏まえ、無駄な支出を徹底的に削減する方針が打ち出された。",
    "back": "Based on the severe financial situation, a policy to thoroughly reduce wasteful spending was put forward.",
    "exampleJp": "厳しい財政状況を踏まえ、無駄な支出を徹底的に削減する方針が打ち出された。",
    "exampleTranslation": "Based on the severe financial situation, a policy to thoroughly reduce wasteful spending was put forward.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0212"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1262
  },
  {
    "category": "sentence",
    "front": "彼女の演奏は技術的に優れているのみならず、聴衆の心に直接訴えかける情熱がある。",
    "back": "Her performance is not only technically excellent but also possesses a passion that appeals directly to the hearts of the audience.",
    "exampleJp": "彼女の演奏は技術的に優れているのみならず、聴衆の心に直接訴えかける情熱がある。",
    "exampleTranslation": "Her performance is not only technically excellent but also possesses a passion that appeals directly to the hearts of the audience.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0213"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1263
  },
  {
    "category": "sentence",
    "front": "当時の資料を丹念に調べることによって、歴史の隠された真実が次々と明らかになった。",
    "back": "By painstakingly examining the documents from that time, the hidden truths of history have come to light one after another.",
    "exampleJp": "当時の資料を丹念に調べることによって、歴史の隠された真実が次々と明らかになった。",
    "exampleTranslation": "By painstakingly examining the documents from that time, the hidden truths of history have come to light one after another.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0214"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1264
  },
  {
    "category": "sentence",
    "front": "失敗を恐れるあまり、新しい挑戦を避けるようでは、個人の成長は望めない。",
    "back": "If you avoid new challenges out of an excessive fear of failure, you cannot hope for personal growth.",
    "exampleJp": "失敗を恐れるあまり、新しい挑戦を避けるようでは、個人の成長は望めない。",
    "exampleTranslation": "If you avoid new challenges out of an excessive fear of failure, you cannot hope for personal growth.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0215"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1265
  },
  {
    "category": "sentence",
    "front": "あの企業の成長スピードには、目を見張るものがある。",
    "back": "The speed of that company's growth is truly astonishing to behold.",
    "exampleJp": "あの企業の成長スピードには、目を見張るものがある。",
    "exampleTranslation": "The speed of that company's growth is truly astonishing to behold.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0216"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1266
  },
  {
    "category": "sentence",
    "front": "少子高齢化が進行する中、労働力不足の解消は社会全体で取り組むべき喫緊の課題だ。",
    "back": "As the birthrate declines and the population ages, resolving the labor shortage is a pressing issue that society as a whole must tackle.",
    "exampleJp": "少子高齢化が進行する中、労働力不足の解消は社会全体で取り組むべき喫緊の課題だ。",
    "exampleTranslation": "As the birthrate declines and the population ages, resolving the labor shortage is a pressing issue that society as a whole must tackle.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0217"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1267
  },
  {
    "category": "sentence",
    "front": "彼は天才的な才能に恵まれている一方で、人付き合いが極端に苦手である。",
    "back": "While he is blessed with genius-level talent, he is extremely bad at socializing with others.",
    "exampleJp": "彼は天才的な才能に恵まれている一方で、人付き合いが極端に苦手である。",
    "exampleTranslation": "While he is blessed with genius-level talent, he is extremely bad at socializing with others.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0218"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1268
  },
  {
    "category": "sentence",
    "front": "たとえどんなに困難な壁が立ちはだかろうとも、最後まで諦めずにやり遂げる覚悟だ。",
    "back": "No matter how difficult a wall stands in my way, I am prepared to see it through to the end without giving up.",
    "exampleJp": "たとえどんなに困難な壁が立ちはだかろうとも、最後まで諦めずにやり遂げる覚悟だ。",
    "exampleTranslation": "No matter how difficult a wall stands in my way, I am prepared to see it through to the end without giving up.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0219"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1269
  },
  {
    "category": "sentence",
    "front": "今後の協議の進展いかんによっては、スケジュールの見直しも辞さない構えだ。",
    "back": "Depending on the progress of future discussions, we are prepared to not hesitate in revising the schedule.",
    "exampleJp": "今後の協議の進展いかんによっては、スケジュールの見直しも辞さない構えだ。",
    "exampleTranslation": "Depending on the progress of future discussions, we are prepared to not hesitate in revising the schedule.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0220"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1270
  },
  {
    "category": "sentence",
    "front": "美術館に展示されている絵画は、どれも言葉では言い表せないほど美しい。",
    "back": "The paintings displayed in the art museum are all beautiful beyond what words can express.",
    "exampleJp": "美術館に展示されている絵画は、どれも言葉では言い表せないほど美しい。",
    "exampleTranslation": "The paintings displayed in the art museum are all beautiful beyond what words can express.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0221"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1271
  },
  {
    "category": "sentence",
    "front": "経営方針の転換を巡って、社内では意見の対立が表面化しつつある。",
    "back": "Over the shift in management policy, a clash of opinions is beginning to surface within the company.",
    "exampleJp": "経営方針の転換を巡って、社内では意見の対立が表面化しつつある。",
    "exampleTranslation": "Over the shift in management policy, a clash of opinions is beginning to surface within the company.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0222"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1272
  },
  {
    "category": "sentence",
    "front": "この地域の伝統文化を後世に継承していくことは、私たちの重要な使命である。",
    "back": "Passing down the traditional culture of this region to future generations is our important mission.",
    "exampleJp": "この地域の伝統文化を後世に継承していくことは、私たちの重要な使命である。",
    "exampleTranslation": "Passing down the traditional culture of this region to future generations is our important mission.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0223"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1273
  },
  {
    "category": "sentence",
    "front": "彼は自らの非を認めるどころか、責任を部下に押し付けようとした。",
    "back": "Far from admitting his own fault, he tried to push the blame onto his subordinates.",
    "exampleJp": "彼は自らの非を認めるどころか、責任を部下に押し付けようとした。",
    "exampleTranslation": "Far from admitting his own fault, he tried to push the blame onto his subordinates.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0224"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1274
  },
  {
    "category": "sentence",
    "front": "最新の研究によれば、睡眠の質が日中のパフォーマンスに多大な影響を及ぼすという。",
    "back": "According to the latest research, sleep quality exerts a tremendous influence on daytime performance.",
    "exampleJp": "最新の研究によれば、睡眠の質が日中のパフォーマンスに多大な影響を及ぼすという。",
    "exampleTranslation": "According to the latest research, sleep quality exerts a tremendous influence on daytime performance.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0225"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1275
  },
  {
    "category": "sentence",
    "front": "この程度の損害で済んだのは、不幸中の幸いと言うべきだろう。",
    "back": "That the damage was kept to this extent should probably be called a silver lining in a tragedy.",
    "exampleJp": "この程度の損害で済んだのは、不幸中の幸いと言うべきだろう。",
    "exampleTranslation": "That the damage was kept to this extent should probably be called a silver lining in a tragedy.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0226"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1276
  },
  {
    "category": "sentence",
    "front": "計画の実行にあたっては、様々なリスクを想定し、万全の準備を整える必要がある。",
    "back": "When executing the plan, it is necessary to anticipate various risks and make thorough preparations.",
    "exampleJp": "計画の実行にあたっては、様々なリスクを想定し、万全の準備を整える必要がある。",
    "exampleTranslation": "When executing the plan, it is necessary to anticipate various risks and make thorough preparations.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0227"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1277
  },
  {
    "category": "sentence",
    "front": "現代の消費者は、製品の価格だけでなく、企業が果たす社会的責任にも目を向けている。",
    "back": "Modern consumers look not only at the price of a product but also at the social responsibilities fulfilled by the company.",
    "exampleJp": "現代の消費者は、製品の価格だけでなく、企業が果たす社会的責任にも目を向けている。",
    "exampleTranslation": "Modern consumers look not only at the price of a product but also at the social responsibilities fulfilled by the company.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0228"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1278
  },
  {
    "category": "sentence",
    "front": "両国の関係改善に向けた交渉は、未だに暗礁に乗り上げたまま打開の糸口が見えない。",
    "back": "Negotiations aimed at improving relations between the two countries remain deadlocked, with no clue for a breakthrough in sight.",
    "exampleJp": "両国の関係改善に向けた交渉は、未だに暗礁に乗り上げたまま打開の糸口が見えない。",
    "exampleTranslation": "Negotiations aimed at improving relations between the two countries remain deadlocked, with no clue for a breakthrough in sight.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0229"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1279
  },
  {
    "category": "sentence",
    "front": "彼はどんな苦境に立たされても、常に前向きな姿勢を崩すことがない。",
    "back": "No matter what difficult situation he is placed in, he never loses his positive attitude.",
    "exampleJp": "彼はどんな苦境に立たされても、常に前向きな姿勢を崩すことがない。",
    "exampleTranslation": "No matter what difficult situation he is placed in, he never loses his positive attitude.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0230"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1280
  },
  {
    "category": "sentence",
    "front": "地域の活性化を図るためには、住民と行政が一体となって取り組むことが肝要である。",
    "back": "In order to revitalize the region, it is essential that residents and the administration work together as one.",
    "exampleJp": "地域の活性化を図るためには、住民と行政が一体となって取り組むことが肝要である。",
    "exampleTranslation": "In order to revitalize the region, it is essential that residents and the administration work together as one.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0231"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1281
  },
  {
    "category": "sentence",
    "front": "新製品の発表会には、業界関係者のみならず、多くの一般消費者も詰めかけた。",
    "back": "The new product presentation was crowded not only with industry insiders but also with many general consumers.",
    "exampleJp": "新製品の発表会には、業界関係者のみならず、多くの一般消費者も詰めかけた。",
    "exampleTranslation": "The new product presentation was crowded not only with industry insiders but also with many general consumers.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0232"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1282
  },
  {
    "category": "sentence",
    "front": "彼女の献身的なサポートなしには、このプロジェクトの成功は到底あり得なかった。",
    "back": "Without her dedicated support, the success of this project would have been absolutely impossible.",
    "exampleJp": "彼女の献身的なサポートなしには、このプロジェクトの成功は到底あり得なかった。",
    "exampleTranslation": "Without her dedicated support, the success of this project would have been absolutely impossible.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0233"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1283
  },
  {
    "category": "sentence",
    "front": "科学技術の急速な進歩は、我々のライフスタイルを根本から変容させつつある。",
    "back": "The rapid progress of science and technology is fundamentally transforming our lifestyles.",
    "exampleJp": "科学技術の急速な進歩は、我々のライフスタイルを根本から変容させつつある。",
    "exampleTranslation": "The rapid progress of science and technology is fundamentally transforming our lifestyles.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0234"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1284
  },
  {
    "category": "sentence",
    "front": "この問題は一筋縄ではいかず、多角的な視点からの慎重な分析が求められる。",
    "back": "This problem cannot be dealt with by ordinary means and requires careful analysis from multiple perspectives.",
    "exampleJp": "この問題は一筋縄ではいかず、多角的な視点からの慎重な分析が求められる。",
    "exampleTranslation": "This problem cannot be dealt with by ordinary means and requires careful analysis from multiple perspectives.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0235"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1285
  },
  {
    "category": "sentence",
    "front": "彼は長年の功績が認められ、ついに名誉ある賞を受賞するに至った。",
    "back": "With his long years of achievements recognized, he has finally come to receive a prestigious award.",
    "exampleJp": "彼は長年の功績が認められ、ついに名誉ある賞を受賞するに至った。",
    "exampleTranslation": "With his long years of achievements recognized, he has finally come to receive a prestigious award.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0236"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1286
  },
  {
    "category": "sentence",
    "front": "複雑化する現代社会においては、多様な価値観を互いに尊重し合う寛容さが不可欠だ。",
    "back": "In our increasingly complex modern society, the tolerance to mutually respect diverse values is indispensable.",
    "exampleJp": "複雑化する現代社会においては、多様な価値観を互いに尊重し合う寛容さが不可欠だ。",
    "exampleTranslation": "In our increasingly complex modern society, the tolerance to mutually respect diverse values is indispensable.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0237"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1287
  },
  {
    "category": "sentence",
    "front": "その画期的な発明は、医療の歴史において新たな章の幕開けとなるものであった。",
    "back": "That groundbreaking invention served as the opening of a new chapter in the history of medicine.",
    "exampleJp": "その画期的な発明は、医療の歴史において新たな章の幕開けとなるものであった。",
    "exampleTranslation": "That groundbreaking invention served as the opening of a new chapter in the history of medicine.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0238"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1288
  },
  {
    "category": "sentence",
    "front": "現行の制度は時代の変化に対応しきれておらず、抜本的な改革が急務となっている。",
    "back": "The current system is failing to keep up with the changing times, making radical reform an urgent task.",
    "exampleJp": "現行の制度は時代の変化に対応しきれておらず、抜本的な改革が急務となっている。",
    "exampleTranslation": "The current system is failing to keep up with the changing times, making radical reform an urgent task.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0239"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1289
  },
  {
    "category": "sentence",
    "front": "何事も最初から完璧を求めるのではなく、試行錯誤を繰り返しながら改善していくべきだ。",
    "back": "Instead of demanding perfection from the start in everything, we should improve through repeated trial and error.",
    "exampleJp": "何事も最初から完璧を求めるのではなく、試行錯誤を繰り返しながら改善していくべきだ。",
    "exampleTranslation": "Instead of demanding perfection from the start in everything, we should improve through repeated trial and error.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0240"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1290
  },
  {
    "category": "sentence",
    "front": "政府の景気刺激策が功を奏し、長らく低迷していた個人消費にようやく回復の兆しが見え始めた。",
    "back": "The government's economic stimulus measures have borne fruit, and signs of recovery are finally beginning to appear in personal consumption, which had been slumping for a long time.",
    "exampleJp": "政府の景気刺激策が功を奏し、長らく低迷していた個人消費にようやく回復の兆しが見え始めた。",
    "exampleTranslation": "The government's economic stimulus measures have borne fruit, and signs of recovery are finally beginning to appear in personal consumption, which had been slumping for a long time.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0241"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1291
  },
  {
    "category": "sentence",
    "front": "少子高齢化に伴う労働力不足を補うべく、多くの企業が外国人材の積極的な登用に踏み切っている。",
    "back": "To compensate for the labor shortage accompanying the declining birthrate and aging population, many companies are taking the step of actively employing foreign talent.",
    "exampleJp": "少子高齢化に伴う労働力不足を補うべく、多くの企業が外国人材の積極的な登用に踏み切っている。",
    "exampleTranslation": "To compensate for the labor shortage accompanying the declining birthrate and aging population, many companies are taking the step of actively employing foreign talent.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0242"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1292
  },
  {
    "category": "sentence",
    "front": "為替の急激な変動は、輸出に依存する我が国の製造業にとって死活問題となりかねない。",
    "back": "Rapid exchange rate fluctuations could become a life-or-death issue for our country's manufacturing industry, which relies on exports.",
    "exampleJp": "為替の急激な変動は、輸出に依存する我が国の製造業にとって死活問題となりかねない。",
    "exampleTranslation": "Rapid exchange rate fluctuations could become a life-or-death issue for our country's manufacturing industry, which relies on exports.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0243"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1293
  },
  {
    "category": "sentence",
    "front": "地方自治体の財政破綻を防ぐためには、抜本的な税制改革が不可避であるとの見方が強まっている。",
    "back": "The view is strengthening that drastic tax reform is unavoidable in order to prevent the financial collapse of local governments.",
    "exampleJp": "地方自治体の財政破綻を防ぐためには、抜本的な税制改革が不可避であるとの見方が強まっている。",
    "exampleTranslation": "The view is strengthening that drastic tax reform is unavoidable in order to prevent the financial collapse of local governments.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0244"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1294
  },
  {
    "category": "sentence",
    "front": "不況下にあっても、独自の技術力を強みとする中堅企業の中には、着実に利益を伸ばしているところも少なくない。",
    "back": "Even under the recession, quite a few mid-sized companies that rely on their unique technological capabilities as a strength are steadily increasing their profits.",
    "exampleJp": "不況下にあっても、独自の技術力を強みとする中堅企業の中には、着実に利益を伸ばしているところも少なくない。",
    "exampleTranslation": "Even under the recession, quite a few mid-sized companies that rely on their unique technological capabilities as a strength are steadily increasing their profits.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0245"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1295
  },
  {
    "category": "sentence",
    "front": "インフラの老朽化対策は焦眉の急であり、これ以上の予算削減は国民の安全を脅かすものだ。",
    "back": "Countermeasures for aging infrastructure are of pressing urgency, and any further budget cuts would threaten the safety of the public.",
    "exampleJp": "インフラの老朽化対策は焦眉の急であり、これ以上の予算削減は国民の安全を脅かすものだ。",
    "exampleTranslation": "Countermeasures for aging infrastructure are of pressing urgency, and any further budget cuts would threaten the safety of the public.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0246"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1296
  },
  {
    "category": "sentence",
    "front": "格差社会の是正を訴える声が高まる一方で、具体的な富の再分配については議論が平行線をたどっている。",
    "back": "While voices calling for the correction of a society of inequality grow louder, discussions regarding the specific redistribution of wealth remain at a standstill.",
    "exampleJp": "格差社会の是正を訴える声が高まる一方で、具体的な富の再分配については議論が平行線をたどっている。",
    "exampleTranslation": "While voices calling for the correction of a society of inequality grow louder, discussions regarding the specific redistribution of wealth remain at a standstill.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0247"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1297
  },
  {
    "category": "sentence",
    "front": "新興国市場への進出を巡り、各国のグローバル企業による熾烈なシェア争いが繰り広げられている。",
    "back": "Fierce struggles for market share are unfolding among global companies from various countries over expansion into emerging markets.",
    "exampleJp": "新興国市場への進出を巡り、各国のグローバル企業による熾烈なシェア争いが繰り広げられている。",
    "exampleTranslation": "Fierce struggles for market share are unfolding among global companies from various countries over expansion into emerging markets.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0248"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1298
  },
  {
    "category": "sentence",
    "front": "金利引き上げの波及効果により、不動産市場における投資熱は急速に冷え込みつつある。",
    "back": "Due to the ripple effects of interest rate hikes, investment enthusiasm in the real estate market is rapidly cooling down.",
    "exampleJp": "金利引き上げの波及効果により、不動産市場における投資熱は急速に冷え込みつつある。",
    "exampleTranslation": "Due to the ripple effects of interest rate hikes, investment enthusiasm in the real estate market is rapidly cooling down.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0249"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1299
  },
  {
    "category": "sentence",
    "front": "デジタル通貨の普及が既存の金融システムにどのような変革をもたらすか、専門家の間でも意見が分かれるところだ。",
    "back": "Opinions are divided even among experts on what kind of transformation the spread of digital currencies will bring to the existing financial system.",
    "exampleJp": "デジタル通貨の普及が既存の金融システムにどのような変革をもたらすか、専門家の間でも意見が分かれるところだ。",
    "exampleTranslation": "Opinions are divided even among experts on what kind of transformation the spread of digital currencies will bring to the existing financial system.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0250"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1300
  },
  {
    "category": "sentence",
    "front": "補助金頼みの経営から脱却しない限り、その業界に真の自立と発展は望めないだろう。",
    "back": "As long as it does not break away from management reliant on subsidies, true independence and development cannot be expected for that industry.",
    "exampleJp": "補助金頼みの経営から脱却しない限り、その業界に真の自立と発展は望めないだろう。",
    "exampleTranslation": "As long as it does not break away from management reliant on subsidies, true independence and development cannot be expected for that industry.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0251"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1301
  },
  {
    "category": "sentence",
    "front": "規制緩和がもたらした光と影について、多角的な視点からの検証が今まさに求められている。",
    "back": "An examination from multifaceted perspectives regarding the light and shadow brought about by deregulation is exactly what is needed now.",
    "exampleJp": "規制緩和がもたらした光と影について、多角的な視点からの検証が今まさに求められている。",
    "exampleTranslation": "An examination from multifaceted perspectives regarding the light and shadow brought about by deregulation is exactly what is needed now.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0252"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1302
  },
  {
    "category": "sentence",
    "front": "地球温暖化を食い止めるには、一国のみならず国際社会全体が協調して温室効果ガスの削減に取り組むほかない。",
    "back": "To halt global warming, there is no choice but for the entire international community, not just a single nation, to cooperate in reducing greenhouse gas emissions.",
    "exampleJp": "地球温暖化を食い止めるには、一国のみならず国際社会全体が協調して温室効果ガスの削減に取り組むほかない。",
    "exampleTranslation": "To halt global warming, there is no choice but for the entire international community, not just a single nation, to cooperate in reducing greenhouse gas emissions.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0253"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1303
  },
  {
    "category": "sentence",
    "front": "プラスチックごみによる海洋汚染の実態が明らかになるにつれ、消費者の環境意識も劇的な変化を遂げた。",
    "back": "As the reality of marine pollution caused by plastic waste became clear, consumers' environmental awareness also underwent a dramatic change.",
    "exampleJp": "プラスチックごみによる海洋汚染の実態が明らかになるにつれ、消費者の環境意識も劇的な変化を遂げた。",
    "exampleTranslation": "As the reality of marine pollution caused by plastic waste became clear, consumers' environmental awareness also underwent a dramatic change.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0254"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1304
  },
  {
    "category": "sentence",
    "front": "再生可能エネルギーへの転換は容易な道のりではないが、次世代への責任として断行しなければならない。",
    "back": "The transition to renewable energy is not an easy path, but it must be carried out decisively as a responsibility to the next generation.",
    "exampleJp": "再生可能エネルギーへの転換は容易な道のりではないが、次世代への責任として断行しなければならない。",
    "exampleTranslation": "The transition to renewable energy is not an easy path, but it must be carried out decisively as a responsibility to the next generation.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0255"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1305
  },
  {
    "category": "sentence",
    "front": "絶滅危惧種の保護活動は、地域住民の理解と協力があって初めて実を結ぶものである。",
    "back": "Activities to protect endangered species only bear fruit when there is understanding and cooperation from local residents.",
    "exampleJp": "絶滅危惧種の保護活動は、地域住民の理解と協力があって初めて実を結ぶものである。",
    "exampleTranslation": "Activities to protect endangered species only bear fruit when there is understanding and cooperation from local residents.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0256"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1306
  },
  {
    "category": "sentence",
    "front": "異常気象が常態化しつつある昨今、従来の基準に基づいた防災計画では到底太刀打ちできない。",
    "back": "These days, as extreme weather is becoming the norm, disaster prevention plans based on conventional standards cannot possibly cope.",
    "exampleJp": "異常気象が常態化しつつある昨今、従来の基準に基づいた防災計画では到底太刀打ちできない。",
    "exampleTranslation": "These days, as extreme weather is becoming the norm, disaster prevention plans based on conventional standards cannot possibly cope.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0257"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1307
  },
  {
    "category": "sentence",
    "front": "森林伐採による生態系の破壊は、巡り巡って人類自身の生存をも脅かす深刻な事態を招きかねない。",
    "back": "The destruction of ecosystems through deforestation could eventually lead to a serious situation that threatens the survival of humanity itself.",
    "exampleJp": "森林伐採による生態系の破壊は、巡り巡って人類自身の生存をも脅かす深刻な事態を招きかねない。",
    "exampleTranslation": "The destruction of ecosystems through deforestation could eventually lead to a serious situation that threatens the survival of humanity itself.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0258"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1308
  },
  {
    "category": "sentence",
    "front": "環境保全と経済成長の両立という難題に対し、革新的な技術開発が突破口となることが期待される。",
    "back": "Innovative technological development is expected to serve as a breakthrough for the difficult challenge of balancing environmental conservation with economic growth.",
    "exampleJp": "環境保全と経済成長の両立という難題に対し、革新的な技術開発が突破口となることが期待される。",
    "exampleTranslation": "Innovative technological development is expected to serve as a breakthrough for the difficult challenge of balancing environmental conservation with economic growth.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0259"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1309
  },
  {
    "category": "sentence",
    "front": "砂漠化の進行を食い止めるための緑化事業が、長年の地道な努力の末にようやく軌道に乗り始めた。",
    "back": "Afforestation projects aimed at halting the progression of desertification have finally begun to get on track after years of steady effort.",
    "exampleJp": "砂漠化の進行を食い止めるための緑化事業が、長年の地道な努力の末にようやく軌道に乗り始めた。",
    "exampleTranslation": "Afforestation projects aimed at halting the progression of desertification have finally begun to get on track after years of steady effort.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0260"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1310
  },
  {
    "category": "sentence",
    "front": "過剰な農薬の使用が土壌に与える悪影響について、改めて警鐘を鳴らす研究結果が発表された。",
    "back": "Research results have been published that sound the alarm once again regarding the adverse effects that excessive use of agricultural chemicals has on soil.",
    "exampleJp": "過剰な農薬の使用が土壌に与える悪影響について、改めて警鐘を鳴らす研究結果が発表された。",
    "exampleTranslation": "Research results have been published that sound the alarm once again regarding the adverse effects that excessive use of agricultural chemicals has on soil.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0261"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1311
  },
  {
    "category": "sentence",
    "front": "都市部におけるヒートアイランド現象を緩和するため、屋上緑化や壁面緑化を義務付ける自治体が増えている。",
    "back": "To mitigate the heat island effect in urban areas, an increasing number of municipalities are making rooftop and wall greening mandatory.",
    "exampleJp": "都市部におけるヒートアイランド現象を緩和するため、屋上緑化や壁面緑化を義務付ける自治体が増えている。",
    "exampleTranslation": "To mitigate the heat island effect in urban areas, an increasing number of municipalities are making rooftop and wall greening mandatory.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0262"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1312
  },
  {
    "category": "sentence",
    "front": "廃棄物を単なるゴミとしてではなく、新たな資源として捉え直す循環型社会の構築が急務である。",
    "back": "Building a circular economy that reconsiders waste not merely as trash but as new resources is an urgent task.",
    "exampleJp": "廃棄物を単なるゴミとしてではなく、新たな資源として捉え直す循環型社会の構築が急務である。",
    "exampleTranslation": "Building a circular economy that reconsiders waste not merely as trash but as new resources is an urgent task.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0263"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1313
  },
  {
    "category": "sentence",
    "front": "生態系に配慮した持続可能な漁業のあり方を模索することが、ひいては食卓の豊かさを守ることにつながる。",
    "back": "Exploring sustainable fishing practices that are mindful of the ecosystem will, in turn, lead to protecting the richness of our dining tables.",
    "exampleJp": "生態系に配慮した持続可能な漁業のあり方を模索することが、ひいては食卓の豊かさを守ることにつながる。",
    "exampleTranslation": "Exploring sustainable fishing practices that are mindful of the ecosystem will, in turn, lead to protecting the richness of our dining tables.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0264"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1314
  },
  {
    "category": "sentence",
    "front": "人工知能の急速な進化は我々の生活を豊かにする半面、雇用を奪うのではないかという危惧を抱かせる。",
    "back": "While the rapid evolution of artificial intelligence enriches our lives, it simultaneously raises concerns that it might take away jobs.",
    "exampleJp": "人工知能の急速な進化は我々の生活を豊かにする半面、雇用を奪うのではないかという危惧を抱かせる。",
    "exampleTranslation": "While the rapid evolution of artificial intelligence enriches our lives, it simultaneously raises concerns that it might take away jobs.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0265"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1315
  },
  {
    "category": "sentence",
    "front": "膨大な個人情報が一部のIT企業に独占されている現状に対し、プライバシー保護の観点から厳しい目が向けられている。",
    "back": "Strict scrutiny is being directed from a privacy protection standpoint toward the current situation where vast amounts of personal information are monopolized by a few IT companies.",
    "exampleJp": "膨大な個人情報が一部のIT企業に独占されている現状に対し、プライバシー保護の観点から厳しい目が向けられている。",
    "exampleTranslation": "Strict scrutiny is being directed from a privacy protection standpoint toward the current situation where vast amounts of personal information are monopolized by a few IT companies.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0266"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1316
  },
  {
    "category": "sentence",
    "front": "自動運転技術の普及には、法整備やインフラ整備といった技術面以外のハードルも数多く残されている。",
    "back": "For autonomous driving technology to become widespread, many non-technical hurdles remain, such as legal frameworks and infrastructure development.",
    "exampleJp": "自動運転技術の普及には、法整備やインフラ整備といった技術面以外のハードルも数多く残されている。",
    "exampleTranslation": "For autonomous driving technology to become widespread, many non-technical hurdles remain, such as legal frameworks and infrastructure development.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0267"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1317
  },
  {
    "category": "sentence",
    "front": "インターネット上の誹謗中傷が深刻な社会問題となる中、表現の自由と人権保護のバランスをどう取るかが問われている。",
    "back": "As online slander becomes a serious social problem, the question is how to strike a balance between freedom of expression and the protection of human rights.",
    "exampleJp": "インターネット上の誹謗中傷が深刻な社会問題となる中、表現の自由と人権保護のバランスをどう取るかが問われている。",
    "exampleTranslation": "As online slander becomes a serious social problem, the question is how to strike a balance between freedom of expression and the protection of human rights.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0268"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1318
  },
  {
    "category": "sentence",
    "front": "テレワークの導入により働き方の多様化が進んだ一方で、コミュニケーション不足による弊害も指摘され始めた。",
    "back": "While the introduction of remote work has advanced the diversification of work styles, the negative effects of a lack of communication have also begun to be pointed out.",
    "exampleJp": "テレワークの導入により働き方の多様化が進んだ一方で、コミュニケーション不足による弊害も指摘され始めた。",
    "exampleTranslation": "While the introduction of remote work has advanced the diversification of work styles, the negative effects of a lack of communication have also begun to be pointed out.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0269"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1319
  },
  {
    "category": "sentence",
    "front": "高度に情報化された現代社会においては、真偽を見極めるメディアリテラシーの重要性がかつてなく高まっている。",
    "back": "In today's highly digitized society, the importance of media literacy to distinguish truth from falsehood has increased more than ever before.",
    "exampleJp": "高度に情報化された現代社会においては、真偽を見極めるメディアリテラシーの重要性がかつてなく高まっている。",
    "exampleTranslation": "In today's highly digitized society, the importance of media literacy to distinguish truth from falsehood has increased more than ever before.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0270"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1320
  },
  {
    "category": "sentence",
    "front": "技術革新のスピードに法制度が追いついておらず、グレーゾーンにおけるビジネスの適法性が度々議論の的となる。",
    "back": "Legal systems have not kept pace with the speed of technological innovation, and the legality of businesses in gray zones frequently becomes the subject of debate.",
    "exampleJp": "技術革新のスピードに法制度が追いついておらず、グレーゾーンにおけるビジネスの適法性が度々議論の的となる。",
    "exampleTranslation": "Legal systems have not kept pace with the speed of technological innovation, and the legality of businesses in gray zones frequently becomes the subject of debate.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0271"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1321
  },
  {
    "category": "sentence",
    "front": "サイバー攻撃の手口が巧妙化の一途をたどる中、企業にはこれまで以上に強固なセキュリティ対策が求められる。",
    "back": "As the methods of cyberattacks continue to grow more sophisticated, companies are required to implement even stronger security measures than before.",
    "exampleJp": "サイバー攻撃の手口が巧妙化の一途をたどる中、企業にはこれまで以上に強固なセキュリティ対策が求められる。",
    "exampleTranslation": "As the methods of cyberattacks continue to grow more sophisticated, companies are required to implement even stronger security measures than before.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0272"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1322
  },
  {
    "category": "sentence",
    "front": "ゲノム編集技術の人への応用は、倫理的な観点から到底許容できるものではないと主張する識者も多い。",
    "back": "Many experts argue that the application of genome editing technology to humans is completely unacceptable from an ethical standpoint.",
    "exampleJp": "ゲノム編集技術の人への応用は、倫理的な観点から到底許容できるものではないと主張する識者も多い。",
    "exampleTranslation": "Many experts argue that the application of genome editing technology to humans is completely unacceptable from an ethical standpoint.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0273"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1323
  },
  {
    "category": "sentence",
    "front": "仮想空間での経済活動が現実の経済に多大な影響を及ぼすという事態は、もはやSF映画の中だけの話ではない。",
    "back": "The situation where economic activity in virtual spaces exerts a massive influence on the real economy is no longer just a story from science fiction movies.",
    "exampleJp": "仮想空間での経済活動が現実の経済に多大な影響を及ぼすという事態は、もはやSF映画の中だけの話ではない。",
    "exampleTranslation": "The situation where economic activity in virtual spaces exerts a massive influence on the real economy is no longer just a story from science fiction movies.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0274"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1324
  },
  {
    "category": "sentence",
    "front": "デジタル技術を活用した教育格差の是正が期待される一方で、端末整備の遅れによる新たな格差を生む恐れもある。",
    "back": "While there are expectations for correcting educational inequality through the utilization of digital technology, there is also the fear of creating new disparities due to delays in equipping devices.",
    "exampleJp": "デジタル技術を活用した教育格差の是正が期待される一方で、端末整備の遅れによる新たな格差を生む恐れもある。",
    "exampleTranslation": "While there are expectations for correcting educational inequality through the utilization of digital technology, there is also the fear of creating new disparities due to delays in equipping devices.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0275"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1325
  },
  {
    "category": "sentence",
    "front": "宇宙開発が国家の威信を懸けた競争から民間企業主導のビジネスへと移行しつつあるのは、時代の必然と言えよう。",
    "back": "It can be said that it is an inevitability of the times that space exploration is transitioning from a competition involving national prestige to a business led by private companies.",
    "exampleJp": "宇宙開発が国家の威信を懸けた競争から民間企業主導のビジネスへと移行しつつあるのは、時代の必然と言えよう。",
    "exampleTranslation": "It can be said that it is an inevitability of the times that space exploration is transitioning from a competition involving national prestige to a business led by private companies.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0276"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1326
  },
  {
    "category": "sentence",
    "front": "終身雇用制度が崩壊しつつある今、ビジネスパーソンには自らのキャリアを主体的に切り拓く覚悟が不可欠だ。",
    "back": "Now that the lifetime employment system is collapsing, business professionals absolutely must have the resolve to proactively carve out their own careers.",
    "exampleJp": "終身雇用制度が崩壊しつつある今、ビジネスパーソンには自らのキャリアを主体的に切り拓く覚悟が不可欠だ。",
    "exampleTranslation": "Now that the lifetime employment system is collapsing, business professionals absolutely must have the resolve to proactively carve out their own careers.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0277"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1327
  },
  {
    "category": "sentence",
    "front": "育児休暇の取得を推進する制度は整ったものの、職場の無理解という見えない壁に阻まれているケースは依然として多い。",
    "back": "Although systems to promote taking childcare leave have been put in place, there are still many cases hindered by the invisible wall of workplace incomprehension.",
    "exampleJp": "育児休暇の取得を推進する制度は整ったものの、職場の無理解という見えない壁に阻まれているケースは依然として多い。",
    "exampleTranslation": "Although systems to promote taking childcare leave have been put in place, there are still many cases hindered by the invisible wall of workplace incomprehension.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0278"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1328
  },
  {
    "category": "sentence",
    "front": "多様な人材を活かすダイバーシティ経営は、もはや単なる理念ではなく、企業が生き残るための必須条件となりつつある。",
    "back": "Diversity management, which utilizes diverse talent, is no longer merely an ideal, but is becoming an essential condition for companies to survive.",
    "exampleJp": "多様な人材を活かすダイバーシティ経営は、もはや単なる理念ではなく、企業が生き残るための必須条件となりつつある。",
    "exampleTranslation": "Diversity management, which utilizes diverse talent, is no longer merely an ideal, but is becoming an essential condition for companies to survive.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0279"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1329
  },
  {
    "category": "sentence",
    "front": "ハラスメントに対する社会の目は厳しさを増しており、かつては見過ごされていたような言動も今や許されない。",
    "back": "Society's scrutiny of harassment is growing stricter, and words and actions that might have been overlooked in the past are no longer tolerated.",
    "exampleJp": "ハラスメントに対する社会の目は厳しさを増しており、かつては見過ごされていたような言動も今や許されない。",
    "exampleTranslation": "Society's scrutiny of harassment is growing stricter, and words and actions that might have been overlooked in the past are no longer tolerated.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0280"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1330
  },
  {
    "category": "sentence",
    "front": "生産性の向上を名目とした人員削減は、残された社員に過度な負担を強いる結果となり、かえって士気を低下させかねない。",
    "back": "Personnel reductions disguised as productivity improvements force an excessive burden on remaining employees, which can ultimately lower morale instead.",
    "exampleJp": "生産性の向上を名目とした人員削減は、残された社員に過度な負担を強いる結果となり、かえって士気を低下させかねない。",
    "exampleTranslation": "Personnel reductions disguised as productivity improvements force an excessive burden on remaining employees, which can ultimately lower morale instead.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0281"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1331
  },
  {
    "category": "sentence",
    "front": "上司と部下の間にある認識のズレを解消しない限り、どれほど立派な経営戦略を掲げても絵に描いた餅に過ぎない。",
    "back": "Unless the perception gap between superiors and subordinates is resolved, no matter how magnificent a management strategy is proposed, it will be nothing more than a pie in the sky.",
    "exampleJp": "上司と部下の間にある認識のズレを解消しない限り、どれほど立派な経営戦略を掲げても絵に描いた餅に過ぎない。",
    "exampleTranslation": "Unless the perception gap between superiors and subordinates is resolved, no matter how magnificent a management strategy is proposed, it will be nothing more than a pie in the sky.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0282"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1332
  },
  {
    "category": "sentence",
    "front": "若者の非正規雇用問題は、個人の努力不足に帰するのではなく、社会構造の欠陥として捉えるべきである。",
    "back": "The issue of irregular employment among young people should not be attributed to an individual's lack of effort, but rather viewed as a flaw in the social structure.",
    "exampleJp": "若者の非正規雇用問題は、個人の努力不足に帰するのではなく、社会構造の欠陥として捉えるべきである。",
    "exampleTranslation": "The issue of irregular employment among young people should not be attributed to an individual's lack of effort, but rather viewed as a flaw in the social structure.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0283"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1333
  },
  {
    "category": "sentence",
    "front": "長時間労働を美徳とするような古い企業風土を一掃することが、働き方改革の第一歩と言っても過言ではない。",
    "back": "It is no exaggeration to say that sweeping away the old corporate culture that views long working hours as a virtue is the first step in work-style reform.",
    "exampleJp": "長時間労働を美徳とするような古い企業風土を一掃することが、働き方改革の第一歩と言っても過言ではない。",
    "exampleTranslation": "It is no exaggeration to say that sweeping away the old corporate culture that views long working hours as a virtue is the first step in work-style reform.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0284"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1334
  },
  {
    "category": "sentence",
    "front": "実力主義を導入した企業の中には、かえって社内の風通しが悪くなり、チームワークが損なわれた事例も散見される。",
    "back": "Among companies that have introduced meritocracy, there are scattered cases where internal communication has actually worsened and teamwork has been impaired.",
    "exampleJp": "実力主義を導入した企業の中には、かえって社内の風通しが悪くなり、チームワークが損なわれた事例も散見される。",
    "exampleTranslation": "Among companies that have introduced meritocracy, there are scattered cases where internal communication has actually worsened and teamwork has been impaired.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0285"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1335
  },
  {
    "category": "sentence",
    "front": "メンタルヘルス不調を訴える社員の増加は、現代のストレス社会を映し出す鏡と言えるだろう。",
    "back": "The increase in employees complaining of poor mental health can be said to be a mirror reflecting today's stress-filled society.",
    "exampleJp": "メンタルヘルス不調を訴える社員の増加は、現代のストレス社会を映し出す鏡と言えるだろう。",
    "exampleTranslation": "The increase in employees complaining of poor mental health can be said to be a mirror reflecting today's stress-filled society.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0286"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1336
  },
  {
    "category": "sentence",
    "front": "地域コミュニティの衰退が叫ばれて久しいが、最近では新たな形の繋がりを模索する動きも徐々に広がりつつある。",
    "back": "It has been a long time since the decline of local communities was decried, but recently, movements exploring new forms of connection are also gradually spreading.",
    "exampleJp": "地域コミュニティの衰退が叫ばれて久しいが、最近では新たな形の繋がりを模索する動きも徐々に広がりつつある。",
    "exampleTranslation": "It has been a long time since the decline of local communities was decried, but recently, movements exploring new forms of connection are also gradually spreading.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0287"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1337
  },
  {
    "category": "sentence",
    "front": "高齢者の孤立死を防ぐためには、行政の支援システムだけでなく、地域住民による緩やかな見守りネットワークが欠かせない。",
    "back": "To prevent the solitary deaths of the elderly, not only administrative support systems but also loose-knit monitoring networks by local residents are indispensable.",
    "exampleJp": "高齢者の孤立死を防ぐためには、行政の支援システムだけでなく、地域住民による緩やかな見守りネットワークが欠かせない。",
    "exampleTranslation": "To prevent the solitary deaths of the elderly, not only administrative support systems but also loose-knit monitoring networks by local residents are indispensable.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0288"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1338
  },
  {
    "category": "sentence",
    "front": "いくら反対運動が起きようとも、国家の安全保障に関わる重大な決定である以上、計画を白紙に戻すわけにはいかない。",
    "back": "No matter how much an opposition movement arises, given that it is a crucial decision concerning national security, the plan cannot possibly be scrapped.",
    "exampleJp": "いくら反対運動が起きようとも、国家の安全保障に関わる重大な決定である以上、計画を白紙に戻すわけにはいかない。",
    "exampleTranslation": "No matter how much an opposition movement arises, given that it is a crucial decision concerning national security, the plan cannot possibly be scrapped.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0289"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1339
  },
  {
    "category": "sentence",
    "front": "一見すると合理的な政策に思えるが、その裏に潜む弊害について誰も言及しようとしないのは不可解極まりない。",
    "back": "At first glance, it seems like a rational policy, but it is utterly baffling that no one tries to mention the harmful effects lurking behind it.",
    "exampleJp": "一見すると合理的な政策に思えるが、その裏に潜む弊害について誰も言及しようとしないのは不可解極まりない。",
    "exampleTranslation": "At first glance, it seems like a rational policy, but it is utterly baffling that no one tries to mention the harmful effects lurking behind it.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0290"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1340
  },
  {
    "category": "sentence",
    "front": "利益至上主義に走り、品質管理を疎かにした結果がこの大惨事であることは、誰の目にも明らかである。",
    "back": "It is obvious to anyone that this catastrophe is the result of running toward profit-first principles and neglecting quality control.",
    "exampleJp": "利益至上主義に走り、品質管理を疎かにした結果がこの大惨事であることは、誰の目にも明らかである。",
    "exampleTranslation": "It is obvious to anyone that this catastrophe is the result of running toward profit-first principles and neglecting quality control.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0291"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1341
  },
  {
    "category": "sentence",
    "front": "失敗を恐れて何も行動を起こさないことこそ、最大の失敗であるという事実に早く気づくべきだ。",
    "back": "We should quickly realize the fact that fearing failure and taking no action is itself the greatest failure.",
    "exampleJp": "失敗を恐れて何も行動を起こさないことこそ、最大の失敗であるという事実に早く気づくべきだ。",
    "exampleTranslation": "We should quickly realize the fact that fearing failure and taking no action is itself the greatest failure.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0292"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1342
  },
  {
    "category": "sentence",
    "front": "彼らの主張は耳障りこそ良いが、現実の厳しさを完全に無視した机上の空論にほかならない。",
    "back": "Their arguments may sound pleasing to the ear, but they are nothing but armchair theories that completely ignore the harshness of reality.",
    "exampleJp": "彼らの主張は耳障りこそ良いが、現実の厳しさを完全に無視した机上の空論にほかならない。",
    "exampleTranslation": "Their arguments may sound pleasing to the ear, but they are nothing but armchair theories that completely ignore the harshness of reality.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0293"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1343
  },
  {
    "category": "sentence",
    "front": "過去の成功体験に固執するあまり、市場の変化を見誤り経営危機に陥る企業は後を絶たない。",
    "back": "There is no end to the number of companies that, clinging too much to past success stories, misjudge market changes and fall into management crises.",
    "exampleJp": "過去の成功体験に固執するあまり、市場の変化を見誤り経営危機に陥る企業は後を絶たない。",
    "exampleTranslation": "There is no end to the number of companies that, clinging too much to past success stories, misjudge market changes and fall into management crises.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0294"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1344
  },
  {
    "category": "sentence",
    "front": "法律で厳しく取り締まれば犯罪が減ると考えるのは、人間の本質を見誤った浅はかな考えと言わざるを得ない。",
    "back": "To think that crime will decrease if strictly cracked down on by law must be called a shallow thought that misreads the essence of human nature.",
    "exampleJp": "法律で厳しく取り締まれば犯罪が減ると考えるのは、人間の本質を見誤った浅はかな考えと言わざるを得ない。",
    "exampleTranslation": "To think that crime will decrease if strictly cracked down on by law must be called a shallow thought that misreads the essence of human nature.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0295"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1345
  },
  {
    "category": "sentence",
    "front": "目先の利益にとらわれて将来の投資を怠れば、いずれ激しい国際競争から脱落することは火を見るより明らかだ。",
    "back": "If one is caught up in immediate profits and neglects future investments, it is as clear as day that one will eventually drop out of fierce international competition.",
    "exampleJp": "目先の利益にとらわれて将来の投資を怠れば、いずれ激しい国際競争から脱落することは火を見るより明らかだ。",
    "exampleTranslation": "If one is caught up in immediate profits and neglects future investments, it is as clear as day that one will eventually drop out of fierce international competition.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0296"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1346
  },
  {
    "category": "sentence",
    "front": "一部の熱狂的な支持者に支えられているだけで、国民の大半はその政策に対して冷ややかな視線を送っている。",
    "back": "It is only supported by a few enthusiastic followers, and the vast majority of the public is casting a cold eye toward that policy.",
    "exampleJp": "一部の熱狂的な支持者に支えられているだけで、国民の大半はその政策に対して冷ややかな視線を送っている。",
    "exampleTranslation": "It is only supported by a few enthusiastic followers, and the vast majority of the public is casting a cold eye toward that policy.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0297"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1347
  },
  {
    "category": "sentence",
    "front": "歴史の教訓に学ばず、同じ過ちを繰り返そうとする愚行に対しては、断固として抗議の声を上げなければならない。",
    "back": "We must resolutely raise a voice of protest against the foolish act of trying to repeat the same mistakes without learning from the lessons of history.",
    "exampleJp": "歴史の教訓に学ばず、同じ過ちを繰り返そうとする愚行に対しては、断固として抗議の声を上げなければならない。",
    "exampleTranslation": "We must resolutely raise a voice of protest against the foolish act of trying to repeat the same mistakes without learning from the lessons of history.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0298"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1348
  },
  {
    "category": "sentence",
    "front": "どれほど優れた制度であっても、それを運用する人間のモラルが欠如していれば、到底機能するはずがない。",
    "back": "No matter how excellent a system is, if the people operating it lack morals, there is no way it can possibly function.",
    "exampleJp": "どれほど優れた制度であっても、それを運用する人間のモラルが欠如していれば、到底機能するはずがない。",
    "exampleTranslation": "No matter how excellent a system is, if the people operating it lack morals, there is no way it can possibly function.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0299"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1349
  },
  {
    "category": "sentence",
    "front": "表面的な問題解決でお茶を濁すのではなく、事態の根底にある構造的な要因にメスを入れる必要がある。",
    "back": "Rather than evading the issue with superficial problem-solving, it is necessary to probe deeply into the structural factors at the root of the situation.",
    "exampleJp": "表面的な問題解決でお茶を濁すのではなく、事態の根底にある構造的な要因にメスを入れる必要がある。",
    "exampleTranslation": "Rather than evading the issue with superficial problem-solving, it is necessary to probe deeply into the structural factors at the root of the situation.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0300"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1350
  },
  {
    "category": "sentence",
    "front": "あの政治家は口が達者である一方で、実際の行動が伴っていないため、有権者の信頼を得るには至っていない。",
    "back": "While that politician is a smooth talker, his actual actions do not match, so he has not managed to gain the trust of the voters.",
    "exampleJp": "あの政治家は口が達者である一方で、実際の行動が伴っていないため、有権者の信頼を得るには至っていない。",
    "exampleTranslation": "While that politician is a smooth talker, his actual actions do not match, so he has not managed to gain the trust of the voters.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0301"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1351
  },
  {
    "category": "sentence",
    "front": "どんなに困難な状況に陥ろうとも、決して諦めずに活路を見出そうとするのが彼の最大の強みである。",
    "back": "No matter how difficult a situation he falls into, his greatest strength is that he never gives up and tries to find a way out.",
    "exampleJp": "どんなに困難な状況に陥ろうとも、決して諦めずに活路を見出そうとするのが彼の最大の強みである。",
    "exampleTranslation": "No matter how difficult a situation he falls into, his greatest strength is that he never gives up and tries to find a way out.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0302"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1352
  },
  {
    "category": "sentence",
    "front": "新薬の開発は難航を極めたが、研究チームの執念とも言える努力によって、ついに実用化のめどが立った。",
    "back": "The development of the new drug faced extreme difficulties, but thanks to the research team's efforts, which could be called an obsession, they finally saw the prospect of practical application.",
    "exampleJp": "新薬の開発は難航を極めたが、研究チームの執念とも言える努力によって、ついに実用化のめどが立った。",
    "exampleTranslation": "The development of the new drug faced extreme difficulties, but thanks to the research team's efforts, which could be called an obsession, they finally saw the prospect of practical application.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0303"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1353
  },
  {
    "category": "sentence",
    "front": "情報が瞬時に世界中を駆け巡る時代にあって、なおも閉鎖的な組織風土を維持しようというのは時代錯誤も甚だしい。",
    "back": "In an era where information travels around the world instantly, trying to maintain a closed organizational culture is extremely anachronistic.",
    "exampleJp": "情報が瞬時に世界中を駆け巡る時代にあって、なおも閉鎖的な組織風土を維持しようというのは時代錯誤も甚だしい。",
    "exampleTranslation": "In an era where information travels around the world instantly, trying to maintain a closed organizational culture is extremely anachronistic.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0304"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1354
  },
  {
    "category": "sentence",
    "front": "このプロジェクトは莫大な予算を注ぎ込んだにもかかわらず、期待されたほどの成果を上げるには至らなかった。",
    "back": "Despite pouring a massive budget into this project, it did not manage to achieve the results that were expected.",
    "exampleJp": "このプロジェクトは莫大な予算を注ぎ込んだにもかかわらず、期待されたほどの成果を上げるには至らなかった。",
    "exampleTranslation": "Despite pouring a massive budget into this project, it did not manage to achieve the results that were expected.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0305"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1355
  },
  {
    "category": "sentence",
    "front": "経験豊富な彼にしてこの程度のミスを犯すとは、よほどプレッシャーがかかっていたに違いない。",
    "back": "For someone as experienced as him to make a mistake of this level, he must have been under an immense amount of pressure.",
    "exampleJp": "経験豊富な彼にしてこの程度のミスを犯すとは、よほどプレッシャーがかかっていたに違いない。",
    "exampleTranslation": "For someone as experienced as him to make a mistake of this level, he must have been under an immense amount of pressure.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0306"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1356
  },
  {
    "category": "sentence",
    "front": "事態がここまで悪化する前に、なんらかの策を講じるべきであったと後悔しても、今さらどうにもならない。",
    "back": "Even if we regret that we should have taken some kind of measure before the situation deteriorated to this point, there is nothing that can be done about it now.",
    "exampleJp": "事態がここまで悪化する前に、なんらかの策を講じるべきであったと後悔しても、今さらどうにもならない。",
    "exampleTranslation": "Even if we regret that we should have taken some kind of measure before the situation deteriorated to this point, there is nothing that can be done about it now.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0307"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1357
  },
  {
    "category": "sentence",
    "front": "厳しいノルマを課せられたがゆえに、不正行為に手を染めてしまう社員が出たことは想像に難くない。",
    "back": "It is not hard to imagine that employees ended up engaging in fraudulent acts precisely because they were subjected to strict quotas.",
    "exampleJp": "厳しいノルマを課せられたがゆえに、不正行為に手を染めてしまう社員が出たことは想像に難くない。",
    "exampleTranslation": "It is not hard to imagine that employees ended up engaging in fraudulent acts precisely because they were subjected to strict quotas.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0308"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1358
  },
  {
    "category": "sentence",
    "front": "経済効果を期待する声がある反面、自然破壊を懸念する地元住民の反対も根強く、計画は難航している。",
    "back": "While there are voices expecting economic effects, opposition from local residents concerned about environmental destruction is also deeply rooted, and the plan is facing rough going.",
    "exampleJp": "経済効果を期待する声がある反面、自然破壊を懸念する地元住民の反対も根強く、計画は難航している。",
    "exampleTranslation": "While there are voices expecting economic effects, opposition from local residents concerned about environmental destruction is also deeply rooted, and the plan is facing rough going.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0309"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1359
  },
  {
    "category": "sentence",
    "front": "一国の首相たるもの、いかなる緊急事態においても冷静な判断力を失ってはならない。",
    "back": "Someone in the position of the prime minister of a country must not lose cool-headed judgment in any emergency situation.",
    "exampleJp": "一国の首相たるもの、いかなる緊急事態においても冷静な判断力を失ってはならない。",
    "exampleTranslation": "Someone in the position of the prime minister of a country must not lose cool-headed judgment in any emergency situation.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0310"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1360
  },
  {
    "category": "sentence",
    "front": "このまま少子化が進めば、年金制度の崩壊は免れず、若者世代にさらなる負担を強いることになりかねない。",
    "back": "If the declining birthrate progresses at this rate, the collapse of the pension system will be inevitable, and it could end up forcing an even greater burden on the younger generation.",
    "exampleJp": "このまま少子化が進めば、年金制度の崩壊は免れず、若者世代にさらなる負担を強いることになりかねない。",
    "exampleTranslation": "If the declining birthrate progresses at this rate, the collapse of the pension system will be inevitable, and it could end up forcing an even greater burden on the younger generation.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0311"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1361
  },
  {
    "category": "sentence",
    "front": "最新鋭の設備を導入したからといって、たちまち生産性が向上するほど甘いものではない。",
    "back": "Just because state-of-the-art equipment has been introduced, it is not so naive a matter that productivity will immediately improve.",
    "exampleJp": "最新鋭の設備を導入したからといって、たちまち生産性が向上するほど甘いものではない。",
    "exampleTranslation": "Just because state-of-the-art equipment has been introduced, it is not so naive a matter that productivity will immediately improve.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0312"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1362
  },
  {
    "category": "sentence",
    "front": "人生の岐路に立たされた時、損得勘定抜きにして、自分が本当にやりたい道を選ぶ勇気を持ちたいものだ。",
    "back": "When standing at a crossroads in life, one wishes to have the courage to put aside calculations of profit and loss and choose the path they truly want to take.",
    "exampleJp": "人生の岐路に立たされた時、損得勘定抜きにして、自分が本当にやりたい道を選ぶ勇気を持ちたいものだ。",
    "exampleTranslation": "When standing at a crossroads in life, one wishes to have the courage to put aside calculations of profit and loss and choose the path they truly want to take.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0313"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1363
  },
  {
    "category": "sentence",
    "front": "他人の評価ばかりを気にして生きるのは、結局のところ他人の人生を生きているのと同じことではないか。",
    "back": "Isn't living while only worrying about the evaluations of others ultimately the same as living someone else's life?",
    "exampleJp": "他人の評価ばかりを気にして生きるのは、結局のところ他人の人生を生きているのと同じことではないか。",
    "exampleTranslation": "Isn't living while only worrying about the evaluations of others ultimately the same as living someone else's life?",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0314"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1364
  },
  {
    "category": "sentence",
    "front": "失敗を他人のせいにしているうちは、自分自身の成長など到底望むべくもない。",
    "back": "As long as one blames their failures on others, there is absolutely no hope of expecting one's own personal growth.",
    "exampleJp": "失敗を他人のせいにしているうちは、自分自身の成長など到底望むべくもない。",
    "exampleTranslation": "As long as one blames their failures on others, there is absolutely no hope of expecting one's own personal growth.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0315"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1365
  },
  {
    "category": "sentence",
    "front": "たとえ周囲から無謀だと嘲笑されようとも、自らの信念を曲げずに突き進む彼の姿勢には心打たれる。",
    "back": "I am deeply moved by his attitude of pushing forward without bending his own convictions, even if he is ridiculed as reckless by those around him.",
    "exampleJp": "たとえ周囲から無謀だと嘲笑されようとも、自らの信念を曲げずに突き進む彼の姿勢には心打たれる。",
    "exampleTranslation": "I am deeply moved by his attitude of pushing forward without bending his own convictions, even if he is ridiculed as reckless by those around him.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0316"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1366
  },
  {
    "category": "sentence",
    "front": "若いうちに苦労を買ってでもせよとはよく言ったもので、その経験は必ず後の人生における大きな財産となる。",
    "back": "It is well said that one should seek out hardship while young, for that experience will definitely become a great asset in later life.",
    "exampleJp": "若いうちに苦労を買ってでもせよとはよく言ったもので、その経験は必ず後の人生における大きな財産となる。",
    "exampleTranslation": "It is well said that one should seek out hardship while young, for that experience will definitely become a great asset in later life.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0317"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1367
  },
  {
    "category": "sentence",
    "front": "地位や名誉を手に入れたからといって、必ずしも幸福な人生が約束されるわけではないという現実を直視すべきだ。",
    "back": "One must face the reality that obtaining status and honor does not necessarily promise a happy life.",
    "exampleJp": "地位や名誉を手に入れたからといって、必ずしも幸福な人生が約束されるわけではないという現実を直視すべきだ。",
    "exampleTranslation": "One must face the reality that obtaining status and honor does not necessarily promise a happy life.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0318"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1368
  },
  {
    "category": "sentence",
    "front": "目まぐるしく変化する現代において、生涯学び続ける姿勢こそが自己防衛の最大の武器となる。",
    "back": "In an era that changes dizzyingly, the attitude of continuing to learn throughout one's life serves as the greatest weapon of self-defense.",
    "exampleJp": "目まぐるしく変化する現代において、生涯学び続ける姿勢こそが自己防衛の最大の武器となる。",
    "exampleTranslation": "In an era that changes dizzyingly, the attitude of continuing to learn throughout one's life serves as the greatest weapon of self-defense.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0319"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1369
  },
  {
    "category": "sentence",
    "front": "親の期待に応えようと必死になるあまり、いつの間にか自分自身の本当の目標を見失ってしまっていた。",
    "back": "In my desperation to meet my parents' expectations, I had lost sight of my own true goals before I knew it.",
    "exampleJp": "親の期待に応えようと必死になるあまり、いつの間にか自分自身の本当の目標を見失ってしまっていた。",
    "exampleTranslation": "In my desperation to meet my parents' expectations, I had lost sight of my own true goals before I knew it.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0320"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1370
  },
  {
    "category": "sentence",
    "front": "安易な妥協は一時的な安息をもたらすかもしれないが、長期的には深い後悔と自己嫌悪を招くことが多い。",
    "back": "Easy compromises may bring temporary peace, but in the long run, they often invite deep regret and self-loathing.",
    "exampleJp": "安易な妥協は一時的な安息をもたらすかもしれないが、長期的には深い後悔と自己嫌悪を招くことが多い。",
    "exampleTranslation": "Easy compromises may bring temporary peace, but in the long run, they often invite deep regret and self-loathing.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0321"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1371
  },
  {
    "category": "sentence",
    "front": "他者との比較に一喜一憂するのではなく、昨日の自分よりも一歩でも前進できたかを評価基準にしたい。",
    "back": "Rather than alternating between joy and sorrow by comparing myself to others, I want to make the evaluation standard whether I have advanced even one step compared to my past self.",
    "exampleJp": "他者との比較に一喜一憂するのではなく、昨日の自分よりも一歩でも前進できたかを評価基準にしたい。",
    "exampleTranslation": "Rather than alternating between joy and sorrow by comparing myself to others, I want to make the evaluation standard whether I have advanced even one step compared to my past self.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0322"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1372
  },
  {
    "category": "sentence",
    "front": "情報が氾濫する社会だからこそ、他人の意見に流されず、自分の頭で物事の本質を判断する力が求められる。",
    "back": "Precisely because it is a society overflowing with information, the ability to judge the essence of things with one's own mind, without being swayed by the opinions of others, is required.",
    "exampleJp": "情報が氾濫する社会だからこそ、他人の意見に流されず、自分の頭で物事の本質を判断する力が求められる。",
    "exampleTranslation": "Precisely because it is a society overflowing with information, the ability to judge the essence of things with one's own mind, without being swayed by the opinions of others, is required.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0323"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1373
  },
  {
    "category": "sentence",
    "front": "どれほど地位が高くなろうとも、周囲への感謝と謙虚さを忘れた人間は、いずれ足元をすくわれる運命にある。",
    "back": "No matter how high one's status becomes, a person who forgets gratitude and humility toward those around them is destined to eventually have the rug pulled out from under them.",
    "exampleJp": "どれほど地位が高くなろうとも、周囲への感謝と謙虚さを忘れた人間は、いずれ足元をすくわれる運命にある。",
    "exampleTranslation": "No matter how high one's status becomes, a person who forgets gratitude and humility toward those around them is destined to eventually have the rug pulled out from under them.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0324"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1374
  },
  {
    "category": "sentence",
    "front": "グローバル化が進む中、単に語学力を身につけるだけでなく、異文化を深く理解し受容する姿勢が教育現場に求められている。",
    "back": "As globalization progresses, educational settings are required not merely to impart language skills, but to foster an attitude of deeply understanding and accepting different cultures.",
    "exampleJp": "グローバル化が進む中、単に語学力を身につけるだけでなく、異文化を深く理解し受容する姿勢が教育現場に求められている。",
    "exampleTranslation": "As globalization progresses, educational settings are required not merely to impart language skills, but to foster an attitude of deeply understanding and accepting different cultures.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0325"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1375
  },
  {
    "category": "sentence",
    "front": "詰め込み型の暗記教育から脱却し、生徒自らが課題を見つけ解決策を探る探究学習への移行が急務とされている。",
    "back": "Breaking away from cramming-based rote education, a transition toward inquiry-based learning where students themselves find issues and seek solutions is considered an urgent task.",
    "exampleJp": "詰め込み型の暗記教育から脱却し、生徒自らが課題を見つけ解決策を探る探究学習への移行が急務とされている。",
    "exampleTranslation": "Breaking away from cramming-based rote education, a transition toward inquiry-based learning where students themselves find issues and seek solutions is considered an urgent task.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0326"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1376
  },
  {
    "category": "sentence",
    "front": "スマートフォンの普及は若者の活字離れに拍車をかけ、深く思考する力の低下を招いているとの指摘も少なくない。",
    "back": "There are quite a few pointing out that the spread of smartphones has accelerated young people's alienation from printed texts, leading to a decline in their ability to think deeply.",
    "exampleJp": "スマートフォンの普及は若者の活字離れに拍車をかけ、深く思考する力の低下を招いているとの指摘も少なくない。",
    "exampleTranslation": "There are quite a few pointing out that the spread of smartphones has accelerated young people's alienation from printed texts, leading to a decline in their ability to think deeply.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0327"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1377
  },
  {
    "category": "sentence",
    "front": "伝統芸能の継承者が減少の一途をたどる背景には、単なる後継者不足だけでなく、現代の生活様式との乖離がある。",
    "back": "Behind the steady decline in inheritors of traditional performing arts lies not merely a lack of successors, but a divergence from modern lifestyles.",
    "exampleJp": "伝統芸能の継承者が減少の一途をたどる背景には、単なる後継者不足だけでなく、現代の生活様式との乖離がある。",
    "exampleTranslation": "Behind the steady decline in inheritors of traditional performing arts lies not merely a lack of successors, but a divergence from modern lifestyles.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0328"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1378
  },
  {
    "category": "sentence",
    "front": "地方の過疎化が進むにつれ、地域特有の祭礼や風習が次々と姿を消していくのは誠に忍びない。",
    "back": "As depopulation in rural areas progresses, it is truly unbearable to see region-specific festivals and customs disappearing one after another.",
    "exampleJp": "地方の過疎化が進むにつれ、地域特有の祭礼や風習が次々と姿を消していくのは誠に忍びない。",
    "exampleTranslation": "As depopulation in rural areas progresses, it is truly unbearable to see region-specific festivals and customs disappearing one after another.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0329"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1379
  },
  {
    "category": "sentence",
    "front": "多文化共生社会を実現するには、外国人住民を単なる労働力としてではなく、同じ地域社会の構成員として迎え入れる必要がある。",
    "back": "To realize a multicultural cohesive society, it is necessary to welcome foreign residents not merely as a labor force, but as members of the same local community.",
    "exampleJp": "多文化共生社会を実現するには、外国人住民を単なる労働力としてではなく、同じ地域社会の構成員として迎え入れる必要がある。",
    "exampleTranslation": "To realize a multicultural cohesive society, it is necessary to welcome foreign residents not merely as a labor force, but as members of the same local community.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0330"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1380
  },
  {
    "category": "sentence",
    "front": "歴史認識を巡る隣国との摩擦は、政治的な対立を超えて、両国民の感情的なしこりとして根深く残っている。",
    "back": "Friction with neighboring countries over historical recognition goes beyond political conflict and remains deeply rooted as an emotional grievance between the citizens of both nations.",
    "exampleJp": "歴史認識を巡る隣国との摩擦は、政治的な対立を超えて、両国民の感情的なしこりとして根深く残っている。",
    "exampleTranslation": "Friction with neighboring countries over historical recognition goes beyond political conflict and remains deeply rooted as an emotional grievance between the citizens of both nations.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0331"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1381
  },
  {
    "category": "sentence",
    "front": "大学教育の質が問われる昨今、実社会で即戦力となるスキルの習得と、幅広い教養の育成という二つの使命の狭間で揺れている。",
    "back": "These days, as the quality of university education is questioned, institutions are swaying between the two missions of acquiring skills that are immediately useful in the real world and fostering broad liberal arts knowledge.",
    "exampleJp": "大学教育の質が問われる昨今、実社会で即戦力となるスキルの習得と、幅広い教養の育成という二つの使命の狭間で揺れている。",
    "exampleTranslation": "These days, as the quality of university education is questioned, institutions are swaying between the two missions of acquiring skills that are immediately useful in the real world and fostering broad liberal arts knowledge.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0332"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1382
  },
  {
    "category": "sentence",
    "front": "ジェンダー平等の理念は浸透しつつあるものの、無意識の偏見に根ざした性別役割分業の意識は依然として根強い。",
    "back": "Although the ideal of gender equality is permeating, the consciousness of gender-role division rooted in unconscious bias remains persistent.",
    "exampleJp": "ジェンダー平等の理念は浸透しつつあるものの、無意識の偏見に根ざした性別役割分業の意識は依然として根強い。",
    "exampleTranslation": "Although the ideal of gender equality is permeating, the consciousness of gender-role division rooted in unconscious bias remains persistent.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0333"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1383
  },
  {
    "category": "sentence",
    "front": "古典文学を現代の価値観のみで裁くのではなく、その時代の歴史的背景を踏まえた上で解釈することが重要である。",
    "back": "It is important not to judge classical literature solely by modern values, but to interpret it having taken into account the historical background of that era.",
    "exampleJp": "古典文学を現代の価値観のみで裁くのではなく、その時代の歴史的背景を踏まえた上で解釈することが重要である。",
    "exampleTranslation": "It is important not to judge classical literature solely by modern values, but to interpret it having taken into account the historical background of that era.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0334"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1384
  },
  {
    "category": "sentence",
    "front": "科学技術がどれほど進歩しようとも、芸術が人々の心に与える感動や癒やしを代替することは決してできない。",
    "back": "No matter how much science and technology advance, they can never replace the emotion and healing that art imparts to people's hearts.",
    "exampleJp": "科学技術がどれほど進歩しようとも、芸術が人々の心に与える感動や癒やしを代替することは決してできない。",
    "exampleTranslation": "No matter how much science and technology advance, they can never replace the emotion and healing that art imparts to people's hearts.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0335"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1385
  },
  {
    "category": "sentence",
    "front": "地域の歴史的建造物を単に保存するだけでなく、現代のニーズに合わせて活用していくことで、街に新たな活気をもたらすことができる。",
    "back": "By not simply preserving local historical buildings but utilizing them to meet modern needs, we can bring new vitality to the town.",
    "exampleJp": "地域の歴史的建造物を単に保存するだけでなく、現代のニーズに合わせて活用していくことで、街に新たな活気をもたらすことができる。",
    "exampleTranslation": "By not simply preserving local historical buildings but utilizing them to meet modern needs, we can bring new vitality to the town.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0336"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1386
  },
  {
    "category": "sentence",
    "front": "少子高齢化を背景に、単に寿命を延ばすだけでなく、健康で自立した生活を送れる「健康寿命」の延伸が国家的課題となっている。",
    "back": "Against the backdrop of a declining birthrate and aging population, extending not merely life expectancy but 'healthy life expectancy'—the period one can live a healthy and independent life—has become a national challenge.",
    "exampleJp": "少子高齢化を背景に、単に寿命を延ばすだけでなく、健康で自立した生活を送れる「健康寿命」の延伸が国家的課題となっている。",
    "exampleTranslation": "Against the backdrop of a declining birthrate and aging population, extending not merely life expectancy but 'healthy life expectancy'—the period one can live a healthy and independent life—has become a national challenge.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0337"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1387
  },
  {
    "category": "sentence",
    "front": "医療技術の高度化に伴い、終末期医療のあり方や尊厳死について、社会全体で議論を深めるべき時期に来ている。",
    "back": "With the advancement of medical technology, the time has come for society as a whole to deepen the discussion regarding the nature of terminal care and death with dignity.",
    "exampleJp": "医療技術の高度化に伴い、終末期医療のあり方や尊厳死について、社会全体で議論を深めるべき時期に来ている。",
    "exampleTranslation": "With the advancement of medical technology, the time has come for society as a whole to deepen the discussion regarding the nature of terminal care and death with dignity.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0338"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1388
  },
  {
    "category": "sentence",
    "front": "ストレス社会と言われる現代、身体的な健康だけでなく、メンタルヘルスのケアを予防的観点から行うことが重要視されている。",
    "back": "In today's so-called stressful society, great importance is placed on providing not only physical health care but also mental health care from a preventative standpoint.",
    "exampleJp": "ストレス社会と言われる現代、身体的な健康だけでなく、メンタルヘルスのケアを予防的観点から行うことが重要視されている。",
    "exampleTranslation": "In today's so-called stressful society, great importance is placed on providing not only physical health care but also mental health care from a preventative standpoint.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0339"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1389
  },
  {
    "category": "sentence",
    "front": "パンデミックの経験を通して、我々は当たり前だと思っていた日常がいかに脆い基盤の上に成り立っていたかを痛感させられた。",
    "back": "Through the experience of the pandemic, we were made to keenly realize just how fragile a foundation the daily life we took for granted was built upon.",
    "exampleJp": "パンデミックの経験を通して、我々は当たり前だと思っていた日常がいかに脆い基盤の上に成り立っていたかを痛感させられた。",
    "exampleTranslation": "Through the experience of the pandemic, we were made to keenly realize just how fragile a foundation the daily life we took for granted was built upon.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0340"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1390
  },
  {
    "category": "sentence",
    "front": "健康志向の高まりからオーガニック食品の需要が拡大しているが、高価格帯であるため一部の消費者層に限られているのが現状だ。",
    "back": "Demand for organic food is expanding due to rising health consciousness, but the current reality is that it is limited to a certain consumer segment due to its high price range.",
    "exampleJp": "健康志向の高まりからオーガニック食品の需要が拡大しているが、高価格帯であるため一部の消費者層に限られているのが現状だ。",
    "exampleTranslation": "Demand for organic food is expanding due to rising health consciousness, but the current reality is that it is limited to a certain consumer segment due to its high price range.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0341"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1391
  },
  {
    "category": "sentence",
    "front": "基礎研究への投資を怠れば、短期的には影響が見えなくとも、10年後、20年後の我が国の科学技術力は確実に衰退する。",
    "back": "If investment in basic research is neglected, even if the impact is not visible in the short term, our country's scientific and technological prowess will definitely decline in 10 or 20 years.",
    "exampleJp": "基礎研究への投資を怠れば、短期的には影響が見えなくとも、10年後、20年後の我が国の科学技術力は確実に衰退する。",
    "exampleTranslation": "If investment in basic research is neglected, even if the impact is not visible in the short term, our country's scientific and technological prowess will definitely decline in 10 or 20 years.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0342"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1392
  },
  {
    "category": "sentence",
    "front": "食品ロス問題の解決には、消費者の意識改革のみならず、生産から流通に至るサプライチェーン全体の構造的な見直しが不可欠である。",
    "back": "To solve the food waste problem, not only a change in consumer awareness but also a structural review of the entire supply chain from production to distribution is essential.",
    "exampleJp": "食品ロス問題の解決には、消費者の意識改革のみならず、生産から流通に至るサプライチェーン全体の構造的な見直しが不可欠である。",
    "exampleTranslation": "To solve the food waste problem, not only a change in consumer awareness but also a structural review of the entire supply chain from production to distribution is essential.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0343"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1393
  },
  {
    "category": "sentence",
    "front": "異常な猛暑が続く中、熱中症対策はもはや個人の心がけの問題ではなく、社会インフラの整備を含めた総合的な対策が急務だ。",
    "back": "As abnormal heat waves continue, countermeasures against heatstroke are no longer a matter of individual mindfulness, but comprehensive measures including the development of social infrastructure are urgently needed.",
    "exampleJp": "異常な猛暑が続く中、熱中症対策はもはや個人の心がけの問題ではなく、社会インフラの整備を含めた総合的な対策が急務だ。",
    "exampleTranslation": "As abnormal heat waves continue, countermeasures against heatstroke are no longer a matter of individual mindfulness, but comprehensive measures including the development of social infrastructure are urgently needed.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0344"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1394
  },
  {
    "category": "sentence",
    "front": "再生医療の実用化は多くの難病患者に希望の光を与えている一方で、莫大な治療費という新たな課題を浮き彫りにしている。",
    "back": "While the practical application of regenerative medicine is giving a ray of hope to many patients with intractable diseases, it is also highlighting the new challenge of massive treatment costs.",
    "exampleJp": "再生医療の実用化は多くの難病患者に希望の光を与えている一方で、莫大な治療費という新たな課題を浮き彫りにしている。",
    "exampleTranslation": "While the practical application of regenerative medicine is giving a ray of hope to many patients with intractable diseases, it is also highlighting the new challenge of massive treatment costs.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0345"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1395
  },
  {
    "category": "sentence",
    "front": "生活習慣病の予防には、若年層からの継続的な啓発活動が欠かせないという認識が医療関係者の間で共有されている。",
    "back": "The recognition that continuous awareness-raising activities from a young age are indispensable for the prevention of lifestyle diseases is shared among medical professionals.",
    "exampleJp": "生活習慣病の予防には、若年層からの継続的な啓発活動が欠かせないという認識が医療関係者の間で共有されている。",
    "exampleTranslation": "The recognition that continuous awareness-raising activities from a young age are indispensable for the prevention of lifestyle diseases is shared among medical professionals.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0346"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1396
  },
  {
    "category": "sentence",
    "front": "自然災害に備えるための備蓄は、定期的に見直しを行い、常に賞味期限や使用期限を確認しておくことが肝要である。",
    "back": "Regarding stockpiling to prepare for natural disasters, it is vital to conduct regular reviews and constantly check expiration dates and use-by dates.",
    "exampleJp": "自然災害に備えるための備蓄は、定期的に見直しを行い、常に賞味期限や使用期限を確認しておくことが肝要である。",
    "exampleTranslation": "Regarding stockpiling to prepare for natural disasters, it is vital to conduct regular reviews and constantly check expiration dates and use-by dates.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0347"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1397
  },
  {
    "category": "sentence",
    "front": "宇宙の起源に迫る新たな観測データの発見により、これまでの物理学の常識が根本から覆される可能性が示唆されている。",
    "back": "With the discovery of new observational data approaching the origin of the universe, it is suggested that the common sense of physics up to now may be overturned from the ground up.",
    "exampleJp": "宇宙の起源に迫る新たな観測データの発見により、これまでの物理学の常識が根本から覆される可能性が示唆されている。",
    "exampleTranslation": "With the discovery of new observational data approaching the origin of the universe, it is suggested that the common sense of physics up to now may be overturned from the ground up.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0348"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1398
  },
  {
    "category": "sentence",
    "front": "平素は格別のお引き立てを賜り、厚く御礼申し上げます。",
    "back": "We would like to express our deepest gratitude for your exceptional patronage on a regular basis.",
    "exampleJp": "平素は格別のお引き立てを賜り、厚く御礼申し上げます。",
    "exampleTranslation": "We would like to express our deepest gratitude for your exceptional patronage on a regular basis.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0349"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1399
  },
  {
    "category": "sentence",
    "front": "本件につきましては、社内で慎重に検討を重ねました結果、誠に遺憾ながら貴意に添いかねるという結論に至りました。",
    "back": "Regarding this matter, as a result of careful and repeated consideration internally, we have reached the conclusion that, much to our regret, we are unable to meet your wishes.",
    "exampleJp": "本件につきましては、社内で慎重に検討を重ねました結果、誠に遺憾ながら貴意に添いかねるという結論に至りました。",
    "exampleTranslation": "Regarding this matter, as a result of careful and repeated consideration internally, we have reached the conclusion that, much to our regret, we are unable to meet your wishes.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0350"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1400
  },
  {
    "category": "sentence",
    "front": "次回の企画会議におきましては、各部署から提出された改善案を土台として、より具体的な施策を策定する所存です。",
    "back": "At the next planning meeting, we intend to formulate more specific measures based on the improvement proposals submitted by each department.",
    "exampleJp": "次回の企画会議におきましては、各部署から提出された改善案を土台として、より具体的な施策を策定する所存です。",
    "exampleTranslation": "At the next planning meeting, we intend to formulate more specific measures based on the improvement proposals submitted by each department.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0351"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1401
  },
  {
    "category": "sentence",
    "front": "度重なる納期の遅れにより多大なご迷惑をおかけしましたこと、深くお詫び申し上げます。",
    "back": "We offer our deepest apologies for having caused you immense trouble due to the repeated delays in delivery.",
    "exampleJp": "度重なる納期の遅れにより多大なご迷惑をおかけしましたこと、深くお詫び申し上げます。",
    "exampleTranslation": "We offer our deepest apologies for having caused you immense trouble due to the repeated delays in delivery.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0352"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1402
  },
  {
    "category": "sentence",
    "front": "新規事業の立ち上げに際しましては、皆様の絶大なるご支援とご協力を賜りますようお願い申し上げます。",
    "back": "On the occasion of launching the new business, we humbly ask for your immense support and cooperation.",
    "exampleJp": "新規事業の立ち上げに際しましては、皆様の絶大なるご支援とご協力を賜りますようお願い申し上げます。",
    "exampleTranslation": "On the occasion of launching the new business, we humbly ask for your immense support and cooperation.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0353"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1403
  },
  {
    "category": "sentence",
    "front": "ご多忙の折に恐縮ですが、同封いたしました書類にご署名・ご捺印の上、期日までにご返送くださいますようお願い申し上げます。",
    "back": "We apologize for troubling you while you are busy, but we request that you sign and seal the enclosed documents and return them by the deadline.",
    "exampleJp": "ご多忙の折に恐縮ですが、同封いたしました書類にご署名・ご捺印の上、期日までにご返送くださいますようお願い申し上げます。",
    "exampleTranslation": "We apologize for troubling you while you are busy, but we request that you sign and seal the enclosed documents and return them by the deadline.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0354"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1404
  },
  {
    "category": "sentence",
    "front": "先日の展示会では、弊社のブースに多数お立ち寄りいただき、誠にありがとうございました。",
    "back": "Thank you very sincerely for stopping by our booth in large numbers at the exhibition the other day.",
    "exampleJp": "先日の展示会では、弊社のブースに多数お立ち寄りいただき、誠にありがとうございました。",
    "exampleTranslation": "Thank you very sincerely for stopping by our booth in large numbers at the exhibition the other day.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0355"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1405
  },
  {
    "category": "sentence",
    "front": "取引先からの厳しい要求にこたえるべく、開発チームは日夜を問わず製品の改良作業に奔走している。",
    "back": "In order to meet the strict demands from our business partners, the development team is hustling day and night to improve the product.",
    "exampleJp": "取引先からの厳しい要求にこたえるべく、開発チームは日夜を問わず製品の改良作業に奔走している。",
    "exampleTranslation": "In order to meet the strict demands from our business partners, the development team is hustling day and night to improve the product.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0356"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1406
  },
  {
    "category": "sentence",
    "front": "市場シェアの奪還を至上命題として、全社を挙げて大規模な販売促進キャンペーンを展開する手はずとなっている。",
    "back": "With recapturing market share as the supreme imperative, arrangements have been made to launch a large-scale sales promotion campaign with the entire company mobilized.",
    "exampleJp": "市場シェアの奪還を至上命題として、全社を挙げて大規模な販売促進キャンペーンを展開する手はずとなっている。",
    "exampleTranslation": "With recapturing market share as the supreme imperative, arrangements have been made to launch a large-scale sales promotion campaign with the entire company mobilized.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0357"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1407
  },
  {
    "category": "sentence",
    "front": "競合他社の動向を注視しつつ、市場のニッチな需要を的確に捉える戦略が功を奏したと言えるでしょう。",
    "back": "It can probably be said that the strategy of accurately capturing niche market demand while closely monitoring the movements of competitors has borne fruit.",
    "exampleJp": "競合他社の動向を注視しつつ、市場のニッチな需要を的確に捉える戦略が功を奏したと言えるでしょう。",
    "exampleTranslation": "It can probably be said that the strategy of accurately capturing niche market demand while closely monitoring the movements of competitors has borne fruit.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0358"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1408
  },
  {
    "category": "sentence",
    "front": "クレーム対応においては、事実関係を速やかに確認し、誠意をもって顧客に説明することが何よりも肝要である。",
    "back": "In handling complaints, promptly confirming the facts and explaining them to the customer with sincerity is more vital than anything else.",
    "exampleJp": "クレーム対応においては、事実関係を速やかに確認し、誠意をもって顧客に説明することが何よりも肝要である。",
    "exampleTranslation": "In handling complaints, promptly confirming the facts and explaining them to the customer with sincerity is more vital than anything else.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0359"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1409
  },
  {
    "category": "sentence",
    "front": "今回の不祥事を受け、経営陣は責任を明確にするとともに、再発防止に向けた社内体制の抜本的な見直しを表明した。",
    "back": "In response to the recent scandal, the management clarified their responsibility and announced a drastic overhaul of the internal structure aimed at preventing a recurrence.",
    "exampleJp": "今回の不祥事を受け、経営陣は責任を明確にするとともに、再発防止に向けた社内体制の抜本的な見直しを表明した。",
    "exampleTranslation": "In response to the recent scandal, the management clarified their responsibility and announced a drastic overhaul of the internal structure aimed at preventing a recurrence.",
    "tags": [
      "n1",
      "sentence",
      "reading"
    ],
    "sourceIds": [
      "n1-sentence-0360"
    ],
    "sourceFiles": [
      "sources/cards.js"
    ],
    "originalOrder": 1410
  }
];

const SOURCE_COUNTS = {
  "vocabulary": 698,
  "kanji": 216,
  "grammar": 136,
  "sentence": 360
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
    fixedCount: 0,
  lowerLevelOverlaps: { counts: {}, items: [] },
  riskKanji: []
  };
}

module.exports = {
  ALLOWED_CATEGORIES,
  CATEGORY_ORDER,
  FORBIDDEN_FIELDS,
  getCleanedCardSources,
  getCleanupReport,
};
