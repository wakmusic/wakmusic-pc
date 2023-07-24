import styled from "styled-components";

import { T6Medium } from "@components/Typography";

import colors from "@constants/colors";

interface InputCancelButtonProps {
  onClick: () => void;
}

const InputCancelButton = ({ onClick }: InputCancelButtonProps) => {
  return (
    <Container onClick={onClick}>
      <T6Medium color={colors.blueGray400}>취소</T6Medium>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;

  top: 14px;
  right: 0;

  display: flex;
  width: 52px;
  height: 28px;
  justify-content: center;
  align-items: center;

  border: 1px solid ${colors.blueGray200};
  border-radius: 5px;

  cursor: pointer;
`;

export default InputCancelButton;
