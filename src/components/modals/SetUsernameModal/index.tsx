import { useCallback, useEffect, useState } from "react";
import styled from "styled-components/macro";

import { T4Bold, T5Light } from "@components/Typography";

import colors from "@constants/colors";

import { useIsSpaceDisabled } from "@hooks/player";
import { useSetUsernameModalState } from "@hooks/setUsernameModal";

import Input from "../globals/Input";
import TwoButton from "../globals/TwoButton";
import { ModalContainer, ModalOverlay } from "../globals/modalStyle";

interface SetUsernameModalProps {}

const SetUsernameModal = ({}: SetUsernameModalProps) => {
  const [modalState, setModalState] = useSetUsernameModalState();
  const [value, setValue] = useState("");

  const [, setIsSpaceDisabled] = useIsSpaceDisabled();

  const resolve = useCallback(
    (cancel?: boolean) => {
      if (modalState.resolve) modalState.resolve(cancel ? undefined : value);
      setModalState({ ...modalState, isOpen: false });
      setValue("");

      setIsSpaceDisabled(false);
    },
    [modalState, setModalState, setIsSpaceDisabled, value]
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
        <Title>닉네임 수정</Title>

        <InputContainer>
          <T5Light color={colors.blueGray400}>닉네임</T5Light>

          <Input
            value={value}
            onChange={setValue}
            maxLength={8}
            helpTextOk="사용할 수 있는 닉네임입니다."
            placeholder="닉네임을 입력해주세요."
          />
        </InputContainer>

        <ButtonsWrapper>
          <TwoButton
            ok={() => resolve()}
            cancel={() => resolve(true)}
            okText="완료"
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

export default SetUsernameModal;
