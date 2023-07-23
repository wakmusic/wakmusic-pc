import styled from "styled-components";

import { ReactComponent as ReduceSVG } from "@assets/icons/ic_20_reduce.svg";

import ControlBar from "@components/globals/ControlBar";

import { useToggleVisualModeState } from "@hooks/player";

import IconButton from "../../globals/IconButton";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const toggleVisualModeState = useToggleVisualModeState();

  return (
    <Container>
      <ReduceContainer>
        <IconButton icon={ReduceSVG} onClick={toggleVisualModeState} />
      </ReduceContainer>

      <ControlBar />
    </Container>
  );
};

const Container = styled.div`
  height: 38px;

  display: flex;
  align-items: center;

  -webkit-app-region: drag;

  & > * {
    -webkit-app-region: no-drag;
  }
`;

const ReduceContainer = styled.div`
  margin-left: 10px;

  display: flex;
  align-items: center;
`;

export default Header;
