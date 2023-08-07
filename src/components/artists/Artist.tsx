import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";

import { T7Medium } from "@components/Typography";

import colors from "@constants/colors";

import { getArtistRoundImage } from "@utils/staticUtill";

interface ArtistProps {
  // TODO: Interface 작업 예정
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  artist: any;
}

const Artist = ({ artist }: ArtistProps) => {
  const navigate = useNavigate();

  return (
    <Container
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => {
        navigate(`/artists/${artist.artistId}`);
      }}
    >
      <Image src={getArtistRoundImage(artist)} />
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
