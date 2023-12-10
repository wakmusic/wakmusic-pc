import { enable as enableRemote } from "@electron/remote/main";
import { BrowserWindow, app, autoUpdater, nativeImage } from "electron";
import { join, resolve } from "path";
import { getWindow, loadVideo, state } from "src/electron";

import { IPCMain } from "@constants/ipc";

import autoUpdate, { isAppQuitting } from "./autoUpdate";
import ipc from "./ipc";
import { schemeHandler } from "./scheme";
import { createShortcut } from "./shortcut";
import { initTray } from "./tray";

declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;

export const initApp = () => {
  const gotTheLock = app.requestSingleInstanceLock();

  if (!gotTheLock) {
    app.quit();
  }

  app.setName("왁타버스 뮤직");
  app.commandLine.appendSwitch("disable-site-isolation-trials");
  app.commandLine.appendSwitch("lang", "ko-KR");

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

  autoUpdate();
  ipc();

  app.on("activate", () => {
    const win = getWindow();

    if (win) {
      win.show();
      win.focus();
    }
  });

  app.on("open-url", function (_, url) {
    schemeHandler(url);
  });

  app.on("second-instance", (_, argv, __) => {
    const win = getWindow();

    if (win) {
      win.show();
      win.focus();
    }

    if (process.platform === "win32") {
      schemeHandler(argv[argv.length - 1]);
    }
  });

  app.whenReady().then(() => {
    state.mainWindow = makeMainWindow();
    state.youtubeWindow = makeYoutubeWindow();

    state.tray = initTray();
  });
};

export const makeMainWindow = () => {
  const win = new BrowserWindow({
    width: 1250,
    height: 714,
    minWidth: 1250,
    minHeight: 714,
    maximizable: false,
    titleBarStyle: "hiddenInset",
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
    win.webContents.setZoomFactor(1);

    enableRemote(win.webContents);

    win.webContents
      .executeJavaScript(`localStorage.getItem("shortcut")`)
      .then((value) => {
        if (value !== "true") {
          createShortcut();

          win.webContents.executeJavaScript(
            `localStorage.setItem("shortcut", "true")`
          );
        }
      });

    win.show();
  });

  win.webContents.setWindowOpenHandler(() => {
    return {
      action: "allow",
      overrideBrowserWindowOptions: {
        icon: nativeImage.createFromPath(join(__dirname, "/favicon.ico")),
        autoHideMenuBar: true,
      },
    };
  });

  win.on("close", function (evt) {
    if (!isAppQuitting) {
      evt.preventDefault();
      win.webContents.send(IPCMain.APP_QUIT);
    }
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

  if (process.platform === "darwin") {
    autoUpdater.checkForUpdates();

    // 20초 마다 업데이트 체크
    setInterval(() => {
      autoUpdater.checkForUpdates();
    }, 1000 * 60 * 20);

    win.on("close", (e) => {
      // 네이티브 컨트롤바를 사용하는 경우에만 불러와짐
      e.preventDefault();
      win.webContents.send(IPCMain.APP_QUIT);
    });
  }

  return win.id;
};

export const makeYoutubeWindow = () => {
  const youtubeWin = new BrowserWindow({
    icon: nativeImage.createFromPath(join(__dirname, "/favicon.ico")),
    autoHideMenuBar: true,
    // show: true,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  youtubeWin.on("close", (event) => {
    event.preventDefault();

    if (state.nowPlaying) {
      loadVideo(state.nowPlaying);
    }
  });

  youtubeWin.webContents.addListener("crashed", () => {
    if (state.nowPlaying) {
      loadVideo(state.nowPlaying);
    }
  });

  return youtubeWin.id;
};
