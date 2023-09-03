import { useLocation, useNavigate } from "react-router-dom";

import { IPCRenderer } from "@constants/ipc";

import { ipcRenderer } from "@utils/modules";

import { useVisualModeState } from "./player";

export const useToggleSeparateMode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [visualMode, setVisualMode] = useVisualModeState();

  const toggleSeparateMode = () => {
    if (!ipcRenderer) return;

    if (visualMode) {
      setVisualMode(false);

      setTimeout(() => {
        navigate("/player");
        ipcRenderer?.send(IPCRenderer.MODE_SEPARATE);
      }, 500);
    } else {
      if (location.pathname !== "/player") {
        navigate("/player");
        ipcRenderer.send(IPCRenderer.MODE_SEPARATE);
      } else {
        navigate(-1);
        ipcRenderer.send(IPCRenderer.MODE_DEFAULT);
      }
    }
  };

  return toggleSeparateMode;
};
