import { atom } from "recoil";

import { dumyListItem } from "@constants/dummys";

import { myListItem } from "@templates/playlist";

interface dragAndDropStatetype {
  drag: myListItem;
  drop: number;
}

export const myListState = atom({
  key: "isEditMode",
  default: false,
});

export const dragAndDropState = atom<dragAndDropStatetype>({
  key: "dragAndDropState",
  default: {
    drag: dumyListItem,
    drop: -1,
  },
});
