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
import { queryClient } from "src/main";

import { fetchCharts } from "@apis/charts";

import {
  ControlStateType,
  PlayingInfoStateType,
  RepeatType,
} from "@templates/player";
import { Song } from "@templates/song";

import { isNil } from "@utils/isTypes";

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
      queryClient
        .fetchQuery({
          queryKey: ["charts", "hourly"],
          queryFn: async () => await fetchCharts("hourly", 100),
        })
        .then((chart) => {
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

  return (forceShuffle = false) => {
    setPlayingInfo((prev) => {
      let newPlaylist: Song[] = [];
      let current = 0;

      if (forceShuffle || !state.isRandom) {
        const shuffledPlaylist = [...prev.original].sort(
          () => Math.random() - 0.5
        );

        if (forceShuffle) {
          newPlaylist = shuffledPlaylist;
        } else {
          const movedCurrent = shuffledPlaylist.findIndex(
            (item) => item.songId === prev.playlist[prev.current].songId
          );

          if (movedCurrent !== -1) {
            newPlaylist = [
              shuffledPlaylist[movedCurrent],
              ...shuffledPlaylist.slice(0, movedCurrent),
              ...shuffledPlaylist.slice(movedCurrent + 1),
            ];
          }
        }
      } else {
        newPlaylist = [...prev.original];
        current = newPlaylist.findIndex(
          (item) => item.songId === prev.playlist[prev.current].songId
        );
      }

      return {
        ...prev,
        playlist: newPlaylist,
        current,
      };
    });

    setState({ ...state, isRandom: forceShuffle || !state.isRandom });
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

    let prevIndex = playingInfo.current - 1;

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
  const toggleRandom = useToggleIsRandomState();

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
          if (control.isRandom) {
            toggleRandom(true);
          }

          setPlayingInfo((prev) => ({
            ...prev,
            current: 0,
          }));

          setProgress({
            progress: 0,
            force: true,
          });

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

        setProgress({
          progress: 0,
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

    setPlayingInfo((prev) => {
      const index = prev.playlist.findIndex(
        (item) => item.songId === song.songId
      );

      if (index !== -1) {
        return {
          ...prev,
          current: index,
        };
      }

      return {
        ...prev,
        current: prev.playlist.length,
        playlist: [...prev.playlist, song],
      };
    });
  };
};

export const usePlaySongs = () => {
  const setPlayingInfo = useSetRecoilState(playingInfoState);

  return (songs: Song[], shuffle = false, play = true) => {
    const addSongs = shuffle
      ? [...songs].sort(() => Math.random() - 0.5)
      : songs;

    setPlayingInfo((prev) => {
      const oldPlaylist = [...prev.playlist];

      for (const song of addSongs) {
        if (isNil(song)) continue;

        const index = oldPlaylist.findIndex(
          (item) => item?.songId === song.songId
        );

        if (index !== -1) {
          oldPlaylist.splice(index, 1);
        }
      }

      const newPlaylist = [...oldPlaylist, ...addSongs];
      const currentSong: Song | undefined = prev.playlist[prev.current];

      return {
        ...prev,
        current: currentSong
          ? newPlaylist.findIndex(
              (item) =>
                item.songId === (play ? addSongs[0] : currentSong).songId
            )
          : 0,
        playlist: newPlaylist,
        original: [],
      };
    });
  };
};
