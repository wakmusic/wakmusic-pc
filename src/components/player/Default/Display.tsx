import { motion, useAnimation } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  buttonVariants,
  thumbnailVariants,
  toggleVariants,
} from "src/animations/toggleVisualMode";
import styled, { css } from "styled-components/macro";

import { ReactComponent as ExpansionSVG } from "@assets/icons/ic_20_expansion.svg";
import { ReactComponent as PlayListSVG } from "@assets/icons/ic_20_play_list.svg";
import { ReactComponent as PlayListOnSVG } from "@assets/icons/ic_20_play_list_on.svg";
import dummyThumbnail from "@assets/svgs/MediumDummy.svg";

import SimpleIconButton from "@components/globals/SimpleIconButton";

import {
  useControlState,
  useCurrentSongState,
  useIsSpaceDisabled,
  useVisualModeState,
} from "@hooks/player";

import { ipcRenderer } from "@utils/modules";
import { getYoutubeHQThumbnail } from "@utils/staticUtill";

import Lyrics from "../Lyrics";

interface DisplayProps {}

const Display = ({}: DisplayProps) => {
  const [controlState, setControl] = useControlState();
  const [visualModeState, setVisualModeState] = useVisualModeState();

  const song = useCurrentSongState();
  const img = useMemo(
    () => (song?.songId ? getYoutubeHQThumbnail(song.songId) : dummyThumbnail),
    [song?.songId]
  );

  const navigate = useNavigate();
  const location = useLocation();

  const controls = useAnimation();

  const [isSpaceDisabled] = useIsSpaceDisabled();

  const [lastFCall, setLastFCall] = useState(0);

  useEffect(() => {
    if (visualModeState) return;

    (async () => {
      await controls.start("close");
      controls.set("initial");
    })();
  }, [controls, visualModeState]);

  const openVisualMode = useCallback(async () => {
    const animate = async () => {
      controls.set("close");
      await controls.start("open");

      setVisualModeState(true);
    };

    if (ipcRenderer && location.pathname == "/player") {
      navigate(-1);
      ipcRenderer.send("mode:default");

      setTimeout(() => {
        animate();
      }, 200);

      return;
    }

    animate();
  }, [controls, location.pathname, navigate, setVisualModeState]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.code === "KeyF" &&
        !isSpaceDisabled &&
        lastFCall + 500 < Date.now() // 무지성 연타로 인해 UI 깨지는거 방지
      ) {
        if (visualModeState) {
          setVisualModeState(false);
        } else {
          openVisualMode();
        }

        setLastFCall(Date.now());
      }

      if (e.code === "KeyL" && !isSpaceDisabled) {
        setControl((prev) => ({ ...prev, isLyricsOn: !prev.isLyricsOn }));
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [
    isSpaceDisabled,
    lastFCall,
    openVisualMode,
    setControl,
    setVisualModeState,
    visualModeState,
  ]);

  return (
    <Container>
      <InnerContainer
        $image={song?.songId ? img : undefined}
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
            <SimpleIconButton icon={ExpansionSVG} onClick={openVisualMode} />
          </ExpansionButtonContainer>

          <PlaylistButtonContainer
            animate={controls}
            variants={buttonVariants}
            initial="close"
          >
            {location.pathname === "/player/playlist" ? (
              <SimpleIconButton
                icon={PlayListOnSVG}
                onClick={() => navigate(-1)}
              />
            ) : (
              <Link to="/player/playlist">
                <SimpleIconButton icon={PlayListSVG} />
              </Link>
            )}
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
              onClick={openVisualMode}
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

const InnerContainer = styled(motion.div)<{ $image?: string }>`
  width: 100%;
  height: 200px;

  background-position: center;
  background-size: 150%;

  z-index: 100;

  ${({ $image }) =>
    $image &&
    css`
      background-image: url(${$image});
    `}
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

  cursor: pointer;

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
