import styled from "styled-components";

import { ReactComponent as PlaySVG } from "@assets/icons/ic_30_play_point.svg";

import Rank from "@components/globals/Rank";
import Track, { Thumbnail } from "@components/globals/Track";

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
      <Track item={item} />
      <PlayIcon />
    </Container>
  );
};

const PlayIcon = styled(PlaySVG)`
  display: none;
`;

const Container = styled.div`
  position: relative;

  width: 356px;
  height: 64px;

  display: flex;
  align-items: center;

  cursor: pointer;

  &:hover ${Thumbnail} {
    filter: brightness(0.4);
  }

  &:hover ${PlayIcon} {
    display: block;

    position: absolute;
    left: 63px;
    top: 17px;
  }
`;

export default ChartItem;
