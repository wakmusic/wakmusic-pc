import { atom } from "recoil";

export const playlistState = atom({
  key: "isPlaylistEditMode",
  default: false,
});
