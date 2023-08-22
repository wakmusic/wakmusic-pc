import { atom } from "recoil";

import { dumyListItem } from "@constants/dummys";

import { myListItemType } from "@templates/playlist";
import { User } from "@templates/user";

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

export const userState = atom<User | null | undefined>({
  key: "userState",
  default: null,
});
