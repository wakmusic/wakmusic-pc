import { useMemo } from "react";
import styled, { css } from "styled-components/macro";

import dummyThumbnail from "@assets/svgs/BigDummy.svg";

import {
  useControlState,
  useCurrentSongState,
  useToggleVisualModeState,
} from "@hooks/player";

import { getYoutubeHQThumbnail } from "@utils/staticUtill";

import Controller from "../Controller";
import Like from "../Like";
import Lyrics from "../Lyrics";
import Timeline from "../Timeline";
import View from "../View";

interface DefaultModeProps {}

const DefaultMode = ({}: DefaultModeProps) => {
  const toggleVisualModeState = useToggleVisualModeState();
  const [controlState] = useControlState();

  const song = useCurrentSongState();
  const img = useMemo(
    () => (song?.songId ? getYoutubeHQThumbnail(song.songId) : dummyThumbnail),
    [song?.songId]
  );

  return (
    <Container $off={controlState.isLyricsOn}>
      <SongContainer>
        <Like isBright={true} />
        <View isBright={true} />
      </SongContainer>

      <MainContainer>
        <Thumbnail src={img} onClick={toggleVisualModeState} />

        <LyricsContainer>
          <Lyrics size="large" isVisualMode={true} />
        </LyricsContainer>

        <TimelineContainer>
          <Timeline isSeparated={true} />
        </TimelineContainer>

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
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 234px;

  object-fit: cover;
  border-radius: 10px;

  cursor: pointer;
`;

const LyricsContainer = styled.div`
  width: 100%;
  height: 90px;

  margin: 24px 0 44px 0;
`;

const TimelineContainer = styled.div`
  width: 100%;
`;

const ControllerContainer = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 30px;
`;

export default DefaultMode;
