import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import styled from "styled-components";

import colors from "@constants/colors";

interface DefaultScrollProps {
  children: React.ReactNode;
}

const DefaultScroll = ({ children }: DefaultScrollProps) => {
  return (
    <ScrollWrapper>
      <OverlayScrollbarsComponent>{children}</OverlayScrollbarsComponent>
    </ScrollWrapper>
  );
};

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

export default DefaultScroll;
