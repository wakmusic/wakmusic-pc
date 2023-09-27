import { atom } from "recoil";

interface TabState {
  currentTab: number;
  navTimeout?: NodeJS.Timeout;

  beforeChange?: (currentTab: number, newTab: number) => void;

  transitionTime: number;
}

export const tabState = atom<TabState>({
  key: "tabState",
  default: {
    currentTab: 0,
    transitionTime: 0.1,
  },
});
