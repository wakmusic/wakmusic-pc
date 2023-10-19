import { useEffect, useRef, useState } from "react";

import { PlayerProviderProps } from "@templates/player";
import { Song } from "@templates/song";

import { YouTube } from "@utils/youtube";

const YouTubeWeb = ({
  song,
  isPlaying,
  volume,
  progress,
  onStart,
}: PlayerProviderProps) => {
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
        const duration = await yt.current?.play(song?.songId);

        if (duration) {
          onStart(duration);
        }
      })();

      console.info(`[YouTubeWeb] open: ${song?.songId}`);
    }
  }, [current?.songId, onStart, song]);

  useEffect(() => {
    console.log(`[YouTubeWeb] volume: ${volume}`);
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

  return null;
};

export default YouTubeWeb;
