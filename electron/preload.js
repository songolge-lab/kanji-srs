// ============================================================
// PRELOAD SCRIPT — main process ile web sayfası (renderer)
// arasındaki GÜVENLİ köprü.
// ============================================================
// contextIsolation açık olduğu için web sayfası (index.html)
// doğrudan Node.js veya Electron API'lerine erişemez. Bu dosya,
// sadece aşağıda açıkça tanımladığımız fonksiyonları
// `window.electronAPI` üzerinden web sayfasına sunar — böylece
// web sayfası rastgele dosya okuma/yazma gibi tehlikeli
// işlemler yapamaz, sadece güncelleme ile ilgili izin verilen
// işlemleri tetikleyebilir.

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  isElectron: true,

  // Renderer -> main: offline furigana sözlük dosyasını oku (dist/dict/<name>).
  // Packaged app file:// üzerinden yüklendiğinden renderer fetch ile dict
  // okuyamaz; bytes'ı main process Node fs ile okur ve döner.
  readDict: (name) => ipcRenderer.invoke('furigana:read-dict', name),

  // Renderer -> main: güncellemeleri kontrol et / indir / kur
  checkForUpdates: () => ipcRenderer.invoke('update:check'),
  downloadUpdate: () => ipcRenderer.invoke('update:download'),
  installUpdate: () => ipcRenderer.invoke('update:install'),
  getPendingUpdate: () => ipcRenderer.invoke('update:get-pending'),

  // main -> renderer: güncelleme olaylarını dinle
  onUpdateAvailable: (callback) => {
    ipcRenderer.on('update:available', (_event, info) => callback(info));
  },
  onUpdateNotAvailable: (callback) => {
    ipcRenderer.on('update:not-available', (_event, info) => callback(info));
  },
  onUpdateError: (callback) => {
    ipcRenderer.on('update:error', (_event, info) => callback(info));
  },
  onDownloadProgress: (callback) => {
    ipcRenderer.on('update:download-progress', (_event, info) => callback(info));
  },
  onUpdateDownloaded: (callback) => {
    ipcRenderer.on('update:downloaded', (_event, info) => callback(info));
  },
});
