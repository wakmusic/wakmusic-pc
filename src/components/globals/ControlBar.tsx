import styled from "styled-components";

import { ReactComponent as CloseSVG } from "@assets/icons/ic_20_close.svg";
import { ReactComponent as LeastSVG } from "@assets/icons/ic_20_least.svg";
import { ReactComponent as MaxSVG } from "@assets/icons/ic_20_max.svg";

import SimpleIconButton from "./SimpleIconButton";

interface ControlBarProps {}

const ControlBar = ({}: ControlBarProps) => {
  if (!window.ipcRenderer) {
    return null;
  }

  return (
    <Container>
      <SimpleIconButton
        icon={LeastSVG}
        onClick={() => {
          window.ipcRenderer?.send("window:least");
        }}
      />
      <SimpleIconButton
        icon={MaxSVG}
        onClick={() => {
          window.ipcRenderer?.send("window:max");
        }}
      />
      <SimpleIconButton
        icon={CloseSVG}
        onClick={() => {
          window.ipcRenderer?.send("window:close");
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  margin-left: auto;
  margin-right: 10px;

  display: flex;
  align-items: center;

  gap: 10px;
`;

export default ControlBar;
