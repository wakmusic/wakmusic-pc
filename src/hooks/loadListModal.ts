import { loadListModalState } from "@state/loadListModal/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

export const useLoadListModal = () => {
  const setState = useSetRecoilState(loadListModalState);

  const openLoadListModal = () => {
    return new Promise<string | undefined>((resolve) => {
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
