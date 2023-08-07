import { createListModalState } from "@state/createListModal/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

import { useIsSpaceDisabled } from "./player";

export const useCreateListModal = () => {
  const setState = useSetRecoilState(createListModalState);
  const [, setIsSpaceDisabled] = useIsSpaceDisabled();

  const openCreateListModal = () => {
    return new Promise<string | undefined>((resolve) => {
      setIsSpaceDisabled(true);
      setState({
        isOpen: true,
        resolve,
      });
    });
  };

  return openCreateListModal;
};

export const useCreateListModalState = () => {
  return useRecoilState(createListModalState);
};
