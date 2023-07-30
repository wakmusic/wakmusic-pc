import styled from "styled-components/macro";

import DefaultScroll from "@components/globals/Scroll/DefaultScroll";

interface PageItemContainerProps {
  height?: number;
  children: React.ReactNode;
}

const PageItemContainer = ({ height, children }: PageItemContainerProps) => {
  return (
    <Container>
      <DefaultScroll>
        <ItemsWrapper $height={height}>{children}</ItemsWrapper>
      </DefaultScroll>
    </Container>
  );
};

const Container = styled.div``;

const ItemsWrapper = styled.div<{ $height?: number }>`
  height: calc(100vh - ${({ $height }) => $height ?? 150}px);
`;

export default PageItemContainer;
