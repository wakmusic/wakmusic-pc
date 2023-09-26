import { Dispatch, SetStateAction } from "react";
import styled from "styled-components/macro";

import { ReactComponent as EditTitle } from "@assets/icons/ic_24_edit_filled.svg";
import { ReactComponent as Share } from "@assets/icons/ic_24_export.svg";
import { ReactComponent as PlayAll } from "@assets/icons/ic_24_play_all.svg";
import { ReactComponent as RandomPlay } from "@assets/icons/ic_24_random_900.svg";

import { T3Medium, T6Light } from "@components/Typography";
import IconButton from "@components/globals/IconButton";
import Skeleton from "@components/globals/Skeleton";
import TextButton from "@components/globals/TextButton";

import colors from "@constants/colors";

import { useShareListModal } from "@hooks/modal";
import { usePlaySongs } from "@hooks/player";

import {
  BasePlaylist,
  PlaylistType,
  RecommendListType,
} from "@templates/playlist";

import { getPlaylistIcon, getRecommendSquareImage } from "@utils/staticUtill";

interface HeaderProps {
  recommendList: RecommendListType | null | undefined;
  playlist: BasePlaylist | undefined;
  isEditmode: boolean;

  editPlaylistNameHandler: () => Promise<void>;
  setEditmode: Dispatch<SetStateAction<boolean>>;
}

const Header = ({
  recommendList,
  playlist,
  isEditmode,
  editPlaylistNameHandler,
  setEditmode,
}: HeaderProps) => {
  const shareListModal = useShareListModal();
  const playSongs = usePlaySongs();

  return (
    <Container>
      <Info>
        {playlist ? (
          <Icon
            src={
              recommendList
                ? getRecommendSquareImage(recommendList)
                : getPlaylistIcon((playlist as PlaylistType).image)
            }
          />
        ) : (
          <Skeleton width={140} height={140} borderRadius={12} />
        )}

        <Details>
          {playlist ? (
            <>
              <Title>
                <T3Medium color={colors.gray700}>{playlist.title}</T3Medium>
                {isEditmode && <EditButton onClick={editPlaylistNameHandler} />}
              </Title>
              <T6Light color={colors.blueGray500}>
                {playlist.songs?.length}곡
              </T6Light>
            </>
          ) : (
            <>
              <Skeleton width={200} height={32} marginBottom={8} />
              <Skeleton width={100} height={16} />
            </>
          )}

          <Functions>
            <IconButton
              icon={PlayAll}
              onClick={() => playlist && playSongs(playlist.songs)}
            >
              전체재생
            </IconButton>

            <IconButton
              icon={RandomPlay}
              onClick={() => playlist && playSongs(playlist.songs, true)}
            >
              랜덤재생
            </IconButton>

            {playlist && !recommendList && (
              <ShareIcon
                onClick={() => playlist && shareListModal(playlist.key)}
              />
            )}
          </Functions>
        </Details>
      </Info>

      {playlist && !recommendList && (
        <TextButton
          text={{ default: "편집", activated: "완료" }}
          activated={isEditmode}
          onClick={() => setEditmode(!isEditmode)}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
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

const EditButton = styled(EditTitle)`
  cursor: pointer;
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
export default Header;
