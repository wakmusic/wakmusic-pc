import styled from "styled-components";

import { ReactComponent as Add } from "@assets/icons/ic_24_playadd_25.svg";

import { T7Medium } from "@components/Typography/Medium";

import colors from "@constants/colors";

interface addMusicProps {}

const AddMusic = ({}: addMusicProps) => {
  return (
    <Wrapper>
      <Add />
      <ControllText>노래담기</ControllText>
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

export default AddMusic;
