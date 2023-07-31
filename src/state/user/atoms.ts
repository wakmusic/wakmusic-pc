import { atom } from "recoil";

import { dumyListItem } from "@constants/dummys";

import { myListItemType } from "@templates/playlist";

interface dragAndDropStatetype {
  drag: myListItemType;
  drop: number;
}

export const myListState = atom({
  key: "isMyListEditMode",
  default: false,
});

export const dragAndDropState = atom<dragAndDropStatetype>({
  key: "dragAndDropState",
  default: {
    drag: dumyListItem,
    drop: -1,
  },
});
