import { useEffect } from "react";
import styled, { css } from "styled-components/macro";

import { T1Bold, T5Medium } from "@components/Typography";

import colors from "@constants/colors";

import { useConfirmModalState } from "@hooks/confirmModal";
import { useIsSpaceDisabled } from "@hooks/player";

import { isNull, isString } from "@utils/isTypes";

import TwoButton from "./globals/TwoButton";
import { ModalContainer, ModalOverlay } from "./globals/modalStyle";

interface ConfirmModalProps {}

const ConfirmModal = ({}: ConfirmModalProps) => {
  const [modalState, setModalState] = useConfirmModalState();
  const [, setIsSpaceDisabled] = useIsSpaceDisabled();

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.code === "Escape") {
        setIsSpaceDisabled(false);
        setModalState({ ...modalState, isOpen: false, value: false });
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
        setModalState({ ...modalState, isOpen: false, value: false });
      }}
    >
      <Container onClick={(e) => e.stopPropagation()}>
        <Title $hasChildren={!isNull(modalState.children)}>
          {modalState.title}
        </Title>

        {isString(modalState.children) ? (
          <T5Medium color={colors.blueGray500}>{modalState.children}</T5Medium>
        ) : (
          modalState.children
        )}

        <ButtonsWrapper>
          <TwoButton
            ok={() => {
              setIsSpaceDisabled(false);
              setModalState({ ...modalState, isOpen: false, value: true });
            }}
            cancel={() => {
              setIsSpaceDisabled(false);
              setModalState({ ...modalState, isOpen: false, value: false });
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

const Title = styled(T1Bold)<{ $hasChildren: boolean }>`
  color: ${colors.primary900};

  margin-top: 52px;

  ${({ $hasChildren }) =>
    $hasChildren &&
    css`
      margin-bottom: 8px;
    `}
`;

const ButtonsWrapper = styled.div`
  margin-top: 52px;
`;

export default ConfirmModal;
