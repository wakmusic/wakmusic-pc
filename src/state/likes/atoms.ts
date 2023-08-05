import { atom } from "recoil";

export const likesState = atom({
  key: "isLikesEditMode",
  default: false,
});
