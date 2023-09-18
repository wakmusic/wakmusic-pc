import { shareListModalState } from "@state/shareListModal/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

import { useIsSpaceDisabled } from "./player";

export const useShareListModal = () => {
  const setState = useSetRecoilState(shareListModalState);
  const [, setIsSpaceDisabled] = useIsSpaceDisabled();

  const openLoadListModal = (code: string) => {
    return new Promise<void>((resolve) => {
      setIsSpaceDisabled(true);
      setState({
        isOpen: true,
        code,
        resolve,
      });
    });
  };

  return openLoadListModal;
};

export const useShareListModalState = () => {
  return useRecoilState(shareListModalState);
};
