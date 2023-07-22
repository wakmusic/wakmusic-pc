import styled from "styled-components";

import { ReactComponent as CloseSVG } from "@assets/icons/ic_20_close.svg";
import { ReactComponent as LeastSVG } from "@assets/icons/ic_20_least.svg";
import { ReactComponent as MaxSVG } from "@assets/icons/ic_20_max.svg";
import { ReactComponent as ReduceSVG } from "@assets/icons/ic_20_reduce.svg";

import { useToggleVisualModeState } from "@hooks/player";

import IconButton from "../IconButton";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const toggleVisualModeState = useToggleVisualModeState();

  return (
    <Container>
      <ReduceContainer>
        <IconButton icon={ReduceSVG} onClick={toggleVisualModeState} />
      </ReduceContainer>

      {window.ipcRenderer && (
        <ControlBar>
          <IconButton
            icon={LeastSVG}
            onClick={() => {
              window.ipcRenderer?.send("window:least");
            }}
          />
          <IconButton
            icon={MaxSVG}
            onClick={() => {
              window.ipcRenderer?.send("window:max");
            }}
          />
          <IconButton
            icon={CloseSVG}
            onClick={() => {
              window.ipcRenderer?.send("window:close");
            }}
          />
        </ControlBar>
      )}
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

const ControlBar = styled.div`
  margin-left: auto;
  margin-right: 10px;

  display: flex;
  align-items: center;

  gap: 10px;
`;

export default Header;
