import { useMemo } from "react";
import styled from "styled-components/macro";

import { T7Medium } from "@components/Typography";

import colors from "@constants/colors";

interface GuideBarProps {
  features: GuideBarFeature[];

  editMode?: boolean;
  lastText?: string;
}

export enum GuideBarFeature {
  rank = "순위",
  info = "곡 정보",

  last = "1시간 전",
  date = "발매일",
  views = "조회수",
  like = "좋아요",
}

const GuideBar = ({ features, editMode, lastText }: GuideBarProps) => {
  const infoTextLeft = useMemo(() => {
    if (features.includes(GuideBarFeature.rank)) return 99;
    if (editMode) return 132;

    return 80;
  }, [features, editMode]);

  return (
    <Container>
      <WhiteLine />

      <GuideContainer>
        {features.includes(GuideBarFeature.rank) && (
          <Text $width={21}>{GuideBarFeature.rank}</Text>
        )}

        {features.includes(GuideBarFeature.info) && (
          <InfoText $left={infoTextLeft}>{GuideBarFeature.info}</InfoText>
        )}

        <RightTexts>
          {features.map((feature, index) => {
            if ([GuideBarFeature.rank, GuideBarFeature.info].includes(feature))
              return null;

            return (
              <Text key={index}>
                {feature === GuideBarFeature.last && lastText
                  ? lastText
                  : feature}
              </Text>
            );
          })}
        </RightTexts>
      </GuideContainer>

      <BlackLine />
    </Container>
  );
};

const Container = styled.div``;

const WhiteLine = styled.div`
  margin-top: 14px;

  width: 734px;
  height: 1px;
  border-radius: 99px;
  background: linear-gradient(
    117deg,
    rgba(255, 255, 255, 0) 0%,
    ${colors.white} 4.69%,
    ${colors.white} 92.56%,
    rgba(255, 255, 255, 0) 100%
  );
`;

const BlackLine = styled.div`
  width: 734px;
  height: 1px;
  border-radius: 99px;
  background: linear-gradient(
    117deg,
    rgba(228, 231, 236, 0) 0%,
    ${colors.blueGray200} 4.69%,
    ${colors.blueGray200} 92.56%,
    rgba(228, 231, 236, 0) 100%
  );
`;

const GuideContainer = styled.div`
  margin-top: 5px;
  margin-bottom: 8px;

  padding-left: 28px;
  padding-right: 18px;

  display: flex;
`;

const Text = styled(T7Medium)<{ $width?: number }>`
  color: ${colors.blueGray400};
  text-align: center;

  width: ${({ $width }) => $width ?? 70}px;
`;

const InfoText = styled(Text)<{ $left: number }>`
  width: 33px;

  position: relative;
  left: ${({ $left }) => $left}px;
`;

const RightTexts = styled.div`
  margin-left: auto;

  display: flex;
  gap: 8px;
`;

export default GuideBar;
