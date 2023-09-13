import { atom } from "recoil";

import { IPCRenderer } from "@constants/ipc";

import {
  ChangeProgressStateType,
  ControlStateType,
  LyricType,
  PlayingInfoStateType,
  RepeatType,
} from "@templates/player";

import { ipcRenderer } from "@utils/modules";

export const visualModeState = atom<boolean>({
  key: "visualMode",
  default: false,
});

export const controlState = atom<ControlStateType>({
  key: "control",
  default: {
    volume: Number(localStorage.getItem("volume")) || 50,
    isMute: localStorage.getItem("isMute") === "true" || false,
    repeatType: (Number(localStorage.getItem("repeatType")) || 0) as RepeatType,
    isPlaying: false,
    isRandom: localStorage.getItem("isRandom") === "true" || false,
    isLyricsOn: false,
  },
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        if (newValue.isPlaying !== (oldValue as ControlStateType).isPlaying) {
          ipcRenderer?.send(IPCRenderer.RPC_PLAYING, newValue.isPlaying);
        }

        if (newValue.volume !== (oldValue as ControlStateType).volume) {
          localStorage.setItem("volume", newValue.volume.toString());
        }

        if (newValue.isMute !== (oldValue as ControlStateType).isMute) {
          localStorage.setItem("isMute", newValue.isMute.toString());
        }

        if (newValue.repeatType !== (oldValue as ControlStateType).repeatType) {
          localStorage.setItem("repeatType", newValue.repeatType.toString());
        }

        if (newValue.isRandom !== (oldValue as ControlStateType).isRandom) {
          localStorage.setItem("isRandom", newValue.isRandom.toString());
        }
      });
    },
  ],
});

export const isControlling = atom<boolean>({
  key: "isControlling",
  default: false,
});

export const playingLength = atom<number>({
  key: "playingLength",
  default: 240,
});

export const playingProgress = atom<number>({
  key: "currentPlaying",
  default: 0,
  effects: [
    ({ onSet }) => {
      onSet((value) => {
        ipcRenderer?.send(IPCRenderer.RPC_PROGRESS, value);
      });
    },
  ],
});

export const playingChangeProgress = atom<ChangeProgressStateType>({
  key: "currentPlayingChange",
  default: {
    force: false,
    progress: 0,
  },
});

export const playingInfoState = atom<PlayingInfoStateType>({
  key: "playingInfo",
  default: {
    playlist: localStorage.getItem("playlist")
      ? JSON.parse(localStorage.getItem("playlist") as string)
      : [],
    original: localStorage.getItem("original")
      ? JSON.parse(localStorage.getItem("original") as string)
      : [],
    current: Number(localStorage.getItem("current")) || 0,
  },
  effects: [
    // Discord RPC
    ({ onSet }) => {
      onSet((value) => {
        const current = value.playlist[value.current];
        ipcRenderer?.send(IPCRenderer.RPC_TRACK, current);
      });
    },

    // Shuffle Original Playlist
    ({ onSet, setSelf }) => {
      onSet((value, oldValue) => {
        const nowPlaylist = value.playlist;
        const oldPlaylist = (oldValue as PlayingInfoStateType).playlist;

        if (nowPlaylist.length !== oldPlaylist.length) {
          const deleted = oldPlaylist.filter(
            (item) => !nowPlaylist.includes(item)
          );

          const added = nowPlaylist.filter(
            (item) => !oldPlaylist.includes(item)
          );

          const newOriginal = [...value.original];

          for (const item of deleted) {
            const index = newOriginal.indexOf(item);
            newOriginal.splice(index, 1);
          }

          for (const item of added) {
            newOriginal.push(item);
          }

          setSelf({
            ...value,
            original: newOriginal,
          });
        }
      });
    },

    // Set Local Storage
    ({ onSet }) => {
      onSet((value, oldValue) => {
        if (value.playlist !== (oldValue as PlayingInfoStateType).playlist) {
          localStorage.setItem("playlist", JSON.stringify(value.playlist));
        }

        if (value.original !== (oldValue as PlayingInfoStateType).original) {
          localStorage.setItem("original", JSON.stringify(value.original));
        }

        if (value.current !== (oldValue as PlayingInfoStateType).current) {
          localStorage.setItem("current", JSON.stringify(value.current));
        }
      });
    },
  ],
});

export const lyricsState = atom<LyricType[] | null>({
  key: "lyrics",
  default: null,
});

export const isSpaceDisabled = atom({
  key: "isSpaceDisabled",
  default: false,
});
