import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import soundBoosts from "@constants/soundBoosts";

import { useInterval } from "@hooks/interval";
import {
  useControlState,
  useIsControllingState,
  useNextSong,
  usePlayingInfoState,
  usePlayingLengthState,
  usePlayingProgressChangeState,
  usePlayingProgressState,
  usePrevSong,
  useToggleIsPlayingState,
} from "@hooks/player";
import { usePrevious } from "@hooks/previous";

import { SongInfo } from "@templates/player";

import { applyHook } from "@utils/consoleApi";
import { getYoutubeHQThumbnail } from "@utils/staticUtill";

interface YoutubeProps {}

const Youtube = ({}: YoutubeProps) => {
  const [controlState, setControlState] = useControlState();
  const [playingLength, setPlayingLength] = usePlayingLengthState();
  const [playingProgress, setPlayingProgress] = usePlayingProgressState();
  const [changeProgress] = usePlayingProgressChangeState();
  const [playingInfo, setPlayingInfo] = usePlayingInfoState();
  const [isControlling] = useIsControllingState();

  const [nowPlaying, setNowPlaying] = useState<SongInfo | null>(null);
  const [loaded, setLoaded] = useState(false);

  const prevSongId = usePrevious(nowPlaying?.songId);
  const prevChangeProgress = usePrevious(changeProgress);

  const toggleIsPlayingState = useToggleIsPlayingState();
  const prevSong = usePrevSong();
  const nextSong = useNextSong();

  const gainNode = useRef<GainNode>();
  const player = useRef<YT.Player>();
  const playerState = useRef<{
    current: SongInfo | null;
    loaded: boolean;
    volume: number;
    isFirst: boolean;
  }>({
    current: null,
    loaded: false,
    volume: controlState.volume,
    isFirst: true,
  });

  applyHook(setPlayingInfo);

  // 괴랄한 유튜브 iframe api를 사용하기 위한 꼼수
  useEffect(() => {
    setNowPlaying(playingInfo.playlist[playingInfo.current]);
  }, [playingInfo, loaded]);

  playerState.current.current = playingInfo.playlist[playingInfo.current];
  playerState.current.loaded = loaded;
  playerState.current.volume = controlState.volume;

  const onStateChange = (e: YT.OnStateChangeEvent) => {
    if (
      e.data === YT.PlayerState.UNSTARTED &&
      !playerState.current.loaded &&
      !playerState.current.isFirst
    ) {
      player.current?.playVideo();
    }

    if (e.data === YT.PlayerState.PLAYING) {
      const iframe = e.target.getIframe() as HTMLIFrameElement;
      const video = iframe.contentWindow?.document.querySelector("video");

      if (video) {
        video.volume = playerState.current.volume / 100;
      }

      if (!gainNode.current && video) {
        const audioCtx = new AudioContext();
        const source = audioCtx.createMediaElementSource(video);

        gainNode.current = audioCtx.createGain();
        gainNode.current.gain.value = 1;
        source.connect(gainNode.current);

        gainNode.current.connect(audioCtx.destination);
      }

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

        if (gainNode.current) {
          if (current.songId in soundBoosts) {
            gainNode.current.gain.value = soundBoosts[current.songId];
            console.debug(
              `[SoundBoost] ${current.title}: ${soundBoosts[current.songId]}x`
            );
          } else {
            gainNode.current.gain.value = 1;
          }
        }

        const iframe = e.target.getIframe() as HTMLIFrameElement;

        // 그냥 넣으면 안먹힘
        setTimeout(() => {
          if (iframe.contentWindow) {
            const mediaSession = iframe.contentWindow.navigator.mediaSession;

            mediaSession.metadata = new MediaMetadata({
              title: current.title,
              artist: current.artist,
              artwork: [
                {
                  src: getYoutubeHQThumbnail(current.songId),
                  sizes: "480x360",
                  type: "image/jpg",
                },
              ],
            });

            const toggle = () => toggleIsPlayingState();

            mediaSession.setActionHandler("nexttrack", () => nextSong());
            mediaSession.setActionHandler("previoustrack", () => prevSong());
            mediaSession.setActionHandler("play", toggle);
            mediaSession.setActionHandler("pause", toggle);
          }
        }, 500);

        setPlayingLength(Math.round(duration));
        setPlayingProgress(0);
        setLoaded(true);
      }

      if (!playerState.current.isFirst) {
        setControlState((prev) => ({ ...prev, isPlaying: true }));
      } else {
        player.current?.pauseVideo();
      }

      playerState.current.isFirst = false;
    }

    if (e.data === YT.PlayerState.PAUSED) {
      setControlState((prev) => ({ ...prev, isPlaying: false }));
    }
  };

  // 유튜브 플레이어 생성
  useEffect(() => {
    const _player = new YT.Player("wakmu-youtube", {
      events: {
        onReady: (e) => {
          player.current = e.target;

          if (playerState.current.current) {
            const nowPlaying = playerState.current.current;
            player.current.loadVideoById(nowPlaying.songId, nowPlaying.start);
          }
        },
        onStateChange: onStateChange,
      },
    });

    return () => {
      _player.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 영상 재생
  useEffect(() => {
    if (!nowPlaying || !player.current || prevSongId === nowPlaying.songId)
      return;

    setLoaded(false);

    player.current.loadVideoById(nowPlaying.songId, nowPlaying.start);

    playerState.current.isFirst = false;
  }, [nowPlaying, prevSongId]);

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
    const nowPlaying = playerState.current.current;

    if (!nowPlaying || !player.current) return;

    if (
      !changeProgress.force &&
      ((changeProgress.progress !== 0 &&
        changeProgress.progress !== prevChangeProgress?.progress) ||
        isControlling)
    )
      return;

    player.current.seekTo(changeProgress.progress + nowPlaying.start, true);
    setPlayingProgress(changeProgress.progress);
  }, [changeProgress, isControlling, prevChangeProgress, setPlayingProgress]);

  // 재생 컨트롤
  useEffect(() => {
    if (!player.current || !nowPlaying) return;

    if (controlState.isPlaying) {
      player.current.playVideo();

      return;
    }

    player.current.pauseVideo();
  }, [controlState.isPlaying]);

  // 볼륨 컨트롤
  useEffect(() => {
    if (!player.current) return;

    const iframe = player.current.getIframe() as HTMLIFrameElement;
    const video = iframe.contentWindow?.document.querySelector("video");

    if (video) {
      video.volume = controlState.volume / 100;
    }
  }, [controlState.volume]);

  return <Container id="wakmu-youtube" />;
};

const Container = styled.div`
  display: none;
`;

export default Youtube;
