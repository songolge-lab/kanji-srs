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

## Çalışma Ekranı Gesture Flip

- Kartı mouse/parmak ile sürükleyerek çevirme (`initFlipGesture()`)
- `.fc-flip-container` > `.fc-flip-inner` > `.fc-flip-front` + `.fc-flip-back` yapısı
- Sürükleme mesafesi kartın genişliğine orantılı `rotateY()` uygular
- 90° eşiği geçilirse flip tamamlanır, geçilmezse geri döner
- "Show answer" butonu da hâlâ çalışır (fallback)
