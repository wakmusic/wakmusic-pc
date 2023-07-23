import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

import { ReactComponent as Logo } from "@assets/svgs/logo.svg";

import ControlBar from "@components/globals/ControlBar";
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

      {window.ipcRenderer && <ControlBar />}
    </Container>
  );
};

const Container = styled.div`
  height: 38px;

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

  margin-left: 66px;
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

export default Header;
