import instance, { validateStatus } from "@apis/axios";

import { RecommendListMetaType, RecommendListType } from "@templates/playlist";
import { RawSong } from "@templates/song";

import processSong from "@utils/processSong";

export const fetchRecommendedPlaylist = async (): Promise<
  RecommendListMetaType[]
> => {
  const { data } = await instance.get(`/playlist/recommended`);
  return data;
};

export const fetchRecommendedPlaylistDetail = async (
  key: string
): Promise<RecommendListType> => {
  const { data } = await instance.get(`/v2/playlist/recommended/${key}`);

  return {
    ...data,
    songs: data.songs.map((item: RawSong) => processSong("total", item)),
  };
};

export const createPlaylist = async (title: string): Promise<boolean> => {
  const { data } = await instance.post(
    `/v2/playlist/create`,
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
    `/v2/playlist/copy`,
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
    `/v2/playlist/${playlistKey}/songs/add`,
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
    `/v2/playlist/${playlistKey}`,
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
    `/v2/playlist/${playlistKey}/songs/remove`,
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
    `/v2/playlist/${playlistKey}/songs`,
    {
      songIds,
    },
    validateStatus
  );

  return data?.status === 200;
};
