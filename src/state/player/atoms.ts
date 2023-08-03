import { atom } from "recoil";

import { hourlyChart as dummy, lyrics as lyricsDummy } from "@constants/dummys";

import {
  ControlStateType,
  LyricType,
  PlayingInfoStateType,
  RepeatType,
  SongInfo,
} from "@templates/player";

export const visualModeState = atom<boolean>({
  key: "visualMode",
  default: false,
});

export const controlState = atom<ControlStateType>({
  key: "control",
  default: {
    volume: 50,
    repeatType: RepeatType.Off,
    isPlaying: false,
    isRandom: false,
    isLyricsOn: false,
  },
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        if (newValue.isPlaying !== (oldValue as ControlStateType).isPlaying) {
          window.ipcRenderer?.send("rpc:playing", newValue.isPlaying);
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
  default: 1,
});

export const playingProgress = atom<number>({
  key: "currentPlaying",
  default: 0,
  effects: [
    ({ onSet }) => {
      onSet((value) => {
        window.ipcRenderer?.send("rpc:progress", value);
      });
    },
  ],
});

export const playingChangeProgress = atom<number>({
  key: "currentPlayingChange",
  default: 0,
});

export const playingInfoState = atom<PlayingInfoStateType>({
  key: "playingInfo",
  // dummy
  default: {
    playlist: [
      ...[...dummy].map(
        (song) =>
          ({
            songId: song.songId,
            title: song.title,
            artist: song.artist,
            views: song.hourly.views,
            start: song.start,
            end: song.end,
          } as unknown as SongInfo)
      ),
      {
        songId: "Qunl6JX5RPg",
        title: "저랑 사겨주세요",
        artist: "봉인 풀린 주르르",
        views: 0,
        start: 0,
        end: 0,
      },
      {
        songId: "gnLdwkh4rjw",
        title: "순혈주의자",
        artist: "달의하루",
        views: 0,
        start: 0,
        end: 0,
      },
    ],
    history: [],
    current: -1,
  },
  effects: [
    ({ onSet }) => {
      onSet((value) => {
        const current = value.playlist[value.current];
        window.ipcRenderer?.send("rpc:track", current);
      });
    },
  ],
});

export const lyricsState = atom<LyricType[] | null>({
  key: "lyrics",
  default: lyricsDummy,
});
