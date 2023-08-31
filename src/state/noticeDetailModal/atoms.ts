import { atom } from "recoil";

import { Notice } from "@templates/notice";

interface NoticeDetailModalState {
  isOpen: boolean;

  notice?: Notice;
}

export const noticeDetailModalState = atom<NoticeDetailModalState>({
  key: "noticeDetailModalState",
  default: {
    isOpen: false,
  },
});
