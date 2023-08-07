import { useState } from "react";
import styled, { css } from "styled-components/macro";

import { ReactComponent as DocumentOff } from "@assets/icons/ic_30_document_off.svg";
import { ReactComponent as DocumentOn } from "@assets/icons/ic_30_document_on.svg";

import { T3Medium, T6Light, T6Medium } from "@components/Typography";
import DefaultScroll from "@components/globals/Scroll/DefaultScroll";

import colors from "@constants/colors";

import { Artist } from "@templates/artists";

import { capitalize } from "@utils/formatting";
import { getArtistSquareImage } from "@utils/staticUtill";
import { addAlpha } from "@utils/utils";

interface ArtistInfoProps {
  artist: Artist;
}

const ArtistInfo = ({ artist }: ArtistInfoProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <Background $color={artist.color} />

      <InnerContainer>
        <Image src={getArtistSquareImage(artist)} alt={artist.name} />

        <Content>
          <T3Medium color={colors.gray900}>
            {open ? "소개글" : artist.name}
          </T3Medium>

          {open ? (
            <DescriptionContainer>
              <DefaultScroll>
                <Description>{artist.description}</Description>
              </DefaultScroll>
            </DescriptionContainer>
          ) : (
            <>
              <EnglishName>{capitalize(artist.artistId)}</EnglishName>
              <Description>{artist.appTitle}</Description>
            </>
          )}
        </Content>

        <DocumentButton onClick={() => setOpen(!open)}>
          {open ? <DocumentOn /> : <DocumentOff />}
        </DocumentButton>
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 200px;
`;

const Background = styled.div<{ $color: string[][] }>`
  position: absolute;
  z-index: -1;

  width: 754px;
  height: 200px;

  opacity: 0.6;

  ${({ $color: color }) => css`
    background: linear-gradient(
      180deg,
      #${addAlpha(color[0][0], Number(color[0][1]) / 100)} ${color[0][2]}%,
      #${addAlpha(color[1][0], Number(color[1][1]) / 100)} ${color[1][2]}%
    );
  `}
`;

const InnerContainer = styled.div`
  padding: 20px 0 0 20px;

  display: flex;
  align-items: flex-start;
`;

const Image = styled.img`
  width: 140px;
`;

const Content = styled.div`
  margin-left: 24px;
`;

const DescriptionContainer = styled.div`
  width: 566px;
`;

const Description = styled(T6Medium)`
  width: 542px;
  height: 132px;

  color: ${colors.primary900};

  margin-top: 4px;
`;

const EnglishName = styled(T6Light)`
  color: ${colors.blueGray500};

  margin: 4px 0 22px 0;
`;

const DocumentButton = styled.div`
  position: absolute;
  right: 28px;
`;

export default ArtistInfo;
