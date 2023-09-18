import { useCallback, useEffect, useState } from "react";
import styled from "styled-components/macro";

import { T4Bold, T5Light } from "@components/Typography";

import colors from "@constants/colors";

import { useLoadListModalState } from "@hooks/loadListModal";
import { useIsSpaceDisabled } from "@hooks/player";

import TwoButton from "../globals/TwoButton";
import { ModalContainer, ModalOverlay } from "../globals/modalStyle";
import Input from "./Input";

interface LoadListModalProps {}

const LoadListModal = ({}: LoadListModalProps) => {
  const [modalState, setModalState] = useLoadListModalState();
  const [value, setValue] = useState("");

  const [, setIsSpaceDisabled] = useIsSpaceDisabled();

  const resolve = useCallback(
    (cancel?: boolean) => {
      if (modalState.resolve) {
        modalState.resolve(cancel ? undefined : value);
      }

      setIsSpaceDisabled(false);
      setModalState({ ...modalState, isOpen: false });
      setValue("");
    },
    [modalState, setIsSpaceDisabled, setModalState, value]
  );

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.code === "Escape") {
        resolve(true);
      }
    }

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [resolve]);

  if (!modalState.isOpen) return null;

  return (
    <ModalOverlay onClick={() => resolve(true)}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Title>리스트 가져오기</Title>

        <InputContainer>
          <T5Light color={colors.blueGray400}>리스트 코드</T5Light>

          <Input value={value} onChange={setValue} />
        </InputContainer>

        <ButtonsWrapper>
          <TwoButton
            ok={() => resolve()}
            cancel={() => resolve(true)}
            okText="가져오기"
            disabled={value.length === 0 || value.length > 12}
          />
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

const ButtonsWrapper = styled.div`
  margin-top: 40px;
`;

export default LoadListModal;
