# Stacks

Japonca kanji/kelime öğrenme uygulaması — SRS (Spaced Repetition System) tabanlı.

## Mimari

- **Modüler Vanilla JS:** CSS `src/styles/app.css`'de (harici, `index.html`'e `<link>` ile bağlı), JS `src/main.js`'de. Supabase, DB ve state katmanları ayrı modüllerde.
- **Vite:** Build aracı ve dev server. `vite-plugin-pwa` ile PWA (manifest + service worker) otomatik üretilir.
- **Electron:** `electron/main.js` masaüstü sarmalayıcısı. Production'da `dist/index.html` yükler.
- **Supabase:** Bulut senkronizasyonu için `supabase-schema.sql` şeması.

## Klasör Yapısı

```
package.json              ← root (vite devDep)
vite.config.js            ← Vite + PWA yapılandırması
src/
  index.html              ← HTML yapısı (CSS/JS ayrı dosyalarda)
  main.js                 ← Orkestrasyon: i18n, sync, state, router, boot
  utils.js                ← Saf yardımcılar (esc, uid, today, tarih, shuffle)
  styles/
    app.css                ← Uygulama genelindeki CSS (tokens, layout, bileşen stilleri, medya sorguları) — tek dosya, `index.html`'e `<link rel="stylesheet">` ile bağlı
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

## Arama UX — Nav'dan Kaldırma + Satır İçi Kompakt Arama (Decks başlığı + Deste-kapsamlı)

Arama artık ayrı bir alt-nav sekmesi/view değil. Decks başlığında kompakt bir arama butonu ve deste detayında "Search in this deck" ile açılan satır içi arama çubuklarına dönüştürüldü. `Search.js` **silinmedi** — motoru genelleştirilip iki yeni bağlama da hizmet edecek şekilde yeniden kullanıldı.

### `Search.js` — view'dan reusable motora dönüşüm
- Eski `renderView()`/`refreshSearch()` (tek, sabit `#search-content` id'lerine bağımlı) **kaldırıldı**. Yerine `renderInto(containerId, {scope, deckId})` / `unmount(containerId)` / `refreshAll()` geldi.
- **Scope başına state:** `scopedState['global']` (Decks başlığı) ve `scopedState['deck:<deckId>']` (deste-kapsamlı) ayrı `{query, filter}` tutar → iki arama çubuğu aynı oturumda birbirini ezmez, aynı desteye tekrar girildiğinde önceki sorgu geri gelir.
- **Benzersiz DOM id'leri:** Tüm iç eleman id'leri (`search-input-*`, `search-filter-*`, vb.) `uid` (`global` ya da `deck-<deckId>`) ile son eklenir → iki arama çubuğu (Decks + deste) aynı anda DOM'da olsa bile (biri gizli) id çakışması olmaz.
- **`activeMounts` Map:** Hangi container'ın hangi scope/deckId ile bağlı olduğunu tutar. `app.save()` sonrası (`main.js`) artık `currentView === 'search'` kontrolü yerine koşulsuz `Search.refreshAll()` çağrılır → o an açık olan arama çubuğu (hangi view'da olursa olsun) güncel veriyle tazelenir; kapalıysa no-op.
- **Deste-kapsamlı sorgu:** `scope:'deck'` iken `app.findDeck(deckId)` + `app.getDescendantDecks(deckId)` ile kök deste ve TÜM alt desteler taranır. Sonuç kartın `deckId`'si taranan kök deste ile **aynıysa** "📁 deste adı" rozeti **gizlenir** (zaten bağlamdan belli); bir alt desteden geliyorsa gösterilir.

### Decks başlığı — kompakt arama (`index.html` + `DeckList.js` + `main.js`)
- **`index.html`:** "My Decks" başlığı `.section-hd-row` ile sarılıp yanına `#btn-toggle-deck-search` (küçük `.icon-btn`, arama ikonu) eklendi. Hemen altına statik, başlangıçta gizli `#deck-search-bar` div'i eklendi. Eski `#nav-search` (alt nav) ve `#view-search`/`#search-content` (ayrı view) **tamamen kaldırıldı**.
- **`DeckList.js → toggleDeckSearch()`:** `#deck-search-bar`'ı aç/kapat + `Search.renderInto('deck-search-bar', {scope:'global'})` / `Search.unmount(...)`. Buton ikonunu aç/kapalıya göre arama↔çarpı olarak değiştirir (ayrı CSS aktif-state sınıfı gerekmedi).
- **`DeckList.js → closeDeckSearch()`:** `main.js → showView()` içinde **her çağrıda koşulsuz** çalıştırılır (yalnız decks dışına çıkışta değil) — sebep: dil değişimi de `setLang()` → `showView(currentView)` tetikler; arama açıkken dil değişirse zaten render edilmiş placeholder/filtre metni yeni dile geçmezdi (canlı testte yakalandı). Koşulsuz kapatma bunu basitçe çözer; her `showView` çağrısı zaten "temiz" bir view girişi sayılıyor.
- **Bağlanma:** `main.js` EVENT BINDINGS bölümünde `btn-add-deck` gibi doğrudan `addEventListener` (inline onclick/window global GEREKMEZ — statik, tek instance).

### Deste-kapsamlı arama (`DeckList.js → renderDeckDetail`)
- Study/Add Card/Delete butonlarının altına, Browse butonundan hemen sonra `"🔍 Search in this deck"` (`search_in_deck`) `btn-block` butonu + hemen altına statik-ama-dinamik-üretilen `#deck-scoped-search-bar` (`renderDeckDetail`'in şablonunun parçası, kapalı başlar) eklendi.
- **`toggleDeckScopedSearch(deckId)` (export + `window` global, inline `onclick` ile çağrılır — deste detay şablonu diğer tüm butonlar gibi inline onclick kullanıyor):** `Search.renderInto('deck-scoped-search-bar', {scope:'deck', deckId})` / `unmount`.
- **State senkronu:** `renderDeckDetail()` her çağrıldığında (deste değişimi, kart CRUD, dil değişimi — hepsi bu fonksiyonu tetikler) `#deck-detail-content.innerHTML` **tamamen** yeniden kurulur → eski `#deck-scoped-search-bar` düğümü DOM'dan atılır. Bu yüzden fonksiyon başında koşulsuz `Search.unmount('deck-scoped-search-bar'); deckScopedSearchOpen = null;` çağrılır — aksi halde `activeMounts` eski (artık DOM'da olmayan) container'ı referans tutmaya devam eder ve modül değişkeni `deckScopedSearchOpen` gerçek (kapalı) DOM durumuyla senkron kalmazdı.

### CSS (`index.html`)
- **Kritik düzeltme (önceden var olan, fark edilmemiş bug):** Global `input, textarea, select { width:100% }` kuralı `.search-filter` (`<select>`) için de geçerli olduğundan, flex satırında (`.search-header-bar`) select tüm satırı kaplayıp yanındaki arama input'unu ~0 genişliğe sıkıştırıyordu (canlı testte yakalandı — orijinal tekil Search view'ında da aynı bug vardı, hiç görsel doğrulanmamıştı). **Düzeltme:** `.search-filter { width:auto; flex-shrink:0; }`.
- Eski ID-tabanlı seçiciler (`#search-input`, `#search-filter`, `#search-clear-btn`, `#search-header-bar`) **class-tabanlı**a çevrildi (`.search-input`, `.search-filter`, `.search-clear-btn`, `.search-header-bar`) — artık birden fazla yerde (farklı `uid` son ekli id'lerle) render ediliyor.
- Clear "X" butonu zaten `position:absolute` ile input'un içindeydi; boyutu 32px→28px, ikon 18px→15px küçültülüp daha "input içi" hissettirildi (ayrı büyük kare buton görünümü yok).
- Yeni: `.section-hd-row` (Decks başlığı + arama butonu flex satırı), `.deck-search-bar` (alt boşluk).

### i18n (`src/main.js → LANG`)
- **Kaldırıldı:** `nav_search` (4 dilden) — artık nav item yok, dead key.
- **Eklendi** (4 dil, `search_placeholder`/`search_empty_state`'ten hemen sonra): `search_placeholder_deck`, `search_empty_state_deck` (deste-kapsamlı arama input placeholder'ı ve boş-durum metni — "Tüm destelerde" yerine "Bu destede" ifadesi), `search_in_deck` ("Search in this deck" buton metni).

### Doğrulama (Vite preview canlı)
(1) Alt nav 5 öğe (Search yok); (2) Decks başlığında kompakt arama ikonu → tık → satır içi çubuk açılır (input+filter+sonuçlar doğru genişlikte, önceki select-genişlik bugı düzeltildi), tekrar tık → kapanır + ikon eski haline döner; (3) deste detayında "Search in this deck" → alt deste dahil arama (`漢文` alt destede bulundu, "📁 Verbs SubDeck" rozeti sadece alt deste sonucunda görünüyor, kök deste sonucunda gizli); (4) `setLang('tr')` sırasında açık Decks-arama çubuğu otomatik kapanıyor (eski dilde render kalmıyor), tekrar açılınca yeni dilde doğru render; (5) build temiz (`vite build` ✓, 52 modül), konsol hatası yok.

## Card Direction (Reverse Study) — Deste Bazında Ön/Arka Yön Seçimi

Kullanıcının bir desteyi **Normal** (ön→arka, mevcut davranış) ya da **Reverse** (arka→ön) yönünde çalışabildiği özellik. **Dilden bağımsız, jenerik tasarım** — "Japonca→Türkçe" gibi dile özgü etiketler YOK; sadece "front"/"back" terminolojisi kullanıldı (uygulama JP-JP, JP-TR, genel Soru/Cevap ve Japonca-olmayan desteleri de destekliyor). Şema alanları **yeniden adlandırılmadı**: `card.kanji` = front, `card.meaningTr` = back prompt, geri kalan alanlar (furigana/examples) = full back answer. Çekirdek FSRS matematiği (`src/core/srsEngine.js`) **dokunulmadı**.

### Veri modeli (`src/store/appState.js`)
- **`deck.studyDirection`:** `'normal' | 'reverse'`. `migrateDecks()` içine eklendi (mevcut deste migrasyon yoluna) — eksik/geçersiz değer `'normal'`a normalize edilir. `getStudyDirection(deck)` saf okuyucu (export).
- **`card.srsReverse`:** Normal `card.srs`'ten **tamamen bağımsız** FSRS bloğu (aynı şema: `createSrsData()`). Recognition (ön→arka) ve recall (arka→ön) farklı bellek süreçleri olduğundan reverse ilerleme normal `srs`'i ASLA paylaşmaz/etkilemez. `migrateCardsToFSRS()` içine eklendi (mevcut FSRS migrasyon yoluna, `card.srs = migrateToFSRS(...)` satırının hemen yanına) → `state.settings.defaultEase`'i kullanarak eksik `srsReverse`'i additive+idempotent (`if (!c.srsReverse)`) doldurur; bu fonksiyon 5 ingestion noktasında (boot load + cloud-pull'lar + connectSyncCode + manualSync + migrateAndSave) zaten çağrıldığından v2.6 istemci yerel/uzak ne yüklerse normalize eder. `main.js → makeCard()` de artık **yeni kartlarda** `srsReverse: createSrsData(...)` ile birlikte üretir (migrasyonu beklemeden, sayfa yenilenmeden reverse çalışmaya hazır).
- **`getCardSrsForDirection(card, direction)` / `setCardSrsForDirection(card, direction, nextSrs)`:** Saf okuma/yazma yardımcıları (export). `direction==='reverse'` ise `card.srsReverse`, aksi halde `card.srs`.

### Yön-bağımsız kuyruk kurma — srsEngine.js'e DOKUNMADAN (`src/main.js`)
- **`buildQueueFromCards` (srsEngine.js) `card.srs` alan adını hardcoded okur** — bu fonksiyonu değiştirmeden reverse deposunu kullandırmak için `cardForDirection(card, direction)` (main.js, modül-içi) eklendi: reverse'de gerçek kartın **prototipini** taşıyan (`Object.create(card, {...})`) bir görünüm objesi döner; bu objenin YALNIZCA `srs` özelliği getter/setter ile `card.srsReverse`'e yönlendirilir (`getCardSrsForDirection`/`setCardSrsForDirection` üzerinden), diğer TÜM alanlar (`kanji`, `furigana`, `meaningTr`, `id`, …) prototip zinciriyle gerçek karta düşer. Normal yönde bu sarmalama atlanır (`direction!=='reverse'` → kartın kendisi döner, sıfır ek yük).
- Bu sayede `previewSRS`/`applySRS` (ikisi de `card.srs`'i hardcoded okur/yazar) reverse yönünde çağrıldığında **otomatik olarak** `card.srsReverse`'i okur/mutasyona uğratır — `srsEngine.js`'de TEK satır bile değişmedi.
- **`_buildQueue(cards, masteredOnly=false, direction='normal')` / `buildQueue(deck, masteredOnly=false, direction='normal')`:** 3. parametre eklendi (geriye uyumlu varsayılan `'normal'` — mevcut çağrı yerleri değişmeden eski davranışı korur). `direction==='reverse'` iken `cards.map(c => cardForDirection(c,'reverse'))` ile sarmalanmış görünüm dizisi `buildQueueFromCards`'a geçirilir.
- **`setStudyDirection(deckId, direction)`:** `deck.studyDirection`'ı günceller + `save()`. `app` context'ine `getStudyDirection`/`setStudyDirection` olarak eklendi.

### Çalışma oturumu (`src/components/CardView.js`)
- **`studyDirection` modül değişkeni:** Aktif oturumun yönünü tutar; `renderStudy()`'nin ön yüzü hangi alanı soracağını bilmesi için kullanılır.
- **`startStudy(deckId, masteredOnly)`:** `direction = getStudyDirection(app.findDeck(deckId))` — çocuklu (üst) deste çalışılırken de **üst destenin** yönü kullanılır (çocukların kendi `studyDirection`'ı yalnızca o çocuk BAĞIMSIZ çalışılırsa devreye girer — basit/güvenli varsayım, ayrı bir "kalıtım" mekanizması eklenmedi). **RESUME koşuluna `activeSession.direction === direction` eklendi:** yön değiştiyse (deste detayından) eski kuyruk otomatik geçersiz sayılır ve taze kurulur — ayrıca bir "oturumu temizle" çağrısı GEREKMEZ, koşul kendiliğinden sağlar.
- **`frontFaceHTML(card)` (yeni yardımcı):** Normal modda mevcut `card.kanji` render'ı (değişmedi). Reverse modda `card.meaningTr` (boşsa `card.kanji`'ye, o da yoksa `'—'`e düşer — asla çökmez/boş kalmaz) `.fc-kanji.fc-prompt${kanjiSizeClass}` ile basılır. **Back render'ı iki yönde de AYNI** — spec'e göre reverse'in cevabı zaten "kanji + furigana + meaning + examples" (mevcut `.fc-back` içeriğiyle birebir aynı alan seti) olduğundan back template'inde HİÇBİR dallanma gerekmedi; yalnızca ön yüz (`frontFaceHTML`) değişti.
- **`gradeCard`/`stateBadgeCls`/`stateLabel`/`previewSRS` çağrıları DEĞİŞMEDİ:** `studyQueue` elemanları reverse'de zaten `cardForDirection` sarmalayıcısı olduğundan `card.srs` her yerde otomatik doğru depoya (srsReverse) işaret eder — CardView.js'de srs okuma/yazma noktalarında ayrıca dallanma eklemek GEREKMEDİ.
- **Browse (`startReview`) ve Kart Önizleme Modalı (`DeckList.showCardPreviewModal`) KASITLI olarak normal-only bırakıldı:** İkisi de notlama yapmayan "göz atma" modları (mevcut proje kararlarıyla tutarlı — bkz. yukarıdaki "Kart Önizleme Modalı" bölümü); yön karmaşıklığı eklemek görevin "do not overcomplicate preview" talimatına aykırı olurdu.
- **Deck-list/deck-detail rozetleri (`Analytics.deckStats`/`aggregateDeckStats`, mastered kart listesi) KASITLI olarak normal-only bırakıldı:** Bu sayaçlar/listeler yalnızca `card.srs`i okur; reverse-özel istatistik göstermek görev kapsamında istenmedi. Yalnızca **"Study (N)" buton sayacı** (`qLen`/`mLen`, hem `renderDeckList` hem `renderDeckDetail` hem de üst destenin alt-deste satırındaki `cq`) seçili yöne göre `_buildQueue`/`buildQueue`'ya 3. parametre olarak geçirilir — çünkü bu sayı doğrudan "Study" butonunun ne yapacağıyla eşleşmeli.

### UI — Card Direction segmented control (`src/components/DeckList.js` + `src/index.html`)
- **`renderDeckDetail()`:** stats-grid'in hemen altına, Study/Add/Delete satırından ÖNCE (Study butonuna basmadan önce yön görünür/seçilebilir olsun diye) `.direction-row` eklendi: etiket + 2 butonluk `.direction-seg` (Normal/Reverse) + `.direction-hint`. Aktif buton `.is-active`. `onclick="setCardDirection(deckId,'normal'|'reverse')"`.
- **`setCardDirection(deckId, direction)` (export + `window` global):** `app.setStudyDirection(...)` + (deck view'daysa) `renderDeckDetail()` ile yeniden çiz.
- **CSS:** `.direction-row/.direction-label/.direction-seg/.direction-seg-btn/.is-active/.direction-hint` — mevcut `--paper-2`/`--card`/`--r-md`/`--sh-sm` tema değişkenleriyle diğer segmented/pill bileşenleriyle tutarlı, kompakt (deste detayını doldurmuyor). `.fc-prompt`: `.fc-kanji`'nin boyut/overflow iskeletini (kanjiSizeClass, `overflow-wrap:anywhere`) korur ama CJK Mincho serif'i uygulamanın genel sans-serif yığınıyla override eder (meaningTr çoğunlukla UI dilinde düzyazı, kanji fontuyla basılmamalı) — aynı özgüllükte (`.fc-kanji` ile) olduğundan stylesheet'te SONRA tanımlanarak kazanır.

### i18n (`src/main.js → LANG`)
4 yeni anahtar 4 dile (`card_preview_title`'dan hemen sonra): `card_direction`, `card_direction_normal`, `card_direction_reverse`, `card_direction_hint`.

### Sürüm
`main.js APP_VERSION` + root `package.json` + `electron/package.json` → `2.6.0`.

### Doğrulama (Vite preview canlı)
(1) Deste detayında "CARD DIRECTION" segmented control render oluyor (Normal aktif varsayılan); (2) Reverse'e tık → aktif hâle geçiyor, sayfa yenilenince (`localStorage` → `deck.studyDirection:'reverse'`) KALICI; (3) Reverse modda Study → ön yüz `card.meaningTr` ("train", generic sans-serif font — Mincho DEĞİL), "Show answer" → arka yüz 電車/でんしゃ ruby + "train" + örnek cümle + çeviri (normal moddaki back'le birebir aynı yapı); (4) Reverse'de Good ile notlama → **yalnızca `card.srsReverse`** güncellendi (`state:'learning'`, `stepIndex:1`, `due` set), `card.srs` TAMAMEN dokunulmamış (`state:'new'`, `due:0`); (5) Normal'e geri dönüp Study → YENİ (farklı) bir kart sırayla geldi (kanji ön yüzde, Mincho font) → Good ile notlama → **yalnızca `card.srs`** güncellendi, `card.srsReverse` dokunulmamış → çift yönlü izolasyon doğrulandı; (6) `setLang('tr')` → "KART YÖNÜ" / "Normal: Ön yüz → Arka yüz" / "Ters: Arka yüz → Ön yüz" / hint metni doğru çevrildi, tüm deste detayı ekranı (Türkçe) hatasız; (7) üst deste (çocuklu, "Verbs SubDeck" alt destesi) ile yön değişimi ve çalışma crash'siz çalıştı; (8) konsol hatası yok; **build temiz** (`vite build` ✓, 52 modül).

## Curated Study Packs (Supabase-backed, remote-only)

Kullanıcıların Supabase'de barındırılan, önceden hazırlanmış JLPT çalışma paketlerini (şema: `docs/jlpt_pack_schema.md`) tek tıkla desteler + özel testler olarak içe aktarabildiği özellik. **Bundle'a gömülü/yerel paket verisi YOK — Supabase tek doğruluk kaynağı.** Paketler **furigana/reading/onyomi/kunyomi içermez** — bunlar mevcut offline kuromoji parser'ı ile import anında üretilir (kanji sözlüğü zaten ayrı, tıklanan kanji'ler için offline). Çekirdek FSRS motoru, Supabase şeması, Electron ve `vite.config.js` **dokunulmadı**.

**Geçmiş not (remote-only'e geçiş):** Özellik başlangıçta bir built-in bundle paketi (`BUILTIN_PACKS`, `src/data/study-packs/en/jlpt_n5_pilot_pack.json`, dynamic-import chunk) ile Supabase remote kataloğunu birlikte gösteriyordu (aynı `packId` varsa remote tercih edilip built-in kart filtreleniyordu). Remote altyapı üretimde stabil hâle gelince (Supabase `curated_packs` + `study-packs` bucket dolduruldu), ürün kararıyla **built-in yol tamamen kaldırıldı**: `BUILTIN_PACKS`, `findBuiltInPack`, `importBuiltInPack` (`studyPackService.js`), built-in kart render/`importPack` (`CommunityHub.js`), `communityImportPack` window global (`main.js`) ve bundle JSON'un kendisi (`src/data/study-packs/en/jlpt_n5_pilot_pack.json`) silindi. Sebep: aynı paket iki kaynakta yaşadığından Community'de kısa süreli "iki kart" görünme/flicker riski vardı (remote yükleme tamamlanana kadar built-in kart görünüyordu); artık tek kaynak olduğundan bu risk yapısal olarak yok. `docs/jlpt_pack_schema.md` ve `src/data/study-packs/en/jlpt_n5_pilot_pack_audit.md` (dokümantasyon, uygulama kodu tarafından import edilmiyor) korundu.

### Veri modeli (`src/store/appState.js`)
- **`state.importedPacks`:** `createInitialState()`'e eklendi (`[]`). Her giriş: `{ packId, title, version, importedAt, deckId, cardCount, testCount, source, level, language }` (`source` her zaman `'remote'`).
- **`migrateImportedPacks(state)`:** `migrateCustomTests` ile birebir aynı desende (yoksa `[]`), `main.js`'deki **5 migrasyon noktasında** (boot load + boot cloud-pull + connectSyncCode + manualSync + migrateAndSave) `migrateCustomTests(state)`'ten hemen sonra çağrılır.
- **`isPackImported(state, packId)` / `addImportedPack(state, entry)`:** Saf sorgu/yazma yardımcıları (export), `addCustomTest` ile aynı desen.

### Supabase şeması (`supabase-schema.sql`)
- **`curated_packs` tablosu:** `pack_id`(unique) + `level`/`language`/`title`/`description`/`version`/`card_count`/`test_count`/`storage_path`/`checksum`/`size_bytes`/`is_active`. Yalnız **metadata** tutar — gerçek paket JSON'u Storage'da (`storage_path`).
- **RLS:** Public **SELECT** yalnız `is_active=true` satırlar için bir policy ile açık. **INSERT/UPDATE/DELETE policy'si YOK** → anon key hiçbir yazma yapamaz (varsayılan RLS reddi). Admin yazma yalnız service-role script'i (`scripts/upload_curated_pack.js`) veya SQL console üzerinden — RLS'i bypass eder, herhangi bir policy'ye bağlı değildir.
- **Storage bucket:** `study-packs`, **public** (`INSERT INTO storage.buckets ... public=true`). Public bucket'lar `/storage/v1/object/public/<bucket>/<path>` üzerinden **policy kontrolü olmadan** okunur → ayrı bir `storage.objects` SELECT policy'sine gerek yok. Yazma yine yalnız service-role (upload script).
- **Path konvansiyonu:** `storage_path` **bucket-dahil** tam yol (ör. `study-packs/en/jlpt-n5-en-pilot-v1.json`) — client tarafında URL inşası tek bir string concat'i (`${SUPABASE_URL}/storage/v1/object/public/${storage_path}`), ayrı bucket-adı config'i GEREKMEZ.

### `src/services/studyPackService.js`
- **`dbService.js` (network/Supabase erişimi):** `fetchCuratedPackCatalog()` (PostgREST `curated_packs?is_active=eq.true`, `sbFetch` kullanır) + `fetchCuratedPackFile(storagePath)` (public Storage URL'ine düz `fetch`, `sbFetch` DEĞİL — Storage endpoint'i PostgREST değil, public bucket'ta auth header da gerekmez). İkisi de mevcut `community_decks` fonksiyonları gibi try/catch + `console.error` + re-throw.
- **`importPackData(app, pack, sourceMeta)` (modül-içi paylaşılan çekirdek):** Doğrulanmış bir pack objesini `app.state`'e decks + custom tests olarak yazar. Tek çağıran `importRemotePack`.
  - **Deste hiyerarşisi (3 katman):** Kök deste (`pack.title`) → kategori desteleri (paketteki `type`'lara göre `Vocabulary`/`Kanji`/`Grammar`/`Sentences`, İngilizce sabit) → paketin kendi destesi birebir yaprak deste olarak korunur.
  - **Kart eşleme:** `card.front→kanji, card.back→meaningTr, card.exampleJp→exampleJp, card.exampleTranslation→exampleTr`. Mevcut şema alanları **yeniden adlandırılmadı**. `furigana=generateFurigana(front)`, `exampleFuriganaMap` = `exampleJp` doluysa `generateFuriganaMap(exampleJp)` — ikisi de import anında senkron üretilir, try/catch korumalı (`autoFurigana` ile aynı desen, parser hazır değilse import engellenmez).
  - **Fresh SRS + reverse-study — SIFIR ek kod:** `app.makeCard(...)` zaten hem `srs` hem `srsReverse`'i taze `createSrsData(...)` ile üretiyor (v2.6'dan beri) → import edilen kartlar otomatik normal + ters çalışmaya hazır.
  - **Test eşleme:** Her paket testi `addCustomTest`'e `{id, title, questions, sourcePackId}` olarak eklenir. `correctValue` **paketten geldiği gibi** korunur (TRUE_FALSE için JSON boolean) — bkz. aşağıdaki TestView düzeltmesi.
  - **Tekrar-import koruması:** `isPackImported` fonksiyon başında kontrol edilir; `true` ise deste/test/metadata **hiç oluşturulmaz**, `{status:'already_imported'}` döner.
- **`validatePackData(pack)` (export):** Sığ/kasıtlı-basit yapısal doğrulama — `packId`/`decks[]`/`tests[]` var mı, her kart `front`+`back` içeriyor mu, **yasak alanlar** (`furigana`, `reading`, `kanaReading`, `romaji`, `onyomi`, `kunyomi`, `kanjiMeaning`, `kanjiBreakdown` — `docs/jlpt_pack_schema.md`'deki tam liste) hiçbirinin kartta OLMADIĞI. Uzak paket için özellikle önemli (güvenilmeyen kaynak).
- **`loadRemotePackCatalog()` (export):** `fetchCuratedPackCatalog()`'u sarar, **asla throw etmez** → `{status:'ok',packs}` / `{status:'error',message}`. CommunityHub bunu her zaman güvenle çağırabilir.
- **`importRemotePack(app, catalogEntry)` (export):** `isPackImported` erken kontrol → `fetchCuratedPackFile` → `validatePackData` → `importPackData(..., {source:'remote'})`. Hata durumunda `reason:'download'` (fetch başarısız) veya `reason:'invalid'` (doğrulama başarısız) ile ayrıştırılmış döner → UI daha spesifik toast gösterebilir.

### CommunityHub UI (`src/components/CommunityHub.js`)
- **`_remoteState`/`_remotePacks`** modül-içi state (`idle|loading|ready|error`), community-decks state'inden (`_state`/`_decks`) bağımsız. `renderCommunityHub()` `paint()` → `load()` (community decks) → `loadRemote()` (curated pack kataloğu) sırasıyla başlatır; ikisi de kendi state'ini güncelleyip bağımsız `paint()` çağırır — biri başarısız olsa diğeri etkilenmez.
- **`curatedPacksHTML()`:** Yalnız `_remoteState==='ready'` iken `_remotePacks.map(remotePackCardHTML)` render eder; `idle`/`loading` iken `pack_loading` notu, `error` iken `pack_remote_unavailable` notu gösterir — **hiçbir ara durumda yerel/fallback kart render edilmez**, bu yüzden flicker/duplicate riski yapısal olarak yok.
- **`remotePackCardHTML(pack)` + `packBadges(pack)`:** Level/Language/Version/cardCount/testCount rozetleri. `isPackImported(app.state, pack.pack_id)` true ise buton yerine `✓ Imported` rozeti (badge-soft).
- **`importRemotePackAction(packId, btnEl)` (export, `communityImportRemotePack` window global):** Butonu kilitleyip `pack_importing` yazar → `importRemotePack` çağırır → sonuca göre toast (`pack_import_success`/`pack_already_imported`/`pack_download_failed`/`pack_invalid`/genel `pack_import_failed`) → **`finally` içinde koşulsuz `paint()`**.

### TestView/TestResults sağlamlaştırması — TRUE_FALSE boolean `correctValue` çökmesi (`src/components/TestView.js` + `src/utils.js`)
- **Kök neden:** Şema, TRUE_FALSE `correctValue`'yu JSON **boolean** olarak tanımlıyor; mevcut `TestEditor.js` UI'dan oluşturulan testlerde ise bu alan hep **string** (`'true'`/`'false'`) idi. Eski `handleAnswer`, `(q.correctValue || '').trim()` yapıyordu — `correctValue` boolean `true` iken `.trim()` **throw eder**; `false` iken sessizce hep yanlış sayardı. `TestResults.js`'in `esc(a.correctValue)`'su da aynı sebeple boolean `true`'da throw ederdi.
- **Düzeltme:** `handleAnswer` + `showFeedback`'in TRUE_FALSE dalı artık karşılaştırmadan önce **her iki tarafı da `String(...)` ile** normalize ediyor (`String(q.correctValue ?? '').trim().toLowerCase()`). `utils.js → esc(s)`'e tek satır savunma eklendi (`String(s).replace(...)`) — paylaşılan, 50+ çağrı yerli bu yardımcı artık boolean/number gibi string-olmayan truthy girdilerde çökmüyor.
- **Mevcut string-tabanlı testler ETKİLENMEDİ:** `String('true') === 'true'` (no-op) olduğundan TestEditor'dan oluşturulan eski testler birebir eskisi gibi çalışıyor.

### `scripts/upload_curated_pack.js` (admin-only, otomatik ÇALIŞMAZ)
- CommonJS (`require`, `scripts/chunk_ko.js` ile aynı stil) — root `package.json`'a `"type":"module"` eklemek GEREKMEDİ. Hiçbir npm script'e/CI'a bağlı değil, yalnız elle `node scripts/upload_curated_pack.js` ile çalışır.
- **Ortam değişkenleri (hepsi zorunlu, hiçbiri hardcode edilmedi):** `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `CURATED_PACK_FILE` (yerel JSON yolu), `CURATED_PACK_STORAGE_PATH` (bucket-dahil hedef yol). Opsiyonel `CURATED_PACK_ACTIVE=false` → yükle ama `is_active:false` (yayına almadan önce gizli tutmak için).
- **Akış:** dosyayı oku → `card_count`/`test_count` hesapla (test_count = **toplam soru sayısı**, `studyPackService.js`'deki `testCount` ile aynı konvansiyon, test *objesi* sayısı DEĞİL) → SHA-256 checksum + byte boyutu → Storage'a `POST .../storage/v1/object/{bucket}/{path}` (`x-upsert:true`, service-role auth) → `curated_packs`'e `POST .../rest/v1/curated_packs?on_conflict=pack_id` (`Prefer: resolution=merge-duplicates`, service-role auth) ile upsert. Her adımda `!res.ok` → mesajlı throw, script exit code 1.
- **Bağımlılık eklenmedi:** yalnız Node built-in `fs`/`path`/`crypto` + global `fetch` (Node ≥18).

### i18n (`src/main.js → LANG`)
4 dilde (en/tr/ko/mn) `curated_packs`, `import_pack`, `imported_pack`, `pack_importing`, `pack_already_imported`, `pack_import_success` (`{count}`,`{tests}`), `pack_import_failed` (`{msg}`), `pack_cards_count` (`{count}`), `pack_tests_count` (`{count}`), `pack_level` (`{level}`), `pack_language` (`{lang}`), `pack_version` (`{version}`), `pack_remote_unavailable`, `pack_loading`, `pack_download_failed` (`{msg}`), `pack_invalid` (`{msg}`). **Remote-only geçişte silindi** (4 dilden, artık hiçbir yerde kullanılmıyor): `jlpt_n5_pack_title`, `jlpt_n5_pack_desc` (built-in kartın statik başlık/açıklaması), `pack_offline_available` ("✓ Works offline" rozeti — yalnız built-in kartlarda vardı), `built_in_packs`/`remote_packs` (daha önceki iki-bölüm ayrımından kalan ölü anahtarlar).

### Doğrulama (Vite preview canlı + build, remote-only geçiş sonrası)
`vite build` ✓ (53 modül — built-in pack chunk'ı artık yok). Canlı (gerçek Supabase `curated_packs` kataloğu dolu): (1) Community açıldığında yalnız gerçek remote N5 paketi kart olarak render oldu (Level: N5 / Language: EN / Version: 0.1.0 / 300 cards / 100 test questions), built-in kopya/`✓ Works offline` rozeti **hiç görünmedi**; (2) Import → toast başarı → buton `✓ Imported`'a döndü; (3) Refresh (`communityRefresh()`) sonrası hâlâ tek kart, `Imported` durumu korunuyor — **duplicate/flicker yok**; (4) "COMMUNITY DECKS" (kullanıcı paylaşımlı desteler) bölümü ayrı ve normal render oluyor (boş durumda "No community decks yet."); (5) konsol hatası yok; test verisi (import edilen deste/testler/`importedPacks` girişi) localStorage'dan temizlendi.

## Test Hiyerarşisi (Deck-benzeri Parent/Child Testler)

Tests ekranı desteler gibi **parent-test / child-test** hiyerarşisi kullanır — ayrı bir "klasör app'i" değil. **Herhangi bir çalıştırılabilir test başka testlerin ebeveyni olabilir** (Test B'yi Test A'nın üstüne sürükle → B, A'nın çocuğu olur, A artık üst/parent test gibi davranır ve tüm alt ağacıyla birlikte başlatılabilir). `kind:'folder'` yalnızca **eski (legacy) container-only** öğeler için korunur (geriye dönük uyumluluk); bunlar da parent gibi görünür ve descendant'larıyla başlatılabilir. Çekirdek FSRS motoru, Electron dosyaları, Supabase şeması ve `package.json` **dokunulmadı**.

**Tarihsel not (v1→v2→v3):** v1 = dosya-tarayıcı (breadcrumb + klasöre gir); v2 = inline accordion ama **yalnız folder'lar parent/drop-target**; v3 (bu bölüm) = **deck-benzeri: her test parent olabilir**, birleşik başlatma (own + descendants), her öğe drop-target.

### Veri modeli (`src/store/appState.js`)
- **Tek koleksiyon, `parentId` ağacı:** Tüm testler düz `state.customTests` dizisinde; `parentId` (null=kök) hiyerarşiyi kurar ve **her öğe çocuk sahibi olabilir** (deck-benzeri). `kind:'folder'` legacy container (kendi `questions`'ı yok ama descendant'ları üzerinden başlatılabilir geçerli bir parent). Alan adları `kind`/`parentId` bilerek seçildi (`type`/`parent` DEĞİL) — `question.type` (`MULTIPLE_CHOICE`/`TRUE_FALSE`/`FILL_BLANK`) ile çakışmasın.
- **`migrateCustomTests(state)`:** 5 ingestion noktasında (değişmedi) idempotent. `kind` eksik/geçersizse `'test'`e normalize; `parentId` eksik/dangling/kendine-referans ise köke sıfırlanır (orphan kaybolmaz).
- **CRUD + ağaç yardımcıları:** `addCustomTest`, `updateCustomTest` (`updatedAt` damgalar), `deleteCustomTest` **cascade-aware** (bir öğeyi silmek tüm alt ağacını siler — deck davranışıyla tutarlı). `getTestChildren(state, parentId)` (doğrudan çocuklar), `getTestsInTreeOrder(state)` (`[{item, depth}]` derinlik-öncelikli — **v3'te herhangi bir öğenin çocuklarına koşulsuz iner**, sadece folder'lara değil), `getTestDescendants(state, id)` (tüm alt ağaç, tree order), `countTreeQuestions(state, id)` (own + descendant soru sayısı — Start rozeti için), `buildRunnableTestFromTree(state, id)` (aşağıya bakın), `moveCustomTest(state, id, newParentId)` (**v3'te döngü koruması TÜM öğeler için**: bir öğe kendi descendant'ına/kendine taşınamaz — eski `kind==='folder'` koşulu kaldırıldı).
- **`buildRunnableTestFromTree(state, id)` (birleşik çalıştırılabilir test — YENİ):** `{ id, title, questions }` döner: **önce öğenin kendi soruları, sonra her descendant'ın soruları tree order'da** (her öğe bir kez ziyaret → duplikasyon yok). Soru objeleri **klonlanmadan** taze bir diziye referanslanır (TestView yalnız okur; büyük base64 image data URL'lerini kopyalamaz). `state`'i ASLA mutasyona uğratmaz. Legacy folder 0 own soru katkısı verir. Kötü id → `null`.

### UI — Deck-benzeri parent/child kartlar (`src/components/TestManager.js`)
Tests ekranı `DeckList` ile aynı **inline accordion** UX'i (breadcrumb/ayrı ekran YOK). Kök seviyede öğeler `getTestsInTreeOrder` ile derinlik girintili (`margin-left: depth*1.2rem` + `border-left`) tek listede. **Tek birleşik `itemRowHTML(item, depth)`** hem çalıştırılabilir testleri hem legacy folder'ları render eder (ikisi de parent olabilir).
- **Collapse/expand:** Modül-içi `collapsedItems` Set (oturum-içi; herhangi bir parent id'siyle keyed — artık sadece folder değil). `hasCollapsedAncestor` alt ağacı gizler. Çocuğu olan HER öğede chevron (`deck-collapse-btn`); `testToggleCollapse` window global.
- **Kart yapısı (deck kartının aynası):** `[chevron?] [başlık butonu + "N sub-tests" rozeti + own soru sayısı] [kebab menü]` sonra `.btn-row [Start (total)] [Details]`.
  - **Başlık tıklaması:** çalıştırılabilir testte → **Details** (`showTestEditor` — kendi sorularını düzenleme editörü, deck başlığı→detay aynası); legacy folder'da → collapse toggle (folder editörde açılamaz).
  - **Start butonu:** `countTreeQuestions` (own + descendant). total>0 ise `Start ({total})` (`start_test` anahtarı) → `playTest(id)`; aksi halde muted `no_questions_to_start`. **Own soru 0 ama descendant'ta soru varsa yine başlatılır** (legacy folder / boş parent senaryosu). Örnek: A(10)→B(20)→C(15) ağacında A kartı `Start (45)`.
  - **Details butonu (`detail` anahtarı):** eski **"Edit"/"Düzenle" YERİNE** — çalıştırılabilir testlerde `showTestEditor(id)` (düzenleme hâlâ oradan yapılır). Legacy folder'da Details butonu **yok** (editörde açılamaz).
  - **Rozetler:** `sub_tests_count` ("{count} alt test", `sub_decks_count` aynası, doğrudan çocuk sayısı) + `question_count` (own soru, deck-meta satırı).
- **Kompakt aksiyon menüsü (`.card-menu` popover):** kebab (`more` ikonu). Folder menüsü: Rename Folder / Move / Delete; test menüsü: Move / Delete (test rename → Details/editör). Tek seferde bir menü (`toggleMenu`); `init`'teki tek document-click listener dışarı tıklamada kapatır. **Büyük "Move Test"/"Export" butonları YOK** (`exportTestToJson` utils'te dokunulmadan duruyor, UI yok).
- **Silme (birleşik `deleteItem`):** cascade-aware (deck davranışı). Descendant varsa `confirm_delete_folder_nested` (folder) / `confirm_delete_test_nested` (test); yoksa `confirm_delete_folder`/`confirm_delete_test`. `deleteTest` window global her iki kind için kullanılıyor.
- **Move (`moveItemModal`):** **Her öğe her öğeye taşınabilir** — geçerli parent'lar `getTestsInTreeOrder`'dan self+descendant hariç (folder emoji legacy container'ı işaretler) + kök (`move_top_level`). `moveCustomTest` döngü koruması evrensel.
- **Sürükle-bırak (`DeckList` aynası): HER `.test-draggable` drop hedefi** (folder kısıtı KALDIRILDI — B'yi A'nın üstüne bırak → B, A'nın çocuğu, A parent olur; tam decks davranışı). `#test-drop-top-level` köke taşır. Mobilde `_attachLongPress` → move modal. Tümü `_moveTestDirect` (no-op + cycle guard + `render()` + toast). CSS `.deck-draggable`/`.deck-drop-top-level` selektörleri `.test-draggable`/`.test-drop-top-level`'ı da kapsar.
- **Toolbar:** sadece **Create New Test + Import JSON** (ayrı "Create Folder" butonu YOK). Import edilen test köke yerleşir.

### `TestEditor.js` — konum seçici (create-test akışında parent seçimi)
- `render(testId)`: `existing` araması `ct.kind !== 'folder'` (savunma; folder id → taze "yeni test" formu, çökme yok — çalıştırılabilir **parent test** normal açılır ve kendi sorularını düzenler).
- **Konum seçici (yalnız YENİ test):** `test_location_label` + `<select id="te-folder-select">` → Kök (`move_top_level`) / **mevcut TÜM öğeler** (`parentOptionsHTML` — herhangi bir öğe parent olabilir, folder emoji ile işaretli) / **"Create Folder …" (`__new__`, yeni grup)**. `__new__` seçilince `#te-new-folder-name` görünür.
- `saveTest()`: yeni test → `parentId` select'ten; `__new__` ise önce kök seviyede yeni grup (`addCustomTest`, `kind:'folder'`; boş ad → `warn_name_empty`), sonra test o gruba konur.

### `TestView.js` — birleşik çalıştırılabilir test
`render(testId)` artık `buildRunnableTestFromTree(app.state, testId)` ile birleşik testi kurar (own + descendant soruları, tree order, state mutasyonsuz). Bir parent test/legacy folder başlatınca tüm alt ağacı çalışır; `test.title` = parent başlığı, `test.questions` = birleşik dizi. `TestResults` değişmeden bu başlığı/skoru gösterir.

### Study pack import — testler klasör ağacına yerleşiyor (`src/services/studyPackService.js`)
- **Paket başına bir kök test klasörü:** `importPackData` artık paketin `tests[]`'i boş değilse `pack.title` adında bir kök klasör (`kind:'folder'`, `sourcePackId` damgalı — deste kökündeki `rootDeck.sourcePackId` deseniyle tutarlı) oluşturuyor. Kategori alt klasörleri (`Vocabulary`/`Kanji`/`Grammar`/`Sentences`/`Mixed`) **lazy** oluşturuluyor — yalnız o kategoriye eşleşen en az bir test varsa.
- **`normalizeTestCategory(packTest)`:** `packTest.category` → `tags[]` → `type` sırasıyla, küçük harfe çevrilip `vocabulary`/`kanji`/`grammar`/`sentence`/`mixed` anahtar kelimeleriyle eşleşme aranıyor (`docs/jlpt_pack_schema.md`'nin Test Object alanları). Eşleşme yoksa test doğrudan paketin kök klasörüne düşüyor (spec: "If metadata is not enough, put tests under the pack root folder").
- **Gerçek Supabase N5 pilot paketiyle canlı doğrulama (aşağıya bakın):** paketteki tüm testlerin `category` alanı `"Quiz"` (içerik kategorisi değil, format bilgisi) ve `tags` alanı yok → **hiçbiri** alt klasöre eşleşmiyor, 5 test de doğrudan kök pakete düşüyor. Bu **kod hatası değil**, spec'in kastettiği fallback'in tam olarak çalıştığının kanıtı — paket yazarları `category:"Vocabulary"` gibi bir alan doldurursa alt klasörleme otomatik devreye girer.
- **`addImportedPack` girişine yeni (opsiyonel) `testFolderId` alanı eklendi** — pakete ait kök test klasörünün id'si, `deckId` alanının test-tarafı eşleniği. Var olan tüketiciler bilinmeyen alanı yok sayar, geriye dönük uyumluluk bozulmadı.
- **Tekil-import ve toplu-import davranışları dokunulmadı:** `isPackImported`/`addImportedPack` imzaları, duplicate-import engelleme mantığı, `validatePackData`, Community remote-only mimarisi (built-in fallback YOK) **aynen korundu**. **v3 not:** `studyPackService.js` **değiştirilmedi** — mevcut pack-root(folder)→kategori(folder)→test ağacı yeni model altında zaten parent olarak render olur ve pack-root `buildRunnableTestFromTree` ile tüm import edilmiş testleri birleşik çalıştırır. Pack root `kind:'folder'` legacy container olarak kalır ama descendant'larıyla **başlatılabilir**.

### i18n (`src/main.js → LANG`)
- **v3 (parent/child) eklenenler** (4 dil): `start_test` (`{count}` — "Start ({count})", Play'in yerine), `sub_tests_count` (`{count}` — "{count} alt test"), `no_questions_to_start` (own+descendant 0 iken muted), `confirm_delete_test_nested` (`{name}`,`{count}` — descendant'ı olan çalıştırılabilir testin cascade-silme uyarısı).
- **v3 kaldırılanlar** (4 dil, artık kullanılmıyor): `play_test` (→ `start_test`), `folder_item_count` (→ `sub_tests_count`).
- **v2 eklenenler (korundu):** `test_location_label`, `move_label`, `card_actions`.
- **v2 kaldırılanlar (korundu):** `export_test`, `toast_test_exported`, `folder_empty`.
- Yeniden kullanılan mevcut anahtarlar: `detail` (Details butonu — deck ile aynı), `question_count` (own soru), `create_folder` ("Create Folder …" yeni-grup seçeneği), `folder_name_placeholder`, `rename_folder`, `move_test`(+`move_test_to_label`), `move_top_level`, `confirm_delete_folder`(+`_nested`), `confirm_delete_test`, `toast_folder_*`/`toast_test_*`, `warn_name_empty`, `warn_move_cycle`, `delete_btn`, `untitled_test`. (`edit_label` artık Tests'te kullanılmıyor ama DeckList/Search'te kullanıldığından korundu.)

### Doğrulama (v3 parent/child)
`vite build` ✓ (53 modül, hatasız). Vite preview canlı (seeded ağaç A(10)→B(20)→C(15) + legacy folder+child(5) + flat(3), DOM-tabanlı): (1) inline accordion doğru girinti — Test A d0 "10 questions"/`Start (45)`/"1 sub-tests"/chevron/Details, Test B d1 `Start (35)`, Test C d2 `Start (15)`, Legacy Folder d0 meta-yok/`Start (5)`/Details-YOK/chevron, Flat `Start (3)`; (2) **birleşik başlatma**: `playTest(A)` → TestView "1 / 45", ilk soru "A-Q1" (own-first, tüm alt ağaç, duplikasyon yok = 10+20+15); (3) collapse A → B & C gizlendi; (4) **test-to-test drag**: B'yi Flat'in üstüne bırak → B, Flat'in çocuğu, Flat `Start (38)` = 3+20+15 (grandchild C, B ile taşındı); (5) **cycle guard**: Flat'i (ata) descendant C'nin üstüne drag → engellendi (Flat kökte kaldı); (6) move modal (Flat): seçenekler self+descendant (B,C) hariç, çalıştırılabilir testler (Test A, Folder Child Test) parent olarak listelendi; (7) B'yi drop-top-level'a bırak → köke döndü; (8) **Details**: Test A'da Details → editör kendi 10 sorusuyla açıldı, düzenlenirken konum seçici gizli; (9) yeni-test konum seçici TÜM öğeleri (testler+folder) parent olarak + "Create Folder …" listeledi; (10) folder-guard: `showTestEditor(folderId)` → boş "yeni test" formu (çökme yok); (11) konsol hatası **yok**; seed temizlendi. **NOT:** screenshot port-proxy uyuşmazlığından alınamadı (ortam artefaktı) — DOM doğrulaması kapsamlı.

## P0 Profesyonel UI Cila Pası (docs/ui_polish_roadmap.md — Stage P0)

`docs/product_ui_quality_profile.md` + `docs/ui_polish_roadmap.md` baz alınarak yapılan ilk cila pası. Davranış/veri/SRS/sync **dokunulmadı**; yalnız markup/CSS/i18n. Build temiz (`vite build` ✓, 53 modül), Vite preview'da canlı doğrulandı (sumi + washi, 375px, en + tr).

### 1. Deck aksiyonları → kebab deseni (`DeckList.js` + `app.css` + `main.js`)
- **Deck list kartı:** Tekil `deck-move-btn` ikon butonu kaldırıldı → TestManager'daki `.card-menu` kebabının aynası eklendi: **Rename (`modal_rename`) / Move (`move_label`) / Delete (danger)**. `.deck-move-btn` CSS'i silindi (ölü).
- **Deck detail:** Eski 3 satır (Study+Add+**inline Delete danger** / tam-genişlik Browse / tam-genişlik Search) → **tek satır**: `Start studying (N)` primary + `Add card` ghost + kebab [**Browse / Search in this deck / Delete(danger)**]. `#deck-scoped-search-bar` yerinde kaldı; `toggleDeckScopedSearch` kebab menü öğesinden çağrılır (canlı doğrulandı).
- **Altyapı:** `toggleDeckMenu(menuId)` / `closeDeckMenus()` export + window global (`main.js`). Detail menüsü id çakışmasın diye `detail-${deckId}` önekli. `DeckList.init`'e TestManager'la aynı dış-tık kapatma listener'ı eklendi (guard'lı; iki listener birlikte zararsız). Menü öğeleri `event.stopPropagation();closeDeckMenus();<aksiyon>` kalıbı kullanır (dış-tık listener'ı menü İÇİ tıklarda tetiklenmez → açık kapama şart).
- **`deleteDeck` view guard'ı:** Artık liste kebabından da çağrılabildiğinden navigasyon `app.currentView === 'deck'` ile korunur — detail'den silme eski davranış (parent'a/decks'e git), listeden silme yerinde `renderDeckList()+renderGlobalStats()`.
- **CSS:** `.btn-row .card-menu { align-self:center }` (kebab btn-row içinde ortalanır).

### 2. Ayarlar dil seçici (`Settings.js` + `app.css` + `index.html`)
- Tanımsız `.theme-btn` sınıfı (stilsiz metin butonları) → **`.lang-btn`** gerçek sınıfı: `--card` zemin + `--bd-ctrl` `--line` kenar + `--r-md` + `--tap` min yükseklik. Aktif (`.is-active`): `--hanko-bg` zemin + `--hanko` metin/kenar + check ikonu + `aria-pressed` (tema seçicinin hanko aktif diliyle tutarlı). `index.html`'deki `#lang-section` inline flex stili → `.lang-grid` sınıfı.
- Ölü `.form-input` sınıfı AI bölümünden kaldırıldı (base input stili zaten geçerli).

### 3. Curated pack kartları premium (`CommunityHub.js` + `app.css`)
- **5 özdeş gri `badge-soft` çip düzeni kaldırıldı** (`packBadges` fonksiyonu silindi). Yeni hiyerarşi: üstte `.pack-card-head` [**`badge-sky` ★ Curated** (yeni `pack_curated_badge` anahtarı) + **`badge-jade` seviye** (ham değer, ör. N5) + `badge-soft` dil kodu] → başlık → açıklama → **tek `.deck-meta` satırı** ("300 cards · 100 test questions · Version: 0.1.0" — mevcut `pack_cards_count`/`pack_tests_count`/`pack_version` anahtarları ' · ' ile birleşik, her parça `esc()`li).
- `.pack-card { border-color: var(--sky) }` — kullanıcı destelerinden sessizce ayrışan sky saç çizgisi (tüm temalarda token'dan). "Imported" rozeti `badge-soft` → **`badge-jade`** (başarı semantiği).
- **Empty/loading/error birleşimi:** `paint()` durumları `.community-state` (düz metin) → **`.empty` şekline** (ikon + satır [+retry]): loading = dönen `sync` ikonu (`.spin` artık `display:inline-flex` — global CSS), error = `alert` ikonu + retry ghost, boş = `community` ikonu. `.community-state` CSS'i silindi (ölü). Curated katalog yükleme notuna küçük spinner eklendi.
- **i18n:** tek yeni anahtar `pack_curated_badge` 4 dile (en 'Curated' / tr 'Küratörlü' / ko '큐레이션' / mn 'Түүвэр'), `curated_packs`'ten hemen sonra.

### 4. Google Fonts kaldırıldı (`index.html`)
5 kullanılmayan Google Font linki (**Libre Baskerville, Pacifico, Righteous, Permanent Marker, Lato**) silindi — hiçbir CSS/JS referansı yoktu (gövde sistem sans yığını, Japonca Mincho sistem fontu). İlk boyamadaki ağ bağımlılığı kalktı (offline-first PWA'ya uygun). Ayrıca `bulk_format` statik fallback metni LANG anahtarıyla eşitlendi (eski 5-alanlı format yazıyordu).

### 5. Genel tutarlılık (app.css)
- **Klavye odak halkası (app geneli):** `:focus-visible { outline: 2px solid var(--sky); outline-offset: 2px }`; input/textarea/select hariç (onlar sky kenarlık odağını korur).
- **Hover:** `@media (hover:hover)` altında `.btn-ghost:hover`/`.icon-btn:hover` → `--paper-2` (dokunmatikte etkisiz).

### Doğrulama
Canlı preview (DOM-tabanlı; screenshot yine port-proxy artefaktı nedeniyle alınamadı): deck list kebabı açılır/dış-tıkla kapanır (Rename deck/Move/Delete); deck detail = 1 `.btn-primary` + 0 inline danger + kebabdan Search bar açma & Browse modalı çalışır; `align-self:center` uygulanır; dil butonları 4×48px, aktif=hanko-bg/hanko (washi'de `#f3dcd6`/`#a8362a`, sumi'de tema karşılıkları), taşma yok; pack kartı sky kenarlıklı + Curated/N5/EN rozet hiyerarşisi + tek meta satırı (en+tr), Import primary; community boş durumu `.empty` ikonlu; `setLang('tr')` tüm yeni yüzeylerde doğru; study girişi + scroll kilidi + çıkışta kilit kalkması sağlam; konsol hatası/uyarısı yok.

## Stage 2 UI Cila Pası (docs/ui_polish_roadmap.md — Stage 2: Cards/Buttons/Forms/Menu Consistency)

P0 sonrası ikinci pas. Davranış/veri/SRS/sync **dokunulmadı**; yalnız markup/CSS/i18n. Build temiz (`vite build` ✓, 53 modül), Vite preview'da canlı doğrulandı (computed-style karşılaştırmalı, 375px, en + tr).

### 1. One-primary-action — 3 fazla primary demote edildi
- **`index.html` → `#btn-ai-deck`:** `btn-primary` → **`btn-ghost`**. Sebep: yalnız AI modalını açan tetikleyici (asıl primary Generate modalın içinde); view-add'in form primary'leri Save + bulk Import olarak kaldı (her biri kendi form bölümünün submit'i — profil §4 Forms kuralı).
- **`TestManager.js` toolbar → "Create New Test":** `btn-primary` → **`btn-ghost`**. Test kartlarındaki `Start (N)` görünümün tek primary'si (Decks aynası: deste oluşturma da sessiz topbar ikon butonu).
- **`CommunityHub.js` header → "Publish":** `btn-primary btn-sm` → **`btn-ghost btn-sm`**. Görünümün asıl aksiyonu kart-başına Download/Import primary'si; başlık yanındaki paylaş/yenile sessiz kalır.
- Kart-başına tek primary (deck Study / test Start / community Download / pack Import) korundu — profil §9 onaylı desen.

### 2. Tekrarlanan inline stiller → paylaşılan sınıflar (`app.css`)
GENERIC CARD bölümüne eklenen yeni sınıflar (Decks & Tests satır yapısı artık birebir aynı markup):
- **`.card-title-btn`** (+ `.card-title-btn .card-title { display:block }`): kart satırındaki görünmez tam-genişlik başlık butonu — eski `style="text-align:left;justify-content:flex-start;flex:1;min-width:0;padding:0"` (DeckList ×2 + TestManager ×1) yerine.
- **`.card-child`**: ağaçta girintili çocuk kartın `border-left:3px solid var(--line)` saç çizgisi (DeckList satır + alt-deste kartı + TestManager `indentStyle`). Dinamik `margin-left` inline kaldı (depth'e bağlı). NOT: `.drag-over`/`.dragging` sınıf kuralları artık sol kenarı da ezebiliyor (eski inline stil ezilemiyordu) — sürükleme vurgusu bütünleşik, kasıtlı iyileşme.
- **`.btn-row.card-actions`**: kart içi kompakt aksiyon satırı `margin-top:.6rem` (eski `.6rem`/`.4rem` inline karışımı tek değerde birleşti; alt-deste satırındaki `btn-sm` küçük Study/Detail butonları da kaldırılıp tam boy yapıldı — liste/test satırlarıyla tutarlı).
- **`.action-note`**: primary yerine geçen soluk not (`display:flex;align-items:center;flex:1`) — "No cards to study"/"no questions" span'leri.
- **`.badge-row`**: deck kartındaki rozet satırı (eski `btn-row` + inline margin yerine; flex+wrap+gap .5rem).
- **`.modal-glyph-head`** (+ `.modal-glyph-head .fc-kanji { font-size:4rem; line-height:1 }`): Kanji/Word modallarının ortalanmış glif başlığı — KanjiModal (bulunan + bulunamayan dallar) ve WordModal'daki 3 farklı inline center bloğu tek sınıfta birleşti.
- **`.head-actions`** + **`.community-hub-head .section-hd { margin:0 }`**: Community başlık aksiyon grubu; iki `style="margin:0"` inline'ı silindi.
- **`.deck-pick-list` / `.deck-pick-btn`** (+ `.deck-pick-btn .text-muted { font-size:.8rem }`): publish modalındaki deste seçici satırları (inline width/align/justify temizlendi; dinamik `padding-left` girintisi inline kaldı).
- **`.search-result .cli-kanji/.cli-meaning/.cli-furi` kuralları:** `Search.js → searchResultHTML` satır şablonundaki tüm inline stiller (ruby küçültme, anlam terfisi, örnek cümle demote) `search-result` sınıfı altında CSS'e taşındı — computed değerler birebir korundu (19.2px/16px/.9rem 600/.8rem 400, canlı doğrulandı). Base `.cli-info .cli-*` kurallarından SONRA tanımlı (eşit özgüllük → kaynak sırası kazanır).

### 3. Form tutarlılığı
- **`Settings.js`:** 4 `<select class="si-input">`'taki `style="text-align:left"` inline'ları silindi → `app.css`'e `select.si-input { text-align:left }` (input'lar sağa hizalı kalır). `.form-input`/`.theme-btn` P0'da zaten temizlenmişti — kod tabanında sıfır referans doğrulandı.
- **`TestEditor.js` alt aksiyon satırı:** `<div style="display:flex;gap:.5rem">` + Cancel(flex:1)/Save(flex:2) **ters sırası** → standart `.btn-row` + **Save primary önce, Cancel ghost sonra** (modal aksiyon sıralamasıyla tutarlı, profil §4 Modals).

### 4. Microcopy / i18n (2 yeni anahtar × 4 dil + 2 hardcoded string düzeltmesi)
- **`test_no_results`** (en 'No test results yet.' / tr 'Henüz test sonucu yok.' / ko '아직 테스트 결과가 없습니다.' / mn 'Тестийн үр дүн алга.', `test_no_questions`'tan hemen sonra): `TestResults.js`'deki hardcoded `"No results"` yerine.
- **`info_label`** (en 'Info' / tr 'Bilgi' / ko '정보' / mn 'Мэдээлэл', `srs_haptics_hint`'ten hemen sonra): `Settings.js → settingItemHTML`'deki hardcoded `aria-label="Bilgi"` yerine.
- **`CommunityHub.showPublishPicker`:** hardcoded `"${count} cards"` → mevcut `pack_cards_count` anahtarı (tr'de "8 kart" canlı doğrulandı).
- `bulk_format` bayat 5-alanlı format P0'da zaten düzeltilmişti (4 dilde 4-alanlı, index.html fallback + placeholder dahil) — değişiklik gerekmedi.
- `TestResults` dönüş butonu `style="margin-top:1rem"` → mevcut `.mt-2` utility.
- **Bilinen boşluk (kapsam dışı bırakıldı):** `index.html`'deki statik `aria-label`'lar ("Geri", "Yeni deste", "Ara", "Güncelleme mevcut") hâlâ hardcoded Türkçe — `data-t` yalnız metin düğümlerini çevirdiğinden JS wiring gerektirir; ayrı bir pasa bırakıldı.

### Doğrulama (Vite preview canlı, DOM/computed-style tabanlı)
(1) Deck kartı: `.card-title-btn` computed = eski inline birebir (left/flex-start/0/flex:1), badge-row 8px gap, actions margin 9.6px, kart+view başına 1 primary; (2) deck detail: 1 primary + 1 ghost + 1 kebab; (3) Tests: toolbar 0 primary/2 ghost, seeded parent→`Start` primary + child `.card-child` (3px border-left + 1.2rem inline indent); (4) TestEditor: [primary:Save, ghost:Cancel]; (5) test-results boş → "No test results yet." (tr: "Henüz test sonucu yok."); (6) Settings: `cfg-fuzz` text-align left, info aria "Info"/"Bilgi"; (7) Community: 2 head, head-actions [ghost, ghost], section-hd margin 0, durum `.empty` şekli; (8) publish picker: space-between + "8 cards"/"8 kart"; (9) arama sonucu computed stiller birebir; (10) Word→Kanji modal drill-down + geri butonu sağlam, glyph head 4rem/lh1; (11) 375px'te yatay taşma yok, konsol hatası yok, seed temizlendi. (Screenshot yine ortam artefaktı nedeniyle alınamadı — DOM doğrulaması kapsamlı.)

## Stage 3 UI Cila Pası (docs/ui_polish_roadmap.md — Stage 3: Decks/Tests Hiyerarşi Paritesi)

Dar kapsamlı parite pası — hiyerarşi mantığı, drag/drop davranışı, veri modeli **dokunulmadı**; yalnız markup/CSS/i18n. Build temiz (`vite build` ✓, 53 modül), Vite preview'da canlı doğrulandı (seeded iç içe deste + test ağacı, 375px, en + tr, washi + sumi).

### Bulunan tutarsızlıklar & düzeltmeler
1. **Tests chevron etiketleri deste dilindeydi:** `TestManager.js` collapse butonu `collapse_decks`/`expand_decks` ("Collapse sub-decks") anahtarlarını kullanıyordu. Yeni **`collapse_tests`/`expand_tests`** anahtarları 4 dile eklendi (`sub_tests_count`'tan hemen sonra; tr 'Alt testleri gizle/göster', ko '하위 테스트 접기/펼치기', mn 'Дэд тест хураах/дэлгэх') ve TestManager'a bağlandı.
2. **`aria-expanded` yoktu:** Her iki collapse butonuna da (`DeckList.js` + `TestManager.js`) `aria-expanded="${!isCollapsed}"` eklendi — toggle'da canlı doğrulandı (true↔false).
3. **Folder ikonu paritesi:** Deste satırları çocuğu olunca 📁 ikonu alıyordu; test satırlarında ikon yalnız legacy `kind:'folder'` öğelerdeydi → **çocuğu olan runnable parent test** ikonsuzdu. `folderIcon = (isFolder || hasChildren)` yapıldı — ikon artık iki tarafta da "alt ağacı var" demek.
4. **Legacy folder satırında meta satırı yoktu:** Deste satırları hep 2 satırlı başlık bloğu (başlık + meta) taşırken folder satırları tek satırdı. Folder'lar artık `question_count` ile **alt ağaç toplamını** meta olarak gösterir (Start (N) sayacıyla eşleşir; boş folder → "0 questions" + muted not — deck'in "0 cards · 0 mastered" + "No cards to study" davranışının aynası).
5. **Drag/drop hardcoded renk:** `.drag-over` halkası `rgba(100,160,255,.35)` ve drop-zone zemini `rgba(100,160,255,.08)` **hardcoded maviydi** (token disiplinine aykırı, sumi'de yanlış). → `color-mix(in srgb, var(--sky) 35%/8%, transparent)` (swipe-glow/heatmap'le aynı teknik). Canlı doğrulama: halka washi'de `#2c5d80`, sumi'de `#7fb0d6` @%35 — tema-duyarlı.

### Zaten tutarlı olduğu doğrulananlar (değişiklik YOK)
Girinti matematiği (1.2rem × depth, inline margin) + `.card-child` saç çizgisi (Stage 2'den), chevron boyut/konumu (30×30 `.deck-collapse-btn`, card-row başında), `deck-sub-badge` rozet stili + paralel "{count} sub-decks"/"{count} sub-tests" metinleri (4 dil), kebab CSS/tek-menü-açık/dışarı-tık kapatma, drop-to-top-level bölgesi (ortak selektörler), long-press → move modal.

### KASITLI ayrılıklar (dokunulmadı — daha önce belgelenmiş kararlar)
Test kebabında Rename yok (runnable test adı Details/editörden değişir); legacy folder başlığı collapse toggle'lar (detayı yok); deck satırındaki SRS rozet satırı (`badge-row`) testlerde yok (SRS durumu yok). Deck dragover'daki işlevsiz `types.includes` kontrolü ve test drop'taki geç `preventDefault` görsel soruna yol açmadığından mantığa dokunulmadı.

### Doğrulama
Seeded ağaç (deste: parent+child; test: parent→child, legacy folder→child, boş folder) ile canlı: iki tarafta chevron 30×30 + doğru dil etiketleri + aria-expanded senkron; parent test 📁 ikonlu; child indent 19.2px + 3px sol çizgi iki tarafta birebir; folder meta "1 questions", boş folder "0 questions"/"No questions to start"/chevron'suz; collapse→child gizlenir/expand→döner (iki taraf); 375px'te decks+tests yatay taşma yok; tr'de "Alt testleri gizle"/"1 alt test"/"1 soru"; konsol hatası yok; seed temizlendi.

## Stage 4–8 UI Cila Pası (docs/ui_polish_roadmap.md — Study/Community/States/Mobile/A11y/Reduced-Motion, tek sınırlı pas)

Kalan yol haritası kalemleri tek pasta tamamlandı. Davranış/veri/SRS/sync/hiyerarşi mantığı **dokunulmadı**; yalnız markup/CSS/i18n/aria. Build temiz (`vite build` ✓, 53 modül), Vite preview'da canlı doğrulandı (sumi, 375px + 320px, en + tr; swipe/flip/grade/kebab/scroll-lock davranış kilitleri eval ile test edildi, konsol hatası yok).

### Study ekranı (Stage 4)
- **Grade grid:** `.ans-again/hard/good/easy` artık `color-mix` ile %22 token-türevi ince kenarlık + `:active`'de %12 koyulaşan tint alır. **Renk haritası değişmedi** ve CSS'e kilit yorumu eklendi: Again=hanko(glow-left), Hard=gold(glow-down), Good=sky(glow-right), Easy=jade(glow-up) — swipe glow ile birebir.
- **`.fc-divider` kısa/ortalanmış** (`min(140px,44%)`, `margin:.9rem auto`) → arka yüz hiyerarşisi (ruby→anlam→örnek) kartı ikiye bölmeden ayrışır; `.fc-preview .fc-divider` yalnız margin override eder (genişliği miras alır). `.fc-meaning` alt boşluğu .6rem'e çekildi.
- **Progress:** `.study-progress(-fill)` radius `var(--r-pill)`; `.study-count`'a `font-variant-numeric:tabular-nums` (sayı değişiminde zıplama yok). `.swipe-hint` `.72rem` (fc-flip-hint ile aynı).
- **Hardcoded `#000` aktif durum düzeltmesi (gerçek sumi bugı):** `.btn-primary:active` ve `#btn-show:active` `#000` fill kullanıyordu → sumi'de (açık ink) basılı butonda metin okunmaz oluyordu. → `color-mix(in srgb, var(--ink) 86%, var(--paper))`. `.btn-danger:active` `#ecc6bf` → `color-mix(hanko 12%, hanko-bg)`.

### Tamamlama / no-due durumları (Stage 4)
- **`renderStudy` boş-kuyruk dalına `studied === 0` guard'ı eklendi:** hiç kart çalışılmadan boş/bitmiş kuyrukla girilirse kutlama yerine sakin `.empty` durumu ("All caught up — no cards due right now." + Back to deck primary). Konfeti/`animateCountUp` bu dalda hiç çalışmaz; kutlama yine oturum başına bir kez (`celebrated` guard dokunulmadı). Yeni anahtar `study_all_caught_up` 4 dile (`Object.assign(LANG.xx, …)` bloklarında).
- **`animateCountUp`'a reduced-motion guard'ı:** `matchMedia('(prefers-reduced-motion: reduce)')` → hedef değer anında basılır (sayaç animasyonu yok).

### Reduced motion (P2 → kapandı)
`app.css` sonuna `@media (prefers-reduced-motion: reduce)` bloğu: view `fadeIn`, `update-pulse`, `donePop`/`doneRise`/`fireFlicker` animasyonları kapatılır; `.streak-flame` transition + `lvl-hot/lvl-blaze` statik scale sıfırlanır; flip/preview-flip/swipe snap-fly/glow/progress-fill/modal/toast geçişleri `.01ms`'e indirilir (durum değişimleri — flip sonucu, snap-back, uçuş sonrası grade — **aynen gerçekleşir**, yalnız anlık olur; `setTimeout` tabanlı grade akışı etkilenmez). Confetti zaten opt-out'tu (confetti.js), sayaç yukarıda. Spinner (`.spin`) kasıtlı korundu (yükleme durumunu ileten temel geri bildirim).

### Community / curated pack ikinci pas (Stage 5–6)
- **`curatedPacksHTML` loading/error durumları `.empty.empty-sm` şekline geçti** (ikon + tek satır; error'da `communityRefresh` retry ghost butonu — eskiden retry'sız düz metindi). Yeni `.empty-sm` kompakt varyantı (`padding:1.5rem`, 36px ikon) app.css'e eklendi — bölüm-içi async durumlar sayfayı itmez.
- Pack grid'indeki inline `style="margin-bottom:1.4rem"` → `.pack-grid` sınıfı. Ready+boş katalog davranışı (bölüm tamamen gizli) değişmedi; remote-only mimari dokunulmadı.

### Empty/loading/error birleştirme (Stage 6)
- `TestView` (soru yok) ve `TestResults` (sonuç yok) empty durumlarına `.empty-icon` (inbox) eklendi — artık tüm empty'ler ikonlu ortak şekilde.
- **Decks boş durumuna tek CTA:** `#deck-list-empty`'ye `#btn-empty-create-deck` primary butonu (`modal_create_deck` anahtarı yeniden kullanıldı, statik + ikonlu); `main.js`'de `DeckList.showAddDeckModal`'a bağlandı. Boş durumda görünen tek primary — "one primary per view" korunur.
- `.empty-icon` hardcoded `#c4b99c` → `var(--ink-soft)` + `opacity:.5` (tüm temalarda türetilir).

### Mobil (Stage 7)
- **Gerçek yatay taşma düzeltildi:** swipe-glow halosu (`inset:-22px`) 375px'te 6px yana taşıyor ve sayfa yatay kaydırılabiliyordu (v2.5.0'dan beri). → `html` **ve** `body`'ye `overflow-x: clip` (`hidden` DEĞİL — clip scroll container oluşturmaz, `position:sticky` önizleme kartı bozulmaz; viewport kaydırması kök elemanın overflow'unu izlediğinden yalnız body yetmez, canlı testte doğrulandı: scrollX 6.4→0).
- Decks başlığı arama butonu: inline 34px stil → `.section-hd-row .icon-btn` (40×40, CSS'te). Deck-detail topbar rename butonu 30→34px. 320px'te decks+study taşmasız; grade grid 2×2 64px yükseklik, tr etiketleri sığar; alt nav 5 öğe sağlam; study scroll-lock çalışır.

### Erişilebilirlik (Stage 8)
- **Hardcoded Türkçe aria-label'lar i18n'e bağlandı:** `updateStaticTexts`'e `data-ta` desteği (aria-label ← `t(key)`); `index.html`'de btn-back/btn-update/btn-add-deck/btn-toggle-deck-search `data-ta` aldı (İngilizce fallback + mevcut `back`/`update_available`/`new_deck` anahtarları; yeni `search_label` anahtarı 4 dile). `title="Ara"` kaldırıldı.
- **Kebab menüler:** `.card-menu-btn`'e `aria-haspopup` + `aria-expanded` (DeckList + TestManager `toggle*/close*` fonksiyonları senkron tutar — canlı doğrulandı false↔true).
- **Settings info butonları:** `id="info-btn-{key}"` + `aria-expanded` + `aria-controls`; `toggleSettingInfo` panel aç/kapa ile senkron tutar.
- Update popover kapatma (`up-close`) butonlarına `aria-label=t('close')`; TestEditor'daki ikon-only seçenek-sil/soru-sil butonlarına `aria-label=t('delete_btn')`.

### Token temizliği (Stage 8 çevresi)
`app.css`'te kalan hardcoded renkler token-türevi yapıldı: `update-pulse` keyframe rgba → `color-mix(hanko)`, `.streak-flame.lvl-blaze` drop-shadow rgba → `color-mix(hanko 45%)`, `.fm-token.fm-kanji` rgba → `color-mix(hanko 10/22%)`. **`.search-input:focus` hanko → `var(--sky)`** (diğer tüm inputlarla tutarlı bilgi/odak rengi). Kasıtlı bırakılanlar: `#modal-bg` scrim, `--sh-*` tokenlarının kendi rgba'ları, tema swatch'larındaki literal renkler, `.cal-day.is-active`/nav'daki beyaz-on-saturated (yerleşik strong-fill bağlamları).

### KASITLI atlananlar
Brand adı ("Stacks" vs Kanji-SRS, P3 — kullanıcı onayı gerekir); loading skeleton'ları (mevcut spinner'lı `.empty` şekli yeterli, skeleton karmaşıklığı gereksiz); study ekranında alt nav'ın gizlenmesi (navigasyon davranışı değişikliği olurdu); breadcrumb uzun-isim sarması (mevcut ellipsis yeterli, canlıda taşma üretmedi); Electron çok-sütun yoğunluk iyileştirmeleri (P3).

## Nova Teması (v2) — Tema-Kapsamlı Alternatif Ürün Kabuğu (6. tema)

5 kağıt-temasının yanına eklenen, seçildiğinde uygulamayı **kompozisyon düzeyinde farklı bir ürün** gibi gösteren parlak/fütüristik kabuk. İlk (v1) Nova pası "recolor" kaldığı için kullanıcı talebiyle v2'de **yapısal** hâle getirildi. Davranış/routing/FSRS/sync'e sıfır dokunuş; eski temalar canlı regression ile birebir doğrulandı.

### Mimari — 3 yapısal kanca + CSS kompozisyonu (JS'te TEMA DALI YOK)
Tema-koşullu JS yoktur; tema değişimi anında (re-render'sız) uygulanır. Tüm yapı şu kancalarla kurulur:
1. **`.nv-only` elemanlar:** Bileşenler HER temada render eder; base `.nv-only { display:none }` (app.css MISC) gizler, yalnız `[data-theme="nova"]` gösterir. Örnekler: `#nv-decks-greeting` (hero tarih/gün — `DeckList.fillNovaGreeting`, `weekdays_full` i18n anahtarı 4 dile eklendi), `.nv-tile` (deste/test kartlarında ismin ilk grafemi, Mincho gradient karo — `DeckList.novaTile()` + TestManager satırı), `.nv-pack-emblem` (curated pack N5 seviye bloğu), `.nv-tile-user` (community satır avatarı). Hepsi `aria-hidden` (a11y adını kirletmez).
2. **`.nv-hide` elemanlar:** Nova'nın kompozisyonda kaldırdığı (işlevi başka yoldan zaten var olan) elemanlar — deck/test kartlarındaki **Detail ghost butonu** (başlık tap'i aynı `openDeck`/`showTestEditor`'ı çağırır) ve pack head'deki küçük seviye rozeti (emblem'e taşındı). Yalnız Nova'da `display:none`.
3. **Nötr sarmalayıcılar:** `index.html` → `#decks-top` / `#decks-body`; `DeckList.renderDeckDetail` → `.deck-detail-hero`; üç arka yüz şablonu (CardView study×2 + review, DeckList kart önizleme) → `.fc-example-wrap`. Standart temalarda stilsiz (görünmez, blok akışı birebir) — canlıda `wrapperInert:true` doğrulandı.

### Kompozisyon farkları (Nova aktifken)
- **Dashboard:** `#decks-top` = 30px gradient **hero paneli** (büyük `07.03 / Friday` tarih tipografisi + buzlu stat çipleri + **koyu lacivert streak banner'ı** — parlak kabuğun kasıtlı kontrast parçası); `#decks-body` = hero'nun üstüne -1.4rem bindirmeli **beyaz içerik sheet'i** (26px). Deste kartları sheet içinde **karo-öncülü satırlara** dönüşür: 44px gradient glif karosu + başlık/meta + kebab; rozetler başlığın altına (flex `order`), Study sağa hizalı **gradient pill** (Detail gizli). Drag/drop + `.card-child` ağaç çizgisi scoped re-assert'lerle korunur (satır stilinin özgüllüğü base `.dragging/.drag-over`ı ezdiğinden — bilinçli).
- **Bottom nav:** **koyu cam kapsül dock** — ekrandan kopuk (alt .75rem+safe, yan 12.8px), `#101628` gradient + blur, aktif öğe **gradient dolgulu pill morph** (spring `::before`) + beyaz ikon/etiket. `#app` 108px, `#toast` 94px offset. Electron ≥768 sidebar geometrisi media bloğunda restore (açık cam; koyu kapsül mobil/web imzası).
- **Study:** progress **cam kapsül header** (koyu sayaç pili) + 28px gradient-hairline cam yüzler + glif arkasında halo + sahne aurası; arka yüzde `.fc-divider` GİZLİ → örnek cümle **buzlu alt-panele** (`.fc-example-wrap`) taşınır (kompozisyon değişimi); `#btn-show` 58px gradient kapsül + `novaSheen`; cevap kartı `nvCardIn` girişi (drag başlar başlamaz `animation:none` — inline transform'la çatışmaz); grade grid **70px premium karolar + parlayan renk noktası** (`::before`, currentColor) — **semantik harita AYNEN**: Again=hanko/Hard=gold/Good=sky/Easy=jade, swipe glow eşleşmesi değişmedi.
- **Tests:** `#test-manager-content` beyaz sheet; test satırları deck satırlarıyla aynı karo/pill sistemi (paylaşılan selektörler); tv-question-card/tr-score-card gradient hero panelleri; correct/wrong tintleri re-assert.
- **Settings — kontrol merkezi:** `#settings-fields` tek cam panel, `.settings-item`'lar kart yerine **çizgiyle ayrılmış satırlar**; tema seçici **3 sütun karo grid** (swatch tam-genişlik 42px tile; `data-tid` attr'ı Settings.js şablonuna eklendi — Nova seçeneği gradient çerçeveli "featured").
- **Community — marketplace:** pack kartı gradient çerçeve + sağ üst **N5 emblem bloğu**; kullanıcı desteleri **avatar-öncülü grid satırları** (`grid-template-areas: tile/title/meta/desc/tags/foot`).
- **Global doku:** `.section-hd` uppercase+hairline imzası Nova'da **modern headline** stiline döner (`::after` yok); aurora fixed `body::before`; modal buzlu sheet + tutma sapı + ortalanmış başlık; Kanji/Word modal glif halosu + cam detay satırları + pill etiket çipleri + 56px çipler; empty ikonları gradient daire.

### Reduced motion
Nova animasyonları (novaViewIn/novaRise/nvCardIn/novaSheen/novaPopIn + spring transitionlar) genel RM bloğundan yüksek özgüllüklü olduğundan dosya sonunda **Nova'ya özel ikinci `prefers-reduced-motion` bloğu** hepsini kapatır; durum değişimleri korunur. Nova'ya animasyon eklerken bu bloğa opt-out eklenmeli.

### Dosyalar
`app.css` (tokenlar + `.nv-only` base + dosya sonunda ~700 satır v2 kabuk katmanı — dosya SONUNDA olması eşit-özgüllük çakışmalarını Nova lehine çözer), `index.html` (dashboard sarmalayıcıları + greeting), `main.js` (yalnız `weekdays_full` ×4 dil), `Settings.js` (THEMES nova girişi + `swatch` gradient + `data-tid`), `DeckList.js` (greeting fill, novaTile, nv-hide, deck-detail-hero, örnek-wrap), `CardView.js` (3 arka yüzde `.fc-example-wrap`), `TestManager.js` (karo + nv-hide), `CommunityHub.js` (emblem + avatar karo, boş yazar guard'lı).

### Doğrulama
`vite build` ✓. Canlı (375px, computed-style + a11y-tree; screenshot aracı ortam sorunundan kilitliydi): hero/sheet/karo/pill/dock/study sahnesi/grade dotları/Word→Kanji geri-nav/marketplace/kontrol merkezi ✓; grading + kuyruk akışı ✓; kebab `novaPopIn` + arama pill ✓; yatay taşma yok; konsol hatası yok. **Washi+Sumi regression:** sarmalayıcılar inert, nv-only gizli, Detail görünür, nav tam-genişlik köşesiz, kart 14px/token renkleri, section-hd uppercase, `#app` 96px — birebir eski görünüm.
