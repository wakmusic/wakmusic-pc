import { useCallback, useEffect } from "react";
import styled from "styled-components/macro";

import { ReactComponent as CopySVG } from "@assets/icons/ic_24_copy.svg";

import { T3Medium, T4Bold, T5Light } from "@components/Typography";

import colors from "@constants/colors";

import { useShareListModalState } from "@hooks/modal";
import { useIsSpaceDisabled } from "@hooks/player";
import { useToast } from "@hooks/toast";

import HelpText from "./globals/HelpText";
import OkButton from "./globals/OkButton";
import { ModalContainer, ModalOverlay } from "./globals/modalStyle";

interface LoadListModalProps {}

const LoadListModal = ({}: LoadListModalProps) => {
  const [modalState, setModalState] = useShareListModalState();
  const [, setIsSpaceDisabled] = useIsSpaceDisabled();
  const toast = useToast();

  const resolve = useCallback(() => {
    if (modalState.resolve) modalState.resolve();
    setIsSpaceDisabled(false);
    setModalState({ isOpen: false });
  }, [modalState, setIsSpaceDisabled, setModalState]);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.code === "Escape") {
        resolve();
      }
    }

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [resolve]);

  if (!modalState.isOpen) return null;

  return (
    <ModalOverlay onClick={resolve}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Title>리스트 공유하기</Title>

        <InputContainer>
          <T5Light color={colors.blueGray400}>리스트 코드</T5Light>
          <Input>
            <CodeText>{modalState.code}</CodeText>
            <CopyButton
              onClick={() => {
                if (!modalState.code) return;
                navigator.clipboard.writeText(modalState.code);
                toast("클립보드에 복사되었습니다.");
              }}
            >
              <CopySVG />
            </CopyButton>
          </Input>

          <HelpText>리스트 코드로 리스트를 가져올 수 있습니다.</HelpText>
        </InputContainer>

        <ButtonsWrapper>
          <OkButton onClick={resolve} />
        </ButtonsWrapper>
      </Container>
    </ModalOverlay>
  );
};

const Container = styled(ModalContainer)`
  background: ${colors.blueGray25};
`;

const Title = styled(T4Bold)`
  color: ${colors.primary900};

  margin-top: 20px;
  margin-bottom: 32px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.div`
  width: 380px;
  height: 56px;

  display: flex;
  align-items: center;

  border-bottom: 1px solid ${colors.blueGray300};
`;

const CodeText = styled(T3Medium)`
  color: ${colors.gray700};

  user-select: all;
`;

const CopyButton = styled.div`
  margin-left: auto;

  cursor: pointer;
`;

const ButtonsWrapper = styled.div`
  margin-top: 40px;
`;

export default LoadListModal;
