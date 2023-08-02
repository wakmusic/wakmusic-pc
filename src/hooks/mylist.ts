import { myListState } from "@state/user/atoms";
import { useRecoilState } from "recoil";

export const useMylistState = () => {
  return useRecoilState(myListState);
};
