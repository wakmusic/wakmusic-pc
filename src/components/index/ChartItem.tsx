import styled from "styled-components/macro";

import Rank from "@components/globals/Rank";
import Track from "@components/globals/Track";

interface ChartItemProps {
  rank: number;

  // TODO: Interface 작업 예정
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any | null;

  isLoading?: boolean;
}

const ChartItem = ({ rank, item, isLoading }: ChartItemProps) => {
  return (
    <Container>
      <Rank now={rank} last={item && item.hourly.last} isLoading={isLoading} />
      <Track item={item} maxWidth={220} isLoading={isLoading} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  width: 356px;
  height: 64px;

  display: flex;
  align-items: center;
  gap: 8px;
`;

export default ChartItem;
