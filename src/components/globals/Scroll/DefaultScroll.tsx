import { useOverlayScrollbars } from "overlayscrollbars-react";
import { RefObject, forwardRef, useEffect, useRef } from "react";
import styled from "styled-components/macro";

import colors from "@constants/colors";

interface DefaultScrollProps {
  children: React.ReactNode | undefined;

  onScroll?: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
}

const DefaultScroll = forwardRef<HTMLDivElement, DefaultScrollProps>(
  ({ children, onScroll }: DefaultScrollProps, ref) => {
    const viewportRef = useRef<HTMLDivElement>(null);
    const osRef = useRef<HTMLDivElement>(null);

    const [initialize] = useOverlayScrollbars({
      options: {},
      events: {},
      defer: true,
    });

    useEffect(() => {
      if (
        !osRef.current ||
        !((ref || viewportRef) as RefObject<HTMLDivElement>).current
      ) {
        return;
      }

      initialize({
        target: osRef.current,
        elements: {
          viewport: ((ref || viewportRef) as RefObject<HTMLDivElement>).current,
        },
      });
    }, [initialize, ref]);

    return (
      <ScrollWrapper ref={osRef}>
        <ScrollBar ref={ref || viewportRef} onScroll={onScroll}>
          {children}
        </ScrollBar>
      </ScrollWrapper>
    );
  }
);

const ScrollWrapper = styled.div`
  & .os-scrollbar {
    --os-size: 8px;

    --os-handle-bg: ${colors.blueGray300};
    --os-handle-bg-hover: ${colors.blueGray300};
    --os-handle-bg-active: ${colors.blueGray300};
  }

  & .os-scrollbar-track {
    height: calc(100% - 16px);
  }
`;

const ScrollBar = styled.div``;

DefaultScroll.displayName = "DefaultScroll";

export default DefaultScroll;
