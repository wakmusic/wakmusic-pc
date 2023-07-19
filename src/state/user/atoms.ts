import { atom } from "recoil";

export const myListState = atom({
  key: "isEditMode",
  default: false,
});
