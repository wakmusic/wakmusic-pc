import { ReactNode } from "react";
import styled from "styled-components";

import { T4Bold } from "@components/Typography";

import colors from "@constants/colors";

interface MusicControllerProps {
  count: number;
  children: ReactNode;
}

const MusicControllerBase = ({ children, count }: MusicControllerProps) => {
  return (
    <Wrapper>
      <Container>
        <Count>
          <T4Bold>{count}</T4Bold>
        </Count>
        {children}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  padding: 0px 20px;
  width: fit-content;
  height: 60px;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 40px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  padding: 0px 20px;
  height: 100%;
  background: ${colors.sub};
  border-radius: 12px;
`;

const Count = styled.div`
  border-radius: 100px;
  position: absolute;
  left: 8px;
  top: -15px;
  padding: 0px 11px;
  height: 30px;
  background-color: ${colors.white};
  box-shadow: drop-shadow(3.75px 3.75px 3.75px rgba(8, 15, 52, 0.04));
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default MusicControllerBase;
