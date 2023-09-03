import { atom } from "recoil";

interface ExitModalState {
  isOpen: boolean;

  isFirst?: boolean;
  resolve?: (value: "close" | "background" | null) => void;
}

export const exitModalState = atom<ExitModalState>({
  key: "exitModalState",
  default: {
    isOpen: false,
  },
});
