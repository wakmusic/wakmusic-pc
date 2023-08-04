import { useLocation, useNavigate } from "react-router-dom";

import { useInterval } from "@hooks/interval";

const CheckPlayerMode = (): null => {
  const navigate = useNavigate();
  const location = useLocation();

  useInterval(() => {
    if (window.ipcRenderer) {
      const isSeparated = window.ipcRenderer.sendSync("query:isSeparate");

      if (isSeparated && location.pathname !== "/player") {
        navigate("/player");
      } else if (!isSeparated && location.pathname === "/player") {
        navigate("/");
      }
    }
  }, 1000);

  return null;
};

export default CheckPlayerMode;
