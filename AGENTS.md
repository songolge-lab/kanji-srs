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
    locales/
      kanji_base.json     ← Onyomi + kunyomi (statik import, her zaman yüklü)
      kanji_en.json       ← İngilizce anlamlar (fallback, her zaman yüklü)
      kanji_tr.json       ← Türkçe anlamlar (lazy-load)
      kanji_ko.json       ← Korece anlamlar (lazy-load)
      kanji_mn.json       ← Moğolca anlamlar (lazy-load)
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
    kanjiDictService.js   ← Lazy-loading kanji sözlük servisi (dil paketi yönetimi)
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

### Güvenlik, Dayanıklılık & Offline Düzeltmeleri (Audit)
Derin denetim sonrası 5 düzeltme:

1. **Veri kaybı koruması (`src/store/appState.js`):** `loadState()` bozuk JSON'da `null` dönmeden ÖNCE ham string'i `localStorage['kanji_srs_v1_corrupt_backup']`'a yedekler. Aksi halde `null` → bir sonraki `save()` boş state yazıp kullanıcı verisini kalıcı siler.
2. **IPC memory leak (`electron/preload.js`):** Tüm `onUpdate*`/`onDownloadProgress` dinleyicileri artık named handler kullanıp bir **teardown** fonksiyonu döner (`() => ipcRenderer.removeListener(...)`) → renderer listener'ı temizleyebilir, her yeniden bağlanışta handler birikmesi önlenir.
3. **Yakalanmayan promise (`src/main.js` auto-update popover):** `api.downloadUpdate()` ve `api.installUpdate()` çağrılarına `.catch()` eklendi → hata olursa state `'available'`a döner (sonsuz "downloading" ekranı engellenir). NOT: `downloadUpdate()` IPC promise'i hemen resolve olduğundan ağ kopması `update:error` kanalıyla gelir; bu yüzden `onUpdateError` da `'downloading'` → `'available'` geri çevirecek şekilde bağlandı (eskiden no-op'tu).
4. **Offline PWA çökmesi (`vite.config.js`):** Manuel Workbox `runtimeCaching` `navigate` ve `\.(js|css|…)$` kuralları KALDIRILDI — `vite-plugin-pwa` precache manifest'i ile çakışıp offline'da boş/dinozor ekranına yol açıyordu. **Sadece** kuromoji sözlüğü için `CacheFirst` kuralı kaldı. Manuel statik-varlık/navigasyon kuralı bir daha EKLENMEMELİ.
5. **Electron siyah ekran (`vite.config.js` + `electron/main.js`):** `vite.config.js` → `base: './'` (zaten mevcuttu; `file://` protokolünde mutlak yollar kırılır, korunmalı). `electron/main.js` → siyah ekranı teşhis için geçici eklenen `mainWindow.webContents.openDevTools({ mode: 'detach' })` satırı **v1.2.5'te KALDIRILDI** (production'da DevTools açık kalmamalı). Bir daha eklenmemeli.

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

## SRS Engine (`src/core/srsEngine.js`) — FSRS (v2.0.0)

**v2.0.0'da SM-2 → FSRS (Free Spaced Repetition Scheduler, v4.5 eşdeğeri) geçişi yapıldı.** Bellek üç metrikle modellenir: Retrievability ($R$), Stability ($S$ gün), Difficulty ($D$ 1–10). 17 ağırlık `FSRS_W` dizisinde.

- **Saf modül:** DOM/browser API bağımlılığı yok, tüm fonksiyonlar `settings` ve `now` parametresi alır.
- **Hibrit tasarım (kritik):** Kısa vadeli **intraday learning steps** (dakika) KORUNDU. FSRS matematiği kart yalnızca **mezun olduğunda** (`>= 1 gün`) devreye girer — 'new'/'learning'/'relearning' durumlarında adımlar (steps), 'review' durumunda tam FSRS. Yeni `relearning` durumu eklendi (lapse → relearning steps).
- `FSRS_W` — 17 ayarlı ağırlık (export).
- `getRetrievability(t, s)` — `0.9^(t/s)`; `t === s` iken `R === 0.9` (export).
- `computeInitialDS(grade)` — mezuniyette ilk D/S (grade FSRS 1–4) (export).
- `computeNextDS(D, S, R, grade)` — review cevabında sonraki D/S; başarı/lapse formülleri ayrı (export).
- `computeSRS(card, grade, settings, now, preview)` — çekirdek; grade `0=Again,1=Hard,2=Good,3=Easy` → FSRS `1,2,3,4`.
- `previewSRS` / `applySRS` — imza değişmedi (UI butonları + grade akışı dokunulmadan çalışır).
- `buildQueueFromCards(...)` — **`relearning` durumu learning kovasına dahil edildi** (aksi halde lapse'lenen kartlar kuyruktan kaybolurdu).
- `createSrsData(defaultEase)` — yeni kart: FSRS alanları (`D:0, S:0, last_review:null`) + **legacy SM-2 ayna alanları (`ease`, `intervalDays`) korunur** (eski senkron istemci uyumu).
- `fmtDur(ms)` — `1m`/`10m`/`1h`/`3d`/`2mo`/`1.5y` (FSRS büyük aralıklar ürettiğinden ay/yıl eklendi).
- `CardView.gradeCard()`: re-queue koşuluna `relearning` eklendi (intraday relearning kartı oturum içinde döner).

### SM-2 → FSRS Migrasyonu (`src/store/appState.js` → `migrateToFSRS` / `migrateCardsToFSRS`)
- **Idempotent + additive (kayıpsız):** `intervalDays → S`, `ease → D` (`D = 10 - ((ease-1.3)/1.2)*5`, [1,10] clamp). `last_review`, review kartları için `due - interval`'den türetilir. Guard: `'S' in cardSrs`.
- **BLUEPRINT'TEN KASITLI SAPMA:** Harici blueprint `ease`/`intervalDays`'i `undefined` yapmayı ("legacy temizliği") istedi — **uygulanmadı**. Sebep: tüm `state` (kart `srs` dahil) Supabase'e push edilir ve `pickNewerState` şema-versiyon kontrolü yapmaz → hâlâ v1.x olan bir istemci (ör. tembel güncellenen PWA) FSRS kartı çekerse, legacy alanlar silinmişse SM-2 motoru `due = now + NaN` üretip veriyi sessizce bozar. Alanları korumak ileri-uyumlu + geri-dönüş güvenli. ("Streak motoru kararı"ndaki "blueprint öncülünü kod denetiminde doğrula" tavrının devamı.)
- **Tüm ingestion yollarında çalışır:** `migrateCardsToFSRS(state)` `main.js`'de 5 noktada (boot load + boot cloud-pull + connectSyncCode + manualSync + migrateAndSave) `migrateDecks`'ten hemen sonra çağrılır → v2 istemci yerel/uzak ne yüklerse normalize eder.
- **State `version`:** `createInitialState` → `2`.

### Bilinen risk (release-time, push değil)
Çok-cihaz senaryosunda v2.0.0 FSRS state'ini buluta yazdığında, **henüz güncellenmemiş bir v1.x istemci** legacy alanlar sayesinde çökmez ama FSRS ilerlemesini "göremez" (kendi SM-2 alanlarını kullanır). Tam tutarlılık ancak tüm cihazlar v2.0.0 olunca sağlanır. Kırıcı şema değişiminin kaçınılmaz sonucu; legacy-alan koruması en kötü durumu (veri bozulması) engeller.

### Sürüm/Release notu
`main.js` APP_VERSION + `electron/package.json` + root `package.json` → `2.0.1`. **Main'e push kullanıcıya bir şey YAYINLAMAZ:** `.github/workflows/build-windows.yml` yalnızca `workflow_dispatch` (manuel) veya `v*` **tag** push'unda tetiklenir ve **draft** release üretir (manuel "Publish" gerekir).

### v2.0.1 Red Team Audit Düzeltmeleri
1. **Sync çakışma çözümü (`dbService.js` → `pickNewerState`):** Eski kart-sayısı+review skoru yerine `stats.lifetimeReviews` karşılaştırması (undefined → 0). Silinen kartların "diriltilmesi" (resurrecting cards) bugı düzeltildi.
2. **Mid-sync ağ koruması (`main.js` → `connectSyncCode`):** `save()` çağrısı `await cloudPush()` başarısından **sonraya** alındı → ağ düşerse yerel state bozulmaz.
3. **Electron unhandled promise (`electron/main.js`):** `autoUpdater.downloadUpdate()` çağrısına `.catch(console.error)` eklendi.
4. **Streak döngüsü optimizasyonu (`Analytics.js` → `updateStreak`):** String tabanlı `addDaysToDateStr` döngüsü yerine tamsayı epoch-gün aritmetiği (`cursorEpoch--`) → GC baskısı azaltıldı.
5. **Japonca buton taşması (`index.html` → `.ans-btn`):** `word-break: break-word` + `white-space: normal` eklendi → uzun çeviri stringleri mobilde grid sütunlarını kırmaz.
6. **FSRS şeması:** `createSrsData()` zaten v2.0.0'da `D: 0, S: 0, reps: 0, lapses: 0` içeriyordu — değişiklik gerekmedi.

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

- **Kanji Sözlüğü — Language Pack Mimarisi:** Eski monolitik `src/data/kanji_lite.json` kaldırıldı. Veri artık `src/data/locales/` altında bölünmüş:
  - `kanji_base.json` — onyomi + kunyomi (her zaman statik import ile yüklenir, ~185KB)
  - `kanji_en.json` — İngilizce anlamlar (~114KB, her zaman yüklenir — fallback)
  - `kanji_tr.json` / `kanji_ko.json` / `kanji_mn.json` — Diğer dil anlamları (~27KB, sadece aktif dilde lazy-load)
  Her dosya `{ "kanji": "meaning_string" }` formatında. Boş string = henüz çeviri yok.
- **`src/services/kanjiDictService.js`:** Lazy-loading sözlük servisi.
  - `init(lang)` / `setLanguage(lang)` — Vite dynamic `import()` ile sadece gerekli dil paketini yükler. İngilizce daima fallback olarak yüklenir.
  - `lookup(kanji)` — `{ onyomi, kunyomi, meaning, hasNativeMeaning }` döner. Aktif dilde anlam yoksa İngilizce'ye döner.
  - `main.js`'de `boot()` sırasında `KanjiDict.init(currentLang)`, `setLang()` sırasında `KanjiDict.setLanguage(lang)` çağrılır.
  - Vite build'de dil paketleri otomatik olarak ayrı chunk'lara bölünür (code-splitting).
- **Yeni dil eklemek:** `src/data/locales/kanji_XX.json` dosyası oluştur, `kanjiDictService.js`'deki `loadPack` switch'ine case ekle.
- **~3.121 kanji** — KANJIDIC türevi `davidluzgouveia/kanji-data` setinden. 10 elle düzenlenmiş çok dilli giriş (日月火水木金土人大山).
- **`src/utils/kanjiUtils.js`:** Kanji tespit yardımcıları:
  - `isJapaneseCard(cardLanguage)` — `null`/`undefined`/`'ja'`/`'jp'` için `true` döner (deste/kart dil alanı olmadığından varsayılan Japonca)
  - `wrapKanji(text)` — CJK Unified Ideographs regex ile kanji karakterleri bulur, `<span class="kanji-clickable" data-kanji="X">X</span>` ile sarar (hiragana/katakana hariç)

## Kanji Detail (Phase 1 — Modal UI)

- **`src/components/KanjiModal.js`:** Tıklanan kanji için detay modalı. `kanjiDictService.lookup()` ile veri alır → tamamen offline.
  - `init(app)` ile context alır; `open(kanji)` modalı açar.
  - Kanji'yi sözlükte bulur, büyük karakter + Onyomi (katakana) + Kunyomi (hiragana) + anlamı gösterir.
  - **Anlam dili:** `hasNativeMeaning` true ise `meaning_label` (ör. "Türkçe anlam"), false ise `kanji_meaning_en` (ör. "Anlam (En)") etiketi gösterilir.
  - Sözlükte olmayan kanji için `kanji_not_found` mesajı (~3.121 kanji kapsıyor; nadir/sınıflandırılmamış kanjiler kapsam dışı).
  - Mevcut paylaşılan modal altyapısını (`app.openModal`/`closeModal`) kullanır → dışarı tıklayınca kapanma (main.js'de bağlı) + "Close" butonu, tüm app modalleriyle tutarlı.
- **Bağlantı:** `main.js`'de diğer bileşenler gibi `KanjiModal.init(app)` + cross-ref `app.openKanjiModal = KanjiModal.open`. `CardView.js`'deki global `.kanji-clickable` click listener'ı `app.openKanjiModal(kanji)` çağırır.
- **i18n:** `close`, `kanji_detail`, `kanji_onyomi`, `kanji_kunyomi`, `kanji_not_found`, `kanji_meaning_en` anahtarları 4 dile eklendi.
- **CSS:** `index.html`'de `.kanji-detail-rows` / `.kanji-detail-row` / `.kanji-detail-label` / `.kanji-detail-value` (label–değer satır düzeni).

## Kanji Detail (Phase 3 — Flashcard arka yüz & ruby iyileştirmeleri)

Kullanıcı testi sonrası 4 düzeltme (`CardView.js` + `utils.js` + `index.html`):

- **Arka yüz kanji tıklanabilir + vurgulu (`smartRuby`):** `CardView.js`'de `smartRuby(surface, reading)` yardımcı fonksiyonu, eski `buildRuby` çağrılarının yerini aldı (study/review/preview tüm arka yüzlerde). Yüzeyi kanji/kana koşularına böler; **yalnızca kanji koşuları `<rt>` okuma alır**, saf kana (を, します) düz metin kalır. Japonca kartlarda kanji koşuları `wrapKanji` ile `.kanji-clickable` sarılır → arka yüzdeki ana kanji artık tıklanabilir (modal açar). Tıklamayı zaten `init()`'teki **document-level** delegated listener yakalar (ön+arka tümünü kapsar).
- **Vurgu rengi:** `index.html` → `.fc-back .kanji-clickable` / `.fc-preview-back .kanji-clickable` `color: var(--hanko)` + `font-weight:700` (örnek cümle `.hl` vurgusuyla aynı renk). Ön yüz (`.fc-kanji`) etkilenmez.
- **Uzun cümle taşması:** `.fc-kanji`'ye `max-width:100%` + `overflow-wrap:anywhere` + `word-wrap:break-word`. Ayrıca `CardView.kanjiSizeClass(text)` metin uzunluğuna göre `.fc-kanji-sm` (>7 karakter) / `.fc-kanji-xs` (>18) küçültücü sınıfını ekler → dev font kart sınırlarını taşırmaz. (CJK kırılımı için `word-break:keep-all` yerine `normal`/`anywhere` kullanıldı; aksi halde boşluksuz kanji dizisi yine taşardı.)
- **Redundant ruby kana:** `utils.js` → `highlightKanji` örnek cümle döngüsüne savunmacı koşul: kanji içermeyen ya da `okuma === yüzey` olan blok ruby almaz (eski parser'dan kalan kana girişlerini de temizler).

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
- **`setupFuriganaAssist`:** Ana okuma alanı — kanji yazıldıkça (debounce 600ms) `generateFurigana` ile **sessizce otomatik doldurulur** (imza: `(kanjiInputId, furiganaInputId)` — 2 arg). Sadece alan boş ya da en son otomatik değer iken yazar (`dataset.autoFilled`) → manuel düzenlemeyi ezmez. **"Searching reading…" durum pili / öneri çipleri tamamen kaldırıldı:** `furigana-suggest` kutu elementleri (add/modal-add/edit) ve `.furigana-suggest`/`.furigana-chip` CSS'i silindi.
- **`setupExampleFuriganaAssist`:** Örnek cümle yazıldıkça (debounce) tüm cümle parse edilir, `furiganaMap` otomatik üretilir ve ruby render edilir. Eski "kanji'ye tıkla → oku" akışı ve "Mark words" tetikleyicisi (`rowId`) kaldırıldı/gizlendi.
- Kaldırılan kod: `KANJI_API_BASE`, `fetchKanjiReadings`, `fetchWordReadings`, `fetchReadingSuggestions`, eski `renderTokenEditor`/`onTokenClick`/`applyMark`. Eski kullanılmayan i18n anahtarları (`furigana_editor_hint`, `furigana_word_not_found`, `furigana_manual_label`, `furigana_not_found`, `furigana_searching`) 4 dilden de temizlendi.

## Uzun Metin Layout Sağlamlaştırma (v1.2.5)

50+ karakterlik dizelerin layout sınırlarını taşırmaması için `src/index.html` CSS'inde 4 düzeltme (canlı önizleme ile doğrulandı):

1. **Ön yüz tam ortalama:** `.fc-flip-front`/`.fc-flip-back` yüzlerine `text-align: center` eklendi (zaten `align-items`/`justify-content: center` vardı) → çok satıra kırılan uzun metin yatay olarak da ortalanır.
2. **Deste listesinde dikey istiflenme engeli (`.card-list-item`):** Orta okuma satırı (`.cli-furi`) flexbox tarafından sıkışıp Japonca karakterleri dikey istiflemesin diye `white-space:nowrap; overflow:hidden; text-overflow:ellipsis` aldı (`.cli-meaning` zaten vardı). `.card-list-item`'a `min-width:0` eklendi. **Asıl sınır taşması:** `.cli-kanji` `flex-shrink:0` + sınırsız genişlikle uzun kanji/cümlede tüm satırı kaplayıp sayfayı yatay taşırıyordu → `max-width:40%` + `nowrap`/`ellipsis` ile sınırlandı (okuma+anlam alanı korunur).
3. **Dev modal önizlemesi sınırlandırma (`.fc-preview-front`/`.fc-preview-back`):** Add/Edit modal önizleme kartı uzun metinde ekranı şişirmesin diye `max-height:40vh` + `max-width:100%` + `overflow-y:auto` (gizli scrollbar) → kullanıcı kartın içinde kaydırır, modal patlamaz.
4. **Rozet güvenli alanı (Task 4):** `.fc-state-badge` ("Göz at"/durum rozeti) uzun metnin ruby/furigana satırıyla çakışmasın diye rozet barındıran yüzlere `:has(.fc-state-badge)` ile `padding-top:3.4rem` eklendi — hem flip yüzleri (`.fc-flip-front/back`) hem cevap-açık kart (`.flashcard`).

## Gamification & Analytics — Katkı Heatmap'i + Kalıcı Seri Alanları

GitHub tarzı katkı (contribution) heatmap'i ve kalıcı seri/yaşam-boyu izleme. **Saf Vanilla JS + CSS Grid, harici kütüphane yok.** (Bir blueprint baz alındı; ancak blueprint'in iki öncülü kod denetiminde yanlış çıktı — aşağıdaki "Streak motoru kararı"na bakın.)

### Veri modeli (`src/store/appState.js`)
- **`stats` yeni alanları:** `createInitialState()` ve `migrateStats()` artık `currentStreak`, `longestStreak`, `lastStudyDate`, `lifetimeReviews` tutar. `currentStreak` daima `streak` ile aynı değeri taşır (UI hâlâ `streak` okur; `currentStreak` blueprint uyumu için eklendi). Eski state'ler (`streak` + `reviewsByDate`) güvenle migrate edilir: `currentStreak`/`longestStreak` mevcut `streak`'ten, `lastStudyDate` `reviewsByDate`'teki en son **count>0** suffix'siz günden türetilir.
- **`pruneOldData(state)`:** `loadState()` içinde (parse'tan hemen sonra, migrate'ten önce) çağrılır. `PRUNE_AFTER_DAYS` (400) gününden eski **düz tarih** anahtarlarının inceleme sayılarını tek bir `lifetimeReviews` tamsayısında biriktirip o günü (+`_new`/`_shielded` kardeşlerini) siler → localStorage yalın kalır. **Güvenli pencere kritik:** 400 gün hem 366 günlük heatmap penceresinin hem de gerçekçi kesintisiz serilerin ötesindedir → streak/shield mantığının geriye okuyabileceği hiçbir güne dokunmaz. İdempotent. `appState` saf kalsın diye epoch hesabı inline (import yok).

### Streak motoru kararı (`src/components/Analytics.js` → `updateStreak()`)
Blueprint, `updateStreak()`'in O(N) olduğunu iddia edip yerine "O(1) artımlı sayaç" istedi. **Bu KASITLI olarak uygulanmadı:** (1) gerçek while-döngüsü O(toplam geçmiş) değil **O(seri uzunluğu)**dur ve oturum başına yalnız bir kez çalışır — negligible; (2) mevcut motor `_shielded` işaretçilerini seri içinde sayar ve **buluttan gelen / saati değişen state'lerde kendi kendini onarır** (sync yollarının çoğu `migrateStats` bile çağırmaz). Elle tutulan bir sayaç bu işaretçilerle senkron kalamaz → regresyon. Bu yüzden yeniden-hesaplama kaynak doğruluk olarak korundu; `currentStreak`/`longestStreak`/`lastStudyDate` aynı hesaptan türetilen 3 ek satırla güncellenir. Kalkan sistemi (`applyShieldsForMissedDays`, `awardWeeklyShieldIfEarned`) tümüyle korundu.

### Heatmap render (`Analytics.js` → `renderHeatmap()`)
- `renderGlobalStats()` sonunda çağrılır → deck dashboard'unda `#heatmap-card` (`index.html`'de streak kartının altında) içine basılır. Diğer view'larda element gizli ama DOM'da, guard ile sorunsuz.
- 53 hafta × 7 gün = **371 hücre**, `grid-auto-flow:column` (üstten-alta, sonra sola-sağa). Hafta Pazartesi başlar (`weekStartOf` Mon=0). Bugünden ileri günler `heat-empty` (boş). `heatLevel(count)`: 0 / 1–10 / 11–20 / 21–40 / 41+ → `heat-0..4`. Kalkanlı (count 0 + `_shielded`) gün `heat-shielded` (sky). Bugün `is-today` (iç halka). Her hücrede native `title` tooltip.
- Üstte ay etiketleri (`months_short`), solda gün etiketleri (`weekdays_short`, çift indeksler), altta yıl toplamı + "Az→Çok" legend, başlıkta en uzun seri.
- **CSS (`index.html`):** Hücre boyutu **sabit** (`--heat-cell:11px`) → kare garantisi; `.heatmap-scroll` dar ekranda yatay kaydırma. Renk tonları `color-mix(in srgb, var(--jade) X%, var(--paper-2))` ile **tema değişkenlerinden** türetilir → tüm temalarda (açık/koyu) otomatik uyum; eski motorlar için her seviyede önce GitHub yeşili düz `background` fallback'i.
- **i18n:** `months_short`, `heatmap_title`, `heatmap_longest`, `heatmap_year_total`, `heatmap_tooltip`, `heatmap_none`, `heatmap_less`, `heatmap_more` — 4 dile eklendi.
- **`CardView.js` değişmedi:** `gradeCard()` zaten `app.recordReview(wasNew)` çağırıyor → yeni katmana otomatik bağlanır. `app.renderHeatmap = Analytics.renderHeatmap` cross-ref olarak eklendi.

## İnteraktif Takvim — Günlük Detay & Deste İzleme

Çalışma takviminde (streak ekranı) bir güne tıklayınca o günün kart sayısı, harcanan süre ve **hangi destelerin** çalışıldığı bir detay panelinde gösterilir. Saf Vanilla JS, mevcut takvim altyapısının (`renderCalendarGrid`) üzerine eklendi.

### Veri modeli (`src/store/appState.js` + `Analytics.js → recordReview`)
- **`dailyStats[date]` artık `decksStudied: []`:** `recordReview(isNew, deckTitle)` imzası genişledi — gradelenen kartın aktif çalışma destesinin **adı** (`deck.name`) ikinci argümanla geçirilir ve `decksStudied`'a (varsa atlanır, `includes()` ile tekilleştirilir) eklenir. `startSessionTimer` ve `recordReview` günlük girişi oluştururken `decksStudied: []` ile başlatır; her yazımdan önce `Array.isArray` guard'ı eski/migre edilmemiş günleri korur.
- **Migrasyon (`migrateStats`):** Mevcut `dailyStats` girişlerinden `decksStudied` eksik olanlara boş dizi eklenir (geriye dönük uyum). Render tarafı yine de defansif okur (yoksa `[]`).
- **`CardView.gradeCard()`:** `app.findDeck(app.currentDeckId)` ile aktif deste bulunur, `app.recordReview(wasNew, deck?.name)` çağrılır. **BLUEPRINT SAPMASI:** Görev `deck.title` istedi; bu projede deste alanı `name` (title yok) → `name` kullanıldı.

### Takvim UI (`Analytics.js → renderCalendarGrid` + `selectCalendarDay`)
- **Tıklanabilir günler:** Yalnızca **veri olan** günler (`active || shielded`) `is-clickable` sınıfı + `onclick="selectCalendarDay('YYYY-MM-DD')"` + `role="button"` alır. Veri olmayan günler tıklanamaz.
- **`selectCalendarDay(dateStr)`:** Modül-içi `selectedCalDay` state'ini **toggle** eder (aynı güne tekrar tıklayınca kapanır) → `renderCalendarGrid()` yeniden çizer. `changeCalendarMonth` ay değişiminde `selectedCalDay = null` yapar. `main.js` window global'lerine `selectCalendarDay: Analytics.selectCalendarDay` eklendi (inline onclick için).
- **Detay paneli (`#calendar-day-details`):** Grid + legend'in altına basılır. Seçili gün yoksa boş string (görünmez). `renderDayDetails()`: `dailyStats[date]`'ten kart/süre/desteler okur; yoksa `reviewsByDate` sayısına düşer; hiç veri yoksa `cal_no_activity` mesajı. `formatCalDate` çevrili ay adıyla "29 June 2026" üretir. **Deste adları kullanıcı girdisi → `esc()` edilir** (`t()` ham `{decks}` interpolasyonu yapar, kaçış yapmaz).
- **Seçili gün vurgusu (`index.html` CSS):** `.cal-day.is-selected` → `inset 0 0 0 2px var(--gold)` halka; `.is-selected.is-today` kombinasyonu altın iç + ink dış halka. `.cal-day-details` paneli `--paper-2`/`--line`/`--r-md` ile tema uyumlu.

### i18n (`src/main.js → LANG`)
4 yeni anahtar 4 dile (en/tr/ko/mn), `daily_time_spent`'ten hemen sonra: `cal_cards_studied` (`{count}`), `cal_time_spent` (`{count}`), `cal_decks_studied` (`{decks}`), `cal_no_activity`.

### Doğrulama
Vite preview'da canlı test edildi (örnek desteden 2 kart gradelendi → takvim): (1) çalışılan gün tıklanabilir oldu; (2) tık → detay paneli "28 June 2026 / Cards studied: 2 / Time spent: 0 min / Decks studied: JLPT N3 Kanji (Sample)" gösterdi; (3) seçili hücre `is-selected` halkası aldı; (4) `setLang('tr')` ile etiketler Türkçeye çevrildi ("28 Haziran 2026 / Çalışılan kart: 2 / …"); konsol hatası yok.

## 7 Günlük Tekrar Tahmini (Forecast Bar Chart) — Saf CSS/DOM

FSRS `srs.due` zaman damgalarından türetilen 7 günlük "vadesi gelecek kart" çubuk grafiği. **Harici grafik kütüphanesi yok** (Chart.js vb.) — saf Vanilla JS + CSS Flexbox. **Konum (UI cila, bkz. aşağıdaki "UI Cila" bölümü):** Eskiden deck dashboard'unda (`view-decks`, `#global-stats` ↔ streak kartı arası) statik dururdu; dashboard'u sadeleştirmek için **Çalışma Takvimi ekranına (`view-streak`) takvim grid'inin hemen altına** taşındı.

### Veri (`Analytics.js → getForecastData(days = 7)`)
- Tüm destelerin tüm kartlarını dolaşır, `card.srs.due` (ms zaman damgası) okur. **UTC gün kovalama:** tüm tarih sistemi (`today()`/`dateStrToEpochDay`) UTC sınırı kullandığından due ms'i `Math.floor(due / 86400000)` ile UTC epoch gününe çevrilir → `todayEpoch` ile farkı index verir.
- **Gecikmiş (due < bugün) → bugüne (index 0)** sayılır; pencere dışı (`idx >= days`) yok sayılır.
- **`'new'` durumdaki kartlar KASITLI dışlanır:** yeni kartların `due` değeri `0` (programlanmamış) → literal sayım hepsini bugüne yığıp grafiği şişirirdi. `deckStats`'taki "due" tanımıyla (`state !== 'new'`) tutarlı. (Memory: harici/literal spec kod denetiminde doğrulanmalı — task "tüm kartları say" diyordu, ama yeni kart dışlaması anlamlı/gerekli olduğu canlı testte 8 kartlık örnek deste [6 new + 2 learning] üzerinde doğrulandı → bugün = 2, 8 değil.)
- Dönüş: `[{ dateStr, count, label }]`. `label` `weekdays_short` (Pzt=0) dizisinden `((epoch % 7) + 10) % 7` indeksiyle alınır → dile duyarlı (setLang ile değişir).

### Render (`Analytics.js → renderForecastChart()`)
- `#forecast-chart-container` (`renderStreakScreen()` HTML'inde `#cal-container`'dan hemen sonra basılan `.card`) içine basar. `maxCount = max(count)`; çubuk yüksekliği `(count / maxCount) * 100%` — **`maxCount === 0` güvenli** (tüm yükseklikler `0%`).
- Her sütun: üstte sayı (`.forecast-count`), ortada çubuk (`.forecast-bar`, boş günde `.is-empty` soluk), altta gün etiketi (`.forecast-label`, bugün `.is-today` → `--hanko` vurgu).
- **Wiring (UI cila sonrası):** `renderStreakScreen()` sonunda `renderCalendarGrid()`'ten hemen sonra çağrılır → Çalışma Takvimi ekranı her açıldığında (`showView('streak')`) tazelenir. `renderGlobalStats()`'tan **kaldırıldı** (artık dashboard'da değil). Ayrı window global / cross-ref GEREKMEZ. NOT: `renderCalendarGrid()` yalnızca `#cal-container`'ı yeniden çizer; forecast `renderStreakScreen` HTML'inde ayrı kart olduğundan ay değişimi/gün seçiminde silinmez.

### CSS (`index.html`)
- `.forecast-chart` flex satırı (`align-items:flex-end`); `.forecast-bar-track` **sabit 130px** + `padding-top:1.15rem` (yüksek çubuğun üstündeki sayı için tepe boşluğu, `box-sizing:border-box`). Çubuk `background-color:var(--jade)`, `border-radius:4px 4px 0 0`, `transition:height .3s`, `min-height:3px`. `flex:1 1 0` + `min-width:0` ile mobilde 7 sütun yatay taşmadan sığar (canlı: `overflowX:none`).

### Doğrulama
Vite preview canlı: (1) başlık + 7 sütun render (bugün=Sun vurgulu, 2 kart bugün → çubuk %100 [96px], diğerleri 0% [2px min]); (2) yeni kart dışlaması (8 kart → bugün 2); (3) `setLang('tr')` → başlık "7 Günlük Tekrar Tahmini" + etiketler "Paz,Pzt,…"; (4) Settings'e geçip dashboard'a dönünce yeniden render; (5) sayfa yatay taşması yok, konsol hatası yok.

### i18n (`src/main.js → LANG`)
1 yeni anahtar 4 dile (en/tr/ko/mn), `heatmap_more`'dan hemen sonra: `forecast_title` ("7-Day Review Forecast" / "7 Günlük Tekrar Tahmini" / "7일 복습 예측" / "7 хоногийн давталтын урьдчилсан таамаг").

## Community Hub (Market) — Deste Paylaşım & İndirme

Kullanıcıların destelerini herkese açık paylaşıp başkalarınınkini indirdiği bulut tabanlı pazar. Saf Vanilla JS + CSS, mevcut bileşen mimarisini izler.

### Şema (`supabase-schema.sql` → `community_decks`)
- **Kimlik modeli — KASITLI SAPMA:** Spec `author_id UUID FK to auth.users` istedi; uygulanmadı. Bu app Supabase Auth kullanmıyor — kimlik 6 haneli `sync_code` string'i. Bu yüzden `author_id` yerine `author_sync_code TEXT` + görüntüleme için `author_name TEXT` kullanıldı. `auth.users`'a FK koymak işlevsiz olurdu.
- **Sütunlar:** `id` (UUID, `gen_random_uuid()`), `author_sync_code`, `author_name`, `title`, `description`, `tags TEXT[]`, `deck_data JSONB`, `downloads INT`, `created_at`. İndeksler: `created_at DESC` + `author_sync_code`.
- **RLS:** SELECT herkese açık (`USING true`); INSERT yalnızca boş olmayan `author_sync_code` ile (`WITH CHECK`). **UPDATE/DELETE politikası YOK** (kasıtlı — kimse satırları keyfi değiştiremesin).
- **`increment_download_count(deck_id)` RPC — `SECURITY DEFINER` ZORUNLU:** RLS açık + UPDATE politikası olmadığından, `SECURITY INVOKER` (varsayılan) bir fonksiyonun içindeki UPDATE anon rolde RLS tarafından sessizce 0 satıra filtrelenir (RPC 204 döner ama sayaç artmaz — canlı testte yakalandı). `SECURITY DEFINER` fonksiyonu sahip olarak çalıştırıp bu tek dar işlem için RLS'i baypas eder. `SET search_path = public` definer fonksiyonunu sertleştirir. **Şema güncellendiğinde canlı DB'ye yeniden uygulanmalı** (eski INVOKER sürümü sayacı artırmaz).

### Servis katmanı (`src/services/dbService.js`)
- `publishDeckToCommunity(deckData, title, description, tags)` — `deckData.syncCode`/`authorName`/`cards` okur, `community_decks`'e INSERT eder. **Kart şeması yerel kartı birebir yansıtır** (`kanji`, `furigana`, `meaningTr`, `exampleJp`, `exampleTr`, `exampleFuriganaMap`) → indirince `makeCard()`'a 1:1 döner. **SRS state kasıtlı çıkarılır** (indiren sıfırdan başlar). NOT: Phase 2'deki ilk taslak yanlış alan adları (`front`/`back`/`example`) kullanıyordu — entegrasyonda gerçek kart alanlarıyla düzeltildi.
- `fetchCommunityDecks(limit=50, offset=0)` — `created_at DESC` sıralı, sadece metadata (`deck_data` hariç — hafif liste).
- `fetchCommunityDeck(deckId)` — tek deste, `deck_data` dahil (indirme için).
- `incrementDownloadCount(deckId)` — RPC çağrısı. Hepsi try/catch + `console.error` + re-throw.

### Bileşen (`src/components/CommunityHub.js`)
- Pattern: `init(app)` + `render()` (router girişi, `#community-content`'e basar) + spec-isimli `renderCommunityHub(container)`. Modül-içi durum makinesi: `idle/loading/ready/error`.
- `downloadDeck(deckId, btnEl)`: `fetchCommunityDeck` → `app.createDeck(title)` + `app.makeCard(...)` ile kartları yerel state'e enjekte → `app.save()`. Sayaç **best-effort** (`incrementDownloadCount(...).catch()`, await edilmez — "non-critical") + optimistik yerel +1 bump. NOT: indirmeden hemen sonra başka view'a geçmek await edilmemiş sayaç isteğini yarıştırabilir (sunucu sayacı o an kaydolmayabilir); UI optimistik bump ile tutarlı kalır.

### Yayınlama UI (`src/components/DeckList.js`)
- Her deste kartının ana btn-row'una "Publish" ghost butonu (`publishDeckModal(deckId)`).
- `publishDeckModal`: açıklama (textarea) + etiketler (virgülle, max 8) modalı. `submitPublishDeck`: `getAllCardsForDeck` (alt desteler dahil) → `app.getCommunityAuthor()` ile kimlik → `app.publishDeckToCommunity`. Boş deste/ağ hatası toast'la korunur.

### Kimlik & wiring (`src/main.js`)
- **`getCommunityAuthor()`:** Aktif `syncCode` varsa onu kimlik olarak kullanır; yoksa `localStorage['kanji_srs_community_author']`'da kalıcı anonim id (`anon-xxxx`) üretir → sync kurulmadan da yayın çalışır. `name` = `User-` + son 4 hane (PII değil).
- İkonlar: `community` (insanlar, nav), `publish` (yukarı ok). Nav'a 5. sekme `data-view="community"`. `showView` → `community` dalı `CommunityHub.render()`. Cross-ref: `app.publishDeckToCommunity`, `app.getCommunityAuthor`. Window global: `publishDeckModal`, `submitPublishDeck`, `communityDownload`, `communityRefresh`.
- **i18n:** `nav_community` + ~22 `community_*`/`toast_community_*`/`warn_community_*` anahtarı 4 dile eklendi.

### CSS (`src/index.html`)
- `.community-grid` (mobil tek sütun; `.is-electron` 768px→2, 1024px→3 sütun), `.community-card`, `.community-desc`, `.community-tags`, `.community-card-foot`, `.community-dl-count`, `.community-state`, `.community-hub-head/sub`. Mevcut `.card`/`.btn`/`.badge-soft` sınıfları yeniden kullanıldı.

## Jukugo Smart Word Modal (eski AI Mnemonik'in yerini aldı)

Kullanıcı arka yüzdeki bir **kelime bloğunu** tıklayınca, bileşik kelimeyi (jukugo) **bağlama duyarlı** olarak Gemini ile tanımlayan yeni "Word Modal" açılır + tekil kanji'lere drill-down çipleri sunar. **Eski "Generate AI Story" (mnemonik) özelliği TAMAMEN KALDIRILDI** (kullanıcı gereksiz buldu).

### Servis (`src/services/aiService.js`)
- **`generateMnemonic` + `mnemonicSystemPrompt` SİLİNDİ** (mnemonik deprecated).
- **Yeni `defineWordContextually(word, sentence, targetLang, apiKey, model)`:** `${word}`'ün `${sentence}` içindeki kullanımına göre **özlü, sözlük tarzı** çeviri/tanım (≤2 cümle) döndürür, tamamen `${targetLang}` (en/tr/ko/mn → `LANG_NAMES`) dilinde. `responseMimeType` YOK (düz metin); `WORD_SYSTEM_PROMPT` markdown/fence yasaklar; defansif olarak yine de ```` ``` ```` regex ile soyulur. `temperature: 0.4`, `maxOutputTokens: 200` (açık, cutoff önler). Boş yanıt → `'Generation failed, try again'`. Model `model || 'gemini-2.5-pro'`.
- **`LANG_NAMES` korundu:** artık `defineWordContextually` + `generateDeck` paylaşır (eski yorumdaki "mnemonik" referansı güncellendi).

### `src/components/WordModal.js` (YENİ bileşen)
- `KanjiModal.js` desenini izler: `init(app)` + `open(word, sentence)`. Paylaşılan `app.openModal` altyapısını kullanır.
- **Layout:** (1) başlık = tam `word` (`.word-detail-head`); (2) AI bölümü "🧠 Contextual Meaning" (`word_ai_meaning`) → açılışta **otomatik fetch** (`#word-ai-output` önce `msg_ai_loading` "Thinking…", sonra sonuç); (3) Kanji breakdown (`word_kanji_breakdown`) → `word` içindeki `/[一-龯]/` eşleşen her karakter için bir `<button class="kanji-chip" data-char>` çipi.
- **Settings erişimi:** Anahtar/model **click/açılış anında** `app.state.settings`'ten okunur (KanjiModal'daki eski desenle aynı; `appState.js` canlı settings export ETMEZ). Anahtar yoksa AI çıktısı **toast değil**, satıriçi `msg_ai_key_missing` mesajı gösterir (graceful). Hata → `warn_error`.
- **Çip wiring:** `openModal` senkron bastığından çipler hemen `#modal .kanji-chip` ile bağlanır (taze → leak yok); tık → `app.openKanjiModal(char)` (Word Modal'ı KanjiModal ile değiştirir). Inline onclick/window global GEREKMEZ.
- **i18n reuse:** loading/key-missing için mevcut `msg_ai_loading`/`msg_ai_key_missing` yeniden kullanıldı (yeni anahtar değil).

### Kart & Ruby render değişikliği (`CardView.js` + `kanjiUtils.js`)
- **`smartRuby(surface, reading, sentence)` — 3. arg eklendi:** Arka yüzde artık **tekil kanji `.kanji-clickable` yerine** kanji İÇEREN tüm kelime bloğu tek bir `.word-clickable` ile sarılır (`data-word`=surface, `data-sentence`=örnek cümle). İç ruby (`buildRubyInner` yardımcısına ayrıldı) kanji'yi **düz metin** basar; tıklanabilirlik artık kelime düzeyinde. Saf kana / Japonca olmayan kart → sarmalanmaz. Call-site'lar `card.exampleJp`'i sentence olarak geçer (yoksa smartRuby surface'e düşer); `updatePreview` `exJp` geçer; `DeckList.showCardPreviewModal` de güncellendi.
- **`kanjiUtils.wrapWord(contentHtml, word, sentence)` (YENİ):** `wrapKanji` yanına; verili render edilmiş HTML'i (ruby) `.word-clickable` span'e sarar, `data-*`'ları `esc`'ler. `esc` `../utils.js`'den import edilir → utils↔kanjiUtils döngüsü ama her ikisi de hoisted fonksiyon + yalnız runtime'da çağrıldığından canlı binding güvenli.
- **Click listener (`CardView.init`):** document-level delegated listener'a `.word-clickable` dalı eklendi (önce kontrol edilir): `stopPropagation` + `app.openWordModal(word, sentence)`. `.kanji-clickable` dalı korundu (örnek cümledeki tekil kanji'ler hâlâ KanjiModal açar — `highlightKanji` değişmedi). Ön yüz (`.fc-flip-front/.fc-preview-front`) hâlâ hariç.

### `KanjiModal.js` — mnemonik temizliği
- `generateMnemonic` import'u, `.ai-tutor-section` HTML bloğu (buton + çıktı), `wireAiTutor` fonksiyonu ve çağrısı **tümüyle silindi**. (Buton `index.html`'de statik değil, KanjiModal.js'de dinamik üretiliyordu → ayrı index.html temizliği gerekmedi.) Modal artık yalnız sözlük satırları + Close.

### Wiring & i18n (`src/main.js`)
- `import * as WordModal`, `WordModal.init(app)`, cross-ref `app.openWordModal = WordModal.open`.
- **i18n:** `btn_ai_story` 4 dilden **silindi** (mnemonik kaldırıldı). 3 yeni anahtar 4 dile (`msg_ai_loading`'den hemen sonra): `word_detail_title`, `word_ai_meaning` ("🧠 Contextual Meaning"), `word_kanji_breakdown`. `msg_ai_key_missing`/`msg_ai_loading` korundu (WordModal + AI Deck hâlâ kullanır).

### CSS (`index.html`)
- `.word-clickable` (pointer + `--hanko` renk + dashed alt çizgi + bold; `rt` ink-soft/normal), `.word-detail-head`, `.word-section-label`, `.word-ai-section`, `.word-ai-output`, `.kanji-chip-row`, `.kanji-chip` (yuvarlak, `--paper-2`/`--line`, hover/active). Paylaşılan `#modal` altyapısı kullanıldığından ayrı `#modal-word-detail` template'i GEREKMEDİ.

### Doğrulama
Vite preview canlı (örnek kart 漢字/かんじ, örnek 毎日漢字を勉強します。): (1) ruby satırı `.word-clickable` (`data-word="漢字"`, `data-sentence="毎日漢字を勉強します。"`, ruby korunur); örnek cümle hâlâ 6 tekil `.kanji-clickable`; (2) kelime tık → Word Modal (başlık "Word Detail", header 漢字, "🧠 Contextual Meaning", breakdown çipleri 漢/字); (3) anahtarsız → satıriçi `msg_ai_key_missing` (graceful); (4) çip 漢 tık → KanjiModal (onyomi かん), **AI Story butonu YOK**; (5) stub fetch happy-path → doğru URL (`gemini-2.5-flash:generateContent?key=…`), prompt word+sentence içerir, `maxOutputTokens:200`, fence soyulur, çıktı basılır; (6) `.word-clickable` stilleri (pointer/hanko/dashed/700) doğrulandı; konsol hatası yok. Test anahtarı localStorage'dan temizlendi. **Build temiz** (`vite build` ✓).

### Word Modal İyileştirme — Prompt formatı + truncation + örnek cümle tıklanabilirliği
Kullanıcı geri bildirimi sonrası 3 düzeltme. **Yukarıdaki bazı notları geçersiz kılar** (artık `maxOutputTokens: 500`; örnek cümle artık `.kanji-clickable` değil `.word-clickable`).

1. **Truncation + prompt formatı (`aiService.js → defineWordContextually`):** `maxOutputTokens` `200 → 500` (Türkçe/Korece gibi uzun dillerde bağlam cümlesi yarıda kesiliyordu). Prompt artık **kesin format** dayatır: `**[Doğrudan çeviri]** - [bağlamı açıklayan tek kısa cümle]`. `WORD_SYSTEM_PROMPT` "sadece açıklama yapma; ÖNCE doğrudan, en yaygın çeviriyi `**bold**` içinde, sonra tire, sonra kısa bağlam" der. `**bold**` artık **kasıtlı** (sistem prompt'u eski "markdown yasak" kuralı yerine yalnızca `**çeviri**` formatına izin verir, fence/başlık/liste hâlâ yasak). ```` ``` ```` fence soyma korundu (`**` korunur).
2. **Bold render (`WordModal.js → fetchMeaning`):** Başarılı yanıt artık `out.textContent` değil `out.innerHTML = esc(meaning).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')` → `**çeviri**` gerçek `<strong>` olur. **XSS güvenli:** önce `esc`, sonra bold regex (canlı testte `<img onerror>` enjeksiyonu `&lt;img…&gt;` olarak kaçıldı, DOM'a tag girmedi). Format gelmezse düz kaçışlı metne zarif düşer. loading/key-missing/error hâlâ `textContent`.
3. **Örnek cümle kelimeleri tıklanabilir (`utils.js → highlightKanji`):** **BLUEPRINT SAPMASI (öncül yanlış doğrulandı):** Task "örnek cümle kanjileri düz metin, tıklanamaz" dedi + basit regex `makeSentenceClickable` istedi. Gerçekte örnek cümle zaten `highlightKanji` ile **furigana ruby + `.kanji-clickable`** (tekil kanji → KanjiModal) render ediliyordu; basit regex furigana'yı yok ederdi (regresyon). Bunun yerine `highlightKanji` yükseltildi: kanji İÇEREN **kelime blokları** artık `.word-clickable` ile sarılır (→ Word Modal, `data-sentence`=tüm cümle) ve **furigana ruby korunur**. furiganaMap kelimeleri ruby+word-clickable; map dışı artık kanji koşusu (+okurigana/kana) `KANJI_BLOCK` regex'iyle gruplanır; kartın hedef kelimesi `.hl` vurgusunu korur (artık `word-clickable hl`). `wrapKanji` import'u `utils.js`'den kaldırıldı (artık kullanılmıyor); örnek cümlede tekil `.kanji-clickable` ÜRETİLMEZ (KanjiModal'a Word Modal breakdown çipleri üzerinden erişilir).
   - **`data-sentence` ENJEKSİYON SIRASI (kritik):** Cümle metni, üzerinde split yaptığımız kelimeleri **içerdiğinden**, `data-sentence`'ı kelime-sarma sırasında basmak sonraki split'leri bozardı. Çözüm: tüm `.word-clickable` blokları kurulduktan SONRA **tek bir final pass** ile her açılış tag'ine `data-sentence` damgalanır (bundan sonra metin split'i YOK). `data-word` ise blueprint'in eski `data-kanji` (tek karakter) yaklaşımından **daha güvenli** çünkü tam kelime tutar (disjoint segment).
   - Üç çağrı yeri de (study back, review back, `DeckList.showCardPreviewModal`) aynı `highlightKanji`'yi kullandığından otomatik kapsanır. `CardView.init` listener'ı zaten `.word-clickable`'ı yakalıyordu (değişmedi).

**Doğrulama (Vite preview canlı + Node regex testi):** (1) örnek `毎日漢字を勉強します。` → 2 `.word-clickable` blok (`毎日漢字` ruby まいにちかんじ + `勉強` ruby べんきょう), 0 `.kanji-clickable`, ruby korunur, span/ruby dengeli; (2) örnek kelime tık → Word Modal (header `毎日漢字`, breakdown çipleri 毎/日/漢/字, `data-sentence` tam cümle); (3) stub fetch happy-path → `maxOutputTokens:500`, prompt word+cümle içerir, model `gemini-2.5-pro`; (4) `**Departure**` → `<strong>Departure</strong>`, `<img onerror>` kaçıldı (XSS yok); (5) Node testi 7 senaryoda (map'li/map'siz/okurigana/özel karakter/kanjisiz) HTML dengeli; konsol hatası yok; **build temiz**. Test anahtarı localStorage'dan geri alındı.

## AI Thematic Deck Generator (Gemini)

Kullanıcının bir konu (topic) yazıp **10 kartlık** komple bir desteyi tek tıkla AI ile ürettiği özellik. Mevcut Gemini entegrasyonunu (`geminiApiKey`/`geminiModel` ayarları) ve `app.createDeck`/`app.makeCard` boru hattını yeniden kullanır. Çekirdek FSRS motoru ve sync akışları **dokunulmadı**.

### `src/services/aiService.js` → `generateDeck(topic, targetLang, apiKey, model)`
- **Parse'i serviste yapar, dizi döner:** `[{ word, furigana, meaning, exampleJp, exampleTranslation }]` (10 nesne). UI sadece tüketir.
- Prompt Gemini'ye **yalnızca ham JSON dizisi** döndürmesini söyler; `meaning`/`exampleTranslation` `targetLang` (UI dili: en/tr/ko/mn → `DECK_LANG_NAMES`) dilinde yazılır.
- **Markdown güvenliği (çift savunma):** (1) `generationConfig.responseMimeType: 'application/json'` modeli JSON'a zorlar; (2) yine de ```` ```json ```` sarması gelirse regex ile temizlenir (`^```(json)?` + `\s*```$`); (3) `JSON.parse` patlarsa son çare `text.match(/\[[\s\S]*\]/)` ile ilk `[...]` bloğu kurtarılır. Hepsi başarısızsa `'AI returned malformed JSON'` fırlatır.
- Model fallback: `model || 'gemini-2.5-pro'` (migrate default ile aynı). `maxOutputTokens: 2048` (10 kart sığsın).

### `src/components/DeckList.js` → `showAiDeckModal()` + `submitAiDeck()`
- Tetikleyici: Add Card view'ında **Bulk Import altında** yeni "Generate AI Deck" bölümü (`#btn-ai-deck`, `data-t="btn_ai_deck"` → "✨ AI Deck"). `main.js`'de `addEventListener` ile bağlı (btn-bulk-import gibi). Modal submit butonu `onclick="submitAiDeck()"` → window global.
- `showAiDeckModal`: tek input (topic) + submit/cancel. Enter ile submit. `#ai-deck-topic` autofocus.
- `submitAiDeck` (async): boş topic → `warn_required`; anahtar yoksa → `msg_ai_key_missing` (KanjiModal ile aynı erişim: **click anında** `app.state.settings.geminiApiKey`). Üretim sırasında buton disable + `ai_generating` ("Generating..."). Başarıda: `app.createDeck(topic + " (AI)")` → kartlar `app.makeCard(word, furigana, meaning, exampleJp, exampleTranslation, {})` ile desteye push → `app.save()` → `renderDeckList()` + `renderGlobalStats()` + `toast_ai_deck_success`.
- **BLUEPRINT SAPMASI (doğrulandı):** Görev `const deckId = app.createDeck(...)` yazdı; ama `createDeck` **deste nesnesi** döner (id değil) ve içinde zaten `save()` çağırır. Kod deste nesnesini kullanıp `deck.cards.push(...)` yapar. (Memory: harici blueprint'ler kod denetiminde doğrulanmalı.)
- **Hata dayanıklılığı:** Tüm üretim `try/catch` içinde; `JSON.parse` hatası veya ağ kopması → `warn_error` toast + buton eski metnine/enable'a geri döner, modal açık kalır (kullanıcı tekrar deneyebilir). Boş/word'süz satırlar atlanır; hiç kullanılabilir kart yoksa hata fırlatılır.

### i18n (`src/main.js` → `LANG`)
5 yeni anahtar 4 dile (en/tr/ko/mn), `msg_ai_loading`'den hemen sonra: `btn_ai_deck`, `modal_ai_deck_title`, `ai_deck_placeholder`, `ai_generating`, `toast_ai_deck_success` ({count} interpolasyonu). Mevcut `warn_required`/`warn_error`/`msg_ai_key_missing` yeniden kullanıldı.

### Doğrulama
Vite preview'da canlı test edildi (stub `fetch` + geçici test anahtarı): (1) buton + bölüm render olur, modal açılır (başlık/placeholder/butonlar doğru); (2) happy path — ```` ```json ```` sarmalı yanıt → fence temizlenir, doğru URL (model+key), deste "X (AI)" + 2 kart `makeCard` alanlarına 1:1 maplenir, modal kapanır, success toast; (3) malformed JSON → `warn_error` toast + buton restore + deste değişmez; (4) boş topic → `warn_required`. Test desteleri + enjekte edilen test anahtarı localStorage'dan temizlendi (key boş stringe geri alındı).

## Katlanabilir Alt Desteler + Kart Önizleme Modalı (`DeckList.js`)

Deste listesi UX iyileştirmesi: (1) iç içe alt desteleri chevron ile gizle/göster, (2) kart listesinde satıra tıklayınca statik flashcard önizlemesi. Saf Vanilla JS.

### Katlanabilir desteler (collapse/expand)
- **`main.js` ICONS:** `chevron_down` (`M6 9l6 6 6-6`) + `chevron_right` (`M9 6l6 6-6 6`) eklendi (mevcut `chevL`/`chevR`'den ayrı — bunlar dikey/yatay açılım için).
- **`DeckList.js` modül-içi `const collapsedDecks = new Set()`:** Collapse edilen üst destelerin id'lerini tutar. **Kalıcı değil** (oturum-içi UI durumu, state'e/localStorage'a yazılmaz; reload sıfırlar). Silinen destenin stale id'si Set'te kalabilir → zararsız (eşleşen deste yok).
- **`hasCollapsedAncestor(deck)`:** `parentId` zincirini yukarı yürür; herhangi bir ata `collapsedDecks`'te ise `true` → o deste **ve tüm alt ağacı** render'da atlanır (`continue`). `findDeck` `undefined` dönerse döngü kırılır (güvenli).
- **`renderDeckList()` `.map` → `for` döngüsüne çevrildi** (`continue` ile atlama için). Çocuğu olan destelere: chevron toggle butonu (`.deck-collapse-btn`, collapsed → `chevron_right`, expanded → `chevron_down`) + başlık yanında `.badge-soft .deck-sub-badge` ("N sub-decks", mevcut `sub_decks_count` anahtarı). `subInfo` deck-meta metninden kaldırıldı (artık badge).
- **`toggleDeckCollapse(deckId)` (export + window global):** `collapsedDecks.has(id) ? delete : add` → `renderDeckList()`. Inline `onclick="event.stopPropagation();toggleDeckCollapse(...)"` (deck-row openDeck'i tetiklemesin). Drag&drop/long-press `.deck-draggable`'a bağlı; gizli çocuklar render edilmediğinden etkilenmez.

### Kart önizleme modalı
- **`cardListItemHTML`:** `.card-list-item`'a `clickable-row` sınıfı + `onclick="showCardPreview(deckId,cardId)"` + `role="button"`/`tabindex=0`. Edit/Delete butonlarına `event.stopPropagation();` eklendi (önizlemeyi tetiklemesin). Mastered liste satırları da tıklanabilir oldu (tutarlı).
- **`showCardPreview(deckId, cardId)` (export + window global):** kartı bulup `showCardPreviewModal(card)` çağırır.
- **`showCardPreviewModal(card)` (export):** `app.openModal` ile **statik iki yüzlü** önizleme — grade/"Show answer" butonu YOK. Çalışma ekranıyla aynı sınıflar (`.flashcard`/`.fc-kanji`/`.fc-back`/`.fc-ruby`/`.fc-meaning`/`.fc-example`/`.fc-exampletr`). Ön yüz: `wrapKanji(esc(kanji))` (Japonca) + `fc-preview-front` sınıfı → hanko renkli, tıklanamaz (document listener `.fc-preview-front`'u dışlar + CSS `pointer-events:none`). Arka yüz: `smartRuby(kanji, furigana)` + `highlightKanji(exampleJp, kanji, exampleFuriganaMap)` → arka kanji'ler `.kanji-clickable` (KanjiModal açar, çalışma görünümüyle aynı). Kapat butonu (`close` anahtarı).
- **Reuse:** `smartRuby` + `kanjiSizeClass` artık `CardView.js`'den **export** edilir; `DeckList.js` bunları + `highlightKanji` (utils) + `wrapKanji`/`isJapaneseCard` (kanjiUtils) import eder. Döngüsel import yok (CardView, DeckList'i import etmez).

### CSS (`index.html`)
- `.card-list-item.clickable-row` (cursor/hover `--paper-2`/active scale); `.deck-collapse-btn` (30px, soluk); `.deck-sub-badge`.
- `.card-preview-modal` (flex column, gap) + scoped `.flashcard`/`.fc-preview-front` override (`min-height:140px`, `max-height:none`, kompakt padding); `.card-preview-modal .fc-kanji` font küçültme + ön yüz `--hanko` rengi.

### i18n (`src/main.js` → `LANG`)
3 yeni anahtar 4 dile (en/tr/ko/mn), `sub_decks_count`'tan hemen sonra: `collapse_decks`, `expand_decks`, `card_preview_title`. Mevcut `sub_decks_count`/`close` yeniden kullanıldı.

### Doğrulama
Vite preview'da canlı test edildi (3 katmanlı test ağacı eval ile kuruldu): (1) chevron + folder + "N sub-decks" badge render; (2) alt deste collapse → torun gizlenir + chevron `chevron_right`'a döner; (3) kök collapse → tüm alt ağaç gizlenir; (4) kök expand → çocuklar döner ama torun gizli kalır (collapse durumu deste-bazında korunur); (5) kart satırına tık → 2 yüzlü önizleme (ön hanko kanji, arka ruby/anlam/örnek+çeviri, 8 tıklanabilir arka kanji, grade butonu YOK, sadece Close); (6) Edit butonu → "Edit card" modalı (önizleme açılmaz — stopPropagation); (7) `setLang('tr')` → "2 alt deste"/"Alt desteleri gizle"/"Kart Önizleme"/"Kapat". Konsol hatası yok. Test desteleri localStorage'dan temizlendi.

## %100 Otomatik Arka Plan Furigana Üretimi

Kullanıcı Furigana alanını **tamamen yok sayıp** Save'e basabilir; sistem kayıt/import anında offline kuromoji parser ile sessizce üretir → Ruby yine de doğru render olur. (Karmaşık/uzun, Romaji+Katakana+Kanji+Hiragana karışık dizelerde elle Furigana yazma zahmetini kaldırır.)

### `generateFurigana` karışık dize sertleştirmesi (`src/utils/furiganaParser.js`)
- **Sorun:** Eski `tokens.map((tk) => tokenReading(tk) || tk.surface_form)` her token'ın okumasını `kataToHira` ile hiragana'ya çeviriyordu → **katakana token'lar da** hiragana'ya dönüyordu (セキュリティ → せきゅりてぃ). `smartRuby` (CardView) katakana koşusunu kana (type `h`) sayıp okumadan `indexOf` ile eşler; okuma katakana içermezse hizalama **bozulur** (sonraki kanji yanlış okuma alır).
- **Düzeltme (tek satır):** `tokens.map((tk) => hasKanji(tk.surface_form) ? (tokenReading(tk) || tk.surface_form) : tk.surface_form)`. **Yalnızca kanji içeren token** hiragana okumaya çevrilir; katakana, hiragana, latin harfler ve semboller **olduğu gibi** korunur. Pür-kana/katakana/latin kelimeler için `generateFurigana` zaten erken `''` döner (`!hasKanji(input)` guard'ı, tokenizer yüklenmez).
- **Canlı doğrulama (eval):** `http→セキュリティ機能が付加された版` → `http→セキュリティきのうがふかされたばん`; `iPhone版を購入` → `iPhoneばんをこうにゅう`; `コーヒー` → `''`; `勉強` → `べんきょう`. `smartRuby` çıktısı: 版→ばん, 購入→こうにゅう (rt), `iPhone`/`を` düz metin.

### Kayıt/Edit/Import yakalama (`src/components/DeckList.js`)
- **`autoFurigana(furigana, word)` yardımcısı (modül-içi, async):** `furigana` doluysa dokunmaz; boşsa `await generateFurigana(word)` (try/catch → hata/parser-hazır-değil durumunda `''`, kayıt **asla** engellenmez).
- **`saveCard` / `saveCardFromModal` / `saveEditCard` → `async`:** Validasyon + `findDeck`'ten **sonra**, `makeCard`/atamadan **hemen önce** `furigana = await autoFurigana(...)`. `furigana` `const`→`let`. Bu, debounce'lu `setupFuriganaAssist` (600ms) henüz çalışmadan kullanıcı hızla Save'e basarsa devreye giren **garanti fallback**'tir.
- **`bulkImport` → `async`:** `for...of` döngüsü; her satırda `furigana` her zaman offline oto-üretilir. **Pipe formatı UI cila ile sadeleştirildi (bkz. "UI Cila" bölümü):** eski `Word | Furigana | Meaning | …` yerine artık `Word | Meaning | Example JP (ops) | Example TR (ops)` (`parts[0]=kanji, [1]=meaning, [2]=exJp, [3]=exTr`; `furigana = await autoFurigana('', kanji)`). Sıralı işlenir (crash yok). Buton `try/finally` ile kilitlenir + `ai_generating` ("Generating…") gösterir (çift gönderim engeli), sonunda eski etikete döner.
- **Async wiring güvenli:** Tüm bu fonksiyonlar inline `onclick` / `addEventListener` ile çağrılır (fire-and-forget); async dönüş promise'i sorun çıkarmaz.

### UI Polish
- **Placeholder:** Yeni i18n anahtarı `furigana_auto_placeholder` 4 dile (`furigana_placeholder`'dan hemen sonra): en "Leave blank for auto-generation" / tr "Otomatik oluşturmak için boş bırakın" / ko "자동 생성하려면 비워 두세요" / mn "Автоматаар үүсгэхийн тулд хоосон үлдээнэ үү". **NOT (UI cila):** `#add-furigana` ve `#modal-add-furigana` alanları sonradan **tamamen kaldırıldı** (bkz. "UI Cila" bölümü); placeholder anahtarı yalnızca `#edit-furigana`'da kalan manuel override alanı için kullanılır.
- **`*` kaldırıldı:** Add-card modalindeki Furigana label'ından yanıltıcı `<span class="required">*</span>` çıkarıldı (alan artık opsiyonel/oto — add-form view'ı zaten `*`'sizdi).

## UI Cila — Forecast Taşıma, Önizleme Boyut Düzeltmesi, Add-Card Furigana Kaldırma

Furigana artık %100 oto-üretildiğinden ve dashboard sadeleştirilmek istendiğinden 3 UI cila değişikliği. Çekirdek FSRS motoru ve sync akışlarına dokunulmadı. Vite preview'da canlı doğrulandı (eval + screenshot).

### 1. Forecast grafiği Çalışma Takvimine taşındı
- **`index.html`:** `view-decks`'teki statik `<div class="card" id="forecast-chart-container">` **kaldırıldı** (artık dashboard'da değil).
- **`Analytics.js`:** `renderGlobalStats()` içindeki `renderForecastChart()` çağrısı **silindi**. `renderStreakScreen()` HTML'ine `#cal-container`'dan hemen sonra `<div class="card" id="forecast-chart-container">` eklendi; `renderCalendarGrid()`'ten hemen sonra `renderForecastChart()` çağrılır. (Ayrıntı + neden: yukarıdaki "7 Günlük Tekrar Tahmini" bölümü güncellendi.)
- **Doğrulama:** dashboard'da forecast yok; `showView('streak')` → takvim grid'inin altında "7-Day Review Forecast" + 7 sütun (bugün/Mon `--hanko` vurgulu). Konsol hatası yok.

### 2. Kart Önizleme Modalı dev-font bugı (CSS özgüllük çakışması)
- **Kök neden:** `showCardPreviewModal()` zaten `kanjiSizeClass(card.kanji)` ile `.fc-kanji-sm/-xs` sınıfını uyguluyordu (JS doğruydu). Ama `index.html`'de `.card-preview-modal .fc-kanji { font-size: clamp(3rem,16vw,5rem) }` (2 sınıf özgüllüğü) ile küçültücü `.fc-kanji.fc-kanji-sm/-xs` kuralları (yine 2 sınıf) **eşit özgüllükte** olduğundan, kaynak sırasında geride kalan küçültücüler eziliyordu → uzun metin modalda devasa kalıyordu.
- **Düzeltme (`index.html`, sadece CSS):** Modal kapsamlı (3 sınıf özgüllüklü) override eklendi: `.card-preview-modal .fc-kanji.fc-kanji-sm { clamp(1.5rem,8vw,2.6rem) }` + `.fc-kanji-xs { clamp(1rem,5vw,1.5rem) }`. `overflow-wrap:anywhere; word-wrap:break-word` zaten base `.fc-kanji`'de mevcut (miras alınır).
- **Doğrulama (computed font-size):** base 80px, sm 41.6px, xs 24px (kademeli küçülme); `overflowWrap:anywhere`. Düzeltme öncesi üçü de 80px olurdu.

### 3. Furigana alanı Add-Card akışlarından kaldırıldı (yalnız Edit'te kalır)
- **`index.html`:** `view-add` ADD CARD bölümündeki Furigana `<input id="add-furigana">` form-group'u silindi. Bulk import textarea placeholder'ı yeni formata güncellendi (`漢字 | kanji | 例文 | translation`).
- **`DeckList.js`:**
  - `showAddCardModal`: `#modal-add-furigana` form-group'u + `setupFuriganaAssist('modal-add-kanji','modal-add-furigana')` çağrısı + keydown forEach'teki `'modal-add-furigana'` kaldırıldı.
  - `renderAddForm` + `showAddCardModal`: kaldırılan `setupFuriganaAssist` çağrısının yaptığı **tokenizer ön-ısıtma** kaybolmasın diye yerine doğrudan `warmupFurigana()` eklendi.
  - `saveCard` / `saveCardFromModal`: kaldırılan alanı okuyan satırlar `let furigana = ''` ile değiştirildi (kayıt anında `autoFurigana` zaten oto-üretir); ilgili `.value = ''` reset satırları silindi (null-ref crash önlendi).
  - `bulkImport`: yeni 4-alanlı parse (madde 1'deki format), `furigana = await autoFurigana('', kanji)`.
- **`main.js`:** Add-form Enter-key forEach dizisinden `'add-furigana'` çıkarıldı (opsiyonel-zincir zaten güvenliydi, temizlik). `bulk_format` i18n anahtarı 4 dilde sadeleştirildi: "Format: Word | Meaning | Example JP (opt) | Example TR (opt)".
- **Edit modalı korundu:** `showEditModal` → `#edit-furigana` (manuel override fallback) + `setupFuriganaAssist('edit-kanji','edit-furigana')` dokunulmadı.
- **Doğrulama:** add-form/add-modal'da furigana input yok (kanji+meaning var, açılış crash yok); edit-modal'da furigana var (auto placeholder'lı); bulk hint yeni formatı gösterir.

## Regression Düzeltmeleri — smartRuby Furigana, AI Fallback Kaldırma, Kart Önizleme Temizliği

Kullanıcı 3 regresyon bildirdi (kanji/kelime tık "bozuldu", AI fallback hata veriyor, önizleme "bozuk"). Canlı Vite preview ile kök neden doğrulandı; **iki premise yanlış çıktı** ([[feedback-verify-external-blueprints]] kuralının devamı). Çekirdek FSRS motoru ve sync akışları **dokunulmadı**. Build temiz (`vite build` ✓, 51 modül).

### 1. Tık olayları "bozuldu" → gerçek neden: `smartRuby` token yolu furigana düşürüyordu (`CardView.js`)
- **PREMISE YANLIŞ:** Görev "listener'lar elemana doğrudan bağlı, delegasyon bozuk" dedi. Gerçekte `CardView.init` zaten **document-level tek delegasyon** (boot'ta bir kez eklenir, `kanjiListenerAdded` guard'lı). Canlı testte tık olayları deste değiştirince, modal açıp kapatınca, kanji-chip drill-down sonrası **kesintisiz çalışıyor** — delegasyon sağlam. `Search.js`/`TestView.js` kanji/word clickable üretmiyor; başka doğrudan-bağlı listener YOK.
- **GERÇEK REGRESYON (v2.3.1):** `smartRuby`'nin kuromoji token yolu — tokenizer **hazır olduğunda** (ilk deste sonrası arka planda yüklenir → "başka desteye geçince" tetiklenir) — `rawSegs`'i token uzunluğuna göre dilimliyordu. Çok-token'lı kanji koşularında (`毎日漢字`→`毎日`+`漢字`, `日本語能力試験`→3 token) `seg.html` yalnız `segOffset===0` iken basıldığından **furigana okuması tamamen düşüyordu** (canlı: `日本語能力試験` → 0 ruby; `毎日漢字を勉強します` → yalnız 勉強). Tıklanabilirlik korunuyordu ama desync/`tokenize` throw senaryosunda boş `.word-clickable` ya da render çökmesi mümkündü (→ "tık çalışmıyor" algısı).
- **DÜZELTME:** Token yolu yeniden yazıldı (`rawSegs` dilimleme tamamen kaldırıldı). Her **kanji token'ı KENDİ okumasını doğrudan kuromoji'den alır** — `tok.reading` (katakana) → `kataToHira` (furiganaParser'dan yeni import). 3 katmanlı güvenlik: (a) tokenizer yok → tek blok `wrapWord` (rawSegs, okuma korunur); (b) `tokenize` throw → try/catch ile tek bloğa düş (render çökmez); (c) tek token → çağıranın verdiği `reading`'i (kart furiganası = doğruluk kaynağı) kullan. Çok token → her kanji token ayrı `.word-clickable` + `buildRubyInnerRaw(tokText, kataToHira(tok.reading))`. Bilinmeyen kelime (`reading==='*'`) → okumasız düz metin (yine tıklanabilir).
- **Doğrulama (canlı):** `毎日漢字を勉強します`→3 ruby (毎日/漢字/勉強), `日本語能力試験`→3 ruby, `持ち帰る`→2 ruby (okurigana hizalı), `iPhone版を購入`→版/購入 ruby; hiçbir boş clickable yok, HTML dengeli; study R1+R2 (tokenizer ready) + önizleme arka yüz tık → Word Detail açılır.

### 2. AI fallback/retry tamamen kaldırıldı (`aiService.js`)
- **Sorun:** API `gemini-1.5-flash-8b` fallback model'ini reddediyordu. `FALLBACK_MODEL`, `RETRY_DELAY_MS`, `isRetryableError`, `fetchWithRetry` (2 denemeli: kullanıcı modeli → fallback model, 1.5s bekleme) **tümüyle silindi**.
- **Yerine `geminiRequest(model, apiKey, body)`:** **Tek** istek, kullanıcının seçtiği model. `!res.ok` → API'nin **native** hata mesajı (`errBody.error.message`) fırlatılır (eski generic "servers overloaded" mesajı yok). Çağıranlar (`WordModal.fetchMeaning`, `DeckList.submitAiDeck`) zaten try/catch'li → hata UI'a doğal yansır. `defineWordContextually` + `generateDeck` çağrı yerleri `geminiRequest`'e çevrildi (imzalar değişmedi).
- **Doğrulama (stub fetch):** başarı → 1 çağrı, URL'de `gemini-2.5-flash`; 503 (eskiden retryable) → **tam 1 çağrı**, yalnız seçili model (fallback id YOK), `'Model is overloaded'` (native mesaj) fırlatılır.

### 3. Kart Önizleme Modalı temizliği (`DeckList.js` + `index.html`)
- **PREMISE KISMEN YANLIŞ:** Görev "bozuk/stilsiz" dedi; canlı testte aslında **düzgün render oluyordu** (önceki "bozuk" ekran görüntüsü preview aracının 2x zoom artefaktıydı). Ama gerçek **cruft** vardı: tanımsız `.cpm-face` sınıfı + add-form'dan ödünç `.fc-preview-front` sınıfı (yanlış semantik, `max-height:40vh` taşır).
- **DÜZELTME:** `showCardPreviewModal` çalışma cevabı kartıyla **birebir** `.flashcard` + `.fc-back` yapısına çevrildi. Ön yüz artık **düz metin** `esc(card.kanji)` (eski `wrapKanji` + listener-dışlama bağımlılığı kaldırıldı → `.kanji-clickable` üretmez, doğal olarak tıklanamaz) `.cpm-front` sınıfıyla; arka yüz `smartRuby`/`highlightKanji` ile tıklanabilir kalır. `wrapKanji`/`isJapaneseCard` import'u DeckList'ten kaldırıldı (artık kullanılmıyor).
- **CSS:** `.card-preview-modal .flashcard, .fc-preview-front` override → sade `.card-preview-modal .flashcard { min-height:150px; margin-bottom:0 }` (arka plan/kenarlık/gölge/padding base `.flashcard`'tan miras → study'yle aynı). Ön kanji: `.card-preview-modal .cpm-front .fc-kanji { color:var(--hanko); font-weight:700 }`. `fc-kanji-sm/-xs` 3-sınıf override'ları korundu.
- **Doğrulama (canlı + screenshot):** ön kart bg=`var(--card)`, border 0.8px, radius 14px, shadow, minH 150px; ön kanji hanko+700, 0 clickable; arka 3 word-clickable (tık→Word Detail); uzun metin `fc-kanji-sm` ile küçülür; çalışma kartıyla görsel birebir.

## Native Uygulama UX — Modal Geri Navigasyonu, Scroll Kilidi, Oturum Korunması

SPA'yı gerçek bir native uygulama gibi hissettirmek için 4 UX iyileştirmesi. Çekirdek FSRS motoru ve sync/save akışlarına **dokunulmadı**. Vite preview'da (desktop + mobile viewport) canlı doğrulandı; build temiz (`vite build` ✓, 51 modül). **İki premise yine yanlış çıktı** ([[feedback-verify-external-blueprints]] kuralının devamı — bkz. madde 3 & 4).

### 1. Kanji Modal geri navigasyonu + Word Modal önbelleği (`KanjiModal.js` + `WordModal.js`)
- **MİMARİ GERÇEK (premise düzeltmesi):** Task "Word Modal DOM'unu `display:none` ile gizle, KanjiModal'ı ayrı eleman olarak göster" dedi. Ama bu app'te **tek paylaşılan modal** var (`#modal-bg`>`#modal`>`#modal-title`+`#modal-body`); `openModal(title, html)` `#modal-body.innerHTML`'i ezer → gizlenecek ayrı "Word Modal elemanı" YOK. Bu yüzden hedef niyet (geri dönünce AI'ı yeniden çağırma) **render'lanmış AI çıktısını önbelleğe alıp geri yükleyerek** sağlandı.
- **`KanjiModal.open(kanji, opts = {})`:** 2. arg eklendi. `opts.onBack` bir fonksiyonsa, modal başlığının sol üstüne `.modal-back-btn` (← `chevL` ikonu, `aria-label=back`) basılır ve `onBack`'e bağlanır (openModal senkron bastığından hemen wire edilir). Eski tek-arg çağrılar (`app.openKanjiModal(char)`) `opts={}` → onBack null → **geri butonu yok** (geri uyumlu, regresyon yok).
- **`WordModal.open(word, sentence, cachedMeaningHtml = null)`:** 3. arg eklendi. `cachedMeaningHtml` verilirse `#word-ai-output`'a olduğu gibi yazılır ve **`fetchMeaning` ATLANıR** (AI/Gemini yeniden çağrılmaz). `wireChips(word, sentence)`: bir kanji çipine tıklayınca mevcut `#word-ai-output.innerHTML` önbelleğe alınıp `openKanjiModal(char, { onBack: () => open(word, sentence, cached) })` ile geçilir.
- **i18n:** `back` anahtarı 4 dile (`close`'dan hemen sonra): en `Back` / tr `Geri` / ko `뒤로` / mn `Буцах`.
- **CSS (`index.html`):** `.modal-back-btn` (absolute top-left, 34px, transparan, hover `--paper-2`). `#modal` zaten `position:relative` → buton köşeye konumlanır. `#modal:has(.modal-back-btn) > #modal-title { padding-left: 2.4rem }` → buton varken başlık sağa kayar, çakışma olmaz (`:has()` modern Chromium/Electron'da destekli).
- **Doğrulama (canlı, fetch stub + sahte API key):** kelime tık → Word Detail (AI çıktısı `<strong>...</strong>`, **1** Gemini çağrısı) → çip tık → Kanji Detail (**geri butonu var**, hâlâ 1 çağrı) → geri tık → Word Detail önbellekten geri gelir (aynı çıktı, **hâlâ 1 çağrı = refetch YOK**, çipler yeniden bağlı). Screenshot: ← başlığın solunda, çakışma yok.

### 2. Mobil scroll kilidi (`index.html` + `main.js`)
- **CSS:** `body.study-mode-active { overflow: hidden !important; overscroll-behavior-y: none !important; }` → mobilde kart sürüklerken elastik viewport zıplaması (overscroll bounce) engellenir.
- **Toggle (`main.js → showView`):** `document.body.classList.toggle('study-mode-active', name === 'study')`. **BLUEPRINT SAPMASI (gerekçeli):** Task sınıf yönetimini CardView mount/unmount'ında istedi; ama `showView` view geçişlerinin TEK kesişim noktası → sınıf burada toggle edilince herhangi bir view'a (alt nav dahil) çıkışta **garanti kalkar** (CardView'da takılı kalma riski yok). Yalnız `study` (review değil — review'de alt prev/next butonları var, kilit onları kesebilir).
- **Doğrulama (mobile 375×812):** study öncesi `overflow:visible`; study'de `study-mode-active`+`overflow:hidden`+`overscroll-behavior-y:none`; alt nav ile çıkınca sınıf kalkar, scroll geri gelir.

### 3. Çalışma oturumu korunması (`CardView.js` + `main.js`)
- **PREMISE YANLIŞ:** Task "sekme değiştirince review kuyruğu yok ediliyor" dedi. Gerçekte modül-seviyesi `studyQueue`/`studyCardIndex`/`studyDoneToday`/`studyShowingBack` **zaten bellekte kalıcı** (modül reload olmaz). Asıl bug: `startStudy()` her girişte kuyruğu **yeniden kurup index'i sıfırlıyordu** → deck'e tekrar girince oturum baştan başlıyordu.
- **`let activeSession = null` ({ deckId, masteredOnly }):** Mevcut in-memory kuyruğun hangi deste/kapsama ait olduğunu işaretler. `startStudy`: `activeSession.deckId === deckId && activeSession.masteredOnly === masteredOnly && studyQueue.length && studyCardIndex < studyQueue.length` ise **RESUME** (kuyruk/konum korunur, yeniden kurulmaz); aksi halde taze kurar + `activeSession` günceller. Farklı deste/kapsam → otomatik overwrite (deckId/masteredOnly eşleşmez).
- **Temizleme (KRİTİK ayrım):** `activeSession = null` yalnızca (a) kuyruk bitince (`renderStudy` "session complete" dalı) veya (b) `clearStudySession()` export'u — çalışma ekranı topbar **geri tuşundan** (`main.js btn-back` handler'ı `currentView === 'study'` iken çağırır). **Alt nav sekmesiyle gezinme ASLA temizlemez** → oturum korunur. Resume guard'ı ayrıca `studyCardIndex < studyQueue.length` kontrol ettiğinden biten oturum çifte korumayla taze kurulur.
- **Doğrulama (canlı):** start `0/8` → 3 Easy → `3/8` → alt-nav çıkış + tekrar giriş = **`3/8` RESUME** → topbar geri + tekrar giriş = **`0/5` REBUILD** (3 mezun kart yeni kuyrukta hariç).

### 4. Add Card + Search taslakları — ZATEN KARŞILANIYOR (premise yanlış, kod eklenmedi)
- **PREMISE YANLIŞ:** Task "yarım kart yazıp / arama yapıp sekme değişince inputlar siliniyor; `AddCard.js`'de modül-seviyesi `draft` objesi + `Search.js`'de query/sonuç önbelleği ekle" dedi. **Canlı testte ikisi de zaten korunuyor:**
  - **Add Card:** `AddCard.js` diye bir dosya **YOK** (add akışı `DeckList.js`'de). `view-add` **statik HTML**; `showView` yalnız `.active` class'ı toggle eder, inputları **silmez** → yazılan değerler sekme değişiminde DOM'da kalır (canlı: `persisted: true`).
  - **Search:** `Search.js`'de `currentQuery`/`currentFilter` zaten **modül-seviyesi**; `renderView()` dönüşte `input.value`/`filter.value`'ya geri yazıp `executeSearch()` çağırır → query + sonuçlar (state'ten yeniden türetilir) geri gelir (canlı: `queryPersisted: true`, `resultsPersisted: true`).
- **KARAR:** Redundant `draft` objesi eklenmedi — statik DOM + mevcut modül-state zaten native davranışı sağlıyor; eklemek over-engineering + clear-on-save mantığıyla çakışma/regresyon riski olurdu.

## Dopamine Update (v2.5.0) — 4 Yönlü Kaydırma, Haptik, Mikro-Etkileşim, Konfeti

Çalışma deneyimini "native oyun" hissine yükselten 4 özellik. Çekirdek FSRS `gradeCard`/`applySRS` akışı ve sync **dokunulmadı** — kaydırma yalnızca mevcut `gradeCard(grade)`'i tetikler. Tüm animasyonlar **GPU-hızlandırmalı** (yalnız `transform` + `opacity`). Vite preview'da canlı doğrulandı (eval tabanlı); build temiz (`vite build` ✓, 52 modül).

### 1. 4 Yönlü Kaydırma Fiziği + FSRS eşlemesi (`CardView.js` → `initSwipeGrade`/`flyOff`)
- **Cevap (arka) kartında** pointer-tabanlı kaydırma. Ön yüzün mevcut `initFlipGesture`'ı (yatay sürükle → çevir) **korundu**; kaydırma-ile-notlama yalnız cevap görünürken (`studyShowingBack`) `.swipe-card` (`#grade-card`) üzerinde aktif.
- **Eşleme:** SOL=Again(0), AŞAĞI=Hard(1), SAĞ=Good(2), YUKARI=Easy(3). `DIR_TO_GRADE` sabiti + `SWIPE_THRESHOLD=100`px.
- `pointerdown/move/up/cancel`. **8px `MOVE_START` eşiği**: bu mesafenin altındaki hareket "tap" sayılır → `.word-clickable`/`.kanji-clickable` tıklamaları Word/Kanji Modal'ı açmaya devam eder (kaydırma tetiklenmez). Gerçek sürüklemede `setPointerCapture` (try/catch, sentetik pointer'da patlamaz) + sürükleme sonrası **capture-fazında tek seferlik click yutucu** (350ms self-cleaning) → snap-back sonrası kazara modal açılmaz.
- Sürükleme: `translate(dx,dy) rotate(deg)` (rot = `dx/genişlik*12`). Bırakışta dominant eksen (`max(|dx|,|dy|)`) < eşik → `.snapping` yay animasyonu ile geri; ≥ eşik → `flyOff` (ekran dışına `140vw/140vh` uçuş) + **230ms sonra** `gradeCard(DIR_TO_GRADE[dir])` (re-render kartı değiştirir). `.swipe-card { touch-action:none }` → dikey kaydırma tarayıcıya kapılmaz.

### 2. Yönlü Kenar Işıması (`index.html` CSS + `CardView.js`)
- `.swipe-glow` (kartın arkasında `inset:-22px` halka, `z-index:-1`) içinde **4 `.glow-layer`** (left/right/up/down). Her katman ilgili kenardan `radial-gradient` + **tema değişkeninden** `color-mix`: SOL=`--hanko`(kırmızı/Again), SAĞ=`--sky`(mavi/Good), YUKARI=`--jade`(yeşil/Easy), AŞAĞI=`--gold`(turuncu/Hard) → tüm temalarda otomatik uyum (canlı doğrulandı).
- **Yalnız `opacity` animasyonu** (GPU): sürüklerken aktif yön katmanının opaklığı mesafeyle orantılı, `min(1, dist/(threshold*1.2))*0.5` → **zarif yumuşak max 0.5**. Diğer katmanlar 0. Sürükleme sırasında `.is-dragging` ile `transition:none` (parmağı 1:1 takip), bırakışta `.3s` fade.

### 3. Haptik Geri Bildirim (`utils.js` + `appState.js` + `Settings.js` + `CardView.js`)
- **`utils.js → vibrate(pattern)`:** güvenli sarmalayıcı — `navigator.vibrate` feature-detect + try/catch (masaüstü/iOS'ta sessiz no-op).
- **Ayar:** `CONFIG.enableHaptics:true` + `migrateSettings` guard (`typeof !== 'boolean'`). `Settings.js`: SRS bölümünde on/off toggle (`cfg-haptics`) + `info_haptics` bilgi paneli + `saveSettings` okuma. **Varsayılan ON**, undefined→ON.
- **`CardView.js → haptic(pattern)`:** `app.cfg().enableHaptics !== false` iken `vibrate`. **Tek kaynak `gradeCard`'da** (`HAPTIC_BY_GRADE = {0:[50,50,50],1:[30],2:[20],3:[10,30,10]}`) → kaydırma/buton/klavye hepsi aynı desen. Kart çevirme (`showBack`) = `[10]`.
- **Squish (`index.html`):** `.ans-btn:active` ve `#btn-show:active` → `transform: scale(.95)` (mikro-etkileşim).

### 4. Deste Tamamlama Kutlaması (`CardView.js` + yeni `src/utils/confetti.js`)
- **`confetti.js → fireConfetti(opts)`:** bağımlılıksız saf canvas konfeti. `position:fixed` tam ekran canvas, yerçekimi altında partiküller, **tek RAF döngüsü**, süre/partikül sönümlenince canvas + resize listener **kendi kendini temizler**. `prefers-reduced-motion` → burst yok. Tekrar çağrılabilir (her çağrı bağımsız patlama).
- **`renderStudy` tamamlama dalı:** 🎉 patlama + `great_job` ("Harika iş!") başlığı + `session_complete` alt + **2 istatistik kartı** (`done_cards_label`=oturum kartı sayısı, `done_streak_label`=🔥 seri) + "Desteye dön". `celebrated` modül flag'i (startStudy'de reset) → konfeti **oturum başına tam bir kez** (yalnız `studied>0`), her re-render'da değil.
- **`animateCountUp(elId, target)`:** cubic ease-out sayaç. **KRİTİK sağlamlık:** hedef değerler HTML template'ine **doğrudan basılır** (`id="done-cards">${studied}`); animasyon 0'dan sayar. `document.hidden` (rAF duraklatılmış = arka plan sekmesi) → template hedefi korunur (sayaç 0'da takılmaz). Görünür sekmede önce senkron `'0'` → temiz sayım (geri-flaş yok).

### Wiring & i18n
- `CardView.js` importları: `vibrate` (utils), `fireConfetti` (confetti.js). Yeni window global GEREKMEZ (`gradeCard`/`showBack` zaten global; kaydırma & konfeti modül-içi).
- **i18n (4 dil):** `great_job`, `done_cards_label`, `done_streak_label`, `swipe_hint`, `srs_haptics`, `srs_haptics_hint`, `info_haptics` — `back_to_deck`'ten hemen sonra eklendi.
- **Sürüm:** `main.js APP_VERSION` + root `package.json` + `electron/package.json` → `2.5.0`.

### Doğrulama (Vite preview canlı, eval tabanlı)
Kaydırma fiziği (translate+rotate), 4 yön→grade eşlemesi (SOL→Again re-queue, SAĞ→Good, YUKARI→Easy uçuş), glow renkleri (4 tema değişkeni doğru çözüldü) + opaklık-mesafe eşlemesi (max 0.5), tap-through (hareketsiz dokunuş notlamıyor → Word Modal açılıyor), tamamlama (başlık/8 kart/1 seri/🔥/konfeti canvas), Settings toggle (default '1'), i18n (en+tr "Harika iş!"), build temiz, konsol hatası yok. **NOT:** preview sekmesi `visibilityState:hidden` olduğundan rAF duraklıyor → sayaç animasyonu & screenshot doğrulanamadı (ortam artefaktı, kod değil); `document.hidden` guard'ı bu durumda doğru değeri gösterir.
