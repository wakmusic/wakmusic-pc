import instance from "@apis/axios";

import { RecommendListMetaType, RecommendListType } from "@templates/playlist";

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
  return data;
};
