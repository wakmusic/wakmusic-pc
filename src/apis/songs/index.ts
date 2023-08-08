import instance from "@apis/axios";

import { SongsSearchResponse } from "@templates/search";

type SearchSortType = "popular" | "new" | "old";

export const fetchSearchSongs = async (
  keyword: string,
  sort: SearchSortType = "popular"
): Promise<SongsSearchResponse> => {
  const { data } = await instance.get(`/v2/songs/search`, {
    params: { type: "all", sort, keyword },
  });
  return data;
};
