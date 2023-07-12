import { atom } from "recoil";

export const loginModalState = atom<boolean>({
  key: "loginModalState",
  default: false,
});
