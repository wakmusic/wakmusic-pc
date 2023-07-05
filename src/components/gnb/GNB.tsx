import styled from "styled-components";

import { ReactComponent as ArtistSVG } from "@assets/icons/ic_40_artist_disabled.svg";
import { ReactComponent as ChartSVG } from "@assets/icons/ic_40_chart_disabled.svg";
import { ReactComponent as HomeSVG } from "@assets/icons/ic_40_home_disabled.svg";
import { ReactComponent as KeepSVG } from "@assets/icons/ic_40_keep_disabled.svg";
import { ReactComponent as SearchSVG } from "@assets/icons/ic_40_search_disabled.svg";
import artistLottie from "@assets/lotties/ic_artist.json";
import chartLottie from "@assets/lotties/ic_chart.json";
import homeLottie from "@assets/lotties/ic_home.json";
import keepLottie from "@assets/lotties/ic_keep.json";
import searchLottie from "@assets/lotties/ic_search.json";

import { T6Medium } from "@components/Typography";

import colors from "@constants/colors";

import Section from "./Section";

interface GNB {}

const GNB = ({}: GNB) => {
  return (
    <Container>
      <Navigator>
        <Section path="/" icon={HomeSVG} lottie={homeLottie}>
          홈
        </Section>

        <Section path="/chart" icon={ChartSVG} lottie={chartLottie}>
          차트
        </Section>

        <Section path="/search" icon={SearchSVG} lottie={searchLottie}>
          검색
        </Section>

        <Section path="/artist" icon={ArtistSVG} lottie={artistLottie}>
          아티스트
        </Section>

        <Section path="/user/playlists" icon={KeepSVG} lottie={keepLottie}>
          보관함
        </Section>
      </Navigator>
      <Login>
        <Text>로그인 하기</Text>
      </Login>
    </Container>
  );
};

const Container = styled.div`
  width: 186px;
  height: 676px;

  float: left;
`;

const Navigator = styled.div`
  width: 150px;
  height: 260px;

  margin-top: 19.5px;
  margin-left: 20px;
  margin-right: 16px;
  padding-top: 20px;
  padding-bottom: 20px;

  flex-shrink: 0;

  border-radius: 16px;
  border: 1px solid ${colors.blueGray25};
  background: #ffffff66; //${colors.white}
  backdrop-filter: blur(62.5px);

  div {
    &:not(:last-child) {
      margin-bottom: 15px;
    }
  }
`;

const Login = styled.div`
  width: 150px;
  height: 52px;

  margin-top: 12px;
  margin-left: 20px;
  margin-right: 16px;

  flex-shrink: 0;

  border-radius: 16px;
  border: 1px solid ${colors.blueGray25};
  background: #ffffff66; //${colors.white}
  backdrop-filter: blur(62.5px);

  cursor: pointer;
`;

const Text = styled(T6Medium)`
  position: relative;
  top: 50%;
  transform: translateY(-50%);

  text-align: center;

  color: ${colors.blueGray600};
`;

export default GNB;
