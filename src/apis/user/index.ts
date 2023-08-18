import instance from "@apis/axios";

import { User } from "@templates/user";

const USER_URL = "/user";

export const fetchUser = async (): Promise<User | null> => {
  const { data, status } = await instance.get(`/auth`);

  if (status === 200) return data;

  return null;
};

export const fetchProfileList = async () => {
  const { data } = await instance.get(`${USER_URL}/profile/list`);
  return data;
};

export const postSetProfile = async (body: any) => {
  const { data } = await instance.post(`${USER_URL}/profile/set`, body);
  return data;
};

export const postSetNickname = async (body: any) => {
  const { data } = await instance.post(`${USER_URL}/username`, body);
  return data;
};

export const fetchMyPlaylist = async () => {
  const { data } = await instance.get(`${USER_URL}/playlists`);
  return data;
};

export const fetchLikeSongs = async () => {
  const { data } = await instance.get(`${USER_URL}/likes`);
  return data;
};

export const patchEditLikeSongs = async (body: any) => {
  const { data } = await instance.patch(`${USER_URL}/likes/edit`, body);
  return data;
};

export const patchEditMyPlaylist = async (body: any) => {
  const { data } = await instance.patch(`${USER_URL}/playlists/edit`, body);
  return data;
};

export const deleteLikeSongs = async (body: any) => {
  const { data } = await instance.delete(`${USER_URL}/likes/delete`, body);
  return data;
};

export const deleteMyPlaylist = async (body: any) => {
  const { data } = await instance.delete(`${USER_URL}/playlists/delete`, body);
  return data;
};
