import { tabState } from "@state/tab/atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const useTabState = () => {
  const _setTabState = useSetRecoilState(tabState);

  return {
    useRecoilValue(tabState),
    
  };
};
