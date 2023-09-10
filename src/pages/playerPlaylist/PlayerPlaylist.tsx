import { useEffect, useState } from "react";
import styled from "styled-components/macro";

import { T4Medium } from "@components/Typography/Medium";
import CustomSongs from "@components/globals/CustomSongs";
import GuideBar, { GuideBarFeature } from "@components/globals/GuideBar";
import TextButton from "@components/globals/TextButton";
import MusicController from "@components/globals/musicControllers/MusicController";

import PageContainer from "@layouts/PageContainer";
import PageLayout from "@layouts/PageLayout";

import { useCurrentSongState, usePlayingInfoState } from "@hooks/player";
import { useSelectSongs } from "@hooks/selectSongs";

import { ControllerFeature } from "@templates/musicController";
import { Song } from "@templates/song";
import { SongItemFeature } from "@templates/songItem";

import { isNull } from "@utils/isTypes";

interface PlayerPlaylistProps {}

const PlayerPlaylist = ({}: PlayerPlaylistProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [playingInfo, setPlayingInfo] = usePlayingInfoState();
  const { selected, selectCallback, selectManyCallback, selectedIncludes } =
    useSelectSongs(playingInfo.playlist);

  const [changePlaylist, setChangePlaylist] = useState<Song[] | null>(null);

  const currentSong = useCurrentSongState();

  useEffect(() => {
    if (!isEdit && !isNull(changePlaylist)) {
      setPlayingInfo((prev) => ({
        ...prev,
        playlist: changePlaylist,
        current: changePlaylist.findIndex(
          (song) => song.songId === currentSong?.songId
        ),
      }));
    }
  }, [isEdit, changePlaylist, setPlayingInfo, currentSong?.songId]);

  const dispatchPlayerListInfo = async (songs: Song[]) => {
    const deletedSongs = playingInfo.playlist.filter(
      (song) => !songs.includes(song)
    );

    if (deletedSongs.length > 0) {
      setPlayingInfo((prev) => ({
        ...prev,
        playlist: prev.playlist.filter((song) => !deletedSongs.includes(song)),
      }));
    }

    setChangePlaylist(songs);
  };

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
          dispatchSelectedSongs={selectManyCallback}
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
