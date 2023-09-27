import { ReactNode } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components/macro";

import { Pretendard } from "@components/Typography";

import colors from "@constants/colors";

import { useTabState } from "@hooks/tab";

import { Query } from "@templates/tabType";

import { isNumber, isString, isUndefined } from "@utils/isTypes";

interface TabProps {
  to: string | Query | null; // 라우트 또는 쿼리 파라미터
  children: string | ReactNode;

  index?: number;
  onClick?: () => void;
}

const Tab = ({ to, children, index, onClick }: TabProps) => {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();

  const { tabState, setTabState } = useTabState();

  const nav = isString(to)
    ? () => {
        navigate(to);
      }
    : () => {
        setSearchParams(to ?? {});
      };

  return (
    <Container
      onClick={() => {
        if (isUndefined(index) || tabState.currentTab === index) return;

        tabState.beforeChange &&
          isNumber(index) &&
          tabState.beforeChange(tabState.currentTab, index);

        setTabState((prev) => ({
          ...prev,
          currentTab: index,
        }));

        if (tabState.navTimeout) {
          clearTimeout(tabState.navTimeout);
        }

        setTabState((prev) => ({
          ...prev,
          navTimeout: setTimeout(() => {
            nav();
            onClick && onClick();
          }, tabState.transitionTime * 1000),
        }));
      }}
    >
      <Title $activated={tabState.currentTab === index}>{children}</Title>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;

  width: 50px;
  height: 38px;

  cursor: pointer;
`;

const Title = styled(Pretendard)<{ $activated: boolean }>`
  margin: auto;

  font-size: 14px;

  ${({ $activated }) =>
    $activated
      ? css`
          font-weight: 700;
          color: ${colors.gray900};
        `
      : css`
          font-weight: 500;
          color: ${colors.blueGray400};
        `}
`;

export default Tab;
export type { TabProps };
