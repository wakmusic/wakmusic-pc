import { loadListModalState } from "@state/loadListModal/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

import { useIsSpaceDisabled } from "./player";

export const useLoadListModal = () => {
  const setState = useSetRecoilState(loadListModalState);
  const [, setIsSpaceDisabled] = useIsSpaceDisabled();

  const openLoadListModal = () => {
    return new Promise<string | undefined>((resolve) => {
      setIsSpaceDisabled(true);
      setState({
        isOpen: true,
        resolve,
      });
    });
  };

  return openLoadListModal;
};

export const useLoadListModalState = () => {
  return useRecoilState(loadListModalState);
};
