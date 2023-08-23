import { SetterOrUpdater } from "recoil";

import { PlayingInfoStateType } from "@templates/player";
import { Song } from "@templates/song";

/*
 * Devtools Console에서 왁뮤 플레이어를 컨트롤 할 수 있도록 하는 API입니다.
 */

if (!window.WAKMU) {
  window.WAKMU = {
    playSong: (song: Song) => {
      if (window.WAKMU.__setPlayingInfo) {
        window.WAKMU.__setPlayingInfo((prev: PlayingInfoStateType) => ({
          ...prev,
          playlist: [...prev.playlist, song],
          current: prev.playlist.length,
        }));
      }
    },
    playYoutube: (youtubeId: string, title = "Song", artist = "Artist") => {
      window.WAKMU.playSong({
        songId: youtubeId,
        title,
        artist,
        start: 0,
        end: 0,
        views: 0,
      });
    },
  };
}

export const applyHook = (
  setPlayingInfo: SetterOrUpdater<PlayingInfoStateType>
) => {
  window.WAKMU.__setPlayingInfo = setPlayingInfo;
};
