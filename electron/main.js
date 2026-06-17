// ============================================================
// KANJI SRS — ELECTRON MASAÜSTÜ UYGULAMASI (main process)
// ============================================================
// Bu dosya, web uygulamasını (web/index.html) bir masaüstü
// penceresinde açan "kabuk"tur. İçindeki mantığa dokunmaz,
// sadece bir pencere açıp web/index.html dosyasını yükler.

const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

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

  // Basit bir menü (sadece Çıkış / Yeniden Yükle / DevTools)
  const template = [
    {
      label: 'Dosya',
      submenu: [
        { role: 'reload', label: 'Yeniden Yükle' },
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

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
