import { useState } from "react";
import styled from "styled-components";

import colors from "@constants/colors";
import { hourlyChart as dummy } from "@constants/dummys";

import Playlist from "./Playlist";
import Song from "./Song";
import Timeline from "./Timeline";
import Visual from "./Visual";

interface PlayerProps {}

const Player = ({}: PlayerProps) => {
  // dummy
  const playlist = [...dummy, ...dummy, ...dummy, ...dummy];
  const playingIndex = 4;

  const song = Object.assign(dummy[4], { total: dummy[4].hourly });
  const songLength = 272;

  const [currentPlaying, setCurruntPlaying] = useState(83);

  function onCurrentPlyaingChanged(value: number) {
    setCurruntPlaying(value);
  }

  return (
    <Container>
      <Visual songId={song.songId} />
      <Timeline
        length={songLength}
        current={currentPlaying}
        onChange={onCurrentPlyaingChanged}
      />
      <Song song={{ ...song, views: song.total.views }} />

      <Divider />

      <Playlist playlist={playlist} playing={playingIndex} />
    </Container>
  );
};

const Container = styled.div`
  margin-left: auto;

  width: 290px;
  height: calc(100vh - 38px);

  background-color: ${colors.gray900};
  color: white;

  overflow: hidden;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;

  background-color: ${colors.gray700};
`;

export default Player;
