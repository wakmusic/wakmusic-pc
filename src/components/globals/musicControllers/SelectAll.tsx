import styled from "styled-components/macro";

import { ReactComponent as CheckOff } from "@assets/icons/ic_24_Check_off.svg";
import { ReactComponent as Checkon } from "@assets/icons/ic_24_Check_on.svg";

import { T7Medium } from "@components/Typography/Medium";

import colors from "@constants/colors";

interface SelectAllProps {
  isSelect: boolean;
}

const SelectAll = ({ isSelect }: SelectAllProps) => {
  return (
    <Wrapper>
      {isSelect ? <Checkon /> : <CheckOff />}
      <T7Medium color={colors.blueGray25}>
        {isSelect ? "선택취소" : "전체선택"}
      </T7Medium>
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

export default SelectAll;
