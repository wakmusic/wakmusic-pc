import { likesEditModeState, likesStake } from "@state/likes/atoms";
import { useMemo } from "react";
import { useRecoilState } from "recoil";

import { addSongLike, removeSongLike } from "@apis/like";

import { Song } from "@templates/song";

import { useLoginModalOpener } from "./loginModal";

export const useLikesEditState = () => {
  return useRecoilState(likesEditModeState);
};

export const useLikes = (song: Song | undefined) => {
  const [likes, setLikes] = useRecoilState(likesStake);
  const liked = useMemo(
    () => (song ? likes.find((like) => like.songId === song?.songId) : false),
    [likes, song],
  );

  const openLoginModal = useLoginModalOpener();

  const addLikes = async () => {
    if (!song) {
      throw new Error("Song is not defined");
    }

    const isNotLoggedIn = openLoginModal();

    if (!isNotLoggedIn) {
      const res = await addSongLike(song.songId);

      if (res) {
        setLikes([...likes, song]);
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
        setLikes(likes.filter((like) => like.songId !== song.songId));
      }
    }
  };

  const toggleLikes = () => {
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
