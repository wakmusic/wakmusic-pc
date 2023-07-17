export const searchTabs = [
  { text: "전체", to: { tab: "all" } },
  { text: "노래", to: { tab: "songs" } },
  { text: "가수", to: { tab: "artists" } },
  { text: "조교", to: { tab: "remix" } },
];

export const artistTabs = [
  { text: "전체", to: "/artists" },
  { text: "우왁굳", to: { type: "woowakgood" } },
  { text: "이세돌", to: { type: "isedol" } },
  { text: "고멤", to: { type: "gomem" } },
  { text: "아카데미", to: { type: "academy" } },
];

export const userTabs = [
  { text: "내 리스트", to: "/user/playlists" },
  { text: "좋아요", to: "/user/likes" },
];
