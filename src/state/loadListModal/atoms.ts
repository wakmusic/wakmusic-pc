import { atom } from "recoil";

interface LoadListModalState {
  isOpen: boolean;

  resolve?: (value: string | undefined) => void;
}

export const loadListModalState = atom<LoadListModalState>({
  key: "loadListModalState",
  default: {
    isOpen: false,
  },
});
