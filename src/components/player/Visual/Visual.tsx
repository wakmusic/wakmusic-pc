import { useMemo } from "react";
import styled, { css } from "styled-components/macro";

import dummyThumbnail from "@assets/imgs/dummy.png";

import { useCurrentSongState, useVisualModeState } from "@hooks/player";

import DefaultMode from "./DefaultMode";
import Header from "./Header";
import LyricsMode from "./LyricsMode";

interface VisualProps {}

const Visual = ({}: VisualProps) => {
  const [visualMode] = useVisualModeState();
  const song = useCurrentSongState();

  const img = useMemo(
    () =>
      song?.songId
        ? `https://i.ytimg.com/vi/${song.songId}/hqdefault.jpg`
        : dummyThumbnail,
    [song?.songId]
  );

  return (
    <Container $image={img} $on={visualMode}>
      <Wrapper>
        <Header />
        <InnerContainer>
          <LyricsMode />
          <DefaultMode />
        </InnerContainer>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div<{ $image: string; $on: boolean }>`
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url(${({ $image }) => $image});
  background-position: center;
  background-size: max(200vh, 150vw);
  background-repeat: no-repeat;

  visibility: hidden;

  ${({ $on }) =>
    $on &&
    css`
      visibility: inherit;
    `}
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  background-color: rgba(25, 26, 28, 0.6);
  backdrop-filter: blur(35px);
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Visual;
