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
import { fetchSong } from "@apis/songs";

import kungya from "@assets/imgs/kungya.png";
import maid from "@assets/imgs/maid.png";
import mangnyannyan from "@assets/imgs/mangnyannyan.png";
import chanichani from "@assets/sounds/chanichani.mp3";
import gosegu from "@assets/sounds/gosegu.mp3";

import { useControlState, usePlaySong } from "@hooks/player";

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
  const [easterEgg, setEasterEgg] = useState(0);
  const [control] = useControlState();
  const playSong = usePlaySong();

  return (
    <Container
      animate={controls}
      initial="square"
      variants={artistImageVariants}
      onClick={() => {
        if (artist.artistId === "woowakgood") {
          editData((artist) => {
            if (artist.artistId === "woowakgood") {
              return {
                ...artist,
                name: "이거",
                description: "이거 만든새X 누구야",
                title: {
                  ...artist.title,
                  web: "만든새X 누구야",
                },
                image: {
                  ...artist.image,
                  special: kungya,
                },
                color: {
                  ...artist.color,
                  card: [
                    ["996f3b", "100", "0"],
                    ["eccb9e", "100", "100"],
                  ],
                  background: [
                    ["996f3b", "100", "0.01"],
                    ["eccb9e", "0", "100"],
                  ],
                },
              };
            }
            return artist;
          });
        }

        if (artist.artistId === "gosegu") {
          const audio = new Audio(gosegu);
          audio.volume = control.volume / 100;
          audio.play();
        }

        if (artist.artistId === "VIichan") {
          if (easterEgg === 0) {
            const audio = new Audio(chanichani);
            audio.volume = control.volume / 100;
            audio.play();

            setEasterEgg(1);
          }

          if (easterEgg === 1) {
            editData((artist) => {
              if (artist.artistId === "VIichan") {
                return {
                  ...artist,
                  name: "망냥냥",
                  title: {
                    ...artist.title,
                    web: "현실을 가르고 시냅스를 터뜨리며 현세에 강림하신 어둠의 마왕님",
                  },
                  description:
                    "다크 쉴드, 빠이어 볼, 망냥광살포를 주무기로 삼는 마왕성의 주인.\n익히 알려져 있는 위엄과는 달리 에임이 상당히 모시깽하다는 소문이 있다.",
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
        }

        if (artist.artistId === "lilpa") {
          editData((artist) => {
            if (artist.artistId === "lilpa") {
              return {
                ...artist,
                name: "전투메이드",
                title: {
                  ...artist.title,
                  web: "가면을 쓰고 정체를 숨기려는데 잘 안되는 메이드복의 전투 요원",
                },
                description:
                  "부산 코믹월드 근방을 활동 반경으로 삼는 왁타버스 최고의 전투 요원.\n그녀의 정체를 알게 되면 권총 소리와 함께 사라진다는 이야기가 전해진다.",
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
          setEasterEgg(easterEgg === 0 ? 1 : 0);
        }

        if (artist.artistId === "ninnin") {
          fetchSong("06al4daDPQ8").then(playSong);
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
          transform:
            easterEgg === 1 && artist.artistId === "rusuk"
              ? "scaleY(-1)"
              : "scaleY(1)",
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

const ImageContainer = styled.div`
  height: 180px;
`;

const CharacterImage = styled(motion.img)`
  width: 140px;
`;

export default ArtistImage;
