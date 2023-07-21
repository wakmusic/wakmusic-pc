export enum RepeatType {
  Off,
  All,
  One,
}

export type PlaylistType = { title: string; artist: string }[];

export type Lyrics = {
  identifier: string;
  start: number;
  end: number;
  text: string;
  style: string;
}[];
