import { atom } from "recoil";

export const noticeModalState = atom<boolean>({
  key: "noticeModalState",
  default: false,
});
