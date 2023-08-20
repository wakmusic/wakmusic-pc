import { BrowserWindow, app, ipcMain, nativeImage, session } from "electron";
import { join, resolve } from "path";

import { SongInfo } from "@templates/player";

import { changePresence, setProgress, showPlaying } from "./electron/discord";
import { schemeHandler } from "./electron/scheme";
import { initTray } from "./electron/tray";

declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;

let tray: ((label: string) => void) | null = null;

if (require("electron-squirrel-startup")) {
  app.quit();
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
}

app.setName("왁타버스 뮤직");
app.commandLine.appendSwitch("disable-site-isolation-trials");

if (process.platform === "win32") {
  app.setAppUserModelId(app.name);
}

if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
  app.setAsDefaultProtocolClient("wakmusic", process.execPath, [
    resolve(process.argv[1]),
  ]);
} else {
  app.setAsDefaultProtocolClient("wakmusic");
}

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

  tray = initTray();

  win.setMenuBarVisibility(false);

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    win.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    win.loadURL(import.meta.env.VITE_PUBLISH_URL);
  }

  win.once("ready-to-show", () => {
    win.show();
  });

  win.on("maximize", () => {
    win.webContents.send("window:maximized");
  });

  win.on("unmaximize", () => {
    win.webContents.send("window:unmaximized");
  });
});

app.on("open-url", function (_, url) {
  schemeHandler(url);
});

app.on("second-instance", (_, argv, __) => {
  if (process.platform === "win32") {
    schemeHandler(argv[argv.length - 1]);
  }
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
  if (win) win.hide();
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

ipcMain.on("user:login", () => {
  if (tray) {
    tray("로그아웃");
  }
});

ipcMain.on("user:logout", () => {
  if (tray) {
    tray("로그인");
  }

  session.defaultSession.cookies.remove(import.meta.env.VITE_API_URL, "token");
});
