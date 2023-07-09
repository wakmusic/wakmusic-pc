import { useRecoilState, useSetRecoilState } from "recoil";

import { modalState } from "./atoms";

export const useLoginModalState = () => {
  return useRecoilState(modalState);
};

export const useLoginModalOpener = () => {
  const setIsOpen = useSetRecoilState(modalState);

  return (state?: boolean) => setIsOpen(state ?? true);
};
