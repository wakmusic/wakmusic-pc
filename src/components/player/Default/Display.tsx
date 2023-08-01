import { useMemo } from "react";
import styled, { css } from "styled-components/macro";

import { ReactComponent as ExpansionSVG } from "@assets/icons/ic_20_expansion.svg";
import { ReactComponent as PlayListSVG } from "@assets/icons/ic_20_play_list.svg";
import dummyThumbnail from "@assets/imgs/dummy.png";

import SimpleIconButton from "@components/globals/SimpleIconButton";

import {
  useControlState,
  useCurrentSongState,
  useToggleVisualModeState,
} from "@hooks/player";

import Lyrics from "../Lyrics";

interface DisplayProps {}

const Display = ({}: DisplayProps) => {
  const [controlState] = useControlState();
  const toggleVisualModeState = useToggleVisualModeState();

  const song = useCurrentSongState();
  const img = useMemo(
    () =>
      song?.songId
        ? `https://i.ytimg.com/vi/${song.songId}/hqdefault.jpg`
        : dummyThumbnail,
    [song?.songId]
  );

  return (
    <Container image={img}>
      <Grid>
        <ExpansionButtonContainer>
          <SimpleIconButton
            icon={ExpansionSVG}
            onClick={toggleVisualModeState}
          />
        </ExpansionButtonContainer>

        <PlaylistButtonContainer>
          <SimpleIconButton icon={PlayListSVG} />
        </PlaylistButtonContainer>

        <CenterWrapper>
          <LyricsWrapper $on={controlState.isLyricsOn}>
            <Lyrics size="medium" />
          </LyricsWrapper>
          <Thumbnail src={img} $off={controlState.isLyricsOn} />
        </CenterWrapper>
      </Grid>
    </Container>
  );
};

const Container = styled.div<{ image: string }>`
  width: 100%;
  height: 200px;

  background-image: url(${({ image }) => image});
  background-position: center;
  background-size: 150%;
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

const ExpansionButtonContainer = styled.div`
  grid-area: exp;

  padding-top: 10px;
  padding-left: 10px;
`;

const PlaylistButtonContainer = styled.div`
  grid-area: ply;

  padding-top: 10px;
  padding-right: 10px;

  justify-self: end;
`;

const LyricsWrapper = styled.div<{ $on: boolean }>`
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

const Thumbnail = styled.img<{ $off: boolean }>`
  width: 100%;
  height: 100%;

  object-fit: cover;
  border-radius: 10px;

  position: relative;

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
