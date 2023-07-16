import { useMemo } from "react";
import styled, { css } from "styled-components";

import { T7_1Light } from "@components/Typography";
import Rank from "@components/globals/Rank";
import Track from "@components/globals/Track";

import colors from "@constants/colors";

interface MusicListProps {
  rank: number;

  // TODO: Interface 작업 예정
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
}

const MusicList = ({ rank, item }: MusicListProps) => {
  const date = useMemo(() => {
    const stringDate = item.date.toString();

    return `${stringDate.slice(0, 2)}.${stringDate.slice(
      2,
      4
    )}.${stringDate.slice(4, 6)}`;
  }, [item.date]);

  return (
    <Wrapper $select={Math.random() > 0.5}>
      <RankLayout>
        <Rank now={rank} last={item.hourly.last} />
        <Track item={item} onClick={console.log} />
      </RankLayout>
      <TextLayout>
        <Text>{item.hourly.last}위</Text>
        <Text>
          20
          {date}
        </Text>
        <Text>{item.hourly.increase.toLocaleString()}회</Text>
      </TextLayout>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ $select: boolean }>`
  padding: 0px 15px 0px 20px;
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${(props) =>
    props.$select
      ? css`
          background-color: ${colors.blueGray200};
        `
      : css`
          background-color: rgb(0, 0, 0, 0);
        `};
`;

const RankLayout = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled(T7_1Light)`
  text-align: center;
  width: 70px;
  color: ${colors.gray700};
`;

const TextLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export default MusicList;
