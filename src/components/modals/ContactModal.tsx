import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";

import { ReactComponent as CopySVG } from "@assets/icons/ic_24_copy.svg";

import { T3Medium, T4Bold, T5Light } from "@components/Typography";

import colors from "@constants/colors";

import HelpText from "./globals/HelpText";
import OkButton from "./globals/OkButton";
import { ModalContainer, ModalOverlay } from "./globals/modalStyle";

interface ContactModalProps {}

const ContactModal = ({}: ContactModalProps) => {
  const navigate = useNavigate();

  return (
    <ModalOverlay>
      <Container>
        <Title>문의하기</Title>

        <InputContainer>
          <T5Light color={colors.blueGray400}>
            아래 이메일로 문의해 주시기 바랍니다.
          </T5Light>
          <Input>
            <CodeText>{import.meta.env.VITE_CONTACT_MAIL}</CodeText>
            <CopyButton
              onClick={() => {
                navigator.clipboard.writeText(
                  import.meta.env.VITE_CONTACT_MAIL
                );
              }}
            >
              <CopySVG />
            </CopyButton>
          </Input>

          <HelpText>
            앞으로 더 발전하는 왁타버스 뮤직이 되겠습니다. 감사합니다.
          </HelpText>
        </InputContainer>

        <ButtonsWrapper>
          <OkButton onClick={() => navigate("/mywakmu")} />
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

export default ContactModal;
