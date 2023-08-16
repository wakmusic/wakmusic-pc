import styled from "styled-components/macro";

import { ReactComponent as AppIconSVG } from "@assets/svgs/AppIconWithBorder.svg";

import { T3Medium, T5Light, T6Medium } from "@components/Typography";

import colors from "@constants/colors";

import { useServiceInfoModalState } from "@hooks/serviceInfoModal";

import { ModalContainer, ModalOverlay } from "./globals/modalStyle";

interface ServiceInfoModalProps {}

const ServiceInfoModal = ({}: ServiceInfoModalProps) => {
  const [modalState, setModalState] = useServiceInfoModalState();

  const buttonList = [
    "서비스 이용약관",
    "개인정보 처리방침",
    "오픈소스 라이선스",
  ];

  if (!modalState.isOpen) return null;

  return (
    <ModalOverlay
      onClick={() => {
        setModalState({ isOpen: false });
      }}
    >
      <Container
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <AppIconSVG />
        <Title>왁타버스 뮤직</Title>
        <Version>현재 버전 0.1.0 (5b6c01b3)</Version>
        <ButtonGroup>
          {buttonList.map((button, index) => (
            <Button key={index}>
              <ButtonText>{button}</ButtonText>
            </Button>
          ))}
        </ButtonGroup>
      </Container>
    </ModalOverlay>
  );
};

const Container = styled(ModalContainer)`
  width: 440px;
  height: 350px;
  background: ${colors.blueGray25};
`;

const Title = styled(T3Medium)`
  margin-top: 12px;
  color: ${colors.gray900};
`;

const Version = styled(T5Light)`
  margin-top: 4px;
  color: ${colors.blueGray400};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;

  margin-top: 32px;
`;

const Button = styled.div`
  display: inline-flex;
  padding: 12px 14px;
  align-items: center;

  border-radius: 6px;
  border: 1px solid ${colors.blueGray200};

  cursor: pointer;
`;

const ButtonText = styled(T6Medium)`
  color: ${colors.blueGray500};
`;

export default ServiceInfoModal;
