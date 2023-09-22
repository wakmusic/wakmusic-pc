import { atom } from "recoil";

import { CreditModalDetail } from "@templates/team";

interface CreditModalState {
  isOpen: boolean;
  detail?: CreditModalDetail;
}

export const CreditModalState = atom<CreditModalState>({
  key: "creditModalState",
  default: {
    isOpen: false,
  },
});
