import instance, { validateStatus } from "@apis/axios";

import { RecommendListMetaType, RecommendListType } from "@templates/playlist";
import { RawSong } from "@templates/song";

import processSong from "@utils/processSong";

const PLAYLIST_BASE = "/playlist";

export const fetchRecommendedPlaylist = async (): Promise<
  RecommendListMetaType[]
> => {
  const { data } = await instance.get(`${PLAYLIST_BASE}/recommended`);
  return data;
};

export const fetchRecommendedPlaylistDetail = async (
  key: string
): Promise<RecommendListType> => {
  const { data } = await instance.get(`${PLAYLIST_BASE}/recommended/${key}`);

  return {
    ...data,
    songs: data.songs.map((item: RawSong) => processSong("total", item)),
  };
};

export const createPlaylist = async (title: string): Promise<boolean> => {
  const { data } = await instance.post(
    `${PLAYLIST_BASE}/create`,
    {
      title,
      image: `${Math.floor(Math.random() * 10) + 1}`,
    },
    validateStatus
  );

  return data?.status === 200;
};

export const copyPlaylist = async (key: string): Promise<boolean> => {
  const { data } = await instance.post(
    `${PLAYLIST_BASE}/copy`,
    {
      key,
    },
    validateStatus
  );

  return data?.status === 200;
};

export const addSongToPlaylist = async (
  playlistKey: string,
  songIds: string[]
): Promise<boolean> => {
  const { data } = await instance.post(
    `${PLAYLIST_BASE}/${playlistKey}/songs/add`,
    {
      songIds,
    },
    validateStatus
  );

  return data?.status === 200;
};

export const editPlaylistName = async (
  playlistKey: string,
  title: string
): Promise<boolean> => {
  const { data } = await instance.patch(
    `${PLAYLIST_BASE}/${playlistKey}`,
    {
      title,
    },
    validateStatus
  );

  return data?.status === 200;
};

export const removeSongsFromPlaylist = async (
  playlistKey: string,
  songIds: string[]
): Promise<boolean> => {
  const { data } = await instance.post(
    `${PLAYLIST_BASE}/${playlistKey}/songs/remove`,
    {
      songIds,
    },
    validateStatus
  );

  return data?.status === 200;
};

export const editOrderOfPlaylist = async (
  playlistKey: string,
  songIds: string[]
): Promise<boolean> => {
  const { data } = await instance.patch(
    `${PLAYLIST_BASE}/${playlistKey}/songs`,
    {
      songIds,
    },
    validateStatus
  );

  return data?.status === 200;
};
