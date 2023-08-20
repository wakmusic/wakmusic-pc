import { profileModalState } from "@state/profileModal/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

import { UserProfile } from "@templates/user";

export const useSelectProfileModal = () => {
  const setState = useSetRecoilState(profileModalState);

  const openProfileModal = (profile?: UserProfile) => {
    return new Promise<UserProfile | null>((resolve) => {
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
