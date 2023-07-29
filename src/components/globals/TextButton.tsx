import styled, { css } from "styled-components";

import { T6Medium } from "@components/Typography";

import colors from "@constants/colors";

type TextType = {
  default: string;
  activated: string;
};

interface TextButtonProps {
  text: TextType;
  activated: boolean;
  onClick?: () => void;
}

const TextButton = ({ text, activated, onClick }: TextButtonProps) => {
  return (
    <Container $activated={activated} onClick={onClick}>
      <T6Medium color={colors.blueGray400}>
        {activated ? text.activated : text.default}
      </T6Medium>
    </Container>
  );
};

const Container = styled.button<{ $activated: boolean }>`
  padding: 4px 14px;

  border: 1px solid ${colors.blueGray200};
  border-radius: 5px;

  height: 28px;

  background-color: rgba(0, 0, 0, 0);

  &:hover {
    cursor: pointer;
  }

  ${({ $activated }) =>
    $activated
      ? css`
          border-color: ${colors.point};
        `
      : css`
          border-color: ${colors.blueGray200};
        `}
`;

export default TextButton;
