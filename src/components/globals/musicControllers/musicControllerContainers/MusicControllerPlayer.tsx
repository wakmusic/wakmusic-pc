import { ReactNode } from "react";
import styled from "styled-components/macro";

import { T4Bold } from "@components/Typography/Bold";

import colors from "@constants/colors";

interface MusicControllerPlayerProps {
  children: ReactNode;
  count: number;
  popdown: boolean;
}

const MusicControllerPlayer = ({
  count,
  children,
  popdown,
}: MusicControllerPlayerProps) => {
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

const Wrapper = styled.div<{ $popdown: boolean }>`
  position: fixed;
  bottom: ${({ $popdown }) => ($popdown ? "-75px" : "0px")};

  transition: bottom 0.25s ease-out 0s;
`;

const ButtonContainer = styled.div`
  width: 290px;
  height: 60px;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 10px;

  background: ${colors.sub};
`;

const Count = styled.div<{ $isWidth: boolean }>`
  height: 30px;
  width: ${({ $isWidth }) => ($isWidth ? 50 : 30)}px;

  position: absolute;
  left: 16px;
  top: -15px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 100px;
  box-shadow: drop-shadow(3.75px 3.75px 3.75px rgba(8, 15, 52, 0.04));
  background-color: ${colors.white};
`;

export default MusicControllerPlayer;
