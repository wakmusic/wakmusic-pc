import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";

import { T4Bold, T6Medium } from "@components/Typography";

import colors from "@constants/colors";

import { useServiceInfoModalState } from "@hooks/serviceInfoModal";

interface BlockProps {
  title: string;
  description: string;
  endPoint?: string;
  svg: ReactElement;
}

const Block = ({ title, description, endPoint, svg }: BlockProps) => {
  const navigate = useNavigate();

  const [modalState, setModalState] = useServiceInfoModalState();

  const getScript = () => {
    if (endPoint) {
      return navigate(endPoint);
    } else if (title === "서비스 정보") {
      return setModalState({ ...modalState, isOpen: true });
    } else {
      return undefined;
    }
  };

  return (
    <Container onClick={getScript}>
      <Title>{title}</Title>
      <Description>{description}</Description>
      {svg}
    </Container>
  );
};

const Container = styled.div`
  border-radius: 15px;
  border: 1px solid ${colors.blueGray25};
  background: ${colors.whiteAlpha40};
  backdrop-filter: blur(62.5px);

  padding: 20px 24px;

  cursor: pointer;

  & svg {
    position: absolute;
    bottom: 20px;
    right: 22px;
  }
`;

const Title = styled(T4Bold)`
  color: ${colors.gray700};
`;

const Description = styled(T6Medium)`
  margin-top: 4px;

  color: ${colors.blueGray400};
  white-space: pre-line;
`;

export default Block;
