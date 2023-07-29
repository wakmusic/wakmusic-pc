import styled from "styled-components";

import { ReactComponent as Dot } from "@assets/icons/ic_16_dot.svg";

import { T7Medium } from "@components/Typography";

import colors from "@constants/colors";

interface HelpTextProps {}

const HelpText = ({}: HelpTextProps) => {
  return (
    <Container>
      <Dot />
      <T7Medium color={colors.blueGray400}>
        리스트 코드로 리스트를 가져올 수 있습니다.
      </T7Medium>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 12px;

  display: flex;
  align-items: center;
`;

export default HelpText;
