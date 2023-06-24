import { BrowserWindow, app, ipcMain } from "electron";
import * as isDev from "electron-is-dev";
import { join } from "path";

(async () => {
  // Initialize the Electron application
  app.whenReady().then(() => {
    const win = new BrowserWindow({
      width: 1000,
      height: 580,
      minWidth: 1000,
      minHeight: 580,
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    win.setMenuBarVisibility(false);

    if (isDev) {
      win.webContents.openDevTools();

      if (process.env.BUILD_TYPE === "1") {
        win.loadFile(join(__dirname, "../dist/index.html"));
      } else {
        win.loadURL(`http://localhost:3000`);
      }
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
