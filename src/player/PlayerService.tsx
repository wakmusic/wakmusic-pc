import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components/macro";

import { requestPlaySong } from "@apis/play";
import { getLyrics } from "@apis/songs";

import { useInterval } from "@hooks/interval";
import {
  useControlState,
  useIsControllingState,
  useLyricsState,
  useNextSong,
  usePlayingInfoState,
  usePlayingLengthState,
  usePlayingProgressChangeState,
  usePlayingProgressState,
  usePrevSong,
} from "@hooks/player";
import { usePrevious } from "@hooks/previous";

import { Song } from "@templates/song";

import { applyHook } from "@utils/consoleApi";

import YouTube from "./providers/YouTube";

interface PlayerServiceProps {}

const PlayerService = ({}: PlayerServiceProps) => {
  const [control, setControl] = useControlState();
  const [isControlling] = useIsControllingState();
  const [length, setLength] = usePlayingLengthState();
  const [currentProgress, setCurrentProgress] = usePlayingProgressState();
  const [changeProgress, setChangeProgress] = usePlayingProgressChangeState();
  const [info, setInfo] = usePlayingInfoState();
  const [, setLyrics] = useLyricsState();

  const prevSong = usePrevSong();
  const nextSong = useNextSong();

  const prevChangeProgress = usePrevious(changeProgress);

  const [playerProgress, setPlayerProgress] = useState(0);

  const currentSongState = useMemo(() => info.playlist[info.current], [info]);
  const previousSong = usePrevious(currentSongState);
  const previousProgress = usePrevious(currentProgress);
  const previousLength = usePrevious(length);

  const currentSong = useRef<Song | null>(null);
  currentSong.current = info.playlist[info.current];

  applyHook(setInfo);

  useInterval(() => {
    if (!currentSongState || !control.isPlaying || isControlling) return;

    setCurrentProgress((prev) => prev + 0.25);

    if (currentProgress >= length) {
      setCurrentProgress(0);
      setControl((prev) => ({
        ...prev,
        isPlaying: false,
      }));

      nextSong();
    }
  }, 250);

  useEffect(() => {
    if (!currentSongState || currentSongState?.songId === previousSong?.songId)
      return;

    requestPlaySong(
      currentSongState.songId,
      previousSong && {
        songId: previousSong.songId,
        stoppedAt: previousProgress || 0,
        songLength: previousLength || 0,
      }
    ).then((upToDateSong) => {
      setInfo((prev) => ({
        ...prev,
        playlist: prev.playlist.map((song) =>
          song.songId === upToDateSong.songId ? upToDateSong : song
        ),
      }));
    });

    getLyrics(currentSongState).then((lyrics) => {
      setLyrics(lyrics);
    });
  }, [
    currentSongState,
    previousSong,
    previousProgress,
    previousLength,
    setInfo,
    setLyrics,
  ]);

  useEffect(() => {
    if (!currentSong.current) return;

    if (
      !changeProgress.force &&
      ((changeProgress.progress !== 0 &&
        changeProgress.progress !== prevChangeProgress?.progress) ||
        isControlling)
    )
      return;

    // state change를 감지시키기 위해서 작은 랜덤 수를 더해줌
    setPlayerProgress(
      changeProgress.progress + currentSong.current.start + Math.random() / 1000
    );
    setCurrentProgress(changeProgress.progress);
  }, [
    changeProgress,
    currentSong,
    prevChangeProgress,
    isControlling,
    setCurrentProgress,
  ]);

  useEffect(() => {
    if (currentSongState) return;

    setLength(0.1);
    setCurrentProgress(0);
    setControl((prev) => ({
      ...prev,
      isPlaying: false,
    }));
  }, [currentSongState, setControl, setCurrentProgress, setLength]);

  const onProgressChange = (progress: number) => {
    if (!currentSong.current) return;

    setCurrentProgress(progress - currentSong.current.start);
  };

  const onStart = useCallback(
    (length: number) => {
      if (!currentSong.current) return;

      setLength(currentSong.current.end ?? length - currentSong.current.start);
      setCurrentProgress(currentSong.current.start);
      setControl((prev) => ({
        ...prev,
        isPlaying: true,
      }));
    },
    [setControl, setCurrentProgress, setLength]
  );

  const onEnd = () => {
    nextSong();
  };

  const onResume = () => {
    setControl((prev) => ({
      ...prev,
      isPlaying: true,
    }));
  };

  const onPause = () => {
    setControl((prev) => ({
      ...prev,
      isPlaying: false,
    }));
  };

  const toggleIsPlaying = () => {
    setControl((prev) => ({
      ...prev,
      isPlaying: !prev.isPlaying,
    }));
  };

  const setProgress = (progress: number) => {
    setChangeProgress({
      force: true,
      progress,
    });
  };

  return (
    <Container>
      <YouTube
        song={currentSongState}
        isPlaying={control.isPlaying}
        volume={control.isMute ? 0 : control.volume}
        progress={playerProgress}
        onProgressChange={onProgressChange}
        onStart={onStart}
        onEnd={onEnd}
        onResume={onResume}
        onPause={onPause}
        nextSong={nextSong}
        prevSong={prevSong}
        toggleIsPlaying={toggleIsPlaying}
        setProgress={setProgress}
      />
    </Container>
  );
};

const Container = styled.div``;

export default PlayerService;
