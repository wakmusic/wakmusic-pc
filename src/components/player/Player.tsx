import { Playlist as PlaylistType } from "@templates/player";
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
  const [playlist, setPlaylist] = useState<PlaylistType>([
    ...dummy,
    ...dummy,
    ...dummy,
    ...dummy,
  ]);
  const [playing, setPlaying] = useState(4);
  const [currentTimeline, setCurruntTimeline] = useState(83);

  const song = Object.assign(dummy[4], { total: dummy[4].hourly });
  const songLength = 272;

  function onPlayingChange(playing: number) {
    setPlaying(playing);
  }

  function onCurrentTimelineChange(value: number) {
    setCurruntTimeline(value);
  }

  function onPlaylistChange(playlist: PlaylistType) {
    setPlaylist(playlist);
  }

  return (
    <Container>
      <Visual songId={song.songId} />
      <Timeline
        length={songLength}
        current={currentTimeline}
        onChange={onCurrentTimelineChange}
      />
      <Song song={{ ...song, views: song.total.views }} />

      <Divider />

      <Playlist
        playlist={playlist}
        playing={playing}
        onChange={onPlaylistChange}
        onPlayingChange={onPlayingChange}
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
