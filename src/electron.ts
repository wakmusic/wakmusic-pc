import { BrowserWindow, app, ipcMain, nativeImage } from "electron";
import * as isDev from "electron-is-dev";
import { join } from "path";

import {
  changePresence,
  client,
  setProgress,
  showPlaying,
} from "./electron/discord";
import { SongInfo } from "./templates/player";

(async () => {
  // Initialize the Electron application
  app.whenReady().then(() => {
    const win = new BrowserWindow({
      width: 1250,
      height: 714,
      minWidth: 1250,
      minHeight: 714,
      frame: false,
      show: false,
      backgroundColor: "#FFF",
      icon: nativeImage.createFromPath(
        join(__dirname, "../public/favicon.ico")
      ),
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

    win.once("ready-to-show", () => {
      win.show();
      client.login();
    });
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

ipcMain.on("mode:default", () => {
  const win = BrowserWindow.getFocusedWindow();
  if (!win) return;

  win.setMaximumSize(10000, 10000);
  win.setMinimumSize(1250, 714);

  const beforeBounds = win.getBounds();

  win.setSize(1250, 714);

  const afterBounds = win.getBounds();

  win.setPosition(
    beforeBounds.x + (beforeBounds.width - afterBounds.width),
    beforeBounds.y
  );
});

ipcMain.on("mode:separate", () => {
  const win = BrowserWindow.getFocusedWindow();
  if (!win) return;

  if (win.isMaximized()) {
    win.unmaximize();
  }

  win.setMaximumSize(290, 10000);
  win.setMinimumSize(290, 714);

  const beforeBounds = win.getBounds();

  win.setSize(290, 714);

  const afterBounds = win.getBounds();

  win.setPosition(
    beforeBounds.x + (beforeBounds.width - afterBounds.width),
    beforeBounds.y
  );
});

ipcMain.on("query:isSeparate", (event) => {
  const win = BrowserWindow.getFocusedWindow();
  if (!win) return;

  const bounds = win.getBounds();

  event.returnValue = bounds.width === 290;
});

ipcMain.on("rpc:progress", (_event, progress: number) => {
  setProgress(progress);
});

ipcMain.on("rpc:playing", (_event, isPlaying: boolean) => {
  showPlaying(isPlaying);
});

ipcMain.on("rpc:track", (_event, current: SongInfo | null) => {
  changePresence(current);
});
