import { atom } from "recoil";

interface ConfirmModalState {
  isOpen: boolean;

  title?: string;
  children?: React.ReactNode;

  value?: boolean | undefined;
  resolve?: (value: boolean | undefined) => void;
}

export const confirmModalState = atom<ConfirmModalState>({
  key: "confirmModalState",
  default: {
    isOpen: false,
  },
  effects: [
    ({ onSet, setSelf }) => {
      onSet((value) => {
        if (!value.isOpen && value.resolve) {
          value.resolve(value.value);
          setSelf({ isOpen: false, value: undefined });
        }
      });
    },
  ],
});
