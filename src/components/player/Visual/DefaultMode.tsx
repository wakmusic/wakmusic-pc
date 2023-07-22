import { useState } from "react";
import styled, { css } from "styled-components";

import { ReactComponent as HeartOffSvg } from "@assets/icons/ic_20_heart_off_bright.svg";
import { ReactComponent as HeartOnSvg } from "@assets/icons/ic_20_heart_on.svg";

import { useControlState, useCurrentSongState } from "@hooks/player";

import Controller from "../Controller";
import IconButton from "../IconButton";
import Lyrics from "../Lyrics";
import Timeline from "../Timeline";
import View from "../View";

interface DefaultModeProps {}

const DefaultMode = ({}: DefaultModeProps) => {
  const [controlState] = useControlState();
  const [isLiked, setIsLiked] = useState(false);

  const song = useCurrentSongState();
  const img = `https://i.ytimg.com/vi/${song.songId}/hqdefault.jpg`;

  function changeIsLikeState() {
    setIsLiked(!isLiked);
  }

  return (
    <Container $off={controlState.isLyricsOn}>
      <SongContainer>
        <IconButton
          icon={isLiked ? HeartOnSvg : HeartOffSvg}
          onClick={changeIsLikeState}
        />
        <View isBright={true} />
      </SongContainer>

      <MainContainer>
        <Thumbnail src={img} />

        <TimelineContainer>
          <Timeline isSeparated={true} />
        </TimelineContainer>

        <LyricsContainer>
          <Lyrics size="small" />
        </LyricsContainer>

        <ControllerContainer>
          <Controller />
        </ControllerContainer>
      </MainContainer>
    </Container>
  );
};

const Container = styled.div<{ $off: boolean }>`
  display: grid;

  grid-template-columns: 54px 419px 54px;

  position: relative;

  ${({ $off }) =>
    $off &&
    css`
      visibility: hidden;
    `}
`;

const SongContainer = styled.div`
  padding-top: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 8px;
`;

const MainContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 234px;

  object-fit: cover;
  border-radius: 10px;
`;

const TimelineContainer = styled.div`
  width: 100%;

  margin: 24px 0 32px 0;
`;

const LyricsContainer = styled.div`
  width: 100%;
  height: 54px;
`;

const ControllerContainer = styled.div`
  display: flex;
  justify-content: center;

  margin: 93px 0 72px 0;
`;

export default DefaultMode;
