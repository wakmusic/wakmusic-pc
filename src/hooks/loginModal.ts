import { loginModalState } from "@state/loginModal/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

export const useLoginModalState = () => {
  return useRecoilState(loginModalState);
};

export const useLoginModalOpener = () => {
  const setIsOpen = useSetRecoilState(loginModalState);

  return (state?: boolean) => setIsOpen(state ?? true);
};
