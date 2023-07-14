import styled from "styled-components";

import { ReactComponent as CheckOff } from "@assets/icons/ic_24_Check_off.svg";
import { ReactComponent as Checkon } from "@assets/icons/ic_24_Check_on.svg";

import { T7Medium } from "@components/Typography/Medium";

import colors from "@constants/colors";

interface selectAllProps {
  isSelect: boolean;
}

const SelectAll = ({ isSelect }: selectAllProps) => {
  return (
    <Wrapper>
      {isSelect ? <Checkon /> : <CheckOff />}
      <ControllText>{isSelect ? "선택취소" : "전체선택"}</ControllText>
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

export default SelectAll;
