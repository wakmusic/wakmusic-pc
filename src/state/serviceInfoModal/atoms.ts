import { atom } from "recoil";

interface ServiceInfoModalState {
  isOpen: boolean;
}

export const serviceInfoModalState = atom<ServiceInfoModalState>({
  key: "serviceInfoModalState",
  default: {
    isOpen: false,
  },
});
