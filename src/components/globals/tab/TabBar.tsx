import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import styled from "styled-components/macro";

import colors from "@constants/colors";

import { useTabState } from "@hooks/tab";

import { isNull, isObject, isString } from "@utils/isTypes";

import { TabProps } from "./Tab";

interface TabBarProps {
  children: JSX.Element[];
}

const TabBar = ({ children }: TabBarProps) => {
  const [indicate, setIndicater] = useState(0);
  const [searchParams] = useSearchParams();

  const [, setTabState] = useTabState();

  const location = useLocation();

  useEffect(() => {
    children.forEach((child, index) => {
      const _props: TabProps = child.props;

      if (
        isString(_props.to) &&
        searchParams.size === 0 &&
        location.pathname === _props.to
      ) {
        // 중첩 라우트인 경우
        setIndicater(index);
        setTabState((prev) => {
          console.log(
            `setTabState NR, currentTab: ${index}, prevTab: ${prev.currentTab}, to: ${_props.to}`
          );
          return {
            ...prev,
            currentTab: index,
            prevTab: prev.currentTab,
          };
        });
        console.log("nested route");
      } else if (isObject(_props.to)) {
        // Query Paramter인 경우
        if (isNull(_props.to) && searchParams.size !== 0) {
          return;
        }

        for (const [key, value] of Object.entries(_props.to ?? {})) {
          if (searchParams.get(key) !== value) {
            return;
          }
        }

        setIndicater(index);
        setTabState((prev) => {
          console.log(
            `setTabState QP, currentTab: ${index}, prevTab: ${prev.currentTab}, to: ${_props.to}`
          );
          return {
            ...prev,
            currentTab: index,
            prevTab: prev.currentTab,
          };
        });
      }
    });
  }, [children, searchParams, location, setTabState]);

  return (
    <Container>
      <TabContainer>{children}</TabContainer>
      <Indicater style={{ marginLeft: `${indicate * 54}px` }} />
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
