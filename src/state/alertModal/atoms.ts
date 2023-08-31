import { atom } from "recoil";

interface AlertModalState {
  isOpen: boolean;

  title?: string | null;
  children?: React.ReactNode;

  resolve?: () => void;
}

export const alertModalState = atom<AlertModalState>({
  key: "alertModalState",
  default: {
    isOpen: false,
  },
  effects: [
    ({ onSet, setSelf }) => {
      onSet((value) => {
        if (!value.isOpen && value.resolve) {
          value.resolve();
          setSelf({ isOpen: false });
        }
      });
    },
  ],
});
