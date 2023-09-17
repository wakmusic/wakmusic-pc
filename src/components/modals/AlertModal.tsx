import { useEffect } from "react";
import styled from "styled-components/macro";

import { T1Bold, T5Medium } from "@components/Typography";

import colors from "@constants/colors";

import { useAlertModalState } from "@hooks/alertModal";
import { useIsSpaceDisabled } from "@hooks/player";

import { isString } from "@utils/isTypes";

import OkButton from "./globals/OkButton";
import { ModalContainer, ModalOverlay } from "./globals/modalStyle";

interface AlertModalProps {}

const AlertModal = ({}: AlertModalProps) => {
  const [modalState, setModalState] = useAlertModalState();
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
        <Title>{modalState.title}</Title>

        {isString(modalState.children) ? (
          <T5Medium color={colors.blueGray500}>{modalState.children}</T5Medium>
        ) : (
          modalState.children
        )}

        <ButtonsWrapper>
          <OkButton
            onClick={() => {
              setIsSpaceDisabled(false);
              setModalState({ ...modalState, isOpen: false });
            }}
          />
        </ButtonsWrapper>
      </Container>
    </ModalOverlay>
  );
};

const Container = styled(ModalContainer)`
  background: ${colors.blueGray25};
`;

const Title = styled(T1Bold)`
  color: ${colors.primary900};

  margin-top: 52px;
  margin-bottom: 8px;
`;

const ButtonsWrapper = styled.div`
  margin-top: 52px;
`;

export default AlertModal;
