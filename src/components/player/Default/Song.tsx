import styled from "styled-components/macro";

import { ReactComponent as HeartOffSvg } from "@assets/icons/ic_20_heart_off.svg";
import { ReactComponent as HeartOnSvg } from "@assets/icons/ic_20_heart_on.svg";

import { T4Medium, T5Light } from "@components/Typography";
import Marquee from "@components/globals/Marquee";
import SimpleIconButton from "@components/globals/SimpleIconButton";

import colors from "@constants/colors";

import { useLikes } from "@hooks/likes";
import { useCurrentSongState } from "@hooks/player";

import Controller from "../Controller";
import View from "../View";

interface SongProps {}

const Song = ({}: SongProps) => {
  const song = useCurrentSongState();

  const { liked, toggleLikes } = useLikes(song);

  return (
    <Container>
      <UpperContainer>
        <SimpleIconButton
          icon={liked ? HeartOnSvg : HeartOffSvg}
          onClick={toggleLikes}
        />

        <TitleContainer>
          <Marquee width={200}>
            <TitleText>{song?.title || "왁뮤차트 TOP100"} </TitleText>
          </Marquee>

          <Marquee width={200}>
            <ArtistText>
              {song?.artist || "재생 버튼을 클릭해보세요."}
            </ArtistText>
          </Marquee>
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
  height: 52px;

  margin: 0 8px;

  text-align: center;
`;

const TitleText = styled(T4Medium)`
  color: ${colors.blueGray25};
`;

const ArtistText = styled(T5Light)`
  color: ${colors.blueGray100};
  opacity: 0.6;
`;

export default Song;
