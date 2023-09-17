import { noticeDetailModalState } from "@state/noticeDetailModal/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

import { Notice } from "@templates/notice";

import { useIsSpaceDisabled } from "./player";

export const useNoticeDetailModal = () => {
  const setState = useSetRecoilState(noticeDetailModalState);
  const [, setIsSpaceDisabled] = useIsSpaceDisabled();

  const openNoticeDetailModal = (notice: Notice) => {
    setIsSpaceDisabled(true);
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
