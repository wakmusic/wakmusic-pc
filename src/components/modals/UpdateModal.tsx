import { useEffect } from "react";
import styled from "styled-components/macro";

import { T1Bold, T5Medium } from "@components/Typography";

import colors from "@constants/colors";
import { IPCRenderer } from "@constants/ipc";

import { useUpdateModalState } from "@hooks/modal";
import { useIsSpaceDisabled } from "@hooks/player";

import { ipcRenderer } from "@utils/modules";

import TwoButton from "./globals/TwoButton";
import { ModalContainer, ModalOverlay } from "./globals/modalStyle";

interface UpdateModalState {}

const UpdateModal = ({}: UpdateModalState) => {
  const [modalState, setModalState] = useUpdateModalState();
  const [, setIsSpaceDisabled] = useIsSpaceDisabled();

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.code === "Escape") {
        setIsSpaceDisabled(false);
        setModalState({ ...modalState, isOpen: false });
      }
    }

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [modalState, setIsSpaceDisabled, setModalState]);

  if (!modalState.isOpen) return null;

  return (
    <ModalOverlay
      onClick={() => {
        setIsSpaceDisabled(false);
        setModalState({ ...modalState, isOpen: false });
      }}
    >
      <Container onClick={(e) => e.stopPropagation()}>
        <Title>최신 업데이트 알림</Title>

        <T5Medium color={colors.blueGray500}>
          새로운 버전이 출시되었습니다
        </T5Medium>
        <T5Medium color={colors.blueGray500}>
          원활한 사용을 위해 업데이트를 진행해 주세요!
        </T5Medium>

        <ButtonsWrapper>
          <TwoButton
            ok={() => {
              ipcRenderer?.send(
                IPCRenderer.BROWSER_OPEN,
                "https://cafe.naver.com/steamindiegame/12969738"
              );

              setIsSpaceDisabled(false);
              setModalState({ ...modalState, isOpen: false });
            }}
            cancel={() => {
              setIsSpaceDisabled(false);
              setModalState({ ...modalState, isOpen: false });
            }}
            okText={"업데이트 하러가기"}
            cancelText={"닫기"}
          />
        </ButtonsWrapper>
      </Container>
    </ModalOverlay>
  );
};

const Container = styled(ModalContainer)`
  background: ${colors.blueGray25};

  padding: 0 32px;
`;

const Title = styled(T1Bold)`
  color: ${colors.primary900};

  margin-top: 52px;
  margin-bottom: 8px;
`;

const ButtonsWrapper = styled.div`
  margin-top: 52px;
`;

export default UpdateModal;
