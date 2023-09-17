import { loginModalState } from "@state/loginModal/atoms";
import { userState } from "@state/user/atoms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { useIsSpaceDisabled } from "./player";

export const useLoginModalState = () => {
  return useRecoilState(loginModalState);
};

export const useLoginModalOpener = () => {
  const setIsOpen = useSetRecoilState(loginModalState);
  const user = useRecoilValue(userState);
  const [, setIsSpaceDisabled] = useIsSpaceDisabled();

  return (state?: boolean) => {
    if (user) return false;

    setIsSpaceDisabled(true);
    setIsOpen(state ?? true);

    return true;
  };
};
