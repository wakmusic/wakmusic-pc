import { useRef } from "react";
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
} from "@hooks/player";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const song = useCurrentSongState();
  const [controlState] = useControlState();
  const toggleVisualModeState = useToggleVisualModeState();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const artistTextRef = useRef<HTMLDivElement | null>(null);

  return (
    <Container>
      <ReduceContainer>
        <SimpleIconButton icon={ReduceSVG} onClick={toggleVisualModeState} />
      </ReduceContainer>

      {!controlState.isLyricsOn && (
        <TitleContainer ref={containerRef}>
          <ArtistText ref={artistTextRef} color={colors.blueGray25}>
            {song?.artist}
          </ArtistText>
          <Marquee
            width={
              (containerRef.current?.clientWidth ?? 1000) -
              (artistTextRef.current?.clientWidth ?? 0)
            }
            startAtMiddle
          >
            <T6Medium color={colors.blueGray25}>{song?.title}</T6Medium>
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

  display: flex;
  flex-direction: row;

  padding-left: 30px;
  padding-top: 2px;
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
