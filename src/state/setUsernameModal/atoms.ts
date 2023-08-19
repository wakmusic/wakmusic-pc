import { atom } from "recoil";

interface SetUsernameModalState {
  isOpen: boolean;
  name?: string;
  resolve?: (value: string | undefined) => void;
}

export const setUsernameModalState = atom<SetUsernameModalState>({
  key: "setUsernameModalState",
  default: {
    isOpen: false,
  },
});
