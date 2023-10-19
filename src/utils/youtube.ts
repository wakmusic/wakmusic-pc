import { IPCMain, IPCRenderer } from "@constants/ipc";

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

  async play(id: string): Promise<number> {
    ipcRenderer?.send(IPCRenderer.YOUTUBE_PLAY, id);

    return new Promise<number>((resolve) => {
      this.promises.set(id, resolve);
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
    const key = crypto.randomUUID();

    ipcRenderer?.send(
      IPCRenderer.YOUTUBE_SCRIPT,
      key,
      `
      player = document.getElementById("movie_player");
      player.seekTo(${seconds});
      `
    );
  }
}

// 콘솔에서 클래스 사용 가능하게
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.yt = new YouTube();
