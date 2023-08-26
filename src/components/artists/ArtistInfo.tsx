import { AnimationControls, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  containerVariants,
  contentVariants,
  hiddenVariants,
} from "src/animations/artist";
import styled, { css } from "styled-components/macro";

import { ReactComponent as DocumentOff } from "@assets/icons/ic_30_document_off.svg";
import { ReactComponent as DocumentOn } from "@assets/icons/ic_30_document_on.svg";

import { T3Medium, T6Light, T6Medium } from "@components/Typography";
import DefaultScroll from "@components/globals/Scroll/DefaultScroll";
import Skeleton from "@components/globals/Skeleton";

import colors from "@constants/colors";

import { Artist } from "@templates/artists";

import { capitalize } from "@utils/formatting";
import { addAlpha } from "@utils/utils";

import ArtistImage from "./ArtistImage";

interface ArtistInfoProps {
  artist?: Artist;
  controls: AnimationControls;
  small: boolean;

  isLoading?: boolean;
}

const ArtistInfo = ({
  artist,
  controls,
  small,
  isLoading,
}: ArtistInfoProps) => {
  const [descriptionOpen, setDescriptionOpen] = useState(false);

  useEffect(() => {
    if (small) {
      setDescriptionOpen(false);
    }
  }, [small]);

  if (!artist || isLoading) {
    return (
      <Container>
        <InnerContainer>
          <Skeleton width={140} height={180} />
          <Content>
            <Skeleton width={100} height={32} />
            <Skeleton width={100} height={20} marginTop={2} />

            <Skeleton width={100} height={20} marginTop={16} />
          </Content>

          <DocumentButton>
            <DocumentOff />
          </DocumentButton>
        </InnerContainer>
      </Container>
    );
  }

  return (
    <Container animate={controls} initial="square" variants={containerVariants}>
      <Background $color={artist.color.background} />

      <InnerContainer>
        <ArtistImage artist={artist} controls={controls} />

        <Content animate={controls} initial="square" variants={contentVariants}>
          <T3Medium color={colors.gray900}>
            {descriptionOpen ? "소개글" : artist.name}
          </T3Medium>

          {descriptionOpen ? (
            <DescriptionContainer>
              <DefaultScroll>
                <Description $color={colors.blueGray600}>
                  {artist.description}
                </Description>
              </DefaultScroll>
            </DescriptionContainer>
          ) : (
            <>
              <EnglishName>{capitalize(artist.artistId)}</EnglishName>

              <motion.div
                animate={controls}
                initial="square"
                variants={hiddenVariants}
              >
                <GroupText>
                  {artist.group.kr !== "우왁굳" && artist.group.kr}
                  {artist.graduated && " · 졸업"}
                </GroupText>

                <Description>{artist.title.web}</Description>
              </motion.div>
            </>
          )}
        </Content>

        <DocumentButton
          animate={controls}
          initial="square"
          variants={hiddenVariants}
          onClick={() => !small && setDescriptionOpen(!descriptionOpen)}
        >
          {descriptionOpen ? <DocumentOn /> : <DocumentOff />}
        </DocumentButton>
      </InnerContainer>
    </Container>
  );
};

const Container = styled(motion.div)`
  height: 200px;
`;

const Background = styled.div<{ $color: string[][] }>`
  position: absolute;
  z-index: -1;

  width: 754px;
  height: 200px;

  opacity: 0.3;

  ${({ $color: color }) => css`
    background: linear-gradient(
      180deg,
      ${color
        .map((c) => `#${addAlpha(c[0], Number(c[1]) / 100)} ${c[2]}%`)
        .join(", ")}
    );
  `}
`;

const InnerContainer = styled.div`
  padding: 20px 0 0 20px;

  display: flex;
  align-items: flex-start;
`;

const Content = styled(motion.div)`
  margin-left: 24px;
  margin-top: 12px;

  pointer-events: none;
`;

const DescriptionContainer = styled(motion.div)`
  width: 566px;
`;

const Description = styled(T6Medium)<{ $color?: string }>`
  width: 542px;
  height: 132px;

  color: ${({ $color }) => $color || colors.gray900};

  margin-top: 4px;
`;
const EnglishName = styled(T6Light)`
  color: ${colors.blueGray500};
`;

const GroupText = styled(T6Medium)`
  color: ${colors.gray900};

  margin-top: 12px;
  margin-bottom: 16px;
`;

const DocumentButton = styled(motion.div)`
  position: absolute;
  right: 28px;
`;

export default ArtistInfo;
