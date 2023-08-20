import { useOverlayScrollbars } from "overlayscrollbars-react";
import { RefObject, forwardRef, useEffect, useRef } from "react";
import styled from "styled-components/macro";

import colors from "@constants/colors";

interface PlayerScrollProps {
  children: React.ReactNode;
  initialize?: (scrollbar: HTMLElement | null) => void;
  scroll?: () => void;
}

const PlayerScroll = forwardRef<HTMLDivElement, PlayerScrollProps>(
  ({ children, scroll, initialize: initialized }: PlayerScrollProps, ref) => {
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

      initialized &&
        initialized(
          ((ref || viewportRef) as RefObject<HTMLDivElement>).current
        );
    }, [initialize, ref, initialized]);

    return (
      <ScrollWrapper ref={osRef}>
        <ScrollBar ref={ref || viewportRef} onScroll={scroll}>
          {children}
        </ScrollBar>
      </ScrollWrapper>
    );
  }
);

const ScrollWrapper = styled.div`
  & .os-scrollbar {
    margin-right: 1px;
    --os-size: 7px;

    --os-handle-bg: ${colors.gray600};
    --os-handle-bg-hover: ${colors.gray600};
    --os-handle-bg-active: ${colors.gray600};
  }

  & .os-scrollbar-track {
    height: 100%;
  }
`;

const ScrollBar = styled.div``;

PlayerScroll.displayName = "PlayerScroll";

export default PlayerScroll;
