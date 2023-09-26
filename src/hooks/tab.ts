import { tabState as _tabState } from "@state/tab/atoms";
import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";

import { isUndefined } from "@utils/isTypes";

export const useTabState = () => {
  const [tabState, _setTabSate] = useRecoilState(_tabState);

  // 이전 탭의 인덱스 초기화
  useEffect(() => {
    _setTabSate((prev) => ({
      ...prev,
      prevTab: -1,
    }));
  }, [_setTabSate]);

  // 같은 값의 state가 여러번 설정되는 것을 방지
  const setTabState = useCallback(
    ({ tab, beforeChange }: { tab?: number; beforeChange?: () => void }) => {
      if (tab === tabState.currentTab) return;

      _setTabSate((prev) => {
        const newTabState = { ...prev };

        if (!isUndefined(tab)) {
          newTabState.prevTab = prev.currentTab;
          newTabState.currentTab = tab;
        }

        if (beforeChange) {
          newTabState.beforeChange = beforeChange;
        }

        return newTabState;
      });
    },
    [_setTabSate, tabState.currentTab]
  );

  return {
    tabState,
    setTabState,
  };
};
