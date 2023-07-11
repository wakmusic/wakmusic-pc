import styled from "styled-components";

import { ReactComponent as Check } from "@assets/icons/ic_16_check.svg";

import { T7Medium } from "@components/Typography";
import { T7Light } from "@components/Typography/Light";
import FunctionSection from "@components/chart/FunctionSection";
import MusicList from "@components/chart/MusicList";
import MusicController from "@components/globals/MusicController";
import PageContainer from "@components/globals/PageContainer";

import colors from "@constants/colors";

interface ChartProps {}

const Chart = ({}: ChartProps) => {
  return (
    <Wrapper>
      <FunctionSection />
      <UpdateTimeLayout>
        <Check />
        <TimeText>00월 00일 오전 0시 업데이트</TimeText>
      </UpdateTimeLayout>
      <WhiteLine />
      <GuideBox>
        <GuideText></GuideText>
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
      <MusicController />
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

const TimeText = styled(T7Light)`
  color: ${colors.blueGray500};
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
  position: relative;
`;

const GuideText = styled(T7Medium)<{ width?: string }>`
  text-align: center;
  width: ${(props) => (props.width !== "" ? props.width : "auto")};
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
