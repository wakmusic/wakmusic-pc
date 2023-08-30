import { atom } from "recoil";

export const toastState = atom<string[]>({
  key: "toastState",
  default: [],
});
