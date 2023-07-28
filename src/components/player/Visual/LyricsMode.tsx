import styled, { css } from "styled-components";

import { T4Medium, T5Light } from "@components/Typography";

import colors from "@constants/colors";

import { useControlState, useCurrentSongState } from "@hooks/player";

import Controller from "../Controller";
import Lyrics from "../Lyrics";
import Timeline from "../Timeline";

interface LyricsModeProps {}

const LyricsMode = ({}: LyricsModeProps) => {
  const [controlState] = useControlState();

  const song = useCurrentSongState();

  return (
    <Container $on={controlState.isLyricsOn}>
      <TitleContainer>
        <T4Medium color={colors.blueGray25}>{song.title}</T4Medium>
        <T5Light color={colors.blueGray100}>{song.artist}</T5Light>
      </TitleContainer>

      <LyricsContainer>
        <Lyrics size="large" />
      </LyricsContainer>

      <TimelineContainer>
        <Timeline isSeparated={true} />
      </TimelineContainer>

      <ControllerContainer>
        <Controller />
      </ControllerContainer>
    </Container>
  );
};

const Container = styled.div<{ $on: boolean }>`
  width: 419px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  position: absolute;

  visibility: hidden;

  ${({ $on }) =>
    $on &&
    css`
      visibility: inherit;
    `}
`;

const TitleContainer = styled.div`
  width: 100%;

  text-align: center;
`;

const LyricsContainer = styled.div`
  width: 100%;
  height: 243px;

  margin-top: 24px;
`;

const TimelineContainer = styled.div`
  width: 100%;

  margin: 76px 0 20px 0;
`;

const ControllerContainer = styled.div`
  display: flex;
  justify-content: center;

  margin: 19px 0 72px 0;
`;

export default LyricsMode;
