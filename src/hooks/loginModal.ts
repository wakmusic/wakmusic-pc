import { loginModalState } from "@state/loginModal/atoms";
import { userState } from "@state/user/atoms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

export const useLoginModalState = () => {
  return useRecoilState(loginModalState);
};

export const useLoginModalOpener = () => {
  const setIsOpen = useSetRecoilState(loginModalState);
  const user = useRecoilValue(userState);

  return (state?: boolean) => {
    if (user) return false;

    setIsOpen(state ?? true);

    return true;
  };
};
