import styled from "styled-components/macro";

import { ReactComponent as Add } from "@assets/icons/ic_24_playadd_25.svg";

import { T7Light } from "@components/Typography";

import colors from "@constants/colors";

interface AddMusicProps {
  onClick?: () => void;
}

const AddMusic = ({ onClick }: AddMusicProps) => {
  return (
    <Wrapper
      onClick={() => {
        onClick && onClick();
      }}
    >
      <Add />
      <T7Light color={colors.blueGray25}>노래담기</T7Light>
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

export default AddMusic;
