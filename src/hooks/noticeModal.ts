import { noticeModalState } from "@state/noticeModal/atoms";
import { useRecoilState } from "recoil";

export const useNoticeModalState = () => {
  return useRecoilState(noticeModalState);
};
