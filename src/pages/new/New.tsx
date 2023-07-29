import styled, { css } from "styled-components/macro";

import { ReactComponent as Check } from "@assets/icons/ic_16_check.svg";

import { T7Light } from "@components/Typography/Light";
import { T7Medium } from "@components/Typography/Medium";
import FunctionSection from "@components/new/FunctionSection";
import MusicList from "@components/new/MusicList";

import PageContainer from "@layouts/PageContainer";
import PageItemContainer from "@layouts/PageItemContainer";
import PageLayout from "@layouts/PageLayout";

import colors from "@constants/colors";
import { hourlyChart } from "@constants/dummys";

import { isNumber } from "@utils/isTypes";

interface NewProps {}

const New = ({}: NewProps) => {
  return (
    <PageLayout>
      <PageContainer>
        <FunctionSection />
        <UpdateTimeLayout>
          <Check />
          <T7Light color={colors.blueGray500}>
            00월 00일 오전 0시 업데이트
          </T7Light>
        </UpdateTimeLayout>
        <WhiteLine />
        <GuideBox>
          <InfoText>곡 정보</InfoText>
          <TextLayout>
            <GuideText width={70}>1시간 전</GuideText>
            <GuideText width={70}>발매일</GuideText>
            <GuideText width={70}>조회수</GuideText>
          </TextLayout>
        </GuideBox>
        <BlackLine />
        <PageItemContainer hasButton={false}>
          {hourlyChart.map((item, index) => (
            <MusicList key={index} item={item} />
          ))}
        </PageItemContainer>
      </PageContainer>
    </PageLayout>
  );
};
const UpdateTimeLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  margin: 12px 0px 14px 20px;
`;

const WhiteLine = styled.div`
  width: 734px;
  height: 1px;
  border-radius: 99px;
  background: linear-gradient(
    117deg,
    rgba(255, 255, 255, 0) 0%,
    #fff 4.69%,
    #fff 92.56%,
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
    #e4e7ec 4.69%,
    #e4e7ec 92.56%,
    rgba(228, 231, 236, 0) 100%
  );
`;

const GuideBox = styled.div`
  width: 100%;
  height: 30px;
  padding: 0px 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0px 20px 0px 0px;
  position: relative;
`;

const GuideText = styled(T7Medium)<{ width?: number }>`
  text-align: center;
  width: ${(props) => (isNumber(props.width) ? props.width + "px" : "auto")};
  color: ${colors.blueGray400};

  ${(props) =>
    isNumber(props.width)
      ? css`
          width: ${props.width + "px"};
        `
      : css`
          width: auto;
        `};
`;

const TextLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InfoText = styled(GuideText)`
  position: absolute;
  left: 106px;
`;

export default New;
