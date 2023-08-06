import { LyricType } from "@templates/player";

import { instance } from "..";

export const getLyrics = async (
  songId: string
): Promise<LyricType[] | null> => {
  try {
    const { data } = await instance.get(`/songs/lyrics/${songId}`);

    return data;
  } catch (err) {
    return null;
  }
};
