import { BrowserWindow, app, ipcMain, nativeImage, session } from "electron";
import { join, resolve } from "path";

import { IPCMain, IPCRenderer } from "@constants/ipc";

import { Song } from "@templates/song";

import { changePresence, setProgress, showPlaying } from "./electron/discord";
import { schemeHandler } from "./electron/scheme";
import { initTray } from "./electron/tray";

declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;

let tray: ((type: "login" | "play", label: string) => void) | null = null;

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
}

app.setName("왁타버스 뮤직");
app.commandLine.appendSwitch("disable-site-isolation-trials");
app.commandLine.appendSwitch("lang", "en-US");

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
    win.webContents.setZoomFactor(1);

    win.show();
  });

  win.webContents.setWindowOpenHandler(() => {
    return {
      action: "allow",
      overrideBrowserWindowOptions: {
        frame: false,
        icon: nativeImage.createFromPath(join(__dirname, "/favicon.ico")),
      },
    };
  });

  win.on("maximize", () => {
    win.webContents.send(IPCMain.WINDOW_MAXIMIZED);
  });

  win.on("unmaximize", () => {
    win.webContents.send(IPCMain.WINDOW_UNMAXIMIZED);
  });

  win.on("resize", () => {
    win.webContents.send("window:resize");
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

ipcMain.on(IPCRenderer.WINDOW_LEAST, () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) win.minimize();
});

ipcMain.on(IPCRenderer.WINDOW_MAX, () => {
  const win = BrowserWindow.getFocusedWindow();

  if (win)
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
});

ipcMain.on(IPCRenderer.WINDOW_CLOSE, () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) win.hide();
});

ipcMain.on(IPCRenderer.MODE_DEFAULT, () => {
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

ipcMain.on(IPCRenderer.MODE_SEPARATE, () => {
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

ipcMain.on(IPCRenderer.QUERY_IS_SEPARATE, () => {
  const win = BrowserWindow.getFocusedWindow();
  if (!win) return;

  const [width] = win.getMinimumSize();

  win.webContents.send(IPCMain.REPLY_IS_SEPARATE, width === 290);
});

ipcMain.on(IPCRenderer.RPC_PROGRESS, (_event, progress: number) => {
  setProgress(progress);
});

ipcMain.on(IPCRenderer.RPC_PLAYING, (_event, isPlaying: boolean) => {
  if (tray) {
    tray("play", isPlaying ? "일시정지" : "재생");
  }

  showPlaying(isPlaying);
});

ipcMain.on(IPCRenderer.RPC_TRACK, (_event, current: Song | null) => {
  changePresence(current);
});

ipcMain.on(IPCRenderer.USER_LOGIN, () => {
  if (tray) {
    tray("login", "로그아웃");
  }
});

ipcMain.on(IPCRenderer.USER_LOGOUT, () => {
  if (tray) {
    tray("login", "로그인");
  }

  session.defaultSession.cookies.remove(import.meta.env.VITE_API_URL, "token");
});
