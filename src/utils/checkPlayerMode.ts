import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useInterval } from "@hooks/interval";

import { ipcRenderer } from "./modules";

/**
 * 매 초마다 플레이어 모드가 분리되었는지 확인하고, 이상이 있을 시 복구하는 컴포넌트입니다.
 * @returns null
 */
const CheckPlayerMode = (): null => {
  const navigate = useNavigate();
  const location = useLocation();

  const callback = useCallback(
    (isSeparated: boolean) => {
      if (!ipcRenderer) return;

      if (isSeparated && location.pathname !== "/player") {
        navigate("/player");
      } else if (!isSeparated && location.pathname === "/player") {
        navigate("/");
      }
    },
    [location, navigate]
  );

  useEffect(() => {
    if (!ipcRenderer) return;

    ipcRenderer.on("reply:isSeparate", (_event, isSeparated: boolean) => {
      callback(isSeparated);
    });

    return () => {
      if (!ipcRenderer) return;

      ipcRenderer.removeAllListeners("reply:isSeparate");
    };
  }, [callback]);

  useInterval(() => {
    if (!ipcRenderer) return;

    ipcRenderer.send("query:isSeparate");
  }, 1000);

  return null;
};

export default CheckPlayerMode;
