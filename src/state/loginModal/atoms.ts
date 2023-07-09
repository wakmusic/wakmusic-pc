import { atom } from "recoil";

const modalState = atom<boolean>({
  key: "modalState",
  default: false,
});

export { modalState };
