import TabType from "../templates/tabType";

export const searchTabs: TabType[] = [
  { text: "전체", to: { tab: "all" } },
  { text: "노래", to: { tab: "song" } },
  { text: "가수", to: { tab: "artist" } },
  { text: "조교", to: { tab: "remix" } },
];

export const artistTabs: TabType[] = [
  { text: "전체", to: "/artists" },
  { text: "우왁굳", to: { type: "woowakgood" } },
  { text: "이세돌", to: { type: "isedol" } },
  { text: "고멤", to: { type: "gomem" } },
  { text: "아카데미", to: { type: "academy" } },
];

export const chartTabs: TabType[] = [
  { text: "시간순", to: null },
  { text: "일간순", to: { type: "daily" } },
  { text: "주간순", to: { type: "weekly" } },
  { text: "월간순", to: { type: "monthly" } },
  { text: "누적순", to: { type: "total" } },
];

export const newTabs: TabType[] = [
  { text: "전체", to: "/new" },
  { text: "우왁굳", to: { group: "woowakgood" } },
  { text: "이세돌", to: { group: "isedol" } },
  { text: "고멤", to: { group: "gomem" } },
  { text: "아카데미", to: { group: "academy" } },
];

export const userTabs: TabType[] = [
  { text: "내 리스트", to: "/user/playlists" },
  { text: "좋아요", to: "/user/likes" },
];

export const artistDetailTabs: TabType[] = [
  { text: "최신순", to: null },
  { text: "인기순", to: { tab: "popular" } },
  { text: "과거순", to: { tab: "old" } },
];
