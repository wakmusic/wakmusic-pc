import { Song } from "@templates/search";
import styled from "styled-components";

import { formatNumber } from "@utils/formatting";

import SongSection from "./SongSection";

interface SongCardProps {
  songs: Array<Song>;
  likeList: {
    [id: string]: number;
  };
}

const SongCard = ({ songs, likeList }: SongCardProps) => {
  const sortValue = (a: Song, b: Song) => {
    if (!a.total.views) {
      return 1;
    } else if (!b.total.views) {
      return -1;
    } else {
      return b.total.views - a.total.views;
    }
  };

  return (
    <Container>
      {songs
        .sort(sortValue)
        .map((item, index) =>
          index <= 2 ? (
            <SongSection
              item={item}
              key={index}
              count={formatNumber(likeList[item.songId])}
            />
          ) : null
        )}
    </Container>
  );
};

const Container = styled.div``;

export default SongCard;
