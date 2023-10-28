import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";

import { fetchSong } from "@apis/songs";

import { ReactComponent as AppIconSVG } from "@assets/svgs/Halloween_AppIcon.svg";

import { T3Medium, T5Light, T6Medium } from "@components/Typography";

import colors from "@constants/colors";
import { IPCMain, IPCRenderer } from "@constants/ipc";
import { buttonList } from "@constants/myPage";

import { usePlaySong } from "@hooks/player";

import { ipcRenderer, openExternal } from "@utils/modules";

import { ModalContainer, ModalOverlay } from "./globals/modalStyle";

interface ServiceInfoModalProps {}

const ServiceInfoModal = ({}: ServiceInfoModalProps) => {
  const navigate = useNavigate();
  const playSong = usePlaySong();

  const [appVersion, setAppVersion] = useState<string>("WEB");

  const commitHash = import.meta.env.VITE_COMMIT_HASH ?? "dev";

  useEffect(() => {
    if (!ipcRenderer) return;

    ipcRenderer.send(IPCRenderer.QUERY_VERSION);

    ipcRenderer.on(IPCMain.REPLY_VERSION, (_, version) => {
      console.log("version", version);
      setAppVersion(version);
    });

    return () => {
      if (ipcRenderer) {
        ipcRenderer.removeAllListeners(IPCMain.REPLY_VERSION);
      }
    };
  }, []);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.code === "Escape") {
        navigate("/mywakmu");
      }
    }

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [navigate]);

  return (
    <ModalOverlay onClick={() => navigate("/mywakmu")}>
      <Container onClick={(event) => event.stopPropagation()}>
        <IconContainer onClick={() => fetchSong("zjZpfpRkHJs").then(playSong)}>
          <AppIcon />
        </IconContainer>

        <Title>왁타버스 뮤직</Title>
        <Version>
          현재 버전 {appVersion} ({commitHash})
        </Version>
        <ButtonGroup>
          {buttonList.map((button, index) => (
            <Button
              key={index}
              onClick={() => openExternal && openExternal(button.path)}
            >
              <ButtonText>{button.name}</ButtonText>
            </Button>
          ))}
        </ButtonGroup>
      </Container>
    </ModalOverlay>
  );
};

const Container = styled(ModalContainer)`
  width: 440px;
  height: 350px;

  border-radius: 24px;

  background-color: ${colors.blueGray25};
`;

const IconContainer = styled.div`
  width: 100px;
  height: 100px;
`;

const AppIcon = styled(AppIconSVG)`
  border: 1px solid ${colors.blueGray100};
  border-radius: 20px;

  width: 100px;
  height: 100px;
`;

const Title = styled(T3Medium)`
  margin-top: 12px;
  color: ${colors.gray900};
`;

const Version = styled(T5Light)`
  margin-top: 4px;
  color: ${colors.blueGray400};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;

  margin-top: 32px;
`;

const Button = styled.div`
  display: inline-flex;
  padding: 12px 14px;
  align-items: center;

  border-radius: 6px;
  border: 1px solid ${colors.blueGray200};

  cursor: pointer;
`;

const ButtonText = styled(T6Medium)`
  color: ${colors.blueGray500};
`;

export default ServiceInfoModal;
