export enum RepeatType {
  Off,
  All,
  One,
}

export type SongInfo = {
  songId: string;
  title: string;
  artist: string;
  views: number;
  start: number;
  end: number;
};
export type ControlStateType = {
  volume: number;
  repeatType: RepeatType;
  isPlaying: boolean;
  isRandom: boolean;
  isLyricsOn: boolean;
};

export type PlayingInfoStateType = {
  playlist: SongInfo[];
  history: string[];
  current: number;
};

export type LyricType = {
  identifier: string;
  start: number;
  end: number;
  text: string;
};

export type ChangeProgressStateType = {
  force: boolean;
  progress: number;
};
