import styled from "styled-components";

import { ReactComponent as Check } from "@assets/icons/ic_16_check.svg";

import { T7Light } from "@components/Typography/Light";
import FunctionSection from "@components/chart/FunctionSection";
import PageContainer from "@components/globals/PageContainer";

import colors from "@constants/colors";

interface ChartProps {}

const Chart = ({}: ChartProps) => {
  return (
    <Wrapper>
      <FunctionSection />
      <UpdateTimeLayout>
        <Check />
        <T7Light>00월 00일 오전 0시 업데이트</T7Light>
      </UpdateTimeLayout>
      <WhiteLine />
    </Wrapper>
  );
};

const Wrapper = styled(PageContainer)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: auto;
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

export default Chart;
