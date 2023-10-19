import {
  enable as enableRemote,
  initialize as initializeRemote,
} from "@electron/remote/main";
import {
  BrowserWindow,
  app,
  autoUpdater,
  dialog,
  ipcMain,
  nativeImage,
  session,
} from "electron";
import { join, resolve } from "path";

import { IPCMain, IPCRenderer } from "@constants/ipc";

import { Song } from "@templates/song";

import { version } from "../package.json";
import { changePresence, setProgress, showPlaying } from "./electron/discord";
import { schemeHandler } from "./electron/scheme";
import { createShortcut } from "./electron/shortcut";
import { initTray } from "./electron/tray";

// #region init

initializeRemote();

declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;

let tray: ((type: "login" | "play", label: string) => void) | null = null;
let mainWindow: number | undefined;
let youtubeWindow: number | undefined;

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

// #endregion

// #region auto update

const server = "https://update.electronjs.org";
const feed = `${server}/wakmusic/wakmusic-pc/${
  process.platform
}-arm64/${app.getVersion()}`;

autoUpdater.setFeedURL({
  url: feed,
});

autoUpdater.on("update-available", () => {
  console.log("update available");
});

autoUpdater.on("update-downloaded", (_, __, releaseName) => {
  console.log("update downloaded");
  const dialogOpts: Electron.MessageBoxOptions = {
    type: "info",
    buttons: ["재시작", "나중에"],
    title: "Application Update",
    message: releaseName,
    detail: "새 버전이 감지되었습니다. 재시작하여 업데이트해주세요.",
  };

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall();
  });
});

autoUpdater.on("error", (message) => {
  console.error("There was a problem updating the application");
  console.error(message);
});

// #endregion

// init windows
app.whenReady().then(() => {
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

  const youtubeWin = new BrowserWindow({
    icon: nativeImage.createFromPath(join(__dirname, "/favicon.ico")),
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow = win.id;
  youtubeWindow = youtubeWin.id;

  youtubeWin.loadURL("https://youtube.com");

  tray = initTray(mainWindow);

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
});

// #region functions

const getWindow = (isYoutubeWindow = false): BrowserWindow | null => {
  if (isYoutubeWindow && youtubeWindow) {
    return BrowserWindow.fromId(youtubeWindow);
  }

  if (mainWindow) {
    return BrowserWindow.fromId(mainWindow);
  }

  return null;
};

// #endregion

// #region app event

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

// #endregion

// #region ipc event

ipcMain.on(IPCRenderer.WINDOW_LEAST, () => {
  const win = getWindow();

  if (win) {
    win.minimize();
  }
});

ipcMain.on(IPCRenderer.WINDOW_MAX, () => {
  const win = getWindow();

  if (win)
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
});

ipcMain.on(IPCRenderer.WINDOW_CLOSE, () => {
  // app.exit()은 win.on("close") 가 호출 되지 않음
  app.exit();
});

ipcMain.on(IPCRenderer.WINDOW_HIDE, () => {
  const win = getWindow();

  if (win) {
    win.hide();
  }
});

ipcMain.on(IPCRenderer.WINDOW_ENABLE_MAX, () => {
  const win = getWindow();

  if (win) {
    win.setMaximizable(true);
  }
});

ipcMain.on(IPCRenderer.WINDOW_DISABLE_MAX, () => {
  const win = getWindow();

  if (win) {
    win.setMaximizable(false);
  }
});

ipcMain.on(IPCRenderer.MODE_DEFAULT, () => {
  const win = getWindow();

  if (win) {
    win.setMaximumSize(10000, 10000);
    win.setMinimumSize(1250, 714);

    const beforeBounds = win.getBounds();

    win.setSize(1250, 714);

    const afterBounds = win.getBounds();

    win.setPosition(
      beforeBounds.x + (beforeBounds.width - afterBounds.width),
      beforeBounds.y
    );
  }
});

ipcMain.on(IPCRenderer.MODE_SEPARATE, () => {
  const win = getWindow();

  if (win) {
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
  }
});

ipcMain.on(IPCRenderer.QUERY_IS_SEPARATE, () => {
  const win = getWindow();

  if (win) {
    const [width] = win.getMinimumSize();

    win.webContents.send(IPCMain.REPLY_IS_SEPARATE, width === 290);
  }
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

ipcMain.on(IPCRenderer.QUERY_VERSION, () => {
  const win = getWindow();

  if (win) {
    win.webContents.send(IPCMain.REPLY_VERSION, version);
  }
});

ipcMain.on(IPCRenderer.CREATE_SHORTCUT, () => {
  createShortcut();
});

ipcMain.on(IPCRenderer.YOUTUBE, (_event, data) => {
  const win = getWindow();

  if (win) {
    win.webContents.send(IPCMain.YOUTUBE, {
      type: data.type,
      value: data.value,
      key: null,
    });
  }
});

ipcMain.on(IPCRenderer.YOUTUBE_PLAY, async (_event, id: string) => {
  const youtubeWin = getWindow(true);

  if (youtubeWin) {
    const loadVideo = async () => {
      try {
        await youtubeWin.loadURL(`https://youtube.com/watch?v=${id}`, {
          httpReferrer: "https://app.wakmusic.xyz",
        });
      } catch (e) {
        await loadVideo();
        return;
      }

      youtubeWin.webContents.executeJavaScript(`
        player = document.getElementById("movie_player");

        require("electron").ipcRenderer.send("youtube", {
          type: "play",
          value: {
            video_id: player.getVideoData().video_id,
            duration: player.getDuration(),
          },
        });

        player.addEventListener("onStateChange", (state) => {
          console.log("state", state);
        });
      `);
    };

    await loadVideo();
  }
});

ipcMain.on(
  IPCRenderer.YOUTUBE_SCRIPT,
  (_event, key: string, script: string) => {
    const win = getWindow();
    const youtubeWin = getWindow(true);

    if (win && youtubeWin) {
      youtubeWin.webContents.executeJavaScript(script).then((value) => {
        win.webContents.send(IPCMain.YOUTUBE, {
          type: "script",
          key,
          value,
        });
      });
    }
  }
);

// #endregion
