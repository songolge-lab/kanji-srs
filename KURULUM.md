# 漢字帖 Kanji Defterim — Kurulum Kılavuzu

Bu kılavuz 3 adımı kapsıyor:
1. **Bulut senkron** kurulumu (Supabase — ücretsiz)
2. **Telefon** kurulumu (PWA / Ana Ekrana Ekle)
3. **Bilgisayar** kurulumu (Windows .exe — GitHub Actions ile bulutta derleme)

Hepsini sırayla yap, atlama — senkron olmadan diğer adımlar çalışır ama cihazlar birbirine bağlanmaz.

---

## 1. BULUT SENKRON KURULUMU (Supabase)

Bu adım, telefon ve PC'nin aynı kartları görmesini sağlayacak ücretsiz bulut veritabanını kurar. ~5 dakika sürer.

### 1.1 Hesap aç
1. https://supabase.com adresine git, **"Start your project"** ile ücretsiz hesap aç (GitHub hesabınla da girebilirsin).
2. **"New Project"** de.
3. Bir isim ver (örn: `kanji-srs`), bir veritabanı şifresi belirle (not al, lazım olmayabilir ama yine de sakla), bölge olarak sana yakın birini seç (örn. Tokyo / Northeast Asia).
4. **"Create new project"** — kurulması 1-2 dakika sürer.

### 1.2 Tabloyu oluştur
1. Sol menüden **"SQL Editor"**'a gir.
2. **"New query"** de.
3. Bu projede sana verdiğim `supabase-schema.sql` dosyasının içeriğini kopyala, oraya yapıştır.
4. Sağ alttaki **"Run"** butonuna bas. "Success" mesajı görmelisin.

### 1.3 Bağlantı bilgilerini al
1. Sol menüden **Project Settings → API**'ye gir (dişli ikonu → API).
2. İki değeri kopyala:
   - **Project URL** (örn: `https://abcdefgh.supabase.co`)
   - **anon public** key (uzun bir metin, `eyJ...` ile başlar)

### 1.4 Bu değerleri uygulamaya yapıştır
`web/index.html` dosyasını bir metin düzenleyici ile aç (Not Defteri yeterli), şu satırları bul:

```js
const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';
```

`YOUR_PROJECT.supabase.co` kısmını kendi Project URL'inle, `YOUR_ANON_KEY` kısmını kendi anon key'inle değiştir. Kaydet.

**ÖNEMLİ:** Bu işlemi 3 dosyada da yapman gerekiyor (hepsi aynı `index.html` koduna sahip):
- `web/index.html` (PWA / telefon için)
- `electron/web/index.html` (masaüstü uygulaması için)

İkisinin aynı olduğundan emin olmak için: `web/index.html`'i düzenledikten sonra, içeriğini `electron/web/index.html` üzerine kopyalayabilirsin.

---

## 2. TELEFON KURULUMU (iPhone — PWA)

1. `web/` klasörünü GitHub Pages veya Netlify Drop gibi bir yere yükle (https üzerinden erişilebilir hale getir). Daha önce konuştuğumuz gibi:
   - **Netlify Drop** (en hızlı, hesap gerekmez): https://app.netlify.com/drop adresine git, `web` klasörünü sürükle-bırak, sana bir link verecek.
   - **GitHub Pages**: Bu repoyu GitHub'a yükleyip Settings → Pages'den `web` klasörünü yayınla.
2. Verilen linki **iPhone'da Safari'de** aç (Chrome değil).
3. Paylaş butonu → **"Ana Ekrana Ekle"**.
4. Ana ekranda 漢字帖 ikonu belirecek, dokununca tam ekran app gibi açılır.
5. Ayarlar → Cihazlar Arası Senkron → **"Yeni kod oluştur"** de. Sana 6 haneli bir kod verecek (örn: `482913`). Bu kodu not al.

---

## 3. BİLGİSAYAR KURULUMU (Windows .exe)

Bilgisayarında hiçbir program kurmadan, GitHub'ın kendi sunucularında otomatik derleme yaptıracağız.

### 3.1 GitHub'a yükle
1. https://github.com adresinde ücretsiz hesap aç (yoksa).
2. Yeni bir repo oluştur (örn: `kanji-srs`), **Private** (gizli) seçebilirsin, sorun olmaz.
3. Bu projede sana verdiğim tüm klasör ve dosyaları (yani `electron/`, `.github/`, `web/`, `supabase-schema.sql`, bu kılavuz) o repoya yükle. En kolay yol: GitHub repo sayfasında **"Add file" → "Upload files"** ile hepsini sürükle-bırak yap (klasör yapısını koru).

### 3.2 Otomatik derlemeyi başlat
1. Repo sayfasında üstteki **"Actions"** sekmesine gir.
2. Soldaki listede **"Windows EXE Derle"** işine tıkla.
3. Sağ üstte **"Run workflow"** butonuna bas, açılan kutuda tekrar **"Run workflow"** de.
4. Sayfa yenilenince bir satır görünecek, sarı/turuncu nokta dönerken bekle (~3-5 dakika), yeşil tik olunca tamamlanmış demektir.
5. O satırın üstüne tıkla, en altta **"Artifacts"** bölümünde **"kanji-srs-windows"** göreceksin, indir.
6. İndirdiğin zip'i aç, içindeki `.exe` kurulum dosyasını çalıştır, kur.

   **NOT:** Windows ilk açılışta "Windows bu uygulamayı tanımıyor / Bilinmeyen yayıncı" diye bir mavi uyarı ekranı gösterebilir. Bu normal — uygulamayı resmi olarak imzalatmadık (bu ücretli bir sertifika gerektiriyor). **"Daha fazla bilgi" → "Yine de çalıştır"** diyerek devam edebilirsin. Kendi yazdığın/derlediğin bir uygulama olduğu için güvenlidir.

7. Masaüstünde **Kanji Defterim** kısayolu oluşacak. Aç.
8. Ayarlar → Cihazlar Arası Senkron → telefonda oluşturduğun **6 haneli kodu gir**, "Bu kodla bağlan" de.

Artık telefonda eklediğin kart birkaç saniye içinde PC'de de görünecek (ve tersi).

---

## SORUN GİDERME

**"Bulut senkron henüz yapılandırılmadı" uyarısı görüyorum**
→ `SUPABASE_URL` / `SUPABASE_ANON_KEY` değerlerini doldurmadın veya hatalı yapıştırdın. 1.4. adıma dön.

**Senkron rozeti sürekli "⚠ Bağlantı hatası" gösteriyor**
→ İnternet bağlantını kontrol et. Sorun sürerse Supabase projenin "SQL Editor"ünde `select * from app_state;` çalıştırıp tablo gerçekten var mı bak.

**GitHub Actions'da derleme kırmızı (başarısız) çıkıyor**
→ İşin üstüne tıkla, log'ları oku; genelde `electron/package.json` veya `electron/web/` klasör yapısı eksik/yanlış konumda olur. Klasör yapısının repo kökünde tam olarak şu şekilde olduğundan emin ol:
```
electron/
  main.js
  package.json
  build/icon.png
  web/index.html
  web/manifest.json
  web/sw.js
  web/icons/...
.github/
  workflows/build-windows.yml
```

**iPhone'da "Ana Ekrana Ekle" çıkmıyor**
→ Safari kullandığından emin ol (Chrome'da bu özellik iOS'ta çalışmaz). Sayfanın https:// ile açıldığından emin ol (file:// değil).
