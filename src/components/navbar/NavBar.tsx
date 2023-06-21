import styled from "styled-components";

import { ReactComponent as Close } from "@assets/icons/ic_24_close.svg";
import { ReactComponent as Least } from "@assets/icons/ic_24_least.svg";
import { ReactComponent as Max } from "@assets/icons/ic_24_max.svg";
import { ReactComponent as LogoSVG } from "@assets/svgs/logo.svg";

import colors from "@constants/colors";

const { ipcRenderer } = window.require("electron");

interface NavBarProps {}

const NavBar = ({}: NavBarProps) => {
  return (
    <Container>
      <Logo />
      <ControlBar>
        <Least
          onClick={() => {
            ipcRenderer.send("window:least");
          }}
        />
        <Max
          onClick={() => {
            ipcRenderer.send("window:max");
          }}
        />
        <Close
          onClick={() => {
            ipcRenderer.send("window:close");
          }}
        />
      </ControlBar>
    </Container>
  );
};

const Container = styled.div`
  height: 30px;

  background-color: ${colors.gray900};

  display: flex;
  align-items: center;

  -webkit-app-region: drag;

  & > * {
    -webkit-app-region: no-drag;
  }
`;

const Logo = styled(LogoSVG)`
  margin-left: 16px;
`;

const ControlBar = styled.div`
  margin-left: auto;
  margin-right: 8px;

  display: flex;
  align-items: center;

  gap: 8px;
`;

export default NavBar;
