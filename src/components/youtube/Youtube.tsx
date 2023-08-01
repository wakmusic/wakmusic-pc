import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components/macro";

import { useInterval } from "@hooks/interval";
import {
  useControlState,
  useIsControllingState,
  useNextSong,
  usePlayingInfoState,
  usePlayingLengthState,
  usePlayingProgressChangeState,
  usePlayingProgressState,
} from "@hooks/player";

import { SongInfo } from "@templates/player";

interface YoutubeProps {}

const Youtube = ({}: YoutubeProps) => {
  const [controlState, setControlState] = useControlState();
  const [playingLength, setPlayingLength] = usePlayingLengthState();
  const [playingProgress, setPlayingProgress] = usePlayingProgressState();
  const [changeProgress] = usePlayingProgressChangeState();
  const [playingInfo, setPlayingInfo] = usePlayingInfoState();
  const [isControlling] = useIsControllingState();

  const [loaded, setLoaded] = useState(false);

  const nextSong = useNextSong();

  const [nowPlaying, setNowPlaying] = useState<SongInfo | null>(null);

  const player = useRef<YT.Player>();

  const playerState = useRef<{
    current: SongInfo | null;
    loaded: boolean;
  }>({
    current: null,
    loaded: false,
  });

  useEffect(() => {
    setNowPlaying(playingInfo.playlist[playingInfo.current]);

    playerState.current.current = playingInfo.playlist[playingInfo.current];
  }, [playingInfo]);

  useEffect(() => {
    playerState.current.loaded = loaded;
  }, [loaded]);

  const onStateChange = useCallback(
    (e: YT.OnStateChangeEvent) => {
      if (e.data === YT.PlayerState.UNSTARTED) {
        player.current?.playVideo();
      }

      if (e.data === YT.PlayerState.PLAYING) {
        if (!playerState.current.loaded && playerState.current.current) {
          const current = playerState.current.current;
          const videoDuration = Math.round(
            (
              e.target as unknown as {
                playerInfo: { duration: number };
              }
            ).playerInfo.duration
          );

          const duration =
            (current.end === 0 ? videoDuration : current.end) - current.start;

          setPlayingLength(Math.round(duration));
          setPlayingProgress(current.start);
          setLoaded(true);
        }

        setControlState((prev) => ({ ...prev, isPlaying: true }));
      }

      if (e.data === YT.PlayerState.PAUSED) {
        setControlState((prev) => ({ ...prev, isPlaying: false }));
      }
    },
    [setControlState, setPlayingLength, setPlayingProgress]
  );

  // 유튜브 플레이어 생성
  useEffect(() => {
    new YT.Player("wakmu-youtube", {
      events: {
        onReady: (e) => {
          player.current = e.target;
        },
        onStateChange: onStateChange,
      },
    });
  }, [onStateChange]);

  // 영상 재생
  useEffect(() => {
    if (!nowPlaying) return;
    if (!player.current) return;

    setLoaded(false);

    player.current.loadVideoById(nowPlaying.songId, nowPlaying.start);
  }, [nowPlaying]);

  // 영상 재생 위치 변경
  useInterval(() => {
    if (isControlling) return;
    if (!controlState.isPlaying) return;

    if (playingProgress >= playingLength) {
      if (player.current) {
        player.current.stopVideo();
      }

      nextSong();

      return;
    }

    setPlayingProgress(playingProgress + 1);
  }, 1000);

  // changeProgress 변경 시 영상 재생 위치 변경
  useEffect(() => {
    if (!player.current) return;
    if (isControlling) return;

    player.current.seekTo(changeProgress, true);
    setPlayingProgress(changeProgress);
  }, [changeProgress, isControlling, setPlayingProgress]);

  // 재생 컨트롤
  useEffect(() => {
    if (!player.current) return;
    if (!nowPlaying) return;

    if (controlState.isPlaying) player.current.playVideo();
    else player.current.pauseVideo();
  }, [controlState.isPlaying, nowPlaying]);

  // 볼륨 컨트롤
  useEffect(() => {
    if (!player.current) return;

    player.current.setVolume(controlState.volume);
  }, [controlState.volume]);

  return <Container id="wakmu-youtube" />;
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 500px;
  height: 300px;
  z-index: 100;
`;

export default Youtube;
