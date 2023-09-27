import { tabState as _tabState } from "@state/tab/atoms";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export const useTabState = () => {
  const [tabState, setTabState] = useRecoilState(_tabState);

  useEffect(() => {
    setTabState((prev) => ({
      currentTab: 0,
      transitionTime: prev.transitionTime,
    }));
  }, [setTabState]);

  return {
    tabState,
    setTabState,
  };
};
