import styled from "styled-components/macro";

import { ReactComponent as Delete } from "@assets/icons/ic_24_delete.svg";

import { T7Light } from "@components/Typography";

import colors from "@constants/colors";

interface DeleteMusicProps {
  onClick?: () => void;
}

const DeleteMusic = ({ onClick }: DeleteMusicProps) => {
  return (
    <Wrapper
      onClick={() => {
        onClick && onClick();
      }}
    >
      <Delete />
      <T7Light color={colors.blueGray25}>삭제</T7Light>
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

export default DeleteMusic;
