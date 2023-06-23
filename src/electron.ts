import { BrowserWindow, app, ipcMain } from "electron";
import * as isDev from "electron-is-dev";
import { join } from "path";

(async () => {
  // Initialize the Electron application
  app.whenReady().then(() => {
    const win = new BrowserWindow({
      width: 1240,
      height: 720,
      minWidth: 1240,
      minHeight: 720,
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    win.setMenuBarVisibility(false);

    if (isDev) {
      win.webContents.openDevTools();
      win.loadURL(`http://localhost:3000`);
    } else {
      win.loadFile(join(__dirname, "../dist/index.html"));
    }
  });
})();

ipcMain.on("window:least", () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) win.minimize();
});

ipcMain.on("window:max", () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win)
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
});

ipcMain.on("window:close", () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) win.close();
});
