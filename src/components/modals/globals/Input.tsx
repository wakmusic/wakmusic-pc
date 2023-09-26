import { useMemo } from "react";
import styled from "styled-components/macro";

import { T7Light } from "@components/Typography";

import colors from "@constants/colors";

import BaseInput from "../globals/BaseInput";
import InputCancelButton from "../globals/InputCancelButton";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  onCancel?: () => void;
  onEnter?: () => void;

  helpTextOk?: string;
  helpTextError?: string;
  placeholder?: string;
  maxLength?: number;
}

const Input = ({
  value,
  onChange,
  onCancel,
  onEnter,
  helpTextOk,
  helpTextError,
  placeholder,
  maxLength = 12,
}: InputProps) => {
  const enable = useMemo(() => {
    return value.length > 0 && value.length <= 12;
  }, [value]);

  const color = useMemo(() => {
    if (value === "158") {
      return "#8a2be2";
    }

    if (value.length === 0) {
      return colors.blueGray500;
    }

    if (value.length > maxLength) {
      return colors.up;
    }

    return colors.down;
  }, [maxLength, value]);

  const helpText = useMemo(() => {
    if (value === "158") {
      return "너무 짧은 것 같아요";
    }

    if (value.length > 0 && value.length <= maxLength) {
      return helpTextOk ?? "사용할 수 있는 제목입니다.";
    }

    if (value.length > maxLength) {
      return helpTextError ?? "글자 수를 초과하였습니다.";
    }

    return "";
  }, [helpTextError, helpTextOk, maxLength, value]);

  return (
    <Container>
      <BaseInput
        value={value}
        onChange={onChange}
        borderColor={color}
        placeholder={placeholder ?? "리스트 명을 입력해주세요."}
        onKeyDown={(e) => {
          if (enable && e.key === "Enter") onEnter?.();
        }}
      />

      {value && (
        <InputCancelButton
          onClick={() => {
            if (onCancel) onCancel();
            onChange("");
          }}
        />
      )}

      <Texts>
        <HelpText color={color}>{helpText}</HelpText>
        <LengthContainer>
          <NowLength color={color}>{value.length}자</NowLength>
          <MaxLength> / {maxLength}자</MaxLength>
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
