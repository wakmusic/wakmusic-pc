import instance from "@apis/axios";

import { Artist } from "@templates/artists";

export type ArtistAlbumsSortType = "popular" | "new" | "old";

type ArtistListResponse = Artist[];

export const fetchArtistList = async (): Promise<ArtistListResponse> => {
  const { data } = await instance.get(`/artist/list`);
  return data;
};

export const fetchArtistAlbums = async (
  artistId: string,
  sort: ArtistAlbumsSortType,
  start: number
) => {
  const { data } = await instance.get(`v2/artist/albums`, {
    params: {
      id: artistId,
      sort,
      start,
    },
  });
  return data;
};
