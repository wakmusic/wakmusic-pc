import styled from "styled-components/macro";

import SongItem from "@components/globals/SongItem";

import { Song } from "@templates/song";

interface SongCardProps {
  songs: Array<Song>;
  selectedSongs: Array<Song>;
  onClick: (song: Song) => void;
}

const SongCard = ({ songs, selectedSongs, onClick }: SongCardProps) => {
  return (
    <Container>
      {songs.map((item, index) =>
        index <= 2 ? (
          <SongItem
            key={index}
            song={item}
            selected={selectedSongs.includes(item)}
            onClick={onClick}
            noPadding
          />
        ) : null
      )}
    </Container>
  );
};

const Container = styled.div``;

export default SongCard;
