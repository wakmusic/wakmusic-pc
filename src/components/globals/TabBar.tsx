import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

import colors from "@constants/colors";

import { isObject, isString } from "@utils/isTypes";

import { TabProps } from "./Tab";

interface TabBarProps {
  children: JSX.Element[];
}

const TabBar = ({ children }: TabBarProps) => {
  const [indicate, setIndicater] = useState(0);
  const [searchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    for (let i = 0; i < children.length; i++) {
      const _props: TabProps = children[i].props;

      if (
        isString(_props.to) &&
        searchParams.size === 0 &&
        location.pathname === _props.to
      ) {
        // 중첩 라우트인 경우
        setIndicater(i);
      } else if (isObject(_props.to)) {
        // Query Paramter인 경우
        const key = Object.keys(_props.to)[0];
        const value = Object.values(_props.to)[0];

        if (searchParams.get(key) === value) {
          setIndicater(i);
        }
      }
    }
  }, [children, searchParams, location]);

  useEffect(() => {
    console.log(indicate);
  }, [indicate]);

  return (
    <Container>
      <TabContainer>{children}</TabContainer>
      <Indicater target={indicate} />
    </Container>
  );
};

const Container = styled.div``;

const TabContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const Indicater = styled.div<{ target: number }>`
  width: 50px;
  height: 2px;

  border-radius: 1px;

  background-color: ${colors.point};

  transition: margin 0.25s ease-out;

  ${({ target }) =>
    css`
      margin-left: ${target * 54}px;
    `}
`;

export default TabBar;
