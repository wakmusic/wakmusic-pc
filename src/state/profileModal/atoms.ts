import { atom } from "recoil";

import { UserProfile } from "@templates/user";

interface ProfileModalState {
  isOpen: boolean;
  profile?: UserProfile | null;
  resolve?: (value: UserProfile | null) => void;
}

export const profileModalState = atom<ProfileModalState>({
  key: "profileModalState",
  default: {
    isOpen: false,
  },
  effects: [
    ({ onSet, setSelf }) => {
      onSet((value) => {
        if (!value.isOpen && value.resolve) {
          value.resolve(value.profile || null);
          setSelf({ isOpen: false });
        }
      });
    },
  ],
});
