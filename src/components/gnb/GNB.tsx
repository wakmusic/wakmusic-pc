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
          왁뮤차트
        </Section>

        <Section path="/new" icon={SearchSVG} lottie={searchLottie}>
          최신음악
        </Section>

        <Section path="/artists" icon={ArtistSVG} lottie={artistLottie}>
          아티스트
        </Section>

        <Section path="/user/playlists" icon={KeepSVG} lottie={keepLottie}>
          보관함
        </Section>
      </Navigator>

      <Login>
        <T6Medium
          style={{
            color: colors.blueGray600,
          }}
        >
          로그인 하기
        </T6Medium>
      </Login>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 19.5px;
  margin-left: 20px;
  margin-right: 4px;
`;

const Navigator = styled.div`
  width: 150px;
  height: 300px;

  border-radius: 16px;
  border: 1px solid ${colors.blueGray25};
  background: ${colors.white}66; // 40% opacity
  backdrop-filter: blur(62.5px);

  padding: 20px 16px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Login = styled.div`
  margin-top: 12px;

  width: 150px;
  height: 52px;

  border-radius: 16px;
  border: 1px solid ${colors.blueGray25};
  background: ${colors.white}66; // 40% opacity
  backdrop-filter: blur(62.5px);

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default GNB;
