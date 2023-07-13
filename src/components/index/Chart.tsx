import styled from "styled-components";

import { ReactComponent as CheckSVG } from "@assets/icons/ic_16_check.svg";
import { ReactComponent as PlayAllSVG } from "@assets/icons/ic_24_play_all.svg";
import { ReactComponent as RandomSVG } from "@assets/icons/ic_24_random_900.svg";

import { T4Medium, T7Light } from "@components/Typography";

import colors from "@constants/colors";
import { chartUpdated, hourlyChart } from "@constants/dummys";

import Button from "./Button";
import ChartItem from "./ChartItem";

interface ChartProps {}

const Chart = ({}: ChartProps) => {
  const updated = new Date(Number(chartUpdated) * 1000);

  return (
    <Container>
      <Header>
        <HeaderTexts>
          <Title color={colors.primary900}>왁뮤차트 TOP100</Title>
          <UpdatedContainer>
            <CheckSVG />
            <T7Light>
              {String(updated.getMonth() + 1).padStart(2, "0")}월{" "}
              {String(updated.getDate() + 1).padStart(2, "0")}일{" "}
              {updated.getHours() > 12
                ? "오후 " + (updated.getHours() - 12)
                : "오전 " + updated.getHours()}
              시 업데이트
            </T7Light>
          </UpdatedContainer>
        </HeaderTexts>

        <HeaderButtons>
          <Button icon={PlayAllSVG}>전체재생</Button>
          <Button icon={RandomSVG}>랜덤재생</Button>
        </HeaderButtons>
      </Header>

      <Items>
        {hourlyChart.map((item, index) => (
          <ChartItem key={index} rank={index + 1} item={item} />
        ))}
      </Items>
    </Container>
  );
};

const Container = styled.div`
  width: 754px;
  height: 352px;

  margin-top: 20px;
  padding: 20px;

  border-radius: 16px;
  border: 1px solid ${colors.blueGray25};
  background-color: ${colors.white}66; // 40%
  backdrop-filter: blur(62.5px);
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
`;

const HeaderTexts = styled.div``;

const HeaderButtons = styled.div`
  margin-left: auto;
  margin-top: -4px;

  display: flex;
  align-items: center;
  gap: 4px;
`;

const Title = styled(T4Medium)`
  margin-top: -4px;
`;

const UpdatedContainer = styled.div`
  margin-top: 9px;

  display: flex;
  align-items: center;
  gap: 2px;

  color: ${colors.blueGray500};
`;

const Items = styled.div`
  margin-top: 8px;
  margin-left: 8px;

  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-auto-flow: column;
`;

export default Chart;
