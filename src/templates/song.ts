export type ChartType = "hourly" | "daily" | "weekly" | "monthly" | "total";

export type ChartData = {
  views: number;
  increase: number;
  last: number;
};

type BaseSong = {
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

type SongHourly = BaseSong & {
  hourly: ChartData;
};

type SongDaily = BaseSong & {
  daily: ChartData;
};

type SongWeekly = BaseSong & {
  weekly: ChartData;
};

type SongMonthly = BaseSong & {
  monthly: ChartData;
};

type SongTotal = BaseSong & {
  total: ChartData;
};

export type RawSong =
  | SongHourly
  | SongDaily
  | SongWeekly
  | SongMonthly
  | SongTotal;

export type Song = {
  songId: string;
  title: string;
  artist: string;
  remix: string;
  reaction: string;
  date: number;
  like: number;
  views: number;
  start: number;
  end: number;
  chart: {
    type: ChartType;
    increase: number;
    last: number;
  };
};

export type SongSortType = "popular" | "new" | "old";

export type OrderedSongType = Song & {
  index?: number;
};
