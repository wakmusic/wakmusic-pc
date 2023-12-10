import styled from "styled-components/macro";

import { T4Medium, T5Light } from "@components/Typography";
import Marquee from "@components/globals/Marquee";

import colors from "@constants/colors";

import { useAdState, useCurrentSongState } from "@hooks/player";

import { formatSecond } from "@utils/formatting";

import Controller from "../Controller";
import Like from "../Like";
import View from "../View";

interface SongProps {}

const Song = ({}: SongProps) => {
  const song = useCurrentSongState();
  const [ad] = useAdState();

  return (
    <Container>
      <UpperContainer>
        <Like />

        <TitleContainer>
          <Marquee width={200}>
            <TitleText>
              {ad.isAd ? "~ 광고 중 ~" : song?.title || "왁뮤차트 TOP100"}
            </TitleText>
          </Marquee>

          <Marquee width={200}>
            <ArtistText>
              {ad.isAd
                ? formatSecond(ad.duration - ad.current)
                : song?.artist || "재생 버튼을 클릭해보세요."}
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
  height: 126px;

  padding-top: 8px;

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
