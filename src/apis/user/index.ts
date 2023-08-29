import instance, { validateStatus } from "@apis/axios";

import { RawPlaylist } from "@templates/playlist";
import { RawSong, Song } from "@templates/song";
import { UserProfile } from "@templates/user";

import processSong from "@utils/processSong";

import {
  PlaylistsResponse,
  ProfileListResponse,
  UserProfileResponse,
} from "./dto";

export const fetchProfileImages = async (): Promise<ProfileListResponse> => {
  const { data } = await instance.get(`/v2/user/profile/list`);

  return data;
};

export const fetchUser = async (): Promise<UserProfileResponse> => {
  const { data, status } = await instance.get(
    `/v2/user/profile`,
    validateStatus
  );

  if (status === 200) return data;

  return null;
};

export const setProfileImage = async (
  profile: UserProfile
): Promise<boolean> => {
  const { status } = await instance.patch(
    `/v2/user/profile`,
    {
      type: profile.type,
    },
    validateStatus
  );

  return status === 201;
};

export const setUsername = async (name: string): Promise<boolean> => {
  const { status } = await instance.patch(
    `/v2/user/name`,
    {
      name,
    },
    validateStatus
  );

  return status === 201;
};

export const fetchPlaylists = async (): Promise<PlaylistsResponse> => {
  const { data } = await instance.get(`/v2/user/playlists`);

  return data.map((item: RawPlaylist) => ({
    ...item,
    songs: item.songs.map((song: RawSong) => processSong("total", song)),
  }));
};

export const editPlaylists = async (
  playlistKeys: string[]
): Promise<boolean> => {
  const { status } = await instance.put(
    `/v2/user/playlists`,
    {
      playlistKeys,
    },
    validateStatus
  );

  return status === 200;
};

export const removePlaylists = async (
  playlistKeys: string[]
): Promise<boolean> => {
  const { status } = await instance.post(
    `/v2/user/playlists/delete`,
    {
      playlistKeys,
    },
    validateStatus
  );

  return status === 202;
};

export const fetchLikes = async (): Promise<Song[]> => {
  const { data } = await instance.get(`/v2/user/likes`);

  return data.map((item: RawSong) => processSong("total", item));
};

export const editLikes = async (songIds: string[]): Promise<boolean> => {
  const { status } = await instance.put(
    `/v2/user/likes`,
    {
      songIds,
    },
    validateStatus
  );

  return status === 200;
};

export const removeLikes = async (songIds: string[]): Promise<boolean> => {
  const { status } = await instance.post(
    `/v2/user/likes/delete`,
    {
      songIds,
    },
    validateStatus
  );

  return status === 202;
};

export const removeUser = async (): Promise<boolean> => {
  const { status } = await instance.delete(`/v2/user/remove`, validateStatus);

  return status === 200;
};

export const editPlaylistOrder = async (
  playlistKeys: string[]
): Promise<boolean> => {
  const { data } = await instance.put(
    `/v2/user/playlists`,
    {
      playlistKeys,
    },
    validateStatus
  );

  return data?.status === 200;
};
