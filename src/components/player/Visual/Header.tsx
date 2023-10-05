import { useEffect, useRef, useState } from "react";
import styled from "styled-components/macro";

import { ReactComponent as ReduceSVG } from "@assets/icons/ic_20_reduce.svg";

import { T6Light, T6Medium } from "@components/Typography";
import ControlBar from "@components/globals/ControlBar";
import Marquee from "@components/globals/Marquee";
import SimpleIconButton from "@components/globals/SimpleIconButton";

import colors from "@constants/colors";

import {
  useControlState,
  useCurrentSongState,
  useToggleVisualModeState,
  useVisualModeState,
} from "@hooks/player";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const song = useCurrentSongState();
  const [controlState] = useControlState();
  const [visualMode] = useVisualModeState();
  const toggleVisualModeState = useToggleVisualModeState();

  const containerRef = useRef<HTMLDivElement | null>(null);

  const [prvSong, setPrvSong] = useState("");
  const [prvVisualState, setPrvVisualState] = useState(false);

  useEffect(() => {
    if (song?.songId !== prvSong) {
      setPrvSong(song?.songId);
    }
  }, [song, prvSong]);

  useEffect(() => {
    if (visualMode !== prvVisualState) {
      setPrvVisualState(visualMode);
    }
  }, [visualMode, prvVisualState]);

  return (
    <Container>
      <ReduceContainer>
        <SimpleIconButton icon={ReduceSVG} onClick={toggleVisualModeState} />
      </ReduceContainer>

      {!controlState.isLyricsOn &&
        song?.songId === prvSong &&
        visualMode === prvVisualState && (
          <TitleContainer ref={containerRef}>
            <Marquee
              width={containerRef.current?.clientWidth ?? 1000}
              alwaysRun
            >
              <TitleWrapper>
                <ArtistText color={colors.blueGray25}>
                  {song?.artist}
                </ArtistText>
                <T6Medium color={colors.blueGray25}>{song?.title}</T6Medium>
              </TitleWrapper>
            </Marquee>
          </TitleContainer>
        )}

      <ControlBar isVisualMode />
    </Container>
  );
};

const TitleContainer = styled.div`
  width: calc(100% - 160px);
  overflow: hidden;

  padding-left: 30px;
  padding-top: 2px;
`;

const TitleWrapper = styled.div`
  min-width: calc(100vw - 160px);

  display: flex;
  flex-direction: row;

  padding-left: 50vw;
  text-indent: 0;

  gap: 8px;
`;

const Container = styled.div`
  height: 38px;

  position: relative;
  z-index: 1001;

  display: flex;
  align-items: center;

  -webkit-app-region: drag;

  & > * {
    -webkit-app-region: no-drag;
  }

  & ${TitleContainer} {
    -webkit-app-region: drag;
  }
`;

const ReduceContainer = styled.div`
  margin-left: 10px;

  display: flex;
  align-items: center;
`;

const ArtistText = styled(T6Light)`
  opacity: 0.6;
`;

export default Header;
