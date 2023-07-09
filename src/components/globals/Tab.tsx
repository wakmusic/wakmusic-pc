import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

import { Pretendard } from "@components/Typography";

import colors from "@constants/colors";

import { isString } from "@utils/isTypes";

interface Query {
  [key: string]: string;
}

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
      const key = Object.keys(to)[0];
      const value = Object.values(to)[0];

      return searchParams.get(key) === value;
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

  &:hover {
    cursor: pointer;
  }
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
