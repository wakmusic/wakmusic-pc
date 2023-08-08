import { LyricType, SongInfo } from "@templates/player";

import instance from "../axios";

export const getLyrics = async (
  song: SongInfo
): Promise<LyricType[] | null> => {
  try {
    const { data } = await instance.get(`/songs/lyrics/${song.songId}`);

    return data.map((lyric: LyricType) => ({
      ...lyric,
      start: lyric.start - song.start,
      end: lyric.end - song.start,
    }));
  } catch (err) {
    return null;
  }
};
