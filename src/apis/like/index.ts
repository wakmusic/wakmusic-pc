import instance from "@apis/axios";

const LIKE_URL = "/v2/like";

export const fetchSongLikeCount = async (songId: string): Promise<number> => {
  const { data } = await instance.get(`${LIKE_URL}/${songId}`);

  return data.like;
};

export const addSongLike = async (songId: string): Promise<boolean> => {
  const { status } = await instance.post(`${LIKE_URL}/${songId}`);

  return status === 201;
};

export const removeSongLike = async (songId: string): Promise<boolean> => {
  const { status } = await instance.delete(`${LIKE_URL}/${songId}`);

  return status === 200;
};
