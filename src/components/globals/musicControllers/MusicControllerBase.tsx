import { ReactNode } from "react";
import styled from "styled-components";

import checkOff from "@assets/icons/ic_24_Check_off.svg";
import checkOn from "@assets/icons/ic_24_Check_on.svg";

import { T4Bold, T7Medium } from "@components/Typography";

import colors from "@constants/colors";

interface MusicControllerProps {
  children: ReactNode;
}

const MusicControllerBase = ({ children }: MusicControllerProps) => {
  return (
    <Wrapper>
      <Container>
        <Count>
          <T4Bold>1</T4Bold>
        </Count>
        <ControllerButton>
          <img src={checkOff} />
          <ControllText>전체선택</ControllText>
        </ControllerButton>
        {children}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  padding: 0px 20px;
  width: max-content;
  height: 60px;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 40px;
  background: ${colors.sub};
  border-radius: 12px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  width: 100%;
  height: 100%;
`;

const Count = styled.div`
  border-radius: 100px;
  position: absolute;
  left: 8px;
  top: -15px;
  width: 30px;
  height: 30px;
  background-color: ${colors.white};
  box-shadow: drop-shadow(3.75px 3.75px 3.75px rgba(8, 15, 52, 0.04));
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ControllerButton = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  width: 60px;
  height: 52px;
`;

const ControllText = styled(T7Medium)`
  color: ${colors.blueGray25};
`;

export default MusicControllerBase;
