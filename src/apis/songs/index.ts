import instance from "@apis/axios";

import { NewSongsResponse, SongsSearchResponse } from "@templates/search";
import { SongSortType } from "@templates/song";

export type NewSongsType =
  | "all"
  | "woowakgood"
  | "isedol"
  | "gomem"
  | "academy";

export const fetchSearchSongs = async (
  keyword: string,
  sort: SongSortType = "popular"
): Promise<SongsSearchResponse> => {
  const { data } = await instance.get(`/v2/songs/search`, {
    params: { type: "all", sort, keyword },
  });
  return data;
};

export const fetchNewSongs = async (
  group: NewSongsType,
  start = 0,
  limit = 30
): Promise<NewSongsResponse> => {
  const { data } = await instance.get(`/v2/songs/new/${group}`, {
    params: { start, limit },
  });

  return data;
};
