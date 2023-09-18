import { AnimationControls, motion } from "framer-motion";
import { useState } from "react";
import {
  artistImageVariants,
  backgroundVariants,
  characterVariants,
} from "src/animations/artist";
import { queryClient } from "src/main";
import styled, { css } from "styled-components/macro";

import { fetchArtistList } from "@apis/artist";

import maid from "@assets/imgs/maid.png";
import mangnyannyan from "@assets/imgs/mangnyannyan.png";
import gosegu from "@assets/sounds/gosegu.mp3";

import { Artist } from "@templates/artists";

import { getArtistClearImage } from "@utils/staticUtill";
import { addAlpha } from "@utils/utils";

interface ArtistImageProps {
  artist: Artist;
  controls: AnimationControls;
  scrollToTop?: () => void;
}

const editData = (func: (artist: Artist) => void) => {
  queryClient
    .fetchQuery({
      queryKey: "artists",
      queryFn: fetchArtistList,
    })
    .then((artists) => {
      queryClient.setQueryData("artists", artists.map(func));
    });
};

const ArtistImage = ({ artist, controls, scrollToTop }: ArtistImageProps) => {
  const [reverse, setReverse] = useState(false);

  return (
    <Container
      animate={controls}
      initial="square"
      variants={artistImageVariants}
      onClick={() => {
        if (artist.artistId === "gosegu") {
          new Audio(gosegu).play();
        }

        if (artist.artistId === "VIichan") {
          editData((artist) => {
            if (artist.artistId === "VIichan") {
              return {
                ...artist,
                name: "망냥냥",
                color: {
                  ...artist.color,
                  card: [
                    ["74506F", "100", "0"],
                    ["403645", "100", "100"],
                  ],
                  background: [
                    ["74506F", "100", "0.01"],
                    ["74506F", "0", "100"],
                  ],
                },
                image: {
                  ...artist.image,
                  special: mangnyannyan,
                },
              };
            }
            return artist;
          });
        }

        if (artist.artistId === "lilpa") {
          editData((artist) => {
            if (artist.artistId === "lilpa") {
              return {
                ...artist,
                name: "전투메이드",
                color: {
                  ...artist.color,
                  card: [
                    ["0F0C30", "100", "0"],
                    ["3467B0", "100", "100"],
                  ],
                  background: [
                    ["20356A", "100", "0.01"],
                    ["20356A", "0", "100"],
                  ],
                },
                image: {
                  ...artist.image,
                  special: maid,
                },
              };
            }
            return artist;
          });
        }

        if (artist.artistId === "rusuk") {
          setReverse(!reverse);
        }
      }}
    >
      <Background
        $color={artist.color.card}
        animate={controls}
        initial="square"
        variants={backgroundVariants}
      />

      <ImageContainer
        style={{
          transform: reverse ? "scaleY(-1)" : "scaleY(1)",
        }}
      >
        <CharacterImage
          src={getArtistClearImage(artist)}
          alt={artist.name}
          animate={controls}
          initial="square"
          variants={characterVariants}
          onClick={scrollToTop}
        />
      </ImageContainer>
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

const ImageContainer = styled.div``;

const CharacterImage = styled(motion.img)`
  width: 140px;
`;

export default ArtistImage;
