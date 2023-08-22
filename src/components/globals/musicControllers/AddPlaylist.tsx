import styled from "styled-components/macro";

import { ReactComponent as AddPL } from "@assets/icons/ic_24_play_add.svg";

import { T7Light } from "@components/Typography";

import colors from "@constants/colors";

interface AddPlaylistProps {
  onClick?: () => void;
}

const AddPlaylist = ({ onClick }: AddPlaylistProps) => {
  return (
    <Wrapper
      onClick={() => {
        onClick && onClick();
      }}
    >
      <AddPL />
      <T7Light color={colors.blueGray25}>재생목록추가</T7Light>
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

export default AddPlaylist;
