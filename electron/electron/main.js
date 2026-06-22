// ============================================================
// KANJI SRS — ELECTRON MASAÜSTÜ UYGULAMASI (main process)
// ============================================================
// Bu dosya, web uygulamasını (web/index.html) bir masaüstü
// penceresinde açan "kabuk"tur. İçindeki mantığa dokunmaz,
// sadece bir pencere açıp web/index.html dosyasını yükler.
//
// Otomatik güncelleme: electron-updater, GitHub Releases'i
// kontrol eder. Yeni bir sürüm bulunduğunda main process bunu
// preload.js üzerinden web sayfasına (renderer) bildirir; web
// sayfası kendi arayüzünde (sağ üstteki indirme butonu ve
// bildirim baloncuğu) gösterir. İndirme ve kurulum tamamen
// kullanıcının onayına bağlıdır — hiçbir şey otomatik/zorla
// olmaz, hiçbir native (Electron) dialog penceresi açılmaz.

const { app, BrowserWindow, Menu, shell, ipcMain } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');

let mainWindow = null;
let pendingUpdateInfo = null;   // update-available'da gelen bilgi, renderer hazır olunca tekrar gönderilir
let updateDownloaded = false;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 720,
    minWidth: 380,
    minHeight: 600,
    backgroundColor: '#1c1a17',
    icon: path.join(__dirname, 'build', 'icon.png'),
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
    },
    title: 'Stacks',
  });

  mainWindow.loadFile(path.join(__dirname, 'web', 'index.html'));

  // Dış linkler (varsa) sistem tarayıcısında açılsın, uygulama içinde değil
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Sayfa (yeniden) yüklendiğinde, eğer elimizde bekleyen bir
  // güncelleme bilgisi varsa tekrar gönder (renderer state'i sıfırlanmış olabilir)
  mainWindow.webContents.on('did-finish-load', () => {
    if (pendingUpdateInfo) {
      mainWindow.webContents.send('update:available', pendingUpdateInfo);
    }
  });

  buildMenuForLang(currentMenuLang);
}

// ─── NATIVE MENÜ ÇOK DİLLİLİK ───────────────────────────────────────────
// main.js (native Electron süreci) localStorage'a doğrudan erişemez —
// web sayfası kendi dilini IPC üzerinden (preload.js -> 'app:set-lang')
// burada bildirir, biz de menüyü o dile göre yeniden kurarız.
const MENU_LABELS = {
  tr: { file: 'Dosya', reload: 'Yeniden Yükle', checkUpdates: 'Güncellemeleri Kontrol Et', quit: 'Çıkış',
        view: 'Görünüm', zoomIn: 'Yakınlaştır', zoomOut: 'Uzaklaştır', resetZoom: 'Sıfırla', devTools: 'Geliştirici Araçları' },
  en: { file: 'File', reload: 'Reload', checkUpdates: 'Check for Updates', quit: 'Quit',
        view: 'View', zoomIn: 'Zoom In', zoomOut: 'Zoom Out', resetZoom: 'Reset Zoom', devTools: 'Developer Tools' },
  zh: { file: '文件', reload: '重新加载', checkUpdates: '检查更新', quit: '退出',
        view: '视图', zoomIn: '放大', zoomOut: '缩小', resetZoom: '重置缩放', devTools: '开发者工具' },
  mn: { file: 'Файл', reload: 'Дахин ачаалах', checkUpdates: 'Шинэчлэлт шалгах', quit: 'Гарах',
        view: 'Харагдац', zoomIn: 'Томруулах', zoomOut: 'Жижигрүүлэх', resetZoom: 'Дахин тохируулах', devTools: 'Хөгжүүлэгчийн хэрэгсэл' },
};
let currentMenuLang = 'en';

function buildMenuForLang(lang) {
  const L = MENU_LABELS[lang] || MENU_LABELS.en;
  const template = [
    {
      label: L.file,
      submenu: [
        { role: 'reload', label: L.reload },
        { type: 'separator' },
        { label: L.checkUpdates, click: () => checkForUpdates(true) },
        { type: 'separator' },
        { role: 'quit', label: L.quit },
      ],
    },
    {
      label: L.view,
      submenu: [
        { role: 'zoomIn', label: L.zoomIn },
        { role: 'zoomOut', label: L.zoomOut },
        { role: 'resetZoom', label: L.resetZoom },
        { type: 'separator' },
        { role: 'toggleDevTools', label: L.devTools },
      ],
    },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

// ─── OTOMATİK GÜNCELLEME (bildirim odaklı, opsiyonel) ──────────────────
// autoDownload KAPALI: sadece varlığı tespit edilir, indirme kullanıcı
// "İndir" butonuna basana kadar BAŞLAMAZ.
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = false;

function send(channel, payload) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send(channel, payload);
  }
}

autoUpdater.on('update-available', (info) => {
  pendingUpdateInfo = {
    version: info.version,
    releaseNotes: typeof info.releaseNotes === 'string' ? info.releaseNotes : '',
  };
  updateDownloaded = false;
  send('update:available', pendingUpdateInfo);
});

autoUpdater.on('update-not-available', () => {
  // Sadece kullanıcı menüden ELLE kontrol ettiğinde sayfaya bildir;
  // açılıştaki sessiz/otomatik kontrolde (silent=true) hiçbir şey
  // gösterilmez, kullanıcıyı gereksiz "güncelleme yok" mesajıyla
  // rahatsız etmemek için.
  if (!silentCheck) send('update:not-available', {});
});

autoUpdater.on('error', (err) => {
  if (!silentCheck) send('update:error', { message: err?.message || String(err) });
});

autoUpdater.on('download-progress', (progress) => {
  send('update:download-progress', { percent: Math.round(progress.percent) });
});

autoUpdater.on('update-downloaded', (info) => {
  updateDownloaded = true;
  send('update:downloaded', { version: info.version });
});

let silentCheck = true; // açılıştaki ilk kontrol sessiz olsun
function checkForUpdates(manual) {
  silentCheck = !manual;
  autoUpdater.checkForUpdates().catch((err) => {
    if (!silentCheck) send('update:error', { message: err?.message || String(err) });
  });
}

// ─── RENDERER'DAN GELEN İSTEKLER (preload.js üzerinden) ────────────────
ipcMain.handle('update:check', () => { checkForUpdates(); });
ipcMain.handle('update:download', () => { autoUpdater.downloadUpdate(); });
ipcMain.handle('update:install', () => { autoUpdater.quitAndInstall(); });
ipcMain.handle('update:get-pending', () => {
  if (updateDownloaded) return { state: 'downloaded', info: pendingUpdateInfo };
  if (pendingUpdateInfo) return { state: 'available', info: pendingUpdateInfo };
  return { state: 'none' };
});

// Web sayfası dilini değiştirdiğinde (ya da ilk açılışta) burayı çağırır;
// native menü (Dosya/Görünüm vb.) o dile göre yeniden kurulur.
ipcMain.handle('app:set-lang', (_event, lang) => {
  currentMenuLang = MENU_LABELS[lang] ? lang : 'en';
  buildMenuForLang(currentMenuLang);
});

app.whenReady().then(() => {
  createWindow();
  // Açılışta otomatik kontrol (sessiz — sadece varlığı tespit eder, indirmez)
  checkForUpdates();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
