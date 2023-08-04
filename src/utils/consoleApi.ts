import { SetterOrUpdater } from "recoil";

import { PlayingInfoStateType, SongInfo } from "@templates/player";

if (!window.WAKMU) {
  window.WAKMU = {
    playSong: (song: SongInfo) => {
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
