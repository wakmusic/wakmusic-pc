import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  buttonVariants,
  thumbnailVariants,
  toggleVariants,
} from "src/animations/toggleVisualMode";
import styled, { css } from "styled-components/macro";

import { ReactComponent as ExpansionSVG } from "@assets/icons/ic_20_expansion.svg";
import { ReactComponent as PlayListSVG } from "@assets/icons/ic_20_play_list.svg";

import SimpleIconButton from "@components/globals/SimpleIconButton";

import {
  useControlState,
  useCurrentSongState,
  useVisualModeState,
} from "@hooks/player";

import Lyrics from "../Lyrics";

interface DisplayProps {}

const Display = ({}: DisplayProps) => {
  const [controlState] = useControlState();
  const [visualModeState, setVisualModeState] = useVisualModeState();

  const song = useCurrentSongState();
  const img = `https://i.ytimg.com/vi/${song.songId}/hqdefault.jpg`;

  const navigate = useNavigate();
  const location = useLocation();

  const controls = useAnimation();

  useEffect(() => {
    if (visualModeState) return;

    (async () => {
      await controls.start("close");
      controls.set("initial");
    })();
  }, [controls, visualModeState]);

  return (
    <Container>
      <InnerContainer
        $image={img}
        animate={controls}
        variants={toggleVariants}
        initial="initial"
      >
        <Grid>
          <ExpansionButtonContainer
            animate={controls}
            variants={buttonVariants}
            initial="close"
          >
            <SimpleIconButton
              icon={ExpansionSVG}
              onClick={() => {
                const animate = async () => {
                  controls.set("close");
                  await controls.start("open");

                  setVisualModeState(true);
                };

                if (window.ipcRenderer && location.pathname == "/player") {
                  navigate(-1);
                  window.ipcRenderer.send("mode:default");

                  setTimeout(() => {
                    animate();
                  }, 200);

                  return;
                }

                animate();
              }}
            />
          </ExpansionButtonContainer>

          <PlaylistButtonContainer
            animate={controls}
            variants={buttonVariants}
            initial="close"
          >
            <SimpleIconButton icon={PlayListSVG} />
          </PlaylistButtonContainer>

          <CenterWrapper>
            <LyricsWrapper
              $on={controlState.isLyricsOn}
              animate={controls}
              variants={buttonVariants}
              initial="close"
            >
              <Lyrics size="small" />
            </LyricsWrapper>
            <Thumbnail
              src={img}
              $off={controlState.isLyricsOn}
              animate={controls}
              variants={thumbnailVariants}
              initial="initial"
            />
          </CenterWrapper>
        </Grid>
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 200px;
`;

const InnerContainer = styled(motion.div)<{ $image: string }>`
  width: 100%;
  height: 200px;

  background-image: url(${({ $image }) => $image});
  background-position: center;
  background-size: 150%;

  z-index: 100;
`;

const Grid = styled.div`
  width: 100%;
  height: 100%;

  display: grid;

  grid-template:
    " exp .     ply" 1fr
    " .   cnt   .  " 123px
    " .   .     .  " 1fr
    / 1fr 220px 1fr;

  background-color: rgba(25, 26, 28, 0.6);
  backdrop-filter: blur(35px);
`;

const ExpansionButtonContainer = styled(motion.div)`
  grid-area: exp;

  padding-top: 10px;
  padding-left: 10px;
`;

const PlaylistButtonContainer = styled(motion.div)`
  grid-area: ply;

  padding-top: 10px;
  padding-right: 10px;

  justify-self: end;
`;

const LyricsWrapper = styled(motion.div)<{ $on: boolean }>`
  width: 220px;
  height: 130px;

  position: absolute;

  visibility: hidden;

  ${({ $on }) =>
    $on &&
    css`
      visibility: visible;
    `}
`;

const Thumbnail = styled(motion.img)<{ $off: boolean }>`
  width: 100%;
  height: 100%;

  object-fit: cover;
  border-radius: 10px;

  ${({ $off }) =>
    $off &&
    css`
      visibility: hidden;
    `}
`;

const CenterWrapper = styled.div`
  grid-area: cnt;

  display: flex;
  align-items: center;
`;

export default Display;
