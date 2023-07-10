import { atom } from "recoil";

interface ProfileModalState {
  isOpen: boolean;
  profile?: string;
  resolve?: (value: string) => void;
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
          value.resolve(value.profile || "");
          setSelf({ isOpen: false });
        }
      });
    },
  ],
});
