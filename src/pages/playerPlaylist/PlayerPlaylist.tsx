import { useState } from "react";
import styled from "styled-components/macro";

import { T4Medium } from "@components/Typography/Medium";
import CustomSongs from "@components/globals/CustomSongs";
import GuideBar, { GuideBarFeature } from "@components/globals/GuideBar";
import TextButton from "@components/globals/TextButton";
import MusicController from "@components/globals/musicControllers/MusicController";

import PageContainer from "@layouts/PageContainer";
import PageLayout from "@layouts/PageLayout";

import { usePlayingInfoState } from "@hooks/player";
import { useSelectSongs } from "@hooks/selectSongs";

import { ControllerFeature } from "@templates/musicController";
import { Song } from "@templates/song";
import { SongItemFeature } from "@templates/songItem";

interface PlayerPlaylistProps {}

const PlayerPlaylist = ({}: PlayerPlaylistProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [playingInfo, setPlayingInfo] = usePlayingInfoState();
  const { selected, selectCallback, selectedIncludes } = useSelectSongs();

  const dispatchPlayerListInfo = async (songs: Song[]) => {
    const removedSongs = playingInfo.playlist.filter((playerSong) =>
      Boolean(songs.find((song) => song.songId === playerSong.songId))
    );

    if (removedSongs.length !== playingInfo.playlist.length) {
      setPlayingInfo({ ...playingInfo, playlist: removedSongs });
    } else {
      setPlayingInfo({ ...playingInfo, playlist: songs });
    }
  };

  console.log(playingInfo.playlist);

  return (
    <PageLayout>
      <PageContainer>
        <TitleLayout>
          <T4Medium>재생목록</T4Medium>
          <TextButton
            text={{ default: "편집", activated: "완료" }}
            activated={isEdit}
            onClick={() => setIsEdit(!isEdit)}
          />
        </TitleLayout>
        <GuideBar
          features={[
            GuideBarFeature.info,
            GuideBarFeature.date,
            GuideBarFeature.views,
            GuideBarFeature.like,
          ]}
        />
        <CustomSongs
          height={181}
          editMode={isEdit}
          onEdit={dispatchPlayerListInfo}
          selectedIncludes={selectedIncludes}
          onSongClick={selectCallback}
          selectedSongs={selected}
          songFeatures={[
            SongItemFeature.date,
            SongItemFeature.views,
            SongItemFeature.like,
          ]}
        >
          {playingInfo.playlist}
        </CustomSongs>
        <MusicController
          songs={playingInfo.playlist}
          selectedSongs={selected}
          dispatchSelectedSongs={selectCallback}
          features={[ControllerFeature.selectAll, ControllerFeature.addMusic]}
          onDelete={dispatchPlayerListInfo}
        />
      </PageContainer>
    </PageLayout>
  );
};

const TitleLayout = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  padding: 0px 20px;
`;

export default PlayerPlaylist;
