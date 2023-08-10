import { forwardRef, useRef } from "react";
import styled, { css } from "styled-components/macro";

import DefaultScroll from "@components/globals/Scroll/DefaultScroll";

interface PageItemContainerProps {
  height?: number;
  children: React.ReactNode;

  totalSize?: number;

  onScroll?: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
}

const PageItemContainer = forwardRef<HTMLDivElement, PageItemContainerProps>(
  ({ height, children, totalSize, onScroll }: PageItemContainerProps, ref) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
      <DefaultScroll ref={ref || scrollRef} onScroll={onScroll}>
        <ItemsWrapper $height={height}>
          <InnerWrapper $height={totalSize}>{children}</InnerWrapper>
        </ItemsWrapper>
      </DefaultScroll>
    );
  }
);

const ItemsWrapper = styled.div<{ $height?: number }>`
  height: calc(100vh - ${({ $height }) => $height ?? 150}px);
`;

const InnerWrapper = styled.div<{ $height?: number }>`
  position: relative;

  ${({ $height }) =>
    $height &&
    css`
      height: ${$height}px;
    `}
`;

PageItemContainer.displayName = "PageItemContainer";

export default PageItemContainer;
