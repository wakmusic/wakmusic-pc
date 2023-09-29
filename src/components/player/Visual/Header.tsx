import { useMemo } from "react";
import styled, { css } from "styled-components/macro";

import { ReactComponent as ReduceSVG } from "@assets/icons/ic_20_reduce.svg";

import ControlBar from "@components/globals/ControlBar";
import SimpleIconButton from "@components/globals/SimpleIconButton";

import { useToggleVisualModeState } from "@hooks/player";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const toggleVisualModeState = useToggleVisualModeState();

  const isMac = useMemo(() => process.platform === "darwin", []);

  return (
    <Container $alignRight={isMac}>
      <ReduceContainer>
        <SimpleIconButton icon={ReduceSVG} onClick={toggleVisualModeState} />
      </ReduceContainer>

      {!isMac && <ControlBar isVisualMode />}
    </Container>
  );
};

const Container = styled.div<{ $alignRight: boolean }>`
  height: 38px;

  position: relative;
  z-index: 1001;

  display: flex;
  align-items: center;
  ${({ $alignRight }) =>
    $alignRight &&
    css`
      justify-content: flex-end;
      padding-right: 10px;
    `}

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
