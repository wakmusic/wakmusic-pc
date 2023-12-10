import { IPCMain, IPCRenderer } from "@constants/ipc";

import { Song } from "@templates/song";

import { isNull } from "./isTypes";
import { ipcRenderer } from "./modules";

interface YoutubeIPCEvent {
  type: "script" | "play";
  key: string | null;
  value: any;
}

export class YouTube {
  private promises: Map<string, (value: any) => void>;

  constructor() {
    this.promises = new Map();
    this._init();
  }

  _init() {
    ipcRenderer?.on(IPCMain.YOUTUBE, this._handler.bind(this));
  }

  dispose() {
    ipcRenderer?.removeListener(IPCMain.YOUTUBE, this._handler.bind(this));
  }

  _handler(_event: Electron.IpcRendererEvent, data: YoutubeIPCEvent) {
    if (data.type === "play") {
      const value: {
        video_id: string;
        duration: number;
      } = data.value;

      const resolve = this.promises.get(value.video_id);

      if (resolve) {
        resolve(value.duration);
      }

      return;
    }

    if (isNull(data.key) || !this.promises.has(data.key)) {
      return;
    }

    const resolve = this.promises.get(data.key);

    if (resolve) {
      resolve(data.value);
    }
  }

  async play(song: Song): Promise<number> {
    ipcRenderer?.send(IPCRenderer.YOUTUBE_PLAY, song);

    return new Promise<number>((resolve) => {
      this.promises.set(song.songId, resolve);
    });
  }

  playVideo() {
    const key = crypto.randomUUID();

    ipcRenderer?.send(
      IPCRenderer.YOUTUBE_SCRIPT,
      key,
      `
      player = document.getElementById("movie_player");
      player.playVideo();
      `
    );
  }

  pauseVideo() {
    const key = crypto.randomUUID();

    ipcRenderer?.send(
      IPCRenderer.YOUTUBE_SCRIPT,
      key,
      `
      player = document.getElementById("movie_player");
      player.pauseVideo();
      `
    );
  }

  async getInfo() {
    const key = crypto.randomUUID();

    ipcRenderer?.send(
      IPCRenderer.YOUTUBE_SCRIPT,
      key,
      `
      player = document.getElementById("movie_player");
      player.getVideoData();
      `
    );

    return new Promise((resolve) => {
      this.promises.set(key, resolve);
    });
  }

  seekTo(seconds: number) {
    ipcRenderer?.send(
      IPCRenderer.YOUTUBE_SCRIPT,
      null,
      `
      player = document.getElementById("movie_player");
      player.seekTo(${seconds});
      `
    );
  }

  setVolume(volume: number) {
    ipcRenderer?.send(
      IPCRenderer.YOUTUBE_SCRIPT,
      null,
      `
      player = document.getElementById("movie_player");
      player.setVolume(${volume});
      `
    );
  }

  async getCurrentInfo(): Promise<{
    isAd: boolean;
    currentTime: number;
    duration: number;
    canSkip: boolean;
  }> {
    const key = crypto.randomUUID();

    ipcRenderer?.send(
      IPCRenderer.YOUTUBE_SCRIPT,
      key,
      `
      player = document.getElementById("movie_player");
      stream = document.querySelector(".video-stream");

      ({
        isAd: player.getVideoStats().prerolls === "ad",
        currentTime: stream.currentTime,
        duration: stream.duration,
        canSkip: document.querySelector(".ytp-ad-skip-button-modern") !== null,
      })
      `
    );

    return new Promise((resolve) => {
      this.promises.set(key, resolve);
    });
  }

  skipAd() {
    ipcRenderer?.send(
      IPCRenderer.YOUTUBE_SCRIPT,
      null,
      `
      document.querySelector(".ytp-ad-skip-button-modern").click();
      `
    );
  }
}

// 콘솔에서 클래스 사용 가능하게
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.yt = new YouTube();
