import { useCallback, useEffect, useState } from "react";
import styled from "styled-components/macro";

import { ReactComponent as CloseSVG } from "@assets/icons/ic_20_close.svg";
import { ReactComponent as DivideSVG } from "@assets/icons/ic_20_divide.svg";
import { ReactComponent as MiniSvg } from "@assets/icons/ic_20_divide_mini.svg";
import { ReactComponent as LeastSVG } from "@assets/icons/ic_20_least.svg";
import { ReactComponent as MaxSVG } from "@assets/icons/ic_20_max.svg";
import { ReactComponent as PinOffSVG } from "@assets/icons/ic_20_pin_off.svg";
import { ReactComponent as PinOnSVG } from "@assets/icons/ic_20_pin_on.svg";
import { ReactComponent as RestoreSVG } from "@assets/icons/ic_20_restore.svg";

import { IPCMain, IPCRenderer } from "@constants/ipc";

import { useExitModal } from "@hooks/modal";
import { useToast } from "@hooks/toast";
import { SeparateMode, useToggleSeparateMode } from "@hooks/toggleSeparateMode";

import { isNull } from "@utils/isTypes";
import { ipcRenderer } from "@utils/modules";

import SimpleIconButton from "./SimpleIconButton";

interface ControlBarProps {
  isVisualMode?: boolean;
}

const ControlBar = ({ isVisualMode }: ControlBarProps) => {
  const [isMax, setIsMax] = useState(false);
  const [isTop, setIsTop] = useState(false);

  const { separateMode, toggleSeparateMode } = useToggleSeparateMode();
  const openExitModal = useExitModal();
  const toast = useToast();

  const close = useCallback(async () => {
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
  }, [openExitModal]);

  const maximize = () => {
    ipcRenderer?.send(IPCRenderer.WINDOW_MAX);
  };

  const toggleTop = () => {
    let ok = false;

    if (window.require) {
      try {
        const remote = window.require("@electron/remote");

        if (remote && remote.BrowserWindow) {
          remote.BrowserWindow.getFocusedWindow()?.setAlwaysOnTop(!isTop);
          setIsTop(!isTop);
          ok = true;
        }
      } catch (e) {
        console.error(e);
      }
    }

    if (!ok) {
      toast("v1.0.4 이상의 업데이트가 필요합니다.");
    }
  };

  useEffect(() => {
    ipcRenderer?.on(IPCMain.WINDOW_MAXIMIZED, () => {
      setIsMax(true);
    });

    ipcRenderer?.on(IPCMain.WINDOW_UNMAXIMIZED, () => {
      setIsMax(false);
    });

    ipcRenderer?.on(IPCMain.APP_QUIT, () => {
      close();
    });

    return () => {
      ipcRenderer?.removeAllListeners(IPCMain.WINDOW_MAXIMIZED);
      ipcRenderer?.removeAllListeners(IPCMain.WINDOW_UNMAXIMIZED);
      ipcRenderer?.removeAllListeners(IPCMain.APP_QUIT);
    };
  }, [close]);

  if (!ipcRenderer) {
    return null;
  }

  if (typeof process !== "undefined" && process.platform === "darwin") {
    return (
      <Container>
        <SimpleIconButton
          icon={isTop ? PinOnSVG : PinOffSVG}
          onClick={toggleTop}
        />
        <SimpleIconButton
          icon={DivideSVG}
          onClick={isVisualMode ? maximize : toggleSeparateMode}
        />
      </Container>
    );
  }

  return (
    <Container>
      <SimpleIconButton
        icon={isTop ? PinOnSVG : PinOffSVG}
        onClick={toggleTop}
      />
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
            : (
                {
                  [SeparateMode.Default]: DivideSVG,
                  [SeparateMode.Separate]: MiniSvg,
                  [SeparateMode.Mini]: RestoreSVG,
                } as Record<
                  SeparateMode,
                  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
                >
              )[separateMode]
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
