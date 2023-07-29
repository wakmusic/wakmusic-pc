import styled, { css } from "styled-components/macro";

import { ReactComponent as ExpansionSVG } from "@assets/icons/ic_20_expansion.svg";
import { ReactComponent as PlayListSVG } from "@assets/icons/ic_20_play_list.svg";

import { useControlState } from "@hooks/player";

import IconButton from "./IconButton";
import Lyrics from "./Lyrics";

interface VisualProps {
  songId: string;
}

const Visual = ({ songId }: VisualProps) => {
  const [controlState] = useControlState();

  const img = `https://i.ytimg.com/vi/${songId}/hqdefault.jpg`;

  return (
    <Container image={img}>
      <Grid>
        <ExpansionButtonContainer>
          <IconButton icon={ExpansionSVG} />
        </ExpansionButtonContainer>

        <PlaylistButtonContainer>
          <IconButton icon={PlayListSVG} />
        </PlaylistButtonContainer>

        <CenterWrapper>
          <LyricsWrapper $on={controlState.isLyricsOn}>
            <Lyrics />
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
  background-size: cover;
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

  backdrop-filter: blur(50px);
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
  height: 123px;

  position: absolute;

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
`;

export default Visual;