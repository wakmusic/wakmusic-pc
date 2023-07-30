import styled from "styled-components/macro";

import SongItem from "@components/globals/SongItem";

import { Song } from "@templates/song";

interface SongCardProps {
  songs: Array<Song>;
}

const SongCard = ({ songs }: SongCardProps) => {
  return (
    <Container>
      {songs.map((item, index) =>
        index <= 2 ? <SongItem key={index} song={item} noPadding /> : null
      )}
    </Container>
  );
};

const Container = styled.div``;

export default SongCard;
