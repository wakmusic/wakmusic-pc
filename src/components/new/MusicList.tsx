import styled, { css } from "styled-components";

import { T7_1Light } from "@components/Typography";
import Track from "@components/globals/Track";

import colors from "@constants/colors";

interface MusicListProps {
  item: any;
}

const MusicList = ({ item }: MusicListProps) => {
  return (
    <Wrapper $select={false}>
      <RankLayout>
        <Track item={item} />
      </RankLayout>
      <TextLayout>
        <Text>1위</Text>
        <Text>2022.05.11</Text>
        <Text>19,300회</Text>
      </TextLayout>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ $select: boolean }>`
  padding: 0px 20px;
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
