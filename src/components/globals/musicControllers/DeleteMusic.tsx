import styled from "styled-components";

import { ReactComponent as Delete } from "@assets/icons/ic_24_delete.svg";

import { T7Medium } from "@components/Typography/Medium";

import colors from "@constants/colors";

interface DeleteMusicProps {}

const DeleteMusic = ({}: DeleteMusicProps) => {
  return (
    <Wrapper>
      <Delete />
      <T7Medium color={colors.blueGray25}>재생목록추가</T7Medium>
    </Wrapper>
  );
};

export const Wrapper = styled.button`
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
