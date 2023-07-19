export type Song = {
  songId: string;
  title: string;
  artist: string;
  remix: string;
  reaction: string;
  date: number;
  start: number;
  end: number;
  total: {
    views: number | null;
    increase: number | null;
    last: number | null;
  };
  like: number;
};

export type SongsSearchResponse = {
  song: Song[];
  artist: Song[];
  remix: Song[];
};

export type tabsTypes = "all" | "song" | "artist" | "remix";
