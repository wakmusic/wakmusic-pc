import { AnimationControls, motion } from "framer-motion";
import { backgroundVariants, characterVariants } from "src/animations/artist";
import styled, { css } from "styled-components/macro";

import { Artist } from "@templates/artists";

interface ArtistImageProps {
  artist: Artist;
  controls: AnimationControls;
}

const dummy = {
  imageColor: [
    ["5EA585", "0"],
    ["0B3322", "100"],
  ],
  image:
    "https://media.discordapp.net/attachments/1107136927406239744/1138393190324502578/img.png",
};

const ArtistImage = ({ artist, controls }: ArtistImageProps) => {
  return (
    <Container>
      <Background
        $color={dummy.imageColor}
        animate={controls}
        initial="square"
        variants={backgroundVariants}
      />

      <CharacterImage
        src={dummy.image}
        alt={artist.name}
        animate={controls}
        initial="square"
        variants={characterVariants}
      />
    </Container>
  );
};

const Container = styled.div``;

const Background = styled(motion.div)<{ $color: string[][] }>`
  position: absolute;
  z-index: -1;

  width: 140px;
  height: 180px;

  border-radius: 8px;

  ${({ $color: c }) => css`
    background: linear-gradient(
      135deg,
      #${c[0][0]} ${c[0][1]}%,
      #${c[1][0]} ${c[1][1]}%
    );
  `}
`;

const CharacterImage = styled(motion.img)`
  width: 140px;
`;

export default ArtistImage;
