import { dragAndDropState, myListState } from "@state/user/atoms";
import { useRecoilState } from "recoil";

export const useMylistState = () => {
  return useRecoilState(myListState);
};

export const useDragAndDropState = () => {
  return useRecoilState(dragAndDropState);
};
