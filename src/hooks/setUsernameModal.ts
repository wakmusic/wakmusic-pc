import { setUsernameModalState } from "@state/setUsernameModal/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

import { useIsSpaceDisabled } from "./player";

export const useSetUsernameModal = () => {
  const setState = useSetRecoilState(setUsernameModalState);
  const [, setIsSpaceDisabled] = useIsSpaceDisabled();

  const openSetUsernameModal = (name: string) => {
    return new Promise<string | undefined>((resolve) => {
      setIsSpaceDisabled(true);
      setState({
        isOpen: true,
        name,
        resolve,
      });
    });
  };

  return openSetUsernameModal;
};

export const useSetUsernameModalState = () => {
  return useRecoilState(setUsernameModalState);
};
