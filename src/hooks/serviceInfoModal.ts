import { serviceInfoModalState } from "@state/serviceInfoModal/atoms";
import { useRecoilState } from "recoil";

export const useServiceInfoModalState = () => {
  return useRecoilState(serviceInfoModalState);
};
