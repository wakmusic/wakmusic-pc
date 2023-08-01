import {
  controlState,
  isControlling,
  lyricsState,
  playingChangeProgress,
  playingInfoState,
  playingLength,
  playingProgress,
  visualModeState,
} from "@state/player/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

import { RepeatType } from "@templates/player";

export const usePlayingLengthState = () => {
  return useRecoilState(playingLength);
};

export const useIsControllingState = () => {
  return useRecoilState(isControlling);
};

export const usePlayingProgressState = () => {
  return useRecoilState(playingProgress);
};

export const usePlayingProgressChangeState = () => {
  return useRecoilState(playingChangeProgress);
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
  const setPlayingInfo = useSetRecoilState(playingInfoState);

  return () => {
    setPlayingInfo((prev) => ({
      ...prev,
      history: [],
    }));

    setState({ ...state, isRandom: !state.isRandom });
  };
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

export const useLyricsState = () => {
  return useRecoilState(lyricsState);
};

export const useNextSong = () => {
  const [control, setControl] = useControlState();
  const [playingInfo, setPlayingInfo] = usePlayingInfoState();

  const setProgress = useSetRecoilState(playingChangeProgress);
  const setLength = useSetRecoilState(playingLength);

  const handler = () => {
    setControl((prev) => ({ ...prev, isPlaying: false }));

    if (control.isRandom && control.repeatType !== RepeatType.One) {
      const randomIndex = Math.floor(
        Math.random() * playingInfo.playlist.length
      );

      setPlayingInfo((prev) => ({
        ...prev,
        current: randomIndex,
        history: [
          ...(prev.history ?? []),
          prev.playlist[randomIndex].songId,
        ].slice(-50),
      }));

      return;
    }

    switch (control.repeatType) {
      case RepeatType.Off: {
        if (playingInfo.current === playingInfo.playlist.length - 1) {
          setPlayingInfo((prev) => ({
            ...prev,
            current: -1,
          }));

          setProgress(0);
          setLength(1);

          break;
        }

        setPlayingInfo((prev) => ({
          ...prev,
          current: prev.current + 1,
        }));

        break;
      }

      case RepeatType.All: {
        if (playingInfo.current === playingInfo.playlist.length - 1) {
          setPlayingInfo((prev) => ({
            ...prev,
            current: 0,
          }));

          break;
        }

        setPlayingInfo((prev) => ({
          ...prev,
          current: prev.current + 1,
        }));

        break;
      }

      case RepeatType.One: {
        setControl((prev) => ({ ...prev, isPlaying: true }));

        const start = playingInfo.playlist[playingInfo.current]?.start || 0;

        setProgress(start);

        break;
      }
    }
  };

  return handler;
};
