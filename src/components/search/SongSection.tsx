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
      <Text left={586}>
        20{item.date.toString().slice(0, 2)}.{item.date.toString().slice(2, 4)}.
        {item.date.toString().slice(4, 6)}
      </Text>
      <Text left={664}>{count}</Text>
    </Container>
  );
};

const Container = styled.div<{
  background?: string;
}>`
  position: relative;

  width: 754px;
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

const Text = styled(T7Light)<{
  left: number;
}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  width: 70px;
  height: 18px;
  flex-shrink: 0;

  color: ${colors.gray700};
  text-align: center;

  margin-left: ${(p) => p.left}px;
`;

export default SongSection;
