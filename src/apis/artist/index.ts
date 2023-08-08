import instance from "@apis/axios";

const ARTIST_URL = "/artist";

type sortType = "popular" | "new" | "old";

export const fetchArtistList = async () => {
  const { data } = await instance.get(`${ARTIST_URL}/list`);
  return data;
};

export const fetchArtistAlbums = async (
  id: string,
  sort: sortType,
  start: number
) => {
  const { data } = await instance.get(`${ARTIST_URL}/albums`, {
    params: {
      id,
      sort,
      start,
    },
  });
  return data;
};
