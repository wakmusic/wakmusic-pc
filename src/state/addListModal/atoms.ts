import { atom } from "recoil";

import { Song } from "@templates/song";

interface AddListModalState {
  isOpen: boolean;

  selected: Song[];

  resolve?: (value: boolean | undefined) => void;
}

export const addListModalState = atom<AddListModalState>({
  key: "addListModalState",
  default: {
    isOpen: false,
    selected: [],
  },
});
