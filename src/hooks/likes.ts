import { likesEditModeState, likesStake } from "@state/likes/atoms";
import { useMemo } from "react";
import { useRecoilState } from "recoil";

import { addSongLike, removeSongLike } from "@apis/like";

import { PlayingInfoStateType } from "@templates/player";
import { Song } from "@templates/song";

import { useLoginModalOpener } from "./modal";
import { usePlayingInfoState } from "./player";

const applyPlaylistLike = (
  info: PlayingInfoStateType,
  song: Song
): PlayingInfoStateType => {
  const apply = (playlist: Song[]) => {
    return playlist.map((s) => {
      if (s.songId === song.songId) {
        return song;
      }

      return s;
    });
  };

  return {
    ...info,
    playlist: apply(info.playlist),
    original: apply(info.original),
  };
};

export const useLikesEditState = () => {
  return useRecoilState(likesEditModeState);
};

export const useLikes = (song: Song | undefined) => {
  const [likes, setLikes] = useRecoilState(likesStake);
  const liked = useMemo(
    () => (song ? likes.find((like) => like.songId === song?.songId) : false),
    [likes, song]
  );

  const [info, setInfo] = usePlayingInfoState();

  const openLoginModal = useLoginModalOpener();

  const addLikes = async () => {
    if (!song) {
      throw new Error("Song is not defined");
    }

    const isNotLoggedIn = openLoginModal();

    if (!isNotLoggedIn) {
      const res = await addSongLike(song.songId);

      if (res) {
        const updatedSong = { ...song };
        updatedSong.like += 1;

        setLikes([...likes, updatedSong]);
        setInfo(applyPlaylistLike(info, updatedSong));
      }
    }
  };

  const removeLikes = async () => {
    if (!song) {
      throw new Error("Song is not defined");
    }

    const isNotLoggedIn = openLoginModal();

    if (!isNotLoggedIn) {
      const res = await removeSongLike(song.songId);

      if (res) {
        const updatedSong = { ...song };
        updatedSong.like -= 1;

        setLikes(likes.filter((like) => like.songId !== song.songId));
        setInfo(applyPlaylistLike(info, updatedSong));
      }
    }
  };

  const toggleLikes = () => {
    if (!song) return;

    if (liked) {
      removeLikes();
    } else {
      addLikes();
    }
  };

  return {
    likes,
    liked,
    addLikes,
    removeLikes,
    toggleLikes,
  };
};

export const useLikesState = () => {
  return useRecoilState(likesStake);
};
