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
import { useRecoilState, useSetRecoilState } from "recoil";

import {
  ControlStateType,
  PlayingInfoStateType,
  RepeatType,
} from "@templates/player";
import { Song } from "@templates/song";

import getChartData from "@utils/getChartData";

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

  return (value: number) => setState({ ...state, volume: value });
};

export const useToggleRepeatTypeState = () => {
  const [state, setState] = useRecoilState(controlState);

  return () => setState({ ...state, repeatType: (state.repeatType + 1) % 3 });
};

export const useToggleIsPlayingState = () => {
  const setState = useSetRecoilState(controlState);

  return () => setState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
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
  const [controlState, setControlState] = useControlState();
  const [playingInfo, setPlayingInfo] = usePlayingInfoState();
  const setPlayingProgress = useSetRecoilState(playingProgress);
  const setPlayingLength = useSetRecoilState(playingLength);

  const stateRef = useRef<{
    controlState: ControlStateType;
    playingInfo: PlayingInfoStateType;
  }>({
    controlState,
    playingInfo,
  });

  stateRef.current = {
    controlState,
    playingInfo,
  };

  const handler = () => {
    const { controlState, playingInfo } = stateRef.current;

    let prevIndex = -1;

    if (controlState.isRandom) {
      const getSongIndex = (): number => {
        if (playingInfo.history.length === 0) {
          return -1;
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

    if (prevIndex < -1) {
      prevIndex = -1;
    }

    if (prevIndex === -1) {
      setPlayingLength(1);
      setPlayingProgress(0);
      setControlState((prev) => ({
        ...prev,
        isPlaying: false,
      }));
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

  const setProgress = useSetRecoilState(playingProgress);
  const setLength = useSetRecoilState(playingLength);

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

export const usePlaySong = () => {
  const [playingInfo, setPlayingInfo] = useRecoilState(playingInfoState);
  const setPlayingChangeProgress = useSetRecoilState(playingChangeProgress);

  return (song: Song) => {
    const chartData = getChartData(song);
    const current = playingInfo.playlist[playingInfo.current];

    if (current?.songId === song.songId) {
      setPlayingChangeProgress(0);

      return;
    }

    setPlayingInfo((prev) => ({
      ...prev,
      current: prev.playlist.length,
      playlist: [
        ...prev.playlist,
        {
          songId: song.songId,
          title: song.title,
          artist: song.artist,
          views: chartData.views,
          start: song.start,
          end: song.end,
        },
      ],
    }));
  };
};
