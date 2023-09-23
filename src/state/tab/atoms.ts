import { atom } from "recoil";

interface TabState {
  currentTab: number;
  prevTab: number;

  beforeChange?: () => void;
}

export const tabState = atom<TabState>({
  key: "tabState",
  default: {
    currentTab: 0,
    prevTab: -1,
  },
});
