import { VirtualItem as VirtualItemType } from "@tanstack/react-virtual";
import styled from "styled-components/macro";

interface VirtualItemProps {
  children: React.ReactNode;
  virtualItem: VirtualItemType;
}

const VirtualItem = ({ children, virtualItem }: VirtualItemProps) => {
  return <Container $virtualItem={virtualItem}>{children}</Container>;
};

const Container = styled.div.attrs<{ $virtualItem: VirtualItemType }>(
  ({ $virtualItem }) => ({
    style: {
      height: `${$virtualItem.size}px`,
      transform: `translateY(${$virtualItem.start}px)`,
    },
  })
)`
  position: absolute;

  width: 100%;
`;

export default VirtualItem;
