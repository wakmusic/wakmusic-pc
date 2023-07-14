import styled from "styled-components";

import { T7Light } from "@components/Typography";

import colors from "@constants/colors";

interface PlaylistProps {
  playlist: { title: string; artist: string }[];
  playing: number;
}

const Playlist = ({ playlist, playing }: PlaylistProps) => {
  return (
    <Container>
      <PlaylistContainer>
        {playlist.map((song, i) => (
          <SongContainer
            key={i}
            style={{ color: i == playing ? colors.point : colors.gray500 }}
          >
            <TitleText>{song.title}</TitleText>
            <ArtistText>{song.artist}</ArtistText>
          </SongContainer>
        ))}
      </PlaylistContainer>
    </Container>
  );
};

const Container = styled.div`
  height: calc(100% - 341px);

  padding: 16px 5px 16px 16px;
`;

const PlaylistContainer = styled.div`
  height: 100%;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${colors.gray700};
    border-radius: 10px;
  }
`;

const SongContainer = styled.div`
  display: flex;

  height: 24px;
`;

const TitleText = styled(T7Light)`
  width: 176px;
`;

const ArtistText = styled(T7Light)`
  width: 82px;
`;

export default Playlist;
