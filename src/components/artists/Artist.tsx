import { motion } from "framer-motion";
import styled from "styled-components";

import { T7Medium } from "@components/Typography";

import colors from "@constants/colors";

interface ArtistProps {
  // TODO: Interface 작업 예정
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  artist: any;
}

const Artist = ({ artist }: ArtistProps) => {
  return (
    <Container whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Image
        src={`https://static.wakmusic.xyz/static/artist/round/${artist.artistId}.png?v=${artist.image.round}`}
      />
      <Name>{artist.name}</Name>
    </Container>
  );
};

const Container = styled(motion.div)`
  width: 100px;
  height: 124px;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 2px;

  cursor: pointer;
`;

const Image = styled.img`
  width: 84px;
  height: 104px;
`;

const Name = styled(T7Medium)`
  color: ${colors.blueGray500};
`;

export default Artist;
