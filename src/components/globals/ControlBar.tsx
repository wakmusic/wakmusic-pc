import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components/macro";

import { ReactComponent as CloseSVG } from "@assets/icons/ic_20_close.svg";
import { ReactComponent as DivideSVG } from "@assets/icons/ic_20_divide.svg";
import { ReactComponent as LeastSVG } from "@assets/icons/ic_20_least.svg";
import { ReactComponent as MaxSVG } from "@assets/icons/ic_20_max.svg";
import { ReactComponent as RestoreSVG } from "@assets/icons/ic_20_restore.svg";

import { ipcRenderer } from "@utils/modules";

import SimpleIconButton from "./SimpleIconButton";

interface ControlBarProps {
  isVisualMode?: boolean;
}

const ControlBar = ({ isVisualMode }: ControlBarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMax, setIsMax] = useState(false);

  if (!ipcRenderer) {
    return null;
  }

  return (
    <Container>
      <SimpleIconButton
        icon={LeastSVG}
        onClick={() => {
          ipcRenderer?.send("window:least");
        }}
      />
      <SimpleIconButton
        icon={
          isVisualMode
            ? isMax
              ? RestoreSVG
              : MaxSVG // 비주얼모드에만 최대화, 복구 가능
            : DivideSVG // 그 외에는 분리만 가능
        }
        onClick={() => {
          if (!ipcRenderer) return;

          if (isVisualMode) {
            setIsMax((prev) => !prev);
            ipcRenderer.send("window:max");
          } else {
            if (location.pathname !== "/player") {
              navigate("/player");
              ipcRenderer.send("mode:separate");
            } else {
              navigate(-1);
              ipcRenderer.send("mode:default");
            }
          }
        }}
      />
      <SimpleIconButton
        icon={CloseSVG}
        onClick={() => {
          ipcRenderer?.send("window:close");
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
