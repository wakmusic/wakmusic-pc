import { useState } from "react";
import styled from "styled-components";

import colors from "@constants/colors";
import { hourlyChart as dummy } from "@constants/dummys";

import { Playlist as PlaylistType } from "../../types/player";
import Playlist from "./Playlist";
import Song from "./Song";
import Timeline from "./Timeline";
import Visual from "./Visual";

interface PlayerProps {}

const Player = ({}: PlayerProps) => {
  // dummy
  const [playlist, setPlaylist] = useState<PlaylistType>([
    ...dummy,
    ...dummy,
    ...dummy,
    ...dummy,
  ]);
  const [playing, setPlaying] = useState(4);

  const song = Object.assign(dummy[4], { total: dummy[4].hourly });
  const songLength = 272;

  const [currentTimeline, setCurruntTimeline] = useState(83);

  function onCurrentPlyaingChanged(value: number) {
    setCurruntTimeline(value);
  }

  function onPlayListChanged(playlist: PlaylistType) {
    setPlaylist(playlist);
  }

  function onPlayingchanged(playing: number) {
    setPlaying(playing);
  }

  return (
    <Container>
      <Visual songId={song.songId} />
      <Timeline
        length={songLength}
        current={currentTimeline}
        onChange={onCurrentPlyaingChanged}
      />
      <Song song={{ ...song, views: song.total.views }} />

      <Divider />

      <Playlist
        playlist={playlist}
        playing={playing}
        onChange={onPlayListChanged}
        onPlayingChange={onPlayingchanged}
      />
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
