import styled from "styled-components";

import { T1Bold, T5Medium } from "@components/Typography";

import colors from "@constants/colors";

import { useConfirmModalState } from "@hooks/confirmModal";

import { isString } from "@utils/isTypes";

import TwoButton from "./globals/TwoButton";
import { ModalContainer, ModalOverlay } from "./globals/modalStyle";

interface ConfirmModalProps {}

const ConfirmModal = ({}: ConfirmModalProps) => {
  const [modalState, setModalState] = useConfirmModalState();

  if (!modalState.isOpen) return null;

  return (
    <ModalOverlay>
      <Container>
        <Title>{modalState.title}</Title>

        {isString(modalState.children) ? (
          <T5Medium color={colors.blueGray500}>{modalState.children}</T5Medium>
        ) : (
          modalState.children
        )}

        <ButtonsWrapper>
          <TwoButton
            ok={() => {
              setModalState({ ...modalState, isOpen: false, value: true });
            }}
            cancel={() => {
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

const Title = styled(T1Bold)`
  color: ${colors.primary900};

  margin-top: 52px;
  margin-bottom: 8px;
`;

const ButtonsWrapper = styled.div`
  margin-top: 52px;
`;

export default ConfirmModal;
