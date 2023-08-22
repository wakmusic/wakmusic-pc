import styled, { css } from "styled-components/macro";

import { T4Medium, T5Light } from "@components/Typography";
import Marquee from "@components/globals/Marquee";

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
        <Marquee width={419}>
          <T4Medium color={colors.blueGray25}>{song?.title}</T4Medium>
        </Marquee>

        <Marquee width={419}>
          <T5Light color={colors.blueGray100}>{song?.artist}</T5Light>
        </Marquee>
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
  height: 52px;

  text-align: center;
`;

const LyricsContainer = styled.div`
  width: 100%;
  height: 243px;

  margin-top: 38px;
`;

const TimelineContainer = styled.div`
  width: 100%;

  margin: 62px 0 40px 0;
  padding-top: 1px;
`;

const ControllerContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default LyricsMode;
