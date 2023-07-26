import { ReactElement } from "react";
import styled from "styled-components";

import { T4Bold, T6Medium } from "@components/Typography";

import colors from "@constants/colors";

interface BlockProps {
  title: string;
  description: string;
  svg: ReactElement;
}

const Block = ({ title, description, svg }: BlockProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Description>{description}</Description>
      {svg}
    </Container>
  );
};

const Container = styled.div`
  border-radius: 15px;
  border: 1px solid ${colors.blueGray25};
  background: ${colors.white}66;
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
