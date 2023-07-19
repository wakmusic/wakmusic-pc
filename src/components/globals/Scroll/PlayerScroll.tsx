import { OverlayScrollbars } from "overlayscrollbars";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import styled from "styled-components";

import colors from "@constants/colors";

interface PlayerScrollProps {
  children: React.ReactNode;
  scroll?: (scrollbar: HTMLElement) => void;
  ref?: React.RefObject<HTMLDivElement>;
}

const PlayerScroll = ({ children, scroll }: PlayerScrollProps) => {
  function update(instance: OverlayScrollbars) {
    if (!scroll) return;

    scroll(instance.elements().scrollOffsetElement);
  }

  return (
    <ScrollWrapper>
      <OverlayScrollbarsComponent
        events={{
          initialized: update,
          scroll: update,
        }}
      >
        {children}
      </OverlayScrollbarsComponent>
    </ScrollWrapper>
  );
};

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

export default PlayerScroll;
