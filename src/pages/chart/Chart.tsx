import styled, { css } from "styled-components";

import { ReactComponent as Check } from "@assets/icons/ic_16_check.svg";

import { T7Light } from "@components/Typography/Light";
import { T7Medium } from "@components/Typography/Medium";
import FunctionSection from "@components/chart/FunctionSection";
import MusicList from "@components/chart/MusicList";
import PageContainer from "@components/globals/PageContainer";
import AddMusic from "@components/globals/musicControllers/AddMusic";
import AddPlaylist from "@components/globals/musicControllers/AddPlaylist";
import PlayMusic from "@components/globals/musicControllers/PlayMusic";
import SelectAll from "@components/globals/musicControllers/SelectAll";
import MusicControllerBar from "@components/globals/musicControllers/musicControllerContainers/MusicControllerBar";

import colors from "@constants/colors";

import { isNumber } from "@utils/isTypes";

interface ChartProps {}

const Chart = ({}: ChartProps) => {
  return (
    <Wrapper>
      <FunctionSection />
      <UpdateTimeLayout>
        <Check />
        <T7Light color={colors.blueGray500}>
          00월 00일 오전 0시 업데이트
        </T7Light>
      </UpdateTimeLayout>
      <WhiteLine />
      <GuideBox>
        <GuideText width={36}>순위</GuideText>
        <InfoText>정보</InfoText>
        <TextLayout>
          <GuideText width={70}>1시간 전</GuideText>
          <GuideText width={70}>발매일</GuideText>
          <GuideText width={70}>조회수</GuideText>
        </TextLayout>
      </GuideBox>
      <BlackLine />
      <MusicSection>
        <MusicLayout>
          <MusicList />
          <MusicList />
          <MusicList />
          <MusicList />
          <MusicList />
          <MusicList />
          <MusicList />
          <MusicList />
          <MusicList />
          <MusicList />
          <MusicList />
          <MusicList />
          <MusicList />
          <MusicList />
          <MusicList />
          <MusicList />
          <MusicList />
          <MusicList />
        </MusicLayout>
      </MusicSection>
      <MusicControllerBar count={1}>
        <SelectAll isSelect={true} />
        <AddMusic />
        <AddPlaylist />
        <PlayMusic />
      </MusicControllerBar>
    </Wrapper>
  );
};

const Wrapper = styled(PageContainer)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  height: 636px;
  border-radius: 15px;
  border: 1px solid ${colors.blueGray25};
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(62.5px);
  margin-top: 20px;
`;

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
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
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
  left: 150px;
`;

const MusicSection = styled.div`
  width: 100%;
  overflow-y: scroll;
  flex: 1 1 0;
`;

const MusicLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Chart;
