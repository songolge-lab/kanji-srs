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
    width: 480,
    height: 850,
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
    title: '漢字帖 — Kanji Defterim',
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

  // Basit bir menü (sadece Çıkış / Yeniden Yükle / DevTools / Güncelleme Kontrol)
  const template = [
    {
      label: 'Dosya',
      submenu: [
        { role: 'reload', label: 'Yeniden Yükle' },
        { type: 'separator' },
        {
          label: 'Güncellemeleri Kontrol Et',
          click: () => checkForUpdates(true),
        },
        { type: 'separator' },
        { role: 'quit', label: 'Çıkış' },
      ],
    },
    {
      label: 'Görünüm',
      submenu: [
        { role: 'zoomIn', label: 'Yakınlaştır' },
        { role: 'zoomOut', label: 'Uzaklaştır' },
        { role: 'resetZoom', label: 'Sıfırla' },
        { type: 'separator' },
        { role: 'toggleDevTools', label: 'Geliştirici Araçları' },
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
  send('update:not-available', {});
});

autoUpdater.on('error', (err) => {
  send('update:error', { message: err?.message || String(err) });
});

autoUpdater.on('download-progress', (progress) => {
  send('update:download-progress', { percent: Math.round(progress.percent) });
});

autoUpdater.on('update-downloaded', (info) => {
  updateDownloaded = true;
  send('update:downloaded', { version: info.version });
});

function checkForUpdates() {
  autoUpdater.checkForUpdates().catch((err) => {
    send('update:error', { message: err?.message || String(err) });
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
