import styled from "styled-components/macro";

import { ReactComponent as Play } from "@assets/icons/ic_24_play_25.svg";

import { T7Light } from "@components/Typography";

import colors from "@constants/colors";

interface PlayMusicProps {
  onClick?: () => void;
}

const PlayMusic = ({ onClick }: PlayMusicProps) => {
  return (
    <Wrapper
      onClick={() => {
        onClick && onClick();
      }}
    >
      <Play />
      <T7Light color={colors.blueGray25}>재생</T7Light>
    </Wrapper>
  );
};

const Wrapper = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  width: 60px;
  height: 52px;
`;

export default PlayMusic;
