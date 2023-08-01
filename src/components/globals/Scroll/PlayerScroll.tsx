import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import styled from "styled-components/macro";

import colors from "@constants/colors";

interface PlayerScrollProps {
  children: React.ReactNode;
  initialize?: (scrollbar: HTMLElement) => void;
  scroll?: () => void;
}

const PlayerScroll = ({ children, initialize, scroll }: PlayerScrollProps) => {
  return (
    <ScrollWrapper>
      <OverlayScrollbarsComponent
        events={{
          initialized: (instance) => {
            if (!initialize) return;

            initialize(instance.elements().scrollOffsetElement);
          },
          scroll: () => {
            if (!scroll) return;

            scroll();
          },
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
