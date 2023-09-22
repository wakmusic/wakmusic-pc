import { useCallback, useEffect } from "react";
import styled from "styled-components/macro";

import colors from "@constants/colors";

import { useCreditModalState } from "@hooks/modal";
import { useIsSpaceDisabled } from "@hooks/player";

import { ModalContainer, ModalOverlay } from "../globals/modalStyle";
import MemberModal from "./MemberModal";
import SpecialModal from "./SpecialModal";
import TeamModal from "./TeamModal";

interface CreditModalProps {}

const CreditModal = ({}: CreditModalProps) => {
  const [modalState, setModalState] = useCreditModalState();
  const target = modalState.detail;
  const [, setIsSpaceDisabled] = useIsSpaceDisabled();

  const close = useCallback(() => {
    setIsSpaceDisabled(false);
    setModalState({ isOpen: false });
  }, [setIsSpaceDisabled, setModalState]);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.code === "Escape") {
        close();
      }
    }

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [close]);

  if (!modalState.isOpen || !target) return null;

  if (modalState.detail?.type === "special") {
    return <SpecialModal special={modalState.detail.target} />;
  }

  return (
    <ModalOverlay onClick={close}>
      <Container onClick={(e) => e.stopPropagation()}>
        {modalState.detail?.type === "member" && (
          <MemberModal member={modalState.detail.target} />
        )}
        {modalState.detail?.type === "team" && (
          <TeamModal team={modalState.detail.target} />
        )}
      </Container>
    </ModalOverlay>
  );
};

const Container = styled(ModalContainer)`
  width: 440px;

  padding: 20px 24px 40px 24px;

  background: ${colors.blueGray25};
  border-radius: 24px;
`;

export default CreditModal;
