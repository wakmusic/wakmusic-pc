import { Song } from "./song";

export enum RepeatType {
  Off,
  All,
  One,
}

export type ControlStateType = {
  volume: number;
  isMute: boolean;
  repeatType: RepeatType;
  isPlaying: boolean;
  isRandom: boolean;
  isLyricsOn: boolean;
};

export type PlayingInfoStateType = {
  playlist: Song[];
  original: Song[];
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

export type PlayerProviderProps = {
  song: Song | null;
  isPlaying: boolean;
  volume: number;
  progress: number;

  onProgressChange: (progress: number) => void;
  onStart: (length: number) => void;
  onEnd: () => void;
  onResume: () => void;
  onPause: () => void;

  nextSong?: () => void;
  prevSong?: () => void;
  toggleIsPlaying?: () => void;
  setProgress?: (progress: number) => void;
};
