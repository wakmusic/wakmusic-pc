import { useMemo } from "react";
import styled from "styled-components";

import { T7Light } from "@components/Typography";

import colors from "@constants/colors";

import BaseInput from "../globals/BaseInput";
import InputCancelButton from "../globals/InputCancelButton";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
}

const Input = ({ value, onChange }: InputProps) => {
  const color = useMemo(() => {
    if (value.length === 0) {
      return colors.blueGray500;
    }

    if (value.length > 12) {
      return colors.up;
    }

    return colors.down;
  }, [value]);

  const helpText = useMemo(() => {
    if (value.length > 0 && value.length <= 12) {
      return "사용할 수 있는 제목입니다.";
    }

    if (value.length > 12) {
      return "글자 수를 초과하였습니다.";
    }

    return "";
  }, [value]);

  return (
    <Container>
      <BaseInput
        value={value}
        onChange={onChange}
        borderColor={color}
        placeholder="리스트 명을 입력해주세요."
      />

      {value && (
        <InputCancelButton
          onClick={() => {
            onChange("");
          }}
        />
      )}

      <Texts>
        <HelpText color={color}>{helpText}</HelpText>
        <LengthContainer>
          <NowLength color={color}>{value.length}자</NowLength>
          <MaxLength> / 12자</MaxLength>
        </LengthContainer>
      </Texts>
    </Container>
  );
};

const Container = styled.div`
  width: 380px;

  position: relative;
`;

const Texts = styled.div`
  margin-top: 4px;

  display: flex;

  height: 18px;
`;

const HelpText = styled(T7Light)``;

const LengthContainer = styled.div`
  margin-left: auto;

  display: flex;
`;

const NowLength = styled(T7Light)``;

const MaxLength = styled(T7Light)`
  color: ${colors.blueGray400};
`;

export default Input;
