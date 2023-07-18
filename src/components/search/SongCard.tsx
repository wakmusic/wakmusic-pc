import { Song } from "@templates/search";
import styled from "styled-components";

import SongSection from "./SongSection";

interface SongCardProps {
  songs: Array<Song>;
}

const SongCard = ({ songs }: SongCardProps) => {
  return (
    <Container>
      {songs.map((item, index) =>
        index <= 2 ? <SongSection item={item} key={index} /> : null
      )}
    </Container>
  );
};

const Container = styled.div``;

export default SongCard;
