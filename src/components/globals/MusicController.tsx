import styled from "styled-components";

import { T4Bold } from "@components/Typography";

import colors from "@constants/colors";

interface MusicControllerProps {}

const MusicController = ({}: MusicControllerProps) => {
  return (
    <Wrapper>
      <Container>
        <Count>
          <T4Bold>1</T4Bold>
        </Count>
        <Button></Button>
        <Button></Button>
        <Button></Button>
        <Button></Button>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  width: 310px;
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
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: ${colors.sub};
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

const Button = styled.button`
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

export default MusicController;
