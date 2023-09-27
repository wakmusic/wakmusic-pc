import { tabState } from "@state/tab/atoms";
import { useRecoilState } from "recoil";

export const useTabState = () => {
  return useRecoilState(tabState);
};
