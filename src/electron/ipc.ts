import { app, ipcMain, session } from "electron";
import { getWindow, loadVideo, state } from "src/electron";

import { IPCMain, IPCRenderer } from "@constants/ipc";

import { Song } from "@templates/song";

import { version } from "../../package.json";
import { changePresence, setProgress, showPlaying } from "./discord";
import { createShortcut } from "./shortcut";

export default () => {
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

  const separate = (mini: boolean) => {
    const win = getWindow();
    if (!win) return;

    if (win.isMaximized()) {
      win.unmaximize();
    }

    win.setMaximumSize(290, 10000);
    win.setMinimumSize(290, mini ? 375 : 714);

    const beforeBounds = win.getBounds();

    win.setSize(290, mini ? 375 : 714);

    const afterBounds = win.getBounds();

    win.setPosition(
      beforeBounds.x + (beforeBounds.width - afterBounds.width),
      beforeBounds.y
    );
  };

  ipcMain.on(IPCRenderer.MODE_SEPARATE, () => {
    separate(false);
  });

  ipcMain.on(IPCRenderer.MODE_MINI, () => {
    separate(true);
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
    if (state.tray) {
      state.tray("play", isPlaying ? "일시정지" : "재생");
    }

    showPlaying(isPlaying);
  });

  ipcMain.on(IPCRenderer.RPC_TRACK, (_event, current: Song | null) => {
    changePresence(current);
  });

  ipcMain.on(IPCRenderer.USER_LOGIN, () => {
    if (state.tray) {
      state.tray("login", "로그아웃");
    }
  });

  ipcMain.on(IPCRenderer.USER_LOGOUT, () => {
    if (state.tray) {
      state.tray("login", "로그인");
    }

    session.defaultSession.cookies.remove(
      import.meta.env.VITE_API_URL,
      "token"
    );
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

  ipcMain.on(IPCRenderer.YOUTUBE_PLAY, (_event, song: Song) => {
    state.loadVideoQueue.push(song);
    state.nowPlaying = song;

    if (state.loadVideoQueue.length === 1) {
      loadVideo();
    }
  });

  ipcMain.on(
    IPCRenderer.YOUTUBE_SCRIPT,
    (_event, key: string, script: string) => {
      const win = getWindow();
      const youtubeWin = getWindow(true);

      if (win && youtubeWin) {
        youtubeWin.webContents
          .executeJavaScript(script)
          .then((value: string) => {
            win.webContents.send(IPCMain.YOUTUBE, {
              type: "script",
              key,
              value,
            });
          });
      }
    }
  );
};
