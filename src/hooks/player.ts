import {
  controlState,
  isControlling,
  isSpaceDisabled,
  lyricsState,
  playingChangeProgress,
  playingInfoState,
  playingLength,
  playingProgress,
  visualModeState,
} from "@state/player/atoms";
import { useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { fetchCharts } from "@apis/charts";

import {
  ControlStateType,
  PlayingInfoStateType,
  RepeatType,
} from "@templates/player";
import { Song } from "@templates/song";

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

export const useIsSpaceDisabled = () => {
  return useRecoilState(isSpaceDisabled);
};

export const useSetVolumeState = () => {
  const [state, setState] = useRecoilState(controlState);

  return (volume: number, isMute: boolean) =>
    setState({ ...state, volume, isMute });
};

export const useToggleRepeatTypeState = () => {
  const [state, setState] = useRecoilState(controlState);

  return () => setState({ ...state, repeatType: (state.repeatType + 1) % 3 });
};

export const useToggleIsPlayingState = () => {
  const setState = useSetRecoilState(controlState);
  const [playingInfo, setPlayingInfo] = usePlayingInfoState();

  return () => {
    if (playingInfo.playlist.length === 0) {
      fetchCharts("hourly").then((chart) => {
        setPlayingInfo((prev) => ({
          ...prev,
          playlist: chart,
        }));
        setState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
      });
    } else {
      setState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
    }
  };
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

export const usePrevSong = () => {
  const [controlState] = useControlState();
  const [playingInfo, setPlayingInfo] = usePlayingInfoState();

  const progress = useRecoilValue(playingProgress);
  const setProgress = useSetRecoilState(playingChangeProgress);

  const stateRef = useRef<{
    controlState: ControlStateType;
    playingInfo: PlayingInfoStateType;
    progress: number;
  }>({
    controlState,
    playingInfo,
    progress,
  });

  stateRef.current = {
    controlState,
    playingInfo,
    progress,
  };

  const handler = () => {
    const { controlState, playingInfo, progress } = stateRef.current;

    if (progress > 5) {
      setProgress({
        progress: 0,
        force: false,
      });
      return;
    }

    let prevIndex = 0;

    if (controlState.isRandom) {
      const getSongIndex = (): number => {
        if (playingInfo.history.length === 0) {
          return 0;
        }

        let minus = 1;
        let songId = playingInfo.history[playingInfo.history.length - minus];

        if (songId === playingInfo.playlist[playingInfo.current].songId) {
          songId = playingInfo.history[playingInfo.history.length - 2];
          minus = 2;
        }

        const songIndex = playingInfo.playlist.findIndex(
          (song) => song.songId === songId
        );

        if (songId) {
          setPlayingInfo((prev) => ({
            ...prev,
            history: prev.history.slice(0, prev.history.length - minus),
          }));
        }

        if (!songIndex) {
          return getSongIndex();
        }

        return songIndex;
      };

      prevIndex = getSongIndex();
    } else {
      prevIndex = playingInfo.current - 1;
    }

    if (prevIndex < 0) {
      prevIndex = 0;
    }

    if (prevIndex === 0 && controlState.repeatType === RepeatType.All) {
      prevIndex = playingInfo.playlist.length - 1;
    }

    setPlayingInfo((prev) => ({
      ...prev,
      current: prevIndex,
    }));
  };

  return handler;
};

export const useNextSong = () => {
  const [control, setControl] = useControlState();
  const [playingInfo, setPlayingInfo] = usePlayingInfoState();

  const setProgress = useSetRecoilState(playingChangeProgress);

  const stateRef = useRef<{
    control: ControlStateType;
    playingInfo: PlayingInfoStateType;
  }>({
    control,
    playingInfo,
  });

  stateRef.current = {
    control,
    playingInfo,
  };

  const handler = () => {
    const { control, playingInfo } = stateRef.current;

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
          return;
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

        setProgress({
          progress: start,
          force: true,
        });

        break;
      }
    }
  };

  return handler;
};

export const usePlaySong = () => {
  const [playingInfo, setPlayingInfo] = useRecoilState(playingInfoState);
  const setPlayingChangeProgress = useSetRecoilState(playingChangeProgress);

  return (song: Song) => {
    const current = playingInfo.playlist[playingInfo.current];

    if (current?.songId === song.songId) {
      setPlayingChangeProgress({
        progress: 0,
        force: true,
      });

      return;
    }

    setPlayingInfo((prev) => ({
      ...prev,
      current: prev.playlist.length,
      playlist: [...prev.playlist, song],
    }));
  };
};

export const usePlaySongs = () => {
  const setPlayingInfo = useSetRecoilState(playingInfoState);

  return (songs: Song[], shuffle = false) => {
    if (shuffle) {
      songs = songs.sort(() => Math.random() - 0.5);
    }

    setPlayingInfo({
      playlist: songs,
      history: [],
      current: 0,
    });
  };
};
