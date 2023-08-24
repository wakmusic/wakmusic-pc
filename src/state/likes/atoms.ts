import { atom } from "recoil";

import { Song } from "@templates/song";

export const likesEditModeState = atom({
  key: "isLikesEditMode",
  default: false,
});

export const likesStake = atom<Song[]>({
  key: "likesStake",
  default: [],
});
