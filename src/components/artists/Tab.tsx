import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

import { T6Medium } from "@components/Typography";

import colors from "@constants/colors";

interface TabProps {
  to: string | null;
  children: string;
}

const Tab = ({ to, children }: TabProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Container
      $activated={searchParams.get("type") === to}
      onClick={() => {
        if (to === null) setSearchParams({});
        else setSearchParams({ type: to });
      }}
    >
      <Text $activated={searchParams.get("type") === to}>{children}</Text>
    </Container>
  );
};

const Container = styled.div<{ $activated: boolean }>`
  width: 50px;
  height: 40px;

  ${({ $activated }) =>
    $activated &&
    css`
      &::after {
        content: "";

        display: block;
        width: 50px;
        height: 2px;

        background: ${colors.point};
      }
    `}

  cursor: pointer;
`;

const Text = styled(T6Medium)<{ $activated: boolean }>`
  width: 50px;
  height: 36px;

  color: ${colors.blueGray400};

  ${({ $activated }) =>
    $activated &&
    css`
      color: ${colors.gray900};
      font-weight: 700;
    `}

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Tab;
