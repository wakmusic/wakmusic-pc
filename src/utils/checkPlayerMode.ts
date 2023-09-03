import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { IPCMain, IPCRenderer } from "@constants/ipc";

import { useInterval } from "@hooks/interval";
import { useVisualModeState } from "@hooks/player";

import { ipcRenderer } from "./modules";

/**
 * 매 초마다 플레이어 모드가 분리되었는지 확인하고, 이상이 있을 시 복구하는 컴포넌트입니다.
 * @returns null
 */
const CheckPlayerMode = (): null => {
  const navigate = useNavigate();
  const location = useLocation();
  const [visualMode, setVisualMode] = useVisualModeState();

  const callback = useCallback(
    (isSeparated: boolean) => {
      if (!ipcRenderer) return;

      if (isSeparated && location.pathname !== "/player") {
        navigate("/player");
      } else if (!isSeparated && location.pathname === "/player") {
        navigate("/");
      }

      if (isSeparated && location.pathname === "/player" && visualMode) {
        setVisualMode(false);
      }
    },
    [location.pathname, navigate, setVisualMode, visualMode]
  );

  useEffect(() => {
    if (!ipcRenderer) return;

    ipcRenderer.on(
      IPCMain.REPLY_IS_SEPARATE,
      (_event, isSeparated: boolean) => {
        callback(isSeparated);
      }
    );

    return () => {
      if (!ipcRenderer) return;

      ipcRenderer.removeAllListeners(IPCMain.REPLY_IS_SEPARATE);
    };
  }, [callback]);

  useInterval(() => {
    if (!ipcRenderer) return;

    ipcRenderer.send(IPCRenderer.QUERY_IS_SEPARATE);
  }, 1000);

  return null;
};

export default CheckPlayerMode;
