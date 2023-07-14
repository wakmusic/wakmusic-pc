import styled from "styled-components";

import { ReactComponent as AddPL } from "@assets/icons/ic_24_play_add.svg";

import { T7Medium } from "@components/Typography/Medium";

import colors from "@constants/colors";

interface AddPlaylistProps {}

const AddPlaylist = ({}: AddPlaylistProps) => {
  return (
    <Wrapper>
      <AddPL />
      <ControllText>재생목록추가</ControllText>
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

const ControllText = styled(T7Medium)`
  color: ${colors.blueGray25};
`;

export default AddPlaylist;
