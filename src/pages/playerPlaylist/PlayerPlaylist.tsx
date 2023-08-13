import { useEffect, useState } from "react";
import styled from "styled-components/macro";

import { T4Medium } from "@components/Typography/Medium";
import GuideBar, { GuideBarFeature } from "@components/globals/GuideBar";
import SongItem, { SongItemFeature } from "@components/globals/SongItem";
import TextButton from "@components/globals/TextButton";

import PageContainer from "@layouts/PageContainer";
import PageItemContainer from "@layouts/PageItemContainer";
import PageLayout from "@layouts/PageLayout";
import VirtualItem from "@layouts/VirtualItem";

import { usePlayingInfoState } from "@hooks/player";
import useVirtualizer from "@hooks/virtualizer";

import { Song } from "@templates/song";

interface PlayerPlaylistProps {}

const PlayerPlaylist = ({}: PlayerPlaylistProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selected, setSelected] = useState<Song[]>([]);
  const [playingInfo, setPlayingInfo] = usePlayingInfoState();
  const { viewportRef, getTotalSize, virtualMap } = useVirtualizer([]);

  const handleSeleted = (song: Song) => {
    if (selected.includes(song)) {
      setSelected(selected.filter((item) => item !== song));
    } else {
      setSelected([...selected, song]);
    }
  };

  useEffect(() => {
    viewportRef.current?.scrollTo(0, 0);
  }, [viewportRef]);

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
        <PageItemContainer
          height={533}
          ref={viewportRef}
          totalSize={getTotalSize()}
        >
          {virtualMap((virtualItem, item) => (
            <VirtualItem virtualItem={virtualItem} key={virtualItem.key}>
              <SongItem
                editMode={isEdit}
                song={item}
                selected={selected.includes(item)}
                features={[
                  SongItemFeature.date,
                  SongItemFeature.views,
                  SongItemFeature.like,
                ]}
                onClick={handleSeleted}
              />
            </VirtualItem>
          ))}
        </PageItemContainer>
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
