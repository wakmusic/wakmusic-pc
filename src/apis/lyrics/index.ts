import { LyricType } from "@templates/player";
import { Song } from "@templates/song";

import instance from "../axios";

export const getLyrics = async (song: Song): Promise<LyricType[] | null> => {
  try {
    const { data } = await instance.get(`/v2/songs/lyrics/${song.songId}`, {
      validateStatus(status) {
        return status <= 500;
      },
    });

    if (data?.statusCode === 404) {
      return null;
    }

    return data.map((lyric: LyricType) => ({
      ...lyric,
      start: lyric.start - song.start - 0.3,
      end: lyric.end - song.start - 0.3,
    }));
  } catch (err) {
    return null;
  }
};
