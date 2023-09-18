import { profileModalState } from "@state/profileModal/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

import { UserProfile } from "@templates/user";

import { useIsSpaceDisabled } from "./player";

export const useSelectProfileModal = () => {
  const setState = useSetRecoilState(profileModalState);
  const [, setIsSpaceDisabled] = useIsSpaceDisabled();

  const openProfileModal = (profile?: UserProfile) => {
    return new Promise<UserProfile | null>((resolve) => {
      setIsSpaceDisabled(true);
      setState({
        isOpen: true,
        profile,
        resolve,
      });
    });
  };

  return openProfileModal;
};

export const useSelectProfileModalState = () => {
  return useRecoilState(profileModalState);
};
