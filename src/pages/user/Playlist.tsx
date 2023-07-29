import { playlistState } from "@state/playlist/atoms";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";

import { ReactComponent as EditTitle } from "@assets/icons/ic_24_edit_filled.svg";
import { ReactComponent as Share } from "@assets/icons/ic_24_export.svg";
import { ReactComponent as PlayAll } from "@assets/icons/ic_24_play_all.svg";
import { ReactComponent as RandomPlay } from "@assets/icons/ic_24_random_900.svg";

import { T3Medium, T6Light } from "@components/Typography";
import IconButton from "@components/globals/IconButton";

import colors from "@constants/colors";

import { PlaylistType } from "@templates/playlist";

interface PlaylistProps {}

const Playlist = ({}: PlaylistProps) => {
  const isEditmode = useRecoilValue(playlistState);
  const { state } = useLocation();
  const playlist = useMemo<PlaylistType>(() => state, [state]);

  return (
    <Container>
      <Header>
        <Info>
          <Icon
            src={`https://static.wakmusic.xyz/static/playlist/${playlist.image.version}.png`}
          />
          <Details>
            <Title>
              <T3Medium color={colors.gray700}>{playlist.title}</T3Medium>
              {isEditmode && <EditTitle />}
            </Title>
            <T6Light color={colors.blueGray500}>
              {playlist.songs.length}곡
            </T6Light>
            <Functions>
              <IconButton icon={PlayAll}>전체 재생</IconButton>
              <IconButton icon={RandomPlay}>랜덤 재생</IconButton>
              <Share style={{ marginLeft: "8px" }} />
            </Functions>
          </Details>
        </Info>
      </Header>
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
`;

const Info = styled.div`
  display: flex;
  padding-left: 20px;
  padding-right: 28px;
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

const Icon = styled.img`
  width: 140px;
  height: 140px;

  border-radius: 12px;
`;

export default Playlist;
