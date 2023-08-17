import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";

import { ReactComponent as AppIconSVG } from "@assets/svgs/AppIcon.svg";

import { T3Medium, T5Light, T6Medium } from "@components/Typography";

import colors from "@constants/colors";
import { buttonList } from "@constants/myPage";

import { ModalContainer, ModalOverlay } from "./globals/modalStyle";

interface ServiceInfoModalProps {}

const ServiceInfoModal = ({}: ServiceInfoModalProps) => {
  const navigate = useNavigate();

  return (
    <ModalOverlay onClick={() => navigate("/mypage")}>
      <Container onClick={(event) => event.stopPropagation()}>
        <AppIcon />
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

  border-radius: 24px;

  background-color: ${colors.blueGray25};
`;

const AppIcon = styled(AppIconSVG)`
  border: 1px solid ${colors.blueGray100};
  border-radius: 20px;

  width: 100px;
  height: 100px;
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
  gap: 8px;

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
