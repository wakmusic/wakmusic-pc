import styled from "styled-components";

import { ReactComponent as ContentsInfoSVG } from "@assets/icons/ic_56_contents_info.svg";

import { T6Medium } from "@components/Typography";

import colors from "@constants/colors";

interface NotFoundProps {}

const NotFound = ({}: NotFoundProps) => {
  return (
    <Container>
      <IconSVG />
      <Text>검색 결과가 없습니다.</Text>
    </Container>
  );
};

const Container = styled.div`
  display: inline-block;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const IconSVG = styled(ContentsInfoSVG)`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;

const Text = styled(T6Medium)`
  color: ${colors.gray900};
  text-align: center;
`;

export default NotFound;
