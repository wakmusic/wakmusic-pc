import { useState } from "react";
import styled, { css } from "styled-components/macro";

import { ReactComponent as ArrowDownSVG } from "@assets/icons/ic_20_arrow_down.svg";
import { ReactComponent as ArrowUpSVG } from "@assets/icons/ic_20_arrow_up.svg";

import { T6Bold, T6Medium } from "@components/Typography";

import colors from "@constants/colors";

import { FaqType } from "@templates/faq";

interface SectionProps {
  article: FaqType;
}

const Section = ({ article }: SectionProps) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <Container>
      <Grid open={isOpened} onClick={() => setIsOpened(!isOpened)}>
        <Category>{article.category.category}</Category>
        {isOpened ? (
          <HighlightedQuestion>{article.question}</HighlightedQuestion>
        ) : (
          <Question>{article.question}</Question>
        )}
        {isOpened ? <UpSVG /> : <DownSVG />}
      </Grid>
      <DescriptionContainer
        $open={isOpened}
        $lines={article.description.split("\n").length}
      >
        <Description>{article.description}</Description>
      </DescriptionContainer>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  top: 16px;

  width: 100%;
`;

const Grid = styled.div<{
  open: boolean;
}>`
  position: relative;
  top: 1px;
  width: calc(100% - 40px);
  height: 52px;

  left: 20px;
  ${({ open }) =>
    !open &&
    css`
      border-bottom: 1px solid ${colors.blueGray200};
    `}

  display: flex;
  align-items: center;

  cursor: pointer;
`;

const Category = styled(T6Medium)`
  width: 50px;
  height: 20px;

  color: ${colors.blueGray400};
  text-align: center;
`;

const Question = styled(T6Medium)`
  width: 568px;
  height: 20px;

  margin-left: 16px;

  color: ${colors.blueGray600};
`;

const HighlightedQuestion = styled(T6Bold)`
  width: 568px;
  height: 20px;

  margin-left: 16px;

  color: ${colors.blueGray600};
`;

const UpSVG = styled(ArrowUpSVG)`
  margin-left: auto;

  color: ${colors.gray600};
`;

const DownSVG = styled(ArrowDownSVG)`
  margin-left: auto;

  color: ${colors.gray500};
`;

const DescriptionContainer = styled.div<{
  $open: boolean;
  $lines: number;
}>`
  width: 100%;
  padding: 0 20px;

  height: ${({ $open, $lines }) => ($open ? $lines * 20 + 32 : 0)}px;

  overflow: hidden;
  background-color: ${colors.blueGray200};

  transition: height ease 300ms;
`;

const Description = styled(T6Medium)`
  margin-top: 16px;

  width: 634px;
  color: ${colors.blueGray600};

  white-space: pre-wrap;
`;

export default Section;
