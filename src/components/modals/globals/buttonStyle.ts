import styled from "styled-components";

export const ButtonContainer = styled.div`
  margin-top: auto;

  width: 440px;

  display: flex;
`;

export const Button = styled.div<{ color: string; $big?: boolean }>`
  width: ${({ $big }) => ($big ? "100%" : "50%")};
  height: 56px;

  background: ${({ color }) => color};

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;
