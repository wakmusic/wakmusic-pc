import styled from "styled-components/macro";

import { T7Medium } from "@components/Typography";
import { BlackLine, WhiteLine } from "@components/globals/GuideBar";

import colors from "@constants/colors";

interface NoticeGuideBarProps {}

const NoticeGuideBar = ({}: NoticeGuideBarProps) => {
  return (
    <Container>
      <WhiteLine />

      <GuideContainer>
        <Text $width={50}>분류</Text>

        <Text $width={508} $left={16}>
          제목
        </Text>

        <Text $width={70} $left={50}>
          작성일
        </Text>
      </GuideContainer>

      <BlackLine />
    </Container>
  );
};

const Container = styled.div`
  margin-top: 20px;

  padding: 0 10px;
`;

const GuideContainer = styled.div`
  height: 31px;

  padding: 0 10px;

  display: flex;
  align-items: center;
`;

const Text = styled(T7Medium)<{ $width: number; $left?: number }>`
  color: ${colors.blueGray400};

  width: ${({ $width }) => $width}px;
  text-align: center;

  margin-left: ${({ $left }) => $left ?? 0}px;
`;

export default NoticeGuideBar;
