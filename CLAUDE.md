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
