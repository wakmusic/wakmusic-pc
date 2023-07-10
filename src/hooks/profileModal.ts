import { profileModalState } from "@state/profileModal/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

export const useSelectProfileModal = () => {
  const setState = useSetRecoilState(profileModalState);

  const openProfileModal = (profile?: string) => {
    return new Promise<string>((resolve) => {
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
