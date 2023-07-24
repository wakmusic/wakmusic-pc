import { shareListModalState } from "@state/shareListModal/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

export const useShareListModal = () => {
  const setState = useSetRecoilState(shareListModalState);

  const openLoadListModal = (code: string) => {
    return new Promise<void>((resolve) => {
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
