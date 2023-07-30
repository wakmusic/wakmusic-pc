import styled from "styled-components/macro";

import { ReactComponent as Add } from "@assets/icons/ic_24_playadd_25.svg";

import { T7Medium } from "@components/Typography/Medium";

import colors from "@constants/colors";

interface AddMusicProps {}

const AddMusic = ({}: AddMusicProps) => {
  return (
    <Wrapper>
      <Add />
      <T7Medium color={colors.blueGray25}>노래담기</T7Medium>
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
