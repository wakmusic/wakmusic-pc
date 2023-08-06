import instance from "@apis/axios";

const PLAYLIST_URL = "/user";

export const fetchPlaylist = async (id: string) => {
  const { data } = await instance.get(`${PLAYLIST_URL}/${id}`);
  return data;
};

export const fetchRecommendedPlaylist = async () => {
  const { data } = await instance.get(`${PLAYLIST_URL}/recommended`);
  return data;
};

export const fetchRecommendedPlaylistDetail = async (key: string) => {
  const { data } = await instance.get(`${PLAYLIST_URL}/recommended/${key}`);
  return data;
};

export const postCreatePlaylist = async (body: any) => {
  const { data } = await instance.post(`${PLAYLIST_URL}/create`, body);
  return data;
};

export const fetchPlaylistDetail = async (key: string) => {
  const { data } = await instance.get(`${PLAYLIST_URL}/${key}/detail`);
  return data;
};

export const postPlaylistAddSongs = async (key: string, body: any) => {
  const { data } = await instance.post(
    `${PLAYLIST_URL}/${key}/songs/add`,
    body
  );
  return data;
};

export const patchPlaylistRemoveSongs = async (key: string, body: any) => {
  const { data } = await instance.patch(
    `${PLAYLIST_URL}/${key}/songs/remove`,
    body
  );
  return data;
};

export const patchEditPlaylistSongs = async (key: string, body: any) => {
  const { data } = await instance.patch(`${PLAYLIST_URL}/${key}/edit`, body);
  return data;
};

export const patchEditPlaylistName = async (key: string, body: any) => {
  const { data } = await instance.patch(
    `${PLAYLIST_URL}/${key}/edit/title`,
    body
  );
  return data;
};

export const deletePlaylist = async (key: string) => {
  const { data } = await instance.delete(`${PLAYLIST_URL}/${key}/delete`);
  return data;
};

export const postAddToMyPlaylist = async (key: string) => {
  const { data } = await instance.post(
    `${PLAYLIST_URL}/${key}/addToMyPlaylist`
  );
  return data;
};
