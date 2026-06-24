# Stacks

Japonca kanji/kelime öğrenme uygulaması — SRS (Spaced Repetition System) tabanlı.

## Mimari

- **Modüler Vanilla JS:** CSS `src/index.html`'de inline, JS `src/main.js`'de. Supabase, DB ve state katmanları ayrı modüllerde.
- **Vite:** Build aracı ve dev server. `vite-plugin-pwa` ile PWA (manifest + service worker) otomatik üretilir.
- **Electron:** `electron/main.js` masaüstü sarmalayıcısı. Production'da `dist/index.html` yükler.
- **Supabase:** Bulut senkronizasyonu için `supabase-schema.sql` şeması.

## Klasör Yapısı

```
package.json              ← root (vite devDep)
vite.config.js            ← Vite + PWA yapılandırması
src/
  index.html              ← HTML yapısı + inline CSS
  main.js                 ← Orkestrasyon: i18n, sync, state, router, boot
  utils.js                ← Saf yardımcılar (esc, uid, today, tarih, shuffle)
  data/
    kanji_lite.json       ← Offline kanji sözlüğü (onyomi, kunyomi, 4 dilde anlamlar)
  utils/
    kanjiUtils.js         ← Kanji tespit & wrapping (isJapaneseCard, wrapKanji)
    furiganaParser.js     ← Offline morfolojik analiz (kuromoji) → bağlama duyarlı okuma
  core/
    srsEngine.js          ← Saf SRS algoritması (DOM/browser bağımsız)
  components/
    CardView.js           ← Study/review kartları, flip animasyonları, grade
    DeckList.js           ← Deste listesi, kart CRUD, furigana assist
    Analytics.js          ← İstatistikler, streak, takvim
    Settings.js           ← Tema, SRS ayarları, sync UI, export/import
  services/
    supabaseClient.js     ← Supabase bağlantı ayarları + sbFetch
    dbService.js          ← Bulut sorguları (cloudPull/Push, sync)
  store/
    appState.js           ← CONFIG, storage layer, migrations
public/
  icons/                  ← PWA ikonları (Vite tarafından dist/'e kopyalanır)
  dict/                   ← kuromoji IPADIC sözlüğü (*.dat.gz, ~17MB) — offline furigana
dist/                     ← Vite build çıktısı (gitignore)
electron/
  main.js                 ← Electron ana süreç (dev: Vite URL, prod: dist/)
  preload.js
  package.json
  build/                  ← Electron derleme çıktıları / ikonlar
```

## Geliştirme Komutları

- `npm run dev` — Vite dev server (http://localhost:5173)
- `npm run build` — Production build → `dist/`
- `npm run preview` — Build çıktısını önizle
- `npm run electron:dev` — Vite build + Electron başlat (dist/ üzerinden)
- `npm run electron:build` — Vite build + Electron production build (installer)
- `cd electron && npm start` — Electron'u ayrı başlat (önce `npm run build`)

## Kritik Kurallar

### Versiyon Senkronizasyonu
Versiyon numarası 2 yerde tutulur ve ikisi aynı olmalı:
1. `src/main.js` → `const APP_VERSION = '...'`
2. `electron/package.json` → `"version": "..."`

(Service worker artık `vite-plugin-pwa` tarafından otomatik üretiliyor, CACHE_NAME yok.)

**Sessiz Otomatik Güncelleme (NSIS oneClick) Hotfix — v1.2.2:** Windows'ta auto-update sırasında NSIS sihirbazını ("Next > Next") atlamak için sessiz kurulum etkinleştirildi. `electron/package.json` → `build.nsis`: `oneClick: true`, `perMachine: false` (UAC admin promptunu önler), `allowToChangeInstallationDirectory: false`, `runAfterFinish: true`. `electron/main.js` → `update:install` handler'ı `autoUpdater.quitAndInstall(true, true)` (sessiz + otomatik yeniden başlat) kullanır.

### ES Module + onclick Uyumluluğu
`src/main.js` `<script type="module">` ile yüklenir. Inline `onclick` handler'larda kullanılan fonksiyonlar dosyanın sonundaki `Object.assign(window, {...})` bloğu ile global scope'a açılır. Yeni bir fonksiyon `onclick` ile kullanılacaksa bu listeye eklenmeli.

### Bileşen Mimarisi
Her bileşen (`src/components/*.js`) `init(app)` ile paylaşılan context alır ve `app.state`, `app.t()`, `app.icon()` vb. üzerinden erişir. State getter ile canlı kalır — `state` reassign edilse bile bileşenler güncel değeri alır. Çapraz bağımlılıklar (ör. `CardView` → `app.recordReview`) `app` context'ine init sonrası eklenir.

### `t()` Fonksiyonu Koruması
`t()` global çeviri (i18n) fonksiyonudur. **Hiçbir zaman** yerel değişken, parametre veya fonksiyon adı olarak `t` kullanılmamalıdır — çeviri fonksiyonunu gölgeler ve sessizce bozar.

## i18n (Çoklu Dil) Sistemi

- **4 dil:** İngilizce (en), Türkçe (tr), Korece (ko), Moğolca (mn)
- **Varsayılan:** İlk kez giren kullanıcılar İngilizce görür
- **Sözlük:** `const LANG = { en: {...}, tr: {...}, ko: {...}, mn: {...} }` — `CONFIG`'dan önce tanımlı
- **Çeviri fonksiyonu:** `t(key, params)` — interpolasyon destekler: `t('cards_added', {count: 5})`
- **Dil değiştirme:** `setLang(lang)` — localStorage'a kaydeder, tüm UI'ı yeniden render eder
- **Statik HTML:** `data-t="key"` attribute'u ile, `data-pt="key"` placeholder'lar için
- **Yeni string eklerken:** LANG objesinin 4 diline de anahtar eklenmeli
- **Örnek deste:** `EXAMPLE_DECKS` objesi — dil değişince `updateExampleDeck()` ile güncellenir, `isExample: true` flag'i ile tanınır
- **`today()` değişkeni:** `td` olarak kullanılır (`t` ile çakışmaması için)

## Masaüstü Layout

- **Web/PWA:** Her zaman mobil layout — sidebar yok, alt nav bar
- **Electron:** `.is-electron` class'ı body'ye eklenir → `@media (min-width: 768px)` ve `1024px` kuralları sadece Electron'da aktif
- **Tespit:** `window.electronAPI?.isElectron` ile `loadApp()` içinde

## İç İçe Desteler

- Deste objesinde `parentId` alanı (null = üst düzey)
- `getChildDecks()`, `getDescendantDecks()`, `getAllCardsForDeck()` yardımcı fonksiyonlar
- Üst deste çalışılırken tüm alt destelerin kartları karışık gelir (`shuffle()`)
- Silme cascade: üst deste silinince tüm alt desteler de silinir

## Flashcard Önizleme

- Kart ekleme formunda canlı önizleme (`updatePreview()`)
- Ön yüz: sadece kanji yazılırken, arka yüz: furigana/anlam yazılırken flip animasyonuyla
- `position: sticky` ile scroll'da takip eder
- İçerik az olunca (örnek cümle yok) kanji büyük kalır (`fc-preview-sparse`)

## SRS Engine (`src/core/srsEngine.js`)

- **Saf modül:** DOM/browser API bağımlılığı yok, tüm fonksiyonlar `settings` ve `now` parametresi alır
- **Anki-style SM-2:** learning steps → graduated review → mastery
- `computeSRS(card, grade, settings, now, preview)` — çekirdek hesaplama
- `previewSRS(card, grade, settings, now)` — kartı değiştirmeden sonraki aralığı gösterir
- `applySRS(card, grade, settings, now)` — kartın `srs` alanını günceller (mutates)
- `buildQueueFromCards(cards, masteredOnly, now, dailyLimit, newToday)` — çalışma kuyruğu oluşturur
- `createSrsData(defaultEase)` — yeni kart için boş SRS bloğu
- `fmtDur(ms)` — milisaniyeyi `1m`, `10m`, `1h`, `3d` formatına çevirir
- `main.js`'deki `_buildQueue()` ve `buildQueue()` wrapper'lar state'den parametreleri çözümleyip engine'e iletir

## Standalone Test Module (Data Layer)

- **State:** `customTests` dizisi `appState.js`'deki initial state'e eklendi; `addCustomTest`, `updateCustomTest`, `deleteCustomTest` action fonksiyonları export edilir
- **Schema:** Bir custom test: `{ id, title, questions: [] }`. Bir question: `{ id, type, prompt, image: null | string(base64), options: [], correctValue }`
- **Image util:** `processImageToBase64(file, maxWidth)` — `src/utils.js`'de, File → Canvas resize → base64 JPEG (0.7 kalite)
- **Supabase:** `custom_tests` tablosu `supabase-schema.sql`'de tanımlı (sync_code ile ilişkili)
- **Migration:** `migrateCustomTests(state)` eski state'lere `customTests` dizisi ekler

## Standalone Test Module (UI — Milestone 2)

- **TestManager.js:** `src/components/TestManager.js` — Test listesi, Play/Edit/Delete/Export butonları, "Create New Test" akışı, JSON Import
- **TestEditor.js:** `src/components/TestEditor.js` — Dinamik soru formu: MULTIPLE_CHOICE, TRUE_FALSE, FILL_BLANK türleri; görsel yükleme (`processImageToBase64`), seçenekler, doğru cevap seçimi
- **Routing:** `showView('tests')` ve `showView('test-editor')` — alt nav'da "Exams" sekmesi
- **i18n:** 4 dilde (en/tr/ko/mn) tüm test modülü stringleri eklendi

## Standalone Test Module (Execution & Results — Milestone 3)

- **TestView.js:** `src/components/TestView.js` — Soru bazlı test çalıştırma: session state (currentIndex, score, userAnswers), soru tipine göre input (radio/button/text), görsel desteği, cevap doğrulama (yeşil/kırmızı feedback), 1sn gecikme ile otomatik ilerleme
- **TestResults.js:** `src/components/TestResults.js` — Test sonuçları: toplam skor, yüzde, soru bazında doğru/yanlış detayı, "Testlere Dön" butonu
- **Export/Import:** `exportTestToJson(test)` ve `importTestFromJson(file)` — `src/utils.js`'de, Blob/FileReader ile Web API tabanlı (Node.js bağımlılığı yok)
- **Routing:** `showView('test-play')` ve `showView('test-results')` — TestManager'dan Play butonu ile başlatılır
- **i18n:** 4 dilde (en/tr/ko/mn) tüm Milestone 3 stringleri eklendi

## Çalışma Ekranı Gesture Flip

- Kartı mouse/parmak ile sürükleyerek çevirme (`initFlipGesture()`)
- `.fc-flip-container` > `.fc-flip-inner` > `.fc-flip-front` + `.fc-flip-back` yapısı
- Sürükleme mesafesi kartın genişliğine orantılı `rotateY()` uygular
- 90° eşiği geçilirse flip tamamlanır, geçilmezse geri döner
- "Show answer" butonu da hâlâ çalışır (fallback)

## Kanji Detail (Phase 1 — Data & Utils)

- **`src/data/kanji_lite.json`:** Offline kanji sözlüğü. Her kanji için `onyomi`, `kunyomi` ve `meanings` (en/tr/ko/mn). Başlangıçta 10 temel kanji (日月火水木金土人大山).
- **`src/utils/kanjiUtils.js`:** Kanji tespit yardımcıları:
  - `isJapaneseCard(cardLanguage)` — `null`/`undefined`/`'ja'`/`'jp'` için `true` döner (deste/kart dil alanı olmadığından varsayılan Japonca)
  - `wrapKanji(text)` — CJK Unified Ideographs regex ile kanji karakterleri bulur, `<span class="kanji-clickable" data-kanji="X">X</span>` ile sarar (hiragana/katakana hariç)

## Kanji Detail (Phase 1 — Modal UI)

- **`src/components/KanjiModal.js`:** Tıklanan kanji için detay modalı. `kanji_lite.json`'u statik `import` ile alır → tamamen offline (Vite build-time bundle, ağ yok).
  - `init(app)` ile context alır; `open(kanji)` modalı açar.
  - Kanji'yi sözlükte bulur, büyük karakter + Onyomi (katakana) + Kunyomi (hiragana) + anlamı gösterir.
  - **Anlam dili:** `app.currentLang`'a göre seçilir, eksikse `en`'e döner.
  - Sözlükte olmayan kanji için `kanji_not_found` mesajı (şu an 10 temel kanji var).
  - Mevcut paylaşılan modal altyapısını (`app.openModal`/`closeModal`) kullanır → dışarı tıklayınca kapanma (main.js'de bağlı) + "Close" butonu, tüm app modalleriyle tutarlı.
- **Bağlantı:** `main.js`'de diğer bileşenler gibi `KanjiModal.init(app)` + cross-ref `app.openKanjiModal = KanjiModal.open`. `CardView.js`'deki global `.kanji-clickable` click listener'ı `app.openKanjiModal(kanji)` çağırır (önceki `console.log` kaldırıldı).
- **i18n:** `close`, `kanji_detail`, `kanji_onyomi`, `kanji_kunyomi`, `kanji_not_found` anahtarları 4 dile eklendi; anlam etiketi için mevcut `meaning_label` yeniden kullanılır.
- **CSS:** `index.html`'de `.kanji-detail-rows` / `.kanji-detail-row` / `.kanji-detail-label` / `.kanji-detail-value` (label–değer satır düzeni).

## Offline Akıllı Furigana Parser (Phase 2)

Eski online sözlük API'si (`kanjiapi.dev`) tamamen kaldırıldı. Artık okuma üretimi **offline ve bağlama duyarlı** — `今日`→きょう, `明日`→あした gibi doğru okumayı otomatik seçer.

- **Kütüphane:** `@sglkc/kuromoji` (kuromoji.js'in tarayıcı uyumlu fork'u) + `fflate`. Root `package.json`'a **runtime dependency** olarak eklendi (ilk kez `devDependencies` dışında bağımlılık var).
- **Sözlük:** `public/dict/*.dat.gz` (~17MB, IPADIC). Vite `public/` → `dist/`'e kopyalar; electron-builder `dist/`'i pakete dahil eder.
- **PWA offline:** `vite.config.js` workbox'a `/dict/.*\.dat\.gz` için **CacheFirst** kuralı + `maximumFileSizeToCacheInBytes: 20MB` eklendi (precache yerine ilk kullanımda cache).

### `src/utils/furiganaParser.js`
- **Saf/lazy:** Tokenizer ilk istekte başlatılır (singleton promise) → `warmupFurigana()` formu açarken erkenden ısıtır.
- **API:** `generateFurigana(text)` → tüm metnin düz hiragana okuması (ana alan); `generateFuriganaMap(sentence)` → `{ kanjiBloğu: okuma }` (örnek cümle ruby'si). Ayrıca `kataToHira`, `getTokenizer`, `warmupFurigana`.
- **Okurigana hizalama:** `fitKanjiReadings` token okumasını kanji/kana koşularına böler → `食べる`→`食:た`, `持ち帰る`→`持:も`+`帰:かえ`. Bitişik kanji koşuları (çok-token, ör. `毎日日本語`) cümle ofsetine göre tek bloğa birleşir → anahtarlar render'daki `tokenizeSentence` blokları ile eşleşir.
- **`SmartDictionaryLoader`:** kuromoji `builder` yerine `Tokenizer` + base `DictionaryLoader` doğrudan import edilip özel yükleyici ile kurulur. İki tuzağı çözer:
  1. **Çift gzip:** Bazı sunucular `.dat.gz`'yi `Content-Encoding: gzip` ile gönderir → tarayıcı zaten açar. Yükleyici yalnızca baytlar gerçekten gzip ise (`0x1f 0x8b`) açar; aksi halde build sessizce asılırdı.
  2. **Electron `file://`:** Packaged app `file://` üzerinden yüklenir, Chromium `fetch('file://')` desteklemez. `window.location.protocol === 'file:'` ise dict baytları IPC ile okunur (`window.electronAPI.readDict`), aksi halde `fetch`.

### Electron IPC (dict okuma)
- **`preload.js`:** `readDict(name)` → `ipcRenderer.invoke('furigana:read-dict', name)`.
- **`main.js`:** `ipcMain.handle('furigana:read-dict', …)` → `dist/dict/<name>`'i `fs.readFileSync` ile okur. Güvenlik: yalnızca `^[a-z0-9_]+\.dat\.gz$` adlarına izin (path traversal engeli).

### `DeckList.js` entegrasyonu
- **`setupFuriganaAssist`:** Ana okuma alanı — kanji yazıldıkça (debounce 600ms) `generateFurigana` ile **otomatik doldurulur**. Seçim çipleri kaldırıldı. Sadece alan boş ya da en son otomatik değer iken yazar (`dataset.autoFilled`) → manuel düzenlemeyi ezmez.
- **`setupExampleFuriganaAssist`:** Örnek cümle yazıldıkça (debounce) tüm cümle parse edilir, `furiganaMap` otomatik üretilir ve ruby render edilir. Eski "kanji'ye tıkla → oku" akışı ve "Mark words" tetikleyicisi (`rowId`) kaldırıldı/gizlendi.
- Kaldırılan kod: `KANJI_API_BASE`, `fetchKanjiReadings`, `fetchWordReadings`, `fetchReadingSuggestions`, eski `renderTokenEditor`/`onTokenClick`/`applyMark`. Kullanılmayan i18n anahtarları (`furigana_editor_hint`, `furigana_word_not_found`, `furigana_manual_label`, `furigana_not_found`) zararsız olduğundan bırakıldı; `furigana_searching` parse durumunu göstermek için kullanılır.
