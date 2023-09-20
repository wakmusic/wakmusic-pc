import styled from "styled-components/macro";

import { T6Medium } from "@components/Typography";

import colors from "@constants/colors";

interface SpecialProps {
  name: string;
  onClick?: () => void;
}

const Special = ({ name, onClick }: SpecialProps) => {
  return (
    <Container onClick={onClick}>
      <T6Medium color={colors.blueGray500}>{name}</T6Medium>
    </Container>
  );
};

const Container = styled.div`
  padding: 2px 8px 2px 8px;

  background-color: ${colors.blueGray100};
  border-radius: 99px;
  cursor: pointer;
`;

export default Special;
