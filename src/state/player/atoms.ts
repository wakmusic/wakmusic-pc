import { atom } from "recoil";

import { ControlStateType, RepeatType } from "@templates/player";

export const currentPlaying = atom<number>({
  key: "currentPlaying",
  default: 0,
});

export const controlState = atom<ControlStateType>({
  key: "controlState",
  default: {
    volume: 50,
    repeatType: RepeatType.Off,
    isPlaying: false,
    isRandom: false,
    isLyricsOn: false,
  },
});
