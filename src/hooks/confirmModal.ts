import { confirmModalState } from "@state/confirmModal/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

export const useConfirmModal = () => {
  const setState = useSetRecoilState(confirmModalState);

  const openConfirmModal = (title: string, children: React.ReactNode) => {
    return new Promise<boolean | undefined>((resolve) => {
      setState({
        isOpen: true,
        title,
        children,
        resolve,
      });
    });
  };

  return openConfirmModal;
};

export const useConfirmModalState = () => {
  return useRecoilState(confirmModalState);
};
