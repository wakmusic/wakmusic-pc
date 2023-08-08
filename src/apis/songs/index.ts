import instance from "@apis/axios";

const SONGS_URL = "/songs";

type songsType = "month" | "year";
type sortType = "popular" | "new" | "old";
type searchType = "title" | "artist" | "remix" | "ids";
type groupType = "all" | "woowakgood" | "isedol" | "gomem";

export const fetchSongsList = async (
  type: songsType,
  period: number,
  start: number
) => {
  const { data } = await instance.get(`${SONGS_URL}/list`, {
    params: { type, period, start },
  });
  return data;
};

export const fetchSearchSongs = async (
  type: searchType,
  sort: sortType,
  keyword: string
) => {
  const { data } = await instance.get(`${SONGS_URL}/search`, {
    params: { type, sort, keyword },
  });
  return data;
};

export const fetchNewSongs = async () => {
  const { data } = await instance.get(`${SONGS_URL}/new/monthly`);
  return data;
};

export const fetchGroupNewSongs = async (group: groupType) => {
  const { data } = await instance.get(`${SONGS_URL}/new/${group}`);
  return data;
};

export const fetchSongsCheckLyrics = async (id: string) => {
  const { data } = await instance.get(`${SONGS_URL}/check-lyrics`, {
    params: { id },
  });
  return data;
};
