import {
  controlState,
  playingInfoState,
  playingProgress,
  visualModeState,
} from "@state/player/atoms";
import { useRecoilState } from "recoil";

export const usePlayingProgressState = () => {
  return useRecoilState(playingProgress);
};

export const useControlState = () => {
  return useRecoilState(controlState);
};

export const useSetVolumeState = () => {
  const [state, setState] = useRecoilState(controlState);

  return (value: number) => setState({ ...state, volume: value });
};

export const useToggleRepeatTypeState = () => {
  const [state, setState] = useRecoilState(controlState);

  return () => setState({ ...state, repeatType: (state.repeatType + 1) % 3 });
};

export const useToggleIsPlayingState = () => {
  const [state, setState] = useRecoilState(controlState);

  return () => setState({ ...state, isPlaying: !state.isPlaying });
};

export const useToggleIsRandomState = () => {
  const [state, setState] = useRecoilState(controlState);

  return () => setState({ ...state, isRandom: !state.isRandom });
};

export const useToggleIsLyricsOnState = () => {
  const [state, setState] = useRecoilState(controlState);

  return () => setState({ ...state, isLyricsOn: !state.isLyricsOn });
};

export const useVisualModeState = () => {
  return useRecoilState(visualModeState);
};

export const useToggleVisualModeState = () => {
  const [state, setState] = useRecoilState(visualModeState);

  return () => setState(!state);
};

export const usePlayingInfoState = () => {
  return useRecoilState(playingInfoState);
};

export const useCurrentSongState = () => {
  const [state] = useRecoilState(playingInfoState);

  return state.playlist[state.current];
};
