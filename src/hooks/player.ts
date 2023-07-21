import { controlState, currentPlaying } from "@state/player/atoms";
import { useRecoilState } from "recoil";

export const useCurrentPlayingState = () => {
  return useRecoilState(currentPlaying);
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
