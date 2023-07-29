import { ReactNode } from "react";
import styled, { css } from "styled-components";

import { T4Bold } from "@components/Typography/Bold";

import colors from "@constants/colors";

interface MusicControllerPlayerProps {
  children: ReactNode;
  count: number;
}

const MusicControllerPlayer = ({
  count,
  children,
}: MusicControllerPlayerProps) => {
  return (
    <Wrapper>
      <ButtonContainer>
        <Count $isWidth={count >= 100}>
          <T4Bold color={colors.sub}>{count}</T4Bold>
        </Count>
        {children}
      </ButtonContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  width: fit-content;
  height: fit-content;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 0px;
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
  border-radius: 100px;
  position: absolute;
  left: 16px;
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
        `
      : css`
          width: 30px;
        `}
`;

export default MusicControllerPlayer;
