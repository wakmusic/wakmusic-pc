import styled from "styled-components";

import colors from "@constants/colors";

interface BaseInputProps {
  value: string;
  onChange: (value: string) => void;

  borderColor?: string;
  placeholder?: string;
}

const BaseInput = ({
  value,
  onChange,
  borderColor,
  placeholder,
}: BaseInputProps) => {
  return (
    <FormInput
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      $borderColor={borderColor}
    />
  );
};

const FormInput = styled.input<{ $borderColor: string | undefined }>`
  width: 100%;

  border: none;
  outline: none;

  padding: 12px 0;
  padding-right: 58px;

  border-bottom: 1px solid
    ${({ $borderColor }) => $borderColor ?? colors.blueGray300};

  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;

  color: ${colors.gray700};
  background: transparent;

  &::placeholder {
    color: ${colors.blueGray400};
  }
`;

export default BaseInput;
