import { Song } from "@templates/search";
import { useState } from "react";
import styled from "styled-components";

import { T7Light } from "@components/Typography";
import Track from "@components/globals/Track";

import colors from "@constants/colors";

interface SongSectionProps {
  item: Song;
  count: string;
}

const SongSection = ({ item, count }: SongSectionProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  return (
    <Container
      onClick={() => setIsSelected(!isSelected)}
      background={isSelected ? colors.blueGray200 : undefined}
    >
      <Track item={item} />
      <TextGroup>
        <Text>
          20{item.date.toString().slice(0, 2)}.
          {item.date.toString().slice(2, 4)}.{item.date.toString().slice(4, 6)}
        </Text>
        <Text>{(item.total.views?.toLocaleString() ?? "-") + "회"}</Text>
        <Text>{count}</Text>
      </TextGroup>
    </Container>
  );
};

const Container = styled.div<{
  background?: string;
}>`
  position: relative;

  width: 100%;
  height: 64px;
  flex-shrink: 0;

  background-color: ${(p) => p.background ?? null};
  cursor: pointer;

  & div:nth-child(1) {
    position: relative;
    top: 50%;
    transform: translateY(-50%);

    margin-left: 20px;
  }
`;

const TextGroup = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 508px;

  display: grid;
  grid-template-columns: repeat(3, 70px);
  gap: 8px;

  width: 226px;
  height: 18px;
`;

const Text = styled(T7Light)`
  position: relative;

  width: 70px;
  height: 18px;
  flex-shrink: 0;

  color: ${colors.gray700};
  text-align: center;
`;

export default SongSection;
