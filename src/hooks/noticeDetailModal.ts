import { noticeDetailModalState } from "@state/noticeDetailModal/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

import { Notice } from "@templates/notice";

export const useNoticeDetailModal = () => {
  const setState = useSetRecoilState(noticeDetailModalState);

  const openNoticeDetailModal = (notice: Notice) => {
    setState({
      isOpen: true,
      notice,
    });
  };

  return openNoticeDetailModal;
};

export const useNoticeDetailModalState = () => {
  return useRecoilState(noticeDetailModalState);
};
