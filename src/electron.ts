import { BrowserWindow, app, ipcMain, nativeImage } from "electron";
import { join } from "path";

import { SongInfo } from "@templates/player";

import {
  changePresence,
  client,
  setProgress,
  showPlaying,
} from "./electron/discord";

declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;

if (require("electron-squirrel-startup")) {
  app.quit();
}

app.commandLine.appendSwitch("disable-site-isolation-trials");

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 1250,
    height: 714,
    minWidth: 1250,
    minHeight: 714,
    frame: false,
    show: false,
    backgroundColor: "#FFF",
    icon: nativeImage.createFromPath(join(__dirname, "/favicon.ico")),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      allowRunningInsecureContent: false,
    },
  });

  win.setMenuBarVisibility(false);

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    win.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    win.loadURL(import.meta.env.VITE_PUBLISH_URL);
  }

  win.once("ready-to-show", () => {
    win.show();
    client.login();
  });
});

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

ipcMain.on("query:isSeparate", () => {
  const win = BrowserWindow.getFocusedWindow();
  if (!win) return;

  const bounds = win.getBounds();

  win.webContents.send("reply:isSeparate", bounds.width === 290);
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
