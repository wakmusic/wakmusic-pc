import { ReactNode } from "react";
import styled, { css, keyframes } from "styled-components/macro";

import { T4Bold } from "@components/Typography/Bold";

import colors from "@constants/colors";

interface MusicControllerBarProps {
  children: ReactNode;
  count: number;
  popdown: boolean;
}

const MusicControllerBar = ({
  children,
  count,
  popdown,
}: MusicControllerBarProps) => {
  return (
    <Wrapper $popdown={popdown}>
      <ButtonContainer>
        <Count $isWidth={count >= 100}>
          <T4Bold color={colors.sub}>{count}</T4Bold>
        </Count>
        {children}
      </ButtonContainer>
    </Wrapper>
  );
};

const Popup = keyframes`
  0% {
    bottom: -70px;
  }

  75% {
    bottom: 50px;
  }

  100% {
    bottom: 40px;
  }
`;

const Popdown = keyframes`
  0% {
    bottom: 40px;
  }

  25% {
    bottom: 50px;
  }

  100% {
    bottom: -70px;
  }
`;

const Wrapper = styled.div<{ $popdown: boolean }>`
  position: fixed;
  width: fit-content;
  height: 60px;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 40px;

  animation: ${({ $popdown }) => ($popdown ? Popdown : Popup)} 0.25s ease-out
    forwards;
`;

const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 0px 24px;
  height: 100%;
  background: ${colors.sub};
  border-radius: 12px;
`;

const Count = styled.div<{ $isWidth: boolean }>`
  border-radius: 100px;
  position: absolute;
  top: -15px;
  height: 30px;
  background-color: ${colors.white};
  box-shadow: drop-shadow(3.75px 3.75px 3.75px rgba(8, 15, 52, 0.04));
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.$isWidth
      ? css`
          width: 50px;
          left: -12px;
        `
      : css`
          width: 30px;
          left: 8px;
        `}
`;

export default MusicControllerBar;
