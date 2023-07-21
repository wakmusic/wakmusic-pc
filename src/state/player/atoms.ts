import { atom } from "recoil";

export const lyricsState = atom<boolean>({
  key: "lyricsState",
  default: false,
});

export const currentPlaying = atom<number>({
  key: "currentPlaying",
  default: 0,
});
