import { useQuery } from "react-query";
import styled from "styled-components/macro";

import { fetchCharts, fetchChartsUpdateTypes } from "@apis/charts";

import { ReactComponent as PlayAllSVG } from "@assets/icons/ic_24_play_all.svg";
import { ReactComponent as RandomSVG } from "@assets/icons/ic_24_random_900.svg";

import { T4Medium } from "@components/Typography";
import Button from "@components/globals/IconButton";
import UpdatedText from "@components/globals/UpdatedText";

import colors from "@constants/colors";

import ChartItem from "./ChartItem";

interface ChartProps {}

const Chart = ({}: ChartProps) => {
  const {
    isLoading: chartsIsLoading,
    error: chartsError,
    data: charts,
  } = useQuery({
    queryKey: ["charts", "hourly"],
    queryFn: async () => await fetchCharts("hourly", 100),
  });

  const {
    isLoading: chartUpdatedIsLoading,
    error: chartUpdatedError,
    data: chartUpdated,
  } = useQuery({
    queryKey: ["chartUpdated", "hourly"],
    queryFn: async () => await fetchChartsUpdateTypes("hourly"),
  });

  // TODO
  if (chartsIsLoading || chartUpdatedIsLoading || !charts || !chartUpdated)
    return <div>로딩중...</div>;
  if (chartsError || chartUpdatedError) return <div>에러...</div>;

  return (
    <Container>
      <Header>
        <HeaderTexts>
          <Title color={colors.primary900}>왁뮤차트 TOP100</Title>
          <UpdatedText updated={chartUpdated} marginTop={9} />
        </HeaderTexts>

        <HeaderButtons>
          <Button icon={PlayAllSVG}>전체재생</Button>
          <Button icon={RandomSVG}>랜덤재생</Button>
        </HeaderButtons>
      </Header>

      <Items>
        {charts.slice(0, 8).map((item, index) => (
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
  background-color: ${colors.whiteAlpha40};
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

const Items = styled.div`
  margin-top: 8px;
  margin-left: 8px;

  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-auto-flow: column;
`;

export default Chart;
