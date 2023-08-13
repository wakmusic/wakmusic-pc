import { useState } from "react";
import styled from "styled-components/macro";

import GuideBar, { GuideBarFeature } from "@components/globals/GuideBar";
import { SongItemFeature } from "@components/globals/SongItem";
import Songs from "@components/globals/Songs";

import { myListSongs } from "@constants/dummys";

import { useLikesState } from "@hooks/likes";

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
        dispatchSongs={(songs) => {
          if (!isSongTotal(songs)) return;

          setLikes(songs);
          // api에 좋아요 곡 삭제 또는 순서 수정 요청
        }}
        editMode={editMode}
        songFeatures={[
          SongItemFeature.date,
          SongItemFeature.views,
          SongItemFeature.like,
        ]}
        controllerFeatures={[
          ControllerFeature.selectAll,
          ControllerFeature.addMusic,
          ControllerFeature.addToList,
          ControllerFeature.play,
        ]}
      >
        {likes}
      </Songs>
    </Container>
  );
};

const Container = styled.div``;

export default Likes;
