import { atom } from "recoil";

import { PlaylistType } from "@templates/playlist";
import { Song } from "@templates/song";

interface AddListModalState {
  isOpen: boolean;

  selected: Song[];

  resolve?: (value: PlaylistType | undefined) => void;
}

export const addListModalState = atom<AddListModalState>({
  key: "addListModalState",
  default: {
    isOpen: false,
    selected: [],
  },
});
