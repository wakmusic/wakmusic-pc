import styled from "styled-components/macro";

import BaseInput from "../globals/BaseInput";
import HelpText from "../globals/HelpText";
import InputCancelButton from "../globals/InputCancelButton";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
}

const Input = ({ value, onChange }: InputProps) => {
  return (
    <Container>
      <BaseInput
        value={value}
        onChange={onChange}
        placeholder="코드를 입력해주세요."
      />

      {value && (
        <InputCancelButton
          onClick={() => {
            onChange("");
          }}
        />
      )}

      <HelpText />
    </Container>
  );
};

const Container = styled.div`
  width: 380px;

  position: relative;
`;

export default Input;
