import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

import { ReactComponent as ArrowLeftSVG } from "@assets/icons/ic_16_arrow_left.svg";
import { ReactComponent as ArrowRightSVG } from "@assets/icons/ic_16_arrow_right.svg";
import { ReactComponent as CloseSVG } from "@assets/icons/ic_24_close.svg";
import { ReactComponent as LeastSVG } from "@assets/icons/ic_24_least.svg";
import { ReactComponent as MaxSVG } from "@assets/icons/ic_24_max.svg";
import { ReactComponent as Logo } from "@assets/svgs/logo.svg";

import colors from "@constants/colors";

import Search from "./Search";

const { ipcRenderer } = window.require("electron");

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const navigate = useNavigate();

  window.history.state.idx === 0;

  return (
    <Container>
      <LogoContainer>
        <Logo
          width="100%"
          height={28}
          onClick={() => {
            navigate("/");
          }}
        />
      </LogoContainer>

      <Navigator>
        <ArrowLeft
          disabled={window.history.state.idx === 0}
          onClick={() => {
            if (window.history.state.idx !== 0) navigate(-1);
          }}
        />
        <ArrowRight
          disabled={window.history.length - 1 === window.history.state.idx}
          onClick={() => {
            if (window.history.length - 1 !== window.history.state.idx)
              navigate(1);
          }}
        />
      </Navigator>

      <Search />

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
  height: 37px;

  background-color: ${colors.gray900};

  display: flex;
  align-items: center;

  -webkit-app-region: drag;

  & > * {
    -webkit-app-region: no-drag;
  }
`;

const LogoContainer = styled.div`
  margin-left: 20px;

  display: flex;
  align-items: center;

  cursor: pointer;
`;

const Navigator = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  margin-left: 40px;
  margin-right: 16px;
`;

const ArrowLeft = styled(ArrowLeftSVG)<{ disabled: boolean }>`
  width: 20px;
  height: 20px;

  ${({ disabled }) =>
    disabled
      ? css`
          cursor: auto;
          color: ${colors.gray500};
        `
      : css`
          cursor: pointer;
          color: ${colors.gray400};
        `}
`;

const ArrowRight = styled(ArrowRightSVG)<{ disabled: boolean }>`
  width: 20px;
  height: 20px;

  ${({ disabled }) =>
    disabled
      ? css`
          cursor: auto;
          color: ${colors.gray500};
        `
      : css`
          cursor: pointer;
          color: ${colors.gray400};
        `}
`;

const ControlBar = styled.div`
  margin-left: auto;
  margin-right: 8px;

  display: flex;
  align-items: center;

  gap: 8px;
`;

const Least = styled(LeastSVG)`
  cursor: pointer;

  width: 20px;
  height: 20px;
`;

const Max = styled(MaxSVG)`
  cursor: pointer;

  width: 20px;
  height: 20px;
`;

const Close = styled(CloseSVG)`
  cursor: pointer;

  width: 20px;
  height: 20px;
`;

export default Header;
