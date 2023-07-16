import styled from "styled-components";

import Rank from "@components/globals/Rank";
import Track from "@components/globals/Track";

interface ChartItemProps {
  rank: number;

  // TODO: Interface 작업 예정
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
}

const ChartItem = ({ rank, item }: ChartItemProps) => {
  return (
    <Container>
      <Rank now={rank} last={item.hourly.last} />
      <Track item={item} onClick={console.log} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  width: 356px;
  height: 64px;

  display: flex;
  align-items: center;
`;

export default ChartItem;
