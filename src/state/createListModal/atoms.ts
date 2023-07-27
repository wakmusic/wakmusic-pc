import { atom } from "recoil";

interface CreateListModalState {
  isOpen: boolean;

  resolve?: (value: string | undefined) => void;
}

export const createListModalState = atom<CreateListModalState>({
  key: "createListModalState",
  default: {
    isOpen: false,
  },
});
