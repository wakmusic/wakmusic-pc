import instance from "@apis/axios";

import { Song } from "@templates/song";

import processSong from "@utils/processSong";

type PrevData = {
  songId: string;
  stoppedAt: number;
  songLength: number;
};

export const requestPlaySong = async (
  currentSongId: string,
  prev: PrevData | undefined
): Promise<Song> => {
  const { data } = await instance.post(`/play`, {
    prev,
    curr: {
      songId: currentSongId,
    },

    // TODO: 일단 pc라고 박아두긴 했지만 나중에 어떻게 될지 모름
    os: "pc",
  });

  return processSong("total", data);
};
