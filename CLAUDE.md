# Stacks

Japonca kanji/kelime öğrenme uygulaması — SRS (Spaced Repetition System) tabanlı.

## Mimari

- **Tek HTML dosyası:** Tüm uygulama `web/index.html` içinde yaşar (vanilla JS + CSS, framework yok).
- **PWA:** `web/sw.js` service worker ile çevrimdışı çalışır.
- **Electron:** `electron/main.js` masaüstü sarmalayıcısı.
- **Supabase:** Bulut senkronizasyonu için `supabase-schema.sql` şeması.

## Klasör Yapısı

```
web/                  ← PWA kaynakları (ana kopya)
electron/
  web/                ← web/ klasörünün birebir kopyası — her zaman senkron tutulmalı
  main.js             ← Electron ana süreç
  preload.js
  package.json
  build/              ← Electron derleme çıktıları / ikonlar
```

## Kritik Kurallar

### Dosya Senkronizasyonu
`electron/web/` klasörü her zaman `web/` ile birebir aynı olmalı. `web/` altında yapılan her değişiklik `electron/web/` altına da yansıtılmalı.

### Versiyon Senkronizasyonu
Versiyon numarası 3 yerde tutulur ve hepsi aynı olmalı:
1. `web/index.html` → `const APP_VERSION = '...'`
2. `web/sw.js` → `const CACHE_NAME = 'kanji-srs-v...'`
3. `electron/package.json` → `"version": "..."`

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
