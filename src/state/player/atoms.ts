import { atom } from "recoil";

import { hourlyChart as dummy } from "@constants/dummys";

import {
  ControlStateType,
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
});

export const playingProgress = atom<number>({
  key: "currentPlaying",
  default: 0,
});

export const playingInfoState = atom<PlayingInfoStateType>({
  key: "playingInfo",
  // dummy
  default: {
    playlist: [...dummy, ...dummy, ...dummy, ...dummy].map(
      (song) =>
        ({
          songId: song.songId,
          title: song.title,
          artist: song.artist,
          views: song.hourly.views,
        } as unknown as SongInfo)
    ),
    current: 11,
  },
});
