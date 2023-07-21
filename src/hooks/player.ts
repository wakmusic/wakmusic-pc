import { currentPlaying, lyricsState } from "@state/player/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

export const useLyricsState = () => {
  return useRecoilState(lyricsState);
};

export const useSetIsLyricsOn = () => {
  const setIsLyricsOn = useSetRecoilState(lyricsState);

  return (state?: boolean) => setIsLyricsOn(state ?? true);
};

export const useCurrentPlayingState = () => {
  return useRecoilState(currentPlaying);
};

export const useSetCurrentPlaying = () => {
  const setCurrentPlaying = useSetRecoilState(currentPlaying);

  return (current?: number) => setCurrentPlaying(current ?? 0);
};
