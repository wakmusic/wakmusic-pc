import styled from "styled-components/macro";

import colors from "@constants/colors";

import Timeline from "../Timeline";
import Display from "./Display";
import Playlist from "./Playlist";
import Song from "./Song";

interface PlayerProps {}

const Player = ({}: PlayerProps) => {
  return (
    <Container>
      <Display />
      <Timeline />
      <Song />

      <Divider />

      <Playlist />
    </Container>
  );
};

const Container = styled.div`
  margin-left: auto;

  width: 290px;
  height: calc(100vh - 38px);

  background-color: ${colors.gray900};

  overflow: hidden;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;

  background-color: ${colors.gray700};
`;

export default Player;
