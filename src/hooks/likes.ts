import { likesState } from "@state/likes/atoms";
import { useRecoilState } from "recoil";

export const useLikesState = () => {
  return useRecoilState(likesState);
};
