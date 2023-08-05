import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components/macro";

import { Pretendard } from "@components/Typography";

import colors from "@constants/colors";

import { Query } from "@templates/tabType";

import { isString } from "@utils/isTypes";

interface TabProps {
  to: string | Query; // 라우트 또는 쿼리 파라미터
  children: string;
}

const Tab = ({ to, children }: TabProps) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const nav = isString(to)
    ? () => {
        navigate(to);
      }
    : () => {
        setSearchParams(to);
      };

  const isCurrent = () => {
    if (isString(to)) {
      return location.pathname === to && searchParams.size === 0;
    } else {
      for (const [key, value] of Object.entries(to)) {
        if (searchParams.get(key) !== value) {
          return false;
        }
      }

      return true;
    }
  };

  return (
    <Container
      onClick={() => {
        nav();
      }}
    >
      <Title $activated={isCurrent()}>{children}</Title>
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
