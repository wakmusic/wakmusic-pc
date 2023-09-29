import { useEffect, useState } from "react";
import styled from "styled-components/macro";

import { ReactComponent as CloseSVG } from "@assets/icons/ic_20_close.svg";
import { ReactComponent as DivideSVG } from "@assets/icons/ic_20_divide.svg";
import { ReactComponent as LeastSVG } from "@assets/icons/ic_20_least.svg";
import { ReactComponent as MaxSVG } from "@assets/icons/ic_20_max.svg";
import { ReactComponent as RestoreSVG } from "@assets/icons/ic_20_restore.svg";

import { IPCMain, IPCRenderer } from "@constants/ipc";

import { useExitModal } from "@hooks/modal";
import { useToggleSeparateMode } from "@hooks/toggleSeparateMode";

import { isNull } from "@utils/isTypes";
import { ipcRenderer } from "@utils/modules";

import SimpleIconButton from "./SimpleIconButton";

interface ControlBarProps {
  isVisualMode?: boolean;
}

const ControlBar = ({ isVisualMode }: ControlBarProps) => {
  const [isMax, setIsMax] = useState(false);

  const toggleSeparateMode = useToggleSeparateMode();
  const openExitModal = useExitModal();

  useEffect(() => {
    ipcRenderer?.on(IPCMain.WINDOW_MAXIMIZED, () => {
      setIsMax(true);
    });

    ipcRenderer?.on(IPCMain.WINDOW_UNMAXIMIZED, () => {
      setIsMax(false);
    });

    return () => {
      ipcRenderer?.removeAllListeners(IPCMain.WINDOW_MAXIMIZED);
      ipcRenderer?.removeAllListeners(IPCMain.WINDOW_UNMAXIMIZED);
    };
  }, []);

  const close = async () => {
    let mode = localStorage.getItem("exitMode") as
      | "close"
      | "background"
      | null;

    if (isNull(mode)) {
      if (location.pathname === "/player") {
        const openExitPopup = new Promise<"close" | "background" | null>(
          (resolve) => {
            const win = open(
              "/selectExit",
              "_blank",
              "width=440,height=374,frame=false"
            );

            if (win) {
              win.addEventListener("message", (e) => {
                if (e.data.type === "resolve") {
                  resolve(e.data.payload);
                }
              });
            }
          }
        );

        mode = await openExitPopup;
      } else {
        mode = await openExitModal(true);
      }
    }

    if (isNull(mode)) {
      return;
    } else {
      localStorage.setItem("exitMode", mode);
    }

    if (mode === "close") {
      ipcRenderer?.send(IPCRenderer.WINDOW_CLOSE);
    }

    if (mode === "background") {
      ipcRenderer?.send(IPCRenderer.WINDOW_HIDE);
    }
  };

  const maximize = () => {
    ipcRenderer?.send(IPCRenderer.WINDOW_MAX);
  };

  if (!ipcRenderer) {
    return null;
  }

  if (process.platform === "darwin") {
    return (
      <Container>
        <SimpleIconButton
          icon={
            isVisualMode
              ? isMax
                ? RestoreSVG
                : MaxSVG // 비주얼모드에만 최대화, 복구 가능
              : DivideSVG // 그 외에는 분리만 가능
          }
          onClick={isVisualMode ? maximize : toggleSeparateMode}
        />
      </Container>
    );
  }

  return (
    <Container>
      <SimpleIconButton
        icon={LeastSVG}
        onClick={() => {
          ipcRenderer?.send(IPCRenderer.WINDOW_LEAST);
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
        onClick={isVisualMode ? maximize : toggleSeparateMode}
      />
      <SimpleIconButton icon={CloseSVG} onClick={close} />
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
