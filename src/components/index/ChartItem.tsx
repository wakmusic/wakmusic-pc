import styled from "styled-components/macro";

import Rank from "@components/globals/Rank";
import Track from "@components/globals/Track";

import { Song } from "@templates/song";

interface ChartItemProps {
  rank: number;
  item?: Song;

  isLoading?: boolean;
}

const ChartItem = ({ rank, item, isLoading }: ChartItemProps) => {
  return (
    <Container>
      <Rank now={rank} last={item && item.chart.last} isLoading={isLoading} />
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
