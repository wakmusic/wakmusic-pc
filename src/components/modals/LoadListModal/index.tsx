import { useState } from "react";
import styled from "styled-components";

import { T4Bold, T5Light } from "@components/Typography";

import colors from "@constants/colors";

import { useLoadListModalState } from "@hooks/loadListModal";

import TwoButton from "../globals/TwoButton";
import { ModalContainer, ModalOverlay } from "../globals/modalStyle";
import Input from "./Input";

interface LoadListModalProps {}

const LoadListModal = ({}: LoadListModalProps) => {
  const [modalState, setModalState] = useLoadListModalState();
  const [value, setValue] = useState("");

  const resolve = (cancel?: boolean) => {
    if (modalState.resolve) modalState.resolve(cancel ? undefined : value);
    setModalState({ ...modalState, isOpen: false });
    setValue("");
  };

  if (!modalState.isOpen) return null;

  return (
    <ModalOverlay>
      <Container>
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
