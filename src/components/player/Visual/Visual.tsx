import { motion, useAnimation } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
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
  const [visualMode, setVisualMode] = useVisualModeState();
  const song = useCurrentSongState();

  const img = useMemo(
    () => (song?.songId ? getYoutubeHQThumbnail(song.songId) : dummyThumbnail),
    [song?.songId]
  );

  const controls = useAnimation();

  const ref = useRef<HTMLDivElement | null>(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      setZoom(
        Math.min(
          (ref.current?.clientHeight ?? 714) / 714,
          (ref.current?.clientWidth ?? 600) / 600
        )
      );
    });
    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);

  useEffect(() => {
    if (visualMode) {
      controls.start("active");
    } else {
      controls.set("initial");
    }
  }, [controls, visualMode]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setVisualMode(false);
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [setVisualMode]);

  return (
    <Container
      ref={ref}
      $image={img}
      $on={visualMode}
      animate={controls}
      variants={visualVariants}
      initial="initial"
    >
      <Wrapper $zoom={zoom}>
        <Header />
        <InnerContainer $zoom={zoom}>
          <InnerWrapper $zoom={zoom}>
            <LyricsMode />
            <DefaultMode />
          </InnerWrapper>
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

const Wrapper = styled.div.attrs<{ $zoom: number }>(({ $zoom }) => ({
  style: {
    backdropFilter: `blur(calc(35px * ${$zoom}))`,
  },
}))`
  width: 100%;
  height: 100%;

  background-color: rgba(25, 26, 28, 0.6);
`;

const InnerContainer = styled.div.attrs<{ $zoom: number }>(({ $zoom }) => ({
  style: {
    zoom: $zoom,
  },
}))`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerWrapper = styled.div.attrs<{ $zoom: number }>(({ $zoom }) => ({
  style: {
    marginBottom: `calc(74px / ${$zoom})`,
  },
}))`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Visual;
