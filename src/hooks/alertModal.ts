import { alertModalState } from "@state/alertModal/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

import { useIsSpaceDisabled } from "./player";

export const useAlertModal = () => {
  const setState = useSetRecoilState(alertModalState);
  const [, setIsSpaceDisabled] = useIsSpaceDisabled();

  const openAlertModal = (title: string | null, children: React.ReactNode) => {
    return new Promise<void>((resolve) => {
      setIsSpaceDisabled(true);
      setState({
        isOpen: true,
        title,
        children,
        resolve,
      });
    });
  };

  return openAlertModal;
};

export const useAlertModalState = () => {
  return useRecoilState(alertModalState);
};
