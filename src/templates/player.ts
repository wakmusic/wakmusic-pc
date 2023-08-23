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
