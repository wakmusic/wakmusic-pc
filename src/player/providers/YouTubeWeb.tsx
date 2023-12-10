import { useEffect, useRef, useState } from "react";

import { useInterval } from "@hooks/interval";
import { useAdState } from "@hooks/player";

import { PlayerProviderProps } from "@templates/player";
import { Song } from "@templates/song";

import { YouTube } from "@utils/youtube";

const YouTubeWeb = ({
  song,
  isPlaying,
  volume,
  progress,
  onStart,
  setCurrentProgress,
}: PlayerProviderProps) => {
  const [ad, setAd] = useAdState();

  const [current, setCurrent] = useState<Song | null>(null);

  const yt = useRef<YouTube | null>(null);
  const isFirst = useRef(true);

  useEffect(() => {
    console.info(
      `[YouTubeWeb] isFirst: ${isFirst}, current: ${current?.songId}, song: ${song?.songId}`
    );

    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    if (song?.songId !== current?.songId && song?.songId) {
      setCurrent(song);

      if (!yt.current) {
        yt.current = new YouTube();
      }

      (async () => {
        const duration = await yt.current?.play(song);

        if (duration) {
          onStart(duration);
        }
      })();

      console.info(`[YouTubeWeb] open: ${song?.songId}`);
    }
  }, [current?.songId, onStart, song]);

  useEffect(() => {
    console.log(`[YouTubeWeb] volume: ${volume}`);
    yt.current?.setVolume(volume);
  }, [volume]);

  useEffect(() => {
    console.log(`[YouTubeWeb] isPlaying: ${isPlaying}`);

    if (isPlaying) {
      yt.current?.playVideo();
    } else {
      yt.current?.pauseVideo();
    }
  }, [isPlaying]);

  useEffect(() => {
    console.log(`[YouTubeWeb] progress: ${progress}`);
    yt.current?.seekTo(progress);
  }, [progress]);

  useInterval(() => {
    if (!yt.current || !setCurrentProgress || !song) return;

    yt.current.getCurrentInfo().then((info) => {
      if (info) {
        setCurrentProgress(info.currentTime - song.start);

        setAd({
          isAd: info.isAd,
          current: info.currentTime,
          duration: info.duration,
          canSkip: info.canSkip,
          skip: 0,
        });
      }
    });
  }, 250);

  useEffect(() => {
    if (ad.skip === 0) return;

    yt.current?.skipAd();
    console.log(`[YouTubeWeb] skipAd`);
  }, [ad.skip]);

  return null;
};

export default YouTubeWeb;
