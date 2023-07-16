import tabType from "../types/tabType";

export const searchTabs: tabType[] = [
  { text: "전체", to: { tab: "all" } },
  { text: "노래", to: { tab: "songs" } },
  { text: "가수", to: { tab: "artists" } },
  { text: "조교", to: { tab: "training" } },
];

export const artistTabs: tabType[] = [
  { text: "전체", to: "/artists" },
  { text: "우왁굳", to: { type: "woowakgood" } },
  { text: "이세돌", to: { type: "isedol" } },
  { text: "고맴", to: { type: "gomem" } },
  { text: "아카데미", to: { type: "academy" } },
];

export const newTabs: tabType[] = [
  { text: "전체", to: "/new" },
  { text: "우왁굳", to: { type: "woowakgood" } },
  { text: "이세돌", to: { type: "isedol" } },
  { text: "고맴", to: { type: "gomem" } },
  { text: "아카데미", to: { type: "academy" } },
];
