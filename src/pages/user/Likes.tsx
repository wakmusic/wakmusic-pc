import { useState } from "react";
import styled from "styled-components/macro";

import CustomSongs from "@components/globals/CustomSongs";
import GuideBar, { GuideBarFeature } from "@components/globals/GuideBar";
import MusicController from "@components/globals/musicControllers/MusicController";

import { myListSongs } from "@constants/dummys";

import { useLikesState } from "@hooks/likes";
import { useSelectSongs } from "@hooks/selectSongs";

import { Song } from "@templates/song";
import { SongItemFeature } from "@templates/songItem";

interface LikesProps {}

const Likes = ({}: LikesProps) => {
  const [editMode] = useLikesState();
  const [likes, setLikes] = useState<Song[]>(myListSongs);

  const { selected, selectCallback } = useSelectSongs();

  const dispatchLikes = (songs: Song[]) => {
    setLikes(songs);
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
        dispatchSelectedSongs={selectCallback}
        onDelete={editMode ? dispatchLikes : undefined}
      />
    </Container>
  );
};

const Container = styled.div``;

export default Likes;
