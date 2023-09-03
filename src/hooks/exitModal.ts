import { exitModalState } from "@state/exitModal/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

export const useExitModal = () => {
  const setState = useSetRecoilState(exitModalState);

  const openExitModal = (isFirst = false) => {
    return new Promise<"close" | "background" | null>((resolve) => {
      setState({
        isOpen: true,
        isFirst,
        resolve,
      });
    });
  };

  return openExitModal;
};

export const useExitModalState = () => {
  return useRecoilState(exitModalState);
};
