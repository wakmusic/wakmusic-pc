import { atom } from "recoil";

interface ShareListModalState {
  isOpen: boolean;

  code?: string;
  resolve?: () => void;
}

export const shareListModalState = atom<ShareListModalState>({
  key: "shareListModalState",
  default: {
    isOpen: false,
  },
});
