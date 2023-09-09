import instance from "@apis/axios";

import { LyricType } from "@templates/player";
import { SearchAllResponse, SearchTabType } from "@templates/search";
import { RawSong, Song, SongSortType } from "@templates/song";

import processSong from "@utils/processSong";

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

const SONGS_BASE = "/songs";

export const getLyrics = async (song: Song): Promise<LyricType[] | null> => {
  try {
    const { data } = await instance.get(`${SONGS_BASE}/lyrics/${song.songId}`, {
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

export const fetchSong = async (id: string): Promise<Song> => {
  const { data } = await instance.get(`${SONGS_BASE}/${id}`);

  return processSong("total", data);
};

export const fetchSearchAll = async (
  keyword: string,
  sort: SongSortType = "popular"
): Promise<SearchAllResponse> => {
  const { data } = await instance.get(`${SONGS_BASE}/search/all`, {
    params: { sort, keyword },
  });
  return data;
};

export const fetchSearchTab = async (
  keyword: string,
  type: SearchTabType,
  { sort = "popular", start = 0, limit = 30 }: FetchSearchTabParams
): Promise<Song[]> => {
  const { data } = await instance.get(`${SONGS_BASE}/search/${type}`, {
    params: { sort, keyword, start, limit },
  });

  return data.map((item: RawSong) => processSong("total", item));
};

export const fetchNewSongs = async (
  group: NewSongsType,
  start = 0,
  limit = 30
): Promise<Song[]> => {
  const { data } = await instance.get(`${SONGS_BASE}/new/${group}`, {
    params: { start, limit },
  });

  return data.map((item: RawSong) => processSong("total", item));
};
