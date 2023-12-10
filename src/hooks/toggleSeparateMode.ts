import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { IPCRenderer } from "@constants/ipc";

import { ipcRenderer } from "@utils/modules";

import { useVisualModeState } from "./player";

export enum SeparateMode {
  Default = "default",
  Separate = "separate",
  Mini = "mini",
}

export const useToggleSeparateMode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [visualMode, setVisualMode] = useVisualModeState();

  const [separateMode, setSeparateMode] = useState<SeparateMode>(
    SeparateMode.Default
  );

  const toggleSeparateMode = () => {
    if (!ipcRenderer) return;

    if (visualMode) {
      setVisualMode(false);

      setTimeout(() => {
        navigate("/player");
        ipcRenderer?.send(IPCRenderer.MODE_SEPARATE);
        setSeparateMode(SeparateMode.Separate);
      }, 500);
    } else {
      if (location.pathname !== "/player") {
        navigate("/player");
        ipcRenderer.send(IPCRenderer.MODE_SEPARATE);
        setSeparateMode(SeparateMode.Separate);
      } else if (separateMode === SeparateMode.Separate) {
        ipcRenderer.send(IPCRenderer.MODE_MINI);
        setSeparateMode(SeparateMode.Mini);
      } else {
        navigate(-1);
        ipcRenderer.send(IPCRenderer.MODE_DEFAULT);
        setSeparateMode(SeparateMode.Default);
      }
    }
  };

  return { separateMode, setSeparateMode, toggleSeparateMode };
};
