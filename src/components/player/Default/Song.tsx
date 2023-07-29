import { useState } from "react";
import styled from "styled-components";

import { ReactComponent as HeartOffSvg } from "@assets/icons/ic_20_heart_off.svg";
import { ReactComponent as HeartOnSvg } from "@assets/icons/ic_20_heart_on.svg";

import { T4Medium, T5Light } from "@components/Typography";
import SimpleIconButton from "@components/globals/SimpleIconButton";

import colors from "@constants/colors";

import { useCurrentSongState } from "@hooks/player";

import Controller from "../Controller";
import View from "../View";

interface SongProps {}

const Song = ({}: SongProps) => {
  const song = useCurrentSongState();

  const [isLiked, setIsLiked] = useState(false);

  function changeIsLikeState() {
    setIsLiked(!isLiked);
  }

  return (
    <Container>
      <UpperContainer>
        <SimpleIconButton
          icon={isLiked ? HeartOnSvg : HeartOffSvg}
          onClick={changeIsLikeState}
        />

        <TitleContainer>
          <T4Medium color={colors.blueGray25}>{song.title}</T4Medium>
          <ArtistText color={colors.blueGray100}>{song.artist}</ArtistText>
        </TitleContainer>

        <View />
      </UpperContainer>

      <Controller />
    </Container>
  );
};

const Container = styled.div`
  height: 136px;

  padding-top: 18px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UpperContainer = styled.div`
  padding-bottom: 16px;

  display: flex;
  align-items: center;
`;

const TitleContainer = styled.div`
  width: 200px;

  margin: 0 8px;

  text-align: center;
`;

const ArtistText = styled(T5Light)`
  opacity: 0.6;
`;

export default Song;
