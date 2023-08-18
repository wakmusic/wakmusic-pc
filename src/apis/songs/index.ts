import instance from "@apis/axios";

import {
  NewSongsResponse,
  SearchAllResponse,
  SearchTabType,
} from "@templates/search";
import { SongSortType, SongTotal } from "@templates/song";

export type NewSongsType =
  | "all"
  | "woowakgood"
  | "isedol"
  | "gomem"
  | "academy";

interface FetchSearchTabParams {
  sort?: SongSortType;

  start?: number;
  limit?: number;
}

export const fetchSong = async (id: string): Promise<SongTotal> => {
  const { data } = await instance.get(`/v2/songs/${id}`);

  return data;
};

export const fetchSearchAll = async (
  keyword: string,
  sort: SongSortType = "popular"
): Promise<SearchAllResponse> => {
  const { data } = await instance.get(`/v2/songs/search/all`, {
    params: { sort, keyword },
  });
  return data;
};

export const fetchSearchTab = async (
  keyword: string,
  type: SearchTabType,
  { sort = "popular", start = 0, limit = 30 }: FetchSearchTabParams
): Promise<SongTotal[]> => {
  const { data } = await instance.get(`/v2/songs/search/${type}`, {
    params: { sort, keyword, start, limit },
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
