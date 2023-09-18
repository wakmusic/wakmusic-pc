import { exitModalState } from "@state/exitModal/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

import { useIsSpaceDisabled } from "./player";

export const useExitModal = () => {
  const setState = useSetRecoilState(exitModalState);
  const [, setIsSpaceDisabled] = useIsSpaceDisabled();

  const openExitModal = (isFirst = false) => {
    return new Promise<"close" | "background" | null>((resolve) => {
      setIsSpaceDisabled(true);
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
