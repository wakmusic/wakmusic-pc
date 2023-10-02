import styled from "styled-components/macro";

import { ReactComponent as ReduceSVG } from "@assets/icons/ic_20_reduce.svg";

import { T6Light, T6Medium } from "@components/Typography";
import ControlBar from "@components/globals/ControlBar";
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

  return (
    <Container>
      <ReduceContainer>
        <SimpleIconButton icon={ReduceSVG} onClick={toggleVisualModeState} />
      </ReduceContainer>

      {!controlState.isLyricsOn && (
        <TitleContainer>
          <ArtistText color={colors.blueGray25}>{song?.artist}</ArtistText>
          <T6Medium color={colors.blueGray25}>{song?.title}</T6Medium>
        </TitleContainer>
      )}

      <ControlBar isVisualMode />
    </Container>
  );
};

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
`;

const ReduceContainer = styled.div`
  margin-left: 10px;

  display: flex;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;

  padding-left: 30px;
  padding-top: 2px;
  gap: 8px;
`;

const ArtistText = styled(T6Light)`
  opacity: 0.6;
`;

export default Header;
