import { createListModalState } from "@state/createListModal/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

export const useCreateListModal = () => {
  const setState = useSetRecoilState(createListModalState);

  const openCreateListModal = () => {
    return new Promise<string | undefined>((resolve) => {
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
