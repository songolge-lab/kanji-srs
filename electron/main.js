// ============================================================
// KANJI SRS — ELECTRON MASAÜSTÜ UYGULAMASI (main process)
// ============================================================
// Bu dosya, web uygulamasını (web/index.html) bir masaüstü
// penceresinde açan "kabuk"tur. İçindeki mantığa dokunmaz,
// sadece bir pencere açıp web/index.html dosyasını yükler.
//
// Otomatik güncelleme: electron-updater, GitHub Releases'i
// kontrol eder. Yeni bir sürüm (Release olarak "Publish"
// edilmiş) varsa sessizce indirir, kullanıcıya sorar, "Yeniden
// Başlat ve Kur" dediğinde uygulamayı günceller.

const { app, BrowserWindow, Menu, shell, dialog } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');

let mainWindow = null;

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
    },
    title: '漢字帖 — Kanji Defterim',
  });

  mainWindow.loadFile(path.join(__dirname, 'web', 'index.html'));

  // Dış linkler (varsa) sistem tarayıcısında açılsın, uygulama içinde değil
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
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

// ─── OTOMATİK GÜNCELLEME ────────────────────────────────────────────
// manual=true ise (menüden tetiklendiyse) sonucu her durumda bir
// pencereyle bildirir. manual=false ise (açılışta otomatik) sadece
// güncelleme bulunduğunda/indiğinde bir şey gösterir, sessiz kalır.
function checkForUpdates(manual) {
  autoUpdater.autoDownload = true;

  autoUpdater.on('update-available', (info) => {
    dialog.showMessageBox(mainWindow, {
      type: 'info',
      title: 'Güncelleme bulundu',
      message: `Yeni sürüm (${info.version}) indiriliyor. Hazır olduğunda haber vereceğim.`,
      buttons: ['Tamam'],
    });
  });

  autoUpdater.on('update-not-available', () => {
    if (manual) {
      dialog.showMessageBox(mainWindow, {
        type: 'info',
        title: 'Güncel',
        message: 'Zaten en güncel sürümü kullanıyorsun.',
        buttons: ['Tamam'],
      });
    }
  });

  autoUpdater.on('error', (err) => {
    if (manual) {
      dialog.showMessageBox(mainWindow, {
        type: 'error',
        title: 'Güncelleme kontrolü başarısız',
        message: 'Güncelleme sunucusuna erişilemedi: ' + (err?.message || err),
        buttons: ['Tamam'],
      });
    }
  });

  autoUpdater.on('update-downloaded', (info) => {
    dialog.showMessageBox(mainWindow, {
      type: 'info',
      title: 'Güncelleme hazır',
      message: `Sürüm ${info.version} indirildi. Şimdi yeniden başlatıp kurmak ister misin?`,
      buttons: ['Şimdi Yeniden Başlat', 'Daha Sonra'],
      defaultId: 0,
      cancelId: 1,
    }).then((result) => {
      if (result.response === 0) {
        autoUpdater.quitAndInstall();
      }
    });
  });

  autoUpdater.checkForUpdates().catch(() => {
    // Sessizce yut: internet yoksa veya repo henüz hiç release
    // içermiyorsa uygulama yine de normal açılmalı.
  });
}

app.whenReady().then(() => {
  createWindow();
  // Açılışta otomatik kontrol (sessiz, sonuç göstermez)
  checkForUpdates(false);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
