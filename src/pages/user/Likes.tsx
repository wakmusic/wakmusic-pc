import styled from "styled-components/macro";

import { editLikes, removeLikes } from "@apis/user";

import CustomSongs from "@components/globals/CustomSongs";
import GuideBar, { GuideBarFeature } from "@components/globals/GuideBar";
import MusicController from "@components/globals/musicControllers/MusicController";

import { useLikesEditState, useLikesState } from "@hooks/likes";
import { useSelectSongs } from "@hooks/selectSongs";

import { Song } from "@templates/song";
import { SongItemFeature } from "@templates/songItem";

interface LikesProps {}

const Likes = ({}: LikesProps) => {
  const [editMode] = useLikesEditState();
  const [likes, setLikes] = useLikesState();

  const { selected, selectCallback, selectedIncludes } = useSelectSongs();

  const dispatchLikes = async (songs: Song[]) => {
    const removedSongs = likes.filter(
      (like) => !songs.find((song) => song.songId === like.songId)
    );

    if (removedSongs.length > 0) {
      await removeLikes(removedSongs.map((song) => song.songId));
    }

    await editLikes(songs.map((song) => song.songId));

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
        dispatchSelectedSongs={selectCallback}
        onDelete={editMode ? dispatchLikes : undefined}
      />
    </Container>
  );
};

const Container = styled.div``;

export default Likes;
