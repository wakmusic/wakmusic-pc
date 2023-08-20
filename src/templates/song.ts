export type SongType = "hourly" | "daily" | "weekly" | "monthly" | "total";

export type ChartData = {
  views: number;
  increase: number;
  last: number;
};

export type BaseSong = {
  songId: string;
  title: string;
  artist: string;
  remix: string;
  reaction: string;
  date: number;
  start: number;
  end: number;
  like: number;
};

export type SongHourly = BaseSong & {
  hourly: ChartData;
};

export type SongDaily = BaseSong & {
  daily: ChartData;
};

export type SongWeekly = BaseSong & {
  weekly: ChartData;
};

export type SongMonthly = BaseSong & {
  monthly: ChartData;
};

export type SongTotal = BaseSong & {
  total: ChartData;
};

export type Song =
  | SongHourly
  | SongDaily
  | SongWeekly
  | SongMonthly
  | SongTotal;

export type SongSortType = "popular" | "new" | "old";

export type OrderdSong = Song & {
  index: number;
};
