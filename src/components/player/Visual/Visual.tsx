import { motion, useAnimation } from "framer-motion";
import { useEffect, useMemo } from "react";
import { visualVariants } from "src/animations/toggleVisualMode";
import styled, { css } from "styled-components/macro";

import dummyThumbnail from "@assets/svgs/BigDummy.svg";

import { useCurrentSongState, useVisualModeState } from "@hooks/player";

import { getYoutubeHQThumbnail } from "@utils/staticUtill";

import DefaultMode from "./DefaultMode";
import Header from "./Header";
import LyricsMode from "./LyricsMode";

interface VisualProps {}

const Visual = ({}: VisualProps) => {
  const [visualMode] = useVisualModeState();
  const song = useCurrentSongState();

  const img = useMemo(
    () => (song?.songId ? getYoutubeHQThumbnail(song.songId) : dummyThumbnail),
    [song?.songId]
  );

  const controls = useAnimation();

  useEffect(() => {
    if (!visualMode) {
      controls.set("initial");
      return;
    }

    (async () => {
      await controls.start("active");
    })();
  }, [controls, visualMode]);

  return (
    <Container
      $image={img}
      $on={visualMode}
      animate={controls}
      variants={visualVariants}
      initial="initial"
    >
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

const Container = styled(motion.div)<{ $image: string; $on: boolean }>`
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
