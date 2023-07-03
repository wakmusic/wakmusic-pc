import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

import { ReactComponent as CloseSVG } from "@assets/icons/ic_24_close.svg";
import { ReactComponent as LeastSVG } from "@assets/icons/ic_24_least.svg";
import { ReactComponent as MaxSVG } from "@assets/icons/ic_24_max.svg";
import { ReactComponent as Logo } from "@assets/svgs/logo.svg";

import ArrowIcon from "@components/icons/Arrow";

import colors from "@constants/colors";

import Search from "./Search";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <Container>
      <LogoContainer>
        <Logo
          onClick={() => {
            navigate("/");
          }}
        />
      </LogoContainer>

      <Navigator>
        <Arrow
          direction="left"
          disabled={window.history.state.idx === 0}
          onClick={() => {
            if (window.history.state.idx !== 0) navigate(-1);
          }}
        />
        <Arrow
          direction="right"
          disabled={window.history.length - 1 === window.history.state.idx}
          onClick={() => {
            if (window.history.length - 1 !== window.history.state.idx)
              navigate(1);
          }}
        />
      </Navigator>

      <Search />

      {window.ipcRenderer && (
        <ControlBar>
          <Least
            onClick={() => {
              window.ipcRenderer?.send("window:least");
            }}
          />
          <Max
            onClick={() => {
              window.ipcRenderer?.send("window:max");
            }}
          />
          <Close
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
  height: 30px;

  background-color: ${colors.gray900};

  display: flex;
  align-items: center;

  -webkit-app-region: drag;

  & > * {
    -webkit-app-region: no-drag;
  }
`;

const LogoContainer = styled.div`
  margin-left: 16px;

  display: flex;
  align-items: center;

  cursor: pointer;
`;

const Navigator = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  margin-left: 48px;
  margin-right: 16px;
`;

const Arrow = styled(ArrowIcon)<{ disabled: boolean }>`
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
`;

const Max = styled(MaxSVG)`
  cursor: pointer;
`;

const Close = styled(CloseSVG)`
  cursor: pointer;
`;

export default Header;
