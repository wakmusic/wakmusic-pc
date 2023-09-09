import instance from "@apis/axios";

import { Artist } from "@templates/artists";
import { RawSong, Song, SongSortType } from "@templates/song";

import processSong from "@utils/processSong";

type ArtistListResponse = Artist[];

const ARTIST_BASE = "/artist";

export const fetchArtistList = async (): Promise<ArtistListResponse> => {
  const { data } = await instance.get(`${ARTIST_BASE}`);
  return data;
};

export const fetchArtistAlbums = async (
  artistId: string,
  sort: SongSortType,
  start: number
): Promise<Song[]> => {
  const { data } = await instance.get(`${ARTIST_BASE}/albums`, {
    params: {
      id: artistId,
      sort,
      start,
    },
  });

  return data.map((item: RawSong) => processSong("total", item));
};
