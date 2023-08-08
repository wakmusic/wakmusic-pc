import { useMemo } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components/macro";

import {
  fetchRecommendedPlaylist,
  fetchRecommendedPlaylistDetail,
} from "@apis/playlist";

import { ReactComponent as EditTitle } from "@assets/icons/ic_24_edit_filled.svg";
import { ReactComponent as Share } from "@assets/icons/ic_24_export.svg";
import { ReactComponent as PlayAll } from "@assets/icons/ic_24_play_all.svg";
import { ReactComponent as RandomPlay } from "@assets/icons/ic_24_random_900.svg";

import { T3Medium, T6Light } from "@components/Typography";
import GuideBar, { GuideBarFeature } from "@components/globals/GuideBar";
import IconButton from "@components/globals/IconButton";
import SongItem, { SongItemFeature } from "@components/globals/SongItem";
import TextButton from "@components/globals/TextButton";

import PageItemContainer from "@layouts/PageItemContainer";
import VirtualItem from "@layouts/VirtualItem";

import colors from "@constants/colors";

import { usePlaylistState } from "@hooks/playlist";
import { useShareListModal } from "@hooks/shareListModal";
import useVirtualizer from "@hooks/virtualizer";

import { BasePlaylist, PlaylistType } from "@templates/playlist";

import { getPlaylistIcon, getRecommendSquareImage } from "@utils/staticUtill";

interface PlaylistProps {}

const Playlist = ({}: PlaylistProps) => {
  const { data: recommendLists } = useQuery({
    queryKey: "recommendLists",
    queryFn: fetchRecommendedPlaylist,
  });

  const [isEditmode] = usePlaylistState();
  const location = useLocation();
  const playlistId = useMemo(
    () => location.pathname.split("/")[2],
    [location.pathname]
  );

  const recommendKey: string | undefined = useMemo(
    () => recommendLists?.find((item) => item.key === playlistId)?.key,
    [recommendLists, playlistId]
  );

  const { data: recommendList } = useQuery({
    queryKey: ["recommendList", recommendKey],
    queryFn: async () => {
      if (!recommendKey) return null;

      return await fetchRecommendedPlaylistDetail(recommendKey);
    },
  });

  const playlist: BasePlaylist = useMemo(() => {
    if (recommendList) return recommendList;

    return location.state as BasePlaylist;
  }, [location.state, recommendList]);

  const shareListModal = useShareListModal();

  const { viewportRef, getTotalSize, virtualMap } = useVirtualizer(
    playlist.songs ?? []
  );

  // TODO
  if (!playlist) return <div>loading...</div>;

  return (
    <Container>
      <Header>
        <Info>
          <Icon
            src={
              recommendList
                ? getRecommendSquareImage(recommendList)
                : getPlaylistIcon((playlist as PlaylistType).image.version)
            }
          />
          <Details>
            <Title>
              <T3Medium color={colors.gray700}>{playlist.title}</T3Medium>
              {isEditmode && <EditTitle />}
            </Title>
            <T6Light color={colors.blueGray500}>
              {playlist.songs?.length}곡
            </T6Light>
            <Functions>
              <IconButton icon={PlayAll}>전체 재생</IconButton>
              <IconButton icon={RandomPlay}>랜덤 재생</IconButton>
              {!recommendList && (
                <ShareIcon
                  onClick={() => {
                    shareListModal(playlist.key);
                  }}
                />
              )}
            </Functions>
          </Details>
        </Info>
        {!recommendList && (
          <TextButton
            text={{ default: "편집", activated: "완료" }}
            activated={isEditmode}
          />
        )}
      </Header>

      <GuideBar
        features={[
          GuideBarFeature.info,
          GuideBarFeature.date,
          GuideBarFeature.views,
          GuideBarFeature.like,
        ]}
      />

      <PageItemContainer
        height={281}
        ref={viewportRef}
        totalSize={getTotalSize()}
      >
        {virtualMap((virtualItem, item) => (
          <VirtualItem virtualItem={virtualItem} key={virtualItem.key}>
            <SongItem
              song={item}
              selected={false}
              features={[
                SongItemFeature.date,
                SongItemFeature.views,
                SongItemFeature.like,
              ]}
            />
          </VirtualItem>
        ))}
      </PageItemContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 754px;
  height: calc(100vh - 78px);

  margin: auto;
  margin-top: 20px;

  padding-top: 20px;

  border: 1px solid ${colors.blueGray25};
  border-radius: 16px;

  background-color: ${colors.white}66;
  backdrop-filter: blur(62.5px);

  overflow-y: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 1px;

  padding-left: 20px;
  padding-right: 28px;

  width: 100%;
`;

const Info = styled.div`
  display: flex;
`;

const Details = styled.div`
  margin-top: 12px;
  margin-left: 23px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  margin-bottom: 4px;
`;

const Functions = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;

  margin-top: 20px;
`;

const ShareIcon = styled(Share)`
  margin-left: 8px;

  cursor: pointer;
`;

const Icon = styled.img`
  width: 140px;
  height: 140px;

  border-radius: 12px;
`;

export default Playlist;
