import instance from "@apis/axios";

import { SongsSearchResponse } from "@templates/search";
import { SongSortType } from "@templates/song";

export const fetchSearchSongs = async (
  keyword: string,
  sort: SongSortType = "popular"
): Promise<SongsSearchResponse> => {
  const { data } = await instance.get(`/v2/songs/search`, {
    params: { type: "all", sort, keyword },
  });
  return data;
};
