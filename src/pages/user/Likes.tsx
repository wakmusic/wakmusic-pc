import { useEffect, useState } from "react";
import styled from "styled-components/macro";

import { editLikes, removeLikes } from "@apis/user";

import CustomSongs from "@components/globals/CustomSongs";
import GuideBar, { GuideBarFeature } from "@components/globals/GuideBar";
import MusicController from "@components/globals/musicControllers/MusicController";

import { useLikesEditState, useLikesState } from "@hooks/likes";
import { usePrevious } from "@hooks/previous";
import { useSelectSongs } from "@hooks/selectSongs";

import { Song } from "@templates/song";
import { SongItemFeature } from "@templates/songItem";

import { isSameArray } from "@utils/utils";

interface LikesProps {}

const Likes = ({}: LikesProps) => {
  const [editMode] = useLikesEditState();
  const [likes, setLikes] = useLikesState();

  const prevLikes = usePrevious(likes);
  const [changeLikes, setChangeLikes] = useState<Song[]>([]);

  const { selected, selectCallback, selectManyCallback, selectedIncludes } =
    useSelectSongs(likes);

  useEffect(() => {
    if (
      !likes ||
      editMode ||
      changeLikes.length === 0 ||
      !isSameArray(likes, prevLikes ?? []) ||
      isSameArray(likes, changeLikes)
    ) {
      return;
    }

    (async () => {
      const success = await editLikes(changeLikes.map((song) => song.songId));

      if (success) {
        setLikes(changeLikes);
      }
    })();
  }, [changeLikes, editMode, likes, prevLikes, setLikes]);

  const dispatchLikes = async (songs: Song[]) => {
    const removedSongs = likes.filter(
      (like) => !songs.find((song) => song.songId === like.songId)
    );

    if (removedSongs.length > 0) {
      const success = await removeLikes(
        removedSongs.map((song) => song.songId)
      );

      if (success) {
        setLikes(
          likes.filter(
            (like) => !removedSongs.find((song) => song.songId === like.songId)
          )
        );
      }
    }

    setChangeLikes(songs);
  };

  return (
    <Container>
      <GuideBar
        features={[
          GuideBarFeature.info,
          GuideBarFeature.date,
          GuideBarFeature.views,
          GuideBarFeature.like,
        ]}
        editMode={editMode}
      />

      <CustomSongs
        height={181}
        editMode={editMode}
        onEdit={dispatchLikes}
        selectedIncludes={selectedIncludes}
        onSongClick={selectCallback}
        selectedSongs={selected}
        songFeatures={[
          SongItemFeature.date,
          SongItemFeature.views,
          SongItemFeature.like,
        ]}
      >
        {likes}
      </CustomSongs>
      <MusicController
        songs={likes}
        selectedSongs={selected}
        dispatchSelectedSongs={selectManyCallback}
        onDelete={editMode ? dispatchLikes : undefined}
      />
    </Container>
  );
};

const Container = styled.div``;

export default Likes;
