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

import { T5Bold } from "@components/Typography";

import colors from "@constants/colors";

import LottiePlayer from "@utils/LottiePlayer";

interface Section {
  type: "artist" | "chart" | "home" | "keep" | "search";
  isActived?: boolean;
  onClick?: () => void;
}

const Section = ({ type, isActived, onClick }: Section) => {
  return (
    <Container
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      <IconContainer>
        {isActived
          ? {
              artist: (
                <LottiePlayer
                  animationData={artistLottie}
                  style={{
                    width: 40,
                    height: 40,
                  }}
                />
              ),
              chart: (
                <LottiePlayer
                  animationData={chartLottie}
                  style={{
                    width: 40,
                    height: 40,
                  }}
                />
              ),
              home: (
                <LottiePlayer
                  animationData={homeLottie}
                  style={{
                    width: 40,
                    height: 40,
                  }}
                />
              ),
              keep: (
                <LottiePlayer
                  animationData={keepLottie}
                  style={{
                    width: 40,
                    height: 40,
                  }}
                />
              ),
              search: (
                <LottiePlayer
                  animationData={searchLottie}
                  style={{
                    width: 40,
                    height: 40,
                  }}
                />
              ),
            }[type]
          : {
              artist: <ArtistSVG />,
              chart: <ChartSVG />,
              home: <HomeSVG />,
              keep: <KeepSVG />,
              search: <SearchSVG />,
            }[type]}
      </IconContainer>
      <Text>
        {
          {
            artist: "아티스트",
            chart: "왁뮤차트",
            home: "홈",
            keep: "보관함",
            search: "최신음악",
          }[type]
        }
      </Text>
    </Container>
  );
};

const Container = styled.div`
  width: 118px;
  height: 40px;

  margin-left: 16px;
  margin-right: 16px;

  flex-shrink: 0;

  cursor: pointer;
`;

const Text = styled(T5Bold)`
  position: relative;

  top: 50%;
  transform: translateY(-50%);

  margin-left: 6px;

  display: inline-block;

  color: ${colors.blueGray600};
`;

const IconContainer = styled.div`
  float: left;
  display: flex;
`;

export default Section;
