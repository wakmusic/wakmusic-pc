import { useEffect, useState } from "react";
import styled from "styled-components/macro";

import { T4Medium } from "@components/Typography/Medium";
import CustomSongs from "@components/globals/CustomSongs";
import GuideBar, { GuideBarFeature } from "@components/globals/GuideBar";
import TextButton from "@components/globals/TextButton";

import PageContainer from "@layouts/PageContainer";
import PageLayout from "@layouts/PageLayout";

import { usePlayingInfoState } from "@hooks/player";
import { useSelectSongs } from "@hooks/selectSongs";

import { SongItemFeature } from "@templates/songItem";

interface PlayerPlaylistProps {}

const PlayerPlaylist = ({}: PlayerPlaylistProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [playingInfo, setPlayingInfo] = usePlayingInfoState();
  const { selected, selectCallback, selectedIncludes } = useSelectSongs();

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
            GuideBarFeature.last,
            GuideBarFeature.date,
            GuideBarFeature.views,
          ]}
        />

        <CustomSongs
          height={181}
          editMode={isEdit}
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
      </PageContainer>
    </PageLayout>
  );
};

const TitleLayout = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 26px;
  padding: 0px 20px;
`;

export default PlayerPlaylist;
