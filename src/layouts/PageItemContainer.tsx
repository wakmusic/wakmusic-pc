import styled from "styled-components/macro";

import DefaultScroll from "@components/globals/Scroll/DefaultScroll";

interface PageItemContainerProps {
  hasButton?: boolean;
  children: React.ReactNode;
}

const PageItemContainer = ({ hasButton, children }: PageItemContainerProps) => {
  return (
    <Container>
      <DefaultScroll>
        <ItemsWrapper $hasButton={Boolean(hasButton)}>{children}</ItemsWrapper>
      </DefaultScroll>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 16px;
`;

const ItemsWrapper = styled.div<{ $hasButton: boolean }>`
  height: calc(100vh - ${({ $hasButton }) => ($hasButton ? 206 : 152)}px);
`;

export default PageItemContainer;
