import styled from "styled-components/macro";

import { ReactComponent as Dot } from "@assets/icons/ic_16_dot.svg";

import { T7Medium } from "@components/Typography";

import colors from "@constants/colors";

interface HelpTextProps {
  children: string;
}

const HelpText = ({ children }: HelpTextProps) => {
  return (
    <Container>
      <Dot />
      <T7Medium color={colors.blueGray400}>{children}</T7Medium>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 12px;

  display: flex;
  align-items: center;
`;

export default HelpText;
