import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PlayerFallbackProps {}

const PlayerFallback = ({}: PlayerFallbackProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.ipcRenderer) {
      const res = window.ipcRenderer.sendSync("query:isSeparate");

      console.log(res);

      if (!res) {
        navigate("/");
      }
    }
  });

  return null;
};

export default PlayerFallback;
