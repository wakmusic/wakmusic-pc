import { AnimationControls, motion } from "framer-motion";
import {
  artistImageVariants,
  backgroundVariants,
  characterVariants,
} from "src/animations/artist";
import styled, { css } from "styled-components/macro";

import { Artist } from "@templates/artists";

import { getArtistClearImage } from "@utils/staticUtill";
import { addAlpha } from "@utils/utils";

interface ArtistImageProps {
  artist: Artist;
  controls: AnimationControls;
}

const ArtistImage = ({ artist, controls }: ArtistImageProps) => {
  return (
    <Container
      animate={controls}
      initial="square"
      variants={artistImageVariants}
    >
      <Background
        $color={artist.color.card}
        animate={controls}
        initial="square"
        variants={backgroundVariants}
      />

      <CharacterImage
        src={getArtistClearImage(artist)}
        alt={artist.name}
        animate={controls}
        initial="square"
        variants={characterVariants}
      />
    </Container>
  );
};

const Container = styled(motion.div)`
  height: 180px;
`;

const Background = styled(motion.div)<{ $color: string[][] }>`
  position: absolute;
  z-index: -1;

  width: 140px;
  height: 180px;

  border-radius: 8px;

  ${({ $color: c }) => css`
    background: linear-gradient(
      135deg,
      ${c
        .map(
          (color) =>
            `#${addAlpha(color[0], Number(color[1]) / 100)} ${color[2]}%`
        )
        .join(", ")}
    );
  `}
`;

const CharacterImage = styled(motion.img)`
  width: 140px;
`;

export default ArtistImage;
