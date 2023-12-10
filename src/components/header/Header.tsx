import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { css, keyframes } from "styled-components/macro";

import { ReactComponent as LogoSVG } from "@assets/svgs/logo.svg";

import ControlBar from "@components/globals/ControlBar";
import ArrowIcon from "@components/icons/Arrow";

import colors from "@constants/colors";

import { ipcRenderer } from "@utils/modules";

import Search from "./Search";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [easterEgg, setEasterEgg] = useState(1);

  if (typeof process !== "undefined" && process.platform === "darwin") {
    return (
      <Container>
        <ContainerBox>
          {location.pathname !== "/player" && (
            <>
              <Navigator style={{ marginLeft: "84px" }}>
                <Arrow
                  direction="left"
                  disabled={window.history.state.idx === 0}
                  onClick={() => {
                    if (window.history.state.idx !== 0) navigate(-1);
                  }}
                />
                <Arrow
                  direction="right"
                  disabled={
                    window.history.length - 1 === window.history.state.idx
                  }
                  onClick={() => {
                    if (window.history.length - 1 !== window.history.state.idx)
                      navigate(1);
                  }}
                />
              </Navigator>

              <Search />
            </>
          )}
        </ContainerBox>

        <ContainerBox $right>
          <LogoContainer style={{ marginRight: "10px" }}>
            <Logo
              onClick={() => {
                if (ipcRenderer && location.pathname == "/player") {
                  ipcRenderer.send("mode:default");
                }

                navigate("/");

                setEasterEgg((prev) => {
                  if (prev > 3) return 1;

                  return prev + 0.1;
                });
              }}
              style={{
                transform: `scale(${easterEgg > 2 ? easterEgg - 1 : 1})`,
              }}
              $running={easterEgg > 2}
            />
          </LogoContainer>
          <ControlBar />
        </ContainerBox>
      </Container>
    );
  }

  return (
    <Container>
      <LogoContainer>
        <Logo
          onClick={() => {
            if (ipcRenderer && location.pathname == "/player") {
              ipcRenderer.send("mode:default");
            }

            navigate("/");

            setEasterEgg((prev) => {
              if (prev > 3) return 1;

              return prev + 0.1;
            });
          }}
          style={{
            transform: `scale(${easterEgg > 2 ? easterEgg - 1 : 1})`,
          }}
          $running={easterEgg > 2}
        />
      </LogoContainer>

      {location.pathname !== "/player" && (
        <>
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
        </>
      )}

      <ControlBar />
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

const LogoEasterEgg = keyframes`
  0% {
    transform: scale(1) rotate(0deg);
    filter: hue-rotate(0deg);
  }

  50% {
    transform: scale(3) rotate(180deg);
    filter: hue-rotate(180deg);
  }

  100% {
    transform: scale(1) rotate(360deg);
    filter: hue-rotate(360deg);
  }
`;

const Logo = styled(LogoSVG)<{ $running: boolean }>`
  ${({ $running }) =>
    $running &&
    css`
      animation: ${LogoEasterEgg} 1s linear infinite;
    `}
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

const ContainerBox = styled.div<{ $right?: boolean }>`
  display: flex;
  align-items: center;

  ${({ $right }) =>
    $right &&
    css`
      margin-left: auto;
    `}
`;

export default Header;
