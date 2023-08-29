import { useEffect, useRef } from "react";
import styled from "styled-components/macro";

import soundBoosts from "@constants/soundBoosts";

import { PlayerProviderProps } from "@templates/player";
import { Song } from "@templates/song";

import { isNil } from "@utils/isTypes";
import { getYoutubeHQThumbnail } from "@utils/staticUtill";

type PlayerState = {
  current: Song | null;
  isLoaded: boolean;
  isFirst: boolean;
};

const YouTube = ({
  song,
  isPlaying,
  volume,
  progress,
  onProgressChange,
  onStart,
  onEnd,
  onResume,
  onPause,
  nextSong,
  prevSong,
  toggleIsPlaying,
  setProgress,
}: PlayerProviderProps) => {
  const player = useRef<YT.Player>();
  const playerState = useRef<PlayerState>({
    current: null,
    isLoaded: false,
    isFirst: true,
  });

  const gainNode = useRef<GainNode>();

  const getContentWindow = (): Window | null => {
    let contentWindow: Window | null = null;

    try {
      const iframe = player.current?.getIframe() as HTMLIFrameElement;
      contentWindow = iframe.contentWindow;
    } catch {
      /* empty */
    }

    return contentWindow;
  };

  const getVideoElement = (): HTMLVideoElement | undefined => {
    const contentWindow = getContentWindow();

    if (!contentWindow) return;

    let video: HTMLVideoElement | undefined;

    try {
      video = contentWindow.document.querySelector("video") as HTMLVideoElement;
    } catch {
      /* empty */
    }

    return video;
  };

  const applySoundBoost = () => {
    const video = getVideoElement();

    if (!video) return;

    const audioCtx = new AudioContext();

    try {
      const mediaSource = audioCtx.createMediaElementSource(video);
      const _gainNode = audioCtx.createGain();

      mediaSource.connect(_gainNode);
      _gainNode.connect(audioCtx.destination);

      gainNode.current = _gainNode;
    } catch {
      // gainNode가 이미 있을 경우 패스
    }

    const current = playerState.current.current;
    if (current && gainNode.current) {
      if (current.songId in soundBoosts) {
        gainNode.current.gain.value = soundBoosts[current.songId];
      } else {
        gainNode.current.gain.value = 1;
      }
    }
  };

  const changeVolume = (volume: number) => {
    const video = getVideoElement();

    if (isNil(video)) {
      player.current?.setVolume(volume);
    } else {
      player.current?.setVolume(volume);
      setTimeout(() => {
        video.volume = volume / 100;
      }, 500);
    }
  };

  const onStateChange = (e: YT.OnStateChangeEvent) => {
    switch (e.data) {
      case YT.PlayerState.UNSTARTED: {
        if (
          !playerState.current.isLoaded &&
          !playerState.current.isFirst &&
          playerState.current.current
        ) {
          player.current?.playVideo();
        }

        playerState.current.isFirst = false;

        break;
      }

      case YT.PlayerState.PLAYING: {
        applySoundBoost();

        if (!playerState.current.isLoaded) {
          onStart(player.current?.getDuration() || 0);
        } else {
          onResume();
        }

        playerState.current.isLoaded = true;

        onProgressChange(player.current?.getCurrentTime() || 0);

        setTimeout(() => {
          const contentWindow = getContentWindow();

          if (!contentWindow) return;

          const mediaSession = contentWindow.navigator.mediaSession;
          const current = playerState.current.current;

          if (!mediaSession || !current) return;
          if (!nextSong || !prevSong || !toggleIsPlaying || !setProgress)
            return;

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

          const toggle = () => toggleIsPlaying();

          mediaSession.setActionHandler("nexttrack", () => nextSong());
          mediaSession.setActionHandler("previoustrack", () => prevSong());
          mediaSession.setActionHandler("play", toggle);
          mediaSession.setActionHandler("pause", toggle);
          mediaSession.setActionHandler(
            "seekto",
            (data: MediaSessionActionDetails) => {
              if (data.seekTime) {
                setProgress(data.seekTime);
              }
            }
          );
        }, 1000);

        break;
      }

      case YT.PlayerState.ENDED: {
        onEnd();

        break;
      }

      case YT.PlayerState.PAUSED: {
        onPause();

        break;
      }
    }
  };

  // 유튜브 플레이어 생성
  useEffect(() => {
    const _player = new YT.Player("wakmu-youtube", {
      events: {
        onReady: (e) => {
          player.current = e.target;

          if (song) {
            playerState.current.current = song;
            changeVolume(volume);
            player.current.cueVideoById(song?.songId, song?.start);
          }
        },
        onStateChange,
      },
    });

    return () => {
      _player.destroy();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!player.current) return;

    changeVolume(volume);

    const prevSong = playerState.current.current;
    const nowSong: Song | null = song;

    if (prevSong?.songId === nowSong?.songId) return;

    if (song) {
      playerState.current.current = song;
      player.current.loadVideoById(song.songId, song.start);
    } else {
      playerState.current.current = null;
      player.current.stopVideo();
    }

    playerState.current.isLoaded = false;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [song]);

  useEffect(() => {
    if (!player.current) return;

    changeVolume(volume);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volume]);

  useEffect(() => {
    if (!player.current) return;

    if (isPlaying) {
      if (playerState.current.isFirst) return;

      player.current.playVideo();
    } else {
      player.current.pauseVideo();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!player.current) return;

    player.current.seekTo(progress, true);
  }, [progress]);

  return <Container id="wakmu-youtube" />;
};

const Container = styled.div`
  display: none;
`;

export default YouTube;
