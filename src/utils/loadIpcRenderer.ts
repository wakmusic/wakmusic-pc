declare global {
  interface Window {
    ipcRenderer?: Electron.IpcRenderer;
  }
}

try {
  window.ipcRenderer = window.require("electron").ipcRenderer;
} catch {
  window.ipcRenderer = undefined;
}

export {};
