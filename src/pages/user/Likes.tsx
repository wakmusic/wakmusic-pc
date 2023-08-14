import { useState } from "react";
import styled from "styled-components/macro";

import GuideBar, { GuideBarFeature } from "@components/globals/GuideBar";
import { SongItemFeature } from "@components/globals/SongItem";
import Songs from "@components/globals/Songs";
import MusicController from "@components/globals/musicControllers/musicControllerContainers/MusicController";

import { myListSongs } from "@constants/dummys";

import { useLikesState } from "@hooks/likes";
import { useSelectSongs } from "@hooks/selectSongs";

import { ControllerFeature } from "@templates/musicController";
import { Song, SongTotal } from "@templates/song";

interface LikesProps {}

const isSongTotal = (songs: Song[]): songs is SongTotal[] => {
  let isTrue = true;

  songs.forEach((item) => {
    if (!("total" in item)) {
      isTrue = false;
    }
  });

  return isTrue;
};

const Likes = ({}: LikesProps) => {
  const [editMode] = useLikesState();
  const [likes, setLikes] = useState(myListSongs);

  const { selected, selectCallback } = useSelectSongs();

  return (
    <Container>
      <GuideBar
        features={[
          GuideBarFeature.info,
          GuideBarFeature.date,
          GuideBarFeature.views,
          GuideBarFeature.like,
        ]}
      />

      <Songs
        height={181}
        editMode={editMode}
        onEdit={(songs) => {
          if (!isSongTotal(songs)) return;
        }}
        onSongClick={selectCallback}
        selectedSongs={selected}
        songFeatures={[
          SongItemFeature.date,
          SongItemFeature.views,
          SongItemFeature.like,
        ]}
      >
        {likes}
      </Songs>

      <MusicController
        features={[
          ControllerFeature.selectAll,
          ControllerFeature.addMusic,
          ControllerFeature.addToList,
          ControllerFeature.play,
        ]}
        songs={likes}
        selectedSongs={selected}
        dispatchSelectedSongs={selectCallback}
      />
    </Container>
  );
};

const Container = styled.div``;

export default Likes;
