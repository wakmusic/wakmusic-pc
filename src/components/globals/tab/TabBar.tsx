import { cloneElement } from "react";
import styled from "styled-components/macro";

import colors from "@constants/colors";

import { useTabState } from "@hooks/tab";

interface TabBarProps {
  children: JSX.Element[];
}

const TabBar = ({ children }: TabBarProps) => {
  const { tabState } = useTabState();

  return (
    <Container>
      <TabContainer>
        {children.map((child, index) => cloneElement(child, { index: index }))}
      </TabContainer>
      <Indicater style={{ marginLeft: `${tabState.currentTab * 54}px` }} />
    </Container>
  );
};

const Container = styled.div``;

const TabContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const Indicater = styled.div`
  width: 50px;
  height: 2px;

  border-radius: 1px;

  background-color: ${colors.point};

  transition: margin 0.25s ease-out;
`;

export default TabBar;
