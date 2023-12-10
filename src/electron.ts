import { initialize as initializeRemote } from "@electron/remote/main";
import { BrowserWindow } from "electron";

import { Song } from "@templates/song";

import { initApp } from "./electron/init";

export const state: {
  tray: ((type: "login" | "play", label: string) => void) | null;
  nowPlaying: Song | null;
  loadVideoQueue: Song[];
  mainWindow: number | undefined;
  youtubeWindow: number | undefined;
} = {
  tray: null,
  nowPlaying: null,
  loadVideoQueue: [],
  mainWindow: undefined,
  youtubeWindow: undefined,
};

initializeRemote();
initApp();

export const loadVideo = async (song: Song | null = null) => {
  if (!song) {
    song = state.loadVideoQueue[state.loadVideoQueue.length - 1];
  }

  if (!song) {
    return;
  }

  const youtubeWin = getWindow(true);

  if (!youtubeWin) {
    return;
  }

  await youtubeWin.loadURL(`https://youtube.com/watch?v=${song.songId}`, {
    httpReferrer: "https://app.wakmusic.xyz",
  });

  youtubeWin.webContents.executeJavaScript(`
      player = document.getElementById("movie_player");

      require("electron").ipcRenderer.send("youtube", {
        type: "play",
        value: {
          video_id: player.getVideoData().video_id,
          duration: player.getDuration(),
        },
      });


      started = false;
      player.addEventListener("onStateChange", (state) => {
        if (state === 1) {
          if (!started) {
            started = true;
            console.log("started", ${song.start});
            player.seekTo(${song.start});
          }
        }
      });
    `);

  if (
    state.loadVideoQueue[state.loadVideoQueue.length - 1]?.songId !==
    song.songId
  ) {
    await loadVideo();
  }

  state.loadVideoQueue = [];
};

export const getWindow = (isYoutubeWindow = false): BrowserWindow | null => {
  if (isYoutubeWindow && state.youtubeWindow) {
    return BrowserWindow.fromId(state.youtubeWindow);
  }

  if (state.mainWindow) {
    return BrowserWindow.fromId(state.mainWindow);
  }

  return null;
};
