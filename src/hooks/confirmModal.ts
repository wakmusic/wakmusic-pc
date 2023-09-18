import { confirmModalState } from "@state/confirmModal/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

import { useIsSpaceDisabled } from "./player";

export const useConfirmModal = () => {
  const setState = useSetRecoilState(confirmModalState);
  const [, setIsSpaceDisabled] = useIsSpaceDisabled();

  const openConfirmModal = (title: string, children: React.ReactNode) => {
    return new Promise<boolean | undefined>((resolve) => {
      setIsSpaceDisabled(true);
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
