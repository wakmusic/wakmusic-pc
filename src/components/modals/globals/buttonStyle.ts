import styled, { css } from "styled-components";

export const ButtonContainer = styled.div`
  margin-top: auto;

  width: 440px;

  display: flex;
`;

export const Button = styled.div<{
  color: string;
  $big?: boolean;
  disabled?: boolean;
}>`
  width: ${({ $big }) => ($big ? "100%" : "50%")};
  height: 56px;

  background: ${({ color }) => color};

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  ${({ disabled }) =>
    disabled &&
    css`
      background: #d8dce4;
      cursor: not-allowed;
    `}
`;
