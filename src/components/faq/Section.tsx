import { useState } from "react";
import styled, { css } from "styled-components/macro";

import { ReactComponent as ArrowDownSVG } from "@assets/icons/ic_20_arrow_down.svg";
import { ReactComponent as ArrowUpSVG } from "@assets/icons/ic_20_arrow_up.svg";

import { T6Bold, T6Medium } from "@components/Typography";
import Skeleton from "@components/globals/Skeleton";

import colors from "@constants/colors";

import { FAQ } from "@templates/faq";

interface SectionProps {
  article?: FAQ;
}

const Section = ({ article }: SectionProps) => {
  const [isOpened, setIsOpened] = useState(false);

  if (!article) {
    return (
      <Container>
        <Grid $open={false}>
          <Category>
            <Skeleton width={50} height={20} />
          </Category>
          <Question>
            <Skeleton width={450} height={20} />
          </Question>
          <DownSVG />
        </Grid>
      </Container>
    );
  }

  return (
    <Container>
      <Grid $open={isOpened} onClick={() => setIsOpened(!isOpened)}>
        <Category>{article.category}</Category>
        {isOpened ? (
          <HighlightedQuestion>{article.question}</HighlightedQuestion>
        ) : (
          <Question>{article.question}</Question>
        )}
        {isOpened ? <UpSVG /> : <DownSVG />}
      </Grid>
      <DescriptionContainer $open={isOpened}>
        <DescriptionWrapper>
          <Description>{article.description}</Description>
        </DescriptionWrapper>
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
  $open: boolean;
}>`
  position: relative;
  top: 1px;
  width: calc(100% - 40px);
  height: 52px;

  left: 20px;
  ${({ $open }) =>
    !$open &&
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
}>`
  width: 100%;
  padding: 0 20px;

  background-color: ${colors.blueGray200};

  display: grid;
  grid-template-rows: 0fr;

  transition: grid-template-rows 0.3s ease-in-out;

  ${({ $open }) =>
    $open &&
    css`
      grid-template-rows: 1fr;
    `}
`;

const DescriptionWrapper = styled.div`
  overflow: hidden;
`;

const Description = styled(T6Medium)`
  width: 634px;
  color: ${colors.blueGray600};

  white-space: pre-wrap;

  padding: 16px 0;
`;

export default Section;
