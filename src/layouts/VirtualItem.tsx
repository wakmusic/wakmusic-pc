import { VirtualItem as VirtualItemType } from "@tanstack/react-virtual";
import styled, { css } from "styled-components/macro";

interface VirtualItemProps {
  children: React.ReactNode;
  virtualItem: VirtualItemType;
}

const VirtualItem = ({ children, virtualItem }: VirtualItemProps) => {
  return <Container $virtualItem={virtualItem}>{children}</Container>;
};

const Container = styled.div<{ $virtualItem: VirtualItemType }>`
  position: absolute;

  width: 100%;

  ${({ $virtualItem }) => css`
    height: ${$virtualItem.size}px;
    transform: translateY(${$virtualItem.start}px);
  `}
`;

export default VirtualItem;
