import { useState } from "react";
import styled from "styled-components/macro";

import { T4Bold, T5Light } from "@components/Typography";

import colors from "@constants/colors";

import { useCreateListModalState } from "@hooks/createListModal";
import { useIsSpaceDisabled } from "@hooks/player";

import Input from "../globals/Input";
import TwoButton from "../globals/TwoButton";
import { ModalContainer, ModalOverlay } from "../globals/modalStyle";

interface CreateListModalProps {}

const CreateListModal = ({}: CreateListModalProps) => {
  const [modalState, setModalState] = useCreateListModalState();
  const [value, setValue] = useState("");

  const [, setIsSpaceDisabled] = useIsSpaceDisabled();

  const resolve = (cancel?: boolean) => {
    if (modalState.resolve) modalState.resolve(cancel ? undefined : value);
    setModalState({ ...modalState, isOpen: false });
    setValue("");

    setIsSpaceDisabled(false);
  };

  if (!modalState.isOpen) return null;

  return (
    <ModalOverlay>
      <Container>
        <Title>리스트 만들기</Title>

        <InputContainer>
          <T5Light color={colors.blueGray400}>리스트 명</T5Light>

          <Input value={value} onChange={setValue} />
        </InputContainer>

        <ButtonsWrapper>
          <TwoButton
            ok={() => resolve()}
            cancel={() => resolve(true)}
            okText="리스트 생성"
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

export default CreateListModal;
