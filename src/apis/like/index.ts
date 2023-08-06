import instance from "@apis/axios";

const LIKE_URL = "/like";

export const fetchSongsLikeCount = async (songId: string) => {
  const { data } = await instance.get(`${LIKE_URL}/${songId}`);
  return data;
};

export const addSongsLike = async (songId: string) => {
  const { data } = await instance.post(`${LIKE_URL}/${songId}/addLike`);
  return data;
};

export const removeSongsLike = async (songId: string) => {
  const { data } = await instance.post(`${LIKE_URL}/${songId}/removeLike`);
  return data;
};
